/** * ERP ABP - cadastrar_financeiro.js 
 * Local: assets/financeiro/cadastrar_financeiro.js
 */

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    // Dados base que se repetem em todas as parcelas
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

    if (!dadosBase.descricao || !dadosBase.valor) {
        return alert("Preencha Descrição e Valor!");
    }

    let res;

    if (id) {
        // MODO EDIÇÃO: Atualiza apenas o registro selecionado
        dadosBase.data_vencimento = document.getElementById('data_vencimento').value;
        res = await window.supabaseClient.from('financeiro').update(dadosBase).eq('id', id);
    } else {
        // MODO NOVO: Suporte a geração automática de parcelas
        const lancamentos = [];
        // Precisamos tratar a data para não perder o fuso horário
        let dataVencOriginal = new Date(document.getElementById('data_vencimento').value + 'T00:00:00');

        for (let i = 1; i <= qtdeParcelas; i++) {
            const copiaDados = { ...dadosBase };
            
            // Se houver parcelas, ajusta a descrição: "Compra (1/3)"
            if (qtdeParcelas > 1) {
                copiaDados.descricao = `${dadosBase.descricao} (${i}/${qtdeParcelas})`;
            }

            // Define a data de vencimento (Soma 1 mês a cada volta do loop)
            copiaDados.data_vencimento = dataVencOriginal.toISOString().split('T')[0];
            
            lancamentos.push(copiaDados);

            // Prepara a data para o próximo mês
            dataVencOriginal.setMonth(dataVencOriginal.getMonth() + 1);
        }

        res = await window.supabaseClient.from('financeiro').insert(lancamentos);
    }

    if (res.error) {
        alert("Erro ao salvar: " + res.error.message);
    } else {
        alert(id ? "Lançamento atualizado!" : `${qtdeParcelas} lançamento(s) gerado(s) com sucesso!`);
        
        // Funções de limpeza e atualização da tela
        if (typeof resetForm === "function") resetForm(); 
        if (typeof loadFinanceiro === "function") loadFinanceiro();
    }
}

// Carrega as entidades para o dropdown (Select)
async function loadEntidadesSelect() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('id, nome_completo')
        .order('nome_completo', { ascending: true });

    const select = document.getElementById('entidade_id');
    
    if (error) {
        console.error("Erro ao carregar entidades:", error.message);
        return;
    }

    if (data && select) {
        select.innerHTML = '<option value="">Selecione...</option>' + 
            data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
    }
}
