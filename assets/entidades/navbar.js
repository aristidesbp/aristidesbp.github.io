/**
 * Componente de Navegação Global
 */
function renderizarNavbar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = `
    <nav class="navbar">
        <div class="nav-brand">
            <i class="fas fa-boxes"></i> ERP ABP - ENTIDADES
        </div>
        <div class="nav-actions">
            <select id="lang-selector" onchange="trocarIdioma(this.value)">
                <option value="pt">Português</option>
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
            <a href="index.html" class="btn-nav-back"><i class="fas fa-home"></i> Home</a>
            <button class="btn-logout-nav" onclick="efetuarLogout()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </nav>`;

    container.innerHTML = html;
}

function trocarIdioma(lang) {
    console.log(`Idioma alterado para: ${lang}`);
    // Lógica para carregar i18n futuramente
}

async function efetuarLogout() {
    if (confirm("Aristides, deseja realmente encerrar a sessão?")) {
        localStorage.removeItem('erp_abp_session');
        window.location.href = 'login.html';
    }
}

// Invocação automática se o container existir
document.addEventListener('DOMContentLoaded', () => renderizarNavbar('navbar-container'));
