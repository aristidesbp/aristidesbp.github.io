// player.js

// Captura os elementos de áudio e vídeo pelo ID
const audioElement = document.getElementById('audioElement');  // Elemento <audio>
const videoElement = document.getElementById('videoElement');  // Elemento <video>

// Garante que o áudio continue tocando mesmo se o navegador mudar de aba
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    // Se a aba for minimizada, continua a reprodução
    if (!audioElement.paused) audioElement.play();
    if (!videoElement.paused) videoElement.play();
  }
});

// Tenta ativar autoplay após interação do usuário
window.addEventListener('click', () => {
  audioElement.play().catch(() => {}); // Tenta iniciar o áudio
  videoElement.play().catch(() => {}); // Tenta iniciar o vídeo
});
