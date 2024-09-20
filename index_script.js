// Script para animação do card
window.onload = function() {
  const card = document.getElementById('aboutCard'); // Seleciona o card pelo ID
  card.classList.add('visible'); // Adiciona a classe 'visible' para iniciar a animação
};

// Script para disparo de confete e animação de encolhimento da página
document.getElementById('confettiButton').onclick = function() {
  const button = this; // Referência ao botão clicado
  const rect = button.getBoundingClientRect(); // Obtém a posição do botão na tela

  // Configuração do disparo de confete
  const count = 200; // Número de partículas de confete
  const spread = 70; // Distância de espalhamento
  const startX = rect.left + rect.width / 2; // Define a posição inicial X (horizontal) do confete
  const startY = rect.top + rect.height; // Define a posição inicial Y (vertical) do confete

  // Exibe confete
  for (let i = 0; i < count; i++) {
    const x = Math.random() * spread - spread / 2 + startX; // Posição X aleatória
    const y = Math.random() * spread - spread / 2 + startY; // Posição Y aleatória
    confetti({
      particleCount: 1, // Número de partículas por vez
      startVelocity: 30, // Velocidade inicial
      spread: 360, // Espalhamento do confete
      origin: {
        x: x / window.innerWidth, // Posição X relativa à tela
        y: y / window.innerHeight // Posição Y relativa à tela
      }
    });
  }

  // Reproduz o som do confete
  document.getElementById('confettiSound').play();

  // Atraso para exibir o confete antes da animação de encolhimento
  setTimeout(function() {
    // Adiciona a classe para iniciar a animação de encolhimento
    document.body.classList.add('shrink-and-move');

    // Redireciona após a animação de encolhimento
    setTimeout(function() {
      window.location.href = "home.html"; // Redireciona após 0.8s da animação
    }, 800); // Tempo da animação de encolhimento
  }, 2000); // Atraso de 2 segundos para exibir o confete antes da animação
};
