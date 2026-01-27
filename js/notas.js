(async () => {
    let allNotes = [];

    window.loadNotes = async function() {
        const { data, error } = await _supabase.from('notes').select('*').order('created_at', { ascending: false });
        if (!error) {
            allNotes = data;
            renderNotes(data);
        }
    };

    function renderNotes(notes) {
        const list = document.getElementById('notesList');
        list.innerHTML = notes.map(n => `
            <div class="card">
                <h4 style="margin:0">${n.title}</h4>
                <p style="font-size:0.9rem; color:#666">${n.content}</p>
                <button class="btn btn-danger" onclick="deleteNote('${n.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    window.saveNote = async function() {
        const title = document.getElementById('noteTitle').value;
        const content = document.getElementById('noteContent').value;
        if (!title || !content) return alert("Preencha tudo");
        
        await _supabase.from('notes').insert([{ title, content }]);
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        loadNotes();
    };

    window.deleteNote = async function(id) {
        if (confirm("Excluir nota?")) {
            await _supabase.from('notes').delete().eq('id', id);
            loadNotes();
        }
    };

    window.filterNotes = function() {
        const q = document.getElementById('search').value.toLowerCase();
        renderNotes(allNotes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
    };

    window.exportAllToPDF = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Relatório de Notas - ERP ABP", 10, 20);
        let y = 30;
        allNotes.forEach(n => {
            doc.text(`${n.title}: ${n.content}`, 10, y);
            y += 10;
        });
        doc.save("notas.pdf");
    };

    document.addEventListener('DOMContentLoaded', loadNotes);
})();
