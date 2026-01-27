/** ERP ABP - Navbar Dinâmica */
(() => {
    "use strict";

    function injectNavbar() {
        if (document.querySelector(".erp-navbar") || window.location.pathname.includes('login.html')) return;

        const style = `
        <style>
            .erp-navbar { 
                position: fixed; top: 0; left: 0; width: 100%; height: 60px;
                background: #1e293b; color: white; display: flex; 
                justify-content: space-between; align-items: center; 
                padding: 0 20px; z-index: 10000; box-sizing: border-box;
            }
            .erp-navbar .brand { font-weight: bold; color: #3ecf8e; font-size: 1.1rem; }
            .erp-navbar .menu { display: flex; gap: 10px; }
            .erp-navbar button, .erp-navbar a { 
                background: #334155; color: white; border: none; 
                padding: 8px 15px; border-radius: 4px; cursor: pointer;
                text-decoration: none; font-size: 13px; transition: 0.2s;
            }
            .erp-navbar button:hover, .erp-navbar a:hover { background: #475569; }
            .erp-navbar .btn-logout { background: #ef4444; }
            .erp-navbar .btn-logout:hover { background: #dc2626; }
            body { padding-top: 70px !important; }
        </style>`;

        const html = `
        <nav class="erp-navbar">
            <div class="brand">ERP ABP Profissional</div>
            <div class="menu">
                <a href="index.html">Início</a>
                <a href="entidades.html">Entidades</a>
                <a href="financeiro.html">Financeiro</a>
                <button id="nav-btn-sair" class="btn-logout">Sair</button>
            </div>
        </nav>`;

        document.head.insertAdjacentHTML("beforeend", style);
        document.body.insertAdjacentHTML("afterbegin", html);

        document.getElementById("nav-btn-sair")?.addEventListener("click", async () => {
            if (confirm("Deseja encerrar a sessão?")) {
                await window.db.auth.signOut();
                window.location.replace("login.html");
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectNavbar);
    } else {
        injectNavbar();
    }
})();
