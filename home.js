// Script para animação de confete ao clicar no botão (exemplo de interação dinâmica)
document.getElementById('confettiButton').addEventListener('click', function() {
    // Animação de confete
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Reproduz o som do confete
    var audio = document.getElementById('confettiSound');
    audio.play();

    // Redireciona para a página "home.html" após um pequeno atraso
    setTimeout(function() {
        window.location.href = "home.html";
    }, 3000); // Atraso de 3 segundos para visualizar a animação
});

// Exemplo de animação de fade-in para elementos da página
window.onload = function() {
    const card = document.getElementById('aboutCard'); // Seleciona o card pelo ID
    card.classList.add('visible'); // Adiciona a classe 'visible' para iniciar a animação
};

/*FUNÇÃO COPIAR CÓDIGO*/
function copyToClipboard(text) {
    const tempInput = document.createElement('input'); // Cria um campo de entrada temporário
    tempInput.value = text; // Define o valor como o texto a ser copiado
    document.body.appendChild(tempInput); // Adiciona o campo ao corpo do documento
    tempInput.select(); // Seleciona o texto
    document.execCommand('copy'); // Executa o comando de copiar
    document.body.removeChild(tempInput); // Remove o campo temporário
    alert('Código copiado!'); // Alerta ao usuário que o código foi copiado
}
