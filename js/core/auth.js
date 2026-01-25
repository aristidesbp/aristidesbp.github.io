(function() {
    'use strict';
    const AppAuth = {
        session: null, user: null, empresaAtiva: null,
        login: async function(email, password) {
            try {
                const { data: authData, error: authError } = await window.supabaseClient.auth.signInWithPassword({ email, password });
                if (authError) throw authError;

                const { data: userData, error: userError } = await window.supabaseClient
                    .from('usuarios').select('id, nome, email').eq('id', authData.user.id).single();
                if (userError || !userData) throw new Error("Perfil não encontrado no ERP.");

                localStorage.setItem('erp_abp_session', JSON.stringify({ user: userData, session: authData.session }));
                await this.definirEmpresaAtiva(userData.id);
                return { success: true };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
        logout: async function() {
            await window.supabaseClient.auth.signOut();
            localStorage.clear();
            window.location.href = 'index.html';
        },
        checkSession: async function() {
            const sessionRaw = localStorage.getItem('erp_abp_session');
            if (!sessionRaw) {
                if (!window.location.pathname.includes('index.html')) window.location.href = 'index.html';
                return null;
            }
            const data = JSON.parse(sessionRaw);
            this.user = data.user;
            this.empresaAtiva = localStorage.getItem('erp_abp_empresa_id');
            return data.session;
        },
        definirEmpresaAtiva: async function(userId) {
            const { data } = await window.supabaseClient.from('usuario_empresas').select('empresa_id').eq('usuario_id', userId).limit(1).single();
            if (data) {
                localStorage.setItem('erp_abp_empresa_id', data.empresa_id);
                this.empresaAtiva = data.empresa_id;
            }
        },
        init: function() { this.checkSession(); }
    };
    window.AppAuth = AppAuth;
    AppAuth.init();
})();
