// src/controller/login_clinica_controller.js

import { realizarLogin } from '../model/login.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    
    if (btnEntrar) {
        btnEntrar.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que a página recarregue
            
            // Capturamos os dados do formulário
            const email = document.getElementById('input-email').value;
            const senha = document.getElementById('input-senha').value;

            // Verificação básica antes de enviar para o model
            if (!email || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Chamamos a função do model
            // Se o seu model login.js espera parâmetros, passe-os aqui.
            // Se o model busca direto do DOM, certifique-se que os IDs lá 
            // sejam os mesmos do HTML (input-email e input-senha).
            realizarLogin(email, senha);
        });
    }
});/**
 * Nome do arquivo: login_clinica_controller.js
 * Objetivo: Mediar a interação entre a interface (HTML) e a lógica de autenticação.
 */

// Importação da lógica de login (ajustado para o caminho relativo solicitado)
// Nota: Em ambientes de navegador puro sem módulos (type="module"), 
// certifique-se de que o login.js seja carregado via tag <script>.
import { realizarLogin } from '../model/login.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const inputSenha = document.getElementById('input-senha');
    const inputEmail = document.getElementById('input-email'); // Assumindo o ID baseado no padrão

    if (btnEntrar) {
        btnEntrar.addEventListener('click', (event) => {
            event.preventDefault();
            
            // O arquivo login.js espera encontrar elementos com IDs 'email' e 'password'
            // Se os IDs no seu HTML forem diferentes, precisamos garantir que a função 
            // realizarLogin() consiga capturá-los ou ajustar os IDs no DOM:
            
            executarFluxoLogin();
        });
    }

    // Atalho: Permitir login ao apertar "Enter" no campo de senha
    if (inputSenha) {
        inputSenha.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                executarFluxoLogin();
            }
        });
    }
});

/**
 * Função para disparar o processo de autenticação definido no model
 */
function executarFluxoLogin() {
    // A função realizarLogin() já contém a lógica de buscar document.getElementById('email')
    // e realizar a chamada ao Supabase.
    realizarLogin();
}
