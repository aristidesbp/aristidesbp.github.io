/**
 * Model: login.js
 * Responsável pela comunicação com o Supabase Auth e Tabela Entidades.
 */

export const loginModel = {
    // Realiza a autenticação inicial no Supabase Auth
    async autenticarUsuario(email, senha) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });
        if (error) throw error;
        return data.user;
    },

    // Busca o perfil e nível de acesso na tabela 'entidades'
    async buscarPerfil(userId) {
        const { data, error } = await supabase
            .from('entidades')
            .select('id, nome_completo, relacionamento, status')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    }
};
