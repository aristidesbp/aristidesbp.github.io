/** ############################################################################## */
/** ERP ABP - SELETOR DE TABELAS (Componente Modular)
 * Gera o menu suspenso e armazena a escolha na variável global 'tabela_selecionada'
 * ADICIONE NO HTML:
 <div id="container-seletor-tabelas"></div>
 <script src="js/select_tabela.js"></script>  
 * ############################################################################## */

(() => {
    "use strict";

    // 1. Variável Global que armazenará o nome da tabela
    window.tabela_selecionada = "";

    const inicializarComponente = async () => {
        // Alvo onde o seletor será injetado (procure por uma div com este ID na sua página)
        const container = document.getElementById('container-seletor-tabelas');
        if (!container) return; // Se não achar a div, não faz nada

        // 2. Aguarda o Supabase estar pronto (vindo do conexao_navbar.js)
        if (typeof window._supabase === "undefined") {
            setTimeout(inicializarComponente, 500);
            return;
        }

        try {
            // 3. Busca as tabelas via sua função RPC
            const { data, error } = await _supabase.rpc('get_tables');

            if (error) throw error;

            if (data && data.length > 0) {
                // 4. Injeta o CSS e o HTML do componente
                const html = `
                    <div id="wrapper-select-erp" style="display: flex; align-items: center; gap: 10px; font-family: sans-serif;">
                        <select id="tabela_ativa" style="
                            padding: 8px 12px;
                            border-radius: 6px;
                            border: 1px solid #cbd5e1;
                            background: #fff;
                            font-size: 14px;
                            color: #1e293b;
                            cursor: pointer;
                            outline: none;
                            min-width: 200px;
                        ">
                            <option value="">-- Selecione a Tabela --</option>
                            ${data.map(t => `<option value="${t.table_name}">${t.table_name.toUpperCase()}</option>`).join('')}
                        </select>
                        <span id="status-tabela" style="font-size: 13px; color: #64748b; font-weight: 500;"></span>
                    </div>
                `;

                container.innerHTML = html;

                // 5. Escutador de Eventos
                const selectElement = document.getElementById('tabela_ativa');
                const statusTexto = document.getElementById('status-tabela');

                selectElement.addEventListener('change', (e) => {
                    const valor = e.target.value;
                    
                    // Atualiza a variável global
                    window.tabela_selecionada = valor;

                    // 6. Adiciona a mensagem ao lado conforme solicitado
                    if (valor) {
                        statusTexto.innerHTML = `<i class="fas fa-check-circle" style="color: #3ecf8e;"></i> (<b>${valor}</b>)`;
                        console.log("Variável global 'tabela_selecionada' definida como:", window.tabela_selecionada);
                    } else {
                        statusTexto.innerText = "";
                    }
                });

            }
        } catch (err) {
            console.error("Erro ao carregar select_tabela.js:", err);
        }
    };

    // Executa ao carregar o script
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarComponente);
    } else {
        inicializarComponente();
    }
})();
