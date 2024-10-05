// index.js

// Ao carregar a página, exibe uma mensagem no console
document.addEventListener("DOMContentLoaded", function() {
    console.log("Página carregada com sucesso!");
    
    // Selecionar todos os elementos card para adicionar um evento ao clicar
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            alert(`Você clicou no card: ${card.querySelector('h3').textContent}`);
        });
    });
});
