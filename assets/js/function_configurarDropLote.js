// ========================================================
// LÓGICA DO UPLOAD EM LOTE
// ========================================================

function configurarDropLote() {
    const dropLote = document.getElementById('drop-lote');
    const inputLote = document.getElementById('f-lote-arquivos');

    // Efeito visual quando você arrasta o mouse com arquivos por cima da área
    dropLote.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropLote.classList.add('bg-blue-50', 'border-blue-400');
    });

    // Tira o efeito quando o mouse sai
    dropLote.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropLote.classList.remove('bg-blue-50', 'border-blue-400');
    });

    // Quando você "solta" os arquivos na área
    dropLote.addEventListener('drop', (e) => {
        e.preventDefault();
        dropLote.classList.remove('bg-blue-50', 'border-blue-400');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            adicionarArquivosAoLote(e.dataTransfer.files);
        }
    });

    // Quando você clica e escolhe usando a janela padrão do Windows/Linux
    inputLote.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            adicionarArquivosAoLote(e.target.files);
        }
    });
}
