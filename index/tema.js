/**
 * Nome do arquivo: tema.js
 * Objetivo: Alternar entre os temas dark e light no documento.
 */
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark'); 
        html.classList.add('light');
        icon.innerText = 'dark_mode'; // Ícone para quando estiver claro
    } else {
        html.classList.remove('light'); 
        html.classList.add('dark');
        icon.innerText = 'light_mode'; // Ícone para quando estiver escuro
    }
}
