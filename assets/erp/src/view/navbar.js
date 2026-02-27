/**
 * controller_navbar.js
 * Injeta automaticamente a VIEW (HTML) da navbar
 * Arquitetura MVC - ERP ABP
 */

(function () {

    function injectNavbar() {
        // Garante que o DOM existe
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', injectNavbar);
            return;
        }

        // Evita duplicação
        if (document.querySelector('.navbar')) return;

        const html = `
            <header class="navbar">
                <div class="navbar-brand">
                    <i class="fas fa-chart-line"></i>
                    <span>ERP ABP</span>
                </div>

                <nav class="navbar-actions">
                    <a href="index.html" class="btn-nav">
                        <i class="fas fa-home"></i>
                        <span>Início</span>
                    </a>

                    <button class="btn-nav btn-logout" type="button">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sair</span>
                    </button>
                </nav>
            </header>

            <div class="navbar-spacer"></div>
        `;

        document.body.insertAdjacentHTML('afterbegin', html);
    }

    // Autoexecução segura
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectNavbar);
    } else {
        injectNavbar();
    }

})();
