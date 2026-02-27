/**
 * navbar.js - ERP ABP
 * Injeção automática da barra de navegação superior
 */

function renderNavbar() {
    const navHTML = `
    <nav style="position: fixed; top: 0; left: 0; right: 0; height: 70px; background: #ffffff; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; box-shadow: 0 2px 15px rgba(0,0,0,0.08); z-index: 9999; font-family: 'Inter', sans-serif;">
        
        <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="window.location.href='/index.html'">
            <div style="background: #3ecf8e; width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
                <i class="fas fa-layer-group"></i>
            </div>
            <span style="font-weight: 800; color: #0f172a; font-size: 1.25rem; letter-spacing: -0.5px;">ERP <span style="color: #3ecf8e;">ABP</span></span>
        </div>

        <div style="display: flex; align-items: center; gap: 20px;">
            
            <a href="/index.html" style="text-decoration: none; color: #64748b; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: 0.3s;" onmouseover="this.style.color='#3ecf8e'" onmouseout="this.style.color='#64748b'">
                <i class="fas fa-home"></i> Painel
            </a>

            <div style="width: 1px; height: 24px; background: #e2e8f0;"></div>

            <select style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 8px; font-size: 13px; color: #475569; outline: none; cursor: pointer;">
                <option value="pt">🇧🇷 PT</option>
                <option value="en">🇺🇸 EN</option>
            </select>

            <button onclick="sairDaConta()" style="background: #fee2e2; color: #ef4444; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s;" onmouseover="this.style.background='#fecaca'" onmouseout="this.style.background='#fee2e2'">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </nav>
    
    <div style="height: 70px;"></div>
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
