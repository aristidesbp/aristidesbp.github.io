/**
 * Nome do arquivo: src/controller/login.js
 * Objetivo: Capturar dados da View, validar e chamar o Model.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            // Impede a página de recarregar
            event.preventDefault();

            // 1. CAPTURA DOS DADOS (Ponte View -> Controller)
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;
            const submitButton = loginForm.querySelector('button[type="submit"]');

            // 2. VALIDAÇÃO DE FRONT-END
            if (!email || !senha) {
                alert("Por favor, preencha todos os campos antes de continuar! ✍️");
                return;
            }

            // 3. FEEDBACK VISUAL (Início do carregamento)
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="animate-spin material-symbols-outlined">sync</span>
                <span>Autenticando...</span>
            `;

            try {
                // 4. CHAMADA AO MODEL (Ponte Controller -> Model)
                // A função realizarLogin() deve estar global no model_login.js
                await realizarLogin(email, senha);

            } catch (error) {
                console.error("Erro crítico no login:", error);
                alert("Ocorreu um erro inesperado. Tente novamente.");
            } finally {
                // 5. FINALIZAÇÃO DO FEEDBACK
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
});
