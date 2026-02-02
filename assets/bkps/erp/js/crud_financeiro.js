// Carregar Dados da Tabela Financeiro
async function loadFinanceiro() {
    const { data, error } = await _supabase.from('financeiro')
        .select('*, entidades(nome_completo)')
        .order('data_vencimento', { ascending: true });
    
    if (error) return;
    currentFinanceData = data || [];
    filtrarTabela();
}

// Salvar ou Atualizar Lançamento
async function handleSave() {
    const { data: { user } } = await _supabase.auth.getUser();
    const id = document.getElementById('edit-id').value;
    const numParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const valorParcela = parseFloat(document.getElementById('valor').value) || 0;
    const dataString = document.getElementById('data_vencimento').value;

    if(!document.getElementById('descricao').value || !valorParcela || !dataString) return alert("Preencha os campos obrigatórios.");

    if(id) {
        await _supabase.from('financeiro').update(getFormData(user.id)).eq('id', id);
    } else {
        const lancamentos = [];
        for(let i = 0; i < numParcelas; i++) {
            let dt = new Date(dataString + "T12:00:00"); 
            dt.setMonth(dt.getMonth() + i);
            lancamentos.push({
                ...getFormData(user.id), 
                valor: valorParcela,
                descricao: numParcelas > 1 ? `${document.getElementById('descricao').value} (${i+1}/${numParcelas})` : document.getElementById('descricao').value,
                data_vencimento: dt.toISOString().split('T')[0]
            });
        }
        await _supabase.from('financeiro').insert(lancamentos);
    }
    resetForm(); loadFinanceiro();
}

// Deletar Registros
async function deleteSingle(id) { 
    if(confirm("Excluir este lançamento?")) { 
        await _supabase.from('financeiro').delete().eq('id', id); 
        loadFinanceiro(); 
    } 
}

async function deleteSelected() { 
    if(!confirm("Excluir selecionados?")) return; 
    const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value); 
    await _supabase.from('financeiro').delete().in('id', ids); 
    loadFinanceiro(); 
    updateBulkUI(); 
}

