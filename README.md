# Aristidesbp

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)

## 💼 PROJETOS 
[ERPABP](https://aristidesbp.github.io/projetos/erpabp/)
[Barraca de Tapioca](https://aristidesbp.github.io/projetos/tapioca/)

## 📓🗃️ MATERIAL DE APOIO (ÍNDICE)
- [GITHUB E TERMUX](#termux/github)

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX/GITHUB

Faça o download do aplicativo direto no github te instale:
Acesse o link oficial (não use da Play Store)
[TERMUX](https://github.com/termux/termux-app/releases)

```
# ISTO É UM COMENTÁRIO PODE COLAR NO TERMUX!!!
```
```
pkg update && pkg upgrade -y
# atualizando o termux
```
```
termux-setup-storage
# autorizando o uso de pastas do celular
```
```
## INSTALE AS FERRAMENTAS BÁSICAS PARA A PROGRAMAÇÃO:
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
```
```
# vá para pasta do projeto (abaixo terá um exemplo)
cd storage/downloads
```
```
# veja o que tem na pasta
ls
```
```
## Clona o repositório com chave SSH
git clone git@github.com:aristidesbp/aristidesbp.github.io
```
```
cd aristidesbp.github.io
```
```
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
git init
```
```
git config --global --add safe.directory "$(pwd)"
# Configurar a pasta como segura (evita erros de segurança)                               
```
```
git config --list
# Lista todas as configurações ativas: 
```
```
git config --global user.name "Seu Nome"
# Configurar nome de usuário
```
```
git config --global user.email "seu@email.com"
# Configurar email do GitHub
```
```
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
# Iniciar o agente ssh
```
```
ssh-keygen -t ed25519 -C "seu@email.com"
#Gerar nova chave SSH (caso ainda não tenha)
```
```
cat ~/.ssh/id_ed25519.pub
# Mostrar a chave pública para adicionar no GitHub
```
```
git remote set-url origin git@github.com:usuario/repositorio.git
# Troque a URL remota para usar SSH
```
```
ssh -T git@github.com
## 🧪 Teste de conexão com GitHub via SSH 
### Se tudo estiver certo, você verá:
### Hi SEU_USUARIO! You've successfully authenticated..
```


## ⚠️ OBS: VERIFIQUE CONFIG GITHUB CASO NÃO FUNCIONE!
----------------------------------------------------
1. Acesse: https://github.com](https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
----------------------------------------------------

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 🧱 Criar o projeto no Supabase

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto
* Senha do banco
* Região
  
# 🧨 RESET TOTAL DO SUPABASE (DADOS + AUTH + STORAGE)
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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# CRIANDO UM ARQUIVO CONFIG (js/config.js)

##  Pegar as chaves do Supabase
## Vá em Settings
*  🧱 DATA API/Project URL/copiar🧱 
*  🔑 API Keis/anon public key/copiar🔑
*  🧠 Altentication/url config/ coloque o endereço de onde está hospedado
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
```
const dbsupabase = supabase.createClient(
  'SUA_URL_AQUI', 
  'SUA_KEY_AQUI'
)
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# como ler o codigo de barras com a camera

```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>codigo de barras</title>
 </head>
<body>
 <label>Código de Barras (EAN)</label>
   <div style="display: flex; gap: 5px;">
      <input type="text" id="codigo_de_barras" placeholder="0000000000000">
         <button type="button" class="btn-scan" onclick="abrirScanner()">
           <i class="fas fa-camera"></i>
           </button>
                </div>
            </div>
        </div>
        <div id="reader-container" style="display:none;">
            <div id="reader"></div>
            <button class="btn-cancel" onclick="fecharScanner()" style="margin-bottom: 20px;">Fechar Câmera</button>
        </div>
<script>
let html5QrCode; // Variável global para controlar a instância da câmera
/** Inicia a câmera e o processamento de imagem para ler códigos */
window.abrirScanner = function() {
    // Exibe o container onde o vídeo da câmera aparecerá
    const container = document.getElementById('reader-container');
    if (container) container.style.display = 'block';
    // Cria a instância do leitor apontando para o ID 'reader' no HTML
    html5QrCode = new Html5Qrcode("reader");
    // Configurações do Scanner
    const config = { 
        fps: 10,    // Quadros por segundo
        qrbox: 250  // Área de foco da leitura
    };
    // Inicia a câmera traseira ("environment")
    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            // AÇÃO AO LER COM SUCESSO:
            // Preenche o campo de código de barras e fecha a câmera
            const inputCodigo = document.getElementById('codigo_de_barras');
            if (inputCodigo) {
                inputCodigo.value = decodedText;
                // Opcional: emitir um sinal sonoro aqui
                console.log("Código lido: " + decodedText);
            }
            fecharScanner();
        }
    ).catch(err => {
        console.error("Erro ao iniciar câmera: ", err);
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
    });
};

/**  * Para a câmera e limpa a memória  */
window.fecharScanner = function() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            const container = document.getElementById('reader-container');
            if (container) container.style.display = 'none';
            console.log("Câmera desligada.");
        }).catch(err => {
            console.warn("Erro ao parar a câmera: ", err);
        });
    }};
