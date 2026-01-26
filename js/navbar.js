/** ERP ABP - Navbar Dinâmica */
(() => {
    "use strict";

    function injectNavbar() {
        if (document.querySelector(".erp-navbar")) return;

        const style = `
        <style>
            .erp-navbar { 
                position: fixed; top: 0; left: 0; width: 100%; height: 60px;
                background: #1e293b; color: white; display: flex; 
                justify-content: space-between; align-items: center; 
                padding: 0 20px; z-index: 10000; font-family: sans-serif;
            }
            .erp-navbar .brand { font-weight: bold; color: #3ecf8e; }
            .erp-navbar .menu { display: flex; gap: 15px; }
            .erp-navbar button, .erp-navbar a { 
                background: #334155; color: white; border: none; 
                padding: 8px 15px; border-radius: 4px; cursor: pointer;
                text-decoration: none; font-size: 13px;
            }
            .erp-navbar .btn-logout { background: #ef4444; }
            body { padding-top: 70px !important; }
        </style>`;

        const html = `
        <nav class="erp-navbar">
            <div class="brand">ERP ABP Profissional</div>
            <div class="menu">
                <a href="index.html">Início</a>
                <button id="nav-btn-sair" class="btn-logout">Sair</button>
            </div>
        </nav>`;

        document.head.insertAdjacentHTML("beforeend", style);
        document.body.insertAdjacentHTML("afterbegin", html);

        document.getElementById("nav-btn-sair")?.addEventListener("click", async () => {
            if (confirm("Deseja sair?")) {
                await window._supabase.auth.signOut();
                window.location.replace("login.html");
            }
        });
    }

    // Aguarda o DOM estar pronto para injetar
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectNavbar);
    } else {
        injectNavbar();
    }
})();
