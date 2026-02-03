// Função para filtrar usuários na tabela
function filtrarUsuarios() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const filtrados = window.usuariosCache.filter(user => 
        user.nome_completo.toLowerCase().includes(termo) || 
        (user.cpf && user.cpf.includes(termo))
    );
    renderTable(filtrados);
}

// Função para gerar o PDF
function exportarUsuariosPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Relatório de Usuários - ERP ABP", 14, 15);
    
    const rows = window.usuariosCache.map(u => [
        u.nome_completo, 
        u.telefone, 
        u.acesso.toUpperCase(), 
        u.status.toUpperCase()
    ]);

    doc.autoTable({
        head: [['Nome', 'Telefone', 'Nível', 'Status']],
        body: rows,
        startY: 20,
        theme: 'grid'
    });

    doc.save("usuarios_erp_abp.pdf");
}

// Função para limpar o formulário (usada no botão cancelar e após salvar)
function resetarForm() {
    document.getElementById('main-form').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = "Gestão de Usuário";
    document.getElementById('btn-cancel').style.display = "none";
}
