/** * ERP ABP - cadastrar_financeiro.js 
 * Local: assets/financeiro/cadastrar_financeiro.js
 * Responsável por: Criar (com parcelas), Editar e Carregar Entidades no Select.
 */

// 1. Função Principal de Salvar (Acionada pelo botão no HTML)
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    // Coleta dos dados do formulário
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

    // Validação Simples
    if (!dadosBase.descricao || isNaN(dadosBase.valor)) {
        return alert("Por favor, preencha a Descrição e o Valor corretamente.");
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
        // --- MODO NOVO (Com suporte a Parcelamento) ---
        const lancamentos = [];
        // Converte string de data para Objeto Date (garantindo meia-noite local)
        let dataReferencia = new Date(document.getElementById('data_vencimento').value + 'T00:00:00');

        for (let i = 1; i <= qtdeParcelas; i++) {
            const novoLancamento = { ...dadosBase };
            
            // Ajusta a descrição para parcelas (Ex: "Internet (1/3)")
            if (qtdeParcelas > 1) {
                novoLancamento.descricao = `${dadosBase.descricao} (${i}/${qtdeParcelas})`;
            }

            // Formata a data para YYYY-MM-DD
            novoLancamento.data_vencimento = dataReferencia.toISOString().split('T')[0];
            
            lancamentos.push(novoLancamento);

            // Incrementa um mês para a próxima parcela
            dataReferencia.setMonth(dataReferencia.getMonth() + 1);
        }

        resultado = await window.supabaseClient
            .from('financeiro')
            .insert(lancamentos);
    }

    // Tratamento de Resposta
    if (resultado.error) {
        console.error("Erro Supabase:", resultado.error);
        alert("Erro ao salvar: " + resultado.error.message);
    } else {
        alert(id ? "Lançamento atualizado!" : `${qtdeParcelas} lançamento(s) criado(s) com sucesso!`);
        
        // Chamada das funções de outros arquivos para limpar e atualizar a tela
        if (typeof resetForm === "function") resetForm(); 
        if (typeof loadFinanceiro === "function") loadFinanceiro();
    }
}

// 2. Carregar a lista de Entidades no campo <select> do formulário
async function loadEntidadesSelect() {
    const select = document.getElementById('entidade_id');
    if (!select) return;

    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('id, nome_completo')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar entidades para o select:", error.message);
        return;
    }

    if (data) {
        // Preserva a opção padrão e adiciona as entidades do banco
        select.innerHTML = '<option value="">Selecione...</option>' + 
            data.map(ent => `<option value="${ent.id}">${ent.nome_completo}</option>`).join('');
    }
}

// 3. Inicialização automática do Select ao carregar a página
document.addEventListener('DOMContentLoaded', loadEntidadesSelect);
