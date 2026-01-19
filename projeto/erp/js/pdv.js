/** ERP ABP - PDV Profissional **/
(function() {
    "use strict";

    let carrinho = [];
    let caixaAberto = null;

    // --- LÓGICA DE CAIXA ---

    async function verificarCaixa() {
        if (!window._supabase) return setTimeout(verificarCaixa, 500);
        
        const { data: { user } } = await _supabase.auth.getUser();
        const { data, error } = await _supabase
            .from('caixas')
            .select('*')
            .eq('usuario_id', user.id)
            .eq('status', 'aberto')
            .single();

        if (error || !data) {
            document.getElementById('caixa-status-modal').style.display = 'flex';
        } else {
            caixaAberto = data;
            document.getElementById('caixa-status-modal').style.display = 'none';
            document.getElementById('caixa-info').innerText = `CAIXA ABERTO | INÍCIO: ${new Date(data.criado_em).toLocaleTimeString()}`;
        }
    }

    window.abrirCaixa = async function() {
        const valor = parseFloat(document.getElementById('valor_inicial').value) || 0;
        const { data: { user } } = await _supabase.auth.getUser();

        const { data, error } = await _supabase.from('caixas').insert([{
            usuario_id: user.id,
            valor_abertura: valor,
            status: 'aberto'
        }]).select().single();

        if (error) alert("Erro ao abrir caixa");
        else {
            caixaAberto = data;
            verificarCaixa();
        }
    };

    window.fecharCaixa = async function() {
        if (!confirm("Deseja realmente fechar o caixa atual?")) return;
        const { error } = await _supabase.from('caixas')
            .update({ status: 'fechado', fechado_em: new Date() })
            .eq('id', caixaAberto.id);
        
        if (!error) location.reload();
    };

    // --- LÓGICA DE PRODUTOS ---

    window.buscarProdutoPDV = async function(e) {
        const busca = e.target.value;
        if (busca.length < 2) {
            document.getElementById('resultados-busca').innerHTML = '';
            return;
        }

        const { data } = await _supabase.from('produtos')
            .select('*')
            .or(`nome.ilike.%${busca}%,codigo_barras.eq.${busca}`)
            .limit(5);

        const container = document.getElementById('resultados-busca');
        container.innerHTML = (data || []).map(p => `
            <div class="item-busca" onclick="adicionarAoCarrinho(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                ${p.nome} - <b>R$ ${p.preco_venda.toFixed(2)}</b>
            </div>
        `).join('');
    };

    window.adicionarAoCarrinho = function(produto) {
        const existe = carrinho.find(item => item.id === produto.id);
        if (existe) {
            existe.qtd++;
        } else {
            carrinho.push({ ...produto, qtd: 1 });
        }
        document.getElementById('busca-pdv').value = '';
        document.getElementById('resultados-busca').innerHTML = '';
        renderCarrinho();
    };

    function renderCarrinho() {
        const corpo = document.getElementById('carrinho-corpo');
        corpo.innerHTML = carrinho.map((item, index) => `
            <tr>
                <td>${item.nome}</td>
                <td><input type="number" value="${item.qtd}" onchange="updateQtd(${index}, this.value)" style="width:50px"></td>
                <td>R$ ${item.preco_venda.toFixed(2)}</td>
                <td>R$ ${(item.qtd * item.preco_venda).toFixed(2)}</td>
                <td><button class="btn-del-item" onclick="removerItem(${index})"><i class="fas fa-times"></i></button></td>
            </tr>
        `).join('');
        calcularTotalVenda();
    }

    window.updateQtd = function(index, qtd) {
        carrinho[index].qtd = parseInt(qtd) || 1;
        renderCarrinho();
    };

    window.removerItem = function(index) {
        carrinho.splice(index, 1);
        renderCarrinho();
    };

    window.calcularTotalVenda = function() {
        const bruto = carrinho.reduce((acc, item) => acc + (item.qtd * item.preco_venda), 0);
        const desc = parseFloat(document.getElementById('desconto').value) || 0;
        const total = bruto - desc;

        document.getElementById('total-bruto').innerText = `R$ ${bruto.toFixed(2)}`;
        document.getElementById('total-venda').innerText = `R$ ${total.toFixed(2)}`;
    };

    // --- LÓGICA DE CLIENTES ---

    window.buscarClientePDV = async function(e) {
        const busca = e.target.value;
        const lista = document.getElementById('lista-resultados-cliente');
        if (busca.length < 3) { lista.style.display = 'none'; return; }

        const { data } = await _supabase.from('entidades')
            .select('id, nome_completo, cpf')
            .ilike('nome_completo', `%${busca}%`)
            .limit(5);

        if (data && data.length > 0) {
            lista.style.display = 'block';
            lista.innerHTML = data.map(c => `
                <div class="item-cliente" onclick="selecionarCliente('${c.id}', '${c.nome_completo}')">
                    ${c.nome_completo} <small>(${c.cpf || 'Sem CPF'})</small>
                </div>
            `).join('');
        }
    };

    window.selecionarCliente = function(id, nome) {
        document.getElementById('cliente_id').value = id;
        document.getElementById('cliente-selecionado').innerHTML = `<i class="fas fa-user-check"></i> ${nome}`;
        document.getElementById('lista-resultados-cliente').style.display = 'none';
        document.getElementById('cliente-busca').value = '';
    };

    // --- FINALIZAÇÃO ---

    window.finalizarVenda = async function() {
        if (carrinho.length === 0) return alert("Carrinho vazio!");
        if (!caixaAberto) return alert("Caixa não identificado!");

        const bruto = carrinho.reduce((acc, item) => acc + (item.qtd * item.preco_venda), 0);
        const desc = parseFloat(document.getElementById('desconto').value) || 0;
        const { data: { user } } = await _supabase.auth.getUser();

        const venda = {
            usuario_id: user.id,
            caixa_id: caixaAberto.id,
            entidade_id: document.getElementById('cliente_id').value || null,
            total_bruto: bruto,
            desconto: desc,
            total_liquido: bruto - desc,
            forma_pagamento: document.getElementById('forma_pagto').value,
            itens: carrinho
        };

        const { error } = await _supabase.from('vendas').insert([venda]);

        if (error) alert("Erro ao salvar venda: " + error.message);
        else {
            alert("Venda realizada com sucesso!");
            carrinho = [];
            document.getElementById('cliente_id').value = '';
            document.getElementById('cliente-selecionado').innerHTML = `<i class="fas fa-user"></i> Consumidor Final`;
            renderCarrinho();
        }
    };

    // Teclas de Atalho
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F2') { e.preventDefault(); finalizarVenda(); }
    });

    // Iniciar
    document.addEventListener('DOMContentLoaded', verificarCaixa);

})();
