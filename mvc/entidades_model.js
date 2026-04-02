
 
// CONFIGURAÇÃO SUPABASE
const supabaseUrl = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbXNrc3JoZGVkd3JsYW5wbW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDE5ODQsImV4cCI6MjA5MDYxNzk4NH0.X2S4UZ3WGLoxx9LsNNbJ6-kyM0DAQoTr8wY57O6m4ZA'; 

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let currentFilter = 'all';

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    loadEntities();
    setupEventListeners();
});

function setupEventListeners() {
    // Foto
    document.getElementById('avatar_container').addEventListener('click', () => document.getElementById('input_foto').click());
    document.getElementById('input_foto').addEventListener('change', handlePreview);

    // Salvar
    document.getElementById('btn_salvar').addEventListener('click', handleSave);

    // Filtros
    document.getElementById('filter_all').addEventListener('click', () => setActiveFilter('all'));
    document.getElementById('filter_pacientes').addEventListener('click', () => setActiveFilter('Paciente'));
    document.getElementById('filter_colaboradores').addEventListener('click', () => setActiveFilter('Colaborador'));

    // Busca
    document.getElementById('input_search_list').addEventListener('input', renderList);

    // CEP Automático
    document.getElementById('input_cep').addEventListener('blur', buscaCEP);
}

// LÓGICA DE FOTO
function handlePreview(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar_img_preview').src = e.target.result;
            document.getElementById('avatar_img_preview').classList.remove('hidden');
            document.getElementById('avatar_placeholder_icon').classList.add('hidden');
        }
        reader.readAsDataURL(file);
    }
}

// BUSCA CEP
async function buscaCEP() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
            document.getElementById('input_logradouro').value = data.logradouro;
            document.getElementById('input_bairro').value = data.bairro;
            document.getElementById('input_cidade').value = data.localidade;
            document.getElementById('input_uf').value = data.uf;
        }
    }
}

// SALVAR NO BANCO
async function handleSave() {
    const btn = document.getElementById('btn_salvar');
    btn.disabled = true;
    btn.innerText = "Salvando...";

    try {
        const file = document.getElementById('input_foto').files[0];
        let fotoUrl = null;

        if (file) {
            const fileName = `${Date.now()}_${file.name}`;
            const { data: upData, error: upErr } = await _supabase.storage.from('avatares').upload(`public/${fileName}`, file);
            if (upErr) throw upErr;
            fotoUrl = _supabase.storage.from('avatares').getPublicUrl(`public/${fileName}`).data.publicUrl;
        }

        const payload = {
            nome_completo: document.getElementById('input_nome').value,
            tipo_entidade: document.querySelector('input[name="tipo_entidade"]:checked').value,
            cpf: document.getElementById('input_cpf').value,
            email: document.getElementById('input_email').value,
            telefone: document.getElementById('input_telefone').value,
            data_nascimento: document.getElementById('input_nascimento').value || null,
            cep: document.getElementById('input_cep').value,
            logradouro: document.getElementById('input_logradouro').value,
            numero: document.getElementById('input_numero').value,
            bairro: document.getElementById('input_bairro').value,
            cidade: document.getElementById('input_cidade').value,
            estado: document.getElementById('input_uf').value,
            perm_ler: document.getElementById('check_permissao_ler').checked,
            perm_editar: document.getElementById('check_permissao_editar').checked,
            perm_cadastrar: document.getElementById('check_permissao_cadastrar').checked,
            perm_deletar: document.getElementById('check_permissao_deletar').checked,
            urls_acesso: document.getElementById('textarea_urls_acesso').value,
            foto_url: fotoUrl
        };

        const { error } = await _supabase.from('entidades').insert([payload]);
        if (error) throw error;

        alert('Sucesso!');
        location.reload();
    } catch (e) {
        alert(e.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "Salvar Registro";
    }
}

// LISTAGEM DINÂMICA
let allEntities = [];

async function loadEntities() {
    const { data, error } = await _supabase.from('entidades').select('*').order('created_at', { ascending: false });
    if (error) return console.error(error);
    allEntities = data;
    renderList();
}

function renderList() {
    const container = document.getElementById('entity_list_container');
    const searchTerm = document.getElementById('input_search_list').value.toLowerCase();
    
    const filtered = allEntities.filter(e => {
        const matchesSearch = e.nome_completo.toLowerCase().includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || e.tipo_entidade === currentFilter;
        return matchesSearch && matchesFilter;
    });

    container.innerHTML = filtered.map(e => `
        <div class="entity-card group bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors">
            <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                <img src="${e.foto_url || 'https://ui-avatars.com/api/?name='+e.nome_completo}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow min-w-0">
                <h3 class="entity-name text-sm font-bold text-slate-800 dark:text-slate-100 truncate">${e.nome_completo}</h3>
                <div class="flex items-center gap-2 mt-1">
                    <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase">Ativo</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">${e.tipo_entidade}</span>
                </div>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
                <button onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')" class="text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 p-2 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-[20px]">chat</span>
                </button>
                <button onclick="location.href='mailto:${e.email}'" class="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-[20px]">mail</span>
                </button>
            </div>
        </div>
    `).join('');
}

function setActiveFilter(filter) {
    currentFilter = filter;
    
    // UI Update
    const btns = {
        all: document.getElementById('filter_all'),
        Paciente: document.getElementById('filter_pacientes'),
        Colaborador: document.getElementById('filter_colaboradores')
    };

    Object.values(btns).forEach(b => {
        b.classList.remove('bg-white', 'dark:bg-slate-700', 'text-primary', 'dark:text-white', 'shadow-sm');
        b.classList.add('text-slate-500', 'dark:text-slate-400');
    });

    const active = btns[filter] || btns.all;
    active.classList.add('bg-white', 'dark:bg-slate-700', 'text-primary', 'dark:text-white', 'shadow-sm');
    active.classList.remove('text-slate-500', 'dark:text-slate-400');

    renderList();
}
