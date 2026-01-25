// INÍCIO DO NOVO BLOCO JAVASCRIPT: Lógica do Painel Administrativo Simplificado
// assets/js/admin-script.js

// --- CONFIGURAÇÕES E REFERÊNCIAS GLOBAIS ---
const ADMIN_CONFIG_KEY = 'adminConfigList'; // Chave para salvar a lista de configuração
const CONFIG_FILE_PATH = 'assets/json/'; 

const listaConfigUl = document.getElementById('lista-configuracao');
const adicionarConfigBtn = document.getElementById('adicionar-config-btn');
const msgConfigVazia = document.getElementById('msg-config-vazia');

// Referências para Backup/Restauração
const exportarJsonBtn = document.getElementById('exportar-json-btn');
const importarJsonInput = document.getElementById('importar-json-input');

// A configuração agora é uma lista de objetos: 
// [{cidade: 'A', bairro: '1', valor: 10.00}, ...]
let configList = []; 

// --- MÓDULO DE DADOS (Local Storage) ---

/**
 * Carrega a lista de configuração de fretes do Local Storage.
 */
function carregarConfig() {
    configList = JSON.parse(localStorage.getItem(ADMIN_CONFIG_KEY)) || [];
}

/**
 * Salva a lista de configuração atualizada no Local Storage.
 */
function salvarConfig() {
    // 1. Limpa entradas vazias antes de salvar
    configList = configList.filter(item => item.cidade.trim() !== '' && item.bairro.trim() !== '');
    
    // 2. Salva
    localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(configList));
    renderizarLista();
}

// --- MÓDULO DE INTERFACE (DOM) ---

/**
 * Adiciona uma nova linha de configuração vazia à lista.
 */
function adicionarNovaConfig() {
    configList.push({ cidade: '', bairro: '', valor: 0.00 });
    salvarConfig(); // Salva a estrutura vazia e renderiza
}

/**
 * Cria a estrutura HTML para um único item de edição.
 * @param {object} item - O objeto de configuração.
 * @param {number} index - O índice no array configList.
 * @returns {HTMLLIElement} O elemento LI montado.
 */
function criarItemConfig(item, index) {
    const li = document.createElement('li');
    li.className = 'p-4 border rounded-lg bg-gray-50 flex flex-wrap items-center gap-3 md:gap-4';
    li.dataset.index = index;

    li.innerHTML = `
        <div class="flex-1 min-w-[120px]">
            <label class="block text-xs font-semibold text-gray-500 mb-1">Cidade</label>
            <input 
                type="text" 
                value="${item.cidade}" 
                placeholder="Nome da Cidade"
                onchange="atualizarConfig(${index}, 'cidade', this.value)"
                class="w-full border rounded px-3 py-2 text-gray-700 font-medium"
            >
        </div>
        <div class="flex-1 min-w-[120px]">
            <label class="block text-xs font-semibold text-gray-500 mb-1">Bairro</label>
            <input 
                type="text" 
                value="${item.bairro}" 
                placeholder="Nome do Bairro"
                onchange="atualizarConfig(${index}, 'bairro', this.value)"
                class="w-full border rounded px-3 py-2 text-gray-700"
            >
        </div>
        <div class="w-24">
            <label class="block text-xs font-semibold text-gray-500 mb-1">Valor (R$)</label>
            <input 
                type="number" 
                step="0.01"
                value="${item.valor.toFixed(2)}"
                onchange="atualizarConfig(${index}, 'valor', parseFloat(this.value))"
                class="w-full border rounded px-3 py-2 text-red-700 font-bold"
            >
        </div>
        <button 
            onclick="removerConfig(${index})" 
            class="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 font-semibold transition duration-150"
            title="Remover Configuração"
        >
            X
        </button>
    `;

    return li;
}

/**
 * Renderiza a lista de configuração, ordenando por Cidade e Bairro.
 */
function renderizarLista() {
    // 1. Ordenação (por Cidade e depois por Bairro)
    configList.sort((a, b) => {
        const cA = a.cidade.toLowerCase(), cB = b.cidade.toLowerCase();
        if (cA !== cB) return cA.localeCompare(cB);
        
        const bA = a.bairro.toLowerCase(), bB = b.bairro.toLowerCase();
        return bA.localeCompare(bB);
    });

    listaConfigUl.innerHTML = '';

    // 2. Renderização
    configList.forEach((item, index) => {
        // Encontra o novo índice do item após a ordenação para manter a referência correta
        const novoIndex = configList.findIndex(i => 
            i.cidade === item.cidade && i.bairro === item.bairro && i.valor === item.valor
        );
        listaConfigUl.appendChild(criarItemConfig(item, novoIndex));
    });

    // 3. Controla a visibilidade da mensagem
    if (configList.length === 0) {
        msgConfigVazia.classList.remove('hidden');
    } else {
        msgConfigVazia.classList.add('hidden');
    }
}

