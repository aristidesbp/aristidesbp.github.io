/**
 * Nome do arquivo: editar_notas.js
 * Objetivo: Redirecionar para a página de cadastro enviando os dados da nota via URL.
 */

function prepareEdit(id, title, content) {
    // Definimos a URL base para o cadastro (ajuste se o nome do arquivo for diferente)
    const urlCadastro = "https://aristidesbp.github.io/assets/app/notas/cadastrar_notas.html";
    
    // Criamos os parâmetros para passar via URL (codificando para evitar erros com espaços/quebras de linha)
    const params = new URLSearchParams({
        id: id,
        edit: "true"
    });

    // Redireciona o usuário
    window.location.href = `${urlCadastro}?${params.toString()}`;
}

/**
 * Função para carregar os dados quando a página de CADASTRAR abrir
 * Adicione esta chamada no seu cadastrar_notas.html ou salvar_notas.js
 */
async function checkEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');

    if (noteId && window.location.pathname.includes('cadastrar_notas.html')) {
        try {
            const { data: note, error } = await window.supabaseClient
                .from('notes')
                .select('*')
                .eq('id', noteId)
                .single();

            if (error) throw error;

            if (note) {
                document.getElementById('note-id').value = note.id;
                document.getElementById('title').value = note.title;
                document.getElementById('content').value = note.content;
                document.getElementById('btn-save').innerHTML = `<span class="material-symbols-outlined">edit</span> Atualizar Nota`;
            }
        } catch (err) {
            console.error("Erro ao carregar nota para edição:", err.message);
        }
    }
}

// Executa a verificação se estiver na página de cadastro
if (window.location.pathname.includes('cadastrar_notas.html')) {
    document.addEventListener('DOMContentLoaded', checkEditMode);
}

