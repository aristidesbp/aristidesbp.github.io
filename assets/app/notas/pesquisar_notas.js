function filterNotes() {
    const q = document.getElementById('search').value.toLowerCase();

    // Utiliza a variável allNotes que é global por estar no listar_notas.js
    const filtered = allNotes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );

    renderNotes(filtered);
}
