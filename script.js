// Função de animação do confete
function startConfetti() {
    const confettiSound = document.getElementById('confettiSound'); // Obtém o som de confete
    confettiSound.play(); // Reproduz o som

    var duration = 5 * 1000; // Duração da animação
    var end = Date.now() + duration; // Tempo de término

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame); // Chama a função repetidamente
        }
    }());
}

// Ação do botão
document.getElementById('cta-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    startConfetti(); // Inicia a animação do confete

    setTimeout(function() {
        window.location.href = 'home.html'; // Redireciona após 5 segundos
    }, 5000);
});
