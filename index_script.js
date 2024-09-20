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
