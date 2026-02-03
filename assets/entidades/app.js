/**
 * Controlador Principal - Gestão de Entidades
 */
const AppController = {
    entidades: [],
    servicos: [],

    async iniciar() {
        console.log("Iniciando App...");
        await this.carregarServicos();
        await this.carregarDados();
        this.renderizarTabela();
    },

    // Regra: "Sempre invocar produto, serviços de um arquivo json"
    async carregarServicos() {
        try {
            const response = await fetch('servicos.json');
            this.servicos = await response.json();
            console.log("Serviços carregados via JSON:", this.servicos);
        } catch (err) {
            console.error("Erro ao carregar servicos.json", err);
        }
    },

    async carregarDados() {
        this.entidades = await dbOps.getAll(); // Função do db.js (IndexedDB)
    },

    async handleSave() {
        const id = document.getElementById('edit-id').value;
        const entidade = {
            nome_completo: document.getElementById('nome_completo').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            acesso: document.getElementById('acesso').value,
            status: document.getElementById('status').value,
            // IDs obrigatórios nos campos de formulário conforme sua regra
            timestamp: new Date().toISOString()
        };

        if (id) {
            entidade.id = Number(id);
            await dbOps.update(entidade);
            this.notificar("Entidade atualizada com sucesso!", "success");
        } else {
            await dbOps.add(entidade);
            this.notificar("Entidade cadastrada!", "success");
        }

        this.resetarForm();
        this.iniciar();
    },

    renderizarTabela(dados = this.entidades) {
        const tbody = document.getElementById('entities-list');
        if (dados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Nenhum registro encontrado.</td></tr>`;
            return;
        }

        tbody.innerHTML = dados.map(item => `
            <tr>
                <td><b>${item.nome_completo}</b></td>
                <td>${item.telefone}</td>
                <td><span class="badge-${item.status}">${item.status}</span></td>
                <td>
                    <button onclick="AppController.prepararEdicao(${item.id})"><i class="fas fa-edit"></i></button>
                    <button onclick="AppController.excluir(${item.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    },

    // Regra: "Sempre use filtros e campo de busca nas listagens"
    filtrar() {
        const termo = document.getElementById('inputBusca').value.toLowerCase();
        const filtrados = this.entidades.filter(e => 
            e.nome_completo.toLowerCase().includes(termo) || 
            e.cpf.includes(termo)
        );
        this.renderizarTabela(filtrados);
    },

    notificar(msg, tipo) {
        // Implementação de Toasts de sucesso/erro conforme arquitetura
        alert(msg); 
    }
};

document.addEventListener('DOMContentLoaded', () => AppController.iniciar());
