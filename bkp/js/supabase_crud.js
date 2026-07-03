//assets/js/supabase_crud.js
/**
 * Função para buscar registros de uma tabela específica
 * @param {string} nomeDaTabela - O nome da tabela no seu banco Supabase
 */
async function buscarDados(nomeDaTabela) {
    try {
        // A variável 'supabase' já está disponível se o script for carregado após a config
        const { data, error } = await supabase
            .from(nomeDaTabela)
            .select('*'); // Seleciona todas as colunas

        if (error) {
            console.error("Erro ao buscar dados:", error.message);
            return;
        }

        console.log("Dados recebidos com sucesso:", data);
        return data;
    } catch (err) {
        console.error("Erro inesperado:", err);
    }
}
