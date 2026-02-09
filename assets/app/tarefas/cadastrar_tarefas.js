document.addEventListener('DOMContentLoaded', () => {
    const btnSave = document.getElementById('btnSaveTask');

    btnSave.addEventListener('click', async () => {
        const title = document.getElementById('taskTitle').value;
        const entidade = document.getElementById('taskEntity').value;
        const content = document.getElementById('taskContent').value;
        const status = document.getElementById('taskStatus').value;
        const observacao = document.getElementById('taskObs').value;

        if (!title) {
            alert('Por favor, preencha pelo menos o título da tarefa.');
            return;
        }

        btnSave.disabled = true;
        btnSave.innerText = 'Salvando...';

        try {
            // Obtém o usuário logado
            const { data: { user } } = await window.supabaseClient.auth.getUser();

            const { error } = await window.supabaseClient
                .from('tarefas')
                .insert([
                    {
                        user_id: user?.id,
                        title: title,
                        entidade: entidade,
                        tarefa_descricao: content, // Mapeado conforme sua tabela
                        content: content,
                        status: status,
                        observacao: observacao
                    }
                ]);

            if (error) throw error;

            alert('Tarefa cadastrada com sucesso!');
            window.location.href = 'listar_tarefas.html';

        } catch (error) {
            console.error('Erro ao salvar:', error.message);
            alert('Erro ao salvar tarefa: ' + error.message);
        } finally {
            btnSave.disabled = false;
            btnSave.innerText = 'Salvar Tarefa';
        }
    });
});
