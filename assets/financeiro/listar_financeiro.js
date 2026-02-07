/** * ERP ABP - listar_financeiro.js */
let baseFinanceira = [];

async function loadFinanceiro() {
    const { data, error } = await window.supabaseClient
        .from('financeiro')
        .select('*, entidades(nome_completo)')
        .order('data_vencimento', { ascending: true });
    
    if (error) return console.error(error);
    baseFinanceira = data || [];
    filtrarTabela(); 
}

function filtrarTabela() {
    const busca = document.getElementById('inputBusca').value.toLowerCase();
    const dInicio = document.getElementById('dataInicio').value;
    const dFim = document.getElementById('dataFim').value;

    const filtrados = baseFinanceira.filter(f => {
        const txt = (f.descricao + f.categoria).toLowerCase().includes(busca);
        const data = f.data_vencimento;
        const fits = (!dInicio || data >= dInicio) && (!dFim || data <= dFim);
        return txt && fits;
    });

    renderTable(filtrados);
}

function renderTable(data) {
    const list = document.getElementById('financeiro-list');
    let ent = 0, sai = 0;
    
    list.innerHTML = data.map(f => {
        const v = parseFloat(f.valor) || 0;
        f.tipo === 'receber' ? ent += v : sai += v;

        return `
            <tr>
                <td><input type="checkbox" class="row-checkbox" value="${f.id}" onclick="updateBulkUI()"></td>
                <td class="tipo-${f.tipo}">${f.tipo.toUpperCase()}</td>
                <td><b>${f.descricao}</b><br><small>${f.entidades?.nome_completo || 'Sem Entidade'}</small></td>
                <td>${f.categoria || '-'}</td>
                <td>${f.forma_pagamento || '-'}</td>
                <td>${f.data_vencimento}</td>
                <td>${f.data_pagamento || '-'}</td>
                <td>R$ ${v.toFixed(2)}</td>
                <td><span class="status-badge status-${f.status}">${f.status}</span></td>
                <td>
                    <button onclick="prepararEdicao('${f.id}')" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteSingle('${f.id}')" class="btn-del"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }).join('');

    document.getElementById('total-receber').innerText = `R$ ${ent.toLocaleString()}`;
    document.getElementById('total-pagar').innerText = `R$ ${sai.toLocaleString()}`;
    document.getElementById('total-saldo').innerText = `R$ ${(ent - sai).toLocaleString()}`;
}

async function prepararEdicao(id) {
    const f = baseFinanceira.find(item => item.id === id);
    if (!f) return;
    
    document.getElementById('edit-id').value = f.id;
    document.getElementById('tipo').value = f.tipo;
    document.getElementById('descricao').value = f.descricao;
    document.getElementById('valor').value = f.valor;
    document.getElementById('data_vencimento').value = f.data_vencimento;
    document.getElementById('data_pagamento').value = f.data_pagamento || '';
    document.getElementById('status').value = f.status;
    document.getElementById('entidade_id').value = f.entidade_id || '';
    document.getElementById('categoria').value = f.categoria || '';
    document.getElementById('forma_pagamento').value = f.forma_pagamento || '';
    
    document.getElementById('form-title').innerText = "Editando Lançamento";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', loadFinanceiro);
