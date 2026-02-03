/**
 * verificar_login.js
 * Função externa para verificar a autenticação do usuário.
 */
async function verificarSessao() {
    const { data: { session }, error } = await _supabase.auth.getSession();

    if (error || !session) {
        console.warn("Acesso negado: Sessão inválida ou expirada.");
        // Define o prefixo do caminho caso o arquivo esteja em subpastas
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
        return null;
    }

    console.log("Sessão ativa para:", session.user.email);
    return session;
}
