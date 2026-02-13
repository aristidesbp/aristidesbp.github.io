# PERSONA: Aristides B Pontes 

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)




# EXEMPLOS DE CONHECIMENTO TÉCNICO (RESUMOS PRATICOS)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX
* Download do aplicativo direto no github:
Acesse o link oficial (não uso da Play Store)
[TERMUX](https://github.com/termux/termux-app/releases)
* em caso de dúvida peço ajuda ao genini (Ia do google, ou outra da sua escolha)
```
# Quando coloca o "jogo da velha" na frente de um texto, ele se torna comentário no TERMUX!!!
# Por esse motivo você pode copiar os códigos mesmo com comentários que vai funcionar!
```
```
# comando para atualizar o termux:
pkg update && pkg upgrade -y
```
```
# comando para autorizar o uso de pastas do celular
termux-setup-storage
```
```
## INSTALE AS FERRAMENTAS BÁSICAS PARA A PROGRAMAÇÃO:
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
pkg install tree -y
```
```
# comando para criar pasta
mkdir novo_projeto
```
``` 
nano teste.txt 
# abre o arquivo teste.txt 
# obs: ele cria caso não exista
# Ctrl+S  para salvar
# Crtl+X  para sair
```
```
mv teste.txt ./repositorios_git 
# mover pasta ou arquivo (./pasta_destino)
```
```
# limpar atela
clear
```
Digite o seguinte endereço na barra de URL:

```
http://localhost:8080/admin.html
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# GITHUB 

```
# Lista todas as configurações ativas: 
git config --list
```
```
# Configurar a pasta como segura (evita erros de segurança)
git config --global --add safe.directory "$(pwd)"                     
```
```
# Configurar nome de usuário
git config --global user.name "Seu Nome"
```
```
# Configurar email do GitHub
git config --global user.email "seu@email.com"
```
```
# Troque a URL remota para usar SSH
git remote set-url origin git@github.com:usuario/repositorio.git
```

```
# Iniciar o agente ssh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```
```
# Gerar nova chave SSH (caso ainda não tenha,apertar enter ate finalizar)
ssh-keygen -t ed25519 -C "seu@email.com"
```
```
# Mostrar a chave pública para adicionar no GitHub
cat ~/.ssh/id_ed25519.pub
```
```
#🧪 Teste de conexão com GitHub via SSH 
# Se tudo estiver certo, você verá:
# Hi SEU_USUARIO! You've successfully authenticated..
ssh -T git@github.com
```

## ⚠️ OBS: VERIFIQUE CONFIG GITHUB !
----------------------------------------------------
1. Acesse: https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
8. 🧪 Teste de conexão com GitHub via SSH novamente
----------------------------------------------------
```
# vá para pasta do projeto (abaixo terá um exemplo)
cd storage/downloads
```
```
# veja o que tem na pasta
ls
```
```
# para mostrar conteudo o culto da pasta
ls -a
```
```
# mostrar todas as pastas e subpastas
tree
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# GITHUB : BAIXAR E ENVIAR ARQUIVOS 
```
git clone git@github.com:aristidesbp/aristidesbp.github.io
## Clona o repositório com chave SSH
```
```
cd aristidesbp.github.io
# entre na pasta do repositório clonado
```
```
git init
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
```
``` 
git pull origin main
# BAIXAR ATUALIZAÇÃO DO SITE:
```
---
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
# APAGAR ARQUIVO LOCAL E COLAR O REPOSITÓRIO 
```
# 1. Sincroniza as informações com o GitHub 
git fetch origin
# 2. APAGA seus arquivos locais para ficarem idênticos ao servidor
git reset --hard origin/main
```
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
---
# 🖱️🗃️ FAÇA SUAS ALTERAÇOES !!!!!
```
git status
# VERIFICAR STATUS DO REPOSITORIO LOCAL:
```
``` 
git add .
# ADICIONAR REPOSITÓRIOS À LISTA:
```
``` 
git commit -m "DESCRIÇÃO_DA_ALTERACAO"
# SALVAR PONTO DE ALTERAÇÃO:
```
``` 
git push origin main
# MANDAR ALTERAÇÕES PARA O REPOSITÓRIO:
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# SERVIDOR PYTHON 
# Passo 1: Instalar o Python3
 * Se você já instalou o Termux  (CONFIGUROU E ATUALIZOU)
 * Navegue até a pasta onde seus arquivos estão 
```
python3 -m http.server 8080
```
* Ele inicia um servidor web simples na porta 8080:
* caso queira encerrar o processo basta apertar Ctr+C;

**Como Acessar o Site no Navegador**
Abra o navegador do seu celular (Chrome, Firefox, etc.).

## [localhost CLIQUE AQUI](http://localhost:8080)
```
http://localhost:8080
```

## ⚠️ Observações importantes
O servidor só funciona enquanto o Termux estiver aberto
A porta 8080 pode ser trocada por outra, ex:
Copiar código
```
python -m http.server 3000
```
Aí o endereço vira:
* http://localhost:3000

## ✅ Se quiser acessar de outro dispositivo na mesma rede Wi-Fi
```
# Descubra o IP do celular no Termux:
ip addr show wlan0
```
Vai aparecer algo como:
* inet 192.168.1.105
No navegador do outro dispositivo, acesse:
* http://192.168.1.105:8080



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# ADICIONANDO COLABORADORES NO GITHUB 


Vamos criar um tutorial completo, atualizado e seguro ensinando como adicionar colaboradores (programadores) ao repositório do seu GitHub Pages, permitindo que outras pessoas desenvolvam ou editem o site diretamente no GitHub — com permissões controladas.

---
🧭 TUTORIAL: COMO ADICIONAR COLABORADORES AO SEU SITE NO GITHUB PAGES
💡 Objetivo: Dar acesso a outros programadores para que possam editar, atualizar e enviar códigos (HTML, CSS, JS, etc.) no seu repositório do GitHub Pages, mantendo o controle total sobre o projeto.

---
🧩 1️⃣ Pré-requisitos
Antes de começar:
(1) Você precisa ter uma conta no GitHub.
(2) Ter um repositório [PUBLICO] criado [COM O MESMO NOME DO USUARIO] exemplo:
NOME_DO_USUARIO: aristidesbp
NOME_DO_REPOSITORIO: aristidesbp.github.io
(3) Saber o usuário GitHub de quem você quer adicionar (ex: aristidesbp).

---
🏗️ 2️⃣ Acesse o repositório do seu site
(1) Entre em https://github.com/.
(2) Clique no seu repositório do site (ex: aristidesbp/loja-virtual).
(3) Você será levado para a tela principal com os arquivos do projeto.

⚙️ 3️⃣ Vá até as configurações do repositório
(1) Clique em ⚙️ Settings (no canto direito superior).
(2) No menu lateral esquerdo, role até encontrar “Collaborators”
(fica dentro da seção Access → Collaborators).

---
🪪 4️⃣ Adicionando o colaborador
(1) Clique no botão “Add people”.
(2) Na janela que aparece, digite o nome de usuário ou e-mail do GitHub da pessoa que você quer adicionar.
(3) Clique no botão “Add” ao lado do nome que aparecer.




🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# COMO BAIXAR MIDIAS COM TERMUX 
```
# instale o yt-dlp com o comando:
pip install yt-dlp
```
```
# ffmpeg permite baixar vídeos com áudio ou converter formatos:
pkg install ffmpeg -y
```
```
# Baixar apenas o áudio em MP3:
yt-dlp -x --audio-format mp3 "URL_DO_VÍDEO"
```
```
# Escolher qualidade de vídeo (exemplo:720p)
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "URL_DO_VÍDEO"
```
```
# Salvar com nome personalizado:
yt-dlp -o "meu_video.%(ext)s" "URL_DO_VÍDEO"
```
```
# Ver formatos disponíveis:
yt-dlp -F "URL_DO_VÍDEO
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# SUPABASE

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto: nome_do_seu_projeto
* Senha do banco: ***********
* Região: brasil
  
# 🧨 RESET TOTAL DO SUPABASE CASO NAO QUEIRA EXCLUIR O PROJETO (DADOS + AUTH + STORAGE)
@ 👉 Isso é o mais próximo possível de um banco novo.
``` 
-- Apagar tabelas públicas
do $$
declare
  r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public') loop
    execute 'drop table if exists public.' || quote_ident(r.tablename) || ' cascade';
  end loop;
end $$;
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## COMO FAZER BKP DO SUPABASE
```
SELECT 
    'CREATE POLICY ' || quote_ident(policyname) || 
    ' ON ' || tablename || 
    ' FOR ' || cmd || 
    ' TO ' || array_to_string(roles, ',') || 
    ' USING (' || qual || ')' || 
    COALESCE(' WITH CHECK (' || with_check || ')', '') || ';' AS sql_backup
FROM pg_policies
WHERE schemaname = 'public' 
  AND tablename = 'NOME_DA_SUA_TABELA';
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# FASES DO PROJETOS 
```
## Como executar o projeto: (persona: Aristidesbp)
1- Exportar paginas do projetos criadas no GOOGLE STITSH 🐨;
2- Colocar id nos elementos (principalmente nos formulários, para utilização dos Campos);
3- Arquitetura de Pastas e Arquivos:
 * Criar pasta Raiz (Principal com o nome do projeto):
   - Devem ficar apenas os arquivos html e arquivos de configuração global js
   - Exemplo: # pasta_nome_do_projeto/
              |__ supabase_config.js
              |__ verificar_login.js
              |__ navbar.js
              |__ index.html
              |__ index/
              |    |__ index.css
              |    |__ index.js
              |  
              |__ login.html
              |__ login/
              |    |__ login.css
              |    |__ login.js (cada função JS terá um arquivo, aqui fica referente a página realizando)
              |    |__ alternar_senha.js
              |    |__ realiza_login.js
              |    |__ alternar_cadastro.js
              |    |__ recuperar_senha.js
              |    L__ login_loogle.js
              |
              |__ cadastrar_notas.html
              |__ listar_notas.html
              |__ notas/
              |    |__ notas.css
              |    |__ notas.js
              |    |__ listar_notas.js
              |    |__ deletar_notas.js
              |    |__ exportar_notas.js
              |    |__ pesquisar_notas.js
              |
              L__ REDME.md
     

## EXEMPLOS DE CHAMADAS REALIZADAS DENTRO DOS ARQUIVOS HTML.

<!-- LOGIN.HTML ############################################################### --> 
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="supabase_config.js"></script>
    <script src="login/alternar_senha.js"></script>
    <script src="login/realizar_login.js"></script>
    <script src="login/realizar_cadastro.js"></script>
    <script src="login/recuperar_senha.js"></script>
    <script src="login/login_google.js"></script>
<!-- ###################################################################### --> 

<!-- NOTAS.HTML ############################################################### --> 
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="supabase_config.js"></script>
<script src="notas/listar_notas.js"></script>
<script src="notas/deletar_notas.js"></script>
<script src="notas/pesquisar_notas.js"></script>
<script src="notas/exportar_notas.js"></script>
<script src="notas/editar_notas.js"></script> 
<script src="navbar.js"></script>
<!-- ########################################################################## --> 
```


# EXEMPLOS DOS CODIGOS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# login.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
       <link href="css/style.css" rel="stylesheet">
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen p-4">
    <div class="glass p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-black tracking-tighter text-blue-500">ERP ABP</h1>
            <p class="text-slate-400 text-sm">Acesse sua conta para gerenciar seus PDFs</p>
        </div>
<!--
        <button onclick="loginComGoogle()" class="w-full py-3 mb-6 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
            <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google icon"> 
            Entrar com Gmail
        </button>
-->
        <div class="relative mb-6 text-center border-b border-slate-800">
            <span class="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-xs text-slate-500 uppercase tracking-widest">ou e-mail</span>
        </div>
        <div class="space-y-4">
    <div>
        <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">E-mail</label>
        <input type="email" id="email" placeholder="seu@email.com" class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
    </div>
    <div class="relative">
        <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">Senha</label>
        <input type="password" id="password" placeholder="••••••••" class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
        <button type="button" onclick="alternarSenha()" class="absolute right-3 top-8 text-slate-500 hover:text-white">
            🔒
        </button>
    </div>
    <div class="text-right">
        <button onclick="solicitarRecuperacao()" class="text-xs text-blue-400 hover:underline">Esqueceu a senha?</button>
    </div>
    <div class="flex gap-3 pt-2">
        <button onclick="realizarLogin()" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
            ENTRAR
        </button>
        <button onclick="confirmarCadastro()" class="flex-1 py-3 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl transition-all">
            CADASTRAR
        </button>
    </div>
</div>
    </div>
    <!-- ############################################################################# --> 
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="supabase_config.js"></script>
    <script src="login/alternar_senha.js"></script>
    <script src="login/realizar_login.js"></script>
    <script src="login/realizar_cadastro.js"></script>
    <script src="login/recuperar_senha.js"></script>
    <script src="login/login_google.js"></script>
    <!-- ############################################################################# --> 
</body>
</html>
```

# login/alternar_senha.js
```
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

```
# login_google.js
```
/**
 * Nome do arquivo: login_google.js
 * Objetivo: Realizar autenticação social utilizando o provedor Google via OAuth.
 */

async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Define para onde o Google deve mandar o usuário após o login.
            // Usamos window.location.origin para garantir que funcione em qualquer ambiente.
            redirectTo: window.location.origin + '/assets/app/index.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}

```
# realizar_cadastro.js
```
/**
 * Nome do arquivo: realizar_cadastro.js
 * Objetivo: Criar uma nova conta de usuário no sistema.
 */

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ 
        email, 
        password: senha 
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
    } else {
        alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login.");
    }
}

/**
 * Função de apoio para evitar cadastros acidentais (UX)
 */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");
    
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

```
# realizar_login.js
```
/**
 * Nome do arquivo: realizar_login.js
 * Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
 */

async function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}

```
# recuperar_senha.js
```
/**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://aristidesbp.github.io/assets/redefinir_senha.html',
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

# cadastrar_notas.html
```
<!DOCTYPE html>
<html class="light" lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Cadastro de Notas ERP ABP</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase_config.js"></script>    
    <script src="verificar_login.js"></script>
        
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: { 
                        "primary": "#137fec", 
                        "background-light": "#f6f7f8", 
                        "background-dark": "#101922" 
                    },
                    fontFamily: { "display": ["Inter", "sans-serif"] }
                }
            }
        }
    </script>
