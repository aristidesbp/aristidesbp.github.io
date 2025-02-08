// Código para alternar tema claro/escuro
const themeToggleButton = document.getElementById('theme-toggle');
let darkMode = false;
const backgroundSlider = document.querySelector('.background-slider');

// Função para trocar a imagem de fundo
function changeBackgroundImage() {
    if (darkMode) {
        // Caso o tema seja escuro, altere o estilo de fundo conforme necessário
        backgroundSlider.style.animation = 'backgroundSliderDark 15s infinite'; // Modo escuro
    } else {
        // Caso o tema seja claro, altere o estilo de fundo conforme necessário
        backgroundSlider.style.animation = 'backgroundSlider 15s infinite'; // Modo claro
    }
}

themeToggleButton.addEventListener('click', function() {
    darkMode = !darkMode;
    
    // Alterando o fundo da página e o conteúdo do botão de tema
    if (darkMode) {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        themeToggleButton.textContent = '🌙'; // Ícone para tema escuro
    } else {
        document.body.style.backgroundColor = '#CCD4DF';
        document.body.style.color = '#333';
        themeToggleButton.textContent = '🌞'; // Ícone para tema claro
    }
    
    // Chama a função para mudar a imagem de fundo
    changeBackgroundImage();
});

// Inicialização para garantir que o tema e o fundo sejam configurados corretamente ao carregar a página
changeBackgroundImage();