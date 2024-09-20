/* Script para animação do card e confete */

// Função executada quando a página é carregada
window.onload = function() {
  const card = document.getElementById('aboutCard'); // Seleciona o card pelo ID
  card.classList.add('visible'); // Adiciona a classe 'visible' para iniciar a animação
};

// Adiciona um evento de clique ao botão de confete
document.getElementById('confettiButton').onclick = function() {
  const button = this; // Referência ao botão clicado
  const rect = button.getBoundingClientRect(); // Obtém a posição do botão na tela

  // Configuração do disparo de confete
  const count = 200; // Número de partículas de confete
  const spread = 70; // Distância de espalhamento
  const startX = rect.left + rect.width / 2; // Define a posição inicial X (horizontal) do confete
  const startY = rect.top + rect.height; // Define a posição inicial Y (vertical) do confete

  // Laço para disparar confetes em várias direções
  for (let i = 0; i < count; i++) {
    const x = Math.random() * spread - spread / 2 + startX; // Calcula a posição X aleatória do confete
    const y = Math.random() * spread - spread / 2 + startY; // Calcula a posição Y aleatória do confete
    confetti({
      particleCount: 1, // Número de partículas disparadas por vez
      startVelocity: 30, // Velocidade inicial do confete
      spread: 360, // Direção de espalhamento do confete (em graus)
      origin: {
        x: x / window.innerWidth, // Posição X inicial relativa à largura da tela
        y: y / window.innerHeight // Posição Y inicial relativa à altura da tela
      }
    });
  }

  // Reproduz o som do confete quando o botão é clicado
  document.getElementById('confettiSound').play();

  // Redireciona para a página "home.html" após um pequeno atraso
  setTimeout(function() {
    window.location.href = "home.html"; // Atraso de 3 segundos para visualizar a animação
  }, 3000);
};

/* fim do Script para animação do card e confete */

document.getElementById('confettiButton').onclick = function() {
  const button = this; // Referência ao botão clicado
  const rect = button.getBoundingClientRect(); // Obtém a posição do botão na tela

  // (Código para o confete permanece inalterado)

  // Reproduz o som do confete quando o botão é clicado
  document.getElementById('confettiSound').play();

  // Adiciona a classe de animação à body ou container principal
  document.body.classList.add('shrink-and-move'); // Adiciona a classe para a animação

  // Redireciona para a página "home.html" após a animação
  setTimeout(function() {
    window.location.href = "home.html"; // Atraso de 3 segundos para visualizar a animação
  }, 500); // Atraso igual à duração da animação
};

document.getElementById('confettiButton').onclick = function() {
  const button = this; // Referência ao botão clicado
  const rect = button.getBoundingClientRect(); // Obtém a posição do botão na tela

  // (Código para o confete permanece inalterado)

  // Reproduz o som do confete quando o botão é clicado
  document.getElementById('confettiSound').play();

  // Adiciona a classe de animação à body ou container principal
  document.body.classList.add('shrink-and-move'); // Adiciona a classe para a animação

  // Redireciona para a página "home.html" após a animação
  setTimeout(function() {
    window.location.href = "home.html"; // Atraso de 3 segundos para visualizar a animação
  }, 500); // Atraso igual à duração da animação
};
