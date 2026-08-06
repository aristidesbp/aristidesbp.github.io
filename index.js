
// ==========================================
// ESCOPO GLOBAL DA APLICAÇÃO (app.js)
// ==========================================

// ── Conexão Supabase ──────────────────────────────────────────────────
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZHlxY3Jhd3Btd2ptdGtkaWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMTUxMzAsImV4cCI6MjEwMTU5MTEzMH0.iyOsri9yjNrUzDAMF2EuDRGhEZznWRliN7GE_yuRiZ0';

    
const supabaseUrl = 'https://fwdyqcrawpmwjmtkdiba.supabase.co';
    
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ── FIX BUG 2: est_supabase estava comentado — definido aqui ──────────
const est_supabase = _supabase;

let usuarioLogadoId = null;
let paginaAtual = 1;
const itensPorPagina = 10;
let totalRegistros = 0;

// ── Sidebar Mobile ────────────────────────────────────────────────────
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const isVisible = sidebar.classList.contains('translate-x-0');
    if (isVisible) {
        sidebar.classList.replace('translate-x-0','-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.replace('-translate-x-full','translate-x-0');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// ── Dark Mode ─────────────────────────────────────────────────────────
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    document.getElementById('dark-icon').classList.toggle('hidden', isDark);
    document.getElementById('light-icon').classList.toggle('hidden', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
if (localStorage.getItem('theme')==='dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('dark-icon').classList.add('hidden');
    document.getElementById('light-icon').classList.remove('hidden');
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('.material-symbols-outlined');
    if (input.type === 'password') { input.type = 'text'; icon.innerText = 'visibility_off'; }
    else { input.type = 'password'; icon.innerText = 'visibility'; }
}

// ── Auth ──────────────────────────────────────────────────────────────
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    const telaLogin = document.getElementById('tela-login');
    const telaSistema = document.getElementById('tela-sistema');
    if (!session) {
        telaLogin.classList.remove('hidden');
        telaSistema.classList.add('hidden');
        usuarioLogadoId = null;
    } else {
        telaLogin.classList.add('hidden');
        telaSistema.classList.remove('hidden');
        usuarioLogadoId = session.user.id;
        document.getElementById('user-display-email').innerText = session.user.email;
        document.getElementById('user-display-name').innerText = session.user.user_metadata?.full_name || 'Usuário ERP';
        if (session.user.user_metadata?.avatar_url) {
            document.getElementById('user-avatar').src = session.user.user_metadata.avatar_url;
        }
        init();
    }
}

async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');
    if (!email || !senha) return alert("Credenciais obrigatórias.");
    btn.innerText = 'Autenticando...';
    btn.disabled = true;
    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
        alert("Falha na autenticação. Verifique suas credenciais.");
        btn.innerText = 'Autenticar Acesso';
        btn.disabled = false;
    } else {
        verificar_login();
    }
}

async function sairDaConta() {
    await _supabase.auth.signOut();
    verificar_login();
}



// ── Inicialização ─────────────────────────────────────────────────────
function init() {
    alternarAba('bem_vindo'); // garante aba inicial correta
    loadDashboard();
    loadEntidades();
}

document.addEventListener('DOMContentLoaded', () => {
    verificar_login();
    configurarDropZone('drop-foto','f-foto','nome-foto');
    // Atalho F8 para finalizar venda PDV
    window.addEventListener('keydown', e => {
        if (e.key === 'F8') { e.preventDefault(); if (typeof pdv_finalizarVenda === 'function') pdv_finalizarVenda(); }
    });
});




//#######################################################################
// ── Navegação entre abas ──────────────────────────────────────────────
// FIX BUG 2: agora dispara est_init() ao entrar no estoque
//#######################################################################
function alternarAba(abaAtiva) {
    const selectAba = document.getElementById('select-aba');
    if (selectAba) selectAba.value = abaAtiva;

    document.querySelectorAll('[id^="aba-"]').forEach(painel => {
        painel.classList.toggle('hidden', painel.id !== `aba-${abaAtiva}`);
    });

    if (abaAtiva === 'estoque')    { est_init(); }
    if (abaAtiva === 'entidades')  { loadDashboard(); loadEntidades(); }
    if (abaAtiva === 'financeiro') { fin_init(); }
    if (abaAtiva === 'pdv')        { pdv_init(); }
    // Se precisar de alguma ação ao abrir configurações, adicione aqui.
}




// ── FIX BUG 1: Sub-abas de Entidades (igual ao estoque) ──────────────
function ent_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('ent-painel-formulario');
    const painelLista = document.getElementById('ent-painel-listagem');
    const btnForm     = document.getElementById('ent-btn-formulario');
    const btnLista    = document.getElementById('ent-btn-listagem');

    const ativo   = ['bg-primary','text-white','hover:brightness-105'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];

    btnForm.classList.remove(...ativo,...inativo);
    btnLista.classList.remove(...ativo,...inativo);

    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}


    
// ==========================================
// MÓDULO DE ESTOQUE (estoque.js)
// ==========================================

let est_html5QrCode = null;

// Inicialização do módulo de estoque
async function est_init() {
    est_loadCategoriasUnicas();
    est_loadDashboard();
    est_loadProdutos();
    est_configurarDropZone();
}

// Alternância entre sub-abas do estoque (Listagem vs Formulário)
function est_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('est-painel-formulario');
    const painelLista = document.getElementById('est-painel-listagem');
    const btnForm     = document.getElementById('est-btn-formulario');
    const btnLista    = document.getElementById('est-btn-listagem');

    const ativo   = ['bg-emerald-500','text-white','hover:bg-emerald-600'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];

    if (!btnForm || !btnLista || !painelForm || !painelLista) return;

    btnForm.classList.remove(...ativo, ...inativo);
    btnLista.classList.remove(...ativo, ...inativo);

    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}

// Configuração da zona de arrastar e soltar (Drag and Drop) para imagens de produtos
function est_configurarDropZone() {
    const dropZone = document.getElementById('est-drop-foto');
    const inputEl  = document.getElementById('est-f-foto');
    if (!dropZone || !inputEl) return;
    
    dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('bg-slate-100'); });
    dropZone.addEventListener('dragleave', e => { e.preventDefault(); dropZone.classList.remove('bg-slate-100'); });
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('bg-slate-100');
        if (e.dataTransfer.files?.length > 0) {
            inputEl.files = e.dataTransfer.files;
            est_mostrarNomeArquivo(inputEl, 'est-nome-foto');
        }
    });
}

// Exibe o nome do arquivo anexado na interface
function est_mostrarNomeArquivo(input, idCampoTexto) {
    const campoTexto = document.getElementById(idCampoTexto);
    if (!campoTexto) return;
    if (input.files?.length > 0) {
        campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
    } else {
        campoTexto.innerHTML = '';
    }
}

// Carrega categorias únicas cadastradas na tabela de produtos
async function est_loadCategoriasUnicas() {
    const { data } = await _supabase.from('produtos').select('categoria');
    if (!data) return;
    const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
    const datalist   = document.getElementById('est-lista-categorias');
    const selectFiltro = document.getElementById('est-filtro-categoria');
    
    if (datalist) datalist.innerHTML = '';
    if (selectFiltro) selectFiltro.innerHTML = '<option value="">Todas</option>';
    
    categorias.forEach(cat => {
        if (datalist) datalist.innerHTML += `<option value="${cat}">`;
        if (selectFiltro) selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

// Inicia a leitura de código de barras via câmera
function est_iniciarLeituraCamera() {
    const container = document.getElementById('est-camera-container');
    if (!container) return;
    container.classList.remove('hidden');
    est_html5QrCode = new Html5Qrcode("est-camera-preview");
    est_html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 300, height: 150 } }, decodedText => {
        const campoBarras = document.getElementById('est-f-barras');
        if (campoBarras) campoBarras.value = decodedText;
        est_pararCamera();
    }).catch(() => {
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
        container.classList.add('hidden');
    });
}

// Para a leitura de código de barras pela câmera
function est_pararCamera() {
    const container = document.getElementById('est-camera-container');
    if (est_html5QrCode) {
        est_html5QrCode.stop().then(() => {
            if (container) container.classList.add('hidden');
        }).catch(() => {
            if (container) container.classList.add('hidden');
        });
    } else {
        if (container) container.classList.add('hidden');
    }
}

