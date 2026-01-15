function injectMenu() {
    // Detecta se estamos na raiz ou dentro de uma pasta para ajustar os links
    const isSubFolder = window.location.pathname.includes('/clientes/') || window.location.pathname.includes('/bloco_de_notas/');
    const prefix = isSubFolder ? '../' : './';

    const menuHTML = `
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --sidebar-w: 260px; }
        .navbar { 
            position: fixed; top: 0; left: 0; right: 0; height: 65px; 
            background: var(--dark); color: white; display: flex; 
            align-items: center; justify-content: space-between; 
            padding: 0 20px; z-index: 1000; border-bottom: 2px solid var(--primary);
        }
        .nav-left { display: flex; align-items: center; gap: 15px; }
        .menu-btn { font-size: 22px; cursor: pointer; color: var(--primary); background: none; border: none; }
        
        .sidebar { 
            position: fixed; top: 0; left: -260px; width: var(--sidebar-w); 
            height: 100%; background: var(--dark); color: white; 
            transition: 0.3s; z-index: 1001; padding-top: 20px; 
        }
        .sidebar.active { left: 0; }
        .sidebar-overlay { 
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); display: none; z-index: 1000; 
        }
        .sidebar-overlay.active { display: block; }
        .sidebar a { 
            display: block; padding: 15px 25px; color: white; 
            text-decoration: none; border-bottom: 1px solid #1e293b; font-size: 15px;
        }
        .sidebar a:hover { background: #1e293b; color: var(--primary); }
        .sidebar i { width: 25px; color: var(--primary); }
    </style>

    <nav class="navbar">
        <div class="nav-left">
            <button class="menu-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
            <span style="font-weight: bold; letter-spacing: 1px;">SISTEMA ERP ABP</span>
        </div>
        <div style="font-size: 14px;"><i class="fas fa-user-circle"></i> Aristides</div>
    </nav>

    <div class="sidebar-overlay" id="overlay" onclick="toggleSidebar()"></div>
    <div class="sidebar" id="sidebar">
        <div style="padding: 25px; font-weight: bold; color: var(--primary); border-bottom: 1px solid #1e293b; margin-bottom: 10px;">NAVEGAÇÃO</div>
        <a href="${prefix}index.html"><i class="fas fa-home"></i> Painel Inicial</a>
        <a href="${prefix}clientes/clientes.html"><i class="fas fa-users"></i> Gestão de Clientes</a>
        <a href="${prefix}bloco_de_notas/bloco_de_notas.html"><i class="fas fa-sticky-note"></i> Bloco de Notas</a>
        <a href="#" style="opacity: 0.5; cursor: not-allowed;"><i class="fas fa-boxes"></i> Produtos (Em breve)</a>
        <a href="#" onclick="handleLogout()" style="color: #ef4444; margin-top: 50px;"><i class="fas fa-sign-out-alt"></i> Sair do Sistema</a>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

async function handleLogout() {
    if(confirm("Deseja realmente sair?")) {
        await _supabase.auth.signOut();
        window.location.href = '../login.html';
    }
}

// Inicia o menu automaticamente
injectMenu();
