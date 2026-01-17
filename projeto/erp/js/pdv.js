const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let carrinho = [];
let produtosDb = [];

async function initPDV() {
    // Carregar produtos para busca rápida
    const { data } = await _supabase.from('produtos').select('*');
    produtosDb = data || [];
    
    // Carregar clientes
    const { data: clientes } = await _supabase.from('entidades').select('id, nome_completo');
    const select = document.getElementById('cliente_id');
    clientes?.forEach(c => select.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
}

function buscarProdutoPDV(e) {
    const termo = e.target.value.toLowerCase();
    const resultados = document.getElementById('resultados-busca');
    
    if (termo.length < 2) { resultados.innerHTML = ''; return; }

    const filtrados = produtosDb.filter(p => 
        p.nome.toLowerCase().includes(termo) || (p.codigo_de_barras && p.codigo_de_barras.includes(termo))
    ).slice(0, 5);

    resultados.innerHTML = filtrados.map(p => `
        <div onclick="adicionarAoCarrinho('${p.id}')" style="padding:10px; background:#fff; border-bottom:1px solid #eee; cursor:pointer;">
            <b>${p.nome}</b> - R$ ${p.preco_venda.toFixed(2)} (Estoque: ${p.estoque_atual})
        </div>
    `).join('');
}

function adicionarAoCarrinho(id) {
    const prod = produtosDb.find(p => p.id === id);
    const itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.qtd++;
    } else {
        carrinho.push({ ...prod, qtd: 1 });
    }
    
    document.getElementById('busca-pdv').value = '';
    document.getElementById('resultados-busca').innerHTML = '';
    renderCarrinho();
}

function renderCarrinho() {
    const corpo = document.getElementById('carrinho-corpo');
    corpo.innerHTML = carrinho.map((item, index) => `
        <tr>
            <td>${item.nome}</td>
            <td><input type="number" value="${item.qtd}" onchange="alterarQtd(${index}, this.value)" style="width:50px"></td>
            <td>R$ ${item.preco_venda.toFixed(2)}</td>
            <td>R$ ${(item.qtd * item.preco_venda).toFixed(2)}</td>
            <td><button onclick="removerDoCarrinho(${index})" style="color:red; border:none; background:none; cursor:pointer;"><i class="fas fa-times"></i></button></td>
        </tr>
    `).join('');
    calcularTotalVenda();
}

function calcularTotalVenda() {
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    
    document.getElementById('total-bruto').innerText = `R$ ${bruto.toFixed(2)}`;
    document.getElementById('total-venda').innerText = `R$ ${(bruto - desc).toFixed(2)}`;
}

async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    const { data: { user } } = await _supabase.auth.getUser();
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;

    // 1. Criar a Venda
    const { data: venda, error: erroVenda } = await _supabase.from('vendas').insert([{
        usuario_id: user.id,
        entidade_id: document.getElementById('cliente_id').value || null,
        total_bruto: bruto,
        desconto: desc,
        total_liquido: bruto - desc,
        forma_pagto: document.getElementById('forma_pagto').value
    }]).select().single();

    if (erroVenda) return alert("Erro ao salvar venda");

    // 2. Salvar Itens e Dar Baixa no Estoque
    for (const item of carrinho) {
        await _supabase.from('vendas_itens').insert([{
            venda_id: venda.id,
            produto_id: item.id,
            quantidade: item.qtd,
            preco_unitario: item.preco_venda,
            total_item: item.preco_venda * item.qtd
        }]);

        // Baixa no Estoque
        await _supabase.from('produtos').update({ 
            estoque_atual: item.estoque_atual - item.qtd 
        }).eq('id', item.id);
    }

    // 3. Gerar Entrada no Financeiro automaticamente
    await _supabase.from('financeiro').insert([{
        usuario_id: user.id,
        tipo: 'Entrada',
        descricao: `Venda PDV #${venda.id.slice(0,8)}`,
        valor: bruto - desc,
        status: 'Pago',
        data_pagamento: new Date().toISOString().split('T')[0],
        forma_pagto: document.getElementById('forma_pagto').value
    }]);

    alert("Venda Finalizada com Sucesso!");
    location.reload();
}

document.addEventListener('DOMContentLoaded', initPDV);
