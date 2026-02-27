// src/model/entidade_model.js

const entidadeModel = {
    // Busca todas as entidades do banco
    async listar() {
        const { data, error } = await supabase
            .from('entidades')
            .select('*')
            .order('nome_completo', { ascending: true });
        if (error) throw error;
        return data;
    },

    // Salva (Insert) ou Atualiza (Update)
    async salvar(dados) {
        const { data, error } = await supabase
            .from('entidades')
            .upsert([dados]);
        if (error) throw error;
        return data;
    },

    // Deleta um ou vários IDs
    async excluir(ids) {
        const { error } = await supabase
            .from('entidades')
            .delete()
            .in('id', Array.isArray(ids) ? ids : [ids]);
        if (error) throw error;
        return true;
    },

    // Busca endereço via CEP (API Externa)
    async buscarCEP(cep) {
        const cleanCEP = cep.replace(/\D/g, '');
        if (cleanCEP.length !== 8) return null;
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
            return await res.json();
        } catch (e) {
            console.error("Erro na API de CEP", e);
            return null;
        }
    }
};
