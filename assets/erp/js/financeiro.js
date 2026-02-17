
async function loadFinanceiro() {
    const { data, error } = await _supabase
        .from('financeiro')
        .select(`*, entidades(nome_completo)`)
        .order('data_vencimento', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error);
        return;
    }

    dadosFinanceiros = data;
    renderTable(dadosFinanceiros);
}

// --- 3. RENDERIZAÇÃO E CÁLCULOS ---

function renderTable(data) {
    const tbody = document.getElementById('financeiro-list');
    tbody.innerHTML = '';
    
    let totalEntradas = 0;
    let totalSaidas = 0;

    data.forEach(item => {
        const valor = parseFloat(item.valor || 0);
        if (item.tipo.toLowerCase() === 'receber') totalEntradas += valor;
        else totalSaidas += valor;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" value="${item.id}" onclick="updateSelectedCount()"></td>
            <td>
                <span class="label-tipo ${item.tipo.toLowerCase() === 'receber' ? 'tipo-receber' : 'tipo-pagar'}">
                    <i class="fas fa-${item.tipo.toLowerCase() === 'receber' ? 'arrow-up' : 'arrow-down'}"></i> ${item.tipo}
                </span>
            </td>
            <td><strong>${item.descricao}</strong><br><small>${item.entidades?.nome_completo || 'Sem Entidade'}</small></td>
            <td>${item.categoria || '-'}</td>
            <td>${item.forma_pagamento || '-'}</td>
            <td>${item.data_vencimento ? new Date(item.data_vencimento).toLocaleDateString('pt-BR') : '-'}</td>
            <td>${item.data_pagamento ? new Date(item.data_pagamento).toLocaleDateString('pt-BR') : '-'}</td>
            <td><strong>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
            <td>
                <button class="btn-action" style="color:#6366f1" onclick="editItem('${item.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-action" style="color:#ef4444" onclick="deleteItem('${item.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Atualiza Resumo
    document.getElementById('total-receber').innerText = `R$ ${totalEntradas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-pagar').innerText = `R$ ${totalSaidas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-saldo').innerText = `R$ ${(totalEntradas - totalSaidas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// --- 4. SALVAMENTO E PARCELAMENTO ---

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    const basePayload = {
        tipo: document.getElementById('tipo').value,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value,
        entidade_id: document.getElementById('entidade_id').value || null,
        categoria: document.getElementById('categoria').value,
        forma_pagamento: document.getElementById('forma_pagamento').value,
        data_pagamento: document.getElementById('data_pagamento').value || null
    };

    if (!basePayload.descricao || !basePayload.valor || !document.getElementById('data_vencimento').value) {
        alert("Preencha os campos obrigatórios (*)");
        return;
    }

    try {
        if (id) {
            // Edição simples
            basePayload.data_vencimento = document.getElementById('data_vencimento').value;
            const { error } = await _supabase.from('financeiro').update(basePayload).eq('id', id);
            if (error) throw error;
        } else {
            // Inserção com lógica de parcelas
            const lancamentos = [];
            let dataBase = new Date(document.getElementById('data_vencimento').value + "T12:00:00");

            for (let i = 0; i < qtdeParcelas; i++) {
                const novaData = new Date(dataBase);
                novaData.setMonth(dataBase.getMonth() + i);
                
                lancamentos.push({
                    ...basePayload,
                    descricao: qtdeParcelas > 1 ? `${basePayload.descricao} (${i + 1}/${qtdeParcelas})` : basePayload.descricao,
                    data_vencimento: novaData.toISOString().split('T')[0]
                });
            }
            const { error } = await _supabase.from('financeiro').insert(lancamentos);
            if (error) throw error;
        }

        alert("Sucesso!");
        resetForm();
        loadFinanceiro();
    } catch (err) {
        alert("Erro: " + err.message);
    }
}

// --- 5. AÇÕES (EDITAR, EXCLUIR, BUSCAR) ---

async function editItem(id) {
    const item = dadosFinanceiros.find(i => i.id === id);
    if (!item) return;

    document.getElementById('edit-id').value = item.id;
    document.getElementById('tipo').value = item.tipo.toLowerCase();
    document.getElementById('descricao').value = item.descricao;
    document.getElementById('valor').value = item.valor;
    document.getElementById('data_vencimento').value = item.data_vencimento;
    document.getElementById('data_pagamento').value = item.data_pagamento || '';
    document.getElementById('status').value = item.status.toLowerCase();
    document.getElementById('entidade_id').value = item.entidade_id || '';
    document.getElementById('categoria').value = item.categoria || '';
    document.getElementById('forma_pagamento').value = item.forma_pagamento || '';

    document.getElementById('form-title').innerText = "Editando Lançamento";
    document.getElementById('btn-save').innerText = "Atualizar";
    document.getElementById('btn-cancel').style.display = "block";
    document.getElementById('parcelas').disabled = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteItem(id) {
    if (confirm("Excluir este lançamento?")) {
        const { error } = await _supabase.from('financeiro').delete().eq('id', id);
        if (!error) loadFinanceiro();
    }
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;

    const filtrados = dadosFinanceiros.filter(item => {
        const matchesTermo = JSON.stringify(item).toLowerCase().includes(termo);
        const dataVenc = item.data_vencimento;
        const matchesData = (!inicio || dataVenc >= inicio) && (!fim || dataVenc <= fim);
        return matchesTermo && matchesData;
    });

    renderTable(filtrados);
}

function resetForm() {
    document.getElementById('edit-id').value = '';
    document.querySelectorAll('input').forEach(i => i.value = i.id === 'parcelas' ? '1' : '');
    document.getElementById('status').value = 'pendente';
    document.getElementById('tipo').value = 'pagar';
    document.getElementById('entidade_id').value = '';
    document.getElementById('form-title').innerText = "Novo Lançamento";
    document.getElementById('btn-save').innerText = "Salvar Lançamento(s)";
    document.getElementById('btn-cancel').style.display = "none";
    document.getElementById('parcelas').disabled = false;
}

// --- 6. AÇÕES EM MASSA ---

function toggleSelectAll() {
    const master = document.getElementById('select-all');
    document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = master.checked);
    updateSelectedCount();
}

function updateSelectedCount() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked').length;
    document.getElementById('bulk-area').style.display = selecionados > 0 ? 'block' : 'none';
    document.getElementById('selected-count').innerText = `${selecionados} selecionados`;
}

async function deleteSelected() {
    if (!confirm("Excluir todos os selecionados?")) return;
    const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
    const { error } = await _supabase.from('financeiro').delete().in('id', ids);
    if (!error) {
        loadFinanceiro();
        updateSelectedCount();
    }
}

// --- 7. EXPORTAÇÃO PDF ---

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.text("Relatório Financeiro - ERP ABP", 14, 15);
    
    const rows = dadosFinanceiros.map(i => [
        i.tipo.toUpperCase(),
        i.descricao,
        i.data_vencimento,
        `R$ ${parseFloat(i.valor).toFixed(2)}`,
        i.status.toUpperCase()
    ]);

    doc.autoTable({
        head: [['Tipo', 'Descrição', 'Vencimento', 'Valor', 'Status']],
        body: rows,
        startY: 20
    });

    doc.save("financeiro.pdf");
}
  

