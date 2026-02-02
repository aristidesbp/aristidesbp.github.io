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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥   
# CONFIGURAÇAO INICIAL NO SUPABASE
**Authentication/URL Configuration/ Site URL**:
Configure o URL de redirecionamento padrão usado quando um URL de redirecionamento não é especificado ou não corresponde a um da lista de permitidas. Esse valor também é exposto como uma variável de modelo na seção de modelos de email. Wildcards não podem ser usados aqui.
**EXEMPLO**:
```
http://aristidesbp.github.io
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥   
# usuarios.sql
```
create table public.usuarios (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid null,
  nome_completo text null,
  bio text null,
  avatar_url text null,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥   
# FUNCTION TRIGGER
```
-- 1. Criar a função que insere os dados na tabela public.usuarios
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (user_id, nome_completo, avatar_url)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', -- Tenta pegar o nome dos metadados (ex: Google Login)
    new.raw_user_meta_data->>'avatar_url' -- Tenta pegar a foto dos metadados
  );
  return new;
end;
$$;

-- 2. Criar o gatilho (trigger) que dispara após um novo registro em auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  

# login.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <!-- Codificação de caracteres -->
    <meta charset="UTF-8">

    <!-- Responsividade para dispositivos móveis -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Título da aba -->
    <title>Login - SISTEMA ERP ABP</title>

    <!-- SDK do Supabase (frontend) -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

    <!-- CSS específico da tela de login -->
    <style>
    /* Variáveis globais de cores */
:root {
    --primary: #3ecf8e;
    --dark: #1e293b;
    --bg: #0f172a;
}

/* Estilo base da página */
body {
    font-family: 'Segoe UI', sans-serif;
    background-color: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

/* Card central de login */
.login-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

/* Título principal */
h1 {
    color: var(--dark);
    margin-bottom: 5px;
    font-size: 24px;
}

/* Subtítulo */
h2 {
    color: #64748b;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: normal;
}

/* Container dos inputs */
.input-container {
    position: relative;
    margin-bottom: 15px;
}

/* Campos de entrada */
input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
}

/* Botão para mostrar/ocultar senha */
.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background: none;
    border: none;
    font-size: 18px;
    color: #666;
}

/* Botão principal */
button.main-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: var(--primary);
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
}

/* Hover do botão */
button.main-btn:hover {
    background-color: #34b27b;
}

/* Links extras */
.extra-links {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
}

/* Estilo dos links */
.link {
    color: #4a90e2;
    text-decoration: none;
    cursor: pointer;
    font-weight: 500;
}

/* Botão de voltar */
.btn-back {
    background: #e2e8f0;
    color: #475569;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    margin-bottom: 20px;
    cursor: pointer;
    display: none;
}
    </style>
</head>
<body>

    <!-- Card central de autenticação -->
    <div class="login-card">

        <!-- Botão de retorno (usado em recuperação/cadastro) -->
        <button id="btn-back" class="btn-back" onclick="toggleMode()">
            ← Voltar para o Login
        </button>

        <!-- Título principal -->
        <h1>SISTEMA ERP ABP</h1>

        <!-- Subtítulo dinâmico -->
        <h2 id="form-subtitle">Faça login para acessar o ERP</h2>

        <!-- Campo de e-mail -->
        <div class="input-container" id="email-group">
            <input type="email" id="email" placeholder="Seu e-mail">
        </div>

        <!-- Campo de senha -->
        <div class="input-container" id="pass-group">
            <input type="password" id="password" placeholder="Sua senha">

            <!-- Botão para alternar visibilidade da senha -->
            <button type="button" class="toggle-password" onclick="toggleVisibility()">
                👁️
            </button>
        </div>

        <!-- Botão principal (login / cadastro / salvar senha) -->
        <button class="main-btn" id="btn-auth" onclick="handleAuth()">
            Entrar
        </button>

        <!-- Links auxiliares -->
        <div class="extra-links">
            <span id="link-forgot" class="link" onclick="forgotPassword()">
                Esqueci minha senha
            </span>

    <h3>DESENVOLVEDOR: ARISTIDES BP</h3>
    <h3>CONTATO: +55 91 99242-0981</h3>
            
        </div>
    </div>

    
    
    <!-- Script principal do login -->
    <script>

const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

// Criação do cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Alterna a visibilidade da senha
 */
function toggleVisibility() {
    const passInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');

    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggleBtn.innerText = passInput.type === 'password' ? '👁️' : '🙈';
}

/**
 * Apenas Login
 */
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) alert("Erro: " + error.message);
    else window.location.href = 'index.html';
}

/**
 * Envio de e-mail para recuperação de senha
 */
async function forgotPassword() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await _supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href
    });

    if (error) alert(error.message);
    else alert("Link de recuperação enviado!");
}

/**
 * Detecta se o usuário chegou por link de recuperação
 */
async function checkRecovery() {
    const hash = window.location.hash;

    if (hash && (hash.includes("type=recovery") || hash.includes("access_token="))) {
        document.getElementById('form-subtitle').innerText = "🔑 Defina sua nova senha";
        document.getElementById('email-group').style.display = 'none';
        document.getElementById('btn-auth').innerText = "Salvar Nova Senha";
        document.getElementById('btn-auth').onclick = updatePassword;
        document.getElementById('link-forgot').style.display = 'none';
    }
}

/**
 * Atualiza a senha do usuário
 */
async function updatePassword() {
    const newPassword = document.getElementById('password').value;

    if (newPassword.length < 6) {
        return alert("Mínimo 6 caracteres.");
    }

    const { error } = await _supabase.auth.updateUser({ password: newPassword });

    if (error) alert(error.message);
    else {
        alert("Senha atualizada!");
        window.location.hash = "";
        window.location.reload();
    }
}

// Executa verificação de recuperação ao carregar a página
window.onload = checkRecovery;
    </script>

</body>
</html>

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# navbar.js
* segurança reforçada 
 ```
/**
 * =======================================================
 *  ERP ABP - GUARD GLOBAL
 *  Segurança + Navbar + Controle de Sessão
 *  Arquivo ÚNICO | Reutilizável | Defensivo
 * =======================================================
 */

(() => {
    "use strict";

    // Evita execução duplicada
    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    // ---------------------------------------------------
    // VERIFICA SUPABASE
    // ---------------------------------------------------
    if (typeof window._supabase === "undefined") {
        console.error("Supabase não encontrado.");
        window.location.replace("login.html");
        return;
    }

    // ---------------------------------------------------
    // CONFIGURAÇÃO CENTRAL
    // ---------------------------------------------------
    const CONFIG = Object.freeze({
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "adm.html",
        APP_NAME: "ERP ABP"
    });

    // ---------------------------------------------------
    // VALIDA SESSÃO
    // ---------------------------------------------------
    async function validarSessao() {
        try {
            const { data, error } = await _supabase.auth.getSession();
            if (error || !data || !data.session) {
                throw new Error("Sessão inválida");
            }
            return data.session;
        } catch (e) {
            window.location.replace(CONFIG.LOGIN_PAGE);
            return null;
        }
    }

    // ---------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------
    async function logout() {
        if (!confirm("Deseja sair do sistema?")) return;

        try {
            await _supabase.auth.signOut();
        } catch (_) {
            // Falha silenciosa proposital
        } finally {
            window.location.replace(CONFIG.LOGIN_PAGE);
        }
    }

    // ---------------------------------------------------
    // NAVBAR
    // ---------------------------------------------------
    function renderNavbar() {
        if (document.querySelector(".erp-navbar")) return;

        const style = `
            <style>
                .erp-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: #fff;
                    padding: 15px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,.1);
                    z-index: 9999;
                }
                .erp-navbar .btn {
                    background: #ef4444;
                    color: #fff;
                    border: none;
                    padding: 8px 14px;
                    border-radius: 6px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .erp-navbar .home {
                    background: #3ecf8e;
                }
                body.erp-guard {
                    padding-top: 80px;
                }
            </style>
        `;

        const html = `
            <div class="erp-navbar">
                <strong>${CONFIG.APP_NAME}</strong>
                <div>
                    <a href="${CONFIG.HOME_PAGE}" class="btn home">Início</a>
                    <button class="btn" id="erpLogout">Sair</button>
                </div>
            </div>
        `;

        document.head.insertAdjacentHTML("beforeend", style);
        document.body.insertAdjacentHTML("afterbegin", html);
        document.body.classList.add("erp-guard");

        document
            .getElementById("erpLogout")
            ?.addEventListener("click", logout);
    }

    // ---------------------------------------------------
    // INICIALIZAÇÃO
    // ---------------------------------------------------
    document.addEventListener("DOMContentLoaded", async () => {
        const session = await validarSessao();
        if (!session) return;
        renderNavbar();
    });

})();

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# index.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISTEMA ERP ABP - Inicio</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- CONEXAO -->
    <script>

// Configurações do Supabase
const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

// Inicializa o cliente globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/** Bloqueia o acesso se não estiver logado  */
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        // Verifica se a página está na raiz ou em subpasta para ajustar o caminho do login
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}

