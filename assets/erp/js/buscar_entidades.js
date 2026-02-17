/**
 * Nome do arquivo: buscar_entidades.js
 * Objetivo: Busca avançada de entidades com filtro multi-campo.

<!-- BUSCAR ENSTIDADES -->
<div class="relative w-full mb-4">
    <label class="block text-sm font-medium text-gray-700">Buscar Entidade (Nome, CPF/CNPJ, Tipo...)</label>
    
    <div class="flex gap-2 mt-1">
        <input type="text" id="busca_entidade" 
               placeholder="Digite para pesquisar..." 
               class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border">
        
        <input type="hidden" id="entidade_id_selecionada" name="entidade_id">
    </div>

    <ul id="lista_resultados_entidade" 
        class="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto hidden">
        </ul>
</div>
<script src="js/buscar_entidades.js"></script> 
<!-- FIM DE BUSCAR ENSTIDADES -->
 
 */

let todasEntidades = []; // Cache local para busca rápida

async function inicializarBuscaEntidades() {
    try {
        // 1. Busca todos os dados necessários da tabela 'entidades'
        // Adicione aqui as colunas que deseja usar na busca (ex: documento, tipo)
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo, documento, relacao') 
            .order('nome_completo', { ascending: true });

        if (error) throw error;
        todasEntidades = data;

        const inputBusca = document.getElementById('busca_entidade');
        const lista = document.getElementById('lista_resultados_entidade');

        // 2. Evento de digitação (Filtro)
        inputBusca.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            
            if (termo.length > 0) {
                const filtrados = todasEntidades.filter(ent => 
                    ent.nome_completo?.toLowerCase().includes(termo) ||
                    ent.documento?.includes(termo) ||
                    ent.relacao?.toLowerCase().includes(termo)
                );
                exibirResultados(filtrados);
            } else {
                lista.classList.add('hidden');
            }
        });

        // Fechar lista ao clicar fora
        document.addEventListener('click', (e) => {
            if (!inputBusca.contains(e.target) && !lista.contains(e.target)) {
                lista.classList.add('hidden');
            }
        });

    } catch (err) {
        console.error("Erro na busca de entidades:", err.message);
    }
}

function exibirResultados(listaFiltrada) {
    const listaUI = document.getElementById('lista_resultados_entidade');
    listaUI.innerHTML = '';

    if (listaFiltrada.length === 0) {
        listaUI.innerHTML = '<li class="p-2 text-gray-500">Nenhum resultado encontrado</li>';
    } else {
        listaFiltrada.forEach(ent => {
            const li = document.createElement('li');
            li.className = "p-2 hover:bg-blue-100 cursor-pointer border-b border-gray-100 flex justify-between";
            li.innerHTML = `
                <span><strong>${ent.nome_completo}</strong></span>
                <span class="text-xs text-gray-500 uppercase">${ent.relacao || ''}</span>
            `;
            
            li.onclick = () => selecionarEntidade(ent);
            listaUI.appendChild(li);
        });
    }
    listaUI.classList.remove('hidden');
}

function selecionarEntidade(ent) {
    document.getElementById('busca_entidade').value = ent.nome_completo;
    document.getElementById('entidade_id_selecionada').value = ent.id; // Valor para o formulário
    document.getElementById('lista_resultados_entidade').classList.add('hidden');
    
    console.log("Entidade Selecionada ID:", ent.id);
}

// Inicia ao carregar a página
document.addEventListener('DOMContentLoaded', inicializarBuscaEntidades);
