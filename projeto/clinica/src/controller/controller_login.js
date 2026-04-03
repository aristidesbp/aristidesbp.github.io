/**
* ARQUIVO: src/controller/controller_login.js
* FUNÇÃO: Liga os eventos da interface às funções do model.
*/
import { realizarLogin, solicitarRecuperacaoSenha }
from '../model/model_login.js';
import { mostrarErro, mostrarFeedback }
from '../model/ui_helpers.js';
document.addEventListener('DOMContentLoaded', () => {
// ■■ GATILHO DO FORMULÁRIO ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const formLogin = document.getElementById('form-login');
if (formLogin) {
formLogin.addEventListener('submit', async (event) => {
event.preventDefault(); // Impede o recarregamento da página
const email = document.getElementById('email').value;
const senha = document.getElementById('password').value;
if (!email || !senha) {
mostrarErro('Preencha e-mail e senha.');
return;
}
// Desabilita botão para evitar duplo clique
const btn = document.getElementById('btn-login');
btn.disabled = true;
btn.textContent = 'Entrando...';
const { data, error } = await realizarLogin(email, senha);
if (error) {
btn.disabled = false;
btn.textContent = 'Entrar';
const msgs = {
'Invalid login credentials': 'E-mail ou senha incorretos.',
'Too many requests': 'Muitas tentativas. Aguarde.',
};
mostrarErro(msgs[error.message] || 'Erro ao fazer login.');
return;
}
// Sucesso: redireciona para o dashboard
window.location.href = '../view/index.html';
});
}
});
