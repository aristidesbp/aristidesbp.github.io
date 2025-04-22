// arquivo: main.js

// Adiciona evento para detectar rolagem da página
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

// Adiciona evento voltar-topo
function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

//<Renderiza a navbar na página>
import { navbar } from "./navbar.js";
const navbarSection = document.querySelector("#navbar");
navbar(navbarSection);
//</Renderiza a navbar na página>

//<Renderiza a home na página>
import { home } from "./home.js";
// Renderiza o componente Home
const homeContainer = document.querySelector("#home-section");
home(homeContainer);
//</Renderiza a home na página>

//<Renderiza a contact na página>
import { contact } from "./contact.js";
const contactContainer = document.querySelector("#contact-section");
contact(contactContainer);
//</Renderiza a contact na página>

//<Renderiza o sobre-mim na página>
import { aboutMe } from "./aboutMe.js";
const aboutMeContainer = document.querySelector("#about-section");
aboutMe(aboutMeContainer);
//</Renderiza o sobre-mim na página>


// Renderiza o componente Conhecimentos
import { knowledge } from "./knowledge.js";
const knowledgeContainer = document.querySelector("#knowledge-section");
knowledge(knowledgeContainer);


// Renderiza o componente Projetos
import { projects } from "./projects.js";
const projectsContainer = document.querySelector("#projects-section");
projects(projectsContainer);

// Renderiza o componente Footer
import { footer } from "./footer.js";
const footerContainer = document.querySelector("#footer-section");
footer(footerContainer);


//<Renderiza a buton-troca-tema na página>
import { themeToggle } from "./themeToggle.js";
const themeToggleContainer = document.querySelector("#theme-toggle");
themeToggle(themeToggleContainer);
//</Renderiza a buton-troca-tema na página>
