/**
 * Nome do arquivo: carregar_entidades.js
 * Objetivo: Popular dinamicamente um elemento <select> com dados da tabela 'entidades'.
 */
/**
* EXEMPLO DE COMO USAR NO HTML:
<!-- CARREGAR ENTIDADES -->
  <div class="mb-3">
    <label for="entidade_id" class="block text-sm font-medium text-gray-700">Entidade (Cliente/Fornecedor)</label>
    <select id="entidade_id" name="entidade_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
        <option value="">Carregando entidades...</option>
    </select>
  </div>
  <script src="js/carregar_entidades.js"></script> 
  <!-- FIM CARREGAR ENTIDADES -->
*/


async function carregarEntidades() {
    try {
        // Usa o cliente global conforme seu padrão no arquivo README.md
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo')
            .order('nome_completo', { ascending: true }); // Organização por nome

        if (error) throw error;

        const select = document.getElementById('entidade_id');
        if (!select) return;

        // Mantém apenas a primeira opção (ex: "Selecione...") e limpa o resto
        select.innerHTML = '<option value="">Selecione uma entidade...</option>';

        if (data) {
            data.forEach(ent => {
                const opt = document.createElement('option');
                opt.value = ent.id;
                opt.textContent = ent.nome_completo;
                select.appendChild(opt);
            });
            console.log(`✅ ${data.length} entidades carregadas no select.`);
        }

    } catch (err) {
        console.error("Erro ao carregar entidades para o select:", err.message);
    }
}

// Inicializa automaticamente se necessário ou pode ser chamado manualmente
document.addEventListener('DOMContentLoaded', carregarEntidades);
