// js/view.js

// Carrega o header.html de forma assíncrona e insere no DOM
export async function loadHeader() {
  const headerContainer = document.getElementById("header"); // seleciona a div #header
  const response = await fetch("html/header.html"); // faz requisição do HTML externo
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

