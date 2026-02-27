 
const entidadeModel = {
    async listarTodos() {
        const { data, error } = await supabase.from('entidades').select('*').order('nome_completo');
        if (error) throw error;
        return data;
    },

    async salvar(entidade) {
        return await supabase.from('entidades').upsert([entidade]);
    },

    async excluirMuitos(ids) {
        return await supabase.from('entidades').delete().in('id', ids);
    },

    async buscarPorCEP(cep) {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        return await res.json();
    }
};
