// js/pdv_logic.js
let carrinho = [];
let totalVenda = 0;

// 1. Busca Dinâmica de Produtos
const inputBusca = document.getElementById('busca-produto');
const containerResultados = document.getElementById('resultados-busca');

inputBusca.addEventListener('input', async (e) => {
    const termo = e.target.value;
    if (termo.length < 2) {
        containerResultados.classList.add('hidden');
        return;
    }

    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .or(`nome.ilike.%${termo}%,codigo_barras.eq.${termo}`)
        .limit(5);

    if (produtos && produtos.length > 0) {
        containerResultados.innerHTML = produtos.map(p => `
            <div class="item-busca p-4 border-b flex justify-between items-center" onclick="adicionarAoCarrinho(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                <div>
                    <div class="font-bold">${p.nome}</div>
                    <div class="text-sm text-gray-500">Estoque: ${p.estoque}</div>
                </div>
                <div class="text-green-600 font-bold text-lg">R$ ${p.preco_venda.toFixed(2)}</div>
            </div>
        `).join('');
        containerResultados.classList.remove('hidden');
    }
});

// 2. Adicionar ao Carrinho
function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco_venda,
            quantidade: 1
        });
    }

    inputBusca.value = '';
    containerResultados.classList.add('hidden');
    atualizarTabela();
}

// 3. Atualizar Interface
function atualizarTabela() {
    const tbody = document.getElementById('lista-carrinho');
    totalVenda = 0;

    tbody.innerHTML = carrinho.map((item, index) => {
        const subtotal = item.preco * item.quantidade;
        totalVenda += subtotal;
        return `
            <tr>
                <td class="px-6 py-4 font-medium">${item.nome}</td>
                <td class="px-6 py-4 text-center">${item.quantidade}</td>
                <td class="px-6 py-4 text-right">R$ ${item.preco.toFixed(2)}</td>
                <td class="px-6 py-4 text-right font-bold">R$ ${subtotal.toFixed(2)}</td>
                <td class="px-6 py-4 text-center">
                    <button onclick="removerItem(${index})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    document.getElementById('total-venda').innerText = `R$ ${totalVenda.toFixed(2)}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarTabela();
}

// 4. Finalizar Venda
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    const venda = {
        itens: carrinho,
        total: totalVenda,
        forma_pagamento: document.getElementById('forma-pagamento').value,
        data_venda: new Date().toISOString()
    };

    const { error } = await supabase.from('vendas').insert([venda]);

    if (!error) {
        alert("Venda realizada com sucesso!");
        carrinho = [];
        atualizarTabela();
    } else {
        alert("Erro ao salvar venda: " + error.message);
    }
}

// Atalho Teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'F2') finalizarVenda();
});

