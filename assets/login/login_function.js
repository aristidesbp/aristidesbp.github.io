/** * Estrutura do login_function.js
 * Para começar, vamos focar na função de Login (Sign In). 
 * O comando básico do Supabase é: supabase.auth.signInWithPassword({ email, password })
 */

// Esta função valida as credenciais de um usuário que já possui cadastro
async function realizarLogin() {
    // 1. Captura os dados digitados pelo aluno/cliente nos campos de texto
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // 2. Validação visual rápida para evitar requisições vazias
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

    try {
        // 3. O 'signInWithPassword' verifica se o e-mail e a senha coincidem no banco de dados
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            // Se as credenciais estiverem erradas ou o usuário não existir
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);
        } else {
            // Login bem-sucedido! O Supabase cria uma sessão automática no navegador
            console.log("Bem-vindo de volta!", data.user.email);
            alert("Login realizado com sucesso! Redirecionando...");
            
            // Redireciona o usuário para a página principal (index.html)
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}

