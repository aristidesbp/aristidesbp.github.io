/**
 * Nome do arquivo: src/controller/login.js
 * Objetivo: Gerenciar eventos da interface e orquestrar a lógica de login.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            // 1. Impede o recarregamento da página (comportamento padrão do form)
            event.preventDefault();

            // 2. Localiza os campos de input
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const submitButton = loginForm.querySelector('button[type="submit"]');

            // 3. Feedback visual: Desabilita o botão enquanto processa
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Autenticando...</span>';

            try {
                // 4. Chama a função do MODEL (que está no seu src/model/login.js)
                // Nota: Certifique-se de que o realizarLogin() no Model retorne o erro ou sucesso.
                await realizarLogin();

            } catch (error) {
                console.error("Erro no fluxo de login:", error);
            } finally {
                // 5. Restaura o botão após a tentativa
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});
