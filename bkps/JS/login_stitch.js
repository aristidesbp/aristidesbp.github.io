
    // Supabase Configuration Initialization (From TEXT_8)
    const supabaseUrl = 'https://jnvfdnyzharfiwptmmcs.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudmZkbnl6aGFyZml3cHRtbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODUyMjYsImV4cCI6MjA4OTE2MTIyNn0.kK4d5lyNSZtvP-rOwRNZ2p0fYD3auXQh-zvgzKNWxh0';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const recaptchaCheckbox = document.getElementById('recaptcha');
    const recaptchaBox = document.getElementById('recaptcha-box');
    const errorMessageDiv = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const googleLoginBtn = document.getElementById('googleLoginBtn');

    // 1. Password Visibility Toggle
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });

    // 3. Google Login Mock
    googleLoginBtn.addEventListener('click', () => {
        alert("O login via Google requer configuração adicional de OAuth na plataforma Supabase. Por favor, utilize e-mail e senha para prosseguir.");
        console.log("Mock: Google Login clicked.");
    });

    // 2. & 4. Functional Login Logic
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset state
        errorMessageDiv.classList.add('hidden');
        errorMessageDiv.textContent = '';
        recaptchaBox.classList.remove('invalid');

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation
        if (!email || !password) {
            showError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!recaptchaCheckbox.checked) {
            recaptchaBox.classList.add('invalid');
            showError("Por favor, confirme que você não é um robô.");
            return;
        }

        // UI Loading State
        setLoading(true);

        try {
            // Supabase Sign In
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                showError(translateError(error.message));
                setLoading(false);
            } else {
                // Success - Redirect to loading screen (index.html per requirements)
                console.log("Login successful:", data);
                window.location.href = 'index.html';
            }
        } catch (err) {
            console.error(err);
            showError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            setLoading(false);
        }
    });

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.remove('hidden');
    }

    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
            btnText.textContent = 'Autenticando...';
            btnIcon.textContent = 'sync';
            btnIcon.classList.add('animate-spin');
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
            btnText.textContent = 'Entrar';
            btnIcon.textContent = 'login';
            btnIcon.classList.remove('animate-spin');
        }
    }

    function translateError(message) {
        if (message.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
        if (message.includes('Email not confirmed')) return 'Por favor, confirme seu e-mail antes de entrar.';
        return message;
    }
