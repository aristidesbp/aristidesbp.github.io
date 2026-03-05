// src/model/model_login.js
/**
 * ARQUIVO: src/model/model_login.js
 * FUNÇÃO:  Todas as operações de autenticação com o Supabase.
 *          Nenhuma função aqui toca no HTML.
 */
import { supabase } from './supabase_config.js';
/**
 * Realiza o login do usuário com e-mail e senha.
 * @param {string} email - E-mail digitado no formulário
 * @param {string} senha - Senha digitada no formulário
 * @returns {Object} { data, error } — padrão Supabase
 *
 * SOBRE O RETORNO:
 * Se deu certo: data.session e data.user estarão preenchidos, error será null
 * Se deu errado: data será null, error.message terá a descrição do problema
 */
export async function realizarLogin(email, senha) {
    // signInWithPassword é o método do Supabase para login com e-mail/senha
    // Ele verifica as credenciais e retorna um JWT (token) se corretas
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(), // Remove espaços e padroniza maiúsculas
        password: senha,
    });

    return { data, error };
}

/**
 * Encerra a sessão do usuário atual.
 * Invalida o token JWT e limpa o armazenamento local.
 */
export async function realizarLogout() {
    // signOut() invalida o token no Supabase E limpa o localStorage
    const { error } = await supabase.auth.signOut();
    return { error };
}

/**
 * Envia e-mail de recuperação de senha.
 * @param {string} email - E-mail cadastrado do usuário
 */
export async function solicitarRecuperacaoSenha(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
            // Após clicar no link do e-mail, o usuário será
            // redirecionado para esta página para definir a nova senha.
            redirectTo: `${window.location.origin}/src/view/redefinir_senha.html`,
        }
    );
    return { error };
}

/**
 * Atualiza a senha do usuário (usado na página de redefinição).
 * Só funciona quando o usuário clicou no link de recuperação.
 * @param {string} novaSenha - Nova senha escolhida pelo usuário
 */
export async function atualizarSenha(novaSenha) {
    const { error } = await supabase.auth.updateUser({
        password: novaSenha
    });
    return { error };
}

/**
 * Retorna os dados do usuário logado atualmente.
 * Útil para pegar o ID do usuário em outras partes do sistema.
 */
export async function getUsuarioAtual() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
}
