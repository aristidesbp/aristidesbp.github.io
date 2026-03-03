
/**
 * src/controller/login.js
 * Escutador de eventos para o formulário
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o formulário do HTML
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            // 1. Impede a página de recarregar (essencial para o Supabase)
            event.preventDefault();

            // 2. Chama a função que está no seu model_login.js
            console.log("Iniciando processo de login...");
            await realizarLogin();
        });
    }

});
