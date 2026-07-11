
function adicionarArquivosAoLote(novosArquivos) {
    // Transforma a lista de novos arquivos num Array e junta com os que já estavam
    arquivosLote = [...arquivosLote, ...Array.from(novosArquivos)];
    atualizarListaArquivosLote();
}