</script>
</body>
</html>
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# login.html
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Login</title>
<script src="js/config.js" defer></script> 
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 80px auto;
}

h2 {
  text-align: center;
}

input, button {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
}

.senha {
  position: relative;
}

.senha span {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}

a {
  cursor: pointer;
  color: #0066cc;
  text-decoration: underline;
}

p {
  text-align: center;
}
</style>
</head>
<body>

<h2 id="titulo">Login</h2>

<input id="email" type="email" placeholder="Email" required>

<div class="senha">
  <input id="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required>
  <span onclick="toggleSenha()">👁️</span>
</div>

<button id="btnAcao" onclick="login()">Entrar</button>

<p>
  <a onclick="mostrarCadastro()">Criar conta</a> |
  <a onclick="resetSenha()">Esqueci minha senha</a>
</p>

<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


<script>


/* ===============================
   UI
================================ */
function toggleSenha() {
  const input = document.getElementById('senha')
  input.type = input.type === 'password' ? 'text' : 'password'
}

/* ===============================
   LOGIN (COM AUDITORIA E CORREÇÕES)
================================ */
async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  // 1. Tenta o login
  const { data, error } = await dbsupabase.auth.signInWithPassword({
    email,
    password: senha
  })

  if (error) {
    alert("Erro: " + error.message)
    return
  }

  // 2. Se logou com sucesso, grava o Log de Auditoria
  if (data.user) {
    try {
      await dbsupabase.from('logs_acesso').insert([
        { 
          usuario_id: data.user.id, 
          user_agent: navigator.userAgent 
        }
      ]);
    } catch (logError) {
      console.error("Erro ao gravar log:", logError);
      // Não bloqueamos o login se o log falhar, para não travar o usuário
    }

    // 3. Redireciona
    window.location.href = 'index.html'
  }
}

/* ===============================
   RESET DE SENHA
================================ */
async function resetSenha() {
  const email = document.getElementById('email').value

  if (!email) {
    alert('Digite seu email para recuperar a senha')
    return
  }

  const { error } = await dbsupabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://aristidesbp.github.io' 
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Email de recuperação enviado!')
}

/* ===============================
   CADASTRO
================================ */
function mostrarCadastro() {
  document.getElementById('titulo').innerText = 'Cadastro'
  const btn = document.getElementById('btnAcao')
  btn.innerText = 'Cadastrar'
  btn.onclick = cadastrar
}

