
// Cria o cliente Supabase (pressupõe que a biblioteca do Supabase foi importada no HTML)
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ============================================================================
// COMPONENTE VISUAL DA NAVBAR (HTML + CSS)
// ============================================================================
const navbarHTML = `
<style>
    /* Estilos exclusivos da Navbar */
    .navbar-container { 
        position: fixed; top: 0; left: 0; width: 100%; 
        background: white; padding: 15px 25px; 
        display: flex; justify-content: space-between; align-items: center; 
        box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; 
        font-family: 'Inter', sans-serif; box-sizing: border-box;
    }
    .navbar-logo {
        font-weight: bold; color: #0f172a; font-size: 1.2rem; 
        text-decoration: none; cursor: pointer;
    }
    .btn-nav { 
        padding: 8px 15px; border-radius: 6px; font-weight: bold; 
        font-size: 14px; text-decoration: none; display: inline-flex; 
        align-items: center; gap: 8px; transition: 0.3s;
    }
    .btn-logout { 
        background: #ef4444; color: white; border: none; cursor: pointer; 
    }
    .btn-logout:hover {
        background: #dc2626;
    }
    /* Compensa o menu fixo no topo para o resto do site não ficar escondido */
    body { padding-top: 85px !important; }
</style>

<div class="navbar-container">
    <a href="menu.html" class="navbar-logo">
        <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
    </a>
    <div style="display: flex; gap: 1rem;">
        <button class="btn-nav btn-logout" onclick="sairDaConta()">
            <i class="fas fa-sign-out-alt"></i> Sair do Sistema
        </button>
    </div>
</div>
`;

// ============================================================================
// FUNÇÕES DE AUTENTICAÇÃO E CONTROLO
// ============================================================================

// Verifica se o utilizador está logado
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    
    if (!session) {
        // Se não houver sessão ativa, manda de volta para a tela de login
        // Ajuste o caminho 'login.html' conforme a estrutura das suas pastas
        window.location.href = 'login.html'; 
    }
}

// Função para fazer logout
async function sairDaConta() {
    await _supabase.auth.signOut();
    window.location.href = 'login.html';
}

// ============================================================================
// INICIALIZAÇÃO AO CARREGAR A PÁGINA
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Injeta a Navbar onde houver a div <div id="navbar"></div>
    const divNavbar = document.getElementById('navbar');
    if (divNavbar) {
        divNavbar.innerHTML = navbarHTML;
    }

    // 2. Verifica a segurança da página
    verificar_login();
});
