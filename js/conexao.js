/** ERP ABP - Configuração e Conexão Central */
(() => {
    "use strict";

    // 1. Chaves de Acesso (Configuradas para o seu projeto vgrcqr...)
    const supabaseUrl = 'https://vgrcqrplwgdyzzrhfzlb.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncmNxcnBsd2dkeXp6cmhmemxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzA0MTEsImV4cCI6MjA4NTEwNjQxMX0.ZCE9Lj8cQHNcxwXmBRz_qlY0xNkt9DfR6ezs4wDbol8';

    // 2. Inicialização Global
    if (typeof supabase !== 'undefined') {
        window.db = supabase.createClient(supabaseUrl, supabaseKey);
        console.log("✅ Conexão com Supabase estabelecida.");
    } else {
        console.error("❌ Erro: SDK do Supabase não carregado. Verifique o link do CDN no HTML.");
    }

    // 3. Estilos Globais da Interface
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #f4f7f6; transition: opacity 0.3s; }
        .container { padding: 20px; max-width: 1200px; margin: auto; }
        /* Esconde o body inicialmente para evitar o "flash" de conteúdo antes da validação */
        body.protegido { opacity: 0; pointer-events: none; }
    `;
    document.head.appendChild(style);
    document.body.classList.add('protegido');
})();
