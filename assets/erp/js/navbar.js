
        async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Verifica se o cliente supabase existe antes de tentar deslogar
            if (typeof _supabase !== 'undefined') {
                await _supabase.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
        }

/*
        async function sairDaConta() {
            if(confirm("Deseja realmente sair do sistema?")) {
                await _supabase.auth.signOut();
                window.location.href = 'login.html';
            }
        }
*/
