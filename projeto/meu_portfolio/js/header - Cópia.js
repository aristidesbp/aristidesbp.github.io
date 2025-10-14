function criarHeader() {
  const header = document.getElementById('componente-Header');
  if (!header) return;

  // Estrutura HTML
  header.innerHTML = `
    <section class="hero-header">
      <div class="slideshow-container">
        <div class="slide fade" id="slide-img"></div>
        <div class="overlay">
          <div class="hero-content">
            <h1 id="slide-title" class="fade-in">Título 1</h1>
            <p id="slide-text" class="fade-in delay">Texto 1</p>
          </div>
        </div>
      </div>
    </section>
  `;

  // CSS
  const style = document.createElement('style');
  style.textContent = `
    #componente-Header {
      margin: 0;
      padding: 0;
    }

    .hero-header {
      position: relative;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', sans-serif;
      text-align: center;
    }

    .slideshow-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .slide {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transition: opacity 1s ease-in-out, transform 1s ease-in-out;
      z-index: 1;
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
  line-height: 2.2; /* Altura das linhas */
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  color: #fff;
}

.hero-content p {
  font-size: 1.5rem;
  line-height: 2.6; /* Altura das linhas */
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

  // JS - Slide dinâmico
  const slides = [
    {
      imagem: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      titulo: 'Desenvolvimento Web',
      texto: 'Sites modernos, estratégicos e com performance de verdade.'
    },
    {
      imagem: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=600&q=80',
      titulo: 'Gestão de Tráfego Pago',
      texto: 'Impucione e ganhe visibilidade.'
    },
    {
      imagem: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      titulo: 'Consultoria Estratégica',
      texto: 'Receba um relatorio completo com estartegias que funcionam!'
    }
  ];










  let currentIndex = 0;
  const slideImg = document.getElementById('slide-img');
  const slideTitle = document.getElementById('slide-title');
  const slideText = document.getElementById('slide-text');

  function showSlide(index) {
    const { imagem, titulo, texto } = slides[index];

    // Atualiza imagem com leve transição
    slideImg.style.opacity = 0;
    slideImg.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      slideImg.style.backgroundImage = `url('${imagem}')`;
      slideImg.style.opacity = 1;
      slideImg.style.transform = 'translateY(0)';
    }, 400);

    // Atualiza textos
    slideTitle.classList.remove('fade-in');
    slideText.classList.remove('fade-in', 'delay');

    void slideTitle.offsetWidth; // força reflow para reiniciar animação
    void slideText.offsetWidth;

    slideTitle.textContent = titulo;
    slideText.textContent = texto;

    slideTitle.classList.add('fade-in');
    slideText.classList.add('fade-in', 'delay');
  }

  showSlide(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 6000); // 6s por slide
}
