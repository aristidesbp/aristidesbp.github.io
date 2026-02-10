/**
 * NAVBAR COMPONENTE - ERP ABP (Versão Carrossel Lateral)
 */

(function() {
    // 1. Definição do CSS para ícones e comportamento de rolagem
    const styles = `
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Esconde a barra de rolagem visualmente mas mantém a funcionalidade */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        body {
            padding-bottom: 100px;
        }
    </style>`;

    // 2. Estrutura HTML da Navbar com Rolagem Lateral (Estilo Carrossel)
    const navbarHtml = `
    <nav class="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 pt-3 pb-6">
            

            <div onclick="window.location.href='index.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 text-primary">
                <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1">grid_view</span>
                <span class="text-[10px] font-bold">Painel</span>
            </div>

            <div onclick="window.location.href='listar_tarefas.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">assignment</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Tarefas</span>
            </div>

            <div onclick="window.location.href='listar_entidades.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">group</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Entidades</span>
            </div>

            <div onclick="window.location.href='listar_financeiro.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">account_balance_wallet</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Financeiro</span>
            </div>

            <div onclick="window.location.href='listar_banco.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">account_balance</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Bancos</span>
            </div>

            <div onclick="window.location.href='listar_produto.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">inventory_2</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Produtos</span>
            </div>

            <div onclick="window.location.href='pdv.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">shopping_cart_checkout</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">PDV</span>
            </div>

            <div onclick="window.location.href='listar_vendas.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">query_stats</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Vendas</span>
            </div>

            <div onclick="window.location.href='loja.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">storefront</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Loja</span>
            </div>

            <div onclick="window.location.href='ajustes.html'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-2xl">settings</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-primary">Ajustes</span>
            </div>

            <div onclick="sairDaConta()" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] shrink-0 group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-red-500 transition-colors text-2xl">logout</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-red-500">Sair</span>
            </div>

        </div>
    </nav>`;

    // 3. Inserção no DOM
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
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
}
