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
  
---
# 🟥 sql (exemplo de como criar uma tabelas)
```
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.entidades (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome_completo text NOT NULL,
  cpf text,
  data_nascimento date,
  genero text,
  estado_civil text,
  tipo_entidade text,
  status_entidade text,
  tipo_acesso text,
  email text,
  telefone text,
  senha_acesso text,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  avaliacao integer DEFAULT 5,
  observacoes text,
  arquivos_url ARRAY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.financeiro (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id uuid,
  tipo text CHECK (tipo = ANY (ARRAY['Pagar'::text, 'Receber'::text, 'pagar'::text, 'receber'::text])),
  descricao text NOT NULL,
  categoria text,
  forma_pagamento text,
  data_vencimento date,
  data_pagamento date,
  valor numeric DEFAULT 0,
  status text CHECK (status = ANY (ARRAY['Pendente'::text, 'Pago'::text, 'pendente'::text, 'pago'::text])),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT financeiro_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.pedidos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cliente_nome text,
  total numeric,
  status text DEFAULT 'pendente'::text,
  itens jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pedidos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome text NOT NULL,
  codigo_de_barras text,
  marca text,
  sku text,
  categoria_prod text,
  entidade_id uuid,
  descricao text,
  data_vencimento date,
  preco_custo numeric DEFAULT 0,
  preco_venda numeric DEFAULT 0,
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 5,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  data_compra date,
  imagem_url text,
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT produtos_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.tarefas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  entidade text,
  tarefa_descricao text,
  status text DEFAULT 'pendente'::text,
  observacao text,
  CONSTRAINT tarefas_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.venda_itens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venda_id uuid,
  produto_id uuid,
  quantidade integer NOT NULL,
  preco_unitario numeric NOT NULL,
  CONSTRAINT venda_itens_pkey PRIMARY KEY (id),
  CONSTRAINT venda_itens_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id),
  CONSTRAINT venda_itens_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id)
);
CREATE TABLE public.vendas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id uuid,
  total_venda numeric NOT NULL,
  metodo_pagamento text,
  data_venda timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT vendas_pkey PRIMARY KEY (id),
  CONSTRAINT vendas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT vendas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
```

# 🟥 Habilitar o Row Level Security (Segurança de Linha)
```
-- 2. Habilitar o Row Level Security (Segurança de Linha)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 3. Criar política: Usuários podem ver apenas suas próprias notas
CREATE POLICY "Usuários podem ver suas próprias notas" 
ON notes FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Criar política: Usuários podem inserir apenas suas próprias notas
CREATE POLICY "Usuários podem inserir suas próprias notas" 
ON notes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 5. Criar política: Usuários podem atualizar apenas suas próprias notas
CREATE POLICY "Usuários podem atualizar suas próprias notas" 
ON notes FOR UPDATE 
USING (auth.uid() = user_id);

-- 6. Criar política: Usuários podem deletar apenas suas próprias notas
CREATE POLICY "Usuários podem deletar suas próprias notas" 
ON notes FOR DELETE 
USING (auth.uid() = user_id);

```
---
## 🟥 COMO FAZER BKP DO SUPABASE
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
---
## 🟥 COMO APAGAR USUARIO E SUAS DEPENDENCIAS
```
-- 1. Tabela de PRODUTOS
ALTER TABLE public.produtos
DROP CONSTRAINT IF EXISTS produtos_entidade_id_fkey,
ADD CONSTRAINT produtos_entidade_id_fkey 
   FOREIGN KEY (entidade_id) 
   REFERENCES public.entidades(id) 
   ON DELETE CASCADE;

-- 2. Tabela de FINANCEIRO
ALTER TABLE public.financeiro
DROP CONSTRAINT IF EXISTS financeiro_entidade_id_fkey,
ADD CONSTRAINT financeiro_entidade_id_fkey 
   FOREIGN KEY (entidade_id) 
   REFERENCES public.entidades(id) 
   ON DELETE CASCADE;

-- 3. Tabela de VENDAS
ALTER TABLE public.vendas
DROP CONSTRAINT IF EXISTS vendas_entidade_id_fkey,
ADD CONSTRAINT vendas_entidade_id_fkey 
   FOREIGN KEY (entidade_id) 
   REFERENCES public.entidades(id) 
   ON DELETE CASCADE;

```
```
-- 1. Ajusta o vínculo entre Itens da Venda e Produtos
ALTER TABLE public.venda_itens
DROP CONSTRAINT IF EXISTS venda_itens_produto_id_fkey,
ADD CONSTRAINT venda_itens_produto_id_fkey 
   FOREIGN KEY (produto_id) 
   REFERENCES public.produtos(id) 
   ON DELETE CASCADE;

-- 2. Por segurança, garante que o vínculo entre Item e Venda também seja cascata
ALTER TABLE public.venda_itens
DROP CONSTRAINT IF EXISTS venda_itens_venda_id_fkey,
ADD CONSTRAINT venda_itens_venda_id_fkey 
   FOREIGN KEY (venda_id) 
   REFERENCES public.vendas(id) 
   ON DELETE CASCADE;
```

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
# PROJETO ERP-ABP  (ARQUITETURA MVC)

