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
# index.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Aristidesbp | Digital Solutions</title>
    
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>
/* Custom Glassmorphism e Classes auxiliares */
@layer components {
    .glass {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
}

/* Light Theme overrides */
.light body { 
    background-color: #f6f6f8; 
    color: #1e293b; 
}

.light .glass { 
    background: rgba(255, 255, 255, 0.7); 
    border: 1px solid rgba(0, 0, 0, 0.1); 
}

.light .service-card { 
    background: white; 
    border-color: #e2e8f0; 
}

/* Utilitários de Hover */
.service-card:hover { 
    border-color: #2563eb; 
    transform: translateY(-4px); 
}

/* Estilização para o feedback de sucesso no botão */
.bg-success {
    background-color: #10b981 !important; /* emerald-500 */
}

/* Spinner de carregamento */
.loading-spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
 </style>
        
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#2563eb",
                        "background-light": "#f6f6f8",
                        "background-dark": "#020617",
                        "slate-border": "#1e293b",
                    },
                    fontFamily: { "display": ["Inter", "sans-serif"] },
                },
            },
        }
    </script>

   
</head>
<body class="bg-background-light dark:bg-background-dark text-[#f8fafc] dark:text-[#f8fafc] font-display transition-colors duration-300">  

    <nav class="fixed w-full z-50 glass border-b border-gray-200 dark:border-slate-border">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
                <span class="font-black text-xl tracking-tighter dark:text-white">ABP<span class="text-primary text-xs uppercase ml-1">Digital</span></span>
            </div>

            <div class="flex items-center gap-6">
                <div class="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                    <a href="#home" class="hover:text-primary transition-colors">Home</a>
                    <a href="#projetos" class="hover:text-primary transition-colors">Projetos</a>
                </div>

                <select id="langSelect" onchange="changeLang()" class="bg-transparent border-none text-xs font-bold uppercase cursor-pointer focus:ring-0 dark:text-white">
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                </select>

                <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <span id="themeIcon" class="material-symbols-outlined text-gray-600 dark:text-gray-400">dark_mode</span>
                </button>
            </div>
        </div>
    </nav>

    <main class="pt-20">
        <section class="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden" id="home">
            <div class="relative z-10 max-w-4xl text-center flex flex-col items-center gap-8">
                <h1 class="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight" id="heroTitle">
                    Transformando Necessidades Reais em <span class="text-primary">Soluções Digitais</span> Funcionais
                </h1>
                <p class="text-lg md:text-xl text-slate-400 max-w-2xl">
                    Escalando negócios e automatizando processos através de tecnologia de ponta.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 mt-4">
                    <a class="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20" href="#services">Ver Serviços</a>
                    <a class="px-8 py-4 glass hover:bg-white/5 font-bold rounded-xl transition-all border border-slate-border" href="#about">Saiba Mais</a>
                </div>
            </div>
        </section>

        <section class="py-24 px-6 md:px-16" id="about">
            <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div class="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-border">
                    <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop');"></div>
                </div>
                <div class="flex flex-col gap-6">
                    <h2 class="text-3xl md:text-5xl font-bold">Sobre o Especialista</h2>
                    <p class="text-slate-400 text-lg leading-relaxed">Analista de Sistemas e Programador com foco no desenvolvimento de soluções digitais práticas, eficientes e orientadas a resultados. Atuo desde a concepção até a entrega final.</p>
                </div>
            </div>
        </section>

        <section class="py-24 px-6 md:px-16" id="projetos">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl md:text-5xl font-bold mb-16 text-center">Nossos Ecossistemas</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="glass p-8 border border-slate-border rounded-2xl flex flex-col hover:border-primary transition-all group">
                        <div class="flex items-center justify-between mb-6">
                            <span class="material-symbols-outlined text-primary text-5xl">desktop_windows</span>
                            <span class="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-widest">Web Version</span>
                        </div>
                        <h3 class="text-2xl font-black mb-4 group-hover:text-primary transition-colors">Sistema ERP Web</h3>
                        <p class="text-slate-400 leading-relaxed mb-8 flex-grow">Gestão empresarial completa com módulos de financeiro, entidades, e controle de vendas.</p>
                        <a href="login.html" class="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-primary text-white font-bold rounded-xl transition-all border border-slate-border hover:border-primary">
                            Acessar Sistema <span class="material-symbols-outlined">open_in_new</span>
                        </a>
                    </div>

               
                </div>
            </div>
        </section>

        <section class="py-24 px-6 md:px-16" id="services">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl md:text-5xl font-bold mb-16 text-center">Pacote Completo de Soluções</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="glass p-6 border border-slate-border rounded-xl flex flex-col hover:border-primary transition-all">
                        <span class="material-symbols-outlined text-primary text-4xl mb-4">developer_mode_tv</span>
                        <h3 class="text-xl font-bold mb-2">Desenvolvimento Web</h3>
                        <p class="text-slate-400 text-sm mb-6 flex-grow">Sistemas web personalizados e sites institucionais.</p>
                        <div class="flex items-center justify-between mt-auto">
                            <span class="font-bold">R$ 3.500,00</span>
                            <button onclick="addServico(this, 'Dev Web', 3500)" class="btn-add px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                                <span class="material-symbols-outlined text-sm">add</span> Adicionar
                            </button>
                        </div>
                    </div>
                    </div>
            </div>
        </section>

        <section class="py-24 px-6 md:px-16" id="contact">
            <div class="max-w-4xl mx-auto glass p-8 rounded-2xl border border-slate-border">
                <h2 class="text-2xl font-bold mb-8">Checkout Seguro</h2>
                <form id="payForm" class="space-y-4">
                    <input id="cliente_nome" class="w-full bg-slate-900 border-slate-border rounded-xl p-3 text-white" placeholder="Nome Completo" required/>
                    <input id="cliente_email" class="w-full bg-slate-900 border-slate-border rounded-xl p-3 text-white" type="email" placeholder="E-mail" required/>
                    <div class="p-6 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center">
                        <div>
                            <span class="block text-xs uppercase font-bold text-slate-500">Valor Total</span>
                            <span class="text-3xl font-black text-primary">R$ <span id="resumoTotal">0.00</span></span>
                        </div>
                        <span class="material-symbols-outlined text-4xl text-primary opacity-50">account_balance_wallet</span>
                    </div>
                    <button type="button" onclick="processarPagamento()" id="btnPagar" class="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
                        FINALIZAR NO MERCADO PAGO
                    </button>
                </form>
            </div>
        </section>
    </main>

