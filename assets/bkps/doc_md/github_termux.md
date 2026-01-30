
  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# GITHUB VERSIONAMENTO DE PROJETO / ADICIONANDO COLABORADORES 
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

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# 01.1
# BUSCANDO UM NICHO E ELABORANDO UM NEGÓCIO COM IA
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  

Neste  tutorial, vamos atacar um nicho de criação de sites e gestão de tráfego pago, utilizaremos o chat GPT com os seguintes prompts abaixo:

# APRESENTAÇÃO DA LOJA/SERVIÇÕS
```
Ola, [Sou AristidesBP], [Moro em Belém do Pará , Brasil] , tenho uma empresa de  [ de criação de sites e gestor de trafego pago] para um público
super exigente. Pretendo fazer uma campanha no Google Ads, logo eu preciso saber as informações que vou te passar abaixo, porfavor não utilize caixas de testo.
```
# PESQUISAR PUBLICO ALVO (PERSONA)
```
Quero saber as  Dores, Desejos, as principais Objeções e as principais Motivações para Compra. 
Traga isso listado por topico de cada pergunta.
```
# PALAVRAS CHAVES
```
Agora quero criar uma campahna no google ADS paera vender este serviço. Me ajude trazendo as 10 palavras chaves mais usadas para pesquisa no
google, de quem deseja comprar este servoço.
```

# [FAZER UMA PLANILHA PARA ANALIZAR AS PALAVRAS CHAVES]:
```
(1) Quero construir uma lista de cards para verificar cada uma das palavras chaves.
(2) Faça uma lista em forma de cardes com as seguintes informações para cada uma das palavras:
palavra-chave, busca por mês, CPC medio ,Custo do Tráfego, Concorrência, Relação com a solução (intenção de compra,maioria quer comprar,buscando solução,pesquisando o problema),Relação de Intencionalidade (Exclusiva,70%,50%,baixa intencionalidade),Relação site/ palavra chaves.
(3) organize a lisata ou tabela começando da melhor para pior.
```

#  PALAVRAS NEGATIVAS
```
Quero construir outra lista ou tabela para verificar cada uma das palavras negativas.
1- Faça uma planilha ou Tabela com as seguintes colunas: palavra-negativas, motivo.

## EXEMPLO:
| Palavra-negativa    | Motivo                                                         |
|---------------------|----------------------------------------------------------------|
| grátis              | Usuários buscando soluções sem pagar, sem intenção de compra   |
| tutorial            | Pessoas querendo aprender, não contratar                       |
| curso               | Interesse em aprender tráfego pago, não em contratar gestor    |
| pdf                 | Busca por material gratuito ou informativo                     |
| exemplo             | Usuários querendo modelos ou ideias, não serviços              |
| amostra             | Busca por algo sem custo ou demonstração gratuita              |
| como fazer          | Interesse em executar por conta própria                        |
| ferramenta gratuita | Procurando ferramentas e não serviços profissionais            |
| sem custo           | Busca por alternativas gratuitas                               |
| dicas               | Usuários querendo informações e não serviço pago               |

```

# FAZER UMA PLANILHA PARA SERAPARA AS PALAVRAS-CHAVES POR TIPO DE SOLUÇÃO E INTERESSE
```
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras-chaves.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-chaves, tipo de solução, interesse.

## EXEMPLO:
| Palavra-chave                        | Tipo de Solução                     | Interesse                              |
|--------------------------------------|--------------------------------------|---------------------------------------|
| gestor de tráfego pago               | Serviço profissional                 | Alta intenção de contratação          |
| especialista em tráfego pago         | Serviço profissional                 | Alta intenção de contratação          |
| consultoria de tráfego pago          | Consultoria e estratégia             | Média-alta intenção                   |
| tráfego pago para e-commerce         | Solução para e-commerce              | Média intenção                        |
| gerenciamento de anúncios Google Ads| Gestão de campanhas Google Ads       | Alta intenção de contratação           |
| agência de tráfego pago              | Agência especializada                | Alta intenção de contratação          |
| profissional de tráfego pago         | Serviço individual                   | Média intenção                        |
| tráfego pago para vendas online      | Solução para aumento de vendas       | Média intenção                        |
| otimização de campanhas Google Ads   | Serviço de otimização                | Média intenção                        |
| tráfego pago para empresas           | Solução B2B                          | Média-alta intenção                   |
```
# ESCOLHENDO  INFORMAÇÕES:
```
Quais são as principais informações, dentro do que você pesquisou sobre esta persona, que se esta persona souber ela compra de mim?
Liste da mais importante para a menus importante.

```

