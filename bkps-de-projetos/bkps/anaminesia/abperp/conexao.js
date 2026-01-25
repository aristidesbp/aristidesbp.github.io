/** * ERP ABP PROFISSIONAL - CORE SECURITY
 * Este arquivo centraliza a conexão e segurança de todo o ecossistema.
 */
(async () => {
    "use strict";

    // Evita carregamento duplicado
    if (window.__ERP_CORE_LOADED__) return;
    window.__ERP_CORE_LOADED__ = true;

    // CONFIGURAÇÕES DO NOVO PROJETO
    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://wgmouroyptgdsgbvyrvg.supabase.co',
        SUPABASE_KEY: 'sb_publishable_QFcFrpO1NJCI3-gkyYqkQA_P5qQ5w1J',
        APP_NAME: "ERP ABP PROFISSIONAL",
        PAGES: { LOGIN: "login.html", HOME: "index.html" }
    });

    // 1. Injeção de CSS Global (Garante que a Navbar não quebre o layout das páginas)
    const injectStyles = () => {
        const css = `
            :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f8fafc; }
            body.erp-safe-area { padding-top: 75px !important; background-color: var(--bg); margin: 0; }
            .erp-navbar { position: fixed; top: 0; left: 0; width: 100%; height: 65px; background: var(--dark); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; z-index: 10000; box-shadow: 0 2px 10px rgba(0,0,0,0.3); box-sizing: border-box; }
            .erp-brand { color: white; font-weight: 700; font-size: 1.1rem; letter-spacing: 1px; }
            .erp-brand span { color: var(--primary); margin-right: 8px; }
            .erp-nav-links { display: flex; gap: 12px; }
            .erp-btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; text-decoration: none; font-size: 13px; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
            .erp-btn-home { background: rgba(255,255,255,0.1); color: white; }
            .erp-btn-home:hover { background: rgba(255,255,255,0.2); }
            .erp-btn-logout { background: #ef4444; color: white; }
            .erp-btn-logout:hover { background: #dc2626; }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    };

    // 2. Inicialização do Supabase e Proteção de Rota
    async function init() {
        // Carrega o SDK se não existir
        if (!window.supabase) {
            await new Promise(res => {
                const s = document.createElement('script');
                s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
                s.onload = res;
                document.head.appendChild(s);
            });
        }

        // Inicializa o cliente Global
        window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

        // Verifica Sessão
        const { data: { session } } = await _supabase.auth.getSession();
        const isLoginPage = window.location.pathname.includes(CONFIG.PAGES.LOGIN);

        if (!session && !isLoginPage) {
            window.location.href = CONFIG.PAGES.LOGIN;
            return;
        }

        if (session && !isLoginPage) {
            injectStyles();
            renderNavbar();
            document.body.classList.add('erp-safe-area');
        }
    }

    // 3. Renderização da Barra de Navegação
    function renderNavbar() {
        const nav = `
            <nav class="erp-navbar">
                <div class="erp-brand"><span>●</span> ${CONFIG.APP_NAME}</div>
                <div class="erp-nav-links">
                    <a href="index.html" class="erp-btn erp-btn-home"><i class="fas fa-home"></i> Início</a>
                    <button onclick="window._logout()" class="erp-btn erp-btn-logout"><i class="fas fa-power-off"></i> Sair</button>
                </div>
            </nav>`;
        document.body.insertAdjacentHTML('afterbegin', nav);
    }

    // Função Global de Logout
    window._logout = async () => {
        if (confirm("Deseja realmente sair do sistema?")) {
            await _supabase.auth.signOut();
            window.location.href = CONFIG.PAGES.LOGIN;
        }
    };

    // Inicia o processo
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
