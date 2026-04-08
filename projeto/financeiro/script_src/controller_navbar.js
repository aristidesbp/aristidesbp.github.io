// ============================================================================
// COMPONENTE VISUAL DA NAVBAR (HTML + CSS)
// ============================================================================
// Nota: O Supabase (_supabase) já foi inicializado no arquivo 'model_supabase_config.js',
// por isso não precisamos declarar as variáveis de conexão aqui.

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
    <a href="index.html" class="navbar-logo">
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
// FUNÇÕES DE AUTENTICAÇÃO E CONTROLE
// ============================================================================

// Verifica se o utilizador está logado
async function verificar_login() {
    const { data: { session }, error } = await _supabase.auth.getSession();
    
    if (error || !session) {
        // Se não houver sessão ativa, manda de volta para a tela de login.
        // Ajuste este link para o nome real do seu arquivo de login (ex: login.html ou view_entidades.html)
        window.location.href = 'login.html'; 
    } else {
        // BÔNUS: Substitui o texto "Utilizador" no index.html pelo nome real ou e-mail da pessoa
        const spanNomeUsuario = document.getElementById('nome-usuario');
        if (spanNomeUsuario) {
            // Tenta pegar o nome completo, se não tiver, pega a parte antes do @ do e-mail
            const nome = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
            spanNomeUsuario.textContent = nome;
        }
    }
}

// Função para fazer logout
async function sairDaConta() {
    await _supabase.auth.signOut();
    // Ajuste este link para o nome real do seu arquivo de login
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
