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
}

// Verifica se o role tem acesso a esta página

if (!rolesPermitidos.includes(perfil.role)) {

redirecionarParaDashboard(perfil.role);

return null;

}

return { user: session.user, role: perfil.role };

}

export function redirecionarParaDashboard(role) {

const destinos = {

'master': '../view/dashboard_master.html',

'psicopedagogo': '../view/dashboard_profissional.html',

'paciente': '../view/dashboard_paciente.html',

};

window.location.replace(destinos[role] || 'login.html');

}
