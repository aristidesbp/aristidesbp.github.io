/**
 * navbar.js
 * Injeta a navbar e adiciona a lógica de Logout (Nível Bancário)
 */

(function () {

    function initNavbar() {
        const container = document.getElementById('navbar');

        if (!container) return;
        if (container.dataset.loaded === 'true') return;
        container.dataset.loaded = 'true';

        // HTML da navbar
        container.innerHTML = `
        <style>
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: white;
                padding: 15px 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
                box-sizing: border-box;
            }
            .nav-buttons {
                display: flex;
                gap: 15px;
            }
            .btn-nav {
                background: #ef4444;
                color: white !important;
                padding: 8px 15px;
                border-radius: 6px;
                font-weight: bold;
                font-size: 14px;
                border: none;
                cursor: pointer;
                transition: 0.3s;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            .btn-home {
                background: #3ecf8e !important;
            }
        </style>
        <div class="navbar">
            <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
                <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
            </div>
            <div class="nav-buttons">
                <a href="https://aristidesbp.github.io/assets/erp" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
                <button class="btn-nav" onclick="sairDaConta()">
                    <i class="fas fa-sign-out-alt"></i> Sair
                </button>
            </div>
        </div>
        `;
    }

    // --- LOGICA DE LOGOUT (NÍVEL BANCÁRIO) ---
    // Anexamos ao objeto 'window' para que o onclick="sairDaConta()" funcione
    
    
    window.sairDaConta = async function() {
    if (!confirm("Deseja realmente sair do sistema?")) return;

    try {
        // CORREÇÃO: Usando o nome correto do cliente global
        if (window.supabaseClient) {
            const { error } = await window.supabaseClient.auth.signOut();
            if (error) throw error;
        }

        // Limpa tudo
        localStorage.clear();
        sessionStorage.clear();

        // Redireciona para o login
        window.location.href = 'login.html'; 

    } catch (error) {
        console.error('Erro ao encerrar sessão:', error.message);
        // Se falhar o logout no servidor, limpamos o local e saímos assim mesmo
        localStorage.clear();
        window.location.href = 'login.html';
    }
};

    
    
    

    // Execução
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

})();
