/**
 * navbar.js
 * Componente externo para injeção da barra de navegação.
 */
function renderNavbar() {
    const navHTML = `
    <div class="navbar">
        <div style="font-weight: 900; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-layer-group" style="color: #3ecf8e"></i> ERP ABP
        </div>
        <div style="display:flex; gap: 20px; align-items:center;">
            <select id="lang-selector" style="padding: 5px; width: auto; border-radius: 4px; border: 1px solid #e2e8f0;">
                <option value="pt">🇧🇷 PT</option>
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
            </select>
            <button onclick="location.reload()" title="Recarregar" style="background:none; border:none; cursor:pointer; color: #64748b">
                <i class="fas fa-sync"></i>
            </button>
            <button onclick="sairDaConta()" class="btn-logout" style="background: #ef4444; color:white; border:none; padding: 8px 15px; border-radius:6px; cursor:pointer; font-weight: 600;">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
}

async function sairDaConta() {
    if (confirm("Deseja encerrar a sessão no ERP ABP?")) {
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
    }
}

// Inicializa a navbar ao carregar o script
document.addEventListener('DOMContentLoaded', renderNavbar);
