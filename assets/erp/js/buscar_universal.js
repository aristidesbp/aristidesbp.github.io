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
function renderizarListaDinamica(dados, listaUI, inputTexto, inputHidden) {
    listaUI.innerHTML = '';

    if (dados.length === 0) {
        listaUI.innerHTML = '<li class="p-3 text-gray-500 italic text-sm text-center bg-white">Nenhum resultado encontrado.</li>';
    } else {
        dados.forEach(item => {
            const li = document.createElement('li');
            li.className = "p-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 bg-white flex flex-col transition-colors";
            
            // Lógica de Título Dinâmico: tenta pegar nomes comuns, se não, pega o segundo valor do objeto
            const principal = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
            
            // Subtítulo Dinâmico: tenta pegar CPF, tipo ou data
            const secundario = item.cpf || item.tipo_entidade || item.codigo_barras || (item.created_at ? new Date(item.created_at).toLocaleDateString() : "");

            li.innerHTML = `
                <span class="font-bold text-sm text-gray-800">${principal}</span>
                <span class="text-[10px] text-gray-500 uppercase tracking-tighter">${secundario}</span>
            `;
            
            // AÇÃO AO SELECIONAR UM ITEM
            li.onclick = () => {
                inputTexto.value = principal; // Coloca o nome no campo visível
                if (inputHidden) {
                    inputHidden.value = item.id; // Coloca o ID no campo oculto
                    console.log(`📌 Selecionado em [${inputHidden.name || 'hidden'}]:`, item.id);
                }
                listaUI.classList.add('hidden'); // Esconde a lista
            };
            
            listaUI.appendChild(li);
        });
    }

    // Exibe a lista após renderizar os itens
    listaUI.classList.remove('hidden');
}

// Inicializa o sistema assim que a página carregar
document.addEventListener('DOMContentLoaded', inicializarComponentesBusca);
