/**
 * Variável global para armazenar o ID da entidade que está sendo editada.
 * Como não temos um input hidden no HTML, usamos essa variável para controlar 
 * se estamos criando um novo registro (null) ou atualizando um existente.
 */
let currentEditId = null; 

// ==========================================
// 1. EVENTOS GERAIS (Ex: Preview de Imagem)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const inputFoto = document.getElementById('input_foto');
    
    // Escuta quando o usuário escolhe um arquivo de imagem
    if (inputFoto) {
        inputFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Esconde o ícone e mostra a imagem de preview
                    document.getElementById('avatar_icon').classList.add('hidden');
                    const imgPreview = document.getElementById('image_preview');
                    imgPreview.src = event.target.result;
                    imgPreview.classList.remove('hidden');
                }
                reader.readAsDataURL(file); // Lê o arquivo como URL de dados
            }
        });
    }
});

// ==========================================
// 2. BUSCA DE CEP AUTOMÁTICA
// ==========================================
async function buscaCEP() {
    const cepInput = document.getElementById('input_cep');
    if (!cepInput) return;
    
    // Remove tudo que não for número
    const cep = cepInput.value.replace(/\D/g, ''); 
    
    // O CEP brasileiro tem exatamente 8 dígitos
    if (cep.length === 8) {
        try {
            // Consome a API pública do ViaCEP
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            
            // Se o CEP for válido, preenche os campos do formulário automaticamente
            if (!data.erro) {
                document.getElementById('input_logradouro').value = data.logradouro || '';
                document.getElementById('input_bairro').value = data.bairro || '';
                document.getElementById('input_cidade').value = data.localidade || '';
                document.getElementById('input_uf').value = data.uf || '';
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    }
}

// ==========================================
// 3. SALVAR ENTIDADE (Inserir ou Atualizar)
// ==========================================
async function handleSave() {
    const btnSave = document.getElementById('btn-save');
    const textoOriginal = btnSave.innerText; // Guarda o texto original do botão
    
    // Bloqueia o botão para evitar cliques duplos e dá feedback visual
    btnSave.disabled = true;
    btnSave.innerText = "Salvando, aguarde...";

    try {
        let fotoUrl = null;
        const inputFoto = document.getElementById('input_foto');

        // --- Passo A: Fazer o Upload da Imagem (se houver) ---
        if (inputFoto.files && inputFoto.files.length > 0) {
            const file = inputFoto.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
            
            // Envia para o bucket do Supabase
            const { data: uploadData, error: uploadError } = await _supabase.storage
                .from('avatares')
                .upload(`public/${fileName}`, file);

            if (uploadError) throw uploadError;

            // Pega a URL pública da imagem que acabou de ser "upada"
            const { data: publicUrlData } = _supabase.storage
                .from('avatares')
                .getPublicUrl(`public/${fileName}`);

            fotoUrl = publicUrlData.publicUrl;
        }

        // --- Passo B: Coletar todos os dados dos inputs ---
        const payload = {
            nome_completo: document.getElementById('input_nome').value,
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
            tipo: document.getElementById('input_categoria').value, // Mapeado para "tipo" do SQL
            permissao_ler: document.getElementById('check_permissao_ler').checked,
            permissao_editar: document.getElementById('check_permissao_editar').checked,
            permissao_cadastrar: document.getElementById('check_permissao_cadastrar').checked,
            permissao_deletar: document.getElementById('check_permissao_deletar').checked,
            urls_permitidas: document.getElementById('textarea_urls_acesso').value
        };

        // Se uma nova foto foi enviada, inclui na atualização
        if (fotoUrl) {
            payload.foto_url = fotoUrl;
        }

        // --- Passo C: Associar ao usuário logado ---
        const { data: userData } = await _supabase.auth.getUser();
        if(userData && userData.user) {
            payload.user_id = userData.user.id;
        }

        // --- Passo D: Salvar no Banco de Dados ---
        if (currentEditId) {
            // Estamos Editando (Update)
            const { error } = await _supabase.from('entidades').update(payload).eq('id', currentEditId);
            if (error) throw error;
        } else {
            // Estamos Criando (Insert)
            const { error } = await _supabase.from('entidades').insert([payload]);
            if (error) throw error;
        }
        
        alert("Entidade salva com sucesso!");
        resetForm(); // Limpa o form

        // Se houver uma função de carregar lista (vindo do listar_entidades.js), chama ela
        if (typeof carregarListaEntidades === 'function') {
            carregarListaEntidades();
        } else if (typeof loadEntities === 'function') {
            loadEntities();
        }

    } catch (error) {
        alert("Erro ao salvar: " + error.message);
        console.error(error);
    } finally {
        // Restaura o botão independente de sucesso ou erro
        btnSave.disabled = false;
        btnSave.innerText = textoOriginal;
    }
}

// ==========================================
// 4. MODO EDIÇÃO (Puxar dados para o form)
// ==========================================
async function editFull(id) {
    // Busca a entidade pelo ID
    const { data, error } = await _supabase.from('entidades').select('*').eq('id', id).single();
    if (error || !data) {
        console.error("Erro ao buscar entidade para edição:", error);
        return;
    }

    // Informa o JS que estamos em modo edição
    currentEditId = data.id;

    // Preenche os Text Inputs e Selects
    document.getElementById('input_nome').value = data.nome_completo || '';
    document.getElementById('input_cpf').value = data.cpf || '';
    document.getElementById('input_nascimento').value = data.data_nascimento || '';
    document.getElementById('input_email').value = data.email || '';
    document.getElementById('input_telefone').value = data.telefone || '';
    document.getElementById('input_cep').value = data.cep || '';
    document.getElementById('input_logradouro').value = data.logradouro || '';
    document.getElementById('input_numero').value = data.numero || '';
    document.getElementById('input_bairro').value = data.bairro || '';
    document.getElementById('input_cidade').value = data.cidade || '';
    document.getElementById('input_uf').value = data.uf || '';
    document.getElementById('input_categoria').value = data.tipo || '';
    
    // Preenche os Checkboxes
    document.getElementById('check_permissao_ler').checked = data.permissao_ler || false;
    document.getElementById('check_permissao_editar').checked = data.permissao_editar || false;
    document.getElementById('check_permissao_cadastrar').checked = data.permissao_cadastrar || false;
    document.getElementById('check_permissao_deletar').checked = data.permissao_deletar || false;
    
    // Preenche a Textarea
    document.getElementById('textarea_urls_acesso').value = data.urls_permitidas || '';

    // Arruma a foto no Preview
    if (data.foto_url) {
        const imgPreview = document.getElementById('image_preview');
        imgPreview.src = data.foto_url;
        imgPreview.classList.remove('hidden');
        document.getElementById('avatar_icon').classList.add('hidden');
    } else {
        document.getElementById('image_preview').src = '';
        document.getElementById('image_preview').classList.add('hidden');
        document.getElementById('avatar_icon').classList.remove('hidden');
    }

    // Atualiza o título e texto do botão
    const formTitle = document.querySelector('h2.text-lg.font-bold');
    if (formTitle) formTitle.innerText = "Editando: " + data.nome_completo;
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    
    // Rola a tela suavemente para o topo (onde está o formulário)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 5. DELETAR ENTIDADE
// ==========================================
async function deleteEntity(id) {
    if (!confirm("Tem certeza que deseja excluir permanentemente esta entidade?")) return;
    
    await _supabase.from('entidades').delete().eq('id', id);
    
    // Tenta atualizar a lista novamente dependendo de onde está a função
    if (typeof carregarListaEntidades === 'function') {
        carregarListaEntidades();
    } else if (typeof loadEntities === 'function') {
        loadEntities();
    }
}

// ==========================================
// 6. LIMPAR FORMULÁRIO (Reset)
// ==========================================
function resetForm() {
    currentEditId = null; // Sai do modo edição
    
    // Limpa todos os campos de texto, números, selects e textareas
    const inputs = document.querySelectorAll('#form_section input[type="text"], #form_section input[type="date"], #form_section input[type="email"], #form_section select, #form_section textarea');
    inputs.forEach(el => el.value = '');
    
    // Desmarca todos os checkboxes
    const checkboxes = document.querySelectorAll('#form_section input[type="checkbox"]');
    checkboxes.forEach(el => el.checked = false);
    
    // Reseta a foto (input file e visualização)
    document.getElementById('input_foto').value = '';
    document.getElementById('image_preview').src = '';
    document.getElementById('image_preview').classList.add('hidden');
    document.getElementById('avatar_icon').classList.remove('hidden');

    // Volta o título para o padrão
    const formTitle = document.querySelector('h2.text-lg.font-bold');
    if (formTitle) formTitle.innerText = "Novo Cadastro";
    
    // Volta o texto do botão de salvar
    document.getElementById('btn-save').innerText = "Salvar Entidade";
}

// Escuta a digitação no CEP para puxar o endereço automático
document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('input_cep');
    if(cepInput) {
        cepInput.addEventListener('blur', buscaCEP);
        cepInput.addEventListener('keyup', (e) => {
            if(e.target.value.replace(/\D/g, '').length === 8) buscaCEP();
        });
    }
});
