

let pdv_html5QrCode  = null;
let pdv_produtosCache = [];
let pdv_carrinho      = [];

    
async function pdv_init() {
    await pdv_fetchProdutos();
    await pdv_fetchEntidades();
    await pdv_loadDashboard();
}

function pdv_alternarSubAba(subAba) {
    const pCaixa     = document.getElementById('pdv-painel-caixa');
    const pSangria   = document.getElementById('pdv-painel-sangria');
    const pHistorico = document.getElementById('pdv-painel-historico');
    
    const btnC = document.getElementById('pdv-btn-caixa');
    const btnS = document.getElementById('pdv-btn-sangria');
    const btnH = document.getElementById('pdv-btn-historico');
    
    const verde = ['bg-emerald-500','text-white','hover:bg-emerald-600'];
    const cinza = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];
    
    btnC.classList.remove(...verde,...cinza); 
    btnS.classList.remove(...verde,...cinza); 
    btnH.classList.remove(...verde,...cinza);
    
    pCaixa.classList.add('hidden');
    pSangria.classList.add('hidden');
    pHistorico.classList.add('hidden');

    if (subAba==='caixa') {
        pCaixa.classList.remove('hidden');
        btnC.classList.add(...verde); btnS.classList.add(...cinza); btnH.classList.add(...cinza);
    } else if (subAba==='sangria') {
        pSangria.classList.remove('hidden');
        btnS.classList.add(...verde); btnC.classList.add(...cinza); btnH.classList.add(...cinza);
        pdv_loadHistoricoCaixa();
    } else if (subAba==='historico') {
        pHistorico.classList.remove('hidden');
        btnH.classList.add(...verde); btnC.classList.add(...cinza); btnS.classList.add(...cinza);
        pdv_loadHistoricoVendas();
    }
}

