// Configurações do Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Inicializa o cliente globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Bloqueia o acesso se não estiver logado
 */
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        // Verifica se a página está na raiz ou em subpasta para ajustar o caminho do login
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}

// Executa automaticamente ao carregar o script
validarAcesso();