</head>

<body class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">

<header class="p-4 bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-10">
    <div class="max-w-2xl mx-auto flex items-center justify-between">
        <button onclick="window.location.href='listar_notas.html'" class="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span class="material-symbols-outlined dark:text-white">arrow_back</span>
        </button>
        <h1 class="font-bold text-lg dark:text-white text-center">Nota</h1>
        <div class="w-10"></div>
    </div>
</header>

<main class="flex-1 p-4 pb-32"> 
    <div class="max-w-2xl mx-auto space-y-6">
        <input type="hidden" id="note-id">

        <div class="space-y-2">
            <label class="text-sm font-bold text-gray-700 dark:text-gray-300">Título</label>
            <input id="title" type="text" placeholder="Ex: Ideias para o projeto" 
                class="w-full p-4 rounded-xl border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-primary focus:border-primary transition-all">
        </div>

        <div class="space-y-2">
            <label class="text-sm font-bold text-gray-700 dark:text-gray-300">Conteúdo</label>
            <textarea id="content" rows="12" placeholder="Digite sua nota aqui..." 
                class="w-full p-4 rounded-xl border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-primary focus:border-primary transition-all"></textarea>
        </div>

        <div class="flex gap-3">
            <button onclick="resetForm()" class="px-6 h-14 bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-400 font-bold rounded-2xl hover:bg-gray-300 transition-all">
                Limpar
            </button>
            
            <button id="btn-save" onclick="saveNote()" class="flex-1 h-14 bg-primary text-white font-bold rounded-2xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">save</span>
                <span>Salvar Nota</span>
            </button>
        </div>
    </div>
