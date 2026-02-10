/**
 * Nome do arquivo: salvar_notas.js
 * Objetivo: Criar novas notas ou atualizar notas existentes no Supabase.
 */
async function saveNote() {
    const btn = document.getElementById('btn-save');
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) return alert("Por favor, preencha o título e o conteúdo.");

    btn.disabled = true;
    btn.innerText = "Processando...";
    
    try {
        // Busca o usuário logado para garantir o vínculo da nota
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado.");

        if (id) {
            // Modo Edição (Update)
            const { error } = await window.supabaseClient
                .from('notes')
                .update({ title, content })
                .eq('id', id);
            if (error) throw error;
        } else {
            // Modo Criação (Insert)
            const { error } = await window.supabaseClient
                .from('notes')
                .insert([{ title, content, user_id: user.id }]);
            if (error) throw error;
        }

        alert("Nota salva com sucesso!");
        
        // Limpa o formulário e recarrega a lista se as funções existirem
        if (typeof resetForm === "function") resetForm();
        if (typeof loadNotes === "function") loadNotes();

    } catch (err) {
        console.error("Erro ao salvar:", err.message);
        alert("Erro ao salvar: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = id ? "Atualizar Nota" : "Salvar Nota";
    }
}
