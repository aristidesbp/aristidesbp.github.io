/**

* ARQUIVO: src/model/ui_helpers.js

* FUNÇÃO: Funções reutilizáveis de interface.

* Importadas por todos os controllers.

*/

// Mostra mensagem de ERRO na área de feedback

export function mostrarErro(msg, id = 'feedback-area') {

const el = document.getElementById(id);

if (!el) return;

el.textContent = msg;

el.className = 'mb-4 p-3 rounded-xl text-sm font-medium bg-red-50 text-red-700 border b

order-red-200';

el.classList.remove('hidden');

setTimeout(() => el.classList.add("hidden"), 5000);

}

// Mostra mensagem de SUCESSO

export function mostrarSucesso(msg, id = 'feedback-area') {

const el = document.getElementById(id);

if (!el) return;

el.textContent = msg;

el.className = 'mb-4 p-3 rounded-xl text-sm font-medium bg-green-50 text-green-700 bord

er border-green-200';

el.classList.remove('hidden');

setTimeout(() => el.classList.add("hidden"), 4000);

}
