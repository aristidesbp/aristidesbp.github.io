async function processarLote() {
    // 1. Verifica se tem arquivos na lista
    if (arquivosLote.length === 0) {
        alert("Nenhum arquivo selecionado para processar!");
        return;
    }

    // 2. Muda o visual do botão para mostrar que está carregando
    const btn = document.getElementById('btn-processar-lote');
    const txtOriginal = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando para o Servidor...';

    let sucessos = 0;
    let erros = 0;
    const dataVencimentoPadrao = new Date().toISOString().split('T')[0]; // Pega a data de hoje

    // 3. Loop: Passa por cada arquivo da lista
    for (let i = 0; i < arquivosLote.length; i++) {
        const file = arquivosLote[i];
        
        try {
            // A) Upload do Arquivo para o Storage
            const fileName = `lote_${Date.now()}_${file.name}`;
            const { error: errUpload } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, file);
            
            if (errUpload) throw errUpload;
            
            // Pega o link público do arquivo recém-salvo
            const comprovanteUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;

            // B) Limpa o nome do arquivo (tira o .pdf ou .jpeg) para usar de título da despesa
            let nomeSemExtensao = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

            // C) Cria Lançamento Principal (Finança) - Gravamos com R$ 0.00 para você editar depois
            const { data: financa, error: errF } = await _supabase.from('financas').insert([{
                descricao: `(Lote) ${nomeSemExtensao}`,
                valor_total: 0,
                tipo: 'despesa',
                categoria: 'Geral',
                status_lancamento: 'aberto',
                num_parcelas: 1
            }]).select().single();

            if (errF) throw errF;

            // D) Cria a Parcela amarrada com o comprovante
            const { error: errP } = await _supabase.from('parcelas').insert([{
                financa_id: financa.id,
                num_parcela: 1,
                valor_parcela: 0,
                data_vencimento: dataVencimentoPadrao,
                status: 'pendente',
                comprovante_url: comprovanteUrl
            }]);

            if (errP) throw errP;

            sucessos++;
        } catch (error) {
            console.error("Falha ao processar o arquivo:", file.name, error);
            erros++;
        }
    }

    // 4. Finalização e Limpeza da Tela
    alert(`Processamento em Lote Concluído!\n✅ Sucessos: ${sucessos}\n❌ Erros: ${erros}`);
    
    arquivosLote = [];
    atualizarListaArquivosLote();
    document.getElementById('modal-lote').classList.add('hidden'); // Fecha a janelinha
    
    btn.disabled = false;
    btn.innerHTML = txtOriginal;

    // Atualiza a tabela no fundo para você ver os novos lançamentos aparecerem magicamente!
    loadParcelas();
    loadDashboard();
}
