// Perguntar quantos jogadores
let numPlayers = parseInt(prompt("Quantos jogadores irão participar?"));
while (isNaN(numPlayers) || numPlayers <= 0) {
    numPlayers = parseInt(prompt("Insira um número válido de jogadores."));
}

// Inicializando variáveis
let players = [];
let scores = new Array(numPlayers).fill(100); // Cada jogador começa com 100 pontos
let penalizedPlayers = new Array(numPlayers).fill(false); // Penalização de jogadores
let currentPlayer = 0;
let gameEnded = false;

// Atualizar o jogador atual no início do jogo
document.getElementById("currentPlayer").innerText = currentPlayer + 1;

// Gerador de prendas com rimas
const challenges = [
    "Macacos ao redor começam a bramar, imite um leão para os assustar!",
    "Um rio apareceu à sua frente, pule três vezes para passar de repente!",
    "Um leão está te encarando, finja dormir para ele ir se afastando.",
    "Cuidado com a cobra que vem rastejando, dê um passo para trás e siga avançando.",
    "Um tigre te persegue com muita pressão, corra até a sala e volte sem hesitação.",
    "A selva está escura e cheia de tensão, feche os olhos por 10 segundos em concentração.",
    "Os tambores soam alto e batem sem parar, bata na mesa três vezes para ajudar!"
];

// Itens de ajuda e de punição
const items = [
    "Você encontrou um antídoto! Agora está imune à próxima prenda.",
    "Você pode pular o próximo turno e descansar!",
    "Você precisa beber um copo d'água e o próximo jogador perde a vez!",
    "Fique congelado no lugar, até que outro jogador rolar!",
    "Sua boca está dormente, com a língua de fora fique até a próxima volta ardente!",
    "Com sua mão amarrada, até o próximo turno ela estará levantada!",
    "Escolha um jogador para penalizar, ele perderá a vez sem reclamar!"
];

// Função para tocar o som de tambor
function playDrumSound() {
    const drumSound = document.getElementById("drumSound");
    drumSound.play();
}

// Função para rolar os dados
function rollDice() {
    if (gameEnded || penalizedPlayers[currentPlayer]) {
        penalizedPlayers[currentPlayer] = false; // Reseta penalização após pular a vez
        nextPlayer();
        return;
    }
    
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice1").innerText = dice1;
    document.getElementById("dice2").innerText = dice2;

    // Somar pontos
    let totalPoints = dice1 + dice2;
    scores[currentPlayer] += totalPoints;

    // Tocar som de tambor antes da prenda aparecer
    playDrumSound();

    // Desafio ou item
    let event = Math.random() < 0.7 ? challenges[Math.floor(Math.random() * challenges.length)] : items[Math.floor(Math.random() * items.length)];

    // Se o evento penalizar outro jogador
    if (event.includes("Escolha um jogador")) {
        let penalizedPlayer = parseInt(prompt("Escolha o número do jogador que será penalizado (1 a " + numPlayers + "):")) - 1;
        if (!isNaN(penalizedPlayer) && penalizedPlayer >= 0 && penalizedPlayer < numPlayers) {
            penalizedPlayers[penalizedPlayer] = true; // Penaliza o jogador selecionado
        }
    }

    document.getElementById("gameMessage").innerText = event;
    updateScoreboard();
    
    if (scores[currentPlayer] >= 300) {
        endGame();
    } else {
        nextPlayer();
    }
}

// Alternar para o próximo jogador
function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % numPlayers;
    document.getElementById("currentPlayer").innerText = currentPlayer + 1;
}

// Atualizar o placar
function updateScoreboard() {
    let scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";
    for (let i = 0; i < numPlayers; i++) {
        scoreboard.innerHTML += `<p>Jogador ${i + 1}: ${scores[i]} pontos</p>`;
    }
}

// Terminar o jogo
function endGame() {
    gameEnded = true;
    document.getElementById("winner").innerText = `Jogador ${currentPlayer + 1} venceu!`;
}

// Evento de rolar dados
document.getElementById("rollDiceBtn").addEventListener("click", rollDice);
