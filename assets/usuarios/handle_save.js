/**
 * Arquivo: usuarios/handle_save.js
 * Descrição: Gerencia a lógica de salvar (Inserir ou Atualizar) usuários no banco.
 */

async function handleSave() {
    const idExistente = document.getElementById('edit-id').value;
    
    // Coleta dos dados do formulário
    const dados = {
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        acesso: document.getElementById('acesso').value,
        status: document.getElementById('status').value,
        relacionamento: document.getElementById('acesso').value // Campo exigido pelo seu SQL
    };

    // Validação de campos obrigatórios
    if (!dados.nome_completo || !dados.telefone || !dados.email) {
        return alert("Por favor, preencha Nome, Telefone e E-mail.");
    }

    try {
        let userId = idExistente;

        // CENÁRIO 1: NOVO REGISTRO (Necessário criar login no Auth primeiro)
        if (!idExistente) {
            console.log("Iniciando criação de credenciais para:", dados.email);
            
            // Chama a função que criamos no arquivo auth_create_user.js
            // Passamos 'null' para a senha para que ele use a senha padrão definida lá
            userId = await criarContaAuth(dados.email, null, dados.nome_completo);
            
            if (!userId) throw new Error("Não foi possível gerar o ID do usuário.");
        }

        // CENÁRIO 2: SALVAR NA TABELA PÚBLICA (Upsert)
        // O upsert insere se não existir (baseado no ID) ou atualiza se já existir
        const { error } = await _supabase
            .from('usuarios')
            .upsert({
                id: userId, // UUID vinculado ao Auth
                ...dados,
                updated_at: new Date()
            });

        if (error) throw error;

        // Feedback e limpeza
        const mensagem = idExistente ? "Perfil atualizado com sucesso!" : "Usuário e Login criados com sucesso!";
        alert(mensagem);
        
        resetarForm();
        loadUsuarios(); // Recarrega a tabela para mostrar as mudanças

    } catch (error) {
        console.error("Erro no fluxo de salvamento:", error.message);
        alert("Erro ao salvar: " + error.message);
    }
}
