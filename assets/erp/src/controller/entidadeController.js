async function initEntidades() {
    try {
        const dados = await entidadeModel.listarTodos();
        renderTable(dados);
    } catch (err) {
        console.error("Erro ao carregar:", err);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    tbody.innerHTML = data.map(e => `
        <tr>
            <td><input type="checkbox" class="row-checkbox" value="${e.id}" onclick="updateSelectedCount()"></td>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" onclick="editEntity('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-wpp" onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>
            </td>
        </tr>
    `).join('');
}

async function handleDeleteSelected() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked');
    const ids = Array.from(selecionados).map(cb => cb.value);

    if (ids.length > 0 && confirm(`Excluir ${ids.length} itens?`)) {
        await entidadeModel.excluirMuitos(ids);
        initEntidades();
        updateSelectedCount();
    }
}

// Funções de UI
function updateSelectedCount() {
    const count = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkArea = document.getElementById('bulk-area');
    bulkArea.style.display = count > 0 ? 'flex' : 'none';
    document.getElementById('selected-count').innerText = `${count} selecionados`;
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', initEntidades);
