##################################################################################
# ✨✨✨✨✨✨ TUTORIAL BONUS TRABALHANDO COM GIT-GITHUB: ✨✨✨✨✨✨✨✨✨✨✨
##################################################################################
git --help
#Se esquecer qualquer comando, use:
git <comando> --help
# Ou pesquise por:
clear
# usado para limpar a tela
mkdir meu-git
# Cria uma nova pasta chamada "meu-git"
cd meu-git 
# Entra na pasta recém-criada                       
ls -a
# verificar todas as pastas/arquivo do repositorio ate oucultos                      
git init
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
git config --global --add safe.directory "$(pwd)"
# Configurar a pasta como segura (evita erros de segurança)                               
git config --list
# Lista todas as configurações ativas 
git config --global user.name "Seu Nome"
# Configurar nome de usuário
git config --global user.email "seu@email.com"
# Configurar email do GitHub


####################################
# 💻 Adicione a chave SSH no GitHub
####################################
1. Acesse: [https://github.com](https://github.com)
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
ssh-keygen -t ed25519 -C "seu@email.com"
# Gerar nova chave SSH (caso ainda não tenha)
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
# Iniciar o agente ssh
cat ~/.ssh/id_ed25519.pub
# Mostrar a chave pública para adicionar no GitHub
ssh -T git@github.com
#### 🧪 Teste a conexão com o GitHub
# Se tudo estiver certo, você verá:
# Hi SEU_USUARIO! You've successfully authenticated..
git remote -v
# Execute o comando abaixo no terminal para ver como o Git está se conectando ao GitHub:
git remote set-url origin git@github.com:usuario/repositorio.git
# Troque a URL remota para usar SSH
ssh -T git@github.com
## 🧪 Teste de conexão com GitHub via SSH (opcional)


########################################
# 💻 Clonando um repositorio do  GitHub
########################################
git clone git@github.com:usuario/repositorio.git
# Clona o repositório com chave SSH
ls -a
# verificar todas as pastas/arquivo do repositorio ate oucultos   
cd nome-do-reositorio
# vai para dentro da pasta do repositorio
ls -a
# verificar todas as pastas/arquivo do repositorio ate oucultos   
git remote -v 
# Mostra os repositórios remotos configurados
git fetch 
# Busca atualizações sem aplicar
git pull origin main 
# Sincroniza com o repositório remoto (branch main)
git log --oneline
# Mostra o histórico de forma resumida (1 linha por commit)
git log 
# Exibe histórico de todos os commits com hash, autor e data (PARA SAIR DIGITE: q) 
git status 
# Mostra o status atual dos arquivos (modificados, novos, deletados)


##############################
# 🌱 BRANCHES (RAMIFICAÇÕES) 
##############################
git branch
# Lista todas as branches (ramificações)
git checkout -b novaBranch numero-do-commit
# Criar uma branch a partir do commit 
# ex:: git checkout -b novaBranch  2ad9347bba64542687c6
git branch nome-da-branch
# Cria uma nova branch com o nome informado
git checkout -b nova-branch
# Cria e já muda para a nova branch
git stash
# Salva temporariamente alterações não commitadas (útil para trocar de branch)
git checkout main 
# Volta para a branch principal
git checkout nome-da-branch
# Troca para a branch escolhida
git stash apply
# Recupera alterações salvas com `stash`
git merge especificar-nome-da-branch
# Une a branch especificada com a atual
git branch -d nome-da-branch
# Deleta a branch (caso já tenha sido mesclada)
git merge nova-branch 
# Junta as alterações da branch de trabalho com a main
git pull origin main
# Garante que está atualizado com o repositório remoto


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
git add nome-do-arquivo.ext
# Adiciona um arquivo específico para a área de staging
git add .
# Adiciona TODOS os arquivos modificados para o commit
git commit -m "Mensagem clara e objetiva"
# Cria um commit com a mensagem entre aspas
git commit -am "Mensagem"
# Adiciona e comita arquivos rastreados (não funciona com novos arquivos)
git diff
# Mostra as diferenças entre o código atual e o último commit
git commit -m "Adiciona mensagem de conexão" 
# Faz o commit com a mensagem
git show
# Mostra detalhes do último commit
git blame nome-do-arquivo
# Mostra linha por linha quem modificou o quê (ótimo para rastrear bugs)
git tag -a v1.0 -m "Versão 1.0"
# Cria uma tag de versão


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



###########################################
## 📤   RECEBENDO E ENVIANDO PARA O GITHUB 
###########################################
git remote add origin git@github.com:usuario/repositorio.git
# Conecta seu repositório local ao repositório remoto via SSH
git fetch
# Busca atualizações do repositório remoto (mas não aplica)
git merge
# Aplica as atualizações buscadas com `git fetch`
git pull
# Baixa alterações do GitHub para seu projeto local
git pull origin main --rebase
##  Atualizar seu repositório local com o que está no GitHub:
git push -u origin main
# Envia o repositório local para o GitHub (main = branch principal)









