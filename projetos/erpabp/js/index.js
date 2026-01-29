document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões do rodapé
    const botoes = document.querySelectorAll('footer button');
    
    // O primeiro botão é o "Aceitar e Continuar" (bg-primary)
    const botaoAceitar = botoes[0];
    
    // O segundo botão é o "Recusar" (border-2)
    const botaoRecusar = botoes[1];

    // Evento para o botão Aceitar
    botaoAceitar.addEventListener('click', () => {
        // Encaminha para a tela de login
        window.location.href = 'login.html';
    });

    // Evento para o botão Recusar
    botaoRecusar.addEventListener('click', () => {
        // Tenta fechar a aba/janela do aplicativo
        // Nota: Browsers modernos só permitem fechar janelas abertas via script (window.open)
        // Por segurança, redirecionamos para uma página vazia caso não consiga fechar
        if (confirm("Deseja realmente sair do aplicativo?")) {
            window.close();
            // Fallback caso o window.close() seja bloqueado pelo navegador
            window.location.href = "about:blank";
        }
    });
});
