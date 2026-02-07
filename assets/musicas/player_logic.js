// Liste aqui os nomes exatos dos arquivos que estão na pasta /musicas
const musicas = [
    "musica1.mp3",
    "musica2.mp3",
    "exemplo-track.mp3"
];

const playlistElement = document.getElementById('playlist');
const audioPlayer = document.getElementById('audio-player');
const trackName = document.getElementById('track-name');

// Função para carregar a playlist na tela
function carregarPlaylist() {
    musicas.forEach((musica, index) => {
        const li = document.createElement('li');
        li.textContent = musica.replace('.mp3', '').replace(/-/g, ' ');
        li.addEventListener('click', () => tocarMusica(index, li));
        playlistElement.appendChild(li);
    });
}

// Função para dar play
function tocarMusica(index, elemento) {
    // Atualiza a fonte do áudio
    audioPlayer.src = `musicas/${musicas[index]}`;
    trackName.textContent = musicas[index];
    
    // Destaca a música atual na lista
    document.querySelectorAll('.playlist li').forEach(el => el.classList.remove('active'));
    elemento.classList.add('active');

    audioPlayer.play();
}

// Inicializa a lista ao carregar a página
carregarPlaylist();
