// Configuração do Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Busca endereço automaticamente pelo CEP (ViaCEP)
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
            logradouro.value = data.logradouro;
            bairro.value = data.bairro;
            cidade.value = data.localidade;
            estado.value = data.uf;
        }
    }
}

// Carrega fornecedores do banco
async function loadFornecedores() {
    const { data } = await _supabase
        .from('fornecedores')
        .select('*')
        .order('razao_social');

    const tbody = document.getElementById('fornecedores-list');

    tbody.innerHTML = (data || []).map(f => `
        <tr>
            <td><b>${f.razao_social}</b><br><small>${f.nome_fantasia || ''}</small></td>
            <td>${f.cnpj || '-'}<br><small>${f.telefone || ''}</small></td>
            <td>${f.cidade || '-'}/${f.estado || ''}</td>
            <td>
                <button class="btn-edit" onclick="editFull('${f.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteForn('${f.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('') || `
        <tr><td colspan="4" style="text-align:center">Nenhum fornecedor encontrado.</td></tr>
    `;
}

// Salva ou atualiza fornecedor
async function handleSave() {
    const { data: { user } } = await _supabase.auth.getUser();
    const id = document.getElementById('edit-id').value;

    const dados = {
        usuario_id: user.id,
        razao_social: razao_social.value,
        nome_fantasia: nome_fantasia.value,
        cnpj: cnpj.value,
        inscricao_estadual: inscricao_estadual.value,
        email: email.value,
        telefone: telefone.value,
        cep: cep.value,
        logradouro: logradouro.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value
    };

    if (!dados.razao_social) return alert("Razão Social é obrigatória!");

    id
        ? await _supabase.from('fornecedores').update(dados).eq('id', id)
        : await _supabase.from('fornecedores').insert([dados]);

    resetForm();
    loadFornecedores();
}

// Preenche formulário para edição
async function editFull(id) {
    const { data } = await _supabase
        .from('fornecedores')
        .select('*')
        .eq('id', id)
        .single();

    if (!data) return;

    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = data[k] || '';
    });

    edit-id.value = data.id;
    form-title.innerText = "Editando Fornecedor";
    btn-save.innerText = "Atualizar Fornecedor";
    btn-cancel.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Limpa formulário
function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    edit-id.value = '';
    form-title.innerText = "Novo Cadastro de Fornecedor";
    btn-save.innerText = "Salvar Fornecedor";
    btn-cancel.style.display = "none";
}

// Exclui fornecedor
async function deleteForn(id) {
    if (confirm("Excluir este fornecedor?")) {
        await _supabase.from('fornecedores').delete().eq('id', id);
        loadFornecedores();
    }
}

// Inicialização da página
loadFornecedores();