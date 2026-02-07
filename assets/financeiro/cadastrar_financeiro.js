/** * ERP ABP - cadastrar_financeiro.js */

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    const dadosBase = {
        tipo: document.getElementById('tipo').value,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value,
        data_pagamento: document.getElementById('data_pagamento').value || null,
        entidade_id: document.getElementById('entidade_id').value || null,
        categoria: document.getElementById('categoria').value,
        forma_pagamento: document.getElementById('forma_pagamento').value
    };

    if (!dadosBase.descricao || isNaN(dadosBase.valor)) {
        return alert("Preencha a Descrição e o Valor!");
    }

    let res;
    if (id) {
        dadosBase.data_vencimento = document.getElementById('data_vencimento').value;
        res = await window.supabaseClient.from('financeiro').update(dadosBase).eq('id', id);
    } else {
        const lancamentos = [];
        let dataRef = new Date(document.getElementById('data_vencimento').value + 'T00:00:00');

        for (let i = 1; i <= qtdeParcelas; i++) {
            const novo = { ...dadosBase };
            if (qtdeParcelas > 1) novo.descricao = `${dadosBase.descricao} (${i}/${qtdeParcelas})`;
            novo.data_vencimento = dataRef.toISOString().split('T')[0];
            lancamentos.push(novo);
            dataRef.setMonth(dataRef.setMonth() + 1);
        }
        res = await window.supabaseClient.from('financeiro').insert(lancamentos);
    }

    if (res.error) alert("Erro: " + res.error.message);
    else {
        alert("Sucesso!");
        resetForm(); // Função no autolimpeza_fin.js
        loadFinanceiro(); // Função no listar_financeiro.js
    }
}

async function loadEntidadesSelect() {
    const { data } = await window.supabaseClient.from('entidades').select('id, nome_completo').order('nome_completo');
    const select = document.getElementById('entidade_id');
    if (data && select) {
        select.innerHTML = '<option value="">Selecione...</option>' + 
            data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
    }
}

document.addEventListener('DOMContentLoaded', loadEntidadesSelect);
