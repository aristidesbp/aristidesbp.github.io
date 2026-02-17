/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Sistema de busca dinâmica que lê a tabela alvo direto do atributo data-tabela no HTML.
 * Funcionalidade: Suporte a busca universal em todos os campos, múltiplos componentes na mesma página e tecla ENTER.

<!-- BUSCA UNIVERSAL ############################################## -->
<div class="componente-busca" data-tabela="entidades">
<label>Cliente:</label>
<div class="flex gap-2">
<input type="text" class="input-busca-texto border p-2 w-full">
<button type="button" class="btn-disparar-busca bg-blue-500 text-white px-3">Buscar</button>
<input type="hidden" class="id-selecionado-hidden" name="cliente_id">
</div>
<ul class="lista-resultados-suspensa hidden border absolute bg-white w-full z-50"></ul>
</div>
<!-- repete a dive se quizer colocar mais de uma tabela troca apenas o  data-tabela="nome_da_tabela "-->
<script src="js/buscar_universal.js"></script>
<!-- FIM DA BUSCA UNIVERSAL ####################################### -->
 
 */

async function inicializarComponentesBusca() {
    // 1. Localiza todos os containers de busca na página (pela classe)
    const componentes = document.querySelectorAll('.componente-busca');

    componentes.forEach(async (container) => {
        // Seleciona os elementos específicos DESTE container usando as classes padrões
        const nomeTabela = container.getAttribute('data-tabela');
        const inputTexto = container.querySelector('.input-busca-texto');
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const listaUI = container.querySelector('.lista-resultados-suspensa');
        const inputHidden = container.querySelector('.id-selecionado-hidden');

        // Verifica se o HTML básico do componente está presente
        if (!nomeTabela || !inputTexto || !btnBusca || !listaUI) {
            console.warn("⚠️ Componente de busca incompleto detectado.");
            return;
        }

        let cacheDados = [];

        try {
            // 2. Carrega todos os dados da tabela definida no atributo 'data-tabela'
            const { data, error } = await window.supabaseClient
                .from(nomeTabela)
                .select('*');

            if (error) throw error;
            cacheDados = data || [];

            // 3. FUNÇÃO DE BUSCA: Filtra o cache e renderiza a lista
            const executarBusca = () => {
                const termo = inputTexto.value.trim().toLowerCase();
                
                // Se o campo estiver vazio, mostra tudo. Caso contrário, busca em todas as colunas.
                const filtrados = (termo === "") 
                    ? cacheDados 
                    : cacheDados.filter(reg => 
                        Object.values(reg).some(v => String(v).toLowerCase().includes(termo))
                    );
                
                renderizarListaDinamica(filtrados, listaUI, inputTexto, inputHidden);
            };

            // GATILHO 1: Clique no botão (Lupa)
            btnBusca.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que o evento de 'clicar fora' feche a lista na hora
                executarBusca();
            });

            // GATILHO 2: Tecla ENTER no campo de texto
            inputTexto.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Impede o envio do formulário padrão
                    executarBusca();
                }
            });

            // GATILHO 3: Fechar a lista ao clicar fora do container
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    listaUI.classList.add('hidden');
                }
            });

            console.log(`✅ Busca configurada para: [${nomeTabela}] com suporte a ENTER.`);

        } catch (err) {
            console.error(`❌ Erro ao configurar busca da tabela [${nomeTabela}]:`, err.message);
        }
    });
}

/**
 * Função para gerar os itens da lista suspensa
 */
/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Sistema de busca dinâmica universal para múltiplas tabelas.
 * Funcionalidade: Injeta CSS automaticamente, suporta tecla ENTER e posicionamento absoluto.
 */

// 1. INJEÇÃO DE CSS (Garante que a lista flutue sobre o layout)
const cssBusca = `
    .componente-busca { position: relative; }
    .lista-resultados-suspensa {
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 9999 !important;
        background: white !important;
        border: 1px solid #ddd !important;
        border-radius: 4px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        max-height: 250px !important;
        overflow-y: auto !important;
        padding: 0 !important;
        margin: 4px 0 0 0 !important;
        list-style: none !important;
    }
    .lista-resultados-suspensa li {
        padding: 10px 15px !important;
        border-bottom: 1px solid #f0f0f0 !important;
        cursor: pointer !important;
        display: flex !important;
        flex-direction: column !important;
    }
    .lista-resultados-suspensa li:hover { background: #f0fdf4 !important; }
    .lista-resultados-suspensa .titulo-item { font-weight: bold; color: #333; font-size: 14px; }
    .lista-resultados-suspensa .subtitulo-item { font-size: 11px; color: #666; text-transform: uppercase; }
    .hidden { display: none !important; }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = cssBusca;
document.head.appendChild(styleSheet);

// 2. LÓGICA DE BUSCA
async function inicializarComponentesBusca() {
    const componentes = document.querySelectorAll('.componente-busca');

    componentes.forEach(async (container) => {
        const nomeTabela = container.getAttribute('data-tabela');
        const inputTexto = container.querySelector('.input-busca-texto');
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const listaUI = container.querySelector('.lista-resultados-suspensa');
        const inputHidden = container.querySelector('.id-selecionado-hidden');

        if (!nomeTabela || !inputTexto || !btnBusca || !listaUI) return;

        let cacheDados = [];

        try {
            // Carrega os dados da tabela via Supabase
            const { data, error } = await window.supabaseClient
                .from(nomeTabela)
                .select('*');

            if (error) throw error;
            cacheDados = data || [];

            const executarBusca = () => {
                const termo = inputTexto.value.trim().toLowerCase();
                const filtrados = (termo === "") 
                    ? cacheDados 
                    : cacheDados.filter(reg => 
                        Object.values(reg).some(v => String(v).toLowerCase().includes(termo))
                    );
                renderizarListaDinamica(filtrados, listaUI, inputTexto, inputHidden);
            };

            // Evento: Clique no Botão
            btnBusca.addEventListener('click', (e) => {
                e.stopPropagation();
                executarBusca();
            });

            // Evento: Tecla ENTER
            inputTexto.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    executarBusca();
                }
            });

            // Evento: Clicar fora (fecha a lista)
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    listaUI.classList.add('hidden');
                }
            });

            console.log(`✅ Busca configurada: [${nomeTabela}]`);

        } catch (err) {
            console.error(`❌ Erro [${nomeTabela}]:`, err.message);
        }
    });
}

function renderizarListaDinamica(dados, listaUI, inputTexto, inputHidden) {
    listaUI.innerHTML = '';

    if (dados.length === 0) {
        listaUI.innerHTML = '<li style="text-align:center; color:#999; font-style:italic;">Nenhum resultado.</li>';
    } else {
        dados.forEach(item => {
            const li = document.createElement('li');
            
            // Define o que aparece como título e subtítulo
            const principal = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
            const secundario = item.cpf || item.tipo_entidade || item.codigo_barras || "";

            li.innerHTML = `
                <span class="titulo-item">${principal}</span>
                <span class="subtitulo-item">${secundario}</span>
            `;
            
            li.onclick = () => {
                inputTexto.value = principal;
                if (inputHidden) inputHidden.value = item.id;
                listaUI.classList.add('hidden');
            };
            
            listaUI.appendChild(li);
        });
    }
    listaUI.classList.remove('hidden');
}

// Inicialização
document.addEventListener('DOMContentLoaded', inicializarComponentesBusca);
