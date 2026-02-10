/**
 * Nome do arquivo: listar_notas.js
 * Objetivo: Buscar notas do banco e renderizar o HTML da listagem.
 */
let allNotes = []; // Variável global para busca e exportação

async function loadNotes() {
    const container = document.getElementById('notes-list');
    if (!container) return;

    try {
        const { data: notes, error } = await window.supabaseClient
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allNotes = notes || [];
        renderNotes(allNotes);
    } catch (err) {
        console.error("Erro ao carregar notas:", err.message);
        container.innerHTML = `<p class="text-center text-red-500">Erro ao carregar notas.</p>`;
    }
}

function renderNotes(notes) {
    const container = document.getElementById('notes-list');
    if (!container) return;

    if (notes.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-400 py-10">Nenhuma nota encontrada.</p>';
        return;
    }

    container.innerHTML = notes.map(n => `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-start mb-4">
            <div class="flex-1 pr-4">
                <h3 class="font-bold text-lg dark:text-white">${n.title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mt-1 whitespace-pre-wrap">${n.content}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="prepareEdit('${n.id}', \`${n.title}\`, \`${n.content}\`)" class="p-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-sm">edit</span>
                </button>
                <button onclick="deleteNote('${n.id}')" class="p-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Inicia a carga quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', loadNotes);
