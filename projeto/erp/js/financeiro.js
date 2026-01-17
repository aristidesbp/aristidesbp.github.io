/**
 * js/financeiro.js 
 * Meta: Realizar o lançamento no banco de dados
 */

// 1. Inicialização ao carregar a página
async function initFinanceiro() {
    console.log("Sistema pronto para lançamentos...");
    
    // Configura datas padrão (mês atual) nos inputs de filtro
    const hoje = new Date();
    const pDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
    const uDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0];
    
    if(document.getElementById('filtro_inicio')) document.getElementById('filtro_inicio').value = pDia;
    if(document.getElementById('filtro_fim')) document.getElementById('filtro_fim').value = uDia;

    await carregarListas();
    await loadFinanceiro();
}

// 2. FUNÇÃO PARA SALVAR O LANÇAMENTO
async function salvarLancamento() {
    console.log("Tentando salvar lançamento...");

    // Captura os dados do formulário
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const dataVenc = document.getElementById('data_vencimento').value;
    const parcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    // Pega os IDs de cliente ou fornecedor
    const clienteId = document.getElementById('cliente_id').value;
    const fornecedorId = document.getElementById('fornecedor_id').value;

    // Validação básica
    if (!descricao || !valor || !dataVenc) {
        alert("Por favor, preencha Descrição, Valor e Vencimento.");
        return;
    }

    try {
        // Pega o usuário logado para o usuario_id
        const { data: { user }, error: userError } = await _supabase.auth.getUser();
        
        if (userError || !user) {
            alert("Erro: Usuário não autenticado.");
            return;
        }

        let lancamentos = [];

        // Loop para gerar as parcelas (Repetir Meses)
        for (let i = 0; i < parcelas; i++) {
            let dataRef = new Date(dataVenc + 'T00:00:00');
            dataRef.setMonth(dataRef.getMonth() + i);

            lancamentos.push({
                usuario_id: user.id,
                tipo: tipo,
                descricao: parcelas > 1 ? `${descricao} (${i + 1}/${parcelas})` : descricao,
                valor: parseFloat(valor),
                data_vencimento: dataRef.toISOString().split('T')[0],
                status: 'pendente',
                // Se for 'receber' envia cliente, se for 'pagar' envia fornecedor
                cliente_id: tipo === 'receber' && clienteId ? clienteId : null,
                fornecedor_id: tipo === 'pagar' && fornecedorId ? fornecedorId : null
            });
        }

        // Insere no banco de dados
        const { error } = await _supabase.from('financeiro').insert(lancamentos);

        if (error) {
            console.error("Erro Supabase:", error);
            alert("Erro ao gravar no banco: " + error.message);
        } else {
            alert(parcelas > 1 ? `${parcelas} parcelas lançadas!` : "Lançamento realizado com sucesso!");
            
            // Limpa o formulário
            document.getElementById('descricao').value = '';
            document.getElementById('valor').value = '';
            
            // Recarrega a tabela para mostrar o novo item
            await loadFinanceiro();
        }

    } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro inesperado ao salvar.");
    }
}

// 3. CARREGAR SELECTS (Você disse que já está funcionando, mantive a lógica)
async function carregarListas() {
    const { data: clie } = await _supabase.from('clientes').select('id, nome_completo').order('nome_completo');
    const { data: forn } = await _supabase.from('fornecedores').select('id, razao_social').order('razao_social');

    const sClie = document.getElementById('cliente_id');
    const sForn = document.getElementById('fornecedor_id');

    if(sClie) clie?.forEach(c => sClie.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`);
    if(sForn) forn?.forEach(f => sForn.innerHTML += `<option value="${f.id}">${f.razao_social}</option>`);
}

// 4. LISTAGEM (Para atualizar a tabela após salvar)
async function loadFinanceiro() {
    const list = document.getElementById('financeiro-list');
    if(!list) return;

    let { data, error } = await _supabase
        .from('financeiro')
        .select('*, clientes(nome_completo), fornecedores(razao_social)')
        .order('data_vencimento', { ascending: true });

    if (error) {
        console.log("Erro ao listar:", error);
        return;
    }

    list.innerHTML = '';
    data.forEach(item => {
        list.innerHTML += `
            <tr>
                <td>${item.data_vencimento.split('-').reverse().join('/')}</td>
                <td>${item.descricao}</td>
                <td>${item.clientes?.nome_completo || item.fornecedores?.razao_social || 'Geral'}</td>
                <td>R$ ${parseFloat(item.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
                <td>${item.status}</td>
                <td><button onclick="deletar('${item.id}')">X</button></td>
            </tr>
        `;
    });
}

function toggleEntidade() {
    const tipo = document.getElementById('tipo').value;
    document.getElementById('campo-cliente').style.display = tipo === 'receber' ? 'block' : 'none';
    document.getElementById('campo-fornecedor').style.display = tipo === 'pagar' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', initFinanceiro);
