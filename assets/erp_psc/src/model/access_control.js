// src/middleware/access_control.js
/**
* ARQUIVO: src/middleware/access_control.js
* FUNÇÃO: Verifica se o usuário autenticado tem o role correto
*
para acessar a página atual.
*
* COMO USAR EM UMA PÁGINA:
*
* import { verificarAcesso } from "../middleware/access_control.js";
* // Só permite master e psicopedagogo:
* await verificarAcesso(['master', 'psicopedagogo']);
*/
import { supabase } from '../model/supabase_config.js';
/**
* Verifica se o usuário logado possui um dos roles permitidos.
* Se não tiver permissão, redireciona automaticamente.
*
* @param {string[]} rolesPermitidos - Ex: ["master", "psicopedagogo"]
* @returns {Object} { user, role } — dados do usuário autorizado
*/
export async function verificarAcesso(rolesPermitidos) {
// Busca a sessão atual
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
window.location.replace('login.html?motivo=sem-sessao');
return null;
}
// Busca o perfil (role) do usuário no banco de dados.
// .single() garante que retorna um objeto, não um array.
const { data: perfil, error } = await supabase
.from('profiles')
.select('role')
.eq("id", session.user.id)
.single();
  if (error || !perfil) {
// Perfil não encontrado: erro no trigger de criação
window.location.replace('login.html?motivo=sem-perfil');
return null;
}
// Verifica se o role do usuário está na lista de permitidos
if (!rolesPermitidos.includes(perfil.role)) {
// Acesso negado: redireciona para o dashboard do próprio role
redirecionarParaDashboard(perfil.role);
return null;
}
// Acesso concedido: retorna os dados para uso na página
return { user: session.user, role: perfil.role };
}
/**
* Redireciona o usuário para o dashboard correto do seu perfil.
* Usado tanto no pós-login quanto em redirecionamentos de acesso negado.
*
* @param {string} role - Role do usuário
*/
export function redirecionarParaDashboard(role) {
const destinos = {
'master':
'../view/dashboard_master.html',
'psicopedagogo': '../view/dashboard_profissional.html',
'paciente':
'../view/dashboard_paciente.html',
};
// Se o role não tiver destino mapeado, vai para o login
const destino = destinos[role] || 'login.html';
window.location.replace(destino);
}