</main>

<script src="notas/limpar_notas.js"></script>

<script src="notas/salvar_notas.js"></script>

<script src="notas/editar_notas.js"></script>

<script src="navbar.js"></script> 

</body>
</html>

```
# listar_notas.html
```
<!DOCTYPE html>
<html class="light" lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Minhas Notas - ERP ABP</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase_config.js"></script>    
    <script src="verificar_login.js"></script>
    
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: { "primary": "#137fec", "background-dark": "#101922" }
                }
            }
        }
    </script>
</head>

<body class="bg-background-light dark:bg-background-dark min-h-screen">

<header class="p-4 bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-10">
    <div class="max-w-2xl mx-auto space-y-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Bloco de Notas</h1>
            <button onclick="exportAllToPDF()" class="p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                <span class="material-symbols-outlined">picture_as_pdf</span>
            </button>
        </div>
        <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input id="search" oninput="filterNotes()" type="text" placeholder="Pesquisar em minhas notas..." 
                class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary dark:text-white">
        </div>
    </div>
</header>

<main class="p-4 max-w-2xl mx-auto pb-32">
    <div id="notes-list" class="space-y-4">
        <div class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    </div>
</main>

<button onclick="window.location.href='cadastrar_notas.html'" 
    class="fixed bottom-28 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20">
    <span class="material-symbols-outlined text-3xl">add</span>