// Processa arquivo XML de NF-e para importação de estoque
async function est_processarXML(input) {
    const file = input.files[0];
    if (!file) return;
    const btnImport = document.getElementById('est-btn-importar-xml') || {};
    const textoOriginal = btnImport.innerHTML || '';
    if (btnImport.innerHTML !== undefined) { 
        btnImport.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Lendo XML...'; 
        btnImport.disabled = true; 
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const xmlDoc = new DOMParser().parseFromString(e.target.result, "text/xml");
            const itens  = xmlDoc.getElementsByTagName("det");
            if (itens.length === 0) { alert("Nenhum produto encontrado neste XML."); return; }

            let novos = 0, atualizados = 0;
            for (let i = 0; i < itens.length; i++) {
                const prod = itens[i].getElementsByTagName("prod")[0];
                if (!prod) continue;
                const nome  = prod.getElementsByTagName("xProd")[0]?.textContent || "";
                let ean     = prod.getElementsByTagName("cEAN")[0]?.textContent || "";
                if (ean === "SEM GTIN") ean = null;
                const custo = parseFloat(prod.getElementsByTagName("vUnCom")[0]?.textContent || 0);
                const qtd   = parseInt(parseFloat(prod.getElementsByTagName("qCom")[0]?.textContent || 0));

                let q = _supabase.from('produtos').select('*');
                q = ean ? q.eq('codigo_barras', ean) : q.eq('nome', nome);
                const { data: existente } = await q.maybeSingle();

                if (existente) {
                    await _supabase.from('produtos').update({
                        quantidade_estoque: parseInt(existente.quantidade_estoque || 0) + qtd, 
                        preco_custo: custo
                    }).eq('id', existente.id);
                    atualizados++;
                } else {
                    await _supabase.from('produtos').insert([{
                        nome, 
                        codigo_barras: ean, 
                        preco_custo: custo, 
                        preco_venda: custo * 1.3, 
                        quantidade_estoque: qtd, 
                        estoque_minimo: 5, 
                        categoria: 'Geral'
                    }]);
                    novos++;
                }
            }
            alert(`NF-e importada!\n✅ Novos: ${novos}\n🔄 Atualizados: ${atualizados}`);
            input.value = '';
            est_loadProdutos(); 
            est_loadDashboard();
        } catch(err) {
            alert("Erro ao processar XML: " + err.message);
        } finally {
            if (btnImport.innerHTML !== undefined) { 
                btnImport.innerHTML = textoOriginal; 
                btnImport.disabled = false; 
            }
        }
    };
    reader.readAsText(file);
}

// Atualiza os contadores do Dashboard de Estoque
async function est_loadDashboard() {
    const { data: produtos } = await _supabase.from('produtos').select('*');
    if (!produtos) return;
    let totalCadastrados = produtos.length, estoqueBaixo = 0, totalItens = 0;
    produtos.forEach(p => {
        const est = parseInt(p.quantidade_estoque || 0);
        const min = parseInt(p.estoque_minimo || 0);
        totalItens += est;
        if (est <= min) estoqueBaixo++;
    });
    
    const elTot = document.getElementById('est-dash-total-produtos');
    const elBaixo = document.getElementById('est-dash-estoque-baixo');
    const elItens = document.getElementById('est-dash-total-itens');

    if (elTot) elTot.innerText = totalCadastrados;
    if (elBaixo) elBaixo.innerText = estoqueBaixo;
    if (elItens) elItens.innerText = totalItens;
}

// Salva ou atualiza um produto completo no Supabase
async function est_salvarProdutoCompleto() {
    const btn = document.getElementById('est-btn-salvar');
    if (btn) { btn.disabled = true; btn.innerText = 'Salvando...'; }
    try {
        const nome       = document.getElementById('est-f-nome').value;
        const categoria  = document.getElementById('est-f-categoria').value || 'Geral';
        const estoqueMin = parseInt(document.getElementById('est-f-estoque-minimo').value) || 0;
        const precoCusto = parseFloat(document.getElementById('est-f-custo').value) || 0;
        const precoVenda = parseFloat(document.getElementById('est-f-venda').value);
        const quantidade = parseInt(document.getElementById('est-f-quantidade').value) || 0;
        const descricao  = document.getElementById('est-f-descricao').value;
        const barras     = document.getElementById('est-f-barras').value;
        const fileFoto   = document.getElementById('est-f-foto').files[0];
        const editandoId = document.getElementById('est-f-editando-id').value;

        if (!nome || isNaN(precoVenda)) throw new Error("Preencha o Nome e o Preço de Venda!");

        let fotoUrl = null;
        if (fileFoto) {
            const fileName = `prod_${Date.now()}_${fileFoto.name}`;
            const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
            if (!error) {
                fotoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
            }
        }

        const dados = { 
            nome, 
            categoria, 
            estoque_minimo: estoqueMin, 
            preco_custo: precoCusto, 
            preco_venda: precoVenda, 
            quantidade_estoque: quantidade, 
            descricao, 
            codigo_barras: barras || null 
        };
        if (fotoUrl) dados.foto_url = fotoUrl;

        if (editandoId) {
            const { error } = await _supabase.from('produtos').update(dados).eq('id', editandoId);
            if (error) throw error;
            alert("Produto atualizado!");
        } else {
            const { error } = await _supabase.from('produtos').insert([dados]);
            if (error) throw error;
            alert("Produto cadastrado!");
        }

        est_cancelarEdicao();
        est_loadProdutos();
        est_loadDashboard();
        est_alternarSubAba('listagem');
    } catch(error) {
        alert(error.message);
    } finally {
        if (btn) { 
            btn.disabled = false; 
            btn.innerHTML = '<i class="fas fa-save"></i> Gravar Produto'; 
        }
    }
}

// Limpa os campos de filtro da listagem
function est_limparFiltros() {
    const filtroBusca = document.getElementById('est-filtro-busca');
    const filtroCat = document.getElementById('est-filtro-categoria');
    if (filtroBusca) filtroBusca.value = '';
    if (filtroCat) filtroCat.value = '';
    est_loadProdutos();
}

// Carrega e renderiza a tabela de produtos com filtros aplicados
async function est_loadProdutos() {
    const busca     = document.getElementById('est-filtro-busca')?.value    || '';
    const categoria = document.getElementById('est-filtro-categoria')?.value || '';

    let query = _supabase.from('produtos').select('*').order('nome', { ascending: true });
    if (busca)     query = query.or(`nome.ilike.%${busca}%,codigo_barras.ilike.%${busca}%`);
    if (categoria) query = query.eq('categoria', categoria);

    const { data, error } = await query;
    if (error) return;

    const tbody = document.getElementById('est-lista-produtos');
    if (!tbody) return;

    tbody.innerHTML = data.map(p => {
        const estoque = parseInt(p.quantidade_estoque || 0);
        const minimo  = parseInt(p.estoque_minimo || 0);
        let statusClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300';
        let statusTxt   = 'EM ESTOQUE';
        if (estoque === 0)       { statusClass = 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 animate-pulse'; statusTxt = 'ZERADO'; }
        else if (estoque <= minimo){ statusClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300';       statusTxt = 'ESTOQUE BAIXO'; }

        const imgHtml   = p.foto_url
            ? `<img src="${p.foto_url}" class="w-10 h-10 object-cover rounded shadow-sm inline-block mr-2">`
            : `<div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-slate-400 inline-block mr-2 text-xs"><i class="fas fa-box"></i></div>`;
        const codBarras = p.codigo_barras
            ? `<span class="text-xs font-mono text-slate-400 block"><i class="fas fa-barcode"></i> ${p.codigo_barras}</span>`
            : '<span class="text-xs text-slate-300 dark:text-slate-500 block">Sem código</span>';

        return `
        <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
          <td class="p-3 text-center"><input type="checkbox" class="est-check-parcela" value="${p.id}"></td>
          <td class="p-3 flex items-center">${imgHtml}<div>${codBarras}</div></td>
          <td class="p-3">
            <div class="font-bold text-slate-700 dark:text-white">${p.nome}</div>
            <span class="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">${p.categoria || 'Geral'}</span>
          </td>
          <td class="p-3 font-bold text-slate-600 dark:text-slate-300">R$ ${parseFloat(p.preco_custo || 0).toFixed(2)}</td>
          <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</td>
          <td class="p-3 font-bold text-center text-slate-700 dark:text-white">${estoque} <span class="text-xs text-slate-400 font-normal block">mín: ${minimo}</span></td>
          <td class="p-3 text-center"><span class="px-2.5 py-1 rounded text-xs font-bold ${statusClass}">${statusTxt}</span></td>
          <td class="p-3 text-center">
            <button onclick="est_prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition text-sm">
              <i class="fas fa-edit"></i> Editar
            </button>
          </td>
        </tr>`;
    }).join('');
}

// Preenche o formulário para edição de um produto existente
async function est_prepararEdicao(id) {
    const { data: p } = await _supabase.from('produtos').select('*').eq('id', id).single();
    if (p) {
        document.getElementById('est-f-editando-id').value       = p.id;
        document.getElementById('est-f-nome').value              = p.nome;
        document.getElementById('est-f-categoria').value         = p.categoria || 'Geral';
        document.getElementById('est-f-estoque-minimo').value    = p.estoque_minimo;
        document.getElementById('est-f-custo').value             = p.preco_custo;
        document.getElementById('est-f-venda').value             = p.preco_venda;
        document.getElementById('est-f-quantidade').value        = p.quantidade_estoque;
        document.getElementById('est-f-descricao').value         = p.descricao || '';
        document.getElementById('est-f-barras').value            = p.codigo_barras || '';
        
        const btnSalvar = document.getElementById('est-btn-salvar');
        const btnCancelar = document.getElementById('est-btn-cancelar');
        if (btnSalvar) btnSalvar.innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Produto';
        if (btnCancelar) btnCancelar.classList.remove('hidden');
        
        est_alternarSubAba('formulario');
    }
}

// Reseta o formulário de estoque e cancela o modo de edição
function est_cancelarEdicao() {
    const editandoId = document.getElementById('est-f-editando-id');
    const btnSalvar = document.getElementById('est-btn-salvar');
    const btnCancelar = document.getElementById('est-btn-cancelar');
    
    if (editandoId) editandoId.value = '';
    if (btnSalvar) btnSalvar.innerHTML = '<i class="fas fa-save"></i> Gravar Produto';
    if (btnCancelar) btnCancelar.classList.add('hidden');
    
    document.getElementById('est-f-nome').value           = '';
    document.getElementById('est-f-categoria').value      = 'Geral';
    document.getElementById('est-f-estoque-minimo').value = '5';
    document.getElementById('est-f-custo').value          = '0.00';
    document.getElementById('est-f-venda').value          = '';
    document.getElementById('est-f-quantidade').value     = '0';
    document.getElementById('est-f-descricao').value      = '';
    document.getElementById('est-f-barras').value         = '';
    document.getElementById('est-f-foto').value           = '';
    
    const nomeFoto = document.getElementById('est-nome-foto');
    if (nomeFoto) nomeFoto.innerHTML = '';
}

// Seleciona ou desmarca todos os checkboxes da tabela de estoque
function est_toggleTodosChecks(source) {
    document.querySelectorAll('.est-check-parcela').forEach(cb => cb.checked = source.checked);
}

// Exclui os produtos selecionados por checkbox
async function est_excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.est-check-parcela:checked')).map(cb => cb.value);
    if (ids.length === 0) return alert("Selecione ao menos um produto para excluir.");
    if (confirm(`Deseja excluir ${ids.length} produto(s)?`)) {
        const { error } = await _supabase.from('produtos').delete().in('id', ids);
        if (!error) { 
            alert('Excluído com sucesso!'); 
            est_loadProdutos(); 
            est_loadDashboard(); 
        } else { 
            alert('Erro ao excluir: ' + error.message); 
        }
    }
}


    
// ── Inicialização ─────────────────────────────────────────────────────
function init() {
    alternarAba('entidades'); // garante aba inicial correta
    loadDashboard();
    loadEntidades();
}

// ── Drop Zone de Foto (Entidades) ─────────────────────────────────────
function configurarDropZone(dropId, inputId, txtId) {
    const dropZone = document.getElementById(dropId);
    const inputEl  = document.getElementById(inputId);
    if (!dropZone || !inputEl) return;
    dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', e => { e.preventDefault(); dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files?.length > 0) {
            inputEl.files = e.dataTransfer.files;
            mostrarNomeArquivo(inputEl, txtId);
        }
    });
}

