/**
 * ERP ABP Profissional - Core: Motor de Sincronização (Outbox Pattern)
 * Desenvolvido por: Aristides & Gemini AI (2026)
 * Descrição: Processa a fila_sincronizacao e mantém o IndexedDB atualizado.
 */

(function() {
    'use strict';

    const AppSync = {
        isSyncing: false,

        /**
         * 1. PROCESSAR FILA (Upload: Local -> Supabase)
         * Varre a tabela 'fila_sincronizacao' e envia ações pendentes.
         */
        processarFila: async function() {
            if (this.isSyncing || !window.isOnline) return;
            this.isSyncing = true;

            try {
                // Busca itens pendentes na fila
                const fila = await window.dbLocal.fila_sincronizacao
                    .where('status').equals('pendente')
                    .toArray();

                if (fila.length === 0) {
                    this.isSyncing = false;
                    return;
                }

                console.log(`🔄 Sincronizando ${fila.length} operações pendentes...`);

                for (const item of fila) {
                    const { id, tabela, acao, registro_id, payload } = item;
                    let erro = null;

                    // Marca como 'enviando' para evitar duplicidade
                    await window.dbLocal.fila_sincronizacao.update(id, { status: 'enviando' });

                    try {
                        if (acao === 'INSERT' || acao === 'UPDATE') {
                            const { error } = await window.supabaseClient
                                .from(tabela)
                                .upsert(payload); // Upsert resolve Insert e Update em um comando
                            if (error) throw error;
                        } 
                        else if (acao === 'DELETE') {
                            const { error } = await window.supabaseClient
                                .from(tabela)
                                .delete()
                                .eq('id', registro_id);
                            if (error) throw error;
                        }

                        // Se deu certo, remove da fila local ou marca como concluído
                        await window.dbLocal.fila_sincronizacao.delete(id);
                        
                    } catch (e) {
                        console.error(`❌ Erro ao sincronizar item ${id}:`, e.message);
                        await window.dbLocal.fila_sincronizacao.update(id, { 
                            status: 'erro', 
                            tentativa: (item.tentativa || 0) + 1 
                        });
                    }
                }
            } finally {
                this.isSyncing = false;
                console.log("✅ Ciclo de sincronização finalizado.");
            }
        },

        /**
         * 2. PUXAR DADOS (Download: Supabase -> Local)
         * Baixa atualizações da nuvem para o navegador.
         */
        puxarDados: async function(tabela, empresa_id) {
            if (!window.isOnline) return;

            // Busca a última data de atualização no banco local
            const ultimoRegistro = await window.dbLocal[tabela]
                .orderBy('atualizado_em')
                .last();
            
            const dataCorte = ultimoRegistro ? ultimoRegistro.atualizado_em : '1900-01-01T00:00:00Z';

            const { data, error } = await window.supabaseClient
                .from(tabela)
                .select('*')
                .eq('empresa_id', empresa_id)
                .gt('atualizado_em', dataCorte);

            if (error) {
                console.error(`❌ Erro ao puxar ${tabela}:`, error.message);
                return;
            }

            if (data && data.length > 0) {
                await window.dbLocal[tabela].bulkPut(data);
                console.log(`📥 ${data.length} registros novos em '${tabela}' baixados.`);
            }
        },

        /**
         * 3. INICIALIZAR MOTOR
         */
        init: function() {
            // Escuta o evento de conexão que criamos no conexao.js
            document.addEventListener('statusConexao', (e) => {
                if (e.detail.online) this.processarFila();
            });

            // Tenta processar a fila a cada 30 segundos se houver internet
            setInterval(() => this.processarFila(), 30000);
        }
    };

    // Expõe globalmente
    window.AppSync = AppSync;
    AppSync.init();

})();
