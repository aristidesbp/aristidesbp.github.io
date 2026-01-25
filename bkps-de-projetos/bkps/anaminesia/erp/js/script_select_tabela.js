/** ############################################################################## */
/** ERP ABP - SELETOR DE TABELAS (Componente Modular)
 * Gera o menu suspenso e armazena a escolha na variável global 'tabela_selecionada'
 * ADICIONE NO HTML:
 <div id="container-seletor-tabelas"></div>
 <script src="js/select_tabela.js"></script>  

* ADICIONE SQL:
-- Cria uma função para listar tabelas com segurança
CREATE OR REPLACE FUNCTION get_tables()
RETURNS TABLE (table_name text) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT tablename::text
  FROM pg_tables
  WHERE schemaname = 'public';
END;
$$;



 
 * ############################################################################## */



(() => {
    "use strict";

    // Variável Global solicitada
    window.tabela_selecionada = "";

    const inicializarComponente = async () => {
        const container = document.getElementById('container-seletor-tabelas');
        if (!container) return;

        if (typeof window._supabase === "undefined") {
            setTimeout(inicializarComponente, 500);
            return;
        }

        try {
            const { data, error } = await _supabase.rpc('get_tables');
            if (error) throw error;

            if (data && data.length > 0) {
                const html = `
                    <div id="wrapper-select-erp" style="display: flex; align-items: center; gap: 12px; font-family: sans-serif; padding: 10px 0;">
                        <select id="tabela_ativa" style="
                            padding: 8px 12px;
                            border-radius: 6px;
                            border: 1px solid #cbd5e1;
                            background: #fff;
                            font-size: 14px;
                            color: #1e293b;
                            cursor: pointer;
                            outline: none;
                            min-width: 220px;
                            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                        ">
                            <option value="">-- Selecione a Tabela --</option>
                            ${data.map(t => `<option value="${t.table_name}">${t.table_name.toUpperCase()}</option>`).join('')}
                        </select>
                        <span id="status-tabela" style="font-size: 13px; color: #64748b; font-weight: 500; display: flex; align-items: center; gap: 5px;"></span>
                    </div>
                `;

                container.innerHTML = html;

                const selectElement = document.getElementById('tabela_ativa');
                const statusTexto = document.getElementById('status-tabela');

                selectElement.addEventListener('change', (e) => {
                    const valor = e.target.value;
                    window.tabela_selecionada = valor;

                    if (valor) {
                        // Mensagem personalizada para lembrar o nome da variável
                        statusTexto.innerHTML = `
                            <i class="fas fa-check-circle" style="color: #3ecf8e;"></i> 
                            <span style="color: #059669;">${valor}</span> 
                            <span style="color: #94a3b8; font-style: italic;">(tabela_selecionada)</span>
                        `;
                    } else {
                        statusTexto.innerText = "";
                    }
                });
            }
        } catch (err) {
            console.error("Erro ao carregar seletor:", err);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarComponente);
    } else {
        inicializarComponente();
    }
})();
