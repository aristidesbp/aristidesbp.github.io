// Lógica de busca de produto no PDV integrada ao Supabase
import { supabase } from './config_supabase.js';

const inputCod = document.getElementById('barcode_input'); // ID de formulário

inputCod.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('codigo_barras', inputCod.value)
            .single();

        if (data) {
            adicionarAoCarrinho(data); // Função que renderiza na tabela
            inputCod.value = '';
        } else {
            alert('Produto não encontrado!');
        }
    }
});
