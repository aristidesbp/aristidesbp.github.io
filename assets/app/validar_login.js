/**
 * js/validar_login.js
 * Proteção de rotas do ERP ABP
 */

async function validarAcesso() {
    // Busca a sessão usando o cliente global definido no conexao_supabase.js
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    if (error || !session) {
        console.warn("Acesso negado: Redirecionando para login...");
        window.location.href = 'login.html';
    } else {
        console.log("Acesso autorizado: " + session.user.email);
    }
}

// Execução imediata
validarAcesso();
