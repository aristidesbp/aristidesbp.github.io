/**
 * js/clientes.js
 * Depende de: js/conexao.js (que fornece a variável _supabase)
 */

// Busca endereço pelo CEP usando ViaCEP
async function buscaCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
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
        } catch {
            console.error("Erro ao buscar CEP");
        }
    }
}

// Carrega a lista de clientes do banco (CRUD - Read)
async function loadClients() {
    const { data, error } = await _supabase
        .from('clientes')
        .select('*')
        .order('nome_completo');

    if (error) {
        console.error("Erro ao carregar clientes:", error.message);
        return;
    }

    const list = document.getElementById('clients-list');
    list.innerHTML = (data || []).map(c => `
        <tr>
            <td><b>${c.nome_completo}</b><br><small>${c.email || ''}</small></td>
            <td>${c.cpf || '-'}<br><small>${c.telefone || ''}</small></td>
            <td>${c.cidade || '-'}/${c.estado || ''}</td>
            <td>
                <button class="btn-edit" onclick="editFull('${c.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteClient('${c.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center">Nenhum cliente cadastrado.</td></tr>';
}

// Salva ou atualiza cliente (CRUD - Create/Update)
async function handleSave() {
    // Obtém o usuário logado através da conexão ativa
    const { data: { user } } = await _supabase.auth.getUser();
    const id = document.getElementById('edit-id').value;

    const dados = {
        usuario_id: user.id,
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value || null,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        rg: document.getElementById('rg').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    if (!dados.nome_completo) return alert("Nome é obrigatório");

    const { error } = id
        ? await _supabase.from('clientes').update(dados).eq('id', id)
        : await _supabase.from('clientes').insert([dados]);

    if (error) {
        alert("Erro ao salvar: " + error.message);
    } else {
        resetForm();
        loadClients();
    }
}

// Preenche o formulário para edição
async function editFull(id) {
    const { data, error } = await _supabase.from('clientes').select('*').eq('id', id).single();
    
    if (error || !data) return;

    // Preenche cada campo automaticamente com base nas chaves do objeto
    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = data[k] || '';
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando Cliente";
    document.getElementById('btn-save').innerText = "Atualizar Cadastro";
    document.getElementById('btn-cancel').style.display = "block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reseta o formulário para o estado original
function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = "Novo Cadastro de Cliente";
    document.getElementById('btn-save').innerText = "Salvar Cadastro";
    document.getElementById('btn-cancel').style.display = "none";
}

// Remove cliente do banco (CRUD - Delete)
async function deleteClient(id) {
    if (confirm("Excluir definitivamente este cliente?")) {
        const { error } = await _supabase.from('clientes').delete().eq('id', id);
        if (error) alert("Erro ao excluir: " + error.message);
        loadClients();
    }
}

/**
 * Inicializa a lista de clientes ao carregar a página
 * A trava de segurança já foi executada no conexao.js
 */
document.addEventListener('DOMContentLoaded', loadClients);
