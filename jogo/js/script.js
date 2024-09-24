// Perguntar quantos jogadores
let numPlayers = parseInt(prompt("Quantos jogadores irão participar?"));
while (isNaN(numPlayers) || numPlayers <= 0) {
    numPlayers = parseInt(prompt("Insira um número válido de jogadores."));
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
    "Um leão se aproxima! Finjir que  dormindo está, ate a proxima rodada se quizer escapar para escapar.",
    "Serpentes cruzam seu caminho! picada venenoza levara, e com a linga para fora ate a proma rodada ficara!",
    "Um tigre está te perseguindo! Corra para longi e voute sorinndo!",
    "A selva escura está ! de olhos pfeichados ate a proxima rodad vc deve ficar",
    "Os tambores estão batendo! suba em um lugar correndo!."
    "um hipootamo esta vindo para ca ! entao congelado voce deve ficar"
    "Macacos ao redor começam a bramar, imite um leão para os assustar!",
    "Um rio apareceu à sua frente, pule três vezes para passar de repente!",
    "Um leão está te encarando, finja dormir para ele ir se afastando.",
    "Cuidado com a cobra que vem rastejando, dê um passo para trás e siga avançando.",
    "Um tigre te persegue com muita pressão, corra até a sala e volte sem hesitação.",
    "A selva está escura e cheia de tensão, feche os olhos por 10 segundos em concentração.",
    "Os tambores soam alto e batem sem parar, bata na mesa três vezes para ajudar!"
"O vento sopra forte e o céu começa a escurecer, corra para a esquerda se quiser se proteger!"
"Um jacaré se esconde entre as árvores ao redor, pule duas vezes ou será o próximo jantar!"
"Um elefante gigante está vindo devagar, dê três passos para trás e tente escapar!"
"Um gorila bate o peito e ruge com furor, grite mais alto se quiser mostrar valor!"
"Uma aranha gigante desce da árvore acima, agache-se rápido ou ela te leva na sua teia nova!"
"O chão treme sob seus pés, salte três vezes ou fique preso de vez!"
"Um enxame de abelhas vem em sua direção, corra em círculos ou prepare-se para a picada com emoção!"
"O sol está se pondo e a noite vai chegar, feche os olhos por cinco segundos para a escuridão não te assustar!"
"Uma águia gigante está sobrevoando, deite-se no chão e fique se escondendo!"
"Relâmpagos cruzam o céu, levante os braços e finja ser um carrossel!"
"As ondas do rio estão fortes e violentas, dance no lugar ou as correntes serão cruéis e lentas!"
"Uma manada de búfalos está vindo por aí, deite-se rápido ou vai se ferir!"
"Uma cobra venenosa rasteja pelo chão, pule três vezes em pura emoção!"
"Um tigre faminto surge sem avisar, rode a mesa se não quiser ficar!"
"O chão virou areia movediça de repente, fique em um pé só e seja inteligente!"
"Um trovão ressoa forte, esconda-se debaixo da mesa sem suporte!"
"O vento começa a uivar sem parar, feche os olhos e conte até cinco para a tempestade passar!"
"As raízes da selva se movem como tentáculos, pule de um lado para o outro como um espetáculo!"
"Um caçador astuto está em sua trilha, rasteje no chão e saia da armadilha!"
"Os pássaros da selva começaram a atacar, levante os braços e comece a balançar!"
"Uma chuva forte começa a cair, use a cadeira como guarda-chuva para não desistir!"
"O chão está cheio de formigas de fogo, suba no sofá ou enfrente o jogo!"
"O rugido de um leão está cada vez mais perto, cubra-se com uma manta ou ficará desperto!"
"Uma águia mergulha do céu com precisão, agache-se rápido ou será sua próxima refeição!"
"O rugido das feras ecoa pelo ar, suba em uma cadeira para poder escapar!"
"Um urso gigante surge do matagal, esconda-se atrás da porta como um sinal!"
"As serpentes se enrolam ao redor de seus pés, levante a perna rápido ou elas vão apertar de vez!"
"O som dos tambores fica mais forte, pule para o lado e escolha seu norte!"
"Um hipopótamo está no lago se banhando, ande devagar para não acabar nadando!"
"Os morcegos da caverna começam a sair, corra em círculo antes que te façam cair!"
"O chão virou gelo, escorregadio e traiçoeiro, fique em um pé só ou caia primeiro!"
"Um rinoceronte carrega com fúria e precisão, corra três passos para evitar a colisão!"
"A névoa densa encobre sua visão, caminhe devagar e toque o chão!"
"Um crocodilo aparece ao lado, segure sua respiração e fique parado!"
"Os macacos começam a jogar pedras para atacar, use uma almofada para te defender e lutar!"
"A ponte suspensa começa a balançar, segure-se nas costas de alguém para não desabar!"
"Uma tribo perdida grita no escuro, finja ser uma árvore e mantenha o vulto!"
"Um furacão começa a soprar forte, abra os braços e gire para escolher sua sorte!"
"Um peixe gigante salta do rio, dê três passos para trás ou será seu desvio!"
"A floresta ao redor começa a se fechar, abra os braços e empurre para o caminho se libertar!"
"Os macacos roubaram sua mochila, pule duas vezes para recuperá-la na trilha!"
"O som de uma trompa ecoa pela planície, corra rápido antes que o perigo te atinja!"
"A selva está cheia de espinhos venenosos, ande na ponta dos pés ou eles serão perigosos!"
"Um vento gelado começa a soprar, agache-se e se abrace para não congelar!"
"Os leões rugem na noite escura, finja ser uma rocha até a próxima aventura!"
"Um rio furioso surge sem piedade, salte por cima e evite a tempestade!"
"A selva começou a encolher ao redor, levante as mãos e toque o teto antes do final!"
"Um caçador mira em sua direção, rasteje no chão e saia da visão!"
"O som de passos pesados te rodeia, caminhe para trás e fuja da emboscada que te rodeia!"
"As folhas das árvores começaram a cair, bata palmas para o vento não te seguir!"
"Um lobo uiva ao longe na escuridão, grite três vezes e aumente a tensão!"
"O cheiro de fumaça enche o ar, corra para o outro lado e tente se salvar!"
"Uma coruja gigante aparece no céu, feche os olhos e não se mexa até ela desaparecer!"
"A floresta está cheia de sombras a rondar, segure sua respiração ou elas vão te pegar!"
"O som de passos pesados ecoa no chão, ande de costas ou ficará sem opção!"
"Uma tempestade de areia começa a rodar, fique abaixado para não se machucar!"
"As árvores balançam e se mexem sem parar, segure um tronco para não se deixar levar!"
"O uivo de lobos preenche a noite, finja ser uma pedra e não dê mais um palpite!"
"Um elefante bate seus pés com força, fique de pé ou seja lançado na trilha torta!"
"A chuva torrencial começa a cair, abra seus braços e finja subir!"
"Os cipós estão pendurados no caminho, pule e segure firme para evitar o fim!"
"Os macacos gritam do alto da árvore, bata as mãos no chão ou eles te chamarão de covarde!"
"A terra começa a tremer sem parar, segure-se na mesa para não desabar!"
"A selva ficou densa e cheia de cipós, se abaixe para passar e siga veloz!"
"Um touro selvagem surge na trilha estreita, salte para o lado e corra com a alma satisfeita!"
"O vento uiva e te empurra para o chão, dê uma cambalhota para a próxima missão!"
"Os sons da selva são cada vez mais fortes, tampe os ouvidos e espere pelo norte!"
"Um abismo surge no caminho, pule duas vezes para desviar do destino!"
"Um grupo de hienas começa a cercar, bata os pés no chão para as assustar!"
"Uma cachoeira alta e forte está à frente, nade no lugar para subir a corrente!"
"A selva está cheia de mosquitos a voar, finja ser uma estátua para eles não te picar!"
"O rio está cheio de piranhas ferozes, dê três giros ou perderá suas chances!"
"Uma tribo de guerreiros surge de repente, pule para trás e continue em frente!"
"O solo está cheio de pegadas profundas, caminhe na ponta dos pés para manter a tua saúde imunda!"
"A chuva da selva começa a bater forte, finja remar para encontrar o norte!"
"Um leopardo caminha no seu encalço, corra até a parede e volte com um salto!"
"Um bando de pássaros começa a sobrevoar, cubra sua cabeça para não te atacar!"
"As árvores ao redor estão vivas e perigosas, fique em silêncio para sair vitorioso!"
"O caminho está coberto de folhas caídas, pule sobre elas com passadas rápidas e ligeiras!"
"Uma manada de elefantes está por perto, finja ser uma árvore até o caminho estar certo!"
"Os macacos começam a rir de você, imite seus gritos para não se perder!"
"O chão começou a se quebrar, salte rapidamente antes de se afundar!"
"Um trovão rasga o céu com brilho intenso, feche os olhos ou ficará tenso!"
"O rio está cheio de crocodilos famintos, corra sobre as pedras ou terá momentos distintos!"
"Os morcegos começam a sair de uma caverna, abaixe-se e cubra a cabeça na selva eterna!"
"O ar ficou quente como um deserto, finja nadar para escapar do incerto!"
"Uma árvore caiu e bloqueou o caminho, salte por cima dela ou fique sozinho!"
"O rugido de um leão ecoa na escuridão, bata palmas para aumentar a emoção!"

    
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
    
    if (scores[currentPlayer] >= 300) {
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
