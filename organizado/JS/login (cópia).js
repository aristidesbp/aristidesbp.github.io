
    /**
 * Nome do arquivo: alternar_senha.js
 * Objetivo: Alternar a visibilidade do campo de senha entre texto e asteriscos.
 */

function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}
    

/**
 * Nome do arquivo: login_google.js
 * Objetivo: Realizar autenticação social utilizando o provedor Google via OAuth.
 */

async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Define para onde o Google deve mandar o usuário após o login.
            // Usamos window.location.origin para garantir que funcione em qualquer ambiente.
            redirectTo: window.location.origin + 'index.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}

    /**
 * Nome do arquivo: realizar_cadastro.js
 * Objetivo: Criar uma nova conta de usuário no sistema.
 */

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ 
        email, 
        password: senha 
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
    } else {
        alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login.");
    }
}

/**
 * Função de apoio para evitar cadastros acidentais (UX)
 */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");
    
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

  /**
 * Nome do arquivo: realizar_login.js
 * Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
 */

async function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}  
  
    /**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link enviado! Verifique sua caixa de entrada.");
}

async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

    // Atualiza os dados do usuário que clicou no link de recuperação
    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) {
        alert("Erro ao atualizar: " + error.message);
    } else {
        alert("Senha atualizada com sucesso!");
        window.location.href = 'index.html';
    }
}
 
