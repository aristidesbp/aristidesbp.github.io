document.addEventListener('DOMContentLoaded', () => {
    const renderNavbar = () => {
        // Obtém o nome do arquivo atual para definir o estado ativo
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        // Mapeamento de páginas para destacar o ícone correto
        const isActive = (pageName) => currentPage === pageName;

        const navHtml = `
        <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-2 py-3 z-40 flex justify-around items-end">
            <div onclick="window.location.href='login.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
                <span class="material-symbols-outlined text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors">logout</span>
                <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-red-500">Sair</span>
            </div>

            <div onclick="window.location.href='lista_entidades.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
                <span class="material-symbols-outlined ${isActive('lista_entidades.html') ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary transition-colors">corporate_fare</span>
                <span class="text-[10px] font-medium ${isActive('lista_entidades.html') ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary">Entidades</span>
            </div>

            <div onclick="window.location.href='lista_parcelas.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
                <span class="material-symbols-outlined ${isActive('lista_parcelas.html') ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary transition-colors">calendar_month</span>
                <span class="text-[10px] font-medium ${isActive('lista_parcelas.html') ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary">Parcelas</span>
            </div>

            <div onclick="window.location.href='financeiro.png.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
                <div class="${isActive('financeiro.png.html') ? 'bg-primary/10' : ''} p-1.5 rounded-lg -mt-1">
                    <span class="material-symbols-outlined ${isActive('financeiro.png.html') ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}">dashboard</span>
                </div>
                <span class="text-[10px] ${isActive('financeiro.png.html') ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400'}">Painel</span>
            </div>

            <div onclick="window.location.href='ajustes.html'" class="flex flex-col items-center gap-1 group cursor-pointer min-w-[64px]">
                <span class="material-symbols-outlined ${isActive('ajustes.html') ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary transition-colors">settings</span>
                <span class="text-[10px] font-medium ${isActive('ajustes.html') ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400'} group-hover:text-primary">Ajustes</span>
            </div>
        </nav>
        `;

        // Insere a navbar no final do body
        document.body.insertAdjacentHTML('beforeend', navHtml);
    };

    renderNavbar();
});
