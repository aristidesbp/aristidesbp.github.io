(function() {
    "use strict";

    let currentData = [];

    // --- Inicialização ---
    const init = () => {
        loadEntities();
        setupEventListeners();
    };

    const setupEventListeners = () => {
        document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
        document.getElementById('cep').addEventListener('blur', buscaCEP);
        document.getElementById('btn-save').addEventListener('click', handleSave);
        document.getElementById('btn-cancel').addEventListener('click', resetForm);
        document.getElementById('inputBusca').addEventListener('keyup', filtrarTabela);
        document.getElementById('btn-export-list').addEventListener('click', exportarPDFListagem);
        document.getElementById('btn-export-full').addEventListener('click', exportarPDFFichaCompleta);
    };

    // --- Funções de Interface ---
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById('senha_acesso');
        const toggleIcon = document.getElementById('togglePassword');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    };

    const buscaCEP = async () => {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            } catch (err) { console.error("Erro ao buscar CEP", err); }
        }
    };

    // --- Lógica Supabase ---
    async function loadEntities() {
        if (!window._supabase) {
            setTimeout(loadEntities, 500);
            return;
        }

        const { data, error } = await _supabase.from('entidades').select('*').order('nome_completo');
        if (error) {
            console.error("Erro ao carregar:", error);
            return;
        }
        currentData = data || [];
        renderTable(currentData);
    }

    function renderTable(data) {
        const list = document.getElementById('entities-list');
        list.innerHTML = data.map(c => {
            const wppLink = c.telefone && c.telefone.includes('http') ? c.telefone : `https://wa.me/${c.telefone ? c.telefone.replace(/\D/g, '') : ''}`;
            const mailLink = c.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}` : '#';

            return `
            <tr>
                <td><b>${c.nome_completo}</b><br><small>${(c.relacionamento || '').toUpperCase()}</small></td>
                <td>${c.telefone || 'Sem contato'}<br><small>${c.email || ''}</small></td>
                <td>${c.acesso}<br><small style="color:${c.status === 'ativo' ? 'green' : 'red'}">${c.status}</small></td>
                <td>
                    <button class="btn-edit-row" data-id="${c.id}" title="Editar"><i class="fas fa-edit" style="color:#3b82f6"></i></button>
                    <button class="btn-del-row" data-id="${c.id}" title="Excluir"><i class="fas fa-trash" style="color:#ef4444"></i></button>
                    <a href="${wppLink}" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp" style="color:#25d366"></i></a>
                    <a href="${mailLink}" target="_blank" title="Gmail"><i class="fas fa-envelope" style="color:#ea4335"></i></a>
                </td>
            </tr>`;
        }).join('') || '<tr><td colspan="4" style="text-align:center">Nenhuma entidade encontrada.</td></tr>';

        // Adiciona eventos aos botões da tabela dinamicamente
        document.querySelectorAll('.btn-edit-row').forEach(b => b.onclick = () => editFull(b.dataset.id));
        document.querySelectorAll('.btn-del-row').forEach(b => b.onclick = () => deleteEntity(b.dataset.id));
    }

    const filtrarTabela = () => {
        const filtro = document.getElementById("inputBusca").value.toLowerCase();
        const linhas = document.querySelectorAll("#entities-list tr");
        linhas.forEach(linha => {
            const txt = linha.innerText.toLowerCase();
            linha.style.display = txt.includes(filtro) ? "" : "none";
        });
    };

    const handleSave = async () => {
        const { data: { user } } = await _supabase.auth.getUser();
        const id = document.getElementById('edit-id').value;
        const dados = {
            usuario_id: user.id,
            nome_completo: document.getElementById('nome_completo').value,
            cpf: document.getElementById('cpf').value,
            data_nascimento: document.getElementById('data_nascimento').value || null,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            senha_acesso: document.getElementById('senha_acesso').value,
            acesso: document.getElementById('acesso').value,
            relacionamento: document.getElementById('relacionamento').value,
            status: document.getElementById('status').value,
            avaliacao: parseInt(document.getElementById('avaliacao').value),
            observacoes: document.getElementById('observacoes').value,
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            numero: document.getElementById('numero').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            arquivos_url: document.getElementById('arquivos_url').value ? [document.getElementById('arquivos_url').value] : []
        };
        
        if (!dados.nome_completo) return alert("Nome é obrigatório");
        
        const { error } = id ? 
            await _supabase.from('entidades').update(dados).eq('id', id) : 
            await _supabase.from('entidades').insert([dados]);
        
        if (error) alert("Erro: " + error.message); 
        else { resetForm(); loadEntities(); }
    };

    const editFull = async (id) => {
        const { data, error } = await _supabase.from('entidades').select('*').eq('id', id).single();
        if (error || !data) return;
        Object.keys(data).forEach(k => {
            const el = document.getElementById(k);
            if (el) el.value = (k === 'arquivos_url' && data[k]) ? data[k][0] : (data[k] || '');
        });
        document.getElementById('edit-id').value = data.id;
        document.getElementById('form-title').innerText = "Editando Entidade";
        document.getElementById('btn-save').innerText = "Atualizar Entidade";
        document.getElementById('btn-cancel').style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        document.querySelectorAll('input, select, textarea').forEach(i => {
            if(i.id === 'avaliacao') i.value = '5';
            else if(i.tagName === 'SELECT') i.selectedIndex = 0;
            else if(i.id !== 'edit-id') i.value = '';
        });
        document.getElementById('edit-id').value = '';
        document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
        document.getElementById('btn-save').innerText = "Salvar Entidade";
        document.getElementById('btn-cancel').style.display = "none";
    };

    const deleteEntity = async (id) => {
        if (confirm("Excluir definitivamente?")) {
            await _supabase.from('entidades').delete().eq('id', id);
            loadEntities();
        }
    };

    // --- Exportação PDF ---
    function exportarPDFListagem() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Listagem de Entidades - ERP ABP", 14, 15);
        const rows = [];
        document.querySelectorAll("#entities-list tr").forEach(tr => {
            if (tr.style.display !== "none") {
                const cells = tr.querySelectorAll("td");
                if(cells.length > 3) {
                    rows.push([
                        cells[0].innerText.replace('\n', ' - '), 
                        cells[1].innerText.replace('\n', ' - '), 
                        cells[2].innerText.replace('\n', ' - ')
                    ]);
                }
            }
        });
        doc.autoTable({ head: [['Entidade / Tipo', 'Contato', 'Acesso / Status']], body: rows, startY: 20 });
        doc.save("listagem_entidades.pdf");
    }

    function exportarPDFFichaCompleta() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;
        const filtro = document.getElementById("inputBusca").value.toLowerCase();
        const dadosFiltrados = currentData.filter(c => (c.nome_completo || '').toLowerCase().includes(filtro));
        
        doc.setFontSize(16);
        doc.text("FICHAS DETALHADAS DE ENTIDADES", 14, y);
        y += 10;

        dadosFiltrados.forEach((c, index) => {
            if (y > 250) { doc.addPage(); y = 20; }
            doc.setFontSize(11); doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${(c.nome_completo || '').toUpperCase()}`, 14, y);
            y += 6; 
            doc.setFontSize(9); doc.setFont(undefined, 'normal');
            doc.text(`Doc: ${c.cpf || 'N/A'} | Nasc: ${c.data_nascimento || 'N/A'}`, 14, y);
            y += 4;
            doc.text(`Email: ${c.email || 'N/A'} | Tel: ${c.telefone || 'N/A'}`, 14, y);
            y += 4;
            doc.text(`End: ${c.logradouro || ''}, ${c.numero || ''} - ${c.bairro || ''}, ${c.cidade || ''}/${c.estado || ''}`, 14, y);
            y += 4;
            doc.text(`Tipo: ${c.relacionamento} | Acesso: ${c.acesso} | Status: ${c.status}`, 14, y);
            y += 4;
            doc.text(`Obs: ${c.observacoes || 'Nenhuma'}`, 14, y);
            y += 5;
            doc.line(14, y, 196, y);
            y += 8;
        });
        doc.save("fichas_entidades.pdf");
    }

    document.addEventListener('DOMContentLoaded', init);
})();
