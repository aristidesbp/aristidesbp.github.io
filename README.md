# Aristidesbp

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)

## 💼 PROJETOS 
[ERPABP](https://aristidesbp.github.io/projetos/erpabp/)
[Barraca de Tapioca](https://aristidesbp.github.io/projetos/tapioca/)

## 📓🗃️ MATERIAL DE APOIO
[GITHUB E TERMUX](#_GITHUB_E_TERMUX)





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
git clone git@github.com:usuario/repositorio.git
## Clona o repositório com chave SSH
```
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



