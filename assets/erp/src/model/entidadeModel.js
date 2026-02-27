// Funções puras de banco de dados
const entidadeModel = {
    async listarTudo() {
        const { data, error } = await supabase.from('entidades').select('*');
        if (error) throw error;
        return data;
    },

    async excluirMuitos(ids) {
        return await supabase.from('entidades').delete().in('id', ids);
    }
};
