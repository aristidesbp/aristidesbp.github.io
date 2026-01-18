// Funções de Autenticação e Segurança
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) window.location.href = 'login.html';
}

async function sairDaConta() {
    if(confirm("Sair?")) {
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
    }
}