async function pdv_fetchProdutos() {
    const { data } = await _supabase.from('produtos').select('*').order('nome',{ascending:true});
    if (data) {
        pdv_produtosCache = data;
        const datalist = document.getElementById('listaProdutosDatalist');
        datalist.innerHTML = '';
        data.forEach(p => {
            const opt = document.createElement('option');
            opt.value = `${p.id} - ${p.nome} (Estoque: ${p.quantidade_estoque}) - R$ ${parseFloat(p.preco_venda).toFixed(2)}`;
            datalist.appendChild(opt);
        });
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

function pdv_adicionarDoInputBusca() {
    const inputVal = document.getElementById('pdv_buscaProduto').value;
    if (!inputVal) return;
    const idProd = inputVal.split(' - ')[0].trim();
    const prod = pdv_produtosCache.find(p => p.id === idProd || p.nome.toLowerCase().includes(inputVal.toLowerCase()));
    if (prod) {
        pdv_adicionarAoCarrinho(prod);
        document.getElementById('pdv_buscaProduto').value = '';
    } else {
        alert("Produto não encontrado na base de dados.");
    }
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
    
    const subtotalCalc = pdv_carrinho.reduce((a,i)=>a+(i.preco_venda*i.quantidade),0);
    const descontoVal  = parseFloat(document.getElementById('pdv-desconto').value)||0;
    const totalFinal   = Math.max(0, subtotalCalc - descontoVal);
    const clienteId    = document.getElementById('pdv-cliente').value;
    const formaPagto   = document.getElementById('pdv-forma-pagamento').value;
    
    if (!confirm(`Confirmar recebimento e finalizar venda de R$ ${totalFinal.toFixed(2)}?`)) return;
    
    try {
        // Passo 1: Inserir Venda Principal
        const { data: venda, error: errV } = await _supabase.from('vendas').insert([{
            entidade_id: clienteId || null, 
            valor_total: totalFinal, 
            desconto: descontoVal, 
            forma_pagamento: formaPagto, 
            status: 'concluida'
        }]).select().single();
        if (errV) throw errV;

        // Passo 2: Inserir Itens e dar baixa imediata no estoque
        for (let item of pdv_carrinho) {
            await _supabase.from('itens_venda').insert([{
                venda_id: venda.id,
                produto_id: item.id,
                quantidade: item.quantidade,
                preco_unitario: item.preco_venda,
                subtotal: item.preco_venda * item.quantidade
            }]);

            const prodAtual = pdv_produtosCache.find(p => p.id === item.id);
            if (prodAtual) {
                const novoEstoque = Math.max(0, prodAtual.quantidade_estoque - item.quantidade);
                await _supabase.from('produtos').update({ quantidade_estoque: novoEstoque }).eq('id', item.id);
            }
        }

        // Passo 3: Gerar o HTML do Cupom para salvar no Financeiro
        const dataHoraAtual = new Date();
        const dataHoraStr = dataHoraAtual.toLocaleString('pt-BR');
        const idCurto = venda.id.substring(0, 8).toUpperCase();
        
        const itensHtml = pdv_carrinho.map(i => `
            <tr>
              <td>${i.nome}</td>
              <td style="text-align: center;">${i.quantidade}</td>
              <td style="text-align: right;">R$ ${(i.preco_venda * i.quantidade).toFixed(2)}</td>
            </tr>
        `).join('');

        const cupomHtmlCompleto = `
          <div style="font-family: monospace; width: 300px; padding: 10px; margin: 0 auto; color: #000; background: #fff;">
            <h3 style="text-align: center; margin: 0 0 5px 0;">ERP_ABP - CUPOM</h3>
            <p style="text-align: center; font-size: 11px; margin: 0 0 10px 0;">Comprovante de Venda</p>
            <p style="font-size: 11px; margin: 2px 0;">Data: ${dataHoraStr}</p>
            <p style="font-size: 11px; margin: 2px 0;">ID Venda: ${idCurto}</p>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <table style="width: 100%; font-size: 11px;">
              <thead>
                <tr style="border-bottom: 1px solid #000;">
                  <th style="text-align: left;">Item</th>
                  <th style="text-align: center;">Qtd</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itensHtml}</tbody>
            </table>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>R$ ${subtotalCalc.toFixed(2)}</span></div>
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Desconto:</span> <span>R$ ${descontoVal.toFixed(2)}</span></div>
            <div style="font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; margin-top: 5px;"><span>TOTAL:</span> <span>R$ ${totalFinal.toFixed(2)}</span></div>
            <p style="text-align: center; font-size: 10px; margin-top: 15px;">Obrigado pela preferência!</p>
          </div>
        `;

        // Transformando o HTML em um link de dados (Data URI) para armazenar no campo comprovante_url
        const comprovanteDataUri = `data:text/html;charset=utf-8,${encodeURIComponent(cupomHtmlCompleto)}`;

        // Passo 4: Integrar com o Financeiro
        const { data: fin, error: errF } = await _supabase.from('financas').insert([{
            entidade_id: clienteId || null, 
            descricao: `Venda PDV - Cupom #${idCurto} (${formaPagto})`,
            valor_total: totalFinal, 
            tipo: 'receita', 
            num_parcelas: 1, 
            categoria: 'Vendas', 
            status_lancamento: 'finalizado'
        }]).select().single();
        if (errF) throw errF;

        // Passo 5: Inserir a parcela vinculando o comprovante gerado
        await _supabase.from('parcelas').insert([{ 
            financa_id: fin.id, 
            num_parcela: 1, 
            valor_parcela: totalFinal, 
            data_vencimento: new Date().toISOString().split('T')[0], 
            data_pagamento: new Date().toISOString().split('T')[0], 
            status: 'pago',
            comprovante_url: comprovanteDataUri 
        }]);

        alert("Venda registrada, estoque atualizado e comprovante salvo no financeiro!");

        // Passo 6: Configurar o título personalizado para o arquivo de impressão/PDF e imprimir
        const dataHoraArquivo = dataHoraStr.replace(/[/:\s]/g, '-');
        document.title = `Cupom #${idCurto}_R$${totalFinal.toFixed(2)}_${dataHoraArquivo}`;
        
        const conteudoOriginal = document.body.innerHTML;
        document.body.innerHTML = cupomHtmlCompleto;
        window.print();
        document.body.innerHTML = conteudoOriginal;
        window.location.reload();

    } catch (error) { 
        alert("Erro na venda: " + error.message); 
    }
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

async function pdv_loadHistoricoVendas() {
    const { data } = await _supabase.from('vendas').select('*').order('created_at',{ascending:false}).limit(50);
    const tbody = document.getElementById('pdv-lista-vendas-historico');
    if (!data || !data.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400">Nenhuma venda encontrada.</td></tr>';
        return;
    }
    tbody.innerHTML = data.map(v => {
        const dataFormatada = new Date(v.created_at).toLocaleString('pt-BR');
        return `
            <tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td class="p-3"><span class="font-bold text-slate-700 dark:text-white">#${v.id.substring(0,8).toUpperCase()}</span><br><span class="text-xs text-slate-400">${dataFormatada}</span></td>
                <td class="p-3 font-medium">${v.forma_pagamento}</td>
                <td class="p-3 text-right text-red-500">R$ ${parseFloat(v.desconto || 0).toFixed(2)}</td>
                <td class="p-3 text-right font-extrabold text-emerald-600">R$ ${parseFloat(v.valor_total).toFixed(2)}</td>
                <td class="p-3 text-center space-x-1">
                    <button onclick="pdv_reimprimirVenda('${v.id}')" class="bg-blue-100 text-blue-600 hover:bg-blue-200 px-2.5 py-1 rounded text-xs font-bold transition" title="Reimprimir Cupom">
                        <i class="fas fa-print"></i> Reimprimir
                    </button>
                    <button onclick="pdv_excluirVenda('${v.id}')" class="bg-red-100 text-red-600 hover:bg-red-200 px-2.5 py-1 rounded text-xs font-bold transition" title="Excluir Venda">
                        <i class="fas fa-trash-alt"></i> Excluir
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}



async function pdv_reimprimirVenda(vendaId) {
    try {
        const { data: venda, error: errV } = await _supabase.from('vendas').select('*').eq('id', vendaId).single();
        if (errV) throw errV;

        const { data: itens, error: errI } = await _supabase.from('itens_venda').select('*, produtos(nome)').eq('venda_id', vendaId);
        if (errI) throw errI;

        const dataHoraStr = new Date(venda.created_at).toLocaleString('pt-BR');
        const idCurto = venda.id.substring(0, 8).toUpperCase();
        const subtotalCalc = itens.reduce((acc, item) => acc + (item.preco_unitario * item.quantidade), 0);

        const itensHtml = itens.map(i => `
            <tr>
              <td>${i.produtos ? i.produtos.nome : 'Produto'}</td>
              <td style="text-align: center;">${i.quantidade}</td>
              <td style="text-align: right;">R$ ${parseFloat(i.subtotal).toFixed(2)}</td>
            </tr>
        `).join('');

        const cupomHtmlCompleto = `
          <div style="font-family: monospace; width: 300px; padding: 10px; margin: 0 auto; color: #000; background: #fff;">
            <h3 style="text-align: center; margin: 0 0 5px 0;">ERP_ABP - 2ª VIA</h3>
            <p style="text-align: center; font-size: 11px; margin: 0 0 10px 0;">Comprovante de Reimpressão</p>
            <p style="font-size: 11px; margin: 2px 0;">Data: ${dataHoraStr}</p>
            <p style="font-size: 11px; margin: 2px 0;">ID Venda: ${idCurto}</p>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <table style="width: 100%; font-size: 11px;">
              <thead>
                <tr style="border-bottom: 1px solid #000;">
                  <th style="text-align: left;">Item</th>
                  <th style="text-align: center;">Qtd</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itensHtml}</tbody>
            </table>
            <hr style="border: dashed 1px #000; margin: 8px 0;">
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>R$ ${subtotalCalc.toFixed(2)}</span></div>
            <div style="font-size: 12px; display: flex; justify-content: space-between;"><span>Desconto:</span> <span>R$ ${parseFloat(venda.desconto || 0).toFixed(2)}</span></div>
            <div style="font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; margin-top: 5px;"><span>TOTAL:</span> <span>R$ ${parseFloat(venda.valor_total).toFixed(2)}</span></div>
            <p style="text-align: center; font-size: 10px; margin-top: 15px;">Obrigado pela preferência!</p>
          </div>
        `;

        const dataHoraArquivo = dataHoraStr.replace(/[/:\s]/g, '-');
        document.title = `Cupom #${idCurto}_R$${parseFloat(venda.valor_total).toFixed(2)}_${dataHoraArquivo}`;

        const conteudoOriginal = document.body.innerHTML;
        document.body.innerHTML = cupomHtmlCompleto;
        window.print();
        document.body.innerHTML = conteudoOriginal;
        window.location.reload();

    } catch (error) {
        alert("Erro ao reimprimir cupom: " + error.message);
    }
}

async function pdv_excluirVenda(vendaId) {
    if (!confirm("Deseja realmente excluir esta venda? O estoque dos produtos será reposto e o registro financeiro correspondente será removido.")) return;
    try {
        const { data: itens, error: errItens } = await _supabase.from('itens_venda').select('*').eq('venda_id', vendaId);
        if (errItens) throw errItens;

        for (let item of itens) {
            const { data: prod } = await _supabase.from('produtos').select('quantidade_estoque').eq('id', item.produto_id).single();
            if (prod) {
                const estoqueRestaurado = prod.quantidade_estoque + item.quantidade;
                await _supabase.from('produtos').update({ quantidade_estoque: estoqueRestaurado }).eq('id', item.produto_id);
            }
        }

        const { data: financas } = await _supabase.from('financas').select('id').like('descricao', `%Cupom #${vendaId.substring(0,8)}%`);
        if (financas && financas.length > 0) {
            for (let f of financas) {
                await _supabase.from('parcelas').delete().eq('financa_id', f.id);
                await _supabase.from('financas').delete().eq('id', f.id);
            }
        }

        await _supabase.from('itens_venda').delete().eq('venda_id', vendaId);
        const { error: errVenda } = await _supabase.from('vendas').delete().eq('id', vendaId);
        if (errVenda) throw errVenda;

        alert("Venda excluída com sucesso, estoque e financeiro revertidos!");
        pdv_loadHistoricoVendas();
        pdv_loadDashboard();
        await pdv_fetchProdutos();
    } catch (error) {
        alert("Erro ao excluir venda: " + error.message);
    }
}





    function init() {
    alternarAba('home'); // garante aba inicial correta
    loadDashboard();
    loadEntidades();
    }
    
