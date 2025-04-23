// arquivo: main.js
/*##############################################################*/
// Adiciona evento para detectar rolagem da página
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

/*##############################################################*/
// Adiciona evento voltar-topo
function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

/*##############################################################*/
//<Renderiza a navbar na página>
import { navbar } from "./navbar.js";
const navbarSection = document.querySelector("#navbar");
navbar(navbarSection);
//</Renderiza a navbar na página>

/*##############################################################*/
//<Renderiza a home na página>
import { home } from "./home.js";
// Renderiza o componente Home
const homeContainer = document.querySelector("#home-section");
home(homeContainer);
//</Renderiza a home na página>

/*##############################################################*/
//<Renderiza a contact na página>
import { contact } from "./contact.js";
const contactContainer = document.querySelector("#contact-section");
contact(contactContainer);
//</Renderiza a contact na página>

/*##############################################################*/
//<Renderiza o sobre-mim na página>
import { aboutMe } from "./aboutMe.js";
const aboutMeContainer = document.querySelector("#about-section");
aboutMe(aboutMeContainer);
//</Renderiza o sobre-mim na página>


/*##############################################################*/
// Renderiza o componente Conhecimentos
import { knowledge } from "./knowledge.js";
const knowledgeContainer = document.querySelector("#knowledge-section");
knowledge(knowledgeContainer);


/*##############################################################
// Renderiza o componente Projetos
import { projects } from "./projects.js";
const projectsContainer = document.querySelector("#projects-section");
projects(projectsContainer);*/

/*##############################################################*/
// Renderiza o componente Footer
import { footer } from "./footer.js";
const footerContainer = document.querySelector("#footer-section");
footer(footerContainer);




/*##############################################################*/
//<Renderiza a buton-troca-tema na página>
import { themeToggle } from "./themeToggle.js";
const themeToggleContainer = document.querySelector("#theme-toggle");
themeToggle(themeToggleContainer);
//</Renderiza a buton-troca-tema na página>


*##############################################################*/
//</Renderiza a projetos na página>
import { projetos } from "./projetos.js";
const projectsSection = document.querySelector("#projects .wrapper");
projetos(projectsSection);


/*##############################################################*/
window.addEventListener("scroll", onScroll);
onScroll();
//Adiciona o evento scroll à janela para executar a função onScroll toda vez que o usuário rolar a página.
//Executa onScroll() imediatamente após a definição.
window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0;
/*Após 4 segundos (setTimeout), torna o elemento #notebook-1 invisível (opacity = 0) e desativa as animações de todos os notebooks e do vidro.
*/
  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);


/*##############################################################*/
function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
/*function onScroll() {
Chama funções auxiliares (showNavOnScroll, showBackToTopButtonOnScroll, activateMenuAtCurrentSection) para alterar elementos da interface com base na posição de rolagem da página.
*/}

/*##############################################################*/
function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;
  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;
  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);
  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
/* function activateMenuAtCurrentSection(section) {
- Destacar o menu ativo:
Determina se uma seção (about, projects, etc.) está visível no centro da janela.
- Adiciona a classe active ao menu correspondente para destacar qual seção está sendo exibida.
*/}

/*##############################################################*/
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
/*Alterar estilo do menu ao rolar:
Adiciona a classe scroll ao #navigation quando o usuário rola a página para alterar seu estilo (como fundo transparente).
*/}

/*##############################################################*/
function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
/* Mostrar botão "Voltar ao topo":
Exibe o botão #backToTopButton quando o usuário rola mais de 550px na página.
*/}

/*##############################################################*/
openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
/*Abrir menu lateral:
Adiciona eventos aos botões com a classe .open para expandir o menu lateral ao clicar.
*/}

/*##############################################################*/
closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
/*Fechar menu lateral:
Adiciona eventos aos botões com a classe .close para recolher o menu lateral ao clicar.
*/}

/*##############################################################*/
ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
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
/* ScrollReveal (animações ao rolar a página):
Configura animações para elementos especificados (ex.: #home, #about, etc.) para surgirem de baixo para cima (origin: "bottom").
*/

/*##############################################################*/
toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});
/*Trocar tema claro/escuro:
Alterna a classe light-mode ao <body> quando o estado do checkbox #sw-checkbox é alterado.
*/


