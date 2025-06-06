function createHeader(containerId = "header-container") {
  // ⬇️ 1. Cria o elemento <style> com o CSS isolado
  const style = document.createElement("style");
  style.textContent = `


    .custom-header * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .custom-header {
      background-color: #111;
      color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    }

    .custom-logo {
      font-size: 1.8rem;
      font-weight: bold;
      color: #fff;
    }
    .custom-logo span {
      color: #f9a825;
    }

    .custom-nav ul {
      display: flex;
      list-style: none;
      gap: 2rem;
    }

    .custom-nav a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      position: relative;
    }

    .custom-nav a::after {
      content: "";
      display: block;
      width: 0;
      height: 2px;
      background: #f9a825;
      transition: width 0.3s;
      position: absolute;
      bottom: -4px;
      left: 0;
    }

    .custom-nav a:hover::after {
      width: 100%;
    }

    .custom-menu-toggle {
      background: none;
      border: none;
      font-size: 2rem;
      color: #f9a825;
      cursor: pointer;
      display: none;
    }

    @media (max-width: 768px) {
      .custom-menu-toggle {
        display: block;
      }

      .custom-nav {
        display: none;
        width: 100%;
        background: #222;
        position: absolute;
        top: 70px;
        left: 0;
      }

      .custom-nav ul {
        flex-direction: column;
        padding: 1rem;
      }

      .custom-nav a {
        padding: 1rem 0;
        display: block;
        text-align: center;
      }

      .custom-nav.active {
        display: block;
      }
    }
  `;

  // ⬇️ 2. Cria o elemento <header> com o conteúdo HTML
  const header = document.createElement("header");
  header.className = "custom-header";
  header.innerHTML = `
    <div class="custom-logo">Impacto<span>Web</span></div>
    <button class="custom-menu-toggle" aria-label="Abrir menu">☰</button>
    <nav class="custom-nav">
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Portfólio</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
    </nav>


  `;




  // ⬇️ 3. Insere o CSS no <head> da página
  document.head.appendChild(style);

  // ⬇️ 4. Insere o header no container alvo (ex: <div id="header-container"></div>)
  const container = document.getElementById(containerId);
  if (container) {
    container.appendChild(header);
  } else {
    console.warn(`Container com id "${containerId}" não encontrado.`);
  }

  // ⬇️ 5. Função do botão hamburguer para abrir/fechar menu em telas pequenas
  const toggle = header.querySelector(".custom-menu-toggle");
  const nav = header.querySelector(".custom-nav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}





