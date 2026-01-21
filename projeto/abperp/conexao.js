
/** * ERP ABP - CORE SECURITY & NAVIGATION 
 * Padrão Profissional IIFE
 */
(async () => {
    "use strict";

    if (window.__ERP_CORE_LOADED__) return;
    window.__ERP_CORE_LOADED__ = true;

    const CONFIG = Object.freeze({
        SUPABASE_URL: 'SEU_NOVO_URL_AQUI', 
        SUPABASE_KEY: 'SUA_NOVA_KEY_AQUI',
        APP_NAME: "ERP ABP PROFISSIONAL",
        PAGES: { LOGIN: "login.html", HOME: "index.html" }
    });

    // Injeção de CSS Global para Integridade do Layout
    const injectStyles = () => {
        const css = `
            :root { --primary: #3ecf8e; --primary-hover: #36b87d; --dark: #0f172a; --bg: #f8fafc; --text: #334155; }
            body.erp-loaded { padding-top: 70px !important; background-color: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; }
            .erp-navbar { position: fixed; top: 0; width: 100%; height: 65px; background: var(--dark); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; z-index: 9999; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
            .erp-brand { color: white; font-weight: 700; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; }
            .erp-brand span { color: var(--primary); }
            .erp-nav-links { display: flex; gap: 15px; }
            .erp-btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; transition: 0.2s; text-decoration: none; font-size: 14px; display: flex; align-items: center; gap: 8px; }
            .erp-btn-home { background: rgba(255,255,255,0.1); color: white; }
            .erp-btn-home:hover { background: rgba(255,255,255,0.2); }
            .erp-btn-logout { background: #ef4444; color: white; }
            .erp-btn-logout:hover { background: #dc2626; }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    };

    async function init() {
        if (!window.supabase) {
            await new Promise(res => {
                const s = document.createElement('script');
                s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
                s.onload = res;
                document.head.appendChild(s);
            });
        }

        window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        const { data: { session } } = await _supabase.auth.getSession();

        if (!session && !window.location.pathname.includes(CONFIG.PAGES.LOGIN)) {
            window.location.href = CONFIG.PAGES.LOGIN;
            return;
        }

        if (session) {
            injectStyles();
            renderNavbar();
            document.body.classList.add('erp-loaded');
        }
    }

    function renderNavbar() {
        const nav = `
            <nav class="erp-navbar">
                <div class="erp-brand"><span>●</span> ${CONFIG.APP_NAME}</div>
                <div class="erp-nav-links">
                    <a href="index.html" class="erp-btn erp-btn-home"><i class="fas fa-th-large"></i> Painel</a>
                    <button onclick="window._logout()" class="erp-btn erp-btn-logout"><i class="fas fa-sign-out-alt"></i> Sair</button>
                </div>
            </nav>`;
        document.body.insertAdjacentHTML('afterbegin', nav);
    }

    window._logout = async () => {
        await _supabase.auth.signOut();
        window.location.href = CONFIG.PAGES.LOGIN;
    };

    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
