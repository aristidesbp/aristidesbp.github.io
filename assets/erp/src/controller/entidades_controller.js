

    

//##################################################################################
/** * ERP ABP - utilidades.js
 * Funções auxiliares e automação de interface
 */

// 1. Limpa todos os campos e volta o formulário ao estado inicial
function resetForm() {
    // Limpa Inputs, Selects e Textareas
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if (campo.id === 'avaliacao') {
            campo.value = '5';
        } else if (campo.tagName === 'SELECT') {
            campo.selectedIndex = 0;
        } else {
            campo.value = '';
        }
    });

    // Reset de elementos visuais de edição
    const editId = document.getElementById('edit-id');
    if (editId) editId.value = '';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.innerText = "Novo Cadastro de Entidade";

    const btnSave = document.getElementById('btn-save');
    if (btnSave) btnSave.innerText = "Salvar Entidade";

    const btnCancel = document.getElementById('btn-cancel');
    if (btnCancel) btnCancel.style.display = "none";

    console.log("🧹 Campos limpos com sucesso!");
}

// 2. Filtro de busca em tempo real (sem precisar de botão)
function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#entities-list tr');

    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

// 3. Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('senha_acesso');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput && passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else if (passwordInput) {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 4. Busca de CEP automática (ViaCEP)
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
                console.log("📍 Endereço preenchido via CEP");
            }
        } catch (e) { console.error("Erro ao buscar CEP", e); }
    }
     }    

    // ################
    // Selecionar/Deselecionar todos
function toggleSelectAllEntities() {
    const master = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = master.checked);
    updateSelectedCountEntities();
}

// Atualizar contador e visibilidade da barra vermelha
function updateSelectedCountEntities() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkArea = document.getElementById('bulk-area');
    const countLabel = document.getElementById('selected-count');
    
    bulkArea.style.display = selecionados > 0 ? 'flex' : 'none';
    countLabel.innerText = `${selecionados} selecionados`;
}

// Função de exclusão em massa no Supabase
async function deleteSelectedEntities() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked');
    const ids = Array.from(selecionados).map(cb => cb.value);

    if (!confirm(`Tem certeza que deseja excluir ${ids.length} entidades permanentemente?`)) return;

    const { error } = await window.supabaseClient
        .from('entidades')
        .delete()
        .in('id', ids);

    if (error) {
        alert("Erro ao excluir em massa: " + error.message);
    } else {
        alert("Entidades excluídas com sucesso!");
        document.getElementById('select-all').checked = false;
        updateSelectedCountEntities();
        loadEntities(); // Recarrega a tabela
    }
}

document.getElementById('formCadastro')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nome = document.getElementById('nome').value;
    const tipo_acesso = document.getElementById('tipo_acesso').value;

    try {
        // 1. Cria o usuário no Auth do Supabase
        const { data: authData, error: authError } = await window.supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (authError) throw authError;

        const userId = authData.user.id;

        // 2. Salva os detalhes na tabela 'entidades'
        const { error: dbError } = await window.supabaseClient
            .from('entidades')
            .insert([
                { 
                    user_id: userId, 
                    nome_completo: nome, 
                    email: email, 
                    tipo_acesso: tipo_acesso,
                    tipo_entidade: 'Colaborador'
                }
            ]);

        if (dbError) throw dbError;

        alert("Usuário " + nome + " cadastrado com sucesso!");
        window.location.reload();

    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro ao cadastrar: " + error.message);
    }
});
