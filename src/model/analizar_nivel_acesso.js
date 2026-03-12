/**
 * Nome do arquivo: analizar_nivel_acesso.js
 * Objetivo: Analisar nível de acesso (Versão Clássica)
 */

async function analisarNivelAcesso() {
    // 1. Verifica se o Supabase está disponível
    const supabase = window.supabaseClient;
    if (!supabase) {
        console.error("Supabase não configurado.");
        return 'login_clinica.html';
    }

    try {
        // 2. Obtém o usuário logado
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("Usuário não encontrado");

        // 3. Busca o nível na tabela 'usuarios' (ajuste o nome da tabela se necessário)
        const { data: perfil, error: perfilError } = await supabase
            .from('usuarios') 
            .select('nivel_acesso')
            .eq('id', user.id)
            .single();

        if (perfilError) throw perfilError;

        // 4. Define a rota baseada no nível
        const rotas = {
            'admin': 'dashbord_supervisor.html',
            'psicopedagogo': 'dashbord_supervisor.html',
            'paciente': 'dashbord_paciente.html'
        };

        return rotas[perfil.nivel_acesso] || 'bem_vindo.html';

    } catch (err) {
        console.error("Erro na análise:", err.message);
        return 'login_clinica.html';
    }
}
