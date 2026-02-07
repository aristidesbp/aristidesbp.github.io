/** * ERP ABP - cadastrar_financeiro.js */
async function handleSaveFinanceiro() {
    const id = document.getElementById('edit-id').value;
    const payload = {
        tipo: document.getElementById('tipo').value,
        descricao: document.getElementById('descricao').value,
        entidade_id: document.getElementById('entidade_id').value || null,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value,
        data_vencimento: document.getElementById('data_vencimento').value,
        categoria: document.getElementById('categoria').value,
        forma_pagamento: document.getElementById('forma_pagamento').value
    };

    let res;
    if (id) {
        res = await window.supabaseClient.from('financeiro').update(payload).eq('id', id);
    } else {
        res = await window.supabaseClient.from('financeiro').insert([payload]);
    }

    if (res.error) alert(res.error.message);
    else {
        alert("Financeiro atualizado!");
        resetFormFinanceiro();
        loadFinanceiro();
    }
}

// Carrega as entidades para o dropdown
async function loadEntidadesSelect() {
    const { data } = await window.supabaseClient.from('entidades').select('id, nome_completo');
    const select = document.getElementById('entidade_id');
    if (data && select) {
        select.innerHTML = '<option value="">-- Selecione a Entidade --</option>' + 
            data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
    }
}
