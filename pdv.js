
let pdv_html5QrCode  = null;
let pdv_produtosCache = [];
let pdv_carrinho      = [];

async function pdv_init() {
    await pdv_fetchProdutos();
    await pdv_fetchEntidades();
    await pdv_loadDashboard();
}

function pdv_alternarSubAba(subAba) {
    const pCaixa   = document.getElementById('pdv-painel-caixa');
    const pSangria = document.getElementById('pdv-painel-sangria');
    const btnC     = document.getElementById('pdv-btn-caixa');
    const btnS     = document.getElementById('pdv-btn-sangria');
    const verde    = ['bg-emerald-500','text-white','hover:bg-emerald-600'];
    const cinza    = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];
    btnC.classList.remove(...verde,...cinza); btnS.classList.remove(...verde,...cinza);
    if (subAba==='caixa') {
        pCaixa.classList.remove('hidden');   pSangria.classList.add('hidden');
        btnC.classList.add(...verde);         btnS.classList.add(...cinza);
    } else {
        pCaixa.classList.add('hidden');       pSangria.classList.remove('hidden');
        btnS.classList.add(...verde);         btnC.classList.add(...cinza);
        pdv_loadHistoricoCaixa();
    }
}

async function pdv_fetchProdutos() {
    const { data } = await _supabase.from('produtos').select('*').order('nome',{ascending:true});
    if (data) {
        pdv_produtosCache = data;
        const sel = document.getElementById('pdv-select-produto');
        sel.innerHTML = '<option value="">Selecione um produto para adicionar...</option>';
        data.forEach(p => sel.innerHTML += `<option value="${p.id}">${p.nome} - R$ ${parseFloat(p.preco_venda).toFixed(2)} (Estoque: ${p.quantidade_estoque})</option>`);
    }
}

async function pdv_fetchEntidades() {
    const { data } = await _supabase.from('entidades').select('id,nome_completo').order('nome_completo',{ascending:true});
    if (data) {
        const sel = document.getElementById('pdv-cliente');
        sel.innerHTML = '<option value="">Consumidor Final (Não identificado)</option>';
        data.forEach(e => sel.innerHTML += `<option value="${e.id}">${e.nome_completo}</option>`);
    }
}

function pdv_iniciarLeituraCamera() {
    const c = document.getElementById('pdv-camera-container');
    c.classList.remove('hidden');
    pdv_html5QrCode = new Html5Qrcode("pdv-camera-preview");
    pdv_html5QrCode.start({facingMode:"environment"},{fps:10,qrbox:{width:280,height:140}},txt=>{
        pdv_adicionarPorCodigoBarras(txt); pdv_pararCamera();
    }).catch(()=>{ alert("Permissão de câmera negada."); c.classList.add('hidden'); });
}

function pdv_pararCamera() {
    if (pdv_html5QrCode) pdv_html5QrCode.stop().then(()=>document.getElementById('pdv-camera-container').classList.add('hidden'));
    else document.getElementById('pdv-camera-container').classList.add('hidden');
}

function pdv_adicionarPorCodigoBarras(codigo) {
    const prod = pdv_produtosCache.find(p => p.codigo_barras===codigo.trim());
    if (prod) pdv_adicionarAoCarrinho(prod);
    else alert(`Produto [${codigo}] não localizado.`);
}

function pdv_adicionarDoSelect() {
    const sel = document.getElementById('pdv-select-produto');
    if (!sel.value) return;
    const prod = pdv_produtosCache.find(p => p.id===sel.value);
    if (prod) pdv_adicionarAoCarrinho(prod);
    sel.value='';
}

function pdv_adicionarAoCarrinho(produto) {
    const item = pdv_carrinho.find(i => i.id===produto.id);
    if (item) item.quantidade+=1;
    else pdv_carrinho.push({...produto, quantidade:1});
    pdv_renderCarrinho();
}

function pdv_alterarQuantidade(id, delta) {
    const item = pdv_carrinho.find(i => i.id===id);
    if (item) { item.quantidade+=delta; if (item.quantidade<=0) pdv_carrinho=pdv_carrinho.filter(i=>i.id!==id); }
    pdv_renderCarrinho();
}

