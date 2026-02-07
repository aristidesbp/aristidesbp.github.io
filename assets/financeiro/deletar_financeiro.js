/** * ERP ABP - deletar_financeiro.js */

// 1. Excluir um único lançamento
async function deleteSingle(id) {
    if (!confirm("Tem certeza que deseja excluir este lançamento financeiro?")) return;

    const { error } = await window.supabaseClient
        .from('financeiro')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        // Atualiza a lista sem recarregar a página
        if (typeof loadFinanceiro === "function") loadFinanceiro();
    }
}

// 2. Seleção de todos os checkboxes
function toggleSelectAll() {
    const isChecked = document.getElementById('select-all').checked;
    document.querySelectorAll('.row-checkbox').forEach(cb => {
        cb.checked = isChecked;
    });
    // Função do utilidades/autolimpeza para mostrar a barra de ações
    if (typeof updateBulkUI === "function") updateBulkUI();
}

// 3. Excluir múltiplos lançamentos selecionados
async function deleteSelected() {
    const checkboxes = document.querySelectorAll('.row-checkbox:checked');
    const ids = Array.from(checkboxes).map(cb => cb.value);

    if (ids.length === 0) return;

    if (!confirm(`Deseja excluir os ${ids.length} lançamentos selecionados?`)) return;

    const { error } = await window.supabaseClient
        .from('financeiro')
        .delete()
        .in('id', ids);

    if (error) {
        alert("Erro na exclusão em massa: " + error.message);
    } else {
        alert("Lançamentos excluídos com sucesso!");
        if (typeof loadFinanceiro === "function") loadFinanceiro();
        if (typeof updateBulkUI === "function") updateBulkUI();
        
        // Desmarca o "Selecionar Todos"
        const selectAll = document.getElementById('select-all');
        if (selectAll) selectAll.checked = false;
    }
}
