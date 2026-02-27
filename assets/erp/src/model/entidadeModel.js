// src/model/entidadeModel.js

const entidadeModel = {
    // Busca todas as entidades
    async listar() {
        const { data, error } = await supabase
            .from('entidades')
            .select('*')
            .order('nome_completo', { ascending: true });
        if (error) throw error;
        return data;
    },

    // Salva ou Atualiza uma entidade
    async salvar(dados) {
        const { data, error } = await supabase
            .from('entidades')
            .upsert([dados]);
        if (error) throw error;
        return data;
    },

    // Exclui uma ou várias
    async excluir(ids) {
        const { error } = await supabase
            .from('entidades')
            .delete()
            .in('id', Array.isArray(ids) ? ids : [ids]);
        if (error) throw error;
        return true;
    },

    // Busca endereço via CEP
    async buscarCEP(cep) {
        const cleanCEP = cep.replace(/\D/g, '');
        if (cleanCEP.length !== 8) return null;
        const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
        return await res.json();
    }
};
