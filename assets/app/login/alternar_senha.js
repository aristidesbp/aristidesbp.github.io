/**
 * Nome do arquivo: alternar_senha.js
 * Objetivo: Alternar a visibilidade do campo de senha entre texto e asteriscos.
 */

function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}
