// src/controller/controller_login.js
/**
 * ARQUIVO: src/controller/controller_login.js
 * FUNÇÃO:  Liga os eventos da interface (HTML) às funções do model.
 *          É o único arquivo que conhece tanto a View quanto o Model.
 */

// Importa as funções de autenticação do model
import { realizarLogin, solicitarRecuperacaoSenha } from '../model/model_login.js';

// Importa o utilitário de tratamento de erros
import { mostrarFeedback, mostrarErro } from '../model/ui_helpers.js';

/**
 * DOMContentLoaded: espera o HTML carregar completamente
 * antes de tentar encontrar botões e formulários.
 * Sem isso, o JavaScript tentaria encontrar elementos
 * que ainda não existem na página.
 */
document.addEventListener('DOMContentLoaded', () => {

    // ── GATILHO DO FORMULÁRIO DE LOGIN ─────────────────────────
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (event) => {

            // Impede o comportamento padrão do form (recarregar a página)
            // Sem isso, a página recarregaria e perderíamos os dados
            event.preventDefault();
    // Captura os valores dos campos pelo ID do elemento HTML
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;

            // Validação básica no frontend (antes de chamar o banco)
            if (!email || !senha) {
                mostrarErro('Preencha e-mail e senha para continuar.');
                return;
            }

            // Desabilita o botão para evitar cliques duplos
            const btnSubmit = document.getElementById('btn-login');
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Entrando...';

            // Chama o model para fazer o login no Supabase
            const { data, error } = await realizarLogin(email, senha);

            if (error) {
                // Reativa o botão em caso de erro
                btnSubmit.disabled = false;
                btnSubmit.textContent = 'Entrar';

                // Traduz erros técnicos em mensagens amigáveis
                const mensagens = {
                    'Invalid login credentials': 'E-mail ou senha incorretos.',
                    'Email not confirmed': 'Confirme seu e-mail antes de entrar.',
                    'Too many requests': 'Muitas tentativas. Aguarde alguns minutos.',
                };
                const msg = mensagens[error.message] || 'Erro ao fazer login. Tente novamente.';
                mostrarErro(msg);
                return;
            }

            // Login bem-sucedido!
            // Redireciona para a página de boas-vindas.
            // O access_control.js nessa página vai decidir
            // para qual dashboard o usuário vai.
            window.location.href = '../view/index.html';
        });
    }

    // ── GATILHO DO LINK "ESQUECI MINHA SENHA" ──────────────────
    const linkRecuperar = document.getElementById('link-recuperar-senha');

    if (linkRecuperar) {
        linkRecuperar.addEventListener('click', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;

            if (!email) {
                mostrarErro('Digite seu e-mail no campo acima para recuperar a senha.');
                return;
            }

            const { error } = await solicitarRecuperacaoSenha(email);

            if (error) {
                mostrarErro('Não foi possível enviar o e-mail. Verifique o endereço digitado.');
            } else {
                mostrarFeedback('Link enviado! Verifique sua caixa de entrada e spam.');
            }
        });
    }

    // ── GATILHO DO BOTÃO MOSTRAR/OCULTAR SENHA ─────────────────
    const btnToggleSenha = document.getElementById('btn-toggle-senha');
    const campoSenha = document.getElementById('password');

    if (btnToggleSenha && campoSenha) {
        btnToggleSenha.addEventListener('click', () => {
            // Alterna entre "password" (oculto) e "text" (visível)
            const visivel = campoSenha.type === 'text';
            campoSenha.type = visivel ? 'password' : 'text';

            // Atualiza o ícone do botão visualmente
            const icone = btnToggleSenha.querySelector('span');
            if (icone) {
                icone.textContent = visivel ? 'visibility' : 'visibility_off';
            }
        });
    }

});
