// Script para animação de confete ao clicar no botão (exemplo de interação dinâmica)
document.getElementById('confettiButton').addEventListener('click', function() {
    // Animação de confete
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Reproduz o som do confete
    var audio = document.getElementById('confettiSound');
    audio.play();

    // Redireciona para a página "home.html" após um pequeno atraso
    setTimeout(function() {
        window.location.href = "home.html";
    }, 3000); // Atraso de 3 segundos para visualizar a animação
});

// Exemplo de animação de fade-in para elementos da página
window.onload = function() {
    const card = document.getElementById('aboutCard'); // Seleciona o card pelo ID
    card.classList.add('visible'); // Adiciona a classe 'visible' para iniciar a animação
};

/* Estilo do código e do botão de copiar */
pre {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    white-space: pre-wrap;
}

button {
    margin-top: 10px;
}

/* Resto dos estilos permanecem iguais */
