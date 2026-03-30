# PERSONA: Aristides B Pontes 

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)
* 🌐 **Meu_site:** [https://aristidesbp.github.io](https://aristidesbp.github.io)
* 🌐 **Doc_erp:** [https://aristidesbp.github.io](https://aristidesbp.github.io/doc/projeto.md)
* 🌐 **Aulas:** [https://aristidesbp.github.io](https://aristidesbp.github.io/doc/aulas.md)


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX
* Download do aplicativo direto no github:
Acesse o link oficial (não uso da Play Store)
[TERMUX](https://github.com/termux/termux-app/releases)
* em caso de dúvida peço ajuda ao genini (Ia do google, ou outra da sua escolha)
```
# Quando coloca o "jogo da velha" na frente de um texto, ele se torna comentário no TERMUX!!!
# Por esse motivo você pode copiar os códigos mesmo com comentários que vai funcionar!
```
```
# comando para atualizar o termux:
pkg update && pkg upgrade -y
```
```
# comando para autorizar o uso de pastas do celular
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
# comando para criar pasta
mkdir novo_projeto
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

---
# 🟥 COMO BAIXAR MIDIAS COM TERMUX 
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
# Troque a URL remota para usar SSH
git remote set-url origin git@github.com:usuario/repositorio.git
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
#🧪 Teste de conexão com GitHub via SSH 
# Se tudo estiver certo, você verá:
# Hi SEU_USUARIO! You've successfully authenticated..
ssh -T git@github.com
```

## ⚠️ OBS: VERIFIQUE CONFIG GITHUB !
----------------------------------------------------
1. Acesse: https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
8. 🧪 Teste de conexão com GitHub via SSH novamente
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

---
# 🟥 GITHUB : BAIXAR E ENVIAR ARQUIVOS 
```
git clone git@github.com:aristidesbp/aristidesbp.github.io
## Clona o repositório com chave SSH
```
```
cd aristidesbp.github.io
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
---
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
# APAGAR ARQUIVO LOCAL E COLAR O REPOSITÓRIO 
```
# 1. Sincroniza as informações com o GitHub 
git fetch origin
# 2. APAGA seus arquivos locais para ficarem idênticos ao servidor
git reset --hard origin/main
```
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
---
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

---
# 🟥 SERVIDOR PYTHON 
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

---
# 🟥 ADICIONANDO COLABORADORES NO GITHUB 
* Vamos criar um tutorial completo, atualizado e seguro ensinando como adicionar colaboradores (programadores) ao repositório do seu GitHub Pages, permitindo que outras pessoas desenvolvam ou editem o site diretamente no GitHub — com permissões controladas.

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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROJETO ERP_ABP 
## ARQUITETURA DAS PASTAS MVC
```
erp_abp/
├── assets/              # Arquivos estáticos
│   ├── css/             # Arquivos .css (estilos)
│   ├── js/              # Bibliotecas de terceiros (Supabase, PDF, etc)
│   └── img/             # Imagens e ícones
├── src/                 # Código fonte da aplicação
│   ├── sql/             # Código SQL para banco de dados (Interação com Supabase)
│   ├── models/          # Lógica de dados (Interação com Supabase)
│   ├── controllers/     # Regras de negócio e ponte View <-> Model
│   └── views/           # Apenas a interface (HTML puro)
└── index.html           # Ponto de entrada (Dashboard)
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# SUPABASE
## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto: nome_do_seu_projeto
* Senha do banco: ***********
* Região: brasil

## src/model/supabase_config.js
```
// config/supabase_config.js
// Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const _supabaseUrl = 'url_ProjectID';
const _supabaseKey = 'anon_key;

// Inicializa o cliente globalmente
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

// Função utilitária global para logout (usada na navbar)
function sairDaConta() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../../index.html"; // Ajuste o caminho conforme necessário
}
console.log("✅ Conexão Supabase configurada.");
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# TUTORIAL PROJETO ERP_ABP (BANCO DE DADOS SUPABASE):
---
# PASSO_01: CRIAR TABELAS:
## public.usuarios(tabela espelho do auth)
```
CREATE TABLE public.usuarios (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  nome_completo text,
  bio text,
  avatar_url text,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```
## public.tipo_tranzacao
```
CREATE TABLE public.tipo_tranzacao (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  categorias text,
  CONSTRAINT tipo_tranzacao_pkey PRIMARY KEY (id)
);

```
## public.financeiro
```
CREATE TABLE public.financeiro (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  descricao text,
  forma_pagamento text,
  data_vencimento date,
  data_pagamento date,
  valor double precision,
  status boolean DEFAULT true,
  quant_parcelas bigint,
  boleto_url text,
  comprovante_url text,
  observacao text,
  categoria text,
  tipo bigint,
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_tipo_fkey FOREIGN KEY (tipo) REFERENCES public.tipo_tranzacao(id)
);

```
---
# PASSO_02: Database/Functions 
* Para apagar, você precisa remover a dependência primeiro. Vá até o SQL Editor do Supabase e execute este comando:
```
drop function public.handle_new_user cascade;
drop function public.rls_auto_enable cascade;
```
## prompt para tabela usuario criar automaticament:
```
Crie uma função trigger que para ser implementado no Supabase com o seguinte objetivo;
A cada novo usuario que for criado no shema auth, deve ser criado o mesmo usuario no schema public na tabela abaixo:

CREATE TABLE public.usuarios (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  nome_completo text,
  bio text,
  avatar_url text,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

```
---
## Database/Functions/public.handle_new_user(): esta função será executada sempre que um novo registro entrar em auth.users. Ela extrai o id (UUID) e, se disponível, o nome completo dos metadados do usuário.
```
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (user_id, nome_completo, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;
```
---
## Agora, vinculamos a função acima à tabela de autenticação do Supabase.

```
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```
---
# PAASO_03: Criar uma view no Supabase
## prompt para View- supabase
```
Crie uma chamada v_financeiro que liste os movimentos da tabela financeiro e os dethalhes autor que esta na tabela usuarios, alem disso, caucule  os  valores de cada categoria com registrada na tabela finaceiro para que o usuario saiba os valores de entrada, saida e previsao no seu caixa.

conforme o schema abaixo: (cole o schemado banco)
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.financeiro (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  descricao text,
  forma_pagamento text,
  data_vencimento date,
  data_pagamento date,
  valor double precision,
  status boolean DEFAULT true,
  quant_parcelas bigint,
  boleto_url text,
  comprovante_url text,
  observacao text,
  categoria text,
  tipo bigint,
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_tipo_fkey FOREIGN KEY (tipo) REFERENCES public.tipo_tranzacao(id)
);
CREATE TABLE public.tipo_tranzacao (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  categorias text,
  CONSTRAINT tipo_tranzacao_pkey PRIMARY KEY (id)
);
CREATE TABLE public.usuarios (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  nome_completo text,
  bio text,
  avatar_url text,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```
## Script SQL: Criando a View `v_financeiro`

```
create or replace view public.v_financeiro as
select 
    -- Dados principais do financeiro
    f.id,
    f.created_at,
    f.descricao,
    f.valor,
    f.data_vencimento,
    f.data_pagamento,
    f.status,
    f.categoria as categoria_manual,
    f.forma_pagamento,
    
    -- Dados do Autor (tabela usuarios)
    u.nome_completo as autor_nome,
    u.avatar_url as autor_avatar,
    
    -- Tipo de Transação (tabela tipo_tranzacao)
    tt.categorias as tipo_nome,

    -- Lógica de Cálculo de Caixa
    -- ENTRADA: Quando o tipo é 'Entrada' e já foi pago/recebido
    case 
        when tt.categorias ilike '%entrada%' and f.data_pagamento is not null then f.valor 
        else 0 
    end as valor_entrada,

    -- SAÍDA: Quando o tipo é 'Saída' e já foi pago
    case 
        when tt.categorias ilike '%saida%' and f.data_pagamento is not null then f.valor 
        else 0 
    end as valor_saida,

    -- PREVISÃO: Tudo que ainda não tem data de pagamento (independente de ser entrada ou saída)
    case 
        when f.data_pagamento is null then f.valor 
        else 0 
    end as valor_previsao

from 
    public.financeiro f
left join 
    public.usuarios u on f.user_id = u.user_id
left join 
    public.tipo_tranzacao tt on f.tipo = tt.id;

```
# para selecionar sls das tabelas que compoem a view adicione: with (security_invoker)
* Exemplo: create or replace view public.v_financeiro with (security_invoker) as
select .....

```
# aplolicies usuario (crud completo/ apenas o propio usuario)
* selecione a tabela/Add RLS policy/Create policy
* Policy Name:                 usuario_master
* Policy Command for clause:   ALL
* Target Roles to clause:      authenticated


Use options above to edit
create policy "usuario_master"
on "public"."usuarios"
as PERMISSIVE
for ALL
to authenticated
using (

```
(user_id = auth.uid())
```

) with check (

```
(user_id = auth.uid())
```
);


---
# prompt para criar paginas para hospedar no guithub
```
1- Crie um projeto Incrivel e Profifional, com arquitetura full_stack (frontend e backend) para a plataforma "erp_abp_financeiro",um sistema SAAS de controle financeiro.
2- O design deve ser LightMode , moderno e acolhedor, utilizando a biblioteca Shadch/UI e TailwindCSS.
3- O backend ja esta pronto e configurado no supabase.
4- O backend ja esta criado em Supabase, onde:
* ProjectID:
* Anon Key: 

```







