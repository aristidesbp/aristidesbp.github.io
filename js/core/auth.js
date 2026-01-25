/**
 * ERP ABP Profissional - Core: Gestão de Autenticação e Sessão
 * Desenvolvido por: Aristides & Gemini AI (2026)
 * Versão: 2.0 (Integrada com Supabase Auth e RLS)
 */

(function() {
    'use strict';

    const AppAuth = {
        session: null,
        user: null,
        empresaAtiva: null,

        /**
         * 1. LOGIN OFICIAL (Via Supabase Auth)
         * Valida contra a tabela auth.users e vincula ao perfil public.usuarios
         */
        login: async function(email, password) {
            try {
                // Autenticação no serviço de Auth do Supabase
                const { data: authData, error: authError } = await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (authError) throw authError;

                // Busca dados do perfil na nossa tabela pública para confirmar o acesso
                const { data: userData, error: userError } = await window.supabaseClient
                    .from('usuarios')
                    .select('id, nome, email')
                    .eq('id', authData.user.id)
                    .single();

                if (userError || !userData) {
                    throw new Error("Perfil de usuário não localizado na base do ERP.");
                }

                // Armazena a sessão completa no localStorage
                const sessionData = {
                    user: userData,
                    session: authData.session
                };
                localStorage.setItem('erp_abp_session', JSON.stringify(sessionData));
                
                this.session = authData.session;
                this.user = userData;

                // Define a empresa ativa para habilitar o RLS
                await this.definirEmpresaAtiva();

                return { success: true };
            } catch (error) {
                console.error("❌ Erro no Login:", error.message);
                return { success: false, message: error.message };
            }
        },

        /**
         * 2. LOGOUT
         */
        logout: async function() {
            await window.supabaseClient.auth.signOut();
            localStorage.removeItem('erp_abp_session');
            localStorage.removeItem('erp_abp_empresa_id');
            window.location.href = 'login.html';
        },

        /**
         * 3. VERIFICAR E RESTAURAR SESSÃO
         */
        checkSession: async function() {
            const sessionRaw = localStorage.getItem('erp_abp_session');
            
            if (!sessionRaw) {
                if (!window.location.pathname.includes('login.html')) {
                    window.location.href = 'login.html';
                }
                return null;
            }

            try {
                const sessionData = JSON.parse(sessionRaw);
                this.session = sessionData.session;
                this.user = sessionData.user;

                // Verifica se o token ainda é válido no Supabase
                const { data: { user } } = await window.supabaseClient.auth.getUser();
                if (!user) throw new Error("Sessão expirada");

                await this.definirEmpresaAtiva();
                return this.session;
            } catch (e) {
                console.warn("Sessão inválida, redirecionando...");
                this.logout();
            }
        },

        /**
         * 4. DEFINIR EMPRESA ATIVA (Contexto Multi-tenant)
         * Essencial para que as Policies de RLS funcionem no Passo 2
         */
        definirEmpresaAtiva: async function() {
            let empresaId = localStorage.getItem('erp_abp_empresa_id');

            if (!empresaId && this.user) {
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
            window.current_empresa_id = empresaId; // Disponibiliza para o sync.js
        },

        /**
         * 5. INICIALIZAÇÃO AUTOMÁTICA
         */
        init: function() {
            // Monitora mudanças de estado (ex: logout em outra aba)
            window.supabaseClient.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT') this.logout();
            });

            this.checkSession();
        }
    };

    window.AppAuth = AppAuth;
    AppAuth.init();

})();
