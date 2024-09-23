// Função de animação do confete
function startConfetti() {
    // Obtém o som de confete
    const confettiSound = document.getElementById('confettiSound');
    // Reproduz o som
    confettiSound.play(); 

    // Duração da animação em milissegundos
    var duration = 5 * 1000; 
    // Tempo de término da animação
    var end = Date.now() + duration; 

    // Função anônima que cria o efeito de confete
    (function frame() {
        // Gera confetes na parte esquerda
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        // Gera confetes na parte direita
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        // Verifica se o tempo de animação ainda não terminou
        if (Date.now() < end) {
            // Chama a função repetidamente
            requestAnimationFrame(frame);
        }
    }());
}

// Ação do botão
document.getElementById('cta-btn').addEventListener('click', function(event) {
    // Previne o comportamento padrão do link
    event.preventDefault(); 
    // Inicia a animação do confete
    startConfetti(); 

    // Redireciona após 5 segundos
    setTimeout(function() {
        window.location.href = 'home.html'; 
    }, 5000);
});
