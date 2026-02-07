/** * ERP ABP - Gestão de Entidades (Refatorado)
 * Local: assets/entidades/script_entidades.js
 * Depende de: assets/supabase_config.js
 */

let currentData = [];

// 1. Mostrar/Esconder Senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('senha_acesso');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 2. Busca de CEP (ViaCEP)
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            }
        } catch { console.error("Erro ao buscar CEP"); }
    }
}

// 3. Carregar Entidades (Read)
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

// 4. Salvar ou Atualizar (Create/Update)
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    
    // Coleta todos os campos do formulário dinamicamente
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

    // Se for novo cadastro, o user_id é inserido automaticamente pelo DEFAULT auth.uid() no banco
    let response;
    if (id) {
        response = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
    } else {
        response = await window.supabaseClient.from('entidades').insert([payload]);
    }

    if (response.error) {
        alert("Erro ao salvar: " + response.error.message);
    } else {
        alert(id ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
        resetForm();
        loadEntities();
    }
}

// 5. Deletar (Delete)
async function deleteEntity(id) {
    if (confirm("Tem certeza que deseja excluir esta entidade?")) {
        const { error } = await window.supabaseClient.from('entidades').delete().eq('id', id);
        if (error) alert("Erro ao excluir: " + error.message);
        else loadEntities();
    }
}

// 6. Resetar Formulário
function resetForm() {
    document.querySelectorAll('input, select, textarea').forEach(i => {
        if(i.id === 'avaliacao') i.value = '5';
        else if(i.tagName === 'SELECT') i.selectedIndex = 0;
        else i.value = '';
    });
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
    document.getElementById('btn-save').innerText = "Salvar Entidade";
    document.getElementById('btn-cancel').style.display = "none";
}

// 7. Renderizar Tabela (Interface)
function renderTable(data) {
    const list = document.getElementById('entities-list');
    list.innerHTML = data.map(e => `
        <tr>
            <td>
                <strong>${e.nome_completo}</strong><br>
                <small class="tag">${e.tipo_entidade || 'N/A'}</small>
            </td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td>
                <span class="status-${(e.status_entidade || 'ativo').toLowerCase()}">${e.status_entidade || 'Ativo'}</span>
                <br><small>${e.tipo_acesso || 'Cliente'}</small>
            </td>
            <td>
                <button class="btn-edit" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                ${e.telefone ? `<button class="btn-wpp" onclick="window.open('https://wa.me/55${e.telefone.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>` : ''}
            </td>
        </tr>
    `).join('');
}

// 8. Carregar dados para edição
async function editFull(id) {
    const { data, error } = await window.supabaseClient.from('entidades').select('*').eq('id', id).single();
    if (error || !data) return;

    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = data[k] || '';
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando Entidade";
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicialização
document.addEventListener('DOMContentLoaded', loadEntities);
