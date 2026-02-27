// src/controller/entidadeController.js

let todasEntidades = [];

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    configurarFormulario();
});

// 1. CARREGAMENTO E RENDERIZAÇÃO
async function carregarDados() {
    try {
        todasEntidades = await entidadeModel.listar();
        renderizarTabela(todasEntidades);
    } catch (error) {
        alert("Erro ao carregar: " + error.message);
    }
}

function renderizarTabela(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => {
        const foneLimpo = e.telefone ? e.telefone.replace(/\D/g, '') : '';
        return `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-4"><input type="checkbox" class="row-checkbox w-4 h-4" value="${e.id}" onclick="updateSelectedCount()"></td>
            <td class="p-4">
                <div class="font-bold text-slate-800">${e.nome_completo}</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider">${e.tipo_entidade || 'N/A'}</div>
            </td>
            <td class="p-4">
                <div class="text-sm">${e.telefone || '-'}</div>
                <div class="text-xs text-slate-400">${e.email || '-'}</div>
            </td>
            <td class="p-4"><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td class="p-4">
                <div class="flex justify-center gap-2">
                    <button onclick="editarEntidade('${e.id}')" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar"><i class="fas fa-edit"></i></button>
                    <button onclick="excluirIndividual('${e.id}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir"><i class="fas fa-trash"></i></button>
                    ${foneLimpo ? `<button onclick="window.open('https://wa.me/55${foneLimpo}')" class="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>` : ''}
                </div>
            </td>
        </tr>`;
    }).join('');
}

// 2. BUSCA E FILTROS
function filtrarEntidades() {
    const termo = document.getElementById('input-busca').value.toLowerCase();
    const filtrados = todasEntidades.filter(e => 
        e.nome_completo.toLowerCase().includes(termo) || 
        (e.email && e.email.toLowerCase().includes(termo)) ||
        (e.tipo_entidade && e.tipo_entidade.toLowerCase().includes(termo))
    );
    renderizarTabela(filtrados);
}

// 3. GESTÃO DO MODAL E FORMULÁRIO
function abrirModalCadastro() {
    document.getElementById('form-entidade').reset();
    document.getElementById('entidade-id').value = '';
    document.getElementById('modal-title').innerText = 'Nova Entidade';
    document.getElementById('modal-entidade').classList.add('active');
}

function fecharModal() {
    document.getElementById('modal-entidade').classList.remove('active');
}

async function editarEntidade(id) {
    const e = todasEntidades.find(item => item.id === id);
    if (!e) return;

    document.getElementById('entidade-id').value = e.id;
    document.getElementById('nome_completo').value = e.nome_completo;
    document.getElementById('tipo_entidade').value = e.tipo_entidade;
    document.getElementById('email').value = e.email || '';
    document.getElementById('telefone').value = e.telefone || '';
    document.getElementById('cep').value = e.cep || '';
    
    document.getElementById('modal-title').innerText = 'Editar Entidade';
    document.getElementById('modal-entidade').classList.add('active');
}

function configurarFormulario() {
    const form = document.getElementById('form-entidade');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const dados = {
            id: document.getElementById('entidade-id').value || undefined,
            nome_completo: document.getElementById('nome_completo').value,
            tipo_entidade: document.getElementById('tipo_entidade').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cep: document.getElementById('cep').value,
            status_entidade: 'Ativo'
        };

        try {
            await entidadeModel.salvar(dados);
            fecharModal();
            carregarDados();
        } catch (err) {
            alert("Erro ao salvar: " + err.message);
        }
    };
}

// 4. CEP E SENHA
async function handleCEP(valor) {
    const data = await entidadeModel.buscarCEP(valor);
    if (data && !data.erro) {
        // Se você tiver esses IDs no seu HTML, eles serão preenchidos
        if(document.getElementById('logradouro')) document.getElementById('logradouro').value = data.logradouro;
        if(document.getElementById('cidade')) document.getElementById('cidade').value = data.localidade;
        console.log("Endereço localizado:", data.logradouro);
    }
}

function togglePasswordVisibility() {
    const input = document.getElementById('senha_acesso');
    const icon = document.getElementById('togglePassword');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 5. SELEÇÃO EM MASSA E EXCLUSÃO
function toggleSelectAll() {
    const master = document.getElementById('select-all');
    const checks = document.querySelectorAll('.row-checkbox');
    checks.forEach(c => c.checked = master.checked);
    updateSelectedCount();
}

function updateSelectedCount() {
    const qtd = document.querySelectorAll('.row-checkbox:checked').length;
    const bulk = document.getElementById('bulk-area');
    const label = document.getElementById('selected-count');
    
    if (bulk) bulk.style.display = qtd > 0 ? 'flex' : 'none';
    if (label) label.innerText = `${qtd} selecionados`;
}

async function handleDeleteSelected() {
    const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(c => c.value);
    if (confirm(`Excluir permanentemente ${ids.length} itens?`)) {
        await entidadeModel.excluir(ids);
        carregarDados();
        updateSelectedCount();
    }
}

async function excluirIndividual(id) {
    if (confirm("Excluir esta entidade?")) {
        await entidadeModel.excluir(id);
        carregarDados();
    }
}
