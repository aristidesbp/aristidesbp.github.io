/**
 * Nome do arquivo: limpar_notas.js
 * Objetivo: Resetar o formulário de notas para o estado inicial (vazio).
 */

function resetForm() {
    // Captura os elementos
    const idField = document.getElementById('note-id');
    const titleField = document.getElementById('title');
    const contentField = document.getElementById('content');
    const btnSave = document.getElementById('btn-save');

    // Limpa os valores
    if (idField) idField.value = '';
    if (titleField) titleField.value = '';
    if (contentField) contentField.value = '';

    // Volta o botão para o modo de "Salvar" (caso estivesse em "Atualizar")
    if (btnSave) {
        btnSave.innerHTML = `
            <span class="material-symbols-outlined">save</span>
            Salvar Nota
        `;
        // Remove classes de edição se você tiver adicionado alguma (ex: mudar cor do botão)
        btnSave.classList.remove('bg-amber-500');
        btnSave.classList.add('bg-primary');
    }

    console.log("Formulário de notas limpo com sucesso.");
}