<script>
 //src="index/tema.js" 
  /**
 * Nome do arquivo: tema.js
 * Objetivo: Alternar entre os temas dark e light no documento.
 */
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark'); 
        html.classList.add('light');
        icon.innerText = 'dark_mode'; // Ícone para quando estiver claro
    } else {
        html.classList.remove('light'); 
        html.classList.add('dark');
        icon.innerText = 'light_mode'; // Ícone para quando estiver escuro
    }
}  
</script>
    
<script>
    // src="index/idioma.js"
    /**
 * Nome do arquivo: idioma.js
 * Objetivo: Alterar o texto principal (Hero) conforme o idioma selecionado.
 */
function changeLang() {
    const lang = document.getElementById('langSelect').value;
    const title = document.getElementById('heroTitle');
    
    // Dicionário de traduções
    const translations = {
        es: 'Transformando Necesidades Reales en <span class="text-primary">Soluciones Digitales</span>',
        en: 'Transforming Real Needs into Functional <span class="text-primary">Digital Solutions</span>',
        pt: 'Transformando Necessidades Reais em <span class="text-primary">Soluções Digitais</span> Funcionais'
    };

    // Aplica a tradução ou mantém o padrão em português
    title.innerHTML = translations[lang] || translations.pt;
}
</script>
<script>
    // src="index/carrinho.js"
/**
 * Nome do arquivo: carrinho.js
 * Objetivo: Gerenciar a inclusão de serviços no carrinho e atualizar o resumo de preços.
 */

// Variável global para armazenar os itens
let carrinho = [];

