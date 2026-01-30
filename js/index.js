/**
 * Lógica da tela de Termos de Uso (index.html)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Identifica os elementos da tela
    const botoes = document.querySelectorAll('footer button');
    const botaoAceitar = botoes[0];
    const botaoRecusar = botoes[1];

    // 2. Ação ao clicar em ACEITAR
    botaoAceitar.addEventListener('click', async () => {
        try {
            // Chama a função que criamos no indexdb.js
            await abrirBanco(); 
            
            // Registra que o usuário aceitou os termos localmente
            localStorage.setItem('termos_aceitos', 'true');
            
            // Leva o usuário para a próxima etapa
            window.location.href = 'login.html';
        } catch (error) {
            alert('Não foi possível inicializar o banco de dados no seu navegador.');
        }
    });

    // 3. Ação ao clicar em RECUSAR
    botaoRecusar.addEventListener('click', () => {
        if (confirm("Se você recusar, os dados não poderão ser salvos. Deseja sair?")) {
            window.location.href = "about:blank";
        }
    });
});

