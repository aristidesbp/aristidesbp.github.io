const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let carrinho = [];
let produtosDb = [];
let caixaAbertoId = null;

// 1. Inicialização e Verificação de Caixa
async function initPDV() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    // Verifica se há caixa aberto para este usuário
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
        document.getElementById('caixa-info').innerText = `Caixa Aberto #${caixa.id.slice(0,5)}`;
    }

    // Carregar Produtos e Clientes
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

// 3. Busca de Produtos (Leitor de Barras e Nome)
function buscarProdutoPDV(e) {
    const termo = e.target.value;
    if (e.key === 'Enter' && termo.length > 0) {
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
        <div onclick="adicionarAoCarrinho('${p.id}')" style="padding:15px; border-bottom:1px solid #eee; cursor:pointer; background:white; color:#333;">
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
            <td><button onclick="removerDoCarrinho(${index})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
    calcularTotalVenda();
}

function alterarQtd(index, valor) {
    const novaQtd = parseInt(valor);
    if (novaQtd > 0) {
        carrinho[index].qtd = novaQtd;
        renderCarrinho();
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderCarrinho();
}

function calcularTotalVenda() {
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    document.getElementById('total-bruto').innerText = `R$ ${bruto.toFixed(2)}`;
    document.getElementById('total-venda').innerText = `R$ ${(bruto - desc).toFixed(2)}`;
}

// 5. Finalização (Frente de Caixa)
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    if (!caixaAbertoId) return alert("Caixa não está aberto!");

    const { data: { user } } = await _supabase.auth.getUser();
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    const total = bruto - desc;

    // Inserir Venda (Vinculada ao caixa_id)
    const { data: venda, error } = await _supabase.from('vendas').insert([{
        usuario_id: user.id,
        caixa_id: caixaAbertoId,
        entidade_id: document.getElementById('cliente_id').value || null,
        total_bruto: bruto,
        desconto: desc,
        total_liquido: total,
        forma_pagto: document.getElementById('forma_pagto').value,
        status: 'Concluída'
    }]).select().single();

    if (error) return alert("Erro ao salvar venda.");

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

    alert("VENDA FINALIZADA COM SUCESSO!");
    carrinho = [];
    renderCarrinho();
    focarBusca();
}

// 6. Fechamento Profissional (Retaguarda)
async function fecharCaixa() {
    const dinheiroGaveta = prompt("FECHAMENTO CEGO\nInforme o valor total em DINHEIRO que existe na gaveta:");
    if (dinheiroGaveta === null) return;

    const valorInformado = parseFloat(dinheiroGaveta.replace(',', '.'));

    // Busca totais do sistema para este caixa
    const { data: vendas } = await _supabase
        .from('vendas')
        .select('total_liquido, forma_pagto')
        .eq('caixa_id', caixaAbertoId)
        .eq('status', 'Concluída');

    const resumo = vendas.reduce((acc, v) => {
        if (v.forma_pagto === 'Dinheiro') acc.dinheiro += v.total_liquido;
        else if (v.forma_pagto === 'Pix') acc.pix += v.total_liquido;
        else acc.cartao += v.total_liquido;
        return acc;
    }, { dinheiro: 0, pix: 0, cartao: 0 });

    const totalGeral = resumo.dinheiro + resumo.pix + resumo.cartao;
    const diferenca = valorInformado - resumo.dinheiro;

    // Atualiza tabela de controle
    await _supabase.from('controle_caixa').update({ 
        status: 'Fechado', 
        data_fechamento: new Date().toISOString(),
        valor_final: valorInformado,
        total_sistema_dinheiro: resumo.dinheiro,
        total_sistema_pix: resumo.pix,
        total_sistema_cartao: resumo.cartao
    }).eq('id', caixaAbertoId);

    // INTEGRAÇÃO FINANCEIRA: Gera um único lançamento do dia
    const { data: { user } } = await _supabase.auth.getUser();
    await _supabase.from('financeiro').insert([{
        usuario_id: user.id,
        tipo: 'Entrada',
        descricao: `FECHAMENTO CAIXA PDV #${caixaAbertoId.slice(0,5)}`,
        valor: totalGeral,
        status: 'Pago',
        data_pagamento: new Date().toISOString(),
        forma_pagto: 'Diversos',
        observacoes: `Diferença em dinheiro: R$ ${diferenca.toFixed(2)}`
    }]);

    alert(`CAIXA ENCERRADO!\n\nVendas Totais: R$ ${totalGeral.toFixed(2)}\nDinheiro esperado: R$ ${resumo.dinheiro.toFixed(2)}\nDinheiro informado: R$ ${valorInformado.toFixed(2)}\nDiferença: R$ ${diferenca.toFixed(2)}`);
    location.reload();
}

async function gerarRelatorioParcial() {
    const { data: vendas } = await _supabase
        .from('vendas')
        .select('total_liquido, forma_pagto')
        .eq('caixa_id', caixaAbertoId)
        .eq('status', 'Concluída');

    const total = vendas.reduce((acc, v) => acc + v.total_liquido, 0);
    alert(`RELATÓRIO PARCIAL (X)\n\nTotal de Vendas até agora: R$ ${total.toFixed(2)}\nQuantidade de Vendas: ${vendas.length}`);
}

// Utilitários
function focarBusca() { document.getElementById('busca-pdv').focus(); }
function desistirAbertura() { window.location.href = 'index.html'; }

document.addEventListener('DOMContentLoaded', initPDV);
document.addEventListener('keydown', (e) => { if(e.key === 'F2') finalizarVenda(); });
