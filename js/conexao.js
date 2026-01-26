/** ERP ABP - Conexão Supabase */
(async () => {
    "use strict";
    
    const CONFIG = {
        // Sua url do projeto
        URL: 'https://ndpvspnwzosvpniycapc.supabase.co', 
        // Sua chave do projeto
        KEY: 'sb_publishable_WOox2Nn_6B1zjrRtD3mrrQ_TyI93EJH', 
       

        
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    };

    async function loadSDK() {
        if (window.supabase) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.SDK_URL;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Erro ao carregar SDK"));
            document.head.appendChild(script);
        });
    }

    try {
        await loadSDK();
        // Definindo globalmente como _supabase para uso nos outros arquivos
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.URL, CONFIG.KEY);
        }
    } catch (err) {
        console.error("Erro na conexão:", err);
    }
})();
