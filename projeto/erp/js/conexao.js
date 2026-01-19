/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão Auto-Suficiente)
 * Segurança + SDK Auto-load + Navbar + Controle de Sessão */

(async () => {
    "use strict";

    // 1. Evita execução duplicada
    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    // 2. CONFIGURAÇÃO CENTRALIZADA
    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        SUPABASE_KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX',
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "index.html",
        HUB_PAGE: "https://aristidesbp.github.io/",
        APP_NAME: "ERP ABP",
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    });

    // 3. FUNÇÃO PARA CARREGAR O SDK DO SUPABASE DINAMICAMENTE
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
        
        // Inicializa o cliente se não existir
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        }

        // 4. VALIDAÇÃO DE SESSÃO
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

        // 5. LOGOUT
        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            try { await _supabase.auth.signOut(); } finally { window.location.replace(CONFIG.LOGIN_PAGE); }
        }

        // 6. NAVBAR
        function renderNavbar() {
            if (document.querySelector(".erp-navbar")) return;
            const style = `
                <style>
                    .erp-navbar { position: fixed; top: 0; left: 0; width: 100%; background: #fff; padding: 15px 25px; 
                                 display: flex; justify-content: space-between; align-items: center; 
                                 box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; font-family: sans-serif; }
                    .erp-navbar .brand { font-weight: bold; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 8px; }
                    .erp-navbar .nav-right { display: flex; gap: 10px; }
                    .erp-navbar .btn { padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px; border: none; 
                                     cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: 0.3s; }
                    .erp-navbar .btn-logout { background: #ef4444; color: white; }
                    .erp-navbar .btn-home { background: #3ecf8e; color: white; }
                    body.erp-guard-active { padding-top: 80px !important; }
                </style>`;
            const html = `
                <div class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i>Projetos</a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> Início</a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> Sair</button>
                    </div>
                </div>`;
            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        // 7. INICIALIZAÇÃO
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