function addServico(btn, nome, preco) {
    // 1. Adiciona o objeto ao array de carrinho
    carrinho.push({ nome, preco });

    // 2. Calcula o novo total
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    
    // 3. Atualiza o elemento de resumo na tela
    const resumoTotal = document.getElementById('resumoTotal');
    if (resumoTotal) {
        resumoTotal.innerText = total.toFixed(2);
    }

    // 4. Feedback Visual no botão (Muda para verde/sucesso)
    btn.classList.remove('bg-primary');
    btn.classList.add('bg-success'); // Classe definida no seu CSS
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check_circle</span> Adicionado`;
}    
</script>
<script>
    // src="index/pagamento.js"
 /**
 * Nome do arquivo: pagamento.js
 * Objetivo: Enviar os dados do carrinho para a função de checkout e redirecionar para o pagamento.
 */

async function processarPagamento() {
    const functionUrl = 'https://eisruaetsqrratemqswv.functions.supabase.co/checkout';
    
    // Verifica o total do carrinho (variável global do carrinho.js)
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    
    if (total <= 0) return alert("Selecione um serviço primeiro.");
    
    const nome = document.getElementById('cliente_nome').value;
    const email = document.getElementById('cliente_email').value;
    
    if(!nome || !email) return alert("Preencha seu nome e e-mail para continuar.");

    const btn = document.getElementById('btnPagar');
    btn.disabled = true;
    const originalText = btn.innerText;
    
    // Animação de carregamento
    btn.innerHTML = `<div class="flex items-center justify-center gap-2"><div class="loading-spinner"></div> PROCESSANDO...</div>`;

    try {
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome, 
                email, 
                total,
                itens: carrinho.map(i => ({ nome: i.nome, preco: i.preco, qtd: 1 }))
            })
        });

        if (!response.ok) throw new Error('Erro na comunicação com o servidor de checkout.');

        const data = await response.json();

        // init_point é a URL gerada pelo Mercado Pago via Edge Function
        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            throw new Error('Ponto de início de pagamento não recebido.');
        }
    } catch (e) {
        alert("Erro ao conectar com o servidor de pagamento. Tente novamente.");
        console.error("Erro no Checkout:", e);
        
        // Restaura o botão em caso de erro
        btn.disabled = false;
        btn.innerText = originalText;
    }
}   
</script>
    
</body>
</html>
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# login.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ERP ABP</title>

   <!-- STYLE -->
   <script src="https://cdn.tailwindcss.com"></script>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
   <!-- FIM DO STYLE -->

 <!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;
</script>
<!-- FIM DO CONEXÃO SUPABASE -->
    
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen p-4">


<!-- FORMULÁRIO -->
 <div class="glass p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-black tracking-tighter text-blue-500">ERP ABP</h1>
            <p class="text-slate-400 text-sm">Acesse sua conta para gerenciar seus PDFs</p>
        </div>
<!--
        <button onclick="loginComGoogle()" class="w-full py-3 mb-6 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
            <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google icon"> 
            Entrar com Gmail
        </button>
-->
        <div class="relative mb-6 text-center border-b border-slate-800">
            <span class="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-xs text-slate-500 uppercase tracking-widest">ou e-mail</span>
        </div>

 <div class="space-y-4">
    <div>
        <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">E-mail</label>
        <input type="email" id="email" placeholder="seu@email.com" class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
    </div>
    
    <div class="relative">
        <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">Senha</label>
        <input type="password" id="password" placeholder="••••••••" class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
        <button type="button" onclick="alternarSenha()" class="absolute right-3 top-8 text-slate-500 hover:text-white">
            🔒
        </button>
    </div>

    <div class="text-right">
        <button onclick="solicitarRecuperacao()" class="text-xs text-blue-400 hover:underline">Esqueceu a senha?</button>
    </div>
    
    <div class="flex gap-3 pt-2">
        <button onclick="realizarLogin()" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
            ENTRAR
        </button>
        <button onclick="confirmarCadastro()" class="flex-1 py-3 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl transition-all">
            CADASTRAR
        </button>
    </div>
</div>
    </div>
<!-- FIM DO FORMULÁRIO -->

<script>
    /**
 * Nome do arquivo: alternar_senha.js
 * Objetivo: Alternar a visibilidade do campo de senha entre texto e asteriscos.
 */

function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}
    
</script>   
<script>
/**
 * Nome do arquivo: login_google.js
 * Objetivo: Realizar autenticação social utilizando o provedor Google via OAuth.
 */

async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Define para onde o Google deve mandar o usuário após o login.
            // Usamos window.location.origin para garantir que funcione em qualquer ambiente.
            redirectTo: window.location.origin + '/assets/app/index.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}
</script>   
<script>
    /**
 * Nome do arquivo: realizar_cadastro.js
 * Objetivo: Criar uma nova conta de usuário no sistema.
 */

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ 
        email, 
        password: senha 
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
    } else {
        alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login.");
    }
}
</script>   
<script>
/**
 * Função de apoio para evitar cadastros acidentais (UX)
 */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");
    
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}
</script>   
<script>
  /**
 * Nome do arquivo: realizar_login.js
 * Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
 */

async function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}  
 </script>   
<script>   
    /**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://aristidesbp.github.io/assets/redefinir_senha.html',
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
</script>   
</body>
</html>        
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# entidades.html (exemplo de codigo completo)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

<!-- STYLE -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
<style>
    
:root {
    --primary: #3ecf8e;
    --dark: #0f172a;
    --bg: #f1f5f9;
}

* { box-sizing: border-box; }

body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: var(--bg);
    padding-top: 85px;
}

.container {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    margin-bottom: 20px;
}

.section-title {
    color: var(--primary);
    font-size: 14px;
    text-transform: uppercase;
    margin: 20px 0 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    font-weight: bold;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    color: #64748b;
    font-weight: bold;
}

input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

/* Estilo para o campo de senha com Olho */
.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}
.password-wrapper i {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: #64748b;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
    outline: none;
}

.btn-add {
    background: var(--primary);
    color: white;
    padding: 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    margin-top: 20px;
}

.btn-cancel {
    background: #64748b;
    color: white;
    margin-top: 10px;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    display: none;
    width: 100%;
}

.table-container {
    background: white;
    border-radius: 12px;
    overflow-x: auto;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; }
td { padding: 15px; border-top: 1px solid #f1f5f9; }

.btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-wpp { color: #25d366; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-mail { color: #ea4335; cursor: pointer; font-size: 18px; background: none; border: none; }

.navbar {
    position: fixed; top: 0; left: 0; width: 100%; background: white;
    padding: 15px 25px; display: flex; justify-content: space-between;
    align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;
}
.nav-buttons { display: flex; gap: 15px; align-items: center; }
.btn-nav-back { text-decoration: none; color: #64748b; font-weight: bold; }
.btn-logout-nav {
    background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px;
    font-weight: bold; font-size: 14px; border: none; cursor: pointer;
}

.export-area {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
}

.btn-export {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-export-full {
    background: #1e293b;
}
   
</style>   
<!-- FIM DO STYLE -->

 <!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;
</script>
<script>
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
</script>
<!-- FIM DO CONEXÃO SUPABASE -->
   
</head>
<body>

<!-- NAVBAR -->
    <style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>
    
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    <script>
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
    </script>
<!-- FIM DA NAVBAR -->
    
<!-- FORMULARIO -->
<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Cadastro de Entidade</h3>
        <input type="hidden" id="edit-id">

        <div class="section-title">Informações e Acesso</div>
        <div class="form-grid">
            <div><label>Nome Completo / Razão *</label><input type="text" id="nome_completo"></div>
            <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
            <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
            <div><label>E-mail</label><input type="email" id="email"></div>
            <div><label>Telefone / WhatsApp *</label><input type="text" id="telefone"></div>
            <div>
                <label>Senha Interna</label>
                <div class="password-wrapper">
                    <input type="password" id="senha_acesso">
                    <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                </div>
            </div>
            
            <div>
                <label>Nível de Acesso</label>
                <select id="acesso">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="comprador">Comprador</option>
                    <option value="master">Master</option>
                </select>
            </div>
            <div>
                <label>Relacionamento</label>
                <select id="relacionamento">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="terceirizado">Terceirizado</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
            <div>
                <label>Status</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="desativado">Desativado</option>
                </select>
            </div>
            <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
        </div>

        <div class="section-title">Endereço</div>
        <div class="form-grid">
            <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
            <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
            <div><label>Número</label><input type="text" id="numero"></div>
            <div><label>Bairro</label><input type="text" id="bairro"></div>
            <div><label>Cidade</label><input type="text" id="cidade"></div>
            <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
        </div>

        <div class="section-title">Complementos</div>
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>URL de Arquivos</label><input type="text" id="arquivos_url"></div>
            <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card" style="margin-bottom: 10px; padding: 15px;">
        <label><i class="fas fa-search"></i> BUSCAR ENTIDADE</label>
        <input type="text" id="inputBusca" placeholder="Digite o nome para filtrar..." onkeyup="filtrarTabela()">
        
        <div class="export-area">
            <button class="btn-export" onclick="exportarPDFListagem()">
                <i class="fas fa-list"></i> Exportar Listagem (PDF)
            </button>
            <button class="btn-export btn-export-full" onclick="exportarPDFFichaCompleta()">
                <i class="fas fa-file-invoice"></i> Exportar Fichas Detalhadas (PDF)
            </button>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Nome / Tipo</th>
                    <th>Telefone / E-mail</th>
                    <th>Acesso / Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="entities-list"></tbody>
        </table>
    </div>
</div>
<!-- FORMULARIO -->
<script>
    /** * ERP ABP - cadastrar.js */
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    
    const campos = [
        'nome_completo', 'cpf', 'data_nascimento', 'genero', 'estado_civil',
        'tipo_entidade', 'status_entidade', 'tipo_acesso', 'email', 'telefone',
        'senha_acesso', 'cep', 'logradouro', 'numero', 'bairro', 'cidade',
        'estado', 'avaliacao', 'observacoes'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) payload[c] = el.value;
    });

    let result;
    if (id) {
        result = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('entidades').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
        resetForm();
        if (typeof loadEntities === "function") loadEntities();
    }
}
</script>
<script>
/** * ERP ABP - deletar.js */
async function deleteEntity(id) {
    if (!confirm("Tem certeza que deseja excluir esta entidade permanentemente?")) return;

    const { error } = await window.supabaseClient
        .from('entidades')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        if (typeof loadEntities === "function") loadEntities();
    }
}
</script>
 <script> 
/** * ERP ABP - editar.js */
async function editFull(id) {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return alert("Erro ao carregar dados para edição.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = data[key] || '';
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
     }
 </script>
 <script>
     /** * ERP ABP - listar.js */
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }
    renderTable(data || []);
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => `
        <tr>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                ${e.telefone ? `<button class="btn-wpp" onclick="window.open('https://wa.me/55${e.telefone.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>` : ''}
            </td>
        </tr>
    `).join('');
}

// Inicia ao carregar a página
document.addEventListener('DOMContentLoaded', loadEntities);
</script>
 <script>
/** * ERP ABP - utilidades.js
 * Funções auxiliares e automação de interface
 */

// 1. Limpa todos os campos e volta o formulário ao estado inicial
function resetForm() {
    // Limpa Inputs, Selects e Textareas
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if (campo.id === 'avaliacao') {
            campo.value = '5';
        } else if (campo.tagName === 'SELECT') {
            campo.selectedIndex = 0;
        } else {
            campo.value = '';
        }
    });

    // Reset de elementos visuais de edição
    const editId = document.getElementById('edit-id');
    if (editId) editId.value = '';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.innerText = "Novo Cadastro de Entidade";

    const btnSave = document.getElementById('btn-save');
    if (btnSave) btnSave.innerText = "Salvar Entidade";

    const btnCancel = document.getElementById('btn-cancel');
    if (btnCancel) btnCancel.style.display = "none";

    console.log("🧹 Campos limpos com sucesso!");
}

// 2. Filtro de busca em tempo real (sem precisar de botão)
function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#entities-list tr');

    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

// 3. Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('senha_acesso');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput && passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else if (passwordInput) {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 4. Busca de CEP automática (ViaCEP)
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
                console.log("📍 Endereço preenchido via CEP");
            }
        } catch (e) { console.error("Erro ao buscar CEP", e); }
    }
     }
 </script>
     
</body>
</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# finaceiro.html (exemplo de codigo completo)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão Financeira - ERP ABP</title>
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
 <style>
:root { 
    --primary: #3ecf8e; 
    --dark: #0f172a; 
    --bg: #f1f5f9; 
    --danger: #ef4444; 
}

* { box-sizing: border-box; }

body { 
    margin: 0; 
    font-family: 'Segoe UI', sans-serif; 
    background: var(--bg); 
    padding-top: 85px; 
}

.container { max-width: 1200px; margin: auto; padding: 20px; }

.card { 
    background: white; 
    padding: 25px; 
    border-radius: 12px; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
    margin-bottom: 20px; 
}

.navbar { 
    position: fixed; top: 0; left: 0; width: 100%; 
    background: white; padding: 15px 25px; 
    display: flex; justify-content: space-between; align-items: center; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; 
}

.nav-link { text-decoration: none; color: #64748b; font-weight: bold; margin-right: 15px; }
.btn-exit { background: var(--danger); color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; }

.section-title { 
    color: var(--primary); font-size: 14px; text-transform: uppercase; 
    margin: 20px 0 10px; border-bottom: 1px solid #eee; 
    padding-bottom: 5px; font-weight: bold; 
}

.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
input, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }

.btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; }
.btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }

.table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
table { width: 100%; border-collapse: collapse; min-width: 1100px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; text-align: left; }
td { padding: 12px 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }

.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
.status-pago { background: #dcfce7; color: #166534; }
.status-pendente { background: #fef9c3; color: #854d0e; }

.label-tipo { font-size: 10px; font-weight: bold; text-transform: uppercase; margin-right: 5px; }
.tipo-pagar { color: var(--danger); }
.tipo-receber { color: var(--primary); }

.resumo-financeiro { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
.resumo-card { padding: 15px; border-radius: 10px; color: white; text-align: center; }
.resumo-entradas { background: #10b981; }
.resumo-saidas { background: #ef4444; }
.resumo-saldo { background: #3b82f6; }

.bulk-actions { margin-bottom: 10px; display: none; background: #fee2e2; padding: 10px; border-radius: 8px; border: 1px solid #fecaca; }
.btn-delete-bulk { background: var(--danger); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 15px; }
.btn-action { background: none; border: none; cursor: pointer; font-size: 16px; margin-right: 8px; }
.btn-pdf { background: #334155; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
  
</head>
<body>

<!-- NAVBAR -->
    <style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>
    
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    <script>
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
    </script>
<!-- FIM DA NAVBAR -->

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Lançamento</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Dados e Parcelamento</div>
        <div class="form-grid">
            <div><label>Tipo *</label><select id="tipo"><option value="pagar">Saída</option><option value="receber">Entrada</option></select></div>
            <div style="grid-column: span 2;"><label>Descrição *</label><input type="text" id="descricao"></div>
            <div><label>Valor Parcela (R$) *</label><input type="number" id="valor" step="0.01"></div>
            <div><label>Qtde Parcelas</label><input type="number" id="parcelas" value="1" min="1"></div>
        </div>

        <div class="section-title">Datas e Status</div>
        <div class="form-grid">
            <div><label>1º Vencimento *</label><input type="date" id="data_vencimento"></div>
            <div><label>Data Pagamento</label><input type="date" id="data_pagamento"></div>
            <div><label>Status</label><select id="status"><option value="pendente">Pendente</option><option value="pago">Pago/Recebido</option></select></div>
        </div>

        <div class="section-title">Classificação</div>
        <div class="form-grid">
            <div><label>Entidade</label><select id="entidade_id"><option value="">Selecione...</option></select></div>
            <div><label>Categoria</label><input type="text" id="categoria"></div>
            <div><label>Forma Pagto</label><input type="text" id="forma_pagamento"></div>
        </div>
        
        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Lançamento(s)</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>Busca Inteligente (Tudo)</label><input type="text" id="inputBusca" onkeyup="filtrarTabela()" placeholder="Busque por descrição, categoria, valor..."></div>
            <div><label>Início</label><input type="date" id="dataInicio" onchange="filtrarTabela()"></div>
            <div><label>Fim</label><input type="date" id="dataFim" onchange="filtrarTabela()"></div>
            <div style="display: flex; align-items: flex-end;">
                <button class="btn-pdf" onclick="exportarPDF()"><i class="fas fa-file-pdf"></i> PDF</button>
            </div>
        </div>
    </div>

    <div class="resumo-financeiro">
        <div class="resumo-card resumo-entradas"><span>Entradas</span><br><b id="total-receber">R$ 0,00</b></div>
        <div class="resumo-card resumo-saidas"><span>Saídas</span><br><b id="total-pagar">R$ 0,00</b></div>
        <div class="resumo-card resumo-saldo"><span>Saldo Filtrado</span><br><b id="total-saldo">R$ 0,00</b></div>
    </div>

    <div id="bulk-area" class="bulk-actions">
        <span id="selected-count" style="font-weight:bold; color:#b91c1c;">0 selecionados</span>
        <button onclick="deleteSelected()" class="btn-delete-bulk"><i class="fas fa-trash"></i> Excluir Selecionados</button>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th width="40"><input type="checkbox" id="select-all" onclick="toggleSelectAll()"></th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Forma Pagto</th>
                    <th>Vencimento</th>
                    <th>Pagamento</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="financeiro-list"></tbody>
        </table>
    </div>
</div>
<script>
// --- 1. CONFIGURAÇÃO E INICIALIZAÇÃO ---
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let dadosFinanceiros = []; // Cache local para busca e filtros

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
        return;
    }
    carregarEntidades();
    loadFinanceiro();
});

// --- 2. CARREGAMENTO DE DADOS ---

async function carregarEntidades() {
    const { data, error } = await _supabase.from('entidades').select('id, nome_completo');
    if (!error) {
        const select = document.getElementById('entidade_id');
        data.forEach(ent => {
            const opt = document.createElement('option');
            opt.value = ent.id;
            opt.textContent = ent.nome_completo;
            select.appendChild(opt);
        });
    }
}

async function loadFinanceiro() {
    const { data, error } = await _supabase
        .from('financeiro')
        .select(`*, entidades(nome_completo)`)
        .order('data_vencimento', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error);
        return;
    }

    dadosFinanceiros = data;
    renderTable(dadosFinanceiros);
}

// --- 3. RENDERIZAÇÃO E CÁLCULOS ---

function renderTable(data) {
    const tbody = document.getElementById('financeiro-list');
    tbody.innerHTML = '';
    
    let totalEntradas = 0;
    let totalSaidas = 0;

    data.forEach(item => {
        const valor = parseFloat(item.valor || 0);
        if (item.tipo.toLowerCase() === 'receber') totalEntradas += valor;
        else totalSaidas += valor;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" value="${item.id}" onclick="updateSelectedCount()"></td>
            <td>
                <span class="label-tipo ${item.tipo.toLowerCase() === 'receber' ? 'tipo-receber' : 'tipo-pagar'}">
                    <i class="fas fa-${item.tipo.toLowerCase() === 'receber' ? 'arrow-up' : 'arrow-down'}"></i> ${item.tipo}
                </span>
            </td>
            <td><strong>${item.descricao}</strong><br><small>${item.entidades?.nome_completo || 'Sem Entidade'}</small></td>
            <td>${item.categoria || '-'}</td>
            <td>${item.forma_pagamento || '-'}</td>
            <td>${item.data_vencimento ? new Date(item.data_vencimento).toLocaleDateString('pt-BR') : '-'}</td>
            <td>${item.data_pagamento ? new Date(item.data_pagamento).toLocaleDateString('pt-BR') : '-'}</td>
            <td><strong>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
            <td>
                <button class="btn-action" style="color:#6366f1" onclick="editItem('${item.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-action" style="color:#ef4444" onclick="deleteItem('${item.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Atualiza Resumo
    document.getElementById('total-receber').innerText = `R$ ${totalEntradas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-pagar').innerText = `R$ ${totalSaidas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-saldo').innerText = `R$ ${(totalEntradas - totalSaidas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// --- 4. SALVAMENTO E PARCELAMENTO ---

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    const basePayload = {
        tipo: document.getElementById('tipo').value,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value,
        entidade_id: document.getElementById('entidade_id').value || null,
        categoria: document.getElementById('categoria').value,
        forma_pagamento: document.getElementById('forma_pagamento').value,
        data_pagamento: document.getElementById('data_pagamento').value || null
    };

    if (!basePayload.descricao || !basePayload.valor || !document.getElementById('data_vencimento').value) {
        alert("Preencha os campos obrigatórios (*)");
        return;
    }

    try {
        if (id) {
            // Edição simples
            basePayload.data_vencimento = document.getElementById('data_vencimento').value;
            const { error } = await _supabase.from('financeiro').update(basePayload).eq('id', id);
            if (error) throw error;
        } else {
            // Inserção com lógica de parcelas
            const lancamentos = [];
            let dataBase = new Date(document.getElementById('data_vencimento').value + "T12:00:00");

            for (let i = 0; i < qtdeParcelas; i++) {
                const novaData = new Date(dataBase);
                novaData.setMonth(dataBase.getMonth() + i);
                
                lancamentos.push({
                    ...basePayload,
                    descricao: qtdeParcelas > 1 ? `${basePayload.descricao} (${i + 1}/${qtdeParcelas})` : basePayload.descricao,
                    data_vencimento: novaData.toISOString().split('T')[0]
                });
            }
            const { error } = await _supabase.from('financeiro').insert(lancamentos);
            if (error) throw error;
        }

        alert("Sucesso!");
        resetForm();
        loadFinanceiro();
    } catch (err) {
        alert("Erro: " + err.message);
    }
}

// --- 5. AÇÕES (EDITAR, EXCLUIR, BUSCAR) ---

async function editItem(id) {
    const item = dadosFinanceiros.find(i => i.id === id);
    if (!item) return;

    document.getElementById('edit-id').value = item.id;
    document.getElementById('tipo').value = item.tipo.toLowerCase();
    document.getElementById('descricao').value = item.descricao;
    document.getElementById('valor').value = item.valor;
    document.getElementById('data_vencimento').value = item.data_vencimento;
    document.getElementById('data_pagamento').value = item.data_pagamento || '';
    document.getElementById('status').value = item.status.toLowerCase();
    document.getElementById('entidade_id').value = item.entidade_id || '';
    document.getElementById('categoria').value = item.categoria || '';
    document.getElementById('forma_pagamento').value = item.forma_pagamento || '';

    document.getElementById('form-title').innerText = "Editando Lançamento";
    document.getElementById('btn-save').innerText = "Atualizar";
    document.getElementById('btn-cancel').style.display = "block";
    document.getElementById('parcelas').disabled = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteItem(id) {
    if (confirm("Excluir este lançamento?")) {
        const { error } = await _supabase.from('financeiro').delete().eq('id', id);
        if (!error) loadFinanceiro();
    }
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;

    const filtrados = dadosFinanceiros.filter(item => {
        const matchesTermo = JSON.stringify(item).toLowerCase().includes(termo);
        const dataVenc = item.data_vencimento;
        const matchesData = (!inicio || dataVenc >= inicio) && (!fim || dataVenc <= fim);
        return matchesTermo && matchesData;
    });

    renderTable(filtrados);
}

function resetForm() {
    document.getElementById('edit-id').value = '';
    document.querySelectorAll('input').forEach(i => i.value = i.id === 'parcelas' ? '1' : '');
    document.getElementById('status').value = 'pendente';
    document.getElementById('tipo').value = 'pagar';
    document.getElementById('entidade_id').value = '';
    document.getElementById('form-title').innerText = "Novo Lançamento";
    document.getElementById('btn-save').innerText = "Salvar Lançamento(s)";
    document.getElementById('btn-cancel').style.display = "none";
    document.getElementById('parcelas').disabled = false;
}

// --- 6. AÇÕES EM MASSA ---

function toggleSelectAll() {
    const master = document.getElementById('select-all');
    document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = master.checked);
    updateSelectedCount();
}

function updateSelectedCount() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked').length;
    document.getElementById('bulk-area').style.display = selecionados > 0 ? 'block' : 'none';
    document.getElementById('selected-count').innerText = `${selecionados} selecionados`;
}

async function deleteSelected() {
    if (!confirm("Excluir todos os selecionados?")) return;
    const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
    const { error } = await _supabase.from('financeiro').delete().in('id', ids);
    if (!error) {
        loadFinanceiro();
        updateSelectedCount();
    }
}

// --- 7. EXPORTAÇÃO PDF ---

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.text("Relatório Financeiro - ERP ABP", 14, 15);
    
    const rows = dadosFinanceiros.map(i => [
        i.tipo.toUpperCase(),
        i.descricao,
        i.data_vencimento,
        `R$ ${parseFloat(i.valor).toFixed(2)}`,
        i.status.toUpperCase()
    ]);

    doc.autoTable({
        head: [['Tipo', 'Descrição', 'Vencimento', 'Valor', 'Status']],
        body: rows,
        startY: 20
    });

    doc.save("financeiro.pdf");
}
</script>     

</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# produtos.html
```



<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode"></script>
    <link rel="stylesheet" href="style.css">
<style>
    :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --accent: #6366f1; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); padding-top: 85px; }
.container { max-width: 1100px; margin: auto; padding: 20px; }
.card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
.section-title { color: var(--primary); font-size: 13px; text-transform: uppercase; margin: 25px 0 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 5px; font-weight: 800; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
label { display: block; margin-bottom: 5px; font-size: 12px; color: #64748b; font-weight: bold; }
input, select, textarea { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; transition: 0.2s; }
input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(62, 207, 142, 0.1); }
.btn-scan { background: var(--accent); color: white; padding: 8px; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 8px; width: 100%; font-size: 13px; font-weight: bold; }
#reader { width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 10px; display: none; border: 2px solid var(--accent); }
.btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; font-size: 16px; }
.btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 8px; cursor: pointer; display: none; width: 100%; }
.table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 11px; text-transform: uppercase; text-align: left; }
td { padding: 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }
.tag { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10px; color: #64748b; }
.low-stock { color: #ef4444; font-weight: bold; }
.navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 1000; }
.nav-logo { font-weight: 800; color: var(--dark); font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.nav-logo i { color: var(--primary); }
.nav-buttons { display: flex; gap: 12px; }
.btn-nav { padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.btn-home { background: #ecfdf5; color: #059669; }
    
    </style>
</head>
<body>

<div class="navbar">
    <div class="nav-logo">
        <i class="fas fa-boxes"></i> ERP ABP - Produtos
    </div>
    <div class="nav-buttons">
        <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Informações Básicas</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" class="form-input" placeholder="Ex: Cimento CP-II">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <button type="button" class="btn-scan" onclick="startScanner()">
                    <i class="fas fa-camera"></i> Ler Código
                </button>
                <div id="reader"></div>
                <input type="text" id="codigo_de_barras" class="form-input">
            </div>
            <div>
                <label>Data de Compra</label>
                <input type="date" id="data_compra" class="form-input">
            </div>
            <div>
                <label>Marca</label>
                <input type="text" id="marca" class="form-input">
            </div>
            <div>
                <label>SKU / Código Interno</label>
                <input type="text" id="sku" class="form-input">
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" id="categoria_prod" class="form-input">
            </div>
            <div>
                <label>Fornecedor (Entidade)</label>
                <select id="entidade_id" class="form-input">
                    <option value="">Carregando fornecedores...</option>
                </select>
            </div>
            <div>
                <label>Data de Vencimento</label>
                <input type="date" id="data_vencimento" class="form-input">
            </div>
        </div>

        <div class="section-title">Imagem do Produto</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Foto do Produto (Câmera ou Arquivo)</label>
                <input type="file" id="foto_arquivo" accept="image/*" capture="environment" class="form-input" onchange="processarImagem(this)">
                <input type="hidden" id="imagem_url">
                <div id="preview-container" style="margin-top: 10px; display: none; text-align: center;">
                    <img id="img-preview" src="" style="max-width: 120px; border-radius: 8px; border: 2px solid #3ecf8e; margin: auto;">
                    <button type="button" onclick="removerFoto()" style="color: #ef4444; font-size: 11px; margin-top: 5px;">Remover Foto</button>
                </div>
            </div>
        </div>

        <div class="section-title">Descrição e Detalhes</div>
        <div style="margin-bottom: 20px;">
            <textarea id="descricao" class="form-input" rows="3" placeholder="Informações adicionais..."></textarea>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Custo (R$)</label><input type="number" id="preco_custo" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Venda (R$) *</label><input type="number" id="preco_venda" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Estoque Atual *</label><input type="number" id="estoque_atual" class="form-input" value="0"></div>
            <div><label>Estoque Mínimo</label><input type="number" id="estoque_minimo" class="form-input" value="5"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <label><i class="fas fa-search"></i> BUSCA INTELIGENTE</label>
        <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Buscar por Nome, SKU, Código ou Marca...">
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Foto / Código</th>
                    <th>Produto / Marca</th>
                    <th>Datas (Compra/Venc.)</th>
                    <th>Venda</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>
<script>

    // Configuração do Supabase (Mantenha suas chaves conforme o arquivo original)
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
window.supabaseClient = _supabase;

let html5QrCode;

// --- 1. AUTENTICAÇÃO ---
async function checarAutenticacao() {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error || !session) window.location.href = "login.html";
}

// --- 2. PROCESSAMENTO DE IMAGEM (COMPRESSÃO E BASE64) ---
function processarImagem(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400; // Tamanho ideal para mobile
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_WIDTH) {
                    width *= MAX_WIDTH / height;
                    height = MAX_WIDTH;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Comprime para JPEG com 60% de qualidade
            const base64 = canvas.toDataURL('image/jpeg', 0.6);
            
            document.getElementById('imagem_url').value = base64;
            document.getElementById('img-preview').src = base64;
            document.getElementById('preview-container').style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removerFoto() {
    document.getElementById('foto_arquivo').value = "";
    document.getElementById('imagem_url').value = "";
    document.getElementById('preview-container').style.display = 'none';
}

// --- 3. LEITOR DE CÓDIGO DE BARRAS ---
function startScanner() {
    const readerDiv = document.getElementById('reader');
    readerDiv.style.display = 'block';
    
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            document.getElementById('codigo_de_barras').value = decodedText;
            stopScanner();
        },
        (errorMessage) => { /* Silencioso */ }
    ).catch(err => alert("Erro ao acessar câmera: " + err));
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('reader').style.display = 'none';
        });
    }
}

