/**
 * js/entidades_lista.js
 * Lógica para listar e gerenciar entidades cadastradas
 */

async function carregarEntidades() {
    const listaContainer = document.querySelector('main .flex.flex-col.gap-3');
    
    try {
        const { data: entidades, error } = await window.supabaseClient
            .from('entidades')
            .select('*')
            .order('nome', { ascending: true });

        if (error) throw error;

        // Limpa a lista atual (se houver placeholder)
        listaContainer.innerHTML = '';

        if (entidades.length === 0) {
            listaContainer.innerHTML = '<p class="text-center text-gray-500 py-10">Nenhuma entidade encontrada.</p>';
            return;
        }

        entidades.forEach(entidade => {
            const itemHtml = `
                <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-50 dark:border-gray-800">
                    <div class="flex flex-col flex-1 min-w-0">
                        <p class="text-[#111418] dark:text-white text-base font-semibold truncate">${entidade.nome}</p>
                        <p class="text-gray-500 text-xs">${entidade.tipo} | ${entidade.contato || 'Sem contato'}</p>
                    </div>
                    <div class="flex items-center gap-2">
                         <button onclick="deletarEntidade('${entidade.id}')" class="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            `;
            listaContainer.insertAdjacentHTML('beforeend', itemHtml);
        });

    } catch (error) {
        console.error("Erro ao carregar lista:", error.message);
    }
}

async function deletarEntidade(id) {
    if (!confirm("Tem certeza que deseja excluir esta entidade?")) return;

    try {
        const { error } = await window.supabaseClient
            .from('entidades')
            .delete()
            .eq('id', id);

        if (error) throw error;

        carregarEntidades(); // Recarrega a lista
    } catch (error) {
        alert("Erro ao excluir entidade.");
    }
}

// Inicia a carga quando a página abre
document.addEventListener('DOMContentLoaded', carregarEntidades);
