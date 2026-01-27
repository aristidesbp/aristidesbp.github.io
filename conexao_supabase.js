/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão 2.0 - Otimizada)
 * Segurança + SDK Auto-load + RBAC + Real-time Auth State */

(async () => {
    "use strict";

    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://vgrcqrplwgdyzzrhfzlb.supabase.co',
        SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncmNxcnBsd2dkeXp6cmhmemxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzA0MTEsImV4cCI6MjA4NTEwNjQxMX0.ZCE9Lj8cQHNcxwXmBRz_qlY0xNkt9DfR6ezs4wDbol8',
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
            script.async = true;
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

        /**
         * Observador em Tempo Real
         * Redireciona para o login se o usuário deslogar em qualquer aba
         */
        _supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                window.location.replace(CONFIG.LOGIN_PAGE);
            }
        });

        async function obterSessaoAtiva() {
            const { data: { session }, error } = await _supabase.auth.getSession();
            if (error || !session) {
                window.location.replace(CONFIG.LOGIN_PAGE);
                return null;
            }
            return session;
        }

        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            await _supabase.auth.signOut();
            window.location.replace(CONFIG.LOGIN_PAGE);
        }

        function renderNavbar(user) {
            if (document.querySelector(".erp-navbar")) return;

            // Lógica de Nível de Acesso (Exemplo: admin ou authenticated)
            const isAdmin = user.role === 'service_role' || user.app_metadata?.role === 'admin';

            const style = `
                <style>
                    .erp-navbar, .erp-navbar * { box-sizing: border-box; }
                    .erp-navbar { 
                        position: fixed; top: 0; left: 0; width: 100%; 
                        background: #fff; padding: 10px 15px; 
                        display: flex; justify-content: space-between; align-items: center; 
                        box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    }
                    .erp-navbar .brand { 
                        font-weight: bold; color: #0f172a; font-size: 1.1rem; 
                        display: flex; align-items: center; gap: 8px;
                    }
                    .erp-navbar .nav-right { display: flex; gap: 10px; align-items: center; }
                    
                    .erp-navbar .btn { 
                        padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; border: none; 
                        cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; 
                        gap: 6px; transition: all 0.2s ease; color: white;
                    }
                    .erp-navbar .btn-logout { background: #ef4444; }
                    .erp-navbar .btn-logout:hover { background: #dc2626; }
                    .erp-navbar .btn-home { background: #3ecf8e; }
                    .erp-navbar .btn-home:hover { background: #34b27b; }
                    .erp-navbar .btn-admin { background: #6366f1; }

                    .user-badge { font-size: 11px; background: #f1f5f9; padding: 4px 8px; border-radius: 20px; color: #64748b; border: 1px solid #e2e8f0; }

                    @media (max-width: 600px) {
                        .erp-navbar .btn span { display: none; }
                        .user-badge { display: none; }
                    }
                    body.erp-guard-active { padding-top: 70px !important; }
                </style>`;

            const html = `
                <nav class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <span class="user-badge">${user.email}</span>
                        ${isAdmin ? `<a href="admin.html" class="btn btn-admin"><i class="fas fa-lock"></i> <span>Painel</span></a>` : ''}
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i> <span>Projetos</span></a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> <span>Início</span></a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> <span>Sair</span></button>
                    </div>
                </nav>`;

            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        // Inicialização
        const inicializar = async () => {
            const session = await obterSessaoAtiva();
            if (session) {
                renderNavbar(session.user);
            }
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", inicializar);
        } else {
            inicializar();
        }

    } catch (err) {
        console.error("Erro crítico no Guard Global:", err);
    }
})();
