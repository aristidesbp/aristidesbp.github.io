# 🧠 Site com sistema mvc

# ✅ index.html ✅
```
<!DOCTYPE html> 
<!-- Declara que este documento é do tipo HTML5 -->
<html lang="pt-BR"> 
<!-- Início do HTML e define o idioma como português do Brasil -->
<head> 
<!-- Cabeçalho da página (parte não visível ao usuário) -->
<meta charset="UTF-8"> 
<!-- Define a codificação de caracteres como UTF-8, permitindo acentos -->
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<!-- Faz com que a página seja responsiva em dispositivos móveis -->
<title>Página Básica</title> 
<!-- Título que aparecerá na aba do navegador -->

<!--  METADADOS PARA SEO -->
<!--  Codificação e compatibilidade -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Compatibilidade com Internet Explorer -->
<!--  Robots (instruções para motores de busca) -->
<meta name="robots" content="index, follow">
<!-- index = indexar; follow = seguir links internos -->

<!--  Meta descrição (texto que aparece abaixo do título no Google) -->
<meta name="description" content="Sou Aristides Barbosa Pontes, desenvolvedor front-end e gestor de tráfego pago. Veja meu portfólio com projetos em HTML, CSS, JavaScript, AndroidIDE e estratégias de marketing digital.">
<!--  Palavras-chave (menos usada hoje, mas ainda relevante em alguns mecanismos de busca) -->
<meta name="keywords" content="portfólio, Aristides Barbosa Pontes, front-end, desenvolvedor, HTML, CSS, JavaScript, AndroidIDE, tráfego pago, marketing digital, programador web, projetos web, sites profissionais">
<!--  Canonical (evita conteúdo duplicado em URLs diferentes) -->
<link rel="canonical" href="https://aristidesbp.github.io" />

<!--  Open Graph (para compartilhamento no Facebook, LinkedIn, etc.) -->
<meta property="og:type" content="website">
<!-- Tipo de conteúdo -->
<meta property="og:url" content="https://aristidesbp.github.io">
<!-- URL da página -->
<meta property="og:title" content="Portfólio de Aristides Barbosa Pontes – Dev Front-End e Gestor de Tráfego">
<!-- Título no compartilhamento -->
<meta property="og:description" content="Conheça os projetos e estratégias digitais de Aristides Barbosa Pontes, especialista em desenvolvimento web e tráfego pago.">
<!-- Descrição no card -->
<meta property="og:image" content="https://aristidesbp.github.io/img/Aristidesbp.png">
<!-- Imagem do card -->

<!--  Twitter Card (para compartilhamento no Twitter) -->
<meta name="twitter:card" content="summary_large_image">
<!-- Tipo de card -->
<meta name="twitter:title" content="Portfólio de Aristides Barbosa Pontes – Dev & Tráfego Pago">
<meta name="twitter:description" content="Confira meus projetos e estratégias como desenvolvedor front-end e gestor de tráfego.">
<meta name="twitter:image" content="https://aristidesbp.github.io/img/Aristidesbp.png">
<meta name="twitter:site" content="@aristidesbp">
<!-- Seu @ do Twitter, se tiver -->

<!--  Favicon (ícone da aba do navegador) -->
<link rel="icon" href="/icons/favicon.png" type="image/png">

<!--  Manifest (para Progressive Web Apps – PWA) -->
<link rel="manifest" href="/json/manifest.json">

<!--  CHAMANDO  ARQUIVOS  E BIBLIOTECAS CSS EXTERNAS  -->
  <link rel="stylesheet" href="./assets/css/style.css">
  <!-- Fonte externa (opcional) -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet">

<!--  CHAMANDO ARQUIVOS E BIBLIOTECAS JAVASCRIPT EXTERNAS  -->

<!-- JS externo -->
  <script type="module" src="./js/main.js" defer></script>

</head><!-- Fim do Cabeçalho -->
<body>

  <!-- Componente de Cabeçalho -->
  <div id="header"></div> <!-- Será preenchido com o conteúdo de header.html via DOM -->

  <!-- Área principal -->
  <main id="app">
    <!-- Aqui será renderizado o conteúdo dinâmico da view.js -->
  </main>

  <!-- Scripts MVC -->
  <script src="./assets/js/model.js" type="module"></script>
  <script src="./assets/js/view.js" type="module"></script>
  <script src="./assets/js/controller.js" type="module"></script>

</body>
<!-- Inicio do Corpo da página (conteúdo visível ao usuário) -->
</html> 
<!-- Fim do documento HTML -->
```




# ✅ js/main.js ✅

```
// main.js - JavaScript modular básico
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada com sucesso!"); // Confirma o carregamento do DOM
});

```





# ✅ js/manifest.json ✅

```
{
  "name": "Portfólio Aristides BP",
  "short_name": "Portfólio",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0077cc",
  "icons": [
    {
      "src": "/assets/icons/favicon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}

```




# ✅  html/header.html (REUTILIZÁVEL)
```
<!-- components/header.html -->
<header>
  <h1>Aristides Barbosa Pontes</h1>
  <nav>
    <ul>
      <li><a href="#sobre">Sobre</a></li>
      <li><a href="#projetos">Projetos</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>
  </nav>
</header>
```

# ✅ view.js (VIEW — DOM DINÂMICO)
```
// assets/js/view.js

// Carrega o header.html de forma assíncrona e insere no DOM
export async function loadHeader() {
  const headerContainer = document.getElementById("header"); // seleciona a div #header
  const response = await fetch("./components/header.html"); // faz requisição do HTML externo
  const html = await response.text(); // transforma em texto
  headerContainer.innerHTML = html; // insere o HTML dentro da div #header
}

// Renderiza os dados do portfólio no #app
export function renderPortfolio(portfolio) {
  const app = document.getElementById("app"); // seleciona a div #app
  app.innerHTML = `
    <section id="sobre">
      <h2>Sobre Mim</h2>
      <p>${portfolio.sobre}</p>
    </section>

    <section id="projetos">
      <h2>Projetos</h2>
      <ul>
        ${portfolio.projetos.map(p => `<li>${p.nome} - <a href="${p.link}" target="_blank">Ver Projeto</a></li>`).join("")}
      </ul>
    </section>

    <section id="contato">
      <h2>Contato</h2>
      <p>Email: ${portfolio.contato.email}</p>
    </section>
  `;
}

```
# ✅  js/model.js (MODEL — DADOS)
```
// assets/js/model.js

export const portfolioData = {
  sobre: "Sou Aristides, desenvolvedor Front-end e gestor de tráfego pago. Trabalho com soluções inteligentes e foco em resultado.",
  projetos: [
    { nome: "Projeto Coworking", link: "https://github.com/..." },
    { nome: "App Lista de Tarefas", link: "https://github.com/..." }
  ],
  contato: {
    email: "aristides@example.com"
  }
};

```
# ✅  js/controller.js (CONTROLADOR)
```
// assets/js/controller.js
import { loadHeader, renderPortfolio } from "./view.js"; // importa funções da View
import { portfolioData } from "./model.js";              // importa dados do Model

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();                     // carrega o cabeçalho via DOM
  renderPortfolio(portfolioData);  // renderiza os dados no corpo da página
});

```


