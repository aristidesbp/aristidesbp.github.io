async function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário permanentemente?")) return;

    const { error } = await _supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        // Recarrega a lista após excluir
        loadUsuarios();
    }
}
