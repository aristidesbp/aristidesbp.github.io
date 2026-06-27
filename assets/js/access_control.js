/**
 * CLASSE: AccessControl - ERP-PSC
 * Finalidade: Gestão de permissões de rota e visibilidade de interface (Fase 1).
 */
import { supabase } from '../model/supabase_config.js';

class AccessControl {
    constructor() {
        this.user = null;
        this.userRole = null;
        this.isAuthorized = false;
    }

    /**
     * Valida o acesso à página e define o perfil do usuário
     * @param {Array} allowedRoles - Lista de papéis permitidos (ex: ['master', 'psicopedagogo'])
     */
    async checkAccess(allowedRoles) {
        try {
            // 1. Verifica sessão ativa no Supabase
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !session) {
                console.warn("Usuário não autenticado.");
                this.redirect('login.html?reason=unauthorized');
                return null;
            }

            // 2. Busca o papel (role) na tabela 'profiles'
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();

            if (profileError || !profile) {
                console.error("Erro ao recuperar perfil de acesso.");
                this.redirect('login.html?reason=no_profile');
                return null;
            }

            // 3. Valida se o papel do usuário está na lista permitida
            if (!allowedRoles.includes(profile.role)) {
                console.error(`Acesso negado para o papel: ${profile.role}`);
                // Redireciona para uma página neutra ou dashboard inicial
                this.redirect('index.html?error=forbidden');
                return null;
            }

            // 4. Se chegou aqui, está autorizado
            this.user = session.user;
            this.userRole = profile.role;
            this.isAuthorized = true;

            console.log(`[Segurança] Acesso concedido: ${this.userRole}`);
            
            // Aplica restrições de elementos na tela automaticamente
            this.applyUIConstraints();

            return profile.role;

        } catch (err) {
            console.error("Erro crítico no sistema de segurança:", err);
            this.redirect('login.html');
        }
    }

    /**
     * Varre o DOM e remove ou esconde elementos que não pertencem ao nível de acesso
     * Baseado no atributo HTML 'data-role'
     */
    applyUIConstraints() {
        if (!this.userRole) return;

        // Busca todos os elementos que possuem restrição de papel
        const elements = document.querySelectorAll('[data-role]');

        elements.forEach(el => {
            const rolesAllowedForThisElement = el.getAttribute('data-role').split(',');
            
            // Se o papel do usuário logado NÃO estiver na lista do elemento
            if (!rolesAllowedForThisElement.includes(this.userRole)) {
                // Remove o elemento do DOM para que não possa ser habilitado pelo 'Inspecionar Elemento'
                el.remove(); 
            } else {
                // Se for permitido, garante que ele esteja visível
                el.style.display = 'block'; 
            }
        });
    }

    /**
     * Atalho para redirecionamento
     */
    redirect(url) {
        window.location.href = url;
    }

    /**
     * Retorna os dados do usuário logado
     */
    getUser() {
        return this.user;
    }
}

// Exporta uma instância única (Singleton)
export const accessControl = new AccessControl();
