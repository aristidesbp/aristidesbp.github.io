// src/model/session_timeout.js
/**
* ARQUIVO: src/model/session_timeout.js
* FUNÇÃO: Encerra a sessão após 30 minutos de inatividade.
*
Protege dados clínicos em computadores compartilhados.
*
* COMO USAR:
* Importe este arquivo em todos os dashboards e páginas protegidas.
* import "../model/session_timeout.js";
*/
import { supabase } from './supabase_config.js';
// 30 minutos em milissegundos (30 * 60 * 1000)
const LIMITE_INATIVIDADE = 1_800_000;
// Guarda o ID do timer para poder cancelá-lo quando houver atividade
let timerId;
/**
* Executa o logout: invalida o token e redireciona para o login.
* O parâmetro ?motivo=timeout na URL permite que a tela de
* login mostre uma mensagem explicando por que o usuário foi deslogado.
*/
async function executarLogoutPorInatividade() {
console.warn("ERP-PSC: Sessão encerrada por inatividade.");
try {
// Invalida o JWT no servidor do Supabase
await supabase.auth.signOut();
} catch (e) {
// Mesmo que o signOut falhe (ex: sem internet),
// ainda redirecionamos para o login por segurança.
}
// Limpa dados locais e redireciona
localStorage.clear();
window.location.href = 'login.html?motivo=inatividade';
}
/**
* Reinicia o contador de inatividade.
* Chamado toda vez que o usuário faz qualquer ação.
*/
function reiniciarTimer() {
// Cancela o timer anterior para não acumular timers
clearTimeout(timerId);
// Inicia um novo timer
timerId = setTimeout(executarLogoutPorInatividade, LIMITE_INATIVIDADE);
}
// Lista de eventos que caracterizam "atividade" do usuário.
// Qualquer um destes eventos reinicia o timer.
const eventosDeAtividade = ['mousedown', 'mousemove', 'keypress', 'scroll','touchstart', 'click'];
// Registra o ouvinte para cada evento.
// { passive: true } melhora a performance em eventos de scroll e touch.
eventosDeAtividade.forEach(evento => {
document.addEventListener(evento, reiniciarTimer, { passive: true });
});
// Inicia o timer na primeira vez que a página carrega
reiniciarTimer();
