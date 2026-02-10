async function saveTask() {
    const btn = document.getElementById('btn-save');
    const id = document.getElementById('task-id').value;
    const data = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        entidade: document.getElementById('entidade').value,
        status: document.getElementById('status').value,
        observacao: document.getElementById('observacao').value
    };

    if (!data.title) return alert("O título é obrigatório!");

    btn.disabled = true;
    try {
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (id) {
            await window.supabaseClient.from('tarefas').update(data).eq('id', id);
        } else {
            await window.supabaseClient.from('tarefas').insert([{ ...data, user_id: user.id }]);
        }
        alert("Sucesso!");
        window.location.href = 'listar_tarefas.html';
    } catch (err) {
        alert("Erro: " + err.message);
    } finally { btn.disabled = false; }
}

