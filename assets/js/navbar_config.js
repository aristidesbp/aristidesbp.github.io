/*
no header:
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/navbar_config.js"></script>
no boyde:
<div id="navbar"></div>
*/



/*############################################################################################*/
/* CÓDIGO_O: INICIALIZAÇÃO DO CLIENTE SUPABASE */
/*############################################################################################*/
// Configuração global do Supabase para que todas as funções tenham acesso à mesma instância
const SUPABASE_URL = 'https://zxkaxteprwxijriycvdx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4a2F4dGVwcnd4aWpyaXljdmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODIxMTEsImV4cCI6MjA5ODA1ODExMX0.ffOiXvjJujp4eL2scf1NiMT9A0CtwIAHilbX3T_AMrc';


// Criação da instância global. Certifica-se de que a biblioteca do Supabase foi carregada antes via CDN ou Script tag
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*############################################################################################*/
/* CÓDIGO 1: VALIDAÇÃO DE ACESSO BLINDADA (FORMA PROFISSIONAL) */
/*############################################################################################*/
(async function validateAccess() {
    // Bloqueio imediato da interface para evitar que dados privados pisquem no ecrã (Prevenção de FOUC)
    document.documentElement.style.display = 'none';

    try {
        // Verifica se existe um token JWT localmente
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            console.warn("Acesso não autorizado ou sessão expirada. Redirecionando...");
            window.location.href = 'login.html'; 
            return;
        }

        // Validação profunda: Confirma com o servidor se o token continua ativo e íntegro
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            console.warn("Utilizador inválido no backend. Redirecionando...");
            window.location.href = 'login.html';
            return;
        }

        // Sucesso técnico: Regista no console e liberta a interface para o utilizador
        console.log("Acesso autorizado para:", session.user.email);
        document.documentElement.style.display = 'block';

    } catch (err) {
        console.error("Erro crítico na validação de segurança:", err);
        // Em caso de falha catastrófica de rede ou código, bloqueia por padrão
        window.location.href = 'login.html';
    }
})();

/*############################################################################################*/
/* CÓDIGO 3: FUNÇÃO DE LOGOUT (SAIR DA CONTA) */
/*############################################################################################*/
async function sairDaConta() {
    if (confirm("Deseja realmente sair do sistema?")) {
        try {
            // Executa o logoff destruindo a sessão no servidor do Supabase
            await supabase.auth.signOut();
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao efetuar logoff técnico:", error);
            // Garante o redirecionamento mesmo se a rede falhar
            window.location.href = 'login.html';
        }
    }
}

/*############################################################################################*/
/* CÓDIGO 4 & 5: RENDERIZAÇÃO AUTOMÁTICA DA NAVBAR */
/*############################################################################################*/
(function () {
    function initNavbar() {
        const container = document.getElementById('navbar');
        if (!container) return; // Interrompe se a página atual não tiver uma div#navbar
        if (container.dataset.loaded === 'true') return; // Evita duplicações
        
        container.dataset.loaded = 'true';
        container.innerHTML = `
            <div class="navbar">
                <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
                    <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
                </div>
                <div class="nav-buttons">
                    <a href="https://aristidesbp.github.io" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
                    <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
                </div>
            </div>
        `;
    }

    // Gatilho inteligente baseado no estado de carregamento do navegador
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();

/*############################################################################################*/
/* CÓDIGO_6: TELA DE LOGIN (ESTRUTURA) / CÓDIGO_7: FUNÇÕES DA TELA DE LOGIN */
/*############################################################################################*/
// NOTA: As funções abaixo de login só devem ser executadas se o utilizador ESTIVER na página login.html
async function loginUtilizador(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        // Se o login for bem-sucedido, redireciona para o painel principal
        window.location.href = 'dashboard.html'; // Altere para a sua página principal
    } catch (error) {
        alert("Erro ao entrar: " + error.message);
    }
}
