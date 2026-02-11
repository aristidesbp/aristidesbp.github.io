function resetForm() {
    const fields = ['entidade-id', 'nome_completo', 'telefone', 'email', 'observacoes'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('tipo_entidade').value = 'cliente';
    document.getElementById('btn-save').innerHTML = `<span class="material-symbols-outlined">save</span> Salvar Entidade`;
}

