// 1. CONFIGURAÇÃO DO CLIENTE (Certifique-se que o supabase_config.js defina estas variáveis)
// Se não usar o config.js, preencha aqui:
// const _supabase = supabase.createClient('SUA_URL', 'SUA_ANON_KEY');

// 2. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    // Configura o evento de busca de CEP
    const inputCep = document.getElementById('input_cep');
    if (inputCep) {
        inputCep.addEventListener('blur', buscaCEP);
    }

    // Configura o preview da imagem
    const inputFoto = document.getElementById('input_foto');
    if (inputFoto) {
        inputFoto.addEventListener('change', handleImagePreview);
    }

    // Configura o Menu Dropdown (Toggle)
    const btnMenu = document.getElementById('btn_menu');
    const dropdown = document.getElementById('dropdown_menu');
    if (btnMenu && dropdown) {
        btnMenu.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
        });
    }

    // Carrega a lista inicial
    if (typeof fetchEntidades === 'function') {
        fetchEntidades();
    }
});

// 3. LOGICA DE PREVIEW DA IMAGEM
function handleImagePreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('image_preview');
    const placeholder = document.getElementById('avatar_icon');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// 4. BUSCA DE CEP (ViaCEP)
async function buscaCEP() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                document.getElementById('input_logradouro').value = data.logradouro;
                document.getElementById('input_bairro').value = data.bairro;
                document.getElementById('input_cidade').value = data.localidade;
                document.getElementById('input_uf').value = data.uf;
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    }
}

// 5. FUNÇÃO PRINCIPAL: SALVAR NO BANCO
async function handleSave() {
    const btn = document.getElementById('btn_salvar');
    const btnText = document.getElementById('btn_salvar_text');
    const btnLoader = document.getElementById('btn_salvar_loader');

    // Estado de carregamento
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    try {
        // A. Upload da Foto para o Storage
        let fotoUrl = null;
        const fotoFile = document.getElementById('input_foto').files[0];
        
        if (fotoFile) {
            const fileExt = fotoFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await _supabase.storage
                .from('avatares')
                .upload(filePath, fotoFile);

            if (uploadError) throw uploadError;

            const { data: urlData } = _supabase.storage
                .from('avatares')
                .getPublicUrl(filePath);
            
            fotoUrl = urlData.publicUrl;
        }

        // B. Coleta dos Dados do formulário
        // Importante: No seu SQL 'tipo' é obrigatório. 
        // Como o toggle foi removido, definimos um padrão ou capturamos de um campo novo.
        const payload = {
            nome_completo: document.getElementById('input_nome').value,
            tipo: 'Paciente', // Valor padrão para satisfazer o CONSTRAINT do seu SQL
            cpf: document.getElementById('input_cpf').value,
            data_nascimento: document.getElementById('input_nascimento').value || null,
            email: document.getElementById('input_email').value,
            telefone: document.getElementById('input_telefone').value,
            cep: document.getElementById('input_cep').value,
            logradouro: document.getElementById('input_logradouro').value,
            numero: document.getElementById('input_numero').value,
            bairro: document.getElementById('input_bairro').value,
            cidade: document.getElementById('input_cidade').value,
            uf: document.getElementById('input_uf').value,
            permissao_ler: document.getElementById('check_permissao_ler').checked,
            permissao_editar: document.getElementById('check_permissao_editar').checked,
            permissao_cadastrar: document.getElementById('check_permissao_cadastrar').checked,
            permissao_deletar: document.getElementById('check_permissao_deletar').checked,
            urls_permitidas: document.getElementById('textarea_urls_acesso').value,
            foto_url: fotoUrl
        };

        // Validação simples
        if (!payload.nome_completo) {
            alert("Por favor, preencha o nome completo.");
            btn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            return;
        }

        // C. Inserção no Database
        const { data, error } = await _supabase
            .from('entidades')
            .insert([payload]);

        if (error) throw error;

        // Sucesso
        alert("✅ Registro salvo com sucesso!");
        
        // Limpar formulário e recarregar
        window.location.reload();

    } catch (error) {
        console.error("Erro completo:", error);
        alert("❌ Erro ao salvar: " + error.message);
    } finally {
        // Restaura o botão
        btn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}