</button>

<script src="notas/listar_notas.js"></script>
<script src="notas/deletar_notas.js"></script>
<script src="notas/pesquisar_notas.js"></script>
<script src="notas/exportar_notas.js"></script>
<script src="notas/editar_notas.js"></script> 
<script src="navbar.js"></script>
     
</body>
</html>

```
# notas/deletar_notas.js
```
/**
 * Nome do arquivo: deletar_notas.js
 */
async function deleteNote(id) {
    if (!confirm("Tem certeza que deseja excluir permanentemente esta nota?")) return;

    try {
        const { error } = await window.supabaseClient
            .from('notes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert("Nota excluída com sucesso.");
        if (typeof loadNotes === "function") loadNotes();
    } catch (err) {
        console.error("Erro ao excluir:", err.message);
        alert("Erro ao excluir nota.");
    }
}
```
# notas/editar_notas.js
```
/**
 * Nome do arquivo: editar_notas.js
 * Objetivo: Redirecionar para a página de cadastro enviando os dados da nota via URL.
 */

function prepareEdit(id, title, content) {
    // Definimos a URL base para o cadastro (ajuste se o nome do arquivo for diferente)
    const urlCadastro = "https://aristidesbp.github.io/assets/app/cadastrar_notas.html";
    
    // Criamos os parâmetros para passar via URL (codificando para evitar erros com espaços/quebras de linha)
    const params = new URLSearchParams({
        id: id,
        edit: "true"
    });

    // Redireciona o usuário
    window.location.href = `${urlCadastro}?${params.toString()}`;
}

/**
 * Função para carregar os dados quando a página de CADASTRAR abrir
 * Adicione esta chamada no seu cadastrar_notas.html ou salvar_notas.js
 */
async function checkEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');

    if (noteId && window.location.pathname.includes('cadastrar_notas.html')) {
        try {
            const { data: note, error } = await window.supabaseClient
                .from('notes')
                .select('*')
                .eq('id', noteId)
                .single();

            if (error) throw error;

            if (note) {
                document.getElementById('note-id').value = note.id;
                document.getElementById('title').value = note.title;
                document.getElementById('content').value = note.content;
                document.getElementById('btn-save').innerHTML = `<span class="material-symbols-outlined">edit</span> Atualizar Nota`;
            }
        } catch (err) {
            console.error("Erro ao carregar nota para edição:", err.message);
        }
    }
}

