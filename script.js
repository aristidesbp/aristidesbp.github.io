// Espera o DOM ser carregado para iniciar os eventos
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o botão de confetti
    const confettiButton = document.getElementById('confettiButton');
    const container = document.querySelector('.container');

    // Carrega o som de confete ou clique
    const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/6418'); // Som de clique

    // Adiciona o evento de clique ao botão
    confettiButton.addEventListener("click", () => {
        // Reproduz o som quando o botão é clicado
        audio.play();

        // Animação de confete ao clicar
        confetti({
            particleCount: 100, /* Número de partículas de confete */
            spread: 70, /* Espalhamento das partículas */
            origin: { y: 0.6 } /* Posição de origem */
        });

        // Adiciona a classe de fade-out para desaparecer gradualmente
        container.classList.add('fade-out');

        // Após 1 segundo, redireciona para a página home.html
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000); // Espera 1 segundo antes de redirecionar
    });
});
