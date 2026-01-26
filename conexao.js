/** ERP ABP - Conexão Supabase */
(async () => {
    "use strict";
    
    const CONFIG = {
        // Sua url do projeto
        URL: 'https://ndpvspnwzosvpniycapc.supabase.co', 
        // Sua chave do projeto
        KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcHZzcG53em9zdnBuaXljYXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MjkwNDksImV4cCI6MjA4NTAwNTA0OX0.hYgXJXn3CuvNJkbDyVkJNq6xREV-1OSohB1hhoetibk', 
       

        
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
