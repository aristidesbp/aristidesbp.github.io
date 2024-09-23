// Perguntar quantos jogadores
let numPlayers = parseInt(prompt("Quantos jogadores irão participar?"));
while (isNaN(numPlayers) || numPlayers <= 0) {
    numPlayers = parseInt(prompt("Insira um número válido de jogadores."));
}

// Inicializando variáveis
let players = [];
let scores = new Array(numPlayers).fill(100); // Jogadores começam com 100 pontos
let currentPlayer = 0;
let gameEnded = false;

// Definir o jogador atual no início do jogo
document.getElementById("currentPlayer").innerText = currentPlayer + 1;

// Gerador de desafios estilo Jumanji
const challenges = [
    // Prendas
    "Macacos estão te rondando! Emita um leão para assustá-los.",
    "Você encontrou um rio! Pule três vezes para atravessar.",
    "Um leão se aproxima! Finja que está dormindo para escapar.",
    "Serpentes cruzam seu caminho! Dê um passo para trás e avance novamente.",
    "Um tigre está te perseguindo! Corra até a próxima sala e volte.",
    "A selva está escura! Feche os olhos por 10 segundos para ajustar sua visão.",
    "Os tambores estão batendo! Bata na mesa três vezes.",
    "Você precisa beber um copo d'água!",
    "Fique de uma perna só até o próximo turno!",
    "Você está congelado até o próximo turno!",
    "Sua mão está amarrada acima da cabeça!",
    "Sua boca está dormente, fique com a língua para fora até achar um antídoto.",
    
    // Desafios adicionais
    "Você encontrou um antídoto! Elimine uma penalidade.",
    "Você encontrou um atalho! Avance 20 pontos.",
    "Você achou uma armadilha! Perde 10 pontos.",
    
    // Itens para atrapalhar outros jogadores
    "Você achou uma poção envenenada! Escolha um jogador para perder 20 pontos.",
    "Você encontrou um laço! Escolha um jogador para pular o próximo turno.",
    "Você encontrou uma maldição! Escolha um jogador para perder 10 pontos e ficar parado até o próximo turno."
];

// Função para rolar os dados
function rollDice() {
    if (gameEnded) return;
    
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice1").innerText = dice1;
    document.getElementById("dice2").innerText = dice2;

    // Somar pontos
    let totalPoints = dice1 + dice2;
    scores[currentPlayer] += totalPoints;

    // Sorteia um desafio ou item
    let challenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById("gameMessage").innerText = challenge;

    // Se o desafio envolve penalizar outro jogador
    if (challenge.includes("Escolha um jogador")) {
        penalizeOtherPlayer(challenge);
    }
    
    updateScoreboard();
    
    if (scores[currentPlayer] >= 300) {
        endGame();
    } else {
        // Alternar para o próximo jogador
        currentPlayer = (currentPlayer + 1) % numPlayers;
        document.getElementById("currentPlayer").innerText = currentPlayer + 1;
    }
}

// Penalizar outro jogador
function penalizeOtherPlayer(challenge) {
    let playerToPenalize = parseInt(prompt(`Qual jogador você deseja penalizar? (1 a ${numPlayers})`)) - 1;
    while (isNaN(playerToPenalize) || playerToPenalize < 0 || playerToPenalize >= numPlayers) {
        playerToPenalize = parseInt(prompt(`Insira um número válido de jogador para penalizar. (1 a ${numPlayers})`)) - 1;
    }

    if (challenge.includes("perder 20 pontos")) {
        scores[playerToPenalize] -= 20;
    } else if (challenge.includes("pular o próximo turno")) {
        // Implementar lógica para pular o turno do jogador
        alert(`Jogador ${playerToPenalize + 1} perderá o próximo turno!`);
    } else if (challenge.includes("perder 10 pontos")) {
        scores[playerToPenalize] -= 10;
    }
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
    document.getElementById("winner").innerText = `Jogador ${currentPlayer + 1} venceu! JUMANJI!`;
    document.getElementById("rollDiceBtn").disabled = true;
}

// Evento de rolar dados
document.getElementById("rollDiceBtn").addEventListener("click", rollDice);
