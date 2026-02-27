/**
 * navbar.js - ERP ABP
 * Injeção automática da barra de navegação superior
 */

function renderNavbar() {
    const navHTML = `
    <!-- navbar -->
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>
<!-- fim navbar -->
    `;

    
    // Injeta no início do body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

/**
 * Função de Logout integrada ao Supabase
 */
async function sairDaConta() {
    if (confirm("Deseja realmente encerrar sua sessão?")) {
        try {
            // Verifica se o cliente supabase existe no escopo global
            if (typeof supabase !== 'undefined') {
                await supabase.auth.signOut();
            }
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/login.html';
        } catch (error) {
            console.error("Erro ao deslogar:", error);
            window.location.href = '/login.html';
        }
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', renderNavbar);
