/**
 * MIDDLEWARE DE PROTEÇÃO CORRIGIDO
 */
(async function validateAccess() {
    // 1. Bloqueia a interface para evitar que dados apareçam antes da checagem
    document.documentElement.style.display = 'none';

    try {
        // Aguarda um instante para garantir que o supabase_config.js carregou a variável global
        if (!window.supabaseClient) {
            // Se o script de config ainda não carregou, esperamos um pouco
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const supabase = window.supabaseClient;

        if (!supabase) {
            console.error("Erro: supabaseClient não configurado.");
            window.location.href = 'login_clinica.html';
            return;
        }

        // 2. Verificação da Sessão
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            window.location.href = 'login.html';
            return;
        }

        // 3. Verificação de Integridade (valida o token no servidor)
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            window.location.href = 'login.html';
            return;
        }

        // 4. Liberação da Interface
        document.documentElement.style.display = 'block';

    } catch (err) {
        console.error("Erro crítico na validação:", err);
        window.location.href = 'login.html';
    }
})();

// Função global de logout para substituir a que estava dando erro
window.sairDaConta = async function() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            if (window.supabaseClient) {
                await window.supabaseClient.auth.signOut();
            }
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
};
