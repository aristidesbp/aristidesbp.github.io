// ── Auth ──────────────────────────────────────────────────────────────
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    const telaLogin = document.getElementById('tela-login');
    const telaSistema = document.getElementById('tela-sistema');
    if (!session) {
        telaLogin.classList.remove('hidden');
        telaSistema.classList.add('hidden');
        usuarioLogadoId = null;
    } else {
        telaLogin.classList.add('hidden');
        telaSistema.classList.remove('hidden');
        usuarioLogadoId = session.user.id;
        document.getElementById('user-display-email').innerText = session.user.email;
        document.getElementById('user-display-name').innerText = session.user.user_metadata?.full_name || 'Usuário ERP';
        if (session.user.user_metadata?.avatar_url) {
            document.getElementById('user-avatar').src = session.user.user_metadata.avatar_url;
        }
        init();
    }
}



async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');
    if (!email || !senha) return alert("Credenciais obrigatórias.");
    btn.innerText = 'Autenticando...';
    btn.disabled = true;
    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
        alert("Falha na autenticação. Verifique suas credenciais.");
        btn.innerText = 'Autenticar Acesso';
        btn.disabled = false;
    } else {
        verificar_login();
    }
}

async function sairDaConta() {
    await _supabase.auth.signOut();
    verificar_login();
}
