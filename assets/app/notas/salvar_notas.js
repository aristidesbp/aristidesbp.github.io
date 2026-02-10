async function saveNote() {
    const btn = document.getElementById('btn-save');
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) return alert("Preencha título e conteúdo!");

    btn.disabled = true;
    
    try {
        const { data: { user } } = await window.supabaseClient.auth.getUser();

        if (id) {
            // Update
            await window.supabaseClient.from('notes')
                .update({ title, content })
                .eq('id', id);
        } else {
            // Insert
            await window.supabaseClient.from('notes')
                .insert([{ title, content, user_id: user.id }]);
        }

        resetForm();
        loadNotes(); // Chama a função que está no listar_notas.js
    } catch (err) {
        alert("Erro ao salvar: " + err.message);
    } finally {
        btn.disabled = false;
    }
}
