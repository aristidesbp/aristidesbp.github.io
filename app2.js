
/*🟥
APP.JS - SINGLE PAGE APPLICATION (SPA) COM ROTEAMENTO DE MÓDULOS
🟥*/


/*🟥
PARTE 1: CONSOLE ESPELHO E CONFIGURAÇÃO (Mantidos intactos)
🟥*/ 

const consoleContainer = document.createElement('div');
consoleContainer.style.cssText = `position: fixed; bottom: 60px; left: 10px; right: 10px; height: 300px; background: rgba(0, 0, 0, 0.9); color: #00ff00; font-family: monospace; font-size: 12px; padding: 10px; overflow-y: scroll; z-index: 9999; display: none; border-radius: 5px; box-shadow: 0px -2px 10px rgba(0,0,0,0.5);`;
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🛠️ Console';
toggleBtn.style.cssText = `position: fixed; bottom: 10px; right: 10px; padding: 10px 15px; background: #2980b9; color: white; border: none; border-radius: 5px; font-weight: bold; z-index: 10000; box-shadow: 0px 2px 5px rgba(0,0,0,0.3);`;
document.body.appendChild(consoleContainer);
document.body.appendChild(toggleBtn);
toggleBtn.addEventListener('click', () => { consoleContainer.style.display = consoleContainer.style.display === 'none' ? 'block' : 'none'; });

const originalLog = console.log;
const originalError = console.error;
function espelharNoEcra(tipo, cor, argumentos) {
    const linha = document.createElement('div');
    linha.style.color = cor; linha.style.marginBottom = '5px'; linha.style.borderBottom = '1px solid #333';
    const textoMensagem = Array.from(argumentos).map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    linha.textContent = `[${tipo}] ${textoMensagem}`;
    consoleContainer.appendChild(linha);
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
}
console.log = function(...args) { originalLog.apply(console, args); espelharNoEcra('LOG', '#00ff00', args); };
console.error = function(...args) { originalError.apply(console, args); espelharNoEcra('ERRO', '#ff4444', args); };

// Configuração Supabase
const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
let clienteSupabase;
if (typeof supabase !== 'undefined') {
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}



/*🟥
PARTE 2: GESTOR CENTRAL DE ROTAS
🟥*/ 

const appRoot = document.getElementById('app-root');

async function iniciarApp() {
    // Valida a sessão. Se estiver logado, vai para o Menu Principal. Se não, vai para o Login.
    const { data: { session } } = await clienteSupabase.auth.getSession();
    if (session) {
        desenharMenuPrincipal(session.user.email);
    } else {
        desenharLogin();
    }
}


/*🟥
PARTE 3: ECRÃ DE LOGIN
*🟥/ 

function desenharLogin() {
    appRoot.innerHTML = `
        <div class="card">
            <div class="titulo">⚡ Acesso ao ERP</div>
            <div id="area-login">
                <label>E-mail</label><input type="email" id="login-email" placeholder="seu@email.com">
                <label>Senha</label><input type="password" id="login-senha" placeholder="••••••••">
                <button id="btn-entrar" class="btn-neon">Entrar</button>
                <button id="btn-ir-registo" class="btn-secundario">Criar Nova Conta</button>
            </div>
            <div id="area-registo" style="display: none;">
                <label>Novo E-mail</label><input type="email" id="reg-email" placeholder="novo@email.com">
                <label>Criar Senha</label><input type="password" id="reg-senha" placeholder="Mínimo 6 caracteres">
                <button id="btn-registar" class="btn-neon">Concluir Registo</button>
                <button id="btn-voltar-login" class="btn-secundario">Voltar ao Login</button>
            </div>
        </div>
    `;

    document.getElementById('btn-ir-registo').onclick = () => {
        document.getElementById('area-login').style.display = 'none';
        document.getElementById('area-registo').style.display = 'block';
    };
    document.getElementById('btn-voltar-login').onclick = () => {
        document.getElementById('area-registo').style.display = 'none';
        document.getElementById('area-login').style.display = 'block';
    };

    document.getElementById('btn-entrar').onclick = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-senha').value;
        if(!email || !password) return alert("Preencha todos os campos.");
        const { error } = await clienteSupabase.auth.signInWithPassword({ email, password });
        if (error) alert("Erro: " + error.message);
        else iniciarApp(); 
    };

    document.getElementById('btn-registar').onclick = async () => {
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-senha').value;
        if(!email || !password) return alert("Preencha todos os campos.");
        const { error } = await clienteSupabase.auth.signUp({ email, password });
        if (error) alert("Erro: " + error.message);
        else { alert("Conta criada! Pode fazer login."); document.getElementById('btn-voltar-login').click(); }
    };
}

/*🟥
PARTE 4: ECRÃ DO MENU PRINCIPAL (CENTRO DE COMANDO)
🟥*/ 


