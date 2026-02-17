/**
 * Processa a venda, gera financeiro e abate estoque
 */
async function realizarVendaCompleta() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    const totalVenda = carrinho.reduce((acc, p) => acc + parseFloat(p.preco_venda), 0);

    try {
        // 1. Registrar no Financeiro
        const { error: erroFin } = await window.supabaseClient.from('financeiro').insert([{
            descricao: `Venda PDV: ${carrinho.length} itens`,
            tipo: 'receber',
            valor: totalVenda,
            status: 'pago',
            categoria: 'Venda Direta'
        }]);

        if (erroFin) throw erroFin;

        // 2. Loop de Baixa de Estoque
        for (const item of carrinho) {
            const novoEstoque = item.estoque_atual - 1;
            await window.supabaseClient.from('produtos')
                .update({ estoque_atual: novoEstoque })
                .eq('id', item.id);
        }

        alert("Venda finalizada com sucesso!");
        carrinho = []; // Limpa carrinho
        atualizarInterfaceCheckout();
        location.reload(); // Recarrega para atualizar estoque visual

    } catch (error) {
        console.error("Erro na transação:", error.message);
        alert("Falha ao processar venda.");
    }
}

// Vincula ao botão via ID
document.getElementById('btn-confirmar-venda').addEventListener('click', realizarVendaCompleta);
