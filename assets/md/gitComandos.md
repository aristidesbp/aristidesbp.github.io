####################
# COMANDOS LINUX  ##
####################
## para mostrar conteudo da pasta:
```
ls -a
```
## para criar pasta
```
mkdir nome
```
## para criar arquivo
```
nano nome
```
## entrar na pasta
```
cd nome
```
## mover pasta ou arquivo (./pasta anterior)
```
mv psta
```
## volta para pasta anterior
'''
cd ..
'''
## apagar pasta/arquivo
'''
rm -rf nome
'''


##################################################################################
# ✨✨✨✨✨✨ TUTORIAL BONUS TRABALHANDO COM GIT-GITHUB: ✨✨✨✨✨✨✨✨✨✨✨
##################################################################################
---
## Se esquecer qualquer comando, use:
'''
git --help
'''
## pesquise por comando especifico :
'''
git <comando> --help
'''
## usado para limpar a tela
'''
clear
'''
## Cria uma nova pasta chamada "meu-git"
'''
mkdir meu-git
'''
## Entra na pasta recém-criada                       
'''
cd meu-git 
'''
## verificar todas as pastas/arquivo do repositorio ate oucultos                      
'''
ls -a
'''
## Inicializa o repositório Git local (caso não tenha vindo com o clone)
'''
git init
'''
## Configurar a pasta como segura (evita erros de segurança)                               
'''
git config --global --add safe.directory "$(pwd)"
'''
## Lista todas as configurações ativas 
'''
git config --list
'''
## Configurar nome de usuário
'''
git config --global user.name "Seu Nome"
'''
## Configurar email do GitHub
'''
git config --global user.email "seu@email.com"
'''

####################################
# 💻 Adicione a chave SSH no GitHub
####################################

# Mostrar a chave pública para adicionar no GitHub
cat ~/.ssh/id_ed25519.pub

# Gerar nova chave SSH (caso ainda não tenha)
ssh-keygen -t ed25519 -C "seu@email.com"

# Iniciar o agente ssh
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519

----------------------------------------------------
1. Acesse: https://github.com](https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
----------------------------------------------------

# 🧪 Teste a conexão com o GitHub
# Se tudo estiver certo, você verá:
# Hi SEU_USUARIO! You've successfully authenticated..
ssh -T git@github.com


# Execute o comando abaixo no terminal para ver como o Git está se conectando ao GitHub:
## NOMAL
# origin	https://github.com/aristidesbp/aristidesbp.github.io.git (fetch)
# origin	https://github.com/aristidesbp/aristidesbp.github.io.git (push)
## SSH
# origin	git@github.com:aristidesbp/aristidesbp.github.io (fetch)
# origin	git@github.com:aristidesbp/aristidesbp.github.io (push)
git remote -v


# Troque a URL remota para usar SSH
git remote set-url origin git@github.com:usuario/repositorio.git

## 🧪 Teste de conexão com GitHub via SSH (opcional)
ssh -T git@github.com



########################################
# 💻 Clonando um repositorio do  GitHub
########################################
## Clona o repositório com chave SSH
git clone git@github.com:usuario/repositorio.git

## verificar todas as pastas/arquivo do repositorio ate oucultos   
ls -a

## vai para dentro da pasta do repositorio
cd nome-do-reositorio

## verificar todas as pastas/arquivo do repositorio ate oucultos   
ls -a

## Mostra os repositórios remotos configurados
git remote -v 

## Busca atualizações sem aplicar
git fetch 

## Sincroniza com o repositório remoto (branch main)
git pull origin main 






##############################
# 🌱 RAMIFICAÇÕES (BRANCHES)
##############################

# Lista todas as branches locais existentes no repositório
git branch

# Exibe o histórico completo de commits com:
# - Hash (identificador único do commit)
# - Autor do commit
# - Data do commit
# Use a tecla Q para sair da visualização
git log

# Cria uma nova branch com base em um commit específico
# Exemplo: git checkout -b novaBranch 2ad9347bba64542687c6
# - checkout: muda de branch
# - -b: cria nova branch
# - numero-do-commit: hash de onde a nova branch vai nascer
git checkout -b novaBranch numero-do-commit

# Cria uma nova branch, mas sem mudar para ela
git branch nome-da-branch

# Cria uma nova branch E JÁ MUDA para ela automaticamente
git checkout -b nova-branch

