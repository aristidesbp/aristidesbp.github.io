const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX'; // Sua chave
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let allProducts = [];
let cart = [];

// Inicialização
async function initShop() {
    const { data, error } = await _supabase
        .from('produtos')
        .select('*')
        .gt('estoque_atual', 0); // Só mostra o que tem no estoque

    if (data) {
        allProducts = data;
        renderCategories();
        renderProducts(allProducts);
    }
}

// Renderizar Categorias Únicas
function renderCategories() {
    const categories = ['todos', ...new Set(allProducts.map(p => p.categoria_prod))];
    const container = document.getElementById('category-list');
    container.innerHTML = categories.map(cat => `
        <button class="cat-btn ${cat === 'todos' ? 'active' : ''}" onclick="filterCategory('${cat}', this)">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');
}

// Filtrar Produtos
function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');

    const filtered = cat === 'todos' ? allProducts : allProducts.filter(p => p.categoria_prod === cat);
    renderProducts(filtered);
}

// Renderizar Produtos
function renderProducts(products) {
    const container = document.getElementById('product-list');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img"><i class="fas fa-box fa-3x" style="color:#ddd"></i></div>
            <span class="product-name">${p.nome}</span>
            <span class="product-price">R$ ${p.preco_venda.toFixed(2)}</span>
            <button class="add-to-cart" onclick="addToCart('${p.id}')">ADICIONAR</button>
        </div>
    `).join('');
}

// Lógica do Carrinho
function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
}

function updateCart() {
    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    const total = cart.reduce((acc, i) => acc + (i.preco_venda * i.qty), 0);
    
    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
    
    const container = document.getElementById('cart-items-list');
    container.innerHTML = cart.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:0.9rem;">
            <div><b>${item.nome}</b><br>${item.qty}x R$ ${item.preco_venda.toFixed(2)}</div>
            <button onclick="removeFromCart(${idx})" style="border:none; color:red; background:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('open');
}

function checkout() {
    if(cart.length === 0) return alert("Carrinho vazio!");
    alert("Pedido enviado com sucesso! Integre agora com o módulo de Vendas do seu ERP.");
    cart = [];
    updateCart();
    toggleCart();
}

document.addEventListener('DOMContentLoaded', initShop);
