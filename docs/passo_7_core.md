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
## js/core/sync.js
```
/**
 * ERP ABP Profissional - Core: Motor de Sincronização (Outbox Pattern)
 * Desenvolvido por: Aristides & Gemini AI (2026)
 * Descrição: Processa a fila_sincronizacao (Upload) e atualiza o banco local (Download).
 */

(function() {
    'use strict';

    const AppSync = {
        isSyncing: false,
        intervalo: null,

        /**
         * 1. PROCESSAR FILA (Upload: Local -> Supabase)
         * Varre a fila de outbox e executa as ações no servidor.
         */
        processarFila: async function() {
            // Só processa se estiver online e não houver outra sincronização em curso
            if (this.isSyncing || !window.isOnline) return;
            
            this.isSyncing = true;

            try {
                const fila = await window.dbLocal.fila_sincronizacao
                    .where('status')
                    .equals('pendente')
                    .limit(20) // Processa em lotes para não travar a UI
                    .toArray();

                if (fila.length === 0) return;

                console.log(`🔄 Sincronizando ${fila.length} operações pendentes...`);

                for (const item of fila) {
                    const { id, tabela, acao, registro_id, payload } = item;

                    try {
                        let resultado;

                        if (acao === 'INSERT' || acao === 'UPDATE') {
                            // O payload já deve vir formatado como o objeto da tabela
                            resultado = await window.supabaseClient
                                .from(tabela)
                                .upsert(payload); 
                        } 
                        else if (acao === 'DELETE') {
                            resultado = await window.supabaseClient
                                .from(tabela)
                                .delete()
                                .eq('id', registro_id);
                        }

                        if (resultado.error) throw resultado.error;

                        // Se sucesso, remove da fila local
                        await window.dbLocal.fila_sincronizacao.delete(id);
                        
                    } catch (error) {
                        console.error(`❌ Erro no item ${id} (Tabela: ${tabela}):`, error.message);
                        
                        // Incrementa tentativa ou marca erro crítico
                        await window.dbLocal.fila_sincronizacao.update(id, { 
                            status: 'erro',
                            tentativa: (item.tentativa || 0) + 1 
                        });
                    }
                }
            } catch (err) {
                console.error("❌ Erro geral no motor de sincronização:", err);
            } finally {
                this.isSyncing = false;
            }
        },

        /**
         * 2. PUXAR DADOS (Download: Supabase -> Local)
         * Baixa registros que foram alterados na nuvem por outros usuários/dispositivos.
         */
        puxarAtualizacoes: async function(tabela, empresa_id) {
            if (!window.isOnline || !empresa_id) return;

            // Busca o último carimbo de tempo que temos localmente para esta tabela
            const ultimo = await window.dbLocal[tabela]
                .orderBy('atualizado_em')
                .last();
            
            const dataCorte = ultimo ? ultimo.atualizado_em : '1900-01-01T00:00:00Z';

            const { data, error } = await window.supabaseClient
                .from(tabela)
                .select('*')
                .eq('empresa_id', empresa_id)
                .gt('atualizado_em', dataCorte);

            if (error) {
                console.error(`❌ Falha ao baixar dados de ${tabela}:`, error.message);
                return;
            }

            if (data && data.length > 0) {
                // bulkPut insere ou atualiza registros existentes pelo ID
                await window.dbLocal[tabela].bulkPut(data);
                console.log(`📥 ${data.length} atualizações aplicadas em '${tabela}'.`);
            }
        },

        /**
         * 3. INICIALIZAÇÃO
         */
        init: function() {
            // Inicia monitoramento automático
            document.addEventListener('statusConexao', (e) => {
                if (e.detail.online) {
                    this.processarFila();
                }
            });

            // Check-up a cada 1 minuto caso o evento de rede falhe
            this.intervalo = setInterval(() => this.processarFila(), 60000);
            
            console.log("🚀 Motor de Sincronização: Ativo e monitorando.");
        }
    };

    window.AppSync = AppSync;
    AppSync.init();

})();
```
## js/core/auth.js
```
/**
 * ERP ABP Profissional - Core: Gestão de Autenticação e Sessão
 * Desenvolvido por: Aristides & Gemini AI (2026)
 * Descrição: Login, Logout, Persistência de Sessão e Controle de Empresa Ativa.
 */

(function() {
    'use strict';

    const AppAuth = {
        session: null,
        user: null,
        empresaAtiva: null,

        /**
         * 1. LOGIN
         * Realiza a autenticação via Supabase Auth.
         */
        login: async function(email, password) {
            try {
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) throw error;

                console.log("🔑 Login bem-sucedido!");
                await this.checkSession();
                return { success: true };
            } catch (err) {
                console.error("❌ Erro no login:", err.message);
                return { success: false, error: err.message };
            }
        },

        /**
         * 2. LOGOUT
         * Limpa sessão no servidor e no banco local.
         */
        logout: async function() {
            await window.supabaseClient.auth.signOut();
            await window.dbLocal.usuarios.clear(); // Limpa cache local de segurança
            localStorage.removeItem('erp_abp_empresa_id');
            window.location.href = 'login.html';
        },

        /**
         * 3. VERIFICAR SESSÃO ATIVA
         * Chamado em todas as páginas para garantir que o usuário está logado.
         */
        checkSession: async function() {
            const { data: { session }, error } = await window.supabaseClient.auth.getSession();
            
            if (error || !session) {
                if (!window.location.pathname.includes('login.html')) {
                    window.location.href = 'login.html';
                }
                return null;
            }

            this.session = session;
            this.user = session.user;

            // Define a empresa ativa (da memória ou do banco)
            await this.definirEmpresaAtiva();
            
            // Registra os dados do usuário logado no IndexedDB para uso offline
            await window.dbLocal.usuarios.put({
                id: this.user.id,
                email: this.user.email,
                nome: this.user.user_metadata.nome || 'Usuário'
            });

            return session;
        },

        /**
         * 4. DEFINIR EMPRESA ATIVA
         * Identifica qual empresa o usuário está operando no momento.
         */
        definirEmpresaAtiva: async function() {
            let empresaId = localStorage.getItem('erp_abp_empresa_id');

            // Se não tiver empresa no cache, busca a primeira vinculada ao usuário
            if (!empresaId) {
                const { data, error } = await window.supabaseClient
                    .from('usuario_empresas')
                    .select('empresa_id')
                    .eq('usuario_id', this.user.id)
                    .limit(1)
                    .single();

                if (data) {
                    empresaId = data.empresa_id;
                    localStorage.setItem('erp_abp_empresa_id', empresaId);
                }
            }

            this.empresaAtiva = empresaId;
            window.current_empresa_id = empresaId; // Expõe globalmente para o sync.js e módulos
        },

        /**
         * 5. INICIALIZAÇÃO
         */
        init: async function() {
            // Escuta mudanças de estado (Login/Logout em outras abas)
            window.supabaseClient.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT') this.logout();
                if (event === 'SIGNED_IN') this.checkSession();
            });

            await this.checkSession();
        }
    };

    window.AppAuth = AppAuth;
    AppAuth.init();

})();

```








