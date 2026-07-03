/**
 * controller/chat_controller.js 
 * Lógica para processar comandos no Chat
 */
function enviarMensagem() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    
    if (!msg) return;

    // 1. Renderiza a mensagem do usuário na tela
    adicionarMensagem(msg, 'user');
    input.value = '';

    // 2. Lógica de Roteamento (Dispatcher)
    if (msg === '1') {
        processarFaltaEnergia();
    } else if (msg === '2') {
        window.location.href = 'financeiro.html';
    } else {
        adicionarMensagem('Comando não reconhecido. Digite 1 para suporte ou 2 para Financeiro.', 'bot');
    }
}

function adicionarMensagem(texto, remetente) {
    const container = document.getElementById('chat-container');
    const div = document.createElement('div');
    
    // Estilização simples baseada em quem enviou
    div.className = `p-3 rounded-lg max-w-[80%] ${remetente === 'user' ? 'bg-green-100 ml-auto' : 'bg-white'}`;
    div.innerText = texto;
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function processarFaltaEnergia() {
    adicionarMensagem('Por favor, informe o CPF ou a Unidade Consumidora (UC):', 'bot');
}
