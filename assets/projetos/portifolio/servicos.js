// assets/js/servicos.js

function criarServicos() {
  const container = document.getElementById("componente-servicos");

  if (!container) return;

  const servicos = [
    {
      titulo: "Desenvolvimento Web",
      descricao: "Criação de sites rápidos, responsivos e otimizados para conversão.",
      extra: "Tecnologias como HTML, CSS, JS, frameworks modernos e SEO."
    },
    {
      titulo: "Gestão de Tráfego Pago",
      descricao: "Campanhas no Google Ads e Meta Ads com foco em ROI.",
      extra: "Segmentação avançada, copy persuasiva e funis de vendas."
    },
    {
      titulo: "Consultoria Estratégica",
      descricao: "Planejamento digital sob medida para sua empresa crescer.",
      extra: "Diagnóstico, plano de ação e acompanhamento de métricas."
    }
  ];

  container.innerHTML = `
    <div class="servicos-wrapper">
      ${servicos.map((s, i) => `
        <div class="card-servico" data-index="${i}">
          <h3>${s.titulo}</h3>
          <p>${s.descricao}</p>
          <div class="extra">${s.extra}</div>
          <button class="btn-toggle">Saiba mais</button>
        </div>
      `).join('')}
    </div>
  
<style>
/* assets/css/Servicos.css */
#componente-servicos {
  background: #111;
  color: #FFD700;
  padding: 4rem 2rem;
  font-family: 'DM Sans', sans-serif;
}

.servicos-wrapper {
  max-width: 1100px;
  margin: auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card-servico {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card-servico:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.card-servico h3 {
  margin-bottom: 0.5rem;
}

.card-servico p {
  color: #ccc;
  margin-bottom: 1rem;
}

.card-servico .extra {
  display: none;
  color: #fff;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.card-servico.ativo .extra {
  display: block;
}

.btn-toggle {
  background: #FFD700;
  border: none;
  color: #000;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-toggle:hover {
  background: #e0c100;
}

</style>
`;

  container.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card-servico');
      card.classList.toggle('ativo');
    });
  });
}

