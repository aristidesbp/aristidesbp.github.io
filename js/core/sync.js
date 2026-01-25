/**
 * ERP ABP Profissional - Core: Motor de Sincronização (Outbox Pattern)
 * Desenvolvido por: Aristides & Gemini AI (2026)
 */

(function() {
    'use strict';

    const AppSync = {
        isSyncing: false,
        intervalo: null,

        /**
         * 1. UPLOAD: Local -> Supabase
         */
        processarFila: async function() {
            if (this.isSyncing || !window.isOnline) return;
            
            this.isSyncing = true;

            try {
                const fila = await window.dbLocal.fila_sincronizacao
                    .where('status')
                    .equals('pendente')
                    .limit(20) 
                    .toArray();

                if (fila.length === 0) return;

                console.log(`🔄 ERP ABP: Sincronizando ${fila.length} operações...`);

                for (const item of fila) {
                    const { id, tabela, acao, registro_id, payload } = item;

                    try {
                        let resultado;

                        if (acao === 'INSERT' || acao === 'UPDATE') {
                            // Uso do upsert para garantir que o registro seja criado ou atualizado
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

                        // Remove da fila local apenas após confirmação do servidor
                        await window.dbLocal.fila_sincronizacao.delete(id);
                        
                    } catch (error) {
                        console.error(`❌ Erro no item ${id} (${tabela}):`, error.message);
                        await window.dbLocal.fila_sincronizacao.update(id, { 
                            status: 'erro',
                            tentativa: (item.tentativa || 0) + 1 
                        });
                    }
                }
            } catch (err) {
                console.error("❌ Erro fatal no motor de sincronização:", err);
            } finally {
                this.isSyncing = false;
            }
        },

        /**
         * 2. DOWNLOAD: Supabase -> Local
         */
        puxarAtualizacoes: async function(tabela) {
            const empresa_id = window.current_empresa_id; // Pega globalmente do auth.js
            if (!window.isOnline || !empresa_id) return;

            try {
                // Tenta pegar o último registro para saber de onde continuar
                const ultimo = await window.dbLocal[tabela]
                    .orderBy('atualizado_em')
                    .last();
                
                const dataCorte = ultimo && ultimo.atualizado_em ? ultimo.atualizado_em : '1900-01-01T00:00:00Z';

                const { data, error } = await window.supabaseClient
                    .from(tabela)
                    .select('*')
                    .eq('empresa_id', empresa_id)
                    .gt('atualizado_em', dataCorte);

                if (error) throw error;

                if (data && data.length > 0) {
                    await window.dbLocal[tabela].bulkPut(data);
                    console.log(`📥 [${tabela}] ${data.length} novos registros baixados.`);
                }
            } catch (err) {
                console.error(`❌ Erro ao baixar ${tabela}:`, err.message);
            }
        },

        /**
         * 3. INICIALIZAÇÃO
         */
        init: function() {
            // Monitora volta da internet para descarregar a fila
            document.addEventListener('statusConexao', (e) => {
                if (e.detail.online) this.processarFila();
            });

            // Heartbeat de sincronização (cada 60s)
            this.intervalo = setInterval(() => {
                this.processarFila();
                // Opcional: puxar atualizações de tabelas críticas
                if(window.current_empresa_id) this.puxarAtualizacoes('produtos');
            }, 60000);
            
            console.log("🚀 Motor de Sincronização Híbrido: ON");
        }
    };

    window.AppSync = AppSync;
    AppSync.init();
})();
