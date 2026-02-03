async function loadUsuarios() {
    AppController.renderSkeleton();
    const { data, error } = await _supabase
        .from('usuarios')
        .select('*')
        .order('nome_completo');
    
    if (error) {
        console.error("Erro Supabase:", error.message);
        return;
    }

    AppController.cache = data || [];
    renderTable(AppController.cache);
}
