/*############################################################################################*/
/* CÓDIGO_O: INICIALIZAÇÃO BLINDADA DO CLIENTE SUPABASE */
/*############################################################################################*/
(function () {
    // Se o cliente já tiver sido criado por outro script, não fazemos nada para evitar erros
    if (window.supabaseClient) return;

    // Usamos nomes genéricos e isolados dentro desta função para evitar erros de duplicado (SyntaxError)
    const _url = 'https://zxkaxteprwxijriycvdx.supabase.co';
    const _key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4a2F4dGVwcnd4aWpyaXljdmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODIxMTEsImV4cCI6MjA5ODA1ODExMX0.ffOiXvjJujp4eL2scf1NiMT9A0CtwIAHilbX3T_AMrc';

    // Inicializa o cliente na janela global usando a biblioteca oficial trazida pela CDN
    window.supabaseClient = supabase.createClient(_url, _key);
})();

/*############################################################################################*/
/* CÓDIGO 1: VALIDAÇÃO DE ACESSO COM PROTEÇÃO DE TELA (FOUC) */
/*############################################################################################*/
(async function validateAccess() {
    // Bloqueia visualmente a página imediatamente para proteger dados confidenciais
    document.documentElement.style.display = 'none';

    try {
        // Verifica se o cliente global existe
        if (!window.supabaseClient) {
            console.error("Erro: O cliente Supabase não foi carregado corretamente.");
            window.location.href = 'login.html';
            return;
        }

        // 1. Procura por uma sessão ativa salva no navegador
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();

        if (error || !session) {
            console.warn("Acesso não autorizado ou sessão expirada. Redirecionando...");
            window.location.href = 'login.html'; 
            return;
        }

        // 2. Validação de segurança direta no servidor para garantir integridade do Token
        const { data: { user }, error: userError } = await window.supabaseClient.auth.getUser();

        if (userError || !user) {
            console.warn("Token inválido ou utilizador revogado. Redirecionando...");
            window.location.href = 'login.html';
            return;
        }

        // Se passar nos testes, exibe no terminal de desenvolvimento e liberta a tela
        console.log("Acesso autorizado com sucesso para:", session.user.email);
        document.documentElement.style.display = 'block';

    } catch (err) {
        console.error("Erro crítico no sistema de guarda de acessos:", err);
        // Em caso de falha de rede ou técnica, o sistema bloqueia por padrão (Segurança Máxima)
        window.location.href = 'login.html';
    }
})();

/*############################################################################################*/
/* CÓDIGO 3: FUNÇÃO DE LOGOUT SÍNCRONA E SEGURA */
/*############################################################################################*/
async function sairDaConta() {
    if (confirm("Deseja realmente sair do sistema?")) {
        try {
            if (window.supabaseClient) {
                // Remove a sessão diretamente no servidor do Supabase
                await window.supabaseClient.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao efetuar encerramento de conta:", error);
            // Garante a saída do utilizador mesmo que a ligação à internet falhe
            window.location.href = 'login.html';
        }
    }
}

/*############################################################################################*/
/* CÓDIGO 4 & 5: INICIALIZAÇÃO DA NAVBAR DINÂMICA */
/*############################################################################################*/
(function () {
    function initNavbar() {
        const container = document.getElementById('navbar');
        
        if (!container) return; // Se a página não tiver a div da navbar, ignora silenciosamente
        if (container.dataset.loaded === 'true') return; // Evita renderizar o menu duas vezes
        
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

    // Monitor do ciclo de vida da página para desenhar a barra assim que o HTML estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();
