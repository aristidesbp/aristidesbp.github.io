// Função para garantir que apenas usuários logados acessem a página
async function checarAutenticacao() {
    // Busca a sessão atual do cliente que configuramos no supabase_config.js
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    // Se houver erro ou se a sessão estiver vazia (null)
    if (error || !session) {
        console.log("Acesso negado: Usuário não autenticado.");
        // Redireciona para a raiz onde está o login.html, conforme sua estrutura
        window.location.href = "../login.html";
    } else {
        console.log("Acesso autorizado para:", session.user.email);
    }
}

// Executa a verificação assim que o script é carregado
checarAutenticacao();
