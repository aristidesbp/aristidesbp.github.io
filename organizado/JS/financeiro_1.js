/**
 * model_financeiro.js
 * Lógica de CRUD e Cálculos Financeiros
 */

let dadosFinanceiros = [];

async function loadFinanceiro() {
    // Busca dados com JOIN na tabela entidades
    const { data, error } = await window.supabaseClient
        .from('financeiro')
        .select(`*, entidades(nome_completo)`)
        .order('data_vencimento', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }

    dadosFinanceiros = data;
    renderTable(dadosFinanceiros);
}

async function carregarEntidades() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('id, nome_completo')
        .order('nome_completo');
    
    if (!error) {
        const select = document.getElementById('entidade_id');
        data.forEach(ent => {
            const opt = document.createElement('option');
            opt.value = ent.id;
            opt.textContent = ent.nome_completo;
            select.appendChild(opt);
        });
    }
}

function renderTable(data) {
    const tbody = document.getElementById('financeiro-list');
    if(!tbody) return;
    
    tbody.innerHTML = '';
    let totalIn = 0, totalOut = 0;

    data.forEach(item => {
        const valor = parseFloat(item.valor || 0);
        const isEntrada = item.tipo === 'receber';
        if (isEntrada) totalIn += valor; else totalOut += valor;

        const tr = document.createElement('tr');
        tr.className = "border-b hover:bg-slate-50 transition";
        tr.innerHTML = `
            <td class="p-4"><input type="checkbox" class="row-checkbox" value="${item.id}" onclick="updateSelectedCount()"></td>
            <td class="p-4">
                <span class="text-[10px] font-bold uppercase px-2 py-1 rounded ${isEntrada ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
                    <i class="fas fa-arrow-${isEntrada ? 'up' : 'down'} mr-1"></i>${item.tipo}
                </span>
            </td>
            <td class="p-4">
                <div class="font-bold text-slate-700">${item.descricao}</div>
                <div class="text-xs text-slate-400">${item.entidades?.nome_completo || 'N/A'} | ${item.categoria || '-'}</div>
            </td>
            <td class="p-4 text-sm">${item.data_vencimento ? new Date(item.data_vencimento + "T12:00:00").toLocaleDateString('pt-BR') : '-'}</td>
            <td class="p-4 font-bold text-slate-700">R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td class="p-4">
                <span class="text-[10px] font-bold uppercase px-2 py-1 rounded ${item.status === 'pago' ? 'status-pago' : 'status-pendente'}">
                    ${item.status}
                </span>
            </td>
            <td class="p-4 text-center">
                <button class="text-indigo-500 hover:text-indigo-700 mr-3" onclick="editItem('${item.id}')"><i class="fas fa-edit"></i></button>
                <button class="text-red-500 hover:text-red-700" onclick="deleteItem('${item.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Atualiza Resumo
    document.getElementById('total-receber').innerText = `R$ ${totalIn.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-pagar').innerText = `R$ ${totalOut.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-saldo').innerText = `R$ ${(totalIn - totalOut).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const btn = document.getElementById('btn-save');
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;

    const payloadBase = {
        tipo: document.getElementById('tipo').value,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value,
        entidade_id: document.getElementById('entidade_id').value || null,
        categoria: document.getElementById('categoria').value,
        forma_pagamento: document.getElementById('forma_pagamento').value,
        data_pagamento: document.getElementById('data_pagamento').value || null
    };

    if (!payloadBase.descricao || isNaN(payloadBase.valor) || !document.getElementById('data_vencimento').value) {
        alert("Preencha os campos obrigatórios (*)");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Processando...";

    try {
        if (id) {
            payloadBase.data_vencimento = document.getElementById('data_vencimento').value;
            const { error } = await window.supabaseClient.from('financeiro').update(payloadBase).eq('id', id);
            if (error) throw error;
        } else {
            const lancamentos = [];
            let dataBase = new Date(document.getElementById('data_vencimento').value + "T12:00:00");

            for (let i = 0; i < qtdeParcelas; i++) {
                const novaData = new Date(dataBase);
                novaData.setMonth(dataBase.getMonth() + i);
                lancamentos.push({
                    ...payloadBase,
                    descricao: qtdeParcelas > 1 ? `${payloadBase.descricao} (${i + 1}/${qtdeParcelas})` : payloadBase.descricao,
                    data_vencimento: novaData.toISOString().split('T')[0]
                });
            }
            const { error } = await window.supabaseClient.from('financeiro').insert(lancamentos);
            if (error) throw error;
        }
        alert("Salvo com sucesso!");
        resetForm();
        loadFinanceiro();
    } catch (err) {
        alert("Erro: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = id ? "Atualizar" : "Salvar Lançamento(s)";
    }
}

// Funções de Utilitários (Excluir, Editar, Filtro, PDF)
async function deleteItem(id) {
    if (!confirm("Excluir este lançamento?")) return;
    await window.supabaseClient.from('financeiro').delete().eq('id', id);
    loadFinanceiro();
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;

    const filtrados = dadosFinanceiros.filter(item => {
        const matchesTermo = JSON.stringify(item).toLowerCase().includes(termo);
        const d = item.data_vencimento;
        const matchesData = (!inicio || d >= inicio) && (!fim || d <= fim);
        return matchesTermo && matchesData;
    });
    renderTable(filtrados);
}

function resetForm() {
    document.getElementById('edit-id').value = '';
    document.querySelectorAll('input').forEach(i => i.value = i.id === 'parcelas' ? '1' : '');
    document.getElementById('btn-cancel').classList.add('hidden');
    document.getElementById('form-title').innerText = "Novo Lançamento Financeiro";
}

function editItem(id) {
    const item = dadosFinanceiros.find(i => i.id === id);
    if(!item) return;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('tipo').value = item.tipo;
    document.getElementById('descricao').value = item.descricao;
    document.getElementById('valor').value = item.valor;
    document.getElementById('data_vencimento').value = item.data_vencimento;
    document.getElementById('status').value = item.status;
    document.getElementById('entidade_id').value = item.entidade_id || '';
    document.getElementById('btn-cancel').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarEntidades();
    loadFinanceiro();
});
      
