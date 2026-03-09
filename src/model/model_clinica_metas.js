/**
 * model_clinica_metas.js
 * Lógica para o Psicopedagogo gerenciar o Plano de 6 Meses
 */

document.addEventListener('DOMContentLoaded', () => {
    carregarPacientes();
});

// 1. Carrega a lista de pacientes no select
async function carregarPacientes() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('id, nome_completo')
        .eq('relacionamento', 'cliente') // Filtra apenas clientes/pacientes
        .order('nome_completo');

    if (error) {
        console.error("Erro ao carregar pacientes:", error.message);
        return;
    }

    const select = document.getElementById('select-paciente');
    select.innerHTML = '<option value="">Selecione um Paciente...</option>';
    
    data.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nome_completo;
        select.appendChild(opt);
    });
}

// 2. Busca e renderiza as metas do paciente selecionado
async function loadMetas() {
    const pacienteId = document.getElementById('select-paciente').value;
    const tbody = document.getElementById('lista-metas');
    
    if (!pacienteId) {
        tbody.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-400">Selecione um paciente para ver as metas.</td></tr>';
        return;
    }

    const { data, error } = await window.supabaseClient
        .from('clinica_metas')
        .select('*')
        .eq('paciente_id', pacienteId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Erro ao carregar metas:", error.message);
        return;
    }

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-400">Nenhuma meta cadastrada para este paciente.</td></tr>';
        return;
    }

    tbody.innerHTML = data.map(meta => `
        <tr class="border-b hover:bg-slate-50 transition">
            <td class="p-4 font-medium text-slate-700">${meta.habilidade}</td>
            <td class="p-4 text-slate-500">${meta.criterio_alta || '-'}</td>
            <td class="p-4 text-center">
                <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase ${meta.status ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">
                    ${meta.status ? 'Alcançada' : 'Em Progresso'}
                </span>
            </td>
            <td class="p-4 text-right">
                <button onclick="alternarStatus('${meta.id}', ${meta.status})" class="text-indigo-500 hover:text-indigo-700 mr-3" title="Mudar Status">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button onclick="excluirMeta('${meta.id}')" class="text-red-400 hover:text-red-600" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// 3. Salva uma nova meta no banco
async function salvarMeta() {
    const pacienteId = document.getElementById('select-paciente').value;
    const habilidade = document.getElementById('habilidade').value;
    const criterio = document.getElementById('criterio').value;

    if (!pacienteId || !habilidade) {
        alert("Selecione o paciente e digite a habilidade.");
        return;
    }

    const { error } = await window.supabaseClient
        .from('clinica_metas')
        .insert([{
            paciente_id: pacienteId,
            habilidade: habilidade,
            criterio_alta: criterio,
            status: false
        }]);

    if (error) {
        alert("Erro ao salvar: " + error.message);
    } else {
        document.getElementById('habilidade').value = '';
        document.getElementById('criterio').value = '';
        loadMetas();
    }
}

// 4. Funções de Ação (Excluir e Mudar Status)
async function excluirMeta(id) {
    if (!confirm("Deseja excluir esta meta?")) return;
    await window.supabaseClient.from('clinica_metas').delete().eq('id', id);
    loadMetas();
}

async function alternarStatus(id, statusAtual) {
    await window.supabaseClient
        .from('clinica_metas')
        .update({ status: !statusAtual })
        .eq('id', id);
    loadMetas();
}
