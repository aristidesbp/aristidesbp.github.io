#🔥  TUTORIAL COMPLETO DE GIT E GITHUB 🔥   
 Git é um programa que serve para salvar versões de arquivos, como se fosse um “controle remoto” do histórico do seu projeto. Com ele, você pode ver o que mudou, quem mudou, quando mudou e até voltar no tempo se algo der errado.
 GitHub é um site onde você pode guardar esses arquivos com histórico na internet, compartilhar com outras pessoas e até trabalhar junto com elas no mesmo projeto — mesmo que estejam em lugares diferentes do mundo.

É como se:
    O Git fosse o caderno onde você anota tudo o que fez.
    E o GitHub fosse a nuvem, onde você guarda esse caderno para acessar de qualquer lugar.

#### ✅ TAREFAS A CUMPRIR 
#### 📌 soluções

---
---



##✅ Verificar se o Git foi instalado com sucesso (termux)
####📌 Mostra a versão atual do Git instalada
``` git --version ```             

##✅ Terminal no Linux:
####📌 Atualiza a lista de pacotes disponíveis no repositório
``` sudo apt update ```          
####📌 Instala o Git na distribuição Linux baseada em Debian (como Ubuntu)
``` sudo apt install git ```     

##✅ Terminal no Termux (Android):
####📌 Atualiza os pacotes do Termux
``` pkg update && upgrade ```
####📌 Instala o Git no ambiente Termux
pkg install git                  


# 📌  No macOS:(Use o Homebrew para instalar:)
brew install git