// Executa a verificação se estiver na página de cadastro
if (window.location.pathname.includes('cadastrar_notas.html')) {
    document.addEventListener('DOMContentLoaded', checkEditMode);
}

```
# exportar_notas.js

```
/**
 * Nome do arquivo: exportar_notas.js
 */
async function exportAllToPDF() {
    if (allNotes.length === 0) return alert("Não há notas para exportar.");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(19, 127, 236); // Cor Primary
    doc.text("Relatório de Notas - ERP ABP", 10, 20);

    let y = 35;

    allNotes.forEach((n, i) => {
        if (y > 270) { 
            doc.addPage(); 
            y = 20; 
        }
        
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        
        // Quebra automática de texto para o conteúdo não sair da página
        const splitContent = doc.splitTextToSize(n.content, 180);
        doc.text(splitContent, 10, y + 7);
        
        y += (splitContent.length * 5) + 15;
    });

    doc.save("minhas-notas-abp.pdf");
}
```
# limpar_notas.js
```
/**
 * Nome do arquivo: limpar_notas.js
 * Objetivo: Resetar o formulário de notas para o estado inicial (vazio).
 */

function resetForm() {
    // Captura os elementos
    const idField = document.getElementById('note-id');
    const titleField = document.getElementById('title');
    const contentField = document.getElementById('content');
    const btnSave = document.getElementById('btn-save');

    // Limpa os valores
    if (idField) idField.value = '';
    if (titleField) titleField.value = '';
    if (contentField) contentField.value = '';

    // Volta o botão para o modo de "Salvar" (caso estivesse em "Atualizar")
    if (btnSave) {
        btnSave.innerHTML = `
            <span class="material-symbols-outlined">save</span>
            Salvar Nota
        `;
        // Remove classes de edição se você tiver adicionado alguma (ex: mudar cor do botão)
        btnSave.classList.remove('bg-amber-500');
        btnSave.classList.add('bg-primary');
    }

    console.log("Formulário de notas limpo com sucesso.");
}

