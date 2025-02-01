// Navbar.js

const menu = document.getElementById('menu');
const mainContent = document.getElementById('main-content');

// Verifica se os elementos estão presentes na página
if (menu && mainContent) {
    // Alterna o estado do menu lateral
    function toggleMenu() {
        const isOpen = menu.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    }

    // Abre o menu lateral
    function openMenu() {
        menu.classList.add('active');
        menu.setAttribute('aria-hidden', 'false');
        mainContent.classList.add('overlay');
    }

    // Fecha o menu lateral
    function closeMenu() {
        menu.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
        mainContent.classList.remove('overlay');
    }

    // Fecha o menu ao clicar fora dele (exceto no botão de menu)
    window.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !event.target.closest('.menu-btn')) {
            closeMenu();
        }
    });

    // Fecha o menu ao pressionar ESC
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}
