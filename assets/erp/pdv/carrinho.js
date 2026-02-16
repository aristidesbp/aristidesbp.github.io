/**
 * Gerencia o estado do carrinho de compras do PDV
 */
let carrinho = [];

function adicionarAoCarrinho(produtoId) {
    // Busca o produto na lista global carregada no início
    const produto = produtosGlobais.find(p => p.id === produtoId);
    
    if (produto && produto.estoque_atual > 0) {
        carrinho.push(produto);
        atualizarInterfaceCheckout();
    } else {
        alert("Atenção: Produto sem estoque disponível.");
    }
}

function atualizarInterfaceCheckout() {
    const labelItens = document.getElementById('label-total-itens');
    const labelTotal = document.getElementById('label-valor-total');
    
    const totalFinanceiro = carrinho.reduce((acc, item) => acc + parseFloat(item.preco_venda), 0);
    
    labelItens.innerText = `${carrinho.length} itens no carrinho`;
    labelTotal.innerText = `R$ ${totalFinanceiro.toFixed(2)}`;
}