```
# listar_notas.js
```
/**
 * Nome do arquivo: listar_notas.js
 * Objetivo: Buscar notas do banco e renderizar o HTML da listagem.
 */
let allNotes = []; // Variável global para busca e exportação

async function loadNotes() {
    const container = document.getElementById('notes-list');
    if (!container) return;

    try {
        const { data: notes, error } = await window.supabaseClient
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allNotes = notes || [];
        renderNotes(allNotes);
    } catch (err) {
        console.error("Erro ao carregar notas:", err.message);
        container.innerHTML = `<p class="text-center text-red-500">Erro ao carregar notas.</p>`;
    }
}

function renderNotes(notes) {
    const container = document.getElementById('notes-list');
    if (!container) return;

    if (notes.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-400 py-10">Nenhuma nota encontrada.</p>';
        return;
    }

    container.innerHTML = notes.map(n => `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-start mb-4">
            <div class="flex-1 pr-4">
                <h3 class="font-bold text-lg dark:text-white">${n.title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mt-1 whitespace-pre-wrap">${n.content}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="prepareEdit('${n.id}', \`${n.title}\`, \`${n.content}\`)" class="p-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-sm">edit</span>
                </button>
                <button onclick="deleteNote('${n.id}')" class="p-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Inicia a carga quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', loadNotes);
```
# pesquisar_notas.js
```
/**
 * Nome do arquivo: pesquisar_notas.js
 */
function filterNotes() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();

    // Filtra sobre a variável global allNotes carregada no listar_notas.js
    const filtered = allNotes.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query)
    );

    renderNotes(filtered);
}
```
# salvar_notas.js
```
/**
 * Nome do arquivo: salvar_notas.js
 * Objetivo: Criar novas notas ou atualizar notas existentes no Supabase.
 */
async function saveNote() {
    const btn = document.getElementById('btn-save');
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) return alert("Por favor, preencha o título e o conteúdo.");

    btn.disabled = true;
    btn.innerText = "Processando...";
    
    try {
        // Busca o usuário logado para garantir o vínculo da nota
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado.");

        if (id) {
            // Modo Edição (Update)
            const { error } = await window.supabaseClient
                .from('notes')
                .update({ title, content })
                .eq('id', id);
            if (error) throw error;
        } else {
            // Modo Criação (Insert)
            const { error } = await window.supabaseClient
                .from('notes')
                .insert([{ title, content, user_id: user.id }]);
            if (error) throw error;
        }

        alert("Nota salva com sucesso!");
        
        // Limpa o formulário e recarrega a lista se as funções existirem
        if (typeof resetForm === "function") resetForm();
        if (typeof loadNotes === "function") loadNotes();

    } catch (err) {
        console.error("Erro ao salvar:", err.message);
        alert("Erro ao salvar: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = id ? "Atualizar Nota" : "Salvar Nota";
    }
}
```
# sql notas
```
-- 1. Criar a tabela de notas
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(), -- Vincula a nota ao usuário logado
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Habilitar o Row Level Security (Segurança de Linha)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 3. Criar política: Usuários podem ver apenas suas próprias notas
CREATE POLICY "Usuários podem ver suas próprias notas" 
ON notes FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Criar política: Usuários podem inserir apenas suas próprias notas
CREATE POLICY "Usuários podem inserir suas próprias notas" 
ON notes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 5. Criar política: Usuários podem atualizar apenas suas próprias notas
CREATE POLICY "Usuários podem atualizar suas próprias notas" 
ON notes FOR UPDATE 
USING (auth.uid() = user_id);

-- 6. Criar política: Usuários podem deletar apenas suas próprias notas
CREATE POLICY "Usuários podem deletar suas próprias notas" 
ON notes FOR DELETE 
USING (auth.uid() = user_id);

```





























