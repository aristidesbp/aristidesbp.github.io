async function loadParcelas() {
    const busca = document.getElementById('filtro-busca').value;
    const categoria = document.getElementById('filtro-categoria').value;
    const dataInicio = document.getElementById('filtro-inicio').value;
    const dataFim = document.getElementById('filtro-fim').value;

    let query = _supabase.from('parcelas').select('*, financas!inner(descricao, tipo, categoria)').order('data_vencimento', { ascending: true });

    if (busca) query = query.ilike('financas.descricao', `%${busca}%`);
    if (categoria) query = query.eq('financas.categoria', categoria);
    if (dataInicio) query = query.gte('data_vencimento', dataInicio);
    if (dataFim) query = query.lte('data_vencimento', dataFim);

    const { data, error } = await query;
    if (error) { console.error("Erro:", error.message); return; }
    
    window.dadosAtuaisFiltrados = data;
    const tbody = document.getElementById('lista-parcelas');
    const hoje = new Date().toISOString().split('T')[0];
    let sumReceita = 0, sumDespesa = 0, sumPendente = 0;

    tbody.innerHTML = data.map(p => {
        let valorNum = parseFloat(p.valor_parcela || 0);
        let statusClass = p.status === 'pago' ? 'status-pago' : 'status-pendente';
        let statusTxt = p.status.toUpperCase();
        if(p.status === 'pendente' && p.data_vencimento < hoje) { statusClass = 'status-atrasado'; statusTxt = 'ATRASADO'; }

        if (p.status === 'pago') { 
            p.financas.tipo === 'receita' ? sumReceita += valorNum : sumDespesa += valorNum; 
        } else { sumPendente += valorNum; }

        const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString('pt-br');
        const dtPag = p.data_pagamento ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';

        return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="p-3 text-center"><input type="checkbox" class="check-parcela" value="${p.id}"></td>
            <td class="p-3">
                <div class="text-slate-800 font-bold">${dtVenc}</div>
                <div class="text-xs text-slate-500 mt-1">${dtPag}</div>
            </td>
            <td class="p-3">
                <div class="font-bold text-slate-700 mb-1">${p.financas.descricao}</div>
            </td>
            <td class="p-3 font-bold text-slate-600">${p.num_parcela} / ${p.financas.num_parcelas}</td>
            <td class="p-3 font-bold ${p.financas.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600'}">R$ ${valorNum.toFixed(2)}</td>
            <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
            <td class="p-3 text-center"><button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">Editar</button></td>
        </tr>`;
    }).join('');

    document.getElementById('dash-receita').innerText = `R$ ${sumReceita.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
    document.getElementById('dash-despesa').innerText = `R$ ${sumDespesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
    document.getElementById('dash-pendente').innerText = `R$ ${sumPendente.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;

    atualizarGrafico(sumReceita, sumDespesa, sumPendente);
}
