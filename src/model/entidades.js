/**
 * model_entidades.js
 * Lógica de CRUD para a tabela 'entidades'
 */

// --- FUNÇÃO DE CARREGAMENTO (READ) ---
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar entidades:", error.message);
        return;
    }
    renderTable(data || []);
}

// --- FUNÇÃO DE RENDERIZAÇÃO DA TABELA ---
function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => `
        <tr>
            <td><strong>${e.nome_completo}</strong><br><small class="text-slate-500 uppercase text-xs">${e.relacionamento || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small class="text-slate-400">${e.email || '-'}</small></td>
            <td><span class="status-tag ${e.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} p-1 px-2 rounded-full text-xs font-bold uppercase">
                ${e.status || 'ativo'}
            </span></td>
            <td>
                <button class="btn-edit text-blue-500 hover:text-blue-700 mr-2" onclick="editFull('${e.id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-del text-red-500 hover:text-red-700" onclick="deleteEntity('${e.id}')" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// --- FUNÇÃO DE SALVAR/ATUALIZAR (CREATE/UPDATE) ---
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const btn = document.getElementById('btn-save');
    
    // Mapeamento dos campos do formulário para as colunas do banco
    const payload = {
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha_acesso: document.getElementById('senha_acesso').value,
        relacionamento: document.getElementById('relacionamento').value,
        status: document.getElementById('status').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    if (!payload.nome_completo || !payload.telefone) {
        alert("Por favor, preencha o Nome e o Telefone.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Processando...";

    let result;
    if (id) {
        result = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('entidades').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
        resetForm();
        loadEntities();
    }
    btn.disabled = false;
    btn.innerText = id ? "Atualizar Entidade" : "Salvar Entidade";
}

// --- FUNÇÃO DE DELETAR (DELETE) ---
async function deleteEntity(id) {
    if (!confirm("Tem certeza que deseja excluir esta entidade permanentemente?")) return;

    const { error } = await window.supabaseClient
        .from('entidades')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        loadEntities();
    }
}

// --- FUNÇÃO DE BUSCAR DADOS PARA EDIÇÃO ---
async function editFull(id) {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return alert("Erro ao carregar dados.");

    // Preenche o formulário
    document.getElementById('edit-id').value = data.id;
    document.getElementById('nome_completo').value = data.nome_completo || '';
    document.getElementById('cpf').value = data.cpf || '';
    document.getElementById('data_nascimento').value = data.data_nascimento || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('telefone').value = data.telefone || '';
    document.getElementById('senha_acesso').value = data.senha_acesso || '';
    document.getElementById('relacionamento').value = data.relacionamento || 'cliente';
    document.getElementById('status').value = data.status || 'ativo';
    document.getElementById('cep').value = data.cep || '';
    document.getElementById('logradouro').value = data.logradouro || '';
    document.getElementById('bairro').value = data.bairro || '';
    document.getElementById('cidade').value = data.cidade || '';
    document.getElementById('estado').value = data.estado || '';

    // Ajustes visuais
    document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- UTILITÁRIOS: RESET, FILTRO, CEP ---

function resetForm() {
    document.getElementById('edit-id').value = '';
    document.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
    });
    document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
    document.getElementById('btn-save').innerText = "Salvar Entidade";
    document.getElementById('btn-cancel').style.display = "none";
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#entities-list tr');
    linhas.forEach(linha => {
        linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
}

async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
            }
        } catch (e) { console.error("Erro CEP:", e); }
    }
}

function togglePasswordVisibility() {
    const input = document.getElementById('senha_acesso');
    const icon = document.getElementById('togglePassword');
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Inicialização
document.addEventListener('DOMContentLoaded', loadEntities);
