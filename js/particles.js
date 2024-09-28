document.addEventListener("DOMContentLoaded", function () {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles');
    
    // Criar múltiplas partículas
    for (let i = 0; i < 100; i++) { // Número de partículas
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Definir tamanho aleatório
        const size = Math.random() * 6 + 3; // Tamanhos entre 3px e 9px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`; // Posição aleatória em X

        // Definir duração e atraso aleatórios para a animação
        const duration = Math.random() * 5 + 5; // Duração entre 5s e 10s
        const delay = Math.random() * 5; // Atraso entre 0s e 5s
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    document.getElementById('particles').appendChild(particlesContainer);
});
