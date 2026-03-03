/**
 * src/controller/navbar.js
 * Objetivo: Carregar a Navbar dinamicamente em qualquer página.
 */

function carregarNavbar() {
    const navbarHTML = `
    <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 z-50 lg:relative lg:border-t-0 lg:border-r lg:w-20 lg:h-screen lg:flex-col lg:px-0">
        <div class="flex items-center justify-between lg:flex-col lg:h-full lg:py-6">
            <div class="hidden lg:flex bg-primary/10 p-3 rounded-xl mb-8">
                <span class="material-symbols-outlined text-primary text-3xl">psychology</span>
            </div>

            <div class="flex items-center justify-between flex-1 w-full lg:flex-col lg:gap-8 lg:justify-start">
                <a class="flex flex-col items-center gap-1 text-primary shrink-0 min-w-[64px]" href="index.html">
                    <span class="material-symbols-outlined">grid_view</span>
                    <span class="text-[11px] font-semibold whitespace-nowrap">Início</span>
                </a>
                
                <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[64px]" href="pacientes.html">
                    <span class="material-symbols-outlined">group</span>
                    <span class="text-[11px] font-semibold whitespace-nowrap">Pacientes</span>
                </a>

                <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[64px]" href="tarefas.html">
                    <span class="material-symbols-outlined">checklist</span>
                    <span class="text-[11px] font-semibold whitespace-nowrap">Tarefas</span>
                </a>

                <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[64px]" href="financeiro.html">
                    <span class="material-symbols-outlined">payments</span>
                    <span class="text-[11px] font-semibold whitespace-nowrap">Financeiro</span>
                </a>

                <a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[64px]" href="agenda.html">
                    <span class="material-symbols-outlined">calendar_today</span>
                    <span class="text-[11px] font-semibold whitespace-nowrap">Agenda</span>
                </a>
            </div>

            <div class="flex lg:mt-auto">
                <button onclick="window.supabaseClient.auth.signOut().then(() => window.location.href='login.html')" class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 min-w-[64px]">
                    <span class="material-symbols-outlined text-red-500">logout</span>
                    <span class="text-[11px] font-semibold whitespace-nowrap">Sair</span>
                </button>
            </div>
        </div>
    </nav>
    `;

    // Insere a navbar no início do body ou em um container específico
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navbarHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }
}

// Executa a função assim que o DOM carregar
document.addEventListener('DOMContentLoaded', carregarNavbar);
