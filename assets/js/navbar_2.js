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

        
    <!-- NAVBAR -->
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
     <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>
<!-- FIM DA NAVBAR -->
            
        `;
    }

    // Execução segura, com ou sem defer
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

})();
