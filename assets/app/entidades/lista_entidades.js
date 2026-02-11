async function loadEntidades() {
    const container = document.getElementById('entidades-list');
    
    try {
        const { data: entidades, error } = await window.supabaseClient
            .from('entidades')
            .select('*')
            .order('nome_completo', { ascending: true });

        if (error) throw error;

        container.innerHTML = entidades.map(item => `
            <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex justify-between items-center transition-all active:scale-[0.99]">
                <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">${item.tipo_entidade}</span>
                    <h3 class="font-bold text-slate-800 dark:text-white truncate">${item.nome_completo}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400">${item.telefone || 'Sem telefone'}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="prepareEdit('${item.id}')" class="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button onclick="deleteEntidade('${item.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `).join('') || '<p class="text-center text-slate-400 py-10">Nenhuma entidade cadastrada.</p>';

    } catch (err) {
        container.innerHTML = `<p class="text-center text-red-500 py-10">Erro ao carregar dados.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadEntidades);
