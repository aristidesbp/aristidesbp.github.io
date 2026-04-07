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
# src/view/login.html
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>ClinicaPro - Login</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
    <link rel="stylesheet" href="style.css">
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: { "primary": "#137fec", "background-light": "#f8f9fc", "background-dark": "#0f172a" },
                    fontFamily: { "display": ["Public Sans", "sans-serif"] }
                },
            },
        }
    </script>
    <style>
        /* Custom Scrollbar e correções finas */
body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

input:focus {
    outline: none !important;
    border-color: #137fec !important;
    box-shadow: 0 0 0 3px rgba(19, 127, 236, 0.2) !important;
}

/* Animação simples de fade */
#login-section, #recovery-section {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
        </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased">
    <div class="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]"></div>
        </div>

        <div class="z-10 w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 p-8">
            
            <div id="login-section">
                <div class="flex flex-col items-center mb-8">
                    <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span class="material-symbols-outlined !text-4xl">health_and_safety</span>
                    </div>
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">ClinicaPro</h1>
                    <p class="text-slate-500">Plataforma Clínica Segura</p>
                </div>

                <form class="space-y-5" id="loginForm">
                    <div class="hidden p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm" id="errorMessage"></div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-3 top-3 text-slate-400">person</span>
                            <input class="w-full rounded-lg border-slate-300 pl-10 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white" id="email" type="email" placeholder="seu@email.com" required />
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between mb-1">
                            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</label>
                            <button type="button" onclick="toggleView('recovery')" class="text-xs font-semibold text-primary hover:underline">Esqueci a senha</button>
                        </div>
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-3 top-3 text-slate-400">lock</span>
                            <input class="w-full rounded-lg border-slate-300 pl-10 pr-10 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white" id="password" type="password" placeholder="••••••••" required />
                            <button type="button" id="togglePassword" class="absolute right-3 top-3 text-slate-400"><span class="material-symbols-outlined" id="eyeIcon">visibility</span></button>
                        </div>
                    </div>

                    <button class="w-full bg-primary py-3 rounded-lg text-white font-bold hover:bg-primary/90 transition-all flex justify-center items-center gap-2" type="submit" id="submitBtn">
                        <span id="btnText">Entrar</span>
                        <span class="material-symbols-outlined text-xl">login</span>
                    </button>
                </form>
            </div>

            <div id="recovery-section" class="hidden">
                <div class="text-center mb-6">
                    <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-primary text-2xl">lock_reset</span>
                    </div>
                    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Recuperar Acesso</h2>
                    <p class="text-xs text-slate-500 mt-2">Enviaremos instruções para o seu e-mail.</p>
                </div>
                <form id="recoveryForm" class="space-y-4">
                    <input class="w-full rounded-lg border-slate-300 py-3 px-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white" id="recovery-email" type="email" placeholder="seu@email.com" required />
                    <button class="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all" type="submit">Enviar Link</button>
                </form>
                <div class="mt-6 text-center">
                    <button onclick="toggleView('login')" class="text-sm text-slate-500 hover:text-primary flex items-center justify-center gap-1 mx-auto">
                        <span class="material-symbols-outlined text-lg">arrow_back</span> Voltar ao login
                    </button>
                </div>
            </div>

        </div>
    </div>
    <script>
        // 1. Configuração do Supabase
const SUPABASE_URL = "https://flbcktmujsjxukmtqriq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsYmNrdG11anNqeHVrbXRxcmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODA3NjIsImV4cCI6MjA5MDQ1Njc2Mn0.kigBNnujASjlkFcm5xGOqauz6zrgFGVu_rdQJuJkxnE";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Elementos da DOM
const loginForm = document.getElementById('loginForm');
const recoveryForm = document.getElementById('recoveryForm');
const errorDiv = document.getElementById('errorMessage');

// 3. Alternar entre Login e Recuperação
function toggleView(view) {
    const loginSec = document.getElementById('login-section');
    const recoverySec = document.getElementById('recovery-section');
    
    if (view === 'recovery') {
        loginSec.classList.add('hidden');
        recoverySec.classList.remove('hidden');
    } else {
        loginSec.classList.remove('hidden');
        recoverySec.classList.add('hidden');
    }
}

// 4. Mostrar/Ocultar Senha
document.getElementById('togglePassword').addEventListener('click', () => {
    const passInput = document.getElementById('password');
    const icon = document.getElementById('eyeIcon');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        icon.innerText = 'visibility_off';
    } else {
        passInput.type = 'password';
        icon.innerText = 'visibility';
    }
});