// --- 4. CARREGAR FORNECEDORES (CORRIGIDO) ---
async function carregarFornecedores() {
    try {
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo');
        
        const select = document.getElementById('entidade_id');
        
        if (error) throw error;

        if (data && data.length > 0) {
            select.innerHTML = '<option value="">Selecione um fornecedor...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        } else {
            select.innerHTML = '<option value="">Nenhum fornecedor cadastrado</option>';
        }
    } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
    }
}

// --- 5. SALVAR PRODUTO (CORREÇÃO DE UUID VAZIO) ---
async function handleSaveProduto() {
    const id = document.getElementById('edit-id').value;
    const campos = [
        'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
        'entidade_id', 'data_vencimento', 'data_compra', 'descricao',
        'preco_custo', 'preco_venda', 'estoque_atual', 'estoque_minimo', 'imagem_url'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) {
            const valor = el.value.trim();
            if (valor !== "") {
                payload[c] = (el.type === 'number') ? parseFloat(valor || 0) : valor;
            }
        }
    });

    // Remove entidade_id se estiver vazio para evitar erro de UUID no Supabase
    if (!payload.entidade_id || payload.entidade_id === "") {
        delete payload.entidade_id;
    }

    let result;
    if (id) {
        result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('produtos').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Produto atualizado!" : "Produto cadastrado!");
        resetForm();
        loadProdutos();
    }
}

