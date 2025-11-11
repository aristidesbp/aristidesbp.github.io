obs: projeto em andamento podendo conter erros!
#### Tutoriais escrito por Aristides Barbosa Pontes. 09/10/2025
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


---
# 📘 ÍNDICE
1. [ GITHUB - CRIANDO UMA CONTA ](#01)
2. [CRIANDO UMA COPY/SITE/LOJA COM IA:](#02)
3. [ COMO CRIAR UMA CONTA NO GITHUB:](#03)
4. [MINI CURSO HTML, CSS E JAVASCRIPT:](#04)
5. [FIREBASE](#06)
6. [FIRE BASE- TAPIOCA](#07)
    


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 01
# COMO CRIAR UMA CONTA NO GITHUB

---

#### 🧭 O que é o GitHub (resumo rápido)

O GitHub é uma plataforma onde você pode:
. Armazenar e versionar códigos de forma segura (com Git).
. Mostrar seus projetos como portfólio profissional.
. Colaborar com outras pessoas ou empresas.

---

#### 🪪 1️⃣ Criando a conta

🔗 Acesse o site
1. Vá até https://github.com/
🖊️ Clique em “Sign up” (canto superior direito)
🧩 2️⃣ Preencha os dados ou tente logar com e-mail do Google.

Depois clique em Continue.



🔐 3️⃣ Confirmação de segurança (captcha)

O GitHub pode pedir para:
Resolver um pequeno desafio visual (ex: “clique nas imagens corretas”)
ou Digitar um código enviado por e-mail/celular.

⚠️ Importante: verifique sua caixa de entrada (e o spam) e clique no link que o GitHub enviar.


---

🧱 4️⃣ Escolha o plano

Você verá duas opções:
Free (Gratuito) ✅
Pro (Pago)

Selecione Free e clique em Continue.


---

⚙️ 5️⃣ Personalização inicial

O GitHub vai te perguntar:
Se você é estudante, profissional, etc.
Quais tipos de projeto deseja criar.
Você pode pular essa parte clicando em Skip personalization.


---

💡 6️⃣  Dicas iniciais

Depois de criar a conta:

1. Clique no seu avatar (canto superior direito) → “Your profile"
2. Clique em Edit profile para:
Adicionar foto de perfil
Escrever uma bio profissional
Inserir seu site ou portfólio
3. Seu perfil fica público e pode ser usado como currículo técnico.

---

🏁 7️⃣ Pronto! Sua conta foi criada

Agora você está dentro do seu painel principal (Dashboard) do GitHub.
Você verá o botão “Create repository”, que é o próximo passo para começar um projeto.

---


✅ Resumo final

Etapa	Ação

1	Acesse github.com

2	Clique em “Sign up”

3	Preencha e confirme o e-mail

4	Escolha plano Free

5	Personalize ou pule

6	Edite seu perfil

7	Comece a criar seus repositórios



---




# GITHUB PAGES
Vamos criar passo a passo a sua GitHub Page, ou seja, um site gratuito hospedado diretamente no seu repositório do GitHub — ideal para portfólios, lojas, landing pages e até sistemas com HTML, CSS e JS.


---

🌐 O que é o GitHub Pages

O GitHub Pages transforma um repositório do GitHub em um site acessível publicamente (ex: https://aristidesbp.github.io/).

Você pode:

Hospedar seus projetos (HTML, CSS, JS).

Criar um site pessoal ou de empresa.

Publicar documentações ou landing pages sem pagar nada.



---

🧩 1️⃣ Pré-requisitos

Antes de tudo, você precisa:

1. Ter uma conta no GitHub (✅ já ensinamos antes).


2. Ter criado ou saber criar um repositório.




---

🏗️ 2️⃣ Criando o repositório

➤ Passos:

1. Entre em https://github.com/.


2. Clique no botão “New” (ao lado de “Repositories”).


3. Preencha os campos:

Repository name: pode ser:

Para um site pessoal → aristidesbp.github.io

Para um projeto específico → loja-virtual, portfolio, etc.


Description: coloque uma breve descrição (opcional).

Public: deixe público.

Marque ✅ “Add a README file”.



4. Clique em “Create repository”.




---

📁 3️⃣ Enviando seus arquivos

Agora você tem duas opções:

🔹 Opção 1 — Upload manual pelo site:

1. Dentro do repositório, clique em “Add file → Upload files”.


2. Selecione seus arquivos do projeto:

index.html

style.css

script.js



3. Clique em “Commit changes” (botão verde).



🔹 Opção 2 — Envio pelo Git (mais profissional):

Se estiver usando o terminal:

git clone https://github.com/aristidesbp/portfolio.git
cd portfolio
# Copie seus arquivos do site para essa pasta
git add .
git commit -m "Primeira versão do site"
git push origin main


---

⚙️ 4️⃣ Ativando o GitHub Pages

1. Vá até o repositório do seu projeto.


2. Clique em Settings (⚙️ canto direito superior).


3. No menu lateral, selecione Pages.


4. Em Branch, selecione:

main  /  (root)


5. Clique em Save.




---

🚀 5️⃣ Acessando seu site

Após alguns segundos, o GitHub gera um link como este:

https://seuusuario.github.io/nomedorepositorio/

Por exemplo:

https://aristidesbp.github.io/loja-virtual/

💡 O link aparecerá na parte superior da página de configuração, com um botão “Visit site”.


---

🎨 6️⃣ Estrutura recomendada do projeto

Exemplo simples de site hospedável:

<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Site no GitHub Pages</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Bem-vindo ao meu site!</h1>
  <p>Site hospedado no GitHub Pages 😎</p>
  <script src="script.js"></script>
</body>
</html>

/* style.css */
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f0f0f0;
}
h1 {
  color: #333;
}

/* script.js */
console.log("Site ativo no GitHub Pages!");


---

🧱 7️⃣ Atualizando seu site

Sempre que quiser atualizar:

1. Faça mudanças nos arquivos (HTML, CSS, JS).


2. Envie novamente (git push ou “Upload files”).


3. O site se atualiza automaticamente em 1–2 minutos.




---

🧾 8️⃣ Customizando com domínio próprio (opcional)

Se quiser usar um domínio como meusite.com:

1. Vá em Settings → Pages.


2. Em Custom domain, insira o domínio.


3. Configure o DNS no seu provedor apontando para:

CNAME → yourusername.github.io




---

✅ Resumo final

Etapa	Ação

1	Criar repositório público
2	Adicionar arquivos (HTML, CSS, JS)
3	Ir em Settings → Pages
4	Escolher branch “main / root”
5	Salvar e aguardar o link
6	Acessar o site publicado
7	(Opcional) Configurar domínio próprio



---


# ADICIONANDO COLABORADORES 


Vamos criar um tutorial completo, atualizado e seguro ensinando como adicionar colaboradores (programadores) ao repositório do seu GitHub Pages, permitindo que outras pessoas desenvolvam ou editem o site diretamente no GitHub — com permissões controladas.


---

🧭 TUTORIAL: COMO ADICIONAR COLABORADORES AO SEU SITE NO GITHUB PAGES


---

💡 Objetivo

Dar acesso a outros programadores para que possam editar, atualizar e enviar códigos (HTML, CSS, JS, etc.) no seu repositório do GitHub Pages, mantendo o controle total sobre o projeto.


---

🧩 1️⃣ Pré-requisitos

Antes de começar:

Você precisa ter uma conta no GitHub.

Ter um repositório criado (ex: loja-virtual ou aristidesbp.github.io).

Saber o usuário GitHub de quem você quer adicionar (ex: joaoprogramador).



---

🏗️ 2️⃣ Acesse o repositório do seu site

1. Entre em https://github.com/.


2. Clique no seu repositório do site (ex: aristidesbp/loja-virtual).


3. Você será levado para a tela principal com os arquivos do projeto.




---

⚙️ 3️⃣ Vá até as configurações do repositório

1. Clique em ⚙️ Settings (no canto direito superior).


2. No menu lateral esquerdo, role até encontrar “Collaborators”
(fica dentro da seção Access → Collaborators).




---

🪪 4️⃣ Adicionando o colaborador

1. Clique no botão “Add people”.


2. Na janela que aparece, digite o nome de usuário ou e-mail do GitHub da pessoa que você quer adicionar.


3. Clique no botão “Add” ao lado do nome que aparecer.




---

🧱 5️⃣ Escolhendo o nível de acesso

O GitHub vai perguntar o tipo de permissão que o colaborador terá.
Escolha de acordo com o papel de cada um:

Permissão	O que pode fazer	Indicação

Read	Somente visualizar o código.	Ideal para revisores ou clientes.
Triage	Visualizar + gerenciar issues/pull requests.	Gerentes de projeto.
Write ✅	Criar, editar e enviar arquivos.	Programadores de confiança.
Maintain	Controla configurações de branch e issues.	Líder técnico.
Admin ⚠️	Controle total, inclusive remover você.	Use com cautela.


👉 Normalmente, para desenvolvedores, use Write.

4. Após escolher o nível, clique em “Add to repository”.




---

🔐 6️⃣ Confirmação de convite

O colaborador receberá um convite por e-mail e uma notificação no GitHub.
Ele deve clicar em “Accept Invitation” para ter acesso.

Você pode acompanhar o status em:

Settings → Collaborators → Pending invitations


---

🧱 7️⃣ O que o colaborador poderá fazer

Assim que aceitar o convite, ele poderá:

✅ Clonar o repositório:

git clone https://github.com/aristidesbp/loja-virtual.git

✅ Criar branches, editar e enviar commits:

git add .
git commit -m "Atualização da seção de contato"
git push origin main

✅ Fazer upload direto no navegador:

Clicar em Add file → Upload files

Enviar novos arquivos HTML, CSS, JS

Finalizar com Commit changes



---

🧰 8️⃣ Boas práticas de colaboração

Para evitar conflitos e manter o site estável:

1. Crie branches de desenvolvimento:

Exemplo: dev, melhorias-layout, checkout-api.


git checkout -b dev

Assim o código novo não afeta o site principal até ser revisado.


2. Use Pull Requests (PR):

O colaborador envia o código → você revisa → aprova → publica.

Isso protege o código principal e mantém histórico limpo.



3. Descreva as regras no README.md:

Como organizar pastas.

Como rodar o projeto localmente.

Padrão de commits e branches.





---

🧾 9️⃣ (Opcional) — Revogar acesso

Se quiser remover um colaborador:

1. Vá novamente em Settings → Collaborators.


2. Ao lado do nome da pessoa, clique em Remove access.



Pronto — ela perde acesso imediatamente.


---

✅ Resumo final

Etapa	Ação

1	Entrar no repositório
2	Abrir Settings → Collaborators
3	Clicar em Add people
4	Digitar o nome de usuário GitHub
5	Escolher o nível de permissão
6	Aguardar o colaborador aceitar
7	Colaboradores podem editar e enviar commits



---

💡 Dica bônus: controle de times

Se você pretende ter vários programadores no projeto:

Crie uma organização no GitHub:
https://github.com/account/organizations/new

Adicione todos os devs lá.

Controle permissões por time (frontend, backend, design, etc.).



---






  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
---
# 01
# BUSCANDO UM NICHO E ELABORANDO UM NEGÓCIO COM IA

Neste  tutorial, vamos atacar um nicho de criação de sites e gestão de tráfego pago, utilizaremos o chat GPT com os seguintes prompts abaixo:



# PASSO 1 [APRESENTAÇÃO DA LOJA/SERVIÇÕS]:
```
passo 1: 
[Sou AristidesBP], [Moro em Belém do Pará , Brasil] vou vender na internete [o serviço de criação de sites e gestor de trafego pago] para um público
super exigente. Será uma campanha no Google Ads, logo eu preciso saber as informações 
que vou te passar abaixo.
```
# PASSO 2 [PESQUISAR PUBLICO ALVO (PERSONA)]:
```
passo 2:
Quero saber as  Dores, Desejos, as principais Objeções e as principais Motivações para Compra. 
Traga isso listado por topico de cada pergunta.
```
# PASSO 3 [PALAVRAS CHAVES]:
```
passo 3:
Agora quero criar uma campahna no google ADS paera vender este serviço. Me ajude trazendo as 10 palavras chaves mais usadas para pesquisa no
google, de quem deseja comprar este servoço.
```

# PASSO 4 [FAZER UMA PLANILHA PARA ANALIZAR AS PALAVRAS CHAVES]:
```
passo 4:
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras chaves.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-chave, busca por mês, CPC medio ,Custo do Tráfego, Concorrência, Relação com a solução(intenção de compra,maioria quer comprar,buscando solução,pesquisando o problema),Relação de Intencionalidade (Exclusiva,70%,50%,baixa intencionalidade),Relação site/ palavra chaves.
```

### EXEMPLO:
| Palavra-chave                              | Busca/mês (est.) | CPC médio (R$) | Custo do Tráfego* | Concorrência* | Relação com a solução         | Intencionalidade     | Relação site/palavra |
|--------------------------------------------|------------------|----------------|-------------------|----------------|-------------------------------|-----------------------|-----------------------|
| gestor de tráfego pago                     | 1,000–2,000      | 4,00–6,00      | Alta              | Alta           | Quer contratar                | Exclusiva (80–100%)   | Forte                |
| especialista em tráfego pago               | 800–1,500        | 5,00–7,00      | Alta              | Alta           | Busca solução profissional    | Exclusiva (80–100%)   | Forte                |
| gestor de tráfego para empresas            | 500–1,000        | 5,00–7,50      | Alta              | Média–alta     | Busca serviço B2B             | 70–80%               | Forte                |
| tráfego pago para vendas online            | 600–1,200        | 4,50–6,00      | Média–alta        | Média          | Quer aumentar vendas         | 70–80%               | Forte                |
| consultoria de tráfego pago                | 400–900          | 5,00–8,00      | Alta              | Média–alta     | Quer orientação especializada | Exclusiva (80–100%)   | Forte                |
| gerenciamento de anúncios Google Ads       | 700–1,300        | 4,00–6,50      | Média             | Alta           | Procuram gestão especializada| 50–70%               | Moderada             |
| profissional de tráfego pago               | 300–700          | 4,50–7,00      | Média–alta        | Média          | Quer contratar indivíduo     | 50–70%               | Moderada             |
| tráfego pago para e-commerce              | 500–1,000        | 4,00–6,00      | Média–alta        | Média          | Escalagem vendas online      | 70–80%               | Forte                |
| agência de tráfego pago                    | 600–1,100        | 4,50–7,50      | Alta              | Alta           | Busca empresa especializada  | Exclusiva (80–100%)   | Forte                |
| otimização de campanhas Google Ads         | 400–800          | 3,50–5,50      | Média             | Média          | Busca melhorar campanhas     | 50–70%               | Moderada             |

"PARA CADA PRODUTO UMA CAMPANHA E UMA PAGINA, NÃO FAÇA CAMPANHAS PARA SITE INSTITUCIONAL!"
"NO CONJUNTO DAS PALAVRAS NO MINIMO 10K DE BUSCA MES!"


# PASSO 5 : PALAVRAS NEGATIVAS
```
passo 5:
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras negativas.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-negativas, motivo.
```
## EXEMPLO:
| Palavra-negativa    | Motivo                                                         |
|---------------------|----------------------------------------------------------------|
| grátis              | Usuários buscando soluções sem pagar, sem intenção de compra   |
| tutorial            | Pessoas querendo aprender, não contratar                       |
| curso               | Interesse em aprender tráfego pago, não em contratar gestor    |
| pdf                 | Busca por material gratuito ou informativo                     |
| exemplo             | Usuários querendo modelos ou ideias, não serviços              |
| amostra             | Busca por algo sem custo ou demonstração gratuita               |
| como fazer          | Interesse em executar por conta própria                        |
| ferramenta gratuita | Procurando ferramentas e não serviços profissionais            |
| sem custo           | Busca por alternativas gratuitas                               |
| dicas               | Usuários querendo informações e não serviço pago               |



"GOOGLE ADS É DIFERENTE DO META ADS, ELE TEM UMA HIERARQUIA NA ESTRUTURA DE CAMPANHAS QUE DEVE SER RESPEITADA!"
PARA CADA SOLUÇÃO UMA CAMPANHA.
PARA CADA INTERESSE , DA MESMA SOLUÇÃO UM GRUPO DE ANUNCIOS.

# PASSO 6 [FAZER UMA PLANILHA PARA SERAPARA AS PALAVRAS-CHAVES POR TIPO DE SOLUÇÃO E INTERESSE]:
```
passo 6:
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras-chaves.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-chaves, tipo de solução, interesse.
```
## EXEMPLO:
| Palavra-chave                        | Tipo de Solução                     | Interesse                              |
|--------------------------------------|--------------------------------------|----------------------------------------|
| gestor de tráfego pago               | Serviço profissional                 | Alta intenção de contratação          |
| especialista em tráfego pago         | Serviço profissional                 | Alta intenção de contratação          |
| consultoria de tráfego pago          | Consultoria e estratégia             | Média-alta intenção                    |
| tráfego pago para e-commerce         | Solução para e-commerce              | Média intenção                         |
| gerenciamento de anúncios Google Ads| Gestão de campanhas Google Ads       | Alta intenção de contratação          |
| agência de tráfego pago              | Agência especializada                | Alta intenção de contratação          |
| profissional de tráfego pago         | Serviço individual                   | Média intenção                         |
| tráfego pago para vendas online      | Solução para aumento de vendas       | Média intenção                         |
| otimização de campanhas Google Ads   | Serviço de otimização                | Média intenção                         |
| tráfego pago para empresas           | Solução B2B                          | Média-alta intenção                    |

# PASSO 7: UM ANUNCIO BEM FEITO E QUASE GRARANTIA DE VENDAS!!
```
passo 7:
  Com base nas pesquisas realizadas , faça um anuncio com 4 tituloas (no maximo 30 caracteres cada um) e 2 descrições (com no maximo 90 caracteres cada uma).

## PARA CADA SOLUÇÃO UMA CAMPANHA.
## PARA CADA INTERESSE , DA MESMA SOLUÇÃO UM GRUPO DE ANUNCIOS.
## "NO CONJUNTO DAS PALAVRAS-CHAVES NO MINIMO 10K DE BUSCA MES!"

```

# PASSO 8: ESCOLHENDO  INFORMAÇÕES:
```
passo 8:
Quais são as principais informações, dentro do que você pesquisou sobre esta persona, que se esta persona souber ela compra de mim?
Liste da mais importante para a menus importante.

```

# PASSO 9: CRIAR NOME E LOGO DA EMPRESA
```
passo 9:
Faça a sugestão de 10 nomes para minha empresa, me apresente ela de formas numeradas para eu poder te responder qual eu escolho.

Com base na minha escolha, faça uma logo.png 

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
---
# 02
# CRIANDO UMA COPY/SITE/LOJA COM IA:
---

```
Abaixo vou te passar um código para que você substitua as informações que tem nele, pelas informações que precisamos.
O objetivo é usar o código como base para criar nosso site.

```

## VENDA DE SERVIÇOS 
```<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Criação de Sites & Tráfego Pago – AristidesBP</title>
<meta name="description" content="Aumente suas vendas com um site profissional e campanhas de tráfego pago otimizadas.">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Gemunu+Libre:wght@200&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    :root {
      --primary: #f97316;
      --dark: #1a1a1a;
      --light: #f5f5f5;
      --gray: #777;
    }
    * { margin:0; padding:0; box-sizing:border-box; font-family:'DM Sans', sans-serif; }
    body { background:var(--light); color:var(--dark); line-height:1.6; overflow-x:hidden; }
    nav { position:fixed; top:0; width:100%; background:#fff; box-shadow:0 2px 5px rgba(0,0,0,0.1); z-index:1000; display:flex; justify-content:space-between; align-items:center; padding:10px 30px; }
    nav h2 { color:var(--primary); font-size:1.2rem; }
    nav ul { list-style:none; display:flex; gap:20px; }
    nav ul li a { text-decoration:none; color:var(--dark); font-weight:600; }
  
  

header { background:linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/header.jpg') center/cover no-repeat; color:#fff; text-align:center; padding:120px 20px; }
   
header h1 { font-size:3rem; margin-bottom:10px; }
    header p { font-size:1.2rem; margin-bottom:20px; }
    header a { background:var(--primary); color:#fff; padding:12px 30px; text-decoration:none; border-radius:30px; font-weight:600; }
    


section { padding:80px 20px; text-align:center; }
    .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:20px; margin-top:40px; }
    .card { background:#fff; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
    .card h3 { color:var(--primary); margin-bottom:15px; }
    .card img { width:100%; border-radius:10px; margin-bottom:15px; }
    .contact form { max-width:600px; margin:auto; display:flex; flex-direction:column; gap:15px; }
    .contact input,.contact textarea,.contact select { padding:15px; border:1px solid #ddd; border-radius:5px; font-size:1rem; }
    .contact button { background:var(--primary); color:#fff; padding:15px; border:none; border-radius:30px; font-weight:600; cursor:pointer; }
    footer { background:var(--dark); color:#fff; text-align:center; padding:20px; margin-top:40px; }
    footer a { color:#fff; text-decoration:none; margin:0 10px; }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav>
    <h2>AristidesBP</h2>
    <ul>
      <li><a href="#about">Sobre</a></li>
      <li><a href="#services">Serviços</a></li>
      <li><a href="#contact">Contato</a></li>
    </ul>
  </nav>

  <!-- HEADER -->
  <header>
    <h1>Transforme seu Negócio Online!</h1>
    <p>Sites profissionais + campanhas de tráfego pago que geram vendas reais.</p>
    <a href="#contact">Quero Meu Site Agora</a>
  </header>

  <!-- SOBRE -->
  <section id="about">
    <h2>Por Que Escolher AristidesBP?</h2>
    <p>Profissional especializado em criação de sites que convertem e gestão de tráfego pago para empresas exigentes. Resultados reais, transparência e suporte próximo.</p>
 
<!-- CARDS --> 
<div class="cards">
     
<!-- CARD01 --> 
<div class="card">
<img src="img/card01.jpg" alt="Resultados">
<h3>Resultados Garantidos</h3>
<p>Sites que vendem e campanhas de ads otimizadas para gerar ROI real.</p>
</div>
 
<!-- CARD02 -->
<div class="card">
<img src="img/card02.jpg" alt="Profissionalismo">
<h3>Profissionalismo</h3>
<p>Mais de 10 anos de experiência, portfólio de clientes satisfeitos.</p>
      </div>
      
<!-- CARD03 -->
<div class="card">
        <img src="img/card03" alt="Suporte">
        <h3>Suporte Personalizado</h3>
        <p>Acompanhamento próximo, ajustes estratégicos e relatórios claros.</p>
      </div>
      
<!-- CARD04 -->
<div class="card">
        <img src="img/CARD04.jpg" alt="Exclusividade">
        <h3>Exclusividade</h3>
        <p>Projetos sob medida, alinhados com o posicionamento da sua empresa.</p>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS -->
  <section id="services">
    <h2>Serviços</h2>
    <div class="cards">
     
<!-- CARD05 -->
 <div class="card">
        <img src="img/card05.jpg" alt="Sites Profissionais">
        <h3>Criação de Sites Profissionais</h3>
        <p>Design moderno, responsivo e otimizado para conversão de clientes.</p>
      </div>

<!-- CARD06 -->
      <div class="card">
        <img src="img/CARD06.jpg" alt="Tráfego Pago">
        <h3>Gestão de Tráfego Pago</h3>
        <p>Campanhas no Google Ads e redes sociais, maximizando resultados.</p>
      </div>

<!-- CARD07 -->
      <div class="card">
        <img src="img/card07.jpg" alt="Consultoria">
        <h3>Consultoria Estratégica</h3>
        <p>Planejamento e análise de resultados para escalar seu negócio online.</p>
      </div>
    </div>
  </section>

<!-- VÍDEO -->
<section id="video">
  <h2>Assista Nosso Vídeo</h2>
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      title="Vídeo Institucional" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</section>

<style>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  margin: 20px auto;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
  <!-- FORMULÁRIO / CONTRATO -->
  <section id="contact" class="contact">
    <h2>Contrato de Prestação de Serviços</h2>
    <p>Ao enviar o formulário você aceita a prestação do serviço de criação de site + gestão de tráfego pago. Será gerado o custo de <strong>R$50,00</strong> para visita técnica e relatório do projeto.</p>
    <form id="contact-form">
      <input type="text" id="nome" placeholder="Nome Completo" required>
      <input type="email" id="email" placeholder="Email" required>
      <input type="tel" id="telefone" placeholder="Telefone" required>
      <textarea id="mensagem" rows="5" placeholder="Descrição do Projeto / Informações adicionais" required></textarea>
      <label><input type="checkbox" id="aceite" required> Aceito os termos e condições do contrato e autorizo o pagamento de R$50,00 para visita técnica.</label>
      <button type="submit">Enviar para WhatsApp e Confirmar Contrato</button>
    </form>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>Contatos e Redes Sociais</p>
    <p>WhatsApp: <a href="https://wa.me/5591992420981" target="_blank">+55 91 99242-0981</a> | Email: contato@aristidesbp.com</p>
    <p>
      <a href="#" target="_blank">Facebook</a> | 
      <a href="#" target="_blank">Instagram</a> | 
      <a href="#" target="_blank">LinkedIn</a>
    </p>
    <p>&copy; 2025 AristidesBP. Todos os direitos reservados.</p>
  </footer>

  <!-- ===== JAVASCRIPT ===== -->
  <script>
    // Função para enviar formulário para WhatsApp
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const mensagem = document.getElementById("mensagem").value;
      const aceite = document.getElementById("aceite").checked;

      if(!aceite){
        alert("Você precisa aceitar os termos do contrato para continuar.");
        return;
      }

      const texto = `*Contrato de Prestação de Serviços*%0A
Nome: ${nome}%0A
Email: ${email}%0A
Telefone: ${telefone}%0A
Mensagem: ${mensagem}%0A
Aceite dos Termos: Sim%0A
Custo Visita Técnica: R$50,00`;

      // Abre WhatsApp no número fornecido
      window.open(`https://wa.me/5591992420981?text=${texto}`, "_blank");

      alert("Formulário enviado! Aguarde nosso contato via WhatsApp.");
      form.reset();
    });
  </script>
</body>
</html>

```
## HTML BASICO MODULAR
```
<!DOCTYPE html>
<html lang="pt-BR"> 
<head>

<!-- ✅ Estrutura básica  -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title> TÍTULO DA PÁGINA </title>

<link rel="stylesheet" href="css/index.css">
<!-- ✅ Estrutura SEO  -->
</head>
<body> 

<!-- ✅ Navbar  -->
<nav id="componente-Navbar" role="navigation" aria-label="Menu de navegação principal">
</nav>
<script src="assets/js/navbar.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarNavbar);</script>


<!-- ✅ Admin (após inserir a senha, o ADM cria e cadastra todas as sessões, de forma dinâmica utilizando banco de dados indexddb, base64 e Json) -->
<section id="componente-admin" aria-label="Chamada de ação principal"></section>
<script src="assets/js/admin.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarAdmin);</script>



<!-- ✅ Header (promoções e propaganda) -->
<header id="componente-Header" role="banner" aria-label="Cabeçalho principal"></header>
<script src="assets/js/header.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarHeader);</script>

<main>

<!-- ✅ Catálogo de Produtos dinamico -->
<section id="componente-produtos" aria-label="Produtos oferecidos"></section>
<script src="assets/js/produtos.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarProdutos);</script>

<!-- ✅ formulário de pedido no whatsapp  -->
<!-- O formulário recebe os produtos e quantidades selecionadas acima, fazendo o serviço de check-out e pagamento, depois enviando o pedido para o WhatsApp  -->
<section id="componente-Fpedidos" aria-label="Produtos oferecidos"></section>
<script src="assets/js/fpedidos.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarCardapioFpedidos);</script>
 
  
<!-- ✅ Serviços e Eventos  -->
<section id="componente-servicos" aria-label="Serviços oferecidos"></section>
<script src="assets/js/servicos.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarServicos);</script>

<!-- ✅ Hero  -->
<section id="componente-hero" aria-label="Chamada de ação principal"></section>
<script src="assets/js/hero.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarHero);</script>

<!-- ✅ Sobre  -->
<section id="componente-sobre" aria-label="Seção institucional sobre Aristides Barbosa Pontes"></section>
<script src="js/sobre.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarSobre);</script>
    
</main>

<!-- ✅ Footer -->
<footer id="footer-container" role="contentinfo" aria-label="Rodapé do site"></footer>
<script src="assets/js/footer.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarFooter);</script>



  <!-- 🔧 Bibliotecas js externas e principais -->
  <!-- 🧠 Prompt: Importe bibliotecas modernas que melhorem animações e interação. Scripts devem ser carregados no final para performance. Use defer e async quando necessário. -->
  <script src="https://unpkg.com/scrollreveal" defer></script> <!-- Efeitos de scroll reveal -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>

  <!-- 🧠 Prompt: Carregue o script principal do site com type="module" para suportar import/export. Use defer para não bloquear renderização. -->
  <script src="assets/js/site-mvc-main.js" type="module" defer></script>
  <script src="js/index.js" defer></script>
</body>
</html>


```
## Modular com Seo 
```
<!DOCTYPE html>
<html lang="pt-BR"> 
<head>
  
<!-- ✅ Google Tag Manager -->
<!-- End Google Tag Manager -->
  
  <!-- ✅ Estrutura básica com foco em SEO, performance e compartilhamento social -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Aristides Barbosa Pontes // Portfólio</title>

  <!-- ✅ SEO para posicionamento no Google (palavras chaves/keywords)-->
  <meta name="description" content="Sou Aristides Barbosa Pontes, desenvolvedor front-end e gestor de tráfego pago. Estratégias de marketing digital que funcionam.">
  <meta name="author" content=" Aristides Barbosa Pontes - Portfólio ">
  <meta name="keywords" content=" Portfólio profissional, Aristides Barbosa Pontes, Analista de Sistemas, desenvolvedor, front-end, Gestor de Tráfego, Tráfego pago, Marketing digital, programador web, Desenvolvimento web, sites profissionais, programador ">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://aristidesbp.github.io/" /> 
  

  <!-- ✅ Compartilhamento em redes sociais (Open Graph & Twitter Card) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://aristidesbp.github.io/">
  <meta property="og:title" content="Portfólio de Aristides Barbosa Pontes – Dev Front-End e Gestor de Tráfego">
  <meta property="og:description" content="Conheça os projetos e estratégias digitais de Aristides Barbosa Pontes, especialista em desenvolvimento web e tráfego pago.">
  <meta property="og:image" content="https://aristidesbp.github.io/img/Aristidesbp.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Portfólio de Aristides Barbosa Pontes – Dev & Tráfego Pago">
  <meta name="twitter:description" content="Confira meus projetos e estratégias como desenvolvedor front-end e gestor de tráfego.">
  <meta name="twitter:image" content="https://aristidesbp.github.io/img/Aristidesbp.png">
  <meta name="twitter:site" content="@aristidesbp">

  <!--  ✅ PWA e Favicon -->
  <link rel="manifest" href="json/site-mvc-manifest.json">
  <link rel="icon" href="icons/favicon.png" type="image/x-icon"/>

  <!--  ✅ Fonts & CSS -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Gemunu+Libre:wght@200&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/index.css">
</head>

<body>
  
<!--  ✅ Google Tag Manager (noscript) -->
<!-- End Google Tag Manager (noscript) -->


<header id="componente-Header" role="banner" aria-label="Cabeçalho principal"></header>
<script src="js/header.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarHeader);</script>

<nav id="componente-Navbar" role="navigation" aria-label="Menu de navegação principal"></nav>
<script src="js/navbar.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarNavbar);</script>

<main>

<section id="componente-sobre" aria-label="Seção institucional sobre Aristides Barbosa Pontes"></section>
<script src="js/sobre.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarSobre);</script>
    
<section id="componente-servicos" aria-label="Serviços oferecidos"></section>
<script src="js/servicos.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarServicos);</script>

<section id="componente-hero" aria-label="Chamada de ação principal"></section>
<script src="js/hero.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarHero);</script>
    
</main>

<footer id="footer-container" role="contentinfo" aria-label="Rodapé do site"></footer>
<script src="js/footer.js"></script>
<script>document.addEventListener('DOMContentLoaded', criarFooter);</script>



  <!-- 🔧 Bibliotecas js externas e principais -->
  <!-- 🧠 Prompt: Importe bibliotecas modernas que melhorem animações e interação. Scripts devem ser carregados no final para performance. Use defer e async quando necessário. -->
  <script src="https://unpkg.com/scrollreveal" defer></script> <!-- Efeitos de scroll reveal -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>

  <!-- 🧠 Prompt: Carregue o script principal do site com type="module" para suportar import/export. Use defer para não bloquear renderização. -->
  <script src="js/site-mvc-main.js" type="module" defer></script>
  <script src="js/index.js" defer></script>
</body>
</html>


```

## CARDÁPIO LANCHONETE 
```

<!DOCTYPE html>
<html lang="pt-br" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Delivery - Aristidesbp</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="assets/css/delivery.css" />
</head>

<body class="bg-[var(--bege-claro)] text-[var(--preto-quadro)] font-sans">

  <!-- Cabeçalho -->
  <header class="bg-[var(--vermelho-telha)] text-white py-6 shadow-lg text-center">
  <img src="assets/img/barraquinha-lanche.jpg" alt="Barraquinha" class="w-full h-64 object-cover rounded-b-xl shadow-lg" />
  <h1 class="text-4xl font-bold mt-4">Tapioca da Maria</h1>
  <p class="text-lg">Seu lanche artesanal favorito!</p>

  <!-- Filtro -->
  <div class="mt-4">
    <select id="filtroCategoria" class="filtro-categoria">
      <option value="todos">Todos</option>
      <option value="lanches">Lanches</option>
      <option value="bebidas">Bebidas</option>
      <option value="sobremesas">Sobremesas</option>
    </select>
  </div>
</header>

  <!-- Cardápio -->
  <section class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6 text-[var(--marrom-madeira)]">Nosso Cardápio</h2>
    <div id="menu" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
  </section>

  <!-- Pedido -->
  <section class="bg-[var(--preto-quadro)] text-white py-8 px-4">
    <div class="container mx-auto">
      <p class="text-lg font-bold mb-4">
        Total do pedido: R$ <span id="total">0,00</span>
      </p>

      <div id="itens-pedido" class="mb-6 max-h-48 overflow-y-auto bg-gray-800 p-4 rounded text-white space-y-2"></div>

      <h2 class="text-2xl font-bold mb-4">Finalizar Pedido</h2>

      <form id="pedido-form" class="space-y-4">
        <input type="text" id="nome" placeholder="Nome Completo" class="campo" required />
        <input type="text" id="cpf" placeholder="CPF" class="campo" required />
        <input type="tel" id="telefone" placeholder="Telefone" class="campo" required />
        <input type="text" id="endereco" placeholder="Endereço Completo" class="campo" required />

        <select id="formaPagamento" class="campo" required>
          <option value="" disabled selected>Forma de Pagamento</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Cartão de Débito">Cartão de Débito</option>
          <option value="Pix">Pix</option>
          <option value="Transferência">Transferência</option>
        </select>

        <textarea id="obs" placeholder="Observações" class="campo" rows="3"></textarea>

        <button type="submit" class="botao">Enviar pedido via WhatsApp</button>
      </form>
    </div>
  </section>

  <script src="assets/js/delivery.js"></script>
</body>
</html>

```
## CONTROLE DE ENTREGAS 
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Entregas</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-4">
  <div class="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Cadastro de Entrega</h2>
    <form id="formulario" class="space-y-4">
      <input type="hidden" id="indexEdicao" value="-1" />
      <div><label>Código da Venda</label><input id="codigo" required class="w-full border rounded px-3 py-2" /></div>
      <div><label>Nome do Cliente</label><input id="nome" required class="w-full border rounded px-3 py-2" /></div>
      <div><label>Endereço</label><input id="endereco" required class="w-full border rounded px-3 py-2" /></div>
      <div><label>Bairro</label><input id="bairro" required class="w-full border rounded px-3 py-2" /></div>
      <div><label>Valor (R$)</label><input id="valor" type="number" step="0.01" required class="w-full border rounded px-3 py-2" /></div>
      <div><label>Observação</label><textarea id="observacao" class="w-full border rounded px-3 py-2"></textarea></div>
      <div><label>Foto da Nota</label><input id="foto" type="file" accept="image/*" capture="environment" class="w-full" /></div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Salvar</button>
    </form>
  </div>

  <div class="max-w-xl mx-auto mt-6 bg-white shadow rounded-xl p-4">
    <h3 class="text-xl font-bold mb-3">Entregas</h3>
    <ul id="lista" class="space-y-3"></ul>
  </div>

  <script>
    const form = document.getElementById("formulario");
    const lista = document.getElementById("lista");
    const campos = ["codigo", "nome", "endereco", "bairro", "valor", "observacao"];

    function getEntregas() {
      return JSON.parse(localStorage.getItem("entregas") || "[]");
    }

    function salvarEntregas(dados) {
      localStorage.setItem("entregas", JSON.stringify(dados));
    }

    function renderizarLista() {
      let entregas = getEntregas();

      // Ordenação
      entregas.sort((a, b) => {
        const ba = a.bairro.toLowerCase(), bb = b.bairro.toLowerCase();
        if (ba < bb) return -1;
        if (ba > bb) return 1;
        const ea = a.endereco.toLowerCase(), eb = b.endereco.toLowerCase();
        return ea.localeCompare(eb);
      });

      lista.innerHTML = "";
      entregas.forEach((e, i) => {
        const enderecoCompleto = encodeURIComponent(`${e.endereco}, ${e.bairro}`);
        const status = e.status || "Pendente";
        const corStatus = {
          "Pendente": "bg-yellow-400",
          "Entregue": "bg-green-500",
          "Problema": "bg-red-500"
        }[status];

        const imgTag = e.foto ? `<img src="${e.foto}" class="mt-2 w-32 rounded border" />` : "";

        const obs = e.status === "Problema" && e.observacao ? `<p class="text-sm text-red-700">Obs: ${e.observacao}</p>` : "";

        const li = document.createElement("li");
        li.className = "p-3 border rounded bg-gray-50";
        li.innerHTML = `
          <div class="flex justify-between items-center">
            <div>
              <strong>${e.codigo}</strong> - ${e.nome}<br>
              ${e.endereco}, ${e.bairro} - R$ ${parseFloat(e.valor).toFixed(2)}
              ${obs}
              ${imgTag}
            </div>
            <div class="flex flex-col gap-1 text-right">
              <a href="https://www.google.com/maps/search/?api=1&query=${enderecoCompleto}" target="_blank"
                 class="text-green-600 hover:underline">Ver no mapa</a>
              <button onclick="trocarStatus(${i})" class="text-white text-xs px-2 py-1 rounded ${corStatus}">${status}</button>
              <button onclick="editar(${i})" class="text-blue-600 hover:underline text-sm">Editar</button>
              <button onclick="excluir(${i})" class="text-red-600 hover:underline text-sm">Excluir</button>
            </div>
          </div>
        `;
        lista.appendChild(li);
      });
    }

    function trocarStatus(index) {
      const entregas = getEntregas();
      const atual = entregas[index].status || "Pendente";
      const proximo = atual === "Pendente" ? "Entregue" : atual === "Entregue" ? "Problema" : "Pendente";
      entregas[index].status = proximo;
      salvarEntregas(entregas);
      renderizarLista();
    }

    function editar(index) {
      const e = getEntregas()[index];
      campos.forEach(c => document.getElementById(c).value = e[c] || "");
      document.getElementById("indexEdicao").value = index;
    }

    function excluir(index) {
      const entregas = getEntregas();
      entregas.splice(index, 1);
      salvarEntregas(entregas);
      renderizarLista();
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const entregas = getEntregas();
      const novo = {};
      campos.forEach(c => novo[c] = document.getElementById(c).value);
      novo.status = novo.status || "Pendente";

      const fotoInput = document.getElementById("foto");
      if (fotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
          novo.foto = event.target.result;
          salvarDados(novo);
        };
        reader.readAsDataURL(fotoInput.files[0]);
      } else {
        salvarDados(novo);
      }

      function salvarDados(novo) {
        const idx = parseInt(document.getElementById("indexEdicao").value);
        if (idx >= 0) {
          entregas[idx] = novo;
          document.getElementById("indexEdicao").value = -1;
        } else {
          entregas.push(novo);
        }
        salvarEntregas(entregas);
        form.reset();
        renderizarLista();
      }
    });

    renderizarLista();
  </script>
</body>
</html>
```

# BONUS 
## VALIDAR AS PALAVRAS CHAVES:
#### ACESSAR A CONTA DO GOOGLE ADS:
https://ads.google.com
#### PESQUISAR POR : 
```
Planejador de palavra-chave
```
#### EM [DESCOBRIR NOVAS PALAVRAS CHAVES], COLE OS RESULTADOS DA IA, UMA POR VEZ!
#### APERTE EM BUSCAR E SELECIONE A REGIÃO.
# IA MANUS [https://manus.im/app]
```
Eu quero criar um anúncio no Google para o meu serviço de [Trafego pago].Eu quero que voçe faça essa busca no Google, algumas vezes, e anlize todos os anuncios que vão aparecer.

A partir disso quero que voçe crie 5 ideias de anuncio, no mesmo formato que vai encontrar.Traga ideias de acordo com os prinscipais gatilhos que voçe encontrar.

E, além disso, crie um site navegavel com todos os insights do que vc encontrar nessa pesquisa.
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 03
🟥🟥🟥🟥🟥🟥🟥
---
# 04
# MINI CURSO HTML, CSS E JAVASCRIPT:


Perfeito! Vamos criar um mini curso completo e didático, usando os seus três códigos como exemplos. Vou organizar de forma clara, com explicações passo a passo, trechos de código e conceitos importantes.


---

Mini Curso: HTML, CSS e JavaScript na Prática

Este mini curso vai ensinar o básico e avançado necessário para criar páginas web interativas como as que você recebeu, incluindo armazenamento local e manipulação de dados.


---

1. Estrutura Básica de HTML

HTML é a linguagem de marcação usada para estruturar páginas web. Cada página começa com a estrutura básica:
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Página</title>
</head>
<body>
  <h1>Olá Mundo!</h1>
</body>
</html>
```
```<head>```: Configurações da página, título, links de CSS e metadados.

```<body>```: Conteúdo visível, como textos, imagens, formulários, vídeos.


Exemplo real do seu código:

```
<header>
  <h1>Transforme seu Negócio Online!</h1>
  <p>Sites profissionais + campanhas de tráfego pago que geram vendas reais.</p>
  <a href="#contact">Quero Meu Site Agora</a>
</header>
```
Aqui, ```<header>``` define a área inicial da página (hero), com título, descrição e botão.


---

2. Estilizando com CSS

CSS é usado para dar estilo visual às páginas: cores, fontes, tamanhos e layouts. Pode ser interno (<style>), externo (```<link>```), ou inline (direto no elemento).

Exemplo do seu código:
```
header {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('img/header.jpg') center/cover no-repeat;
  color: #fff;
  text-align: center;
  padding: 120px 20px;
}
header h1 { font-size: 3rem; margin-bottom: 10px; }
header a {
  background: #f97316;
  color: #fff;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
}

background: imagem de fundo + gradiente

text-align: centraliza o texto

padding: espaço interno

border-radius: cantos arredondados


TailwindCSS (como no delivery) é uma forma de escrever CSS direto no HTML usando classes utilitárias:

<h1 class="text-4xl font-bold mt-4">Tapioca da Maria</h1>

text-4xl: tamanho da fonte

font-bold: negrito

mt-4: margem superior

```

---

3. Interatividade com JavaScript

JavaScript permite que páginas respondam a ações do usuário, como cliques e envios de formulário.

Exemplo: envio de formulário para WhatsApp (seu código de contrato):
```
const form = document.getElementById("contact-form");
form.addEventListener("submit", function(e) {
  e.preventDefault(); // evita recarregar a página

  const nome = document.getElementById("nome").value;
  const mensagem = document.getElementById("mensagem").value;

  const texto = `*Contrato*%0ANome: ${nome}%0AMensagem: ${mensagem}`;
  window.open(`https://wa.me/5591992420981?text=${texto}`, "_blank");
});

addEventListener: escuta eventos (como submit)

e.preventDefault(): evita comportamento padrão do navegador

window.open: abre link, neste caso o WhatsApp
```


---

4. Armazenamento de Dados Local

LocalStorage

Armazena dados simples no navegador, que permanecem mesmo após fechar a página.

Limite: ~5MB por site.

Útil para salvar listas, preferências e pequenos dados.


Exemplo do cadastro de entregas:
```
function getEntregas() {
  return JSON.parse(localStorage.getItem("entregas") || "[]");
}

function salvarEntregas(dados) {
  localStorage.setItem("entregas", JSON.stringify(dados));
}

JSON.stringify: converte objeto JavaScript em texto

JSON.parse: transforma texto em objeto novamente
```


---

IndexedDB

Banco de dados local mais poderoso que o localStorage
Permite armazenar objetos complexos, grandes arquivos e imagens
Funciona de forma assíncrona Ideal para apps offline ou delivery com fotos


Uso sugerido: você poderia salvar os pedidos e fotos em IndexedDB em vez de LocalStorage para mais segurança.


---

Base64

Forma de codificar arquivos binários (como imagens) em texto

Permite salvar imagens diretamente em LocalStorage

Exemplo no cadastro de entrega:

```
const reader = new FileReader();
reader.onload = function (event) {
  novo.foto = event.target.result; // aqui a imagem vira Base64
}
reader.readAsDataURL(fotoInput.files[0]);

novo.foto agora contém a imagem codificada em Base64 e pode ser exibida em <img src="...">
```


---

5. Criando Cards e Listas Dinâmicas

Exemplo do seu delivery:
```
const menu = [
  { nome: "Tapioca", preco: 8 },
  { nome: "Suco Natural", preco: 5 }
];

menu.forEach(item => {
  const div = document.createElement("div");
  div.innerHTML = `<h3>${item.nome}</h3><p>R$ ${item.preco}</p>`;
  document.getElementById("menu").appendChild(div);
});
```

Cria elementos dinamicamente

Permite atualizar conteúdo sem recarregar a página


Exemplo do gerenciamento de entregas:
```
entregas.forEach((e, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${e.nome}</strong> - ${e.endereco}`;
  lista.appendChild(li);
});
```

---

6. Formulários e Validação

Formulários permitem capturar informações do usuário. Sempre valide campos obrigatórios:
```
<input type="text" id="nome" required placeholder="Nome Completo">

if(!aceite) {
  alert("Aceite os termos para continuar");
  return;
}
```
required no HTML garante que o campo não fique vazio

JavaScript permite validações personalizadas



---

7. Trabalhando com Vídeos e Imagens Responsivas

Para vídeos do YouTube responsivos:

```
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```
Para imagens responsivas:

```
<img src="img/card01.jpg" alt="Resultados" style="width:100%; border-radius:10px;">
```

---

8. Resumo do Projeto

Projeto 1: Site + tráfego pago

HTML: Estrutura de página

CSS: Estilo profissional

JS: Formulário envia contrato para WhatsApp


Projeto 2: Delivery

HTML/Tailwind: Cardápio e filtros

JS: Pedido via WhatsApp


Projeto 3: Cadastro de entregas

HTML/Tailwind: Formulário de entrega

JS: Lista de entregas, status, fotos

LocalStorage/Base64: armazenam dados e fotos

Possível upgrade: IndexedDB para dados maiores




---

9. Próximos Passos para o Cliente

1. Praticar alterando textos, imagens e cores.


2. Criar novos cards e elementos dinâmicos.


3. Testar envio de formulários via WhatsApp.


4. Experimentar armazenar novos dados no LocalStorage e Base64.


5. Aprender IndexedDB para dados maiores.




# LOCALSTORAGE VS IndexedDB


---

🧱 localStorage

Armazena textos simples (strings).

Ideal para dados pequenos (configurações, preferências, listas curtas).

Limite médio: 5 MB por domínio.

É síncrono → pode travar a página se gravar muito.

Usa localStorage.setItem() e getItem().

Exemplo:

localStorage.setItem("nome", "Usuário");
console.log(localStorage.getItem("nome"));



---

🗄️ IndexedDB

Armazena grandes volumes de dados (até centenas de MB).

Aceita objetos complexos, imagens, arrays etc.

É assíncrono → não trava a página.

Funciona como um banco de dados real, com tabelas (“object stores”), índices e transações.

Ideal para aplicativos offline e sistemas grandes.

Exemplo básico:

const request = indexedDB.open("meuBanco", 1);
request.onsuccess = () => console.log("Banco aberto!");



---

📊 Resumo rápido:

Recurso	localStorage	IndexedDB

Tipo	Texto simples	Estrutura de banco de dados
Tamanho	~5 MB	Muito maior (depende do navegador)
Velocidade	Simples, mas pode travar	Rápido e assíncrono
Complexidade	Muito fácil	Mais complexo
Ideal para	Configurações, cache leve	Apps offline, dados grandes





---

✅ 1. Por que o botão não funcionou no celular

No Android, o Google Chrome Mobile não permite que o comando
indexedDB.databases() funcione — ele é bloqueado por segurança.
Por isso a página não mostra nada.
Mas o localStorage continua funcionando normalmente, só não dá para listar via script.


---

✅ 2. Como ver e apagar o armazenamento direto pelo Chrome (sem PC)

🔹 Passo a passo:

1. Abra o Chrome no seu celular.


2. Toque nos três pontinhos (⋮) no canto superior direito.


3. Vá em Configurações → Privacidade e segurança → Limpar dados de navegação.


4. Marque "Cookies e dados do site" e "Imagens e arquivos armazenados em cache".
→ Isso apaga tudo (inclusive localStorage e IndexedDB).


5. Toque em “Limpar dados”.



⚠️ Dica:
Se quiser apagar só um site específico (sem apagar tudo):

1. Abra o site que você quer limpar.


2. Toque nos três pontinhos → “Informações do site” → “Limpar e redefinir”.
→ Isso apaga o localStorage só daquele site.




---

✅ 3. Para ver quanto espaço o navegador está usando:

1. No Chrome, digite na barra:

chrome://settings/siteData


2. Toque em Enter.


3. Lá aparecem todos os sites com armazenamento (inclui localStorage, IndexedDB etc).


4. Você pode tocar em “Remover” em cada um.




---

✅ 4. Alternativa com código simples (só pra ver tamanho usado):

Crie um arquivo HTML com o código abaixo e abra no celular:

<!DOCTYPE html>
<html>
<body>
<h3>Ver uso de armazenamento</h3>
<p id="info"></p>
<script>
navigator.storage.estimate().then(info => {
  const usado = (info.usage / 1024 / 1024).toFixed(2);
  const limite = (info.quota / 1024 / 1024).toFixed(2);
  document.getElementById("info").innerText =
    `Armazenamento usado: ${usado} MB / Limite: ${limite} MB`;
});
</script>
</body>
</html>

👉 Esse mostra quanto espaço total seu navegador está usando e o limite máximo.











🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
---
# 05
# TERMUX
---
  É possível programar pelo site do Github, mas 
caso você queira trabalhar diretamente pelo celular
de forma local aconselho você usar o TERMUX 
juntamente com o gerenciador de arquivos que 
permita edição, recomendo o F AQUIVOS. 


Acesse o link oficial (não use da Play Store):
faça o download do aplicativo direto no github
https://github.com/termux/termux-app/releases

```
pkg update && pkg upgrade -y 
# comando utilizado para atualizar o Termux
```
```
termux-setup-storage
# comando usado para permitir acesso às pastas internas do Android
```
```
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
# instala ferramentas básicas para programar e conectar ao GitHub
```


---
# COMANDOS BASICOS DO TERMUX 
---

```
# isto é um comentário utilizado para explicações
```
```
ls 
# O comando acima, mostrar conteudo da pasta
```
``` 
ls -a
# para mostrar conteudo o culto da pasta
```
```  
mkdir repositorios_git 
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
cd repositorios_git 
# vai para dentro da pasta repositorios_git
```
``` 
cd .. 
# volta para pasta anterior
```
``` 
rm -rf teste.txt 
# apagar pasta/arquivo
```
``` 
clear 
# usado para limpar a tela
```







---

# GIT-GITHUB 
---
  
```
git --help
# usado para procurar comandos git
```
```
git <comando> --help
# pesquise por comando especifico :
```             
```git init
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
```
```
git config --global --add safe.directory "$(pwd)"
# Configurar a pasta como segura (evita erros de segurança)                               
```
```git config --list
# Lista todas as configurações ativas 
```
```
git config --global user.name "Seu Nome"
# Configurar nome de usuário
```
```
git config --global user.email "seu@email.com"
# Configurar email do GitHub
```
```
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
# Iniciar o agente ssh
```
```
ssh-keygen -t ed25519 -C "seu@email.com"
#Gerar nova chave SSH (caso ainda não tenha)
```
```
cat ~/.ssh/id_ed25519.pub
# Mostrar a chave pública para adicionar no GitHub
```
```
git remote set-url origin git@github.com:usuario/repositorio.git
# Troque a URL remota para usar SSH
```
```
ssh -T git@github.com
## 🧪 Teste de conexão com GitHub via SSH 
### Se tudo estiver certo, você verá:
### Hi SEU_USUARIO! You've successfully authenticated..
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



---
# Clonando um repositório do GitHub
---
 
```
git clone git@github.com:usuario/repositorio.git
## Clona o repositório com chave SSH
```
```
cd nome_do_reposito_clonado
## entra na pasta do repositório 
```
```
git config --global --add safe.directory "$(pwd)"```
## Configurar a pasta como segura (evita erros de segurança)   
```
```
git remote -v
## Mostra os repositórios remotos configurados
## git@github.com:usuario/repositorio.git (fetch).Mostra a URL SSH usada para buscar (fetch) atualizações do repositório remoto. Ou seja, de onde você pode baixar mudanças do GitHub para o seu computador.
## git@github.com:usuario/repositorio.git (push).Mostra a URL SSH usada para enviar (push) suas mudanças locais para o repositório no GitHub.
```
```
git fetch
## Busca atualizações sem aplicar
```
```
git pull origin main
## Sincroniza com o repositório remoto (branch main)
``` 



---
# BRANCHES AS RAMIFICAÇÕES
---

```
git branch
# Lista todas as branches (ramificações) existentes no repositório
```
```
git log
# Exibe histórico de commits com hash, autor e data (PARA SAIR DIGITE: q)
```
``` 
git checkout -b novaBranch numero-do-commit
# Cria uma nova branch a partir de um commit específico e já muda para ela
# Exemplo: git checkout -b novaBranch 2ad9347bba64542687c6
```
```
git branch nome-da-branch
# Cria uma nova branch com o nome informado (sem trocar para ela)
```
```
git checkout -b nova-branch
# Cria uma nova branch e já muda para ela
```
```
git stash
# Salva temporariamente alterações não commitadas (útil antes de trocar de branch)
```
```
git checkout main
# Troca para a branch principal (main)
```
```
git checkout nome-da-branch
# Troca para a branch especificada
```
```
git stash apply
# Recupera alterações salvas com `git stash`
``` 
```
git merge especificar-nome-da-branch
# Une a branch especificada com a branch atual
```
```
git branch -d nome-da-branch
# Deleta a branch local (apenas se já foi mesclada)
```
```
git merge nova-branch
# Junta as alterações da branch "nova-branch" com a atual (ex: main)
```
```
git pull origin main
# Atualiza a branch atual com as últimas alterações do repositório remoto (main)
```


---
# TRABALHANDO COM COMMIT 
---
```
git status
# Mostra o status atual dos arquivos (modificados, novos, deletados)
# digite Q para sair
```
```
git add nome-do-arquivo.ext
# Adiciona um arquivo específico para a área de staging
# OBS: CASO VOCÊ JÁ TENHA CRIADO OU ALTERADO ALGUM ATIVO
```
```
git add .
# Adiciona TODOS os arquivos modificados para o commit
```
```
git commit -m "Mensagem clara e objetiva"
# Cria um commit com a mensagem entre aspas
```
```
git commit -am "Mensagem"
# Adiciona e comita arquivos rastreados (não funciona com novos arquivos)
```
```
git diff
# Mostra as diferenças entre o código atual e o último commit
```
```
git show
# Mostra detalhes do último commit
```
```
git blame nome-do-arquivo
# Mostra linha por linha quem modificou o quê (ótimo para rastrear bugs)
```
```
git tag -a v1.0 -m "Versão 1.0"
# Cria uma tag de versão
```
```
git log --oneline
# Mostra o histórico de forma resumida (1 linha por commit)
```
```
git log
# Exibe histórico de todos os commits com hash, autor e data (PARA SAIR DIGITE: q) 
```
---
# 🧹 CORREÇÕES E AJUSTES 
---
```
git reset nome-do-arquivo
# Remove o arquivo da área de staging (antes do commit)
```
```
git reset --hard HEAD
# Remove todas as alterações e volta ao último commit
```
```
git clean -f
# Remove arquivos não rastreados (novos arquivos que não foram adicionados)
```
```
git revert <id-do-commit>
# Reverte um commit específico sem apagar o histórico
```

---
## 📤   RECEBENDO E ENVIANDO PARA O GITHUB 
---
```
git remote add origin git@github.com:usuario/repositorio.git
# Conecta seu repositório local ao repositório remoto via SSH
```
```
git fetch
# Busca atualizações do repositório remoto (mas não aplica)
```
```
git merge
# Aplica as atualizações buscadas com `git fetch`
```
```
git pull
# Baixa alterações do GitHub para seu projeto local
```
```
git pull origin main --rebase
##  Atualizar seu repositório local com o que está no GitHub:
```
```
git push -u origin main
# Envia o repositório local para o GitHub (main = branch principal)
```
---
# TUTORIAL: COMO RECUPERAR ARQUIVOS EXCLUÍDOS NO GIT:
### OBS: Este tutorial assume que você está dentro do repositório local.
---
```
git log --diff-filter=D --summary
# ETAPA 1 — LOCALIZAR ARQUIVOS DELETADOS
# Exibe o histórico de commits com resumo das alterações,e filtra SOMENTE commits que deletaram arquivos.
# DICA: Use a tecla Q para sair da visualização do log quando quiser.
```
```
git log --summary --name-status | grep -B 10 "editor-de-txt.html
# para buscar especificamente um arquivo que você quer recuperar:
# Neste exemplo, buscamos o arquivo "editor-de-txt.html"
# O parâmetro -B 10 mostra as 10 linhas antes da ocorrência,
# para encontrar o commit completo que removeu o arquivo.
# A saída  mostra algo assim:
# commit 7477572b4f232ee774236f1b58f510d57d0f7de9
# Author: aristidesbp <aristidesbp@gmail.com>
# Date:   Thu May 22 10:01:41 2025 -0300
# Mensagem: atualizarS
# D	editor-de-txt.html
# OBS: Anote o HASH DO COMMIT (exemplo acima: 7477572b4f232ee774236f1b58f510d57d0f7de9)
```
```
git show --name-status --diff-filter=D 7477572b4f232ee774236f1b58f510d57d0f7de9
# Agora você pode usar o comando abaixo para ver todos os arquivos DELETADOS no mesmo commit:
# Exemplo de saída esperada:
# D	editor-de-txt.html
# D	script-antigo.js
# D	css/velho-style.css
```
```
git checkout <HASH_DO_COMMIT>^ -- caminho/do/arquivo
# Para restaurar um arquivo deletado, use o comando:
# O ^ (circunflexo) indica que queremos o arquivo da versão ANTERIOR ao commit que deletou.
# Exemplo real:
# git checkout 7477572b4f232ee774236f1b58f510d57d0f7de9^ -- editor-de-txt.html
# Esse comando recupera o arquivo "editor-de-txt.html" e o adiciona de volta ao diretório atual.
```
```
git add editor-de-txt.html
# Após restaurar o arquivo, você deve adicioná-lo novamente ao controle de versão:
```
```
git commit -m "Recuperar arquivo editor-de-txt.html que havia sido deletado"
# Agora salve com um novo commit:
```
### PRONTO! O arquivo está de volta no seu projeto.
### CONCLUSÃO:
Usando Git, você pode recuperar QUALQUER arquivo que foi deletado
. Em qualquer ponto do histórico, mesmo que não saiba o commit exato.
. Sempre use git log e git show para investigar o histórico.
. Lembre-se: o Git guarda tudo. 😉

---
# ✅ 1. Voltar temporariamente a um commit (modo detached HEAD) Pressione q para sair da visualização.
---
```
git log
# Use o comando abaixo para listar o histórico de commits no (pc): assim você encontra o ID
```
```
git checkout <id_do_commit>
# Esse modo é útil apenas para explorar um commit antigo sem alterar o histórico da branch atual.
# Exemplo: git checkout a1b2c3d ⚠️ Neste modo, você não está em nenhuma branch. Se fizer alterações aqui, precisará criar uma nova branch para não perder seu trabalho.
```

---
# ✅ 2. Voltar permanentemente a um commit (desfazendo commits posteriores)
---
```
git reset --soft <id_do_commit>
# Opção A: Reset "soft" – mantém as alterações no stage
```
```
git reset <id_do_commit>
# Opção B: Reset "mixed" (padrão) – mantém alterações nos arquivos, mas remove do stage
```
```
git reset --hard <id_do_commit>
# Opção C: Reset "hard" – apaga tudo (perigoso!)
#⚠️ Atenção: Se você fizer --hard, todo o trabalho feito depois do commit escolhido será perdido, a menos que esteja salvo em algum lugar (como no GitHub ou em um branch separado).
#💡 Dica de segurança: Antes de usar reset --hard, é recomendado criar uma branch backup:(git branch backup-antes-do-reset) Assim, você pode recuperar os commits caso precise
```

---
# ✅ 3. Criar uma nova branch a partir de um commit antigo
---
```
git checkout -b nova-branch <id_do_commit>
# Se quiser preservar o histórico e começar uma nova linha de desenvolvimento a partir de um commit antigo:
# Exemplo: git checkout -b teste-antigo a1b2c3d
```

---
# CRIANDO UM SERVIDOR COM PYTHON 
---


# Passo 1: Instalar o Python

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
# Como Acessar o Site no Navegador
Abra o navegador do seu celular (Chrome, Firefox, etc.).
Digite o seguinte endereço na barra de URL:

```
http://localhost:8080/admin.html
```

O Painel Administrativo agora deve carregar, e o JavaScript (Bloco 6) deve funcionar, permitindo que você clique no botão para adicionar campos e que o localStorage funcione corretamente.

Para parar o servidor, volte para o Termux e pressione 
#### Ctrl + C.







🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
---
# 06
# Projeto com fire base 

Então vamos fazer isso direitinho: te guiarei passo a passo pra implementar o checklist + pagamento via Mercado Pago com Firebase no seu código atual.
O tutorial será dividido em etapas curtas e práticas, pra você aplicar tudo com clareza.


---

🧩 TUTORIAL COMPLETO

“Integração de Pagamento Mercado Pago + Firebase + Checklist de Confirmação”


---

🔹 ETAPA 1 — Checklist de confirmação no formulário

🎯 Objetivo:

Adicionar um campo obrigatório para o cliente confirmar que entende e aceita o pagamento de R$50,00 antes de enviar o formulário.

✅ Como fazer:

1. Localize a seção do formulário no seu HTML:
```
<form id="contact-form">
```

2. Logo antes do botão de envio, adicione o seguinte bloco:
```
<label>
  <input type="checkbox" id="confirmarPagamento" required>
  Confirmo que estou ciente do custo de <strong>R$50,00</strong> e desejo prosseguir com o pagamento.
</label>
```

3. E no JavaScript, adicione a verificação antes do envio (substituindo o trecho atual que só checa “aceite”):
```
const confirmarPagamento = document.getElementById("confirmarPagamento").checked;

if (!confirmarPagamento) {
  alert("Você precisa confirmar que está ciente do pagamento antes de continuar.");
  return;
}

```


---

🔹 ETAPA 2 — Criar conta e app no Mercado Pago

🎯 Objetivo:

Obter as credenciais que o Firebase usará para criar pagamentos e validar transações.

✅ Passos:

1. Vá para https://www.mercadopago.com.br/developers.


2. Faça login com sua conta do Mercado Pago (ou crie uma).


3. No menu → Credenciais → Produção / Sandbox, copie:

Public Key (usada no front-end).

Access Token (usada no backend Firebase Functions).



4. Guarde esses dados, usaremos na próxima etapa.




---

🔹 ETAPA 3 — Criar o projeto no Firebase

🎯 Objetivo:

Hospedar o site e o backend que vai confirmar o pagamento.

✅ Passos:

1. Vá para https://console.firebase.google.com.


2. Crie um projeto novo → exemplo: aristidesbp-pagamentos.


3. No menu lateral, ative:

Authentication (para segurança, se quiser controlar acesso futuro).

Firestore Database (armazenar contratos e status de pagamento).

Functions (para processar as notificações do Mercado Pago).



4. Instale o Firebase CLI no seu terminal:

npm install -g firebase-tools


5. Faça login:

firebase login


6. Inicie o projeto:

firebase init

Marque:

Functions

Firestore

Hosting





---

🔹 ETAPA 4 — Configurar o backend de pagamentos

🎯 Objetivo:

Usar as Firebase Functions para criar ordens de pagamento e receber notificações do Mercado Pago.

✅ Passos:

1. No diretório functions/, abra o arquivo index.js.
Apague o conteúdo e cole:
```
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mercadopago = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// Configura Mercado Pago com sua Access Token
mercadopago.configure({
  access_token: "SEU_ACCESS_TOKEN_AQUI"
});

// Cria preferência de pagamento
exports.criarPagamento = functions.https.onRequest(async (req, res) => {
  try {
    const { nome, email, telefone, mensagem } = req.body;

    const preference = {
      items: [{
        title: "Visita Técnica - Criação de Site + Tráfego Pago",
        quantity: 1,
        unit_price: 50.00
      }],
      back_urls: {
        success: "https://seusite.web.app/sucesso.html",
        failure: "https://seusite.web.app/erro.html"
      },
      auto_return: "approved"
    };

    const resposta = await mercadopago.preferences.create(preference);

    // Grava no Firestore
    await db.collection("contratos").add({
      nome, email, telefone, mensagem,
      valor: 50.00,
      statusPagamento: "pendente",
      dataCriacao: admin.firestore.FieldValue.serverTimestamp(),
      idPreference: resposta.body.id
    });

    res.json({ id: resposta.body.id, init_point: resposta.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

// Webhook de confirmação
exports.confirmarPagamento = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  if (data.type === "payment") {
    const paymentId = data.data.id;
    const pagamento = await mercadopago.payment.findById(paymentId);

    const status = pagamento.body.status;
    const idPreference = pagamento.body.order.id;

    const contratos = await db.collection("contratos").where("idPreference", "==", idPreference).get();
    contratos.forEach(doc => doc.ref.update({ statusPagamento: status }));

    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
```

2. Em functions/package.json, adicione:
```
"dependencies": {
  "firebase-admin": "^11.5.0",
  "firebase-functions": "^4.3.0",
  "mercadopago": "^1.5.14"
}

```
3. Faça o deploy:

firebase deploy --only functions




---

🔹 ETAPA 5 — Conectar o site ao backend

🎯 Objetivo:

Ao clicar em “Confirmar Contrato”, criar o pagamento e redirecionar o usuário.

✅ Passos:

1. No seu script.js, adicione:
```
form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const confirmarPagamento = document.getElementById("confirmarPagamento").checked;
  if (!confirmarPagamento) {
    alert("Você precisa confirmar o pagamento para continuar.");
    return;
  }

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    mensagem: document.getElementById("mensagem").value
  };

  const response = await fetch("https://us-central1-SEUPROJETO.cloudfunctions.net/criarPagamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const data = await response.json();
  window.location.href = data.init_point; // Redireciona para checkout do Mercado Pago
});

```


---

🔹 ETAPA 6 — Hospedar o site no Firebase

🎯 Objetivo:

Deixar seu site e sistema de pagamentos online.

✅ Passos:

1. Coloque seus arquivos (index.html, style.css, script.js) dentro da pasta public/.


2. No terminal:

firebase deploy --only hosting



Pronto 🎉
Seu site estará hospedado com pagamento via Mercado Pago, registro no Firebase e confirmação automática de status.

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
---

# 07
# FIRE BASE - TAPIOCA

🔥 Usaremos Firebase (plano gratuito Spark) + Mercado Pago sandbox + envio via link normal do WhatsApp.
O sistema vai confirmar o pagamento automaticamente antes de abrir o WhatsApp.


---

#### 🚀 Início do desenvolvimento
Bloco 1 de 6 — Configuração do Firebase (Firestore + Functions)
> Este bloco prepara o ambiente para armazenar pedidos e permitir que as funções monitorem o pagamento.




---

#### 🧩 Estrutura esperada do projeto
```
/project-root
 ├── public/
 │   ├── index.html
 │   ├── assets/
 │   │   ├── js/delivery.js
 │   │   └── css/delivery.css
 ├── functions/
 │   ├── index.js
 │   └── package.json
 └── firebase.json
```

---

#### 1️⃣ Criação e configuração do Firebase

1. Vá em https://console.firebase.google.com
2. Crie um novo projeto:
3. ``` tapioca-delivery ```
4. Clique em </> Adicionar app Web e copie o trecho de configuração, ele terá esse formato:


```
const firebaseConfig = {
  apiKey: "sua-chave",
  authDomain: "tapioca-delivery.firebaseapp.com",
  projectId: "tapioca-delivery",
  storageBucket: "tapioca-delivery.appspot.com",
  messagingSenderId: "XXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};
```

4. Ative o Firestore Database → modo “produção” ou “teste” (tanto faz por enquanto).
5. Ative o Cloud Functions na aba Build > Functions.




---

#### 2️⃣ Arquivo firebase.json
Crie este arquivo na raiz:
```
{
  "functions": {
    "source": "functions"
  },
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

---

3️⃣ Dentro da pasta functions/ → package.json
```
{
  "name": "tapioca-delivery-functions",
  "engines": { "node": "18" },
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^4.4.0",
    "axios": "^1.6.0",
    "cors": "^2.8.5"
  }
}

```
---

4️⃣ Dentro da pasta functions/ → index.js
```
/* Configuração base das Cloud Functions */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

/* Endpoint para criar novo pedido */
exports.criarPedido = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") return res.status(405).send("Método não permitido");

    try {
      const pedido = req.body;
      pedido.status = "aguardando_pagamento";
      pedido.criadoEm = new Date();

      const docRef = await db.collection("pedidos").add(pedido);
      res.status(200).send({ id: docRef.id });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res.status(500).send("Erro interno");
    }
  });
});
```

📝 Função:

Recebe um pedido via POST (enviado do front-end delivery.js)
Cria o documento no Firestore
Define status: "aguardando_pagamento"
Retorna o id do pedido



---

Quer que eu prossiga agora com o
💳 Bloco 2 de 6 — Configuração do Mercado Pago (sandbox + geração de pagamento), Aristides?

