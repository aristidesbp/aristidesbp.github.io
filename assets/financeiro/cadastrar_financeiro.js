/** * ERP ABP - cadastrar_financeiro.js 
 * Sincronizado com o novo financeiro.html (Parcelas e Entidades)
 */

// 1. Função para Salvar ou Editar (Chamada pelo botão do HTML)
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    // Coleta de dados (Garante que os IDs batem com seu HTML)
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

    // Validação de segurança
    if (!dadosBase.descricao || isNaN(dadosBase.valor)) {
        return alert("Preencha a Descrição e o Valor corretamente!");
    }

    let resultado;

    if (id) {
        // --- MODO EDIÇÃO ---
        dadosBase.data_vencimento = document.getElementById('data_vencimento').value;
        resultado = await window.supabaseClient
            .from('financeiro')
            .update(dadosBase)
            .eq('id', id);
    } else {
        // --- MODO NOVO (Com Parcelamento Automático) ---
        const lancamentos = [];
        // Pega a data de vencimento inicial
        let dataRef = new Date(document.getElementById('data_vencimento').value + 'T00:00:00');

        for (let i = 1; i <= qtdeParcelas; i++) {
            const novoItem = { ...dadosBase };
            
            // Se tiver mais de 1 parcela, renomeia a descrição
            if (qtdeParcelas > 1) {
                novoItem.descricao = `${dadosBase.descricao} (${i}/${qtdeParcelas})`;
            }

            // Define a data desta parcela no formato YYYY-MM-DD
            novoItem.data_vencimento = dataRef.toISOString().split('T')[0];
            
            lancamentos.push(novoItem);

            // Pula 1 mês para a próxima parcela
            dataRef.setMonth(dataRef.getMonth() + 1);
        }

        resultado = await window.supabaseClient
            .from('financeiro')
            .insert(lancamentos);
    }

    if (resultado.error) {
        alert("Erro no Supabase: " + resultado.error.message);
    } else {
        alert(id ? "Registro atualizado!" : `${qtdeParcelas} Lançamento(s) salvo(s)!`);
        
        // Limpeza e Atualização Automática
        if (typeof resetForm === "function") resetForm(); 
        if (typeof loadFinanceiro === "function") loadFinanceiro();
    }
}

// 2. Carrega as entidades para o Select de Classificação
async function loadEntidadesSelect() {
    const select = document.getElementById('entidade_id');
    if (!select) return;

    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('id, nome_completo')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar entidades:", error.message);
        return;
    }

    if (data) {
        // Limpa e repovoa o select
        select.innerHTML = '<option value="">Selecione...</option>' + 
            data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
    }
}

// Inicializa o select quando a página carregar
document.addEventListener('DOMContentLoaded', loadEntidadesSelect);
