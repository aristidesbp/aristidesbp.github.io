(async () => {
    "use strict";
    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    const DB_NAME = "ERP_ABP_Local";
    const DB_VERSION = 1;

    // Inicializa o IndexedDB
    const initDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("entidades")) db.createObjectStore("entidades", { keyPath: "id", autoIncrement: true });
                if (!db.objectStoreNames.contains("produtos")) db.createObjectStore("produtos", { keyPath: "id", autoIncrement: true });
                if (!db.objectStoreNames.contains("notes")) db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
                if (!db.objectStoreNames.contains("financeiro")) db.createObjectStore("financeiro", { keyPath: "id", autoIncrement: true });
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Erro ao abrir IndexedDB");
        });
    };

    window.getDB = initDB;

    // Injeção de CSS e Navbar (Mantendo seu padrão)
    const style = document.createElement('style');
    style.textContent = `
        :root { --primary: #2c3e50; --accent: #3498db; --light: #ecf0f1; }
        body { font-family: 'Segoe UI', sans-serif; margin: 0; background: var(--light); }
        .nav-bar { background: var(--primary); color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
        .nav-bar a { color: white; text-decoration: none; margin-left: 15px; font-weight: bold; }
        .container { padding: 20px; max-width: 1200px; margin: auto; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 20px; }
        button { cursor: pointer; padding: 10px 15px; border: none; border-radius: 4px; background: var(--accent); color: white; }
    `;
    document.head.appendChild(style);

    const renderNavbar = () => {
        const nav = document.createElement('nav');
        nav.className = 'nav-bar';
        nav.innerHTML = `
            <div style="font-size: 1.2rem;">ERP ABP Profissional (Modo Local)</div>
            <div>
                <a href="index.html">Home</a>
                <a href="entidades.html">Entidades</a>
                <a href="produtos.html">Produtos</a>
                <a href="financeiro.html">Financeiro</a>
                <a href="notas.html">Notas</a>
            </div>
        `;
        document.body.prepend(nav);
    };

    renderNavbar();
})();
