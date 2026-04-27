// Toggle Visibilidade da Senha
document.getElementById('password-toggle').addEventListener('click', function() {
    const input = document.getElementById('password');
    const icon = this.querySelector('.material-symbols-outlined');
    const isPassword = input.type === 'password';
    
    input.type = isPassword ? 'text' : 'password';
    icon.textContent = isPassword ? 'visibility_off' : 'visibility';
});

// Manipulação do Login
const loginForm = document.getElementById('login-form');
const errorContainer = document.getElementById('auth-error');
const errorMessage = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI State: Loading
    errorContainer.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-spin material-symbols-outlined">progress_activity</span>`;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Captura o token do Cloudflare Turnstile
    const captchaResponse = document.querySelector('[name="cf-turnstile-response"]').value;

    if (!captchaResponse) {
        showError("Por favor, complete a verificação de segurança.");
        resetButton();
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
            options: {
                captchaToken: captchaResponse // Validação real no Supabase
            }
        });

        if (error) throw error;

        if (data.user) {
            // Redirecionamento instantâneo
            window.location.href = '../menu_nivel_acesso/index.html';
        }
    } catch (error) {
        showError(translateError(error.message));
        resetButton();
    }
});

function showError(msg) {
    errorMessage.textContent = msg;
    errorContainer.classList.remove('hidden');
}

function resetButton() {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Acessar Sistema</span><span class="material-symbols-outlined text-sm">arrow_forward</span>`;
}

function translateError(msg) {
    if (msg.includes('Invalid login credentials')) return "E-mail ou senha incorretos.";
    if (msg.includes('captcha')) return "Falha na verificação de segurança.";
    return msg;
}

// Social Login
document.getElementById('google-login').addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/menu_nivel_acesso/index.html' }
    });
    if (error) showError(error.message);
});
