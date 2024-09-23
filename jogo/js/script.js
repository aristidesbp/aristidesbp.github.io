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
let currentChallengeTurns = 0; // Controle de quantos turnos o jogador está com a prenda

// Atualizar o jogador atual no início do jogo
document.getElementById("currentPlayer").innerText = currentPlayer + 1;

// Gerador de prendas com rimas e introduções
const challenges = [
    {
        description: "Macacos ao redor começam a bramar, imite um leão para os assustar!",
        introduction: "A selva é perigosa e você está em apuros. Macacos te rodeiam, causando barulhos duros!"
    },
    {
        description: "Um rio apareceu à sua frente, pule três vezes para passar de repente!",
        introduction: "Cuidado com o rio que corta seu caminho, pule para escapar e continuar seu destino!"
    },
    {
        description: "Um leão está te encarando, finja dormir para ele ir se afastando.",
        introduction: "O rugido ecoa, o leão se aproxima. Apenas finja dormir e torça para que ele desista."
    },
    {
        description: "Cuidado com a cobra que vem rastejando, dê um passo para trás e siga avançando.",
        introduction: "A cobra rasteja, e você sente o perigo. Dê um passo para trás antes de seguir seu caminho."
    },
    {
        description: "Um tigre te persegue com muita pressão, corra até a sala e volte sem hesitação.",
        introduction: "Ouça o tigre se aproximar com destreza, corra para longe e retorne com certeza."
    },
    {
        description: "A selva está escura e cheia de tensão, feche os olhos por 10 segundos em concentração.",
        introduction: "A escuridão cai, e a tensão aumenta. Feche seus olhos e se concentre para aguentar!"
    }
];

// Itens de ajuda e de punição
const items = [
    {
        description: "Você encontrou um antídoto! Agora está imune à próxima prenda.",
        introduction: "Boa sorte! Você encontrou um antídoto mágico que te protegerá da próxima prenda."
    },
    {
        description: "Você pode pular o próximo turno e descansar!",
        introduction: "Você encontrou um refúgio tranquilo. Descanse e pule a próxima jogada sem risco!"
    },
    {
        description: "Você precisa beber um copo d'água e o próximo jogador perde a vez!",
        introduction: "A sede te pegou, mas o próximo jogador será penalizado enquanto você se hidrata."
    },
    {
        description: "Fique congelado no lugar, até que outro jogador rolar!",
        introduction: "O frio te paralisou! Fique parado até outro jogador rolar os dados para se soltar."
    },
    {
        description: "Escolha um jogador para penalizar, ele perderá a vez sem reclamar!",
        introduction: "Você tem um poder especial: escolha um jogador para penalizar e pular a jogada dele!"
    }
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

    if (currentChallengeTurns >= 2) {
        currentChallengeTurns = 0; // Limitar a prenda a no máximo 2 turnos
        document.getElementById("gameMessage").innerText = "";
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

    // Exibir introdução da prenda
    document.getElementById("gameMessage").innerText = event.introduction;

    // Aplicar a prenda no próximo turno
    setTimeout(() => {
        document.getElementById("gameMessage").innerText = event.description;

        if (event.description.includes("Escolha um jogador")) {
            let penalizedPlayer = parseInt(prompt("Escolha o número do jogador que será penalizado (1 a " + numPlayers + "):")) - 1;
            if (!isNaN(penalizedPlayer) && penalizedPlayer >= 0 && penalizedPlayer < numPlayers) {
                penalizedPlayers[penalizedPlayer] = true; // Penaliza o jogador selecionado
            }
        }

        updateScoreboard();
    }, 2000);

    // Controlar quantos turnos o desafio dura
    currentChallengeTurns++;

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
