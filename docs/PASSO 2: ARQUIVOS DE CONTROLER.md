# conexao.js
```
/** ERP ABP - Conexão Supabase */
(async () => {
    "use strict";
    
    const CONFIG = {
        URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX', // Sua chave do projeto
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    };

    async function loadSDK() {
        if (window.supabase) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.SDK_URL;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Erro ao carregar SDK"));
            document.head.appendChild(script);
        });
    }

    try {
        await loadSDK();
        // Definindo globalmente como _supabase para uso nos outros arquivos
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.URL, CONFIG.KEY);
        }
    } catch (err) {
        console.error("Erro na conexão:", err);
    }
})();
```

# navbar.js
```
/** ERP ABP - Navbar Dinâmica */
(() => {
    "use strict";

    function injectNavbar() {
        if (document.querySelector(".erp-navbar")) return;

        const style = `
        <style>
            .erp-navbar { 
                position: fixed; top: 0; left: 0; width: 100%; height: 60px;
                background: #1e293b; color: white; display: flex; 
                justify-content: space-between; align-items: center; 
                padding: 0 20px; z-index: 10000; font-family: sans-serif;
            }
            .erp-navbar .brand { font-weight: bold; color: #3ecf8e; }
            .erp-navbar .menu { display: flex; gap: 15px; }
            .erp-navbar button, .erp-navbar a { 
                background: #334155; color: white; border: none; 
                padding: 8px 15px; border-radius: 4px; cursor: pointer;
                text-decoration: none; font-size: 13px;
            }
            .erp-navbar .btn-logout { background: #ef4444; }
            body { padding-top: 70px !important; }
        </style>`;

        const html = `
        <nav class="erp-navbar">
            <div class="brand">ERP ABP Profissional</div>
            <div class="menu">
                <a href="index.html">Início</a>
                <button id="nav-btn-sair" class="btn-logout">Sair</button>
            </div>
        </nav>`;

        document.head.insertAdjacentHTML("beforeend", style);
        document.body.insertAdjacentHTML("afterbegin", html);

        document.getElementById("nav-btn-sair")?.addEventListener("click", async () => {
            if (confirm("Deseja sair?")) {
                await window._supabase.auth.signOut();
                window.location.replace("login.html");
            }
        });
    }

    // Aguarda o DOM estar pronto para injetar
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectNavbar);
    } else {
        injectNavbar();
    }
})();
```

# validar_user.js
```
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
```

# index.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISTEMA ERP ABP - Inicio</title>
    
    <script src="conexao.js" defer></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
   <style>
       /* Reset e Box-sizing conforme seu padrão */
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: #f1f5f9;
    /* Removido o padding fixo para deixar o conexao.js (Guard) controlar via classe .erp-guard-active */
}

.content {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

.header-area {
    text-align: center;
    margin-bottom: 30px;
}

.header-area h1 {
    color: #1e293b;
    font-size: 1.8rem;
    letter-spacing: -0.5px;
}

/* Grid Responsivo Inteligente */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

/* Estilização dos Cards */
.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-decoration: none;
    color: #334155;
    text-align: center;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.card:hover {
    transform: translateY(-5px);
    border-color: #3ecf8e;
    box-shadow: 0 10px 25px rgba(62, 207, 142, 0.1);
}

.card i {
    font-size: 40px;
    color: #3ecf8e;
    margin-bottom: 15px;
}

.card h3 {
    margin: 10px 0 5px 0;
    font-size: 1.25rem;
    color: #1e293b;
}

.card p {
    font-size: 0.9em;
    color: #64748b;
    line-height: 1.4;
    margin: 0;
}

/* Responsividade Extra para Celulares Pequenos */
@media (max-width: 480px) {
    .grid {
        grid-template-columns: 1fr;
    }
    .card {
        padding: 20px;
    }
}
   </style>
    
    
   
</head>
<body>
 <div class="content">
        <div class="header-area">
            <h1>SISTEMA ERP ABP</h1>
        </div>
     <div class="grid">

         
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->
         
 <div class="grid">
 <a href="adm_usuario.html" class="card">
        <i class="fas fa-sticky-note"></i>
        <h3>Conta do usuario</h3>
        <p>Gerencie os dados de sua conta!.</p>
 </a>
     
    <a href="notas.html" class="card">
        <i class="fas fa-sticky-note"></i>
        <h3>Bloco de Notas</h3>
        <p>Anote e organize suas ideias na nuvem.</p>
    </a>
    
    <a href="produtos.html" class="card">
        <i class="fas fa-box"></i> <h3>Produtos</h3>
        <p>Gestão de estoque e catálogo.</p> </a>

    <a href="entidades.html" class="card">
        <i class="fas fa-users"></i>
        <h3>Entidades</h3>
        <p>Clientes, Fornecedores e Colaboradores.</p>
    </a>

    <a href="financeiro.html" class="card">
        <i class="fas fa-chart-line"></i> <h3>Financeiro</h3>
        <p>Fluxo de caixa e controle de contas.</p>
    </a>

     
     
</div>
          

         
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->

        </div>
    </div>
</body>
</html>
```