function desenharMenuPrincipal(emailDoOperador) {
    // Desenha o cabeçalho e os cartões de navegação usando CSS Grid flexível
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <span class="logo-icon">⚡</span> 
                <div>
                    <div>Centro de Comando</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
            <div class="header-actions">
                <button id="btn-tema" class="icon-btn" title="Alterar Tema">🌓</button>
                <button id="btn-sair" class="icon-btn" title="Sair do Sistema" style="color: var(--danger-color);">🚪</button>
            </div>
        </header>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
            <!-- Cartão Módulo Produtos -->
            <div class="card" id="card-produtos" style="text-align: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">📦</div>
                <h3 style="color: var(--accent-neon); margin: 0 0 5px 0;">Produtos</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Gestão de Estoque</p>
            </div>

            <!-- Cartão Módulo Entidades -->
            <div class="card" id="card-entidades" style="text-align: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">🏢</div>
                <h3 style="color: var(--accent-neon); margin: 0 0 5px 0;">Entidades</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Clientes e Fornecedores</p>
            </div>
        </div>
    `;

    // Eventos do Cabeçalho
    document.getElementById('btn-tema').onclick = () => document.body.classList.toggle('light-theme');
    document.getElementById('btn-sair').onclick = async () => {
        if(confirm("Deseja encerrar a sessão?")) {
            await clienteSupabase.auth.signOut();
            iniciarApp(); 
        }
    };

    // Navegação para os Módulos Específicos
    document.getElementById('card-produtos').onclick = () => desenharModuloProdutos(emailDoOperador);
    document.getElementById('card-entidades').onclick = () => desenharModuloEntidades(emailDoOperador);
}





/*🟥 =================================================================
   PARTE 5: MÓDULO DE PRODUTOS (ARQUITETURA MODULAR)
================================================================= 🟥*/


// Objeto Global para partilhar o estado entre as funções do módulo 5
const estadoProdutos = {
    exibindoLixeira: false,
    arquivoParaUpload: null,
    mapaFornecedores: {},
    idEmEdicao: null // Se for 'null', vai Cadastrar. Se tiver um ID, vai Editar.
};

// CSS de Interface limpo (Sem variáveis dinâmicas para evitar Erros de Sintaxe)
const cssProdutos = '<style>.btn-acao{padding:8px 12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; color:white;} .btn-verde{background:#28a745;} .btn-amarelo{background:#ffc107; color:#333;} .btn-vermelho{background:#dc3545;} .btn-cinza{background:#6c757d;} .toast{position:fixed; top:20px; right:20px; padding:15px; color:white; border-radius:5px; font-weight:bold; z-index:9999;}</style>';



/*🟥 5.1 FORMULÁRIO PRODUTOS (Desenho da Interface) 🟥*/
function desenharModuloProdutos(emailDoOperador) {
    // 1. Injeção do Layout Base (Menu, Abas, Formulário Completo e Casca da Listagem)
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <button id="btn-voltar-menu" class="icon-btn" style="margin-right: 10px;">⬅️</button>
                <div>
                    <div>📦 Produtos</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
        </header>

        <div class="tabs-menu">
            <button id="aba-btn-cadastro" class="tab-btn active">📝 Formulário</button>
            <button id="aba-btn-lista" class="tab-btn">🛒 Inventário</button>
        </div>

        <!-- ================= ABA 1: FORMULÁRIO DE CADASTRO ================= -->
        <div id="aba-conteudo-cadastro" class="tab-content active card">
            <h2 id="titulo-formulario" class="titulo">Cadastrar Novo Produto</h2>
            
            <!-- SECÇÃO 1: FOTO -->
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">📸 Imagem do Produto</label>
            <div style="text-align: center; margin-bottom: 15px;">
                <img id="img-preview" src="https://via.placeholder.com/200?text=Sem+Foto" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px dashed var(--border-color); object-fit: cover;">
            </div>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <label for="prod-imagem-camera" class="btn-neon" style="text-align: center; flex: 1; cursor: pointer; margin-bottom: 0;">📷 Câmera</label>
                <input type="file" id="prod-imagem-camera" accept="image/*" capture="environment" style="display: none;">
                
                <label for="prod-imagem-galeria" class="btn-secundario" style="text-align: center; flex: 1; cursor: pointer; margin-bottom: 0;">📁 Galeria</label>
                <input type="file" id="prod-imagem-galeria" accept="image/*" style="display: none;">
            </div>
            <p id="info-foto" style="font-size: 0.8em; color: var(--text-muted); text-align: center; margin-top: -10px; margin-bottom: 15px;">Nenhuma imagem selecionada</p>

            <!-- SECÇÃO 2: CÓDIGOS E DATAS -->
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">🧾 Códigos e Datas</label>
            
            <label>EAN (Código de Barras)</label>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <input type="text" id="prod-ean" placeholder="Ex: 7891025109884" style="margin-bottom: 0; flex: 1;">
                <button id="btn-scan-ean" class="btn-neon" style="width: auto; margin-bottom: 0; padding: 0 20px;" title="Ler Código">📷</button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div>
                    <label>Data de Compra</label>
                    <input type="date" id="prod-data-compra">
                </div>
                <div>
                    <label>Data de Vencimento</label>
                    <input type="date" id="prod-data-vencimento">
                </div>
            </div>

            <!-- SECÇÃO 3: DADOS GERAIS -->
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">📦 Dados Gerais</label>
            <label>Nome do Produto *</label>
            <input type="text" id="prod-nome" placeholder="Ex: Cerveja Artesanal 500ml">
            
            <label>Descrição do Produto</label>
            <textarea id="prod-descricao" rows="3" placeholder="Detalhes adicionais..." style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-main); font-family: inherit; resize: vertical;"></textarea>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div>
                    <label>Categoria</label>
                    <input type="text" id="prod-categoria" placeholder="Ex: Bebidas">
                </div>
                <div>
                    <label>Fornecedor</label>
                    <input list="lista-fornecedores" id="prod-fornecedor" placeholder="Digite para buscar...">
                    <datalist id="lista-fornecedores"></datalist>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label>Origem</label>
                <select id="prod-origem" style="width: 100%; padding: 12px; border-radius: 8px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); outline: none;">
                    <option value="Selecione...">Selecione...</option>
                    <option value="0 - Nacional">0 - Nacional</option>
                    <option value="1 - Estrangeira">1 - Estrangeira</option>
                </select>
            </div>

            <!-- SECÇÃO 4: PREÇOS E ESTOQUE -->
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">💰 Preços e Estoque</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div>
                    <label>Preço de Custo (R$)</label>
                    <input type="number" id="prod-custo" placeholder="0.00" step="0.01">
                </div>
                <div>
                    <label>Preço de Venda (R$) *</label>
                    <input type="number" id="prod-preco" placeholder="0.00" step="0.01">
                </div>
                <div>
                    <label>Estoque Atual</label>
                    <input type="number" id="prod-estoque" value="0">
                </div>
                <div>
                    <label>Estoque Mínimo</label>
                    <input type="number" id="prod-estoque-min" value="0">
                </div>
            </div>

            <!-- SECÇÃO 5: LOGÍSTICA -->
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">🚚 Logística e Armazenamento</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div>
                    <label>Peso (kg)</label>
                    <input type="number" id="prod-peso" placeholder="Ex: 1.5" step="0.001">
                </div>
                <div>
                    <label>Dimensões (LxAxP)</label>
                    <input type="text" id="prod-dimensoes" placeholder="Ex: 20x15x10 cm">
                </div>
                <div>
                    <label>Localização na Loja</label>
                    <input type="text" id="prod-loc-loja" placeholder="Ex: Corredor 3">
                </div>
                <div>
                    <label>Localização no Estoque</label>
                    <input type="text" id="prod-loc-estoque" placeholder="Ex: Palete 4">
                </div>
            </div>

            <!-- Botões de Ação -->
            <button id="btn-salvar-produto" class="btn-neon" style="width: 100%; padding: 15px; margin-top: 15px; font-size: 1.1em;">💾 Salvar Produto</button>
            <button id="btn-cancelar-edicao" class="btn-secundario" style="width: 100%; padding: 15px; margin-top: 10px; display: none; font-size: 1.1em;">❌ Cancelar Edição</button>
        </div>

        <!-- ================= ABA 2: LISTAGEM E LIXEIRA (Apenas a Casca Visual) ================= -->
        <div id="aba-conteudo-lista" class="tab-content card">
            <div id="status-lixeira" style="background-color: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; font-weight: bold; margin-bottom: 15px; display: none;">Lixeira de Produtos 🗑️ (Itens Ocultos)</div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                <h2 id="titulo-lista" style="margin: 0;">Lista de Produtos 📦</h2>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="btn-ver-lixeira" class="btn-secundario">👁️ Ver Lixeira</button>
                    <button id="btn-limpar-lixeira" style="display: none; background: #fd7e14; color: white; border: none; padding: 10px 15px; border-radius: 4px; font-weight: bold; cursor: pointer;">🧹 Esvaziar Lixeira</button>
                </div>
            </div>

            <div style="display: flex; gap: 5px; margin-bottom: 15px; width: 100%;">
                <input type="text" id="input-busca-lista" placeholder="🔍 Buscar por Nome ou EAN..." style="flex-grow: 1; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-color); color: var(--text-main);">
                <button type="button" id="btn-buscar-lista" class="btn-neon" style="width: auto; margin-bottom: 0;">Buscar</button>
            </div>
            
            <div id="barra-acoes-lote" style="background-color: #fff3cd; padding: 10px; border-radius: 5px; margin-bottom: 15px; display: none; align-items: center; justify-content: space-between; border: 1px solid #ffeeba;">
                <strong style="color: #856404;" id="texto-contagem-lote">0 itens selecionados</strong>
                <button id="btn-ocultar-lote" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">🗑️ Ocultar Selecionados</button>
            </div>

            <div id="area-selecionar-todos" style="padding: 10px 15px; background: var(--bg-color); border-radius: 5px; margin-bottom: 15px; display: none; align-items: center; border: 1px solid var(--border-color);">
                <input type="checkbox" id="chk-selecionar-todos" style="transform: scale(1.5); margin-right: 15px; cursor: pointer;">
                <label for="chk-selecionar-todos" style="cursor: pointer; font-weight: bold; user-select: none;">Selecionar todos visíveis</label>
            </div>

            <div id="lista-produtos-dinamica">
                <div style="text-align: center; color: var(--text-muted); padding: 20px;">O módulo de listagem será ativado em breve...</div>
            </div>
        </div>
        
        <!-- Toast Container Base -->
        <div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;"></div>
    `;

    // 2. Lógica Base de Interface
    document.getElementById('btn-voltar-menu').onclick = () => desenharMenuPrincipal(emailDoOperador);
    document.getElementById('aba-btn-cadastro').onclick = () => alternarAba('cadastro');
    
    document.getElementById('aba-btn-lista').onclick = () => {
        alternarAba('lista');
        // Prepara a chamada para o futuro passo 5.2
        if(typeof carregarListagemProdutos === 'function') carregarListagemProdutos();
    };

    // 3. Funções Nativas do Formulário
    document.getElementById('btn-scan-ean').onclick = () => {
        if(typeof abrirLeitorCodigoBarras === 'function') abrirLeitorCodigoBarras('prod-ean');
    };

    const atualizarFoto = (e) => {
        if (e.target.files.length > 0) {
            estadoProdutos.arquivoParaUpload = e.target.files[0];
            document.getElementById('info-foto').textContent = '✅ ' + estadoProdutos.arquivoParaUpload.name;
            document.getElementById('info-foto').style.color = "var(--accent-neon)";
            document.getElementById('img-preview').src = URL.createObjectURL(estadoProdutos.arquivoParaUpload);
        }
    };
    document.getElementById('prod-imagem-camera').addEventListener('change', atualizarFoto);
    document.getElementById('prod-imagem-galeria').addEventListener('change', atualizarFoto);

    // 4. Conexões para as Futuras Etapas (5.3 e 5.4)
    document.getElementById('btn-salvar-produto').onclick = () => {
        if(typeof submeterFormulario === 'function') {
            submeterFormulario();
        } else {
            alert("A funcionalidade de salvar será implementada na etapa 5.3!");
        }
    };
    
    document.getElementById('btn-cancelar-edicao').onclick = () => {
        if(typeof limparFormularioProdutos === 'function') limparFormularioProdutos();
        alternarAba('lista');
    };

    // Dispara carregamentos iniciais se já existirem
    if(typeof carregarFornecedoresParaDropdown === 'function') carregarFornecedoresParaDropdown();
    if(typeof carregarListagemProdutos === 'function') carregarListagemProdutos();
}





