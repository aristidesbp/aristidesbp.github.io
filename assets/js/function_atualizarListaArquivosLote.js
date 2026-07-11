function atualizarListaArquivosLote() {
    const listaDiv = document.getElementById('lista-arquivos-lote');
    listaDiv.innerHTML = ''; // Limpa a tela para reescrever

    if (arquivosLote.length === 0) {
        listaDiv.innerHTML = '<p class="text-slate-400 text-center italic">Nenhum arquivo selecionado.</p>';
        return;
    }

    // Cria uma barrinha azul com o nome do arquivo e botão de apagar para cada item
    arquivosLote.forEach((arq, index) => {
        listaDiv.innerHTML += `
            <div class="flex justify-between items-center bg-blue-50 p-2 rounded border border-blue-200">
                <span class="truncate text-blue-800 font-medium text-xs"><i class="fas fa-file-alt mr-2"></i> ${arq.name}</span>
                <button onclick="removerArquivoLote(${index})" class="text-red-500 hover:text-red-700 ml-2 px-2" title="Remover este arquivo"><i class="fas fa-trash"></i></button>
            </div>
        `;
    });
}
