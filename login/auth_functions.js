/** * Estrutura do auth_functions.js
 * Para começar, vamos focar na função de Cadastro (Sign Up). 
 * O comando básico do Supabase é: supabase.auth.signUp({ email, password })
 */

// Esta função será chamada quando o usuário clicar no botão de cadastro
async function realizarCadastro() {
    // 1. Capturamos os valores dos campos de input usando o ID definido no HTML
    // O '.value' extrai exatamente o que o aluno/cliente digitou
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // 2. Validação simples para garantir que os campos não estão vazios
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        // 3. Chamamos o método signUp do cliente Supabase que está no supabase_config.js
        const { data, error } = await window.supabaseClient.auth.signUp({
            email: email,
            password: senha,
        });

        if (error) {
            console.error("Erro ao cadastrar:", error.message);
            alert("Erro: " + error.message);
        } else {
            console.log("Cadastro realizado com sucesso!", data);
            alert("Verifique seu e-mail para confirmar o cadastro!");
        }
    } catch (err) {
        console.error("Erro inesperado:", err);
    }
}

/** * Função para Login com Google
 * O comando básico do Supabase é: supabase.auth.signInWithOAuth({ provider: 'google' })
 */
async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Define para onde o usuário volta após autorizar no Google
            redirectTo: window.location.origin + '/index.html'
        }
    });

    if (error) console.error("Erro no login Google:", error.message);
}
