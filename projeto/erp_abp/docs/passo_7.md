## js/core/conexao.js
```
(function () {
    'use strict';

    // 1. CONFIGURAÇÕES DO SUPABASE
    // Se não estiver usando Vite, altere para strings diretas
    const SUPABASE_URL = "https://SEU_PROJETO_ID.supabase.co"; 
    const SUPABASE_ANON_KEY = "sb_publishable_QFcFrpO1NJCI3-gkyYqkQA_P5qQ5w1J";

    if (typeof supabase === 'undefined') {
        console.error('❌ Biblioteca Supabase não encontrada.');
        return;
    }

    // Inicializa o cliente global
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 2. INICIALIZAÇÃO DO DEXIE (INDEXEDDB)
    if (typeof Dexie === 'undefined') {
        console.error('❌ Dexie não encontrado.');
        return;
    }

    const db = new Dexie('ERP_APB_Local');

    // Schema v1 - Adicionei índices de performance para estoque e pagamentos
    db.version(1).stores({
        usuarios:               'id, email, nome',
        empresas:               'id, nome_fantasia, cnpj',
        usuario_senhas:         'id, usuario_id, role_id',
        clientes:               'id, empresa_id, nome, cpf_cnpj, atualizado_em',
        fornecedores:           'id, empresa_id, nome, cnpj',
        funcionarios:           'id, empresa_id, usuario_id, cpf',
        categorias:             'id, empresa_id, nome',
        produtos:               'id, empresa_id, nome, sku, categoria_id, atualizado_em, estoque',
        servicos:               'id, empresa_id, nome',
        vendas:                 'id, empresa_id, cliente_id, data_venda, status, status_pagamento',
        vendas_itens:           'id, venda_id, produto_id',
        financeiro_lancamentos: 'id, empresa_id, tipo, data_lancamento, venda_id, excluido_em',
        financeiro_contas:      'id, empresa_id, nome',
        controle_caixa:         'id, empresa_id, usuario_id, status',
        conversas:              'id, empresa_id, cliente_id',
        mensagens:              'id, conversa_id, data_envio',
        chatbot_respostas:      'id, empresa_id, pergunta',
        notas:                  'id, empresa_id, usuario_id, titulo',
        // Fila de sincronização otimizada
        fila_sincronizacao:     '++id, tabela, acao, registro_id, status, timestamp, tentativa'
    });

    // Tratamento de erro robusto no banco local
    db.open().then(() => {
        window.dbLocal = db;
        console.log('💾 IndexedDB: Pronto.');
    }).catch(err => {
        console.error('❌ Erro IndexedDB:', err.stack || err);
    });

    // 3. MONITOR DE REDE (OFFLINE-FIRST)
    const MonitorRede = {
        init: function () {
            window.isOnline = navigator.onLine;
            window.addEventListener('online',  () => this.aoMudarStatus(true));
            window.addEventListener('offline', () => this.aoMudarStatus(false));
        },
        aoMudarStatus: function (online) {
            window.isOnline = online;
            console.log(online ? '🌐 Online' : 'Log 📵 Offline');
            document.dispatchEvent(new CustomEvent('statusConexao', { detail: { online } }));
        }
    };

    MonitorRede.init();
})();

```
