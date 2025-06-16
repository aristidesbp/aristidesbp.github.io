// assets/js/sobre.js

function criarSobre() {
  const sobre = document.getElementById("componente-sobre");
  if (!sobre) return;

  sobre.innerHTML = `
<style>
  #componente-sobre {
    font-family: 'DM Sans', sans-serif;
    padding: 4rem 2rem;
    background: #111;
    color: #f9f9f9;
  }

  .sobre-wrapper {
    max-width: 1100px;
    margin: 0 auto;
  }

  .sobre-conteudo {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  .sobre-texto {
    flex: 1 1 50%;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .sobre-texto h2 {
    color: #FFD700;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .sobre-imagem {
    flex: 1 1 40%;
    max-width: 400px;
    text-align: center;
  }

  .sobre-imagem img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
  }

  .sobre-imagem img:hover {
    transform: scale(1.05);
  }

  .skills-container {
    margin-top: 3rem;
    text-align: center;
  }

  .skills-container h3 {
    color: #FFD700;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .skills-icones {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    font-size: 2rem;
  }

  .skills-icones i {
    color: #FFD700;
    transition: transform 0.3s ease;
  }

  .skills-icones i:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    .sobre-conteudo {
      flex-direction: column;
    }

    .sobre-texto {
      text-align: center;
    }

    .skills-icones {
      font-size: 1.8rem;
      gap: 1rem;
    }
  }
</style>

<section class="sobre-wrapper">
  <div class="sobre-conteudo">
    <div class="sobre-texto">
      <h2>Sobre Mim</h2>
      <p>
        Sou <strong>Aristides Barbosa Pontes</strong>, formado em Análise de Sistemas, desenvolvedor front-end e gestor de tráfego pago.
        Minha missão é transformar ideias em interfaces funcionais e estratégias digitais que geram resultados.
      </p>
      <p>
        Tenho experiência sólida com <b>HTML, CSS, JavaScript, PHP, Python, SQL</b> e também em plataformas como Google Ads, Facebook Ads e Google Analytics.
        Atuo com foco em performance, design moderno e código limpo.
      </p>
      <p>
        Combinando tecnologia e marketing, ajudo empresas e profissionais autônomos a conquistarem mais presença e conversões.
      </p>
    </div>
<div class="skills-container">
    
    <div class="skills-icones">
      <i class="bi bi-filetype-html" title="HTML5"></i>
      <i class="bi bi-filetype-css" title="CSS3"></i>
      <i class="bi bi-filetype-js" title="JavaScript"></i>
      <i class="bi bi-code-slash" title="PHP"></i>
      <i class="bi bi-terminal" title="Python"></i>
      <i class="bi bi-database" title="SQL"></i>
      <i class="bi bi-bar-chart-fill" title="Google Ads"></i>
      <i class="bi bi-megaphone-fill" title="Facebook Ads"></i>
      <i class="bi bi-graph-up-arrow" title="Google Analytics"></i>
    </div>
  </div>

    <div class="sobre-imagem">
      <img src="assets/img/Aristidesbp.png" alt="Foto representando Aristides Pontes">
    </div>
  </div>

  

</section>
  `;
}
