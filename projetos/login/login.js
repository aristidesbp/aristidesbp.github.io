

document.getElementById('password-toggle').addEventListener('click', function() {
  const passwordInput = document.getElementById('password-input');
  const icon = this.querySelector('.material-symbols-outlined');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.textContent = 'visibility_off';
  } else {
    passwordInput.type = 'password';
    icon.textContent = 'visibility';
  }
});

document.getElementById('captcha-checkbox-container').addEventListener('click', function() {
  const checkIcon = document.getElementById('captcha-check');
  checkIcon.classList.toggle('hidden');
  if (!checkIcon.classList.contains('hidden')) {
    this.classList.add('border-primary');
  } else {
    this.classList.remove('border-primary');
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function handleLogin() {
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const captchaChecked = !document.getElementById('captcha-check').classList.contains('hidden');

  if (!email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (!captchaChecked) {
    alert('Por favor, confirme que você não é um robô.');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    if (data.user) {
      window.location.href = 'index.html';
    }
  } catch (error) {
    alert('Erro ao entrar: ' + error.message);
  }
}

async function handleSocialLogin(provider) {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.origin + '/index.html'
      }
    });
    if (error) throw error;
  } catch (error) {
    alert(`Erro ao entrar com ${provider}: ` + error.message);
  }
}

document.getElementById('login-button').addEventListener('click', (e) => {
  e.preventDefault();
  handleLogin();
});

document.getElementById('google-login').addEventListener('click', () => handleSocialLogin('google'));
document.getElementById('apple-login').addEventListener('click', () => handleSocialLogin('apple'));

