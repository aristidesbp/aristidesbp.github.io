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
