
// --- CONFIGURAÇÃO ---
 const supabaseUrl = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbXNrc3JoZGVkd3JsYW5wbW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDE5ODQsImV4cCI6MjA5MDYxNzk4NH0.X2S4UZ3WGLoxx9LsNNbJ6-kyM0DAQoTr8wY57O6m4ZA'; 

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    loadRecentEntities();
    configurarEventos();
});

function configurarEventos() {
    // Clique no Avatar
    document.getElementById('avatar_container').addEventListener('click', () => document.getElementById('input_foto').click());
    
    // Preview da Imagem
    document.getElementById('input_foto').addEventListener('change', handleImagePreview);
    
    // CEP Automático
    document.getElementById('input_cep').addEventListener('blur', buscaCEP);
    
    // Botão Salvar
    document.getElementById('btn_salvar').addEventListener('click', handleSave);
    
    // Busca na lista
    document.getElementById('input_search_list').addEventListener('input', filtrarListaLocal);
}

// --- LÓGICA DE FOTO ---
function handleImagePreview(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('avatar_img_preview');
            const icon = document.getElementById('avatar_placeholder_icon');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            icon.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// --- BUSCA CEP ---
async function buscaCEP() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const d = await res.json();
        if (!d.erro) {
            document.getElementById('input_logradouro').value = d.logradouro;
            document.getElementById('input_bairro').value = d.bairro;
            document.getElementById('input_cidade').value = d.localidade;
            document.getElementById('input_uf').value = d.uf;
        }
    }
}

// --- SALVAR NO SUPABASE ---
async function handleSave() {
    const btn = document.getElementById('btn_salvar');
    btn.disabled = true;
    btn.innerHTML = "Salvando...";

    try {
        let fotoUrl = null;
        const fotoFile = document.getElementById('input_foto').files[0];

        // 1. Upload da Foto se existir
        if (fotoFile) {
            const fileName = `${Date.now()}_${fotoFile.name}`;
            const { data: upData, error: upErr } = await _supabase.storage
                .from('avatares')
                .upload(`public/${fileName}`, fotoFile);
            
            if (upErr) throw upErr;
            fotoUrl = _supabase.storage.from('avatares').getPublicUrl(`public/${fileName}`).data.publicUrl;
        }

        // 2. Coleta de Dados
        const payload = {
            nome_completo: document.getElementById('input_nome').value,
            tipo_entidade: document.querySelector('input[name="tipo_entidade"]:checked').value,
            cpf: document.getElementById('input_cpf').value,
            data_nascimento: document.getElementById('input_nascimento').value || null,
            email: document.getElementById('input_email').value,
            telefone: document.getElementById('input_telefone').value,
            cep: document.getElementById('input_cep').value,
            logradouro: document.getElementById('input_logradouro').value,
            numero: document.getElementById('input_numero').value,
            bairro: document.getElementById('input_bairro').value,
            cidade: document.getElementById('input_cidade').value,
            estado: document.getElementById('input_uf').value,
            // Permissões
            perm_ler: document.getElementById('check_permissao_ler').checked,
            perm_editar: document.getElementById('check_permissao_editar').checked,
            perm_cadastrar: document.getElementById('check_permissao_cadastrar').checked,
            perm_deletar: document.getElementById('check_permissao_deletar').checked,
            urls_acesso: document.getElementById('textarea_urls_acesso').value,
            foto_url: fotoUrl
        };

        const { error } = await _supabase.from('entidades').insert([payload]);
        if (error) throw error;

        alert("Cadastro realizado com sucesso!");
        location.reload(); // Recarrega para limpar e atualizar lista

    } catch (err) {
        alert("Erro ao salvar: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = "Salvar Registro";
    }
}

// --- LISTAGEM ---
async function loadRecentEntities() {
    const { data, error } = await _supabase
        .from('entidades')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) return console.error(error);

    const container = document.getElementById('entity_list_container');
    container.innerHTML = data.map(ent => `
        <div class="entity-card group bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors" data-type="${ent.tipo_entidade}">
            <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                <img src="${ent.foto_url || 'https://ui-avatars.com/api/?name=' + ent.nome_completo}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow min-w-0">
                <h3 class="entity-name text-sm font-bold text-slate-800 dark:text-slate-100 truncate">${ent.nome_completo}</h3>
                <div class="flex items-center gap-2 mt-1">
                    <span class="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-full uppercase">${ent.tipo_entidade}</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">${ent.cidade || 'Sem cidade'}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="window.open('https://wa.me/55${ent.telefone?.replace(/\D/g,'')}')" class="text-emerald-500 p-2"><span class="material-symbols-outlined text-[20px]">chat</span></button>
            </div>
        </div>
    `).join('');
}

function filtrarListaLocal() {
    const termo = this.value.toLowerCase();
    document.querySelectorAll('.entity-card').forEach(card => {
        const nome = card.querySelector('.entity-name').innerText.toLowerCase();
        card.style.display = nome.includes(termo) ? 'flex' : 'none';
    });
}
