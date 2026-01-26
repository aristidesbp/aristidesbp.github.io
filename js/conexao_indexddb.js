/** * ERP ABP PROFISSIONAL - CONEXÃO AUTO-GERENCIÁVEL
 */
(function() {
    "use strict";

    const DB_NAME = "ERP_ABP_PROFISSIONAL_LOCAL";
    const DB_VERSION = 1; 

    // LISTA DE TABELAS (Já deixamos todas prontas para você não ter que voltar aqui)
    const TABELAS = [
        "produtos", 
        "entidades", 
        "financeiro", 
        "vendas", 
        "configuracoes",
        "notas"
    ];

    window.getDB = function() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // LOOP INTELIGENTE: Cria cada tabela se ela ainda não existir
                TABELAS.forEach(nomeTabela => {
                    if (!db.objectStoreNames.contains(nomeTabela)) {
                        db.createObjectStore(nomeTabela, { keyPath: "id" });
                        console.log(`Tabela [${nomeTabela}] criada com sucesso.`);
                    }
                });
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Erro ao acessar banco local.");
        });
    };

    // Injeção de CSS para o Menu (Padrão Profissional)
    const style = document.createElement('style');
    style.innerHTML = `
        .navbar-abp { background: #0f172a; padding: 15px; display: flex; gap: 20px; position: fixed; top: 0; width: 100%; z-index: 1000; }
        .navbar-abp a { color: white; text-decoration: none; font-weight: bold; font-size: 14px; opacity: 0.8; }
        .navbar-abp a:hover { opacity: 1; }
    `;
    document.head.appendChild(style);

    // Proteção de Login
    if (!sessionStorage.getItem('erp_is_logged') && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }

    console.log("🚀 ERP ABP: Banco de dados local pronto para uso.");
})();
