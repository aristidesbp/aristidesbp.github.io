/* tarefas_controller.js */
const TarefasController = {
    async init() {
        const { data: { session } } = await _supabase.auth.getSession();
        if (!session) {
            this.showLogin(true);
        } else {
            this.showLogin(false);
            this.renderList();
        }
    },

    showLogin(show) {
        document.getElementById('tela-login').style.display = show ? 'flex' : 'none';
        document.getElementById('tela-sistema').style.display = show ? 'none' : 'block';
    },

    async renderList() {
        try {
            const tarefas = await TarefasModel.fetchAll();
            const tbody = document.getElementById('exercises-list');
            tbody.innerHTML = tarefas.map(e => this.templateRow(e)).join('');
        } catch (err) {
            console.error("Erro ao listar:", err.message);
        }
    },

    templateRow(e) {
        let prazo = e.data_prazo ? new Date(e.data_prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
        return `
            <tr class="border-t">
                <td class="p-4">
                    <span class="font-bold text-slate-800">${e.titulo}</span><br>
                    <span class="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">${e.categoria || 'Geral'}</span>
                    <span class="tag tag-data"><i class="far fa-calendar-alt"></i> ${prazo}</span>
                </td>
                <td class="p-4 font-mono text-sm text-slate-400">${e.codigo_de_barras || '-'}</td>
                <td class="p-4"><span class="tag tag-${e.status_exercicio}">${e.status_exercicio}</span></td>
                <td class="p-4 text-center">
                    <button class="text-blue-500 mr-4" onclick="TarefasController.edit('${e.id}')"><i class="fas fa-edit"></i></button>
                    <button class="text-red-500" onclick="TarefasController.remove('${e.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    },

    async save() {
        const btn = document.getElementById('btn-save');
        btn.disabled = true; btn.innerText = "Salvando...";
        
        try {
            const id = document.getElementById('edit-id').value;
            const { data: { user } } = await _supabase.auth.getUser();
            
            const payload = {
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                categoria: document.getElementById('categoria').value,
                codigo_de_barras: document.getElementById('codigo_de_barras').value,
                data_prazo: document.getElementById('data_prazo').value || null,
                status_exercicio: document.getElementById('status_exercicio').value,
                observacoes: document.getElementById('observacoes').value,
                user_id: user.id
            };

            // Lógica de Upload (Tratada pelo Model)
            const inputFoto = document.getElementById('foto_resolucao');
            if (inputFoto.files[0]) {
                const path = `public/res_${Date.now()}.jpg`;
                payload.foto_url = await TarefasModel.uploadFile('resolucoes', path, inputFoto.files[0]);
            }

            const { error } = await TarefasModel.save(payload, id);
            if (error) throw error;
            
            this.resetForm();
            this.renderList();
        } catch (e) {
            alert("Erro: " + e.message);
        } finally {
            btn.disabled = false; btn.innerText = "Salvar Registro";
        }
    },

    async edit(id) {
        const data = await TarefasModel.getById(id);
        document.getElementById('edit-id').value = data.id;
        document.getElementById('titulo').value = data.titulo;
        document.getElementById('descricao').value = data.descricao;
        document.getElementById('categoria').value = data.categoria || '';
        document.getElementById('codigo_de_barras').value = data.codigo_de_barras || '';
        document.getElementById('data_prazo').value = data.data_prazo || '';
        document.getElementById('status_exercicio').value = data.status_exercicio;
        document.getElementById('observacoes').value = data.observacoes || '';
        
        document.getElementById('form-title').innerText = "Editando Atividade";
        document.getElementById('btn-cancel').style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async remove(id) {
        if (confirm("Deseja realmente excluir?")) {
            await TarefasModel.delete(id);
            this.renderList();
        }
    },

    resetForm() {
        document.getElementById('edit-id').value = '';
        document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
        document.getElementById('status_exercicio').value = 'pendente';
        document.getElementById('form-title').innerText = "Nova Atividade";
        document.getElementById('btn-cancel').style.display = "none";
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => TarefasController.init());
