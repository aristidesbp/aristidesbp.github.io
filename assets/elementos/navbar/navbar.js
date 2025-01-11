<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARISTIDES B.
      
<!-- Script para manipular a abertura e fechamento do menu lateral e alternância de tema -->
<script>
    // Obtém a referência ao menu lateral
    const menu = document.getElementById('menu');
    const body = document.body;
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    
    // Alterna o estado do menu lateral
    function toggleMenu() {
        menu.classList.toggle('active');
        menu.setAttribute('aria-hidden', !menu.classList.contains('active'));
    }

    // Fecha o menu lateral
    function closeMenu() {
        menu.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
    }

    // Fecha o menu ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !event.target.closest('.menu-btn')) {
            closeMenu();
        }
    });

    // Fecha o menu ao pressionar a tecla ESC
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    // Alterna entre tema claro e escuro
    function toggleTheme() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            menu.classList.remove('light-theme');
            menu.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '🌞'; // Muda o ícone para sol (tema claro)
            document.querySelectorAll('.sidebar a').forEach((link) => {
                link.classList.remove('light-theme');
                link.classList.add('dark-theme');
            });
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            menu.classList.remove('dark-theme');
            menu.classList.add('light-theme');
            themeToggleBtn.innerHTML = '🌙'; // Muda o ícone para lua (tema escuro)
            document.querySelectorAll('.sidebar a').forEach((link) => {
                link.classList.remove('dark-theme');
                link.classList.add('light-theme');
            });
        }
    }
</script>

 
