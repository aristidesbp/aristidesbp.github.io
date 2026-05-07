/* ============================================================================
   FINANCEIRO ERP ABP - SCRIPT PRINCIPAL
   Estrutura modular com namespaces para melhor organização
   ============================================================================ */

// ============================================================================
// CONFIGURAÇÃO SUPABASE
// ============================================================================

const SUPABASE_URL = 'https://ylfmtttyoqwmwrgsfmgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZm10dHR5b3F3bXdyZ3NmbWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NzY5MjUsImV4cCI6MjA5MzI1MjkyNX0.yqcJiq6KdwZJCfyk9gMb_E2qVY07lxSl-zYkRNVOUkY';
const BUCKET_NAME = 'comprovantes';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================================
// CONSTANTES
// ============================================================================

const ITEMS_PER_PAGE = 12;
const EXTENSOES_PERMITIDAS_ARQUIVO = ['jpg', 'jpeg', 'png', 'pdf', 'gif', 'webp'];
const EXTENSOES_PERMITIDAS_AUDIO = ['webm', 'mp3', 'wav'];
const TAMANHO_MAXIMO_ARQUIVO = 50 * 1024 * 1024; // 50MB

// ============================================================================
// ESTADO GLOBAL
// ============================================================================

const STATE = {
    usuario: null,
    lancamentos: [],
    lancamentosPaginados: [],
    paginaAtual: 1,
    editandoId: null,
    
    // Gravação de áudio
    mediaRecorder: null,
    audioChunks: [],
    recordedAudioBlob: null,
    
    // Camera/QR Code
    html5QrCode: null,
    
    // Cache
    categoriasUnicas: [],
    
    // Filtros
    filtrosAtivos: {}
};

// ============================================================================
// MÓDULO: AUTENTICAÇÃO
// ============================================================================

const Auth = {
    async login() {
        const email = document.getElementById('loginEmail').value.trim();
        const senha = document.getElementById('loginSenha').value;
        const btn = document.getElementById('btnLogin');
        
        if (!email || !senha) {
            this.mostrarAlerta('Por favor, preencha e-mail e senha.', 'error');
            return;
        }

        if (!this.validarEmail(email)) {
            this.mostrarAlerta('E-mail inválido.', 'error');
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="spinner mr-2 inline-block"></span> Autenticando...';

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ 
                email, 
                password: senha 
            });

            if (error) {
                this.mostrarAlerta('Erro: Verifique seu e-mail e senha.', 'error');
                return;
            }

            STATE.usuario = data.user;
            this.limparFormularioLogin();
            this.exibirSistema();

        } catch (erro) {
            this.mostrarAlerta('Erro de conexão: ' + erro.message, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i> Entrar';
        }
    },

    async logout() {
        if (!confirm('Deseja sair do sistema?')) return;

        try {
            await supabase.auth.signOut();
            STATE.usuario = null;
            STATE.lancamentos = [];
            STATE.editandoId = null;
            this.exibirLogin();
            this.limparFormularioLogin();
        } catch (erro) {
            this.mostrarAlerta('Erro ao sair: ' + erro.message, 'error');
        }
    },

    async verificarLogin() {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session && session.user) {
                STATE.usuario = session.user;
                document.getElementById('userEmail').textContent = session.user.email;
                this.exibirSistema();
                await Lancamentos.carregar();
            } else {
                this.exibirLogin();
            }
        } catch (erro) {
            console.error('Erro ao verificar login:', erro);
            this.exibirLogin();
        }
    },

    exibirLogin() {
        document.getElementById('telaLogin').classList.remove('hidden');
        document.getElementById('telaSistema').classList.add('hidden');
    },

    exibirSistema() {
        document.getElementById('telaLogin').classList.add('hidden');
        document.getElementById('telaSistema').classList.remove('hidden');
        UI.changePage('listagem');
    },

    limparFormularioLogin() {
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginSenha').value = '';
    },

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    mostrarAlerta(mensagem, tipo = 'success') {
        console.warn(`[${tipo.toUpperCase()}] ${mensagem}`);
        alert(mensagem); // Pode ser melhorado com um toast notification
    }
};

