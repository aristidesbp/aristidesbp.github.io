












# 📘 Guia Completo dos Comandos Git com Explicações | by Aristidesbp

> 💬 _"O código perfeito é o código comentado!"_

Este guia traz todos os principais comandos Git, explicados de forma simples e prática para iniciantes e intermediários. Ideal para aprender e consultar sempre que precisar!

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
# verificar se existe
ls -a

# Inicializa o repositório Git local (caso não tenha vindo com o clone)              
git init                                  

# Configurar a pasta como segura (evita erros de segurança)
git config --global --add safe.directory "$(pwd)"  

# Configurar nome de usuário
git config --global user.name "Seu Nome"

# Configurar email do GitHub
git config --global user.email "seu@email.com"

# Gerar nova chave SSH (caso ainda não tenha)
ssh-keygen -t ed25519 -C "seu@email.com"

# Iniciar o agente ssh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Mostrar a chave pública para adicionar no GitHub
cat ~/.ssh/id_ed25519.pub
```
---
## 🔄 4. Verificar conexão e sincronização com o repositório remoto
```

# Mostra os repositórios remotos configurados
git remote -v  

# Busca atualizações sem aplicar
git fetch 

# Sincroniza com o repositório remoto (branch main)
git pull origin main              
```
---
## 📜 5. Verificar commits realizados no histórico
```
# Lista todos os commits com hash, autor e data
git log                           
```
---

## 🌿 6. Criar uma branch a partir de um commit específico
📌 Substitua abc1234 pelo hash parcial do commit desejado.
```
git checkout -b nova-branch abc1234
```
---

## 📝 7. Criar um novo arquivo de texto com a frase "ola mundo conectado"
```
# Cria um novo arquivo com a mensagem
nano nome-do-arquivo
# CONTR+S  CONTR+X para salvar depois de alterar
# Adiciona o arquivo para a área de staging
git add mensagem.txt  
# Faz o commit com a mensagem
git commit -m "Adiciona mensagem de conexão"  
```
---

## 🔀 8. Unir as alterações da nova branch com a branch main
```
# Volta para a branch principal
git checkout main 
# Garante que está atualizado com o repositório remoto
git pull origin main  
# Junta as alterações da branch de trabalho com a main
git merge nova-branch          
```
---

## 🚀 9. Subir o repositório local para o GitHub
```
# Envia os commits da branch main para o GitHub
git push origin main          
```
---


-----
-----
# GIT HELP

### `git add <arquivo>`
Adiciona arquivos para a **área de staging**.
```bash
git add index.html
```
📦 _"Prepara o arquivo para ser commitado."_

---

### `git rm <arquivo>`
Remove um arquivo do diretório e da área de staging.
```bash
git rm script.js
```
🧹 _"Apaga o arquivo do projeto e do controle de versão."_

---

### `git mv <antigo> <novo>`
Renomeia ou move arquivos e pastas dentro do repositório.
```bash
git mv estilo.css css/estilo.css
```
📂 _"Move ou renomeia e já prepara para o commit."_

---

### `git restore <arquivo>`
Desfaz modificações locais em um arquivo (reverte ao último commit).
```bash
git restore index.html
```
↩️ _"Recupera a última versão salva daquele arquivo."_

---

## 📌 Registro de alterações

### `git commit -m "mensagem"`
Salva oficialmente as alterações com uma mensagem descritiva.
```bash
git commit -m "Adiciona layout da página inicial"
```
🗃️ _"Cria um ponto no histórico do projeto com as mudanças."_

---

### `git status`
Mostra o status atual do repositório.
```bash
git status
```
🔍 _"Informa quais arquivos foram modificados, adicionados ou estão prontos para commit."_

---

### `git log`
Lista todos os commits realizados.
```bash
git log
```
🕓 _"Visualiza o histórico completo do projeto."_

---

### `git diff`
Compara alterações não commitadas com o último commit.
```bash
git diff
```
🧪 _"Mostra o que foi alterado em cada linha."_

---

### `git show <hash>`
Mostra detalhes de um commit específico.
```bash
git show 5a1f3a7
```
🔍 _"Mostra alterações, autor, data e mensagem do commit."_

---

## 🌱 Ramificações (branches)

### `git branch`
Lista, cria ou remove branches.
```bash
git branch            # lista
git branch nova-feature   # cria nova
git branch -d bugfix123   # deleta branch
```
🌳 _"Permite organizar diferentes versões do projeto em paralelo."_

---

### `git switch <branch>`
Troca de branch.
```bash
git switch nova-feature
```
🔀 _"Substitui o checkout para trocar de branch de forma mais simples."_

---

### `git merge <branch>`
Junta duas branches.
```bash
git merge nova-feature
```
🔗 _"Incorpora as alterações de uma branch na branch atual."_

---

### `git rebase <branch>`
Reaplica commits da branch atual sobre a especificada.
```bash
git rebase main
```
🧼 _"Faz um histórico mais limpo que o merge, útil em colaboração."_

---

## 🚀 Enviar e buscar do repositório remoto

### `git push`
Envia os commits locais para o repositório remoto.
```bash
git push origin main
```
📤 _"Publica suas alterações no GitHub ou outro servidor."_

---

### `git pull`
Busca e aplica mudanças do repositório remoto.
```bash
git pull origin main
```
📥 _"Atualiza sua cópia local com o que foi enviado por outras pessoas."_

---

### `git fetch`
Busca as atualizações do repositório remoto (sem aplicar).
```bash
git fetch origin
```
🧲 _"Baixa dados do remoto sem alterar seu código local ainda."_

---

## 🧪 Ferramentas de Diagnóstico e Busca

### `git grep <palavra>`
Busca um texto específico no projeto inteiro.
```bash
git grep "funçãoLogin"
```
🔎 _"Muito útil para localizar trechos de código rapidamente."_

---

### `git bisect`
Localiza o commit exato que introduziu um bug.
```bash
git bisect start
git bisect bad
git bisect good <hash>
```
🧬 _"Git faz uma busca binária até encontrar o erro!"_

---

## 🔐 Outros úteis

### `git tag`
Cria versões marcadas (ex: v1.0.0).
```bash
git tag v1.0.0
git tag -d v1.0.0       # deleta tag
```
🏷️ _"Ajuda a marcar pontos importantes na linha do tempo."_

---

### `git reset`
Desfaz commits ou remove arquivos da staging area.
```bash
git reset --soft HEAD~1
git reset --hard HEAD~1
```
⏪ _"Volta no tempo com segurança ou de forma definitiva!"_

---

## ⚙️ Outras opções de ajuda

### `git help <comando>`
Exibe o manual de um comando.
```bash
git help commit
```

---

> 🧠 **Dica Final**: use `git help -a` para listar todos os comandos possíveis!

---

📘 Criado com 💡 por **Aristidesbp**

_"O código perfeito é o código comentado!"_

