/**
 * js/bloco_de_notas.js
 * Desenvolvido por: Aristides BP
 * Integração: Supabase + jsPDF
 */

// Armazena todas as notas carregadas localmente para busca rápida
let allNotes = [];

/**
 * Carrega as notas do banco vinculadas ao usuário logado
 */
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
        console.error("Erro ao carregar notas:", err.message);
    }
}

/**
 * Renderiza as notas na tela (HTML dinâmico)
 */
function renderNotes(notes) {
    const listElement = document.getElementById('notes-list');
    
    if (notes.length === 0) {
        listElement.innerHTML = '<p style="text-align:center;color:#94a3b8;margin-top:20px;">Nenhuma nota encontrada.</p>';
        return;
    }

    listElement.innerHTML = notes.map(n => `
        <div class="note">
            <div class="note-content">
                <strong>${n.title}</strong>
                <p>${n.content}</p>
            </div>
            <div class="actions">
                <button title="Editar" style="background:#f1c40f" onclick="prepareEdit('${n.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button title="Excluir" style="background:#e74c3c" onclick="deleteNote('${n.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Salva ou atualiza uma nota
 */
async function saveNote() {
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        return alert("Preencha título e conteúdo!");
    }

    const { data: { user } } = await _supabase.auth.getUser();

    try {
        if (id) {
            // Modo Edição
            await _supabase.from('notes')
                .update({ title, content })
                .eq('id', id);
        } else {
            // Modo Novo
            await _supabase.from('notes')
                .insert([{ title, content, user_id: user.id }]);
        }

        resetForm();
        loadNotes();
    } catch (err) {
        alert("Erro ao salvar: " + err.message);
    }
}

/**
 * Prepara o formulário para edição (Busca no array local pelo ID)
 */
function prepareEdit(id) {
    const note = allNotes.find(n => n.id === id);
    if (!note) return;

    document.getElementById('note-id').value = note.id;
    document.getElementById('title').value = note.title;
    document.getElementById('content').value = note.content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reseta o formulário
 */
function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('btn-save').innerText = "Salvar Nota";
}

/**
 * Exclui uma nota
 */
async function deleteNote(id) {
    if (confirm("Deseja realmente excluir esta nota?")) {
        const { error } = await _supabase.from('notes').delete().eq('id', id);
        if (error) alert(error.message);
        else loadNotes();
    }
}

/**
 * Filtro de busca em tempo real
 */
function filterNotes() {
    const q = document.getElementById('search').value.toLowerCase();
    const filtered = allNotes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
    renderNotes(filtered);
}

/**
 * Exporta as notas visíveis para PDF
 */
function exportAllToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Notas - ERP ABP", 10, 20);
    doc.setFontSize(12);

    let y = 35;
    allNotes.forEach((n, i) => {
        if (y > 270) { doc.addPage(); y = 20; }
        
        doc.setFont(undefined, 'bold');
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        doc.setFont(undefined, 'normal');
        
        // Quebra automática de texto para o conteúdo
        const splitContent = doc.splitTextToSize(n.content, 180);
        doc.text(splitContent, 10, y + 7);
        
        y += (splitContent.length * 7) + 15;
    });

    doc.save("notas_exportadas.pdf");
}

// Inicializa o carregamento quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadNotes);
