🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROJETO ERP-PSC 
* Projeto consiste em criar uma plataforma para Pisco-Pegagogos
* Plataforma para controle de pacientes e resolução de exercicios
* RESUMO:
  O proficional ira cadastrar seus pacientes , que por sua vez tera acesso ao site para realização dos tarefas e acompanhamento do seu progresso.

# REGRAS DE NEGOCIO:
* Cada Proficional so podera ver os dados cadastrados por ele mesmo, (financeiro, pacientes etc...)
* quando cadastrar um usuario o mesmo deve tambem ser cadastrado na tabela entidades.
* as entidades cadastradas como paciente so teram acesso aos dados e tarefas relacionadas ao seu usuario (cpf).

1. Gestão de Utilizadores e Acessos
* Perfis de Utilizador: O sistema deve suportar pelo menos três tipos de entidades: Colaborador (Psicopedagogo), Paciente e Responsável.
* Controle de Acesso (RBAC): Cada utilizador visualiza apenas o conteúdo permitido pelo seu nível de acesso, validado pelo script controle_de_acesso.js.
* Autenticação Obrigatória: Nenhuma página interna (view) deve ser acessível sem uma sessão ativa no Supabase Auth. Caso não haja sessão, o utilizador deve ser redirecionado para login.html.
* Validação de Credenciais: O login exige obrigatoriamente e-mail e senha; a ausência de qualquer um destes campos deve interromper a tentativa de autenticação antes do envio ao servidor.

2. Gestão Psicopedagógica
*  Cadastro de Pacientes: Apenas profissionais (colaboradores) podem registar novos pacientes no sistema.
* Ciclo de Atividades:
  - O profissional é responsável por cadastrar e listar , categorias, exercícios,financerio e determinar o acesso especifico para cada paciente.
  - Os exercícios são atribuídos aos pacientes para resolução através da plataforma (o paciente usara suas credenciais cadastradas na tabela "entidades" pelo proficional).
  - Acompanhamento: O progresso das tarefas realizadas pelo paciente deve ser passível de monitorização pelo profissional.

3. Gestão Financeira e Cobranças
*  Fluxo de Caixa: O sistema deve permitir o registo e a listagem de movimentações financeiras e o controlo de parcelas.
*  Pagamentos Externos: A integração com o Mercado Pago via Edge Functions do Supabase é o método padrão para processar checkouts e pagamentos.
*  Estados de Pagamento: O sistema deve gerir retornos de sucesso ou falha nas transações através das páginas de resposta (sucesso.html).

4. Integridade e Persistência de Dados
*  Backend as a Service: Todas as operações de leitura e escrita devem ser realizadas através do cliente window.supabaseClient configurado no ficheiro de conexão.
*  Segurança de Dados: As chaves de API e o URL do projeto Supabase devem estar centralizados no ficheiro supabase_config.js para garantir a consistência da comunicação.
*  Relatórios: O sistema deve consolidar os dados de entidades e financeiro para a geração de relatórios de gestão.
  
# ARQUITETURA MVC DO ERP-PSC

```
PROJETO_ERP/
├── index.html                   # Redireciona para src/view/index.html
├── assets/                      # Arquivos estáticos (CSS, Imagens)
│   ├── img/                     # Ícones e logos
│   └── style/                   # Estilos CSS segmentados
│       ├── style_login.css
│       ├── style_index.css
│       └── style_navbar.css
│ 
└── src/                           # Código fonte da aplicação
    ├── model/                     # Interação com Banco de Dados (Supabase)
    │   ├── supabase_config.js     # cofiguraçao de chaves (Supabase)
    │   ├── login.js               # cadastra e faz o login
    │   ├── entidades.js           # tabela dos usuario (colaborador/paciente/responsavel)
    │   ├── financeiro.js          # controle de fluxo de caixas (parcelas)
    │   ├── verificar_login.js     # verifica se o usuario esta logado
    │   └── controle_de_acesso.js  # verifica oque o usuario pode ver ou fazer
    │
    │ 
    ├── view/                       # Interface do usuário (HTML puro)
    │   ├── index.html
    │   ├── login.html
    │   ├── listar_nivel_acesso.html
    │   ├── cadastrar_nivel_acesso.html
    │   ├── listar_categorias.html
    │   ├── cadastrar_categorias.html
    │   ├── listar_exercicios.html
    │   ├── cadastrar_exercicios.html
    │   ├── listar_entidades.html
    │   ├── cadastrar_entidades.html
    │   ├── listar_financeiro.html
    │   ├── cadastrar_financeiro.html
    │   └── relatorios.html
    │
    ├── controller/              # Lógica de interface e ponte MVC
    │   ├── navbar.js
    │   └── acesso.js
    │ 
    └── services/                # Integrações externas e Backend (Edge Functions)
        └── mercadopago_supabase/
            ├── doc.md
            ├── index.html
            ├── servicos.json
            ├── site.html
            ├── sucesso.html
            └── supabase/
                └── functions/
                    └── checkout/
                        ├── deno.json
                        └── index.ts

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# SUPABASE

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto: nome_do_seu_projeto
* Senha do banco: ***********
* Região: brasil 
---

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/supabase_config.js
```
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://seu_endereço';
const supabaseKey = 'sua_senha';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/login.js
```
/* ####################################################################################################################### */
/* ####################################################################################################################### */
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

/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* 
* Nome do arquivo: cadastrar_novo_usuario.js
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


/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* Função de alerta confirmando se é para realmente cadastrar */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");  
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* Objetivo:VER A SENHA DIGITADA, Alternar a visibilidade do campo de senha entre texto e asteriscos */
function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}

/* ####################################################################################################################### */
/* ####################################################################################################################### */
  
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
 ```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/verificar_acesso_login.js
```
    /** * Estrutura do verificar_login.js
 * Para começar, vamos focar na função de Verificação de Sessão. 
 * O comando básico do Supabase é: supabase.auth.getSession()
 */

// Esta função garante que apenas usuários logados acessem a página atual
async function checarAutenticacao() {
    // 1. Buscamos a sessão atual do cliente configurado no supabase_config.js
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    // 2. Se houver erro ou se a sessão estiver vazia (null), o usuário não está logado
    if (error || !session) {
        console.log("Acesso negado: Usuário não autenticado.");
        // 3. Redireciona para o login.html na raiz, conforme nossa estrutura
        window.location.href = "login.html";
    } else {
        // Se a sessão existir, permitimos que ele continue na página
        console.log("Acesso autorizado para:", session.user.email);
    }
}

// Executamos a verificação imediatamente ao carregar o script
checarAutenticacao();

    
//############################################################################# -->       
        async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Verifica se o cliente supabase existe antes de tentar deslogar
            if (typeof _supabase !== 'undefined') {
                await _supabase.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
        }   

```

















