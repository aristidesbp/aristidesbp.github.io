// URL do projeto Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';

// Chave pública (publishable) para uso no frontend
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Cria o cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função responsável por verificar se o usuário está autenticado
async function checkUser() {
    // Obtém a sessão atual
    const { data: { session } } = await _supabase.auth.getSession();

    // Se não existir sessão, redireciona para o login
    if (!session) {
        window.location.href = 'login.html';
    }
}

// Executa a verificação após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    checkUser();
});