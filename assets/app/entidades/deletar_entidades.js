async function deleteEntidade(id) {
    if (confirm("Deseja realmente excluir esta entidade? Esta ação não pode ser desfeita.")) {
        try {
            const { error } = await window.supabaseClient
                .from('entidades')
                .delete()
                .eq('id', id);

            if (error) throw error;
            location.reload();
        } catch (err) {
            alert("Erro ao excluir: " + err.message);
        }
    }
}

