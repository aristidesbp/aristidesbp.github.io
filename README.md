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
3. [SITE DE VENDAS E PAGAMENTOS](#site-de-vendas-e-pagamentos)
4. [SITE DE VENDAS E PAGAMENTOS](#site-de-vendas-e-pagamentos)


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
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
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
# SITE DE VENDAS E PAGAMENTOS
* ESTRUTURA SITE DE VENDAS E PAGAMENTOS:
```
/aristidesbp.github.io  (Sua pasta local e no GitHub)
│
├── index.html          <-- (A página principal que te enviei agora)
└── assets
     └── mercadopago_supabase
           ├── pagamento.html      <-- (A página universal de checkout)
           ├── sucesso.html        <-- (Página de agradecimento após o Pix)
           ├── services/           <-- (Opcional: Para organizar seus JSONs)
           │    └── serviços.json   <-- (Onde você pode listar os preços e descrições)
           │
           ├── assets/             <-- (Para suas imagens e logos)
           │   └── foto-perfil.jpg
           |
           └── supabase/           <-- (Pasta que contém sua inteligência de backend)
                └── functions/
                       └── checkout/
                             └── index.ts <-- (O código TypeScript que gera o Mercado Pago)
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

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# INTALANDO O DOCKER
É importante mencionar: o Supabase CLI funciona "dentro" do Docker para simular o ambiente de nuvem no seu computador. Sem ele, você não conseguirá rodar supabase init ou fazer o deploy das funções.
No Linux Mint, você instala o Docker assim:
```
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
# Permite rodar o docker sem usar 'sudo' toda hora
sudo usermod -aG docker $USER
```
##  Nota: Após rodar o comando usermod, você precisará reiniciar o computador ou fazer logoff para as alterações surtirem efeito.
Verificação Final ,Assim que conseguir instalar, rode: 
```
supabase --version
```
## O que acontece depois?
*  O instalador vai concluir a configuração dos arquivos.
*  Assim que ele terminar e você voltar para a linha de comando comum (onde aparece seu nome de usuário), lembre-se de rodar aquele comando importante para não precisar usar sudo toda hora:
```  
 sudo usermod -aG docker $USER
```  
* Dica: Depois de rodar o comando acima, você precisará reiniciar o seu computador para que o Linux entenda que agora você tem permissão total para usar o Docker e o Supabase CLI.
* Assim que reiniciar, tente rodar docker --version no terminal. Se funcionar, já podemos partir para o deploy da sua função !

## Docker está rodando perfeitamente no seu Linux Mint. Agora o seu computador tem a "ferramenta" necessária para empacotar e enviar o código para os servidores do Supabase.
* Como você já reiniciou (ou aplicou as permissões), vamos colocar  para processar pagamentos reais.
  **Siga estes passos no terminal, dentro da pasta onde está o seu projeto (seu repositório do GitHub)**:
* Inicialize o Supabase no seu Projeto
```
# Este comando vai criar uma pasta chamada supabase no seu diretório.
supabase init
```
* Crie a Estrutura da Função
```
# Vamos criar o espaço para a função de checkout:
supabase functions new checkout
```

* Cole o Código da Função index.ts
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/supabase/functions/checkout/index.ts
```
// Adicione os dados do comprador (Payer) para habilitar os botões
const preferenceData = {
  items: body.itens.map((i: any) => ({
    title: i.nome,
    unit_price: i.preco,
    quantity: i.qtd,
    currency_id: 'BRL'
  })),
  payer: {
    name: body.nome,
    email: body.email, // O Mercado Pago exige e-mail válido para liberar o botão
  },
  // Garante que o cliente possa pagar com qualquer método
  payment_methods: {
    excluded_payment_types: [],
    installments: 12
  },
  // Redirecionamento automático após pagar
  back_urls: {
    success: "https://aristidesbp.github.io/sucesso.html",
    failure: "https://aristidesbp.github.io/pagamento.html",
    pending: "https://aristidesbp.github.io/sucesso.html", // Adicionado para Pix pendente
},
auto_return: "all", // Mude de "approved" para "all"
};
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# Configure as Variáveis de Ambiente
* Para não deixar sua chave do Mercado Pago exposta no código, vamos salvá-la de forma segura no Supabase:
```
supabase secrets set MP_ACCESS_TOKEN=seu_token_aqui
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# Faça o Deploy (Envio)
* Agora, com o Docker rodando, execute o comando para subir a função para a nuvem:
```
supabase functions deploy checkout
```
**Verificação no Painel do Supabase**
* Após o comando terminar, você poderá ver a função listada no seu painel do Supabase em Edge Functions.
* Informação Importante: Lembre-se de que no seu arquivo index.html (o que vai para o GitHub), a URL para chamar essa função será: https://[SEU-ID-DO-PROJETO].supabase.co/functions/v1/checkout
  

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/index.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Checkout Seguro | Aristidesbp</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #020617; color: #f8fafc; }
        .glass { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .loading-spinner {
            border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #2563eb;
            border-radius: 50%; width: 24px; height: 24px; animation: spin 0.8s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">

    <div class="max-w-md w-full glass rounded-3xl p-8 shadow-2xl">
        <div class="text-center mb-8">
            <div class="size-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
                <span class="material-symbols-outlined text-white">shield_with_heart</span>
            </div>
            <h1 class="text-2xl font-black uppercase tracking-tight">Checkout Seguro</h1>
            <p class="text-slate-400 text-sm">Aristidesbp Digital Solutions</p>
        </div>

        <div class="bg-slate-900/50 rounded-2xl p-6 border border-white/5 mb-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Produto/Serviço</span>
                    <h2 id="displayItem" class="font-bold text-lg leading-tight">Carregando...</h2>
                </div>
                <span class="material-symbols-outlined text-slate-600">shopping_bag</span>
            </div>
            <div class="flex justify-between items-end">
                <div>
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total a pagar</span>
                    <div class="text-3xl font-black text-white">R$ <span id="displayValor">0,00</span></div>
                </div>
            </div>
        </div>

        <form id="payForm" class="space-y-4">
            <div>
                <label class="text-[10px] uppercase font-bold text-slate-500 ml-1">Seu Nome</label>
                <input id="nome" type="text" required class="w-full bg-slate-900 border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 focus:ring-0 transition-all" placeholder="Nome completo">
            </div>
            <div>
                <label class="text-[10px] uppercase font-bold text-slate-500 ml-1">Seu Melhor E-mail</label>
                <input id="email" type="email" required class="w-full bg-slate-900 border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 focus:ring-0 transition-all" placeholder="email@exemplo.com">
            </div>

            <button type="submit" id="btnPagar" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
                PAGAR AGORA
            </button>
        </form>

        <div class="mt-6 flex items-center justify-center gap-4 opacity-40 grayscale">
            <img src="https://img.icons8.com/color/48/000000/visa.png" class="h-4">
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" class="h-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.png" class="h-3">
        </div>
    </div>

    <script>
        // Capturar dados da URL (?item=NOME&valor=000)
        const params = new URLSearchParams(window.location.search);
        const itemNome = params.get('item') || "Serviço Digital";
        const itemValor = parseFloat(params.get('valor')) || 0;

        document.getElementById('displayItem').innerText = itemNome;
        document.getElementById('displayValor').innerText = itemValor.toLocaleString('pt-br', {minimumFractionDigits: 2});

        const functionUrl = 'https://eisruaetsqrratemqswv.functions.supabase.co/checkout';

        document.getElementById('payForm').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnPagar');
            
            if(itemValor <= 0) return alert("Valor inválido.");

            btn.disabled = true;
            btn.innerHTML = `<div class="loading-spinner"></div> PROCESSANDO...`;

            try {
                const response = await fetch(functionUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: document.getElementById('nome').value,
                        email: document.getElementById('email').value,
                        total: itemValor,
                        itens: [{ nome: itemNome, preco: itemValor, qtd: 1 }]
                    })
                });

                const data = await response.json();
                if (data.init_point) {
                    window.location.href = data.init_point;
                } else {
                    throw new Error();
                }
            } catch (err) {
                alert("Erro ao gerar pagamento. Tente novamente.");
                btn.disabled = false;
                btn.innerHTML = "PAGAR AGORA";
            }
        };
    </script>
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/services/servicos.json
```
{
  "servicos": [
    {
      "id": "dev_web",
      "categoria": "Desenvolvimento",
      "nome": "Desenvolvimento Web",
      "descricao": "Sistemas web personalizados e sites institucionais responsivos.",
      "preco": 3500.00,
      "icone": "developer_mode_tv"
    },
    {
      "id": "trafego_pago",
      "categoria": "Marketing",
      "nome": "Tráfego Pago",
      "descricao": "Gestão estratégica de anúncios Google e Meta Ads para conversão.",
      "preco": 1500.00,
      "icone": "query_stats"
    },
    {
      "id": "consultoria_tec",
      "categoria": "Sistemas",
      "nome": "Consultoria Técnica",
      "descricao": "Análise de sistemas e arquitetura de banco de dados.",
      "preco": 1000.00,
      "icone": "terminal"
    },
    {
      "id": "pdf_misterioso",
      "categoria": "Infoproduto",
      "nome": "PDF Misterioso",
      "descricao": "Acesso a documentação desse sistema",
      "preco": 2.00,
      "icone": "picture_as_pdf"
    }
  ]
}
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/sucesso.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Pagamento Confirmado | Aristidesbp</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #020617; color: #f8fafc; }
        .glass { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full glass rounded-3xl p-10 text-center shadow-2xl border-green-500/20">
        <div class="size-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
            <span class="material-symbols-outlined text-white text-4xl">check_circle</span>
        </div>
        
        <h1 class="text-3xl font-black uppercase tracking-tight mb-2">Sucesso!</h1>
        <p class="text-slate-400 mb-8">Recebemos o seu pagamento. O seu projeto ou produto já está em processamento.</p>

        <div class="bg-slate-900/50 rounded-2xl p-6 border border-white/5 mb-8 text-left">
            <h3 class="text-xs font-bold uppercase text-blue-500 mb-4 tracking-widest">Próximos Passos</h3>
            <ul class="space-y-4">
                <li class="flex gap-3 text-sm">
                    <span class="material-symbols-outlined text-green-500 text-sm">task_alt</span>
                    <span>Você receberá um e-mail com os detalhes.</span>
                </li>
                <li class="flex gap-3 text-sm">
                    <span class="material-symbols-outlined text-green-500 text-sm">task_alt</span>
                    <span>Entrarei em contato via WhatsApp em até 24h.</span>
                </li>
            </ul>
        </div>

        <a href="index.html" class="inline-flex items-center gap-2 text-blue-500 font-bold hover:text-blue-400 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
            Voltar para o site
        </a>
    </div>
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/supabase/.gitignore
```
# Supabase
.branches
.temp

# dotenvx
.env.keys
.env.local
.env.*.local
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/supabase/config.toml
```
# For detailed configuration reference documentation, visit:
# https://supabase.com/docs/guides/local-development/cli/config
# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running `supabase init`.
project_id = "aristidesbp.github.io"

[api]
enabled = true
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. `public` and `graphql_public` schemas are included by default.
schemas = ["public", "graphql_public"]
# Extra schemas to add to the search_path of every request.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returns from a view, table, or stored procedure. Limits payload size
# for accidental or malicious requests.
max_rows = 1000

[api.tls]
# Enable HTTPS endpoints locally using a self-signed certificate.
enabled = false
# Paths to self-signed certificate pair.
# cert_path = "../certs/my-cert.pem"
# key_path = "../certs/my-key.pem"

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# Maximum amount of time to wait for health check when starting the local database.
health_timeout = "2m"
# The database major version to use. This has to be the same as your remote database's. Run `SHOW
# server_version;` on the remote database to check.
major_version = 17

[db.pooler]
enabled = false
# Port to use for the local connection pooler.
port = 54329
# Specifies when a server connection can be reused by other clients.
# Configure one of the supported pooler modes: `transaction`, `session`.
pool_mode = "transaction"
# How many server connections to allow per user/database pair.
default_pool_size = 20
# Maximum number of client connections allowed.
max_client_conn = 100

# [db.vault]
# secret_key = "env(SECRET_VALUE)"

[db.migrations]
# If disabled, migrations will be skipped during a db push or reset.
enabled = true
# Specifies an ordered list of schema files that describe your database.
# Supports glob patterns relative to supabase directory: "./schemas/*.sql"
schema_paths = []

[db.seed]
# If enabled, seeds the database after migrations during a db reset.
enabled = true
# Specifies an ordered list of seed files to load during db reset.
# Supports glob patterns relative to supabase directory: "./seeds/*.sql"
sql_paths = ["./seed.sql"]

[db.network_restrictions]
# Enable management of network restrictions.
enabled = false
# List of IPv4 CIDR blocks allowed to connect to the database.
# Defaults to allow all IPv4 connections. Set empty array to block all IPs.
allowed_cidrs = ["0.0.0.0/0"]
# List of IPv6 CIDR blocks allowed to connect to the database.
# Defaults to allow all IPv6 connections. Set empty array to block all IPs.
allowed_cidrs_v6 = ["::/0"]

[realtime]
enabled = true
# Bind realtime via either IPv4 or IPv6. (default: IPv4)
# ip_version = "IPv6"
# The maximum length in bytes of HTTP request headers. (default: 4096)
# max_header_length = 4096

[studio]
enabled = true
# Port to use for Supabase Studio.
port = 54323
# External URL of the API server that frontend connects to.
api_url = "http://127.0.0.1"
# OpenAI API Key to use for Supabase AI in the Supabase Studio.
openai_api_key = "env(OPENAI_API_KEY)"

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
enabled = true
# Port to use for the email testing server web interface.
port = 54324
# Uncomment to expose additional ports for testing user applications that send emails.
# smtp_port = 54325
# pop3_port = 54326
# admin_email = "admin@email.com"
# sender_name = "Admin"

[storage]
enabled = true
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

# Uncomment to configure local storage buckets
# [storage.buckets.images]
# public = false
# file_size_limit = "50MiB"
# allowed_mime_types = ["image/png", "image/jpeg"]
# objects_path = "./images"

# Allow connections via S3 compatible clients
[storage.s3_protocol]
enabled = true

# Image transformation API is available to Supabase Pro plan.
# [storage.image_transformation]
# enabled = true

# Store analytical data in S3 for running ETL jobs over Iceberg Catalog
# This feature is only available on the hosted platform.
[storage.analytics]
enabled = false
max_namespaces = 5
max_tables = 10
max_catalogs = 2

# Analytics Buckets is available to Supabase Pro plan.
# [storage.analytics.buckets.my-warehouse]

# Store vector embeddings in S3 for large and durable datasets
# This feature is only available on the hosted platform.
[storage.vector]
enabled = false
max_buckets = 10
max_indexes = 5

# Vector Buckets is available to Supabase Pro plan.
# [storage.vector.buckets.documents-openai]

[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://127.0.0.1:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://127.0.0.1:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 (1 week).
jwt_expiry = 3600
# JWT issuer URL. If not set, defaults to the local API URL (http://127.0.0.1:<port>/auth/v1).
# jwt_issuer = ""
# Path to JWT signing key. DO NOT commit your signing keys file to git.
# signing_keys_path = "./signing_keys.json"
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = true
# Allow/disallow anonymous sign-ins to your project.
enable_anonymous_sign_ins = false
# Allow/disallow testing manual linking of accounts
enable_manual_linking = false
# Passwords shorter than this value will be rejected as weak. Minimum 6, recommended 8 or more.
minimum_password_length = 6
# Passwords that do not meet the following requirements will be rejected as weak. Supported values
# are: `letters_digits`, `lower_upper_letters_digits`, `lower_upper_letters_digits_symbols`
password_requirements = ""

[auth.rate_limit]
# Number of emails that can be sent per hour. Requires auth.email.smtp to be enabled.
email_sent = 2
# Number of SMS messages that can be sent per hour. Requires auth.sms to be enabled.
sms_sent = 30
# Number of anonymous sign-ins that can be made per hour per IP address. Requires enable_anonymous_sign_ins = true.
anonymous_users = 30
# Number of sessions that can be refreshed in a 5 minute interval per IP address.
token_refresh = 150
# Number of sign up and sign-in requests that can be made in a 5 minute interval per IP address (excludes anonymous users).
sign_in_sign_ups = 30
# Number of OTP / Magic link verifications that can be made in a 5 minute interval per IP address.
token_verifications = 30
# Number of Web3 logins that can be made in a 5 minute interval per IP address.
web3 = 30

# Configure one of the supported captcha providers: `hcaptcha`, `turnstile`.
# [auth.captcha]
# enabled = true
# provider = "hcaptcha"
# secret = ""

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false
# If enabled, users will need to reauthenticate or have logged in recently to change their password.
secure_password_change = false
# Controls the minimum amount of time that must pass before sending another signup confirmation or password reset email.
max_frequency = "1s"
# Number of characters used in the email OTP.
otp_length = 6
# Number of seconds before the email OTP expires (defaults to 1 hour).
otp_expiry = 3600

# Use a production-ready SMTP server
# [auth.email.smtp]
# enabled = true
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
# admin_email = "admin@email.com"
# sender_name = "Admin"

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

# Uncomment to customize notification email template
# [auth.email.notification.password_changed]
# enabled = true
# subject = "Your password has been changed"
# content_path = "./templates/password_changed_notification.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = false
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending OTP to users
template = "Your code is {{ .Code }}"
# Controls the minimum amount of time that must pass before sending another sms otp.
max_frequency = "5s"

# Use pre-defined map of phone number to OTP for testing.
# [auth.sms.test_otp]
# 4152127777 = "123456"

# Configure logged in session timeouts.
# [auth.sessions]
# Force log out after the specified duration.
# timebox = "24h"
# Force log out if the user has been inactive longer than the specified duration.
# inactivity_timeout = "8h"

# This hook runs before a new user is created and allows developers to reject the request based on the incoming user object.
# [auth.hook.before_user_created]
# enabled = true
# uri = "pg-functions://postgres/auth/before-user-created-hook"

# This hook runs before a token is issued and allows you to add additional claims based on the authentication method used.
# [auth.hook.custom_access_token]
# enabled = true
# uri = "pg-functions://<database>/<schema>/<hook_name>"

# Configure one of the supported SMS providers: `twilio`, `twilio_verify`, `messagebird`, `textlocal`, `vonage`.
[auth.sms.twilio]
enabled = false
account_sid = ""
message_service_sid = ""
# DO NOT commit your Twilio auth token to git. Use environment variable substitution instead:
auth_token = "env(SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN)"

# Multi-factor-authentication is available to Supabase Pro plan.
[auth.mfa]
# Control how many MFA factors can be enrolled at once per user.
max_enrolled_factors = 10

# Control MFA via App Authenticator (TOTP)
[auth.mfa.totp]
enroll_enabled = false
verify_enabled = false

# Configure MFA via Phone Messaging
[auth.mfa.phone]
enroll_enabled = false
verify_enabled = false
otp_length = 6
template = "Your code is {{ .Code }}"
max_frequency = "5s"

# Configure MFA via WebAuthn
# [auth.mfa.web_authn]
# enroll_enabled = true
# verify_enabled = true

# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin_oidc`, `notion`, `twitch`,
# `twitter`, `x`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
# DO NOT commit your OAuth provider secret to git. Use environment variable substitution instead:
secret = "env(SUPABASE_AUTH_EXTERNAL_APPLE_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""
# If enabled, the nonce check will be skipped. Required for local sign in with Google auth.
skip_nonce_check = false
# If enabled, it will allow the user to successfully authenticate when the provider does not return an email address.
email_optional = false

# Allow Solana wallet holders to sign in to your project via the Sign in with Solana (SIWS, EIP-4361) standard.
# You can configure "web3" rate limit in the [auth.rate_limit] section and set up [auth.captcha] if self-hosting.
[auth.web3.solana]
enabled = false

# Use Firebase Auth as a third-party provider alongside Supabase Auth.
[auth.third_party.firebase]
enabled = false
# project_id = "my-firebase-project"

# Use Auth0 as a third-party provider alongside Supabase Auth.
[auth.third_party.auth0]
enabled = false
# tenant = "my-auth0-tenant"
# tenant_region = "us"

# Use AWS Cognito (Amplify) as a third-party provider alongside Supabase Auth.
[auth.third_party.aws_cognito]
enabled = false
# user_pool_id = "my-user-pool-id"
# user_pool_region = "us-east-1"

# Use Clerk as a third-party provider alongside Supabase Auth.
[auth.third_party.clerk]
enabled = false
# Obtain from https://clerk.com/setup/supabase
# domain = "example.clerk.accounts.dev"

# OAuth server configuration
[auth.oauth_server]
# Enable OAuth server functionality
enabled = false
# Path for OAuth consent flow UI
authorization_url_path = "/oauth/consent"
# Allow dynamic client registration
allow_dynamic_registration = false

[edge_runtime]
enabled = true
# Supported request policies: `oneshot`, `per_worker`.
# `per_worker` (default) — enables hot reload during local development.
# `oneshot` — fallback mode if hot reload causes issues (e.g. in large repos or with symlinks).
policy = "per_worker"
# Port to attach the Chrome inspector for debugging edge functions.
inspector_port = 8083
# The Deno major version to use.
deno_version = 2

# [edge_runtime.secrets]
# secret_key = "env(SECRET_VALUE)"

[analytics]
enabled = true
port = 54327
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

# Experimental features may be deprecated any time
[experimental]
# Configures Postgres storage engine to use OrioleDB (S3)
orioledb_version = ""
# Configures S3 bucket URL, eg. <bucket_name>.s3-<region>.amazonaws.com
s3_host = "env(S3_HOST)"
# Configures S3 bucket region, eg. us-east-1
s3_region = "env(S3_REGION)"
# Configures AWS_ACCESS_KEY_ID for S3 bucket
s3_access_key = "env(S3_ACCESS_KEY)"
# Configures AWS_SECRET_ACCESS_KEY for S3 bucket
s3_secret_key = "env(S3_SECRET_KEY)"

[functions.checkout]
enabled = true
verify_jwt = true
import_map = "./functions/checkout/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/checkout/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/checkout/*.html" ]
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/supabase/functions/checkout/.npmrc
```
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# mercadopago_supabase/supabase/functions/checkout/deno.json
```
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# SUPABASE (PROJETO ERP)
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
##  Configure a URL DO SEU SITE em:
*  🧠 Altentication/url config/ coloque o endereço de onde está hospedado
  
##  Pegar as chaves do Supabase
## Vá em Settings
*  🧱 DATA API/Project URL/copiar🧱 
*  🔑 API Keis/anon public key/copiar🔑
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
