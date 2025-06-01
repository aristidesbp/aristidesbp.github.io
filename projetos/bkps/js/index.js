// index.js - Interatividade com animações e efeitos
document.addEventListener("DOMContentLoaded", () => {
  // Quando a página carregar, exibe mensagem de boas-vindas animada
  const boasVindas = document.querySelector('.boasVindas'); // Seleciona o elemento com a classe .boasVindas
  boasVindas.style.opacity = 0;                              // Começa invisível
  boasVindas.style.transition = "opacity 2s ease-in";        // Transição suave de opacidade

  // Espera 500ms antes de aparecer
  setTimeout(() => {
    boasVindas.style.opacity = 1;                            // Torna visível
  }, 500);

  // Adiciona um alerta ao clicar no título do site
  const titulo = document.getElementById("tituloSite");      // Seleciona o ID #tituloSite
  titulo.style.cursor = "pointer";                           // Muda o cursor ao passar por cima

  titulo.addEventListener("click", () => {
    alert("🚀 Você clicou no título! Bem-vindo ao site do AristidesBP!"); // Mostra alerta
  });

  // Anima os links ao passar o mouse com leve zoom
  const links = document.querySelectorAll('.lista-links a'); // Seleciona todos os links da lista

  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.transform = "scale(1.05)";                   // Aumenta o tamanho
      link.style.transition = "transform 0.2s ease-in-out";   // Suaviza a animação
    });

    link.addEventListener('mouseout', () => {
      link.style.transform = "scale(1)";                      // Volta ao tamanho original
    });
  });
});
