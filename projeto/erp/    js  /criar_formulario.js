/** ############################################################################## */
/** ERP ABP - GERADOR DE FORMULÁRIO DINÂMICO
 * Baseado na variável 'tabela_selecionada'
 
<script src="js/criar_formulario.js"></script>

CREATE OR REPLACE FUNCTION get_column_metadata(t_name text)
RETURNS TABLE (
    column_name text,
    data_type text,
    is_nullable text,
    foreign_table text,
    foreign_column text
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cols.column_name::text,
        cols.data_type::text,
        cols.is_nullable::text,
        fk.foreign_table_name::text AS foreign_table,
        fk.foreign_column_name::text AS foreign_column
    FROM information_schema.columns cols
    LEFT JOIN (
        SELECT 
            kcu.column_name, 
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name
        FROM information_schema.key_column_usage kcu
        JOIN information_schema.constraint_column_usage ccu 
          ON kcu.constraint_name = ccu.constraint_name
        WHERE kcu.table_name = t_name
    ) fk ON cols.column_name = fk.column_name
    WHERE cols.table_name = t_name 
      AND cols.table_schema = 'public'
    ORDER BY cols.ordinal_position;
END;
$$;

 * ############################################################################## */

const CriarFormulario = {
    // Colunas que não devem aparecer no formulário de inserção
    ignorar: ['id', 'created_at', 'usuario_id', 'user_id'],

    async carregar() {
        const area = document.getElementById('area-dinamica');
        const tabela = window.tabela_selecionada;

        if (!tabela) return;

        area.innerHTML = `<div class="loader"><i class="fas fa-sync fa-spin"></i> Mapeando estrutura de ${tabela}...</div>`;

        try {
            // 1. Busca metadados da tabela
            const { data: colunas, error } = await _supabase.rpc('get_column_metadata', { t_name: tabela });
            if (error) throw error;

            let formHtml = `<form id="form-universal" style="width: 100%; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">`;

            for (const col of colunas) {
                if (this.ignorar.includes(col.column_name)) continue;

                formHtml += `<div class="campo-grupo" style="display: flex; flex-direction: column;">
                                <label style="font-weight: bold; margin-bottom: 5px; text-transform: capitalize;">${col.column_name.replace('_', ' ')}</label>`;

                // 2. Lógica de tipo de Input
                if (col.foreign_table) {
                    // Caso seja Chave Estrangeira (Select de outra tabela)
                    formHtml += `<select name="${col.column_name}" id="ref_${col.column_name}" class="input-form">
                                    <option value="">Carregando ${col.foreign_table}...</option>
                                 </select>`;
                    this.preencherSelectEstrangeiro(col.column_name, col.foreign_table);
                } 
                else if (col.data_type.includes('date') || col.data_type.includes('timestamp')) {
                    formHtml += `<input type="date" name="${col.column_name}" class="input-form">`;
                } 
                else if (col.data_type.includes('numeric') || col.data_type.includes('integer')) {
                    formHtml += `<input type="number" step="0.01" name="${col.column_name}" class="input-form">`;
                } 
                else {
                    formHtml += `<input type="text" name="${col.column_name}" class="input-form">`;
                }

                formHtml += `</div>`;
            }

            formHtml += `<div style="grid-column: span 2; text-align: right; margin-top: 20px;">
                            <button type="submit" class="btn btn-home" style="width: 200px;">
                                <i class="fas fa-save"></i> Salvar em ${tabela}
                            </button>
                         </div></form>`;

            area.innerHTML = formHtml;
            area.style.borderStyle = "solid";

        } catch (err) {
            console.error("Erro ao criar form:", err);
            area.innerHTML = `<p style="color:red">Erro ao carregar estrutura da tabela.</p>`;
        }
    },

    // Busca dados da tabela relacionada (ex: nomes das entidades)
    async preencherSelectEstrangeiro(campoId, tabelaDestino) {
        const { data, error } = await _supabase.from(tabelaDestino).select('*');
        const select = document.getElementById(`ref_${campoId}`);
        
        if (!error && data) {
            let options = `<option value="">-- Selecione --</option>`;
            data.forEach(item => {
                // Tenta achar uma coluna de nome para exibir, se não usa o ID
                const rotulo = item.nome || item.nome_completo || item.descricao || item.id;
                options += `<option value="${item.id}">${rotulo}</option>`;
            });
            select.innerHTML = options;
        }
    }
};

// Escuta o componente select_tabela.js
document.addEventListener('change', (e) => {
    if (e.target.id === 'tabela_ativa') {
        CriarFormulario.carregar();
    }
});