function mostrarNomeArquivo(input, idCampoTexto) {
    const campoTexto = document.getElementById(idCampoTexto);
    if (input.files?.length > 0) {
        campoTexto.style.display = 'inline-flex';
        campoTexto.innerHTML = `<span class="material-symbols-outlined text-sm">verified</span> ${input.files[0].name}`;
    } else {
        campoTexto.style.display = 'none';
        campoTexto.innerHTML = '';
    }
}

// ── Busca de CEP ──────────────────────────────────────────────────────
async function buscarCEP(cep) {
    const limpo = cep.replace(/\D/g,'');
    if (limpo.length !== 8) return;
    try {
        const res  = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
            document.getElementById('f-logradouro').value = data.logradouro;
            document.getElementById('f-bairro').value     = data.bairro;
            document.getElementById('f-cidade').value     = data.localidade;
            document.getElementById('f-estado').value     = data.uf;
            document.getElementById('f-numero').focus();
        }
    } catch(e) { console.error("CEP fetch error"); }
}

// ── Dashboard de Entidades ────────────────────────────────────────────
async function loadDashboard() {
    const { data } = await _supabase.from('entidades').select('tipo_entidade,status_entidade');
    if (!data) return;
    let clientes=0, fornecedores=0, inativos=0;
    data.forEach(e => {
        if (e.status_entidade==='inativo') inativos++;
        if (e.tipo_entidade==='cliente')   clientes++;
        if (e.tipo_entidade==='fornecedor') fornecedores++;
    });
    document.getElementById('dash-clientes').innerText    = clientes;
    document.getElementById('dash-fornecedores').innerText = fornecedores;
    document.getElementById('dash-inativos').innerText    = inativos;
}

// ── Paginação ─────────────────────────────────────────────────────────
function mudarPagina(direcao) {
    const nova = paginaAtual + direcao;
    const total = Math.ceil(totalRegistros / itensPorPagina);
    if (nova >= 1 && (totalRegistros === 0 || nova <= total)) {
        paginaAtual = nova;
        loadEntidades();
    }
}

// ── PDF ───────────────────────────────────────────────────────────────
function gerarPDF() {
    alert("Preparando PDF das entidades filtradas para download.");
}

// ── CRUD de Entidades ─────────────────────────────────────────────────
async function salvarEntidade() {
    const btn = document.getElementById('btn-salvar');
    btn.disabled = true; btn.innerText = 'Gravando...';
    try {
        const id         = document.getElementById('f-editando-id').value;
        const nome       = document.getElementById('f-nome').value;
        const cpf        = document.getElementById('f-cpf').value;
        const nascimento = document.getElementById('f-nascimento').value || null;
        const email      = document.getElementById('f-email').value;
        const telefone   = document.getElementById('f-telefone').value;
        const tipo       = document.getElementById('f-tipo-entidade').value;
        const status     = document.getElementById('f-status').value;
        const cep        = document.getElementById('f-cep').value;
        const logradouro = document.getElementById('f-logradouro').value;
        const numero     = document.getElementById('f-numero').value;
        const bairro     = document.getElementById('f-bairro').value;
        const city       = document.getElementById('f-cidade').value;
        const state      = document.getElementById('f-estado').value;
        const fileFoto   = document.getElementById('f-foto').files[0];

        if (!nome) throw new Error("O Nome Completo é obrigatório.");

        let fotoUrlFinal = null;
        if (fileFoto) {
            const fileName = `avatar_${Date.now()}_${fileFoto.name}`;
            const { error: uploadError } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
            if (!uploadError) {
                fotoUrlFinal = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
            }
        }

        const payload = {
            nome_completo: nome, cpf, data_nascimento: nascimento, email, telefone,
            tipo_entidade: tipo, status_entidade: status, cep, logradouro, numero,
            bairro, cidade: city, estado: state, user_id: usuarioLogadoId
        };
        if (fotoUrlFinal) payload.foto_url = fotoUrlFinal;

        if (id) {
            const { error } = await _supabase.from('entidades').update(payload).eq('id', id);
            if (error) throw error;
            alert("Registro sincronizado.");
        } else {
            const { error } = await _supabase.from('entidades').insert([payload]);
            if (error) throw error;
            alert("Nova entidade integrada.");
        }

        cancelarEdicao();
        loadDashboard();
        loadEntidades();
        ent_alternarSubAba('listagem');
    } catch(error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">save</span> Confirmar Registro';
    }
}

