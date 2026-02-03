async function handleSave() {
    const idExistente = document.getElementById('edit-id').value;
    
    const dados = {
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        acesso: document.getElementById('acesso').value,
        status: document.getElementById('status').value,
        relacionamento: document.getElementById('acesso').value
    };

    if (!dados.nome_completo || !dados.telefone || !dados.email) {
        return alert("Nome, Telefone e E-mail são obrigatórios.");
    }

    try {
        let userId = idExistente;

        // Se for um NOVO registro, primeiro criamos no Auth
        if (!idExistente) {
            alert("Criando credenciais de acesso para: " + dados.email);
            userId = await criarContaAuth(dados.email, null, dados.nome_completo);
        }

        // Agora salvamos ou atualizamos na tabela public.usuarios
        const { error } = await _supabase
            .from('usuarios')
            .upsert({
                id: userId, // Garante o vínculo com o Auth (UUID)
                ...dados,
                updated_at: new Date()
            });

        if (error) throw error;

        alert(idExistente ? "Perfil atualizado!" : "Usuário e Login criados com sucesso!");
        resetarForm();
        loadUsuarios();

    } catch (error) {
        alert("Erro no processo: " + error.message);
    }
}
