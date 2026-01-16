// Configuração do Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Busca endereço pelo CEP usando ViaCEP
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                logradouro.value = data.logradouro;
                bairro.value = data.bairro;
                cidade.value = data.localidade;
                estado.value = data.uf;
            }
        } catch {
            console.error("Erro ao buscar CEP");
        }
    }
}

// Carrega clientes do banco
async function loadClients() {
    const { data } = await _supabase
        .from('clientes')
        .select('*')
        .order('nome_completo');

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
    `).join('');
}

// Salva ou atualiza cliente
async function handleSave() {
    const { data: { user } } = await _supabase.auth.getUser();
    const id = edit-id.value;

    const dados = {
        usuario_id: user.id,
        nome_completo: nome_completo.value,
        cpf: cpf.value,
        data_nascimento: data_nascimento.value || null,
        email: email.value,
        telefone: telefone.value,
        rg: rg.value,
        cep: cep.value,
        logradouro: logradouro.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value
    };

    if (!dados.nome_completo) return alert("Nome é obrigatório");

    id
        ? await _supabase.from('clientes').update(dados).eq('id', id)
        : await _supabase.from('clientes').insert([dados]);

    resetForm();
    loadClients();
}

// Preenche formulário para edição
async function editFull(id) {
    const { data } = await _supabase.from('clientes').select('*').eq('id', id).single();
    if (!data) return;

    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = data[k] || '';
    });

    edit-id.value = data.id;
    form-title.innerText = "Editando Cliente";
    btn-save.innerText = "Atualizar Cadastro";
    btn-cancel.style.display = "block";
}

// Reseta formulário
function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    edit-id.value = '';
    form-title.innerText = "Novo Cadastro de Cliente";
    btn-save.innerText = "Salvar Cadastro";
    btn-cancel.style.display = "none";
}

// Remove cliente
async function deleteClient(id) {
    if (confirm("Excluir definitivamente?")) {
        await _supabase.from('clientes').delete().eq('id', id);
        loadClients();
    }
}

// Inicialização
loadClients();