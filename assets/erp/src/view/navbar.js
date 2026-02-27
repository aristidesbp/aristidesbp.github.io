/**
 * controller_navbar.js
 * Controller responsável apenas por injetar a VIEW (HTML) da navbar
 * Arquitetura MVC - ERP ABP
 */

(function () {

    function renderNavbarHTML() {
        // Evita duplicação da VIEW
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

    // Exporta apenas a renderização da VIEW
    window.renderNavbarHTML = renderNavbarHTML;

})();


// controller_auth.js
document.addEventListener('DOMContentLoaded', () => {

    renderNavbarHTML();

    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-logout')) {
            // regra de negócio fica AQUI
            localStorage.clear();
            window.location.href = 'login.html';
        }
    });

});
