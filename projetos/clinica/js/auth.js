const Auth = {
  // Realiza o login com email e senha
  async login(email, password) {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  // Finaliza a sessão do usuário e limpa o estado
  async logout() {
    const { error } = await window.supabaseClient.auth.signOut();
    if (error) console.error("Erro ao deslogar:", error);
    window.location.href = 'login.html';
  },

  // Verifica se o usuário está logado para proteger as páginas
  async verificarSessao() {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session && window.location.pathname !== '/login.html') {
      window.location.href = 'login.html';
    }
    return session;
  }
};
