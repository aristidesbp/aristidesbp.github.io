/**
 * model/entidades.js - Gestão de Entidades ERP ABP
 */

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const btn = document.getElementById('btn-save');

    // Mapeamento seguro dos campos
    const getVal = (id) => document.getElementById(id)?.value || null;

    const payload = {
        nome_completo: getVal('nome_completo'),
        cpf: getVal('cpf'),
        data_nascimento: getVal('data_nascimento'),
        email: getVal('email'),
        telefone: getVal('telefone'),
        senha_acesso: getVal('senha_acesso'),
        acesso: getVal('acesso'),
        relacionamento: getVal('relacionamento'),
        status: getVal('status'),
        cep: getVal('cep'),
        logradouro: getVal('logradouro'),
        numero: getVal('numero'),
        bairro: getVal('bairro'),
        cidade: getVal('cidade'),
        estado: getVal('estado'),
        avaliacao: getVal('avaliacao'),
        arquivos_url: getVal('arquivos_url'),
        observacoes: getVal('observacoes')
    };

    if (!payload.nome_completo || !payload.telefone) {
        return alert("Nome e Telefone são obrigatórios!");
    }

    btn.disabled = true;
    btn.innerText = "Processando...";

    try {
        let result;
        if (id) {
            result = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
        } else {
            result = await window.supabaseClient.from('entidades').insert([payload]);
        }

        if (result.error) throw result.error;

        alert(id ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
        resetForm();
        loadEntities();
    } catch (error) {
        console.error("Erro no Supabase:", error);
        alert("Erro ao salvar: " + (error.message || "Verifique o console"));
    } finally {
        btn.disabled = false;
        btn.innerText = id ? "Atualizar Entidade" : "Salvar Entidade";
    }
}

async function loadEntities() {
    try {
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('*')
            .order('nome_completo', { ascending: true });

        if (error) throw error;
        renderTable(data || []);
    } catch (error) {
        console.error("Erro ao carregar:", error);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => `
        <tr class="border-t">
            <td class="p-3"><strong>${e.nome_completo}</strong><br><small class="text-gray-500 uppercase">${e.relacionamento || ''}</small></td>
            <td class="p-3">${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td class="p-3"><span class="px-2 py-1 rounded text-xs font-bold ${e.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${e.status || 'Ativo'}</span></td>
            <td class="p-3 text-lg">
                <button class="text-blue-500 mr-2" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="text-red-500" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function resetForm() {
    document.getElementById('edit-id').value = '';
    document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
    document.getElementById('btn-save').innerText = "Salvar Entidade";
    document.getElementById('btn-cancel').style.display = "none";
}

async function deleteEntity(id) {
    if (!confirm("Excluir permanentemente?")) return;
    const { error } = await window.supabaseClient.from('entidades').delete().eq('id', id);
    if (error) alert(error.message);
    else loadEntities();
}

async function editFull(id) {
    const { data, error } = await window.supabaseClient.from('entidades').select('*').eq('id', id).single();
    if (error) return alert("Erro ao carregar");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = data[key] || '';
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    document.querySelectorAll('#entities-list tr').forEach(tr => {
        tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
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

function togglePasswordVisibility() {
    const input = document.getElementById('senha_acesso');
    input.type = input.type === 'password' ? 'text' : 'password';
}

document.addEventListener('DOMContentLoaded', loadEntities);
