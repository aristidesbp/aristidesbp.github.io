
/**
 * js/bloco_de_notas.js
 * Depende de: js/conexao.js (que fornece a variável _supabase)
 */

// FUNÇÃO DE LOGOUT ADICIONADA
async function logout() {
    await _supabase.auth.signOut();
    window.location.href = 'login.html';
}

// Armazena todas as notas carregadas localmente para busca rápida
let allNotes = [];

/**
 * Carrega as notas do banco (Iniciado automaticamente ao carregar a página)
 */
async function loadNotes() {
    // Busca todas as notas ordenadas pela data de criação
    const { data: notes, error } = await _supabase
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

/**
 * Renderiza as notas na tela (HTML dinâmico)
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
 * Salva ou atualiza uma nota (CRUD - Create/Update)
 */
async function saveNote() {
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        return alert("Preencha título e conteúdo!");
    }

    // Obtém o usuário logado através da conexão ativa
    const { data: { user } } = await _supabase.auth.getUser();

    if (id) {
        // Modo Edição (Update)
        await _supabase.from('notes')
            .update({ title, content })
            .eq('id', id);
    } else {
        // Modo Novo (Insert)
        await _supabase.from('notes')
            .insert([{ title, content, user_id: user.id }]);
    }

    resetForm();
    loadNotes();
}

/**
 * Prepara o formulário para edição (Preenche os campos)
 */
function prepareEdit(id, title, content) {
    document.getElementById('note-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reseta o formulário para o estado original
 */
function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('btn-save').innerText = "Salvar Nota";
}

/**
 * Exclui uma nota do banco (CRUD - Delete)
 */
async function deleteNote(id) {
    if (confirm("Deseja excluir esta nota?")) {
        await _supabase.from('notes').delete().eq('id', id);
        loadNotes();
    }
}

/**
 * Filtra as notas carregadas pelo texto digitado na pesquisa
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
 * Exporta todas as notas presentes na lista para um arquivo PDF
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

/**
 * Inicializa os dados assim que o documento estiver pronto
 * A trava de segurança já foi executada no conexao.js
 */
document.addEventListener('DOMContentLoaded', loadNotes);