// ============================================================================
// MÓDULO: INTERFACE DO USUÁRIO
// ============================================================================

const UI = {
    changePage(page) {
        // Oculta todas as seções
        document.getElementById('pagFormulario').classList.add('hidden');
        document.getElementById('pagListagem').classList.add('hidden');

        // Mostra a selecionada
        if (page === 'formulario') {
            document.getElementById('pagFormulario').classList.remove('hidden');
            Lancamentos.prepararFormulario();
        } else {
            document.getElementById('pagListagem').classList.remove('hidden');
            Lancamentos.renderizar();
        }
    },

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    },

    mostrarLoading(mostrar = true) {
        // Implementar se necessário
        console.log(mostrar ? 'Carregando...' : 'Pronto');
    }
};

// ============================================================================
// MÓDULO: LANÇAMENTOS (CRUD)
// ============================================================================

const Lancamentos = {
    async carregar() {
        try {
            UI.mostrarLoading(true);

            const { data, error } = await supabase
                .from('financeiro')
                .select('*')
                .eq('user_id', STATE.usuario.id)
                .order('data_vencimento', { ascending: false });

            if (error) throw error;

            STATE.lancamentos = data || [];
            await Lancamentos.carregarCategorias();
            this.renderizar();

        } catch (erro) {
            Auth.mostrarAlerta('Erro ao carregar lançamentos: ' + erro.message, 'error');
        } finally {
            UI.mostrarLoading(false);
        }
    },

    async carregarCategorias() {
        try {
            const categorias = [...new Set(
                STATE.lancamentos
                    .map(l => l.categoria)
                    .filter(c => c && c.trim())
            )];

            STATE.categoriasUnicas = categorias;

            // Atualizar datalist
            const datalist = document.getElementById('listaCategorias');
            datalist.innerHTML = '';
            categorias.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                datalist.appendChild(option);
            });

            // Atualizar select de filtros
            const selectFiltro = document.getElementById('filtroCategoria');
            const valorAtual = selectFiltro.value;
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            categorias.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                selectFiltro.appendChild(option);
            });
            selectFiltro.value = valorAtual;

        } catch (erro) {
            console.error('Erro ao carregar categorias:', erro);
        }
    },

    prepararFormulario() {
        const form = document.getElementById('formLancamento');
        
        if (STATE.editandoId) {
            // Modo edição
            document.getElementById('formTitulo').textContent = 'Editar Lançamento';
            document.getElementById('btnCancelar').classList.remove('hidden');
            
            const lancamento = STATE.lancamentos.find(l => l.id === STATE.editandoId);
            if (lancamento) {
                this.preencherFormulario(lancamento);
            }
        } else {
            // Modo criação
            document.getElementById('formTitulo').textContent = 'Novo Lançamento';
            document.getElementById('btnCancelar').classList.add('hidden');
            form.reset();
            STATE.recordedAudioBlob = null;
            Audio.resetar();
        }

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    preencherFormulario(lancamento) {
        document.getElementById('formDesc').value = lancamento.descricao || '';
        document.getElementById('formTipo').value = lancamento.tipo || 'despesa';
        document.getElementById('formValor').value = lancamento.valor_total || '';
        document.getElementById('formCategoria').value = lancamento.categoria || 'Geral';
        document.getElementById('formStatus').value = lancamento.status_lancamento || 'aberto';
        document.getElementById('formParcelas').value = lancamento.num_parcelas || 1;
        document.getElementById('formVencimento').value = lancamento.data_vencimento || '';
        document.getElementById('formTelefone').value = lancamento.telefone || '';
        document.getElementById('formEmail').value = lancamento.email || '';
        document.getElementById('formBarras').value = lancamento.codigo_barra || '';
    },

    async salvar(event) {
        event.preventDefault();

        try {
            // Coleta dados do formulário
            const dados = this.coletarDadosFormulario();

            // Valida
            this.validar(dados);

            // Faz uploads de arquivos (se houver)
            const urls = await Uploads.processarTodosArquivos();

            // Prepara payload
            const payload = {
                descricao: dados.descricao,
                tipo: dados.tipo,
                categoria: dados.categoria || 'Geral',
                status_lancamento: dados.status,
                valor_total: parseFloat(dados.valor),
                num_parcelas: parseInt(dados.parcelas),
                data_vencimento: dados.vencimento,
                data_pagamento: dados.dataPagamento || null,
                telefone: dados.telefone || null,
                email: dados.email || null,
                codigo_barra: dados.barras || null,
                boleto_url: urls.boleto || null,
                comprovante_url: urls.comprovante || null,
                audio_obs_url: urls.audio || null
            };

            const btn = document.getElementById('btnSalvar');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner mr-2 inline-block"></span> Salvando...';

            if (STATE.editandoId) {
                // UPDATE
                const { error } = await supabase
                    .from('financeiro')
                    .update(payload)
                    .eq('id', STATE.editandoId)
                    .eq('user_id', STATE.usuario.id);

                if (error) throw error;
                Auth.mostrarAlerta('Lançamento atualizado com sucesso!');
            } else {
                // INSERT
                const { error } = await supabase
                    .from('financeiro')
                    .insert([{
                        ...payload,
                        user_id: STATE.usuario.id
                    }]);

                if (error) throw error;
                Auth.mostrarAlerta('Lançamento criado com sucesso!');
            }

            // Recarrega e volta para listagem
            await Lancamentos.carregar();
            this.cancelarEdicao();
            UI.changePage('listagem');

        } catch (erro) {
            Auth.mostrarAlerta('Erro: ' + erro.message, 'error');
        } finally {
            document.getElementById('btnSalvar').disabled = false;
            document.getElementById('btnSalvar').innerHTML = '<i class="fas fa-save mr-2"></i> Gravar Lançamento';
        }
    },

    coletarDadosFormulario() {
        return {
            descricao: document.getElementById('formDesc').value.trim(),
            tipo: document.getElementById('formTipo').value,
            valor: document.getElementById('formValor').value,
            categoria: document.getElementById('formCategoria').value.trim(),
            status: document.getElementById('formStatus').value,
            parcelas: document.getElementById('formParcelas').value,
            vencimento: document.getElementById('formVencimento').value,
            dataPagamento: document.getElementById('formVencimento').value, // Adaptável
            telefone: document.getElementById('formTelefone').value.trim(),
            email: document.getElementById('formEmail').value.trim(),
            barras: document.getElementById('formBarras').value.trim()
        };
    },

    validar(dados) {
        if (!dados.descricao) throw new Error('Descrição é obrigatória');
        if (!dados.valor || parseFloat(dados.valor) <= 0) throw new Error('Valor deve ser maior que 0');
        if (!dados.vencimento) throw new Error('Data de vencimento é obrigatória');
        if (!dados.parcelas || parseInt(dados.parcelas) <= 0) throw new Error('Número de parcelas deve ser maior que 0');
        
        if (dados.email && !Auth.validarEmail(dados.email)) {
            throw new Error('E-mail inválido');
        }
    },

    cancelarEdicao() {
        STATE.editandoId = null;
        STATE.recordedAudioBlob = null;
        Audio.resetar();
        document.getElementById('formLancamento').reset();
        UI.changePage('listagem');
    },

    renderizar() {
        // Aplica filtros
        const filtrados = this.aplicarFiltros();

        // Pagina
        const inicio = (STATE.paginaAtual - 1) * ITEMS_PER_PAGE;
        const fim = inicio + ITEMS_PER_PAGE;
        STATE.lancamentosPaginados = filtrados.slice(inicio, fim);

        // Renderiza cards
        const container = document.getElementById('listaLancamentos');
        if (STATE.lancamentosPaginados.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-inbox text-4xl text-slate-300 mb-3 block"></i>
                    <p class="text-slate-500 font-semibold">Nenhum lançamento encontrado</p>
                </div>
            `;
        } else {
            container.innerHTML = STATE.lancamentosPaginados.map(l => this.renderizarCard(l)).join('');
        }

        // Renderiza paginação
        this.renderizarPaginacao(filtrados.length);

        // Atualiza dashboard
        this.atualizarDashboard(filtrados);
    },

    renderizarCard(lancamento) {
        const hoje = new Date().toISOString().split('T')[0];
        const atrasado = lancamento.data_vencimento < hoje && lancamento.data_pagamento === null;
        
        const statusClass = lancamento.data_pagamento 
            ? 'badge-success' 
            : (atrasado ? 'badge-danger pulse' : 'badge-warning');
        
        const statusTxt = lancamento.data_pagamento 
            ? 'PAGO' 
            : (atrasado ? 'ATRASADO' : 'PENDENTE');

        const dtVenc = new Date(lancamento.data_vencimento + 'T12:00:00').toLocaleDateString('pt-BR');
        const dtPag = lancamento.data_pagamento 
            ? new Date(lancamento.data_pagamento + 'T12:00:00').toLocaleDateString('pt-BR')
            : '--/--/----';

        const corBorda = lancamento.tipo === 'receita' ? 'border-emerald-500' : 'border-red-500';
        const corValor = lancamento.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600';

        const iconeBoleto = lancamento.boleto_url 
            ? `<a href="${Utilidades.escaparHTML(lancamento.boleto_url)}" target="_blank" class="text-blue-500 hover:text-blue-700 text-xs font-semibold">
                <i class="fas fa-file-invoice"></i> Boleto
              </a>` 
            : '';

        const iconeComprovante = lancamento.comprovante_url 
            ? `<a href="${Utilidades.escaparHTML(lancamento.comprovante_url)}" target="_blank" class="text-emerald-500 hover:text-emerald-700 text-xs font-semibold">
                <i class="fas fa-receipt"></i> Comprovante
              </a>` 
            : '';

        const iconeAudio = lancamento.audio_obs_url 
            ? `<a href="${Utilidades.escaparHTML(lancamento.audio_obs_url)}" target="_blank" class="text-purple-500 hover:text-purple-700 text-xs font-semibold">
                <i class="fas fa-music"></i> Áudio
              </a>` 
            : '';

        return `
            <div class="bg-white rounded-lg shadow-sm border-l-4 ${corBorda} hover:shadow-md transition p-4 animate-slide-in">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h4 class="font-bold text-slate-800 text-sm">
                            ${Utilidades.escaparHTML(lancamento.descricao)}
                        </h4>
                        <p class="text-xs text-slate-500 mt-1">
                            <span class="bg-slate-100 px-2 py-1 rounded">${lancamento.categoria || 'Geral'}</span>
                        </p>
                    </div>
                    <span class="badge ${statusClass} no-color-adjust">${statusTxt}</span>
                </div>

                <div class="bg-slate-50 rounded p-2 my-3 text-xs space-y-1 border border-slate-200">
                    <div class="flex justify-between">
                        <span class="text-slate-600">Vencimento:</span>
                        <span class="font-bold">${dtVenc}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-600">Pagamento:</span>
                        <span class="font-bold">${dtPag}</span>
                    </div>
                </div>

                <p class="text-lg font-bold ${corValor} mb-3">
                    R$ ${parseFloat(lancamento.valor_total).toFixed(2)}
                </p>

                ${lancamento.telefone || lancamento.email ? `
                    <div class="bg-blue-50 border border-blue-200 rounded p-2 mb-3 text-xs">
                        <p class="font-bold text-blue-900 mb-1">
                            <i class="fas fa-phone-alt text-blue-500 mr-1"></i> Contato
                        </p>
                        ${lancamento.telefone ? `<p class="text-blue-700"><i class="fas fa-phone mr-1"></i>${Utilidades.escaparHTML(lancamento.telefone)}</p>` : ''}
                        ${lancamento.email ? `<p class="text-blue-700 break-all"><i class="fas fa-envelope mr-1"></i>${Utilidades.escaparHTML(lancamento.email)}</p>` : ''}
                    </div>
                ` : ''}

                ${lancamento.codigo_barra ? `
                    <div class="bg-slate-50 rounded p-2 mb-3 text-xs border border-slate-200 font-mono">
                        <i class="fas fa-barcode text-slate-400 mr-1"></i>
                        <span class="break-all text-slate-600">${Utilidades.escaparHTML(lancamento.codigo_barra)}</span>
                    </div>
                ` : ''}

                <div class="flex gap-1 mb-3 flex-wrap text-xs">
                    ${iconeBoleto}
                    ${iconeComprovante}
                    ${iconeAudio}
                </div>

                <div class="flex gap-2">
                    <button 
                        onclick="Lancamentos.prepararEdicao('${lancamento.id}')"
                        class="flex-1 bg-blue-100 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-500 hover:text-white transition text-xs font-bold">
                        <i class="fas fa-edit mr-1"></i> Editar
                    </button>
                    <button 
                        onclick="Lancamentos.deletar('${lancamento.id}')"
                        class="flex-1 bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition text-xs font-bold">
                        <i class="fas fa-trash mr-1"></i> Deletar
                    </button>
                </div>
            </div>
        `;
    },

    renderizarPaginacao(totalItems) {
        const totalPaginas = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const container = document.getElementById('paginacao');

        if (totalPaginas <= 1) {
            container.innerHTML = '';
            return;
        }

        let html = '';

        // Botão anterior
        if (STATE.paginaAtual > 1) {
            html += `<button onclick="Lancamentos.mudarPagina(${STATE.paginaAtual - 1})" class="px-3 py-2 border border-slate-300 rounded hover:bg-slate-100">
                <i class="fas fa-chevron-left"></i>
            </button>`;
        }

        // Números de página
        for (let i = 1; i <= totalPaginas; i++) {
            const ativo = i === STATE.paginaAtual;
            html += `<button 
                onclick="Lancamentos.mudarPagina(${i})" 
                class="px-3 py-2 rounded ${ativo ? 'bg-emerald-500 text-white' : 'border border-slate-300 hover:bg-slate-100'}">
                ${i}
            </button>`;
        }

        // Botão próximo
        if (STATE.paginaAtual < totalPaginas) {
            html += `<button onclick="Lancamentos.mudarPagina(${STATE.paginaAtual + 1})" class="px-3 py-2 border border-slate-300 rounded hover:bg-slate-100">
                <i class="fas fa-chevron-right"></i>
            </button>`;
        }

        container.innerHTML = html;
    },

    mudarPagina(pagina) {
        STATE.paginaAtual = pagina;
        this.renderizar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    aplicarFiltros() {
        return STATE.lancamentos.filter(l => {
            const desc = document.getElementById('filtroDesc').value.toLowerCase();
            const cat = document.getElementById('filtroCategoria').value;
            const inicio = document.getElementById('filtroInicio').value;
            const fim = document.getElementById('filtroFim').value;

            if (desc && !l.descricao.toLowerCase().includes(desc)) return false;
            if (cat && l.categoria !== cat) return false;
            if (inicio && l.data_vencimento < inicio) return false;
            if (fim && l.data_vencimento > fim) return false;

            return true;
        });
    },

    atualizarDashboard(lancamentos) {
        let totalReceita = 0;
        let totalDespesa = 0;
        let totalPendente = 0;

        lancamentos.forEach(l => {
            const valor = parseFloat(l.valor_total || 0);
            
            if (l.data_pagamento) {
                // Pago
                if (l.tipo === 'receita') {
                    totalReceita += valor;
                } else {
                    totalDespesa += valor;
                }
            } else {
                // Pendente
                totalPendente += valor;
            }
        });

        const fmt = v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        document.getElementById('dashReceita').textContent = fmt(totalReceita);
        document.getElementById('dashDespesa').textContent = fmt(totalDespesa);
        document.getElementById('dashPendente').textContent = fmt(totalPendente);
    },

    prepararEdicao(id) {
        STATE.editandoId = id;
        UI.changePage('formulario');
    },

    async deletar(id) {
        if (!confirm('Tem certeza que deseja deletar este lançamento?')) return;

        try {
            const { error } = await supabase
                .from('financeiro')
                .delete()
                .eq('id', id)
                .eq('user_id', STATE.usuario.id);

            if (error) throw error;

            Auth.mostrarAlerta('Lançamento deletado com sucesso!');
            await this.carregar();

        } catch (erro) {
            Auth.mostrarAlerta('Erro ao deletar: ' + erro.message, 'error');
        }
    }
};

// ============================================================================
// MÓDULO: FILTROS
// ============================================================================

const Filtros = {
    aplicar() {
        STATE.paginaAtual = 1; // Reset para primeira página
        Lancamentos.renderizar();
    },

    limpar() {
        document.getElementById('filtroDesc').value = '';
        document.getElementById('filtroCategoria').value = '';
        document.getElementById('filtroInicio').value = '';
        document.getElementById('filtroFim').value = '';
        this.aplicar();
    }
};

// ============================================================================
// MÓDULO: UPLOADS DE ARQUIVOS
// ============================================================================

const Uploads = {
    mostrarNome(input, idElemento) {
        const elemento = document.getElementById(idElemento);
        if (input.files && input.files.length > 0) {
            const arquivo = input.files[0];
            
            // Valida tamanho
            if (arquivo.size > TAMANHO_MAXIMO_ARQUIVO) {
                Auth.mostrarAlerta('Arquivo muito grande (máximo 50MB)', 'error');
                input.value = '';
                elemento.textContent = '';
                return;
            }

            elemento.innerHTML = `<i class="fas fa-check text-emerald-600"></i> ${Utilidades.escaparHTML(arquivo.name)}`;
        } else {
            elemento.innerHTML = '';
        }
    },

    drop(event, inputId) {
        event.preventDefault();
        const dropZone = event.currentTarget;
        dropZone.classList.remove('dragover');

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const input = document.getElementById(inputId);
            input.files = event.dataTransfer.files;
            
            const nomeMap = {
                'fileBoleto': 'nomeBoleto',
                'fileComprovante': 'nomeComprovante'
            };
            this.mostrarNome(input, nomeMap[inputId]);
        }
    },

    async processarTodosArquivos() {
        const urls = {};

        try {
            // Processa boleto
            const fileBoleto = document.getElementById('fileBoleto').files[0];
            if (fileBoleto) {
                urls.boleto = await this.uploadArquivo(fileBoleto, 'boleto');
            }

            // Processa comprovante
            const fileComprovante = document.getElementById('fileComprovante').files[0];
            if (fileComprovante) {
                urls.comprovante = await this.uploadArquivo(fileComprovante, 'comprovante');
            }

            // Processa áudio
            if (STATE.recordedAudioBlob) {
                urls.audio = await this.uploadAudio(STATE.recordedAudioBlob);
            }

        } catch (erro) {
            throw new Error('Erro ao fazer upload: ' + erro.message);
        }

        return urls;
    },

    async uploadArquivo(arquivo, tipo) {
        const timestamp = Date.now();
        const nomeArquivo = `${tipo}_${timestamp}_${arquivo.name}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(`public/${nomeArquivo}`, arquivo, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return urlData.publicUrl;
    },

    async uploadAudio(blob) {
        const timestamp = Date.now();
        const nomeArquivo = `audio_${timestamp}.webm`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(`public/${nomeArquivo}`, blob, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return urlData.publicUrl;
    }
};

// ============================================================================
// MÓDULO: CÂMERA E LEITURA DE QR CODE
// ============================================================================

const Camera = {
    iniciar() {
        const container = document.getElementById('cameraContainer');
        container.classList.remove('hidden');

        try {
            STATE.html5QrCode = new Html5Qrcode('cameraPreview');
            const config = { 
                fps: 10, 
                qrbox: { width: 300, height: 150 }
            };

            STATE.html5QrCode.start(
                { facingMode: 'environment' },
                config,
                (decodedText) => {
                    document.getElementById('formBarras').value = decodedText;
                    this.parar();
                }
            ).catch(() => {
                Auth.mostrarAlerta('Erro ao acessar câmera. Verifique as permissões.', 'error');
                container.classList.add('hidden');
            });

        } catch (erro) {
            Auth.mostrarAlerta('Erro: ' + erro.message, 'error');
            container.classList.add('hidden');
        }
    },

    parar() {
        if (STATE.html5QrCode) {
            STATE.html5QrCode.stop()
                .then(() => {
                    document.getElementById('cameraContainer').classList.add('hidden');
                    STATE.html5QrCode = null;
                })
                .catch(erro => console.error('Erro ao parar câmera:', erro));
        } else {
            document.getElementById('cameraContainer').classList.add('hidden');
        }
    }
};

// ============================================================================
// MÓDULO: GRAVAÇÃO DE ÁUDIO
// ============================================================================

const Audio = {
    async toggle() {
        const btn = document.getElementById('btnAudio');
        const preview = document.getElementById('audioPreview');

        if (STATE.mediaRecorder && STATE.mediaRecorder.state === 'recording') {
            STATE.mediaRecorder.stop();
            btn.innerHTML = '<i class="fas fa-microphone mr-2"></i> Gravar Novo Áudio';
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true
                    }
                });

                STATE.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                STATE.audioChunks = [];

                STATE.mediaRecorder.ondataavailable = (e) => {
                    STATE.audioChunks.push(e.data);
                };

                STATE.mediaRecorder.onstop = () => {
                    STATE.recordedAudioBlob = new Blob(STATE.audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(STATE.recordedAudioBlob);
                    preview.classList.remove('hidden');

                    // Limpa stream
                    stream.getTracks().forEach(track => track.stop());
                };

                STATE.mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500 mr-2"></i> Parar Gravação';

            } catch (erro) {
                Auth.mostrarAlerta('Erro ao acessar microfone: ' + erro.message, 'error');
            }
        }
    },

    resetar() {
        STATE.mediaRecorder = null;
        STATE.audioChunks = [];
        STATE.recordedAudioBlob = null;
        
        const preview = document.getElementById('audioPreview');
        preview.src = '';
        preview.classList.add('hidden');

        const btn = document.getElementById('btnAudio');
        btn.innerHTML = '<i class="fas fa-microphone mr-2"></i> Gravar Áudio';
    }
};

// ============================================================================
// MÓDULO: UTILITÁRIOS
// ============================================================================

const Utilidades = {
    escaparHTML(texto) {
        if (!texto) return '';
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    },

    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    },

    formatarData(data) {
        return new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');
    }
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    Auth.verificarLogin();

    // Event listener para filtros em tempo real
    const filtros = ['filtroDesc', 'filtroCategoria', 'filtroInicio', 'filtroFim'];
    filtros.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener('change', () => Filtros.aplicar());
        }
    });
});

// ============================================================================
// FIM DO SCRIPT
// ============================================================================
