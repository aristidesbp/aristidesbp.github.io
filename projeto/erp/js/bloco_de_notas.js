// URL do Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';

// Chave pública
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Criação do cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Armazena todas as notas carregadas
let allNotes = [];

/**
 * Verifica se o usuário está autenticado
 */
async function checkUser() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        window.location.href = '../login.html';
    }

    loadNotes();
}

/**
 * Carrega as notas do banco
 */
async function loadNotes() {
    const { data: notes } = await _supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

    allNotes = notes || [];
    renderNotes(allNotes);
}

/**
 * Renderiza as notas na tela
 */
function renderNotes(notes) {
    document.getElementById('notes-list').innerHTML =
        notes.map(n => `
            <div class="note">
                <div class="note-content">
                    <strong>${n.title}</strong>
                    <p>${n.content}</p>
                </div>
                <div class="actions">
                    <button style="background:#f1c40f"
                        onclick="prepareEdit('${n.id}', \`${n.title}\`, \`${n.content}\`)">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button style="background:#e74c3c"
                        onclick="deleteNote('${n.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('') ||
        '<p style="text-align:center;color:#94a3b8;margin-top:20px;">Nenhuma nota encontrada.</p>';
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

    if (id) {
        await _supabase.from('notes')
            .update({ title, content })
            .eq('id', id);
    } else {
        await _supabase.from('notes')
            .insert([{ title, content, user_id: user.id }]);
    }

    resetForm();
    loadNotes();
}

/**
 * Prepara edição da nota
 */
function prepareEdit(id, title, content) {
    document.getElementById('note-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reseta formulário
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
    if (confirm("Deseja excluir esta nota?")) {
        await _supabase.from('notes').delete().eq('id', id);
        loadNotes();
    }
}

/**
 * Filtra notas pelo texto digitado
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
 * Exporta todas as notas para PDF
 */
async function exportAllToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Meu Bloco de Notas - ERP ABP", 10, 10);

    let y = 20;

    allNotes.forEach((n, i) => {
        doc.setFont(undefined, 'bold');
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        doc.setFont(undefined, 'normal');
        doc.text(n.content, 10, y + 7);
        y += 25;
    });

    doc.save("minhas-notas.pdf");
}

// Inicia verificação de usuário
checkUser();