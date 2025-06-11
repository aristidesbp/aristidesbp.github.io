// assets/js/Header.js

function criarHeader() {
  const header = document.getElementById("componente-Header");

  if (!header) return;

  header.innerHTML = `

<style>

/* assets/css/Header.css */
#componente-Header {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

#componente-Header .header-slideshow {
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

#componente-Header .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

#componente-Header .header-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  font-family: 'DM Sans', sans-serif;
  animation: fadeInUp 1.5s ease both;
}

#componente-Header .titulo {
  font-size: 3rem;
  margin-bottom: 1rem;
}

#componente-Header .subtitulo {
  font-size: 1.5rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  #componente-Header .titulo {
    font-size: 2rem;
  }

  #componente-Header .subtitulo {
    font-size: 1rem;
  }
}

</style>
    <div class="header-slideshow">
      <div class="overlay"></div>
      <div class="header-content">
        <h1 class="titulo">Transformando Ideias em Resultados</h1>
        <p class="subtitulo">Desenvolvimento Front-End & Tráfego Pago Estratégico</p>
      </div>
    </div>
  `;

  const imagens = [
    "assets/img/bg1.jpg",
    "assets/img/bg2.jpg",
    "assets/img/bg3.jpg"
  ];

  let index = 0;
  const container = header.querySelector(".header-slideshow");
  container.style.backgroundImage = `url(${imagens[index]})`;

  setInterval(() => {
    index = (index + 1) % imagens.length;
    container.style.backgroundImage = `url(${imagens[index]})`;
  }, 6000);
}

