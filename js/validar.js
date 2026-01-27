/** ERP ABP - Validador de Sessão Profissional */
(async () => {
    "use strict";

    // Se estiver na página de login, permite visualização e interrompe o validador
    if (window.location.pathname.includes('login.html')) {
        document.body.classList.remove('protegido');
        return;
    }

    const checkSessao = setInterval(async () => {
        if (window.db) {
            clearInterval(checkSessao);
            
            const { data: { session }, error } = await window.db.auth.getSession();

            if (error || !session) {
                console.warn("⚠️ Sessão inexistente. Redirecionando...");
                window.location.replace("login.html");
            } else {
                // Utilizador validado! Remove a proteção e mostra a página
                document.body.classList.remove('protegido');
                console.log("✅ Acesso autorizado para:", session.user.email);
            }

            // Monitoriza se o utilizador deslogar em outra aba
            window.db.auth.onAuthStateChange((event) => {
                if (event === "SIGNED_OUT") window.location.replace("login.html");
            });
        }
    }, 50); // Polling rápido (50ms) para mínima latência

    // Segurança: se o DB não carregar em 4 segundos, algo falhou
    setTimeout(() => {
        if (document.body.classList.contains('protegido')) {
            console.error("❌ Erro crítico de carregamento do banco de dados.");
            // Opcional: window.location.replace("login.html");
        }
    }, 4000);
})();