# 📌 No Windows:
1. Acesse o site oficial: [https://git-scm.com/](https://git-scm.com/) e baixe o instalador.
2. Execute o instalador e siga as instruções na tela.
3. Durante a instalação, escolha as configurações recomendadas (defaults).


✅ Verificar se o Git foi instalado com sucesso (termux)
git --version              # Mostra a versão atual do Git instalada
clear                      # Limpa a tela


######################################################################################################
################################     🔥 CONFIGURAÇÕES GIT 🔥    ######################################
######################################################################################################
### Configuração inicial do Git
Após instalar o Git, você precisa configurá-lo com seu nome e e-mail. Isso é necessário para 
identificar quem fez cada alteração no código.

📚  Escopo de configuração
git config                      # escopo do projeto atual
git config --global             # --global (escopo do ususario/global user.name)
git config --system             # --system  (para todos os usuarios do sistema)

# ✅ verificar 
# 📌 Comandos


# 📌 Comandos
git init                                             # cria a pasta git, para guardar as configurações
ls -a                                                # ✅ verificar nome das pastas existentes (ocutas)
git config --global user.name "Seu Nome"             # Define seu nome de usuário global
git config --global user.email "email@exemplo.com"   # Define seu e-mail usado no GitHub
git config --global init.defaltBranch main           # ramificação padrao
git config --global core.editor nano                 # define o editor padrao
git config --list                                    # ✅ verificar lista as configurações
git status                                           # ✅ verificar status da aplicação
ssh-keygen -t rsa -b 2048                            # criar uma chave ssh
ls ~/.ssh/                                           # ✅ verificar se a chave SSH foi criada
cat ~/.ssh/id_rsa.pub                                # ✅ verifica o valor da cheve criada

# 📌 solução caso a verificação falhar, esse comando diz que é seguro operar nesse diretório.
git config --global --add safe.directory /storage/emulated/0/Download


📝 DICA:
#  Use "git status" constantemente para saber o que mudou, o que está pronto para commit,
e o que ainda não foi salvo.
# Use "git diff" para ver diferenças entre arquivos modificados e os últimos commits.



**Parabéns!** Agora você já sabe o que é Git, GitHub e como instalar e configurar o Git no seu ambiente. 
No próximo módulo, vamos explorar os primeiros comandos para começar a trabalhar com repositórios.

######################################################################################################
#####################################    🔥 COMANDOS 🔥    ###########################################
######################################################################################################
# 📚 Criando uma nova pasta no repositório git local
# ✅ verificar nome das pastas existentes
ls -a                       # lista repositorios criados (ate os ocultos)
# 📌 solução
mkdir nome-da-pasta         # Cria uma nova pasta para seu projeto

# 📚 Criando um arquivo dentro da nova pasta 
# ✅ entre na pasta criada 
cd nome-da-pasta            # entra na pasta (cd ../  para voltar)
# 📌 solução
nano nome-do-arquivo        # Cria um arquivo (contr+s  e contr+x )

# ✅ verifique o status da pasta no Git
git status                  # verifica o status do repositorio 

mv ~/repsitori-git ~/storage/downloads/   
# Comando para mover arquivos ou pastas
# Caminho da pasta atual que será movida (repositório git localizado no diretório home do Termux)
# Caminho de destino: pasta 'downloads' dentro do diretório de armazenamento compartilhado do Android

git config --global --add safe.directory /storage/emulated/0/Download/repsitorio-git           
# Aplica a configuração para todos os repositórios do usuário atual
# Adiciona o diretório como seguro (safe directory)
# Caminho completo do repositório movido


✅ Adicionar arquivos ao repositório
git add nome-do-arquivo               # Adiciona o arquivo ao "stage", pronto para commit                     
git add .                             # Adiciona todos os arquivo ao "stage", pronto para commit 
git reset                             # remove os add no staged
git commit -m "comentario"            # Cria um ponto de controle no histórico do projeto comentado
git commit                            # vai para staged esperarar o comentario 
git log                               # verifica todos commit (Q ... para sair)


📝 DICA:
#  Use "git status" constantemente para saber o que mudou, o que está pronto para commit,
e o que ainda não foi salvo.
# Use "git diff" para ver diferenças entre arquivos modificados e os últimos commits.


✅ voltar no tempo
git checkout "id do commit"           # volta no tempo e mostra como estava
git checkout main                     # Devolta para o futuro kkkkkk
git checkout master                   # Devolta para o futuro kkkkkk

✅ Criando uma ramificação
git branch                             # verifica as branch que existem
git checkout -b feature/nova_branch    # cria uma nova branch se não existem
git checkout main                      # vouta para main
git merge feature/nova_branch          # mesclar os arquivos (joga os arquivos para o main)

exemplo:
aristidesbp@aristidesbp-V142N-4G:~/Downloads/meu-git$ git branch
* feature/nova_branch
  master


#projeto
|-- main ---------------- gi_meger------- main (com arquivos da branch)
|                           |  
|-- feature/nova_branch ----|

######################################################################################################
################################   🔥 COMANDOS PARA GITHUB 🔥    #####################################
######################################################################################################

✅ Para clonar um repositório existente do site
git clone --depth=1 URL-do-repositorio   # Se NÃO quiser os commits anteriores, você pode usar --depth=1:
git clone URL-do-repositorio             # Baixa o repositório para sua máquina


✅ Atualizar o repositório local
git pull                                # Puxa as alterações do repositório remoto para sua máquina

✅ Ver histórico de commits
cd diretorio-do-repositorio             # vai para pasta do repositorio
git log                                 # Mostra o histórico detalhado dos commits
git log --oneline                       # todos os commits do seu repositório local, incluindo os novos puxados com git pull.
git log --graph --all                   # Exibe o gráfico de branches e commits
git log --oneline --graph --all         # Mostra os commits visualmente

✅ Conectar repositório local ao GitHub
ssh-keygen -t rsa -b 2048               # criar uma chave ssh
ls ~/.ssh/                              # verifica se foi criada 
cat ~/.ssh/id_rsa.pub                   # pega o valor da cheve criada
git remote -v                           # Verificar o remoto do repositório:
git remote add origin URL-REPOSITORIO   # Substitua pela URL do seu repositório
git branch -M main                      # Renomeia o branch padrão para 'main' (caso esteja como master)
git fetch                               # Buscar commits sem aplicar (só baixar)
git merge origin/main                   # Aplicar manualmente o que foi buscado:(trocar main por master se nome de branch)

🧠 DICA BÔNUS — MANTER FORK ATUALIZADO (caso tenha feito um fork)
Se você fez um fork e clonou o seu fork (e não o original), para atualizar com os commits do repositório original
você precisa fazer isso:

git remote add upstream url-repositorio       # Adicionar o repositório original como remoto:
git fetch upstream                            # Buscar commits do original
git merge upstream/main                       # Atualizar sua branch com as mudanças



✅ Criar e alternar branches
git branch nome-da-branch               # Cria uma nova branch (ramificação)
git checkout nome-da-branch             # Alterna para a nova branch


✅ Ignorar arquivos (opcional)
touch .gitignore                          # Cria o arquivo
echo "arquivo_secreto.txt" >> .gitignore  # Adiciona o nome do arquivo que não será rastreado pelo Git

✅ Trabalhando com commits futuros
git push                                       # Envia os arquivos locais para o GitHub
git push -u origin main                        # Envia os arquivos locais para o GitHub




######################################################################################################
#########################       📚 Módulo 1: Introdução ao Git-Github   ##############################
######################################################################################################

Bem-vindo ao primeiro módulo do curso! Aqui você aprenderá os conceitos básicos sobre Git, 
entenderá como instalar e configurar no seu ambiente de trabalho.

---

## 🔥 O que é o Git?

### Definição
O Git é um sistema de controle de versão distribuído. Ele permite que você acompanhe as alterações 
no código-fonte ao longo do tempo, facilita o trabalho em equipe e possibilita reverter a qualquer 
ponto no histórico do projeto.

### 🔥 Benefícios de usar o Git:
- **Rastreamento de alterações**: Monitora todas as mudanças feitas nos arquivos do projeto.
- **Trabalho em equipe**: Permite que várias pessoas trabalhem no mesmo projeto simultaneamente.
- **Flexibilidade**: Suporta diversos fluxos de trabalho e integrações com ferramentas modernas.
- **Reversibilidade**: Corrige erros facilmente revertendo a versões anteriores.
- **Histórico completo**: Mantém um registro completo de todas as alterações feitas no projeto.

---

## 🔥 O que é o GitHub?

### Definição
O GitHub é uma plataforma baseada em nuvem que utiliza o Git como sistema de controle de versão.
 Ele adiciona funcionalidades sociais e colaboração, como compartilhamento de projetos, revisão 
de código e automação de tarefas.


### Diferença entre Git e GitHub
| Git                                    | GitHub                                             |
|----------------------------------------|----------------------------------------------------|
| Sistema de controle de versão.         | Plataforma para hospedar e gerenciar projetos Git. |
| Funciona localmente no seu computador. | Funciona online, permitindo colaboração.           |
| Não possui interface gráfica.          | Possui interface gráfica e ferramentas adicionais. |


### Recursos do GitHub
- **Issues**: Gerenciamento de tarefas e bugs.
- **Pull Requests (PRs)**: Solicitações de alteração no código com revisão integrada.
- **GitHub Actions**: Automação de fluxos de trabalho, como testes e implantações.
- **GitHub Pages**: Hospedagem gratuita de sites estáticos.
- **Segurança**: Análises de vulnerabilidades e proteção de branches.

✅ Criar uma conta e um repositório no GitHub
   1- Acesse https://github.com
   2- Crie uma conta no site!
   3- Crie um novo repositório clicando na sua foto / your repositositories / new.
   4- Dê um nome, marque como público ou privado, e clique em Create Repository

obs: caso queira hospedar paginas no github, o nome do repositorio deve ser igual ao nome do seu usuario.
exemplo:  aristidesbp.github.io , marque como público, adicione licensa e redmi.
link/tutorial: https://pages.github.com/


---
**Parabéns!** Agora você pode começar a trabalhar com repositórios editando arquivos diretamente no site.
---










####################################################################################################
##########################    📚 Módulo 2: Tutorial  Git-github  ###################################
####################################################################################################
####################################################################################################
##########################           CONFIGURANDO  GIT           ###################################
####################################################################################################
#PASSO 1: INSTALANDO GIT NO LINUX
#📌 Terminal no Linux:
sudo apt update          # Atualiza a lista de pacotes disponíveis no repositório
sudo apt install git     # Instala o Git na distribuição Linux baseada em Debian (como Ubuntu)
clear                    # Limpa a tela

#Verificar se o Git foi instalado com sucesso (termux)
git --version              # Mostra a versão atual do Git instalada


#PASSO 2: CONFIGURANDO O AMBIENTE
# 📌(Obrigatório!)
git config --global user.name "Seu Nome"            # Define seu nome de usuário global
git config --global user.email "email@exemplo.com"  # Define seu e-mail usado no GitHub
git config --global init.defaltBranch main          # ramificação padrao
git config --global core.editor nano                # define o editor padrao
git config --list                                   # lista as configurações
ssh-keygen -t rsa -b 2048                           # criar uma chave ssh
ls ~/.ssh/                                          # verifica se foi criada 
cat ~/.ssh/id_rsa.pub                               # verifica o valor da cheve criada

#PASSO 3: 🗂 CRIANDO A PASTA
### Criando um repositório local para gerencia seus arquivos com o Git diretamente no seu computador.
mkdir meu-projeto-git       # cria uma pasta com nome:meu-projeto-git 
cd meu-projeto-git          # entra dentro da pasta meu-projeto-git 


#PASSO 4: Inicialize o repositório Git**:
git init                  #Isso criará uma pasta oculta chamada `.git`,  onde armazena todas informações 
ls -a                     # verificar se a pasta git foi criada


####################################################################################################
##########################            CLONAR UM REPOSITORIO           ##############################
####################################################################################################

# PASSO 5: 🌐 Clonando Repositórios, 
git clone URL-REPOSITORIO                 # Execute o comando:Isso criará uma cópia completa do repositório no seu computador.

git remote add origin URL-REPOSITORIO     # 🔄 Sincronizando com o GitHub
git branch -M main                        # Nomeie o branch principal como `main` (caso ainda não esteja configurado):
                                       
  
   



## 🚨 Dicas e Boas Práticas

- **Use `git status` frequentemente** para verificar o estado do repositório.
- Escreva mensagens de commit claras e descritivas.
- Sempre sincronize seu trabalho com o repositório remoto (`git pull` e `git push`).

---

**Parabéns!** Agora você sabe como criar repositórios, usar comandos básicos do Git e sincronizar seu 
trabalho com o GitHub. No próximo módulo, aprenderemos como gerenciar arquivos e explorar o histórico
de commits.



######################################################################################################
##################### ✍️ Módulo 3: Trabalhando com Arquivos e Histórico ##############################
######################################################################################################

Neste módulo, você aprenderá como gerenciar arquivos e explorar o histórico de commits no Git. Também 
será abordado como reverter alterações, configurar arquivos para serem ignorados e entender a 
lógica por trás do SHA de commits.

---

## 🗂 Adicionando e Removendo Arquivos

### Adicionando Arquivos: `git add`
O comando `git add` prepara os arquivos para serem commitados, adicionando-os à "área de stage".

1. **Adicionar um arquivo específico:**
    ```bash
    git add nome-do-arquivo.txt
    ```

2. **Adicionar todos os arquivos modificados no diretório atual:**
    ```bash
    git add .
    ```

---

### Removendo Arquivos: `git rm`
O comando `git rm` remove arquivos do repositório e do sistema de arquivos.

1. **Remover um arquivo:**
    ```bash
    git rm nome-do-arquivo.txt
    ```

2. **Remover um arquivo, mas mantê-lo no sistema de arquivos (somente do Git):**
    ```bash
    git rm --cached nome-do-arquivo.txt
    ```

---

## 📜 Histórico de Commits

### Visualizando o Histórico: `git log`
O comando `git log` exibe o histórico de commits do repositório.

1. **Exibir o histórico completo:**
    ```bash
    git log
    ```

2. **Exibir o histórico com detalhes de uma linha por commit:**
    ```bash
    git log --oneline
    ```

3. **Exibir histórico com informações de autor e data:**
    ```bash
    git log --pretty=format:"%h - %an, %ar : %s"
    ```

---

### Exibindo Detalhes de um Commit: `git show`
O comando `git show` exibe detalhes de um commit específico.

1. **Exibir detalhes de um commit pelo SHA:**
    ```bash
    git show <SHA-do-commit>
    ```

---

### Entendendo o SHA dos Commits
O SHA (Secure Hash Algorithm) é um identificador único gerado para cada commit no Git. Ele é usado 
para rastrear e referenciar commits.

Exemplo de um SHA:
```plaintext
3f5e1c4e2d9b7b8f5a2e3c1d4f6a7b8c9d0e1f2g
```

---

## 🔄 Revertendo Alterações

### Usando `git checkout`
O comando `git checkout` permite reverter alterações em arquivos ou alternar para outro commit/branch.

1. **Reverter as alterações de um arquivo específico:**
    ```bash
    git checkout nome-do-arquivo.txt
    ```

2. **Alternar para outro branch ou commit:**
    ```bash
    git checkout <branch-ou-SHA>
    ```

---

### Usando `git reset`
O comando `git reset` desfaz alterações nos commits e no histórico.

1. **Remover arquivos da área de stage:**
    ```bash
    git reset nome-do-arquivo.txt
    ```

2. **Desfazer o último commit, mantendo as alterações no código:**
    ```bash
    git reset --soft HEAD~1
    ```

3. **Desfazer o último commit e as alterações no código:**
    ```bash
    git reset --hard HEAD~1
    ```

---

### Usando `git revert`
O comando `git revert` cria um novo commit que desfaz as alterações de um commit anterior.

1. **Reverter um commit específico:**
    ```bash
    git revert <SHA-do-commit>
    ```

---

### Quando Usar Cada Comando
- **`git checkout`**: Reverter alterações em arquivos não commitados.
- **`git reset`**: Desfazer commits no histórico local.
- **`git revert`**: Criar um commit que desfaz outro, ideal para colaboração.

---

## 🛠 Ignorando Arquivos

### Criando e Configurando um `.gitignore`
O arquivo `.gitignore` é usado para informar ao Git quais arquivos ou pastas devem ser ignorados.

1. **Criar um arquivo `.gitignore`:**
    ```bash
    touch .gitignore
    ```

2. **Adicionar arquivos ou padrões para ignorar:**
    ```plaintext
    # Ignorar arquivos temporários
    *.tmp

    # Ignorar pastas específicas
    /node_modules/

    # Ignorar arquivos de configuração locais
    .env
    ```

---

### Exemplos de Padrões para Ignorar
- Ignorar todos os arquivos `.log`:
    ```plaintext
    *.log
    ```
- Ignorar uma pasta específica:
    ```plaintext
    /build/
    ```
- Ignorar todos os arquivos exceto um:
    ```plaintext
    !arquivo-importante.txt
    ```

---

**Parabéns!** Agora você sabe como gerenciar arquivos, trabalhar com o histórico de commits, 
reverter alterações e configurar um `.gitignore`. No próximo módulo, exploraremos o uso de 
branches e fluxos de trabalho no Git.


######################################################################################################
######################    🌱 Módulo 4: Branches e Fluxos de Trabalho    ##############################
######################################################################################################


Neste módulo, você aprenderá a trabalhar com branches, realizar merges e gerenciar conflitos. Também 
exploraremos os principais fluxos de trabalho usados em equipes e como melhorar a organização com 
Pull Requests no GitHub.

---

## 🌿 Trabalhando com Branches

Os branches permitem que você trabalhe em diferentes funcionalidades ou correções de forma isolada, 
sem afetar o branch principal.

### Criando Branches: `git branch`
Para criar um novo branch:
```bash
git branch nome-do-branch
```

Exemplo:
```bash
git branch feature-login
```

---

### Alternando Entre Branches: `git checkout` ou `git switch`
Para alternar para um branch existente:

1. Usando `git checkout`:
    ```bash
    git checkout nome-do-branch
    ```

2. Usando `git switch` (recomendado para versões mais recentes do Git):
    ```bash
    git switch nome-do-branch
    ```

Exemplo:
```bash
git switch feature-login
```

---

### Fazendo Merge de Branches: `git merge`
Quando um branch está pronto, você pode integrá-lo a outro branch (geralmente o branch principal, 
como `main`).

1. Primeiro, alterne para o branch de destino (por exemplo, `main`):
    ```bash
    git switch main
    ```

2. Em seguida, faça o merge:
    ```bash
    git merge nome-do-branch
    ```

Exemplo:
```bash
git merge feature-login
```

---

### Resolvendo Conflitos Durante o Merge
Um **conflito** ocorre quando há alterações conflitantes em um arquivo nos branches que estão 
sendo mesclados.

1. O Git indicará os arquivos conflitantes.
2. Abra os arquivos conflitantes e procure por marcas como estas:
    ```plaintext
    <<<<<<< HEAD
    (conteúdo do branch atual)
    =======
    (conteúdo do outro branch)
    >>>>>>> nome-do-branch
    ```
3. Escolha quais alterações deseja manter, remova as marcas do conflito e salve o arquivo.
4. Após resolver todos os conflitos, adicione os arquivos corrigidos:
    ```bash
    git add nome-do-arquivo
    ```

5. Finalize o merge com:
    ```bash
    git commit -m "Resolve conflitos ao mesclar feature-login em main"
    ```

---

## 🔄 Fluxos de Trabalho

### Git Flow
O **Git Flow** é um modelo de branching que organiza o desenvolvimento em branches específicos:
- **`main`**: Contém o código em produção.
- **`develop`**: Contém o código para desenvolvimento.
- **Branches de funcionalidade**: Criados a partir de `develop` para novas funcionalidades.
- **Branches de release**: Criados para preparar uma nova versão.
- **Branches de hotfix**: Criados a partir de `main` para corrigir problemas em produção.

Exemplo de comandos no Git Flow:
```bash
git branch develop
git branch feature-login develop
git switch feature-login
```

---

### GitHub Flow
O **GitHub Flow** é mais simples e usado principalmente para projetos que fazem deploy contínuo:
1. Todo trabalho começa em um branch novo a partir de `main`.
2. Após finalizar a funcionalidade, o branch é enviado para o repositório remoto.
3. Um Pull Request é criado para revisão e merge no `main`.

Exemplo:
```bash
git branch feature-login
git switch feature-login
```
Após terminar o trabalho:
```bash
git push origin feature-login
```

No GitHub, abra um Pull Request para revisão e merge.

---

### Melhorando a Organização com Pull Requests no GitHub
Os **Pull Requests (PRs)** são fundamentais para revisar e colaborar no código antes de integrá-lo 
ao branch principal.

1. **Criar um Pull Request**:
    - Após enviar o branch para o repositório remoto, acesse o GitHub e clique no botão **Compare
 & pull request**.
    - Adicione um título e descrição claros para o PR.

2. **Revisar o código**:
    - Use recursos como comentários em linha e aprovações para colaborar com a equipe.

3. **Mesclar o PR**:
    - Após a aprovação, clique em **Merge Pull Request** para integrar o branch ao `main`.

---

**Parabéns!** Agora você sabe como trabalhar com branches, realizar merges, resolver conflitos e 
utilizar fluxos de trabalho eficazes. No próximo módulo, exploraremos como colaborar em equipe com 
ferramentas avançadas do Git e GitHub.


######################################################################################################
######################   🚀 Módulo 5: Colaboração em Equipe   ##############################
######################################################################################################

Neste módulo, você aprenderá sobre ferramentas e estratégias para colaborar efetivamente com outros 
desenvolvedores em projetos Git e GitHub. Exploraremos como usar Forks e Pull Requests, revisar código, 
gerenciar Issues e resolver conflitos em equipe.

---

## 🔗 Forks e Pull Requests

### Como Contribuir para Projetos Open-Source
Contribuir para projetos open-source é uma excelente maneira de aprender, colaborar e ganhar experiência.

1. **Faça um Fork do repositório:**
   - No GitHub, clique no botão **Fork** para criar uma cópia do repositório no seu perfil.

2. **Clone o repositório forkado:**
   ```bash
   git clone https://github.com/seuusuario/repositorio-forkado.git
   cd repositorio-forkado
   ```

3. **Crie um branch para sua contribuição:**
   ```bash
   git checkout -b minha-contribuicao
   ```

4. **Faça as alterações necessárias e commit:**
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   ```

5. **Envie as alterações para o repositório forkado:**
   ```bash
   git push origin minha-contribuicao
   ```

6. **Abra um Pull Request no repositório original:**
   - Acesse o repositório original no GitHub.
   - Clique em **Compare & pull request** e preencha o título e a descrição.

---

### Criando e Gerenciando Pull Requests
Os Pull Requests (PRs) são usados para solicitar a integração de suas alterações ao branch principal.

- **Dicas para criar bons PRs:**
  - Use títulos claros e objetivos.
  - Forneça uma descrição detalhada do que foi alterado e por quê.
  - Adicione capturas de tela ou exemplos, se necessário.
  - Relacione o PR a Issues existentes usando `Fixes #<número-da-issue>`.

- **Gerenciando PRs:**
  - Responda prontamente aos comentários.
  - Faça commits adicionais no mesmo branch para resolver o feedback.
  - Marque os revisores para garantir que o PR seja revisado rapidamente.

---

## 🔍 Revisão de Código

### Dicas para Revisar Pull Requests no GitHub
Revisar código é essencial para manter a qualidade do projeto.

1. **Leia o PR completamente antes de comentar.**
2. **Procure por:**
   - Bugs ou problemas de lógica.
   - Melhorias de performance.
   - Aderência a padrões de código.
3. **Dê feedback construtivo:**
   - Explique o motivo por trás de suas sugestões.
   - Use exemplos para demonstrar melhorias.

4. **Aprove ou solicite mudanças:**
   - Use os botões **Request Changes** ou **Approve** no GitHub.

---

### Ferramentas para Analisar Código
- **Code Review Tools no GitHub:**
  - Comentários em linha: Clique em uma linha específica no PR para comentar.
  - Sugestões: Use o botão **Add suggestion** para propor alterações diretamente.

- **Ferramentas externas:**
  - [SonarQube](https://www.sonarqube.org/): Para análise de qualidade do código.
  - [Codacy](https://www.codacy.com/): Para revisão automatizada de código.

---

## 📋 Gerenciamento de Issues

### Criando e Organizando Issues
As Issues são usadas para rastrear bugs, funcionalidades ou tarefas no projeto.

1. **Criar uma Issue:**
   - No GitHub, clique em **Issues** > **New Issue**.
   - Preencha o título e a descrição com detalhes claros.

2. **Organizar Issues:**
   - Use **labels** para categorizar Issues (ex.: Bug, Enhancement, Documentation).
   - Atribua responsáveis (assignees) para indicar quem está trabalhando nela.
   - Relacione Issues a Milestones para agrupar tarefas relacionadas.

---

### Usando Labels e Milestones
- **Labels:**
  - Ajude a classificar Issues rapidamente.
  - Exemplo: `bug`, `help wanted`, `good first issue`.

- **Milestones:**
  - Agrupe Issues relacionadas a um objetivo maior.
  - Exemplo: **Versão 1.0** pode conter Issues de funcionalidades e correções de bugs.

---

## 🤝 Resolvendo Conflitos em Equipe

### Estratégias para Evitar Conflitos
1. **Rebase frequentemente:**
   - Mantenha seu branch atualizado com o branch principal.
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Faça commits pequenos e frequentes:**
   - Isso facilita a revisão e integração.

3. **Evite trabalhar no mesmo arquivo/trecho de código que outros desenvolvedores.**

4. **Use squash para limpar o histórico:**
   - Condense múltiplos commits pequenos em um único commit:
     ```bash
     git rebase -i HEAD~n
     ```

---

### Como Resolver Conflitos no GitHub
1. **Ao fazer um Pull Request, o GitHub indicará se há conflitos.**
2. **Resolva os conflitos localmente:**
   - Faça o pull do branch principal:
     ```bash
     git pull origin main
     ```
   - Resolva os conflitos nos arquivos indicados.
   - Após resolver, adicione os arquivos corrigidos:
     ```bash
     git add nome-do-arquivo
     ```
   - Finalize o processo:
     ```bash
     git commit -m "Resolve conflitos"
     git push
     ```

3. **Resolva conflitos diretamente no GitHub:**
   - Clique no botão **Resolve conflicts** no PR.
   - Edite os arquivos diretamente na interface do GitHub e clique em **Mark as resolved**.

---

**Parabéns!** Agora você sabe como colaborar efetivamente em equipe, gerenciar Issues, revisar Pull 
Requests e lidar com conflitos. No próximo módulo, exploraremos como automatizar processos com o 
GitHub Actions.

######################################################################################################
######################    🛠 Módulo 6: Automação com GitHub Actions   ################################
######################################################################################################

Neste módulo, você aprenderá como usar o GitHub Actions para automatizar tarefas no seu repositório. 
Isso inclui configurar workflows, criar automações personalizadas, e dicas avançadas para melhorar sua 
produtividade.

---

## 🚀 Introdução ao GitHub Actions

### O que é o GitHub Actions?
O GitHub Actions é uma ferramenta de automação integrada ao GitHub que permite criar workflows
personalizados para diferentes eventos no repositório. Com ele, você pode automatizar tarefas como:
- Testes automáticos.
- Deploy contínuo.
- Geração de documentação.
- Envio de notificações.

---

## 📄 Criando seu Primeiro Workflow

Os workflows do GitHub Actions são configurados em arquivos YAML localizados na pasta `.github/workflows`.

### Passo 1: Criando o Arquivo do Workflow
1. Crie a pasta `.github/workflows` no seu repositório (se ainda não existir).
2. Dentro da pasta, crie um arquivo YAML, como `main.yml`.

### Passo 2: Estrutura Básica de um Workflow
Aqui está um exemplo de workflow básico que executa testes em um projeto:
```yaml
name: Testes Automatizados

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  run-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v3

      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Instalar dependências
        run: npm install

      - name: Executar testes
        run: npm test
```

---

## 🔄 Exemplos de Automação com GitHub Actions

### 1. CI/CD (Integração Contínua e Deploy Contínuo)
Execute testes automaticamente e implante seu código ao fazer push no branch `main`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v3

      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Instalar dependências
        run: npm install

      - name: Executar testes
        run: npm test

      - name: Deploy para produção
        run: npm run deploy
```

---

### 2. Enviar Notificações no Slack
Automatize notificações para o Slack ao criar um Pull Request:
```yaml
name: Notificação Slack

on:
  pull_request:

jobs:
  notify-slack:
    runs-on: ubuntu-latest

    steps:
      - name: Enviar notificação para Slack
        uses: slackapi/slack-github-action@v1.20.0
        with:
          payload: '{"text":"Um novo Pull Request foi aberto!"}'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

### 3. Gerar Documentação
Automatize a geração de documentação com ferramentas como Docusaurus:
```yaml
name: Gerar Documentação

on:
  push:
    branches:
      - main

jobs:
  generate-docs:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v3

      - name: Instalar dependências
        run: npm install

      - name: Gerar documentação
        run: npm run build-docs
```

---

## 🛡️ Usando Secrets no GitHub Actions

Os **Secrets** no GitHub são variáveis sensíveis, como senhas, tokens ou chaves de API, que podem ser 
usadas em workflows sem serem expostas.

### Adicionando um Secret no Repositório
1. No repositório, acesse **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
2. Adicione o nome e valor do Secret.

### Usando Secrets no Workflow
Os Secrets podem ser referenciados no arquivo YAML com `${{ secrets.<NOME_DO_SECRET> }}`:
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

---

## 🛠 Dicas Avançadas para GitHub Actions

1. **Reutilize Workflows**:
   - Use workflows reutilizáveis para evitar duplicação de código.
   - Exemplo:
     ```yaml
     jobs:
       deploy:
         uses: usuario/repo/.github/workflows/deploy.yml@main
     ```

2. **Monitore Execuções**:
   - Verifique logs detalhados diretamente na aba **Actions** no GitHub.

3. **Melhore a Performance**:
   - Use `caching` para acelerar execuções:
     ```yaml
     - name: Cache de dependências Node.js
       uses: actions/cache@v3
       with:
         path: ~/.npm
         key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
         restore-keys: |
           ${{ runner.os }}-node-
     ```

4. **Teste Workflows Localmente**:
   - Use ferramentas como o [act](https://github.com/nektos/act) para simular execuções localmente.

---

**Parabéns!** Agora você sabe como criar workflows no GitHub Actions, configurar automações e usar 
ferramentas avançadas para melhorar sua produtividade. No próximo módulo, exploraremos segurança e 
boas práticas no Git e GitHub.

######################################################################################################
#########################   🔒 Módulo 7: Segurança e Boas Práticas   #################################
######################################################################################################


Neste módulo, você aprenderá a proteger seus repositórios e garantir que suas práticas de desenvolvimento
 sejam seguras. Abordaremos proteção de branches, autenticação com SSH, melhores práticas para commits
 e estratégias de backup.

---

## 🛡️ Proteção de Branches

### Configurando Regras no GitHub
Proteger branches impede alterações não autorizadas e ajuda a manter o código em produção estável.

1. **Acesse as configurações do repositório**:
   - Vá para a aba **Settings** no GitHub.
   - Clique em **Branches** no menu lateral.

2. **Crie uma regra para o branch**:
   - Em **Branch protection rules**, clique em **Add rule**.
   - Insira o nome do branch (ex.: `main`) ou use padrões como `release/*`.

3. **Ative as opções de proteção**:
   - **Require a pull request before merging**: Exige Pull Requests para merges.
   - **Require status checks to pass before merging**: Permite merges apenas se os workflows do GitHub 
      Actions forem aprovados.
   - **Include administrators**: Aplicará as regras de proteção também para administradores.

4. **Salve as alterações** clicando em **Create**.

---

## 🔑 Gerenciamento de Chaves SSH

### Configurando SSH para Autenticação no GitHub
Usar chaves SSH é uma maneira segura de autenticar no GitHub sem precisar de senha.

1. **Gerar uma chave SSH**:
   - No terminal, execute:
     ```bash
     ssh-keygen -t ed25519 -C "seuemail@example.com"
     ```
   - Caso sua versão do SSH não suporte o algoritmo `ed25519`, use:
     ```bash
     ssh-keygen -t rsa -b 4096 -C "seuemail@example.com"
     ```

2. **Adicionar a chave SSH ao agente SSH**:
   - Inicie o agente:
     ```bash
     eval "$(ssh-agent -s)"
     ```
   - Adicione a chave gerada:
     ```bash
     ssh-add ~/.ssh/id_ed25519
     ```

3. **Adicionar a chave SSH ao GitHub**:
   - Copie a chave pública:
     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```
   - No GitHub, vá para **Settings** > **SSH and GPG keys** > **New SSH key**.
   - Cole a chave pública e salve.

4. **Testar a conexão SSH**:
   ```bash
   ssh -T git@github.com
   ```

---

## 🛠️ Melhores Práticas

### Mensagens de Commit Claras
Mensagens de commit claras ajudam a entender o histórico do projeto.

- **Estrutura recomendada**:
  ```
  Tipo: Resumo curto do commit

  Descrição detalhada do commit (opcional).
  ```
  Exemplos:
  - **Bom:** `fix: Corrige erro na exibição de usuários`
  - **Ruim:** `arrumei um bug`

- **Tipos comuns de commit**:
  - `feat`: Adição de nova funcionalidade.
  - `fix`: Correção de bug.
  - `docs`: Alterações na documentação.
  - `style`: Alterações de formatação ou estilo (sem mudanças de lógica).
  - `refactor`: Refatoração de código.
  - `test`: Adição ou correção de testes.

---

### Evitando Arquivos Sensíveis no Repositório
Nunca inclua arquivos sensíveis, como `.env` ou senhas, no repositório.

1. **Usar `.gitignore`**:
   - Crie ou edite o arquivo `.gitignore` para ignorar arquivos sensíveis:
     ```plaintext
     # Ignorar arquivos de configuração
     .env
     config/*.json

     # Ignorar chaves e senhas
     *.key
     *.pem
     ```

2. **Remover arquivos sensíveis já commitados**:
   - Caso você já tenha commitado um arquivo sensível, remova-o do histórico:
     ```bash
     git rm --cached nome-do-arquivo
     git commit -m "Remove arquivo sensível do histórico"
     git push
     ```

3. **Use ferramentas de escaneamento**:
- Ferramentas como o :
[GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning) 
ajudam a detectar senhas e chaves expostas.

---

## 💾 Backup de Repositórios

### Estratégias para Manter Cópias Seguras dos Projetos

1. **Clonar Repositórios Localmente**:
   - Mantenha uma cópia local do repositório:
     ```bash
     git clone https://github.com/usuario/repositorio.git
     ```

2. **Usar Serviços de Backup**:
   - Ferramentas como [GitHub Archive Program](https://archiveprogram.github.com/) armazenam 
     cópias de longo prazo dos seus repositórios.
   - Configure backups automáticos com serviços como AWS, Google Drive ou Dropbox.

3. **Exportar Repositórios para ZIP**:
   - No GitHub, baixe uma cópia compactada:
     - Vá para a página do repositório.
     - Clique em **Code** > **Download ZIP**.

4. **Espelhar Repositórios**:
   - Configure um repositório secundário para backup:
     ```bash
     git clone --mirror https://github.com/usuario/repositorio.git
     cd repositorio.git
     git push --mirror https://outro-servidor.com/repositorio.git
     ```

---

**Parabéns!** Agora você sabe como proteger seus repositórios, configurar autenticação segura, seguir 
melhores  práticas e manter backups do seu trabalho. No próximo módulo, exploraremos exercícios e 
projetos práticos para consolidar o aprendizado.

######################################################################################################
######################### 🎓 Módulo 8: Exercícios e Projetos   #######################################
######################################################################################################


Neste módulo final, você terá a oportunidade de consolidar todos os conceitos aprendidos nos módulos 
anteriores por meio de exercícios práticos e desafios avançados. Além disso, você será guiado na 
construção de um projeto final que engloba todas as práticas de Git e GitHub.

---

## 📝 Exercícios Práticos

### 1. Criar Repositórios, Clonar, Fazer Commits e Push
**Objetivo**: Praticar os comandos básicos do Git e sincronizar com o GitHub.

**Passos**:
1. Crie um repositório local:
    ```bash
    mkdir meu-projeto
    cd meu-projeto
    git init
    ```

2. Crie um arquivo, adicione e faça commit:
    ```bash
    echo "Olá, GitHub!" > README.md
    git add README.md
    git commit -m "Adiciona README inicial"
    ```

3. Crie um repositório remoto no GitHub e conecte:
    ```bash
    git remote add origin https://github.com/seuusuario/meu-projeto.git
    git branch -M main
    git push -u origin main
    ```

4. Clone o repositório em outro diretório para simular uma nova máquina:
    ```bash
    git clone https://github.com/seuusuario/meu-projeto.git
    cd meu-projeto
    ```

---

### 2. Resolver Conflitos Simulados
**Objetivo**: Praticar a resolução de conflitos no Git.

**Passos**:
1. Crie um branch e faça alterações:
    ```bash
    git checkout -b feature-1
    echo "Texto no branch feature-1" > arquivo.txt
    git add arquivo.txt
    git commit -m "Adiciona alterações no branch feature-1"
    ```

2. Volte ao branch principal e faça alterações conflitantes:
    ```bash
    git checkout main
    echo "Texto no branch main" > arquivo.txt
    git add arquivo.txt
    git commit -m "Adiciona alterações no branch main"
    ```

3. Faça o merge do branch `feature-1` no `main`:
    ```bash
    git merge feature-1
    ```

4. Resolva o conflito no arquivo `arquivo.txt` e finalize o merge:
    ```bash
    git add arquivo.txt
    git commit -m "Resolve conflito entre main e feature-1"
    ```

---

## 🚀 Desafios Avançados

### 1. Criar um Workflow Completo com GitHub Actions
**Objetivo**: Automação de tarefas usando GitHub Actions.

**Passos**:
1. Crie o arquivo `.github/workflows/test.yml` no repositório.
2. Configure um workflow para executar testes em um projeto Node.js:
    ```yaml
    name: CI Pipeline

    on:
      push:
        branches:
          - main
      pull_request:

    jobs:
      build:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout do código
            uses: actions/checkout@v3

          - name: Configurar Node.js
            uses: actions/setup-node@v3
            with:
              node-version: 16

          - name: Instalar dependências
            run: npm install

          - name: Executar testes
            run: npm test
    ```

3. Faça um commit e push das alterações:
    ```bash
    git add .github/workflows/test.yml
    git commit -m "Adiciona workflow para execução de testes"
    git push
    ```

4. Verifique o resultado na aba **Actions** do GitHub.

---

### 2. Colaborar em Equipe em um Projeto Fictício
**Objetivo**: Simular o trabalho em equipe com Pull Requests e revisão de código.

**Passos**:
1. Crie um repositório compartilhado com um colega (ou simule com dois usuários).
2. Um usuário cria uma Issue para descrever uma tarefa.
3. O outro usuário cria um branch e implementa a tarefa:
    ```bash
    git checkout -b feature-implementacao
    ```
4. Após finalizar, faça o push e abra um Pull Request:
    ```bash
    git push origin feature-implementacao
    ```
5. Revise o Pull Request, resolva conflitos (se houver) e faça o merge.

---

## 🏆 Projeto Final

**Objetivo**: Criar um repositório completo que inclua todas as boas práticas e ferramentas aprendidas.

### Requisitos do Projeto Final:
1. **Estrutura do Repositório**:
    - Inclua um arquivo `README.md` com uma descrição clara do projeto.
    - Crie um arquivo `.gitignore` para ignorar arquivos desnecessários.

2. **Branches e Workflow**:
    - Crie pelo menos dois branches: `main` e `develop`.
    - Configure um workflow no GitHub Actions para testes automatizados.

3. **Documentação**:
    - Adicione um guia de contribuição no arquivo `CONTRIBUTING.md`.
    - Use Issues para descrever funcionalidades ou bugs.

4. **Simulação de Colaboração**:
    - Trabalhe com Pull Requests e revisão de código.

5. **Automação**:
    - Configure um workflow para gerar documentação ou realizar deploy (se aplicável).

---

**Exemplo de Estrutura do Projeto Final**:
```plaintext
meu-projeto/
├── .github/
│   └── workflows/
│       └── test.yml
├── src/
│   └── index.js
├── .gitignore
├── README.md
├── CONTRIBUTING.md
└── package.json
```

---

**Parabéns!** Você chegou ao final do curso. Ao concluir os exercícios e o projeto final, você terá 
dominado Git e GitHub, incluindo conceitos básicos, fluxos de trabalho e 
ferramentas avançadas para automação e colaboração. 🎉

