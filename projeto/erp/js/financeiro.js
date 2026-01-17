/**
 * js/financeiro.js
 */

async function initFinanceiro() {
    await carregarListas();
    loadFinanceiro();
    // Setar mês atual no filtro
    const hoje = new Date();
    document.getElementById('filtro-mes').value = hoje.toISOString().substring(0, 7);
}

// Carrega Clientes e Fornecedores para os Selects
async function carregarListas() {
    const { data: clientes } = await _supabase.from('clientes').select('id, nome_completo').order('nome_completo');
    const { data: forns } = await _supabase.from('fornecedores').select('id, razao_social').order('razao_social');

    const selClie = document.getElementById('cliente_id');
    const selForn = document.getElementById('fornecedor_id');

    clientes?.forEach(c => selClie.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
    forns?.forEach(f => selForn.innerHTML += `<option value="${f.id}">${f.razao_social}</option>`);
}

// Alterna campos entre Cliente e Fornecedor
function toggleRelacionamento() {
    const tipo = document.getElementById('tipo').value;
    document.getElementById('div-cliente').style.display = tipo === 'receber' ? 'block' : 'none';
    document.getElementById('div-fornecedor').style.display = tipo === 'pagar' ? 'block' : 'none';
}

// Salva o lançamento (com suporte a parcelamento)
async function handleSaveFinanceiro() {
    const { data: { user } } = await _supabase.auth.getUser();
    const parcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const baseVencimento = new Date(document.getElementById('data_vencimento').value);

    let lancamentos = [];

    for (let i = 0; i < parcelas; i++) {
        let novaData = new Date(baseVencimento);
        novaData.setMonth(novaData.getMonth() + i);

        lancamentos.push({
            usuario_id: user.id,
            tipo: document.getElementById('tipo').value,
            descricao: document.getElementById('descricao').value + (parcelas > 1 ? ` (${i + 1}/${parcelas})` : ''),
            valor: document.getElementById('valor').value,
            data_vencimento: novaData.toISOString().split('T')[0],
            cliente_id: document.getElementById('cliente_id').value || null,
            fornecedor_id: document.getElementById('fornecedor_id').value || null,
            status: 'pendente'
        });
    }

    const { error } = await _supabase.from('financeiro').insert(lancamentos);
    
    if (error) alert(error.message);
    else {
        alert("Lançamento(s) realizado(s)!");
        loadFinanceiro();
    }
}

// Carrega os dados com fluxo de caixa e alertas
async function loadFinanceiro() {
    const mesFiltro = document.getElementById('filtro-mes').value; // YYYY-MM
    const tipoFiltro = document.getElementById('filtro-tipo').value;

    let query = _supabase.from('financeiro').select('*, clientes(nome_completo), fornecedores(razao_social)');
    
    // Filtro por mês
    if (mesFiltro) {
        query = query.gte('data_vencimento', `${mesFiltro}-01`).lte('data_vencimento', `${mesFiltro}-31`);
    }
    
    if (tipoFiltro !== 'todos') query = query.eq('tipo', tipoFiltro);

    const { data, error } = await query.order('data_vencimento', { ascending: true });

    let rec = 0, pag = 0;
    const list = document.getElementById('financeiro-list');
    
    list.innerHTML = (data || []).map(item => {
        const valor = parseFloat(item.valor);
        item.tipo === 'receber' ? rec += valor : pag += valor;

        const isAtrasado = new Date(item.data_vencimento) < new Date() && item.status === 'pendente';
        const corStatus = item.status === 'pago' ? 'green' : (isAtrasado ? 'red' : 'orange');

        return `
            <tr style="border-left: 5px solid ${item.tipo === 'receber' ? '#2ecc71' : '#e74c3c'}">
                <td><i class="fas fa-circle" style="color: ${corStatus}"></i> ${item.status.toUpperCase()}</td>
                <td>${item.data_vencimento.split('-').reverse().join('/')}</td>
                <td>${item.descricao}</td>
                <td>${item.clientes?.nome_completo || item.fornecedores?.razao_social || '-'}</td>
                <td><b>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</b></td>
                <td>
                    <button onclick="baixarTitulo('${item.id}')" title="Dar Baixa"><i class="fas fa-check"></i></button>
                    <button onclick="deletarTitulo('${item.id}')" title="Excluir"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');

    // Atualizar Dashboard
    document.getElementById('resumo-receber').innerText = `R$ ${rec.toLocaleString('pt-BR')}`;
    document.getElementById('resumo-pagar').innerText = `R$ ${pag.toLocaleString('pt-BR')}`;
    document.getElementById('resumo-saldo').innerText = `R$ ${(rec - pag).toLocaleString('pt-BR')}`;
}

async function baixarTitulo(id) {
    await _supabase.from('financeiro').update({ status: 'pago', data_pagamento: new Date() }).eq('id', id);
    loadFinanceiro();
}

document.addEventListener('DOMContentLoaded', initFinanceiro);
