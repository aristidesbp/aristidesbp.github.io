/** ############################################################################## */
/** ############################################################################## */
/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão Final Otimizada)
 * Segurança + Navbar + Controle de Sessão */

(() => {
    "use strict";

    // 1. Evita execução duplicada
    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    // 2. CONFIGURAÇÃO CENTRALIZADA (Baseada nos seus códigos)
    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        SUPABASE_KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX',
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "index.html", // Conforme seu primeiro código
        HUB_PAGE: "https://aristidesbp.github.io/", // PROJETOS DO HUB
        APP_NAME: "ERP ABP"
    });

    // 3. INICIALIZAÇÃO DO SUPABASE (Caso não exista globalmente)
    if (typeof window._supabase === "undefined") {
        try {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        } catch (e) {
            console.error("Erro ao carregar Supabase. Verifique o script CDN no HTML.");
            return;
        }
    }

    // 4. VALIDAÇÃO DE SESSÃO DEFENSIVA
    async function validarSessao() {
        try {
            const { data, error } = await _supabase.auth.getSession();
            if (error || !data || !data.session) {
                throw new Error("Sessão inválida");
            }
            return data.session;
        } catch (e) {
            window.location.replace(CONFIG.LOGIN_PAGE);
            return null;
        }
    }

    // 5. FUNÇÃO DE LOGOUT
    async function logout() {
        if (!confirm("Deseja realmente sair do sistema?")) return;

        try {
            await _supabase.auth.signOut();
        } catch (_) {
            // Falha silenciosa
        } finally {
            window.location.replace(CONFIG.LOGIN_PAGE);
        }
    }



    
/** ############################################################################## */
/** ############################################################################## */
/** ############################################################################## */
// 6. RENDERIZAÇÃO DA NAVBAR

    
    function renderNavbar() {
        if (document.querySelector(".erp-navbar")) return;

        const style = `
            <style>
                .erp-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: #fff;
                    padding: 15px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,.1);
                    z-index: 9999;
                    font-family: sans-serif;
                }
                .erp-navbar .brand {
                    font-weight: bold;
                    color: #0f172a;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .erp-navbar .nav-right {
                    display: flex;
                    gap: 15px;
                }
                .erp-navbar .btn {
                    padding: 8px 15px;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 14px;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: 0.3s;
                }
                .erp-navbar .btn-logout {
                    background: #ef4444;
                    color: white;
                }
                .erp-navbar .btn-logout:hover {
                    background: #dc2626;
                }
                .erp-navbar .btn-home {
                    background: #3ecf8e;
                    color: white;
                }
                .erp-navbar .btn-home:hover {
                    background: #36b87d;
                }
                body.erp-guard-active {
                    padding-top: 80px !important;
                }
            </style>
        `;

        const html = `
            <div class="erp-navbar">
                <div class="brand">
                    <span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}
                </div>
                <div class="nav-right">
                    <a href="${CONFIG.HUB_PAGE}" class="btn btn-home">Meus projetos</a>
                    <a href="${CONFIG.HOME_PAGE}" class="btn btn-home">Início</a>
                    <button class="btn btn-logout" id="btnSair">Sair</button>
                </div>
            </div>
        `;

        document.head.insertAdjacentHTML("beforeend", style);
        document.body.insertAdjacentHTML("afterbegin", html);
        document.body.classList.add("erp-guard-active");

        document.getElementById("btnSair")?.addEventListener("click", logout);
    }


    
/** ############################################################################## */
/** ############################################################################## */
/** ############################################################################## */   
// 7. EXECUÇÃO AO CARREGAR
    document.addEventListener("DOMContentLoaded", async () => {
        const session = await validarSessao();
        if (session) {
            renderNavbar();
        }
    });

})();
