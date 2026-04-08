// Aguarda a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verifica se a pessoa já está logada. Se sim, joga ela direto pro painel.
    verificarSeJaLogado();

    // 2. Permite fazer login apertando a tecla "Enter" no campo de senha
    document.getElementById('login-senha').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            fazerLogin();
        }
    });
});

// Função para redirecionar quem já tem sessão ativa
async function verificarSeJaLogado() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        window.location.href = 'index.html';
    }
}

// Função principal de autenticação
async function fazerLogin() {
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value;
    const errorMsg = document.getElementById('error-msg');
    const btnLogin = document.getElementById('btn-login');

    // Esconde mensagens de erro anteriores
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';

    // Validação básica
    if (!email || !senha) {
        mostrarErro("Por favor, preencha o e-mail e a senha.");
        return;
    }

    // Muda o botão para estado de "Carregando"
    btnLogin.disabled = true;
    btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validando acesso...';

    try {
        // Tenta fazer o login no Supabase
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        // Se houver erro (senha errada, user não existe), lança para o catch
        if (error) throw error;

        // Sucesso! Redireciona para o index
        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erro no login:", error);
        
        // Traduzindo mensagens comuns de erro do Supabase
        if (error.message.includes('Invalid login credentials')) {
            mostrarErro("E-mail ou senha incorretos.");
        } else {
            mostrarErro("Ocorreu um erro. Tente novamente mais tarde.");
        }
        
    } finally {
        // Restaura o botão ao estado normal se o login falhar
        btnLogin.disabled = false;
        btnLogin.innerHTML = 'Entrar no Sistema';
    }
}

// Função auxiliar para injetar o texto de erro na tela
function mostrarErro(mensagem) {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensagem}`;
    errorMsg.style.display = 'block';
}
