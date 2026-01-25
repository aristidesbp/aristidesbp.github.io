/**
 * ERP ABP Profissional - Core: Gestão de Autenticação e Sessão
 * Desenvolvido por: Aristides (2026)
 */

(function() {
    'use strict';

    const AppAuth = {
        session: null,
        user: null,

        /**
         * 1. LOGIN
         */
        login: async function(email, password) {
            try {
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });
                if (error) throw error;
                
                await this.checkSession();
                // Redireciona para o Dashboard após login
                window.location.href = 'dashboard.html';
                return { success: true };
            } catch (err) {
                console.error("❌ Erro no login:", err.message);
                return { success: false, error: err.message };
            }
        },

        /**
         * 2. LOGOUT
         */
        logout: async function() {
            await window.supabaseClient.auth.signOut();
            localStorage.removeItem('erp_abp_empresa_id');
            window.location.href = 'login.html';
        },

        /**
         * 3. VERIFICAR SESSÃO E DEFINIR CONTEXTO (empresa_id)
         */
        checkSession: async function() {
            const { data: { session } } = await window.supabaseClient.auth.getSession();
            
            if (!session) {
                if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
                    window.location.href = 'login.html';
                }
                return null;
            }

            this.session = session;
            this.user = session.user;

            // Busca a empresa_id no localStorage ou define a padrão
            let empresaId = localStorage.getItem('erp_abp_empresa_id');
            
            if (!empresaId) {
                // Se não houver no cache, busca a primeira empresa que o usuário tem acesso no SQL
                const { data } = await window.supabaseClient
                    .from('usuario_empresas')
                    .select('empresa_id')
                    .limit(1)
                    .single();
                
                if (data) {
                    empresaId = data.empresa_id;
                    localStorage.setItem('erp_abp_empresa_id', empresaId);
                }
            }

            window.current_empresa_id = empresaId;
            console.log("👤 Usuário autenticado. Empresa ativa:", empresaId);
            return session;
        },

        init: function() {
            this.checkSession();
            // Escuta mudanças de auth (logout em outra aba, etc)
            window.supabaseClient.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT') this.logout();
            });
        }
    };

    window.AppAuth = AppAuth;
    AppAuth.init();
})();
