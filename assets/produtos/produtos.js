const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let listaProdutos = [];

// Carregar Produtos e Entidades ao iniciar
async function inicializar() {
    await loadEntidadesProd();
    await loadProdutos();
}

// Carregar Lista de Entidades para o Select (Fornecedores)
async function loadEntidadesProd() {
    const { data, error } = await _supabase
        .from('entidades')
        .select('id, nome_completo')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar entidades:", error);
        return;
    }

    const select = document.getElementById('entidade_id');
    // Mantém apenas a primeira opção e limpa o resto
    select.innerHTML = '<option value="">Selecione...</option>'; 
    data.forEach(ent => {
        select.innerHTML += `<option value="${ent.id}">${ent.nome_completo}</option>`;
    });
}

// Carregar Produtos (com join para trazer nome da entidade)
async function loadProdutos() {
    const { data, error } = await _supabase
        .from('produtos')
        .select(`
            *,
            entidades ( nome_completo )
        `)
        .order('nome', { ascending: true });

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
        
        // Formata data de vencimento para padrão brasileiro se existir
        const vencimento = p.data_vencimento ? new Date(p.data_vencimento).toLocaleDateString('pt-BR') : '-';
        
        return `
        <tr>
            <td><small>${p.codigo_de_barras || p.sku || '-'}</small></td>
            <td><b>${p.nome}</b><br><small style="color:gray">${p.marca || ''}</small></td>
            <td>${p.categoria_prod || '-'}</td>
            <td>R$ ${parseFloat(p.preco_custo || 0).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
            <td>R$ ${parseFloat(p.preco_venda || 0).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
            <td style="${alertaEstoque}">${estoque} un</td>
            <td><small>${vencimento}</small></td>
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
        codigo_de_barras: document.getElementById('codigo_de_barras').value,
        marca: document.getElementById('marca').value,
        categoria_prod: document.getElementById('categoria_prod').value,
        descricao: document.getElementById('descricao').value,
        data_vencimento: document.getElementById('data_vencimento').value || null,
        entidade_id: document.getElementById('entidade_id').value ? parseInt(document.getElementById('entidade_id').value) : null,
        preco_custo: parseFloat(document.getElementById('preco_custo').value) || 0,
        preco_venda: parseFloat(document.getElementById('preco_venda').value) || 0,
        estoque_atual: parseInt(document.getElementById('estoque_atual').value) || 0,
        estoque_minimo: parseInt(document.getElementById('estoque_minimo').value) || 0
    };

    if(!dados.nome || !dados.preco_venda) return alert("Nome e Preço de Venda são obrigatórios.");

    try {
        if(id) {
            await _supabase.from('produtos').update(dados).eq('id', id);
        } else {
            await _supabase.from('produtos').insert([dados]);
        }
        
        resetForm();
        loadProdutos();
        alert("Produto salvo com sucesso!");
    } catch (err) {
        console.error("Erro ao salvar:", err);
        alert("Erro ao salvar produto.");
    }
}

// Filtro
function filtrarProdutos() {
    const busca = document.getElementById('inputBusca').value.toLowerCase();
    const filtrados = listaProdutos.filter(p => 
        p.nome.toLowerCase().includes(busca) || 
        (p.sku && p.sku.toLowerCase().includes(busca)) ||
        (p.codigo_de_barras && p.codigo_de_barras.toLowerCase().includes(busca)) ||
        (p.marca && p.marca.toLowerCase().includes(busca))
    );
    renderProdutos(filtrados);
}

// Editar
function editProduto(id) {
    const p = listaProdutos.find(item => item.id === id);
    if(!p) return;

    document.getElementById('edit-id').value = p.id;
    document.getElementById('nome').value = p.nome;
    document.getElementById('sku').value = p.sku || '';
    document.getElementById('codigo_de_barras').value = p.codigo_de_barras || '';
    document.getElementById('marca').value = p.marca || '';
    document.getElementById('categoria_prod').value = p.categoria_prod || '';
    document.getElementById('descricao').value = p.descricao || '';
    document.getElementById('data_vencimento').value = p.data_vencimento || '';
    document.getElementById('entidade_id').value = p.entidade_id || '';
    
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
    // Limpa todos os inputs e textareas
    document.querySelectorAll('input, textarea, select').forEach(i => i.value = '');
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

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', inicializar);
