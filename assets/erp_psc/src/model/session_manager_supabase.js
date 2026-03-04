/**
 * CLASSE: SessionManager - ERP-PSC
 * Finalidade: Gestão proativa de sessão e segurança por inatividade (Fase 1).
 */

import { supabase } from '../model/supabase_config.js';

class SessionManager {
    constructor(timeoutMinutes = 30) {
        // Converte minutos para milissegundos
        this.inactivityLimit = timeoutMinutes * 60 * 1000;
        this.timeoutId = null;
        
        // Eventos que reiniciam o contador de atividade
        this.activityEvents = [
            'mousedown', 'mousemove', 'keypress', 
            'scroll', 'touchstart', 'click'
        ];

        // Bind dos métodos para garantir que o 'this' refira-se à classe
        this.resetTimer = this.resetTimer.bind(this);
        this.performLogout = this.performLogout.bind(this);
    }

    /**
     * Inicializa o monitoramento de segurança
     */
    init() {
        this.setupActivityListeners();
        this.resetTimer();
        console.log(`[Segurança] Monitoramento de sessão iniciado: ${this.inactivityLimit / 60000}min.`);
    }

    /**
     * Adiciona ouvintes de eventos ao documento
     */
    setupActivityListeners() {
        this.activityEvents.forEach(event => {
            document.addEventListener(event, this.resetTimer, true);
        });
    }

    /**
     * Reinicia o cronômetro de inatividade
     */
    resetTimer() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(this.performLogout, this.inactivityLimit);
    }

    /**
     * Encerra a sessão de forma segura e limpa rastros locais
     */
    async performLogout() {
        console.warn("Sessão expirada por inatividade. Protegendo dados clínicos...");
        
        try {
            // Invalida o JWT no Supabase (Lado do Servidor)
            await supabase.auth.signOut();
            
            // Limpeza total de segurança (Lado do Cliente)
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirecionamento estratégico
            window.location.href = 'login.html?reason=timeout';
        } catch (error) {
            console.error("Erro crítico ao encerrar sessão:", error);
            window.location.href = 'login.html';
        }
    }

    /**
     * Remove os listeners (útil se precisar desativar o monitoramento sem deslogar)
     */
    destroy() {
        this.activityEvents.forEach(event => {
            document.removeEventListener(event, this.resetTimer, true);
        });
        clearTimeout(this.timeoutId);
    }
}

// --- INSTANCIAÇÃO ---
// Criamos a instância e iniciamos o monitoramento
const session = new SessionManager(30);
session.init();

export default session;