async function cadastrar() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres')
    return
  }

  const { error } = await dbsupabase.auth.signUp({
    email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Cadastro realizado! Verifique seu email para confirmar a conta.')
}
</script>

</body>
</html>

```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# usuarios.sql
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
create table public.usuarios (
  id uuid not null,
  email text not null,
  nome_completo text null,
  avatar_url text null,
  criado_em timestamp with time zone null default now(),
  status text null default 'ativo'::text,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint usuarios_status_check check (
    (
      status = any (
        array['ativo'::text, 'suspenso'::text, 'pendente'::text]
      )
    )
  )
) TABLESPACE pg_default;
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# apolicies
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
* CREATE POLICY "Perfis: usuários podem atualizar apenas o seu" ON usuarios FOR UPDATE TO public USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));
* CREATE POLICY "Perfis: usuários podem ver apenas o seu" ON usuarios FOR SELECT TO public USING ((auth.uid() = id));
* CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON usuarios FOR UPDATE TO public USING ((auth.uid() = id));
* CREATE POLICY "Usuários podem ver seu próprio perfil" ON usuarios FOR SELECT TO public USING ((auth.uid() = id));
```
## COMO FAZER BKP:
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






🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# GITHUB E TERMUX
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# ADICIONANDO COLABORADORES 
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# COMO UTILIZAR O REPOSITORIO FORA DO SITE:
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
``` 
# BAIXAR ATUALIZAÇÃO DO SITE:
git pull origin main 
```
```
# VERIFICAR STATUS DO REPOSITORIO LOCAL:
git status
```
``` 
# ADICIONAR REPOSITÓRIOS À LISTA:
git add .  
```
``` 
# SALVAR PONTO DE ALTERAÇÃO:
git commit -m "DESCRIÇÃO_DA_ALTERACAO" 
```
``` 
# MANDAR ALTERAÇÕES PARA O REPOSITÓRIO:
git push origin main 
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# USANDO GITHUB NO TERMUX (CELULAR ANDROID)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
Faça o download do aplicativo direto no github te instale:
Acesse o link oficial (não use da Play Store)
[TERMUX](https://github.com/termux/termux-app/releases)

```
# ISTO É UM COMENTÁRIO PODE COLAR NO TERMUX!!!
```
```
## ATUALIZE SEU TERMUX:
pkg update && pkg upgrade -y 
```
```
## PERMITA ELE USAR AS PASTAS DO SEU ANDROID:
termux-setup-storage
```
```
## INSTALE AS FERRAMENTAS BÁSICAS PARA A PROGRAMAÇÃO:
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
```
```
ls 
# O comando acima, mostrar conteudo da pasta
```
``` 
ls -a
# para mostrar conteudo o culto da pasta
```
```  
mkdir repositorios_git 
# para criar pasta com o nome repositorios_git
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
cd repositorios_git 
# vai para dentro da pasta repositorios_git
```
``` 
cd .. 
# volta para pasta anterior
```
``` 
rm -rf teste.txt 
# apagar pasta/arquivo
```
``` 
clear 
# usado para limpar a tela
```

---
# GIT-GITHUB 
---
  
```
git --help
# usado para procurar comandos git
```
```
git <comando> --help
# pesquise por comando especifico :
```             
```git init
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
```
```
git config --global --add safe.directory "$(pwd)"
# Configurar a pasta como segura (evita erros de segurança)                               
```
```git config --list
# Lista todas as configurações ativas 
```
```
git config --global user.name "Seu Nome"
# Configurar nome de usuário
```
```
git config --global user.email "seu@email.com"
# Configurar email do GitHub
```
```
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
# Iniciar o agente ssh
```
```
ssh-keygen -t ed25519 -C "seu@email.com"
#Gerar nova chave SSH (caso ainda não tenha)
```
```
cat ~/.ssh/id_ed25519.pub
# Mostrar a chave pública para adicionar no GitHub
```
```
git remote set-url origin git@github.com:usuario/repositorio.git
# Troque a URL remota para usar SSH
```
```
ssh -T git@github.com
## 🧪 Teste de conexão com GitHub via SSH 
### Se tudo estiver certo, você verá:
### Hi SEU_USUARIO! You've successfully authenticated..
```


## ⚠️ OBS: VERIFIQUE CONFIG GITHUB CASO NÃO FUNCIONE!
----------------------------------------------------
1. Acesse: https://github.com](https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
----------------------------------------------------



---
# Clonando um repositório do GitHub
---
 

```
cd nome_do_reposito_clonado
## entra na pasta do repositório 
```
```
git config --global --add safe.directory "$(pwd)"```
## Configurar a pasta como segura (evita erros de segurança)   
```
```
git remote -v
## Mostra os repositórios remotos configurados
## git@github.com:usuario/repositorio.git (fetch).Mostra a URL SSH usada para buscar (fetch) atualizações do repositório remoto. Ou seja, de onde você pode baixar mudanças do GitHub para o seu computador.
## git@github.com:usuario/repositorio.git (push).Mostra a URL SSH usada para enviar (push) suas mudanças locais para o repositório no GitHub.
```
```
git fetch
## Busca atualizações sem aplicar
```
```
git pull origin main
## Sincroniza com o repositório remoto (branch main)
``` 



---
# BRANCHES AS RAMIFICAÇÕES
---

```
git branch
# Lista todas as branches (ramificações) existentes no repositório
```
```
git log
# Exibe histórico de commits com hash, autor e data (PARA SAIR DIGITE: q)
```
``` 
git checkout -b novaBranch numero-do-commit
# Cria uma nova branch a partir de um commit específico e já muda para ela
# Exemplo: git checkout -b novaBranch 2ad9347bba64542687c6
```
```
git branch nome-da-branch
# Cria uma nova branch com o nome informado (sem trocar para ela)
```
```
git checkout -b nova-branch
# Cria uma nova branch e já muda para ela
```
```
git stash
# Salva temporariamente alterações não commitadas (útil antes de trocar de branch)
```
```
git checkout main
# Troca para a branch principal (main)
```
```
git checkout nome-da-branch
# Troca para a branch especificada
```
```
git stash apply
# Recupera alterações salvas com `git stash`
``` 
```
git merge especificar-nome-da-branch
# Une a branch especificada com a branch atual
```
```
git branch -d nome-da-branch
# Deleta a branch local (apenas se já foi mesclada)
```
```
git merge nova-branch
# Junta as alterações da branch "nova-branch" com a atual (ex: main)
```
```
git pull origin main
# Atualiza a branch atual com as últimas alterações do repositório remoto (main)
```


---
# TRABALHANDO COM COMMIT 
---
```
git status
# Mostra o status atual dos arquivos (modificados, novos, deletados)
# digite Q para sair
```
```
git add nome-do-arquivo.ext
# Adiciona um arquivo específico para a área de staging
# OBS: CASO VOCÊ JÁ TENHA CRIADO OU ALTERADO ALGUM ATIVO
```
```
git add .
# Adiciona TODOS os arquivos modificados para o commit
```
```
git commit -m "Mensagem clara e objetiva"
# Cria um commit com a mensagem entre aspas
```
```
git commit -am "Mensagem"
# Adiciona e comita arquivos rastreados (não funciona com novos arquivos)
```
```
git diff
# Mostra as diferenças entre o código atual e o último commit
```
```
git show
# Mostra detalhes do último commit
```
```
git blame nome-do-arquivo
# Mostra linha por linha quem modificou o quê (ótimo para rastrear bugs)
```
```
git tag -a v1.0 -m "Versão 1.0"
# Cria uma tag de versão
```
```
git log --oneline
# Mostra o histórico de forma resumida (1 linha por commit)
```
```
git log
# Exibe histórico de todos os commits com hash, autor e data (PARA SAIR DIGITE: q) 
```
---
# 🧹 CORREÇÕES E AJUSTES 
---
```
git reset nome-do-arquivo
# Remove o arquivo da área de staging (antes do commit)
```
```
git reset --hard HEAD
# Remove todas as alterações e volta ao último commit
```
```
git clean -f
# Remove arquivos não rastreados (novos arquivos que não foram adicionados)
```
```
git revert <id-do-commit>
# Reverte um commit específico sem apagar o histórico
```

---
## 📤   RECEBENDO E ENVIANDO PARA O GITHUB 
---
```
git remote add origin git@github.com:usuario/repositorio.git
# Conecta seu repositório local ao repositório remoto via SSH
```
```
git fetch
# Busca atualizações do repositório remoto (mas não aplica)
```
```
git merge
# Aplica as atualizações buscadas com `git fetch`
```
```
git pull
# Baixa alterações do GitHub para seu projeto local
```
```
git pull origin main --rebase
##  Atualizar seu repositório local com o que está no GitHub:
```
```
git push -u origin main
# Envia o repositório local para o GitHub (main = branch principal)
```
---
# TUTORIAL: COMO RECUPERAR ARQUIVOS EXCLUÍDOS NO GIT:
### OBS: Este tutorial assume que você está dentro do repositório local.
---
```
git log --diff-filter=D --summary
# ETAPA 1 — LOCALIZAR ARQUIVOS DELETADOS
# Exibe o histórico de commits com resumo das alterações,e filtra SOMENTE commits que deletaram arquivos.
# DICA: Use a tecla Q para sair da visualização do log quando quiser.
```
```
git log --summary --name-status | grep -B 10 "editor-de-txt.html
# para buscar especificamente um arquivo que você quer recuperar:
# Neste exemplo, buscamos o arquivo "editor-de-txt.html"
# O parâmetro -B 10 mostra as 10 linhas antes da ocorrência,
# para encontrar o commit completo que removeu o arquivo.
# A saída  mostra algo assim:
# commit 7477572b4f232ee774236f1b58f510d57d0f7de9
# Author: aristidesbp <aristidesbp@gmail.com>
# Date:   Thu May 22 10:01:41 2025 -0300
# Mensagem: atualizarS
# D	editor-de-txt.html
# OBS: Anote o HASH DO COMMIT (exemplo acima: 7477572b4f232ee774236f1b58f510d57d0f7de9)
```
```
git show --name-status --diff-filter=D 7477572b4f232ee774236f1b58f510d57d0f7de9
# Agora você pode usar o comando abaixo para ver todos os arquivos DELETADOS no mesmo commit:
# Exemplo de saída esperada:
# D	editor-de-txt.html
# D	script-antigo.js
# D	css/velho-style.css
```
```
git checkout <HASH_DO_COMMIT>^ -- caminho/do/arquivo
# Para restaurar um arquivo deletado, use o comando:
# O ^ (circunflexo) indica que queremos o arquivo da versão ANTERIOR ao commit que deletou.
# Exemplo real:
# git checkout 7477572b4f232ee774236f1b58f510d57d0f7de9^ -- editor-de-txt.html
# Esse comando recupera o arquivo "editor-de-txt.html" e o adiciona de volta ao diretório atual.
```
```
git add editor-de-txt.html
# Após restaurar o arquivo, você deve adicioná-lo novamente ao controle de versão:
```
```
git commit -m "Recuperar arquivo editor-de-txt.html que havia sido deletado"
# Agora salve com um novo commit:
```
### PRONTO! O arquivo está de volta no seu projeto.
### CONCLUSÃO:
Usando Git, você pode recuperar QUALQUER arquivo que foi deletado
. Em qualquer ponto do histórico, mesmo que não saiba o commit exato.
. Sempre use git log e git show para investigar o histórico.
. Lembre-se: o Git guarda tudo. 😉

---
# ✅ 1. Voltar temporariamente a um commit (modo detached HEAD) Pressione q para sair da visualização.
---
```
git log
# Use o comando abaixo para listar o histórico de commits no (pc): assim você encontra o ID
```
```
git checkout <id_do_commit>
# Esse modo é útil apenas para explorar um commit antigo sem alterar o histórico da branch atual.
# Exemplo: git checkout a1b2c3d ⚠️ Neste modo, você não está em nenhuma branch. Se fizer alterações aqui, precisará criar uma nova branch para não perder seu trabalho.
```

---
# ✅ 2. Voltar permanentemente a um commit (desfazendo commits posteriores)
---
```
git reset --soft <id_do_commit>
# Opção A: Reset "soft" – mantém as alterações no stage
```
```
git reset <id_do_commit>
# Opção B: Reset "mixed" (padrão) – mantém alterações nos arquivos, mas remove do stage
```
```
git reset --hard <id_do_commit>
# Opção C: Reset "hard" – apaga tudo (perigoso!)
#⚠️ Atenção: Se você fizer --hard, todo o trabalho feito depois do commit escolhido será perdido, a menos que esteja salvo em algum lugar (como no GitHub ou em um branch separado).
#💡 Dica de segurança: Antes de usar reset --hard, é recomendado criar uma branch backup:(git branch backup-antes-do-reset) Assim, você pode recuperar os commits caso precise
```

---
# ✅ 3. Criar uma nova branch a partir de um commit antigo
---
```
git checkout -b nova-branch <id_do_commit>
# Se quiser preservar o histórico e começar uma nova linha de desenvolvimento a partir de um commit antigo:
# Exemplo: git checkout -b teste-antigo a1b2c3d
```

---
# CRIANDO UM SERVIDOR COM PYTHON 
---


# Passo 1: Instalar o Python

Se você já instalou o Termux  (CONFIGUROU E ATUALIZOU)
```
cd pasta_do_arquivo
# Navegue até a pasta onde seus arquivos estão 
```
```
python -m http.server 8080
# Ele inicia um servidor web simples na porta 8080:
# O Termux agora mostrará a mensagem: Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```
# Como Acessar o Site no Navegador
Abra o navegador do seu celular (Chrome, Firefox, etc.).
Digite o seguinte endereço na barra de URL:

```
http://localhost:8080/admin.html
```

O Painel Administrativo agora deve carregar, e o JavaScript (Bloco 6) deve funcionar, permitindo que você clique no botão para adicionar campos e que o localStorage funcione corretamente.

Para parar o servidor, volte para o Termux e pressione 
#### Ctrl + C.

# FIREBASE

```
# Instalando o Firebase
pkg update && pkg upgrade
pkg install nodejs git -y
npm install -g firebase-tools
firebase login
```
```
# Atualiza o Firebase CLI para a versão mais recente
npm install -g firebase-tools
# Verifica se a instalação foi concluída e mostra a versão atual
firebase --version

```
```
# Cria uma nova pasta para seu projeto (exemplo: delivery)
mkdir delivery && cd delivery
```
```
# Inicializa o projeto Firebase dentro dessa pasta
firebase init
```
```
# Durante o "firebase init":
# - Escolha: "Hosting" (pressione espaço para marcar e Enter para confirmar)
# - Escolha: "Use an existing project" (se já criou no site do Firebase)
# - Ou: "Create a new project" (para criar agora)
# - Defina a pasta pública (geralmente "public" ou "dist")
# - Escolha "No" quando perguntar sobre SPA (single page app)
# - Escolha "Yes" para sobrescrever index.html se quiser um novo
```
```
# 4️⃣ Depois de configurar, você pode testar o deploy:
firebase deploy
```


---
# BAIXAR VIDEOS
# INSTALE O yt-dlp:
-------------------------------------------------------
Agora instale o yt-dlp com o comando:
```
pip install yt-dlp
```
-------------------------------------------------------
4. (OPCIONAL) INSTALE O FFMPEG:
-------------------------------------------------------
O ffmpeg permite baixar vídeos com áudio ou converter formatos:
```
pkg install ffmpeg -y
```
-------------------------------------------------------
5. COMANDOS PARA BAIXAR VÍDEOS:
-------------------------------------------------------

# Comando básico para baixar vídeo:
```
yt-dlp "URL_DO_VÍDEO"
```
# Exemplo:
```
yt-dlp "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```
-------------------------------------------------------
6. COMANDOS OPCIONAIS:
-------------------------------------------------------

# Baixar apenas o áudio em MP3:
```
yt-dlp -x --audio-format mp3 "URL_DO_VÍDEO"
```
# Escolher qualidade de vídeo (exemplo: 720p):
```
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "URL_DO_VÍDEO"
```
# Salvar com nome personalizado:
```
yt-dlp -o "meu_video.%(ext)s" "URL_DO_VÍDEO"
```
# Ver formatos disponíveis:
```
yt-dlp -F "URL_DO_VÍDEO"
```
-------------------------------------------------------
DICA EXTRA:
-------------------------------------------------------
Você pode criar um script `.sh` com esses comandos para facilitar o processo com menus interativos.

Se quiser ajuda para isso, me avise!

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIANDO BANCO DE DADOS NO SUPABASE
https://supabase.com
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIAR TABELA entidades
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
```
create table public.entidades (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid null,
  nome_completo text null,
  bio text null,
  avatar_url text null,
  senha_user text null,
  telefone text null,
  endereco text null,
  data_nascimento text null,
  cpf_cnpj text null,
  insc_estadual text null,
  status text null,
  relacionamento text null,
  email text null,
  nivel_acesso text null,
  cep text null,
  bairro text null,
  cidade text null,
  prontuario text null,
  uf text null,
  insc_municipal text null,
  constraint usuario_pkey primary key (id),
  constraint usuario_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
## FUNCTION TRIGGER (data base/funcoes)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
``` 
crie uma função trigger para ser implementada no Supabase com o seguinte objetivo:
A cada novo usuario que for criado no schema auth, deve ser criado o mesmo usuario no schema public na tabela abaixo.

(entre na tabela/ cantoinferio direto/ definitions (codigo da tabela criada acima))
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
## FUNCTION TRIGGER
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
``` 
-- 1. Criar a função que será executada pelo gatilho
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.entidades (
    user_id,
    email,
    nome_completo,
    status,
    relacionamento -- Definido como 'Usuário' ou 'Colaborador' por padrão
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name', -- Tenta pegar o nome se vier do metadata (ex: Google Auth)
    'Ativo',
    'Usuário'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Criar o gatilho na tabela auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIAR APOLICE 
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
```
-- Cria a política que permite ao usuário gerenciar apenas os seus fornecedores
CREATE POLICY "Acesso total aos próprios fornecedores" 
ON public.fornecedores 
FOR ALL 
USING (auth.uid() = usuario_id);
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIANDO UMA VISUALIZAÇÃO COM VIEWS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
## PROMPT PARA CRIAR VIEWS:
```
Crie uma view chamada "v_sevicos_destaque" que liste os serviços com o nome
da categoria e detalhes do autor que esta na tabela de usuarios. Alem disso, 
caucule a media das notas (use ) se nao houver) e o total de avaliçoes recebidas por cada serviço.
Conforme o schema do banco de dados que vou te passar abaixo:

Obs: Ja acrescente with (security_invoker) logo depois do nome da view, para criar uma segurança.

[cole aqui o schema fica em: menu lateral/ Database/ no canto superior direi opção Copy as SQL]
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# conexao.js
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
```
/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão Final Corrigida - Responsiva)
 * Segurança + SDK Auto-load + Navbar + Controle de Sessão */

