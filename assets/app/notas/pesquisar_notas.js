/**
 * Nome do arquivo: pesquisar_notas.js
 */
function filterNotes() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();

    // Filtra sobre a variável global allNotes carregada no listar_notas.js
    const filtered = allNotes.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query)
    );

    renderNotes(filtered);
}
