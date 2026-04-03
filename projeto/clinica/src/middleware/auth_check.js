/**

* ARQUIVO: src/middleware/auth_check.js

* USO: Adicione como PRIMEIRO script no <head> de páginas protegidas.

* NÃO use em login.html ou index.html (páginas públicas).

*/

// Importa a conexão com o banco

import { supabase } from '../model/supabase_config.js';

(async () => {

// PASSO 1: Bloqueia a renderização IMEDIATAMENTE

document.documentElement.style.display = 'none';

try {

// PASSO 2: Verifica sessão (lê do localStorage — rápido)

const { data: { session }, error } =

await supabase.auth.getSession();

if (error || !session) {

window.location.replace('login.html');

return;

}

// PASSO 3: Confirma com o servidor (mais seguro)

const { data: { user }, error: userError } =

await supabase.auth.getUser();

if (userError || !user) {

window.location.replace('login.html');

return;

}

// PASSO 4: Tudo certo — libera a página

document.documentElement.style.display = 'block';

} catch (err) {

// Em caso de falha técnica: bloqueia por segurança

window.location.replace('login.html');

}

})();
