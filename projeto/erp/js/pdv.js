/**
 * ERP ABP - Módulo PDV Profissional
 * Desenvolvido para: Aristides
 */

const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let carrinho = [];      // Armazena os itens da venda atual
let produtosDb = [];    // Cache local de produtos para busca rápida
let caixaAbertoId = null; // ID do registro de abertura de caixa atual

// --- 1. INICIALIZAÇÃO ---
async function initPDV() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    // Verifica se existe um caixa com status 'Aberto' para este operador
    const { data: caixa } = await _supabase
        .from('controle_caixa')
        .select('*')
        .eq('usuario_id', user.id)
        .eq('status', 'Aberto')
        .single();

    if (!caixa) {
        // Se não houver caixa aberto, bloqueia o PDV e mostra o modal de abertura
        document.getElementById('caixa-status-modal').style.display = 'flex';
    } else {
        caixaAbertoId = caixa.id;
        document.getElementById('caixa-info').innerText = `Caixa Aberto #${caixa.id.slice(0,5)}`;
    }

    // Carrega todos os produtos para o cache (evita múltiplas requisições ao banco)
    const { data: prods } = await _supabase.from('produtos').select('*');
    produtosDb = prods || [];
    
    // Carrega a lista de clientes para o select
    const { data: clis } = await _supabase.from('entidades').select('id, nome_completo');
    const select = document.getElementById('cliente_id');
    clis?.forEach(c => select.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
}

// --- 2. GESTÃO DE CAIXA ---
async function abrirCaixa() {
    const valor = parseFloat(document.getElementById('valor_inicial').value) || 0;
    const { data: { user } } = await _supabase.auth.getUser();

    // Cria o registro de abertura no banco
    const { data, error } = await _supabase.from('controle_caixa').insert([{
        usuario_id: user.id,
        valor_inicial: valor,
        status: 'Aberto'
    }]).select().single();

    if (error) return alert("Erro ao abrir caixa.");
    location.reload(); // Recarrega para liberar o PDV
}

async function fecharCaixa() {
    const dinheiroGaveta = prompt("FECHAMENTO CEGO\nInforme o valor em DINHEIRO que existe na gaveta agora:");
    if (dinheiroGaveta === null) return;

    const valorInformado = parseFloat(dinheiroGaveta.replace(',', '.'));

    // Busca todas as vendas feitas NESTE turno de caixa
    const { data: vendas } = await _supabase
        .from('vendas')
        .select('total_liquido, forma_pagto')
        .eq('caixa_id', caixaAbertoId)
        .eq('status', 'Concluída');

    // Soma os totais por forma de pagamento
    const resumo = vendas.reduce((acc, v) => {
        if (v.forma_pagto === 'Dinheiro') acc.dinheiro += v.total_liquido;
        else if (v.forma_pagto === 'Pix') acc.pix += v.total_liquido;
        else acc.cartao += v.total_liquido;
        return acc;
    }, { dinheiro: 0, pix: 0, cartao: 0 });

    const totalGeral = resumo.dinheiro + resumo.pix + resumo.cartao;
    const diferenca = valorInformado - resumo.dinheiro;

    // Atualiza o registro de controle de caixa (Fim do turno)
    await _supabase.from('controle_caixa').update({ 
        status: 'Fechado', 
        data_fechamento: new Date().toISOString(),
        valor_final: valorInformado,
        total_sistema_dinheiro: resumo.dinheiro,
        total_sistema_pix: resumo.pix,
        total_sistema_cartao: resumo.cartao
    }).eq('id', caixaAbertoId);

    // LANÇAMENTO FINANCEIRO ÚNICO: Registra o faturamento total do turno no financeiro
    const { data: { user } } = await _supabase.auth.getUser();
    await _supabase.from('financeiro').insert([{
        usuario_id: user.id,
        tipo: 'Entrada',
        descricao: `FECHAMENTO CAIXA PDV #${caixaAbertoId.slice(0,5)}`,
        valor: totalGeral,
        status: 'Pago',
        data_pagamento: new Date().toISOString(),
        observacoes: `Diferença em dinheiro (Sobra/Falta): R$ ${diferenca.toFixed(2)}`
    }]);

    alert(`CAIXA ENCERRADO!\nSistema: R$ ${totalGeral.toFixed(2)}\nInformado: R$ ${valorInformado.toFixed(2)}`);
    location.reload();
}

