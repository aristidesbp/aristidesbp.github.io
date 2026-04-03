/**

* ARQUIVO: src/middleware/access_control.js

* USO: import { verificarAcesso } from "../middleware/access_control.js";

* await verificarAcesso(['master', 'psicopedagogo']);

*/

import { supabase } from '../model/supabase_config.js';

export async function verificarAcesso(rolesPermitidos) {

const { data: { session } } = await supabase.auth.getSession();

if (!session) {

window.location.replace('login.html?motivo=sem-sessao');

return null;

}

// Busca o role do usuário no banco

const { data: perfil, error } = await supabase

.from('profiles')

.select('role')

.eq("id", session.user.id)

.single();

if (error || !perfil) {

window.location.replace('login.html');

return null;
