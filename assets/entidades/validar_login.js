/**
 * Lógica de Proteção de Rota
 */
function verificarAutenticacao() {
    const usuarioLogado = localStorage.getItem('erp_abp_session');
    
    // Se não houver sessão, redireciona para o login
    if (!usuarioLogado) {
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
        return false;
    }
    return JSON.parse(usuarioLogado);
}

// Execução imediata ao carregar o script
const sessaoAtiva = verificarAutenticacao();