// --- 3. OPERAÇÃO DE VENDAS ---
function buscarProdutoPDV(e) {
    const termo = e.target.value;
    
    // Suporte a leitor de código de barras (Enter automático)
    if (e.key === 'Enter' && termo.length > 0) {
        const p = produtosDb.find(prod => prod.codigo_de_barras === termo || prod.sku === termo);
        if (p) {
            adicionarAoCarrinho(p.id);
            return;
        }
    }

    const resultados = document.getElementById('resultados-busca');
    if (termo.length < 2) { resultados.innerHTML = ''; return; }

    // Busca por nome ou parte do código
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

    // 4.1 Registra o cabeçalho da venda (Vinculado ao CAIXA)
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

    // 4.2 Registra os itens da venda e baixa o estoque
    for (const item of carrinho) {
        await _supabase.from('vendas_itens').insert([{
            venda_id: venda.id,
            produto_id: item.id,
            quantidade: item.qtd,
            preco_unitario: item.preco_venda,
            total_item: item.preco_venda * item.qtd
        }]);
        // Subtração de estoque em tempo real
        await _supabase.from('produtos').update({ estoque_atual: item.estoque_atual - item.qtd }).eq('id', item.id);
    }

    // 4.3 Oferece a impressão do cupom (Template térmico)
    if (confirm("VENDA REALIZADA! Deseja imprimir o cupom?")) {
        imprimirCupom(venda, carrinho);
    }

    // Reseta o PDV para a próxima venda
    carrinho = [];
    renderCarrinho();
    focarBusca();
}

function imprimirCupom(venda, itens) {
    const dataVenda = new Date().toLocaleString('pt-BR');
    let itensHtml = itens.map(i => `
        <tr>
            <td colspan="2">${i.nome}</td>
        </tr>
        <tr>
            <td>${i.qtd} un x ${i.preco_venda.toFixed(2)}</td>
            <td style="text-align:right">R$ ${(i.qtd * i.preco_venda).toFixed(2)}</td>
        </tr>
    `).join('');

    const cupomHtml = `
        <div style="width: 80mm; font-family: monospace; font-size: 12px; padding: 10px;">
            <div style="text-align:center"><b>SUPERMERCADO ABP</b><br>PDV Profissional - Aristides</div>
            <hr>
            <div>DATA: ${dataVenda}</div>
            <div>DOC: #${venda.id.slice(0,8)}</div>
            <hr>
            <table style="width:100%">${itensHtml}</table>
            <hr>
            <div style="display:flex; justify-content:space-between"><b>TOTAL:</b> <b>R$ ${venda.total_liquido.toFixed(2)}</b></div>
            <div style="text-align:center; margin-top:20px">OBRIGADO PELA PREFERÊNCIA!</div>
        </div>
    `;

    // Abre uma janela temporária para envio à impressora
    const win = window.open('', 'PRINT', 'height=600,width=400');
    win.document.write(cupomHtml);
    win.document.close();
    win.print();
    win.close();
}

// --- 5. UTILITÁRIOS E ATALHOS ---
function focarBusca() { document.getElementById('busca-pdv').focus(); }
function desistirAbertura() { window.location.href = 'index.html'; }

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderCarrinho();
}

// Inicializa o PDV ao carregar a página
document.addEventListener('DOMContentLoaded', initPDV);

// Atalho F2 para finalizar venda (Padrão de Supermercados)
document.addEventListener('keydown', (e) => { 
    if(e.key === 'F2') finalizarVenda(); 
});
