// =================================================================
// 2. VERIFICAÇÃO DE LOGIN E SESSÃO
// =================================================================
async function verificarLogin() {
    const { data: { session }, error } = await _supabase.auth.getSession();
    
    // Se não houver sessão ativa, redireciona diretamente para o login
    if (error || !session) {
        window.location.href = 'login.html';
        return null;
    }
    
    usuarioLogadoId = session.user.id;
    return session;
}

// Encerra a sessão e redireciona para a página de login
async function sairDaConta() {
    await _supabase.auth.signOut();
    window.location.href = 'login.html';
}

// =================================================================
// 3. ALTERNÂNCIA DE MODO ESCURO (DARK MODE)
// =================================================================
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    
    if (darkIcon && lightIcon) {
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Aplica a preferência de tema salva no navegador ao carregar
(function carregarTemaSalvo() {
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo === 'dark' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
})();

// =================================================================
// 4. RENDERIZAÇÃO DA NAVBAR SIMPLIFICADA
// =================================================================
function renderizarNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) {
        console.error('Elemento #navbar-container não encontrado no HTML.');
        return;
    }

    const htmlNavbar = `
        <!-- HEADER FIXO NO TOPO (100% DE LARGURA) -->
        <header class="fixed top-0 left-0 right-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 transition-all">
            
            <!-- LOGO / NOME DO SISTEMA E BOTÃO DE RETORNO -->
            <div class="flex items-center gap-3 sm:gap-4">
                <h2 class="font-bold text-base sm:text-xl text-slate-900 dark:text-white truncate">ERP-ABP</h2>
                <button onclick="window.location.href='index.html'" class="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer" title="Voltar para a página inicial">
                    <span class="material-symbols-outlined text-base">arrow_back</span>
                    <span class="hidden sm:inline">Voltar</span>
                </button>
            </div>

            <!-- AÇÕES DA BARRA: MODO ESCURO E LOGOUT -->
            <div class="flex items-center gap-1 sm:gap-2">
                <button class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer" id="theme-toggle" onclick="toggleDarkMode()" title="Alternar tema">
                    <span class="material-symbols-outlined text-xl" id="dark-icon">dark_mode</span>
                    <span class="material-symbols-outlined text-xl hidden" id="light-icon">light_mode</span>
                </button>
                <button title="Sair da conta" onclick="sairDaConta()" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-xl">logout</span>
                </button>
            </div>
        </header>
    `;

    container.innerHTML = htmlNavbar;

    // Ajusta o ícone visível com base na classe 'dark' do <html>
    const isDark = document.documentElement.classList.contains('dark');
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    if (darkIcon && lightIcon) {
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
    }
}

// =================================================================
// 5. INICIALIZAÇÃO AUTOMÁTICA
// =================================================================
document.addEventListener('DOMContentLoaded', async () => {
    // Valida autenticação antes de liberar a renderização da página
    await verificarLogin();
});
