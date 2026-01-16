// 1. Corrigindo o carregamento e filtros
async function loadFinanceiro() {
    const inicio = document.getElementById('data_inicio').value;
    const fim = document.getElementById('data_fim').value;
    const busca = document.getElementById('busca_termo').value;

    let query = _supabase.from('financeiro').select('*, clientes(nome_completo), fornecedores(razao_social)');

    if (inicio) query = query.gte('data_vencimento', inicio);
    if (fim) query = query.lte('data_vencimento', fim);
    if (busca) query = query.ilike('descricao', `%${busca}%`);

    const { data, error } = await query.order('data_vencimento', { ascending: true });

    if (error) return alert("Erro ao carregar: " + error.message);

    renderTable(data);
}

// 2. Renderização com checkbox e cores de extrato
function renderTable(data) {
    const list = document.getElementById('financeiro-list');
    list.innerHTML = '';
    let saldoAcumulado = 0;

    data.forEach(item => {
        const valor = parseFloat(item.valor);
        const ehEntrada = item.tipo === 'receber';
        saldoAcumulado += ehEntrada ? valor : -valor;

        list.innerHTML += `
            <tr class="${item.status}">
                <td><input type="checkbox" class="row-select" value="${item.id}" onclick="updateSelectedCount()"></td>
                <td>${item.data_vencimento.split('-').reverse().join('/')}</td>
                <td>${item.descricao}</td>
                <td>${item.clientes?.nome_completo || item.fornecedores?.razao_social || '-'}</td>
                <td style="color: ${ehEntrada ? '#2ecc71' : '#e74c3c'}">
                    ${ehEntrada ? '+' : '-'} R$ ${valor.toLocaleString('pt-BR')}
                </td>
                <td><span class="badge ${item.status}">${item.status}</span></td>
                <td>
                    <button onclick="editarItem('${item.id}')"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteSingle('${item.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// 3. Exclusão em Massa
async function deleteSelected() {
    const ids = Array.from(document.querySelectorAll('.row-select:checked')).map(cb => cb.value);
    if (ids.length === 0 || !confirm(`Deseja excluir ${ids.length} lançamentos?`)) return;

    const { error } = await _supabase.from('financeiro').delete().in('id', ids);
    if (!error) {
        alert("Excluído com sucesso!");
        loadFinanceiro();
    }
}

// 4. Exportação PDF Modelo Extrato
function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("EXTRATO FINANCEIRO - ERP ABP", 14, 15);
    
    const rows = [];
    document.querySelectorAll("#financeiro-list tr").forEach(tr => {
        const cols = tr.querySelectorAll("td");
        rows.push([cols[1].innerText, cols[2].innerText, cols[3].innerText, cols[4].innerText, cols[5].innerText]);
    });

    doc.autoTable({
        head: [['Data', 'Descrição', 'Entidade', 'Valor', 'Status']],
        body: rows,
        startY: 20,
        theme: 'striped'
    });

    doc.save(`extrato_${new Date().getTime()}.pdf`);
}
