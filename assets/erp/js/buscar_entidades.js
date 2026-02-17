/**
 * Nome do arquivo: buscar_entidades.js
 * Objetivo: Busca avançada de entidades com filtro multi-campo.

<!-- BUSCAR ENSTIDADES -->
<div class="relative w-full mb-4">
<label class="block text-sm font-medium text-gray-700">Buscar Entidade (Nome, CPF/CNPJ, Tipo...)</label>  
<div class="flex gap-2 mt-1">
<input type="text" id="busca_entidade" 
placeholder="Digite nome, documento ou relação..." 
class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">       
<button type="button" id="btn_buscar_entidade" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
<i class="fa fa-search"></i> Buscar
</button>
<input type="hidden" id="entidade_id_selecionada" name="entidade_id">
</div>
<ul id="lista_resultados_entidade" 
class="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto hidden">
</ul>
</div>
<script src="js/buscar_entidades.js"></script>
<!-- FIM DE BUSCAR ENSTIDADES -->
 
 */

/**
 * Nome do arquivo: buscar_entidades.js
 * Objetivo: Busca avançada de entidades manual por clique no botão.
 */

let todasEntidades = []; 

async function inicializarBuscaEntidades() {
    try {
        // 1. Busca inicial para popular o cache local
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo, documento, relacao') 
            .order('nome_completo', { ascending: true });

        if (error) throw error;
        todasEntidades = data;

        const inputBusca = document.getElementById('busca_entidade');
        const btnBusca = document.getElementById('btn_buscar_entidade');
        const listaUI = document.getElementById('lista_resultados_entidade');

        // 2. Evento de clique no Botão
        btnBusca.addEventListener('click', () => {
            const termo = inputBusca.value.trim().toLowerCase();
            
            if (termo === "") {
                // Se estiver vazio, mostra todos
                exibirResultados(todasEntidades);
            } else {
                // Filtra pelo termo
                const filtrados = todasEntidades.filter(ent => 
                    (ent.nome_completo && ent.nome_completo.toLowerCase().includes(termo)) ||
                    (ent.documento && ent.documento.includes(termo)) ||
                    (ent.relacao && ent.relacao.toLowerCase().includes(termo))
                );
                exibirResultados(filtrados);
            }
        });

        // Fechar lista ao clicar fora
        document.addEventListener('click', (e) => {
            if (!inputBusca.contains(e.target) && !btnBusca.contains(e.target) && !listaUI.contains(e.target)) {
                listaUI.classList.add('hidden');
            }
        });

    } catch (err) {
        console.error("Erro ao inicializar busca de entidades:", err.message);
    }
}

function exibirResultados(listaFiltrada) {
    const listaUI = document.getElementById('lista_resultados_entidade');
    listaUI.innerHTML = '';

    if (listaFiltrada.length === 0) {
        listaUI.innerHTML = '<li class="p-2 text-gray-500">Nenhum registro encontrado</li>';
    } else {
        listaFiltrada.forEach(ent => {
            const li = document.createElement('li');
            li.className = "p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex flex-col";
            
            // Layout melhorado para exibir múltiplos campos
            li.innerHTML = `
                <span class="font-bold text-gray-800">${ent.nome_completo}</span>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Doc: ${ent.documento || '---'}</span>
                    <span class="uppercase font-semibold text-blue-600">${ent.relacao || 'Geral'}</span>
                </div>
            `;
            
            li.onclick = () => selecionarEntidade(ent);
            listaUI.appendChild(li);
        });
    }
    
    // Remove o hidden para mostrar a lista
    listaUI.classList.remove('hidden');
}

function selecionarEntidade(ent) {
    const inputBusca = document.getElementById('busca_entidade');
    const inputId = document.getElementById('entidade_id_selecionada');
    const listaUI = document.getElementById('lista_resultados_entidade');

    inputBusca.value = ent.nome_completo;
    inputId.value = ent.id;
    listaUI.classList.add('hidden');
    
    console.log("✅ Entidade Selecionada:", ent.nome_completo, "ID:", ent.id);
}

// Inicia ao carregar a página
document.addEventListener('DOMContentLoaded', inicializarBuscaEntidades);
