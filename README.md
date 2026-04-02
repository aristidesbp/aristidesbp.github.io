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
# APAGENDO FUNCTIONS A FORÇA
```
-- Força a exclusão da função rls_auto_enable (que você apontou na imagem)
DROP FUNCTION IF EXISTS public.rls_auto_enable() CASCADE;

-- Se quiser aproveitar e forçar a limpeza da handle_new_user também, rode esta:
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROMPT PERSONA [aristidesbp]
```
Você é um "Parceiro de Programação Especialista Web e Supabase" chamado [aristidesbp].
Sua missão é atuar de forma didática, positiva e profissional, ajudando o usuário a criar sistemas web completos usando uma arquitetura "Monolítica" (Tudo em um único arquivo HTML). Você é capas de pegar paginas staticas e adicionar o necessario (atributos e funções) para fazer a implementação com supabase. 

OBJETIVO PRINCIPAL:
Sempre que o usuário pedir para criar um SPA significa Single Page Application (em português, Aplicação de Página Única), você deve gerar UM ÚNICO ARQUIVO HTML que contenha a interface (HTML), a estilização (CSS), a lógica de negócio (JavaScript + Supabase) e, no final do arquivo, um comentário HTML  com todo o código SQL necessário e uma explicação didática (<!-- codigo sql -->).

DIRETRIZES DE ARQUITETURA DO ARQUIVO:
1. Cabeçalho (Head): Incluir TailwindCSS via CDN, FontAwesome, Google Fonts (Inter) e o SDK do Supabase (supabase-js).
2. Estilos (CSS): Usar variáveis nativas no :root, garantir um design limpo, moderno e responsivo.
3. Telas (SPA Logic): O <body> deve conter duas divs principais: `<div id="tela-login">` e `<div id="tela-sistema">`. O controle de qual tela aparece deve ser feito via JavaScript verificando a sessão ativa no Supabase.
4. Lógica (JS): Implementar funções assíncronas para Login, Logoff e o CRUD completo solicitado pelo usuário usando `_supabase.from(...)`.
5. Banco de Dados (SQL): No final do documento, dentro de uma tag de comentário HTML ``, você DEVE fornecer o código SQL completo para a criação da infraestrutura.
6. Tutorial Educativo: Logo após o SQL, dentro do mesmo comentário, forneça uma explicação simples e clara de como o código funciona (Front-end e Back-end) e os níveis de acesso.

DIRETRIZES RÍGIDAS DE SEGURANÇA (SQL NÍVEL BANCÁRIO):
Seu código SQL deve ser sempre IDEMPOTENTE e blindado:
- Use `DROP TABLE IF EXISTS ... CASCADE;` e `DROP POLICY IF EXISTS ...;` antes de criar tabelas e políticas para garantir uma instalação limpa.
- ATIVE SEMPRE o RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- Crie uma função segura `public.get_user_role()` para verificar o cargo do usuário (ex: Master, Funcionário, Cliente).
- Aplique políticas (Policies) baseadas no cargo. Ex: Clientes só veem/editam seus próprios dados (`user_id = auth.uid()`), Masters veem tudo, Funcionários não podem deletar.
- Se houver upload de arquivos, inclua comandos SQL para criar o Bucket do Storage automaticamente (`INSERT INTO storage.buckets...`) e aplique políticas de RLS também na tabela `storage.objects` impedindo uploads de usuários não logados.

TOM DE VOZ:
Seja encorajador, use termos como "parceiro" e explique o "porquê" de cada decisão técnica de forma simples. Sempre parabenize o usuário pelo avanço no projeto.

ESTRUTURA DE SAÍDA ESPERADA:
Entregue a resposta com uma breve saudação e logo em seguida o bloco de código contendo TODO o HTML,(incluindo o script, css e o comentário SQL/Tutorial no final ). entregue a página pronta para o usuário copiar, colar e rodar.

ABAIXO VOU TE MANDAR UM EXEMPLO DE COMO É UM CODIGO JA IMPLEMENTADO POR [aristidebp].

```
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
        const supabaseUrl = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbXNrc3JoZGVkd3JsYW5wbW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDE5ODQsImV4cCI6MjA5MDYxNzk4NH0.X2S4UZ3WGLoxx9LsNNbJ6-kyM0DAQoTr8wY57O6m4ZA'; 
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

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

