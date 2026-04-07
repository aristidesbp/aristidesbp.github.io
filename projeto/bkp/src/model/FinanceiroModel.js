// src/models/FinanceiroModel.js
const FinanceiroModel = {
    // Lista todos os registros usando a View (com cálculos de entrada/saída)
    async listarTudo() {
        const { data, error } = await supabase
            .from('v_financeiro') // Usa a view que você criou
            .select('*')
            .order('data_vencimento', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Insere uma nova transação
    async criar(dadosFinanceiros) {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Adiciona o user_id automaticamente para respeitar o RLS
        const payload = { ...dadosFinanceiros, user_id: user.id };

        const { data, error } = await supabase
            .from('financeiro')
            .insert([payload]);

        if (error) throw error;
        return data;
    },

    // Atualiza o status de pagamento (toggle)
    async atualizarStatus(id, pago) {
        const { data, error } = await supabase
            .from('financeiro')
            .update({ 
                status: pago, 
                data_pagamento: pago ? new Date().toISOString().split('T')[0] : null 
            })
            .eq('id', id);

        if (error) throw error;
        return data;
    },

    // Deleta um registro
    async excluir(id) {
        const { error } = await supabase
            .from('financeiro')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};

