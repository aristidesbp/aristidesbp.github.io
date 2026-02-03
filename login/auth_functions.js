/** * Estrutura do auth_functions.js
 * Para começar, vamos focar na função de Gestão de Conta. 
 * O comando básico do Supabase é: supabase.auth.updateUser({ password: new_password })
 */

// 1. Alternar visualização da senha
function alternarSenha() {
    const campo = document.getElementById('password');
    campo.type = campo.type === 'password' ? 'text' : 'password';
}

// 2. Cadastro com confirmação (Sua solicitação)
async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    const confirmou = confirm(`Deseja criar uma conta para ${email}? Certifique-se de que anotou sua senha.`);
    if (!confirmou) return;

    const { data, error } = await window.supabaseClient.auth.signUp({ email, password: senha });

    if (error) alert("Erro: " + error.message);
    else alert("Cadastro realizado! Verifique seu e-mail.");
}

// 3. Solicitar Recuperação
async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link enviado ao e-mail!");
}

// 4. Salvar Nova Senha (usado na redefinir_senha.html)
async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) alert(error.message);
    else {
        alert("Senha atualizada com sucesso!");
        window.location.href = 'login.html';
    }
}
// Função para o botão de Login com Google
async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/index.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}

// Função de confirmação que chama o cadastro real
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
