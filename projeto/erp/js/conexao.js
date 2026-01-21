/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão Final Corrigida - Responsiva)
 * Segurança + SDK Auto-load + Navbar + Controle de Sessão */

(async () => {
    "use strict";

    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        SUPABASE_KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX',
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "index.html",
        HUB_PAGE: "https://aristidesbp.github.io/",
        APP_NAME: "ERP ABP",
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    });

    async function carregarSDK() {
        if (window.supabase) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.SDK_URL;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Falha ao carregar SDK do Supabase"));
            document.head.appendChild(script);
        });
    }

    try {
        await carregarSDK();
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        }

        async function validarSessao() {
            try {
                const { data, error } = await _supabase.auth.getSession();
                if (error || !data || !data.session) throw new Error();
                return data.session;
            } catch (e) {
                window.location.replace(CONFIG.LOGIN_PAGE);
                return null;
            }
        }

        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            try { await _supabase.auth.signOut(); } finally { window.location.replace(CONFIG.LOGIN_PAGE); }
        }

        function renderNavbar() {
            if (document.querySelector(".erp-navbar")) return;
            const style = `
                <style>
                    /* Reset básico para a Navbar */
                    .erp-navbar, .erp-navbar * { box-sizing: border-box; }

                    .erp-navbar { 
                        position: fixed; top: 0; left: 0; width: 100%; 
                        background: #fff; padding: 10px 15px; 
                        display: flex; justify-content: space-between; align-items: center; 
                        box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; 
                        font-family: sans-serif; 
                    }
                    .erp-navbar .brand { 
                        font-weight: bold; color: #0f172a; font-size: 1.1rem; 
                        display: flex; align-items: center; gap: 5px; 
                        white-space: nowrap;
                    }
                    .erp-navbar .nav-right { display: flex; gap: 8px; flex-wrap: nowrap; }
                    
                    .erp-navbar .btn { 
                        padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; border: none; 
                        cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; 
                        gap: 5px; transition: 0.3s; white-space: nowrap; color: white;
                    }
                    .erp-navbar .btn-logout { background: #ef4444; }
                    .erp-navbar .btn-home { background: #3ecf8e; }
                    
                    /* Ajustes para Celular */
                    @media (max-width: 600px) {
                        .erp-navbar { padding: 8px 10px; }
                        .erp-navbar .brand { font-size: 0.9rem; }
                        .erp-navbar .btn span { display: none; } /* Esconde o texto, deixa só o ícone no celular se ficar apertado */
                        .erp-navbar .btn { padding: 8px 12px; font-size: 14px; }
                    }

                    body.erp-guard-active { padding-top: 70px !important; }
                </style>`;

            const html = `
                <div class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i> <span>Projetos</span></a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> <span>Início</span></a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> <span>Sair</span></button>
                    </div>
                </div>`;

            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", async () => {
                const session = await validarSessao();
                if (session) renderNavbar();
            });
        } else {
            const session = await validarSessao();
            if (session) renderNavbar();
        }

    } catch (err) {
        console.error("Erro crítico no Guard:", err);
    }
})();
