// conexao.js
(function() {
    const supabaseUrl = 'https://vgrcqrplwgdyzzrhfzlb.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncmNxcnBsd2dkeXp6cmhmemxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzA0MTEsImV4cCI6MjA4NTEwNjQxMX0.ZCE9Lj8cQHNcxwXmBRz_qlY0xNkt9DfR6ezs4wDbol8';

    // Inicializa o cliente globalmente como window.db
    if (typeof supabase !== 'undefined') {
        window.db = supabase.createClient(supabaseUrl, supabaseKey);
    } else {
        console.error("Erro: SDK do Supabase não encontrado. Verifique a ordem dos scripts no HTML.");
        return;
    }

    // Injeção de CSS
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: 'Segoe UI', sans-serif; margin: 0; padding-top: 60px; background: #f4f7f6; }
        .navbar { position: fixed; top: 0; width: 100%; height: 60px; background: #2c3e50; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; box-sizing: border-box; z-index: 1000; }
        .nav-brand { font-weight: bold; font-size: 1.2rem; }
        .nav-links button { background: transparent; border: 1px solid white; color: white; padding: 5px 15px; cursor: pointer; border-radius: 4px; margin-left: 10px; transition: 0.3s; }
        .nav-links button:hover { background: white; color: #2c3e50; }
    `;
    document.head.appendChild(style);

    window.checkSession = async () => {
        const { data: { session }, error } = await window.db.auth.getSession();
        
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
                <button onclick="window.logout()">Sair</button>
            </div>
        `;
        document.body.prepend(nav);
    }

    window.logout = async () => {
        await window.db.auth.signOut();
        window.location.href = 'login.html';
    };

    document.addEventListener('DOMContentLoaded', window.checkSession);
})();
