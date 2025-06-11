function criarHeader() {
  const header = document.getElementById('componente-Header');
  if (!header) return;
header.innerHTML = `


    <section class="hero-header">
      <div class="background-slideshow"></div>
      <div class="overlay">
        <div class="hero-content">
          <h1 class="fade-in">Transformando Ideias em Experiências Digitais</h1>
          <p class="fade-in delay">Sites modernos, estratégicos e com performance de verdade.</p>
        </div>
      </div>
    </section>
  `;

  const style = document.createElement('style');
  style.textContent = `


    #componente-Header {
     margin: 0;
     padding: 0;
    }

    .hero-header {
      position: relative;
      top: 0;
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', sans-serif;
      text-align: center;
    }

    .background-slideshow {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      background-size: cover;
      background-position: center;
      animation: slideBg 24s infinite linear;
    }

    .overlay {
      position: relative;
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .hero-content h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
      color: #fff;
    }

    .hero-content p {
      font-size: 1.5rem;
      color: #e0e0e0;
    }

    .fade-in {
      opacity: 0;
      animation: fadeInUp 1s ease forwards;
    }

    .fade-in.delay {
      animation-delay: 0.5s;
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideBg {
      0%, 100% {
        background-image: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1950&q=80');
      }
      25% {
        background-image: url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1950&q=80');
      }
      50% {
        background-image: url('https://images.unsplash.com/photo-1559028012-df5fe1c4d73c?auto=format&fit=crop&w=1950&q=80');
      }
      75% {
        background-image: url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80');
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }

      .hero-content p {
        font-size: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
}