// Função para alternar o tema entre claro e escuro
function toggleTheme() {
    const body = document.body; // Obtém a referência ao elemento <body> do documento
    body.classList.toggle('dark-theme'); // Adiciona ou remove a classe 'dark-theme' no <body>
    // Se a classe 'dark-theme' já estiver presente, ela será removida. Caso contrário, será adicionada.
}

// Função para alternar a exibição do menu (abrir ou fechar)
function toggleMenu() {
    const menu = document.getElementById('menu'); // Obtém a referência ao elemento com o ID 'menu'
    menu.classList.toggle('active'); // Adiciona ou remove a classe 'active' no menu
    // A classe 'active' pode ser usada para mostrar/ocultar o menu ou alterar seu estilo.
}

// Função para fechar o menu explicitamente
function closeMenu() {
    const menu = document.getElementById('menu'); // Obtém a referência ao elemento com o ID 'menu'
    menu.classList.remove('active'); // Remove a classe 'active' do menu
    // Isso garante que o menu seja fechado (escondido), mesmo que esteja aberto.
}
