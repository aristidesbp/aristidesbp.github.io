# 📘 Guia Completo dos Comandos Git com Explicações | by Aristidesbp

> 💬 _"O código perfeito é o código comentado!"_

Este guia traz todos os principais comandos Git, explicados de forma simples e prática para iniciantes e intermediários. Ideal para aprender e consultar sempre que precisar!



-----
# 📘 GUIA COMPLETO DOS PRINCIPAIS COMANDOS GIT (com explicações)

Este tutorial ensina os comandos Git mais usados, explicando de forma clara e objetiva cada um deles. Ideal para iniciantes e intermediários.

---

## 📌 CONFIGURAÇÃO INICIAL DO GIT

```bash
git config --global user.name "Seu Nome"
# Define seu nome como autor dos commits em qualquer repositório

git config --global user.email "seu@email.com"
# Define o e-mail do autor (usado no GitHub, GitLab, etc)

git config --global core.editor "code --wait"
# Define o editor padrão para mensagens de commit (VS Code neste caso)

git config --list
# Lista todas as configurações ativas
```

---

## 🗂️ COMANDOS PARA REPOSITÓRIOS

```bash
git init
# Cria um novo repositório Git na pasta atual

git clone https://github.com/usuario/repositorio.git
# Clona um repositório remoto para sua máquina

git status
# Mostra o status atual dos arquivos (modificados, novos, deletados)

git log
# Exibe o histórico de commits

git log --oneline
# Mostra o histórico de forma resumida (1 linha por commit)
```

---

## 📝 TRABALHANDO COM COMMIT

```bash
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
```

---

## 📤 ENVIANDO E RECEBENDO DO GITHUB

```bash
git remote add origin git@github.com:usuario/repositorio.git
# Conecta seu repositório local ao repositório remoto via SSH

git push -u origin main
# Envia o repositório local para o GitHub (main = branch principal)

git pull
# Baixa alterações do GitHub para seu projeto local

git fetch
# Busca atualizações do repositório remoto (mas não aplica)

git merge
# Aplica as atualizações buscadas com `git fetch`
```

---

## 🌱 BRANCHES (RAMIFICAÇÕES)

```bash
git branch
# Lista todas as branches (ramificações)

git branch nome-da-branch
# Cria uma nova branch com o nome informado

git checkout nome-da-branch
# Troca para a branch escolhida

git checkout -b nova-branch
# Cria e já muda para a nova branch

git merge nome-da-branch
# Une a branch especificada com a atual

git branch -d nome-da-branch
# Deleta a branch (caso já tenha sido mesclada)
```

---

## 🧹 CORREÇÕES E AJUSTES

```bash
git reset nome-do-arquivo
# Remove o arquivo da área de staging (antes do commit)

git reset --hard HEAD
# Remove todas as alterações e volta ao último commit

git clean -f
# Remove arquivos não rastreados (novos arquivos que não foram adicionados)

git revert <id-do-commit>
# Reverte um commit específico sem apagar o histórico
```

---

## 🔐 CHAVES SSH (relembrando)

```bash
ssh-keygen -t ed25519 -C "seu@email.com"
# Cria uma nova chave SSH

ssh-add ~/.ssh/id_ed25519
# Adiciona a chave ao SSH Agent
```

---

## 📁 SAFE DIRECTORY (relembrando)

```bash
git config --global --add safe.directory /caminho/para/pasta
# Autoriza a pasta como segura para evitar erro "dubious ownership"
```

---

## ✅ OUTROS COMANDOS ÚTEIS

```bash
git stash
# Salva temporariamente alterações não commitadas (útil para trocar de branch)

git stash apply
# Recupera alterações salvas com `stash`

git tag -a v1.0 -m "Versão 1.0"
# Cria uma tag de versão

git show
# Mostra detalhes do último commit

git blame nome-do-arquivo
# Mostra linha por linha quem modificou o quê (ótimo para rastrear bugs)
```

