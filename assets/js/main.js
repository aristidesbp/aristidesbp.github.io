// arquivo: main.js
//<Renderiza a navbar na página>
import { navbar } from "./navbar.js";
const navbarSection = document.querySelector("#navbar");
navbar(navbarSection);
//</Renderiza a navbar na página>

// arquivo: main.js
// Importando funções de outros arquivos para serem usadas neste script
import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

// Selecionando elementos importantes do HTML
const navigation = document.querySelector("#navigation"); // Menu de navegação
const backToTopButton = document.querySelector("#backToTopButton"); // Botão "Voltar ao Topo"
const toggle = document.querySelector("#sw-checkbox"); // Botão de alternância de tema (dark/light mode)
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

// Remove animações e esconde o primeiro notebook após 4 segundos
window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0; // Esconde notebook_1
  
  // Remove todas as animações
  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);

// Função principal de rolagem
function onScroll() {
  showNavOnScroll(); // Mostra/oculta o fundo do menu conforme a rolagem
  showBackToTopButtonOnScroll(); // Mostra/oculta botão "Voltar ao Topo"

  // Ativa o menu conforme a seção visível
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

// Ativa o menu baseado na seção visível
function activateMenuAtCurrentSection(section) {
  // Linha alvo: metade da tela vertical
  const targetLine = scrollY + innerHeight / 2;

  // Posição do topo da seção
  const sectionTop = section.offsetTop;
  // Altura da seção
  const sectionHeight = section.offsetHeight;

  // Verifica se a seção chegou ou passou da linha alvo
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;

  // Define o fim da seção
  const sectionEndsAt = sectionTop + sectionHeight;
  // Verifica se a seção passou da linha alvo
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  // Verifica se a linha alvo está dentro da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  // Obtém o ID da seção e seleciona o item do menu correspondente
  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  // Remove a classe 'active' de qualquer item do menu
  menuElement.classList.remove("active");

  // Adiciona 'active' ao item correspondente à seção visível
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

// Função que exibe ou esconde a barra de navegação ao rolar
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll"); // Adiciona fundo ao menu ao rolar
  } else {
    navigation.classList.remove("scroll"); // Remove fundo ao voltar ao topo
  }
}

// Função que exibe ou esconde o botão "Voltar ao Topo"
function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show"); // Mostra o botão
  } else {
    backToTopButton.classList.remove("show"); // Esconde o botão
  }
}

// Ativa o menu de navegação lateral (hambúrguer)
openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open"); // Botões de abrir menu
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded"); // Abre o menu
    });
  });
}

// Fecha o menu de navegação lateral
closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close"); // Botões de fechar menu
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded"); // Fecha o menu
    });
  });
}

// Efeito de animação ao rolar usando a biblioteca ScrollReveal
ScrollReveal({
  origin: "bottom",    // Anima a partir da parte inferior
  distance: "50px",    // Distância do movimento
  duration: 1000,      // Duração da animação (1 segundo)
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

// Alternância entre modo claro e escuro (dark/light mode)
toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode"); // Alterna a classe do body
});