async function loadEntidades() {
    const busca = document.getElementById('filtro-busca').value;
    const tipo  = document.getElementById('filtro-tipo').value;

    let countQuery = _supabase.from('entidades').select('*',{count:'exact',head:true});
    if (busca) countQuery = countQuery.ilike('nome_completo',`%${busca}%`);
    if (tipo)  countQuery = countQuery.eq('tipo_entidade', tipo);
    const { count } = await countQuery;
    totalRegistros = count || 0;

    let query = _supabase.from('entidades').select('*').order('nome_completo',{ascending:true});
    if (busca) query = query.ilike('nome_completo',`%${busca}%`);
    if (tipo)  query = query.eq('tipo_entidade', tipo);
    const start = (paginaAtual - 1) * itensPorPagina;
    query = query.range(start, start + itensPorPagina - 1);

    const { data, error } = await query;
    if (error) return;

    const totalPaginas = Math.ceil(totalRegistros / itensPorPagina);
    document.getElementById('page-indicator').innerText    = `Página ${paginaAtual} de ${totalPaginas || 1}`;
    document.getElementById('pagination-info').innerText   = `Mostrando ${data.length} de ${totalRegistros}`;
    document.getElementById('btn-anterior').disabled       = paginaAtual === 1;
    document.getElementById('btn-proximo').disabled        = paginaAtual >= totalPaginas;

    const grid = document.getElementById('lista-entidades-grid');
    if (data.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-20 text-center text-slate-400 font-bold">Nenhum registro encontrado.</div>';
        return;
    }

    grid.innerHTML = data.map(e => {
        const statusColor  = e.status_entidade === 'ativo' ? 'bg-emerald-500' : 'bg-slate-300';
        const imgUrl       = e.foto_url || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(e.nome_completo);
        const whatsappUrl  = `https://wa.me/${(e.telefone||'').replace(/\D/g,'')}`;
        const mailtoUrl    = `mailto:${e.email}`;
        return `
        <div class="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col items-center group relative">
          <div class="absolute top-3 left-3 z-10">
            <input type="checkbox" class="check-entidade w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-white dark:bg-slate-800" value="${e.id}">
          </div>
          <div class="relative mb-4">
            <img src="${imgUrl}" class="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 dark:border-slate-700 shadow-sm">
            <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 ${statusColor}"></div>
          </div>
          <div class="text-center w-full mb-6">
            <span class="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">${e.tipo_entidade}</span>
            <h4 class="font-bold text-slate-900 dark:text-white truncate px-2 mb-1" title="${e.nome_completo}">${e.nome_completo}</h4>
            <p class="text-xs text-slate-400 truncate px-4">${e.email || 'Sem e-mail'}</p>
            <p class="text-[11px] text-slate-500 mt-1 font-mono-sm">${e.telefone || '---'}</p>
          </div>
          <div class="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 w-full justify-center">
            <button onclick="window.open('${whatsappUrl}','_blank')" class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="WhatsApp">
              <span class="material-symbols-outlined text-lg">chat</span>
            </button>
            <a href="${mailtoUrl}" class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="E-mail">
              <span class="material-symbols-outlined text-lg">mail</span>
            </a>
            <button onclick="prepararEdicao('${e.id}')" class="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm" title="Editar">
              <span class="material-symbols-outlined text-lg">edit_square</span>
            </button>
          </div>
        </div>`;
    }).join('');
}

async function prepararEdicao(id) {
    const { data: e } = await _supabase.from('entidades').select('*').eq('id', id).single();
    if (e) {
        document.getElementById('f-editando-id').value   = e.id;
        document.getElementById('f-nome').value          = e.nome_completo;
        document.getElementById('f-cpf').value           = e.cpf || '';
        document.getElementById('f-nascimento').value    = e.data_nascimento || '';
        document.getElementById('f-email').value         = e.email || '';
        document.getElementById('f-telefone').value      = e.telefone || '';
        document.getElementById('f-tipo-entidade').value = e.tipo_entidade;
        document.getElementById('f-status').value        = e.status_entidade;
        document.getElementById('f-cep').value           = e.cep || '';
        document.getElementById('f-logradouro').value    = e.logradouro || '';
        document.getElementById('f-numero').value        = e.numero || '';
        document.getElementById('f-bairro').value        = e.bairro || '';
        document.getElementById('f-cidade').value        = e.cidade || '';
        document.getElementById('f-estado').value        = e.estado || '';
        document.getElementById('f-foto').value          = '';

        const fotoTxt = document.getElementById('nome-foto');
        if (e.foto_url) { fotoTxt.style.display='inline-flex'; fotoTxt.innerHTML='<span class="material-symbols-outlined text-sm">image</span> Mídia anexada'; }
        else { fotoTxt.style.display='none'; }

        document.getElementById('btn-salvar').innerHTML = '<span class="material-symbols-outlined">sync</span> Atualizar Registro';
        document.getElementById('btn-cancelar').classList.remove('hidden');

        ent_alternarSubAba('formulario');
    }
}

function cancelarEdicao() {
    document.getElementById('f-editando-id').value = '';
    document.getElementById('btn-salvar').innerHTML = '<span class="material-symbols-outlined">save</span> Confirmar Registro';
    document.getElementById('btn-cancelar').classList.add('hidden');

    document.querySelectorAll('#ent-painel-formulario input, #ent-painel-formulario select').forEach(i => {
        if (i.type !== 'hidden') i.value = '';
    });
    document.getElementById('f-tipo-entidade').value = 'cliente';
    document.getElementById('f-status').value        = 'ativo';
    document.getElementById('nome-foto').style.display = 'none';
    document.getElementById('nome-foto').innerHTML   = '';

    ent_alternarSubAba('listagem');
}

function toggleTodosChecks(source) {
    document.querySelectorAll('.check-entidade').forEach(cb => cb.checked = source.checked);
}

async function excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.check-entidade:checked')).map(cb => cb.value);
    if (ids.length === 0) return alert("Selecione registros para excluir.");
    if (confirm(`Confirmar exclusão de ${ids.length} registro(s)?`)) {
        const { error } = await _supabase.from('entidades').delete().in('id', ids);
        if (!error) { alert("Registros excluídos."); paginaAtual=1; loadDashboard(); loadEntidades(); }
        else { alert("Erro: " + error.message); }
    }
}

function limparFiltros() {
    document.getElementById('filtro-busca').value = '';
    document.getElementById('filtro-tipo').value  = '';
    paginaAtual = 1;
    loadEntidades();
}
</script>
<script>
let fin_entidadesCache    = [];
let fin_html5QrCode       = null;
let fin_listenerSetup     = false; // evita registrar addEventListener múltiplas vezes

async function fin_init() {
    fin_loadEntidades();
    fin_loadCategoriasUnicas();
    fin_loadDashboard();
    fin_loadParcelas();
    fin_configurarDropZone('fin-drop-boleto','fin-f-boleto','fin-nome-boleto');
    fin_configurarDropZone('fin-drop-comprovante','fin-f-comprovante','fin-nome-comprovante');
    // Autocomplete de entidades (registra só uma vez)
    if (!fin_listenerSetup) {
        const inputBusca   = document.getElementById('fin-f-entidade-busca');
        const listaDropdown = document.getElementById('fin-lista-entidades');
        const inputId      = document.getElementById('fin-f-entidade-id');
        if (inputBusca) {
            inputBusca.addEventListener('input', e => {
                const termo = e.target.value.toLowerCase();
                listaDropdown.innerHTML = '';
                if (!termo) { listaDropdown.classList.add('hidden'); inputId.value=''; return; }
                const filtradas = fin_entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
                if (filtradas.length > 0) {
                    listaDropdown.classList.remove('hidden');
                    filtradas.forEach(ent => {
                        const li = document.createElement('li');
                        li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0 dark:hover:bg-slate-700';
                        li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                        li.onclick = () => { inputBusca.value = ent.nome_completo; inputId.value = ent.id; listaDropdown.classList.add('hidden'); };
                        listaDropdown.appendChild(li);
                    });
                } else { listaDropdown.classList.add('hidden'); inputId.value=''; }
            });
            fin_listenerSetup = true;
        }
    }
}

function fin_alternarSubAba(subAba) {
    const form   = document.getElementById('fin-aba-formulario');
    const lista  = document.getElementById('fin-aba-listagem');
    const btnF   = document.getElementById('fin-btn-aba-formulario');
    const btnL   = document.getElementById('fin-btn-aba-listagem');
    const verde  = ['bg-primary','text-white','hover:brightness-105'];
    const cinza  = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];
    btnF.classList.remove(...verde,...cinza); btnL.classList.remove(...verde,...cinza);
    if (subAba === 'formulario') {
        form.classList.remove('hidden'); lista.classList.add('hidden');
        btnF.classList.add(...verde);   btnL.classList.add(...cinza);
    } else {
        form.classList.add('hidden');   lista.classList.remove('hidden');
        btnL.classList.add(...verde);   btnF.classList.add(...cinza);
    }
}

function fin_ajustarLabelsValor() {
    const tipo = document.getElementById('fin-f-tipo-calculo').value;
    document.getElementById('fin-label-valor').innerText = tipo === 'total' ? 'Valor Total (R$) *' : 'Valor da Parcela (R$) *';
}

async function fin_loadEntidades() {
    const { data } = await _supabase.from('entidades').select('id, nome_completo');
    if (data) fin_entidadesCache = data;
}

async function fin_loadCategoriasUnicas() {
    const { data } = await _supabase.from('financas').select('categoria');
    if (!data) return;
    const cats = [...new Set(data.map(i => i.categoria).filter(c => c))];
    const dl   = document.getElementById('fin-lista-categorias');
    const sel  = document.getElementById('fin-filtro-categoria');
    dl.innerHTML  = '';
    sel.innerHTML = '<option value="">Todas</option>';
    cats.forEach(c => { dl.innerHTML += `<option value="${c}">`; sel.innerHTML += `<option value="${c}">${c}</option>`; });
}

