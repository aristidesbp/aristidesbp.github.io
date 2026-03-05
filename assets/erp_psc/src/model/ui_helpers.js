// src/model/ui_helpers.js
/**
 * ARQUIVO: src/model/ui_helpers.js
 * FUNÇÃO:  Funções reutilizáveis de interface.
 *          Centraliza feedback visual para o usuário.
 *
 * POR QUE AQUI E NÃO NO CONTROLLER?
 * Porque estas funções são usadas por MÚLTIPLOS controllers.
 * Centralizar evita repetição e garante visual consistente.
 */

/**
 * Mostra uma mensagem de erro na área de feedback.
 * @param {string} mensagem - Texto a exibir
 * @param {string} elementId - ID do elemento de feedback (padrão: feedback-area)
 */
export function mostrarErro(mensagem, elementId = 'feedback-area') {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.textContent = mensagem;
    // Remove classes anteriores e aplica estilo de erro (vermelho)
    el.className = 'mb-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200';

    // Remove a classe "hidden" para exibir o elemento
    el.classList.remove('hidden');

    // Esconde automaticamente após 5 segundos
    setTimeout(() => el.classList.add("hidden"), 5000);
}

/**
 * Mostra uma mensagem de sucesso na área de feedback.
 */
export function mostrarFeedback(mensagem, elementId = 'feedback-area') {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.textContent = mensagem;
    // Estilo de sucesso (verde)
    el.className = 'mb-4 p-3 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200';
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add("hidden"), 5000);
}

/**
 * Mostra/oculta um indicador de carregamento.
 * @param {boolean} ativo - true para mostrar, false para esconder
 * @param {string} elementId - ID do elemento de loading
 */
export function mostrarLoading(ativo, elementId = "loading-indicator") {
    const el = document.getElementById(elementId);
    if (!el) return;
    ativo ? el.classList.remove('hidden') : el.classList.add('hidden');
}
