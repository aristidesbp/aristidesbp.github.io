/**
 * Alterna a visibilidade da senha (UI)
 */
function toggleVisibility() {
    const passInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');

    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggleBtn.innerText = passInput.type === 'password' ? '👁️' : '🙈';
}

/**
 * Orquestra o processo de Autenticação
 */
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabaseSignIn(email, password);

    if (error) alert("Erro: " + error.message);
    else window.location.href = 'index.html';
}

/**
 * Orquestra a recuperação de senha
 */
async function forgotPassword() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await supabaseResetPassword(email);

    if (error) alert(error.message);
    else alert("Link de recuperação enviado!");
}

/**
 * Detecta se o usuário chegou por link de recuperação e ajusta a UI
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
 * Valida e solicita a atualização da senha
 */
async function updatePassword() {
    const newPassword = document.getElementById('password').value;

    if (newPassword.length < 6) {
        return alert("Mínimo 6 caracteres.");
    }

    const { error } = await supabaseUpdatePassword(newPassword);

    if (error) alert(error.message);
    else {
        alert("Senha atualizada!");
        window.location.hash = "";
        window.location.reload();
    }
}

// Executa verificação de recuperação ao carregar a página
window.onload = checkRecovery;
