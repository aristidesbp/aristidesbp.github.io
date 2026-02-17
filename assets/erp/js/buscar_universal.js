/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Campo de busca universal que identifica automaticamente as colunas da tabela.
<!-- BUSCA UNIVERSAL -->
<div class="relative w-full mb-4">
<label class="block text-sm font-medium text-gray-700 font-bold mb-1">Busca Rápida</label>
<div class="flex gap-2">
<input type="text" id="input_busca_universal" placeholder="Pesquisar em qualquer campo..." 
class="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 outline-none text-gray-800">
<button type="button" id="btn_buscar_universal" class="bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 transition">
<i class="fas fa-search"></i>
</button>
<input type="hidden" id="id_selecionado_universal" name="id_selecionado">
</div>
<ul id="lista_resultados_universal" class="absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-2xl max-h-60 overflow-y-auto hidden"></ul>
</div>
<script src="js/buscar_universal.js"></script>
<!-- FIM DA BUSCA UNIVERSAL -->
 */

// CONFIGURAÇÃO: Basta trocar o nome da tabela aqui para reutilizar o arquivo
const TABELA_ALVO = 'entidades'; 

let cacheDadosUniversal = []; 

async function inicializarBuscaUniversal() {
    try {
        // 1. Busca todos os dados da tabela definida
        // O '*' busca todas as colunas automaticamente
        const { data, error } = await window.supabaseClient
            .from(TABELA_ALVO)
            .select('*') 
            .order('created_at', { ascending: false });

        if (error) throw error;
        cacheDadosUniversal = data || [];

        const btnBusca = document.getElementById('btn_buscar_universal');
        const inputBusca = document.getElementById('input_busca_universal');
        const listaUI = document.getElementById('lista_resultados_universal');

        if (!btnBusca || !inputBusca || !listaUI) return;

        // 2. Evento de Busca
        btnBusca.addEventListener('click', () => {
            const termo = inputBusca.value.trim().toLowerCase();
            
            if (termo === "") {
                renderizarListaUniversal(cacheDadosUniversal);
            } else {
                // BUSCA DINÂMICA EM TODOS OS CAMPOS
                const filtrados = cacheDadosUniversal.filter(registro => {
                    // Object.values pega todos os valores das colunas do registro atual
                    return Object.values(registro).some(valor => 
                        String(valor).toLowerCase().includes(termo)
                    );
                });
                renderizarListaUniversal(filtrados);
            }
        });

        // Fechar lista ao clicar fora
        document.addEventListener('click', (e) => {
            if (!inputBusca.contains(e.target) && !btnBusca.contains(e.target) && !listaUI.contains(e.target)) {
                listaUI.classList.add('hidden');
            }
        });

        console.log(`🚀 Busca Universal pronta para a tabela: [${TABELA_ALVO}]`);

    } catch (err) {
        console.error("❌ Erro na busca universal:", err.message);
    }
}

function renderizarListaUniversal(dados) {
    const listaUI = document.getElementById('lista_resultados_universal');
    listaUI.innerHTML = '';

    if (dados.length === 0) {
        listaUI.innerHTML = '<li class="p-3 text-gray-500 italic text-sm text-center">Nenhum resultado encontrado.</li>';
    } else {
        dados.forEach(item => {
            const li = document.createElement('li');
            li.className = "p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex flex-col bg-white";
            
            // Lógica para exibição dinâmica:
            // Tentamos pegar 'nome_completo' ou 'nome' ou 'descricao', senão pegamos o primeiro campo disponível
            const titulo = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
            const subInfo = item.cpf || item.documento || item.codigo_barras || item.tipo_entidade || "";

            li.innerHTML = `
                <span class="font-bold text-gray-800 text-sm">${titulo}</span>
                <span class="text-[10px] text-gray-500 uppercase">${subInfo}</span>
            `;
            
            li.onclick = () => {
                document.getElementById('input_busca_universal').value = titulo;
                document.getElementById('id_selecionado_universal').value = item.id;
                listaUI.classList.add('hidden');
                console.log("📌 Selecionado ID:", item.id);
            };
            
            listaUI.appendChild(li);
        });
    }
    listaUI.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', inicializarBuscaUniversal);
