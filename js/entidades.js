(async () => {
    "use strict";

    let listaGeral = [];

    // --- CARREGAMENTO ---
    async function loadEntities() {
        const { data, error } = await _supabase
            .from('entidades')
            .select('*')
            .order('nome_completo', { ascending: true });

        if (error) {
            console.error("Erro ao carregar:", error.message);
            return;
        }

        listaGeral = data;
        renderTable(data);
    }

    function renderTable(dados) {
        const tbody = document.getElementById('lista-entidades');
        tbody.innerHTML = dados.map(item => `
            <tr>
                <td><strong>${item.nome_completo}</strong></td>
                <td><span class="badge">${item.tipo_entidade}</span></td>
                <td>${item.documento || '---'}</td>
                <td>${item.telefone || item.email || '---'}</td>
                <td>
                    <button class="btn btn-primary" onclick="editEntity('${item.id}')" style="padding: 5px 10px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteEntity('${item.id}')" style="padding: 5px 10px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // --- SALVAR / ATUALIZAR ---
    document.getElementById('entity-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('edit-id').value;
        const payload = {
            nome_completo: document.getElementById('nome_completo').value,
            tipo_entidade: document.getElementById('tipo_entidade').value,
            documento: document.getElementById('documento').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            avaliacao: document.getElementById('avaliacao').value,
            endereco: document.getElementById('endereco').value
        };

        if (id) {
            const { error } = await _supabase.from('entidades').update(payload).eq('id', id);
            if (error) alert("Erro ao atualizar");
        } else {
            const { error } = await _supabase.from('entidades').insert([payload]);
            if (error) alert("Erro ao inserir");
        }

        window.resetForm();
        loadEntities();
    });

    // --- FUNÇÕES GLOBAIS (Acessíveis via HTML) ---
    window.editEntity = async (id) => {
        const entidade = listaGeral.find(item => item.id === id);
        if (!entidade) return;

        document.getElementById('edit-id').value = entidade.id;
        document.getElementById('nome_completo').value = entidade.nome_completo;
        document.getElementById('tipo_entidade').value = entidade.tipo_entidade;
        document.getElementById('documento').value = entidade.documento;
        document.getElementById('telefone').value = entidade.telefone;
        document.getElementById('email').value = entidade.email;
        document.getElementById('avaliacao').value = entidade.avaliacao;
        document.getElementById('endereco').value = entidade.endereco;

        document.getElementById('form-title').innerText = "Editando Entidade";
        document.getElementById('btn-save').innerText = "Atualizar Cadastro";
        document.getElementById('btn-cancel').style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.deleteEntity = async (id) => {
        if (confirm("Deseja realmente excluir esta entidade?")) {
            await _supabase.from('entidades').delete().eq('id', id);
            loadEntities();
        }
    };

    window.resetForm = () => {
        document.getElementById('entity-form').reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
        document.getElementById('btn-save').innerText = "Salvar Entidade";
        document.getElementById('btn-cancel').style.display = "none";
    };

    // --- BUSCA ---
    document.getElementById('inputBusca').addEventListener('keyup', (e) => {
        const termo = e.target.value.toLowerCase();
        const filtrados = listaGeral.filter(item => 
            item.nome_completo.toLowerCase().includes(termo) || 
            (item.documento && item.documento.includes(termo))
        );
        renderTable(filtrados);
    });

    // --- EXPORTAR PDF ---
    window.exportToPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Relatório de Entidades - ERP ABP", 14, 15);
        
        const rows = listaGeral.map(i => [i.nome_completo, i.tipo_entidade, i.documento, i.telefone]);
        doc.autoTable({
            head: [['Nome', 'Tipo', 'Doc', 'Telefone']],
            body: rows,
            startY: 25
        });
        doc.save("entidades.pdf");
    };

    // Inicialização ao carregar a página
    document.addEventListener('DOMContentLoaded', loadEntities);

})();
