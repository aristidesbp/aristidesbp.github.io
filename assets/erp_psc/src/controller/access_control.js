/*

Passo 2: Criar o Guardião de Rotas (Frontend)
Agora, vamos criar uma classe AccessControl em JavaScript. Ela deve rodar antes de qualquer outro script na página para evitar que o usuário veja o conteúdo antes de ser expulso.

*/
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

/*
Passo 3: Aplicar nas Páginas
No topo de cada página HTML (dentro de um script module), você define quem pode entrar:

<script>
//Exemplo na admin_master.html
import { accessControl } from './security/access_control.js';
// Só permite o Master entrar
accessControl.checkAccess(['master']);
</script>

<script>
//Exemplo na evolucao_clinica.html:
import { accessControl } from './security/access_control.js';
// Permite Master e Psicopedagogos
accessControl.checkAccess(['master', 'psicopedagogo']);
</script>

<script type="module">
    import { accessControl } from './security/access_control.js';

    // Bloqueia qualquer um que não seja 'paciente'
    // Se um psicopedagogo tentar entrar aqui, ele será redirecionado
    accessControl.checkAccess(['paciente']);
</script>

*/
