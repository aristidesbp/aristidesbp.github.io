import { supabase } from './config_supabase.js';

async function verificarSessao() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
        window.location.href = 'login.html';
        return;
    }

    // Verifica se o perfil existe e carrega permissões
    const { data: perfil } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (!perfil) {
        // Se o usuário existe no Auth mas não no Perfis (erro de trigger)
        window.location.href = 'login.html';
    }

    window.usuarioLogado = perfil;
    console.log(`Verificado: ${perfil.nome_completo} (${perfil.cargo})`);
}

verificarSessao();
