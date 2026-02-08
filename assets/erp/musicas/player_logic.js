// Liste aqui os nomes exatos dos arquivos que estão na pasta /musicas
const musicas = [
    "01.mp3",
    "02.mp3",
     "03.mp3",
    "04.mp3",
     "05.mp3",
    "06.mp3",
     "07.mp3",
    "08.mp3",
     "09.mp3",
    "10.mp3",
     "11.mp3",
    "12.mp3",
     "13.mp3",
    "14.mp3",
     "15.mp3",
    "16.mp3",
     "17.mp3",
    "18.mp3",
     "19.mp3",
       "20.mp3"
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
