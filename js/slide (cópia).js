// assets/js/slide.js

function criarSlide() {
  const slide = document.getElementById("componente-slide");
  if (!slide) return;

  const services = [
    {
      titulo: "Desenvolvimento Web",
      descricao: "Criação de sites rápidos, responsivos e otimizados para conversão.<br>Tecnologias como HTML, CSS, JS, frameworks modernos e SEO.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    },
    {
      titulo: "Gestão de Tráfego Pago",
      descricao: "Campanhas de performance em Google Ads, Meta Ads e outras plataformas.<br>Otimização por ROI, segmentação e funil de vendas.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
    },
    {
      titulo: "Consultoria Estratégica",
      descricao: "Apoio estratégico para escalar presença online, branding, automação e mensuração de dados.<br>Decisões guiadas por métricas.",
      img: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=600&q=80"
    }

];


  slide.innerHTML = `


 <div class="slide-container">
      <button class="slide-btn prev" aria-label="Slide anterior">&#10094;</button>
      <div class="slide-wrapper">
        ${services.map((s, i) => `
          <div class="slide-item${i === 0 ? ' active' : ''}" style="background-image: url('${s.img}');">
            <div class="slide-overlay"></div>
            <div class="slide-caption">
              <h3>${s.titulo}</h3>
              <p>${s.descricao}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="slide-btn next" aria-label="Próximo slide">&#10095;</button>
    </div>
  








<style>
/* assets/css/slide.css */

#componente-slide,
.slide-container {
  background-color: #000;
}

.slide-wrapper {
  display: flex;
  overflow: hidden;
  position: relative;
}

.slide-item {
  flex: 0 0 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: none;
}

.slide-item.active {
  display: block;
}

.slide-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.slide-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  max-width: 80%;
  z-index: 2;
}

.slide-caption h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.slide-caption p {
  font-size: 1rem;
  line-height: 1.5;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 215, 0, 0.8); /* dourado translúcido */
  color: #000;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 3;
  transition: background 0.3s, transform 0.3s;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.slide-btn:hover {
  background: #ffd700;
  transform: translateY(-50%) scale(1.1);
}

.slide-btn.prev {
  left: 1rem;
}

.slide-btn.next {
  right: 1rem;
}

</style>


`;

  const items = slide.querySelectorAll('.slide-item');
  let current = 0;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  slide.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    showSlide(current);
  });

  slide.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % items.length;
    showSlide(current);
  });
}

  // autoplay automático a cada 5 segundos
  setInterval(() => {
    current = (current + 1) % items.length;
    showSlide(current);
  }, 5000);


