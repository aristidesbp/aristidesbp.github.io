// Lógica de controle
async function handleDeleteSelected() {
    const ids = viewUtils.getSelectedIds(); // Pede IDs para a View
    
    if (confirm(`Excluir ${ids.length} itens?`)) {
        try {
            await entidadeModel.excluirMuitos(ids); // Chama o Model
            alert("Sucesso!");
            initEntidades(); // Manda recarregar
        } catch (err) {
            console.error(err);
        }
    }
}

