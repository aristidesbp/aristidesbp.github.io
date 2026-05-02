// --- FUNÇÕES DE AUTENTICAÇÃO E CONTROLE DE TELA ---
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.style.display = 'flex';
                telaSistema.style.display = 'none';
            } else {
                telaLogin.style.display = 'none';
                telaSistema.style.display = 'block';
                loadEntities(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) alert("Erro ao fazer login: " + error.message);
            else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            verificar_login();
        }

        document.addEventListener('DOMContentLoaded', verificar_login);
