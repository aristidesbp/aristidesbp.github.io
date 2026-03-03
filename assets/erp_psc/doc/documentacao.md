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
# FASE1: LOGIN 
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
* selecina o ssh
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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/view/login.html
```
<!DOCTYPE html>
<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>ERP-PSC - Login</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f8fafc",
                        "background-dark": "#0f172a",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style type="text/tailwindcss">
        body {
            min-height: 100dvh;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[400px] bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden flex flex-col items-center p-8 border border-slate-100 dark:border-slate-800">
<div class="flex flex-col items-center mb-10">
<div class="bg-primary/10 p-4 rounded-2xl mb-4">
<span class="material-symbols-outlined text-primary text-5xl">psychology</span>
</div>
<h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">ERP-PSC</h1>
<p class="text-slate-500 dark:text-slate-400 text-sm mt-1 text-center">Acesse sua Conta</p>
</div>
<form class="w-full space-y-5">
<div class="flex flex-col gap-1.5">
<label class="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1" for="email">E-mail</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-200">mail</span>
</div>
<input class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400" id="email" name="email" placeholder="nome@exemplo.com" type="email"/>
</div>
</div>
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center">
<label class="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1" for="password">Senha</label>
</div>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-200">lock</span>
</div>
<input class="block w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400" id="password" name="password" placeholder="••••••••" type="password"/>
<button class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-primary focus:outline-none transition-colors duration-200" onclick="const p = document.getElementById('password'); p.type = p.type === 'password' ? 'text' : 'password'; this.querySelector('span').innerText = p.type === 'password' ? 'visibility' : 'visibility_off';" type="button">
<span class="material-symbols-outlined text-[22px]">visibility</span>
</button>
</div>
</div>
<button class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]" type="submit">
<span>Entrar</span>
<span class="material-symbols-outlined text-xl">login</span>
</button>
</form>
<div class="mt-8 flex flex-col items-center gap-6 w-full">
<a class="text-primary hover:text-primary/80 text-sm font-semibold transition-colors" href="#">
                Esqueci minha senha
            </a>
<div class="w-full flex items-center gap-4">
<div class="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
</div>
<p class="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                Desenvolvido para Psicopedagogos
            </p>
</div>
</div>
<!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="../model/supabase_config.js"></script>
<script src="../model/model_login.js"></script>
<script src="../controller/controller_login.js"></script>
<!-- FIM DO CONEXÃO SUPABASE -->
</body></html>

 
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/conntroller/controller_login.js
```

/**
 * Nome do arquivo: controller/login.js
 * Objetivo: Escutar os eventos da interface (HTML) e acionar as funções do Modelo.
 */

// Aguarda o DOM (HTML) carregar completamente antes de aplicar os gatilhos
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gatilho para o Formulário de Login (Evento Submit)
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Impede que a página recarregue ao clicar no botão
            event.preventDefault(); 
            // Chama a função de autenticação que está no model/login.js
            realizarLogin();
        });
    }

    // 2. Gatilho para o Link "Esqueci minha senha"
    // Procurei pelo link que contém o texto de recuperação
    const linkRecuperar = document.querySelector('a[href="#"]');
    if (linkRecuperar && linkRecuperar.innerText.includes("Esqueci minha senha")) {
        linkRecuperar.addEventListener('click', (event) => {
            event.preventDefault();
            solicitarRecuperacao();
        });
    }

    // 3. Gatilho para o Botão de Mostrar/Esconder Senha
    // Substitui o código inline do HTML pela função organizada do model
    const btnAlternarSenha = document.querySelector('button[type="button"]');
    if (btnAlternarSenha) {
        // Removemos o atributo onclick antigo via JS para usar o novo listener
        btnAlternarSenha.removeAttribute('onclick');
        btnAlternarSenha.addEventListener('click', () => {
            alternarSenha();
            
            // Ajuste visual do ícone (opcional, já que a função alternarSenha foca no tipo do campo)
            const spanIcon = btnAlternarSenha.querySelector('span');
            const inputSenha = document.getElementById('password');
            if (spanIcon && inputSenha) {
                spanIcon.innerText = inputSenha.type === 'password' ? 'visibility' : 'visibility_off';
            }
        });
    }

});


