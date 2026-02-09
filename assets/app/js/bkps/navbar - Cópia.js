/**
 * NAVBAR COMPONENTE - ERP ABP (Versão Mobile Bottom Nav)
 */

(function() {
    // 1. Definição do CSS necessário para os ícones e ajustes de layout
    const styles = `
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .nav-item-active .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Garante que o conteúdo da página não fique escondido atrás da navbar */
        body {
            padding-bottom: 90px;
        }
    </style>`;

    // 2. Estrutura HTML da Navbar (Baseada no seu novo HTML)
    const navbarHtml = `
    <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-2 pt-3 pb-6 z-50 flex justify-around items-end">
        
        <div onclick="sairDaConta()" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
            <span class="material-symbols-outlined text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors">logout</span>
            <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-red-500">Sair</span>
        </div>

        <div onclick="window.location.href='entidades.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
            <span class="material-symbols-outlined text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">groups</span>
            <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary">Entidades</span>
        </div>

        <div onclick="window.location.href='parcelas.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
            <span class="material-symbols-outlined text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">calendar_month</span>
            <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary">Parcelas</span>
        </div>

        <div onclick="window.location.href='index.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[64px] nav-item-active">
            <div class="bg-primary/10 p-1.5 rounded-lg -mt-1">
                <span class="material-symbols-outlined text-primary">grid_view</span>
            </div>
            <span class="text-[10px] font-bold text-primary">Painel</span>
        </div>

        <div onclick="window.location.href='ajustes.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
            <span class="material-symbols-outlined text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">settings</span>
            <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary">Ajustes</span>
        </div>

    </nav>
    <div class="h-6 w-full bg-white dark:bg-gray-900 fixed bottom-0 left-0 z-40 lg:hidden"></div>`;

    // 3. Inserção dos elementos no DOM
    document.head.insertAdjacentHTML('beforeend', styles);
    document.body.insertAdjacentHTML('beforeend', navbarHtml); // Inserido no final para sobrepor outros elementos
})();

/**
 * Função global para Deslogar
 */
async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Usa o cliente global definido em conexao_supabase.js
            if (typeof window.supabaseClient !== 'undefined') {
                await window.supabaseClient.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
}
