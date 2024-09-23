// Função para criar partículas no background
const numParticles = 4; // Número de partículas
const particlesContainer = document.querySelector('.particles'); // Seleciona o container de partículas

// Cria as partículas dinamicamente
for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div'); // Cria um novo div para a partícula
    particle.classList.add('particle'); // Adiciona a classe de partícula
    particlesContainer.appendChild(particle); // Adiciona a partícula ao container
}
