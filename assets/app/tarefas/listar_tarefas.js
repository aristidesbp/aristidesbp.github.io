async function loadTasks() {
    const container = document.getElementById('tasks-list');
    try {
        const { data: tasks, error } = await window.supabaseClient
            .from('tarefas').select('*').order('created_at', { ascending: false });

        if (error) throw error;
        container.innerHTML = tasks.map(t => `
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                    <span class="text-[10px] font-bold uppercase p-1 rounded ${t.status === 'concluida' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}">${t.status}</span>
                    <h3 class="font-bold dark:text-white mt-1">${t.title}</h3>
                    <p class="text-xs text-slate-500">${t.entidade || 'Sem responsável'}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="prepareEdit('${t.id}')" class="p-2 text-blue-600"><span class="material-symbols-outlined">edit</span></button>
                    <button onclick="deleteTask('${t.id}')" class="p-2 text-red-600"><span class="material-symbols-outlined">delete</span></button>
                </div>
            </div>
        `).join('') || '<p class="text-center text-slate-400">Nenhuma tarefa.</p>';
    } catch (err) { container.innerHTML = "Erro ao carregar."; }
}
document.addEventListener('DOMContentLoaded', loadTasks);
