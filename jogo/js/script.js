// Perguntar quantos jogadores
let numPlayers = parseInt(prompt("Quantos jogadores irão participar?"));
while (isNaN(numPlayers) || numPlayers <= 0) {
    numPlayers = parseInt(prompt("Insira um número válido de jogadores."));
}

// Perguntar a pontuação necessária para ganhar
let winningScore = parseInt(prompt("Quantos pontos um jogador deve alcançar para ganhar?"));
while (isNaN(winningScore) || winningScore <= 0) {
    winningScore = parseInt(prompt("Insira um número válido de pontos para ganhar."));
}

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
    "Um leão se aproxima! Finjir que dormindo está, até a próxima rodada se quiser escapar.",
    "Serpentes cruzam seu caminho! picada venenoza levara, e com a língua para fora até a próxima rodada ficará!",
    "Um tigre está te perseguindo! Corra para longe e volte sorrindo!",
    "A selva escura está! De olhos fechados até a próxima rodada você deve ficar.",
    "Os tambores estão batendo! Suba em um lugar correndo!",
    "Um hipopótamo está vindo para cá! Então congelado você deve ficar!"
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
    
    if (scores[currentPlayer] >= winningScore) {
        showFinalChallenge();
    } else {
        // Alternar para o próximo jogador
        currentPlayer = (currentPlayer + 1) % numPlayers;
        document.getElementById("currentPlayer").innerText = currentPlayer + 1;
    }
}

// Mostrar o desafio final
function showFinalChallenge() {
    document.getElementById("gameMessage").innerText = "Após todos os pontos alcançar, para vencer o jogo seu nome deve gritar!";
    gameEnded = true; // Apenas para impedir rolagens futuras
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
    document.getElementById("winner").innerText = `Jogador ${currentPlayer + 1} venceu! JUMANJI!`;
    document.getElementById("rollDiceBtn").disabled = true;
}

// Evento de rolar dados
document.getElementById("rollDiceBtn").addEventListener("click", rollDice);
