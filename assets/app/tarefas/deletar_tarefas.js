async function deleteTask(id) {
    if (confirm("Excluir tarefa?")) {
        await window.supabaseClient.from('tarefas').delete().eq('id', id);
        location.reload();
    }
}

