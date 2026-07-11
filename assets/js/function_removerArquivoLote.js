function removerArquivoLote(index) {
    arquivosLote.splice(index, 1); // Remove o arquivo da memória
    atualizarListaArquivosLote(); // Redesenha a lista
}
