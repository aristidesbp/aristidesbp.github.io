async function handleSave() {
    const id = document.getElementById('edit-id').value;
    
    const dados = {
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        acesso: document.getElementById('acesso').value,
        status: document.getElementById('status').value,
        relacionamento: document.getElementById('acesso').value // Espelhando o acesso como relacionamento inicial
    };

    if (!dados.nome_completo || !dados.telefone) {
        return alert("Por favor, preencha os campos obrigatórios (*)");
    }

    try {
        let result;
        
        if (id) {
            // Atualização (O ID já será o UUID do registro existente)
            result = await _supabase
                .from('usuarios')
                .update(dados)
                .eq('id', id);
        } else {
            // Inserção Manual (Para entidades sem login Auth ainda)
            // Nota: Como o ID é obrigatório no seu SQL (referenciando auth.users),
            // a inserção manual direta na tabela pública pode falhar se não houver um usuário no Auth.
            alert("Atenção: Novos usuários devem ser criados via tela de Cadastro/Login para gerar o UUID de autenticação.");
            return;
        }

        if (result.error) throw result.error;

        alert("Sucesso!");
        resetarForm();
        loadUsuarios();

    } catch (error) {
        console.error("Erro ao salvar:", error.message);
        alert("Erro ao salvar: " + error.message);
    }
}
