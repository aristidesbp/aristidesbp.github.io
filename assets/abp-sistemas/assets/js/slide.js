// assets/js/slide.js

function criarSlide() {
  const slide = document.getElementById("componente-slide");
  if (!slide) return;

  const services = [
     { titulo: "Desenvolvimento Web", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },
    { titulo: "Gestão de Tráfego Pago", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" },
    { titulo: "Consultoria Estratégica", img: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=600&q=80" }
  ];

  slide.innerHTML = `


<style>
/* assets/css/Slide.css */
#componente-slide {
  max-width: 900px;
  margin: 2rem auto;
  font-family: 'DM Sans', sans-serif;
  position: relative;
}

.slide-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
}

.slide-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.slide-item {
  min-width: 100%;
  opacity: 0;
  transition: opacity 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.slide-item.active {
  position: relative;
  opacity: 1;
  pointer-events: auto;
}

.slide-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px 12px 0 0;
  object-fit: cover;
}

.slide-caption {
  background: rgba(0, 0, 0, 0.6);
  color: #FFD700;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.75rem 1rem;
  border-radius: 0 0 12px 12px;
  text-align: center;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #000a;
  color: #FFD700;
  border: none;
  font-size: 2rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  transition: background 0.3s ease;
  z-index: 10;
}

.slide-btn:hover {
  background: #ffd700;
  color: #000;
}

.slide-btn.prev {
  left: 1rem;
}

.slide-btn.next {
  right: 1rem;
}

@media (max-width: 600px) {
  .slide-caption {
    font-size: 1rem;
  }

  .slide-btn {
    font-size: 1.5rem;
  }
}

</style>
    <div class="slide-container">
      <button class="slide-btn prev" aria-label="Slide anterior">&#10094;</button>
      <div class="slide-wrapper">
        ${services.map((s, i) => `
          <div class="slide-item${i === 0 ? ' active' : ''}" role="group" aria-roledescription="slide" aria-label="${s.titulo}">
                        <div class="slide-caption">${s.titulo}</div>
                        <img src="${s.img}" alt="${s.titulo}">

          </div>
        `).join('')}
      </div>
      <button class="slide-btn next" aria-label="Próximo slide">&#10095;</button>
    </div>
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

