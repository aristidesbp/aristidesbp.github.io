// ============================================================================
// APP.JS - ARQUIVO UNIFICADO (Console + Configuração + Lógica SPA)
// ============================================================================

// ----------------------------------------------------------------------------
// PARTE 1: CONSOLE ESPELHO (Para debug no telemóvel)
// ----------------------------------------------------------------------------
const consoleContainer = document.createElement('div');
consoleContainer.style.cssText = `position: fixed; bottom: 60px; left: 10px; right: 10px; height: 300px; background: rgba(0, 0, 0, 0.9); color: #00ff00; font-family: monospace; font-size: 12px; padding: 10px; overflow-y: scroll; z-index: 9999; display: none; border-radius: 5px; box-shadow: 0px -2px 10px rgba(0,0,0,0.5);`;

const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🛠️ Console';
toggleBtn.style.cssText = `position: fixed; bottom: 10px; right: 10px; padding: 10px 15px; background: #2980b9; color: white; border: none; border-radius: 5px; font-weight: bold; z-index: 10000; box-shadow: 0px 2px 5px rgba(0,0,0,0.3);`;

document.body.appendChild(consoleContainer);
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    consoleContainer.style.display = consoleContainer.style.display === 'none' ? 'block' : 'none';
});

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


// ----------------------------------------------------------------------------
// PARTE 2: CONFIGURAÇÃO DO SUPABASE
// ----------------------------------------------------------------------------
const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co';
// Define a URL do teu banco de dados
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
// Define a chave pública de acesso

let clienteSupabase;
if (typeof supabase !== 'undefined') {
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase inicializado com sucesso.");
} else {
    console.error("❌ Erro: Biblioteca do Supabase não encontrada.");
}


// ----------------------------------------------------------------------------
// PARTE 3: LÓGICA DA SINGLE PAGE APPLICATION (SPA)
// ----------------------------------------------------------------------------
const appRoot = document.getElementById('app-root');
// Captura a div vazia do HTML onde tudo será desenhado.

async function iniciarApp() {
// Função mestre que decide que ecrã mostrar dependendo se o utilizador está logado.
    const { data: { session } } = await clienteSupabase.auth.getSession();
    
    if (session) {
        desenharDashboard(session.user.email);
        // Utilizador tem sessão: mostra o sistema.
    } else {
        desenharLogin();
        // Utilizador não tem sessão: mostra a área de acesso.
    }
}

function desenharLogin() {
// Responsável por injetar o HTML dos formulários de Login e Registo.
    appRoot.innerHTML = `
        <div class="card">
            <div class="titulo">⚡ Acesso ao ERP</div>
            
            <!-- Formulário de Login -->
            <div id="area-login">
                <label>E-mail</label>
                <input type="email" id="login-email" placeholder="seu@email.com">
                <label>Senha</label>
                <input type="password" id="login-senha" placeholder="••••••••">
                
                <button id="btn-entrar" class="btn-neon">Entrar</button>
                <button id="btn-ir-registo" class="btn-secundario">Criar Nova Conta</button>
            </div>

            <!-- Formulário de Cadastro de Conta (Inicia oculto) -->
            <div id="area-registo" style="display: none;">
                <label>Novo E-mail</label>
                <input type="email" id="reg-email" placeholder="novo@email.com">
                <label>Criar Senha</label>
                <input type="password" id="reg-senha" placeholder="Mínimo 6 caracteres">
                
                <button id="btn-registar" class="btn-neon">Concluir Registo</button>
                <button id="btn-voltar-login" class="btn-secundario">Voltar ao Login</button>
            </div>
        </div>
    `;

    // Lógica para alternar entre Login e Registo visualmente
    document.getElementById('btn-ir-registo').onclick = () => {
        document.getElementById('area-login').style.display = 'none';
        document.getElementById('area-registo').style.display = 'block';
    };
    
    document.getElementById('btn-voltar-login').onclick = () => {
        document.getElementById('area-registo').style.display = 'none';
        document.getElementById('area-login').style.display = 'block';
    };

    // Ação: Executar Login
    document.getElementById('btn-entrar').onclick = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-senha').value;
        if(!email || !password) return alert("Preencha todos os campos.");

        const { error } = await clienteSupabase.auth.signInWithPassword({ email, password });
        if (error) alert("Erro: " + error.message);
        else iniciarApp(); // Se sucesso, recarrega o ecrã para mostrar o Dashboard!
    };

    // Ação: Executar Registo
    document.getElementById('btn-registar').onclick = async () => {
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-senha').value;
        if(!email || !password) return alert("Preencha todos os campos.");

        const { error } = await clienteSupabase.auth.signUp({ email, password });
        if (error) alert("Erro: " + error.message);
        else {
            alert("Conta criada! Pode fazer login.");
            document.getElementById('btn-voltar-login').click(); // Volta para a tela de login
        }
    };
}

