(function() {
    // 1. Configurações de Conexão (Chaves de 21/01/2026)
    const supabaseUrl = 'https://vgrcqrplwgdyzzrhfzlb.supabase.co';
    const Publishable key ='sb_publishable_gIADKs6ojnY0uXcTy6Um2Q_bTdUOCwP';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncmNxcnBsd2dkeXp6cmhmemxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzA0MTEsImV4cCI6MjA4NTEwNjQxMX0.ZCE9Lj8cQHNcxwXmBRz_qlY0xNkt9DfR6ezs4wDbol8';
   

        
    // Inicializa o cliente globalmente para uso nos outros scripts do ERP
    window.db = supabase.createClient(supabaseUrl, supabaseKey);

    // 2. Injeção de CSS Padrão (Layout Integridade)
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding-top: 60px; background: #f4f7f6; }
        .navbar { position: fixed; top: 0; width: 100%; height: 60px; background: #2c3e50; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; box-sizing: border-box; z-index: 1000; }
        .nav-brand { font-weight: bold; font-size: 1.2rem; }
        .nav-links button { background: transparent; border: 1px solid white; color: white; padding: 5px 15px; cursor: pointer; border-radius: 4px; margin-left: 10px; transition: 0.3s; }
        .nav-links button:hover { background: white; color: #2c3e50; }
        .container { padding: 20px; max-width: 1200px; margin: auto; }
    `;
    document.head.appendChild(style);

    // 3. Segurança de Sessão e Injeção de Navbar
    window.checkSession = async () => {
        const { data: { session } } = await db.auth.getSession();
        
        // Se não estiver logado e não estiver na página de login, redireciona
        if (!session && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return;
        }

        if (session) {
            injectNavbar();
        }
    };

    function injectNavbar() {
        if (document.getElementById('main-nav')) return;

        const nav = document.createElement('nav');
        nav.id = 'main-nav';
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="nav-brand">ERP ABP Profissional</div>
            <div class="nav-links">
                <button onclick="location.href='index.html'">Home</button>
                <button onclick="location.href='entidades.html'">Entidades</button>
                <button onclick="logout()">Sair</button>
            </div>
        `;
        document.body.prepend(nav);
    }

    window.logout = async () => {
        await db.auth.signOut();
        window.location.href = 'login.html';
    };

    // Executa a verificação ao carregar
    document.addEventListener('DOMContentLoaded', checkSession);
})();
