function renderTable(dados) {
    const lista = document.getElementById('entities-list');
    if (!dados || dados.length === 0) {
        lista.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px; color: #94a3b8;">Nenhum usuário encontrado.</td></tr>';
        return;
    }
    lista.innerHTML = dados.map(item => `
        <tr>
            <td><b>${item.nome_completo}</b><br><small style="color:var(--text-muted)">${item.acesso.toUpperCase()}</small></td>
            <td>${item.telefone}<br><small>${item.email || ''}</small></td>
            <td><span class="badge-${item.status}">${item.status}</span></td>
            <td>
                <button onclick="prepararEdicao(${item.id})" style="color: var(--primary); border:none; background:none; cursor:pointer; font-size:18px;"><i class="fas fa-edit"></i></button>
                <button onclick="excluirUsuario(${item.id})" style="color: var(--danger); border:none; background:none; cursor:pointer; font-size:18px;"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}
