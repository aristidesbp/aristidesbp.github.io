// ==========================================
// app.js - Funções Globais do ERP ABP
// ==========================================

// Inicializa o Supabase globalmente (O constantes.js deve ser importado antes no HTML)
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 1. Controle de Menu Lateral
function abrirMenu() {
    document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
    document.getElementById('menu-overlay').classList.remove('hidden');
}

function fecharMenu() {
    document.getElementById('sidebar-menu').classList.add('-translate-x-full');
    document.getElementById('menu-overlay').classList.add('hidden');
}

// 2. Verificação de Autenticação
async function verificar_login(callbackInit) {
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
        
        // Executa a função de carregamento inicial da página (se existir)
        if(typeof callbackInit === 'function') {
            callbackInit();
        }
    }
}

// 3. Fazer Login
async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');
    
    if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");
    
    btn.innerText = 'Autenticando...';
    btn.disabled = true;

    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    
    if (error) {
        alert("Erro ao fazer login! Verifique suas credenciais.");
        btn.innerText = 'Entrar no Sistema';
        btn.disabled = false;
    } else {
        verificar_login(); 
    }
}

// 4. Sair da Conta
async function sairDaConta() {
    await _supabase.auth.signOut();
    fecharMenu();
    
    // Opcional: Redirecionar para o index
    // window.location.href = 'index.html'; 
    
    verificar_login();
}
