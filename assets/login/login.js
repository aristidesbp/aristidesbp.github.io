

const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Criação do cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Alterna a visibilidade da senha
 */
function toggleVisibility() {
    const passInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');

    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggleBtn.innerText = passInput.type === 'password' ? '👁️' : '🙈';
}

/**
 * Apenas Login
 */
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) alert("Erro: " + error.message);
    else window.location.href = 'index.html';
}

/**
 * Envio de e-mail para recuperação de senha
 */
async function forgotPassword() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await _supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href
    });

    if (error) alert(error.message);
    else alert("Link de recuperação enviado!");
}

/**
 * Detecta se o usuário chegou por link de recuperação
 */
async function checkRecovery() {
    const hash = window.location.hash;

    if (hash && (hash.includes("type=recovery") || hash.includes("access_token="))) {
        document.getElementById('form-subtitle').innerText = "🔑 Defina sua nova senha";
        document.getElementById('email-group').style.display = 'none';
        document.getElementById('btn-auth').innerText = "Salvar Nova Senha";
        document.getElementById('btn-auth').onclick = updatePassword;
        document.getElementById('link-forgot').style.display = 'none';
    }
}

/**
 * Atualiza a senha do usuário
 */
async function updatePassword() {
    const newPassword = document.getElementById('password').value;

    if (newPassword.length < 6) {
        return alert("Mínimo 6 caracteres.");
    }

    const { error } = await _supabase.auth.updateUser({ password: newPassword });

    if (error) alert(error.message);
    else {
        alert("Senha atualizada!");
        window.location.hash = "";
        window.location.reload();
    }
}

// Executa verificação de recuperação ao carregar a página
window.onload = checkRecovery;