// Executa automaticamente ao carregar o script
validarAcesso();

   </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

   <style>
   /* Remove inconsistências de box model */
* {
    box-sizing: border-box;
}

/* Estilo base do corpo da página */
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f1f5f9;
    padding-top: 80px;
}

/* Container central do conteúdo */
.content {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

/* Grade responsiva dos cards */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

/* Estilo dos cards clicáveis */
.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-decoration: none;
    color: #334155;
    text-align: center;
    border: 1px solid #e2e8f0;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Efeito visual ao passar o mouse */
.card:hover {
    transform: translateY(-5px);
    border-color: #3ecf8e;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

/* Ícones dos cards */
.card i {
    font-size: 45px;
    color: #3ecf8e;
    margin-bottom: 15px;
}

/* Título dos cards */
.card h3 {
    margin: 10px 0;
}

/* Texto auxiliar dos cards */
.card p {
    font-size: 0.9em;
    color: #64748b;
}
   </style>
</head>
<body>

    <div class="content">
        
        <div class="grid">

            <a href="bloco_de_notas.html" class="card">
                <i class="fas fa-sticky-note"></i>
                <h3>Bloco de Notas</h3>
                <p>Anote e organize suas ideias na nuvem.</p>
            </a>

            <a href="clientes.html" class="card">
                <i class="fas fa-users"></i>
                <h3>Gestão de Clientes</h3>
                <p>Cadastro e gerenciamento completo de clientes.</p>
            </a>

            <a href="fornecedores.html" class="card">
                <i class="fas fa-users"></i>
                <h3>fornecedores</h3>
                <p>Gerencie dados e contatos dos fornecedores</p>
            </a>


            <a href="financeiro.html" class="card">
                <i class="fas fa-sticky-note"></i>
                <h3>Financeiro</h3>
                <p>Contas a pagar/receber/relatorios</p>
            </a>
            

        </div>
        
    </div>

<script src="js/navbar.js"></script>

<script>
// URL do projeto Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';

// Chave pública (publishable) para uso no frontend
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Cria o cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função responsável por verificar se o usuário está autenticado
async function checkUser() {
    // Obtém a sessão atual
    const { data: { session } } = await _supabase.auth.getSession();

    // Se não existir sessão, redireciona para o login
    if (!session) {
        window.location.href = 'login.html';
    }
}

// Executa a verificação após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    checkUser();
});

