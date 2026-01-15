// Função para injetar a Navbar e Sidebar
function injectMenu() {
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
            text-decoration: none; border-bottom: 1px solid #1e293b; 
        }
        .sidebar a:hover { background: #1e293b; color: var(--primary); }
        .nav-user { font-size: 14px; display: flex; align-items: center; gap: 8px; }
    </style>

    <nav class="navbar">
        <div class="nav-left">
            <button class="menu-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
            <span style="font-weight: bold; letter-spacing: 1px;">ERP ABP</span>
        </div>
        <div class="nav-user"><i class="fas fa-user-circle"></i> Aristides</div>
    </nav>

    <div class="sidebar-overlay" id="overlay" onclick="toggleSidebar()"></div>
    <div class="sidebar" id="sidebar">
        <div style="padding: 25px; font-weight: bold; color: var(--primary); border-bottom: 1px solid #1e293b;">MENU</div>
        <a href="/index.html"><i class="fas fa-chart-line"></i> Dashboard</a>
        <a href="/pages/clientes.html"><i class="fas fa-users"></i> Clientes</a>
        <a href="/pages/funcionarios.html"><i class="fas fa-user-tie"></i> Funcionários</a>
        <a href="/pages/financeiro.html"><i class="fas fa-file-invoice-dollar"></i> Financeiro</a>
        <a href="#" onclick="handleLogout()" style="color: #ef4444; margin-top: 20px;"><i class="fas fa-sign-out-alt"></i> Sair</a>
    </div>
    `;

    // Insere no início do body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
}

// Funções de controle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

async function handleLogout() {
    if(confirm("Deseja sair do sistema?")) {
        // _supabase deve estar global
        await _supabase.auth.signOut();
        window.location.href = '/login.html';
    }
}

// Executa a injeção
injectMenu();