/*🟥 =================================================================
   5.2 LISTAGEM PRODUTOS (Busca, Renderização Responsiva)
================================================================= 🟥*/

async function carregarListagemProdutos() {
    const divLista = document.getElementById('lista-produtos-dinamica');
    if (!divLista) return; // Proteção caso o ecrã não esteja montado

    const inputBusca = document.getElementById('input-busca-lista');
    const termoBusca = inputBusca ? inputBusca.value.trim() : '';
    
    divLista.innerHTML = '<p style="text-align:center; color:var(--text-muted); font-weight:bold; padding:20px;">A procurar no banco de dados...</p>';

    // Oculta a barra de ações em lote por defeito ao recarregar a lista
    const barraLote = document.getElementById('barra-acoes-lote');
    const chkTodos = document.getElementById('chk-selecionar-todos');
    if (barraLote) barraLote.style.display = 'none';
    if (chkTodos) chkTodos.checked = false;

    // 1. CONSTRUÇÃO DA CONSULTA (Ativos vs Lixeira)
    let query = clienteSupabase.from('produtos').select('*').order('created_at', { ascending: false });
    
    if (estadoProdutos.exibindoLixeira) {
        query = query.not('deleted_at', 'is', null); // Produtos na lixeira
    } else {
        query = query.is('deleted_at', null); // Produtos ativos
    }

    if (termoBusca) {
        query = query.or('nome.ilike.%' + termoBusca + '%,ean.ilike.%' + termoBusca + '%');
    }

    const { data, error } = await query;

    divLista.innerHTML = ''; 

    // 2. TRATAMENTO DE ERROS E LISTA VAZIA
    if (error) {
        return divLista.innerHTML = '<p style="text-align:center; color:#dc3545; padding:20px;">Erro ao buscar dados do Supabase.</p>';
    }

    if (!data || data.length === 0) {
        const msg = estadoProdutos.exibindoLixeira ? "A lixeira está vazia. 🌟" : "Nenhum produto encontrado.";
        document.getElementById('area-selecionar-todos').style.display = "none";
        document.getElementById('btn-limpar-lixeira').style.display = "none";
        return divLista.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:20px;">' + msg + '</p>';
    }

    // 3. ATUALIZAÇÃO VISUAL DOS BOTÕES DO TOPO
    const areaSelecionar = document.getElementById('area-selecionar-todos');
    const btnLimparLixeira = document.getElementById('btn-limpar-lixeira');
    if(areaSelecionar) areaSelecionar.style.display = estadoProdutos.exibindoLixeira ? "none" : "flex";
    if(btnLimparLixeira) btnLimparLixeira.style.display = estadoProdutos.exibindoLixeira ? "inline-block" : "none";

    // 4. DESENHO DOS CARTÕES (Com CSS Responsivo Inline)
    data.forEach(p => {
        const item = document.createElement('div');
        // Alinhamento flex-start garante que a imagem e a checkbox fiquem no topo
        item.style.cssText = 'padding: 15px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px; align-items: flex-start;';

        // Checkbox de Seleção (Apenas em itens ativos)
        if (!estadoProdutos.exibindoLixeira) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'chk-item';
            checkbox.value = p.id;
            // flex-shrink: 0 impede que a checkbox amasse em telas pequenas
            checkbox.style.cssText = 'transform: scale(1.4); margin-top: 5px; cursor: pointer; flex-shrink: 0;';
            checkbox.addEventListener('change', atualizarBarraAcoesLote);
            item.appendChild(checkbox);
        }

        // Miniatura da Imagem
        const fotoUrl = p.imagem_url ? p.imagem_url : 'https://via.placeholder.com/60?text=Sem+Foto';
        const img = document.createElement('img');
        img.src = fotoUrl;
        img.style.cssText = 'width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color); flex-shrink: 0;';
        item.appendChild(img);

        // Bloco Central: Informações (Ocupa o resto do espaço disponível)
        const divConteudo = document.createElement('div');
        // min-width: 0 resolve bugs de transbordo de texto no flexbox
        divConteudo.style.cssText = 'flex-grow: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0;';

        // Título e Badges (Envolvem em telas pequenas)
        const divTitulo = document.createElement('div');
        divTitulo.style.cssText = 'display: flex; flex-wrap: wrap; gap: 6px; align-items: center;';
        
        const titulo = document.createElement('strong');
        titulo.textContent = p.nome;
        titulo.style.fontSize = '1.1em';
        divTitulo.appendChild(titulo);

        // Badge de Estoque
        const badgeEstoque = document.createElement('span');
        badgeEstoque.textContent = 'Estoque: ' + (p.estoque_atual || 0);
        badgeEstoque.style.cssText = 'padding: 3px 8px; border-radius: 4px; font-size: 0.8em; color: white; white-space: nowrap;';
        badgeEstoque.style.background = (p.estoque_atual <= (p.estoque_minimo || 0)) ? '#dc3545' : '#17a2b8';
        divTitulo.appendChild(badgeEstoque);

        // Badge de Lixeira (Se aplicável)
        if (estadoProdutos.exibindoLixeira) {
            const badgeLixeira = document.createElement('span');
            badgeLixeira.textContent = 'NA LIXEIRA';
            badgeLixeira.style.cssText = 'padding: 3px 8px; border-radius: 4px; font-size: 0.8em; color: white; background: #dc3545; white-space: nowrap;';
            divTitulo.appendChild(badgeLixeira);
        }

        divConteudo.appendChild(divTitulo);

        // Preço
        const spanPreco = document.createElement('span');
        spanPreco.textContent = 'R$ ' + parseFloat(p.preco || 0).toFixed(2);
        spanPreco.style.color = 'var(--accent-neon)';
        spanPreco.style.fontWeight = 'bold';
        divConteudo.appendChild(spanPreco);

        // Categoria e Fornecedor
        if (p.categoria) {
            const catText = document.createElement('span');
            catText.textContent = 'Categoria: ' + p.categoria;
            catText.style.cssText = 'font-size: 0.85em; color: var(--text-muted); word-wrap: break-word;';
            divConteudo.appendChild(catText);
        }

        // Bloco Inferior: Botões de Ação DENTRO do conteúdo
        const zonaBotoes = document.createElement('div');
        zonaBotoes.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;';
        
        if (estadoProdutos.exibindoLixeira) {
            const btnRestaurar = document.createElement('button');
            btnRestaurar.textContent = '♻️ Restaurar';
            btnRestaurar.style.cssText = 'background:#20c997; color:white; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; flex: 1; text-align: center; min-width: 120px;';
            btnRestaurar.onclick = () => { if(typeof restaurarProduto === 'function') restaurarProduto(p.id); else alert("Aguarde a Etapa 5.5!"); };
            zonaBotoes.appendChild(btnRestaurar);
        } else {
            const btnEditar = document.createElement('button');
            btnEditar.textContent = '✏️ Editar';
            btnEditar.style.cssText = 'background:#ffc107; color:#212529; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; flex: 1; text-align: center; min-width: 90px;';
            btnEditar.onclick = () => { if(typeof prepararEdicaoProduto === 'function') prepararEdicaoProduto(p); else alert("Aguarde a Etapa 5.4!"); };
            
            const btnDeletar = document.createElement('button');
            btnDeletar.textContent = '🗑️ Ocultar';
            btnDeletar.style.cssText = 'background:#dc3545; color:white; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; flex: 1; text-align: center; min-width: 90px;';
            btnDeletar.onclick = () => { if(typeof deletarProduto === 'function') deletarProduto(p.id); else alert("Aguarde a Etapa 5.5!"); };

            zonaBotoes.appendChild(btnEditar);
            zonaBotoes.appendChild(btnDeletar);
        }

        divConteudo.appendChild(zonaBotoes);
        item.appendChild(divConteudo);
        divLista.appendChild(item);
    });
}

