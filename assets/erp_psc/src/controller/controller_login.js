/**
 * Nome do arquivo: controller/login.js
 * Objetivo: Escutar os eventos da interface (HTML) e acionar as funções do Modelo.
 *  ativa as funções no model
 */

// Aguarda o DOM (HTML) carregar completamente antes de aplicar os gatilhos
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gatilho para o Formulário de Login (Evento Submit)
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Impede que a página recarregue ao clicar no botão
            event.preventDefault(); 
            // Chama a função de autenticação que está no model/login.js
            realizarLogin();
        });
    }

    // 2. Gatilho para o Link "Esqueci minha senha"
    // Procurei pelo link que contém o texto de recuperação
    const linkRecuperar = document.querySelector('a[href="#"]');
    if (linkRecuperar && linkRecuperar.innerText.includes("Esqueci minha senha")) {
        linkRecuperar.addEventListener('click', (event) => {
            event.preventDefault();
            solicitarRecuperacao();
        });
    }

    // 3. Gatilho para o Botão de Mostrar/Esconder Senha
    // Substitui o código inline do HTML pela função organizada do model
    const btnAlternarSenha = document.querySelector('button[type="button"]');
    if (btnAlternarSenha) {
        // Removemos o atributo onclick antigo via JS para usar o novo listener
        btnAlternarSenha.removeAttribute('onclick');
        btnAlternarSenha.addEventListener('click', () => {
            alternarSenha();
            
            // Ajuste visual do ícone (opcional, já que a função alternarSenha foca no tipo do campo)
            const spanIcon = btnAlternarSenha.querySelector('span');
            const inputSenha = document.getElementById('password');
            if (spanIcon && inputSenha) {
                spanIcon.innerText = inputSenha.type === 'password' ? 'visibility' : 'visibility_off';
            }
        });
    }

});
