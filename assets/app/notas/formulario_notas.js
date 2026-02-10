function prepareEdit(id, title, content) {
    document.getElementById('note-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('btn-save').innerText = "Salvar Nota";
}
