// src/model/auth_model.js

const AuthModel = {
    /**
     * Realiza o login do usuário.
     * @param {string} email 
     * @param {string} password 
     */
    async login(email, password) {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;
        return data;
    },

    /**
     * Encerra a sessão do usuário.
     */
    async logout() {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) throw error;

        // Limpeza de cache local por segurança
        localStorage.clear();
        sessionStorage.clear();

        return true;
    },

    /**
     * Envia e-mail de recuperação de senha.
     * @param {string} email 
     */
    async recuperarSenha(email) {
        const { data, error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/projetos/clinica/src/view/redefinir_senha.html',
        });

        if (error) throw error;
        return data;
    },

    /**
     * Obtém a sessão atual.
     */
    async getSession() {
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();
        if (error) throw error;
        return session;
    }
};

window.AuthModel = AuthModel;
