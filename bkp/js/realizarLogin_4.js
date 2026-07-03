async function realizarLogin() {
// Declara a função assíncrona responsável por submeter as credenciais de login.

    const email = document.getElementById('email').value;
    // Captura o valor textual digitado pelo usuário no campo de input com ID 'email'.

    const senha = document.getElementById('password').value;
    // Captura o valor textual digitado pelo usuário no campo de input com ID 'password'.

    if (!email || !senha) {
    // Verifica se algum dos campos (e-mail ou senha) foi deixado em branco pelo usuário.

        alert("Preencha o e-mail e a senha.");
        // Exibe um alerta nativo na tela exigindo o preenchimento caso a validação falhe.

        return;
        // Interrompe a execução da função imediatamente se os campos estiverem vazios.
    }

    try {
    // Inicia o bloco de monitoramento de erros para capturar falhas inesperadas na execução.

        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
        // CORREÇÃO: Altera de 'window.supabase' para 'window.supabaseClient' para acessar a instância correta da SDK do Supabase. Evita o erro de undefined.

            email: email,
            // Passa a string do e-mail coletada do formulário como parâmetro para a API do Supabase.

            password: senha,
            // Passa a string da senha coletada do formulário como parâmetro para a API do Supabase.
        });

        if (error) {
        // Verifica se a API do Supabase retornou algum erro de autenticação (ex: senha incorreta ou usuário inexistente).

            console.error("Erro na autenticação:", error.message);
            // Registra no console do desenvolvedor a mensagem de erro exata retornada pelo servidor.

            alert("Erro ao entrar: " + error.message);
            // Exibe ao usuário um alerta com a justificativa do fracasso no login.

        } else {
        // Executado caso as credenciais estejam corretas e o token de sessão seja gerado com sucesso.

            console.log("Bem-vindo de volta!", data.user.email);
            // Imprime uma mensagem de sucesso no console confirmando o e-mail do usuário autenticado.

            window.location.href = 'index.html';
            // Redireciona o navegador para a página do painel principal ('index.html').
        }
    } catch (err) {
    // Captura qualquer erro crítico ou exceção lançada que não tenha vindo diretamente da API do Supabase.

        console.error("Erro de execução no código:", err);
        // Exibe o rastreamento completo da exceção (stack trace) no console para depuração técnica.

        alert("Falha crítica no sistema. Verifique o console.");
        // Notifica o usuário final sobre a ocorrência de um erro inesperado no script.
    }
}
