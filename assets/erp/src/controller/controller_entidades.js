// Dados Pessoais e Endereço
        const nome = document.getElementById('input_nome').value.trim();
        const cpf = document.getElementById('input_cpf').value.replace(/\D/g, ''); // Remove máscara se houver
        const nascimento = document.getElementById('input_nascimento').value;
        const email = document.getElementById('input_email').value.trim();
        const telefone = document.getElementById('input_telefone').value.trim();
        const cep = document.getElementById('input_cep').value.replace(/\D/g, '');
        const logradouro = document.getElementById('input_logradouro').value.trim();
        const numero = document.getElementById('input_numero').value.trim();
        const bairro = document.getElementById('input_bairro').value.trim();
        const cidade = document.getElementById('input_cidade').value.trim();
        const uf = document.getElementById('input_uf').value;

        // Permissões de Acesso (Checkboxes)
        const permissoes = {
            ler: document.getElementById('check_permissao_ler').checked,
            editar: document.getElementById('check_permissao_editar').checked,
            cadastrar: document.getElementById('check_permissao_cadastrar').checked,
            deletar: document.getElementById('check_permissao_deletar').checked
        };

        // URLs Permitidas (Transforma o texto em Array)
        const urlsTexto = document.getElementById('textarea_urls_acesso').value;
        const urlsAcesso = urlsTexto
            .split(/[\n,]+/)           // Divide por nova linha ou vírgula
            .map(url => url.trim())    // Remove espaços extras
            .filter(url => url !== ""); // Remove itens vazios
