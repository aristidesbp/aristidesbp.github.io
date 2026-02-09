/** * ERP ABP - auth_functions.js
 * Local: assets/login/auth_functions.js
 */

// 1. Alternar visualização da senha
function alternarSenha() {
    const campo = document.getElementById('password');
    if (campo) campo.type = campo.type === 'password' ? 'text' : 'password';
}

// 2. Cadastro real (SignUp)
async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    const { data, error } = await window.supabaseClient.auth.signUp({ 
        email, 
        password: senha 
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
    } else {
        alert("Conta criada com sucesso! Se você desativou o 'Confirm Email', já pode entrar.");
    }
}

// 3. Função de confirmação (UX)
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");
    
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

// 4. Solicitar Recuperação (Ajustado para o caminho absoluto)
async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://aristidesbp.github.io/assets/redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link enviado! Verifique sua caixa de entrada.");
}

// 5. Salvar Nova Senha
async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("Mínimo 6 caracteres.");

    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) alert(error.message);
    else {
        alert("Senha atualizada!");
        window.location.href = 'index.html';
    }
}

// 6. Login com Google (Ajustado para o caminho absoluto)
async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // ✅ URL ABSOLUTA para evitar erros de Redirect no Supabase
            redirectTo: 'https://aristidesbp.github.io/assets/index.html'
        }
    });

    if (error) {
        console.error("Erro Google:", error.message);
        alert("Erro ao conectar com Google.");
    }
}


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
            // ✅ REDIRECIONAMENTO CORRIGIDO PARA O index:
            redirectTo: window.location.origin + '/index.html'
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
            alert("Login realizado com sucesso! Acessando o index...");
            
            // ✅ REDIRECIONAMENTO CORRIGIDO:
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}

