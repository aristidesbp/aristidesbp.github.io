/**
 * js/financeiro.js
 */

async function initFinanceiro() {
    // Verifica se a conexão com Supabase existe
    if (typeof _supabase === 'undefined') {
        console.error("ERRO: Variável _supabase não encontrada. Verifique o conexao.js");
        return;
    }

    // Configura datas padrão para o filtro (mês atual)
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
    const ultimoDia = new Date(hoje.getFullYear(), hoy.getMonth() + 1, 0).toISOString().split('T')[0];
    
    document.getElementById('filtro_inicio').value = primeiroDia;
    document.getElementById('filtro_fim').value = ultimoDia;

    // Vincula o evento de clique ao botão filtrar
    document.getElementById('btn-filtrar').addEventListener('click', loadFinanceiro);

    await carregarListasEntidades();
    await loadFinanceiro();
}

async function carregarListasEntidades() {
    const { data: clientes } = await _supabase.from('clientes').select('id, nome_completo').order('nome_completo');
    const { data: forns } = await _supabase.from('fornecedores').select('id, razao_social').order('razao_social');

    const selClie = document.getElementById('cliente_id');
    const selForn = document.getElementById('fornecedor_id');

    clientes?.forEach(c => selClie.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
    forns?.forEach(f => selForn.innerHTML += `<option value="${f.id}">${f.razao_social}</option>`);
}

function toggleEntidade() {
    const tipo = document.getElementById('tipo').value;
    document.getElementById('campo-cliente').style.display = tipo === 'receber' ? 'block' : 'none';
    document.getElementById('campo-fornecedor').style.display = tipo === 'pagar' ? 'block' : 'none';
}

async function salvarLancamento() {
    const { data: { user } } = await _supabase.auth.getUser();
    const parcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const dataVenc = document.getElementById('data_vencimento').value;
    const valor = document.getElementById('valor').value;

    if (!dataVenc || !valor) return alert("Preencha Data e Valor!");

    let registros = [];
    for (let i = 0; i < parcelas; i++) {
        let dataRef = new Date(dataVenc + 'T00:00:00');
        dataRef.setMonth(dataRef.getMonth() + i);

        registros.push({
            usuario_id: user.id,
            tipo: document.getElementById('tipo').value,
            descricao: document.getElementById('descricao').value + (parcelas > 1 ? ` (${i+1}/${parcelas})` : ''),
            valor: valor,
            data_vencimento: dataRef.toISOString().split('T')[0],
            cliente_id: document.getElementById('cliente_id').value || null,
            fornecedor_id: document.getElementById('fornecedor_id').value || null,
            status: 'pendente'
        });
    }

    const { error } = await _supabase.from('financeiro').insert(registros);
    if (error) alert("Erro: " + error.message);
    else {
        alert("Lançamento concluído!");
        loadFinanceiro();
    }
}

// FUNÇÃO DE CARREGAMENTO E FILTRO
async function loadFinanceiro() {
    console.log("Filtrando dados...");
    const inicio = document.getElementById('filtro_inicio').value;
    const fim = document.getElementById('filtro_fim').value;
    const busca = document.getElementById('filtro_busca').value;

    let query = _supabase.from('financeiro').select('*, clientes(nome_completo), fornecedores(razao_social)');

    if (inicio) query = query.gte('data_vencimento', inicio);
    if (fim) query = query.lte('data_vencimento', fim);
    if (busca) query = query.ilike('descricao', `%${busca}%`);

    const { data, error } = await query.order('data_vencimento', { ascending: true });

    if (error) {
        console.error("Erro Supabase:", error);
        return;
    }

    renderizarTabela(data);
}

function renderizarTabela(data) {
    const tbody = document.getElementById('financeiro-list');
    tbody.innerHTML = '';
    let rec = 0, pag = 0;

    data.forEach(item => {
        const v = parseFloat(item.valor);
        item.tipo === 'receber' ? rec += v : pag += v;

        const entidade = item.clientes?.nome_completo || item.fornecedores?.razao_social || 'Geral';
        const corValor = item.tipo === 'receber' ? 'color: #2ecc71' : 'color: #e74c3c';

        tbody.innerHTML += `
            <tr>
                <td><input type="checkbox" class="row-select" value="${item.id}" onchange="updateSelectedCount()"></td>
                <td>${item.data_vencimento.split('-').reverse().join('/')}</td>
                <td>${item.descricao}</td>
                <td>${entidade}</td>
                <td style="${corValor}"><b>R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</b></td>
                <td><span class="badge ${item.status}">${item.status}</span></td>
                <td>
                    <button onclick="darBaixa('${item.id}')"><i class="fas fa-check"></i></button>
                    <button onclick="excluirUm('${item.id}')" style="color:red"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    document.getElementById('resumo-receber').innerText = `R$ ${rec.toLocaleString('pt-BR')}`;
    document.getElementById('resumo-pagar').innerText = `R$ ${pag.toLocaleString('pt-BR')}`;
    document.getElementById('resumo-saldo').innerText = `R$ ${(rec - pag).toLocaleString('pt-BR')}`;
}

async function darBaixa(id) {
    await _supabase.from('financeiro').update({ status: 'pago' }).eq('id', id);
    loadFinanceiro();
}

async function excluirUm(id) {
    if (confirm("Excluir?")) {
        await _supabase.from('financeiro').delete().eq('id', id);
        loadFinanceiro();
    }
}

function toggleSelectAll() {
    const check = document.getElementById('select-all').checked;
    document.querySelectorAll('.row-select').forEach(cb => cb.checked = check);
    updateSelectedCount();
}

function updateSelectedCount() {
    const selecionados = document.querySelectorAll('.row-select:checked').length;
    document.getElementById('bulk-actions').style.display = selecionados > 0 ? 'block' : 'none';
    document.getElementById('selected-count').innerText = selecionados;
}

async function deleteSelected() {
    const ids = Array.from(document.querySelectorAll('.row-select:checked')).map(cb => cb.value);
    if (confirm(`Excluir ${ids.length} itens?`)) {
        await _supabase.from('financeiro').delete().in('id', ids);
        loadFinanceiro();
    }
}

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Relatório Financeiro", 14, 15);
    const rows = [];
    document.querySelectorAll("#financeiro-list tr").forEach(tr => {
        const tds = tr.querySelectorAll("td");
        if(tds.length > 0) rows.push([tds[1].innerText, tds[2].innerText, tds[3].innerText, tds[4].innerText, tds[5].innerText]);
    });
    doc.autoTable({ head: [['Data', 'Descrição', 'Entidade', 'Valor', 'Status']], body: rows, startY: 20 });
    doc.save("financeiro.pdf");
}

document.addEventListener('DOMContentLoaded', initFinanceiro);
