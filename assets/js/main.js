// arquivo: main.js
// Importando funções de outros arquivos para serem usadas neste script
import { navebar } from "./navebar.js";
import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

// Selecionando elementos importantes do HTML
const navigation = document.querySelector("#navigation"); // Menu de navegação
const backToTopButton = document.querySelector("#backToTopButton"); // Botão "Voltar ao Topo"
const toggle = document.querySelector("#sw-checkbox"); // Botão de alternância de tema (dark/light mode)
const navbarSection = document.querySelector("#navebar .wrapper"); // Área onde sera exibido a navebar
const projectsSection = document.querySelector("#projects .wrapper"); // Área onde serão exibidos os projetos
// Selecionando elementos de animação
const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");


// Evento disparado quando a página termina de carregar
window.addEventListener("load", function begin() {
  // Exibe os projetos ao carregar a página
  projetos(projectsSection);
  
  // Seleciona o botão para exibir os desafios
  const desafioBtn = document.querySelector("#desafio");

  // Adiciona evento ao botão de desafio
  desafioBtn.addEventListener("click", () => {
    // Exibe os desafios ao clicar
    desafios(projectsSection);
    
    // Adiciona evento para voltar à lista de projetos
    document
      .querySelector("#backToProjectsBtn")
      .addEventListener("click", begin);
  });
});


// Adiciona evento para detectar rolagem da página
window.addEventListener("scroll", onScroll);
// Chama a função onScroll para verificar status inicial
onScroll();

