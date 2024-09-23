// Perguntar quantos jogadores
let numPlayers = parseInt(prompt("Quantos jogadores irão participar?"));
// Valida a entrada do número de jogadores, garantindo que seja um número válido e maior que 0
while (isNaN(numPlayers) || numPlayers <= 0) {
    numPlayers = parseInt(prompt("Insira um número válido de jogadores."));
}

// Inicializando variáveis
let players = []; // Array para armazenar os jogadores (não utilizado no código atual)
let scores = new Array(numPlayers).fill(0); // Array para armazenar as pontuações de cada jogador, iniciando com 0
let currentPlayer = 0; // Variável para controlar o jogador atual
let gameEnded = false; // Variável que verifica se o jogo terminou

// Definir o jogador atual no início do jogo, exibindo o número do jogador atual na interface
document.getElementById("currentPlayer").innerText = currentPlayer + 1;

// Gerador de desafios estilo Jumanji
const challenges = [
    "Macacos estão te rondando! Emita um leão para assustá-los.",
    "Você encontrou um rio! Pule três vezes para atravessar.",
    "Um leão se aproxima! Finja que está dormindo para escapar.",
    "Serpentes cruzam seu caminho! Dê um passo para trás e avance novamente.",
    "Um tigre está te perseguindo! Corra até a próxima sala e volte.",
    "A selva está escura! Feche os olhos por 10 segundos para ajustar sua visão.",
    "Os tambores estão batendo! Bata na mesa três vezes."
];

// Função para rolar os dados
function rollDice() {
    // Se o jogo já terminou, a função é encerrada
    if (gameEnded) return;
    
    // Gerar valores aleatórios para os dois dados (entre 1 e 6)
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // Exibir os resultados dos dados na interface
    document.getElementById("dice1").innerText = dice1;
    document.getElementById("dice2").innerText = dice2;

    // Somar os pontos dos dois dados
    let totalPoints = dice1 + dice2;
    // Adicionar os pontos à pontuação do jogador atual
    scores[currentPlayer] += totalPoints;
    
    // Exibir um desafio aleatório da lista de desafios
    document.getElementById("gameMessage").innerText = challenges[Math.floor(Math.random() * challenges.length)];
    
    // Atualizar o placar com as novas pontuações
    updateScoreboard();
    
    // Verificar se o jogador atual alcançou ou ultrapassou 300 pontos, o que finaliza o jogo
    if (scores[currentPlayer] >= 300) {
        endGame(); // Finaliza o jogo
    } else {
        // Alterna para o próximo jogador (em loop, de 0 até numPlayers - 1)
        currentPlayer = (currentPlayer + 1) % numPlayers;
        // Atualiza o número do jogador atual na interface
        document.getElementById("currentPlayer").innerText = currentPlayer + 1;
    }
}

// Função para atualizar o placar na tela
function updateScoreboard() {
    let scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = ""; // Limpar o placar antes de adicionar os novos valores
    for (let i = 0; i < numPlayers; i++) {
        // Adiciona as pontuações de cada jogador na tela
        scoreboard.innerHTML += `<p>Jogador ${i + 1}: ${scores[i]} pontos</p>`;
    }
}

// Função para terminar o jogo quando algum jogador alcança 300 pontos
function endGame() {
    gameEnded = true; // Marcar o jogo como terminado
    // Exibir a mensagem de vitória do jogador atual
    document.getElementById("winner").innerText = `Jogador ${currentPlayer + 1} venceu! JUMANJI!`;
    // Desabilitar o botão de rolar os dados
    document.getElementById("rollDiceBtn").disabled = true;
}

// Adicionar o evento de clique ao botão de rolar os dados
document.getElementById("rollDiceBtn").addEventListener("click", rollDice);
