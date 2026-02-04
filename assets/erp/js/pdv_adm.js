const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Substitua a função carregarDadosAdm por esta:
async function carregarDadosAdm() {
    let dataInicio = document.getElementById('data-inicio').value;
    let dataFim = document.getElementById('data-fim').value;

    let query = _supabase
        .from('vendas')
        .select('*')
        .order('created_at', { ascending: false });

    // Aplica filtros se as datas estiverem preenchidas
    if (dataInicio) {
        query = query.gte('created_at', `${dataInicio}T00:00:00`);
    }
    if (dataFim) {
        query = query.lte('created_at', `${dataFim}T23:59:59`);
    }

    const { data: vendas, error } = await query;

    if (error) {
        console.error("Erro ao filtrar:", error);
        return;
    }

    renderizarVendas(vendas);
    atualizarResumos(vendas);
}

// Função para facilitar a busca do mês passado
function definirMesPassado() {
    const agora = new Date();
    // Primeiro dia do mês passado
    const primeiroDia = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
    // Último dia do mês passado
    const ultimoDia = new Date(agora.getFullYear(), agora.getMonth(), 0);

    // Ajusta os inputs (formato YYYY-MM-DD)
    document.getElementById('data-inicio').value = primeiroDia.toISOString().split('T')[0];
    document.getElementById('data-fim').value = ultimoDia.toISOString().split('T')[0];

    carregarDadosAdm();
}

// Inicializa as datas com o dia de hoje por padrão ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data-inicio').value = hoje;
    document.getElementById('data-fim').value = hoje;
    carregarDadosAdm();
});

function renderizarVendas(vendas) {
    const corpo = document.getElementById('lista-vendas-adm');
    corpo.innerHTML = vendas.map(v => `
        <tr>
            <td>${new Date(v.created_at).toLocaleString()}</td>
            <td>#${v.id.slice(0,8)}</td>
            <td>${v.forma_pagto}</td>
            <td>R$ ${v.total_liquido.toFixed(2)}</td>
            <td class="${v.status === 'Cancelada' ? 'status-cancelada' : ''}">${v.status}</td>
            <td>
                ${v.status !== 'Cancelada' ? 
                `<button onclick="cancelarVenda('${v.id}')" class="btn-nav" style="background:#ef4444; padding:5px 10px;">
                    <i class="fas fa-undo"></i> Estornar
                </button>` : '--'}
            </td>
        </tr>
    `).join('');
}

async function cancelarVenda(vendaId) {
    if (!confirm("ATENÇÃO: Isso cancelará a venda e devolverá os produtos ao estoque. Confirmar?")) return;

    // 1. Buscar os itens dessa venda
    const { data: itens } = await _supabase.from('vendas_itens').select('*').eq('venda_id', vendaId);

    // 2. Devolver cada item ao estoque
    for (const item of itens) {
        const { data: prod } = await _supabase.from('produtos').select('estoque_atual').eq('id', item.produto_id).single();
        if (prod) {
            await _supabase.from('produtos').update({ 
                estoque_atual: prod.estoque_atual + item.quantidade 
            }).eq('id', item.produto_id);
        }
    }

    // 3. Mudar status da venda
    await _supabase.from('vendas').update({ status: 'Cancelada' }).eq('id', vendaId);

    alert("Venda estornada e estoque atualizado!");
    carregarDadosAdm();
}

function atualizarResumos(vendas) {
    const hoje = new Date().toISOString().split('T')[0];
    const vendasHoje = vendas.filter(v => v.created_at.includes(hoje) && v.status === 'Concluída');
    const canceladasHoje = vendas.filter(v => v.created_at.includes(hoje) && v.status === 'Cancelada');

    const totalHoje = vendasHoje.reduce((acc, v) => acc + v.total_liquido, 0);
    const totalCancelado = canceladasHoje.reduce((acc, v) => acc + v.total_liquido, 0);

    document.getElementById('resumo-vendas-hoje').innerText = `R$ ${totalHoje.toFixed(2)}`;
    document.getElementById('resumo-cancelados').innerText = `R$ ${totalCancelado.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', carregarDadosAdm);
