/** ERP ABP - Validador de Sessão */
(async () => {
    "use strict";

    // Função para checar se a conexão já foi estabelecida (polling rápido)
    const checkSupabase = setInterval(async () => {
        if (window._supabase) {
            clearInterval(checkSupabase);
            
            const { data: { session }, error } = await window._supabase.auth.getSession();

            if (error || !session) {
                console.warn("Sessão inválida, redirecionando...");
                window.location.replace("login.html");
            }

            // Opcional: Escuta mudanças na autenticação (ex: deslogar em outra aba)
            window._supabase.auth.onAuthStateChange((event) => {
                if (event === "SIGNED_OUT") window.location.replace("login.html");
            });
        }
    }, 100);

    // Timeout de segurança: se após 5s o supabase não carregar, algo deu errado
    setTimeout(() => clearInterval(checkSupabase), 5000);
})();