async function fin_loadDashboard() {
    const { data: parcelas } = await _supabase.from('parcelas').select('*, financas(tipo)');
    if (!parcelas) return;
    let receita=0, despesa=0, pendente=0;
    parcelas.forEach(p => {
        const v = parseFloat(p.valor_parcela||0);
        if (p.status==='pago') { p.financas?.tipo==='receita' ? receita+=v : despesa+=v; }
        else { pendente+=v; }
    });
    const fmt = n => `R$ ${n.toLocaleString('pt-br',{minimumFractionDigits:2})}`;
    document.getElementById('fin-dash-receita').innerText  = fmt(receita);
    document.getElementById('fin-dash-despesa').innerText  = fmt(despesa);
    document.getElementById('fin-dash-pendente').innerText = fmt(pendente);
}

async function fin_gerarLancamentoCompleto() {
    const btn = document.getElementById('fin-btn-salvar');
    btn.disabled=true; btn.innerText='Salvando...';
    try {
        const desc          = document.getElementById('fin-f-desc').value;
        const tipoCalculo   = document.getElementById('fin-f-tipo-calculo').value;
        const valorInput    = parseFloat(document.getElementById('fin-f-valor').value);
        const tipo          = document.getElementById('fin-f-tipo').value;
        const categoria     = document.getElementById('fin-f-categoria').value || 'Geral';
        const statusLanc    = document.getElementById('fin-f-status').value;
        const qtd           = parseInt(document.getElementById('fin-f-parcelas').value);
        const recorrencia   = document.getElementById('fin-f-recorrencia').value;
        const dataVenc      = document.getElementById('fin-f-vencimento').value;
        const dataPag       = document.getElementById('fin-f-data-pagamento').value;
        const entidade      = document.getElementById('fin-f-entidade-id').value || null;
        const barras        = document.getElementById('fin-f-barras').value;
        const fileBoleto    = document.getElementById('fin-f-boleto').files[0];
        const fileComp      = document.getElementById('fin-f-comprovante').files[0];
        const editandoId    = document.getElementById('fin-f-editando-id').value;
        const financaId     = document.getElementById('fin-f-editando-financa-id').value;

        if (!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

        let valorTotal, valorParcela;
        if (tipoCalculo==='total') { valorTotal=valorInput; valorParcela=(valorTotal/qtd).toFixed(2); }
        else { valorParcela=valorInput; valorTotal=(valorParcela*qtd).toFixed(2); }

        let boletoUrl=null, comprovanteUrl=null;
        const uploadFile = async (file, prefix) => {
            const fn = `${prefix}_${Date.now()}_${file.name}`;
            const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fn}`, file);
            return error ? null : _supabase.storage.from('comprovantes').getPublicUrl(`public/${fn}`).data.publicUrl;
        };
        if (fileBoleto) boletoUrl    = await uploadFile(fileBoleto,'bol');
        if (fileComp)   comprovanteUrl = await uploadFile(fileComp,'comp');

        if (editandoId) {
            await _supabase.from('financas').update({ descricao:desc, tipo, categoria, status_lancamento:statusLanc, entidade_id:entidade }).eq('id',financaId);
            const upd = { valor_parcela:valorParcela, data_vencimento:dataVenc, status:dataPag?'pago':'pendente', data_pagamento:dataPag||null, codigo_barra:barras };
            if (boletoUrl)      upd.boleto_url      = boletoUrl;
            if (comprovanteUrl) upd.comprovante_url = comprovanteUrl;
            const { error } = await _supabase.from('parcelas').update(upd).eq('id',editandoId);
            if (error) throw error;
            alert("Parcela atualizada!");
        } else {
            const { data: fin, error: errF } = await _supabase.from('financas').insert([{
                descricao:desc, valor_total:valorTotal, tipo, categoria, status_lancamento:statusLanc, num_parcelas:qtd, entidade_id:entidade
            }]).select().single();
            if (errF) throw errF;
            const parcelas = [];
            for (let i=1; i<=qtd; i++) {
                let venc = new Date(dataVenc+'T12:00:00');
                if (recorrencia==='diario') venc.setDate(venc.getDate()+(i-1));
                else venc.setMonth(venc.getMonth()+((i-1)*parseInt(recorrencia)));
                parcelas.push({ financa_id:fin.id, num_parcela:i, valor_parcela:valorParcela, data_vencimento:venc.toISOString().split('T')[0], status:dataPag?'pago':'pendente', data_pagamento:dataPag||null, codigo_barra:barras, boleto_url:boletoUrl, comprovante_url:comprovanteUrl });
            }
            const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
            if (errP) throw errP;
            alert("Lançamento salvo!");
        }
        fin_cancelarEdicao();
        fin_loadParcelas();
        fin_loadDashboard();
        fin_alternarSubAba('listagem');
    } catch(error) { alert(error.message); }
    finally { btn.disabled=false; btn.innerHTML='<i class="fas fa-save"></i> Gravar Lançamento'; }
}

async function fin_loadParcelas() {
    const busca    = document.getElementById('fin-filtro-busca').value;
    const cat      = document.getElementById('fin-filtro-categoria').value;
    const inicio   = document.getElementById('fin-filtro-inicio').value;
    const fim      = document.getElementById('fin-filtro-fim').value;
    let q = _supabase.from('parcelas').select('*, financas!inner(descricao,tipo,categoria,num_parcelas)').order('data_vencimento',{ascending:true});
    if (busca)  q = q.ilike('financas.descricao',`%${busca}%`);
    if (cat)    q = q.eq('financas.categoria',cat);
    if (inicio) q = q.gte('data_vencimento',inicio);
    if (fim)    q = q.lte('data_vencimento',fim);
    const { data, error } = await q;
    if (error) return;
    const tbody = document.getElementById('fin-lista-parcelas');
    const hoje  = new Date().toISOString().split('T')[0];
    tbody.innerHTML = data.map(p => {
        let sc = p.status==='pago' ? 'status-pago' : 'status-pendente';
        let st = p.status.toUpperCase();
        if (p.status==='pendente' && p.data_vencimento < hoje) { sc='status-atrasado'; st='ATRASADO'; }
        const dtVenc = new Date(p.data_vencimento+'T12:00:00').toLocaleDateString('pt-br');
        const dtPag  = p.data_pagamento ? new Date(p.data_pagamento+'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';
        const iBoleto = p.boleto_url     ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 bg-blue-50 px-2 py-1 rounded text-xs"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
        const iComp   = p.comprovante_url? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 bg-emerald-50 px-2 py-1 rounded text-xs"><i class="fas fa-receipt"></i> Recibo</a>` : '';
        const tBarras = p.codigo_barra   ? `<div class="text-gray-400 font-mono text-[10px] mt-1 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';
        return `<tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
          <td class="p-3 text-center"><input type="checkbox" class="fin-check-parcela" value="${p.id}"></td>
          <td class="p-3"><div class="text-slate-800 dark:text-white font-bold">${dtVenc}</div><div class="text-xs text-slate-500 mt-1">${dtPag}</div></td>
          <td class="p-3"><div class="font-bold text-slate-700 dark:text-slate-200 mb-1">${p.financas.descricao} <span class="text-[10px] bg-gray-200 text-gray-600 px-1 rounded">${p.financas.categoria||'Geral'}</span></div><div class="flex gap-1 mb-1">${iBoleto}${iComp}</div>${tBarras}</td>
          <td class="p-3 font-bold text-slate-600 dark:text-slate-300">${p.num_parcela}/${p.financas.num_parcelas}</td>
          <td class="p-3 font-bold ${p.financas.tipo==='receita'?'text-emerald-600':'text-red-600'}">R$ ${parseFloat(p.valor_parcela).toFixed(2)}</td>
          <td class="p-3 text-center"><span class="${sc}">${st}</span></td>
          <td class="p-3 text-center"><button onclick="fin_prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm"><i class="fas fa-edit"></i> Editar</button></td>
        </tr>`;
    }).join('');
}

async function fin_prepararEdicao(id) {
    const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id',id).single();
    if (p) {
        document.getElementById('fin-f-editando-id').value          = p.id;
        document.getElementById('fin-f-editando-financa-id').value  = p.financas.id;
        document.getElementById('fin-f-desc').value                 = p.financas.descricao;
        document.getElementById('fin-f-tipo').value                 = p.financas.tipo;
        document.getElementById('fin-f-categoria').value            = p.financas.categoria||'Geral';
        document.getElementById('fin-f-status').value               = p.financas.status_lancamento||'aberto';
        document.getElementById('fin-f-tipo-calculo').value         = 'parcela';
        fin_ajustarLabelsValor();
        document.getElementById('fin-f-valor').value                = p.valor_parcela;
        document.getElementById('fin-f-parcelas').value             = 1;
        document.getElementById('fin-f-parcelas').disabled          = true;
        document.getElementById('fin-f-recorrencia').disabled       = true;
        document.getElementById('fin-f-vencimento').value           = p.data_vencimento;
        document.getElementById('fin-f-data-pagamento').value       = p.data_pagamento||'';
        document.getElementById('fin-f-barras').value               = p.codigo_barra||'';
        document.getElementById('fin-btn-salvar').innerHTML         = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
        document.getElementById('fin-btn-cancelar').classList.remove('hidden');
        fin_alternarSubAba('formulario');
    }
}

function fin_cancelarEdicao() {
    ['fin-f-editando-id','fin-f-editando-financa-id'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fin-f-parcelas').disabled    = false;
    document.getElementById('fin-f-recorrencia').disabled = false;
    document.getElementById('fin-btn-salvar').innerHTML   = '<i class="fas fa-save"></i> Gravar Lançamento';
    document.getElementById('fin-btn-cancelar').classList.add('hidden');
    ['fin-f-desc','fin-f-valor','fin-f-vencimento','fin-f-data-pagamento','fin-f-barras'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fin-f-categoria').value = 'Geral';
    document.getElementById('fin-nome-boleto').innerHTML      = '';
    document.getElementById('fin-nome-comprovante').innerHTML = '';
}

function fin_toggleTodosChecks(src) { document.querySelectorAll('.fin-check-parcela').forEach(cb => cb.checked=src.checked); }

async function fin_excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.fin-check-parcela:checked')).map(cb => cb.value);
    if (!ids.length) return alert("Selecione ao menos uma parcela.");
    if (confirm(`Excluir ${ids.length} parcela(s)?`)) {
        const { error } = await _supabase.from('parcelas').delete().in('id',ids);
        if (!error) { alert('Excluído!'); fin_loadParcelas(); fin_loadDashboard(); }
        else alert('Erro: '+error.message);
    }
}

function fin_limparFiltros() {
    ['fin-filtro-busca','fin-filtro-inicio','fin-filtro-fim'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fin-filtro-categoria').value='';
    fin_loadParcelas();
}

function fin_iniciarLeituraCamera() {
    const c = document.getElementById('fin-camera-container');
    c.classList.remove('hidden');
    fin_html5QrCode = new Html5Qrcode("fin-camera-preview");
    fin_html5QrCode.start({facingMode:"environment"},{fps:10,qrbox:{width:300,height:150}},txt=>{
        document.getElementById('fin-f-barras').value=txt; fin_pararCamera();
    }).catch(()=>{ alert("Verifique as permissões da câmera."); c.classList.add('hidden'); });
}

function fin_pararCamera() {
    if (fin_html5QrCode) fin_html5QrCode.stop().then(()=>document.getElementById('fin-camera-container').classList.add('hidden'));
    else document.getElementById('fin-camera-container').classList.add('hidden');
}

function fin_configurarDropZone(dropId, inputId, txtId) {
    const dz = document.getElementById(dropId);
    const ip = document.getElementById(inputId);
    if (!dz||!ip) return;
    dz.addEventListener('dragover', e=>{e.preventDefault(); dz.classList.add('dragover');});
    dz.addEventListener('dragleave',e=>{e.preventDefault(); dz.classList.remove('dragover');});
    dz.addEventListener('drop',e=>{e.preventDefault(); dz.classList.remove('dragover'); if(e.dataTransfer.files?.length){ip.files=e.dataTransfer.files; fin_mostrarNomeArquivo(ip,txtId);}});
}

function fin_mostrarNomeArquivo(input, idCampo) {
    const el = document.getElementById(idCampo);
    el.innerHTML = input.files?.length ? `<i class="fas fa-check"></i> ${input.files[0].name}` : '';
}
</script>

<script>
let pdv_html5QrCode  = null;
let pdv_produtosCache = [];
let pdv_carrinho      = [];

async function pdv_init() {
    await pdv_fetchProdutos();
    await pdv_fetchEntidades();
    await pdv_loadDashboard();
}

function pdv_alternarSubAba(subAba) {
    const pCaixa     = document.getElementById('pdv-painel-caixa');
    const pSangria   = document.getElementById('pdv-painel-sangria');
    const pHistorico = document.getElementById('pdv-painel-historico');
    
    const btnC = document.getElementById('pdv-btn-caixa');
    const btnS = document.getElementById('pdv-btn-sangria');
    const btnH = document.getElementById('pdv-btn-historico');
    
    const verde = ['bg-emerald-500','text-white','hover:bg-emerald-600'];
    const cinza = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];
    
    btnC.classList.remove(...verde,...cinza); 
    btnS.classList.remove(...verde,...cinza); 
    btnH.classList.remove(...verde,...cinza);
    
    pCaixa.classList.add('hidden');
    pSangria.classList.add('hidden');
    pHistorico.classList.add('hidden');

    if (subAba==='caixa') {
        pCaixa.classList.remove('hidden');
        btnC.classList.add(...verde); btnS.classList.add(...cinza); btnH.classList.add(...cinza);
    } else if (subAba==='sangria') {
        pSangria.classList.remove('hidden');
        btnS.classList.add(...verde); btnC.classList.add(...cinza); btnH.classList.add(...cinza);
        pdv_loadHistoricoCaixa();
    } else if (subAba==='historico') {
        pHistorico.classList.remove('hidden');
        btnH.classList.add(...verde); btnC.classList.add(...cinza); btnS.classList.add(...cinza);
        pdv_loadHistoricoVendas();
    }
}

async function pdv_fetchProdutos() {
    const { data } = await _supabase.from('produtos').select('*').order('nome',{ascending:true});
    if (data) {
        pdv_produtosCache = data;
        const datalist = document.getElementById('listaProdutosDatalist');
        datalist.innerHTML = '';
        data.forEach(p => {
            const opt = document.createElement('option');
            opt.value = `${p.id} - ${p.nome} (Estoque: ${p.quantidade_estoque}) - R$ ${parseFloat(p.preco_venda).toFixed(2)}`;
            datalist.appendChild(opt);
        });
    }
}

async function pdv_fetchEntidades() {
    const { data } = await _supabase.from('entidades').select('id,nome_completo').order('nome_completo',{ascending:true});
    if (data) {
        const sel = document.getElementById('pdv-cliente');
        sel.innerHTML = '<option value="">Consumidor Final (Não identificado)</option>';
        data.forEach(e => sel.innerHTML += `<option value="${e.id}">${e.nome_completo}</option>`);
    }
}

function pdv_iniciarLeituraCamera() {
    const c = document.getElementById('pdv-camera-container');
    c.classList.remove('hidden');
    pdv_html5QrCode = new Html5Qrcode("pdv-camera-preview");
    pdv_html5QrCode.start({facingMode:"environment"},{fps:10,qrbox:{width:280,height:140}},txt=>{
        pdv_adicionarPorCodigoBarras(txt); pdv_pararCamera();
    }).catch(()=>{ alert("Permissão de câmera negada."); c.classList.add('hidden'); });
}

function pdv_pararCamera() {
    if (pdv_html5QrCode) pdv_html5QrCode.stop().then(()=>document.getElementById('pdv-camera-container').classList.add('hidden'));
    else document.getElementById('pdv-camera-container').classList.add('hidden');
}

function pdv_adicionarPorCodigoBarras(codigo) {
    const prod = pdv_produtosCache.find(p => p.codigo_barras===codigo.trim());
    if (prod) pdv_adicionarAoCarrinho(prod);
    else alert(`Produto [${codigo}] não localizado.`);
}

function pdv_adicionarDoInputBusca() {
    const inputVal = document.getElementById('pdv_buscaProduto').value;
    if (!inputVal) return;
    const idProd = inputVal.split(' - ')[0].trim();
    const prod = pdv_produtosCache.find(p => p.id === idProd || p.nome.toLowerCase().includes(inputVal.toLowerCase()));
    if (prod) {
        pdv_adicionarAoCarrinho(prod);
        document.getElementById('pdv_buscaProduto').value = '';
    } else {
        alert("Produto não encontrado na base de dados.");
    }
}

function pdv_adicionarAoCarrinho(produto) {
    const item = pdv_carrinho.find(i => i.id===produto.id);
    if (item) item.quantidade+=1;
    else pdv_carrinho.push({...produto, quantidade:1});
    pdv_renderCarrinho();
}

function pdv_alterarQuantidade(id, delta) {
    const item = pdv_carrinho.find(i => i.id===id);
    if (item) { item.quantidade+=delta; if (item.quantidade<=0) pdv_carrinho=pdv_carrinho.filter(i=>i.id!==id); }
    pdv_renderCarrinho();
}

function pdv_removerDoCarrinho(id) { pdv_carrinho=pdv_carrinho.filter(i=>i.id!==id); pdv_renderCarrinho(); }

function pdv_renderCarrinho() {
    const tbody  = document.getElementById('pdv-carrinho-corpo');
    const vazio  = document.getElementById('pdv-carrinho-vazio');
    document.getElementById('pdv-dash-carrinho').innerText = pdv_carrinho.reduce((a,c)=>a+c.quantidade,0);
    if (!pdv_carrinho.length) { tbody.innerHTML=''; vazio.classList.remove('hidden'); pdv_recalcularTotais(); return; }
    vazio.classList.add('hidden');
    tbody.innerHTML = pdv_carrinho.map(item => {
        const sub = item.preco_venda*item.quantidade;
        const cod = item.codigo_barras ? `[${item.codigo_barras}]` : '(Sem código)';
        return `<tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
          <td class="p-3"><div class="font-bold text-slate-700 dark:text-white">${item.nome}</div><span class="text-xs text-slate-400 font-mono">${cod}</span></td>
          <td class="p-3"><div class="flex items-center justify-center gap-1">
            <button onclick="pdv_alterarQuantidade('${item.id}',-1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">-</button>
            <span class="font-bold px-2">${item.quantidade}</span>
            <button onclick="pdv_alterarQuantidade('${item.id}',1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">+</button>
          </div></td>
          <td class="p-3 text-right font-medium text-slate-600 dark:text-slate-300">R$ ${parseFloat(item.preco_venda).toFixed(2)}</td>
          <td class="p-3 text-right font-bold text-slate-800 dark:text-white">R$ ${sub.toFixed(2)}</td>
          <td class="p-3 text-center"><button onclick="pdv_removerDoCarrinho('${item.id}')" class="text-red-500 hover:text-red-700"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
    }).join('');
    pdv_recalcularTotais();
}

