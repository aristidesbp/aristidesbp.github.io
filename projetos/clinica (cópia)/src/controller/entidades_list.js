     /** * ERP ABP - listar.js */
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }
    renderTable(data || []);
}



function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => {
        // Limpa o telefone para o link do WhatsApp (mantém apenas números)
        const foneLimpo = e.telefone ? e.telefone.replace(/\D/g, '') : '';
        
        return `
        <tr>
            <td><input type="checkbox" class="row-checkbox" value="${e.id}" onclick="updateSelectedCountEntities()"></td>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.relacionamento || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" title="Editar" onclick="editFull('${e.id}')">
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn-del" title="Excluir" onclick="deleteEntity('${e.id}')">
                    <i class="fas fa-trash"></i>
                </button>

                ${foneLimpo ? `
                <button class="btn-wpp" title="WhatsApp" onclick="window.open('https://wa.me/55${foneLimpo}', '_blank')">
                    <i class="fab fa-whatsapp"></i>
                </button>` : ''}

                ${e.email ? `
                <button class="btn-mail" title="Enviar E-mail" onclick="window.location.href='mailto:${e.email}'">
                    <i class="fas fa-envelope"></i>
                </button>` : ''}
            </td>
        </tr>
    `}).join('');
}

// Dispara o carregamento assim que o conteúdo do navegador estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log("Iniciando carregamento automático das entidades...");
    loadEntities();
});
