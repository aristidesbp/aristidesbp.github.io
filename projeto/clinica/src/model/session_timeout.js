/**

* ARQUIVO: src/model/session_timeout.js

* USO: import "../model/session_timeout.js"; (em todos os dashboards)

*/

import { supabase } from './supabase_config.js';

// 30 minutos em milissegundos

const LIMITE = 30 * 60 * 1000;

let timerId;

async function executarLogout() {

await supabase.auth.signOut();

localStorage.clear();

window.location.href = 'login.html?motivo=inatividade';

}

function reiniciarTimer() {

clearTimeout(timerId);

timerId = setTimeout(executarLogout, LIMITE);

}

// Reinicia o timer a cada interação do usuário

['mousedown','keypress','scroll','touchstart','click']

.forEach(ev => document.addEventListener(ev,

reiniciarTimer, { passive: true }));

// Inicia o timer quando a página carrega

reiniciarTimer();
