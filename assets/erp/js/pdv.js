/**
 * ERP ABP - Módulo PDV Profissional
 * Desenvolvido para: Aristides
 */

const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let carrinho = [];      
let produtosDb = [];    
let clientesDb = [];    // Cache local de clientes para busca rápida
let caixaAbertoId = null; 

// --- 1. INICIALIZAÇÃO ---
async function initPDV() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    // Verifica caixa aberto
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

    // Carrega Produtos e Clientes para o Cache
    const { data: prods } = await _supabase.from('produtos').select('*');
    produtosDb = prods || [];

    const { data: clis } = await _supabase.from('entidades').select('id, nome_completo, documento');
    clientesDb = clis || [];
}

// --- 2. GESTÃO DE CLIENTES (NOVO) ---
function buscarClientePDV(e) {
    const termo = e.target.value.toLowerCase();
    const resultados = document.getElementById('resultados-cliente');
    
    if (termo.length < 2) { 
        resultados.innerHTML = ''; 
        return; 
    }

    // Filtra por nome ou documento (CPF/CNPJ)
    const filtrados = clientesDb.filter(c => 
        (c.nome_completo && c.nome_completo.toLowerCase().includes(termo)) || 
        (c.documento && c.documento.includes(termo))
    ).slice(0, 5);

    resultados.innerHTML = filtrados.map(c => `
        <div onclick="selecionarCliente('${c.id}', '${c.nome_completo}')" style="padding:10px; border-bottom:1px solid #eee; cursor:pointer; background:white; color:#333;">
            <b>${c.nome_completo}</b> <br>
            <small style="color: #666;">${c.documento || 'Sem Documento'}</small>
        </div>
    `).join('');
}

function selecionarCliente(id, nome) {
    document.getElementById('cliente_id').value = id;
    document.getElementById('cliente-selecionado').innerHTML = `<i class="fas fa-user-check"></i> Cliente: ${nome}`;
    document.getElementById('cliente-busca').value = '';
    document.getElementById('resultados-cliente').innerHTML = '';
}

