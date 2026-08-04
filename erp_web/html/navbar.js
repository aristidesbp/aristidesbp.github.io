// =================================================================
// 1. CONEXÃO COM O SUPABASE
// =================================================================
const supabaseUrl = 'https://mvxwxpwgoukhinqfuppz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';

// Instância global do cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
const est_supabase = _supabase; // Compatibilidade com módulo de estoque

let usuarioLogadoId = null;

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
// 4. REDIRECIONAMENTO DE PÁGINAS (SELECT NAVIGATION)
// =================================================================
function navegarParaPagina(pagina) {
    if (!pagina) return;
    window.location.href = `${pagina}.html`;
}

// =================================================================
// 5. RENDERIZAÇÃO DA NAVBAR
// =================================================================
function renderizarNavbar(paginaAtiva) {
    const container = document.getElementById('navbar-container');
    if (!container) {
        console.error('Elemento #navbar-container não encontrado no HTML.');
        return;
    }

    const htmlNavbar = `
        <!-- HEADER FIXO NO TOPO (100% DE LARGURA) -->
        <header class="fixed top-0 left-0 right-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 transition-all">
            
            <!-- LOGO / NOME DO SISTEMA -->
            <div class="flex items-center gap-2">
                <h2 class="font-bold text-base sm:text-xl text-slate-900 dark:text-white truncate">ERP-ABP</h2>
            </div>

            <!-- SELETOR DE MÓDULO / PÁGINA -->
            <div class="flex-1 max-w-[200px] sm:max-w-xs mx-2 sm:mx-4">
                <select id="select-aba" onchange="navegarParaPagina(this.value)" class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer">
                    <option value="home" ${paginaAtiva === 'home' ? 'selected' : ''}>🏠 HOME</option>
                    <option value="financeiro" ${paginaAtiva === 'financeiro' ? 'selected' : ''}>💰 FINANCEIRO</option>
                    <option value="entidades" ${paginaAtiva === 'entidades' ? 'selected' : ''}>🙋 ENTIDADES</option>
                    <option value="estoque" ${paginaAtiva === 'estoque' ? 'selected' : ''}>📦 ESTOQUE</option>
                    <option value="pdv" ${paginaAtiva === 'pdv' ? 'selected' : ''}>🖥️ PDV — Frente de Caixa</option>
                    <option value="configuracoes" ${paginaAtiva === 'configuracoes' ? 'selected' : ''}>⚙️ CONFIGURAÇÕES</option>
                </select>
            </div>

            <!-- AÇÕES DA BARRA: MODO ESCURO E LOGOUT -->
            <div class="flex items-center gap-1 sm:gap-2">
                <button class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" id="theme-toggle" onclick="toggleDarkMode()" title="Alternar tema">
                    <span class="material-symbols-outlined text-xl" id="dark-icon">dark_mode</span>
                    <span class="material-symbols-outlined text-xl hidden" id="light-icon">light_mode</span>
                </button>
                <button title="Sair da conta" onclick="sairDaConta()" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition-all">
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
// 6. INICIALIZAÇÃO AUTOMÁTICA
// =================================================================
document.addEventListener('DOMContentLoaded', async () => {
    // Valida autenticação antes de liberar a renderização da página
    await verificarLogin();
});