// -----------------------------------------------------------------------------
// EVENTOS GLOBAIS DA LISTAGEM (Ocultação, Seleção e Alternância)
// -----------------------------------------------------------------------------
function atualizarBarraAcoesLote() {
    const checkboxes = document.querySelectorAll('.chk-item:checked');
    const barraAcoes = document.getElementById('barra-acoes-lote');
    const txtContagem = document.getElementById('texto-contagem-lote');
    
    if (checkboxes.length > 0 && !estadoProdutos.exibindoLixeira && barraAcoes) {
        barraAcoes.style.display = 'flex';
        if(txtContagem) txtContagem.textContent = checkboxes.length + ' item(ns) selecionado(s)';
    } else if (barraAcoes) {
        barraAcoes.style.display = 'none';
    }
}

// Ouvintes de Clique Globais Seguros
document.addEventListener('click', function(e) {
    // Alternar entre Lixeira e Ativos
    if (e.target && e.target.id === 'btn-ver-lixeira') {
        estadoProdutos.exibindoLixeira = !estadoProdutos.exibindoLixeira;
        
        const tituloLista = document.getElementById('titulo-lista');
        const statusLixeira = document.getElementById('status-lixeira');
        
        if (tituloLista) tituloLista.textContent = estadoProdutos.exibindoLixeira ? '🗑️ Lixeira de Produtos' : '📦 Produtos Ativos';
        if (statusLixeira) statusLixeira.style.display = estadoProdutos.exibindoLixeira ? 'block' : 'none';
        
        e.target.textContent = estadoProdutos.exibindoLixeira ? '📦 Ver Ativos' : '👁️ Ver Lixeira';
        e.target.style.background = estadoProdutos.exibindoLixeira ? '#28a745' : '#6c757d';
        
        carregarListagemProdutos();
    }
    
    // Botão de Buscar (Lupa)
    if (e.target && e.target.id === 'btn-buscar-lista') {
        carregarListagemProdutos();
    }
});

