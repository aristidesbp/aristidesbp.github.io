/** * Estrutura do auth_functions.js
 * Para começar, vamos focar na função de Utilidades e Recuperação. 
 * O comando básico do Supabase para senha é: auth.resetPasswordForEmail(email)
 */

// 1. Função para ver/esconder a senha (Troca o tipo do input)
function alternarSenha() {
    const campo = document.getElementById('password');
    campo.type = campo.type === 'password' ? 'text' : 'password';
}

// 2. Alerta de confirmação antes de gravar no banco
async function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Digite um e-mail primeiro!");
        return;
    }
    
    const confirmou = confirm(`Deseja criar uma conta para: ${email}?`);
    if (confirmou) {
        realizarCadastro(); // Chama a função que já tínhamos
    }
}

// 3. Função de Recuperação de Senha
async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    
    if (!email) {
        alert("Por favor, digite seu e-mail para receber o link de recuperação.");
        return;
    }

    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/redefinir_senha.html',
    });

    if (error) {
        alert("Erro: " + error.message);
    } else {
        alert("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
    }
}
