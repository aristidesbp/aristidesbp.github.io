/** * ERP ABP - listar_financeiro.js */
async function loadFinanceiro() {
    const { data, error } = await window.supabaseClient
        .from('financeiro')
        .select('*, entidades(nome_completo)')
        .order('data_vencimento', { ascending: true });
    
    if (error) return console.error("Erro ao carregar:", error.message);
    renderTable(data || []);
}

function renderTable(data) {
    const list = document.getElementById('financeiro-list');
    let entradas = 0, saidas = 0;
    
    list.innerHTML = data.map(f => {
        const val = parseFloat(f.valor) || 0;
        if (f.tipo === 'Receber') entradas += val; else saidas += val;

        return `
            <tr>
                <td><input type="checkbox" class="row-checkbox" value="${f.id}" onclick="updateBulkUI()"></td>
                <td><b class="${f.tipo === 'Receber' ? 'tipo-receber' : 'tipo-pagar'}">${f.tipo}</b></td>
                <td>${f.descricao}<br><small>${f.entidades?.nome_completo || 'Sem vínculo'}</small></td>
                <td>${f.data_vencimento}</td>
                <td>R$ ${val.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td><span class="status-badge status-${f.status.toLowerCase()}">${f.status}</span></td>
                <td>
                    <button onclick="editFinanceiro('${f.id}')" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteSingle('${f.id}')" class="btn-del"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }).join('');

    document.getElementById('total-receber').innerText = `R$ ${entradas.toLocaleString('pt-BR')}`;
    document.getElementById('total-pagar').innerText = `R$ ${saidas.toLocaleString('pt-BR')}`;
    document.getElementById('total-saldo').innerText = `R$ ${(entradas - saidas).toLocaleString('pt-BR')}`;
}