// Evento de Selecionar Todos os Checkboxes
document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'chk-selecionar-todos') {
        const checkboxes = document.querySelectorAll('.chk-item');
        checkboxes.forEach(chk => chk.checked = e.target.checked);
        atualizarBarraAcoesLote();
    }
});
        














/*🟥 5.3 CADASTRAR PRODUTOS (Lógica de Inserção) 🟥*/
async function submeterFormulario() {
    const nome = document.getElementById('prod-nome').value.trim();
    const preco = parseFloat(document.getElementById('prod-preco').value);
    
    if(!nome || isNaN(preco)) return alert("Nome e Preço de Venda são obrigatórios.");
    document.getElementById('btn-salvar-produto').textContent = 'A processar...';

    // Se houver foto nova, faz o upload primeiro
    let novaImagemUrl = null;
    if (estadoProdutos.arquivoParaUpload) {
        const nomeArquivo = 'prod_' + Date.now() + '.jpg';
        novaImagemUrl = await comprimirEUploadImagem(estadoProdutos.arquivoParaUpload, 'storage_produtos', nomeArquivo);
    }

    // Coleta os dados limpos
    const idFornecedor = estadoProdutos.mapaFornecedores[document.getElementById('prod-fornecedor').value.trim()] || null;
    
    const payload = {
        nome: nome,
        descricao: document.getElementById('prod-descricao').value.trim() || null,
        fornecedor_id: idFornecedor,
        preco: preco,
        preco_custo: parseFloat(document.getElementById('prod-custo').value) || 0,
        estoque_atual: parseInt(document.getElementById('prod-estoque').value) || 0,
        estoque_minimo: parseInt(document.getElementById('prod-estoque-min').value) || 0,
        ean: document.getElementById('prod-ean').value.trim() || null,
        categoria: document.getElementById('prod-categoria').value.trim() || null,
        data_compra: document.getElementById('prod-data-compra').value || null,
        data_vencimento: document.getElementById('prod-data-vencimento').value || null
    };

    // Apenas substitui a imagem se o utilizador enviou uma foto nova
    if (novaImagemUrl) payload.imagem_url = novaImagemUrl;

    // Roteamento: Insert ou Update?
    if (estadoProdutos.idEmEdicao) {
        await executarEdicaoNoBanco(payload);
    } else {
        await executarCadastroNoBanco(payload);
    }
}

async function executarCadastroNoBanco(payload) {
    const { error } = await clienteSupabase.from('produtos').insert([payload]);
    if (error) { alert("Erro ao cadastrar."); console.error(error); } 
    else { alert("Sucesso!"); limparFormularioProdutos(); alternarAba('lista'); carregarListagemProdutos(); }
    document.getElementById('btn-salvar-produto').textContent = '💾 Salvar Produto';
}


