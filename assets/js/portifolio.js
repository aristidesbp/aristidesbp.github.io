
        // Função para abrir a sidebar
        function toggleMenu() {
            document.getElementById('menu').classList.toggle('active');
        }

  
              // Função para fechar a sidebar
        function closeMenu() {
            document.getElementById('menu').classList.remove('active');
        }


        // Função para fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            var menu = document.getElementById('menu');
            var menuBtn = document.querySelector('.menu-btn');
            
            if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
                closeMenu();
            }
        });
 
        
        // Função para alternar entre o tema claro e escuro
        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            document.querySelector('.navbar').classList.toggle('dark-theme');
            document.querySelector('.sidebar').classList.toggle('dark-theme');
        }