# Salva temporariamente as alterações não commitadas
# Muito útil quando você precisa trocar de branch sem perder o que está fazendo
git stash

# Volta para a branch principal do projeto (geralmente chamada "main")
git checkout main

# Troca para qualquer branch desejada
git checkout nome-da-branch

# Recupera as alterações salvas anteriormente com `git stash`
git stash apply

# Faz o merge (união) da branch especificada com a branch atual
# ⚠️ ATENÇÃO: você precisa estar na branch que receberá as alterações
git merge nome-da-branch

# Deleta uma branch local que já foi mesclada (merge feito)
git branch -d nome-da-branch

# Junta as alterações da branch secundária com a principal
# Ex: estando na branch "main", este comando incorpora as mudanças da "nova-branch"
git merge nova-branch

# Atualiza sua branch local com a versão mais recente da branch principal do repositório remoto
git pull origin main

########################################################################
# Criar um novo arquivo de texto com a frase "ola mundo conectado"
########################################################################
nano nome-do-arquivo.txt
# Cria um novo arquivo com a mensagem
# CONTR+S  CONTR+X para salvar depois de alterar
git add nome-do-arquivo.txt
# Adiciona o arquivo para a área de staging


###################################################
## 📝 TRABALHANDO COM COMMIT (DIGITE "Q" PARA SAIR)
###################################################

## Mostra o status atual dos arquivos (modificados, novos, deletados)
git status 

# Adiciona um arquivo específico para a área de staging
git add nome-do-arquivo.ext

# Adiciona TODOS os arquivos modificados para o commit
git add .

# Cria um commit com a mensagem entre aspas
git commit -m "Mensagem clara e objetiva"

# Adiciona e comita arquivos rastreados (não funciona com novos arquivos)
git commit -am "Mensagem"

# Mostra as diferenças entre o código atual e o último commit
git diff

# Faz o commit com a mensagem
git commit -m "Adiciona mensagem de conexão" 

# Mostra detalhes do último commit
git show

# Mostra linha por linha quem modificou o quê (ótimo para rastrear bugs)
git blame nome-do-arquivo

# Cria uma tag de versão
git tag -a v1.0 -m "Versão 1.0"

## Mostra o histórico de forma resumida (1 linha por commit)
git log --oneline

## Exibe histórico de todos os commits com hash, autor e data (PARA SAIR DIGITE: q) 
git log 

###########################
## 🧹 CORREÇÕES E AJUSTES
###########################
git reset nome-do-arquivo
# Remove o arquivo da área de staging (antes do commit)
git reset --hard HEAD
# Remove todas as alterações e volta ao último commit
git clean -f
# Remove arquivos não rastreados (novos arquivos que não foram adicionados)
git revert <id-do-commit>
# Reverte um commit específico sem apagar o histórico



############################################
## 📤   RECEBENDO E ENVIANDO PARA O GITHUB 
############################################
# Conecta seu repositório local ao repositório remoto via SSH
git remote add origin git@github.com:usuario/repositorio.git

# Busca atualizações do repositório remoto (mas não aplica)
git fetch

# Aplica as atualizações buscadas com `git fetch`
git merge

# Baixa alterações do GitHub para seu projeto local
git pull

##  Atualizar seu repositório local com o que está no GitHub:
git pull origin main --rebase

# Envia o repositório local para o GitHub (main = branch principal)
git push -u origin main



###########################################################################
# TUTORIAL: COMO RECUPERAR ARQUIVOS EXCLUÍDOS NO GIT
# AUTOR: Aristidesbp
# OBJETIVO: Localizar e restaurar arquivos deletados em um repositório Git
# OBS: Este tutorial assume que você está dentro do repositório local.
############################################################################
# ETAPA 1 — LOCALIZAR ARQUIVOS DELETADOS
# Exibe o histórico de commits com resumo das alterações,
# e filtra SOMENTE commits que deletaram arquivos.
# DICA: Use a tecla Q para sair da visualização do log quando quiser.
git log --diff-filter=D --summary

# para buscar especificamente um arquivo que você quer recuperar:
# Neste exemplo, buscamos o arquivo "editor-de-txt.html"
git log --summary --name-status | grep -B 10 "editor-de-txt.html"