/*🟥 5.4 EDITAR PRODUTOS (Lógica de Atualização) 🟥*/
function prepararEdicaoProduto(produto) {
    // 1. Muda o estado global para modo "Edição"
    estadoProdutos.idEmEdicao = produto.id;
    
    // 2. Preenche os campos com os dados do banco
    document.getElementById('prod-nome').value = produto.nome || '';
    document.getElementById('prod-descricao').value = produto.descricao || '';
    document.getElementById('prod-preco').value = produto.preco || '';
    document.getElementById('prod-custo').value = produto.preco_custo || '';
    document.getElementById('prod-estoque').value = produto.estoque_atual || '0';
    document.getElementById('prod-estoque-min').value = produto.estoque_minimo || '0';
    document.getElementById('prod-ean').value = produto.ean || '';
    document.getElementById('prod-categoria').value = produto.categoria || '';
    
    if(produto.data_compra) document.getElementById('prod-data-compra').value = produto.data_compra;
    if(produto.data_vencimento) document.getElementById('prod-data-vencimento').value = produto.data_vencimento;

    // Tratamento reverso do Fornecedor (Pega o ID e busca o Nome no dicionário)
    let nomeFornecedor = '';
    for (let nome in estadoProdutos.mapaFornecedores) {
        if (estadoProdutos.mapaFornecedores[nome] === produto.fornecedor_id) nomeFornecedor = nome;
    }
    document.getElementById('prod-fornecedor').value = nomeFornecedor;

    // Mostra a foto atual no Preview
    document.getElementById('img-preview').src = produto.imagem_url ? produto.imagem_url : 'https://via.placeholder.com/200?text=Sem+Foto';

    // 3. Altera o visual do formulário
    document.getElementById('titulo-formulario').textContent = '✏️ Editando: ' + produto.nome;
    document.getElementById('btn-salvar-produto').textContent = '🔄 Atualizar Produto';
    document.getElementById('btn-cancelar-edicao').style.display = 'block';

    // 4. Transporta o utilizador para a aba do formulário
    alternarAba('cadastro');
}

async function executarEdicaoNoBanco(payload) {
    const { error } = await clienteSupabase.from('produtos').update(payload).eq('id', estadoProdutos.idEmEdicao);
    if (error) { alert("Erro ao atualizar."); console.error(error); } 
    else { alert("Atualizado com sucesso!"); limparFormularioProdutos(); alternarAba('lista'); carregarListagemProdutos(); }
    document.getElementById('btn-salvar-produto').textContent = '💾 Salvar Produto';
}


/*🟥 5.5 DELETAR PRODUTOS (Soft Delete e Restauração) 🟥*/
async function deletarProduto(id) {
    if(confirm("Mover este produto para a lixeira?")) {
        // Envia a data atual para ocultar o produto sem apagar a linha fisicamente
        const { error } = await clienteSupabase.from('produtos').update({ deleted_at: new Date().toISOString() }).eq('id', id);
        if(!error) carregarListagemProdutos();
        else alert("Erro ao mover para a lixeira.");
    }
}

async function restaurarProduto(id) {
    const { error } = await clienteSupabase.from('produtos').update({ deleted_at: null }).eq('id', id);
    if(!error) carregarListagemProdutos();
    else alert("Erro ao restaurar.");
}

// Utilitário de Limpeza
function limparFormularioProdutos() {
    estadoProdutos.idEmEdicao = null;
    estadoProdutos.arquivoParaUpload = null;
    document.querySelectorAll('#aba-conteudo-cadastro input, #aba-conteudo-cadastro textarea').forEach(el => el.value = '');
    document.getElementById('prod-estoque').value = '0';
    document.getElementById('prod-estoque-min').value = '0';
    document.getElementById('info-foto').textContent = 'Nenhuma imagem selecionada';
    document.getElementById('img-preview').src = 'https://via.placeholder.com/200?text=Sem+Foto';
    document.getElementById('titulo-formulario').textContent = 'Cadastrar Novo Produto';
    document.getElementById('btn-salvar-produto').textContent = '💾 Salvar Produto';
    document.getElementById('btn-cancelar-edicao').style.display = 'none';
}

// Utilitário de Fornecedores
async function carregarFornecedores() {
    const { data } = await clienteSupabase.from('entidades').select('id, nome').eq('tipo', 'fornecedor').is('deleted_at', null);
    if (data) {
        const datalist = document.getElementById('lista-fornecedores');
        datalist.innerHTML = '';
        data.forEach(f => {
            estadoProdutos.mapaFornecedores[f.nome] = f.id;
            const op = document.createElement('option');
            op.value = f.nome; datalist.appendChild(op);
        });
    }
}









/*🟥
6.[INÍCIO: SUBSTITUIR A FUNÇÃO 'desenharModuloEntidades' EXISTENTE POR ESTE BLOCO]
🟥*/

