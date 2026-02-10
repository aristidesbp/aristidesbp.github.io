/**
 * NAVBAR COMPONENTE - ERP ABP (Versão Centralizada)
 */

(function() {
    // 1. Definição do CSS
    const styles = `
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Garante que o conteúdo não fique escondido atrás da navbar */
        body { padding-bottom: 110px !important; }
    </style>`;

    // 2. Estrutura HTML
    // Note que usei caminhos que sobem um nível (../) para garantir que saiam da pasta /notas
    const navbarHtml = `
    <nav class="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <div class="flex items-center justify-center gap-8 overflow-x-auto no-scrollbar px-4 pt-3 pb-6 w-full">
            
            <div onclick="window.location.href='../index.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 text-gray-500 hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-2xl">grid_view</span>
                <span class="text-[10px] font-bold">Voltar</span>
            </div>

            <div onclick="sairDaConta()" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-red-500 transition-colors text-2xl">logout</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-red-500">Sair</span>
            </div>

        </div>
    </nav>`;

    document.head.insertAdjacentHTML('beforeend', styles);
    document.body.insertAdjacentHTML('beforeend', navbarHtml);
})();

/**
 * Função global para Deslogar
 */
async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            if (typeof window.supabaseClient !== 'undefined') {
                await window.supabaseClient.auth.signOut();
            }
            // Força o redirecionamento para a raiz, fora da pasta /notas
            window.location.replace('../login.html'); 
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.replace('../login.html');
        }
    }
}
