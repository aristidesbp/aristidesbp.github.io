/**
 * PDV Engine - ERP ABP Professional Edition
 * Gerenciamento de Vendas, Estoque e Fluxo de Caixa
 */

let produtosBase = [];
let carrinho = [];
let clienteSelecionado = null;

document.addEventListener('DOMContentLoaded', () => {
    inicializarPDV();
    configurarAtalhos();
});

// --- 1. INICIALIZAÇÃO E CARREGAMENTO ---
async function inicializarPDV() {
    mostrarLoading(true, "Carregando sistema...");
    try {
        await carregarProdutos();
        await carregarClientes();
        renderizarProdutos(produtosBase);
    } catch (error) {
        console.error("Erro na inicialização:", error);
        alert("Erro crítico ao carregar dados do Supabase.");
    } finally {
        mostrarLoading(false);
    }
}

async function carregarProdutos() {
    const { data, error } = await window.supabaseClient
        .from('produtos')
        .select('*')
        .gt('estoque_atual', 0)
        .order('nome', { ascending: true });

    if (error) throw error;
    produtosBase = data;
}

async function carregarClientes() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('id, nome_completo');
    
    if (error) return;
    const select = document.getElementById('select-cliente');
    data.forEach(c => {
        const option = new Option(c.nome_completo, c.id);
        select.add(option);
    });
}

// --- 2. LÓGICA DO CARRINHO ---
function adicionarAoCarrinho(produtoId) {
    const produto = produtosBase.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        if (itemExistente.quantidade < produto.estoque_atual) {
            itemExistente.quantidade++;
        } else {
            alert("Limite de estoque atingido!");
            return;
        }
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco_venda,
            quantidade: 1,
            imagem: produto.imagem_url
        });
    }
    atualizarInterfaceCarrinho();
}

function alterarQuantidade(index, delta) {
    const item = carrinho[index];
    const produtoOriginal = produtosBase.find(p => p.id === item.id);

    if (item.quantidade + delta > 0 && item.quantidade + delta <= produtoOriginal.estoque_atual) {
        item.quantidade += delta;
    } else if (item.quantidade + delta <= 0) {
        carrinho.splice(index, 1);
    }
    atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
    const container = document.getElementById('carrinho-itens');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total-venda');

    if (carrinho.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 mt-10">Carrinho vazio</div>';
        subtotalEl.innerText = 'R$ 0,00';
        totalEl.innerText = 'R$ 0,00';
        return;
    }

    let total = 0;
    container.innerHTML = carrinho.map((item, index) => {
        const sub = item.preco * item.quantidade;
        total += sub;
        return `
            <div class="flex items-center justify-between bg-gray-50 p-2 rounded-lg border">
                <div class="flex-grow">
                    <h4 class="text-sm font-bold uppercase">${item.nome}</h4>
                    <span class="text-xs text-blue-600 font-bold">R$ ${item.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="alterarQuantidade(${index}, -1)" class="w-6 h-6 bg-gray-200 rounded text-xs">-</button>
                    <span class="text-sm font-bold w-4 text-center">${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${index}, 1)" class="w-6 h-6 bg-gray-200 rounded text-xs">+</button>
                </div>
            </div>
        `;
    }).join('');

    const totalFormatado = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    subtotalEl.innerText = totalFormatado;
    totalEl.innerText = totalFormatado;
}

// --- 3. FINALIZAÇÃO DE VENDA (CORE BUSINESS) ---
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Adicione itens ao carrinho!");

    const totalVenda = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const metodoPagamento = document.getElementById('metodo-pagamento').value;
    const entidadeId = document.getElementById('select-cliente').value || null;

    mostrarLoading(true, "Processando Pagamento e Estoque...");

    try {
        // 1. Criar Registro de Venda [cite: 10]
        const { data: venda, error: erroVenda } = await window.supabaseClient
            .from('vendas')
            .insert([{
                entidade_id: entidadeId,
                total_venda: totalVenda,
                metodo_pagamento: metodoPagamento
            }])
            .select()
            .single();

        if (erroVenda) throw erroVenda;

        // 2. Criar Itens da Venda e Baixar Estoque em Loop Promessa [cite: 7, 9]
        for (const item of carrinho) {
            await window.supabaseClient.from('venda_itens').insert({
                venda_id: venda.id,
                produto_id: item.id,
                quantidade: item.quantidade,
                preco_unitario: item.preco
            });

            // Baixa de estoque 
            const pOriginal = produtosBase.find(p => p.id === item.id);
            await window.supabaseClient.from('produtos')
                .update({ estoque_atual: pOriginal.estoque_atual - item.quantidade })
                .eq('id', item.id);
        }

        // 3. Lançar no Financeiro (Entrada Automática) [cite: 4]
        await window.supabaseClient.from('financeiro').insert({
            entidade_id: entidadeId,
            tipo: 'receber',
            descricao: `Venda PDV #${venda.id.slice(0,8)}`,
            valor: totalVenda,
            status: 'pago',
            forma_pagamento: metodoPagamento,
            data_pagamento: new Date().toISOString().split('T')[0]
        });

        alert("Venda realizada com sucesso!");
        novoPedido();
    } catch (error) {
        console.error("Falha na venda:", error);
        alert("Erro ao processar venda. Verifique sua conexão.");
    } finally {
        mostrarLoading(false);
    }
}

// --- 4. UTILITÁRIOS E UI ---
function filtrarProdutos() {
    const termo = document.getElementById('busca-produto').value.toLowerCase();
    const filtrados = produtosBase.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        (p.codigo_de_barras && p.codigo_de_barras.includes(termo))
    );
    renderizarProdutos(filtrados);
}

function renderizarProdutos(lista) {
    const grid = document.getElementById('grid-produtos');
    grid.innerHTML = lista.map(p => `
        <div onclick="adicionarAoCarrinho('${p.id}')" class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all border-2 border-transparent hover:border-blue-500">
            <div class="h-24 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                ${p.imagem_url ? `<img src="${p.imagem_url}" class="object-cover h-full w-full">` : `<i class="fas fa-box text-3xl text-gray-300"></i>`}
            </div>
            <h3 class="text-xs font-bold truncate uppercase">${p.nome}</h3>
            <div class="flex justify-between items-center mt-2">
                <span class="text-blue-700 font-bold text-sm">R$ ${p.preco_venda.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                <span class="text-[10px] bg-gray-100 px-1 rounded">Est: ${p.estoque_atual}</span>
            </div>
        </div>
    `).join('');
}

function mostrarLoading(show, mensagem = "Processando...") {
    const overlay = document.getElementById('loading-overlay');
    overlay.querySelector('span').innerText = mensagem;
    show ? overlay.classList.remove('hidden') : overlay.classList.add('hidden');
}

function novoPedido() {
    carrinho = [];
    document.getElementById('busca-produto').value = '';
    document.getElementById('select-cliente').value = '';
    atualizarInterfaceCarrinho();
    carregarProdutos().then(() => renderizarProdutos(produtosBase));
}

function configurarAtalhos() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F2') {
            e.preventDefault();
            finalizarVenda();
        }
        if (e.key === 'F4') {
            e.preventDefault();
            document.getElementById('busca-produto').focus();
        }
    });
}
