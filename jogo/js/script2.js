// Perguntar quantos jogadores
let numPlayers = parseInt(prompt("Quantos jogadores irão participar?"));
while (isNaN(numPlayers) || numPlayers <= 0) {
    numPlayers = parseInt(prompt("Insira um número válido de jogadores."));
}

// Perguntar quantos pontos são necessários para vencer
function askWinningScore() {
    let winningScore = parseInt(prompt("Quantos pontos um jogador deve alcançar para vencer o jogo?"));
    while (isNaN(winningScore) || winningScore <= 0) {
        winningScore = parseInt(prompt("Insira um número válido de pontos para vencer o jogo."));
    }
    return winningScore;
}

let winningScore = askWinningScore(); // Armazena a pontuação necessária para vencer

// Inicializando variáveis
let players = [];
let scores = new Array(numPlayers).fill(0);
let currentPlayer = 0;
let gameEnded = false;

// Definir o jogador atual no início do jogo
document.getElementById("currentPlayer").innerText = currentPlayer + 1;

// Gerador de desafios estilo Jumanji
const challenges = [
    "Macacos estão te rondando! Emita um leão para assustá-los.",
    "Você encontrou um rio! Pule três vezes para atravessar.",
    "Um leão se aproxima! Finja que está dormindo até a próxima rodada para escapar.",
    "Serpentes cruzam seu caminho! Com a língua para fora, você deve ficar até a próxima rodada!",
    "Um tigre está te perseguindo! Corra ao redor e sorria para ele.",
    "A selva escura está! Com os olhos fechados até a próxima rodada você deve ficar.",
    "Os tambores estão batendo! Suba em um lugar correndo!",
    "Um hipopótamo está vindo! Então congelado você deve ficar!"
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
    document.getElementById("gameMessage").innerText = challenges[Math.floor(Math.random() * challenges.length)];
    
    updateScoreboard();
    
    // Verifica se o jogador atingiu a pontuação de vitória
    if (scores[currentPlayer] >= winningScore) {
        endGame();
    } else {
        // Alternar para o próximo jogador
        currentPlayer = (currentPlayer + 1) % numPlayers;
        document.getElementById("currentPlayer").innerText = currentPlayer + 1;
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
