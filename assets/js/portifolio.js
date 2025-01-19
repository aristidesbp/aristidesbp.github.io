
const menu = document.getElementById('menu');
const body = document.body;
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
let menuTimeout;

function toggleMenu() {
    menu.classList.toggle('active');
    menu.setAttribute('aria-hidden', !menu.classList.contains('active'));
    
    // Se o menu abrir, iniciamos um temporizador de 1 minuto
    if (menu.classList.contains('active')) {
        menuTimeout = setTimeout(() => {
            closeMenu();
        }, 60000);  // 60000 ms = 1 minuto
    } else {
        clearTimeout(menuTimeout);  // Se o menu for fechado manualmente, cancelamos o temporizador
    }
}

function closeMenu() {
    menu.classList.remove('active');
    menu.setAttribute('aria-hidden', 'true');
}

function toggleTheme() {
    const isLight = body.classList.contains('light-theme');
    body.classList.toggle('light-theme', !isLight);
    body.classList.toggle('dark-theme', isLight);
    themeToggleBtn.innerHTML = isLight ? '🌞' : '🌙';
}

// Fechar menu caso clique fora dele
document.addEventListener('click', function(event) {
    const isClickInsideMenu = menu.contains(event.target) || event.target.closest('.menu-btn');
    
    // Se o clique não for no menu ou no botão de menu, fechamos o menu
    if (!isClickInsideMenu) {
        closeMenu();
        clearTimeout(menuTimeout);  // Cancelar o temporizador caso o menu seja fechado manualmente
    }
});

    
            
