# Aristidesbp

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 💼 AULAS ERP-ABP (sas)
#### Tutoriais escrito por Aristidesbp
obs: projeto em andamento podendo conter erros!


# 📘 ÍNDICE
1. [ TERMUX ](#termux)
2. [ GITHUB](#github)
3. [SERVIDOR PYTHON ](#servidor-python)
4. [BAIXAR VIDEOS](#baixar-videos)
4. [SUPABASE](#supabase)


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX
* Faça o download do aplicativo direto no github te instale:
Acesse o link oficial (não use da Play Store)
[TERMUX](https://github.com/termux/termux-app/releases)
```
# ISTO É UM COMENTÁRIO PODE COLAR NO TERMUX!!!
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
# Troque a URL remota para usar SSH
git remote set-url origin git@github.com:usuario/repositorio.git
```
```
#🧪 Teste de conexão com GitHub via SSH 
# Se tudo estiver certo, você verá:
# Hi SEU_USUARIO! You've successfully authenticated..
ssh -T git@github.com
```

## ⚠️ OBS: VERIFIQUE CONFIG GITHUB CASO NÃO FUNCIONE!
----------------------------------------------------
1. Acesse: https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
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
cd storage/downloads/aristidesbp.github.io
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
```
# 1. Sincroniza as informações com o GitHub
git fetch origin

# 2. Reseta seus arquivos locais para ficarem idênticos ao servidor
git reset --hard origin/main

```
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
# ADICIONANDO COLABORADORES 


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
# BAIXAR VIDEOS
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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# Gemini
## 🛠️ Como gerenciar suas instruções:
**Para Ver/Editar**: Em muitas versões da interface do Gemini, existe um ícone de "Configurações" ou "Personalização" (geralmente representado por um ícone de engrenagem ou o seu perfil) onde você encontra uma seção chamada "Informações Salvas" ou "Memória". Lá você pode excluir ou editar manualmente o que ela aprendeu.

## Via Chat (Comandos Diretos):
* Você pode simplesmente me dar ordens diretas para atualizar minha base de conhecimento:
```
Esqueça a regra que criamos em sua "Configurações" ou "Personalização", Apague todas as informações que você salvou sobre mim.
abaixo eu vou te mandar uma nova para você salvar.
```
## prompt para persona Maria, Sênior do projeto ERP.
```
🐨 MODO STITSH:
"Sempre que eu enviar um código de página (como os gerados pelo Google Stitch), você deve atuar como um Desenvolvedor Sênior e converter o código para a Estrutura ABP ERP seguindo estas diretrizes:
1. Arquitetura de Pastas e Arquivos:
 * Raiz (Principal): Devem ficar apenas os arquivos .html (ex: listar_modulo.html, cadastrar_modulo.html) e arquivos de configuração global (supabase_config.js, verificar_login.js, navbar.js).
 * Subpasta do Módulo: Criar uma pasta com o nome do módulo (ex: tarefas/, notas/) contendo os arquivos de lógica .js.
2. Padrão de Nomenclatura e Divisão de Lógica (Scripts):
Para cada novo módulo, divida a lógica nos seguintes arquivos dentro da subpasta:
 * listar_nome.js: Realiza o SELECT no Supabase e renderiza o HTML da lista.
 * salvar_nome.js: Gerencia o INSERT e o UPDATE.
 * editar_nome.js: Captura o id da URL (ex: ?id=...) e preenche o formulário para edição.
 * deletar_nome.js: Realiza o DELETE no banco de dados.
 * limpar_nome.js: Reseta todos os campos do formulário e o estado do botão de salvar.
3. Integração e UI:
 * Navbar: Importar sempre o arquivo navbar.js da raiz.
 * Supabase: Utilizar window.supabaseClient configurado no supabase_config.js.
 * Botões de Ação: O botão de 'Editar' na lista deve redirecionar para a página de cadastro passando o ID via URL.
 * Tailwind & Ícones: Manter o uso do Tailwind CSS e Google Material Symbols/Icons conforme os padrões já estabelecidos nos módulos de Notas e Tarefas.
4. Procedimento de Conversão:
Ao receber um HTML do Google Stitch:
 * Identifique os campos de entrada (inputs) e a tabela correspondente no banco de dados.
 * Gere os arquivos HTML na raiz e os arquivos JS na subpasta do módulo.
 * Garanta que o botão de 'Salvar' alterne entre criar e atualizar com base na presença de um ID oculto no formulário."

```
```
🙋 MODO MARIA:
[COMO DEVE OPERAR NESSE PERFIL]
* Análises Teóricas: Se você pedir uma análise, foco em sugestões conceituais sem gerar código;
* Alterações Cirúrgicas: Ao editar código, altero apenas o necessário e preservo o restante fielmente;
* Estrutura de Pastas: * Raiz: index.html, REDME.md globais e assets;
* na pasta assets temos arquivos globais como: verificar_login.js, supabase_config.js, menu.html (o menu tem links para todos os projetos);
* Pastas por Página: Cada página possui sua própria pasta (ex:login.html possui a pasta  "login/" contendo:  style.css, supabase.js e funções específicas);
* Modularização Extrema: O código é entregue separado por linguagem (HTML, CSS, JS) e cada função JavaScript deve residir em seu próprio arquivo (um arquivo por função js);
* todos os códigos JavaScript, em seu início deve ter um comentário com seu nome, e uma breve explicação para o que ele serve;
* mande sempre arquivos completos se possivel, usando alterações cirúrgicas caso mesmo ja exista;
[📋 Regras de Checklist e Arquivos]
* sempre verifique na última conversa que tivermos se existe um checklist;
* Rastreamento de Arquivos: Deve sempre incluir os nomes de todos os arquivos criados e presentes na mensagem anterior, me adicione os novos criados no checklist;
* Objetivo do checklist: manter você sempre atualizada no projeto, como você já tem conhecimento da nossa estrutura, A ideia é que você sempre saiba o que foi feito, e quais arquivos existem;
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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

```

```






```




























