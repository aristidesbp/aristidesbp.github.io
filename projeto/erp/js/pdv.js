/**
 * ERP ABP - Módulo PDV Profissional
 * Aristides - Versão Estável 2026
 */

const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let carrinho = [];      
let produtosDb = [];    
let clientesDb = [];    
let caixaAbertoId = null; 

// --- 1. INICIALIZAÇÃO ---
async function initPDV() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) { window.location.href = 'login.html'; return; }

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
        document.getElementById('caixa-info').innerHTML = `<span style="background:#15803d; padding:5px 10px; border-radius:15px; font-size:0.8rem;">CAIXA ABERTO #${caixa.id.slice(0,5)}</span>`;
    }

    const { data: prods } = await _supabase.from('produtos').select('*');
    produtosDb = prods || [];

    const { data: clis } = await _supabase.from('entidades').select('id, nome_completo, documento');
    clientesDb = clis || [];
}

// --- 2. GESTÃO DE CLIENTES (BUSCA POR BOTÃO) ---
function buscarClientePDVBotao() {
    const termo = document.getElementById('cliente-busca').value.toLowerCase();
    const lista = document.getElementById('lista-resultados-cliente');
    
    if (termo.length < 2) { 
        alert("Digite ao menos 2 letras para buscar."); 
        return; 
    }

    const filtrados = clientesDb.filter(c => 
        (c.nome_completo && c.nome_completo.toLowerCase().includes(termo)) || 
        (c.documento && c.documento.includes(termo))
    ).slice(0, 10);

    if (filtrados.length === 0) {
        lista.innerHTML = '<div style="padding:10px; color:red;">Nenhum cliente encontrado.</div>';
    } else {
        lista.innerHTML = filtrados.map(c => `
            <div class="item-cliente" onclick="selecionarClientePDV('${c.id}', '${c.nome_completo}')">
                <b>${c.nome_completo}</b><br>
                <small>${c.documento || 'Sem CPF'}</small>
            </div>
        `).join('');
    }
    lista.style.display = 'block';
}

function selecionarClientePDV(id, nome) {
    document.getElementById('cliente_id').value = id;
    document.getElementById('cliente-selecionado').innerHTML = `<i class="fas fa-user-check"></i> Selecionado: ${nome}`;
    document.getElementById('lista-resultados-cliente').style.display = 'none';
    document.getElementById('cliente-busca').value = '';
}

// --- 3. OPERAÇÃO DE PRODUTOS ---
function buscarProdutoPDV(e) {
    const termo = e.target.value;
    const resultados = document.getElementById('resultados-busca');

    if (e.key === 'Enter' && termo.length > 0) {
        const p = produtosDb.find(prod => prod.codigo_de_barras === termo || prod.sku === termo);
        if (p) { adicionarAoCarrinho(p.id); return; }
    }

    if (termo.length < 2) { resultados.innerHTML = ''; return; }

    const filtrados = produtosDb.filter(p => 
        p.nome.toLowerCase().includes(termo.toLowerCase()) || 
        (p.codigo_de_barras && p.codigo_de_barras.includes(termo))
    ).slice(0, 5);

    resultados.innerHTML = filtrados.map(p => `
        <div onclick="adicionarAoCarrinho('${p.id}')" style="padding:15px; border-bottom:1px solid #eee; cursor:pointer; background:white; color:#333; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
            <b>${p.nome}</b> <span style="float:right; color:green;">R$ ${p.preco_venda.toFixed(2)}</span>
        </div>
    `).join('');
}

