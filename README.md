# Aristidesbp

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [https://github.com/aristidesbp](https://github.com/aristidesbp)


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 💼 PROJETO ERP-ABP (sas)
#### Tutoriais escrito por Aristidesbp
obs: projeto em andamento podendo conter erros!


# 📘 ÍNDICE
1. [ ESTRUTURA DO PROJETO ERP ](#estrutura-do-projeto-erp)
2. [ TERMUX E GITHUB](#termux-e-github)
3. [SUPABASE](#supabase)


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥   
# ESTRUTURA DO PROJETO ERP
```
aristidesbp.github.io
    |
    ├── assets
    │   ├── mercadopago_supabase
    │   ├── documentacao_erp.md
    │   ├── navbar_erp.js
    │   ├── conexao_supabase.js
    │   ├── login.html
    │   ├── index.html
    │   ├── index
    │   ├── entidades.html
    │   ├── produtos.html
    │   ├── financeiro.html 
    │   ├── pdv.html
    │   ├── pdv_adm.html
    │   └── notas.html
    ├── navbar.js
    ├── index.html
    └── README.md

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX E GITHUB
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
pkf install tree -y
```
```  
mkdir novo_projeto
# para criar pasta com o nome repositorios_git
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
# GITHUB (INSTALL/CONFIG)

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
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
```
```
# Gerar nova chave SSH (caso ainda não tenha)
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
1. Acesse: https://github.com](https://github.com
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
## Clona o repositório com chave SSH
git clone git@github.com:aristidesbp/aristidesbp.github.io
```
```
# entre na pasta do repositório clonado
cd aristidesbp.github.io
```
```
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
git init
```
``` 
# BAIXAR ATUALIZAÇÃO DO SITE:
git pull origin main 
```
### FAÇA SUAS ALTERAÇOES !!!!!
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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# CRIANDO UM SERVIDOR COM PYTHON 
# Passo 1: Instalar o Python3
Se você já instalou o Termux  (CONFIGUROU E ATUALIZOU)
```
cd pasta_do_arquivo
# Navegue até a pasta onde seus arquivos estão 
```
```
python -m http.server 8080
# Ele inicia um servidor web simples na porta 8080:
# O Termux agora mostrará a mensagem: Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```
## Como Acessar o Site no Navegador
Abra o navegador do seu celular (Chrome, Firefox, etc.).
```
http://localhost:8080
```
## ✅ Se quiser acessar de outro dispositivo na mesma rede Wi-Fi
```
# Descubra o IP do celular no Termux:
ip addr show wlan0
```
Vai aparecer algo como:
* inet 192.168.1.105
No navegador do outro dispositivo, acesse:
* http://192.168.1.105:8080

## ⚠️ Observações importantes
O servidor só funciona enquanto o Termux estiver aberto
A porta 8080 pode ser trocada por outra, ex:
Copiar código
```
python -m http.server 3000
```
Aí o endereço vira:
* http://localhost:3000

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
# BONUS:COMO BAIXAR VIDEOS COM TERMUX
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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# index.html (pagina de vendas do sistema)
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
    <script id="tailwind-config">
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
    <style type="text/tailwindcss">
        @layer components {
            .glass {
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .dark .glass { background: rgba(15, 23, 42, 0.6); }
            .light .glass { background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(0, 0, 0, 0.1); }
        }
        .light body { background-color: #f6f6f8; color: #1e293b; }
        .light .service-card { background: white; border-color: #e2e8f0; }
        .service-card:hover { border-color: #2563eb; transform: translateY(-4px); }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-[#f8fafc] dark:text-[#f8fafc] font-display transition-colors duration-300">  
    

    <!-- navbar ##################################################################################################################### -->
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

            <a href="assets/login.html" id="nav_login_btn" 
               class="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                <span class="material-symbols-outlined text-sm">login</span>
                ÁREA DO CLIENTE
            </a>

            <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                <span id="themeIcon" class="material-symbols-outlined text-gray-600 dark:text-gray-400">dark_mode</span>
            </button>
        </div>
    </div>
</nav>

        <div class="flex items-center gap-3">
            <button onclick="toggleTheme()" class="p-2 rounded-lg bg-slate-800 border border-slate-border hover:bg-slate-700 transition-all">
                <span id="themeIcon" class="material-symbols-outlined text-white text-sm">light_mode</span>
            </button>
            <select id="langSelect" onchange="changeLang()" class="bg-slate-800 border-slate-border text-white text-xs font-bold rounded-lg py-1.5">
                <option value="pt">PT-BR</option>
                <option value="es">ES-ES</option>
            </select>
        </div>
    </div>
</header>

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
                <div class="glass p-6 border border-slate-border rounded-xl flex flex-col hover:border-primary transition-all">
                    <span class="material-symbols-outlined text-primary text-4xl mb-4">query_stats</span>
                    <h3 class="text-xl font-bold mb-2">Tráfego Pago</h3>
                    <p class="text-slate-400 text-sm mb-6 flex-grow">Gestão de anúncios focada em conversão.</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="font-bold">R$ 1.500,00</span>
                        <button onclick="addServico(this, 'Tráfego', 1500)" class="btn-add px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">add</span> Adicionar
                        </button>
                    </div>
                </div>
                <div class="glass p-6 border border-slate-border rounded-xl flex flex-col hover:border-primary transition-all">
                    <span class="material-symbols-outlined text-primary text-4xl mb-4">terminal</span>
                    <h3 class="text-xl font-bold mb-2">Consultoria Técnica</h3>
                    <p class="text-slate-400 text-sm mb-6 flex-grow">Arquitetura de sistemas e suporte especializado.</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="font-bold">R$ 1.000,00</span>
                        <button onclick="addServico(this, 'Consultoria', 1000)" class="btn-add px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">add</span> Adicionar
                        </button>
                    </div>
                </div>
                <div class="glass p-6 border-primary bg-primary/5 rounded-xl flex flex-col">
                    <span class="material-symbols-outlined text-primary text-4xl mb-4">picture_as_pdf</span>
                    <h3 class="text-xl font-bold mb-2">PDF Misterioso</h3>
                    <p class="text-slate-400 text-sm mb-6 flex-grow">Guia completo de automação e criação de PDF.</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="font-bold text-primary">R$ 2,00</span>
                        <button onclick="addServico(this, 'PDF Misterioso', 2)" class="btn-add px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">shopping_cart</span> Comprar
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
    let carrinho = [];
    const functionUrl = 'https://eisruaetsqrratemqswv.functions.supabase.co/checkout';

    function toggleTheme() {
        const html = document.documentElement;
        const icon = document.getElementById('themeIcon');
        if (html.classList.contains('dark')) {
            html.classList.remove('dark'); html.classList.add('light');
            icon.innerText = 'dark_mode';
        } else {
            html.classList.remove('light'); html.classList.add('dark');
            icon.innerText = 'light_mode';
        }
    }

    function changeLang() {
        const lang = document.getElementById('langSelect').value;
        const title = document.getElementById('heroTitle');
        title.innerHTML = lang === 'es' ? 
            'Transformando Necesidades Reales en <span class="text-primary">Soluciones Digitales</span>' : 
            'Transformando Necessidades Reais em <span class="text-primary">Soluções Digitais</span> Funcionais';
    }

    function addServico(btn, nome, preco) {
        // Lógica de Carrinho
        carrinho.push({ nome, preco });
        const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
        document.getElementById('resumoTotal').innerText = total.toFixed(2);

        // Feedback Visual (Botão Verde)
        btn.classList.remove('bg-primary');
        btn.classList.add('bg-success');
        btn.innerHTML = `<span class="material-symbols-outlined text-sm">check_circle</span> Adicionado`;
    }

    async function processarPagamento() {
        const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
        if (total <= 0) return alert("Selecione um serviço primeiro.");
        
        const nome = document.getElementById('cliente_nome').value;
        const email = document.getElementById('cliente_email').value;
        if(!nome || !email) return alert("Preencha nome e e-mail.");

        const btn = document.getElementById('btnPagar');
        btn.disabled = true;
        btn.innerHTML = `<div class="flex items-center justify-center gap-2"><div class="loading-spinner"></div> PROCESSANDO...</div>`;

        try {
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome, email, total,
                    itens: carrinho.map(i => ({ nome: i.nome, preco: i.preco, qtd: 1 }))
                })
            });
            const data = await response.json();
            if (data.init_point) window.location.href = data.init_point;
        } catch (e) {
            alert("Erro ao conectar. Tente novamente.");
            btn.disabled = false;
            btn.innerText = "FINALIZAR NO MERCADO PAGO";
        }
    }
</script>
</body>
</html>
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
# CRIANDO UM ARQUIVO CONFIG (config.js)

##  Pegar as chaves do Supabase
## Vá em Settings
*  🧱 DATA API/Project URL/copiar🧱 
*  🔑 API Keis/anon public key/copiar🔑
*  🧠 Altentication/url config/ coloque o endereço de onde está hospedado
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
```
const dbsupabase = supabase.createClient(
  'SUA_URL_AQUI', 
  'SUA_KEY_AQUI'
)
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# usuarios.sql
```
create table public.usuarios (
  id uuid not null,
  email text not null,
  nome_completo text null,
  avatar_url text null,
  criado_em timestamp with time zone null default now(),
  status text null default 'ativo'::text,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint usuarios_status_check check (
    (
      status = any (
        array['ativo'::text, 'suspenso'::text, 'pendente'::text]
      )
    )
  )
) TABLESPACE pg_default;
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# apolicies
```
* CREATE POLICY "Perfis: usuários podem atualizar apenas o seu" ON usuarios FOR UPDATE TO public USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));
* CREATE POLICY "Perfis: usuários podem ver apenas o seu" ON usuarios FOR SELECT TO public USING ((auth.uid() = id));
* CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON usuarios FOR UPDATE TO public USING ((auth.uid() = id));
* CREATE POLICY "Usuários podem ver seu próprio perfil" ON usuarios FOR SELECT TO public USING ((auth.uid() = id));
```
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
# login.html
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Login</title>
<script src="js/config.js" defer></script> 
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 80px auto;
}

h2 {
  text-align: center;
}

input, button {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
}

.senha {
  position: relative;
}

.senha span {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}

a {
  cursor: pointer;
  color: #0066cc;
  text-decoration: underline;
}

p {
  text-align: center;
}
</style>
</head>
<body>

<h2 id="titulo">Login</h2>

<input id="email" type="email" placeholder="Email" required>

<div class="senha">
  <input id="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required>
  <span onclick="toggleSenha()">👁️</span>
</div>

<button id="btnAcao" onclick="login()">Entrar</button>

<p>
  <a onclick="mostrarCadastro()">Criar conta</a> |
  <a onclick="resetSenha()">Esqueci minha senha</a>
</p>

<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


<script>


/* ===============================
   UI
================================ */
function toggleSenha() {
  const input = document.getElementById('senha')
  input.type = input.type === 'password' ? 'text' : 'password'
}

/* ===============================
   LOGIN (COM AUDITORIA E CORREÇÕES)
================================ */
async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  // 1. Tenta o login
  const { data, error } = await dbsupabase.auth.signInWithPassword({
    email,
    password: senha
  })

  if (error) {
    alert("Erro: " + error.message)
    return
  }

  // 2. Se logou com sucesso, grava o Log de Auditoria
  if (data.user) {
    try {
      await dbsupabase.from('logs_acesso').insert([
        { 
          usuario_id: data.user.id, 
          user_agent: navigator.userAgent 
        }
      ]);
    } catch (logError) {
      console.error("Erro ao gravar log:", logError);
      // Não bloqueamos o login se o log falhar, para não travar o usuário
    }

    // 3. Redireciona
    window.location.href = 'index.html'
  }
}

/* ===============================
   RESET DE SENHA
================================ */
async function resetSenha() {
  const email = document.getElementById('email').value

  if (!email) {
    alert('Digite seu email para recuperar a senha')
    return
  }

  const { error } = await dbsupabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://aristidesbp.github.io' 
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Email de recuperação enviado!')
}

/* ===============================
   CADASTRO
================================ */
function mostrarCadastro() {
  document.getElementById('titulo').innerText = 'Cadastro'
  const btn = document.getElementById('btnAcao')
  btn.innerText = 'Cadastrar'
  btn.onclick = cadastrar
}

async function cadastrar() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres')
    return
  }

  const { error } = await dbsupabase.auth.signUp({
    email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Cadastro realizado! Verifique seu email para confirmar a conta.')
}
</script>

</body>
</html>

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIANDO BANCO DE DADOS NO SUPABASE
https://supabase.com
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIAR TABELA entidades
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
```
create table public.entidades (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid null,
  nome_completo text null,
  bio text null,
  avatar_url text null,
  senha_user text null,
  telefone text null,
  endereco text null,
  data_nascimento text null,
  cpf_cnpj text null,
  insc_estadual text null,
  status text null,
  relacionamento text null,
  email text null,
  nivel_acesso text null,
  cep text null,
  bairro text null,
  cidade text null,
  prontuario text null,
  uf text null,
  insc_municipal text null,
  constraint usuario_pkey primary key (id),
  constraint usuario_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
## FUNCTION TRIGGER (data base/funcoes)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
``` 
crie uma função trigger para ser implementada no Supabase com o seguinte objetivo:
A cada novo usuario que for criado no schema auth, deve ser criado o mesmo usuario no schema public na tabela abaixo.

(entre na tabela/ cantoinferio direto/ definitions (codigo da tabela criada acima))
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
## FUNCTION TRIGGER
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
``` 
-- 1. Criar a função que será executada pelo gatilho
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.entidades (
    user_id,
    email,
    nome_completo,
    status,
    relacionamento -- Definido como 'Usuário' ou 'Colaborador' por padrão
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name', -- Tenta pegar o nome se vier do metadata (ex: Google Auth)
    'Ativo',
    'Usuário'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Criar o gatilho na tabela auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIAR APOLICE 
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
```
-- Cria a política que permite ao usuário gerenciar apenas os seus fornecedores
CREATE POLICY "Acesso total aos próprios fornecedores" 
ON public.fornecedores 
FOR ALL 
USING (auth.uid() = usuario_id);
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIANDO UMA VISUALIZAÇÃO COM VIEWS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
## PROMPT PARA CRIAR VIEWS:
```
Crie uma view chamada "v_sevicos_destaque" que liste os serviços com o nome
da categoria e detalhes do autor que esta na tabela de usuarios. Alem disso, 
caucule a media das notas (use ) se nao houver) e o total de avaliçoes recebidas por cada serviço.
Conforme o schema do banco de dados que vou te passar abaixo:

Obs: Ja acrescente with (security_invoker) logo depois do nome da view, para criar uma segurança.

[cole aqui o schema fica em: menu lateral/ Database/ no canto superior direi opção Copy as SQL]
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# conexao.js
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
```
/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão Final Corrigida - Responsiva)
 * Segurança + SDK Auto-load + Navbar + Controle de Sessão */

(async () => {
    "use strict";

    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        SUPABASE_KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX',
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "index.html",
        HUB_PAGE: "https://aristidesbp.github.io/",
        APP_NAME: "ERP ABP",
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    });

    async function carregarSDK() {
        if (window.supabase) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.SDK_URL;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Falha ao carregar SDK do Supabase"));
            document.head.appendChild(script);
        });
    }

    try {
        await carregarSDK();
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        }

        async function validarSessao() {
            try {
                const { data, error } = await _supabase.auth.getSession();
                if (error || !data || !data.session) throw new Error();
                return data.session;
            } catch (e) {
                window.location.replace(CONFIG.LOGIN_PAGE);
                return null;
            }
        }

        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            try { await _supabase.auth.signOut(); } finally { window.location.replace(CONFIG.LOGIN_PAGE); }
        }

        function renderNavbar() {
            if (document.querySelector(".erp-navbar")) return;
            const style = `
                <style>
                    /* Reset básico para a Navbar */
                    .erp-navbar, .erp-navbar * { box-sizing: border-box; }

                    .erp-navbar { 
                        position: fixed; top: 0; left: 0; width: 100%; 
                        background: #fff; padding: 10px 15px; 
                        display: flex; justify-content: space-between; align-items: center; 
                        box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; 
                        font-family: sans-serif; 
                    }
                    .erp-navbar .brand { 
                        font-weight: bold; color: #0f172a; font-size: 1.1rem; 
                        display: flex; align-items: center; gap: 5px; 
                        white-space: nowrap;
                    }
                    .erp-navbar .nav-right { display: flex; gap: 8px; flex-wrap: nowrap; }
                    
                    .erp-navbar .btn { 
                        padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; border: none; 
                        cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; 
                        gap: 5px; transition: 0.3s; white-space: nowrap; color: white;
                    }
                    .erp-navbar .btn-logout { background: #ef4444; }
                    .erp-navbar .btn-home { background: #3ecf8e; }
                    
                    /* Ajustes para Celular */
                    @media (max-width: 600px) {
                        .erp-navbar { padding: 8px 10px; }
                        .erp-navbar .brand { font-size: 0.9rem; }
                        .erp-navbar .btn span { display: none; } /* Esconde o texto, deixa só o ícone no celular se ficar apertado */
                        .erp-navbar .btn { padding: 8px 12px; font-size: 14px; }
                    }

                    body.erp-guard-active { padding-top: 70px !important; }
                </style>`;

            const html = `
                <div class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i> <span>Projetos</span></a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> <span>Início</span></a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> <span>Sair</span></button>
                    </div>
                </div>`;

            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", async () => {
                const session = await validarSessao();
                if (session) renderNavbar();
            });
        } else {
            const session = await validarSessao();
            if (session) renderNavbar();
        }

    } catch (err) {
        console.error("Erro crítico no Guard:", err);
    }
})();

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
# bloco_de_notas
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bloco de Notas - ERP ABP</title>
    
    <script src="conexao.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary: #3ecf8e;
            --dark: #0f172a;
            --bg: #f1f5f9;
            --danger: #e74c3c;
            --warning: #f1c40f;
            --gray: #94a3b8;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: var(--bg);
            padding: 20px;
        }

        .container {
            max-width: 700px;
            margin: 40px auto;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        h2 { color: var(--dark); margin-top: 0; }

        textarea, input[type="text"] {
            width: 100%;
            margin-bottom: 15px;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        textarea:focus, input:focus {
            outline: none;
            border-color: var(--primary);
        }

        .btn-save {
            background: var(--primary);
            color: white;
            padding: 15px;
            border: none;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
            border-radius: 8px;
            font-size: 16px;
            transition: 0.3s;
        }

        .btn-save:hover { filter: brightness(1.1); }

        /* Estilo do Novo Botão de Cancelar */
        .btn-cancel {
            background: var(--gray);
            color: white;
            padding: 12px;
            border: none;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
            border-radius: 8px;
            font-size: 14px;
            margin-top: 10px;
            display: none; /* Escondido por padrão */
            transition: 0.3s;
        }

        .btn-cancel:hover { background: #64748b; }

        .note {
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .note-content strong {
            color: #1e293b;
            font-size: 1.1em;
            display: block;
            margin-bottom: 5px;
        }

        .note-content p {
            color: #64748b;
            margin: 0;
            line-height: 1.5;
            white-space: pre-wrap;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .actions button {
            padding: 8px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            color: white;
            transition: 0.2s;
        }

        .actions button:hover { opacity: 0.8; }

        .search-box {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }

        .export-btn {
            width: 100%;
            background: #2c3e50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2 id="form-title">Minhas Notas</h2>
        <input type="hidden" id="note-id">
        <input type="text" id="title" placeholder="Título da nota...">
        <textarea id="content" rows="4" placeholder="Escreva algo importante..."></textarea>

        <button class="btn-save" id="btn-save" onclick="saveNote()">
            Salvar Nota
        </button>
        
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">
            Cancelar Edição
        </button>

        <div class="search-box">
            <label style="font-size: 12px; font-weight: bold; color: #64748b;">PESQUISAR OU EXPORTAR</label>
            <input type="text" id="search" placeholder="🔍 Digite para buscar..." onkeyup="filterNotes()">
            <button class="export-btn" onclick="exportAllToPDF()">
                <i class="fas fa-file-pdf"></i> Exportar Notas para PDF
            </button>
        </div>

        <div id="notes-list"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <script>
        /** ERP ABP - Bloco de Notas Integrado **/
        (function() {
            "use strict";

            let allNotes = [];

            // 1. Aguarda a conexão com Supabase do conexao.js
            async function init() {
                if (!window._supabase) {
                    setTimeout(init, 200);
                    return;
                }
                loadNotes();
            }

            // 2. Carregar Notas
            async function loadNotes() {
                const { data, error } = await _supabase
                    .from('notes')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) return console.error("Erro:", error);
                allNotes = data || [];
                renderNotes(allNotes);
            }

            // 3. Renderizar Lista
            function renderNotes(notes) {
                const list = document.getElementById('notes-list');
                list.innerHTML = notes.map(n => `
                    <div class="note">
                        <div class="note-content">
                            <strong>${n.title}</strong>
                            <p>${n.content}</p>
                        </div>
                        <div class="actions">
                            <button style="background:var(--warning)" onclick="window.prepareEdit('${n.id}')"><i class="fas fa-edit"></i></button>
                            <button style="background:var(--danger)" onclick="window.deleteNote('${n.id}')"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('') || '<p style="text-align:center; color:#94a3b8;">Nenhuma nota encontrada.</p>';
            }

            // 4. Salvar ou Atualizar
            window.saveNote = async function() {
                const id = document.getElementById('note-id').value;
                const title = document.getElementById('title').value;
                const content = document.getElementById('content').value;

                if (!title || !content) return alert("Por favor, preencha o título e o conteúdo.");

                const { data: { user } } = await _supabase.auth.getUser();

                if (id) {
                    await _supabase.from('notes').update({ title, content }).eq('id', id);
                } else {
                    await _supabase.from('notes').insert([{ title, content, user_id: user.id }]);
                }

                resetForm();
                loadNotes();
            };

            // 5. Preparar Edição
            window.prepareEdit = function(id) {
                const note = allNotes.find(n => n.id === id);
                if (!note) return;

                document.getElementById('note-id').value = note.id;
                document.getElementById('title').value = note.title;
                document.getElementById('content').value = note.content;
                
                document.getElementById('form-title').innerText = "Editando Nota";
                document.getElementById('btn-save').innerText = "Atualizar Nota";
                document.getElementById('btn-cancel').style.display = 'block';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // 6. Resetar Formulário (Função Cancelar)
            window.resetForm = function() {
                document.getElementById('note-id').value = '';
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
                
                document.getElementById('form-title').innerText = "Minhas Notas";
                document.getElementById('btn-save').innerText = "Salvar Nota";
                document.getElementById('btn-cancel').style.display = 'none';
            };

            // 7. Excluir Nota
            window.deleteNote = async function(id) {
                if (confirm("Tem certeza que deseja excluir esta nota?")) {
                    await _supabase.from('notes').delete().eq('id', id);
                    loadNotes();
                }
            };

            // 8. Busca
            window.filterNotes = function() {
                const q = document.getElementById('search').value.toLowerCase();
                renderNotes(allNotes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
            };

            // 9. PDF
            window.exportAllToPDF = function() {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.setFontSize(18);
                doc.text("Relatório de Notas - ERP ABP", 10, 20);
                
                doc.setFontSize(12);
                let y = 35;
                allNotes.forEach((n, i) => {
                    if (y > 270) { doc.addPage(); y = 20; }
                    doc.setFont(undefined, 'bold');
                    doc.text(`${i + 1}. ${n.title}`, 10, y);
                    doc.setFont(undefined, 'normal');
                    const textLines = doc.splitTextToSize(n.content, 180);
                    doc.text(textLines, 10, y + 7);
                    y += (textLines.length * 7) + 15;
                });
                doc.save("notas_erp_abp.pdf");
            };

            document.addEventListener('DOMContentLoaded', init);
        })();
    </script>
</body>
</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# como ler o codigo de barras com a camera

```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>codigo de barras</title>
 </head>
<body>
 <label>Código de Barras (EAN)</label>
   <div style="display: flex; gap: 5px;">
      <input type="text" id="codigo_de_barras" placeholder="0000000000000">
         <button type="button" class="btn-scan" onclick="abrirScanner()">
           <i class="fas fa-camera"></i>
           </button>
                </div>
            </div>
        </div>
        <div id="reader-container" style="display:none;">
            <div id="reader"></div>
            <button class="btn-cancel" onclick="fecharScanner()" style="margin-bottom: 20px;">Fechar Câmera</button>
        </div>
<script>
let html5QrCode; // Variável global para controlar a instância da câmera
/** Inicia a câmera e o processamento de imagem para ler códigos */
window.abrirScanner = function() {
    // Exibe o container onde o vídeo da câmera aparecerá
    const container = document.getElementById('reader-container');
    if (container) container.style.display = 'block';
    // Cria a instância do leitor apontando para o ID 'reader' no HTML
    html5QrCode = new Html5Qrcode("reader");
    // Configurações do Scanner
    const config = { 
        fps: 10,    // Quadros por segundo
        qrbox: 250  // Área de foco da leitura
    };
    // Inicia a câmera traseira ("environment")
    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            // AÇÃO AO LER COM SUCESSO:
            // Preenche o campo de código de barras e fecha a câmera
            const inputCodigo = document.getElementById('codigo_de_barras');
            if (inputCodigo) {
                inputCodigo.value = decodedText;
                // Opcional: emitir um sinal sonoro aqui
                console.log("Código lido: " + decodedText);
            }
            fecharScanner();
        }
    ).catch(err => {
        console.error("Erro ao iniciar câmera: ", err);
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
    });
};

/**  * Para a câmera e limpa a memória  */
window.fecharScanner = function() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            const container = document.getElementById('reader-container');
            if (container) container.style.display = 'none';
            console.log("Câmera desligada.");
        }).catch(err => {
            console.warn("Erro ao parar a câmera: ", err);
        });
    }};
</script>
</body>
</html>
```