function pdv_removerDoCarrinho(id) { pdv_carrinho=pdv_carrinho.filter(i=>i.id!==id); pdv_renderCarrinho(); }

function pdv_renderCarrinho() {
    const tbody  = document.getElementById('pdv-carrinho-corpo');
    const vazio  = document.getElementById('pdv-carrinho-vazio');
    document.getElementById('pdv-dash-carrinho').innerText = pdv_carrinho.reduce((a,c)=>a+c.quantidade,0);
    if (!pdv_carrinho.length) { tbody.innerHTML=''; vazio.classList.remove('hidden'); pdv_recalcularTotais(); return; }
    vazio.classList.add('hidden');
    tbody.innerHTML = pdv_carrinho.map(item => {
        const sub = item.preco_venda*item.quantidade;
        const cod = item.codigo_barras ? `[${item.codigo_barras}]` : '(Sem código)';
        return `<tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
          <td class="p-3"><div class="font-bold text-slate-700 dark:text-white">${item.nome}</div><span class="text-xs text-slate-400 font-mono">${cod}</span></td>
          <td class="p-3"><div class="flex items-center justify-center gap-1">
            <button onclick="pdv_alterarQuantidade('${item.id}',-1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">-</button>
            <span class="font-bold px-2">${item.quantidade}</span>
            <button onclick="pdv_alterarQuantidade('${item.id}',1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">+</button>
          </div></td>
          <td class="p-3 text-right font-medium text-slate-600 dark:text-slate-300">R$ ${parseFloat(item.preco_venda).toFixed(2)}</td>
          <td class="p-3 text-right font-bold text-slate-800 dark:text-white">R$ ${sub.toFixed(2)}</td>
          <td class="p-3 text-center"><button onclick="pdv_removerDoCarrinho('${item.id}')" class="text-red-500 hover:text-red-700"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
    }).join('');
    pdv_recalcularTotais();
}

function pdv_recalcularTotais() {
    const sub  = pdv_carrinho.reduce((a,i)=>a+(i.preco_venda*i.quantidade),0);
    const desc = parseFloat(document.getElementById('pdv-desconto').value)||0;
    const tot  = Math.max(0,sub-desc);
    document.getElementById('pdv-resumo-subtotal').innerText = `R$ ${sub.toFixed(2)}`;
    document.getElementById('pdv-resumo-desconto').innerText = `- R$ ${desc.toFixed(2)}`;
    document.getElementById('pdv-resumo-total').innerText    = `R$ ${tot.toFixed(2)}`;
}

async function pdv_finalizarVenda() {
    if (!pdv_carrinho.length) return alert("Adicione ao menos um produto!");
    const totalFinal = Math.max(0, pdv_carrinho.reduce((a,i)=>a+(i.preco_venda*i.quantidade),0) - (parseFloat(document.getElementById('pdv-desconto').value)||0));
    const clienteId  = document.getElementById('pdv-cliente').value;
    const formaPagto = document.getElementById('pdv-forma-pagamento').value;
    const desconto   = parseFloat(document.getElementById('pdv-desconto').value)||0;
    if (!confirm(`Confirmar recebimento e finalizar venda de R$ ${totalFinal.toFixed(2)}?`)) return;
    try {
        const { data: venda, error: errV } = await _supabase.from('vendas').insert([{
            entidade_id:clienteId||null, valor_total:totalFinal, desconto, forma_pagamento:formaPagto, status:'concluida'
        }]).select().single();
        if (errV) throw errV;
        const itens = pdv_carrinho.map(i=>({ venda_id:venda.id, produto_id:i.id, quantidade:i.quantidade, preco_unitario:i.preco_venda, subtotal:i.preco_venda*i.quantidade }));
        const { error: errI } = await _supabase.from('itens_venda').insert(itens);
        if (errI) throw errI;
        const { data: fin, error: errF } = await _supabase.from('financas').insert([{
            entidade_id:clienteId||null, descricao:`Venda PDV - Cupom #${venda.id.substring(0,8)} (${formaPagto})`,
            valor_total:totalFinal, tipo:'receita', num_parcelas:1, categoria:'Vendas', status_lancamento:'finalizado'
        }]).select().single();
        if (errF) throw errF;
        await _supabase.from('parcelas').insert([{ financa_id:fin.id, num_parcela:1, valor_parcela:totalFinal, data_vencimento:new Date().toISOString().split('T')[0], data_pagamento:new Date().toISOString().split('T')[0], status:'pago' }]);
        alert("Venda registrada e integrada ao financeiro!");
        pdv_carrinho=[];
        document.getElementById('pdv-desconto').value='0.00';
        pdv_renderCarrinho();
        pdv_loadDashboard();
        await pdv_fetchProdutos(); // atualiza cache de estoque
    } catch(error) { alert("Erro na venda: "+error.message); }
}