</script>

</body>
</html>
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# notas.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Bloco de Notas - ERP ABP</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- CONEXAO -->
    <script>
// Configurações do Supabase

const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

// Inicializa o cliente globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Bloqueia o acesso se não estiver logado
 */
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        // Verifica se a página está na raiz ou em subpasta para ajustar o caminho do login
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}

// Executa automaticamente ao carregar o script
validarAcesso();

   </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <link rel="stylesheet" href="css/bloco_de_notas.css">
    <style>
/* Variáveis globais */
:root {
    --primary: #3ecf8e;
    --dark: #0f172a;
}

/* Reset básico */
* {
    box-sizing: border-box;
}

/* Estilo base da página */
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f1f5f9;
    padding-top: 90px;
}

/* Container do bloco de notas */
.container {
    max-width: 700px;
    margin: auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

/* Inputs e textarea */
textarea,
input {
    width: 100%;
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

/* Botão de salvar/atualizar */
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

.btn-save:hover {
    filter: brightness(1.1);
}

/* Nota individual */
.note {
    border-bottom: 1px solid #f1f1f1;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

/* Conteúdo da nota */
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

/* Ações da nota */
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
    font-size: 14px;
}

/* Área de busca e exportação */
.search-box {
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
}

/* Botão de exportação */
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

        <h2>Minhas Notas</h2>

        <input type="hidden" id="note-id">

        <input type="text" id="title" placeholder="Título da nota...">

        <textarea id="content" rows="4" placeholder="Escreva algo importante..."></textarea>

        <button class="btn-save" id="btn-save" onclick="saveNote()">
            Salvar Nota
        </button>

        <div class="search-box">
            <label>PESQUISAR OU EXPORTAR</label>

            <input
                type="text"
                id="search"
                placeholder="🔍 Digite para buscar..."
                onkeyup="filterNotes()"
            >

            <button class="export-btn" onclick="exportAllToPDF()">
                <i class="fas fa-file-pdf"></i> Exportar Notas para PDF
            </button>
        </div>

        <div id="notes-list"></div>
    </div>

    <script src="js/navbar.js"></script>

    <script>
/**
 * js/bloco_de_notas.js
 * Depende de: js/conexao.js (que fornece a variável _supabase)
 */

// Armazena todas as notas carregadas localmente para busca rápida
let allNotes = [];

/**
 * Carrega as notas do banco (Iniciado automaticamente ao carregar a página)
 */
async function loadNotes() {
    // Busca todas as notas ordenadas pela data de criação
    const { data: notes, error } = await _supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao carregar notas:", error.message);
        return;
    }

    allNotes = notes || [];
    renderNotes(allNotes);
}

/**
 * Renderiza as notas na tela (HTML dinâmico)
 */
function renderNotes(notes) {
    document.getElementById('notes-list').innerHTML =
        notes.map(n => `
            <div class="note">
                <div class="note-content">
                    <strong>${n.title}</strong>
                    <p>${n.content}</p>
                </div>
                <div class="actions">
                    <button style="background:#f1c40f"
                        onclick="prepareEdit('${n.id}', \`${n.title}\`, \`${n.content}\`)">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button style="background:#e74c3c"
                        onclick="deleteNote('${n.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('') ||
        '<p style="text-align:center;color:#94a3b8;margin-top:20px;">Nenhuma nota encontrada.</p>';
}

/**
 * Salva ou atualiza uma nota (CRUD - Create/Update)
 */
async function saveNote() {
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        return alert("Preencha título e conteúdo!");
    }

    // Obtém o usuário logado através da conexão ativa
    const { data: { user } } = await _supabase.auth.getUser();

    if (id) {
        // Modo Edição (Update)
        await _supabase.from('notes')
            .update({ title, content })
            .eq('id', id);
    } else {
        // Modo Novo (Insert)
        await _supabase.from('notes')
            .insert([{ title, content, user_id: user.id }]);
    }

    resetForm();
    loadNotes();
}

/**
 * Prepara o formulário para edição (Preenche os campos)
 */
function prepareEdit(id, title, content) {
    document.getElementById('note-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reseta o formulário para o estado original
 */
function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('btn-save').innerText = "Salvar Nota";
}

/**
 * Exclui uma nota do banco (CRUD - Delete)
 */
async function deleteNote(id) {
    if (confirm("Deseja excluir esta nota?")) {
        await _supabase.from('notes').delete().eq('id', id);
        loadNotes();
    }
}

/**
 * Filtra as notas carregadas pelo texto digitado na pesquisa
 */
function filterNotes() {
    const q = document.getElementById('search').value.toLowerCase();

    const filtered = allNotes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );

    renderNotes(filtered);
}

/**
 * Exporta todas as notas presentes na lista para um arquivo PDF
 */
async function exportAllToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Meu Bloco de Notas - ERP ABP", 10, 10);

    let y = 20;

    allNotes.forEach((n, i) => {
        doc.setFont(undefined, 'bold');
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        doc.setFont(undefined, 'normal');
        doc.text(n.content, 10, y + 7);
        y += 25;
    });

    doc.save("minhas-notas.pdf");
}

/**
 * Inicializa os dados assim que o documento estiver pronto
 * A trava de segurança já foi executada no conexao.js
 */
document.addEventListener('DOMContentLoaded', loadNotes);



</script>

</body>
</html>

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CLIENTES/FORNECEDORES
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes - ERP ABP</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    // Configurações do Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}
validarAcesso();
    </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <style>
/* Variáveis globais de cores */
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

.btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; }
.btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; }

/* NAVBAR FIXA */
.navbar {
    position: fixed; top: 0; left: 0; width: 100%; background: white;
    padding: 15px 25px; display: flex; justify-content: space-between;
    align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;
}
.btn-nav {
    background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px;
    font-weight: bold; font-size: 14px; border: none; cursor: pointer;
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
}
    </style>
</head>
<body>

<div class="navbar">
    <div style="font-weight: bold; color: #0f172a;">ERP ABP</div>
    <div class="nav-buttons">
        <a href="index.html" style="text-decoration: none; color: #64748b; margin-right: 20px; font-weight: bold;">Voltar</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

    <div class="container">
        <div class="card">
            <h3 id="form-title">Novo Cadastro de Usuário / Entidade</h3>
            <input type="hidden" id="edit-id">

            <div class="section-title">Informações Pessoais e Acesso</div>
            <div class="form-grid">
                <div><label>Nome Completo *</label><input type="text" id="nome_completo"></div>
                <div><label>CPF</label><input type="text" id="cpf"></div>
                <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
                <div><label>E-mail</label><input type="email" id="email"></div>
                <div><label>Telefone</label><input type="text" id="telefone"></div>
                <div><label>Senha de Acesso</label><input type="password" id="senha_acesso" placeholder="Senha interna"></div>
                
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
                <div style="grid-column: span 2;"><label>URL de Arquivos (Fotos/Documentos)</label><input type="text" id="arquivos_url" placeholder="Link da foto ou documento"></div>
                <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
            </div>

            <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Cadastro</button>
            <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome / Relacionamento</th>
                        <th>CPF / Contato</th>
                        <th>Acesso / Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="clients-list"></tbody>
            </table>
        </div>
    </div>

    <script>
async function sairDaConta() {
    if(confirm("Deseja realmente sair?")) {
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
    }
}

async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            }
        } catch { console.error("Erro CEP"); }
    }
}

async function loadClients() {
    const { data, error } = await _supabase.from('clientes').select('*').order('nome_completo');
    if (error) return;

    const list = document.getElementById('clients-list');
    list.innerHTML = (data || []).map(c => `
        <tr>
            <td><b>${c.nome_completo}</b><br><small>${c.relacionamento.toUpperCase()}</small></td>
            <td>${c.cpf || '-'}<br><small>${c.email || ''}</small></td>
            <td>${c.acesso}<br><small style="color:${c.status === 'ativo' ? 'green' : 'red'}">${c.status}</small></td>
            <td>
                <button class="btn-edit" onclick="editFull('${c.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteClient('${c.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center">Nenhum registro.</td></tr>';
}

async function handleSave() {
    const { data: { user } } = await _supabase.auth.getUser();
    const id = document.getElementById('edit-id').value;

    const dados = {
        usuario_id: user.id,
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value || null,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha_acesso: document.getElementById('senha_acesso').value,
        acesso: document.getElementById('acesso').value,
        relacionamento: document.getElementById('relacionamento').value,
        status: document.getElementById('status').value,
        avaliacao: parseInt(document.getElementById('avaliacao').value),
        observacoes: document.getElementById('observacoes').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        // Converte string para array caso tenha algo escrito, ou envia array vazio
        arquivos_url: document.getElementById('arquivos_url').value ? [document.getElementById('arquivos_url').value] : []
    };

    if (!dados.nome_completo) return alert("Nome é obrigatório");

    const { error } = id
        ? await _supabase.from('clientes').update(dados).eq('id', id)
        : await _supabase.from('clientes').insert([dados]);

    if (error) alert("Erro: " + error.message);
    else { resetForm(); loadClients(); }
}

async function editFull(id) {
    const { data, error } = await _supabase.from('clientes').select('*').eq('id', id).single();
    if (error || !data) return;

    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) {
            if (k === 'arquivos_url') el.value = data[k] ? data[k][0] : '';
            else el.value = data[k] || '';
        }
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando Registro";
    document.getElementById('btn-save').innerText = "Atualizar Cadastro";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.querySelectorAll('input, select, textarea').forEach(i => {
        if(i.id === 'avaliacao') i.value = '5';
        else if(i.tagName === 'SELECT') i.selectedIndex = 0;
        else i.value = '';
    });
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = "Novo Cadastro de Usuário / Entidade";
    document.getElementById('btn-save').innerText = "Salvar Cadastro";
    document.getElementById('btn-cancel').style.display = "none";
}

async function deleteClient(id) {
    if (confirm("Excluir definitivamente?")) {
        await _supabase.from('clientes').delete().eq('id', id);
        loadClients();
    }
}

document.addEventListener('DOMContentLoaded', loadClients);
    </script>
</body>
</html>
```




🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# SQL PARA CRIAR AS TABELAS DO BANCO DE DADOS
```

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIANDO AS FUNCTIONS E TRIGGER
```

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# CRIANDO APOLICES   
```

```

