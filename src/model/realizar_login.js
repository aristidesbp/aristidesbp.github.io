/**
 * Nome do arquivo: realizar_login.js
 * Objetivo: Classe universal para autenticação no Supabase.
 */
export class Autenticador {
    /**
     * Realiza o login no Supabase
     * @param {string} email 
     * @param {string} senha 
     * @returns {Promise<Object>} Retorna um objeto com {sucesso: bool, data: obj, erro: string}
     */
    async realizar_login(email, senha) {
        try {
            // Verifica se o cliente Supabase está configurado globalmente
            if (!window.supabaseClient) {
                throw new Error("Supabase não configurado. Verifique o supabase_config.js");
            }

            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email: email,
                password: senha,
            });

            if (error) {
                return { sucesso: false, erro: error.message };
            }

            return { sucesso: true, data: data };
            
        } catch (err) {
            return { sucesso: false, erro: err.message };
        }
    }
}
