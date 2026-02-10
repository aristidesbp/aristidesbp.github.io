function prepareEdit(id) {
    window.location.href = `cadastrar_tarefas.html?id=${id}`;
}

async function checkEditMode() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id && document.getElementById('task-id')) {
        const { data: t } = await window.supabaseClient.from('tarefas').select('*').eq('id', id).single();
        if (t) {
            document.getElementById('task-id').value = t.id;
            document.getElementById('title').value = t.title;
            document.getElementById('content').value = t.content;
            document.getElementById('entidade').value = t.entidade;
            document.getElementById('status').value = t.status;
            document.getElementById('observacao').value = t.observacao;
            document.getElementById('btn-save').innerHTML = `<span class="material-symbols-outlined">edit</span> Atualizar Tarefa`;
        }
    }
}
document.addEventListener('DOMContentLoaded', checkEditMode);

