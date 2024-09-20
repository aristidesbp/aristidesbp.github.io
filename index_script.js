/* Script para animação do card e confete */
    window.onload = function() {
      const card = document.getElementById('aboutCard'); // Seleciona o card pelo ID
      card.classList.add('visible'); // Adiciona a classe 'visible' para iniciar a animação
    };

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
    };
/* fim do Script para animação do card e confete */








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
