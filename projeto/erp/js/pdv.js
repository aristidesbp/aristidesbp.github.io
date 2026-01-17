const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let carrinho = [];
let produtosDb = [];
let caixaAbertoId = null;

// 1. Inicialização e Verificação de Caixa
async function initPDV() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    // Verifica se há caixa aberto
    const { data: caixa } = await _supabase
        .from('controle_caixa')
        .select('*')
        .eq('usuario_id', user.id)
        .eq('status', 'Aberto')
        .single();

    if (!caixa) {
        document.getElementById('caixa-status-modal').style.display = 'flex';
    } else {
        caixaAbertoId = caixa.id;
    }

    // Carregar Dados
    const { data: prods } = await _supabase.from('produtos').select('*');
    produtosDb = prods || [];
    
    const { data: clis } = await _supabase.from('entidades').select('id, nome_completo');
    const select = document.getElementById('cliente_id');
    clis?.forEach(c => select.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
}

// 2. Abertura de Caixa
async function abrirCaixa() {
    const valor = parseFloat(document.getElementById('valor_inicial').value) || 0;
    const { data: { user } } = await _supabase.auth.getUser();

    const { data, error } = await _supabase.from('controle_caixa').insert([{
        usuario_id: user.id,
        valor_inicial: valor,
        status: 'Aberto'
    }]).select().single();

    if (error) return alert("Erro ao abrir caixa.");
    location.reload();
}

// 3. Busca de Produtos (Suporta Leitor de Código de Barras)
function buscarProdutoPDV(e) {
    const termo = e.target.value;
    if (e.key === 'Enter' && termo.length > 0) {
        // Tenta achar por código de barras exato
        const p = produtosDb.find(prod => prod.codigo_de_barras === termo || prod.sku === termo);
        if (p) {
            adicionarAoCarrinho(p.id);
            return;
        }
    }

    const resultados = document.getElementById('resultados-busca');
    if (termo.length < 2) { resultados.innerHTML = ''; return; }

    const filtrados = produtosDb.filter(p => 
        p.nome.toLowerCase().includes(termo.toLowerCase()) || 
        (p.codigo_de_barras && p.codigo_de_barras.includes(termo))
    ).slice(0, 5);

    resultados.innerHTML = filtrados.map(p => `
        <div onclick="adicionarAoCarrinho('${p.id}')" style="padding:15px; border-bottom:1px solid #eee; cursor:pointer;">
            <b>${p.nome}</b> <span style="float:right">R$ ${p.preco_venda.toFixed(2)}</span>
        </div>
    `).join('');
}

// 4. Gestão do Carrinho
function adicionarAoCarrinho(id) {
    const prod = produtosDb.find(p => p.id === id);
    const item = carrinho.find(i => i.id === id);

    if (item) {
        item.qtd++;
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
            <td><b>${item.nome}</b></td>
            <td><input type="number" value="${item.qtd}" min="1" oninput="alterarQtd(${index}, this.value)" style="width:60px; padding:5px;"></td>
            <td>R$ ${item.preco_venda.toFixed(2)}</td>
            <td><b>R$ ${(item.qtd * item.preco_venda).toFixed(2)}</b></td>
            <td><button onclick="removerDoCarrinho(${index})" class="btn-action" style="color:red"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
    calcularTotalVenda();
}

function alterarQtd(index, valor) {
    const novaQtd = parseInt(valor);
    if (novaQtd > 0) {
        carrinho[index].qtd = novaQtd;
        renderCarrinho(); // Isso garante a atualização do Subtotal na linha e no Total Geral
    }
}

function calcularTotalVenda() {
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    
    document.getElementById('total-bruto').innerText = `R$ ${bruto.toFixed(2)}`;
    document.getElementById('total-venda').innerText = `R$ ${(bruto - desc).toFixed(2)}`;
}

// 5. Finalização Profissional
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    if (!caixaAbertoId) return alert("Caixa não está aberto!");

    const { data: { user } } = await _supabase.auth.getUser();
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    const total = bruto - desc;

    // Inserir Venda
    const { data: venda, error } = await _supabase.from('vendas').insert([{
        usuario_id: user.id,
        entidade_id: document.getElementById('cliente_id').value || null,
        total_bruto: bruto,
        desconto: desc,
        total_liquido: total,
        forma_pagto: document.getElementById('forma_pagto').value
    }]).select().single();

    if (error) return alert("Erro ao salvar.");

    // Atualizar Itens e Estoque
    for (const item of carrinho) {
        await _supabase.from('vendas_itens').insert([{
            venda_id: venda.id,
            produto_id: item.id,
            quantidade: item.qtd,
            preco_unitario: item.preco_venda,
            total_item: item.preco_venda * item.qtd
        }]);
        await _supabase.from('produtos').update({ estoque_atual: item.estoque_atual - item.qtd }).eq('id', item.id);
    }

    // Financeiro
    await _supabase.from('financeiro').insert([{
        usuario_id: user.id,
        tipo: 'Entrada',
        descricao: `VENDA PDV #${venda.id.slice(0,5)}`,
        valor: total,
        status: 'Pago',
        data_pagamento: new Date().toISOString(),
        forma_pagto: document.getElementById('forma_pagto').value
    }]);

    alert("VENDA FINALIZADA!");
    carrinho = [];
    renderCarrinho();
    document.getElementById('busca-pdv').focus();
}

async function fecharCaixa() {
    if(!confirm("Deseja fechar o caixa e encerrar o expediente?")) return;
    await _supabase.from('controle_caixa').update({ 
        status: 'Fechado', 
        data_fechamento: new Date().toISOString() 
    }).eq('id', caixaAbertoId);
    location.reload();
}

document.addEventListener('DOMContentLoaded', initPDV);
// Atalho F2 para finalizar
document.addEventListener('keydown', (e) => { if(e.key === 'F2') finalizarVenda(); });
