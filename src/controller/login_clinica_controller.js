import { Autenticador } from '../model/realizar_login.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const auth = new Autenticador();

    if (btnEntrar) {
        btnEntrar.addEventListener('click', async (event) => {
            event.preventDefault();

            // O Controller conhece o HTML e extrai os valores
            const email = document.getElementById('input-email').value;
            const senha = document.getElementById('input-senha').value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // O Controller envia os dados puros para o Model universal
            const resultado = await auth.realizar_login(email, senha);

            if (resultado.sucesso) {
                console.log("Login realizado com sucesso!");
                // Redirecionamento após sucesso
                window.location.href = 'analizar_nivel_acesso.html';
            } else {
                alert("Erro ao entrar: " + resultado.erro);
            }
        });
    }
});
