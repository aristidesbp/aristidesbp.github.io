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
