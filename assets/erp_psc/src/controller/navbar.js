/**
 * src/controller/navbar.js
 * Objetivo: Injetar a navbar no fundo da tela em todos os dispositivos.
 */

function carregarNavbar() {
    const navbarHTML = `
    <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-2 z-50">
        <div class="max-w-screen-xl mx-auto flex items-center justify-around">
            
            <a class="flex flex-col items-center gap-1 text-primary shrink-0 min-w-[60px]" href="index.html">
                <span class="material-symbols-outlined">grid_view</span>
                <span class="text-[10px] font-semibold">Início</span>
            </a>
            
            <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[60px]" href="pacientes.html">
                <span class="material-symbols-outlined">group</span>
                <span class="text-[10px] font-semibold">Pacientes</span>
            </a>

            <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[60px]" href="tarefas.html">
                <span class="material-symbols-outlined">checklist</span>
                <span class="text-[10px] font-semibold">Tarefas</span>
            </a>

            <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[60px]" href="financeiro.html">
                <span class="material-symbols-outlined">payments</span>
                <span class="text-[10px] font-semibold">Financeiro</span>
            </a>

            <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[60px]" href="agenda.html">
                <span class="material-symbols-outlined">calendar_today</span>
                <span class="text-[10px] font-semibold">Agenda</span>
            </a>

            <button onclick="logout()" class="flex flex-col items-center gap-1 text-red-400 shrink-0 min-w-[60px]">
                <span class="material-symbols-outlined">logout</span>
                <span class="text-[10px] font-semibold">Sair</span>
            </button>
        </div>
    </nav>
    
    <div class="h-20 w-full"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', navbarHTML);
}

// Função auxiliar de Logout
async function logout() {
    if (confirm("Deseja realmente sair?")) {
        await window.supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', carregarNavbar);
