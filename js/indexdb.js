/**
 * ERPABP - Motor de Banco de Dados Local (IndexedDB)
 * Desenvolvido para funcionar em Navegadores Mobile (Android/iOS)
 */

const DB_NAME = 'ERPABP_DB';
const DB_VERSION = 4; // Versão aumentada para garantir atualização total

/**
 * FUNÇÃO PRINCIPAL: Abre a conexão e configura a estrutura
 */
function abrirBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // --- CRIAÇÃO DAS TABELAS (Gavetas) ---
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // 1. USUÁRIOS: Identificado pelo E-mail (Chave Única)
            if (!db.objectStoreNames.contains('usuarios')) {
                db.createObjectStore('usuarios', { keyPath: 'email' });
            }

            // 2. BANCOS: ID numérico automático
            if (!db.objectStoreNames.contains('bancos')) {
                db.createObjectStore('bancos', { keyPath: 'id', autoIncrement: true });
            }

            // 3. ENTIDADES: ID numérico automático
            if (!db.objectStoreNames.contains('entidades')) {
                db.createObjectStore('entidades', { keyPath: 'id', autoIncrement: true });
            }

            // 4. PARCELAS: ID numérico automático
            if (!db.objectStoreNames.contains('parcelas')) {
                db.createObjectStore('parcelas', { keyPath: 'id', autoIncrement: true });
            }

            // 5. CONFIGURAÇÕES: Para Tema Escuro, etc.
            if (!db.objectStoreNames.contains('configuracoes')) {
                db.createObjectStore('configuracoes', { keyPath: 'chave' });
            }

            alert("Estrutura do sistema inicializada com sucesso!");
        };

        request.onsuccess = () => resolve(request.result);

        request.onerror = (event) => {
            alert("Erro ao abrir banco: " + event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * FUNÇÃO SALVAR OU ALTERAR (Sincroniza os dados)
 * Se você passar um ID que já existe, ele ALTERA. Se não existir, ele CRIA.
 */
async function salvarDado(tabela, objeto) {
    try {
        const db = await abrirBanco();
        return new Promise((resolve, reject) => {
            const transacao = db.transaction([tabela], 'readwrite');
            const store = transacao.objectStore(tabela);
            
            // O '.put' é o segredo: ele salva novo ou atualiza o existente
            const request = store.put(objeto);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (erro) {
        alert("Erro ao salvar: " + erro);
    }
}

/**
 * FUNÇÃO LISTAR TUDO
 * Usado para preencher as tabelas de visualização
 */
async function listarTudo(tabela) {
    const db = await abrirBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([tabela], 'readonly');
        const store = transacao.objectStore(tabela);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * FUNÇÃO BUSCAR POR ID/CHAVE
 * Útil para carregar dados em uma tela de edição
 */
async function buscarPorId(tabela, id) {
    const db = await abrirBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([tabela], 'readonly');
        const store = transacao.objectStore(tabela);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * FUNÇÃO EXCLUIR
 */
async function excluirDado(tabela, id) {
    const db = await abrirBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([tabela], 'readwrite');
        const store = transacao.objectStore(tabela);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
    });
}

