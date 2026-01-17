/**
 * js/financeiro.js 
 * Baseado no esquema SQL: clientes(bigint), fornecedores(uuid), financeiro(uuid)
 */

async function initFinanceiro() {
    console.log("Iniciando Financeiro...");
    
    // Configura datas do filtro para o mês atual
    const hoje = new Date();
    const pDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
    const uDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0];
    
    document.getElementById('filtro_inicio').value = pDia;
    document.getElementById('filtro_fim').value = uDia;

    await carregarListas();
    await loadFinanceiro();
}

// 1. CARREGAR SELECTS (CLIENTES E FORNECEDORES)
async function carregarListas() {
    try {
        // Busca clientes (ID é bigint) e fornecedores (ID é uuid)
        const { data: clie } = await _supabase.from('clientes').select('id, nome_completo').order('nome_completo');
        const { data: forn } = await _supabase.from('fornecedores').select('id, razao_social').order('razao_social');

        const sClie = document.getElementById('cliente_id');
        const sForn = document.getElementById('fornecedor_id');

        // Limpa e preenche
        sClie.innerHTML = '<option value="">Selecione um Cliente...</option>';
        sForn.innerHTML = '<option value="">Selecione um Fornecedor...</option>';

        clie?.forEach(c => sClie.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
        forn?.forEach(f => sForn.innerHTML += `<option value="${f.id}">${f.razao_social}</option>`);
    } catch (e) { 
        console.error("Erro ao carregar listas de entidades:", e); 
    }
}

// 2. FILTRAR E LISTAR (SERVIÇO PRINCIPAL)
async function loadFinanceiro() {
    const inicio = document.getElementById('filtro_inicio').value;
    const fim = document.getElementById('filtro_fim').value;
    const busca = document.getElementById('filtro_busca').value;

    // Faz o JOIN com clientes e fornecedores para pegar os nomes
    let query = _supabase.from('financeiro').select(`
        *,
        clientes (nome_completo),
        fornecedores (razao_social)
    `);

    if (inicio) query = query.gte('data_vencimento', inicio);
    if (fim) query = query.lte('data_vencimento', fim);
    if (busca) query = query.ilike('descricao', `%${busca}%`);

    const { data, error } = await query.order('data_vencimento', { ascending: true });

    if (error) {
        console.error("Erro na consulta:", error.message);
        return;
    }

    renderizarTabela(data);
}

// 3. RENDERIZAR TABELA E DASHBOARD
function renderizarTabela(dados) {
    const lista = document.getElementById('financeiro-list');
    lista.innerHTML = '';
    
    let entrada = 0;
    let saida = 0;

    dados.forEach(item => {
        const valor = parseFloat(item.valor) || 0;
        const ehReceita = item.tipo === 'receber';
        
        ehReceita ? entrada += valor : saida += valor;

        // Verifica qual nome exibir (Cliente ou Fornecedor)
        const nomeEntidade = item.clientes?.nome_completo || item.fornecedores?.razao_social || "Lançamento Geral";
        
        const dataFormatada = item.data_vencimento.split('-').reverse().join('/');

        lista.innerHTML += `
            <tr style="border-left: 5px solid ${ehReceita ? '#3ecf8e' : '#ef4444'}">
                <td>${dataFormatada}</td>
                <td>${item.descricao}</td>
                <td>${nomeEntidade}</td>
                <td style="font-weight: bold; color: ${ehReceita ? '#27ae60' : '#c0392b'}">
                    R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </td>
                <td><span class="status-badge ${item.status}">${item.status.toUpperCase()}</span></td>
                <td>
                    <button onclick="excluirRegistro('${item.id}')" class="btn-del-mini">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    // Atualiza os Cards de Resumo
    document.getElementById('resumo-receber').innerText = `R$ ${entrada.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('resumo-pagar').innerText = `R$ ${saida.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('resumo-saldo').innerText = `R$ ${(entrada - saida).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// Funções de apoio
function toggleEntidade() {
    const tipo = document.getElementById('tipo').value;
    document.getElementById('campo-cliente').style.display = tipo === 'receber' ? 'block' : 'none';
    document.getElementById('campo-fornecedor').style.display = tipo === 'pagar' ? 'block' : 'none';
}

async function excluirRegistro(id) {
    if(!confirm("Deseja realmente excluir este lançamento?")) return;
    const { error } = await _supabase.from('financeiro').delete().eq('id', id);
    if(error) alert("Erro ao excluir");
    else loadFinanceiro();
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', initFinanceiro);