function desenharModuloEntidades(emailDoOperador) {
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <!-- Botão para regressar ao Centro de Comando -->
                <button id="btn-voltar-menu-ent" class="icon-btn" style="margin-right: 10px;">⬅️</button>
                <div>
                    <div>🏢 Entidades</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
        </header>

        <!-- Menu de Abas de Navegação -->
        <div class="tabs-menu">
            <button id="aba-btn-cadastro" class="tab-btn active">📝 Registar</button>
            <button id="aba-btn-lista" class="tab-btn">👥 Contactos</button>
        </div>

        <!-- ABA 1: Formulário de Cadastro -->
        <div id="aba-conteudo-cadastro" class="tab-content active card">
            <div class="titulo">Nova Entidade</div>
            
            <label>Tipo de Contacto *</label>
            <select id="ent-tipo" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); outline: none;">
                <option value="cliente">Cliente</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="funcionario">Funcionário</option>
                <option value="colaborador">Colaborador</option>
            </select>

            <label>Nome Completo / Empresa *</label>
            <input type="text" id="ent-nome" placeholder="Ex: João Silva ou Distribuidora XPTO">
            
            <label>Documento (CPF/CNPJ)</label>
            <input type="text" id="ent-documento" placeholder="Opcional">
            
            <label>Telefone</label>
            <input type="text" id="ent-telefone" placeholder="Opcional">
            
            <label>E-mail</label>
            <input type="email" id="ent-email" placeholder="Opcional">

            <label>Observações</label>
            <textarea id="ent-observacoes" rows="3" placeholder="Detalhes adicionais..."></textarea>
            
            <button id="btn-salvar-entidade" class="btn-neon">Guardar Entidade</button>
        </div>

        <!-- ABA 2: Lista de Entidades -->
        <div id="aba-conteudo-lista" class="tab-content card">
            <div class="titulo">Meus Contactos</div>
            <ul id="lista-entidades">
                <li style="justify-content: center; color: var(--text-muted);">A carregar dados...</li>
            </ul>
        </div>
    `;

    // Evento para voltar ao Menu Principal
    document.getElementById('btn-voltar-menu-ent').onclick = () => desenharMenuPrincipal(emailDoOperador);

    // Lógica das Abas (Reaproveita a função auxiliar que já criámos)
    document.getElementById('aba-btn-cadastro').onclick = () => alternarAba('cadastro');
    document.getElementById('aba-btn-lista').onclick = () => {
        alternarAba('lista');
        carregarListagemEntidades(); // Atualiza a lista sempre que clicas na aba
    };

    // Lógica para Salvar Nova Entidade no Banco de Dados
    document.getElementById('btn-salvar-entidade').onclick = async () => {
        // Captura os valores dos campos
        const tipo = document.getElementById('ent-tipo').value;
        const nome = document.getElementById('ent-nome').value.trim();
        const documento = document.getElementById('ent-documento').value.trim();
        const telefone = document.getElementById('ent-telefone').value.trim();
        const email = document.getElementById('ent-email').value.trim();
        const observacoes = document.getElementById('ent-observacoes').value.trim();
        
        // Validação Mínima: A nossa tabela exige um nome com pelo menos 3 caracteres
        if (!nome || nome.length < 3) return alert("O nome é obrigatório e deve ter pelo menos 3 letras.");

        // Comunicação com o Supabase
        const { error } = await clienteSupabase.from('entidades').insert([{ 
            tipo, nome, documento, telefone, email, observacoes 
        }]);

        if (error) {
            console.error("Erro ao salvar entidade:", error);
            alert("Erro ao cadastrar. Verifica o Console Mobile para detalhes.");
        } else {
            alert("Entidade guardada com sucesso!");
            
            // Limpa os campos após salvar com sucesso
            document.getElementById('ent-nome').value = '';
            document.getElementById('ent-documento').value = '';
            document.getElementById('ent-telefone').value = '';
            document.getElementById('ent-email').value = '';
            document.getElementById('ent-observacoes').value = '';
            
            // Redireciona automaticamente para a aba da lista para melhor usabilidade (UX)
            document.getElementById('aba-btn-lista').click();
        }
    };
}

// [INÍCIO: FUNÇÃO AUXILIAR DE LISTAGEM DE ENTIDADES]
async function carregarListagemEntidades() {
    const listaElement = document.getElementById('lista-entidades');
    listaElement.innerHTML = '<li style="justify-content: center; color: var(--text-muted);">A procurar no banco de dados...</li>';
    
    // Busca as entidades que não foram deletadas, ordenando da mais recente para a mais antiga
    const { data: entidades, error } = await clienteSupabase
        .from('entidades')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

    listaElement.innerHTML = ''; 

    if (error) {
        console.error("Erro ao listar entidades:", error);
        return listaElement.textContent = "Erro ao carregar dados.";
    }
    
    if (entidades.length === 0) {
        return listaElement.textContent = "Nenhuma entidade cadastrada.";
    }

    // Processo de renderização visual dos contactos
    entidades.forEach(entidade => {
        const li = document.createElement('li');
        // Usamos flexbox em coluna para que os dados fiquem empilhados num cartão agradável
        li.style.flexDirection = 'column'; 
        li.style.alignItems = 'flex-start';

        // 1. Linha do Topo: Nome (Esquerda) e Tipo (Direita em formato de Etiqueta)
        const divTopo = document.createElement('div');
        divTopo.style.display = 'flex';
        divTopo.style.justifyContent = 'space-between';
        divTopo.style.width = '100%';
        divTopo.style.marginBottom = '5px';

        const spanNome = document.createElement('span'); 
        spanNome.textContent = entidade.nome; // BLINDAGEM XSS
        spanNome.style.fontWeight = 'bold';
        
        const spanTipo = document.createElement('span'); 
        spanTipo.textContent = entidade.tipo.toUpperCase();
        spanTipo.style.fontSize = '0.7em';
        spanTipo.style.padding = '4px 8px';
        spanTipo.style.borderRadius = '12px';
        spanTipo.style.backgroundColor = 'var(--border-color)';

        divTopo.appendChild(spanNome);
        divTopo.appendChild(spanTipo);

        // 2. Linha Secundária: Junta o telefone e o documento se existirem
        const divInfo = document.createElement('div');
        divInfo.style.fontSize = '0.85em';
        divInfo.style.color = 'var(--text-muted)';
        
        let infoTexto = [];
        if (entidade.telefone) infoTexto.push(`📞 ${entidade.telefone}`);
        if (entidade.documento) infoTexto.push(`📄 ${entidade.documento}`);
        
        divInfo.textContent = infoTexto.join(' | '); // BLINDAGEM XSS

        // Junta tudo no elemento <li>
        li.appendChild(divTopo);
        if (infoTexto.length > 0) li.appendChild(divInfo);
        
        // Adiciona à lista final no HTML
        listaElement.appendChild(li);
    });
}
//[FIM: BLOCO DE ENTIDADES]


/*🟥
7. Componente: Utilitário de Compressão e Upload de Imagens (Supabase Storage)
🟥*/

/**
 * Função global para comprimir imagens no navegador e enviar para um bucket específico.
 * @param {File} arquivoOriginal - O ficheiro de imagem selecionado no input type="file".
 * @param {String} nomeBucket - O nome do bucket no Supabase (ex: 'storage_produtos').
 * @param {String} caminhoNomeArquivo - O nome que a imagem terá no banco (ex: 'prod_123.jpg').
 * @returns {String|null} - Retorna o URL público da imagem ou null em caso de erro.
 */
async function comprimirEUploadImagem(arquivoOriginal, nomeBucket, caminhoNomeArquivo) {
    if (!arquivoOriginal) return null;

    console.log(`A iniciar compressão para o bucket: ${nomeBucket}...`);

    // 1. Envolvemos a tua lógica de compressão nativa numa Promessa (Promise) para aguardar o resultado
    const blobComprimido = await new Promise((resolve) => {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const TAMANHO_MAXIMO = 800; // Limite inteligente do teu código antigo
                let largura = img.width;
                let altura = img.height;

                // Cálculo de proporção para redimensionamento
                if (largura > altura && largura > TAMANHO_MAXIMO) {
                    altura *= TAMANHO_MAXIMO / largura;
                    largura = TAMANHO_MAXIMO;
                } else if (altura > TAMANHO_MAXIMO) {
                    largura *= TAMANHO_MAXIMO / altura;
                    altura = TAMANHO_MAXIMO;
                }

                canvas.width = largura;
                canvas.height = altura;
                const contexto = canvas.getContext('2d');
                contexto.drawImage(img, 0, 0, largura, altura);

                // Converte o canvas para um ficheiro Blob (JPEG com 70% de qualidade)
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7); 
            };
            img.src = e.target.result;
        };
        leitor.readAsDataURL(arquivoOriginal);
    });

    console.log("Compressão concluída. A iniciar upload para o Supabase...");

    // 2. Envia o ficheiro comprimido para o Supabase Storage
    const { data, error } = await clienteSupabase.storage
        .from(nomeBucket)
        .upload(caminhoNomeArquivo, blobComprimido, {
            cacheControl: '3600',
            upsert: true // Se já existir uma foto com o mesmo nome, substitui
        });

    if (error) {
        console.error(`Erro no upload para o bucket ${nomeBucket}:`, error);
        alert("Falha ao enviar a imagem. Verifica as regras RLS do teu Storage.");
        return null;
    }

    // 3. Gera e devolve o URL público para guardarmos na tabela do banco de dados
    const { data: linkPublico } = clienteSupabase.storage.from(nomeBucket).getPublicUrl(caminhoNomeArquivo);
    console.log("Upload concluído com sucesso:", linkPublico.publicUrl);
    
    return linkPublico.publicUrl;
}


/*🟥
8. Componente: Leitor de Código de Barras (Interface e Lógica Reutilizável)
🟥*/

// 1. Cria a janela do leitor de forma dinâmica (escondida por defeito) e injeta no corpo da página
const scannerModal = document.createElement('div');
scannerModal.style.cssText = `display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10001; flex-direction: column; justify-content: center; align-items: center;`;

scannerModal.innerHTML = `
    <h3 style="color: white; margin-bottom: 20px; font-family: sans-serif;">Aponte para o Código</h3>
    <div id="area-leitor-camera" style="width: 100%; max-width: 400px; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 20px;"></div>
    <button id="btn-fechar-scanner" style="padding: 12px 25px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 1.1em; cursor: pointer;">❌ Cancelar</button>
