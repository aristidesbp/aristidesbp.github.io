/**
 * navbar.js
 * Injeta automaticamente a navbar dentro de #navbar
 * Depende apenas do CSS externo já existente
 */

(function () {

    function initNavbar() {
        const container = document.getElementById('navbar');

        // Se não existir o container, não faz nada
        if (!container) return;

        // Evita reinjeção
        if (container.dataset.loaded === 'true') return;
        container.dataset.loaded = 'true';

        // HTML da navbar (APENAS VIEW)
        container.innerHTML = `
            <header class="navbar">
                <div class="navbar-brand">
                    <span class="navbar-title">ERP ABP</span>
                </div>

                <nav class="navbar-actions">
                    <a href="index.html" class="btn-nav">
                        Início
                    </a>

                    <button class="btn-nav btn-logout" type="button">
                        Sair
                    </button>
                </nav>
            </header>
        `;
    }

    // Execução segura, com ou sem defer
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

})();
