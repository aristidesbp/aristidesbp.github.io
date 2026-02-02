function criarHeader() {
  const header = document.getElementById('componente-Header');
  if (!header) return;

  header.innerHTML = `
    <section class="hero-header">
      <div class="slideshow-container">
        <div class="slide" id="slide-img-1"></div>
        <div class="slide" id="slide-img-2"></div>
        <div class="overlay">
          <div class="hero-content">
            <h1 id="slide-title" class="fade-in">Título 1</h1>
            <p id="slide-text" class="fade-in delay">Texto 1</p>
          </div>
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
      overflow: hidden;
      z-index: 1;
    }

    .slide {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transform: translateY(0);
      transition: opacity 1.2s ease, transform 1.2s ease;
      will-change: opacity, transform;
    }

    .slide.active {
      opacity: 1;
      z-index: 2;
    }

    .slide.to-top {
      transform: translateY(-100%);
      opacity: 0;
      z-index: 1;
    }

    .slide.from-bottom {
      transform: translateY(100%);
      opacity: 0;
      z-index: 1;
    }

    .overlay {
      position: relative;
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      pointer-events: none;
    }

    .hero-content h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 2.2;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
      color: #fff;
      opacity: 0;
      transform: translateY(30px);
      animation-fill-mode: forwards;
    }

    .hero-content p {
      font-size: 1.5rem;
      line-height: 2.6;
      color: #e0e0e0;
      opacity: 0;
      transform: translateY(30px);
      animation-fill-mode: forwards;
    }

    .fade-in {
      animation-name: fadeInUp;
      animation-duration: 1s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      opacity: 1;
      transform: translateY(0);
    }

    .fade-in.delay {
      animation-delay: 0.5s;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
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

  const slides = [
    {
      imagem: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      titulo: 'Desenvolvimento Web',
      texto: 'Sites modernos, estratégicos e com performance de verdade.'
    },
    {
      imagem: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=600&q=80',
      titulo: 'Gestão de Tráfego Pago',
      texto: 'Impressione e ganhe visibilidade.'
    },
    {
      imagem: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      titulo: 'Consultoria Estratégica',
      texto: 'Receba um relatório completo com estratégias que funcionam!'
    }
  ];

  let currentIndex = 0;
  const slide1 = document.getElementById('slide-img-1');
  const slide2 = document.getElementById('slide-img-2');
  const slideTitle = document.getElementById('slide-title');
  const slideText = document.getElementById('slide-text');

  // Estado: qual slide está visível no momento (1 ou 2)
  let showingFirst = true;

  function updateText(titulo, texto) {
    slideTitle.classList.remove('fade-in', 'delay');
    slideText.classList.remove('fade-in', 'delay');

    slideTitle.style.opacity = '0';
    slideText.style.opacity = '0';

    // Força reflow para reiniciar animação
    void slideTitle.offsetWidth;
    void slideText.offsetWidth;

    slideTitle.textContent = titulo;
    slideText.textContent = texto;

    slideTitle.classList.add('fade-in');
    slideText.classList.add('fade-in', 'delay');
  }

  function showSlide(nextIndex) {
    const next = slides[nextIndex];
    const currentSlide = showingFirst ? slide1 : slide2;
    const nextSlide = showingFirst ? slide2 : slide1;

    // Setup next slide abaixo da viewport (100%)
    nextSlide.style.backgroundImage = `url('${next.imagem}')`;
    nextSlide.className = 'slide from-bottom';

    // Força reflow para reiniciar a transição
    void nextSlide.offsetWidth;

    // Animar atual subindo e sumindo
    currentSlide.className = 'slide to-top';

    // Animar próximo descendo e aparecendo
    nextSlide.classList.add('active');
    nextSlide.style.opacity = '1';
    nextSlide.style.transform = 'translateY(0)';

    // Atualizar texto com delay para sincronizar com animação
    setTimeout(() => updateText(next.titulo, next.texto), 600);

    // Após transição, atualizar estados
    setTimeout(() => {
      currentSlide.className = 'slide';
      showingFirst = !showingFirst;
      currentIndex = nextIndex;
    }, 1200);
  }

  // Inicializa primeiro slide
  slide1.style.backgroundImage = `url('${slides[0].imagem}')`;
  slide1.className = 'slide active';
  updateText(slides[0].titulo, slides[0].texto);

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 6000);
}
