// player.js

// Obtém os elementos dos players
const audioElement = document.getElementById('audioElement');
const videoElement = document.getElementById('videoElement');

// FUNÇÃO: Reproduzir uma música específica
function playMusic(src) {
  audioElement.src = src; // Define a fonte do áudio
  audioElement.play();    // Inicia reprodução
  videoElement.pause();   // Garante que vídeo pare ao iniciar música
}

// FUNÇÃO: Reproduzir um vídeo específico
function playVideo(src) {
  videoElement.src = src; // Define a fonte do vídeo
  videoElement.play();    // Inicia reprodução
  audioElement.pause();   // Garante que música pare ao iniciar vídeo
}

// FUNÇÃO: Filtro de músicas baseado no texto digitado
document.getElementById('searchMusic').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase(); // Texto em minúsculo
  const musicItems = document.querySelectorAll('#musicList li');

  musicItems.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(searchTerm) ? 'flex' : 'none';
  });
});

// FUNÇÃO: Filtro de vídeos baseado no texto digitado
document.getElementById('searchVideo').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase(); // Texto em minúsculo
  const videoItems = document.querySelectorAll('#videoList li');

  videoItems.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(searchTerm) ? 'flex' : 'none';
  });
});

// Mantém a reprodução ao minimizar a aba
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (!audioElement.paused) audioElement.play();
    if (!videoElement.paused) videoElement.play();
  }
});
