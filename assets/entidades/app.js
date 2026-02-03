// Arquivo de dados simulado (conforme instrução de produtos.json)
const loadConfig = async () => {
    // Exemplo de como chamaria: const res = await fetch('servicos.json');
    console.log("Configurações e serviços carregados.");
};

const view = {
    renderList(data) {
        const list = document.getElementById('entities-list');
        if (data.length === 0) {
            list.innerHTML = '<tr><td colspan="3" style="text-align:center">Nenhum registro encontrado.</td></tr>';
            return;
        }
        list.innerHTML = data.map(item => `
            <tr>
                <td><b>${item.nome_completo}</b><br><small>${item.acesso}</small></td>
                <td>${item.telefone}</td>
                <td>
                    <button onclick="controller.edit(${item.id})"><i class="fas fa-edit"></i></button>
                    <button onclick="controller.delete(${item.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    },
    
    resetForm() {
        document.getElementById('entity-form').reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
        document.getElementById('btn-cancel').style.display = "none";
    },

    showLoading() {
        document.getElementById('entities-list').innerHTML = '<tr><td colspan="3"><div class="skeleton"></div></td></tr>';
    }
};

const controller = {
    async init() {
        view.showLoading();
        const data = await dbOps.getAll();
        view.renderList(data);
    },

    async handleSave() {
        const id = document.getElementById('edit-id').value;
        const entity = {
            nome_completo: document.getElementById('nome_completo').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            acesso: document.getElementById('acesso').value,
            status: document.getElementById('status').value,
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            cidade: document.getElementById('cidade').value
        };

        if (!entity.nome_completo) return alert("Nome é obrigatório");

        if (id) {
            entity.id = Number(id);
            await dbOps.update(entity);
        } else {
            await dbOps.add(entity);
        }

        view.resetForm();
        this.init();
    },

    async edit(id) {
        const item = await dbOps.getById(id);
        if (item) {
            Object.keys(item).forEach(key => {
                const el = document.getElementById(key);
                if (el) el.value = item[key];
            });
            document.getElementById('edit-id').value = item.id;
            document.getElementById('form-title').innerText = "Editando Entidade";
            document.getElementById('btn-cancel').style.display = "block";
            window.scrollTo(0,0);
        }
    },

    async delete(id) {
        if (confirm("Deseja excluir?")) {
            await dbOps.delete(id);
            this.init();
        }
    },

    async filter() {
        const termo = document.getElementById('inputBusca').value.toLowerCase();
        const todos = await dbOps.getAll();
        const filtrados = todos.filter(e => e.nome_completo.toLowerCase().includes(termo));
        view.renderList(filtrados);
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    controller.init();
    loadConfig();
});