(async () => {
    "use strict";

    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        SUPABASE_KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX',
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "index.html",
        HUB_PAGE: "https://aristidesbp.github.io/",
        APP_NAME: "ERP ABP",
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    });

    async function carregarSDK() {
        if (window.supabase) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.SDK_URL;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Falha ao carregar SDK do Supabase"));
            document.head.appendChild(script);
        });
    }

    try {
        await carregarSDK();
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        }

        async function validarSessao() {
            try {
                const { data, error } = await _supabase.auth.getSession();
                if (error || !data || !data.session) throw new Error();
                return data.session;
            } catch (e) {
                window.location.replace(CONFIG.LOGIN_PAGE);
                return null;
            }
        }

        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            try { await _supabase.auth.signOut(); } finally { window.location.replace(CONFIG.LOGIN_PAGE); }
        }

        function renderNavbar() {
            if (document.querySelector(".erp-navbar")) return;
            const style = `
                <style>
                    /* Reset básico para a Navbar */
                    .erp-navbar, .erp-navbar * { box-sizing: border-box; }

                    .erp-navbar { 
                        position: fixed; top: 0; left: 0; width: 100%; 
                        background: #fff; padding: 10px 15px; 
                        display: flex; justify-content: space-between; align-items: center; 
                        box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; 
                        font-family: sans-serif; 
                    }
                    .erp-navbar .brand { 
                        font-weight: bold; color: #0f172a; font-size: 1.1rem; 
                        display: flex; align-items: center; gap: 5px; 
                        white-space: nowrap;
                    }
                    .erp-navbar .nav-right { display: flex; gap: 8px; flex-wrap: nowrap; }
                    
                    .erp-navbar .btn { 
                        padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; border: none; 
                        cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; 
                        gap: 5px; transition: 0.3s; white-space: nowrap; color: white;
                    }
                    .erp-navbar .btn-logout { background: #ef4444; }
                    .erp-navbar .btn-home { background: #3ecf8e; }
                    
                    /* Ajustes para Celular */
                    @media (max-width: 600px) {
                        .erp-navbar { padding: 8px 10px; }
                        .erp-navbar .brand { font-size: 0.9rem; }
                        .erp-navbar .btn span { display: none; } /* Esconde o texto, deixa só o ícone no celular se ficar apertado */
                        .erp-navbar .btn { padding: 8px 12px; font-size: 14px; }
                    }

                    body.erp-guard-active { padding-top: 70px !important; }
                </style>`;

            const html = `
                <div class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i> <span>Projetos</span></a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> <span>Início</span></a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> <span>Sair</span></button>
                    </div>
                </div>`;

            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", async () => {
                const session = await validarSessao();
                if (session) renderNavbar();
            });
        } else {
            const session = await validarSessao();
            if (session) renderNavbar();
        }

    } catch (err) {
        console.error("Erro crítico no Guard:", err);
    }
})();

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# bloco_de_notas
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bloco de Notas - ERP ABP</title>
    
    <script src="conexao.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary: #3ecf8e;
            --dark: #0f172a;
            --bg: #f1f5f9;
            --danger: #e74c3c;
            --warning: #f1c40f;
            --gray: #94a3b8;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: var(--bg);
            padding: 20px;
        }

        .container {
            max-width: 700px;
            margin: 40px auto;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        h2 { color: var(--dark); margin-top: 0; }

        textarea, input[type="text"] {
            width: 100%;
            margin-bottom: 15px;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        textarea:focus, input:focus {
            outline: none;
            border-color: var(--primary);
        }

        .btn-save {
            background: var(--primary);
            color: white;
            padding: 15px;
            border: none;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
            border-radius: 8px;
            font-size: 16px;
            transition: 0.3s;
        }

        .btn-save:hover { filter: brightness(1.1); }

        /* Estilo do Novo Botão de Cancelar */
        .btn-cancel {
            background: var(--gray);
            color: white;
            padding: 12px;
            border: none;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
            border-radius: 8px;
            font-size: 14px;
            margin-top: 10px;
            display: none; /* Escondido por padrão */
            transition: 0.3s;
        }

        .btn-cancel:hover { background: #64748b; }

        .note {
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .note-content strong {
            color: #1e293b;
            font-size: 1.1em;
            display: block;
            margin-bottom: 5px;
        }

        .note-content p {
            color: #64748b;
            margin: 0;
            line-height: 1.5;
            white-space: pre-wrap;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .actions button {
            padding: 8px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            color: white;
            transition: 0.2s;
        }

        .actions button:hover { opacity: 0.8; }

        .search-box {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }

        .export-btn {
            width: 100%;
            background: #2c3e50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2 id="form-title">Minhas Notas</h2>
        <input type="hidden" id="note-id">
        <input type="text" id="title" placeholder="Título da nota...">
        <textarea id="content" rows="4" placeholder="Escreva algo importante..."></textarea>

        <button class="btn-save" id="btn-save" onclick="saveNote()">
            Salvar Nota
        </button>
        
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">
            Cancelar Edição
        </button>

        <div class="search-box">
            <label style="font-size: 12px; font-weight: bold; color: #64748b;">PESQUISAR OU EXPORTAR</label>
            <input type="text" id="search" placeholder="🔍 Digite para buscar..." onkeyup="filterNotes()">
            <button class="export-btn" onclick="exportAllToPDF()">
                <i class="fas fa-file-pdf"></i> Exportar Notas para PDF
            </button>
        </div>

        <div id="notes-list"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <script>
        /** ERP ABP - Bloco de Notas Integrado **/
        (function() {
            "use strict";

            let allNotes = [];

            // 1. Aguarda a conexão com Supabase do conexao.js
            async function init() {
                if (!window._supabase) {
                    setTimeout(init, 200);
                    return;
                }
                loadNotes();
            }

            // 2. Carregar Notas
            async function loadNotes() {
                const { data, error } = await _supabase
                    .from('notes')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) return console.error("Erro:", error);
                allNotes = data || [];
                renderNotes(allNotes);
            }

            // 3. Renderizar Lista
            function renderNotes(notes) {
                const list = document.getElementById('notes-list');
                list.innerHTML = notes.map(n => `
                    <div class="note">
                        <div class="note-content">
                            <strong>${n.title}</strong>
                            <p>${n.content}</p>
                        </div>
                        <div class="actions">
                            <button style="background:var(--warning)" onclick="window.prepareEdit('${n.id}')"><i class="fas fa-edit"></i></button>
                            <button style="background:var(--danger)" onclick="window.deleteNote('${n.id}')"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('') || '<p style="text-align:center; color:#94a3b8;">Nenhuma nota encontrada.</p>';
            }

            // 4. Salvar ou Atualizar
            window.saveNote = async function() {
                const id = document.getElementById('note-id').value;
                const title = document.getElementById('title').value;
                const content = document.getElementById('content').value;

                if (!title || !content) return alert("Por favor, preencha o título e o conteúdo.");

                const { data: { user } } = await _supabase.auth.getUser();

                if (id) {
                    await _supabase.from('notes').update({ title, content }).eq('id', id);
                } else {
                    await _supabase.from('notes').insert([{ title, content, user_id: user.id }]);
                }

                resetForm();
                loadNotes();
            };

            // 5. Preparar Edição
            window.prepareEdit = function(id) {
                const note = allNotes.find(n => n.id === id);
                if (!note) return;

                document.getElementById('note-id').value = note.id;
                document.getElementById('title').value = note.title;
                document.getElementById('content').value = note.content;
                
                document.getElementById('form-title').innerText = "Editando Nota";
                document.getElementById('btn-save').innerText = "Atualizar Nota";
                document.getElementById('btn-cancel').style.display = 'block';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // 6. Resetar Formulário (Função Cancelar)
            window.resetForm = function() {
                document.getElementById('note-id').value = '';
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
                
                document.getElementById('form-title').innerText = "Minhas Notas";
                document.getElementById('btn-save').innerText = "Salvar Nota";
                document.getElementById('btn-cancel').style.display = 'none';
            };

            // 7. Excluir Nota
            window.deleteNote = async function(id) {
                if (confirm("Tem certeza que deseja excluir esta nota?")) {
                    await _supabase.from('notes').delete().eq('id', id);
                    loadNotes();
                }
            };

            // 8. Busca
            window.filterNotes = function() {
                const q = document.getElementById('search').value.toLowerCase();
                renderNotes(allNotes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
            };

            // 9. PDF
            window.exportAllToPDF = function() {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.setFontSize(18);
                doc.text("Relatório de Notas - ERP ABP", 10, 20);
                
                doc.setFontSize(12);
                let y = 35;
                allNotes.forEach((n, i) => {
                    if (y > 270) { doc.addPage(); y = 20; }
                    doc.setFont(undefined, 'bold');
                    doc.text(`${i + 1}. ${n.title}`, 10, y);
                    doc.setFont(undefined, 'normal');
                    const textLines = doc.splitTextToSize(n.content, 180);
                    doc.text(textLines, 10, y + 7);
                    y += (textLines.length * 7) + 15;
                });
                doc.save("notas_erp_abp.pdf");
            };

            document.addEventListener('DOMContentLoaded', init);
        })();
    </script>
</body>
</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# entidades.html
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>
    <script src="conexao.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plug

