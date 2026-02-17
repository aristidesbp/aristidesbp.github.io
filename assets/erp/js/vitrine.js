// vitrine.js

let produtosFull = [];
let carrinho = [];
let html5QrCode;

// --- INICIALIZAÇÃO ---
async function carregarTudo() {
    try {
        // Busca produtos do banco
        const { data, error } = await _supabase.from('produtos').select('*').order('nome');
        
        if (error) throw error;

        produtosFull = data || [];
        
        if (produtosFull.length === 0) {
            document.getElementById('lista-produtos').innerHTML = '<p class="text-center p-10">Nenhum produto cadastrado.</p>';
        } else {
            renderizarProdutos(produtosFull);
            popularCategorias(produtosFull);
        }
    } catch (err) {
        console.error("Erro ao carregar vitrine:", err);
        alert("Erro ao conectar com o banco de dados.");
    }
}

// --- CATEGORIAS (SELECT DINÂMICO) ---
function popularCategorias(dados) {
    const select = document.getElementById('filtro-categoria');
    // Extrai categorias únicas e remove nulos/vazios
    const categorias = [...new Set(dados.map(p => p.categoria_prod).filter(c => c && c.trim() !== ""))];
    
    select.innerHTML = '<option value="">Todas as Categorias</option>';
    categorias.sort().forEach(cat => {
        select.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

// --- RENDERIZAÇÃO ---
function renderizarProdutos(lista) {
    const container = document.getElementById('lista-produtos');
    container.innerHTML = lista.map(p => `
        <div class="card-prod">
            <img src="${p.imagem_url || 'https://via.placeholder.com/150'}" class="prod-img">
            <div class="p-3">
                <h4 class="font-bold text-sm truncate">${p.nome}</h4>
                <p class="text-green-600 font-bold">R$ ${parseFloat(p.preco_venda).toFixed(2)}</p>
                <p class="text-xs text-gray-400">Estoque: ${p.estoque_atual}</p>
            </div>
            <button class="btn-add" onclick="adicionarAoCarrinho('${p.id}')">ADICIONAR</button>
        </div>
    `).join('');
}

// --- CARRINHO ---
function adicionarAoCarrinho(id) {
    const produto = produtosFull.find(p => p.id === id);
    if (produto.estoque_atual <= 0) {
        alert("Produto sem estoque disponível!");
        return;
    }
    carrinho.push(produto);
    atualizarCheckout();
}

function atualizarCheckout() {
    const total = carrinho.reduce((acc, p) => acc + parseFloat(p.preco_venda), 0);
    document.getElementById('total-itens').innerText = `${carrinho.length} itens`;
    document.getElementById('valor-total').innerText = `R$ ${total.toFixed(2)}`;
}

// --- FINALIZAR (ESTOQUE + FINANCEIRO) ---
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Adicione produtos primeiro!");

    const totalVenda = carrinho.reduce((acc, p) => acc + parseFloat(p.preco_venda), 0);

    // 1. LANÇAMENTO FINANCEIRO
    const { error: errFin } = await _supabase.from('financeiro').insert([{
        descricao: `Venda Vitrine: ${carrinho.length} itens`,
        tipo: 'receber',
        valor: totalVenda,
        status: 'pago',
        data_pagamento: new Date().toISOString().split('T')[0],
        data_vencimento: new Date().toISOString().split('T')[0],
        categoria: 'Venda PDV'
    }]);

    if (errFin) return alert("Erro no financeiro: " + errFin.message);

    // 2. BAIXA DE ESTOQUE
    for (const item of carrinho) {
        await _supabase.from('produtos')
            .update({ estoque_atual: item.estoque_atual - 1 })
            .eq('id', item.id);
    }

    alert("Venda realizada e estoque atualizado!");
    carrinho = [];
    atualizarCheckout();
    carregarTudo(); // Recarrega vitrine para atualizar estoque visualmente
}

// --- BUSCA E FILTROS ---
function filtrar() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const cat = document.getElementById('filtro-categoria').value;
    
    const filtrados = produtosFull.filter(p => {
        const matchesBusca = p.nome.toLowerCase().includes(termo) || 
                             (p.codigo_de_barras && p.codigo_de_barras.includes(termo)) ||
                             (p.sku && p.sku.toLowerCase().includes(termo));
        const matchesCat = cat === "" || p.categoria_prod === cat;
        return matchesBusca && matchesCat;
    });
    renderizarProdutos(filtrados);
}

// --- SCANNER PDV ---
function toggleScanner() {
    const div = document.getElementById('reader');
    if (div.style.display === 'block') {
        html5QrCode.stop().then(() => { div.style.display = 'none'; });
    } else {
        div.style.display = 'block';
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                const p = produtosFull.find(prod => prod.codigo_de_barras === decodedText);
                if (p) {
                    adicionarAoCarrinho(p.id);
                    alert("Adicionado: " + p.nome);
                } else {
                    alert("Produto não encontrado no sistema.");
                }
            }
        ).catch(err => alert("Erro na câmera: " + err));
    }
}

document.addEventListener('DOMContentLoaded', carregarTudo);
    

