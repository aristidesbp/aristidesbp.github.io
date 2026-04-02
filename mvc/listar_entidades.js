// CONFIGURAÇÃO DO SUPABASE
const supabaseUrl = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
const supabaseKey = 'SUA_ANON_KEY_AQUI'; // Use a sua anon key (public)
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    fetchEntidades();
    
    // Vincular busca em tempo real se o input existir
    const inputBusca = document.getElementById('input-busca');
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => filtrarEntidades(e.target.value));
    }
});

let todasEntidades = [];

// BUSCAR DADOS
async function fetchEntidades() {
    const listaContainer = document.getElementById('lista-entidades');
    
    try {
        const { data, error } = await _supabase
            .from('entidades')
            .select('*')
            .order('nome_completo', { ascending: true });

        if (error) throw error;

        todasEntidades = data;
        renderizarCards(todasEntidades);

    } catch (error) {
        console.error('Erro ao buscar entidades:', error.message);
        listaContainer.innerHTML = `<p class="text-center text-red-500">Erro ao carregar dados.</p>`;
    }
}

// RENDERIZAR CARDS
function renderizarCards(lista) {
    const container = document.getElementById('lista-entidades');
    
    if (lista.length === 0) {
        container.innerHTML = `<p class="text-center text-slate-500 py-10">Nenhuma entidade encontrada.</p>`;
        return;
    }

    container.innerHTML = lista.map(entidade => {
        // Lógica de cores baseada no tipo
        const badgeColor = {
            'Paciente': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
            'Colaborador': 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
            'Responsável': 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
        }[entidade.tipo] || 'bg-slate-50 text-slate-700';

        // Avatar padrão se foto_url estiver vazio
        const avatar = entidade.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(entidade.nome_completo)}&background=random`;

        return `
            <div class="tonal-layering-card p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex gap-4">
                        <img class="w-14 h-14 rounded-full object-cover ring-2 ring-primary/10" src="${avatar}" alt="${entidade.nome_completo}"/>
                        <div>
                            <h3 class="font-semibold text-slate-900 dark:text-slate-100 text-base">${entidade.nome_completo}</h3>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="material-symbols-outlined text-primary text-sm">call</span>
                                <span class="text-slate-500 dark:text-slate-400 text-sm">${entidade.telefone || 'Sem telefone'}</span>
                            </div>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full ${badgeColor} text-[10px] font-bold uppercase tracking-wider">
                        ${entidade.tipo || 'N/A'}
                    </span>
                </div>

                <div class="space-y-3">
                    <div class="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                        <span>${entidade.cidade || 'Localização'} / ${entidade.uf || '--'}</span>
                        <span>CPF: ${entidade.cpf || '---'}</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-primary rounded-full" style="width: 100%"></div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 mt-5">
                    <button onclick="window.location.href='mailto:${entidade.email}'" class="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white shadow-lg shadow-red-500/20 active:scale-90 transition-transform">
                        <span class="material-symbols-outlined text-lg">mail</span>
                    </button>
                    <button onclick="window.open('https://wa.me/55${entidade.telefone?.replace(/\D/g,'')}')" class="w-10 h-10 rounded-full flex items-center justify-center bg-[#22c55e] text-white shadow-lg shadow-green-500/20 active:scale-90 transition-transform">
                        <span class="material-symbols-outlined text-lg">chat</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// FILTRAR LOCALMENTE (Para busca rápida)
function filtrarEntidades(termo) {
    const t = termo.toLowerCase();
    const filtrados = todasEntidades.filter(e => 
        e.nome_completo.toLowerCase().includes(t) || 
        (e.cpf && e.cpf.includes(t)) ||
        (e.tipo && e.tipo.toLowerCase().includes(t))
    );
    renderizarCards(filtrados);
}
