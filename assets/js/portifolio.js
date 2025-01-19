// Seleciona o elemento com id 'menu' (que é o menu lateral) e o armazena na variável 'menu'
const menu = document.getElementById('menu');

// Seleciona o elemento <body> e o armazena na variável 'body'
const body = document.body;

// Seleciona o botão de alternância de tema e o armazena na variável 'themeToggleBtn'
const themeToggleBtn = document.querySelector('.theme-toggle-btn');

// Declara uma variável para armazenar o identificador do temporizador do menu
let menuTimeout;

// Função para alternar a visibilidade do menu
function toggleMenu() {
    // Alterna a classe 'active' no menu, o que faz o menu abrir ou fechar
    menu.classList.toggle('active');
    
    // Atualiza o atributo 'aria-hidden' para refletir se o menu está aberto ou fechado
    menu.setAttribute('aria-hidden', !menu.classList.contains('active'));
    
    // Se o menu for aberto, iniciamos um temporizador para fechá-lo automaticamente depois de 1 minuto
    if (menu.classList.contains('active')) {
        menuTimeout = setTimeout(() => {
            closeMenu();  // Chama a função para fechar o menu após 1 minuto (60000 ms)
        }, 60000);  // 60000 ms = 1 minuto
    } else {
        // Se o menu for fechado manualmente, cancelamos o temporizador
        clearTimeout(menuTimeout);
    }
}

// Função para fechar o menu manualmente
function closeMenu() {
    // Remove a classe 'active' do menu, fazendo com que ele feche
    menu.classList.remove('active');
    
    // Define o atributo 'aria-hidden' como 'true' quando o menu é fechado
    menu.setAttribute('aria-hidden', 'true');
}

// Função para alternar o tema entre claro e escuro
function toggleTheme() {
    // Verifica se o tema atual é o claro
    const isLight = body.classList.contains('light-theme');
    
    // Alterna entre os temas claro e escuro
    body.classList.toggle('light-theme', !isLight);  // Se for claro, aplica o tema escuro e vice-versa
    body.classList.toggle('dark-theme', isLight);
    
    // Altera o conteúdo do botão para refletir o tema atual (sol ou lua)
    themeToggleBtn.innerHTML = isLight ? '🌞' : '🌙';
}

// Evento para fechar o menu caso o usuário clique fora dele
document.addEventListener('click', function(event) {
    // Verifica se o clique foi dentro do menu ou no botão de menu
    const isClickInsideMenu = menu.contains(event.target) || event.target.closest('.menu-btn');
    
    // Se o clique não foi no menu ou no botão de menu, fechamos o menu
    if (!isClickInsideMenu) {
        closeMenu();  // Fecha o menu
        clearTimeout(menuTimeout);  // Cancela o temporizador caso o menu seja fechado manualmente
    }
});
