async function loadUsuarios() {
    // Exibe o skeleton enquanto carrega
    const lista = document.getElementById('entities-list');
    lista.innerHTML = '<tr><td colspan="4"><div class="skeleton"></div></td></tr>';

    const { data, error } = await _supabase
        .from('usuarios')
        .select('*')
        .order('nome_completo');

    if (error) {
        console.error("Erro ao carregar usuários:", error.message);
        alert("Erro ao carregar lista de usuários.");
        return;
    }

    // Armazena no cache global (window) para o filtro e PDF usarem depois
    window.usuariosCache = data || [];
    renderTable(window.usuariosCache);
}
