// --- CONFIGURAÇÃO ---
const supabaseUrl = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
const supabaseKey = 'SUA_ANON_KEY_AQUI'; // NÃO USE A SERVICE ROLE KEY
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- AUTENTICAÇÃO ---
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    const telaLogin = document.getElementById('tela-login');
    const telaSistema = document.getElementById('tela-sistema');

    if (!session) {
        telaLogin.style.display = 'flex';
        telaSistema.style.display = 'none';
    } else {
        telaLogin.style.display = 'none';
        telaSistema.style.display = 'block';
        loadEntities(); 
    }
}

async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    if(!email || !senha) return alert("Preencha tudo!");

    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    if (error) alert("Erro: " + error.message);
    else verificar_login();
}

async function sairDaConta() {
    await _supabase.auth.signOut();
    location.reload();
}

// --- CRUD ---
async function loadEntities() {
    const { data, error } = await _supabase.from('entidades').select('*').order('nome_completo');
    if (error) return console.error(error);
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    tbody.innerHTML = data.map(e => {
        const avatar = e.foto_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        return `
        <tr>
            <td><img src="${avatar}" class="avatar-img"></td>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="tag">${e.tipo_acesso}</span> | ${e.status_entidade}</td>
            <td>
                <button class="text-blue-500 mr-2" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="text-red-500 mr-2" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                <button class="text-green-500" onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>
            </td>
        </tr>`;
    }).join('');
}

async function handleSave() {
    const btnSave = document.getElementById('btn-save');
    const id = document.getElementById('edit-id').value;
    btnSave.disabled = true;
    btnSave.innerText = "Processando...";

    try {
        let fotoUrl = null;
        const inputFoto = document.getElementById('foto');

        if (inputFoto.files?.[0]) {
            const file = inputFoto.files[0];
            const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
            const { error: upErr } = await _supabase.storage.from('avatares').upload(`public/${fileName}`, file);
            if (upErr) throw upErr;
            fotoUrl = _supabase.storage.from('avatares').getPublicUrl(`public/${fileName}`).data.publicUrl;
        }

        const campos = ['nome_completo', 'cpf', 'data_nascimento', 'email', 'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado', 'tipo_acesso'];
        const payload = {};
        campos.forEach(c => payload[c] = document.getElementById(c).value || null);
        if (fotoUrl) payload.foto_url = fotoUrl;

        const { error } = id 
            ? await _supabase.from('entidades').update(payload).eq('id', id)
            : await _supabase.from('entidades').insert([payload]);

        if (error) throw error;
        alert("Sucesso!");
        resetForm();
        loadEntities();
    } catch (e) {
        alert("Erro: " + e.message);
    } finally {
        btnSave.disabled = false;
        btnSave.innerText = "Salvar Entidade";
    }
}

async function editFull(id) {
    const { data } = await _supabase.from('entidades').select('*').eq('id', id).single();
    if (!data) return;
    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el && key !== 'foto') el.value = data[key] || '';
    });
    document.getElementById('edit-id').value = data.id;
    document.getElementById('btn-save').innerText = "Atualizar";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteEntity(id) {
    if (confirm("Excluir?")) {
        await _supabase.from('entidades').delete().eq('id', id);
        loadEntities();
    }
}

// --- UTILITÁRIOS ---
function resetForm() {
    document.getElementById('edit-id').value = '';
    document.getElementById('btn-save').innerText = "Salvar Entidade";
    document.getElementById('btn-cancel').style.display = "none";
    document.querySelectorAll('input, select').forEach(el => el.value = '');
}

async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const d = await res.json();
        if (!d.erro) {
            document.getElementById('logradouro').value = d.logradouro;
            document.getElementById('bairro').value = d.bairro;
            document.getElementById('cidade').value = d.localidade;
            document.getElementById('estado').value = d.uf;
        }
    }
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    document.querySelectorAll('#entities-list tr').forEach(tr => {
        tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
}

function togglePasswordVisibility() {
    const input = document.getElementById('senha_acesso');
    input.type = input.type === 'password' ? 'text' : 'password';
}

document.addEventListener('DOMContentLoaded', verificar_login);