`;
document.body.appendChild(scannerModal);

let instanciaLeitor = null; // Guarda a referência da câmara

/**
 * Abre a câmara e, ao ler um código, injeta o valor diretamente num input à tua escolha.
 * @param {String} idDoInputDestino - O ID do campo HTML onde o código lido vai aparecer (ex: 'prod-ean').
 */
function abrirLeitorCodigoBarras(idDoInputDestino) {
    // Verifica se a biblioteca foi importada no index2.html
    if (typeof Html5Qrcode === 'undefined') {
        return alert("Erro: A biblioteca Html5Qrcode não foi encontrada no index2.html.");
    }

    scannerModal.style.display = 'flex'; // Mostra o ecrã preto
    instanciaLeitor = new Html5Qrcode("area-leitor-camera");

    const configLeitura = { fps: 10, qrbox: { width: 250, height: 120 } };

    // Inicia a câmara traseira
    instanciaLeitor.start(
        { facingMode: "environment" }, 
        configLeitura, 
        (codigoLido) => {
            // SUCESSO: Capturou um código!
            console.log("Código lido:", codigoLido);
            
            // Injeta o valor no campo de formulário que pedimos
            const inputDestino = document.getElementById(idDoInputDestino);
            if (inputDestino) inputDestino.value = codigoLido;

            // Desliga a câmara e fecha a janela
            fecharScanner();
        },
        (erroLeitura) => {
            // Ignoramos erros contínuos (ocorrem a cada frame que não apanha código)
        }
    ).catch((err) => {
        alert("Erro ao aceder à câmara. Verifica as permissões no telemóvel.");
        fecharScanner();
    });
}

// Botão de cancelar no ecrã do scanner
document.getElementById('btn-fechar-scanner').addEventListener('click', fecharScanner);

function fecharScanner() {
    if (instanciaLeitor) {
        instanciaLeitor.stop().then(() => {
            scannerModal.style.display = 'none';
        }).catch(() => {
            scannerModal.style.display = 'none';
        });
    } else {
        scannerModal.style.display = 'none';
    }
}




/*🟥
 FUNÇÕES AUXILIARES DE INTERFACE
🟥*/ 


function alternarAba(abaSelecionada) {
    document.getElementById('aba-btn-cadastro').classList.remove('active');
    document.getElementById('aba-btn-lista').classList.remove('active');
    document.getElementById('aba-conteudo-cadastro').classList.remove('active');
    document.getElementById('aba-conteudo-lista').classList.remove('active');

    if(abaSelecionada === 'cadastro') {
        document.getElementById('aba-btn-cadastro').classList.add('active');
        document.getElementById('aba-conteudo-cadastro').classList.add('active');
    } else {
        document.getElementById('aba-btn-lista').classList.add('active');
        document.getElementById('aba-conteudo-lista').classList.add('active');
    }
}




/*🟥
 Arranca a Aplicação
🟥*/

iniciarApp();
