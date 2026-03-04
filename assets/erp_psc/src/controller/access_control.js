import { supabase } from '../model/supabase_config.js';

class AccessControl {
    constructor() {
        this.user = null;
        this.userRole = null;
    }

    /**
     * Verifica se o usuário tem permissão para estar na página atual
     * @param {Array} allowedRoles - Ex: ['master', 'psicopedagogo']
     */
    async checkAccess(allowedRoles) {
        // 1. Verifica se há um usuário logado
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            this.redirect('login.html?reason=unauthorized');
            return;
        }

        // 2. Busca o nível de acesso (role) no perfil do banco
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

        if (profileError || !allowedRoles.includes(profile.role)) {
            console.error("Acesso negado: Nível insuficiente.");
            this.redirect('dashboard.html?error=forbidden'); 
            return;
        }

        console.log(`Acesso concedido: Bem-vindo, ${profile.role}`);
        this.user = session.user;
        this.userRole = profile.role;
    }

    redirect(url) {
        window.location.href = url;
    }
}

export const accessControl = new AccessControl();
