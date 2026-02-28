/** * ERP ABP - entidades_controller.js
 * Centraliza funções de interface, utilitários e cadastro de usuários/entidades
 */

// 1. Limpa todos os campos e volta o formulário ao estado inicial
function resetForm() {
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if (campo.id === 'avaliacao') {
            campo.value = '5';
        } else if (campo.tagName === 'SELECT') {
            campo.selectedIndex = 0;
        } else {
            campo.value = '';
        }
    });

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

// 2. Filtro de busca em tempo real
function filtrarTabela() {
    const input = document.getElementById('inputBusca');
    if (!input) return;
    
    const termo = input.value.toLowerCase();
    const linhas = document.querySelectorAll('#entities-list tr');

    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

// 3. Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    // Tenta encontrar por 'senha_acesso' ou 'password' (para cobrir os dois formulários)
    const passwordInput = document.getElementById('senha_acesso') || document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    if (passwordInput) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            if (toggleIcon) toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            if (toggleIcon) toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }
}

// 4. Busca de CEP automática (ViaCEP)
async function buscaCEP() {
    const campoCep = document.getElementById('cep');
    if (!campoCep) return;

    const cep = campoCep.value.replace(/\D/g, '').trim();
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                if(document.getElementById('logradouro')) document.getElementById('logradouro').value = data.logradouro || '';
                if(document.getElementById('bairro')) document.getElementById('bairro').value = data.bairro || '';
                if(document.getElementById('cidade')) document.getElementById('cidade').value = data.localidade || '';
                if(document.getElementById('estado')) document.getElementById('estado').value = data.uf || '';
                console.log("📍 Endereço preenchido via CEP");
            }
        } catch (e) { console.error("Erro ao buscar CEP", e); }
    }
}

// 5. Seleção em massa
function toggleSelectAllEntities() {
    const master = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = master.checked);
    updateSelectedCountEntities();
}

function updateSelectedCountEntities() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkArea = document.getElementById('bulk-area');
    const countLabel = document.getElementById('selected-count');
    
    if (bulkArea) bulkArea.style.display = selecionados > 0 ? 'flex' : 'none';
    if (countLabel) countLabel.innerText = `${selecionados} selecionados`;
}

// 6. Exclusão em massa
async function deleteSelectedEntities() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked');
    const ids = Array.from(selecionados).map(cb => cb.value);

    if (ids.length === 0) return;
    if (!confirm(`Tem certeza que deseja excluir ${ids.length} registros permanentemente?`)) return;

    const { error } = await window.supabaseClient
        .from('entidades')
        .delete()
        .in('id', ids);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        alert("Excluído com sucesso!");
        if (document.getElementById('select-all')) document.getElementById('select-all').checked = false;
        updateSelectedCountEntities();
        
        // Verifica se a função de carregar tabela existe, senão recarrega a página
        if (typeof loadEntities === 'function') {
            loadEntities();
        } else {
            window.location.reload();
        }
    }
}

// 7. Lógica de Cadastro de Novo Usuário (Auth + Tabela Entidades)
document.getElementById('formCadastro')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nome = document.getElementById('nome').value;
    const tipo_acesso = document.getElementById('tipo_acesso').value;

    try {
        // Mostra um feedback visual simples
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = "CADASTRANDO...";
        btn.disabled = true;

        // 1. Cria o usuário no Auth do Supabase
        const { data: authData, error: authError } = await window.supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // 2. Salva os detalhes na tabela 'entidades' vinculando ao ID do Auth
        const { error: dbError } = await window.supabaseClient
            .from('entidades')
            .insert([
                { 
                    user_id: authData.user.id, 
                    nome_completo: nome, 
                    email: email, 
                    tipo_acesso: tipo_acesso,
                    tipo_entidade: 'Colaborador',
                    status_entidade: 'Ativo'
                }
            ]);

        if (dbError) throw dbError;

        alert("Usuário " + nome + " cadastrado com sucesso!");
        
        // Pequeno delay para garantir que o banco processou antes de recarregar
        setTimeout(() => {
            window.location.reload();
        }, 500);

    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro ao cadastrar: " + error.message);
        
        // Restaura o botão em caso de erro
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerText = "CADASTRAR USUÁRIO";
        btn.disabled = false;
    }
});