function pdv_recalcularTotais() {
    const sub  = pdv_carrinho.reduce((a,i)=>a+(i.preco_venda*i.quantidade),0);
    const desc = parseFloat(document.getElementById('pdv-desconto').value)||0;
    const tot  = Math.max(0,sub-desc);
    document.getElementById('pdv-resumo-subtotal').innerText = `R$ ${sub.toFixed(2)}`;
    document.getElementById('pdv-resumo-desconto').innerText = `- R$ ${desc.toFixed(2)}`;
    document.getElementById('pdv-resumo-total').innerText    = `R$ ${tot.toFixed(2)}`;
}

async function pdv_finalizarVenda() {
    if (!pdv_carrinho.length) return alert("Adicione ao menos um produto!");
    
    const subtotalCalc = pdv_carrinho.reduce((a,i)=>a+(i.preco_venda*i.quantidade),0);
    const descontoVal  = parseFloat(document.getElementById('pdv-desconto').value)||0;
    const totalFinal   = Math.max(0, subtotalCalc - descontoVal);
    const clienteId    = document.getElementById('pdv-cliente').value;
    const formaPagto   = document.getElementById('pdv-forma-pagamento').value;
    
    if (!confirm(`Confirmar recebimento e finalizar venda de R$ ${totalFinal.toFixed(2)}?`)) return;
    
    try {
        // Passo 1: Inserir Venda Principal
        const { data: venda, error: errV } = await _supabase.from('vendas').insert([{
            entidade_id: clienteId || null, 
            valor_total: totalFinal, 
            desconto: descontoVal, 
            forma_pagamento: formaPagto, 
            status: 'concluida'
        }]).select().single();
        if (errV) throw errV;

        // Passo 2: Inserir Itens e dar baixa imediata no estoque
        for (let item of pdv_carrinho) {
            await _supabase.from('itens_venda').insert([{
                venda_id: venda.id,
                produto_id: item.id,
                quantidade: item.quantidade,
                preco_unitario: item.preco_venda,
                subtotal: item.preco_venda * item.quantidade
            }]);

            const prodAtual = pdv_produtosCache.find(p => p.id === item.id);
            if (prodAtual) {
                const novoEstoque = Math.max(0, prodAtual.quantidade_estoque - item.quantidade);
                await _supabase.from('produtos').update({ quantidade_estoque: novoEstoque }).eq('id', item.id);
            }
        }

        // Passo 3: Gerar o HTML do Cupom para salvar no Financeiro
        const dataHoraAtual = new Date();
        const dataHoraStr = dataHoraAtual.toLocaleString('pt-BR');
        const idCurto = venda.id.substring(0, 8).toUpperCase();
        
        const itensHtml = pdv_carrinho.map(i => `
            <tr>
              <td>${i.nome}</td>
              <td style="text-align: center;">${i.quantidade}</td>
              <td style="text-align: right;">R$ ${(i.preco_venda * i.quantidade).toFixed(2)}</td>
            </tr>
        `).join('');

        const cupomHtmlCompleto = `
          <div style="font-family: monospace; width: 300px; padding: 10px; margin: 0 auto; color: #000; background: #fff;">
            <h3 style="text-align: center; margin: 0 0 5px 0;">ERP_ABP - CUPOM</h3>
            <p style="text-align: center; font-size: 11px; margin: 0 0 10px 0;">Comprovante de Venda</p>
            <p style="font-size: 11px; margin: 2px 0;">Data: ${dataHoraStr}</p>
            <p style="font-size: 11px; margin: 2px 0;">ID Venda: ${idCurto}</p>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <table style="width: 100%; font-size: 11px;">
              <thead>
                <tr style="border-bottom: 1px solid #000;">
                  <th style="text-align: left;">Item</th>
                  <th style="text-align: center;">Qtd</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itensHtml}</tbody>
            </table>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>R$ ${subtotalCalc.toFixed(2)}</span></div>
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Desconto:</span> <span>R$ ${descontoVal.toFixed(2)}</span></div>
            <div style="font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; margin-top: 5px;"><span>TOTAL:</span> <span>R$ ${totalFinal.toFixed(2)}</span></div>
            <p style="text-align: center; font-size: 10px; margin-top: 15px;">Obrigado pela preferência!</p>
          </div>
        `;

        // Transformando o HTML em um link de dados (Data URI) para armazenar no campo comprovante_url
        const comprovanteDataUri = `data:text/html;charset=utf-8,${encodeURIComponent(cupomHtmlCompleto)}`;

        // Passo 4: Integrar com o Financeiro
        const { data: fin, error: errF } = await _supabase.from('financas').insert([{
            entidade_id: clienteId || null, 
            descricao: `Venda PDV - Cupom #${idCurto} (${formaPagto})`,
            valor_total: totalFinal, 
            tipo: 'receita', 
            num_parcelas: 1, 
            categoria: 'Vendas', 
            status_lancamento: 'finalizado'
        }]).select().single();
        if (errF) throw errF;

        // Passo 5: Inserir a parcela vinculando o comprovante gerado
        await _supabase.from('parcelas').insert([{ 
            financa_id: fin.id, 
            num_parcela: 1, 
            valor_parcela: totalFinal, 
            data_vencimento: new Date().toISOString().split('T')[0], 
            data_pagamento: new Date().toISOString().split('T')[0], 
            status: 'pago',
            comprovante_url: comprovanteDataUri 
        }]);

        alert("Venda registrada, estoque atualizado e comprovante salvo no financeiro!");

        // Passo 6: Configurar o título personalizado para o arquivo de impressão/PDF e imprimir
        const dataHoraArquivo = dataHoraStr.replace(/[/:\s]/g, '-');
        document.title = `Cupom #${idCurto}_R$${totalFinal.toFixed(2)}_${dataHoraArquivo}`;
        
        const conteudoOriginal = document.body.innerHTML;
        document.body.innerHTML = cupomHtmlCompleto;
        window.print();
        document.body.innerHTML = conteudoOriginal;
        window.location.reload();

    } catch (error) { 
        alert("Erro na venda: " + error.message); 
    }
}

