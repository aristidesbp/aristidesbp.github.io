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

✨ **"O código perfeito é o código comentado!"**  
Este guia está pronto para ser salvo, compartilhado e versionado!
