const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarDadosAdm() {
    const { data: vendas, error } = await _supabase
        .from('vendas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) return console.error(error);

    renderizarVendas(vendas);
    atualizarResumos(vendas);
}

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
