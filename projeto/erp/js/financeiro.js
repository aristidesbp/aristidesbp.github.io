/** ERP ABP - Módulo Financeiro **/
(function() {
    "use strict";

    let currentFinanceData = [];
    let filteredData = [];

    // Utilitário de Data
    function formatarDataBR(dataISO) {
        if(!dataISO) return '---';
        const partes = dataISO.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    // Carregar Dados Principais
    async function loadFinanceiro() {
        if (!window._supabase) {
            setTimeout(loadFinanceiro, 500);
            return;
        }

        const { data, error } = await _supabase.from('financeiro')
            .select('*, entidades(nome_completo)')
            .order('data_vencimento', { ascending: true });
        
        if (error) return console.error("Erro Financeiro:", error);
        currentFinanceData = data || [];
        window.filtrarTabela();
    }

    // Renderizar Tabela
    function renderTable(data) {
        const list = document.getElementById('financeiro-list');
        let e = 0, s = 0;
        
        list.innerHTML = data.map(f => {
            const val = parseFloat(f.valor) || 0;
            const tipoLabel = f.tipo === 'receber' ? 'Entrada' : 'Saída';
            if(f.tipo === 'receber') e += val; else s += val;
            
            return `
            <tr>
                <td><input type="checkbox" class="row-checkbox" value="${f.id}" onclick="updateBulkUI()"></td>
                <td><span class="label-tipo tipo-${f.tipo}">${tipoLabel}</span></td>
                <td>${f.descricao}</td>
                <td>${f.categoria || '-'}</td>
                <td>${f.forma_pagamento || '-'}</td>
                <td>${formatarDataBR(f.data_vencimento)}</td>
                <td>${f.data_pagamento ? formatarDataBR(f.data_pagamento) : '<small style="color:#ccc">---</small>'}</td>
                <td><b>R$ ${val.toLocaleString('pt-BR', {minimumFractionDigits:2})}</b></td>
                <td><span class="status-badge status-${f.status}">${f.status}</span></td>
                <td>
                    <button class="btn-action" style="color:#3b82f6; border:none; background:none; cursor:pointer;" onclick="editFinance('${f.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-action" style="color:#ef4444; border:none; background:none; cursor:pointer;" onclick="deleteSingle('${f.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        }).join('') || '<tr><td colspan="10" style="text-align:center">Nenhum resultado encontrado.</td></tr>';
        
        document.getElementById('total-receber').innerText = `R$ ${e.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
        document.getElementById('total-pagar').innerText = `R$ ${s.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
        document.getElementById('total-saldo').innerText = `R$ ${(e-s).toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    }

    // Filtros e Busca
    window.filtrarTabela = function() {
        const busca = document.getElementById('inputBusca').value.toLowerCase();
        const dIni = document.getElementById('dataInicio').value;
        const dFim = document.getElementById('dataFim').value;
        
        filteredData = currentFinanceData.filter(f => {
            const valorFormatado = (parseFloat(f.valor) || 0).toLocaleString('pt-BR', {minimumFractionDigits:2});
            const tipoExtenso = f.tipo === 'receber' ? 'entrada' : 'saida saída';

            const matchBusca = f.descricao.toLowerCase().includes(busca) || 
                               (f.categoria && f.categoria.toLowerCase().includes(busca)) ||
                               f.status.toLowerCase().includes(busca) ||
                               valorFormatado.includes(busca) ||
                               tipoExtenso.includes(busca);

            let matchData = true;
            if(dIni) matchData = matchData && (f.data_vencimento >= dIni);
            if(dFim) matchData = matchData && (f.data_vencimento <= dFim);

            return matchBusca && matchData;
        });
        renderTable(filteredData);
    };

    // PDF
    window.exportarPDF = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.text("Extrato Financeiro - ERP ABP", 14, 15);
        
        const body = filteredData.map(f => [
            f.tipo === 'receber' ? 'ENTRADA' : 'SAÍDA',
            f.descricao,
            f.categoria || '-',
            f.forma_pagamento || '-',
            formatarDataBR(f.data_vencimento),
            f.data_pagamento ? formatarDataBR(f.data_pagamento) : '-',
            `R$ ${parseFloat(f.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})}`,
            f.status.toUpperCase()
        ]);

        doc.autoTable({
            head: [['TIPO', 'DESCRIÇÃO', 'CATEGORIA', 'FORMA', 'VENC.', 'PAGTO.', 'VALOR', 'STATUS']],
            body: body,
            startY: 25,
            theme: 'striped',
            styles: { fontSize: 8 }
        });
        doc.save('extrato_financeiro.pdf');
    };

    // Salvar Lançamento
    window.handleSave = async function() {
        const { data: { user } } = await _supabase.auth.getUser();
        const id = document.getElementById('edit-id').value;
        const numParcelas = parseInt(document.getElementById('parcelas').value) || 1;
        const valorParcela = parseFloat(document.getElementById('valor').value) || 0;
        const dataString = document.getElementById('data_vencimento').value;

        if(!document.getElementById('descricao').value || !valorParcela || !dataString) {
            return alert("Preencha os campos obrigatórios.");
        }

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
        window.resetForm(); 
        loadFinanceiro();
    };

    function getFormData(uid) {
        return { 
            usuario_id: uid, 
            tipo: document.getElementById('tipo').value, 
            descricao: document.getElementById('descricao').value, 
            valor: parseFloat(document.getElementById('valor').value), 
            data_vencimento: document.getElementById('data_vencimento').value, 
            data_pagamento: document.getElementById('data_pagamento').value || null, 
            status: document.getElementById('status').value, 
            entidade_id: document.getElementById('entidade_id').value || null, 
            categoria: document.getElementById('categoria').value, 
            forma_pagamento: document.getElementById('forma_pagamento').value 
        };
    }

    // Edição e Delete
    window.editFinance = function(id) {
        const item = currentFinanceData.find(f => f.id === id);
        if(!item) return;
        document.getElementById('edit-id').value = item.id;
        document.getElementById('tipo').value = item.tipo;
        document.getElementById('descricao').value = item.descricao;
        document.getElementById('valor').value = item.valor;
        document.getElementById('data_vencimento').value = item.data_vencimento;
        document.getElementById('data_pagamento').value = item.data_pagamento || '';
        document.getElementById('status').value = item.status;
        document.getElementById('entidade_id').value = item.entidade_id || '';
        document.getElementById('categoria').value = item.categoria || '';
        document.getElementById('forma_pagamento').value = item.forma_pagamento || '';
        document.getElementById('parcelas').disabled = true;
        document.getElementById('form-title').innerText = "Editando Lançamento";
        document.getElementById('btn-save').innerText = "Atualizar Lançamento";
        document.getElementById('btn-cancel').style.display = 'block';
        window.scrollTo({top:0, behavior:'smooth'});
    };

    window.resetForm = function() { 
        document.querySelectorAll('input, select').forEach(i => {
            if(i.id === 'parcelas') i.value = '1';
            else if(i.id === 'tipo') i.value = 'pagar';
            else if(i.id === 'status') i.value = 'pendente';
            else i.value = '';
        }); 
        document.getElementById('edit-id').value = ''; 
        document.getElementById('parcelas').disabled = false; 
        document.getElementById('form-title').innerText = "Novo Lançamento"; 
        document.getElementById('btn-save').innerText = "Salvar Lançamento(s)"; 
        document.getElementById('btn-cancel').style.display = 'none'; 
    };

    window.deleteSingle = async function(id) { 
        if(confirm("Excluir este lançamento?")) { 
            await _supabase.from('financeiro').delete().eq('id', id); 
            loadFinanceiro(); 
        } 
    };

    // Massa
    window.toggleSelectAll = function() { 
        const isChecked = document.getElementById('select-all').checked; 
        document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = isChecked); 
        window.updateBulkUI(); 
    };
    
    window.updateBulkUI = function() { 
        const selected = document.querySelectorAll('.row-checkbox:checked').length; 
        document.getElementById('bulk-area').style.display = selected > 0 ? 'block' : 'none'; 
        document.getElementById('selected-count').innerText = `${selected} selecionados`; 
    };
    
    window.deleteSelected = async function() { 
        if(!confirm("Excluir selecionados?")) return; 
        const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value); 
        await _supabase.from('financeiro').delete().in('id', ids); 
        loadFinanceiro(); 
        window.updateBulkUI(); 
    };

    // Carregar Entidades para o Select
    async function loadEntidadesSelect() { 
        if (!window._supabase) return;
        const { data } = await _supabase.from('entidades').select('id, nome_completo'); 
        const select = document.getElementById('entidade_id'); 
        if(data) {
            select.innerHTML = '<option value="">Selecione...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        }
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', () => { 
        loadFinanceiro(); 
        loadEntidadesSelect();
    });

})();