# O parâmetro -B 10 mostra as 10 linhas antes da ocorrência,
# para encontrar o commit completo que removeu o arquivo.

# ETAPA 2 — IDENTIFICAR O COMMIT QUE DELETOU O ARQUIVO
# -----------------------------------------------------

# A saída anterior mostra algo assim:

# commit 7477572b4f232ee774236f1b58f510d57d0f7de9
# Author: aristidesbp <aristidesbp@gmail.com>
# Date:   Thu May 22 10:01:41 2025 -0300
# Mensagem: atualizarS
# D	editor-de-txt.html

# Anote o HASH DO COMMIT (exemplo acima: 7477572b4f232ee774236f1b58f510d57d0f7de9)

# ETAPA 3 — VERIFICAR QUAIS OUTROS ARQUIVOS FORAM EXCLUÍDOS NESSE COMMIT
# -----------------------------------------------------------------------

# Agora você pode usar o comando abaixo para ver todos os arquivos DELETADOS no mesmo commit:
git show --name-status --diff-filter=D 7477572b4f232ee774236f1b58f510d57d0f7de9

# Exemplo de saída esperada:
# D	editor-de-txt.html
# D	script-antigo.js
# D	css/velho-style.css

# ETAPA 4 — RECUPERAR UM ARQUIVO ESPECÍFICO DO COMMIT
# -----------------------------------------------------

# Para restaurar um arquivo deletado, use o comando:
git checkout <HASH_DO_COMMIT>^ -- caminho/do/arquivo

# O ^ (circunflexo) indica que queremos o arquivo da versão ANTERIOR ao commit que deletou.

# Exemplo real:
git checkout 7477572b4f232ee774236f1b58f510d57d0f7de9^ -- editor-de-txt.html

# Esse comando recupera o arquivo "editor-de-txt.html" e o adiciona de volta ao diretório atual.

# ETAPA 5 — ADICIONAR E COMMITAR A RESTAURAÇÃO
# --------------------------------------------

# Após restaurar o arquivo, você deve adicioná-lo novamente ao controle de versão:
git add editor-de-txt.html

# Agora salve com um novo commit:
git commit -m "Recuperar arquivo editor-de-txt.html que havia sido deletado"

# PRONTO! O arquivo está de volta no seu projeto.

#############################################################
# CONCLUSÃO:
# Usando Git, você pode recuperar QUALQUER arquivo que foi deletado
# em qualquer ponto do histórico, mesmo que não saiba o commit exato.
# Sempre use git log e git show para investigar o histórico.
# Lembre-se: o Git guarda tudo. 😉
#############################################################


#############################################################
# ✅ 1. Voltar temporariamente a um commit (modo detached HEAD)
#############################################################
# Use o comando abaixo para listar o histórico de commits no (pc):
git log
# Esse modo é útil apenas para explorar um commit antigo sem alterar o histórico da branch atual.
git checkout <id_do_commit>


Exemplo:

git checkout a1b2c3d

    ⚠️ Neste modo, você não está em nenhuma branch. Se fizer alterações aqui, precisará criar uma nova branch para não perder seu trabalho.

✅ 2. Voltar permanentemente a um commit (desfazendo commits posteriores)
➤ Opção A: Reset "soft" – mantém as alterações no stage

git reset --soft <id_do_commit>

➤ Opção B: Reset "mixed" (padrão) – mantém alterações nos arquivos, mas remove do stage

git reset <id_do_commit>

➤ Opção C: Reset "hard" – apaga tudo (perigoso!)

git reset --hard <id_do_commit>

    ⚠️ Atenção: Se você fizer --hard, todo o trabalho feito depois do commit escolhido será perdido, a menos que esteja salvo em algum lugar (como no GitHub ou em um branch separado).

✅ 3. Criar uma nova branch a partir de um commit antigo

Se quiser preservar o histórico e começar uma nova linha de desenvolvimento a partir de um commit antigo:

git checkout -b nova-branch <id_do_commit>

Exemplo:

git checkout -b teste-antigo a1b2c3d

✅ Como encontrar o ID do commit

Use o comando abaixo para listar o histórico de commits:

git log

Pressione q para sair da visualização.
💡 Dica de segurança:

Antes de usar reset --hard, é recomendado criar uma branch backup:

git branch backup-antes-do-reset

Assim, você pode recuperar os commits caso precise.








