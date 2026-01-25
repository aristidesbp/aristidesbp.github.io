(function() {
    const SUPABASE_URL = "https://kjhjeaiwjilkgocwvbwi.supabase.co"; 
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaGplYWl3amlsa2dvY3d2YndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDMzNjAsImV4cCI6MjA4MzkxOTM2MH0.SeipI48HNyljhthEvBQM0iC6sT6Np63wrT4KJ9Eqx-Q"; // Use a chave do seu painel atual

    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const db = new Dexie("ERP_APB_Local");
    db.version(1).stores({
        usuarios: 'id, email',
        empresas: 'id, nome_fantasia',
        usuario_empresas: '[usuario_id+empresa_id]',
        produtos: 'id, empresa_id, nome',
        fila_sincronizacao: '++id, tabela, acao, status'
    });
    window.dbLocal = db;
    window.isOnline = navigator.onLine;
    window.addEventListener('online', () => { window.isOnline = true; document.dispatchEvent(new CustomEvent('statusConexao', { detail: { online: true } })); });
    window.addEventListener('offline', () => { window.isOnline = false; document.dispatchEvent(new CustomEvent('statusConexao', { detail: { online: false } })); });
})();
