/**
 * buscar_universal.js - Versão Componentizada

 <div class="componente-busca-wrapper" style="position: relative; width: 100%;">
    <div class="componente-busca" data-tabela="entidades">
        <label class="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-tight">
            Buscar Entidade:
        </label>
        
        <div class="flex gap-1">
            <input type="text" 
                   class="input-busca-texto block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800" 
                   placeholder="Digite e aperte Enter...">
            
            <button type="button" 
                    class="btn-disparar-busca bg-emerald-500 text-white px-4 py-2 rounded-md font-bold hover:bg-emerald-600 transition flex items-center justify-center">
                <i class="fas fa-search"></i>
            </button>
            
            <input type="hidden" class="id-selecionado-hidden" name="entidade_id">
        </div>

        <ul class="lista-resultados-suspensa hidden" 
            style="position: absolute; z-index: 9999; width: 100%; background: white; border: 1px solid #ddd; border-top: none; border-radius: 0 0 6px 6px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); max-height: 250px; overflow-y: auto; margin: 0; padding: 0; list-style: none;">
        </ul>
    </div>
</div>
<script src="js/componente_buscar_universal.js"></script>

 */
async function inicializarBuscaUniversal() {
    const componentes = document.querySelectorAll('.componente-busca');

    componentes.forEach(async (container) => {
        const nomeTabela = container.getAttribute('data-tabela');
        const inputTexto = container.querySelector('.input-busca-texto');
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const listaUI = container.querySelector('.lista-resultados-suspensa');
        const inputHidden = container.querySelector('.id-selecionado-hidden');

        let cacheDados = [];

        try {
            // Busca dados da tabela definida no data-tabela
            const { data, error } = await window.supabaseClient.from(nomeTabela).select('*');
            if (error) throw error;
            cacheDados = data || [];

            const filtrarERenderizar = () => {
                const termo = inputTexto.value.trim().toLowerCase();
                const filtrados = cacheDados.filter(reg => 
                    Object.values(reg).some(v => String(v).toLowerCase().includes(termo))
                );
                renderizarItens(filtrados, listaUI, inputTexto, inputHidden);
            };

            // Eventos
            btnBusca.addEventListener('click', (e) => {
                e.stopPropagation();
                filtrarERenderizar();
            });

            inputTexto.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    filtrarERenderizar();
                }
            });

            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) listaUI.classList.add('hidden');
            });

        } catch (err) {
            console.error("Erro no componente de busca:", err.message);
        }
    });
}

function renderizarItens(dados, listaUI, inputTexto, inputHidden) {
    listaUI.innerHTML = '';
    if (dados.length === 0) {
        listaUI.innerHTML = '<li style="padding: 10px; color: #999; font-style: italic; font-size: 13px;">Nenhum resultado.</li>';
    } else {
        dados.forEach(item => {
            const li = document.createElement('li');
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #f0f0f0";
            li.style.cursor = "pointer";
            li.className = "hover:bg-emerald-50";

            // Tenta identificar campos de nome/descrição automaticamente [cite: 3, 7, 8]
            const titulo = item.nome_completo || item.nome || item.descricao || item.title || "Sem título";
            const sub = item.cpf || item.documento || item.codigo_de_barras || "";

            li.innerHTML = `
                <div style="font-weight: bold; color: #333; font-size: 14px;">${titulo}</div>
                <div style="font-size: 11px; color: #666; text-transform: uppercase;">${sub}</div>
            `;

            li.onclick = () => {
                inputTexto.value = titulo;
                inputHidden.value = item.id;
                listaUI.classList.add('hidden');
            };
            listaUI.appendChild(li);
        });
    }
    listaUI.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', inicializarBuscaUniversal);
