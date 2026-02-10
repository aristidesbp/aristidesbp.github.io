/**
 * Nome do arquivo: formulario_notas.js
 */
function prepareEdit(id, title, content) {
    const idField = document.getElementById('note-id');
    const titleField = document.getElementById('title');
    const contentField = document.getElementById('content');
    const btn = document.getElementById('btn-save');

    if (idField) idField.value = id;
    if (titleField) titleField.value = title;
    if (contentField) contentField.value = content;
    if (btn) btn.innerText = "Atualizar Nota";

    // Scroll suave para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    const idField = document.getElementById('note-id');
    const titleField = document.getElementById('title');
    const contentField = document.getElementById('content');
    const btn = document.getElementById('btn-save');

    if (idField) idField.value = '';
    if (titleField) titleField.value = '';
    if (contentField) contentField.value = '';
    if (btn) btn.innerText = "Salvar Nota";
}
