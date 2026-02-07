/** * ERP ABP - auth_functions.js
 * Local: assets/login/auth_functions.js
 */

// 1. Alternar visualização da senha
function alternarSenha() {
    const campo = document.getElementById('password');
    campo.type = campo.type === 'password' ? 'text' : 'password';
}

// 2. Cadastro real (chamado pela confirmação)
async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    try {
        const { data, error } = await window.supabaseClient.auth.signUp({ 
            email, 
            password: senha 
        });

        if (error) {
            alert("Erro: " + error.message);
        } else {
            alert("Cadastro realizado! Se você desativou o 'Confirm Email' no Supabase, já pode tentar o login.");
        }
    } catch (err) {
        console.error("Erro inesperado no cadastro:", err);
    }
}

// 3. Função de confirmação (UX para o usuário)
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Digite um e-mail primeiro!");
        return;
    }
    
    const confirmou = confirm(`Deseja criar uma conta para: ${email}?`);
    if (confirmou) {
        realizarCadastro(); 
    }
}

// 4. Solicitar Recuperação de Senha
async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        // Redireciona para o arquivo na pasta assets
        redirectTo: 'https://aristidesbp.github.io/assets/redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link de recuperação enviado ao seu e-mail!");
}

// 5. Salvar Nova Senha (usado na redefinir_senha.html)
async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) alert(error.message);
    else {
        alert("Senha atualizada com sucesso!");
        window.location.href = 'menu.html';
    }
}

// 6. Login com Google (Ajustado para o seu novo redirecionamento)
async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // ✅ Redirecionamento absoluto para evitar erro de autorização
            redirectTo: 'https://aristidesbp.github.io/assets/menu.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}
