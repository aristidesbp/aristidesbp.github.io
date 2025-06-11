// assets/js/sobre.js

function criarSobre() {
  const sobre = document.getElementById("componente-sobre");
  if (!sobre) return;

  sobre.innerHTML = `
<style>
/* assets/css/Sobre.css */
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

@media (max-width: 768px) {
  .sobre-conteudo {
    flex-direction: column;
  }

  .sobre-texto {
    text-align: center;
  }
}

</style>
    <section class="sobre-wrapper">
      <div class="sobre-conteudo">
        <div class="sobre-texto">
          <h2>Sobre Mim</h2>
          <p>
            Sou <strong>Aristides Barbosa Pontes</strong>, desenvolvedor front-end e gestor de tráfego pago.
            Minha missão é transformar ideias em interfaces funcionais e estratégias digitais que geram resultados.
          </p>
          <p>
            Tenho experiência sólida com <b>HTML, CSS, JavaScript, React</b> e também em plataformas como Google Ads, Facebook Ads e Analytics.
            Atuo com foco em performance, design moderno e código limpo.
          </p>
          <p>
            Combinando tecnologia e marketing, ajudo empresas e profissionais a conquistarem mais presença e conversões.
          </p>
        </div>
        <div class="sobre-imagem">
          <img src="https://images.unsplash.com/photo-1603415526960-f7e0328b1df0?auto=format&fit=crop&w=600&q=80" alt="Foto representando Aristides Pontes">
        </div>
      </div>
    </section>
  `;
}

