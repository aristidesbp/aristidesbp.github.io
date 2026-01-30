// Nome do banco de dados que ficará salvo no navegador
const NOME_BANCO = 'app_db';

// Versão do banco.
// Sempre que essa versão mudar, o evento onupgradeneeded será executado
const VERSAO_BANCO = 1;

/**
 * Função responsável por abrir o banco de dados IndexedDB.
 * Se o banco não existir, ele será criado automaticamente.
 * Se a versão for maior que a atual, ele executa a criação/atualização das tabelas.
 */
function abrirBanco() {
    return new Promise((resolve, reject) => {

        // Solicita ao navegador a abertura (ou criação) do banco
        const request = indexedDB.open(NOME_BANCO, VERSAO_BANCO);

        /**
         * Evento disparado APENAS quando:
         * - O banco ainda não existe
         * - Ou a versão do banco foi alterada
         * 
         * Aqui é o ÚNICO lugar correto para criar tabelas (objectStores)
         */
        request.onupgradeneeded = (event) => {

            // Instância do banco de dados
            const db = event.target.result;

            /**
             * Verifica se a tabela "usuario" já existe.
             * Isso evita erro ao tentar criar novamente.
             */
            if (!db.objectStoreNames.contains('usuario')) {

                /**
                 * Criação da tabela "usuario"
                 * keyPath: campo que será a chave primária
                 * autoIncrement: gera o id automaticamente
                 */
                const store = db.createObjectStore('usuario', {
                    keyPath: 'id',
                    autoIncrement: true
                });

                /**
                 * Índice para busca por e-mail
                 * unique: true impede cadastro de e-mails duplicados
                 */
                store.createIndex('email', 'email', { unique: true });

                /**
                 * Índice para senha
                 * Não é único pois várias senhas podem ser iguais
                 */
                store.createIndex('senha', 'senha', { unique: false });
            }
        };

        /**
         * Evento disparado quando o banco foi aberto com sucesso
         */
        request.onsuccess = () => {
            resolve(request.result);
        };

        /**
         * Evento disparado em caso de erro ao abrir/criar o banco
         */
        request.onerror = () => {
            reject(request.error);
        };
    });
}
