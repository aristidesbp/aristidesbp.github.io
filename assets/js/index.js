/**
 * Código executado somente após o HTML estar totalmente carregado
 */
document.addEventListener('DOMContentLoaded', () => {

    // Captura todos os botões dentro do footer
    const botoes = document.querySelectorAll('footer button');

    // Primeiro botão → ACEITAR
    const botaoAceitar = botoes[0];

    // Segundo botão → RECUSAR
    const botaoRecusar = botoes[1];

    /**
     * AÇÃO DO BOTÃO ACEITAR
     */
    botaoAceitar.addEventListener('click', async () => {
        try {
            /**
             * Abre ou cria o banco IndexedDB.
             * Garante que a tabela "usuario" exista.
             */
            await abrirBanco();

            /**
             * Salva localmente que o usuário aceitou os termos.
             * Esse valor pode ser usado para bloquear telas futuramente.
             */
            localStorage.setItem('termos_aceitos', 'true');

            /**
             * Redireciona para a tela de login.
             * replace evita que o usuário volte para os termos com o botão "voltar".
             */
            window.location.replace('login.html');

        } catch (error) {

            // Exibe erro caso o IndexedDB não funcione
            alert('Erro ao inicializar o banco de dados no navegador.');
        }
    });

    /**
     * AÇÃO DO BOTÃO RECUSAR
     */
    botaoRecusar.addEventListener('click', () => {

        // Confirmação antes de fechar a aplicação
        if (confirm('Ao recusar os termos o aplicativo será fechado. Deseja continuar?')) {

            /**
             * Tenta fechar a aba.
             * Só funciona se a aba foi aberta via JavaScript.
             */
            window.close();

            /**
             * Fallback para navegadores que bloqueiam window.close()
             * Redireciona para uma página vazia simulando fechamento
             */
            setTimeout(() => {
                window.location.href = 'about:blank';
            }, 300);
        }
    });
});
