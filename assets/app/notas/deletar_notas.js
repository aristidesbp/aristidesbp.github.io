async function deleteNote(id) {
    if (confirm("Deseja excluir esta nota?")) {
        try {
            await window.supabaseClient.from('notes').delete().eq('id', id);
            loadNotes();
        } catch (err) {
            alert("Erro ao excluir: " + err.message);
        }
    }
}
