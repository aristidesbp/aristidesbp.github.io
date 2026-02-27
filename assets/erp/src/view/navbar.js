/**
 * navbar.js
 * Navbar 100% autônoma
 * Não depende de nenhum outro JS ou CSS
 */

(function () {

    function createNavbar() {
        const container = document.getElementById('navbar');

        // Se não existir o container, não faz nada
        if (!container) return;

        // Evita duplicação
        if (container.dataset.loaded === "true") return;
        container.dataset.loaded = "true";

        // Injeta CSS automaticamente
        const style = document.createElement('style');
        style.innerHTML = `
            .abp-navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 64px;
                background: #ffffff;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
                font-family: Arial, sans-serif;
                z-index: 1000;
            }

            .abp-navbar-brand {
                font-size: 1.1rem;
                font-weight: bold;
                color: #0f172a;
            }

            .abp-navbar-actions {
                display: flex;
                gap: 12px;
            }

            .abp-navbar-btn {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.95rem;
                color: #0f172a;
            }

            .abp-navbar-btn:hover {
                text-decoration: underline;
            }

            body {
                padding-top: 64px;
            }
        `;
        document.head.appendChild(style);

        // Injeta HTML
        container.innerHTML = `
            <header class="abp-navbar">
                <div class="abp-navbar-brand">
                    ERP ABP
                </div>

                <div class="abp-navbar-actions">
                    <button class="abp-navbar-btn" data-action="home">Início</button>
                    <button class="abp-navbar-btn" data-action="logout">Sair</button>
                </div>
            </header>
        `;

        // Comportamento básico (opcional, mas interno)
        container.addEventListener('click', function (e) {
            const action = e.target.getAttribute('data-action');
            if (!action) return;

            if (action === 'home') {
                window.location.href = 'index.html';
            }

            if (action === 'logout') {
                alert('Logout disparado (implemente sua regra aqui)');
            }
        });
    }

    // Garante execução mesmo sem defer
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createNavbar);
    } else {
        createNavbar();
    }

})();
