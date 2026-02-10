let allNotes = [];

async function loadNotes() {
    const container = document.getElementById('notes-list');
    
    const { data: notes, error } = await window.supabaseClient
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao carregar notas:", error.message);
        return;
    }

    allNotes = notes || [];
    renderNotes(allNotes);
}

function renderNotes(notes) {
    const container = document.getElementById('notes-list');
    if (!container) return;

    container.innerHTML = notes.map(n => `
        <div class="note bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-4 flex justify-between items-start">
            <div class="note-content">
                <strong class="block text-lg dark:text-white">${n.title}</strong>
                <p class="text-slate-500 dark:text-slate-400">${n.content}</p>
            </div>
            <div class="actions flex gap-2">
                <button class="p-2 bg-amber-400 text-white rounded-lg" 
                    onclick="prepareEdit('${n.id}', \`${n.title}\`, \`${n.content}\`)">
                    <span class="material-symbols-outlined text-sm">edit</span>
                </button>
                <button class="p-2 bg-red-500 text-white rounded-lg" 
                    onclick="deleteNote('${n.id}')">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </div>
        </div>
    `).join('') || '<p class="text-center text-slate-400">Nenhuma nota encontrada.</p>';
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', loadNotes);
