// src/models/UsuarioModel.js
const UsuarioModel = {
    // Busca o perfil do usuário logado
    async getPerfil() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error) throw error;
        return data;
    },

    // Atualiza dados como Bio ou Avatar
    async atualizarPerfil(dados) {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('usuarios')
            .update(dados)
            .eq('user_id', user.id);

        if (error) throw error;
        return data;
    },

    // Logout do sistema
    sair() {
        localStorage.clear();
        sessionStorage.clear();
        return supabase.auth.signOut();
    }
};

