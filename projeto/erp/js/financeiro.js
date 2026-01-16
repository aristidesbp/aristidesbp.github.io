/**
 * js/financeiro.js
 */

async function initFinanceiro() {
    // Verifica conexão
    if (typeof _supabase === 'undefined') {
        console.error("Erro: _supabase não definido.");
        return;
    }

    // Datas padrão (Mês atual)
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0];
    
    document.getElementById('filtro_inicio').value = primeiroDia;
    document.getElementById('filtro_fim').value = ultimoDia;

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

    if (!dataVenc || !valor) return alert("Preencha data e valor!");

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
        alert("Lançado com sucesso!");
        loadFinanceiro();
    }
}

// FUNÇÃO DO BOTÃO FILTRAR
async function loadFinanceiro() {
    const inicio = document.getElementById('filtro_inicio').value;
    const fim = document.getElementById('filtro_fim').value;
    const busca = document.getElementById('filtro_busca').value;

    let query = _supabase.from('financeiro').select('*, clientes(nome_completo), fornecedores(razao_social)');

    if (inicio) query = query.gte('data_vencimento', inicio);
    if (fim) query = query.lte('data_vencimento', fim);
    if (busca) query = query.ilike('descricao', `%${busca}%`);

    const { data, error } = await query.order('data_vencimento', { ascending: true });

    if (error) return console.error(error);

    const tbody = document.getElementById('financeiro-list');
    tbody.innerHTML = '';
    let rec = 0, pag = 0;

    data.forEach(item => {
        const v = parseFloat(item.valor);
        item.tipo === 'receber' ? rec += v : pag += v;
        const entidade = item.clientes?.nome_completo || item.fornecedores?.razao_social || 'Geral';

        tbody.innerHTML += `
            <tr>
                <td>${item.data_vencimento.split('-').reverse().join('/')}</td>
                <td>${item.descricao}</td>
                <td>${entidade}</td>
                <td style="color: ${item.tipo === 'receber' ? '#2ecc71' : '#e74c3c'}">
                    R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </td>
                <td>${item.status}</td>
                <td>
                    <button onclick="darBaixa('${item.id}')">Pagar</button>
                    <button onclick="excluir('${item.id}')" style="color:red">X</button>
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

async function excluir(id) {
    if (confirm("Excluir registro?")) {
        await _supabase.from('financeiro').delete().eq('id', id);
        loadFinanceiro();
    }
}

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Extrato Financeiro", 14, 15);
    doc.autoTable({ html: 'table', startY: 20 });
    doc.save("financeiro.pdf");
}

document.addEventListener('DOMContentLoaded', initFinanceiro);
