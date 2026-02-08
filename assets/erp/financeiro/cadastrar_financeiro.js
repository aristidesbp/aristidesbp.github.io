/** * ERP ABP - cadastrar_financeiro.js */

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const dataVencInput = document.getElementById('data_vencimento').value;

    // --- VALIDAÇÃO CRUCIAL PARA EVITAR O RANGEERROR ---
    if (!dataVencInput) {
        return alert("Por favor, selecione a data do 1º Vencimento!");
    }

    const tipoRaw = document.getElementById('tipo').value;
    const statusRaw = document.getElementById('status').value;

    // Normalização para o banco
    const tipoFormatado = tipoRaw.charAt(0).toUpperCase() + tipoRaw.slice(1);
    const statusFormatado = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);

    const dadosBase = {
        tipo: tipoFormatado,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: statusFormatado,
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
        // Modo Edição
        dadosBase.data_vencimento = dataVencInput;
        res = await window.supabaseClient.from('financeiro').update(dadosBase).eq('id', id);
    } else {
        // Modo Novo com Parcelas
        const lancamentos = [];
        // Tratamento seguro da data
        let dataRef = new Date(dataVencInput + 'T00:00:00');

        for (let i = 1; i <= qtdeParcelas; i++) {
            const novo = { ...dadosBase };
            if (qtdeParcelas > 1) {
                novo.descricao = `${dadosBase.descricao} (${i}/${qtdeParcelas})`;
            }
            
            novo.data_vencimento = dataRef.toISOString().split('T')[0];
            lancamentos.push(novo);

            // Soma um mês para a próxima parcela
            dataRef.setMonth(dataRef.getMonth() + 1);
        }
        res = await window.supabaseClient.from('financeiro').insert(lancamentos);
    }

    if (res.error) {
        console.error("Erro Supabase:", res.error);
        alert("Erro ao salvar: " + res.error.message);
    } else {
        alert("Salvo com sucesso!");
        if (typeof resetForm === "function") resetForm(); 
        if (typeof loadFinanceiro === "function") loadFinanceiro();
    }
}
