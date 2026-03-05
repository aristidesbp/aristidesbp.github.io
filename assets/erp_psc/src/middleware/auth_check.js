

// src/middleware/auth_check.js
/**
 * ARQUIVO: src/middleware/auth_check.js
 * FUNÇÃO:  Bloqueio de segurança de rotas.
 *          Garante que apenas usuários autenticados
 *          vejam o conteúdo de páginas protegidas.
 *
 * COMO USAR:  Adicione como PRIMEIRO script no <head> de toda
 * página que não seja login.html ou index.html
 *
 * <script type="module" src="../middleware/auth_check.js"></script>
 */

// Importa a conexão com o banco
import { supabase } from '../model/supabase_config.js';

// IIFE (Immediately Invoked Function Expression) assíncrona:
// é uma função que se chama sozinha imediatamente.
// O "async" permite usar "await" dentro dela.
(async () => {

    // PASSO 1: Bloqueia a renderização da página IMEDIATAMENTE.
    // O usuário verá uma tela em branco por milissegundos enquanto
    // verificamos a sessão. É muito mais seguro que mostrar o conteúdo.
    document.documentElement.style.display = 'none';

    try {
        // PASSO 2: Pergunta ao Supabase se há uma sessão ativa.
        // getSession() lê do localStorage (offline, instantâneo).
        const { data: { session }, error } = await supabase.auth.getSession();

        // Se houve erro na verificação ou não há sessão,
        // redireciona para o login sem mostrar nada.
        if (error || !session) {
            window.location.replace('login.html');
            return; // Para a execução aqui
        }

        // PASSO 3: Verificação extra — confirma com o servidor
        // que o token ainda é válido. getUser() faz uma chamada
        // à API, o que é mais seguro que apenas ler o localStorage.
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            window.location.replace('login.html');
            return;
        }
        // PASSO 4: Tudo certo. Libera a exibição da página.
        document.documentElement.style.display = 'block';
    } catch (err) {
        // Em caso de erro técnico (ex: sem internet),
        // a política é BLOQUEAR o acesso por segurança.
        // Nunca expor o conteúdo em caso de falha.
        console.error("Falha na verificação de segurança:", err);
        window.location.replace('login.html');
    }

})(); // O () no final executa a função imediatamente
