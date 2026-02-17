/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Sistema de busca dinâmica universal com interface em MODAL.
 * Funcionalidade: Evita bagunçar o layout da página abrindo uma janela flutuante para seleção.
 */

let cacheGlobalBusca = [];
let componenteAtivo = null;

async function inicializarComponentesBusca() {
    // 1. Localiza todos os containers que possuem a classe 'componente-busca'
    const componentes = document.querySelectorAll('.componente-busca');

    // Garante que o HTML do Modal exista na página
    criarEstruturaModalSeNaoExistir();

    componentes.forEach((container) => {
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const inputTexto = container.querySelector('.input-busca-texto');

        // GATILHO: Clique no botão (Lupa) ou Enter no campo de texto abre o modal
        if (btnBusca) {
            btnBusca.addEventListener('click', () => abrirModalBusca(container));
        }

        if (inputTexto) {
            inputTexto.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    abrirModalBusca(container);
                }
            });
        }
    });
}

/**
 * Abre o modal e carrega os dados da tabela específica
 */
async function abrirModalBusca(container) {
    componenteAtivo = container;
    const nomeTabela = container.getAttribute('data-tabela');
    const modal = document.getElementById('modal_busca_universal');
    const listaUI = document.getElementById('lista_modal_resultados');
    const campoFiltro = document.getElementById('campo_filtro_modal');

    // Reset e Exibição
    modal.classList.remove('hidden');
    listaUI.innerHTML = '<li class="p-3 text-center text-gray-500 italic">Carregando dados...</li>';
    campoFiltro.value = "";
    campoFiltro.focus();

    try {
        // Busca os dados da tabela definida no componente
        const { data, error } = await window.supabaseClient
            .from(nomeTabela)
            .select('*');

        if (error) throw error;
        cacheGlobalBusca = data || [];
        
        renderizarItensModal(cacheGlobalBusca);

        // Filtro em tempo real dentro do modal
        campoFiltro.oninput = () => {
            const termo = campoFiltro.value.toLowerCase();
            const filtrados = cacheGlobalBusca.filter(item => 
                Object.values(item).some(v => String(v).toLowerCase().includes(termo))
            );
            renderizarItensModal(filtrados);
        };

    } catch (err) {
        console.error(`❌ Erro ao carregar tabela [${nomeTabela}]:`, err.message);
        listaUI.innerHTML = `<li class="p-3 text-red-500 text-center">Erro ao carregar dados.</li>`;
    }
}

/**
 * Renderiza os itens dentro da lista do modal
 */
function renderizarItensModal(dados) {
    const listaUI = document.getElementById('lista_modal_resultados');
    listaUI.innerHTML = '';

    if (dados.length === 0) {
        listaUI.innerHTML = '<li class="p-3 text-gray-500 text-center">Nenhum registro encontrado.</li>';
        return;
    }

    dados.forEach(item => {
        // Tenta identificar campos de título e subtítulo automaticamente
        const principal = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
        const secundario = item.cpf || item.tipo_entidade || item.codigo_barras || (item.created_at ? new Date(item.created_at).toLocaleDateString() : "");

        const li = document.createElement('li');
        li.className = "p-3 hover:bg-emerald-50 cursor-pointer flex flex-col border-b border-gray-100 transition-colors";
        li.innerHTML = `
            <span class="font-bold text-gray-800 text-sm">${principal}</span>
            <span class="text-[10px] text-gray-500 uppercase tracking-tighter">${secundario}</span>
        `;

        li.onclick = () => {
            // Preenche o input visível e o hidden do componente que disparou a busca
            const inputVisivel = componenteAtivo.querySelector('.input-busca-texto');
            const inputHidden = componenteAtivo.querySelector('.id-selecionado-hidden');

            if (inputVisivel) inputVisivel.value = principal;
            if (inputHidden) {
                inputHidden.value = item.id;
                console.log(`📌 Selecionado ID: ${item.id} para o campo: ${inputHidden.name}`);
            }
            
            fecharModalBusca();
        };

        listaUI.appendChild(li);
    });
}

function fecharModalBusca() {
    document.getElementById('modal_busca_universal').classList.add('hidden');
}

/**
 * Cria dinamicamente a estrutura do Modal caso não esteja no HTML
 */
function criarEstruturaModalSeNaoExistir() {
    if (document.getElementById('modal_busca_universal')) return;

    const modalHTML = `
    <div id="modal_busca_universal" class="fixed inset-0 bg-black bg-opacity-50 z-[9999] hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 class="font-bold text-gray-700 uppercase text-sm tracking-widest">Selecionar Registro</h3>
                <button type="button" onclick="fecharModalBusca()" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
            </div>
            <div class="p-4">
                <input type="text" id="campo_filtro_modal" 
                       placeholder="Digite para filtrar resultados..." 
                       class="w-full p-3 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm">
                
                <ul id="lista_modal_resultados" class="max-h-72 overflow-y-auto border rounded-md divide-y divide-gray-100 shadow-inner bg-gray-50">
                    </ul>
            </div>
            <div class="p-3 bg-gray-50 text-right">
                <button type="button" onclick="fecharModalBusca()" class="text-xs font-bold text-gray-500 uppercase hover:text-gray-700">Cancelar</button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Fecha ao clicar na área escura
    document.getElementById('modal_busca_universal').addEventListener('click', (e) => {
        if (e.target.id === 'modal_busca_universal') fecharModalBusca();
    });
}

// Inicializa o sistema
document.addEventListener('DOMContentLoaded', inicializarComponentesBusca);
