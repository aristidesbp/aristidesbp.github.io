/**
 * MIDDLEWARE DE PROTEÇÃO - ERP-PSC
 * Finalidade: Bloquear a renderização do HTML antes da validação do JWT.
 * Referência: Planejamento Fase 1 - Central de Segurança [3, 4]
 */

(async function validateAccess() {
    // 1. Bloqueio imediato da interface (Prevenção de FOUC - Flicker of Unauthenticated Content)
    document.documentElement.style.display = 'none';

    // Importação dinâmica da configuração do Supabase (ajustar caminho se necessário)
    // Nota: O projeto utiliza supabase_config.js para chaves de acesso [5, 6]
    try {
        const { supabase } = await import('../model/supabase_config.js');

        // 2. Verificação da Sessão e do Token JWT
        const { data: { session }, error } = await supabase.auth.getSession();

        // 3. Lógica de Redirecionamento Blindado
        if (error || !session) {
            console.warn("Acesso não autorizado ou sessão expirada. Redirecionando...");
            window.location.href = 'login.html'; 
            return;
        }

        // 4. Verificação de Integridade (Opcional: validar se o token ainda é aceito pelo backend)
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            window.location.href = 'login.html';
            return;
        }

        // 5. Liberação da Interface
        // Se o usuário estiver autenticado com um JWT válido, o sistema permite o carregamento
        document.documentElement.style.display = 'block';

    } catch (err) {
        console.error("Erro crítico na validação de segurança:", err);
        // Em caso de falha técnica no script de segurança, o sistema bloqueia o acesso por padrão
        window.location.href = 'login.html';
    }
})();
