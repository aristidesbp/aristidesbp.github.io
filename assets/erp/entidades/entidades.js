/** * ERP ABP - Gestão de Entidades
 * Local: assets/entidades/script_entidades.js
 */

let currentData = [];

// Carregamento Inicial
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }
    currentData = data || [];
    renderTable(currentData);
}

// Salvar / Editar
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    
    // Lista de campos baseada no seu HTML
    const campos = [
        'nome_completo', 'cpf', 'data_nascimento', 'genero', 'estado_civil',
        'tipo_entidade', 'status_entidade', 'tipo_acesso', 'email', 'telefone',
        'senha_acesso', 'cep', 'logradouro', 'numero', 'bairro', 'cidade',
        'estado', 'avaliacao', 'observacoes'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) payload[c] = el.value;
    });

    let result;
    if (id) {
        result = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('entidades').insert([payload]);
    }

    if (result.error) {
        alert("Erro: " + result.error.message);
    } else {
        alert("Sucesso!");
        resetForm();
        loadEntities();
    }
}

// Renderização da Tabela
function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    tbody.innerHTML = data.map(e => `
        <tr>
            <td><strong>${e.nome_completo}</strong><br><small>${e.tipo_entidade}</small></td>
            <td>${e.telefone || '-'}<br>${e.email || '-'}</td>
            <td><span class="status-tag">${e.status_entidade}</span></td>
            <td>
                <button onclick="editFull('${e.id}')" class="btn-edit"><i class="fas fa-edit"></i></button>
                <button onclick="deleteEntity('${e.id}')" class="btn-del"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Função para buscar dados e preencher o formulário para edição
async function editFull(id) {
    const entity = currentData.find(e => e.id === id);
    if (!entity) return;

    Object.keys(entity).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = entity[key] || '';
    });

    document.getElementById('edit-id').value = entity.id;
    document.getElementById('form-title').innerText = "Editando: " + entity.nome_completo;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', loadEntities);
