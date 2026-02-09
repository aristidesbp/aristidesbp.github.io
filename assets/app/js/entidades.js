/**
 * js/entidades.js
 * Lógica para salvar novas entidades no Supabase
 */

async function salvarEntidade() {
    // Captura dos campos do formulário
    const nome = document.querySelector('input[placeholder="Nome da Entidade/Empresa"]').value;
    const tipo = document.querySelector('select').value;
    const documento = document.querySelector('input[placeholder="00.000.000/0001-00"]').value;
    const contato = document.querySelector('input[placeholder="(00) 00000-0000"]').value;
    const email = document.querySelector('input[placeholder="exemplo@email.com"]').value;
    const url_doc = document.querySelector('input[placeholder="https://exemplo.com/documento.pdf"]').value;
    const observacao = document.querySelector('textarea').value;

    if (!nome) {
        alert("O nome da entidade é obrigatório.");
        return;
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('entidades') // Certifique-se que a tabela se chama 'entidades' no banco
            .insert([
                { 
                    nome, 
                    tipo, 
                    documento, 
                    contato, 
                    email, 
                    url_documento: url_doc, 
                    observacao 
                }
            ]);

        if (error) throw error;

        alert("Entidade salva com sucesso!");
        window.location.href = 'entidades_lista.html';

    } catch (error) {
        console.error("Erro ao salvar:", error.message);
        alert("Erro ao salvar entidade.");
    }
}

// Vincula o clique do botão de salvar (caso não esteja no HTML)
// document.querySelector('button.bg-primary').addEventListener('click', salvarEntidade);