// --- MÓDULO DE AÇÕES ---

/**
 * Atualiza um valor no array configList quando um input é alterado.
 */
window.atualizarConfig = function(index, campo, valor) {
    if (configList[index]) {
        // Lógica de validação simples
        if (campo === 'valor' && (isNaN(valor) || valor < 0)) {
            alert('Por favor, insira um valor numérico positivo para o frete.');
            return;
        }
        
        configList[index][campo] = valor;
        salvarConfig(); 
        // Não é necessário renderizar tudo aqui, pois o salvamento já chama o render
    }
}

/**
 * Remove um item de configuração da lista.
 */
window.removerConfig = function(index) {
    if (confirm('Deseja realmente remover esta configuração de frete?')) {
        configList.splice(index, 1);
        salvarConfig();
    }
}

// --- MÓDULO DE BACKUP (JSON Import/Export) ---

/**
 * Exporta a configuração para o JSON. O formato agora é uma LISTA, mas 
 * para a página de Entregas funcionar (que espera um objeto aninhado), 
 * o JSON exportado deve ser convertido para o formato { "Cidade": { "Bairro": Valor } }.
 */
function exportarJSON() {
    // 1. Converte a lista de volta para o formato de objeto aninhado esperado pela página de Entregas
    const configExportavel = {};
    configList.forEach(item => {
        const cidade = item.cidade.trim();
        const bairro = item.bairro.trim();
        const valor = parseFloat(item.valor);
        
        if (cidade && bairro && !isNaN(valor)) {
            if (!configExportavel[cidade]) {
                configExportavel[cidade] = {};
            }
            configExportavel[cidade][bairro] = valor;
        }
    });

    if (Object.keys(configExportavel).length === 0) {
         if (!confirm('A lista está vazia. Deseja exportar um arquivo JSON vazio?')) return;
    }
    
    const jsonString = JSON.stringify(configExportavel, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `config.json`; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Arquivo 'config.json' exportado. Salve-o na pasta '${CONFIG_FILE_PATH}' para que o App de Entregas o utilize.`);
}

/**
 * Lida com a importação de um arquivo JSON.
 * O JSON importado (no formato aninhado) deve ser convertido para o formato de LISTA.
 */
function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const configAninhada = JSON.parse(e.target.result);
            
            if (typeof configAninhada === 'object' && configAninhada !== null) {
                if (confirm('A importação irá sobrescrever TODAS as configurações atuais. Deseja continuar?')) {
                    // 1. Converte o formato aninhado (objeto) para o formato de lista (array)
                    const novaConfigLista = [];
                    for (const cidade in configAninhada) {
                        for (const bairro in configAninhada[cidade]) {
                            novaConfigLista.push({
                                cidade: cidade,
                                bairro: bairro,
                                valor: configAninhada[cidade][bairro] || 0.00
                            });
                        }
                    }

                    configList = novaConfigLista;
                    salvarConfig();
                    alert('Configuração JSON importada e restaurada com sucesso!');
                }
            } else {
                alert('Arquivo JSON inválido.');
            }
        } catch (error) {
            alert('Erro ao processar o arquivo: O arquivo não é um JSON válido.');
        }
        event.target.value = null; 
    };
    reader.readAsText(file);
}

// --- INICIALIZAÇÃO E LISTENERS ---

// Listener: Adicionar nova linha de configuração
adicionarConfigBtn.addEventListener('click', adicionarNovaConfig);

// Listener para Exportar JSON
if (exportarJsonBtn) {
    exportarJsonBtn.addEventListener('click', exportarJSON);
}

// Listener para Importar JSON
if (importarJsonInput) {
    importarJsonInput.addEventListener('change', importarJSON);
}

// Chamadas que devem ocorrer ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarConfig();
    renderizarLista();
});

// FIM DO NOVO BLOCO JAVASCRIPT: Lógica do Painel Administrativo Simplificado