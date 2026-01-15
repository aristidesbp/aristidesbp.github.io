function injectMenu() {
    // Detecta o caminho para ajustar os links (./ ou ../)
    const isSubFolder = window.location.pathname.includes('/clientes/') || 
                         window.location.pathname.includes('/bloco_de_notas/') ||
                         window.location.pathname.includes('/enderecos/');
    const prefix = isSubFolder ? '../' : './';

    const menuHTML = `
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --sidebar-w: 260px; }
        .navbar { position: fixed; top: 0; left: 0; right: 0; height: 65px; background: var(--dark); color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; z-index: 1000; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        .nav-left { display: flex; align-items: center; gap: 15px; }
        .menu-btn { font-size: 22px; cursor: pointer; color: var(--primary); background: none; border: none; padding: 5px; }
        .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--dark); border: 2px solid white; }
        
        /* SIDEBAR */
        .sidebar { position: fixed; top: 0; left: -260px; width: var(--sidebar-w); height: 100%; background: var(--dark); color: white; transition: 0.3s; z-index: 1001; padding-top: 20px; }
        .sidebar.active { left: 0; }
        .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; z-index: 1000; }
        .sidebar-overlay.active { display: block; }
        .sidebar a { display: block; padding: 15px 25px; color: white; text-decoration: none; border-bottom: 1px solid #1e293b; transition: 0.2s; }
        .sidebar a:hover { background: #1e293b; color: var(--primary); padding-left: 35px; }

        /* PROFILE MENU */
        .profile-menu { position: absolute; top: 70px; right: 10px; background: white; color: var(--dark); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: none; width: 220px; z-index: 1002; }
        .profile-menu.active { display: block; }
        .profile-menu .info { padding: 15px; border-bottom: 1px solid #eee; font-size: 0.85em; word-break: break-all; color: #64748b; }
        .profile-menu button { width: 100%; text-align: left; padding: 12px 15px; background: none; border: none; cursor: pointer; color: #e74c3c; font-weight: bold; }
    </style>

    <nav class="navbar">
        <div class="nav-left">
            <button class="menu-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
            <span style="font-weight: bold; letter-spacing: 1px;">SISTEMA ERP ABP</span>
        </div>
        <div class="nav-right">
            <div class="user-avatar" onclick="toggleProfile()">A</div>
            <div class="profile-menu" id="profileMenu">
                <div class="info"><strong>Usuário:</strong><br><span id="menuUserEmail">...</span></div>
                <button onclick="logout()"><i class="fas fa-sign-out-alt"></i> Sair da Conta</button>
            </div>
        </div>
    </nav>

    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
    <div class="sidebar" id="sidebar">
        <div style="padding: 25px; font-weight: bold; color: var(--primary); font-size: 1.2em;">MENU</div>
        <a href="${prefix}index.html"><i class="fas fa-chart-line"></i> Dashboard</a>
        <a href="${prefix}bloco_de_notas/bloco_de_notas.html"><i class="fas fa-sticky-note"></i> Bloco de Notas</a>
        <a href="${prefix}clientes/clientes.html"><i class="fas fa-users"></i> Clientes</a>
        <a href="${prefix}fornecedores/fornecedores.html"><i class="fas fa-truck"></i> Fornecedores</a>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    updateMenuUserInfo();
}

// Funções de Controle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function toggleProfile() {
    document.getElementById('profileMenu').classList.toggle('active');
}

async function updateMenuUserInfo() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        document.getElementById('menuUserEmail').innerText = session.user.email;
    }
}

async function logout() {
    if(confirm("Deseja realmente sair?")) {
        await _supabase.auth.signOut();
        // Ajusta o caminho do login conforme onde você está
        const isSub = window.location.pathname.includes('/clientes/') || window.location.pathname.includes('/bloco_de_notas/');
        window.location.href = isSub ? '../login.html' : 'login.html';
    }
}

// Inicializa
injectMenu();