// --- 3. OPERAÇÃO DE VENDAS ---
function buscarProdutoPDV(e) {
    const termo = e.target.value;
    if (e.key === 'Enter' && termo.length > 0) {
        const p = produtosDb.find(prod => prod.codigo_de_barras === termo || prod.sku === termo);
        if (p) { adicionarAoCarrinho(p.id); return; }
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

function adicionarAoCarrinho(id) {
    const prod = produtosDb.find(p => p.id === id);
    const item = carrinho.find(i => i.id === id);
    if (item) { item.qtd++; } else { carrinho.push({ ...prod, qtd: 1 }); }
    document.getElementById('busca-pdv').value = '';
    document.getElementById('resultados-busca').innerHTML = '';
    renderCarrinho();
}

function renderCarrinho() {
    const corpo = document.getElementById('carrinho-corpo');
    corpo.innerHTML = carrinho.map((item, index) => `
        <tr>
            <td style="padding:15px;"><b>${item.nome}</b></td>
            <td><input type="number" value="${item.qtd}" min="1" oninput="alterarQtd(${index}, this.value)" style="width:60px; padding:5px; border:1px solid #ddd; border-radius:4px;"></td>
            <td>R$ ${item.preco_venda.toFixed(2)}</td>
            <td><b>R$ ${(item.qtd * item.preco_venda).toFixed(2)}</b></td>
            <td style="text-align:center;"><button onclick="removerDoCarrinho(${index})" style="color:#ef4444; background:none; border:none; cursor:pointer; font-size:1.1rem;"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
    calcularTotalVenda();
}

function alterarQtd(index, valor) {
    const novaQtd = parseInt(valor);
    if (novaQtd > 0) { 
        carrinho[index].qtd = novaQtd; 
        calcularTotalVenda(); 
        // Atualiza o subtotal na linha sem renderizar tudo (performance)
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

// --- 4. FINALIZAÇÃO E IMPRESSÃO ---
async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    if (!caixaAbertoId) return alert("Caixa não está aberto!");

    const { data: { user } } = await _supabase.auth.getUser();
    const bruto = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);
    const desc = parseFloat(document.getElementById('desconto').value) || 0;
    const total = bruto - desc;
    const formaPagto = document.getElementById('forma_pagto').value;
    const clienteId = document.getElementById('cliente_id').value || null;

    // 1. Salva a Venda no Banco
    const { data: venda, error } = await _supabase.from('vendas').insert([{
        usuario_id: user.id,
        caixa_id: caixaAbertoId,
        entidade_id: clienteId,
        total_bruto: bruto,
        desconto: desc,
        total_liquido: total,
        forma_pagto: formaPagto,
        status: 'Concluída'
    }]).select().single();

    if (error) return alert("Erro ao salvar venda.");

    // 2. Registra Itens e Atualiza Estoque
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

    // 3. Lógica do Checkbox de Impressão
    const deveImprimir = document.getElementById('imprimir-ticket').checked;
    if (deveImprimir) {
        imprimirCupom(venda, carrinho);
    } else {
        alert("Venda finalizada com sucesso!");
    }

    // 4. Reseta o PDV para a próxima venda
    carrinho = [];
    document.getElementById('desconto').value = "0.00";
    document.getElementById('cliente_id').value = "";
    document.getElementById('cliente-selecionado').innerHTML = "👤 Consumidor Final";
    renderCarrinho();
    focarBusca();
}

function imprimirCupom(venda, itens) {
    const dataVenda = new Date().toLocaleString('pt-BR');
    let itensHtml = itens.map(i => `
        <tr>
            <td colspan="2" style="padding-top:5px;">${i.nome}</td>
        </tr>
        <tr>
            <td style="font-size:10px;">${i.qtd} un x ${i.preco_venda.toFixed(2)}</td>
            <td style="text-align:right">R$ ${(i.qtd * i.preco_venda).toFixed(2)}</td>
        </tr>
    `).join('');

    const cupomHtml = `
        <html>
        <head>
            <style>
                @page { margin: 0; }
                body { width: 80mm; font-family: 'Courier New', monospace; font-size: 12px; padding: 10px; margin: 0; }
                .hr { border-bottom: 1px dashed #000; margin: 5px 0; }
                .text-center { text-align: center; }
                table { width: 100%; border-collapse: collapse; }
            </style>
        </head>
        <body onload="window.print(); window.close();">
            <div class="text-center">
                <b style="font-size:14px;">SUPERMERCADO ABP</b><br>
                PDV Profissional - Aristides
            </div>
            <div class="hr"></div>
            <div>DATA: ${dataVenda}</div>
            <div>DOC: #${venda.id.slice(0,8).toUpperCase()}</div>
            <div class="hr"></div>
            <table>${itensHtml}</table>
            <div class="hr"></div>
            <div style="display:flex; justify-content:space-between">
                <span><b>TOTAL:</b></span> 
                <span><b>R$ ${venda.total_liquido.toFixed(2)}</b></span>
            </div>
            <div style="font-size:10px; margin-top:5px;">FORMA: ${venda.forma_pagto}</div>
            <div class="hr" style="margin-top:10px;"></div>
            <div class="text-center" style="margin-top:10px;">OBRIGADO PELA PREFERÊNCIA!</div>
        </body>
        </html>
    `;

    const win = window.open('', '_blank', 'width=400,height=600');
    win.document.write(cupomHtml);
    win.document.close();
}

// --- 5. GESTÃO DE CAIXA (ABERTURA/FECHAMENTO) ---
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

async function fecharCaixa() {
    const dinheiroGaveta = prompt("FECHAMENTO CEGO\nInforme o valor em DINHEIRO na gaveta:");
    if (dinheiroGaveta === null) return;
    const valorInformado = parseFloat(dinheiroGaveta.replace(',', '.'));

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

    await _supabase.from('controle_caixa').update({ 
        status: 'Fechado', 
        data_fechamento: new Date().toISOString(),
        valor_final: valorInformado,
        total_sistema_dinheiro: resumo.dinheiro,
        total_sistema_pix: resumo.pix,
        total_sistema_cartao: resumo.cartao
    }).eq('id', caixaAbertoId);

    alert(`CAIXA ENCERRADO COM SUCESSO!`);
    location.reload();
}

// --- 6. UTILITÁRIOS E EVENTOS ---
function focarBusca() { document.getElementById('busca-pdv').focus(); }
function desistirAbertura() { window.location.href = 'index.html'; }

document.addEventListener('DOMContentLoaded', initPDV);

// Atalho F2 para finalizar
document.addEventListener('keydown', (e) => { 
    if(e.key === 'F2') {
        e.preventDefault();
        finalizarVenda(); 
    }
});
