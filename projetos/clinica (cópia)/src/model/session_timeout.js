
/**
 * MECANISMO DE LOGOUT AUTOMÁTICO - ERP-PSC
 * Finalidade: Encerrar a sessão após 30 minutos de inatividade para proteção de dados sensíveis.
 * Referência: Planejamento Fase 1 - Ajuste de Segurança (Item 2.2)
 */

import { supabase } from '../model/supabase_config.js';

// Define o tempo limite de inatividade (30 minutos = 1.800.000 ms)
const INACTIVITY_LIMIT = 30 * 60 * 1000; 
let timeoutId;

/**
 * Realiza o encerramento da sessão no banco de dados e limpa o acesso local
 */
async function performLogout() {
    console.warn("Sessão expirada por inatividade. Protegendo dados clínicos...");
    
    try {
        // Invalida o JWT no Supabase
        await supabase.auth.signOut();
        
        // Limpa o armazenamento local para garantir o sigilo
        localStorage.clear();
        
        // Redireciona para o login com parâmetro de motivo
        window.location.href = 'login.html?reason=timeout';
    } catch (error) {
        console.error("Erro ao encerrar sessão:", error);
        window.location.href = 'login.html';
    }
}

/**
 * Reinicia o cronômetro sempre que uma atividade é detectada
 */
function resetInactivityTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(performLogout, INACTIVITY_LIMIT);
}

/**
 * Inicializa os ouvintes de eventos de interação do profissional
 */
function setupActivityListeners() {
    // Lista de eventos que caracterizam atividade do usuário
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
    });

    // Inicia a contagem na primeira execução
    resetInactivityTimer();
}

// Inicia o monitoramento de segurança
setupActivityListeners();




