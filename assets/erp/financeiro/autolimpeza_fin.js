/** * ERP ABP - autolimpeza_fin.js */
function resetFormFinanceiro() {
    document.querySelectorAll('#form-financeiro input, #form-financeiro select').forEach(i => i.value = '');
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = "Novo Lançamento";
    document.getElementById('status').value = 'Pendente';
    document.getElementById('tipo').value = 'Receber';
}

function updateBulkUI() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkArea = document.getElementById('bulk-area');
    if (bulkArea) bulkArea.style.display = selected > 0 ? 'flex' : 'none';
    document.getElementById('selected-count').innerText = `${selected} selecionados`;
}
