
/**
 * ERP ABP Profissional - Core: Conexão e Sincronização Híbrida
 * Desenvolvido por: Aristides & Gemini AI (2026)
 * Descrição: Inicializa Supabase (Nuvem) e Dexie (Local)

 📝 Instruções de Uso:
    Dependências: Para este arquivo funcionar, você deve incluir estas duas linhas no <head> do seu index.html ou login.html:
   
    <script src="https://unpkg.com/dexie/dist/dexie.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 */

(function() {
    // 1. CONFIGURAÇÕES DE ACESSO (SUPABASE)
    const SB_URL = "https://SEU_PROJETO_ID.supabase.co"; // <-- Substituir pelo seu URL do Supabase
    const SB_KEY = "sb_publishable_QFcFrpO1NJCI3-gkyYqkQA_P5qQ5w1J";

    // Inicializa o Cliente Supabase globalmente
    if (typeof supabase !== 'undefined') {
        window.supabaseClient = supabase.createClient(SB_URL, SB_KEY);
        console.log("🌐 Supabase: Cliente inicializado.");
    } else {
        console.error("❌ Erro: Biblioteca Supabase não encontrada.");
    }

    // 2. CONFIGURAÇÃO DO BANCO LOCAL (INDEXEDDB COM DEXIE)
    // O schema abaixo espelha exatamente o seu SQL consolidado
    const db = new Dexie("ERP_APB_Local");

    db.version(1).stores({
        // Tabelas de Configuração e Acesso
        usuarios: 'id, email, nome',
        empresas: 'id, nome_fantasia, cnpj',
        usuario_senhas: 'id, usuario_id, role_id',
        
        // Tabelas de Negócio (Campos indexados para busca rápida offline)
        clientes: 'id, empresa_id, nome, cpf_cnpj, atualizado_em',
        fornecedores: 'id, empresa_id, nome, cnpj',
        funcionarios: 'id, empresa_id, usuario_id, cpf',
        produtos: 'id, empresa_id, nome, sku, categoria_id, atualizado_em',
        categorias: 'id, empresa_id, nome',
        servicos: 'id, empresa_id, nome',
        
        // Vendas e Financeiro
        vendas: 'id, empresa_id, cliente_id, data_venda, status',
        vendas_itens: 'id, venda_id, produto_id',
        financeiro_lancamentos: 'id, empresa_id, tipo, data_lancamento, venda_id',
        financeiro_contas: 'id, empresa_id, nome',
        controle_caixa: 'id, empresa_id, usuario_id, status',
        
        // Comunicação e Notas
        conversas: 'id, empresa_id, cliente_id',
        mensagens: 'id, conversa_id, data_envio',
        chatbot_respostas: 'id, empresa_id, pergunta',
        notas: 'id, empresa_id, usuario_id, titulo',
        
        // MOTOR DE SINCRONIZAÇÃO (A Fila de Outbox)
        // tabela: qual tabela vai atualizar
        // acao: 'INSERT', 'UPDATE' ou 'DELETE'
        // status: 'pendente', 'concluido', 'erro'
        fila_sincronizacao: '++id, tabela, acao, registro_id, status, timestamp'
    });

    // Torna o banco local acessível globalmente
    window.dbLocal = db;
    console.log("💾 IndexedDB: Banco Local 'ERP_APB_Local' pronto.");

    // 3. MONITOR DE CONEXÃO (OFFLINE-FIRST REAL)
    const MonitorRede = {
        init() {
            this.atualizarStatus();
            window.addEventListener('online', () => this.aoMudarStatus(true));
            window.addEventListener('offline', () => this.aoMudarStatus(false));
        },
        atualizarStatus() {
            window.isOnline = navigator.onLine;
        },
        aoMudarStatus(online) {
            window.isOnline = online;
            const statusMsg = online ? "🌐 ONLINE: Sincronizando dados..." : "📵 OFFLINE: Usando banco local.";
            console.log(statusMsg);
            
            // Dispara um evento customizado para os módulos (Fase 8)
            document.dispatchEvent(new CustomEvent('statusConexao', { detail: { online } }));
        }
    };

    MonitorRede.init();

})();