function desenharDashboard(emailDoOperador) {
// Responsável por injetar o cabeçalho, formulário de cadastro de produto e lista.
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <span class="logo-icon">⚡</span> 
                <div>
                    <div>ERP Supermercado</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
            <div class="header-actions">
                <!-- Botão de Tema -->
                <button id="btn-tema" class="icon-btn" title="Alterar Tema">🌓</button>
                <!-- Botão de Sair -->
                <button id="btn-sair" class="icon-btn" title="Sair do Sistema" style="color: var(--danger-color);">🚪</button>
            </div>
        </header>

        <!-- Formulário de Cadastro de Produto -->
        <div class="card">
            <div class="titulo">Cadastrar Produto</div>
            <label>Nome do Produto</label>
            <input type="text" id="prod-nome" placeholder="Ex: Arroz 5kg">
            <label>Preço (R$)</label>
            <input type="number" id="prod-preco" placeholder="Ex: 25.90" step="0.01">
            
            <button id="btn-salvar-produto" class="btn-neon">Salvar Produto</button>
        </div>

        <!-- Área de Listagem Injetada -->
        <div class="card">
            <div class="titulo">Meus Produtos</div>
            <ul id="lista-produtos">
                <li style="justify-content: center; color: var(--text-muted);">A carregar dados...</li>
            </ul>
        </div>
    `;

    // Ação: Botão Tema
    document.getElementById('btn-tema').onclick = () => {
        document.body.classList.toggle('light-theme');
    };

    // Ação: Botão Sair (Logout)
    document.getElementById('btn-sair').onclick = async () => {
        if(confirm("Deseja encerrar a sessão?")) {
            await clienteSupabase.auth.signOut();
            iniciarApp(); // Volta ao ecrã de login imediatamente
        }
    };

    // Ação: Guardar Novo Produto
    document.getElementById('btn-salvar-produto').onclick = async () => {
        const nome = document.getElementById('prod-nome').value;
        const preco = parseFloat(document.getElementById('prod-preco').value);
        
        if(!nome || !preco) return alert("Preencha o nome e o preço.");

        const { error } = await clienteSupabase.from('produtos').insert([{ nome, preco }]);
        if (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao cadastrar. Veja o console.");
        } else {
            document.getElementById('prod-nome').value = '';
            document.getElementById('prod-preco').value = '';
            carregarListagem(); // Mágica do SPA: Atualiza a lista na hora, sem recarregar a página!
        }
    };

    // Pede ao banco de dados para listar os produtos atuais
    carregarListagem();
}

async function carregarListagem() {
// Lógica para procurar os produtos no banco e criar os itens da lista <li>
    const listaElement = document.getElementById('lista-produtos');
    const { data: produtos, error } = await clienteSupabase.from('produtos').select('*').is('deleted_at', null);

    listaElement.innerHTML = ''; // Apaga o texto "A carregar..."

    if (error) {
        listaElement.textContent = "Erro ao carregar os dados.";
        return;
    }
    if (produtos.length === 0) {
        listaElement.textContent = "Nenhum produto cadastrado.";
        return;
    }

    // Passa por cada produto e adiciona à tela com proteção Anti-XSS (textContent)
    produtos.forEach(produto => {
        const li = document.createElement('li');
        
        // Cria visualmente as duas colunas: Nome à esquerda, Preço à direita
        const spanNome = document.createElement('span');
        spanNome.textContent = produto.nome;
        
        const spanPreco = document.createElement('span');
        spanPreco.textContent = `R$ ${produto.preco}`;
        spanPreco.style.color = 'var(--accent-neon)';

        li.appendChild(spanNome);
        li.appendChild(spanPreco);
        listaElement.appendChild(li);
    });
}

// ----------------------------------------------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------------------------------------------
// Dispara o fluxo principal assim que o ficheiro é lido pelo navegador
iniciarApp();
