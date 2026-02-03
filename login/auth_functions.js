async function loginComGoogle() {
  const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://seusite.github.io/index.html' // URL de retorno após o login
    }
  });
}
