/**
 * navbar.js
 * Componente para injeção da barra de navegação compatível com MVC
 */
function renderNavbar() {
    const navHTML = `
    <div class="navbar" style="position: fixed; top: 0; left: 0; right: 0; height: 70px; background: white; display: flex; align-items: center; justify-content: space-between; padding: 0 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 9999;">
        <div style="font-weight: 900; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.location.href='/index.html'">
            <i class="fas fa-layer-group" style="color: #3ecf8e"></i> ERP ABP
        </div>
        <div style="display:flex; gap: 20px; align-items:center;">
            <select id="lang-selector" style="padding: 5px; width: auto; border-radius: 4px; border: 1px solid #e2e8f0; outline: none;">
                <option value="pt">🇧🇷 PT</option>
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
            </select>
            <button onclick="location.reload()" title="Recarregar" style="background:none; border:none; cursor:pointer; color: #64748b hover:color:#3ecf8e transition: 0.3s">
                <i class="fas fa-sync"></i>
            </button>
            <button onclick="sairDaConta()" class="btn-logout" style="background: #ef4444; color:white; border:none; padding: 8px 15px; border-radius:6px; cursor:pointer; font-weight: 600; transition: 0.3s" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    // Verifica se já existe um container, senão injeta no topo do body
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
}

/**
 * Função de logout integrada ao Supabase
 */
async function sairDaConta() {
    if (confirm("Deseja encerrar a sessão no ERP ABP?")) {
        try {
            // Usa a variável 'supabase' definida em config/supabase_config.js
            await supabase.auth.signOut();
            localStorage.clear();
            // Redireciona para a raiz onde está o login
            window.location.href = '/login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            // Fallback caso o supabase falhe
            window.location.href = '/login.html';
        }
    }
}

// Inicializa a navbar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
} else {
    renderNavbar();
}
