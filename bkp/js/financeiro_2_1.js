
        // Configuração do Supabase
        let entidadesCache = [];
        let html5QrCode = null;
        
        // --- Variáveis para gravação de áudio ---
        let recordedAudioBlob = null;
        let mediaRecorder;
        let audioChunks = [];
        // --- Fim variáveis áudio ---

        

//====================================================================
        // CONTROLE DO MENU HAMBÚRGUER E ABAS
        // ====================================================================
        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                loadParcelas();
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ====================================================================
        // AUTENTICAÇÃO E CONTROLE DE TELAS
        // ====================================================================
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login: Verifique seu e-mail e senha.");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            document.getElementById('lista-parcelas').innerHTML = '';
            document.getElementById('dash-receita').innerText = 'R$ 0,00';
            document.getElementById('dash-despesa').innerText = 'R$ 0,00';
            document.getElementById('dash-pendente').innerText = 'R$ 0,00';
            fecharMenu();
            verificar_login();
        }

        
// ========================================================
// INICIALIZAÇÃO E ARRASTAR/SOLTAR
// ========================================================
        
   document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-boleto', 'f-boleto', 'nome-boleto');
            configurarDropZone('drop-comprovante', 'f-comprovante', 'nome-comprovante');
        });

        async function init() {
            loadEntidades();
            loadCategoriasUnicas();
            loadParcelas();
        }

        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

        // --- FUNÇÕES DE GRAVAÇÃO DE ÁUDIO ---
        async function toggleGravacaoAudio() {
            const btn = document.getElementById('btn-audio-obs');
            const preview = document.getElementById('audio-preview-obs');
            
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];
                    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                    mediaRecorder.onstop = () => {
                        recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        preview.src = URL.createObjectURL(recordedAudioBlob);
                        preview.style.display = 'block';
                    };
                    mediaRecorder.start();
                    btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
                } catch (err) {
                    alert("Erro ao acessar o microfone: " + err.message);
                }
            }
        }
        /*
        
        // --- FUNÇÕES DE ÁUDIO ---
        async function toggleGravação() {
            const btn = document.getElementById('btn-audio');
            const preview = document.getElementById('audio-preview');
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(recordedAudioBlob);
                    preview.style.display = 'block';
                };
                mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
            }
        }
        
        */ 

        
    // ====================================================================
        // FUNÇÕES DO SISTEMA E CRUD
        // ====================================================================
        function ajustarLabelsValor() {
            const tipo = document.getElementById('f-tipo-calculo').value;
            document.getElementById('label-valor').innerText = tipo === 'total' ? 'Valor Total (R$)' : 'Valor da Parcela (R$)';
        }

        async function loadEntidades() {
            const { data } = await _supabase.from('entidades').select('id, nome_completo');
            if(data) entidadesCache = data;
        }

        async function loadCategoriasUnicas() {
            const { data } = await _supabase.from('financas').select('categoria');
            if (!data) return;
            
            const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
            
            const datalist = document.getElementById('lista-categorias');
            const selectFiltro = document.getElementById('filtro-categoria');
            
            datalist.innerHTML = '';
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            
            categorias.forEach(cat => {
                datalist.innerHTML += `<option value="${cat}">`;
                selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        const inputBusca = document.getElementById('f-entidade-busca');
        const listaDropdown = document.getElementById('lista-entidades');
        const inputId = document.getElementById('f-entidade-id');

        inputBusca.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            listaDropdown.innerHTML = '';
            if (!termo) { listaDropdown.classList.add('hidden'); inputId.value = ''; return; }

            const filtradas = entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
            if (filtradas.length > 0) {
                listaDropdown.classList.remove('hidden');
                filtradas.forEach(ent => {
                    const li = document.createElement('li');
                    li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0';
                    li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                    li.onclick = () => {
                        inputBusca.value = ent.nome_completo;
                        inputId.value = ent.id;
                        listaDropdown.classList.add('hidden');
                    };
                    listaDropdown.appendChild(li);
                });
            } else { listaDropdown.classList.add('hidden'); inputId.value = ''; }
        });

        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 300, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('f-barras').value = decodedText;
                pararCamera();
            }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }


        async function gerarLancamentoCompleto() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const desc = document.getElementById('f-desc').value;
                const tipoCalculo = document.getElementById('f-tipo-calculo').value;
                const valorInput = parseFloat(document.getElementById('f-valor').value);
                const tipo = document.getElementById('f-tipo').value;
                const categoria = document.getElementById('f-categoria').value || 'Geral';
                const statusLancamento = document.getElementById('f-status').value;
                const qtd = parseInt(document.getElementById('f-parcelas').value);
                const recorrenciaVal = document.getElementById('f-recorrencia').value;
                const dataVenc = document.getElementById('f-vencimento').value;
                const dataPagamentoForm = document.getElementById('f-data-pagamento').value;
                const entidade = document.getElementById('f-entidade-id').value || null;
                const barras = document.getElementById('f-barras').value;
                const telefone = document.getElementById('f-telefone').value || null;
                const email = document.getElementById('f-email').value || null;
                
                const fileBoleto = document.getElementById('f-boleto').files[0];
                const fileComprovante = document.getElementById('f-comprovante').files[0];
                
                const editandoId = document.getElementById('f-editando-id').value;
                const financaId = document.getElementById('f-editando-financa-id').value;

                if(!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

                let valorTotal, valorParcela;
                if (tipoCalculo === 'total') {
                    valorTotal = valorInput;
                    valorParcela = (valorTotal / qtd).toFixed(2);
                } else {
                    valorParcela = valorInput;
                    valorTotal = (valorParcela * qtd).toFixed(2);
                }

                let boletoUrl = null;
                let comprovanteUrl = null;

                if (fileBoleto) {
                    const fileName = `bol_${Date.now()}_${fileBoleto.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileBoleto);
                    if(!error) boletoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (fileComprovante) {
                    const fileName = `comp_${Date.now()}_${fileComprovante.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileComprovante);
                    if(!error) comprovanteUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                let audioUrl = null;
                if (recordedAudioBlob) {
                    const audioName = `obs_audio_${Date.now()}.webm`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${audioName}`, recordedAudioBlob);
                    if(!error) audioUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${audioName}`).data.publicUrl;
                }

                if (editandoId) {
                    await _supabase.from('financas').update({
                        descricao: desc, tipo: tipo, categoria: categoria, status_lancamento: statusLancamento, entidade_id: entidade, telefone: telefone, email: email
                    }).eq('id', financaId);

                    const payloadUpdate = {
                        valor_parcela: valorParcela,
                        data_vencimento: dataVenc,
                        status: dataPagamentoForm ? 'pago' : 'pendente',
                        data_pagamento: dataPagamentoForm || null,
                        codigo_barra: barras
                    };
                    if (boletoUrl) payloadUpdate.boleto_url = boletoUrl;
                    if (comprovanteUrl) payloadUpdate.comprovante_url = comprovanteUrl;
                    if (audioUrl) payloadUpdate.audio_obs_url = audioUrl;

                    const { error: errUpdate } = await _supabase.from('parcelas').update(payloadUpdate).eq('id', editandoId);
                    if (errUpdate) throw errUpdate;

                    alert("Parcela atualizada com sucesso!");
                } else {
                    const { data: financa, error: errF } = await _supabase.from('financas').insert([{
                        descricao: desc, valor_total: valorTotal, tipo, categoria, status_lancamento: statusLancamento, num_parcelas: qtd, entidade_id: entidade, telefone: telefone, email: email
                    }]).select().single();
                    if(errF) throw errF;

                    let parcelas = [];
                    for(let i = 1; i <= qtd; i++) {
                        let venc = new Date(dataVenc + 'T12:00:00'); 
                        if (recorrenciaVal === 'diario') {
                            venc.setDate(venc.getDate() + (i - 1));
                        } else {
                            venc.setMonth(venc.getMonth() + ((i - 1) * parseInt(recorrenciaVal))); 
                        }
                        
                        parcelas.push({
                            financa_id: financa.id,
                            num_parcela: i,
                            valor_parcela: valorParcela,
                            data_vencimento: venc.toISOString().split('T')[0],
                            status: dataPagamentoForm ? 'pago' : 'pendente',
                            data_pagamento: dataPagamentoForm || null,
                            codigo_barra: barras,
                            boleto_url: boletoUrl,
                            comprovante_url: comprovanteUrl,
                            audio_obs_url: audioUrl
                        });
                    }

                    const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
                    if(errP) throw errP;

                    alert("Lançamento salvo!");
                }
                
                // Em vez de recarregar a página, podemos simplesmente voltar para a lista
                cancelarEdicao();
                loadParcelas();
                alternarAba('listagem');
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';

            } catch (error) {
                alert(error.message);
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-categoria').value = '';
            document.getElementById('filtro-inicio').value = '';
            document.getElementById('filtro-fim').value = '';
            loadParcelas();
        }

                async function loadParcelas() {
            const busca = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;
            const dataInicio = document.getElementById('filtro-inicio').value;
            const dataFim = document.getElementById('filtro-fim').value;

            let query = _supabase.from('parcelas').select('*, financas!inner(descricao, tipo, categoria, num_parcelas, telefone, email)').order('data_vencimento', { ascending: true });

            if (busca) query = query.ilike('financas.descricao', `%${busca}%`);
            if (categoria) query = query.eq('financas.categoria', categoria);
            if (dataInicio) query = query.gte('data_vencimento', dataInicio);
            if (dataFim) query = query.lte('data_vencimento', dataFim);

            const { data, error } = await query;
            if (error) { console.error("Erro ao carregar parcelas:", error.message); return; }
            
            const container = document.getElementById('lista-parcelas');
            const hoje = new Date().toISOString().split('T')[0];

            // Calcular totais do filtro atual
            let totalReceita = 0, totalDespesa = 0, totalPendente = 0;
            data.forEach(p => {
                const valor = parseFloat(p.valor_parcela || 0);
                if (p.status === 'pago') {
                    if (p.financas.tipo === 'receita') totalReceita += valor;
                    else totalDespesa += valor;
                } else {
                    totalPendente += valor;
                }
            });
            const fmt = v => `R$ ${v.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
            document.getElementById('filtro-total-receita').innerText = fmt(totalReceita);
            document.getElementById('filtro-total-despesa').innerText = fmt(totalDespesa);
            document.getElementById('filtro-total-pendente').innerText = fmt(totalPendente);

            container.innerHTML = data.map(p => {
                let statusClass = p.status === 'pago' ? 'status-pago' : 'status-pendente';
                let statusTxt = p.status.toUpperCase();
                if(p.status === 'pendente' && p.data_vencimento < hoje) { statusClass = 'status-atrasado'; statusTxt = 'ATRASADO'; }

                const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString('pt-br');
                const dtPag = p.data_pagamento ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';

                const iconeBoleto = p.boleto_url ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs inline-block"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
                const iconeComp = p.comprovante_url ? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 hover:text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs inline-block"><i class="fas fa-receipt"></i> Recibo</a>` : '';
                const txtBarras = p.codigo_barra ? `<div class="text-gray-400 font-mono text-[10px] mt-2 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';
                
                // Dados de contato da financeira (agora vindo direto de financas)
                const telefoneFinanca = p.financas?.telefone || '';
                const emailFinanca = p.financas?.email || '';
                
                const botoesContato = `
                    <div class="flex gap-2">
                        ${telefoneFinanca ? `<a href="https://wa.me/${telefoneFinanca.replace(/\D/g, '')}" target="_blank" class="flex-1 bg-green-100 text-green-600 px-2 py-1.5 rounded hover:bg-green-500 hover:text-white transition text-xs text-center flex items-center justify-center gap-1">
                            <i class="fas fa-whatsapp"></i> WhatsApp
                        </a>` : ''}
                        ${emailFinanca ? `<a href="mailto:${emailFinanca}" class="flex-1 bg-blue-100 text-blue-600 px-2 py-1.5 rounded hover:bg-blue-500 hover:text-white transition text-xs text-center flex items-center justify-center gap-1">
                            <i class="fas fa-envelope"></i> E-mail
                        </a>` : ''}
                    </div>
                `;

                return `
                <div class="card border-l-4 ${p.financas.tipo === 'receita' ? 'border-emerald-500' : 'border-red-500'} hover:shadow-lg transition">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h4 class="font-bold text-slate-800 text-sm">${p.financas.descricao}</h4>
                            <p class="text-[11px] bg-gray-200 text-gray-600 px-2 rounded inline-block mt-1">${p.financas.categoria || 'Geral'}</p>
                        </div>
                        <div class="text-right">
                            <span class="${statusClass}">${statusTxt}</span>
                        </div>
                    </div>
                    
                    <div class="bg-slate-50 rounded p-2 my-3 text-xs">
                        <div class="flex justify-between mb-1">
                            <span class="text-slate-600">Vencimento:</span>
                            <span class="font-bold text-slate-800"><i class="far fa-calendar-alt text-slate-400"></i> ${dtVenc}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">Pagamento:</span>
                            <span class="font-bold text-emerald-600"><i class="fas fa-check text-emerald-400"></i> ${dtPag}</span>
                        </div>
                    </div>
                    
                    <div class="mb-2 text-xs">
                        <p class="text-slate-600"><strong>Parcela:</strong> ${p.num_parcela} / ${p.financas.num_parcelas}</p>
                        <p class="text-lg font-bold ${p.financas.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600'} mt-1">
                            R$ ${parseFloat(p.valor_parcela).toFixed(2)}
                        </p>
                    </div>
                    
                    ${telefoneFinanca || emailFinanca ? `
                        <div class="bg-blue-50 rounded p-2 mb-3 text-xs border border-blue-100">
                            <p class="font-bold text-blue-900 mb-1"><i class="fas fa-phone-alt text-blue-500 mr-1"></i>Contato</p>
                            ${telefoneFinanca ? `<p class="text-blue-700"><i class="fas fa-phone text-blue-500 mr-1"></i>${telefoneFinanca}</p>` : ''}
                            ${emailFinanca ? `<p class="text-blue-700 break-all"><i class="fas fa-envelope text-blue-500 mr-1"></i>${emailFinanca}</p>` : ''}
                        </div>
                    ` : ''}
                    
                    <div class="flex gap-1 mb-2 flex-wrap text-xs">
                        ${iconeBoleto}
                        ${iconeComp}
                    </div>
                    ${txtBarras}
                    
                    <div class="border-t pt-2 mt-2">
                        <input type="checkbox" class="check-parcela mr-2" value="${p.id}">
                        <label class="text-xs text-slate-600">Selecionar para excluir</label>
                    </div>
                    
                    <div class="flex gap-2 mt-3">
                        <button onclick="prepararEdicao('${p.id}')" class="flex-1 bg-blue-100 text-blue-600 px-2 py-1.5 rounded hover:bg-blue-500 hover:text-white transition text-xs font-bold">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        ${botoesContato}
                    </div>
                </div>`;
            }).join('');
        }

        async function prepararEdicao(id) {
            const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id', id).single();
            if (p) {
                document.getElementById('f-editando-id').value = p.id;
                document.getElementById('f-editando-financa-id').value = p.financas.id;
                
                document.getElementById('f-desc').value = p.financas.descricao;
                document.getElementById('f-tipo').value = p.financas.tipo;
                document.getElementById('f-categoria').value = p.financas.categoria || 'Geral';
                document.getElementById('f-status').value = p.financas.status_lancamento || 'aberto';
                document.getElementById('f-telefone').value = p.financas.telefone || '';
                document.getElementById('f-email').value = p.financas.email || '';
                
                document.getElementById('f-tipo-calculo').value = 'parcela';
                ajustarLabelsValor();
                document.getElementById('f-valor').value = p.valor_parcela;
                document.getElementById('f-parcelas').value = 1;
                document.getElementById('f-parcelas').disabled = true; 
                document.getElementById('f-recorrencia').disabled = true;
                
                document.getElementById('f-vencimento').value = p.data_vencimento;
                document.getElementById('f-data-pagamento').value = p.data_pagamento || '';
                document.getElementById('f-barras').value = p.codigo_barra || '';
                
                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                
                // Muda para a aba de formulário automaticamente ao clicar em editar
                alternarAba('formulario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('f-editando-financa-id').value = '';
            document.getElementById('f-parcelas').disabled = false;
            document.getElementById('f-recorrencia').disabled = false;
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            document.getElementById('f-desc').value = '';
            document.getElementById('f-valor').value = '';
            document.getElementById('f-categoria').value = 'Geral';
            document.getElementById('f-telefone').value = '';
            document.getElementById('f-email').value = '';
            document.getElementById('f-vencimento').value = '';
            document.getElementById('f-data-pagamento').value = '';
            document.getElementById('f-barras').value = '';
            
            document.getElementById('nome-boleto').innerHTML = '';
            document.getElementById('nome-comprovante').innerHTML = '';
            document.getElementById('f-boleto').value = '';
            document.getElementById('f-comprovante').value = '';
            
            // Limpar áudio
            recordedAudioBlob = null;
            document.getElementById('audio-preview-obs').style.display = 'none';
            document.getElementById('btn-audio-obs').innerHTML = '<i class="fas fa-microphone"></i> Gravar Áudio';
            
            alternarAba('listagem');
        }

        function imprimirRelatorio() {
            const busca     = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;
            const inicio    = document.getElementById('filtro-inicio').value;
            const fim       = document.getElementById('filtro-fim').value;

            // Montar descrição dos filtros ativos
            const partes = [];
            if (busca)     partes.push(`Descrição: "${busca}"`);
            if (categoria) partes.push(`Categoria: ${categoria}`);
            if (inicio)    partes.push(`De: ${new Date(inicio + 'T12:00:00').toLocaleDateString('pt-br')}`);
            if (fim)       partes.push(`Até: ${new Date(fim + 'T12:00:00').toLocaleDateString('pt-br')}`);

            const infoFiltros = partes.length > 0 ? `Filtros: ${partes.join(' | ')}` : 'Filtros: Todos os lançamentos';
            const dataGeracao = `Gerado em: ${new Date().toLocaleString('pt-br')}`;

            document.getElementById('print-filtros-info').innerText = infoFiltros;
            document.getElementById('print-data-geracao').innerText = dataGeracao;

            window.print();
        }

        function toggleTodosChecks(source) {
            const checkboxes = document.querySelectorAll('.check-parcela');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
            if (selecionados.length === 0) return alert("Selecione ao menos uma parcela para excluir.");

            if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} parcela(s)?`)) {
                const { error } = await _supabase.from('parcelas').delete().in('id', selecionados);
                if (!error) {
                    alert('Excluído com sucesso!');
                    loadParcelas();
                } else {
                    alert('Erro ao excluir: ' + error.message);
                }
            }
        }