---

## 💡 DICA FINAL

Se esquecer qualquer comando, use:
```bash
git --help
```

Ou pesquise por:
```bash
git <comando> --help
```

---
---

# ✨✨✨✨✨✨ TUTORIAL BONUS TRABALHANDO COM GIT-GITHUB: ✨✨✨✨✨✨✨✨✨✨✨


---
## 🧱 1. Criar uma pasta chamada  meus-gits
```
# Cria uma nova pasta chamada "meus-gits"
mkdir meus-gits

# Entra na pasta recém-criada                       
cd meus-gits                          
```
---
## 🔄 2. Clonar um repositório remoto e entrar na pasta clonada (caso queira iniciar um novo do zero pule esta etapa)
📝 Altere usuario/repositorio.git para o seu repositório GitHub real.

```
# Clona o repositório com chave SSH
git clone git@github.com:usuario/repositorio.git

# Entra na pasta do projeto clonado 
cd repositorio                                      
```
---
## 🛠️ 3. Inicializar Git e configurar ambiente (caso não tenha feito)
```
ls -a
# verificar se existe
       
git init                                  
# Inicializa o repositório Git local (caso não tenha vindo com o clone)

git config --list
# Lista todas as configurações ativas

git config --global --add safe.directory "$(pwd)"
# Configurar a pasta como segura (evita erros de segurança)
  
git config --global user.name "Seu Nome"
# Configurar nome de usuário

git config --global user.email "seu@email.com"
# Configurar email do GitHub

ssh-keygen -t ed25519 -C "seu@email.com"
# Gerar nova chave SSH (caso ainda não tenha)

eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
# Iniciar o agente ssh

cat ~/.ssh/id_ed25519.pub
# Mostrar a chave pública para adicionar no GitHub

```
---
## 🔄 4. Verificar conexão e sincronização com o repositório remoto
```
git remote -v 
# Mostra os repositórios remotos configurados
 
git fetch 
# Busca atualizações sem aplicar

git pull origin main 
# Sincroniza com o repositório remoto (branch main)
             
```
---
## 📜 5. Verificar commits realizados no histórico
```
git log  
# Lista todos os commits com hash, autor e data
# PARA SAIR DIGITE: q                        
```
---

## 🌿 6. Criar uma branch a partir de um commit específico
📌 Substitua abc1234 pelo hash parcial do commit desejado.
```
git checkout -b nova-branch abc1234
# Criar uma branch a partir de um commit abc1234
```
---

## 📝 7. Criar um novo arquivo de texto com a frase "ola mundo conectado"
```
nano nome-do-arquivo.txt
# Cria um novo arquivo com a mensagem
# CONTR+S  CONTR+X para salvar depois de alterar
```
```
git add nome-do-arquivo.txt
# Adiciona o arquivo para a área de staging
```
```
git commit -m "Adiciona mensagem de conexão"   
# Faz o commit com a mensagem
```
---

## 🔀 8. Unir as alterações da nova branch com a branch main
```
git checkout main 
# Volta para a branch principal

git pull origin main
# Garante que está atualizado com o repositório remoto

git merge nova-branch   
# Junta as alterações da branch de trabalho com a main
        
```
---

## 🚀 9. Subir o repositório local para o GitHub
#### 💻 Adicione a chave SSH no GitHub

1. Acesse: [https://github.com](https://github.com)
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada
8. Clique em **Add SSH key**

---

#### 🧪 Teste a conexão com o GitHub

No terminal, digite:

```bash
ssh -T git@github.com
```

Se tudo estiver certo, você verá:

```
Hi SEU_USUARIO! You've successfully authenticated...
```

---

### 💡 Dica de Segurança:
Nunca compartilhe sua chave privada (`id_ed25519`). Compartilhe **apenas a pública** (`id_ed25519.pub`).

---

```
git push origin main 
# Envia os commits da branch main para o GitHub
         
```
---

