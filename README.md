# PERSONA: Aristides B Pontes 

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)


## 📑 Índice

- [PERSONA: Aristides B Pontes](#persona-aristides-b-pontes)
- [📌 CONTATOS](#-contatos)

- [TUTORIAIS](#tutoriais)
  - [TERMUX](#termux)
  - [GITHUB](#github)
  - [GITHUB : BAIXAR E ENVIAR ARQUIVOS](#github--baixar-e-enviar-arquivos)
  - [SERVIDOR PYTHON](#servidor-python)

- [ADICIONANDO COLABORADORES NO GITHUB](#adicionando-colaboradores-no-github)

- [COMO BAIXAR MIDIAS COM TERMUX](#como-baixar-midias-com-termux)

- [SUPABASE](#supabase)
  - [RESET TOTAL DO SUPABASE CASO NAO QUEIRA EXCLUIR O PROJETO (DADOS + AUTH + STORAGE)](#-reset-total-do-supabase-caso-nao-queira-excluir-o-projeto-dados--auth--storage)
  - [COMO FAZER BKP DO SUPABASE](#como-fazer-bkp-do-supabase)

- [EXEMPLOS DOS MEUS CODIGOS COMPLETOS](#exemplos-dos-meus-codigos-completos)
  - [login.html](#loginhtml)
  - [entidades.html](#entidadeshtml)
  - [SQL de ENTIDADES](#sql-de-entidades)
 
      

# TUTORIAIS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX
* Download do aplicativo direto no github:
Acesse o link oficial (não uso da Play Store)
[TERMUX](https://github.com/termux/termux-app/releases)
```
# ISTO É UM COMENTÁRIO, PODE COLAR NO TERMUX!!!
```
```
# atualizando o termux:
pkg update && pkg upgrade -y
```
```
# autorizando o uso de pastas do celular
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
mkdir novo_projeto
# para criar pasta/diretorios
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



# EXEMPLOS DOS MEUS CODIGOS COMPLETOS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# login.html
* OBS: A página de login não precisa criar uma tabela no banco de dados.
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ERP ABP</title>

   <!-- STYLE -->
   <script src="https://cdn.tailwindcss.com"></script>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
   <!-- FIM DO STYLE -->

 <!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;
</script>
<!-- FIM DO CONEXÃO SUPABASE -->
    
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen p-4">


<!-- FORMULÁRIO -->
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
<!-- FIM DO FORMULÁRIO -->

<script>
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
    
</script>   
<script>
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
</script>   
<script>
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
</script>   
<script>
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
</script>   
<script>
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
 </script>   
<script>   
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
</script>   
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# entidades.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

<!-- STYLE -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
<style>
    
:root {
    --primary: #3ecf8e;
    --dark: #0f172a;
    --bg: #f1f5f9;
}

* { box-sizing: border-box; }

body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: var(--bg);
    padding-top: 85px;
}

.container {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    margin-bottom: 20px;
}

.section-title {
    color: var(--primary);
    font-size: 14px;
    text-transform: uppercase;
    margin: 20px 0 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    font-weight: bold;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    color: #64748b;
    font-weight: bold;
}

input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

/* Estilo para o campo de senha com Olho */
.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}
.password-wrapper i {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: #64748b;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
    outline: none;
}

.btn-add {
    background: var(--primary);
    color: white;
    padding: 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    margin-top: 20px;
}

.btn-cancel {
    background: #64748b;
    color: white;
    margin-top: 10px;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    display: none;
    width: 100%;
}

.table-container {
    background: white;
    border-radius: 12px;
    overflow-x: auto;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; }
td { padding: 15px; border-top: 1px solid #f1f5f9; }

.btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-wpp { color: #25d366; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-mail { color: #ea4335; cursor: pointer; font-size: 18px; background: none; border: none; }

.navbar {
    position: fixed; top: 0; left: 0; width: 100%; background: white;
    padding: 15px 25px; display: flex; justify-content: space-between;
    align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;
}
.nav-buttons { display: flex; gap: 15px; align-items: center; }
.btn-nav-back { text-decoration: none; color: #64748b; font-weight: bold; }
.btn-logout-nav {
    background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px;
    font-weight: bold; font-size: 14px; border: none; cursor: pointer;
}

.export-area {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
}

.btn-export {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-export-full {
    background: #1e293b;
}
   
</style>   
<!-- FIM DO STYLE -->

 <!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;
</script>
<script>
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
</script>
<!-- FIM DO CONEXÃO SUPABASE -->
   
</head>
<body>

<!-- NAVBAR -->
    <style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>
    
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    <script>
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
    </script>
<!-- FIM DA NAVBAR -->
    
<!-- FORMULARIO -->
<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Cadastro de Entidade</h3>
        <input type="hidden" id="edit-id">

        <div class="section-title">Informações e Acesso</div>
        <div class="form-grid">
            <div><label>Nome Completo / Razão *</label><input type="text" id="nome_completo"></div>
            <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
            <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
            <div><label>E-mail</label><input type="email" id="email"></div>
            <div><label>Telefone / WhatsApp *</label><input type="text" id="telefone"></div>
            <div>
                <label>Senha Interna</label>
                <div class="password-wrapper">
                    <input type="password" id="senha_acesso">
                    <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                </div>
            </div>
            
            <div>
                <label>Nível de Acesso</label>
                <select id="acesso">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="comprador">Comprador</option>
                    <option value="master">Master</option>
                </select>
            </div>
            <div>
                <label>Relacionamento</label>
                <select id="relacionamento">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="terceirizado">Terceirizado</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
            <div>
                <label>Status</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="desativado">Desativado</option>
                </select>
            </div>
            <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
        </div>

        <div class="section-title">Endereço</div>
        <div class="form-grid">
            <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
            <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
            <div><label>Número</label><input type="text" id="numero"></div>
            <div><label>Bairro</label><input type="text" id="bairro"></div>
            <div><label>Cidade</label><input type="text" id="cidade"></div>
            <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
        </div>

        <div class="section-title">Complementos</div>
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>URL de Arquivos</label><input type="text" id="arquivos_url"></div>
            <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card" style="margin-bottom: 10px; padding: 15px;">
        <label><i class="fas fa-search"></i> BUSCAR ENTIDADE</label>
        <input type="text" id="inputBusca" placeholder="Digite o nome para filtrar..." onkeyup="filtrarTabela()">
        
        <div class="export-area">
            <button class="btn-export" onclick="exportarPDFListagem()">
                <i class="fas fa-list"></i> Exportar Listagem (PDF)
            </button>
            <button class="btn-export btn-export-full" onclick="exportarPDFFichaCompleta()">
                <i class="fas fa-file-invoice"></i> Exportar Fichas Detalhadas (PDF)
            </button>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Nome / Tipo</th>
                    <th>Telefone / E-mail</th>
                    <th>Acesso / Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="entities-list"></tbody>
        </table>
    </div>
</div>
<!-- FORMULARIO -->
<script>
    /** * ERP ABP - cadastrar.js */
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    
    const campos = [
        'nome_completo', 'cpf', 'data_nascimento', 'genero', 'estado_civil',
        'tipo_entidade', 'status_entidade', 'tipo_acesso', 'email', 'telefone',
        'senha_acesso', 'cep', 'logradouro', 'numero', 'bairro', 'cidade',
        'estado', 'avaliacao', 'observacoes'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) payload[c] = el.value;
    });

    let result;
    if (id) {
        result = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('entidades').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
        resetForm();
        if (typeof loadEntities === "function") loadEntities();
    }
}
</script>
<script>
/** * ERP ABP - deletar.js */
async function deleteEntity(id) {
    if (!confirm("Tem certeza que deseja excluir esta entidade permanentemente?")) return;

    const { error } = await window.supabaseClient
        .from('entidades')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        if (typeof loadEntities === "function") loadEntities();
    }
}
</script>
 <script> 
/** * ERP ABP - editar.js */
async function editFull(id) {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return alert("Erro ao carregar dados para edição.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = data[key] || '';
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
     }
 </script>
 <script>
     /** * ERP ABP - listar.js */
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }
    renderTable(data || []);
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => `
        <tr>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                ${e.telefone ? `<button class="btn-wpp" onclick="window.open('https://wa.me/55${e.telefone.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>` : ''}
            </td>
        </tr>
    `).join('');
}

// Inicia ao carregar a página
document.addEventListener('DOMContentLoaded', loadEntities);
</script>
 <script>
/** * ERP ABP - utilidades.js
 * Funções auxiliares e automação de interface
 */

// 1. Limpa todos os campos e volta o formulário ao estado inicial
function resetForm() {
    // Limpa Inputs, Selects e Textareas
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if (campo.id === 'avaliacao') {
            campo.value = '5';
        } else if (campo.tagName === 'SELECT') {
            campo.selectedIndex = 0;
        } else {
            campo.value = '';
        }
    });

    // Reset de elementos visuais de edição
    const editId = document.getElementById('edit-id');
    if (editId) editId.value = '';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.innerText = "Novo Cadastro de Entidade";

    const btnSave = document.getElementById('btn-save');
    if (btnSave) btnSave.innerText = "Salvar Entidade";

    const btnCancel = document.getElementById('btn-cancel');
    if (btnCancel) btnCancel.style.display = "none";

    console.log("🧹 Campos limpos com sucesso!");
}

// 2. Filtro de busca em tempo real (sem precisar de botão)
function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#entities-list tr');

    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

// 3. Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('senha_acesso');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput && passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else if (passwordInput) {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 4. Busca de CEP automática (ViaCEP)
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
                console.log("📍 Endereço preenchido via CEP");
            }
        } catch (e) { console.error("Erro ao buscar CEP", e); }
    }
     }
 </script>
     

<!--
CREATE TABLE entidades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  nome_completo TEXT NOT NULL,
  cpf TEXT,
  data_nascimento DATE,
  genero TEXT,
  estado_civil TEXT,
  tipo_entidade TEXT,
  status_entidade TEXT,
  tipo_acesso TEXT,
  email TEXT,
  telefone TEXT,
  senha_acesso TEXT,
  cep TEXT,
  logradouro TEXT,
  numero TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  avaliacao INTEGER DEFAULT 5,
  observacoes TEXT,
  arquivos_url TEXT[], -- Array para suportar múltiplos links
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Ativar RLS
ALTER TABLE entidades ENABLE ROW LEVEL SECURITY;

-- Política para cada usuário ver apenas seus clientes/entidades
CREATE POLICY "Gerenciar suas próprias entidades" 
ON entidades FOR ALL 
USING (auth.uid() = user_id);
-->
</body>
</html>
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# produtos.html (com leito codigo de barra)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos - ERP ABP</title>

<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
<style>
    :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: 'Segoe UI', sans-serif; background: var(--bg); padding-top: 85px; }
    .container { max-width: 1100px; margin: auto; padding: 20px; }
    .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
    .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
    label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
    input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
    input:focus, select:focus, textarea:focus { border-color: var(--primary); outline: none; }
    .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; }
    .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
    .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; min-width: 800px; }
    th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; }
    td { padding: 15px; border-top: 1px solid #f1f5f9; }
    .btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
    .btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; }
    .tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 10px; }
    .status-stock { font-weight: bold; }
    .low-stock { color: #ef4444; }

    /* NAVBAR */
    .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    .nav-buttons { display: flex; gap: 15px; }
    .btn-nav { background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px; border: none; cursor: pointer; transition: 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    .btn-home { background: #3ecf8e !important; }
</style>

<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
    const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
    const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
    window.supabaseClient = _supabase;

    async function checarAutenticacao() {
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();
        if (error || !session) window.location.href = "login.html";
    }
    checarAutenticacao();
</script>
</head>

<body>

<div class="navbar">
    <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
        <i class="fas fa-boxes" style="color: #3ecf8e;"></i> ERP ABP - Produtos
    </div>
    <div class="nav-buttons">
        <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Informações Básicas</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" placeholder="Ex: Cimento CP-II">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <input type="text" id="codigo_de_barras">
            </div>
            <div>
                <label>Marca</label>
                <input type="text" id="marca">
            </div>
            <div>
                <label>SKU / Código Interno</label>
                <input type="text" id="sku">
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" id="categoria_prod">
            </div>
            <div>
                <label>Fornecedor (Entidade)</label>
                <select id="entidade_id">
                    <option value="">Carregando fornecedores...</option>
                </select>
            </div>
            <div>
                <label>Data de Vencimento</label>
                <input type="date" id="data_vencimento">
            </div>
        </div>

        <div class="section-title">Descrição e Detalhes</div>
        <div style="margin-bottom: 20px;">
            <textarea id="descricao" rows="3" placeholder="Informações adicionais do produto..."></textarea>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Preço de Custo (R$)</label><input type="number" id="preco_custo" step="0.01" value="0.00"></div>
            <div><label>Preço de Venda (R$) *</label><input type="number" id="preco_venda" step="0.01" value="0.00"></div>
            <div><label>Estoque Atual *</label><input type="number" id="estoque_atual" value="0"></div>
            <div><label>Estoque Mínimo</label><input type="number" id="estoque_minimo" value="5"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <label><i class="fas fa-search"></i> BUSCA INTELIGENTE</label>
        <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Buscar por Nome, SKU, Código ou Marca...">
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Código/SKU</th>
                    <th>Produto / Marca</th>
                    <th>Categoria</th>
                    <th>Custo</th>
                    <th>Venda</th>
                    <th>Estoque</th>
                    <th>Vencimento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>

<script>
    // LÓGICA DE NEGÓCIO
    async function handleSaveProduto() {
        const id = document.getElementById('edit-id').value;
        const campos = [
            'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
            'entidade_id', 'data_vencimento', 'descricao', 'preco_custo',
            'preco_venda', 'estoque_atual', 'estoque_minimo'
        ];

        const payload = {};
        campos.forEach(c => {
            const el = document.getElementById(c);
            if (el) payload[c] = el.value;
        });

        let result;
        if (id) {
            result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
        } else {
            result = await window.supabaseClient.from('produtos').insert([payload]);
        }

        if (result.error) {
            alert("Erro ao salvar: " + result.error.message);
        } else {
            alert(id ? "Produto atualizado!" : "Produto cadastrado!");
            resetForm();
            loadProdutos();
        }
    }

    async function loadProdutos() {
        const { data, error } = await window.supabaseClient.from('produtos').select('*').order('nome', { ascending: true });
        if (error) return console.error(error);
        renderTable(data);
    }

    function renderTable(data) {
        const tbody = document.getElementById('produtos-list');
        tbody.innerHTML = data.map(p => `
            <tr>
                <td><small>${p.sku || '-'}</small><br><small class="tag">${p.codigo_de_barras || 'S/ EAN'}</small></td>
                <td><strong>${p.nome}</strong><br><small>${p.marca || '-'}</small></td>
                <td>${p.categoria_prod || '-'}</td>
                <td>R$ ${parseFloat(p.preco_custo).toFixed(2)}</td>
                <td><strong>R$ ${parseFloat(p.preco_venda).toFixed(2)}</strong></td>
                <td class="status-stock ${p.estoque_atual <= p.estoque_minimo ? 'low-stock' : ''}">
                    ${p.estoque_atual} <i class="fas ${p.estoque_atual <= p.estoque_minimo ? 'fa-exclamation-triangle' : ''}"></i>
                </td>
                <td>${p.data_vencimento || '-'}</td>
                <td>
                    <button class="btn-edit" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-del" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    async function editProduto(id) {
        const { data, error } = await window.supabaseClient.from('produtos').select('*').eq('id', id).single();
        if (error) return alert("Erro ao carregar dados.");

        Object.keys(data).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = data[key] || (el.type === 'number' ? '0' : '');
        });

        document.getElementById('edit-id').value = data.id;
        document.getElementById('form-title').innerText = "Editando: " + data.nome;
        document.getElementById('btn-save').innerText = "Atualizar Produto";
        document.getElementById('btn-cancel').style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function deleteProduto(id) {
        if (!confirm("Excluir este produto?")) return;
        const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
        if (!error) loadProdutos();
    }

    async function carregarFornecedores() {
        const { data } = await window.supabaseClient.from('entidades').select('id, nome_completo');
        const select = document.getElementById('entidade_id');
        select.innerHTML = '<option value="">Selecione...</option>' + 
            data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
    }

    function filtrarProdutos() {
        const termo = document.getElementById('inputBusca').value.toLowerCase();
        const linhas = document.querySelectorAll('#produtos-list tr');
        linhas.forEach(linha => {
            linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
        });
    }

    function resetForm() {
        document.querySelectorAll('input, select, textarea').forEach(c => c.id === 'estoque_minimo' ? c.value='5' : c.value='');
        document.getElementById('edit-id').value = '';
        document.getElementById('form-title').innerText = "Novo Produto";
        document.getElementById('btn-save').innerText = "Salvar Produto";
        document.getElementById('btn-cancel').style.display = "none";
    }

    async function sairDaConta() {
        if(confirm("Sair do sistema?")) {
            await window.supabaseClient.auth.signOut();
            window.location.href = 'login.html';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadProdutos();
        carregarFornecedores();
    });
</script>
    
    
    <!--
    CREATE TABLE produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  nome TEXT NOT NULL,
  codigo_de_barras TEXT,
  marca TEXT,
  sku TEXT,
  categoria_prod TEXT,
  entidade_id UUID REFERENCES entidades(id),
  descricao TEXT,
  data_vencimento DATE,
  preco_custo NUMERIC DEFAULT 0,
  preco_venda NUMERIC DEFAULT 0,
  estoque_atual INTEGER DEFAULT 0,
  estoque_minimo INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Ativar RLS (Idêntico ao entidades.sql)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Política para cada usuário ver apenas seus próprios produtos
CREATE POLICY "Gerenciar seus próprios produtos" 
ON produtos FOR ALL 
USING (auth.uid() = user_id);
    -->

</body>
</html>
```
# produtos.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos - ERP ABP</title>

<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
<style>
    :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: 'Segoe UI', sans-serif; background: var(--bg); padding-top: 85px; }
    .container { max-width: 1100px; margin: auto; padding: 20px; }
    .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
    .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
    label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
    input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
    input:focus, select:focus, textarea:focus { border-color: var(--primary); outline: none; }
    .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; }
    .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
    .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; min-width: 800px; }
    th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; }
    td { padding: 15px; border-top: 1px solid #f1f5f9; }
    .btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
    .btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; }
    .tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 10px; }
    .status-stock { font-weight: bold; }
    .low-stock { color: #ef4444; }

    /* NAVBAR */
    .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    .nav-buttons { display: flex; gap: 15px; }
    .btn-nav { background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px; border: none; cursor: pointer; transition: 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    .btn-home { background: #3ecf8e !important; }
</style>

<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
    const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
    const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
    window.supabaseClient = _supabase;

    async function checarAutenticacao() {
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();
        if (error || !session) window.location.href = "login.html";
    }
    checarAutenticacao();
</script>

    <script src="https://unpkg.com/html5-qrcode"></script>
<style>
    #reader { width: 100%; border-radius: 8px; margin-bottom: 10px; display: none; }
    .btn-scan { background: #6366f1; color: white; padding: 10px; border-radius: 6px; cursor: pointer; border: none; margin-bottom: 5px; width: 100%; }
</style>
    
</head>

<body>

<div class="navbar">
    <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
        <i class="fas fa-boxes" style="color: #3ecf8e;"></i> ERP ABP - Produtos
    </div>
    <div class="nav-buttons">
        <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        
<div class="section-title">Informações Básicas</div>
<div class="form-grid">
    <div style="grid-column: span 2;">
        <label>Nome do Produto *</label>
        <input type="text" id="nome" placeholder="Ex: Cimento CP-II">
    </div>
    <div>
        <label>Código de Barras (EAN)</label>
        <button type="button" class="btn-scan" onclick="startScanner()"><i class="fas fa-camera"></i> Ler Código</button>
        <div id="reader"></div>
        <input type="text" id="codigo_de_barras">
    </div>
    <div>
        <label>Data de Compra</label>
        <input type="date" id="data_compra">
    </div>
    <div>
        <label>Marca</label>
        <input type="text" id="marca">
    </div>
</div>
            

            
            <div>
                <label>Marca</label>
                <input type="text" id="marca">
            </div>
            <div>
                <label>SKU / Código Interno</label>
                <input type="text" id="sku">
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" id="categoria_prod">
            </div>
            <div>
                <label>Fornecedor (Entidade)</label>
                <select id="entidade_id">
                    <option value="">Carregando fornecedores...</option>
                </select>
            </div>
            <div>
                <label>Data de Vencimento</label>
                <input type="date" id="data_vencimento">
            </div>
        </div>

        <div class="section-title">Descrição e Detalhes</div>
        <div style="margin-bottom: 20px;">
            <textarea id="descricao" rows="3" placeholder="Informações adicionais do produto..."></textarea>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Preço de Custo (R$)</label><input type="number" id="preco_custo" step="0.01" value="0.00"></div>
            <div><label>Preço de Venda (R$) *</label><input type="number" id="preco_venda" step="0.01" value="0.00"></div>
            <div><label>Estoque Atual *</label><input type="number" id="estoque_atual" value="0"></div>
            <div><label>Estoque Mínimo</label><input type="number" id="estoque_minimo" value="5"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <label><i class="fas fa-search"></i> BUSCA INTELIGENTE</label>
        <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Buscar por Nome, SKU, Código ou Marca...">
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Código/SKU</th>
                    <th>Produto / Marca</th>
                    <th>Categoria</th>
                    <th>Custo</th>
                    <th>Venda</th>
                    <th>Estoque</th>
                    <th>Vencimento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>

<script>

    // 1. Função para o Scanner
let html5QrCode;

function startScanner() {
    const readerDiv = document.getElementById('reader');
    readerDiv.style.display = 'block';
    
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" }, // Câmera traseira
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            document.getElementById('codigo_de_barras').value = decodedText;
            stopScanner();
        },
        (errorMessage) => { /* Erros de foco ou ausência de código são ignorados */ }
    ).catch(err => alert("Erro ao acessar câmera: " + err));
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('reader').style.display = 'none';
        });
    }
}

// 2. Atualize a lista de campos na função handleSaveProduto
async function handleSaveProduto() {
    const id = document.getElementById('edit-id').value;
    const campos = [
        'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
        'entidade_id', 'data_vencimento', 'data_compra', 'descricao', // 'data_compra' incluído aqui
        'preco_custo', 'preco_venda', 'estoque_atual', 'estoque_minimo'
    ];


        const payload = {};
        campos.forEach(c => {
            const el = document.getElementById(c);
            if (el) payload[c] = el.value;
        });

        let result;
        if (id) {
            result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
        } else {
            result = await window.supabaseClient.from('produtos').insert([payload]);
        }

        if (result.error) {
            alert("Erro ao salvar: " + result.error.message);
        } else {
            alert(id ? "Produto atualizado!" : "Produto cadastrado!");
            resetForm();
            loadProdutos();
        }
    }

    async function loadProdutos() {
        const { data, error } = await window.supabaseClient.from('produtos').select('*').order('nome', { ascending: true });
        if (error) return console.error(error);
        renderTable(data);
    }

    function renderTable(data) {
        const tbody = document.getElementById('produtos-list');
        tbody.innerHTML = data.map(p => `
            <tr>
                <td><small>${p.sku || '-'}</small><br><small class="tag">${p.codigo_de_barras || 'S/ EAN'}</small></td>
                <td><strong>${p.nome}</strong><br><small>${p.marca || '-'}</small></td>
                <td>${p.categoria_prod || '-'}</td>
                <td>R$ ${parseFloat(p.preco_custo).toFixed(2)}</td>
                <td><strong>R$ ${parseFloat(p.preco_venda).toFixed(2)}</strong></td>
                <td class="status-stock ${p.estoque_atual <= p.estoque_minimo ? 'low-stock' : ''}">
                    ${p.estoque_atual} <i class="fas ${p.estoque_atual <= p.estoque_minimo ? 'fa-exclamation-triangle' : ''}"></i>
                </td>
                <td>${p.data_vencimento || '-'}</td>
                <td>
                    <button class="btn-edit" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-del" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    async function editProduto(id) {
        const { data, error } = await window.supabaseClient.from('produtos').select('*').eq('id', id).single();
        if (error) return alert("Erro ao carregar dados.");

        Object.keys(data).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = data[key] || (el.type === 'number' ? '0' : '');
        });

        document.getElementById('edit-id').value = data.id;
        document.getElementById('form-title').innerText = "Editando: " + data.nome;
        document.getElementById('btn-save').innerText = "Atualizar Produto";
        document.getElementById('btn-cancel').style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function deleteProduto(id) {
        if (!confirm("Excluir este produto?")) return;
        const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
        if (!error) loadProdutos();
    }

    async function carregarFornecedores() {
        const { data } = await window.supabaseClient.from('entidades').select('id, nome_completo');
        const select = document.getElementById('entidade_id');
        select.innerHTML = '<option value="">Selecione...</option>' + 
            data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
    }

    function filtrarProdutos() {
        const termo = document.getElementById('inputBusca').value.toLowerCase();
        const linhas = document.querySelectorAll('#produtos-list tr');
        linhas.forEach(linha => {
            linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
        });
    }

    function resetForm() {
        document.querySelectorAll('input, select, textarea').forEach(c => c.id === 'estoque_minimo' ? c.value='5' : c.value='');
        document.getElementById('edit-id').value = '';
        document.getElementById('form-title').innerText = "Novo Produto";
        document.getElementById('btn-save').innerText = "Salvar Produto";
        document.getElementById('btn-cancel').style.display = "none";
    }

    async function sairDaConta() {
        if(confirm("Sair do sistema?")) {
            await window.supabaseClient.auth.signOut();
            window.location.href = 'login.html';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadProdutos();
        carregarFornecedores();
    });
</script>
    
    
    <!--
    CREATE TABLE produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  nome TEXT NOT NULL,
  codigo_de_barras TEXT,
  marca TEXT,
  sku TEXT,
  categoria_prod TEXT,
  entidade_id UUID REFERENCES entidades(id),
  descricao TEXT,
  data_vencimento DATE,
  preco_custo NUMERIC DEFAULT 0,
  preco_venda NUMERIC DEFAULT 0,
  estoque_atual INTEGER DEFAULT 0,
  estoque_minimo INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Ativar RLS (Idêntico ao entidades.sql)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Política para cada usuário ver apenas seus próprios produtos
CREATE POLICY "Gerenciar seus próprios produtos" 
ON produtos FOR ALL 
USING (auth.uid() = user_id);
    
-- Adicionar coluna
ALTER TABLE produtos ADD COLUMN data_compra DATE;
-->

</body>
</html>
```
