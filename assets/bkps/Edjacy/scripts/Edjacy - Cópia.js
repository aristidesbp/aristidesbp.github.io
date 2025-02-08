// Código para alternar tema claro/escuro
const themeToggleButton = document.getElementById('theme-toggle');
let darkMode = false;

themeToggleButton.addEventListener('click', function() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        themeToggleButton.textContent = '🌙';
    } else {
        document.body.style.backgroundColor = '#CCD4DF';
        document.body.style.color = '#333';
        themeToggleButton.textContent = '🌞';
    }
});