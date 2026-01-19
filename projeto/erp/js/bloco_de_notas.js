/**
 * js/bloco_de_notas.js - Versão Corrigida para Sincronismo
 */

let allNotes = [];

// Função para garantir que o _supabase foi definido pelo conexao.js
async function waitSupabase() {
    let attempts = 0;
    while (!window._supabase && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms
        attempts++;
    }
    if (window._supabase) {
        loadNotes();
    } else {
        console.error("Supabase não carregou a tempo.");
    }
}

async function loadNotes() {
    try {
        const { data: notes, error } = await _supabase
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        allNotes = notes || [];
        renderNotes(allNotes);
    } catch (err) {
        console.error("Erro ao carregar:", err.message);
    }
}

function renderNotes(notes) {
    const list = document.getElementById('notes-list');
    if (!notes.length) {
        list.innerHTML = '<p style="text-align:center;color:#94a3b8;margin-top:20px;">Nenhuma nota encontrada.</p>';
        return;
    }
    list.innerHTML = notes.map(n => `
        <div class="note">
            <div class="note-content">
                <strong>${n.title}</strong>
                <p>${n.content}</p>
            </div>
            <div class="actions">
                <button style="background:#f1c40f" onclick="prepareEdit('${n.id}')"><i class="fas fa-edit"></i></button>
                <button style="background:#e74c3c" onclick="deleteNote('${n.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

async function saveNote() {
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) return alert("Preencha tudo!");

    const { data: { user } } = await _supabase.auth.getUser();

    if (id) {
        await _supabase.from('notes').update({ title, content }).eq('id', id);
    } else {
        await _supabase.from('notes').insert([{ title, content, user_id: user.id }]);
    }

    resetForm();
    loadNotes();
}

function prepareEdit(id) {
    const note = allNotes.find(n => n.id === id);
    if (!note) return;
    document.getElementById('note-id').value = note.id;
    document.getElementById('title').value = note.title;
    document.getElementById('content').value = note.content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('btn-save').innerText = "Salvar Nota";
}

async function deleteNote(id) {
    if (confirm("Excluir nota?")) {
        await _supabase.from('notes').delete().eq('id', id);
        loadNotes();
    }
}

function filterNotes() {
    const q = document.getElementById('search').value.toLowerCase();
    renderNotes(allNotes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
}

function exportAllToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Relatório de Notas - ERP ABP", 10, 10);
    let y = 20;
    allNotes.forEach((n, i) => {
        doc.setFont(undefined, 'bold');
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        doc.setFont(undefined, 'normal');
        doc.text(n.content, 10, y + 7);
        y += 25;
    });
    doc.save("notas.pdf");
}

// Inicialização segura
document.addEventListener('DOMContentLoaded', waitSupabase);
