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


.custom-header {
  background-color: #111;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;         /* 🔁 Troca sticky por fixed para fixar no topo da página */
  top: 0;                  /* 🔝 Fixa no topo */
  width: 100%;             /* 🧱 Garante que ocupe toda a largura */
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

/* 🔽 Estiliza o container dropdown */
.custom-header .dropdown {
  position: relative; /* Permite posicionar o submenu dentro desse item */
}

/* 🔽 Oculta o submenu inicialmente */
.custom-header .dropdown-menu {
  display: none;             /* Esconde o submenu */
  position: absolute;        /* Posiciona abaixo do item principal */
  background-color: #222;    /* Cor de fundo */
  padding: 1rem;
  top: 100%;                 /* Aparece logo abaixo do link */
  left: 0;
  z-index: 999;
  border-radius: 4px;
}

/* 🔽 Quando o item estiver ativo, mostra o submenu */
.custom-header .dropdown.active .dropdown-menu {
  display: block;
}

/* 🔽 Itens dentro do submenu */
.custom-header .dropdown-menu li a {
  display: block;
  padding: 0.5rem 0;
  color: #fff;
  text-decoration: none;
  text-align: left;
}

.custom-header .dropdown-menu li a:hover {
  color: #f9a825; /* Efeito hover amarelo */
}


/*fim do style*/`;


/*Cria o elemento <header> com o conteúdo HTML*/
const header = document.createElement("header");
header.className = "custom-header";
header.innerHTML = `
<div class="custom-logo">Impacto<span>Web</span></div>
<button class="custom-menu-toggle" aria-label="Abrir menu">☰</button>
<nav class="custom-nav">
<ul>
<!-- LINKS DO MENU -->       
<li><a href="index.html">Início</a></li>
<li><a href="#servico">Serviços</a></li>
<li><a href="#sobre">Sobre</a></li>
<li><a href="#projetos">Projetos</a></li>
<li><a href="#contato">Contato</a></li>

<!-- ITEM DE MENU COM SUBMENU DROPDOWN -->
<li class="dropdown">
  <a href="#" class="dropdown-toggle">OUTROS LINKS ▾</a> <!-- Seta indicativa -->
  <ul class="dropdown-menu"> <!-- Lista oculta inicialmente -->
    <li><a href="https://github.com/">Github</a></li>
    <li><a href="https://www.facebook.com/?locale=pt_BR">Facebook</a></li>
    <li><a href="https://www.google.com/intl/pt-br_br/business/">Google meu Negócio</a></li>
    <li><a href="https://sites.google.com/">Google Sites</a></li>
    <li><a href="https://www.youtube.com/">YouTube</a></li>
    <li><a href="https://chatgpt.com/">ChatGPT</a></li>
    <li><a href="https://www.w3schools.com/">W3Schools</a></li>
  </ul>
</li>


<!-- FIM DOS LINKS DO MENU -->  
</ul></nav>`;/*final Cria o elemento <header> com o conteúdo HTML*/




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

// ⬇️ 6. Dropdown "OUTROS LINKS"
const dropdownToggle = header.querySelector(".dropdown-toggle"); // seleciona o botão "OUTROS LINKS"
const dropdown = header.querySelector(".dropdown");              // seleciona o <li> pai

// ⬇️ Quando clicar, alterna a classe "active" para mostrar ou esconder o submenu
dropdownToggle.addEventListener("click", (e) => {
  e.preventDefault();                         // Impede comportamento padrão do link
  dropdown.classList.toggle("active");        // Alterna a exibição do submenu
});

}





