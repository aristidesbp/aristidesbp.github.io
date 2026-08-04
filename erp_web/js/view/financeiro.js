/**
 * Injeta dinamicamente a estrutura da Aba Financeiro dentro de um contêiner alvo.
 * @param {string} containerId - O ID do elemento HTML onde a aba será renderizada.
 */
function renderizarAbaFinanceiro(containerId = 'app-container') {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Erro: Elemento com ID '${containerId}' não foi localizado no DOM.`);
    return;
  }

  container.innerHTML = `
    <!-- ════════════ ABA: FINANCEIRO ════════════ -->
    <div class="fade-in max-w-7xl mx-auto px-4" id="aba-financeiro">
      
      <!-- Dashboard de Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-emerald-500">
          <p class="text-gray-500 dark:text-slate-400 text-sm">Receitas (Pagas)</p>
          <h2 id="fin-dash-receita" class="text-2xl font-bold text-emerald-600">R$ 0,00</h2>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-red-500">
          <p class="text-gray-500 dark:text-slate-400 text-sm">Despesas (Pagas)</p>
          <h2 id="fin-dash-despesa" class="text-2xl font-bold text-red-600">R$ 0,00</h2>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-amber-500">
          <p class="text-gray-500 dark:text-slate-400 text-sm">Previsão (Pendentes)</p>
          <h2 id="fin-dash-pendente" class="text-2xl font-bold text-amber-600">R$ 0,00</h2>
        </div>
      </div>

      <!-- Sub-navegação -->
      <div class="flex gap-4 mb-6">
        <button onclick="fin_alternarSubAba('listagem')" id="fin-btn-aba-listagem" class="flex-1 bg-primary text-white hover:brightness-105 font-bold py-3 rounded transition shadow">
          <i class="fas fa-list"></i> Ver Lançamentos
        </button>
        <button onclick="fin_alternarSubAba('formulario')" id="fin-btn-aba-formulario" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
          <i class="fas fa-plus-circle"></i> Novo Lançamento
        </button>
      </div>

      <!-- Formuário de Lançamento -->
      <div class="card mb-8 hidden bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm" id="fin-aba-formulario">
        <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800 dark:text-white">
          <i class="fas fa-plus-circle"></i> Novo Lançamento
        </h3>

        <!-- Anexar Boleto e Comprovante --> 
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium mb-1"><i class="fas fa-file-invoice"></i> Anexar Boleto (Auto-preenchimento)</label>
            <div class="drop-zone border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 text-center rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition" id="fin-drop-boleto" onclick="document.getElementById('fin-f-boleto').click()">
              <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
              <p class="text-xs text-slate-500">Clique ou arraste o arquivo (ex: descricao_valor_data.pdf)</p>
              <input type="file" id="fin-f-boleto" accept="image/*,.pdf" class="hidden" onchange="fin_mostrarNomeArquivo(this,'fin-nome-boleto'); fin_extrairDadosArquivo(this);">
              <p id="fin-nome-boleto" class="text-xs font-bold text-emerald-600 mt-2 truncate"></p>
            </div>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium mb-1"><i class="fas fa-receipt"></i> Anexar Comprovante</label>
            <div class="drop-zone border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 text-center rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition" id="fin-drop-comprovante" onclick="document.getElementById('fin-f-comprovante').click()">
              <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
              <p class="text-xs text-slate-500">Clique ou arraste o comprovante aqui</p>
              <input type="file" id="fin-f-comprovante" accept="image/*,.pdf" class="hidden" onchange="fin_mostrarNomeArquivo(this,'fin-nome-comprovante')">
              <p id="fin-nome-comprovante" class="text-xs font-bold text-emerald-600 mt-2 truncate"></p>
            </div>
          </div>
        </div>

        <!-- Inputs do Formulário -->
        <input type="hidden" id="fin-f-editando-id">
        <input type="hidden" id="fin-f-editando-financa-id">

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium mb-1">Descrição da Conta *</label>
            <input type="text" id="fin-f-desc" placeholder="Ex: Aluguel, Internet, Venda" class="w-full border p-2 rounded">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Tipo de Valor</label>
            <select id="fin-f-tipo-calculo" onchange="fin_ajustarLabelsValor()" class="w-full border p-2 rounded">
              <option value="total">Valor Total</option>
              <option value="parcela">Valor da Parcela</option>
            </select>
          </div>

          <div>
            <label id="fin-label-valor" class="block text-sm font-medium mb-1">Valor Total (R$) *</label>
            <input type="number" id="fin-f-valor" step="0.01" placeholder="0.00" class="w-full border p-2 rounded">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Tipo de Operação</label>
            <select id="fin-f-tipo" class="w-full border p-2 rounded">
              <option value="despesa">Despesa (Saída)</option>
              <option value="receita">Receita (Entrada)</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Categoria</label>
            <input type="text" id="fin-f-categoria" list="fin-lista-categorias" placeholder="Digite ou escolha..." value="Geral" class="w-full border p-2 rounded">
            <datalist id="fin-lista-categorias"></datalist>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Status do Lançamento</label>
            <select id="fin-f-status" class="w-full border p-2 rounded">
              <option value="aberto">Aberto</option>
              <option value="finalizado">Finalizado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div class="relative md:col-span-1">
            <label class="block text-sm font-medium mb-1">Entidade / Cliente</label>
            <input type="text" id="fin-f-entidade-busca" placeholder="Buscar..." autocomplete="off" class="w-full border p-2 rounded">
            <input type="hidden" id="fin-f-entidade-id">
            <ul id="fin-lista-entidades" class="absolute z-10 w-full bg-white border border-slate-200 shadow-lg rounded max-h-40 overflow-y-auto hidden no-scrollbar"></ul>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Frequência / Recorrência</label>
            <select id="fin-f-recorrencia" class="w-full border p-2 rounded">
              <option value="1">Mensal</option>
              <option value="3">Trimestral</option>
              <option value="6">Semestral</option>
              <option value="12">Anual</option>
              <option value="diario">Diário</option>
            </select>
          </div>

          <div class="p-2 rounded highlight-parcelas border border-blue-200 bg-blue-50/30">
            <label class="block text-sm font-medium mb-1 highlight-label text-blue-700"><i class="fas fa-layer-group"></i> N° de Parcelas *</label>
            <input type="number" id="fin-f-parcelas" value="1" min="1" class="w-full border border-blue-300 font-bold text-blue-700 p-2 rounded">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Data Vencimento *</label>
            <input type="date" id="fin-f-vencimento" class="w-full border p-2 rounded">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Data de Pagamento</label>
            <input type="date" id="fin-f-data-pagamento" class="w-full border p-2 rounded">
          </div>

          <div class="md:col-span-4">
            <label class="block text-sm font-medium mb-1"><i class="fas fa-barcode"></i> Código de Barras / Linha Digitável</label>
            <div class="flex gap-2">
              <input type="text" id="fin-f-barras" placeholder="Cole ou leia o código de barras" class="flex-1 border p-2 rounded">
              <button onclick="fin_iniciarLeituraCamera()" type="button" class="bg-slate-800 text-white px-4 rounded hover:bg-slate-700 transition flex items-center gap-2">
                <i class="fas fa-camera"></i> Ler Código
              </button>
            </div>
              
            <div id="fin-camera-container" class="hidden mt-3 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
              <div id="fin-camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
              <button onclick="fin_pararCamera()" type="button" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600 shadow-lg z-10">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4 mt-6">
          <button onclick="fin_gerarLancamentoCompleto()" id="fin-btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg">
            <i class="fas fa-save"></i> Gravar Lançamento
          </button>
          <button onclick="fin_cancelarEdicao()" id="fin-btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded hover:bg-slate-600 transition shadow-lg">
            Cancelar
          </button>
        </div>
      </div>

      <!-- Listagem de Parcelas (Exibição em Cards Grid) -->
      <div class="card bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm" id="fin-aba-listagem">
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h3 class="font-bold text-slate-800 dark:text-white"><i class="fas fa-list"></i> Controle de Parcelas</h3>
          <button onclick="fin_excluirSelecionados()" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm">
            <i class="fas fa-trash"></i> Excluir Selecionados
          </button>
        </div>

        <!-- Filtros -->
        <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded mb-4 flex flex-wrap gap-4 items-end border border-slate-200 dark:border-slate-700">
          <div class="flex-1 min-w-[200px]">
            <label class="text-xs block font-medium mb-1">Pesquisar Descrição</label>
            <input type="text" id="fin-filtro-busca" placeholder="Ex: Aluguel..." onkeyup="if(event.key==='Enter') fin_loadParcelas()" class="w-full border p-2 rounded text-sm">
          </div>
          <div>
            <label class="text-xs block font-medium mb-1">Categoria</label>
            <select id="fin-filtro-categoria" onchange="fin_loadParcelas()" class="border p-2 rounded text-sm"><option value="">Todas</option></select>
          </div>
          <div>
            <label class="text-xs block font-medium mb-1">Data Início</label>
            <input type="date" id="fin-filtro-inicio" onchange="fin_loadParcelas()" class="border p-2 rounded text-sm">
          </div>
          <div>
            <label class="text-xs block font-medium mb-1">Data Fim</label>
            <input type="date" id="fin-filtro-fim" onchange="fin_loadParcelas()" class="border p-2 rounded text-sm">
          </div>
          <div class="flex gap-2">
            <button onclick="fin_loadParcelas()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow transition text-sm"><i class="fas fa-search"></i> Filtrar</button>
            <button onclick="fin_limparFiltros()" class="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition text-sm">Limpar</button>
          </div>
        </div>

        <!-- Checkbox de Seleção Global -->
        <div class="mb-4 flex items-center justify-between">
          <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer font-bold">
            <input type="checkbox" id="fin-check-all" onclick="fin_toggleTodosChecks(this)" class="w-4 h-4">
            Selecionar Todos os Lançamentos
          </label>
        </div>

        <!-- Contêiner GRID para os Cards -->
        <div id="fin-lista-parcelas" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Os cards serão injetados dinamicamente via JS aqui -->
        </div>
      </div>

    </div><!-- fim aba-financeiro -->
  `;
}


/* COPIE NO SEU HTML: 

 <!-- Div contêiner principal onde a função vai injetar todo o código -->
  <div id="conteudo-principal"></div>

  <!-- Inclusão dos seus scripts JS -->
  <script src="injetarAbaFinanceiro.js"></script>
  <script>
    // Executa assim que o HTML base terminar de carregar
    document.addEventListener('DOMContentLoaded', () => {
      // Injeta a Aba Financeiro dentro da div #conteudo-principal
      renderizarAbaFinanceiro('conteudo-principal');
    });
  </script>



*/