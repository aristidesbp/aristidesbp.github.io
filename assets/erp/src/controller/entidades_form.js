// view_form_entidades.js
(function () {

    function formEntidades() {
        const container = document.getElementById('form_entidades');

        // Se não existir o container, não faz nada
        if (!container) return;

        // Evita reinjeção
        if (container.dataset.loaded === 'true') return;
        container.dataset.loaded = 'true';

        // HTML da navbar (APENAS VIEW)
        container.innerHTML = `
 <!-- HTML GERADO PELO CONTAINER -->
 
    
<!-- FORMULARIO -->
<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Cadastro de Entidade</h3>
        <input type="hidden" id="edit-id">

        <div class="section-title">Informações e Acesso</div>
        <div class="form-grid">
            <div><label>Nome Completo / Razão *</label><input type="text" id="nome_completo"></div>
            <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
            <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
            <div><label>E-mail</label><input type="email" id="email"></div>
            <div><label>Telefone / WhatsApp *</label><input type="text" id="telefone"></div>
            <div>
                <label>Senha Interna</label>
                <div class="password-wrapper">
                    <input type="password" id="senha_acesso">
                    <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                </div>
            </div>
            
            <div>
                <label>Nível de Acesso</label>
                <select id="acesso">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="comprador">Comprador</option>
                    <option value="master">Master</option>
                </select>
            </div>
            <div>
                <label>Relacionamento</label>
                <select id="relacionamento">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="terceirizado">Terceirizado</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
            <div>
                <label>Status</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="desativado">Desativado</option>
                </select>
            </div>
            <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
        </div>

        <div class="section-title">Endereço</div>
        <div class="form-grid">
            <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
            <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
            <div><label>Número</label><input type="text" id="numero"></div>
            <div><label>Bairro</label><input type="text" id="bairro"></div>
            <div><label>Cidade</label><input type="text" id="cidade"></div>
            <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
        </div>

        <div class="section-title">Complementos</div>
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>URL de Arquivos</label><input type="text" id="arquivos_url"></div>
            <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card" style="margin-bottom: 10px; padding: 15px;">
        <label><i class="fas fa-search"></i> BUSCAR ENTIDADE</label>
        <input type="text" id="inputBusca" placeholder="Digite o nome para filtrar..." onkeyup="filtrarTabela()">


  // Altere para incluir o display: none; no style
<div id="bulk-area" style="display: none; background: #fee2e2; padding: 10px; border-radius: 8px; margin-bottom: 15px; align-items: center; justify-content: space-between;">
    <span id="selected-count" style="font-weight:bold; color:#b91c1c;">0 selecionados</span>
    <button onclick="deleteSelectedEntities()" style="background: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">
        <i class="fas fa-trash"></i> Excluir Selecionados
    </button>
</div>
<!--
<div id="bulk-area" style="display: none; background: #fee2e2; padding: 15px; border-radius: 8px; border: 1px solid #fecaca; margin-top: 15px; display: flex; align-items: center; justify-content: space-between;">
    <span id="selected-count" style="font-weight:bold; color:#b91c1c;">0 selecionados</span>
    <button onclick="deleteSelectedEntities()" style="background: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">
        <i class="fas fa-trash"></i> Excluir Selecionados
    </button>
</div> -->

        
        <div class="export-area">
            <button class="btn-export" onclick="exportarPDFListagem()">
                <i class="fas fa-list"></i> Exportar Listagem (PDF)
            </button>
            <button class="btn-export btn-export-full" onclick="exportarPDFFichaCompleta()">
                <i class="fas fa-file-invoice"></i> Exportar Fichas Detalhadas (PDF)
            </button>
        </div>
    </div>

    <div class="table-container">
        <table>

            
            <thead>
    <tr>
        <th width="40"><input type="checkbox" id="select-all" onclick="toggleSelectAllEntities()"></th>
        <th>Nome / Tipo</th>
        <th>Telefone / E-mail</th>
        <th>Acesso / Status</th>
        <th>Ações</th>
    </tr>
</thead>



            
            <tbody id="entities-list"></tbody>
        </table>
    </div>
</div>


<!-- FIM DO HTML GERADO PELO CONTÊINER -->
 `;
    }

    // Execução segura, com ou sem defer
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', formEntidades);
    } else {
        formEntidades();
    }

})();


