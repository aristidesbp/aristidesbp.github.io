// ==========================================
// ARQUIVO: model/login.js
// OBJETIVO: Processar a entrada do usuário
// ==========================================

async function fazer_login() {
    // 1. Captura os dados da tela
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;

    // 2. Validação de campos vazios
    if (!email || !password) {
        alert("Por favor, preencha o e-mail e a senha.");
        return;
    }

    // 3. Efeito visual no botão (Mostra que está carregando)
    const btn = event.currentTarget || document.querySelector('button');
    const textoOriginal = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Autenticando...';
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-not-allowed');

    try {
        // 4. Envia o pedido de login usando a conexão global criada no supabase_config.js
        const { data, error } = await window.supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        // 5. Lida com erros (Senha errada, usuário não existe)
        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                alert("Acesso negado: E-mail ou senha incorretos.");
            } else {
                alert("Erro ao tentar entrar: " + error.message);
            }
            
            // Devolve o botão ao estado normal para o usuário tentar de novo
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
            btn.classList.remove('opacity-70', 'cursor-not-allowed');
            return;
        }

        // 6. Sucesso
        console.log("Login aprovado! Bem-vindo.");
        
        // Limpa os campos por segurança
        document.getElementById('input-email').value = '';
        document.getElementById('input-password').value = '';

        // O redirecionamento (ou a troca de divs) deve acontecer através do 
        // listener "onAuthStateChange" no arquivo principal do seu painel.

    } catch (err) {
        console.error("Erro crítico:", err);
        alert("Falha de conexão com o servidor.");
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-not-allowed');
    }
}

console.log("✅ Conexão com: model/login.js");
