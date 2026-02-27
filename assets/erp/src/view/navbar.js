/**
 * navbar.js - ERP ABP
 * Injeção automática da barra de navegação superior
 */

function renderNavbar() {
    // Definimos o HTML da navbar
    const navHTML = `
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="/index.html" class="btn-nav btn-home">
                <i class="fas fa-home"></i> Início
            </a>
            <button class="btn-nav" onclick="sairDaConta()" style="cursor:pointer;">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>
    <div style="height: 20px;"></div> `;

    // Injeta no início do body apenas se ainda não houver uma navbar
    if (!document.querySelector('.navbar')) {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
}

/**
 * Função de Logout integrada ao cliente global 'supabase'
 */
async function sairDaConta() {
    if (confirm("Deseja realmente encerrar sua sessão no ERP ABP?")) {
        try {
            // Verifica se a variável 'supabase' (do seu config) está disponível
            if (typeof supabase !== 'undefined') {
                await supabase.auth.signOut();
            }
            
            // Limpa tudo para segurança
            localStorage.clear();
            sessionStorage.clear();
            
            // Redireciona para o login na raiz
            window.location.href = '/login.html';
        } catch (error) {
            console.error("Erro ao deslogar:", error);
            window.location.href = '/login.html';
        }
    }
}

// Inicializa a renderização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
} else {
    renderNavbar();
}