async function pdv_salvarSangria() {
    const valor  = parseFloat(document.getElementById('pdv-sangria-valor').value);
    const motivo = document.getElementById('pdv-sangria-motivo').value.trim();
    if (isNaN(valor)||valor<=0||!motivo) return alert("Preencha o valor e a justificativa.");
    if (!confirm(`Confirmar sangria de R$ ${valor.toFixed(2)}?`)) return;
    try {
        const { data: fin, error: errF } = await _supabase.from('financas').insert([{
            descricao:`Sangria Caixa: ${motivo}`, valor_total:valor, tipo:'despesa', num_parcelas:1, categoria:'Sangria', status_lancamento:'finalizado'
        }]).select().single();
        if (errF) throw errF;
        await _supabase.from('parcelas').insert([{ financa_id:fin.id, num_parcela:1, valor_parcela:valor, data_vencimento:new Date().toISOString().split('T')[0], data_pagamento:new Date().toISOString().split('T')[0], status:'pago' }]);
        alert("Sangria registrada!");
        document.getElementById('pdv-sangria-valor').value='';
        document.getElementById('pdv-sangria-motivo').value='';
        pdv_loadDashboard();
        pdv_loadHistoricoCaixa();
    } catch(error) { alert("Erro: "+error.message); }
}

async function pdv_loadDashboard() {
    const hoje = new Date().toISOString().split('T')[0];
    const { data } = await _supabase.from('financas').select('*').gte('created_at',`${hoje}T00:00:00Z`);
    let tv=0, ts=0;
    if (data) data.forEach(f => {
        if (f.categoria==='Vendas' && f.tipo==='receita') tv+=parseFloat(f.valor_total||0);
        if (f.categoria==='Sangria'&& f.tipo==='despesa') ts+=parseFloat(f.valor_total||0);
    });
    document.getElementById('pdv-dash-vendas').innerText   = `R$ ${tv.toFixed(2)}`;
    document.getElementById('pdv-dash-sangrias').innerText = `R$ ${ts.toFixed(2)}`;
}

