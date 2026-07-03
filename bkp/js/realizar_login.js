/**
 * Nome do arquivo: realizar_login.js
 * Objetivo: Classe universal de autenticação.
 */
export class RealizarLogin {
    constructor() {
        // Verifica se o cliente foi inicializado pelo supabase_config.js
        this.supabase = window.supabaseClient;
    }

    /**
     * Método universal para autenticar usuários
     * @param {string} email 
     * @param {string} senha 
     */
    async executar(email, senha) {
        if (!this.supabase) {
            return { sucesso: false, erro: "Erro: Cliente Supabase não inicializado." };
        }

        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: senha,
            });

            if (error) return { sucesso: false, erro: error.message };
            
            return { sucesso: true, data };
        } catch (err) {
            return { sucesso: false, erro: "Falha na conexão com o servidor." };
        }
    }
}
