/**
 * ERP ABP Profissional - Core: Gestão de Autenticação e Sessão
 * Desenvolvido por: Aristides & Gemini AI (2026)
 * Descrição: Login, Logout, Persistência de Sessão e Controle de Empresa Ativa.
 */

(function() {
    'use strict';

    const AppAuth = {
        session: null,
        user: null,
        empresaAtiva: null,

        /**
         * 1. LOGIN
         * Realiza a autenticação via Supabase Auth.
         */
        login: async function(email, password) {
            try {
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) throw error;

                console.log("🔑 Login bem-sucedido!");
                await this.checkSession();
                return { success: true };
            } catch (err) {
                console.error("❌ Erro no login:", err.message);
                return { success: false, error: err.message };
            }
        },

        /**
         * 2. LOGOUT
         * Limpa sessão no servidor e no banco local.
         */
        logout: async function() {
            await window.supabaseClient.auth.signOut();
            await window.dbLocal.usuarios.clear(); // Limpa cache local de segurança
            localStorage.removeItem('erp_abp_empresa_id');
            window.location.href = 'login.html';
        },

        /**
         * 3. VERIFICAR SESSÃO ATIVA
         * Chamado em todas as páginas para garantir que o usuário está logado.
         */
        checkSession: async function() {
            const { data: { session }, error } = await window.supabaseClient.auth.getSession();
            
            if (error || !session) {
                if (!window.location.pathname.includes('login.html')) {
                    window.location.href = 'login.html';
                }
                return null;
            }

            this.session = session;
            this.user = session.user;

            // Define a empresa ativa (da memória ou do banco)
            await this.definirEmpresaAtiva();
            
            // Registra os dados do usuário logado no IndexedDB para uso offline
            await window.dbLocal.usuarios.put({
                id: this.user.id,
                email: this.user.email,
                nome: this.user.user_metadata.nome || 'Usuário'
            });

            return session;
        },

        /**
         * 4. DEFINIR EMPRESA ATIVA
         * Identifica qual empresa o usuário está operando no momento.
         */
        definirEmpresaAtiva: async function() {
            let empresaId = localStorage.getItem('erp_abp_empresa_id');

            // Se não tiver empresa no cache, busca a primeira vinculada ao usuário
            if (!empresaId) {
                const { data, error } = await window.supabaseClient
                    .from('usuario_empresas')
                    .select('empresa_id')
                    .eq('usuario_id', this.user.id)
                    .limit(1)
                    .single();

                if (data) {
                    empresaId = data.empresa_id;
                    localStorage.setItem('erp_abp_empresa_id', empresaId);
                }
            }

            this.empresaAtiva = empresaId;
            window.current_empresa_id = empresaId; // Expõe globalmente para o sync.js e módulos
        },

        /**
         * 5. INICIALIZAÇÃO
         */
        init: async function() {
            // Escuta mudanças de estado (Login/Logout em outras abas)
            window.supabaseClient.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT') this.logout();
                if (event === 'SIGNED_IN') this.checkSession();
            });

            await this.checkSession();
        }
    };

    window.AppAuth = AppAuth;
    AppAuth.init();

})();
