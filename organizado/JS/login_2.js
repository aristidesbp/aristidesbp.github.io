/*
* Nome do arquivo: realizar_login.js
* Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
* OBS: criar usuario diretamente no supabase para testar!
*/
async function realizarLogin() {

/* 
* Declaração da Função JavaScript 
* [async]: Define que esta função é assíncrona, é obrigatório (requisição pela internet algo que leva tempo), permite que usemos o await lá na frente.
* [realizarCadastro()]: O nome da função que você chamará no seu HTML (ex: onclick="realizarLogin()").
*/
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

/*
* Captura de Dados (DOM):
* const email = document.getElementById('email').value;
* const senha = document.getElementById('password').value;
* Aqui o JavaScript vai até o seu formulário HTML, procura os campos com os IDs 'email' e 'password' e extrai o que o usuário digitou neles (.value).
* const: Armazena esses valores em constantes, garantindo que eles não sejam alterados acidentalmente durante a execução da função.
*/

    
    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

/*
* Validação de Segurança Básica
* !email || !senha: Lê-se "Se não houver e-mail OU não houver senha".
* caso esteja vazio vai abrir um alerta com a mensagem
* return: Interrompe a função imediatamente. Se o usuário deixou algo vazio, o código para aqui e nem tenta falar com o servidor.
*/
    

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });


/*
* A Chamada ao Supabase (O "Coração" do Código)
* [await]: Faz o código "esperar" a resposta do servidor do Supabase antes de ir para a próxima linha.
* [window.supabaseClient]: É a instância do SDK do Supabase que você configurou no seu projeto.
* auth.signInWithPassword: Este é o método específico para autenticação tradicional usando e-mail e senha. 
O Supabase também oferece métodos para login com Google, GitHub ou "Magic Links" (e-mail sem senha).
* { email, password: senha }: Envia as credenciais. 
* Note que usei email (abreviação para email: email) 
* password: senha (mapeando sua variável senha para a chave que o Supabase espera).
* { data, error }: Isso é uma desestruturação. O Supabase sempre retorna um objeto com dois caminhos possíveis: os dados do usuário (data) ou um erro (error).
*/        
       
        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);

/*
* Se o objeto error não estiver vazio (por exemplo, se o e-mail for inválido ou a senha for muito curta)
* o alert exibirá a mensagem técnica explicando o que deu errado.
*/
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'https://aristidesbp.github.io/assets/erp/index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}  

/* 
* Objetivo: Criar uma nova conta de usuário no sistema.
* [window.supabaseClient.auth.signUp]: Chama o método de cadastro oficial do SDK do Supabase.
*/

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;    
    if (!email || !senha) { alert("Preencha e-mail e senha primeiro!"); return;}
    
    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ email, password: senha });
   
    if (error) { alert("Erro no cadastro: " + error.message); }       
    else { alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login."); }
}


/* Função de alerta confirmando se é para realmente cadastrar */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");  
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

/* Objetivo:VER A SENHA DIGITADA, Alternar a visibilidade do campo de senha entre texto e asteriscos */
function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}

/**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link enviado! Verifique sua caixa de entrada.");
}

async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

    // Atualiza os dados do usuário que clicou no link de recuperação
    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) {
        alert("Erro ao atualizar: " + error.message);
    } else {
        alert("Senha atualizada com sucesso!");
        window.location.href = 'index.html';
    }
}