async function pdv_salvarSangria() {
    const valor  = parseFloat(document.getElementById('pdv-sangria-valor').value);
    const motivo = document.getElementById('pdv-sangria-motivo').value.trim();
    if (isNaN(valor)||valor<=0||!motivo) return alert("Preencha o valor e a justificativa.");
    if (!confirm(`Confirmar sangria de R$ ${valor.toFixed(2)}?`)) return;
    try {
        const { data: fin, error: errF } = await _supabase.from('financas').insert([{
            descricao:`Sangria Caixa: ${motivo}`, valor_total:valor, tipo:'despesa', num_parcelas:1, categoria:'Sangria', status_lancamento:'finalizado'
        }]).select().single();
        if (errF) throw errF;
        await _supabase.from('parcelas').insert([{ financa_id:fin.id, num_parcela:1, valor_parcela:valor, data_vencimento:new Date().toISOString().split('T')[0], data_pagamento:new Date().toISOString().split('T')[0], status:'pago' }]);
        alert("Sangria registrada!");
        document.getElementById('pdv-sangria-valor').value='';
        document.getElementById('pdv-sangria-motivo').value='';
        pdv_loadDashboard();
        pdv_loadHistoricoCaixa();
    } catch(error) { alert("Erro: "+error.message); }
}

async function pdv_loadDashboard() {
    const hoje = new Date().toISOString().split('T')[0];
    const { data } = await _supabase.from('financas').select('*').gte('created_at',`${hoje}T00:00:00Z`);
    let tv=0, ts=0;
    if (data) data.forEach(f => {
        if (f.categoria==='Vendas' && f.tipo==='receita') tv+=parseFloat(f.valor_total||0);
        if (f.categoria==='Sangria'&& f.tipo==='despesa') ts+=parseFloat(f.valor_total||0);
    });
    document.getElementById('pdv-dash-vendas').innerText   = `R$ ${tv.toFixed(2)}`;
    document.getElementById('pdv-dash-sangrias').innerText = `R$ ${ts.toFixed(2)}`;
}

async function pdv_loadHistoricoCaixa() {
    const hoje = new Date().toISOString().split('T')[0];
    const { data } = await _supabase.from('financas').select('*').or("categoria.eq.Vendas,categoria.eq.Sangria").gte('created_at',`${hoje}T00:00:00Z`).order('created_at',{ascending:false});
    const tbody = document.getElementById('pdv-lista-fluxo');
    if (!data||!data.length) { tbody.innerHTML='<tr><td colspan="5" class="p-4 text-center text-slate-400">Nenhuma transação hoje.</td></tr>'; return; }
    tbody.innerHTML = data.map(f => {
        const hora = new Date(f.created_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
        const sc   = f.tipo==='receita'?'status-receita':'status-despesa';
        const st   = f.tipo==='receita'?'ENTRADA':'SANGRIA';
        const cor  = f.tipo==='receita'?'text-emerald-600':'text-red-600';
        return `<tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
          <td class="p-3 font-medium text-slate-500">${hora}</td>
          <td class="p-3 font-bold text-slate-700 dark:text-white">${f.descricao}</td>
          <td class="p-3 text-slate-500">${f.categoria}</td>
          <td class="p-3 text-center"><span class="${sc}">${st}</span></td>
          <td class="p-3 text-right font-extrabold ${cor}">R$ ${parseFloat(f.valor_total).toFixed(2)}</td>
        </tr>`;
    }).join('');
}

