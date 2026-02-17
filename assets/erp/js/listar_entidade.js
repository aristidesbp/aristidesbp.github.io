//##################################################################################
     /** * ERP ABP - listar.js */
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }
    renderTable(data || []);
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => `
        <tr>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                ${e.telefone ? `<button class="btn-wpp" onclick="window.open('https://wa.me/55${e.telefone.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>` : ''}
            </td>
        </tr>
    `).join('');
}

// Inicia ao carregar a página
document.addEventListener('DOMContentLoaded', loadEntities);

//##################################################################################
