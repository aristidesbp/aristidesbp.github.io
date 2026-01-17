const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sua_chave_anon_aqui';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let produtosLocal = [];
let carrinho = [];

async function carregarLoja() {
    // 1. Busca produtos que tenham estoque
    const { data, error } = await _supabase
        .from('produtos')
        .select('*')
        .gt('estoque_atual', 0)
        .order('nome');

    if (error) return console.error("Erro ao carregar:", error);

    produtosLocal = data;
    renderizarCategorias();
    renderizarProdutos(data);
}

function renderizarCategorias() {
    const container = document.getElementById('category-container');
    const categorias = ['todos', ...new Set(produtosLocal.map(p => p.categoria_prod).filter(c => c))];
    
    container.innerHTML = categorias.map(cat => `
        <div class="cat-item ${cat === 'todos' ? 'active' : ''}" onclick="filterCategory('${cat}', this)">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </div>
    `).join('');
}

function renderizarProdutos(lista) {
    const container = document.getElementById('product-container');
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    container.innerHTML = lista.map(p => `
        <div class="card">
            <img src="https://via.placeholder.com/150?text=${p.nome.split(' ')[0]}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <span class="price">R$ ${p.preco_venda.toFixed(2)}</span>
            <button class="btn-add" onclick="adicionarAoCarrinho('${p.id}')">
                <i class="fas fa-plus"></i> ADICIONAR
            </button>
        </div>
    `).join('');
}

function filterCategory(cat, el) {
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    if(el) el.classList.add('active');

    const filtrados = cat === 'todos' ? produtosLocal : produtosLocal.filter(p => p.categoria_prod === cat);
    renderizarProdutos(filtrados);
}

// Lógica de Carrinho
function adicionarAoCarrinho(id) {
    const produto = produtosLocal.find(p => p.id === id);
    const itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.qtd++;
    } else {
        carrinho.push({ ...produto, qtd: 1 });
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const count = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    const total = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);

    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;

    const lista = document.getElementById('cart-items');
    lista.innerHTML = carrinho.map((item, index) => `
        <div class="cart-item-row">
            <div>
                <b>${item.nome}</b><br>
                <small>${item.qtd}x R$ ${item.preco_venda.toFixed(2)}</small>
            </div>
            <button onclick="removerDoCarrinho(${index})" style="color:red; background:none; border:none; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

async function checkout() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    
    // Aqui você pode integrar para criar uma venda no banco com status 'Pendente'
    alert("Pedido recebido! Implemente a integração com a tabela 'vendas' para finalizar.");
    carrinho = [];
    atualizarCarrinho();
    toggleCart();
}

document.addEventListener('DOMContentLoaded', carregarLoja);
