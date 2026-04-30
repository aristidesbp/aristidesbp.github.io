// login.js

// 🔐 Inicialização do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🎯 Função principal
export async function iniciarLoginSistema() {
    await verificar_login();
}

// 🔍 Verifica sessão
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        renderizarTelaLogin();
    } else {
        removerTelaLogin();
        if (typeof loadtarefas === "function") {
            loadtarefas();
        }
    }
}

// 🧱 Cria HTML do login automaticamente
function renderizarTelaLogin() {
    // Evita duplicar tela
    if (document.getElementById('tela-login')) return;

    const div = document.createElement('div');
    div.id = "tela-login";
    div.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f172a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    div.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 12px;
            width: 100%;
            max-width: 350px;
            text-align: center;
            border-top: 5px solid #10b981;
        ">
            <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 20px;">
                ERP ABP
            </h2>

            <input type="email" id="login-email" placeholder="E-mail" 
                style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px;">

            <input type="password" id="login-senha" placeholder="Senha" 
                style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ccc; border-radius:6px;">

            <button id="btn-login" 
                style="background:#10b981; color:white; width:100%; padding:12px; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">
                Entrar
            </button>
        </div>
    `;

    document.body.appendChild(div);

    // Evento botão
    document.getElementById('btn-login').addEventListener('click', fazerLogin);
}

// ❌ Remove tela login
function removerTelaLogin() {
    const tela = document.getElementById('tela-login');
    if (tela) tela.remove();
}

// 🔑 Faz login
async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const { error } = await _supabase.auth.signInWithPassword({
        email,
        password: senha
    });

    if (error) {
        alert("Erro: " + error.message);
    } else {
        verificar_login();
    }
}
