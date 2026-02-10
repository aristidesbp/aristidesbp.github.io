/**
 * Nome do arquivo: deletar_notas.js
 */
async function deleteNote(id) {
    if (!confirm("Tem certeza que deseja excluir permanentemente esta nota?")) return;

    try {
        const { error } = await window.supabaseClient
            .from('notes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert("Nota excluída com sucesso.");
        if (typeof loadNotes === "function") loadNotes();
    } catch (err) {
        console.error("Erro ao excluir:", err.message);
        alert("Erro ao excluir nota.");
    }
}