// --- 6. LISTAGEM E TABELA ---
async function loadProdutos() {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').order('nome', { ascending: true });
    if (error) return console.error(error);
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.getElementById('produtos-list');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td>
                ${p.imagem_url ? `<img src="${p.imagem_url}" style="width:45px; height:45px; object-fit:cover; border-radius:6px; margin-bottom:5px;">` : '<i class="fas fa-image" style="font-size:24px; color:#ddd"></i>'}
                <br><span class="tag">${p.codigo_de_barras || 'S/ EAN'}</span>
            </td>
            <td><strong>${p.nome}</strong><br><small>${p.marca || '-'}</small></td>
            <td><small>Comp: ${p.data_compra || '-'}<br>Venc: ${p.data_vencimento || '-'}</small></td>
            <td>R$ ${parseFloat(p.preco_venda).toFixed(2)}</td>
            <td class="${p.estoque_atual <= p.estoque_minimo ? 'low-stock font-bold' : ''}">
                ${p.estoque_atual} ${p.estoque_atual <= p.estoque_minimo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
            </td>
            <td>
                <button class="btn-edit" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// --- 7. UTILITÁRIOS ---
async function editProduto(id) {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').eq('id', id).single();
    if (error) return alert("Erro ao carregar dados.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.value = data[key] || (el.type === 'number' ? '0' : '');
            if (key === 'imagem_url' && data[key]) {
                document.getElementById('img-preview').src = data[key];
                document.getElementById('preview-container').style.display = 'block';
            }
        }
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome;
    document.getElementById('btn-save').innerText = "Atualizar Produto";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduto(id) {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
    if (!error) loadProdutos();
}

function filtrarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#produtos-list tr');
    linhas.forEach(linha => {
        linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
}

function resetForm() {
    // Limpa campos de input, select e textarea
    document.querySelectorAll('input, select, textarea').forEach(c => {
        if (c.id === 'estoque_minimo') c.value = '5';
        else if (c.type === 'number') c.value = '0.00';
        else c.value = '';
    });
    
    document.getElementById('edit-id').value = '';
    document.getElementById('imagem_url').value = '';
    document.getElementById('img-preview').src = '';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('form-title').innerText = "Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = "none";
}

async function sairDaConta() {
    if(confirm("Sair do sistema?")) {
        await window.supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    checarAutenticacao();
    loadProdutos();
    carregarFornecedores();
});
    
</script>
</body>
</html>


```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# index.thtml(menu.html erp)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISTEMA ERP ABP - Inicio</title>
    
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
<!-- <link rel="stylesheet" href="css/index.css"> -->
 <style>   
     /* index.css */
        /* Configurações Gerais */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding-top: 80px; /* Espaço para a navbar fixa */
        }

        /* Grid de Cards */
        .content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #333;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid #e2e8f0;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            border-color: #3ecf8e;
        }

        .card i {
            font-size: 2.5rem;
            color: #3ecf8e;
            margin-bottom: 15px;
        }

        .card h3 {
            font-size: 1.1rem;
            margin: 0;
        }

        /* Navbar Styles */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            box-sizing: border-box;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white !important;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-home {
            background: #3ecf8e !important;
        }
  
</style>


</head>
<body>
<!-- navbar -->
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>
<!-- fim navbar -->

<div class="content">      
<div class="grid">

<!-- cardes do menu-->
    
    <a href="entidades.html" class="card">
    <i class="fas fa-users"></i>
    <h3>Gestão de Entidades</h3>
    </a>

    <a href="financeiro.html" class="card">
    <i class="fas fa-hand-holding-usd"></i>
    <h3>Financeiro</h3>
    </a>

    <a href="produtos.html" class="card">
    <i class="fas fa-box"></i>
    <h3>Produtos</h3>
    </a>
    
 

            
            <a href="vitrine.html" class="card">
                <i class="fas fa-shopping-basket"></i>
                <h3>vitrine</h3>
            </a>
            
            <a href="pdv.html" class="card">
                <i class="fas fa-shopping-basket"></i>
                <h3>pdv</h3>
            </a>
            
             <a href="testes.html" class="card">
                <i class="fas fa-shopping-basket"></i>
                <h3>testes</h3>
            </a>

<!-- fim cardes do menu-->         
</div>        
</div>

<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
</body>
</html>

```











