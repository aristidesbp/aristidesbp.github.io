async function handleSaveProduto() {
    const id = document.getElementById('edit-id').value;
    const campos = [
        'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
        'entidade_id', 'data_vencimento', 'data_compra', 'descricao',
        'preco_custo', 'preco_venda', 'estoque_atual', 'estoque_minimo', 'imagem_url'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) {
            const valor = el.value.trim();
            if (valor !== "") {
                payload[c] = (el.type === 'number') ? parseFloat(valor || 0) : valor;
            }
        }
    });

    if (!payload.entidade_id) delete payload.entidade_id;

    let result;
    if (id) {
        result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('produtos').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Produto atualizado!" : "Produto cadastrado!");
        resetForm();
        loadProdutos(); // Esta função virá do arquivo listar_produtos.js
    }
}

function resetForm() {
    document.querySelectorAll('input, select, textarea').forEach(c => {
        if (c.id === 'estoque_minimo') c.value = '5';
        else if (c.type === 'number') c.value = '0.00';
        else c.value = '';
    });
    document.getElementById('edit-id').value = '';
    document.getElementById('imagem_url').value = '';
    document.getElementById('img-preview').src = '';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('form-title').innerText = "Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = "none";
}