/**
 * src/controller/login.js
 * Escutador de eventos para o formulário


document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o formulário do HTML
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            // 1. Impede a página de recarregar (essencial para o Supabase)
            event.preventDefault();

            // 2. Chama a função que está no seu model_login.js
            console.log("Iniciando processo de login...");
            await realizarLogin();
        });
    }

});

 */
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/view/index.html
```
<!DOCTYPE html>

<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                    },
                    fontFamily: {
                        "display": ["Lexend"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Lexend', sans-serif;
        }
        .ios-status-bar {
            height: 44px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
<!-- Top Status Bar Placeholder (iOS Style) -->
<div class="ios-status-bar w-full flex justify-between items-center px-6 pt-4">
<span class="text-sm font-semibold text-slate-900 dark:text-slate-100">9:41</span>
<div class="flex gap-1 items-center">
<span class="material-symbols-outlined text-sm text-slate-900 dark:text-slate-100">signal_cellular_alt</span>
<span class="material-symbols-outlined text-sm text-slate-900 dark:text-slate-100">wifi</span>
<span class="material-symbols-outlined text-sm text-slate-900 dark:text-slate-100">battery_full</span>
</div>
</div>
<main class="flex-1 flex flex-col items-center justify-center px-6 py-12">
<div class="w-full max-w-[480px] flex flex-col items-center text-center">
<!-- Welcome Illustration / Icon Area -->
<div class="@container w-full mb-10">
<div class="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center rounded-full bg-primary/5 dark:bg-primary/10 overflow-hidden">
<!-- Abstract geometric pattern for a welcoming feel -->
<div class="absolute inset-0 opacity-20 bg-gradient-to-br from-primary via-transparent to-primary/40" data-alt="Suave padrão abstrato de boas-vindas em tons de azul"></div>
<div class="relative flex flex-col items-center">
<span class="material-symbols-outlined text-primary text-[80px] mb-2" style="font-variation-settings: 'FILL' 1">sentiment_satisfied</span>
<div class="w-16 h-1.5 bg-primary/20 rounded-full"></div>
</div>
</div>
</div>
<!-- Content Section -->
<div class="space-y-4">
<h1 class="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight">
                    Bem-vindo de volta!
                </h1>
<p class="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed max-w-[320px] mx-auto">
                    É um prazer ver você novamente. Estamos preparando tudo para o seu atendimento.
                </p>
</div>
<!-- Action Area -->
<div class="w-full mt-12 mb-6">
<button class="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white text-lg font-semibold leading-normal tracking-wide transition-all active:scale-[0.98] shadow-lg shadow-primary/25">
<span class="truncate">Acessar meu Painel</span>
</button>
</div>
<!-- Subtle secondary hint -->
<div class="flex items-center gap-2 text-slate-400 dark:text-slate-500">
<span class="material-symbols-outlined text-lg">verified_user</span>
<span class="text-xs uppercase tracking-widest font-medium">Ambiente Seguro</span>
</div>
</div>
</main>
<!-- Bottom Indicator (iOS Style) -->
<div class="flex justify-center pb-2 pt-6">
<div class="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
</div>


<!-- ############################################################################# --> 
<!-- supabase -->         
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>     
<script src="../model/supabase_config.js"></script> 
<script src="../model/verificar_login.js"></script>    
<!-- ############################################################################# --> 
</body></html>
```







🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# FAZE 2
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# tabela public.categorias.sql
```
CREATE TABLE public.categorias (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(), -- Vincula a categoria ao profissional logado
  nome text NOT NULL,
  descricao text,
  tipo_categoria text DEFAULT 'exercicio', -- Ex: 'exercicio', 'produto', 'financeiro'
  cor_identificadora text, -- Hexadecimal para usar na interface (opcional)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  
  CONSTRAINT categorias_pkey PRIMARY KEY (id),
  CONSTRAINT categorias_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# tabela public.controle_de_acesso.sql
```
CREATE TABLE public.controle_de_acesso (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  perfil text NOT NULL, -- Ex: 'Administrador', 'Psicopedagogo', 'Paciente'
  modulo text NOT NULL, -- Ex: 'Financeiro', 'Exercicios', 'Relatorios'
  pode_ler boolean DEFAULT true,
  pode_escrever boolean DEFAULT false,
  pode_excluir boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  
  CONSTRAINT controle_de_acesso_pkey PRIMARY KEY (id),
  -- Garante que não haja duplicidade de regras para o mesmo perfil e módulo
  CONSTRAINT perfil_modulo_unique UNIQUE (perfil, modulo)
);
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# tabela public.entidades.sql
```
CREATE TABLE public.entidades (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NULL DEFAULT auth.uid(), -- ID do Supabase Auth (se o usuário tiver login)
  profissional_responsavel_id uuid NULL, -- Referência ao psicopedagogo (caso a entidade seja um paciente)
  
  nome_completo text NOT NULL,
  cpf text NULL,
  data_nascimento date NULL,
  genero text NULL,
  
  -- Uso de CHECK para consistência de dados
  tipo_entidade text NULL CHECK (tipo_entidade IN ('Colaborador', 'Paciente', 'Responsável')),
  status_entidade text NULL DEFAULT 'Ativo' CHECK (status_entidade IN ('Ativo', 'Inativo', 'Suspenso')),
  tipo_acesso text NULL CHECK (tipo_acesso IN ('Admin', 'Profissional', 'Paciente')),
  
  email text NULL,
  telefone text NULL,
  -- campo senha_acesso removido (utilize o Supabase Auth)
  
  -- Endereço
  cep text NULL,
  logradouro text NULL,
  numero text NULL,
  bairro text NULL,
  cidade text NULL,
  estado text NULL,
  
  -- Dados Clínicos Iniciais
  avaliacao integer NULL DEFAULT 5,
  observacoes text NULL,
  arquivos_url text[] NULL, -- Mantido como array de texto para múltiplos links
  
  created_at timestamp with time zone NULL DEFAULT timezone('utc'::text, now()),
  
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id),
  CONSTRAINT entidades_profissional_fkey FOREIGN KEY (profissional_responsavel_id) REFERENCES public.entidades (id),
  CONSTRAINT entidades_email_unique UNIQUE (email),
  CONSTRAINT entidades_cpf_unique UNIQUE (cpf)
);

-- Índice para busca rápida por nome ou tipo
CREATE INDEX idx_entidades_tipo ON public.entidades(tipo_entidade);
CREATE INDEX idx_entidades_nome ON public.entidades(nome_completo);
```















