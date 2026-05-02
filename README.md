# ARISTIDESBP

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |


## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [ENTRAR](https://github.com/aristidesbp)

---
## PROJETOS COM SUPABASE
* 🌐 **Login:** [ENTRAR](https://aristidesbp.github.io/projetos/login/redirecionar.html)
* 🌐 **cinema:** [ENTRAR](https://aristidesbp.github.io/projetos/cinema/meu_cinema.html)
* 🌐 **Entidades:** [ENTRAR](https://aristidesbp.github.io/entidades.html)
* 🌐 **Financeiro:** [ENTRAR](https://aristidesbp.github.io/projetos/financeiro/financeiro.html)
* 🌐 **Tarefas:** [ENTRAR](https://aristidesbp.github.io/tarefas.html)
* 🌐 **Edjacy:** [ENTRAR](https://aristidesbp.github.io/edjacy.html)


---
## 📚 LINKS PARA ESTUDOS
* 🌐 **HTML:** [w3schools.com](https://w3schools.com)
* 🎨 **CSS:** [codecademy.com](https://codecademy.com)
* ⚡ **JavaScript:** [freecodecamp.org](https://freecodecamp.org)
* ⚛️ **React:** [react.dev](https://react.dev)
* 🐍 **Python:** [learnpython.org](https://learnpython.org)
* ☕ **Java:** [sololearn.com](https://sololearn.com)
* 🐘 **PHP:** [php.net](https://php.net)
* 🛡️ **Cybersecurity:** [tryhackme.com](https://tryhackme.com)
* ⚙️ **C:** [learn-c.org](https://learn-c.org)
* 🛠️ **C++:** [learncpp.com](https://learncpp.com)
* ☁️ **AWS:** [skillbuilder.aws](https://skillbuilder.aws)
* 🤖 **IA/ML:** [coursera.org](https://coursera.org)
* 🌿 **Git:** [learngitbranching.js.org](https://learngitbranching.js.org)
* 📊 **SQL:** [sqlbolt.com](https://sqlbolt.com)

  

# TUTORIAIS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥



![Img termux](projetos/img/termux.jpeg)

# TERMUX (TERMINAL LINUX PARA ANDROID)
## por que baixar o termux?
- reorganizar pastas.
- fazer testes
- utilizar o git
- ter um terminal portátil
  
## Download do aplicativo direto no git
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
```
```
# ver as pastas ocultas (-a) do diretorio
ls -a
```
```
# ver pastas e arquivos
tree
```
```
# ir para o diretorio
cd nome_do_diretorio
```
```
# voltar para pasta anterior
cd ..
```
```
# voltar para pasta raiz
cd
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
```
# como apagar pasta/arquivos/projetos
rm -rf nome_da_pasta
```

---
# 🟥 COMO BAIXAR MIDIAS COM TERMUX 
```
pkg update && pkg upgrade
pkg install python ffmpeg

```
```
python3 -m pip install --upgrade yt-dlp
```
```
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "url_link"

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

![Img github](projetos/img/github.jpeg)

# GITHUB (EDITOR DE CODIGO, VERSIONAMENTO E HOSPEDAGEM)
```
# verificar se o git está instalado 
git --version
```
```
# vá para pasta onde ficará o repositório
cd storage/downloads
```
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
git config --global user.name "nome_do_usuario"
```
```
# Configurar email do GitHub
git config --global user.email "seu@email.com"
```
```
# verificar se tem chave SSH
ls -a ~/.ssh
```
```
# criar uma chave SSH
# Aperte [Enter] (deixe tudo em branco).
ssh-keygen -t ed25519 -C "email_cadastrado"
```
```
# exibir o código que você deve copiar e colar no GitHub:
cat ~/.ssh/id_ed25519.pub
```

* Copie todo esse código que apareceu (começando em ssh-ed25519 até o final do seu e-mail) e adicione-o em **Settings > SSH and GPG keys > New SSH key** no seu GitHub.
* exemplo: ssh-ed255...atkeWeHiX0 aristidesbp@gmail.com
* após salvar tem que confirmar por email.
ssh criado use este comando no termux:
```
# testar a conexão:
# Digite a palavra "yes" e aperte Enter.
# DEVE APARECER:
# Hi aristidesbp! You've successfully authenticated, but GitHub does not provide shell access.
ssh -T git@github.com
```
```
# iniciar o agente de chaves e registrar nova chave:
eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519
```

---
# 🟥 GITHUB : BAIXAR E ENVIAR ARQUIVOS 

```
# clonar um repositório
# exemplo:
git clone git@github.com:usuário/nome_do_repositorio.git
```
```
# entrar na pasta
cd aristidesbp.github.io
```
```
# dar permissão
git config --global --add safe.directory "$(pwd)"
```
```
# testar
git status 
```
```
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
git init
```
```
# BAIXAR ATUALIZAÇÃO DO SITE:
git pull origin main

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
# VERIFICAR STATUS DO REPOSITORIO LOCAL:
git status

```
```
# ADICIONAR REPOSITÓRIOS À LISTA:
git add .

```
```
# SALVAR PONTO DE ALTERAÇÃO:
git commit -m "DESCRIÇÃO_DA_ALTERACAO"

```
```
# MANDAR ALTERAÇÕES PARA O REPOSITÓRIO:
git push origin main

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
# SQL

# Prompt para criar functions trigger

```
create table public.usuarios (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_id_auth uuid null,
  role TEXT CHECK (role IN ('master', 'funcionario', 'cliente')) DEFAULT 'cliente',
  nome_completo text null,
  bio text null,
  avatar_url text null,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_user_id_auth_fkey foreign KEY (user_id_auth) references auth.users (id)
) TABLESPACE pg_default;

# COM BASE NO SCHEMA ACIMA FAÇA UM SQL COMPLETO COM:
1- Criação da tabela
2- [função de integração com Auth,trigger]: A cada novo usuário que for criado no schema auth, deve ser criado o mesmo usuário no schema public na tabela acima.
3- criar aplolicies (Política básica de RLS)



```
# resposta 
## Criar tabela espelho do user_auth
```
-- 1. Remove a trigger e a função primeiro para evitar erros de dependência
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Remove a tabela se ela existir (CASCADE remove políticas RLS vinculadas)
DROP TABLE IF EXISTS public.usuarios CASCADE;

-- 3. Cria a tabela com a estrutura otimizada
CREATE TABLE public.usuarios (
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH time zone NOT NULL DEFAULT now(),
    user_id_auth uuid UNIQUE NOT NULL, -- UNIQUE garante 1:1 com auth.users
    role TEXT CHECK (role IN ('master', 'funcionario', 'cliente')) DEFAULT 'cliente',
    nome_completo text,
    bio text,
    avatar_url text,
    CONSTRAINT usuarios_user_id_auth_fkey FOREIGN KEY (user_id_auth) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- 4. Habilita RLS (Row Level Security) - Boa prática para segurança
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- 5. Recria a função de integração com Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.usuarios (user_id_auth, nome_completo, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    'cliente'
  );
  RETURN new;
END;
$$;

-- 6. Recria o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. Política básica de RLS (Opcional, mas recomendada)
CREATE POLICY "Usuários podem ver o próprio perfil" ON public.usuarios
FOR SELECT USING (auth.uid() = user_id_auth);
```


# APAGANDO FUNCTIONS A FORÇA
```
-- Força a exclusão da função on_auth_user_created 
DROP FUNCTION IF EXISTS public.on_auth_user_created() CASCADE;

-- Se quiser aproveitar e forçar a limpeza da handle_new_user também, rode esta:
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
```


# INSERINDO DADOS EM USUARIOS
```
INSERT INTO public.usuarios (id, nome, role)
VALUES (
  'COLE-AQUI-O-UUID-DO-USUARIO', -- O ID que você copiou
  'Nome do Usuário',              -- Nome que aparecerá no sistema
  'psicopedagoga'                 -- Pode ser: 'psicopedagoga', 'supervisor' ou 'paciente'
)
ON CONFLICT (id) DO UPDATE 
SET role = EXCLUDED.role, nome = EXCLUDED.nome;  
 
```

# UPDATE
```
UPDATE public.clinica_perfis
SET 
    nome = 'Novo Nome Corrigido',
    role = 'supervisor' -- Pode alterar para o cargo desejado
WHERE id = 'COLE-AQUI-O-UUID-DO-USUARIO';
```

#  LIST (Listar / Select)
* Existem duas formas principais de listar: ver todos os usuários ou buscar um específico.
###  A) Listar TODOS os usuários do sistema:
```
SELECT id, nome, role, created_at
FROM public.clinica_perfis
ORDER BY created_at DESC; -- Mostra os mais recentes primeiro
```
### Listar APENAS os pacientes (Filtrando por cargo):
```
SELECT nome, role 
FROM public.clinica_perfis
WHERE role = 'paciente';
```
## DELETAR 
```
-- DELETE (Excluir / Apagar)
-- Apagar um usuário específico do sistema pelo seu ID
DELETE FROM public.clinica_perfis
WHERE id = 'COLE-AQUI-O-UUID-DO-USUARIO';

-- ⚠️ ATENÇÃO: Nunca rode um DELETE sem o "WHERE", 
-- ou ele apagará TODOS os usuários da tabela inteira!
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# PROJETOS COM O SUPABASE E GITHUB_PAGES
## ESTRUTURA UTILIZADA
````
# Vamos criar um sistema ERP completo, no qual iremos hospedar no github_pages, e integrar o db com Supabase.
# vamos usar um sistema de pastas separando paginas e funcionalidades, dividindo o projeto em varias partes menores.

erp_abp/
!_ supabase/
!    !_ supabase_config.js
!    !_ .env
!    !_ .gitignore
!
!_ usuarios/
!    !_ usuarios.html
!    !_ usuarios.css
!    !_ usuarios_model.js
!    !_ usuarios_controller.js
!    !_ usuarios.sql
!
!_ login/
!    !_ login.html
!    !_ login.css
!    !_ login_model.js
!    !_ login_controller.js
!
!_ financeiro/
!   !_ financeiro.html
!   !_ financeiro_model.js
!   !_ financeiro_controller.css
!   !_ financeiro.sql  

````

## EXEMPLO DE CHAMADAS NA PASTA DENTRO DA PASTA FINANCERIO
```
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<link rel="stylesheet href="financeiro.css">
<script src="../supabase/supabase_config.js"></script>
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto: nome_do_seu_projeto
* Senha do banco: ***********
* Região: brasil

--- 

## Configurar

* Authentication/URL Configuration & Redirect URLs: coloque a url do seu site (http://aristidesbp.github.io)
* Authentication/Users: voçẽ pode criar um novo usuario.


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## supabase/teste_de_conexao.html
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste Supabase - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
  
<body class="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4">

    <div class="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6">
        <h1 class="text-2xl font-bold mb-6 text-center text-emerald-400">Teste de Conexão Supabase</h1>
        
        <div class="space-y-4">
            <div>
                <label for="sb-url" class="block text-sm font-medium mb-1 text-gray-400">URL do Projeto</label>
                <input type="text" id="sb-url" 
                    value="https://bpdjbffsfxvrdxxwxzsz.supabase.co" 
                    class="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-emerald-500 font-mono text-sm">
            </div>

            <div>
                <label for="sb-key" class="block text-sm font-medium mb-1 text-gray-400">Anon / Public Key</label>
                <input type="password" id="sb-key" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                    class="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-emerald-500 font-mono text-sm">
            </div>

            <button id="btn-test"
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-colors mt-4">
                Testar Conexão
            </button>
        </div>

        <div class="mt-6">
            <h2 class="text-sm font-medium mb-2 text-gray-400">Console:</h2>
            <div id="log-container" class="bg-black rounded border border-gray-700 p-3 h-48 overflow-y-auto font-mono text-xs">
                <div class="text-gray-500">Aguardando início do teste...</div>
            </div>
        </div>
    </div>


  
  <!-- ############################################ -->
    <!-- Importando Supabase via CDN (ES Modules) -->
   <!-- ############################################ -->
    <script type="module">
        import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

        const btnTest = document.getElementById('btn-test');
        const inputUrl = document.getElementById('sb-url');
        const inputKey = document.getElementById('sb-key');
        const logContainer = document.getElementById('log-container');

        function log(message, type = 'info') {
            const colors = {
                info: 'text-blue-400',
                success: 'text-green-400',
                error: 'text-red-400',
                warn: 'text-yellow-400',
                default: 'text-gray-300'
            };
            const colorClass = colors[type] || colors.default;
            const time = new Date().toLocaleTimeString();
            
            const logEntry = document.createElement('div');
            logEntry.className = `mb-1 ${colorClass}`;
            logEntry.textContent = `[${time}] ${message}`;
            
            // Remove a mensagem de "Aguardando" na primeira inserção
            if (logContainer.children.length === 1 && logContainer.children[0].textContent.includes('Aguardando')) {
                logContainer.innerHTML = '';
            }
            
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }

        btnTest.addEventListener('click', async () => {
            const url = inputUrl.value.trim();
            const key = inputKey.value.trim();

            logContainer.innerHTML = ''; // Limpa logs anteriores

            if (!url || !key) {
                log('Erro: URL e Key são obrigatórias.', 'error');
                return;
            }

            if (url.endsWith('/rest/v1/')) {
                log('Aviso: A URL não deve terminar com /rest/v1/. O SDK adiciona isso automaticamente. Remova e tente novamente.', 'warn');
                return;
            }

            log('Inicializando cliente Supabase...', 'info');
            btnTest.disabled = true;
            btnTest.classList.add('opacity-50', 'cursor-not-allowed');

            try {
                const supabase = createClient(url, key);
                
                log('Enviando requisição de teste de conexão...', 'info');
                
                // Fazendo uma requisição genérica para verificar se a API responde
                const startTime = performance.now();
                const { data, error, status } = await supabase.from('_non_existent_table_test_').select('*').limit(1);
                const latency = Math.round(performance.now() - startTime);

                // Como a tabela não existe, esperamos um erro específico do PostgREST (PGRST116 ou 404).
                // Se a API responder com status HTTP, significa que a conexão física e as credenciais funcionam.
                if (status) {
                    log(`Resposta do servidor recebida em ${latency}ms. Status HTTP: ${status}`, 'success');
                    log('Conexão com o projeto Supabase estabelecida com sucesso!', 'success');
                } else if (error) {
                    throw error;
                }

            } catch (err) {
                log(`Falha na conexão. Erro: ${err.message || 'Desconhecido'}`, 'error');
                log('Verifique se a URL e a Anon Key estão corretas e se o projeto não está pausado.', 'warn');
            } finally {
                btnTest.disabled = false;
                btnTest.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    </script>
  
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# supabase/
```
!_ supabase/
!    !_ supabase_config.js
!    !_ .gitignore
```


## supabase/supabase_config.js
```
// 1. Chaves de Acesso (Substitua pelas suas)
const SUPABASE_URL = 'SUA_URL';
const SUPABASE_KEY = 'SUA_CHAVE_ANOM';

console.log("✅ conectado com o arquivo supabase/supabase_config.js");
```


## .gitignore
```
supabase_config.js
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# tarefas.html (funcionando)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TAREFAS - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <script src="https://unpkg.com/html5-qrcode"></script>

    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --danger: #ef4444; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); }
        .container { max-width: 1100px; margin: auto; padding: 20px; padding-top: 85px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        
        .barcode-group { display: flex; gap: 5px; }
        .btn-scan { background: var(--dark); color: white; padding: 0 15px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        #reader { width: 100%; max-width: 400px; margin: 10px auto; border-radius: 8px; overflow: hidden; display: none; }

        .tag { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-top: 4px;}
        .tag-pendente { background: #fef3c7; color: #92400e; }
        .tag-realizada { background: #dcfce7; color: #166534; }
        .tag-data { background: #e0f2fe; color: #0284c7; }
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    </style>

    <!-- 1. Carrega a biblioteca do Supabase primeiro -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    
    <!-- 2. Carrega sua configuração centralizada (Certifique-se que o caminho está correto) -->
    <script src="supabase_config.js"></script>

    <script>
        // Inicializa o cliente usando as constantes do supabase_config.js
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        let recordedAudioBlob = null;
        let mediaRecorder;
        let audioChunks = [];
        let html5QrCode;

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            if (!session) {
                document.getElementById('tela-login').style.display = 'flex';
                document.getElementById('tela-sistema').style.display = 'none';
            } else {
                document.getElementById('tela-login').style.display = 'none';
                document.getElementById('tela-sistema').style.display = 'block';
                loadtarefas(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) alert("Erro: " + error.message);
            else verificar_login();
        }

        document.addEventListener('DOMContentLoaded', verificar_login);
    </script>
</head>
<body>

    <div id="tela-login" class="flex justify-center items-center h-screen bg-slate-900" style="display: none;">
        <div class="bg-white p-10 rounded-xl w-full max-w-sm text-center border-t-4 border-emerald-500">
            <h2 class="text-2xl font-bold mb-6 text-slate-800">ERP ABP</h2>
            <input type="email" id="login-email" placeholder="E-mail" class="mb-4">
            <input type="password" id="login-senha" placeholder="Senha" class="mb-6">
            <button class="bg-emerald-500 text-white w-full p-3 rounded font-bold" onclick="fazerLogin()">Entrar</button>
        </div>
    </div>

    <div id="tela-sistema" style="display: none;">
        <div class="navbar">
            <div class="font-bold text-slate-800 text-xl"><i class="fas fa-tasks text-emerald-500"></i> Gestão de Exercícios</div>
            <button class="text-red-500 font-bold" onclick="_supabase.auth.signOut().then(() => verificar_login());">Sair</button>
        </div>

        <div class="container">
            <div class="card">
                <h3 id="form-title" class="text-xl font-bold mb-4">Nova Atividade</h3>
                <input type="hidden" id="edit-id">

                <div class="section-title">Informações Básicas</div>
                <div class="form-grid">
                    <div style="grid-column: span 2;"><label>Título do Exercício *</label><input type="text" id="titulo"></div>
                    <div><label>Categoria</label><input type="text" id="categoria" placeholder="Ex: Matemática, Cognitivo..."></div>
                    <div>
                        <label>Código de Barras</label>
                        <div class="barcode-group">
                            <input type="text" id="codigo_de_barras" placeholder="Digite ou leia">
                            <button type="button" class="btn-scan" onclick="startScanner()" title="Abrir Câmera">
                                <i class="fas fa-barcode"></i>
                            </button>
                        </div>
                    </div>
                    <div><label>Data Prazo</label><input type="date" id="data_prazo"></div>
                    <div>
                        <label>Status</label>
                        <select id="status_exercicio">
                            <option value="pendente">Pendente</option>
                            <option value="realizada">Realizada</option>
                        </select>
                    </div>
                </div>

                <div id="reader"></div>
                <button id="btn-stop-scanner" class="bg-red-500 text-white p-2 rounded w-full mb-4 font-bold" style="display:none;" onclick="stopScanner()">Fechar Câmera</button>

                <div class="section-title">Conteúdo do Exercício</div>
                <textarea id="descricao" placeholder="Digite o enunciado aqui..."></textarea>

                <div class="section-title">Mídias e Notas</div>
                <div class="form-grid">
                    <div>
                        <label>Foto da Resolução</label>
                        <input type="file" id="foto_resolucao" accept="image/*" capture="environment">
                    </div>
                    <div>
                        <label>Gravar Áudio</label>
                        <button class="w-full border-2 border-dashed p-3 rounded bg-slate-50 text-slate-500 font-bold" id="btn-audio" onclick="toggleGravação()"><i class="fas fa-microphone"></i> Gravar Leitura</button>
                        <audio id="audio-preview" controls style="display:none; width:100%; margin-top:10px; height:35px;"></audio>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label>Observações do Responsável</label>
                        <textarea id="observacoes" placeholder="Relate dificuldades ou progressos..."></textarea>
                    </div>
                </div>

                <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Registro</button>
                <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
            </div>

            <div class="card">
                <input type="text" id="inputBusca" placeholder="Pesquisar exercícios..." onkeyup="filtrarTabela()" class="mb-4">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 text-xs uppercase border-b">
                                <th class="p-4">Atividade / Categoria</th>
                                <th class="p-4">Código</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="exercises-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- FUNÇÕES DO SCANNER ---
        function startScanner() {
            const readerDiv = document.getElementById('reader');
            const stopBtn = document.getElementById('btn-stop-scanner');
            readerDiv.style.display = 'block';
            stopBtn.style.display = 'block';
            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('codigo_de_barras').value = decodedText;
                stopScanner();
            }).catch(err => console.error(err));
        }

        function stopScanner() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    document.getElementById('reader').style.display = 'none';
                    document.getElementById('btn-stop-scanner').style.display = 'none';
                });
            }
        }

        // --- ÁUDIO ---
        async function toggleGravação() {
            const btn = document.getElementById('btn-audio');
            const preview = document.getElementById('audio-preview');
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(recordedAudioBlob);
                    preview.style.display = 'block';
                };
                mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
            }
        }

        // --- CRUD ---
        async function loadtarefas() {
            const { data, error } = await _supabase.from('tarefas').select('*').order('created_at', { ascending: false });
            if (error) { console.error(error); return; }
            const tbody = document.getElementById('exercises-list');
            tbody.innerHTML = data.map(e => {
                let prazo = e.data_prazo ? new Date(e.data_prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
                return `
                <tr class="border-t">
                    <td class="p-4">
                        <span class="font-bold text-slate-800">${e.titulo}</span><br>
                        <span class="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">${e.categoria || 'Geral'}</span>
                        <span class="tag tag-data"><i class="far fa-calendar-alt"></i> ${prazo}</span>
                    </td>
                    <td class="p-4 font-mono text-sm text-slate-400">${e.codigo_de_barras || '-'}</td>
                    <td class="p-4"><span class="tag tag-${e.status_exercicio}">${e.status_exercicio}</span></td>
                    <td class="p-4 text-center">
                        <button class="text-blue-500 mr-4" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500" onclick="deleteExercicio('${e.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`}).join('');
        }

        async function handleSave() {
            const btn = document.getElementById('btn-save');
            btn.disabled = true; btn.innerText = "Salvando...";
            try {
                const id = document.getElementById('edit-id').value;
                const { data: { user } } = await _supabase.auth.getUser();
                const payload = {
                    titulo: document.getElementById('titulo').value,
                    descricao: document.getElementById('descricao').value,
                    categoria: document.getElementById('categoria').value,
                    codigo_de_barras: document.getElementById('codigo_de_barras').value,
                    data_prazo: document.getElementById('data_prazo').value || null,
                    status_exercicio: document.getElementById('status_exercicio').value,
                    observacoes: document.getElementById('observacoes').value,
                    user_id: user.id
                };
                
                // Storage handling (simplificado)
                const inputFoto = document.getElementById('foto_resolucao');
                if (inputFoto.files[0]) {
                    const fileName = `res_${Date.now()}.jpg`;
                    await _supabase.storage.from('resolucoes').upload(`public/${fileName}`, inputFoto.files[0]);
                    payload.foto_url = _supabase.storage.from('resolucoes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                const { error } = id ? await _supabase.from('tarefas').update(payload).eq('id', id) : await _supabase.from('tarefas').insert([payload]);
                if (error) throw error;
                resetForm(); loadtarefas();
            } catch (e) { alert(e.message); }
            finally { btn.disabled = false; btn.innerText = "Salvar Registro"; }
        }

        async function editFull(id) {
            const { data } = await _supabase.from('tarefas').select('*').eq('id', id).single();
            if (data) {
                document.getElementById('edit-id').value = data.id;
                document.getElementById('titulo').value = data.titulo;
                document.getElementById('descricao').value = data.descricao;
                document.getElementById('categoria').value = data.categoria || '';
                document.getElementById('codigo_de_barras').value = data.codigo_de_barras || '';
                document.getElementById('data_prazo').value = data.data_prazo || '';
                document.getElementById('status_exercicio').value = data.status_exercicio;
                document.getElementById('observacoes').value = data.observacoes || '';
                document.getElementById('form-title').innerText = "Editando Atividade";
                document.getElementById('btn-cancel').style.display = "block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        async function deleteExercicio(id) {
            if (confirm("Excluir?")) { await _supabase.from('tarefas').delete().eq('id', id); loadtarefas(); }
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
            document.getElementById('status_exercicio').value = 'pendente';
            document.getElementById('form-title').innerText = "Nova Atividade";
            document.getElementById('btn-cancel').style.display = "none";
            recordedAudioBlob = null;
            document.getElementById('audio-preview').style.display = 'none';
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#exercises-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }
    </script>
</body>
    <!--
    -- ============================================================================
-- SCRIPT: MÓDULO TAREFAS (GESTÃO DE EXERCÍCIOS)
-- ============================================================================

-- 1. Criação da Tabela com suporte a RLS e Identidade do Usuário
CREATE TABLE IF NOT EXISTS public.tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    codigo_de_barras TEXT,
    data_prazo DATE,
    observacoes TEXT,
    foto_url TEXT,
    audio_url TEXT,
    status_exercicio TEXT DEFAULT 'pendente' CHECK (status_exercicio IN ('pendente', 'realizada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança: O usuário só vê e edita o que é DELE
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar suas próprias tarefas') THEN
        CREATE POLICY "Usuários podem gerenciar suas próprias tarefas" 
        ON public.tarefas 
        FOR ALL 
        USING (auth.uid() = user_id) 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- 4. Configuração de Buckets para Mídias (Fotos e Áudios)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resolucoes', 'resolucoes', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('audios', 'audios', true) 
ON CONFLICT (id) DO NOTHING;

-- 5. Políticas de Storage: Permitir upload apenas para usuários autenticados
-- Nota: 'public' no bucket permite leitura anônima via URL, mas o upload exige login.
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload autenticado em mídias') THEN
        CREATE POLICY "Upload autenticado em mídias" 
        ON storage.objects FOR INSERT 
        WITH CHECK (auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Leitura pública de mídias') THEN
        CREATE POLICY "Leitura pública de mídias" 
        ON storage.objects FOR SELECT 
        USING (bucket_id IN ('resolucoes', 'audios'));
    END IF;
END $$;
    
    -->
</html>
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# EXEMPLO DE CODIGO (SPA-entidades.html)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <style>
        /* --- VARIÁVEIS E ESTILOS GERAIS --- */
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); }
        
        /* --- ESTILOS DO SISTEMA CRUD --- */
        .container { max-width: 1100px; margin: auto; padding: 20px; padding-top: 85px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        
        /* Ajuste para o botão de senha */
        .password-wrapper { position: relative; display: flex; align-items: center; }
        .password-wrapper i { position: absolute; right: 10px; cursor: pointer; color: #64748b; }
        
        /* Botões */
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-add:hover { opacity: 0.9; }
        .btn-add:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        
        /* Tabela */
        .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; min-width: 800px; }
        th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; text-align: left; }
        td { padding: 15px; border-top: 1px solid #f1f5f9; vertical-align: middle; }
        
        /* Elementos Visuais */
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
        .btn-nav { padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-logout { background: #ef4444; color: white; border: none; cursor: pointer; }
        .tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
        .avatar-img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: #eee; }

        /* --- ESTILOS DA TELA DE LOGIN --- */
        .login-wrapper { display: flex; justify-content: center; align-items: center; height: 100vh; background: var(--dark); }
        .login-box { background: white; padding: 40px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); text-align: center; }
        .login-box h2 { margin-bottom: 20px; color: var(--dark); font-size: 24px; }
        .login-box input { margin-bottom: 15px; }
        .btn-login { background: var(--primary); color: white; padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; font-size: 16px; transition: 0.3s; }
        .btn-login:hover { opacity: 0.9; }
    </style>

    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script>
        // Configuração do Supabase (Atenção: substitui a chave abaixo pela tua verdadeira)
        const SUPABASE_URL = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbXNrc3JoZGVkd3JsYW5wbW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDE5ODQsImV4cCI6MjA5MDYxNzk4NH0.X2S4UZ3WGLoxx9LsNNbJ6-kyM0DAQoTr8wY57O6m4ZA'; 
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_key);

        // --- FUNÇÕES DE AUTENTICAÇÃO E CONTROLE DE TELA ---
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.style.display = 'flex';
                telaSistema.style.display = 'none';
            } else {
                telaLogin.style.display = 'none';
                telaSistema.style.display = 'block';
                loadEntities(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) alert("Erro ao fazer login: " + error.message);
            else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            verificar_login();
        }

        document.addEventListener('DOMContentLoaded', verificar_login);
    </script>
</head>
<body>

    <div id="tela-login" class="login-wrapper" style="display: none;">
        <div class="login-box">
            <h2><i class="fas fa-user-circle" style="color: var(--primary);"></i> Acesso ao Sistema</h2>
            <input type="email" id="login-email" placeholder="Digite seu e-mail">
            <input type="password" id="login-senha" placeholder="Digite sua senha">
            <button class="btn-login" onclick="fazerLogin()">Entrar</button>
        </div>
    </div>

    <div id="tela-sistema" style="display: none;">
        
        <div class="navbar">
            <a href="menu.html" style="font-weight: bold; color: #0f172a; font-size: 1.2rem; text-decoration: none; cursor: pointer;">
                <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
            </a>
            <div class="flex gap-4">
                <button class="btn-nav btn-logout" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair do Sistema</button>
            </div>
        </div>

        <div class="container">
            <div class="card">
                <h3 id="form-title" class="text-xl font-bold mb-4">Novo Cadastro de Entidade</h3>
                <input type="hidden" id="edit-id">

                <div class="section-title">Informações e Acesso</div>
                <div class="form-grid">
                    <div><label>Foto de Perfil</label><input type="file" id="foto" accept="image/*"></div>
                    <div><label>Nome Completo *</label><input type="text" id="nome_completo"></div>
                    <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
                    <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
                    <div><label>E-mail</label><input type="email" id="email"></div>
                    <div><label>Telefone *</label><input type="text" id="telefone"></div>
                    <div>
                        <label>Senha Interna (Auth)</label>
                        <div class="password-wrapper">
                            <input type="password" id="senha_acesso" placeholder="(Será gerido pelo Supabase Auth futuramente)">
                            <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                        </div>
                    </div>
                    <div>
                        <label>Tipo de Acesso</label>
                        <select id="tipo_acesso">
                            <option value="cliente">Cliente</option>
                            <option value="funcionario">Funcionário</option>
                            <option value="master">Master</option>
                        </select>
                    </div>
                    <div>
                        <label>Relacionamento</label>
                        <select id="tipo_entidade">
                            <option value="cliente">Cliente</option>
                            <option value="fornecedor">Fornecedor</option>
                            <option value="funcionario">Funcionário</option>
                        </select>
                    </div>
                    <div>
                        <label>Status</label>
                        <select id="status_entidade">
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

                <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
                <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
            </div>

            <div class="card">
                <input type="text" id="inputBusca" placeholder="Filtrar por nome..." onkeyup="filtrarTabela()" class="mb-4">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome / Tipo</th>
                                <th>Contato</th>
                                <th>Acesso / Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="entities-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
```
```
    <script>
        // Carregar dados na tabela
        async function loadEntities() {
            const { data, error } = await _supabase.from('entidades').select('*').order('nome_completo');
            if (error) return console.error(error);
            renderTable(data);
        }

        // Renderizar Tabela
        function renderTable(data) {
            const tbody = document.getElementById('entities-list');
            tbody.innerHTML = data.map(e => {
                const avatar = e.foto_url ? e.foto_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                
                return `
                <tr>
                    <td><img src="${avatar}" class="avatar-img" alt="Foto"></td>
                    <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
                    <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
                    <td><span class="tag">${e.tipo_acesso}</span> | ${e.status_entidade}</td>
                    <td>
                        <button class="text-blue-500 mr-2" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 mr-2" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                        <button class="text-green-500" onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>
                    </td>
                </tr>
                `;
            }).join('');
        }

        // Salvar (Inserir ou Atualizar) com Upload de Foto
        async function handleSave() {
            const btnSave = document.getElementById('btn-save');
            btnSave.disabled = true;
            btnSave.innerText = "Salvando aguarde...";

            try {
                const id = document.getElementById('edit-id').value;
                let fotoUrl = null;
                const inputFoto = document.getElementById('foto');

                // 1. Upload de Foto
                if (inputFoto.files && inputFoto.files.length > 0) {
                    const file = inputFoto.files[0];
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
                    
                    const { data: uploadData, error: uploadError } = await _supabase.storage
                        .from('avatares')
                        .upload(`public/${fileName}`, file);

                    if (uploadError) throw uploadError;

                    const { data: publicUrlData } = _supabase.storage
                        .from('avatares')
                        .getPublicUrl(`public/${fileName}`);

                    fotoUrl = publicUrlData.publicUrl;
                }

                // 2. Coletar campos
                const campos = [
                    'nome_completo', 'cpf', 'data_nascimento', 'email', 'telefone',
                    'cep', 'logradouro', 'numero', 'bairro', 'cidade',
                    'estado', 'avaliacao', 'tipo_acesso', 'tipo_entidade', 'status_entidade'
                ];

                const payload = {};
                campos.forEach(c => {
                    const el = document.getElementById(c);
                    if (el) payload[c] = el.value === "" && el.type === "date" ? null : el.value;
                });
                
                if (fotoUrl) payload.foto_url = fotoUrl;
                
                const { data: userData } = await _supabase.auth.getUser();
                if(userData && userData.user) {
                    payload.user_id = userData.user.id;
                }

                // 3. Salvar no Banco
                const { error } = id 
                    ? await _supabase.from('entidades').update(payload).eq('id', id)
                    : await _supabase.from('entidades').insert([payload]);

                if (error) throw error;
                
                alert("Sucesso!");
                resetForm();
                loadEntities();

            } catch (error) {
                alert("Erro: " + error.message);
                console.error(error);
            } finally {
                btnSave.disabled = false;
                btnSave.innerText = "Salvar Entidade";
            }
        }

        // Editar
        async function editFull(id) {
            const { data } = await _supabase.from('entidades').select('*').eq('id', id).single();
            if (!data) return;

            Object.keys(data).forEach(key => {
                const el = document.getElementById(key);
                if (el && key !== 'foto') el.value = data[key] || '';
            });

            document.getElementById('edit-id').value = data.id;
            document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
            document.getElementById('btn-save').innerText = "Atualizar";
            document.getElementById('btn-cancel').style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Excluir
        async function deleteEntity(id) {
            if (!confirm("Excluir permanentemente?")) return;
            await _supabase.from('entidades').delete().eq('id', id);
            loadEntities();
        }

        // Reset
        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
            document.getElementById('btn-save').innerText = "Salvar Entidade";
            document.getElementById('btn-cancel').style.display = "none";
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = el.id === 'avaliacao' ? '5' : '');
            document.getElementById('foto').value = ''; 
        }

        // Busca CEP
        async function buscaCEP() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            }
        }

        // Filtro Tabela
        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#entities-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }

        // Visibilidade Senha
        function togglePasswordVisibility() {
            const input = document.getElementById('senha_acesso');
            const icon = document.getElementById('togglePassword');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    </script>
```
```
<!-- 
-- ============================================================================
-- 0. LIMPEZA TOTAL DA VERSÃO ANTERIOR (DROP)
-- ============================================================================
-- Remove os gatilhos e funções antigas
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
-- CORREÇÃO AQUI: Procuramos na pasta public, não na auth
DROP FUNCTION IF EXISTS public.get_user_role(); 

-- Remove as políticas do Storage antigas (se existirem)
DROP POLICY IF EXISTS "Imagens publicas para visualizacao" ON storage.objects;
DROP POLICY IF EXISTS "Upload apenas para logados" ON storage.objects;
DROP POLICY IF EXISTS "Usuario edita a propria foto" ON storage.objects;
DROP POLICY IF EXISTS "Usuario apaga a propria foto" ON storage.objects;

-- Remove a tabela antiga e todas as políticas de segurança atreladas a ela
DROP TABLE IF EXISTS public.entidades CASCADE;


-- ============================================================================
-- 1. CRIAÇÃO DA TABELA PRINCIPAL ATUALIZADA
-- ============================================================================
CREATE TABLE public.entidades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Vínculo de segurança com o Auth
    nome_completo TEXT NOT NULL,
    cpf TEXT,
    data_nascimento DATE,
    email TEXT,
    telefone TEXT,
    tipo_acesso TEXT DEFAULT 'cliente',
    tipo_entidade TEXT DEFAULT 'cliente',
    status_entidade TEXT DEFAULT 'ativo',
    avaliacao INTEGER DEFAULT 5,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado VARCHAR(2),
    foto_url TEXT, -- Campo para armazenar o link da foto
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ============================================================================
-- 2. BLINDAGEM DA TABELA (ROW LEVEL SECURITY - RLS)
-- ============================================================================
-- Ativamos a segurança a nível de linha (ninguém acede sem permissão)
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;

-- CORREÇÃO AQUI: Função segura criada na pasta 'public'
CREATE OR REPLACE FUNCTION public.get_user_role() 
RETURNS TEXT AS $$
  SELECT tipo_acesso FROM public.entidades WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- APLICAÇÃO DAS REGRAS POR CARGO:

-- REGRA MASTER: Tem poder absoluto
CREATE POLICY "Master faz tudo" ON public.entidades 
FOR ALL TO authenticated 
USING (public.get_user_role() = 'master');

-- REGRA FUNCIONÁRIO: Pode ler, inserir e editar (Não pode apagar)
CREATE POLICY "Funcionario le" ON public.entidades 
FOR SELECT TO authenticated 
USING (public.get_user_role() = 'funcionario');

CREATE POLICY "Funcionario insere" ON public.entidades 
FOR INSERT TO authenticated 
WITH CHECK (public.get_user_role() = 'funcionario');

CREATE POLICY "Funcionario atualiza" ON public.entidades 
FOR UPDATE TO authenticated 
USING (public.get_user_role() = 'funcionario');

-- REGRA CLIENTE/FORNECEDOR: O utilizador só vê e altera A SUA PRÓPRIA LINHA
CREATE POLICY "Pessoa ve e edita os proprios dados" ON public.entidades 
FOR ALL TO authenticated 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());


-- ============================================================================
-- 3. AUTOMATIZAÇÃO SEGURA (TRIGGER DE REGISTO NOVO UTILIZADOR)
-- ============================================================================
-- Função que insere na tabela 'entidades' quando alguém se regista no Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.entidades (user_id, email, nome_completo, status_entidade, tipo_acesso, tipo_entidade)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Utilizador Novo'),
    'ativo',
    'cliente',
    'cliente'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cria o gatilho associando a função acima ao evento de novo usuário
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================================
-- 4. SEGURANÇA DO STORAGE (IMPEDIR UPLOADS MALICIOSOS NO BUCKET 'avatares')
-- ============================================================================
-- Nota: Lembra-te que o bucket 'avatares' deve ser criado manualmente no painel Storage!

-- Permite que qualquer pessoa veja as fotos
CREATE POLICY "Imagens publicas para visualizacao"
ON storage.objects FOR SELECT TO public
USING ( bucket_id = 'avatares' );

-- Permite que APENAS utilizadores logados façam upload
CREATE POLICY "Upload apenas para logados"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'avatares' );

-- Permite que o utilizador edite ou apague apenas a sua própria foto
CREATE POLICY "Usuario edita a propria foto"
ON storage.objects FOR UPDATE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );

CREATE POLICY "Usuario apaga a propria foto"
ON storage.objects FOR DELETE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );
    

    -- ============================================================================
-- 4. CRIAÇÃO E SEGURANÇA DO STORAGE (BUCKET 'avatares')
-- ============================================================================

-- A. LIMPEZA PREVENTIVA (Isto é o que evita o teu erro!)
DROP POLICY IF EXISTS "Imagens publicas para visualizacao" ON storage.objects;
DROP POLICY IF EXISTS "Upload apenas para logados" ON storage.objects;
DROP POLICY IF EXISTS "Usuario edita a propria foto" ON storage.objects;
DROP POLICY IF EXISTS "Usuario apaga a propria foto" ON storage.objects;


-- B. CRIA O BUCKET AUTOMATICAMENTE (Se ele ainda não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatares', 'avatares', true)
ON CONFLICT (id) DO NOTHING;


-- C. APLICA AS REGRAS DE SEGURANÇA
CREATE POLICY "Imagens publicas para visualizacao"
ON storage.objects FOR SELECT TO public
USING ( bucket_id = 'avatares' );

CREATE POLICY "Upload apenas para logados"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'avatares' );

CREATE POLICY "Usuario edita a propria foto"
ON storage.objects FOR UPDATE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );

CREATE POLICY "Usuario apaga a propria foto"
ON storage.objects FOR DELETE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );
-->
    </body>
</html>
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# financeiro (completo funcionando)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financeiro Completo - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        .status-pago { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-pendente { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-atrasado { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; animation: pulse 2s infinite; }
        
        .highlight-parcelas { border: 2px solid #3b82f6 !important; background-color: #eff6ff !important; box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
        .highlight-label { color: #1d4ed8; font-weight: 900; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        
        label { font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 4px; display: block; }
        input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"], select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        input[type="checkbox"] { width: auto; transform: scale(1.2); cursor: pointer; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        /* Estilo para a zona de Drop */
        .drop-zone { border: 2px dashed #cbd5e1; border-radius: 6px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; background-color: #f8fafc; }
        .drop-zone:hover { background-color: #f1f5f9; border-color: #94a3b8; }
        .drop-zone.dragover { border-color: #3ecf8e; background-color: #ecfdf5; }
    </style>
</head>
<body>

    <div id="tela-login" class="hidden min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
            <div class="text-center mb-8">
                <i class="fas fa-wallet text-5xl text-emerald-500 mb-3"></i>
                <h2 class="text-2xl font-bold text-slate-800">ERP Financeiro</h2>
                <p class="text-slate-500 text-sm mt-1">Faça login para acessar suas contas</p>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                </div>
                <div>
                    <label class="text-sm font-bold text-slate-700">Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                </div>
                <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                    Entrar no Sistema
                </button>
            </div>
        </div>
    </div>

    <div id="tela-sistema" class="hidden">
        
        <nav class="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-40">
            <div class="flex items-center gap-4">
                <button onclick="abrirMenu()" class="text-slate-600 hover:text-emerald-500 text-2xl focus:outline-none px-2">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="font-bold text-xl text-slate-800 hidden sm:block"><i class="fas fa-wallet text-emerald-500"></i> Financeiro ERP ABP</h1>
            </div>
            <button onclick="sairDaConta()" class="text-slate-500 hover:text-red-500 transition font-bold text-sm flex items-center gap-2">
                <span class="hidden sm:inline">Sair</span> <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>

        <div id="sidebar-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-2xl">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 class="text-xl font-bold"><i class="fas fa-wallet text-emerald-500"></i> Menu</h2>
                <button onclick="fecharMenu()" class="text-slate-400 hover:text-white focus:outline-none"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <ul class="p-4 space-y-2 font-medium">
                <li><a href="#" onclick="alternarAba('listagem'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-list w-6"></i> Lançamentos</a></li>
                <li><a href="#" onclick="alternarAba('formulario'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-plus-circle w-6"></i> Novo Lançamento</a></li>
                <li><hr class="border-slate-700 my-4"></li>
                <li><a href="#" onclick="sairDaConta()" class="block p-3 text-red-400 rounded hover:bg-slate-700 transition"><i class="fas fa-sign-out-alt w-6"></i> Sair do Sistema</a></li>
            </ul>
        </div>
        <div id="menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" onclick="fecharMenu()"></div>

        <div class="container mx-auto px-4 pb-10 pt-24">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="card border-l-4 border-emerald-500">
                    <p class="text-gray-500 text-sm">Receitas (Pagas)</p>
                    <h2 id="dash-receita" class="text-2xl font-bold text-emerald-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-red-500">
                    <p class="text-gray-500 text-sm">Despesas (Pagas)</p>
                    <h2 id="dash-despesa" class="text-2xl font-bold text-red-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-amber-500">
                    <p class="text-gray-500 text-sm">Previsão (Pendentes)</p>
                    <h2 id="dash-pendente" class="text-2xl font-bold text-amber-600">R$ 0,00</h2>
                </div>
            </div>

            <div class="flex gap-4 mb-6">
                <button onclick="alternarAba('listagem')" id="btn-aba-listagem" class="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-list"></i> Ver Lançamentos
                </button>
                <button onclick="alternarAba('formulario')" id="btn-aba-formulario" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-plus-circle"></i> Novo Lançamento
                </button>
            </div>

            <div class="card mb-8 hidden" id="aba-formulario">
                <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800"><i class="fas fa-plus-circle"></i> Novo Lançamento</h3>
                
                <input type="hidden" id="f-editando-id">
                <input type="hidden" id="f-editando-financa-id">

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div class="md:col-span-2"><label>Descrição da Conta *</label><input type="text" id="f-desc" placeholder="Ex: Aluguel, Internet, Venda"></div>
                    
                    <div>
                        <label>Tipo de Valor</label>
                        <select id="f-tipo-calculo" onchange="ajustarLabelsValor()">
                            <option value="total">Valor Total</option>
                            <option value="parcela">Valor da Parcela</option>
                        </select>
                    </div>
                    
                    <div><label id="label-valor">Valor Total (R$) *</label><input type="number" id="f-valor" step="0.01" placeholder="0.00"></div>
                    
                    <div><label>Tipo de Operação</label>
                        <select id="f-tipo">
                            <option value="despesa">Despesa (Saída)</option>
                            <option value="receita">Receita (Entrada)</option>
                        </select>
                    </div>

                    <div>
                        <label>Categoria</label>
                        <input type="text" id="f-categoria" list="lista-categorias" placeholder="Digite ou escolha..." value="Geral">
                        <datalist id="lista-categorias"></datalist>
                    </div>

                    <div><label>Status do Lançamento</label>
                        <select id="f-status">
                            <option value="aberto">Aberto</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div class="relative md:col-span-1">
                        <label>Entidade / Cliente</label>
                        <input type="text" id="f-entidade-busca" placeholder="Buscar..." autocomplete="off">
                        <input type="hidden" id="f-entidade-id">
                        <ul id="lista-entidades" class="absolute z-10 w-full bg-white border border-slate-200 shadow-lg rounded max-h-40 overflow-y-auto hidden custom-scroll"></ul>
                    </div>
                    
                    <div>
                        <label>Frequência / Recorrência</label>
                        <select id="f-recorrencia">
                            <option value="1">Mensal</option>
                            <option value="3">Trimestral</option>
                            <option value="6">Semestral</option>
                            <option value="12">Anual</option>
                            <option value="diario">Diário</option> 
                        </select>
                    </div>

                    <div class="p-2 rounded highlight-parcelas">
                        <label class="highlight-label"><i class="fas fa-layer-group"></i> N° de Parcelas *</label>
                        <input type="number" id="f-parcelas" value="1" min="1" class="border-blue-300 font-bold text-blue-700">
                    </div>

                    <div><label>Data Vencimento *</label><input type="date" id="f-vencimento"></div>
                    
                    <div><label>Data de Pagamento</label><input type="date" id="f-data-pagamento"></div>

                    <div class="md:col-span-4">
                        <label><i class="fas fa-barcode"></i> Código de Barras / Linha Digitável</label>
                        <div class="flex gap-2">
                            <input type="text" id="f-barras" placeholder="Cole ou leia o código de barras" class="flex-1">
                            <button onclick="iniciarLeituraCamera()" type="button" class="bg-slate-800 text-white px-4 rounded hover:bg-slate-700 transition flex items-center gap-2">
                                <i class="fas fa-camera"></i> Ler Código
                            </button>
                        </div>
                        
                        <div id="camera-container" class="hidden mt-3 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
                            <div id="camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
                            <button onclick="pararCamera()" type="button" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600 shadow-lg z-10">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label><i class="fas fa-file-invoice"></i> Anexar Boleto</label>
                        <div class="drop-zone" id="drop-boleto" onclick="document.getElementById('f-boleto').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste o arquivo aqui</p>
                            <input type="file" id="f-boleto" accept="image/*,.pdf" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-boleto')">
                            <p id="nome-boleto" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label><i class="fas fa-receipt"></i> Anexar Comprovante</label>
                        <div class="drop-zone" id="drop-comprovante" onclick="document.getElementById('f-comprovante').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste o arquivo aqui</p>
                            <input type="file" id="f-comprovante" accept="image/*,.pdf" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-comprovante')">
                            <p id="nome-comprovante" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-4 mt-6">
                    <button onclick="gerarLancamentoCompleto()" id="btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg">
                        <i class="fas fa-save"></i> Gravar Lançamento
                    </button>
                    <button onclick="cancelarEdicao()" id="btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded hover:bg-slate-600 transition shadow-lg">
                        Cancelar
                    </button>
                </div>
            </div>

            <div class="card" id="aba-listagem">
                <div class="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 class="font-bold text-slate-800"><i class="fas fa-list"></i> Controle de Parcelas</h3>
                    <button onclick="excluirSelecionados()" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm">
                        <i class="fas fa-trash"></i> Excluir Selecionados
                    </button>
                </div>

                <div class="bg-slate-50 p-4 rounded mb-4 flex flex-wrap gap-4 items-end border border-slate-200">
                    <div class="flex-1 min-w-[200px]">
                        <label class="text-xs">Pesquisar Descrição</label>
                        <input type="text" id="filtro-busca" placeholder="Ex: Aluguel..." onkeyup="if(event.key === 'Enter') loadParcelas()">
                    </div>
                    <div>
                        <label class="text-xs">Filtrar Categoria</label>
                        <select id="filtro-categoria" onchange="loadParcelas()">
                            <option value="">Todas</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs">Data Início</label>
                        <input type="date" id="filtro-inicio" onchange="loadParcelas()">
                    </div>
                    <div>
                        <label class="text-xs">Data Fim</label>
                        <input type="date" id="filtro-fim" onchange="loadParcelas()">
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadParcelas()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow transition">
                            <i class="fas fa-search"></i> Filtrar
                        </button>
                        <button onclick="limparFiltros()" class="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition">
                            Limpar
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                <th class="p-3 w-10 text-center"><input type="checkbox" id="check-all" onclick="toggleTodosChecks(this)"></th>
                                <th class="p-3">Datas (Venc. / Pag.)</th>
                                <th class="p-3">Descrição / Anexos</th>
                                <th class="p-3">Nº Parcela</th>
                                <th class="p-3">Valor (R$)</th>
                                <th class="p-3 text-center">Status</th>
                                <th class="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="lista-parcelas" class="text-sm"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> 
    
    <script>
        // Configuração do Supabase
        const supabaseUrl = 'https://wyusolfkxrnwijwjusnv.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA'; 
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let entidadesCache = [];
        let html5QrCode = null;

        
```
```

//====================================================================
        // CONTROLE DO MENU HAMBÚRGUER E ABAS
        // ====================================================================
        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');
            const btnForm = document.getElementById('btn-aba-formulario');
            const btnLista = document.getElementById('btn-aba-listagem');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnForm.classList.remove(...classesVerde, ...classesCinza);
            btnLista.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
                btnForm.classList.add(...classesVerde);
                btnLista.classList.add(...classesCinza);
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                btnLista.classList.add(...classesVerde);
                btnForm.classList.add(...classesCinza);
            }
        }

        // ====================================================================
        // AUTENTICAÇÃO E CONTROLE DE TELAS
        // ====================================================================
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login: Verifique seu e-mail e senha.");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            document.getElementById('lista-parcelas').innerHTML = '';
            document.getElementById('dash-receita').innerText = 'R$ 0,00';
            document.getElementById('dash-despesa').innerText = 'R$ 0,00';
            document.getElementById('dash-pendente').innerText = 'R$ 0,00';
            fecharMenu();
            verificar_login();
        }

        
// ========================================================
// INICIALIZAÇÃO E ARRASTAR/SOLTAR
// ========================================================
        
   document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-boleto', 'f-boleto', 'nome-boleto');
            configurarDropZone('drop-comprovante', 'f-comprovante', 'nome-comprovante');
        });

        async function init() {
            loadEntidades();
            loadCategoriasUnicas();
            loadDashboard();
            loadParcelas();
        }

        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

        
    // ====================================================================
        // FUNÇÕES DO SISTEMA E CRUD
        // ====================================================================
        function ajustarLabelsValor() {
            const tipo = document.getElementById('f-tipo-calculo').value;
            document.getElementById('label-valor').innerText = tipo === 'total' ? 'Valor Total (R$)' : 'Valor da Parcela (R$)';
        }

        async function loadEntidades() {
            const { data } = await _supabase.from('entidades').select('id, nome_completo');
            if(data) entidadesCache = data;
        }

        async function loadCategoriasUnicas() {
            const { data } = await _supabase.from('financas').select('categoria');
            if (!data) return;
            
            const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
            
            const datalist = document.getElementById('lista-categorias');
            const selectFiltro = document.getElementById('filtro-categoria');
            
            datalist.innerHTML = '';
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            
            categorias.forEach(cat => {
                datalist.innerHTML += `<option value="${cat}">`;
                selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        const inputBusca = document.getElementById('f-entidade-busca');
        const listaDropdown = document.getElementById('lista-entidades');
        const inputId = document.getElementById('f-entidade-id');

        inputBusca.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            listaDropdown.innerHTML = '';
            if (!termo) { listaDropdown.classList.add('hidden'); inputId.value = ''; return; }

            const filtradas = entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
            if (filtradas.length > 0) {
                listaDropdown.classList.remove('hidden');
                filtradas.forEach(ent => {
                    const li = document.createElement('li');
                    li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0';
                    li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                    li.onclick = () => {
                        inputBusca.value = ent.nome_completo;
                        inputId.value = ent.id;
                        listaDropdown.classList.add('hidden');
                    };
                    listaDropdown.appendChild(li);
                });
            } else { listaDropdown.classList.add('hidden'); inputId.value = ''; }
        });

        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 300, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('f-barras').value = decodedText;
                pararCamera();
            }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        async function loadDashboard() {
            const { data: parcelas } = await _supabase.from('parcelas').select('*, financas(tipo)');
            if(!parcelas) return;
            let receita = 0, despesa = 0, pendente = 0;
            parcelas.forEach(p => {
                const valor = parseFloat(p.valor_parcela || 0);
                if (p.status === 'pago') { p.financas.tipo === 'receita' ? receita += valor : despesa += valor; }
                else { pendente += valor; }
            });
            document.getElementById('dash-receita').innerText = `R$ ${receita.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
            document.getElementById('dash-despesa').innerText = `R$ ${despesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
            document.getElementById('dash-pendente').innerText = `R$ ${pendente.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
        }

        async function gerarLancamentoCompleto() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const desc = document.getElementById('f-desc').value;
                const tipoCalculo = document.getElementById('f-tipo-calculo').value;
                const valorInput = parseFloat(document.getElementById('f-valor').value);
                const tipo = document.getElementById('f-tipo').value;
                const categoria = document.getElementById('f-categoria').value || 'Geral';
                const statusLancamento = document.getElementById('f-status').value;
                const qtd = parseInt(document.getElementById('f-parcelas').value);
                const recorrenciaVal = document.getElementById('f-recorrencia').value;
                const dataVenc = document.getElementById('f-vencimento').value;
                const dataPagamentoForm = document.getElementById('f-data-pagamento').value;
                const entidade = document.getElementById('f-entidade-id').value || null;
                const barras = document.getElementById('f-barras').value;
                
                const fileBoleto = document.getElementById('f-boleto').files[0];
                const fileComprovante = document.getElementById('f-comprovante').files[0];
                
                const editandoId = document.getElementById('f-editando-id').value;
                const financaId = document.getElementById('f-editando-financa-id').value;

                if(!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

                let valorTotal, valorParcela;
                if (tipoCalculo === 'total') {
                    valorTotal = valorInput;
                    valorParcela = (valorTotal / qtd).toFixed(2);
                } else {
                    valorParcela = valorInput;
                    valorTotal = (valorParcela * qtd).toFixed(2);
                }

                let boletoUrl = null;
                let comprovanteUrl = null;

                if (fileBoleto) {
                    const fileName = `bol_${Date.now()}_${fileBoleto.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileBoleto);
                    if(!error) boletoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (fileComprovante) {
                    const fileName = `comp_${Date.now()}_${fileComprovante.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileComprovante);
                    if(!error) comprovanteUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (editandoId) {
                    await _supabase.from('financas').update({
                        descricao: desc, tipo: tipo, categoria: categoria, status_lancamento: statusLancamento, entidade_id: entidade
                    }).eq('id', financaId);

                    const payloadUpdate = {
                        valor_parcela: valorParcela,
                        data_vencimento: dataVenc,
                        status: dataPagamentoForm ? 'pago' : 'pendente',
                        data_pagamento: dataPagamentoForm || null,
                        codigo_barra: barras
                    };
                    if (boletoUrl) payloadUpdate.boleto_url = boletoUrl;
                    if (comprovanteUrl) payloadUpdate.comprovante_url = comprovanteUrl;

                    const { error: errUpdate } = await _supabase.from('parcelas').update(payloadUpdate).eq('id', editandoId);
                    if (errUpdate) throw errUpdate;

                    alert("Parcela atualizada com sucesso!");
                } else {
                    const { data: financa, error: errF } = await _supabase.from('financas').insert([{
                        descricao: desc, valor_total: valorTotal, tipo, categoria, status_lancamento: statusLancamento, num_parcelas: qtd, entidade_id: entidade
                    }]).select().single();
                    if(errF) throw errF;

                    let parcelas = [];
                    for(let i = 1; i <= qtd; i++) {
                        let venc = new Date(dataVenc + 'T12:00:00'); 
                        if (recorrenciaVal === 'diario') {
                            venc.setDate(venc.getDate() + (i - 1));
                        } else {
                            venc.setMonth(venc.getMonth() + ((i - 1) * parseInt(recorrenciaVal))); 
                        }
                        
                        parcelas.push({
                            financa_id: financa.id,
                            num_parcela: i,
                            valor_parcela: valorParcela,
                            data_vencimento: venc.toISOString().split('T')[0],
                            status: dataPagamentoForm ? 'pago' : 'pendente',
                            data_pagamento: dataPagamentoForm || null,
                            codigo_barra: barras,
                            boleto_url: boletoUrl,
                            comprovante_url: comprovanteUrl
                        });
                    }

                    const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
                    if(errP) throw errP;

                    alert("Lançamento salvo!");
                }
                
                // Em vez de recarregar a página, podemos simplesmente voltar para a lista
                cancelarEdicao();
                loadParcelas();
                loadDashboard();
                alternarAba('listagem');
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';

            } catch (error) {
                alert(error.message);
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-categoria').value = '';
            document.getElementById('filtro-inicio').value = '';
            document.getElementById('filtro-fim').value = '';
            loadParcelas();
        }

```
```
        async function loadParcelas() {
            const busca = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;
            const dataInicio = document.getElementById('filtro-inicio').value;
            const dataFim = document.getElementById('filtro-fim').value;

            let query = _supabase.from('parcelas').select('*, financas!inner(descricao, tipo, categoria)').order('data_vencimento', { ascending: true });

            if (busca) query = query.ilike('financas.descricao', `%${busca}%`);
            if (categoria) query = query.eq('financas.categoria', categoria);
            if (dataInicio) query = query.gte('data_vencimento', dataInicio);
            if (dataFim) query = query.lte('data_vencimento', dataFim);

            const { data, error } = await query;
            if (error) { console.error("Erro ao carregar parcelas:", error.message); return; }
            
            const tbody = document.getElementById('lista-parcelas');
            const hoje = new Date().toISOString().split('T')[0];

            tbody.innerHTML = data.map(p => {
                let statusClass = p.status === 'pago' ? 'status-pago' : 'status-pendente';
                let statusTxt = p.status.toUpperCase();
                if(p.status === 'pendente' && p.data_vencimento < hoje) { statusClass = 'status-atrasado'; statusTxt = 'ATRASADO'; }

                const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString('pt-br');
                const dtPag = p.data_pagamento ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';

                const iconeBoleto = p.boleto_url ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 hover:text-blue-700 ml-2 bg-blue-50 px-2 py-1 rounded text-xs"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
                const iconeComp = p.comprovante_url ? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 hover:text-emerald-700 ml-2 bg-emerald-50 px-2 py-1 rounded text-xs"><i class="fas fa-receipt"></i> Recibo</a>` : '';
                const txtBarras = p.codigo_barra ? `<div class="text-gray-400 font-mono text-[10px] mt-1 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 text-center">
                        <input type="checkbox" class="check-parcela" value="${p.id}">
                    </td>
                    <td class="p-3">
                        <div class="text-slate-800 font-bold"><i class="far fa-calendar-alt text-slate-400"></i> ${dtVenc}</div>
                        <div class="text-xs text-slate-500 mt-1"><i class="fas fa-check text-emerald-400"></i> ${dtPag}</div>
                    </td>
                    <td class="p-3">
                        <div class="font-bold text-slate-700 mb-1">${p.financas.descricao} <span class="text-[10px] font-normal bg-gray-200 text-gray-600 px-1 rounded ml-1">${p.financas.categoria || 'Geral'}</span></div>
                        <div class="flex gap-1 mb-1">${iconeBoleto}${iconeComp}</div>
                        ${txtBarras}
                    </td>
                    <td class="p-3 font-bold text-slate-600">${p.num_parcela} / ${p.financas.num_parcelas}</td>
                    <td class="p-3 font-bold ${p.financas.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600'}">
                        R$ ${parseFloat(p.valor_parcela).toFixed(2)}
                    </td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-center">
                        <button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>`;
            }).join('');
        }

        async function prepararEdicao(id) {
            const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id', id).single();
            if (p) {
                document.getElementById('f-editando-id').value = p.id;
                document.getElementById('f-editando-financa-id').value = p.financas.id;
                
                document.getElementById('f-desc').value = p.financas.descricao;
                document.getElementById('f-tipo').value = p.financas.tipo;
                document.getElementById('f-categoria').value = p.financas.categoria || 'Geral';
                document.getElementById('f-status').value = p.financas.status_lancamento || 'aberto';
                
                document.getElementById('f-tipo-calculo').value = 'parcela';
                ajustarLabelsValor();
                document.getElementById('f-valor').value = p.valor_parcela;
                document.getElementById('f-parcelas').value = 1;
                document.getElementById('f-parcelas').disabled = true; 
                document.getElementById('f-recorrencia').disabled = true;
                
                document.getElementById('f-vencimento').value = p.data_vencimento;
                document.getElementById('f-data-pagamento').value = p.data_pagamento || '';
                document.getElementById('f-barras').value = p.codigo_barra || '';
                
                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                
                // Muda para a aba de formulário automaticamente ao clicar em editar
                alternarAba('formulario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('f-editando-financa-id').value = '';
            document.getElementById('f-parcelas').disabled = false;
            document.getElementById('f-recorrencia').disabled = false;
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            document.getElementById('f-desc').value = '';
            document.getElementById('f-valor').value = '';
            document.getElementById('f-categoria').value = 'Geral';
            document.getElementById('f-vencimento').value = '';
            document.getElementById('f-data-pagamento').value = '';
            document.getElementById('f-barras').value = '';
            
            document.getElementById('nome-boleto').innerHTML = '';
            document.getElementById('nome-comprovante').innerHTML = '';
            document.getElementById('f-boleto').value = '';
            document.getElementById('f-comprovante').value = '';
        }

        function toggleTodosChecks(source) {
            const checkboxes = document.querySelectorAll('.check-parcela');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
            if (selecionados.length === 0) return alert("Selecione ao menos uma parcela para excluir.");

            if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} parcela(s)?`)) {
                const { error } = await _supabase.from('parcelas').delete().in('id', selecionados);
                if (!error) {
                    alert('Excluído com sucesso!');
                    loadParcelas();
                    loadDashboard();
                } else {
                    alert('Erro ao excluir: ' + error.message);
                }
            }
        }
    </script>
</body>
```
```
  <!--
     -- ============================================================================
-- 1. CRIAÇÃO DAS TABELAS FINANCEIRAS
-- ============================================================================

-- Tabela Pai: Lançamento Financeiro Geral (O "Cabeçalho" da conta)
CREATE TABLE public.financas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- O default auth.uid() preenche automaticamente com o ID de quem está logado
    user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    entidade_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL, -- Se apagar o cliente, a conta financeira não some
    descricao TEXT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    tipo TEXT CHECK (tipo IN ('receita', 'despesa')),
    num_parcelas INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela Filha: Parcelas Individuais (As "Linhas" de pagamento)
CREATE TABLE public.parcelas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    financa_id UUID REFERENCES public.financas(id) ON DELETE CASCADE, -- Se apagar o "cabeçalho", apaga as parcelas junto
    num_parcela INTEGER NOT NULL,
    valor_parcela DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'atrasado')),
    codigo_barra TEXT,       -- Campo para o leitor de barras
    boleto_url TEXT,         -- Link do boleto salvo no storage
    comprovante_url TEXT,    -- Link do comprovante salvo no storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 2. SEGURANÇA DOS DADOS (ROW LEVEL SECURITY - RLS)
-- ============================================================================

ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;

-- Regras para Finanças (Usuário só acessa as contas que ele mesmo criou)
CREATE POLICY "Pessoa ve as proprias financas" ON public.financas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Pessoa insere as proprias financas" ON public.financas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Pessoa atualiza as proprias financas" ON public.financas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Pessoa apaga as proprias financas" ON public.financas FOR DELETE USING (auth.uid() = user_id);

-- Regras para Parcelas (Usuário só acessa parcelas amarradas às suas finanças)
CREATE POLICY "Pessoa ve as proprias parcelas" ON public.parcelas FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa insere as proprias parcelas" ON public.parcelas FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa atualiza as proprias parcelas" ON public.parcelas FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa apaga as proprias parcelas" ON public.parcelas FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);

-- ============================================================================
-- 3. CRIAÇÃO E SEGURANÇA DO STORAGE (BUCKET 'comprovantes')
-- ============================================================================

-- Cria o bucket 'comprovantes' automaticamente se ele ainda não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprovantes', 'comprovantes', true)
ON CONFLICT (id) DO NOTHING;

-- Aplica as Regras de quem pode mexer nos arquivos
CREATE POLICY "Comprovantes publicos" ON storage.objects FOR SELECT TO public USING ( bucket_id = 'comprovantes' );
CREATE POLICY "Upload de comprovantes" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'comprovantes' );
CREATE POLICY "Edicao de comprovantes" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'comprovantes' AND auth.uid() = owner );
CREATE POLICY "Delecao de comprovantes" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'comprovantes' AND auth.uid() = owner ); 
      
    

-- ============================================================================
-- ATUALIZAÇÃO DA TABELA 'financas'
-- ============================================================================

-- 1. Adiciona o campo 'categoria' com um valor padrão para não quebrar registros antigos
ALTER TABLE public.financas 
ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'Geral';

-- 2. Adiciona o campo 'status_lancamento' com validação (CHECK) para aceitar apenas os 3 status definidos
ALTER TABLE public.financas 
ADD COLUMN IF NOT EXISTS status_lancamento TEXT DEFAULT 'aberto' 
CHECK (status_lancamento IN ('aberto', 'finalizado', 'cancelado'));

-- ============================================================================
-- (OPCIONAL) ATUALIZAR REGISTROS ANTIGOS
-- Caso você já tenha dados cadastrados e queira garantir que todos tenham a
-- categoria 'Geral' e o status 'aberto' preenchidos (caso o default não aplique nos antigos)
-- ============================================================================

UPDATE public.financas 
SET categoria = 'Geral' 
WHERE categoria IS NULL;

UPDATE public.financas 
SET status_lancamento = 'aberto' 
WHERE status_lancamento IS NULL;
    -->
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TAREFAS
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acompanhamento Pedagógico - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <script src="https://unpkg.com/html5-qrcode"></script>

    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --danger: #ef4444; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); }
        .container { max-width: 1100px; margin: auto; padding: 20px; padding-top: 85px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        
        /* Estilo para o campo de código de barras com botão */
        .barcode-group { display: flex; gap: 5px; }
        .btn-scan { background: var(--dark); color: white; padding: 0 15px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        /* Container do Scanner */
        #reader { width: 100%; max-width: 400px; margin: 10px auto; border-radius: 8px; overflow: hidden; display: none; }

        .tag { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-top: 4px;}
        .tag-pendente { background: #fef3c7; color: #92400e; }
        .tag-realizada { background: #dcfce7; color: #166534; }
        .tag-data { background: #e0f2fe; color: #0284c7; }
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    </style>

    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script>
        const supabaseUrl = 'https://wyusolfkxrnwijwjusnv.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA'; 
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let recordedAudioBlob = null;
        let mediaRecorder;
        let audioChunks = [];
        let html5QrCode;

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            if (!session) {
                document.getElementById('tela-login').style.display = 'flex';
                document.getElementById('tela-sistema').style.display = 'none';
            } else {
                document.getElementById('tela-login').style.display = 'none';
                document.getElementById('tela-sistema').style.display = 'block';
                loadExercicios(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) alert("Erro: " + error.message);
            else verificar_login();
        }

        document.addEventListener('DOMContentLoaded', verificar_login);
    </script>
</head>
<body>

    <div id="tela-login" class="flex justify-center items-center h-screen bg-slate-900" style="display: none;">
        <div class="bg-white p-10 rounded-xl w-full max-w-sm text-center border-t-4 border-emerald-500">
            <h2 class="text-2xl font-bold mb-6 text-slate-800">ERP ABP</h2>
            <input type="email" id="login-email" placeholder="E-mail" class="mb-4">
            <input type="password" id="login-senha" placeholder="Senha" class="mb-6">
            <button class="bg-emerald-500 text-white w-full p-3 rounded font-bold" onclick="fazerLogin()">Entrar</button>
        </div>
    </div>

    <div id="tela-sistema" style="display: none;">
        <div class="navbar">
            <div class="font-bold text-slate-800 text-xl"><i class="fas fa-tasks text-emerald-500"></i> Gestão de Exercícios</div>
            <button class="text-red-500 font-bold" onclick="_supabase.auth.signOut(); verificar_login();">Sair</button>
        </div>

        <div class="container">
            <div class="card">
                <h3 id="form-title" class="text-xl font-bold mb-4">Nova Atividade</h3>
                <input type="hidden" id="edit-id">

                <div class="section-title">Informações Básicas</div>
                <div class="form-grid">
                    <div style="grid-column: span 2;"><label>Título do Exercício *</label><input type="text" id="titulo"></div>
                    
                    <div><label>Categoria</label><input type="text" id="categoria" placeholder="Ex: Matemática, Cognitivo..."></div>
                    
                    <div>
                        <label>Código de Barras</label>
                        <div class="barcode-group">
                            <input type="text" id="codigo_de_barras" placeholder="Digite ou leia">
                            <button type="button" class="btn-scan" onclick="startScanner()" title="Abrir Câmera">
                                <i class="fas fa-barcode"></i>
                            </button>
                        </div>
                    </div>

                    <div><label>Data Prazo</label><input type="date" id="data_prazo"></div>
                    <div>
                        <label>Status</label>
                        <select id="status_exercicio">
                            <option value="pendente">Pendente</option>
                            <option value="realizada">Realizada</option>
                        </select>
                    </div>
                </div>

                <div id="reader"></div>
                <button id="btn-stop-scanner" class="bg-red-500 text-white p-2 rounded w-full mb-4 font-bold" style="display:none;" onclick="stopScanner()">Fechar Câmera</button>

                <div class="section-title">Conteúdo do Exercício</div>
                <textarea id="descricao" placeholder="Digite o enunciado aqui..."></textarea>

                <div class="section-title">Mídias e Notas</div>
                <div class="form-grid">
                    <div>
                        <label>Foto da Resolução</label>
                        <input type="file" id="foto_resolucao" accept="image/*" capture="environment">
                    </div>
                    <div>
                        <label>Gravar Áudio</label>
                        <button class="w-full border-2 border-dashed p-3 rounded bg-slate-50 text-slate-500 font-bold" id="btn-audio" onclick="toggleGravação()"><i class="fas fa-microphone"></i> Gravar Leitura</button>
                        <audio id="audio-preview" controls style="display:none; width:100%; margin-top:10px; height:35px;"></audio>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label>Observações do Responsável</label>
                        <textarea id="observacoes" placeholder="Relate dificuldades ou progressos..."></textarea>
                    </div>
                </div>

                <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Registro</button>
                <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
            </div>

            <div class="card">
                <input type="text" id="inputBusca" placeholder="Pesquisar exercícios..." onkeyup="filtrarTabela()" class="mb-4">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 text-xs uppercase border-b">
                                <th class="p-4">Atividade / Categoria</th>
                                <th class="p-4">Código</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="exercises-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- FUNÇÕES DO SCANNER DE CÓDIGO DE BARRAS ---
        function startScanner() {
            const readerDiv = document.getElementById('reader');
            const stopBtn = document.getElementById('btn-stop-scanner');
            readerDiv.style.display = 'block';
            stopBtn.style.display = 'block';

            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 150 } };

            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('codigo_de_barras').value = decodedText;
                stopScanner();
                alert("Código lido: " + decodedText);
            }).catch(err => console.error("Erro ao iniciar câmera: ", err));
        }

        function stopScanner() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    document.getElementById('reader').style.display = 'none';
                    document.getElementById('btn-stop-scanner').style.display = 'none';
                });
            }
        }

        // --- FUNÇÕES DE ÁUDIO ---
        async function toggleGravação() {
            const btn = document.getElementById('btn-audio');
            const preview = document.getElementById('audio-preview');
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(recordedAudioBlob);
                    preview.style.display = 'block';
                };
                mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
            }
        }

        // --- CRUD ---
        async function loadExercicios() {
            const { data } = await _supabase.from('exercicios').select('*').order('created_at', { ascending: false });
            const tbody = document.getElementById('exercises-list');
            tbody.innerHTML = data.map(e => {
                let prazo = e.data_prazo ? new Date(e.data_prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
                return `
                <tr class="border-t">
                    <td class="p-4">
                        <span class="font-bold text-slate-800">${e.titulo}</span><br>
                        <span class="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">${e.categoria || 'Geral'}</span>
                        <span class="tag tag-data"><i class="far fa-calendar-alt"></i> ${prazo}</span>
                    </td>
                    <td class="p-4 font-mono text-sm text-slate-400">${e.codigo_de_barras || '-'}</td>
                    <td class="p-4"><span class="tag tag-${e.status_exercicio}">${e.status_exercicio}</span></td>
                    <td class="p-4 text-center">
                        <button class="text-blue-500 mr-4" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500" onclick="deleteExercicio('${e.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `}).join('');
        }

        async function handleSave() {
            const btn = document.getElementById('btn-save');
            btn.disabled = true; btn.innerText = "Salvando...";
            
            try {
                const id = document.getElementById('edit-id').value;
                const { data: userData } = await _supabase.auth.getUser();

                const payload = {
                    titulo: document.getElementById('titulo').value,
                    descricao: document.getElementById('descricao').value,
                    categoria: document.getElementById('categoria').value,
                    codigo_de_barras: document.getElementById('codigo_de_barras').value,
                    data_prazo: document.getElementById('data_prazo').value || null,
                    status_exercicio: document.getElementById('status_exercicio').value,
                    observacoes: document.getElementById('observacoes').value,
                    user_id: userData.user.id
                };

                const inputFoto = document.getElementById('foto_resolucao');
                if (inputFoto.files[0]) {
                    const fileName = `res_${Date.now()}.jpg`;
                    await _supabase.storage.from('resolucoes').upload(`public/${fileName}`, inputFoto.files[0]);
                    payload.foto_url = _supabase.storage.from('resolucoes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (recordedAudioBlob) {
                    const audioName = `audio_${Date.now()}.webm`;
                    await _supabase.storage.from('audios').upload(`public/${audioName}`, recordedAudioBlob);
                    payload.audio_url = _supabase.storage.from('audios').getPublicUrl(`public/${audioName}`).data.publicUrl;
                }

                const { error } = id ? await _supabase.from('exercicios').update(payload).eq('id', id) : await _supabase.from('exercicios').insert([payload]);
                if (error) throw error;
                resetForm(); loadExercicios();
            } catch (e) { alert(e.message); }
            finally { btn.disabled = false; btn.innerText = "Salvar Registro"; }
        }

        async function editFull(id) {
            const { data } = await _supabase.from('exercicios').select('*').eq('id', id).single();
            document.getElementById('edit-id').value = data.id;
            document.getElementById('titulo').value = data.titulo;
            document.getElementById('descricao').value = data.descricao;
            document.getElementById('categoria').value = data.categoria || '';
            document.getElementById('codigo_de_barras').value = data.codigo_de_barras || '';
            document.getElementById('data_prazo').value = data.data_prazo || '';
            document.getElementById('status_exercicio').value = data.status_exercicio;
            document.getElementById('observacoes').value = data.observacoes || '';
            
            document.getElementById('form-title').innerText = "Editando Atividade";
            document.getElementById('btn-cancel').style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        async function deleteExercicio(id) {
            if (confirm("Excluir?")) { await _supabase.from('exercicios').delete().eq('id', id); loadExercicios(); }
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
            document.getElementById('status_exercicio').value = 'pendente';
            document.getElementById('form-title').innerText = "Nova Atividade";
            document.getElementById('btn-cancel').style.display = "none";
            recordedAudioBlob = null;
            document.getElementById('audio-preview').style.display = 'none';
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#exercises-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }
    </script>

<!--
-- ============================================================================
-- SCRIPT EXCLUSIVO: MÓDULO EXERCÍCIOS (COMPLETO E ATUALIZADO)
-- ============================================================================

-- 1. Limpa a tabela e as regras antigas
DROP TABLE IF EXISTS public.exercicios CASCADE;

-- 2. Cria a tabela com todos os campos novos
CREATE TABLE public.exercicios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT,
    codigo_de_barras TEXT,
    data_prazo DATE,
    observacoes TEXT,
    foto_url TEXT,
    audio_url TEXT,
    status_exercicio TEXT DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Segurança (RLS - Row Level Security)
ALTER TABLE public.exercicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercícios: Acesso total ao próprio usuário" ON public.exercicios
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. Buckets de Storage (Para fotos e áudios)
INSERT INTO storage.buckets (id, name, public) VALUES ('resolucoes', 'resolucoes', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('audios', 'audios', true) ON CONFLICT (id) DO NOTHING;

-- 5. Políticas de Storage
DROP POLICY IF EXISTS "Acesso público select" ON storage.objects;
DROP POLICY IF EXISTS "Acesso total autenticado" ON storage.objects;

CREATE POLICY "Acesso público select" ON storage.objects FOR SELECT USING (bucket_id IN ('resolucoes', 'audios'));
CREATE POLICY "Acesso total autenticado" ON storage.objects FOR ALL 
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-->
</body>
</html>

```
