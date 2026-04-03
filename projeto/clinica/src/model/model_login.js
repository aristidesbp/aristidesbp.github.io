/**

* ARQUIVO: src/model/model_login.js

* FUNÇÃO: Todas as operações de autenticação com o Supabase.

* Nenhuma função aqui toca no HTML.

*/

import { supabase } from './supabase_config.js';

// LOGIN: verifica e-mail e senha, retorna JWT

export async function realizarLogin(email, senha) {

const { data, error } = await supabase.auth.signInWithPassword({

email: email.trim().toLowerCase(),

password: senha,

});

return { data, error };

}

// LOGOUT: invalida o token e limpa o localStorage

export async function realizarLogout() {

const { error } = await supabase.auth.signOut();

return { error };

}

// RECUPERAR SENHA: envia e-mail com link de redefinição

export async function solicitarRecuperacaoSenha(email) {

const { error } = await supabase.auth.resetPasswordForEmail(

email.trim().toLowerCase(),

{ redirectTo: `${window.location.origin}/src/view/redefinir_senha.html` }

);

return { error };

}

// RETORNA o usuário logado atualmente

export async function getUsuarioAtual() {

const { data: { user }, error } = await supabase.auth.getUser();

return { user, error };

}

