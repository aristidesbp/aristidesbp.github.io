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
        window.location.href = 'menu.html';
    }
}

// 6. Login com Google (Ajustado para o caminho absoluto)
async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // ✅ URL ABSOLUTA para evitar erros de Redirect no Supabase
            redirectTo: 'https://aristidesbp.github.io/assets/menu.html'
        }
    });

    if (error) {
        console.error("Erro Google:", error.message);
        alert("Erro ao conectar com Google.");
    }
}
