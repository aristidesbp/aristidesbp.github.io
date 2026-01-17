// js/financeiro.js

async function initFinanceiro() {
    // Definir datas padrão para o filtro (mês atual)
    const agora = new Date();
    const primeiroDia = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString().split('T')[0];
    const ultimoDia = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).toISOString().split('T')[0];
    
    document.getElementById('filtro_inicio').value = primeiroDia;
    document.getElementById('filtro_fim').value = ultimoDia;

    await carregarListas();
    loadFinanceiro();
}

// Carregar Clientes e Fornecedores para os menus suspensos
async function carregarListas() {
    const { data: clientes } = await _supabase.from('clientes').select('id, nome_completo').order('nome_completo');
    const { data: forns } = await _supabase.from('fornecedores').select('id, razao_social').order('razao_social');

    const selClie = document.getElementById('cliente_id');
    const selForn = document.getElementById('fornecedor_id');

    clientes?.forEach(c => selClie.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
    forns?.forEach(f => selForn.innerHTML += `<option value="${f.id}">${f.razao_social}</option>`);
}

function toggleRelacionamento() {
    const tipo = document.getElementById('tipo').value;
    document.getElementById('div-cliente').style.display = tipo === 'receber' ? 'block' : 'none';
    document.getElementById('div-fornecedor').style.display = tipo === 'pagar' ? 'block' : 'none';
}

// Salvar e gerar parcelas
async function handleSaveFinanceiro() {
    const { data: { user } } = await _supabase.auth.getUser();
    const parcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const baseVencimento = document.getElementById('data_vencimento').value;

    if (!baseVencimento || !document.getElementById('valor').value) {
        return alert("Preencha data e valor!");
    }

    let lancamentos = [];
    for (let i = 0; i < parcelas; i++) {
        let dataParcela = new Date(baseVencimento + 'T00:00:00');
        dataParcela.setMonth(dataParcela.getMonth() + i);

        lancamentos.push({
            usuario_id: user.id,
            tipo: document.getElementById('tipo').value,
            descricao: document.getElementById('descricao').value + (parcelas > 1 ? ` (${i + 1}/${parcelas})` : ''),
            valor: document.getElementById('valor').value,
            data_vencimento: dataParcela.toISOString().split('T')[0],
            cliente_id: document.getElementById('cliente_id').value || null,
            fornecedor_id: document.getElementById('fornecedor_id').value || null,
            status: 'pendente'
        });
    }

    const { error } = await _supabase.from('financeiro').insert(lancamentos);
    if (error) alert("Erro: " + error.message);
    else {
        alert("Lançamento concluído!");
        loadFinanceiro();
    }
}

// Carregar com Busca e Filtros
async function loadFinanceiro() {
    const inicio = document.getElementById('filtro_inicio').value;
    const fim = document.getElementById('filtro_fim').value;
    const busca = document.getElementById('filtro_busca').value;

    let query = _supabase.from('financeiro').select('*, clientes(nome_completo), fornecedores(razao_social)');

    if (inicio) query = query.gte('data_vencimento', inicio);
    if (fim) query = query.lte('data_vencimento', fim);
    
    // Busca por texto na descrição
    if (busca) query = query.ilike('descricao', `%${busca}%`);

    const { data, error } = await query.order('data_vencimento', { ascending: true });

    if (error) return console.error(error);

    let rec = 0, pag = 0;
    const list = document.getElementById('financeiro-list');
    list.innerHTML = '';

    data.forEach(item => {
        const valor = parseFloat(item.valor);
        item.tipo === 'receber' ? rec += valor : pag += valor;

        const dataFormatada = item.data_vencimento.split('-').reverse().join('/');
        const entidade = item.clientes?.nome_completo || item.fornecedores?.razao_social || '-';

        list.innerHTML += `
            <tr style="border-left: 5px solid ${item.tipo === 'receber' ? '#2ecc71' : '#e74c3c'}">
                <td><input type="checkbox" class="row-select" value="${item.id}" onchange="updateSelectedCount()"></td>
                <td>${dataFormatada}</td>
                <td>${item.descricao}</td>
                <td>${entidade}</td>
                <td><b>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</b></td>
                <td><span class="status-badge ${item.status}">${item.status}</span></td>
                <td>
                    <button onclick="baixarTitulo('${item.id}')" title="Pagar/Receber"><i class="fas fa-check"></i></button>
                    <button onclick="deletarTitulo('${item.id}')" title="Excluir"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    document.getElementById('resumo-receber').innerText = `R$ ${rec.toLocaleString('pt-BR')}`;
    document.getElementById('resumo-pagar').innerText = `R$ ${pag.toLocaleString('pt-BR')}`;
    document.getElementById('resumo-saldo').innerText = `R$ ${(rec - pag).toLocaleString('pt-BR')}`;
}

// Funções de Ação
async function baixarTitulo(id) {
    await _supabase.from('financeiro').update({ status: 'pago' }).eq('id', id);
    loadFinanceiro();
}

async function deletarTitulo(id) {
    if (confirm("Deseja apagar este registro?")) {
        await _supabase.from('financeiro').delete().eq('id', id);
        loadFinanceiro();
    }
}

// Seleção Múltipla
function toggleSelectAll() {
    const master = document.getElementById('select-all');
    document.querySelectorAll('.row-select').forEach(cb => cb.checked = master.checked);
    updateSelectedCount();
}

function updateSelectedCount() {
    const checked = document.querySelectorAll('.row-select:checked');
    document.getElementById('bulk-actions').style.display = checked.length > 0 ? 'block' : 'none';
    document.getElementById('selected-count').innerText = checked.length;
}

async function deleteSelected() {
    if (!confirm("Excluir registros selecionados?")) return;
    const ids = Array.from(document.querySelectorAll('.row-select:checked')).map(cb => cb.value);
    await _supabase.from('financeiro').delete().in('id', ids);
    loadFinanceiro();
}

// Gerar PDF
function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Relatório de Caixa - ERP ABP", 14, 15);
    
    const rows = [];
    document.querySelectorAll("#financeiro-list tr").forEach(tr => {
        const tds = tr.querySelectorAll("td");
        rows.push([tds[1].innerText, tds[2].innerText, tds[3].innerText, tds[4].innerText, tds[5].innerText]);
    });

    doc.autoTable({
        head: [['Data', 'Descrição', 'Entidade', 'Valor', 'Status']],
        body: rows,
        startY: 25
    });
    doc.save("financeiro.pdf");
}

document.addEventListener('DOMContentLoaded', initFinanceiro);
