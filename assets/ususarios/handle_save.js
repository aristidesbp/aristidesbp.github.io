async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const data = {
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        acesso: document.getElementById('acesso').value,
        status: document.getElementById('status').value
    };

    if (!data.nome_completo || !data.telefone) return alert("Campos obrigatórios!");

    const { error } = id 
        ? await _supabase.from('usuarios').update(data).eq('id', id)
        : await _supabase.from('usuarios').insert([data]);

    if (error) {
        alert("Erro ao salvar: " + error.message);
    } else {
        resetarForm();
        loadUsuarios();
    }
}
