/*🟥INICIO BLOCO 1: console.js🟥*/

// 1. Cria o botão flutuante para abrir/fechar o log
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🛠️ Log';
toggleBtn.style.cssText = `position: fixed; bottom: 10px; right: 10px; padding: 10px 14px; background: #475569; color: white; border: 1px solid #fff; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.6); z-index: 100000;`;
/* Cria um botão fixo no canto inferior direito para exibir o console. Z-index altíssimo para não ficar atrás de nada. */

// 2. Cria a caixa preta do console
const consoleContainer = document.createElement('div');
consoleContainer.style.cssText = `position: fixed; bottom: 65px; left: 10px; right: 10px; height: 300px; background: rgba(0, 0, 0, 0.95); color: #00ff00; font-family: monospace; font-size: 13px; padding: 12px; overflow-y: auto; z-index: 99999; display: none; border-radius: 10px; border: 1px solid #333; box-shadow: 0 -4px 15px rgba(0,0,0,0.6); word-wrap: break-word;`;
/* Caixa do console que inicia invisível (display: none). */

// 3. Injeta no HTML assim que possível
function iniciarConsoleMobile() {
    document.body.appendChild(consoleContainer);
    document.body.appendChild(toggleBtn);
}
/* Adiciona os elementos ao corpo da página. */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarConsoleMobile);
} else {
    iniciarConsoleMobile();
}
/* Garante que o console seja desenhado mesmo se o script for carregado de formas diferentes. */

// 4. Lógica do botão
toggleBtn.addEventListener('click', () => {
    consoleContainer.style.display = consoleContainer.style.display === 'none' ? 'block' : 'none';
});
/* Alterna a visibilidade da tela preta do console ao clicar no botão. */

// 5. Interceptação Nativa
const originalLog = console.log;
const originalError = console.error;

function espelharNoEcra(tipo, cor, argumentos) {
    const linha = document.createElement('div');
    linha.style.color = cor;
    linha.style.marginBottom = '6px';
    linha.style.borderBottom = '1px solid #222';
    linha.style.paddingBottom = '4px';
    
    // Tratamento para extrair a mensagem de Erros ou Objetos
    const texto = Array.from(argumentos).map(arg => {
        if (arg instanceof Error) return arg.message + " | " + arg.stack;
        if (typeof arg === 'object') {
            try { return JSON.stringify(arg); } catch(e) { return String(arg); }
        }
        return String(arg);
    }).join(' ');

    linha.textContent = `[${tipo}] ${texto}`;
    consoleContainer.appendChild(linha);
    
    // Rola automaticamente para a última mensagem
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
}
/* Transforma os dados recebidos em texto legível e os desenha dentro do consoleContainer. */

console.log = function(...args) { 
    originalLog.apply(console, args); 
    espelharNoEcra('LOG', '#10b981', args); 
};
/* Intercepta o console.log comum e pinta de verde. */

console.error = function(...args) { 
    originalError.apply(console, args); 
    espelharNoEcra('ERRO', '#ef4444', args); 
};
/* Intercepta o console.error e pinta de vermelho. */

// 6. CAPTURA DE ERROS FATAIS (A Magia para Mobile)
window.addEventListener('error', function(evento) {
    console.error("Falha Fatal:", evento.message, "| Arquivo:", evento.filename, "| Linha:", evento.lineno);
});
/* Apanha erros de sintaxe (como esquecer de fechar chaves) que quebram o código antes dele rodar. */

window.addEventListener('unhandledrejection', function(evento) {
    console.error("Falha de Promessa (Fetch/Async):", evento.reason);
});
/* Apanha erros de fetch() e funções async/await que falharam sem try/catch. */

console.log("🛠️ Console Mobile de Auditoria Ativo.");
/*🟥FIM BLOCO 1: console.js🟥*/