```
PROJETO_ERP/
├── index.html                   # Redireciona para src/view/index.html
├── assets/                      # Arquivos estáticos (CSS, Imagens)
│   ├── img/                     # Ícones e logos
│   └── style/                   # Estilos CSS segmentados
│       ├── style_login.css
│       ├── style_index.css
│       └── style_navbar.css
│ 
└── src/                           # Código fonte da aplicação
    ├── model/                     # Interação com Banco de Dados (Supabase)
    │   ├── supabase_config.js     # cofiguraçao de chaves (Supabase)
    │   ├── login.js               # cadastra e faz o login
    │   ├── verificar_login.js     # verifica se o usuario esta logado
    │   └── controle_de_acesso.js  # verifica oque o usuario pode ver ou fazer
    │
    │ 
    ├── view/                       # Interface do usuário (HTML puro)
    │   ├── index.html
    │   ├── login.html
    │   ├── listar_nivel_acesso.html
    │   ├── cadastrar_nivel_acesso.html
    │   ├── listar_categorias.html
    │   ├── cadastrar_categorias.html
    │   ├── listar_exercicios.html
    │   ├── cadastrar_exercicios.html
    │   ├── listar_usuarios.html
    │   ├── cadastrar_usuarios.html
    │   └── relatorios.html
    │
    ├── controller/              # Lógica de interface e ponte MVC
    │   ├── navbar.js
    │   └── pdv.js
    │ 
    └── services/                # Integrações externas e Backend (Edge Functions)
        └── mercadopago_supabase/
            ├── doc.md
            ├── index.html
            ├── servicos.json
            ├── site.html
            ├── sucesso.html
            └── supabase/
                └── functions/
                    └── checkout/
                        ├── deno.json
                        └── index.ts

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/supabase_config.js
```
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://seu_endereço';
const supabaseKey = 'sua_senha';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/login.js
```
/* ####################################################################################################################### */
/* ####################################################################################################################### */
/*
* Nome do arquivo: realizar_login.js
* Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
* OBS: criar usuario diretamente no supabase para testar!
*/
async function realizarLogin() {

/* 
* Declaração da Função JavaScript 
* [async]: Define que esta função é assíncrona, é obrigatório (requisição pela internet algo que leva tempo), permite que usemos o await lá na frente.
* [realizarCadastro()]: O nome da função que você chamará no seu HTML (ex: onclick="realizarLogin()").
*/
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

/*
* Captura de Dados (DOM):
* const email = document.getElementById('email').value;
* const senha = document.getElementById('password').value;
* Aqui o JavaScript vai até o seu formulário HTML, procura os campos com os IDs 'email' e 'password' e extrai o que o usuário digitou neles (.value).
* const: Armazena esses valores em constantes, garantindo que eles não sejam alterados acidentalmente durante a execução da função.
*/

    
    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

/*
* Validação de Segurança Básica
* !email || !senha: Lê-se "Se não houver e-mail OU não houver senha".
* caso esteja vazio vai abrir um alerta com a mensagem
* return: Interrompe a função imediatamente. Se o usuário deixou algo vazio, o código para aqui e nem tenta falar com o servidor.
*/
    

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });


/*
* A Chamada ao Supabase (O "Coração" do Código)
* [await]: Faz o código "esperar" a resposta do servidor do Supabase antes de ir para a próxima linha.
* [window.supabaseClient]: É a instância do SDK do Supabase que você configurou no seu projeto.
* auth.signInWithPassword: Este é o método específico para autenticação tradicional usando e-mail e senha. 
O Supabase também oferece métodos para login com Google, GitHub ou "Magic Links" (e-mail sem senha).
* { email, password: senha }: Envia as credenciais. 
* Note que usei email (abreviação para email: email) 
* password: senha (mapeando sua variável senha para a chave que o Supabase espera).
* { data, error }: Isso é uma desestruturação. O Supabase sempre retorna um objeto com dois caminhos possíveis: os dados do usuário (data) ou um erro (error).
*/        
       
        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);

/*
* Se o objeto error não estiver vazio (por exemplo, se o e-mail for inválido ou a senha for muito curta)
* o alert exibirá a mensagem técnica explicando o que deu errado.
*/
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'https://aristidesbp.github.io/assets/erp/index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}  

/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* 
* Nome do arquivo: cadastrar_novo_usuario.js
* Objetivo: Criar uma nova conta de usuário no sistema.
* [window.supabaseClient.auth.signUp]: Chama o método de cadastro oficial do SDK do Supabase.
*/

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;    
    if (!email || !senha) { alert("Preencha e-mail e senha primeiro!"); return;}
    
    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ email, password: senha });
   
    if (error) { alert("Erro no cadastro: " + error.message); }       
    else { alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login."); }
}


/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* Função de alerta confirmando se é para realmente cadastrar */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");  
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* Objetivo:VER A SENHA DIGITADA, Alternar a visibilidade do campo de senha entre texto e asteriscos */
function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}

/* ####################################################################################################################### */
/* ####################################################################################################################### */
  
    /**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link enviado! Verifique sua caixa de entrada.");
}

async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

    // Atualiza os dados do usuário que clicou no link de recuperação
    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) {
        alert("Erro ao atualizar: " + error.message);
    } else {
        alert("Senha atualizada com sucesso!");
        window.location.href = 'index.html';
    }
}
 ```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/verificar_acesso_login.js
```
    /** * Estrutura do verificar_login.js
 * Para começar, vamos focar na função de Verificação de Sessão. 
 * O comando básico do Supabase é: supabase.auth.getSession()
 */

// Esta função garante que apenas usuários logados acessem a página atual
async function checarAutenticacao() {
    // 1. Buscamos a sessão atual do cliente configurado no supabase_config.js
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    // 2. Se houver erro ou se a sessão estiver vazia (null), o usuário não está logado
    if (error || !session) {
        console.log("Acesso negado: Usuário não autenticado.");
        // 3. Redireciona para o login.html na raiz, conforme nossa estrutura
        window.location.href = "login.html";
    } else {
        // Se a sessão existir, permitimos que ele continue na página
        console.log("Acesso autorizado para:", session.user.email);
    }
}

// Executamos a verificação imediatamente ao carregar o script
checarAutenticacao();

    
//############################################################################# -->       
        async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Verifica se o cliente supabase existe antes de tentar deslogar
            if (typeof _supabase !== 'undefined') {
                await _supabase.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
        }   

```


















