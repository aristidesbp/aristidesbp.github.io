/** * Estrutura do login_function.js
 * Para começar, vamos focar na função de Login (Sign In). 
 * O comando básico do Supabase é: supabase.auth.signInWithPassword({ email, password })
 */
/** * Trecho atualizado do auth_functions.js */

// Função para o botão de Login com Google
async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // ✅ REDIRECIONAMENTO CORRIGIDO PARA O MENU:
            redirectTo: window.location.origin + '/menu.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}

// ... restante das funções (confirmarCadastro, etc) permanecem iguais
/** * Estrutura do login_function.js atualizada */

async function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

    try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            alert("Login realizado com sucesso! Acessando o Menu...");
            
            // ✅ REDIRECIONAMENTO CORRIGIDO:
            window.location.href = 'menu.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}

