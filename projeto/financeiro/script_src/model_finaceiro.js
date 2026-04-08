// Aguarda o carregamento da página (a verificação de login já é feita pelo controller_navbar.js)
document.addEventListener('DOMContentLoaded', () => {
    carregarLancamentos();
});

// Formatação de moeda BRL
const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

// ============================================================================
// 1. CARREGAR E RENDERIZAR DADOS
// ============================================================================
async function carregarLancamentos() {
    try {
        // Busca os lançamentos da tabela 'financas' (ordenados pelos mais recentes)
        const { data, error } = await _supabase
            .from('financas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        renderizarTabela(data);
        calcularResumo(data);

    } catch (error) {
        console.error("Erro ao buscar finanças:", error);
    }
}

function renderizarTabela(dados) {
    const tbody = document.getElementById('lista-financeira');
    tbody.innerHTML = '';

    if (dados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum lançamento encontrado.</td></tr>';
        return;
    }

    dados.forEach(item => {
        const dataFormatada = new Date(item.created_at).toLocaleDateString('pt-BR');
        const valorClasse = item.tipo === 'receita' ? 'tipo-receita' : 'tipo-despesa';
        const sinal = item.tipo === 'receita' ? '+' : '-';
        
        // Define a cor da tag baseado no status
        let statusClass = 'status-pendente';
        if(item.status_lancamento === 'finalizado') statusClass = 'status-pago';
        if(item.status_lancamento === 'cancelado') statusClass = 'status-atrasado';

        tbody.innerHTML += `
            <tr>
                <td>${dataFormatada}</td>
                <td><strong>${item.descricao}</strong><br><small style="color:#64748b;">${item.categoria || 'Geral'} | ${item.num_parcelas}x</small></td>
                <td style="text-transform: capitalize;">${item.tipo}</td>
                <td class="${valorClasse}">${sinal} ${formatarMoeda(item.valor_total)}</td>
                <td><span class="tag ${statusClass}">${item.status_lancamento || 'Aberto'}</span></td>
                <td>
                    <button class="text-red-500 hover:text-red-700" onclick="excluirLancamento('${item.id}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function calcularResumo(dados) {
    let receitas = 0;
    let despesas = 0;

    dados.forEach(item => {
        // Considera apenas valores ativos/abertos/finalizados para o saldo bruto
        if (item.status_lancamento !== 'cancelado') {
            if (item.tipo === 'receita') receitas += Number(item.valor_total);
            if (item.tipo === 'despesa') despesas += Number(item.valor_total);
        }
    });

    const saldo = receitas - despesas;

    document.getElementById('total-receitas').innerText = formatarMoeda(receitas);
    document.getElementById('total-despesas').innerText = formatarMoeda(despesas);
    document.getElementById('total-saldo').innerText = formatarMoeda(saldo);
    
    // Altera a cor do saldo se for negativo
    document.getElementById('total-saldo').style.color = saldo < 0 ? 'var(--danger)' : 'var(--dark)';
}

// ============================================================================
// 2. INSERIR NOVO LANÇAMENTO
// ============================================================================
async function salvarLancamento() {
    const tipo = document.getElementById('tipo_lancamento').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value || 'Geral';
    const valor_total = document.getElementById('valor_total').value;
    const num_parcelas = document.getElementById('num_parcelas').value || 1;

    if (!descricao || !valor_total) {
        alert("Por favor, preencha a descrição e o valor.");
        return;
    }

    try {
        const payload = {
            tipo: tipo,
            descricao: descricao,
            categoria: categoria,
            valor_total: parseFloat(valor_total),
            num_parcelas: parseInt(num_parcelas),
            status_lancamento: 'aberto' // Valor padrão estabelecido no seu SQL
        };

        const { error } = await _supabase.from('financas').insert([payload]);
        if (error) throw error;

        // Limpa o formulário
        document.getElementById('descricao').value = '';
        document.getElementById('valor_total').value = '';
        document.getElementById('categoria').value = 'Geral';
        document.getElementById('num_parcelas').value = '1';

        alert("Lançamento salvo com sucesso!");
        carregarLancamentos(); // Atualiza a tabela e os cards

    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar: " + error.message);
    }
}

// ============================================================================
// 3. EXCLUIR LANÇAMENTO
// ============================================================================
async function excluirLancamento(id) {
    if (!confirm("Tem certeza que deseja excluir este lançamento permanentemente?")) return;

    try {
        const { error } = await _supabase.from('financas').delete().eq('id', id);
        if (error) throw error;
        carregarLancamentos();
    } catch (error) {
        alert("Erro ao excluir: " + error.message);
    }
}

// ============================================================================
// 4. LEITOR DE CÓDIGO DE BARRAS (HTML5-QRCode)
// ============================================================================
let html5QrcodeScanner;

function iniciarLeitor() {
    const readerDiv = document.getElementById('reader');
    
    // Se já estiver visível, desliga
    if (readerDiv.style.display === 'block') {
        readerDiv.style.display = 'none';
        if (html5QrcodeScanner) html5QrcodeScanner.clear();
        return;
    }

    readerDiv.style.display = 'block';
    
    html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 250, height: 100} }, false);
    
    html5QrcodeScanner.render((decodedText, decodedResult) => {
        // Quando lê com sucesso:
        alert("Código lido: " + decodedText);
        
        // Podes adaptar isto para preencher a descrição automaticamente
        document.getElementById('descricao').value = "Boleto: " + decodedText;
        document.getElementById('tipo_lancamento').value = "despesa";
        
        html5QrcodeScanner.clear();
        readerDiv.style.display = 'none';
    }, (errorMessage) => {
        // Ignora erros de leitura contínua (é normal enquanto tenta focar)
    });
}

// Filtro rápido da tabela
function filtrarFinanceiro() {
    const termo = document.getElementById('buscaFinanceiro').value.toLowerCase();
    document.querySelectorAll('#lista-financeira tr').forEach(tr => {
        if (tr.cells.length > 1) { // Evita a linha de "Nenhum lançamento"
            const texto = tr.cells[1].innerText.toLowerCase();
            tr.style.display = texto.includes(termo) ? '' : 'none';
        }
    });
}
