document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('taskListContainer');
    const searchInput = document.getElementById('searchInput');

    async function fetchTasks() {
        try {
            const { data: tasks, error } = await window.supabaseClient
                .from('tarefas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            renderTasks(tasks);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error.message);
            container.innerHTML = `<p class="text-red-500 text-center">Erro ao carregar dados.</p>`;
        }
    }

    function renderTasks(tasks) {
        if (tasks.length === 0) {
            container.innerHTML = `<p class="text-center py-10 text-slate-400">Nenhuma tarefa encontrada.</p>`;
            return;
        }

        container.innerHTML = tasks.map(task => {
            const isRealizada = task.status === 'realizada';
            const statusClass = isRealizada 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';

            return `
                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-3 transition-all ${isRealizada ? 'opacity-70' : ''}">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2 mb-1">
                            <h3 class="font-semibold text-slate-900 dark:text-white truncate ${isRealizada ? 'line-through' : ''}">${task.title}</h3>
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusClass}">${task.status}</span>
                        </div>
                        <p class="text-xs font-medium text-primary mb-1">${task.entidade || 'Sem entidade'}</p>
                        <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">${task.tarefa_descricao || ''}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Filtro de busca simples
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = container.querySelectorAll('div[class*="bg-white"]');
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(term) ? 'flex' : 'none';
        });
    });

    fetchTasks();
});
