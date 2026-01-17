const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let listaProdutos = [];

// Carregar Produtos
async function loadProdutos() {
    const { data, error } = await _supabase.from('produtos').select('*').order('nome', { ascending: true });
    if (error) {
        console.error("Erro ao carregar produtos:", error);
        return;
    }
    listaProdutos = data || [];
    renderProdutos(listaProdutos);
}

// Renderizar Tabela
function renderProdutos(data) {
    const list = document.getElementById('produtos-list');
    list.innerHTML = data.map(p => {
        const estoque = parseInt(p.estoque_atual) || 0;
        const min = parseInt(p.estoque_minimo) || 0;
        const alertaEstoque = estoque <= min ? 'color: #ef4444; font-weight: bold;' : '';
        
        return `
        <tr>
            <td><small>${p.sku || '-'}</small></td>
            <td><b>${p.nome}</b></td>
            <td>${p.categoria_prod || '-'}</td>
            <td>R$ ${parseFloat(p.preco_custo || 0).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
            <td>R$ ${parseFloat(p.preco_venda || 0).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
            <td style="${alertaEstoque}">${estoque} un</td>
            <td>
                <span class="status-badge" style="background: ${estoque > min ? '#dcfce7; color: #166534;' : '#fee2e2; color: #991b1b;'}">
                    ${estoque > min ? 'Ativo' : 'Baixo Estoque'}
                </span>
            </td>
            <td>
                <button class="btn-action" style="color:#3b82f6" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-action" style="color:#ef4444" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
    }).join('') || '<tr><td colspan="8" style="text-align:center">Nenhum produto cadastrado.</td></tr>';
}

// Salvar / Atualizar
async function handleSaveProduto() {
    const { data: { user } } = await _supabase.auth.getUser();
    const id = document.getElementById('edit-id').value;
    
    const dados = {
        usuario_id: user.id,
        nome: document.getElementById('nome').value,
        sku: document.getElementById('sku').value,
        categoria_prod: document.getElementById('categoria_prod').value,
        preco_custo: parseFloat(document.getElementById('preco_custo').value) || 0,
        preco_venda: parseFloat(document.getElementById('preco_venda').value) || 0,
        estoque_atual: parseInt(document.getElementById('estoque_atual').value) || 0,
        estoque_minimo: parseInt(document.getElementById('estoque_minimo').value) || 0
    };

    if(!dados.nome || !dados.preco_venda) return alert("Nome e Preço de Venda são obrigatórios.");

    if(id) {
        await _supabase.from('produtos').update(dados).eq('id', id);
    } else {
        await _supabase.from('produtos').insert([dados]);
    }

    resetForm();
    loadProdutos();
}

// Filtro
function filtrarProdutos() {
    const busca = document.getElementById('inputBusca').value.toLowerCase();
    const filtrados = listaProdutos.filter(p => 
        p.nome.toLowerCase().includes(busca) || 
        (p.sku && p.sku.toLowerCase().includes(busca)) ||
        (p.categoria_prod && p.categoria_prod.toLowerCase().includes(busca))
    );
    renderProdutos(filtrados);
}

// Editar
function editProduto(id) {
    const p = listaProdutos.find(item => item.id === id);
    document.getElementById('edit-id').value = p.id;
    document.getElementById('nome').value = p.nome;
    document.getElementById('sku').value = p.sku;
    document.getElementById('categoria_prod').value = p.categoria_prod;
    document.getElementById('preco_custo').value = p.preco_custo;
    document.getElementById('preco_venda').value = p.preco_venda;
    document.getElementById('estoque_atual').value = p.estoque_atual;
    document.getElementById('estoque_minimo').value = p.estoque_minimo;
    
    document.getElementById('form-title').innerText = "Editando Produto";
    document.getElementById('btn-save').innerText = "Atualizar Produto";
    document.getElementById('btn-cancel').style.display = 'block';
    window.scrollTo({top:0, behavior:'smooth'});
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('edit-id').value = '';
    document.getElementById('estoque_atual').value = '0';
    document.getElementById('estoque_minimo').value = '5';
    document.getElementById('form-title').innerText = "Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = 'none';
}

async function deleteProduto(id) {
    if(confirm("Deseja excluir este produto?")) {
        await _supabase.from('produtos').delete().eq('id', id);
        loadProdutos();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadProdutos);