// 5. Lógica de Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btnText = document.getElementById('btnText');

    errorDiv.classList.add('hidden');
    btnText.innerText = "Entrando...";

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errorDiv.innerText = "Erro: " + error.message;
        errorDiv.classList.remove('hidden');
        btnText.innerText = "Entrar";
    } else {
        alert("Login realizado com sucesso! Redirecionando...");
        window.location.href = "index.html"; 
    }
});

// 6. Lógica de Recuperação de Senha (CORRIGIDA)
recoveryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('recovery-email').value;

    const { error } = await _supabase.auth.resetPasswordForEmail(email, {
        // Esta linha é essencial para forçar o redirecionamento correto
        redirectTo: 'https://aristidesbp.github.io/src/view/resetar_senha.html',
    });

    if (error) {
        alert("Erro ao enviar: " + error.message);
    } else {
        alert("Link de recuperação enviado para o e-mail informado!");
        toggleView('login');
    }
});

        
    </script>
</body>
</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# resetar_senha.html
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>ClinicaPro - Nova Senha</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: { "primary": "#137fec", "background-light": "#f8f9fc", "background-dark": "#0f172a" },
                    fontFamily: { "display": ["Public Sans", "sans-serif"] }
                },
            },
        }
    </script>
    <style>
        body { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased">
    <div class="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div class="z-10 w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 p-8">
            
            <div class="flex flex-col items-center mb-8">
                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span class="material-symbols-outlined !text-4xl">lock_reset</span>
                </div>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Definir Nova Senha</h1>
                <p class="text-slate-500 text-center text-sm mt-2">Digite sua nova senha de acesso abaixo.</p>
            </div>

            <form class="space-y-5" id="resetPasswordForm">
                <div class="hidden p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm" id="errorMessage"></div>
                
                <div>
                    <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nova Senha</label>
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-3 top-3 text-slate-400">lock</span>
                        <input class="w-full rounded-lg border-slate-300 pl-10 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-primary" 
                               id="newPassword" type="password" placeholder="••••••••" required />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Confirmar Nova Senha</label>
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-3 top-3 text-slate-400">check_circle</span>
                        <input class="w-full rounded-lg border-slate-300 pl-10 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-primary" 
                               id="confirmPassword" type="password" placeholder="••••••••" required />
                    </div>
                </div>

                <button class="w-full bg-primary py-3 rounded-lg text-white font-bold hover:bg-primary/90 transition-all flex justify-center items-center gap-2" 
                        type="submit" id="submitBtn">
                    <span id="btnText">Atualizar Senha</span>
                </button>
            </form>
        </div>
    </div>

    <script>
        const SUPABASE_URL = "https://flbcktmujsjxukmtqriq.supabase.co";
        const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsYmNrdG11anNqeHVrbXRxcmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODA3NjIsImV4cCI6MjA5MDQ1Njc2Mn0.kigBNnujASjlkFcm5xGOqauz6zrgFGVu_rdQJuJkxnE";
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        const resetForm = document.getElementById('resetPasswordForm');
        const errorDiv = document.getElementById('errorMessage');

        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;
            const btnText = document.getElementById('btnText');

            if (password !== confirm) {
                errorDiv.innerText = "As senhas não coincidem!";
                errorDiv.classList.remove('hidden');
                return;
            }

            errorDiv.classList.add('hidden');
            btnText.innerText = "Processando...";

            // O Supabase gerencia o token automaticamente se ele estiver na URL
            const { data, error } = await _supabase.auth.updateUser({
                password: password
            });

            if (error) {
                errorDiv.innerText = "Erro: " + error.message;
                errorDiv.classList.remove('hidden');
                btnText.innerText = "Atualizar Senha";
            } else {
                alert("Senha alterada com sucesso! Agora você pode fazer login.");
                window.location.href = "index.html"; // Redireciona para o login
            }
        });
    </script>
</body>
</html>
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
* Para selecionar sls das tabelas que compoem a view adicione: with (security_invoker)
* Exemplo: create or replace view public.v_financeiro **with (security_invoker)** as
select .....
```
create or replace view public.v_financeiro with (security_invoker) as
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

# aplolicies usuario (crud completo/ apenas o propio usuario)
* dentro de cada tabela: Add RLS policy/Create policy
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







