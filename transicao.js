// Funções de transições de tela

// Fade (Esmaecimento)
function fadeTransition(element) {
    element.style.transition = "opacity 0.5s";
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 500);
}

// Slide (Deslizamento)
function slideTransition(element, direction = 'left') {
    element.style.transition = "transform 0.5s ease-out";
    if (direction === 'left') {
        element.style.transform = "translateX(-100%)";
    } else if (direction === 'right') {
        element.style.transform = "translateX(100%)";
    } else if (direction === 'up') {
        element.style.transform = "translateY(-100%)";
    } else {
        element.style.transform = "translateY(100%)";
    }
    setTimeout(() => {
        element.style.transform = "translateX(0)";
    }, 500);
}

// Zoom
function zoomTransition(element) {
    element.style.transition = "transform 0.5s ease-out";
    element.style.transform = "scale(0)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 500);
}

// Flip (Giro)
function flipTransition(element) {
    element.style.transition = "transform 0.6s";
    element.style.transform = "rotateY(180deg)";
    setTimeout(() => {
        element.style.transform = "rotateY(0deg)";
    }, 600);
}

// Scroll (Rolagem)
function scrollTransition(element, direction = 'down') {
    element.style.transition = "transform 0.6s ease-out";
    if (direction === 'up') {
        element.style.transform = "translateY(-100%)";
    } else {
        element.style.transform = "translateY(100%)";
    }
    setTimeout(() => {
        element.style.transform = "translateY(0)";
    }, 600);
}

// Parallax
function parallaxTransition(element) {
    element.style.transition = "transform 0.7s ease-out";
    element.style.transform = "translateZ(-100px)";
    setTimeout(() => {
        element.style.transform = "translateZ(0)";
    }, 700);
}

// Swipe
function swipeTransition(element, direction = 'left') {
    element.style.transition = "transform 0.5s ease-out";
    if (direction === 'left') {
        element.style.transform = "translateX(-100%)";
    } else if (direction === 'right') {
        element.style.transform = "translateX(100%)";
    }
    setTimeout(() => {
        element.style.transform = "translateX(0)";
    }, 500);
}

// Cover/Reveal
function coverRevealTransition(element) {
    element.style.transition = "transform 0.5s ease-out";
    element.style.transform = "translateX(100%)";
    setTimeout(() => {
        element.style.transform = "translateX(0)";
    }, 500);
}

// Ripple (Ondulação)
function rippleTransition(element) {
    // Exemplo simples de ripple - pode ser mais detalhado com CSS
    element.style.transition = "transform 0.5s ease-out";
    element.style.transform = "scale(0.5)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 500);
}

// Rotate (Rotação)
function rotateTransition(element) {
    element.style.transition = "transform 0.6s ease-out";
    element.style.transform = "rotate(360deg)";
    setTimeout(() => {
        element.style.transform = "rotate(0)";
    }, 600);
}

// Função que aplica a transição selecionada
function applyTransition(transitionName) {
    const card = document.querySelector('.card'); // Alvo da transição
    switch (transitionName) {
        case 'fade':
            fadeTransition(card);
            break;
        case 'slide-left':
            slideTransition(card, 'left');
            break;
        case 'slide-right':
            slideTransition(card, 'right');
            break;
        case 'zoom':
            zoomTransition(card);
            break;
        case 'flip':
            flipTransition(card);
            break;
        case 'scroll-up':
            scrollTransition(card, 'up');
            break;
        case 'scroll-down':
            scrollTransition(card, 'down');
            break;
        case 'parallax':
            parallaxTransition(card);
            break;
        case 'swipe-left':
            swipeTransition(card, 'left');
            break;
        case 'swipe-right':
            swipeTransition(card, 'right');
            break;
        case 'cover-reveal':
            coverRevealTransition(card);
            break;
        case 'ripple':
            rippleTransition(card);
            break;
        case 'rotate':
            rotateTransition(card);
            break;
        default:
            console.log('Transição não encontrada!');
            break;
    }
}

// Função para aplicar a transição ao escolher no menu suspenso
document.getElementById('transitionsMenu').addEventListener('change', function () {
    const selectedTransition = this.value;
    applyTransition(selectedTransition);
});
