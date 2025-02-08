
        // Função para abrir ou fechar a sidebar
        function toggleMenu() {
            document.getElementById('menu').classList.toggle('active');
        }

        // Função para fechar a sidebar
        function closeMenu() {
            document.getElementById('menu').classList.remove('active');
        }

        // Função para alternar entre o tema claro e escuro
        function toggleTheme() {
            document.body.classList.toggle('dark-theme');  // Altera o tema do corpo
            document.querySelector('.navbar').classList.toggle('dark-theme'); // Altera a navbar
            document.querySelector('.sidebar').classList.toggle('dark-theme'); // Altera a sidebar
        }

function copyCode() {
var textarea = document.getElementById('navbar-code');
            textarea.select();
            document.execCommand('copy');
            alert('Código copiado com sucesso!');
        }