async function pdv_loadHistoricoCaixa() {
    const hoje = new Date().toISOString().split('T')[0];
    const { data } = await _supabase.from('financas').select('*').or("categoria.eq.Vendas,categoria.eq.Sangria").gte('created_at',`${hoje}T00:00:00Z`).order('created_at',{ascending:false});
    const tbody = document.getElementById('pdv-lista-fluxo');
    if (!data||!data.length) { tbody.innerHTML='<tr><td colspan="5" class="p-4 text-center text-slate-400">Nenhuma transação hoje.</td></tr>'; return; }
    tbody.innerHTML = data.map(f => {
        const hora = new Date(f.created_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
        const sc   = f.tipo==='receita'?'status-receita':'status-despesa';
        const st   = f.tipo==='receita'?'ENTRADA':'SANGRIA';
        const cor  = f.tipo==='receita'?'text-emerald-600':'text-red-600';
        return `<tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
          <td class="p-3 font-medium text-slate-500">${hora}</td>
          <td class="p-3 font-bold text-slate-700 dark:text-white">${f.descricao}</td>
          <td class="p-3 text-slate-500">${f.categoria}</td>
          <td class="p-3 text-center"><span class="${sc}">${st}</span></td>
          <td class="p-3 text-right font-extrabold ${cor}">R$ ${parseFloat(f.valor_total).toFixed(2)}</td>
        </tr>`;
    }).join('');
}

async function pdv_loadHistoricoVendas() {
    const { data } = await _supabase.from('vendas').select('*').order('created_at',{ascending:false}).limit(50);
    const tbody = document.getElementById('pdv-lista-vendas-historico');
    if (!data || !data.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400">Nenhuma venda encontrada.</td></tr>';
        return;
    }
    tbody.innerHTML = data.map(v => {
        const dataFormatada = new Date(v.created_at).toLocaleString('pt-BR');
        return `
            <tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td class="p-3"><span class="font-bold text-slate-700 dark:text-white">#${v.id.substring(0,8).toUpperCase()}</span><br><span class="text-xs text-slate-400">${dataFormatada}</span></td>
                <td class="p-3 font-medium">${v.forma_pagamento}</td>
                <td class="p-3 text-right text-red-500">R$ ${parseFloat(v.desconto || 0).toFixed(2)}</td>
                <td class="p-3 text-right font-extrabold text-emerald-600">R$ ${parseFloat(v.valor_total).toFixed(2)}</td>
                <td class="p-3 text-center space-x-1">
                    <button onclick="pdv_reimprimirVenda('${v.id}')" class="bg-blue-100 text-blue-600 hover:bg-blue-200 px-2.5 py-1 rounded text-xs font-bold transition" title="Reimprimir Cupom">
                        <i class="fas fa-print"></i> Reimprimir
                    </button>
                    <button onclick="pdv_excluirVenda('${v.id}')" class="bg-red-100 text-red-600 hover:bg-red-200 px-2.5 py-1 rounded text-xs font-bold transition" title="Excluir Venda">
                        <i class="fas fa-trash-alt"></i> Excluir
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

async function pdv_reimprimirVenda(vendaId) {
    try {
        const { data: venda, error: errV } = await _supabase.from('vendas').select('*').eq('id', vendaId).single();
        if (errV) throw errV;

        const { data: itens, error: errI } = await _supabase.from('itens_venda').select('*, produtos(nome)').eq('venda_id', vendaId);
        if (errI) throw errI;

        const dataHoraStr = new Date(venda.created_at).toLocaleString('pt-BR');
        const idCurto = venda.id.substring(0, 8).toUpperCase();
        const subtotalCalc = itens.reduce((acc, item) => acc + (item.preco_unitario * item.quantidade), 0);

        const itensHtml = itens.map(i => `
            <tr>
              <td>${i.produtos ? i.produtos.nome : 'Produto'}</td>
              <td style="text-align: center;">${i.quantidade}</td>
              <td style="text-align: right;">R$ ${parseFloat(i.subtotal).toFixed(2)}</td>
            </tr>
        `).join('');

        const cupomHtmlCompleto = `
          <div style="font-family: monospace; width: 300px; padding: 10px; margin: 0 auto; color: #000; background: #fff;">
            <h3 style="text-align: center; margin: 0 0 5px 0;">ERP_ABP - 2ª VIA</h3>
            <p style="text-align: center; font-size: 11px; margin: 0 0 10px 0;">Comprovante de Reimpressão</p>
            <p style="font-size: 11px; margin: 2px 0;">Data: ${dataHoraStr}</p>
            <p style="font-size: 11px; margin: 2px 0;">ID Venda: ${idCurto}</p>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <table style="width: 100%; font-size: 11px;">
              <thead>
                <tr style="border-bottom: 1px solid #000;">
                  <th style="text-align: left;">Item</th>
                  <th style="text-align: center;">Qtd</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itensHtml}</tbody>
            </table>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>R$ ${subtotalCalc.toFixed(2)}</span></div>
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Desconto:</span> <span>R$ ${parseFloat(venda.desconto || 0).toFixed(2)}</span></div>
            <div style="font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; margin-top: 5px;"><span>TOTAL:</span> <span>R$ ${parseFloat(venda.valor_total).toFixed(2)}</span></div>
            <p style="text-align: center; font-size: 10px; margin-top: 15px;">Obrigado pela preferência!</p>
          </div>
        `;

        const dataHoraArquivo = dataHoraStr.replace(/[/:\s]/g, '-');
        document.title = `Cupom #${idCurto}_R$${parseFloat(venda.valor_total).toFixed(2)}_${dataHoraArquivo}`;

        const conteudoOriginal = document.body.innerHTML;
        document.body.innerHTML = cupomHtmlCompleto;
        window.print();
        document.body.innerHTML = conteudoOriginal;
        window.location.reload();

    } catch (error) {
        alert("Erro ao reimprimir cupom: " + error.message);
    }
}

async function pdv_excluirVenda(vendaId) {
    if (!confirm("Deseja realmente excluir esta venda? O estoque dos produtos será reposto e o registro financeiro correspondente será removido.")) return;
    try {
        const { data: itens, error: errItens } = await _supabase.from('itens_venda').select('*').eq('venda_id', vendaId);
        if (errItens) throw errItens;

        for (let item of itens) {
            const { data: prod } = await _supabase.from('produtos').select('quantidade_estoque').eq('id', item.produto_id).single();
            if (prod) {
                const estoqueRestaurado = prod.quantidade_estoque + item.quantidade;
                await _supabase.from('produtos').update({ quantidade_estoque: estoqueRestaurado }).eq('id', item.produto_id);
            }
        }

        const { data: financas } = await _supabase.from('financas').select('id').like('descricao', `%Cupom #${vendaId.substring(0,8)}%`);
        if (financas && financas.length > 0) {
            for (let f of financas) {
                await _supabase.from('parcelas').delete().eq('financa_id', f.id);
                await _supabase.from('financas').delete().eq('id', f.id);
            }
        }

        await _supabase.from('itens_venda').delete().eq('venda_id', vendaId);
        const { error: errVenda } = await _supabase.from('vendas').delete().eq('id', vendaId);
        if (errVenda) throw errVenda;

        alert("Venda excluída com sucesso, estoque e financeiro revertidos!");
        pdv_loadHistoricoVendas();
        pdv_loadDashboard();
        await pdv_fetchProdutos();
    } catch (error) {
        alert("Erro ao excluir venda: " + error.message);
    }
}




    /**
 * Realiza o upload de um arquivo para o bucket 'arquivos' do Supabase Storage
 * e retorna a sua URL pública para salvar no banco de dados.
 * 
 * @param {File} file - Objeto de arquivo do input HTML (e.g., input.files[0])
 * @returns {Promise<string>} URL pública do arquivo enviado
 */
async function enviarArquivoParaStorage(file) {
    try {
        // Extrai a extensão do arquivo original
        const extensao = file.name.split('.').pop();
        
        // Gera um nome único de arquivo usando timestamp e hash aleatório
        const nomeUnico = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extensao}`;
        const caminhoArquivo = `uploads/${nomeUnico}`;

        // 1. Envia o arquivo para o bucket 'arquivos'
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('arquivos')
            .upload(caminhoArquivo, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) throw uploadError;

        // 2. Obtém a URL pública gerada
        const { data: urlData } = supabase.storage
            .from('arquivos')
            .getPublicUrl(caminhoArquivo);

        return urlData.publicUrl;
    } catch (error) {
        console.error('Erro no upload para o Supabase Storage:', error.message);
        throw error;
    }
}