# CRIANDO ANUNCIOS
```
 Com base nas pesquisas realizadas , faça um anuncio com 4 tituloas (no maximo 30 caracteres cada um) e 2 descrições (com no maximo 90 caracteres cada uma):
(1) GOOGLE ADS É DIFERENTE DO META ADS, ELE TEM UMA HIERARQUIA NA ESTRUTURA DE CAMPANHAS QUE DEVE SER RESPEITADA,UM ANUNCIO BEM FEITO E QUASE GRARANTIA DE VENDAS !!
(2) NO CONJUNTO DAS PALAVRAS NO MINIMO 10K DE BUSCA MES!
# PARA CADA SOLUÇÃO UMA CAMPANHA.
# PARA CADA INTERESSE , DA MESMA SOLUÇÃO UM GRUPO DE ANUNCIOS.

```
# BÔNUS:GERAR IMAGEM Perchance 
https://perchance.org/ai-text-to-image-generator
escolha o modelo “Flux” ou “SDXL” se aparecer opção – eles dão mais nitidez


# BÔNUS: Site comercial venda de serviços 
Obs: ao baixar verifique o endereço das pastas para salvar a imagem no código.
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Criação de Sites & Tráfego Pago – AristidesBP</title>
<meta name="description" content="Aumente suas vendas com um site profissional e campanhas de tráfego pago otimizadas.">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Gemunu+Libre:wght@200&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    :root {
      --primary: #f97316;
      --dark: #1a1a1a;
      --light: #f5f5f5;
      --gray: #777;
    }
    * { margin:0; padding:0; box-sizing:border-box; font-family:'DM Sans', sans-serif; }
    body { background:var(--light); color:var(--dark); line-height:1.6; overflow-x:hidden; }
    nav { position:fixed; top:0; width:100%; background:#fff; box-shadow:0 2px 5px rgba(0,0,0,0.1); z-index:1000; display:flex; justify-content:space-between; align-items:center; padding:10px 30px; }
    nav h2 { color:var(--primary); font-size:1.2rem; }
    nav ul { list-style:none; display:flex; gap:20px; }
    nav ul li a { text-decoration:none; color:var(--dark); font-weight:600; }
  
  

header { background:linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/header.jpg') center/cover no-repeat; color:#fff; text-align:center; padding:120px 20px; }
   
header h1 { font-size:3rem; margin-bottom:10px; }
    header p { font-size:1.2rem; margin-bottom:20px; }
    header a { background:var(--primary); color:#fff; padding:12px 30px; text-decoration:none; border-radius:30px; font-weight:600; }
    


section { padding:80px 20px; text-align:center; }
    .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:20px; margin-top:40px; }
    .card { background:#fff; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
    .card h3 { color:var(--primary); margin-bottom:15px; }
    .card img { width:100%; border-radius:10px; margin-bottom:15px; }
    .contact form { max-width:600px; margin:auto; display:flex; flex-direction:column; gap:15px; }
    .contact input,.contact textarea,.contact select { padding:15px; border:1px solid #ddd; border-radius:5px; font-size:1rem; }
    .contact button { background:var(--primary); color:#fff; padding:15px; border:none; border-radius:30px; font-weight:600; cursor:pointer; }
    footer { background:var(--dark); color:#fff; text-align:center; padding:20px; margin-top:40px; }
    footer a { color:#fff; text-decoration:none; margin:0 10px; }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav>
    <h2>AristidesBP</h2>
    <ul>
      <li><a href="#about">Sobre</a></li>
      <li><a href="#services">Serviços</a></li>
      <li><a href="#contact">Contato</a></li>
    </ul>
  </nav>

  <!-- HEADER -->
  <header>
    <h1>Transforme seu Negócio Online!</h1>
    <p>Sites profissionais + campanhas de tráfego pago que geram vendas reais.</p>
    <a href="#contact">Quero Meu Site Agora</a>
  </header>

  <!-- SOBRE -->
  <section id="about">
    <h2>Por Que Escolher AristidesBP?</h2>
    <p>Profissional especializado em criação de sites que convertem e gestão de tráfego pago para empresas exigentes. Resultados reais, transparência e suporte próximo.</p>
 
<!-- CARDS --> 
<div class="cards">
     
<!-- CARD01 --> 
<div class="card">
<img src="img/card01.jpg" alt="Resultados">
<h3>Resultados Garantidos</h3>
<p>Sites que vendem e campanhas de ads otimizadas para gerar ROI real.</p>
</div>
 
<!-- CARD02 -->
<div class="card">
<img src="img/card02.jpg" alt="Profissionalismo">
<h3>Profissionalismo</h3>
<p>Mais de 10 anos de experiência, portfólio de clientes satisfeitos.</p>
      </div>
      
<!-- CARD03 -->
<div class="card">
        <img src="img/card03" alt="Suporte">
        <h3>Suporte Personalizado</h3>
        <p>Acompanhamento próximo, ajustes estratégicos e relatórios claros.</p>
      </div>
      
<!-- CARD04 -->
<div class="card">
        <img src="img/CARD04.jpg" alt="Exclusividade">
        <h3>Exclusividade</h3>
        <p>Projetos sob medida, alinhados com o posicionamento da sua empresa.</p>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS -->
  <section id="services">
    <h2>Serviços</h2>
    <div class="cards">
     
<!-- CARD05 -->
 <div class="card">
        <img src="img/card05.jpg" alt="Sites Profissionais">
        <h3>Criação de Sites Profissionais</h3>
        <p>Design moderno, responsivo e otimizado para conversão de clientes.</p>
      </div>

<!-- CARD06 -->
      <div class="card">
        <img src="img/CARD06.jpg" alt="Tráfego Pago">
        <h3>Gestão de Tráfego Pago</h3>
        <p>Campanhas no Google Ads e redes sociais, maximizando resultados.</p>
      </div>

<!-- CARD07 -->
      <div class="card">
        <img src="img/card07.jpg" alt="Consultoria">
        <h3>Consultoria Estratégica</h3>
        <p>Planejamento e análise de resultados para escalar seu negócio online.</p>

</div>
    </div>
  </section>

<!-- VÍDEO -->
<section id="video">
  <h2>Assista Nosso Vídeo</h2>
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      title="Vídeo Institucional" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</section>

<style>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  margin: 20px auto;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
  <!-- FORMULÁRIO / CONTRATO -->
  <section id="contact" class="contact">
    <h2>Contrato de Prestação de Serviços</h2>
    <p>Ao enviar o formulário você aceita a prestação do serviço de criação de site + gestão de tráfego pago. Será gerado o custo de <strong>R$50,00</strong> para visita técnica e relatório do projeto.</p>
    <form id="contact-form">
      <input type="text" id="nome" placeholder="Nome Completo" required>
      <input type="email" id="email" placeholder="Email" required>
      <input type="tel" id="telefone" placeholder="Telefone" required>
      <textarea id="mensagem" rows="5" placeholder="Descrição do Projeto / Informações adicionais" required></textarea>
      <label><input type="checkbox" id="aceite" required> Aceito os termos e condições do contrato e autorizo o pagamento de R$50,00 para visita técnica.</label>
      <button type="submit">Enviar para WhatsApp e Confirmar Contrato</button>
    </form>
  </section>

<!-- FOOTER -->
  <footer>
    <p>Contatos e Redes Sociais</p>
    <p>WhatsApp: <a href="https://wa.me/5591992420981" target="_blank">+55 91 99242-0981</a> | Email: contato@aristidesbp.com</p>
    <p>
      <a href="#" target="_blank">Facebook</a> | 
      <a href="#" target="_blank">Instagram</a> | 
      <a href="#" target="_blank">LinkedIn</a>
    </p>
    <p>&copy; 2025 AristidesBP. Todos os direitos reservados.</p>
  </footer>

  <!-- ===== JAVASCRIPT ===== -->
  <script>
    // Função para enviar formulário para WhatsApp
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const mensagem = document.getElementById("mensagem").value;
      const aceite = document.getElementById("aceite").checked;

      if(!aceite){
        alert("Você precisa aceitar os termos do contrato para continuar.");
        return;
      }

      const texto = `*Contrato de Prestação de Serviços*%0A
Nome: ${nome}%0A
Email: ${email}%0A
Telefone: ${telefone}%0A
Mensagem: ${mensagem}%0A
Aceite dos Termos: Sim%0A
Custo Visita Técnica: R$50,00`;

      // Abre WhatsApp no número fornecido
      window.open(`https://wa.me/5591992420981?text=${texto}`, "_blank");

      alert("Formulário enviado! Aguarde nosso contato via WhatsApp.");
      form.reset();
    });
  </script>
</body>
</html>
```


# BONUS: cardápio online para lanchonetes e restaurantes
### ESTRUTURA DE PASTAS DO PROJETO: 
http://aristidesbp.github.io/projeto/tapioca/index.html
```
|── index.html
├── admin2.html
├── assets
    ├── img
    │   └── logo.jpg                        
    │   └── produtos
    │       ├── banana.jpg
    │       ├── carne-seca.jpg
    │       ├── coca.jpg                     
    │       ├── morango.jpg               
    │       ├── presunto.jpg
    │       ├── salada.jpg
    │       └── suco.jpg
    └── produtos.json

```

### cardapio.html
```
<!DOCTYPE html>
<html lang="pt-br" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Delivery - Aristidesbp</title>
<script src="https://cdn.tailwindcss.com"></script>

<style>
:root {
  --bege-claro:#fff8e1;
  --vermelho-telha:#b22222;
  --amarelo-mostarda:#f7d84f;
  --marrom-madeira:#8b4513;
  --preto-quadro:#1a1a1a;
}
body { scroll-behavior:smooth; }
.filtro-categoria {
  background:var(--amarelo-mostarda);
  font-weight:bold;
  padding:10px 20px;
  border:2px solid var(--marrom-madeira);
  border-radius:8px;
}
.busca {
  width:100%;
  margin-top:12px;
  padding:12px;
  border-radius:8px;
  border:2px solid var(--marrom-madeira);
}
.campo {
  width:100%; padding:12px;
  border-radius:8px; border:none;
}
.botao {
  background:var(--amarelo-mostarda);
  padding:12px 24px;
  font-weight:600;
  border-radius:8px;
}

.busca {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid var(--marrom-madeira);
  background: #fff;
  color: #000;
}
</style>
</head>

<body class="bg-[var(--bege-claro)] text-[var(--preto-quadro)]">

<header class="bg-[var(--vermelho-telha)] text-white text-center py-6">
  <img src="assets/img/logo.jpg" class="w-full h-64 object-cover">
  <h1 class="text-4xl font-bold mt-4">Tapioca da Maria</h1>
  <p>Seu lanche artesanal favorito!</p>

  <div class="mt-4 px-4 max-w-md mx-auto">
    <select id="filtroCategoria" class="filtro-categoria w-full">
      <option value="todos">Todos</option>
      <option value="lanches">Lanches</option>
      <option value="bebidas">Bebidas</option>
      <option value="sobremesas">Sobremesas</option>
    </select>

    <input
      type="text"
      id="buscaProduto"
      class="busca"
      placeholder="Buscar produto pelo nome..."
    >
  </div>
</header>

<section class="container mx-auto px-4 py-8">
  <h2 class="text-2xl font-bold mb-6 text-[var(--marrom-madeira)]">Nosso Cardápio</h2>
  <div id="menu" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
</section>

<section class="bg-[var(--preto-quadro)] text-white py-8 px-4">
<div class="container mx-auto">

<p class="text-lg font-bold mb-4">
Total do pedido: R$ <span id="total">0,00</span>
</p>

<div id="itens-pedido" class="space-y-2 mb-6"></div>

<form id="pedido-form" class="space-y-4">
<input id="nome" placeholder="Nome Completo" class="campo" required>
<input id="telefone" placeholder="Telefone" class="campo" required>
<input id="endereco" placeholder="Endereço" class="campo" required>

<select id="formaPagamento" class="campo" required>
<option disabled selected>Forma de Pagamento</option>
<option>Dinheiro</option>
<option>Pix</option>
<option>Cartão</option>
</select>

<textarea id="obs" placeholder="Observações" class="campo"></textarea>
<button class="botao">Enviar pedido via WhatsApp</button>
</form>

</div>
</section>

<script>
const menuEl = document.getElementById("menu");
const filtro = document.getElementById("filtroCategoria");
const busca = document.getElementById("buscaProduto");
const itensEl = document.getElementById("itens-pedido");
const totalEl = document.getElementById("total");

let produtos = [];
let carrinho = [];

fetch("assets/produtos.json")
.then(r => r.json())
.then(d => { produtos = d; renderMenu(); });

function renderMenu() {
  const cat = filtro.value;
  const termo = busca.value.toLowerCase();

  menuEl.innerHTML = "";
  produtos
  .filter(p =>
    (cat==="todos" || p.categoria.toLowerCase()===cat) &&
    p.nome.toLowerCase().includes(termo)
  )
  .forEach(p => {
    const div = document.createElement("div");
    div.className="bg-white p-4 rounded shadow";
    div.innerHTML=`
      <img src="${p.imagem}" class="h-48 w-full object-cover rounded mb-2">
      <strong>${p.nome}</strong>
      <p>${p.desc||""}</p>
      <span>R$ ${p.preco.toFixed(2)}</span>
      <button class="mt-2 bg-yellow-400 w-full py-2 rounded">Adicionar</button>
    `;
    const btn = div.querySelector("button");
    btn.onclick = () => adicionar(p,btn);
    menuEl.appendChild(div);
  });
}

function adicionar(p,btn){
  const item = carrinho.find(i=>i.id===p.id);
  if(item) item.qtd++;
  else carrinho.push({...p,qtd:1});

  btn.textContent="Adicionado ✓";
  setTimeout(()=>btn.textContent="Adicionar",800);
  atualizarCarrinho();
}

function atualizarCarrinho(){
  itensEl.innerHTML="";
  let total=0;

  carrinho.forEach((i,idx)=>{
    total += i.preco * i.qtd;
    itensEl.innerHTML += `
    <div class="flex items-center justify-between bg-gray-800 p-2 rounded">
      <span>${i.nome} (x${i.qtd})</span>
      <div class="flex gap-2">
        <button onclick="menos(${idx})">➖</button>
        <button onclick="mais(${idx})">➕</button>
        <button onclick="remover(${idx})">❌</button>
      </div>
    </div>`;
  });

  totalEl.textContent = total.toFixed(2);
}

function mais(i){ carrinho[i].qtd++; atualizarCarrinho(); }
function menos(i){
  carrinho[i].qtd--;
  if(carrinho[i].qtd<=0) carrinho.splice(i,1);
  atualizarCarrinho();
}
function remover(i){
  carrinho.splice(i,1);
  atualizarCarrinho();
}

filtro.onchange = renderMenu;
busca.oninput = renderMenu;
</script>

</body>
</html>
```
### produtos.json
```
[
  {
    "id": 1,
    "nome": "Tapioca de Carne Seca",
    "descricao": "Carne seca com queijo",
    "preco": 18,
    "categoria": "lanches",
    "imagem": "assets/img/produtos/carne-seca.jpg"
  },
  {
    "id": 2,
    "nome": "Suco Natural",
    "descricao": "Suco gelado",
    "preco": 6,
    "categoria": "Bebidas",
   
