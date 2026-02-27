// src/controller/entidadeController.js

// 1. Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await carregarEntidades();
});

async function carregarEntidades() {
    try {
        const dados = await entidadeModel.listar();
        renderizarTabela(dados);
    } catch (error) {
        alert("Erro ao carregar dados: " + error.message);
    }
}

// 2. Renderização da Tabela
function renderizarTabela(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => {
        const foneLimpo = e.telefone ? e.telefone.replace(/\D/g, '') : '';
        return `
        <tr>
            <td><input type="checkbox" class="row-checkbox" value="${e.id}" onclick="updateSelectedCount()"></td>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" onclick="editar('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="excluirUnico('${e.id}')"><i class="fas fa-trash"></i></button>
                ${foneLimpo ? `<button class="btn-wpp" onclick="window.open('https://wa.me/55${foneLimpo}')"><i class="fab fa-whatsapp"></i></button>` : ''}
            </td>
        </tr>`;
    }).join('');
}

// 3. Lógica de Exclusão
async function excluirUnico(id) {
    if (confirm("Deseja excluir esta entidade?")) {
        await entidadeModel.excluir(id);
        await carregarEntidades();
    }
}

async function excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
    if (ids.length > 0 && confirm(`Excluir ${ids.length} itens?`)) {
        await entidadeModel.excluir(ids);
        updateSelectedCount();
        await carregarEntidades();
    }
}

// 4. Funções Auxiliares de UI (CEP e Senha)
async function handleCEP(valor) {
    const data = await entidadeModel.buscarCEP(valor);
    if (data && !data.erro) {
        document.getElementById('logradouro').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
    }
}

function updateSelectedCount() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkArea = document.getElementById('bulk-area');
    if (bulkArea) bulkArea.style.display = selecionados > 0 ? 'flex' : 'none';
    const countLabel = document.getElementById('selected-count');
    if (countLabel) countLabel.innerText = `${selecionados} selecionados`;
}
