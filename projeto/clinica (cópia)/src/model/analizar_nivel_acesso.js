/**
 * Lógica de Redirecionamento - ERP-PSC
 * Este script lê a 'role' definida na tabela 'profiles' e envia o usuário
 * para a dashboard correspondente.
 */

async function executarRedirecionamento() {
    try {
        // 1. Obtém o usuário logado
        const { data: { user }, error: authError } = await window.supabaseClient.auth.getUser();

        if (authError || !user) {
            window.location.href = 'login.html';
            return;
        }

        // 2. Busca o nível de acesso (role) na tabela profiles
        const { data: profile, error: dbError } = await window.supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (dbError || !profile) {
            console.error("Perfil não encontrado:", dbError);
            alert("Erro ao identificar perfil de acesso.");
            return;
        }

        // 3. Decisão de destino baseada na 'role' do banco
        const nivel = profile.role;

        switch (nivel) {
            case 'admin':
                window.location.href = 'dashboard_supervisor.html';
                break;
            case 'usuario':
                window.location.href = 'dashbord_pedagogo.html';
                break;
            case 'paciente':
                window.location.href = 'dashbord_paciente.html';
                break;
            default:
                // Caso algo esteja errado, manda para o bem-vindo ou login
                window.location.href = 'bem_vindo.html';
                break;
        }

    } catch (err) {
        console.error("Erro inesperado:", err);
    }
}

// Executa a função automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', executarRedirecionamento);
