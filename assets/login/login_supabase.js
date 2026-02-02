// Configurações de Conexão
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Inicialização do cliente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Realiza o login com e-mail e senha
 */
async function supabaseSignIn(email, password) {
    return await _supabase.auth.signInWithPassword({ email, password });
}

/**
 * Solicita e-mail de recuperação de senha
 */
async function supabaseResetPassword(email) {
    return await _supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href
    });
}

/**
 * Atualiza a senha do usuário autenticado
 */
async function supabaseUpdatePassword(newPassword) {
    return await _supabase.auth.updateUser({ password: newPassword });
}
