/**
 * NAVBAR COMPONENTE - ERP ABP (Versão URL Fixa)
 */

(function() {
    const styles = `
    <style>
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        body { padding-bottom: 110px !important; }
    </style>`;

    // URLs Absolutas baseadas no seu GitHub Pages
    const urlBase = "https://aristidesbp.github.io/assets/app/";
    const urlLogin = "https://aristidesbp.github.io/assets/app/login.html";
    const urlIndex = "https://aristidesbp.github.io/assets/app/index.html";

    const navbarHtml = `
    <nav class="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <div class="flex items-center justify-center gap-8 px-4 pt-3 pb-6 w-full">
            
            <div onclick="window.location.href='${urlIndex}'" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] text-gray-500 hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-2xl">grid_view</span>
                <span class="text-[10px] font-bold">Início</span>
            </div>

            <div onclick="sairDoSistema('${urlLogin}')" class="flex flex-col items-center gap-1 cursor-pointer min-w-[75px] group">
                <span class="material-symbols-outlined text-gray-500 group-hover:text-red-500 transition-colors text-2xl">logout</span>
                <span class="text-[10px] font-medium text-gray-500 group-hover:text-red-500">Sair</span>
            </div>

        </div>
    </nav>`;

    document.head.insertAdjacentHTML('beforeend', styles);
    document.body.insertAdjacentHTML('beforeend', navbarHtml);
})();

/**
 * Função de Logout com Redirecionamento Fixo
 */
async function sairDoSistema(destino) {
    if(confirm("Deseja realmente sair?")) {
        try {
            if (window.supabaseClient) {
                await window.supabaseClient.auth.signOut();
            }
        } catch (e) {
            console.error("Erro ao deslogar:", e);
        }
        // Redireciona para a URL exata que você forneceu
        window.location.href = destino;
    }
}
