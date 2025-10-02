// assets/js/hero.js

function criarHero() {
  const hero = document.getElementById("componente-hero");

  if (!hero) return;

  hero.innerHTML = `

<style>
/* assets/css/Hero.css */
#componente-hero {
  background: linear-gradient(135deg, #000, #1a1a1a);
  color: #FFD700;
  padding: 5rem 2rem;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
}

.hero-container {
  max-width: 900px;
  margin: 0 auto;
}

.hero-texto h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-texto p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #ccc;
}

.cta-btn {
  background: #FFD700;
  color: #000;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.cta-btn:hover {
  background: #e0c100;
}

@media (max-width: 768px) {
  .hero-texto h2 {
    font-size: 2rem;
  }

  .hero-texto p {
    font-size: 1rem;
  }
}

</style>
    <section class="hero-container">
      <div class="hero-texto">
        <h2>Soluções Digitais Que Convertem</h2>
        <p>Desenvolvimento web, design e tráfego pago com foco em resultados reais.</p>
        <a href="assets/formabp.html" class="cta-btn">Solicite um orçamento</a>
      </div>
    </section>
  `;
}

