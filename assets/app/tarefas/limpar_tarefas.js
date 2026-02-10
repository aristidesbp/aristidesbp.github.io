function resetForm() {
    const fields = ['task-id', 'title', 'content', 'entidade', 'status', 'observacao'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = (id === 'status' ? 'pendente' : '');
    });
    document.getElementById('btn-save').innerHTML = `<span class="material-symbols-outlined">save</span> Salvar Tarefa`;
}

