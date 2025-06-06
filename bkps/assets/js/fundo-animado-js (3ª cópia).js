/* 
Arquivo: script.js
Descrição: Cria partículas animadas flutuando no fundo da página.
*/

const canvas = document.getElementById("canvasFundo");  // Seleciona o canvas
const ctx = canvas.getContext("2d");                    // Obtém o contexto de desenho 2D

canvas.width = window.innerWidth;                       // Define largura igual à janela
canvas.height = window.innerHeight;                     // Define altura igual à janela

// Atualiza o tamanho do canvas quando a janela for redimensionada
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Classe que representa uma partícula
class Particula {
  constructor() {
    this.x = Math.random() * canvas.width;             // Posição horizontal aleatória
    this.y = Math.random() * canvas.height;            // Posição vertical aleatória
    this.raio = Math.random() * 2 + 1;                 // Raio aleatório entre 1 e 3
    this.velX = (Math.random() - 0.5) * 1;             // Velocidade horizontal
    this.velY = (Math.random() - 0.5) * 1;             // Velocidade vertical
  }

  // Método que desenha a partícula
  desenhar() {
    ctx.beginPath();                                   // Começa um novo caminho
    ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2); // Desenha um círculo
    ctx.fillStyle = "white";                           // Cor branca para a partícula
    ctx.fill();                                        // Preenche o círculo
  }

  // Atualiza a posição da partícula
  atualizar() {
    this.x += this.velX;
    this.y += this.velY;

    // Reposiciona a partícula se sair da tela
    if (this.x < 0 || this.x > canvas.width) this.velX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.velY *= -1;

    this.desenhar();                                   // Chama o método para desenhar
  }
}

const particulas = [];                                  // Lista de partículas

// Cria 100 partículas
for (let i = 0; i < 100; i++) {
  particulas.push(new Particula());
}

// Função que anima o canvas
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);     // Limpa o canvas a cada frame
  particulas.forEach(p => p.atualizar());               // Atualiza todas as partículas
  requestAnimationFrame(animar);                        // Chama recursivamente a função de animação
}

animar();  // Inicia a animação

