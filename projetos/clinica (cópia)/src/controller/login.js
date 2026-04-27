/**
 * Controller: login.js
 * Gerencia os eventos da tela login.html e a regra de negócio do acesso.
 */
import { loginModel } from '../model/login.js';

// Seleção de elementos do DOM
const loginForm = document.querySelector('form');
const btnEntrar = loginForm.querySelector('button[type="submit"]');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Captura de dados
    const email = loginForm.querySelector('input[type="email"]').value;
    const senha = loginForm.querySelector('input[type="password"]').value;

    // Feedback visual de carregamento
    btnEntrar.disabled = true;
    btnEntrar.innerHTML = '<span>Autenticando...</span>';

    try {
        // 2. Chama o Model para autenticar
        const user = await loginModel.autenticarUsuario(email, senha);

        // 3. Busca o nível de acesso (relacionamento) na tabela entidades
        const perfil = await loginModel.buscarPerfil(user.id);

        // 4. Verifica se a conta está ativa
        if (perfil.status !== 'ativo') {
            throw new Error("Sua conta está desativada. Entre em contato com o suporte.");
        }

        // 5. Redirecionamento baseado no nível de acesso
        direcionarPorPerfil(perfil.relacionamento);

    } catch (error) {
        console.error("Erro no login:", error.message);
        alert("Falha no acesso: " + error.message);
        
        // Reseta o botão em caso de erro
        btnEntrar.disabled = false;
        btnEntrar.innerHTML = '<span>Entrar</span><span class="material-symbols-outlined text-xl">login</span>';
    }
});

// Função de roteamento simples
function direcionarPorPerfil(relacionamento) {
    const rotas = {
        'master': '../master/dashboard.html',
        'psicopedagogo': '../profissional/home.html',
        'paciente': '../paciente/home.html'
    };

    const destino = rotas[relacionamento] || '../login.html';
    window.location.replace(destino);
}