function adicionarAoCarrinho(id) {
    const prod = produtosDb.find(p => p.id === id);
    const itemExistente = carrinho.find(i => i.id === id);
    
    if (itemExistente) { 
        itemExistente.qtd++; 
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
            <td style="padding:15px;"><b>${item.nome}</b></td>
            <td><input type="number" value="${item.qtd}" min="1" onchange="alterarQtd(${index}, this.value)" style="width:60px; padding:5px;"></td>
            <td>R$ ${item.preco_venda.toFixed(2)}</td>
            <td><b>R$ ${(item.qtd * item.preco_venda).toFixed(2)}</b></td>
            <td style="text-align:center;"><button onclick="removerDoCarrinho(${index})" style="color:red; border:none; background:none; cursor:pointer;"><i class="fas fa-trash"></i></button></td>
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
    const liquido = bruto - desc;
    
    document.getElementById('total-bruto').innerText = `R$ ${bruto.toFixed(2)}`;
    document.getElementById('total-venda').innerText = `R$ ${liquido.toFixed(2)}`;
}

// --- 4. FINALIZAÇÃO ---
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    if (!caixaAbertoId) return alert("Abra o caixa primeiro!");

    const { data: { user } } = await _supabase.auth.getUser();
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    const liquido = bruto - desc;
    const forma = document.getElementById('forma_pagto').value;
    const clienteId = document.getElementById('cliente_id').value || null;

    // 1. Salva Venda
    const { data: venda, error } = await _supabase.from('vendas').insert([{
        usuario_id: user.id,
        caixa_id: caixaAbertoId,
        entidade_id: clienteId,
        total_bruto: bruto,
        desconto: desc,
        total_liquido: liquido,
        forma_pagto: forma,
        status: 'Concluída'
    }]).select().single();

    if (error) { console.error(error); return alert("Erro ao salvar venda."); }

    // 2. Itens e Estoque
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

    // 3. Impressão
    if (document.getElementById('imprimir-ticket').checked) {
        imprimirCupom(venda, carrinho);
    }

    // 4. Reset
    alert("Venda concluída!");
    carrinho = [];
    document.getElementById('cliente_id').value = "";
    document.getElementById('cliente-selecionado').innerHTML = "👤 Consumidor Final";
    document.getElementById('desconto').value = "0.00";
    renderCarrinho();
}

function imprimirCupom(venda, itens) {
    const dataVenda = new Date().toLocaleString('pt-BR');
    let itensHtml = itens.map(i => `
        <tr><td colspan="2">${i.nome}</td></tr>
        <tr><td>${i.qtd} un x ${i.preco_venda.toFixed(2)}</td><td style="text-align:right">R$ ${(i.qtd * i.preco_venda).toFixed(2)}</td></tr>
    `).join('');

    const cupom = window.open('', '_blank', 'width=300,height=600');
    cupom.document.write(`
        <html><body style="font-family:monospace; width:80mm; padding:10px;">
            <center><b>SUPERMERCADO ABP</b><br>Aristides - Gestão Profissional</center><hr>
            DATA: ${dataVenda}<br>DOC: #${venda.id.slice(0,8)}<hr>
            <table>${itensHtml}</table><hr>
            <b>TOTAL: R$ ${venda.total_liquido.toFixed(2)}</b><br>
            FORMA: ${venda.forma_pagto}<hr>
            <center>Obrigado pela preferência!</center>
            <script>window.print(); window.close();</script>
        </body></html>
    `);
    cupom.document.close();
}

// --- 5. CAIXA ---
async function abrirCaixa() {
    const valor = parseFloat(document.getElementById('valor_inicial').value) || 0;
    const { data: { user } } = await _supabase.auth.getUser();

    await _supabase.from('controle_caixa').insert([{
        usuario_id: user.id,
        valor_inicial: valor,
        status: 'Aberto'
    }]);
    location.reload();
}

async function fecharCaixa() {
    if(!confirm("Deseja realmente fechar o caixa?")) return;
    await _supabase.from('controle_caixa').update({ 
        status: 'Fechado', 
        data_fechamento: new Date().toISOString() 
    }).eq('id', caixaAbertoId);
    location.reload();
}

// Eventos Globais
document.addEventListener('DOMContentLoaded', initPDV);
document.addEventListener('keydown', (e) => { if(e.key === 'F2') { e.preventDefault(); finalizarVenda(); } });
document.addEventListener('click', (e) => {
    if (!document.getElementById('lista-resultados-cliente').contains(e.target)) {
        document.getElementById('lista-resultados-cliente').style.display = 'none';
    }
});
