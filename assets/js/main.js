// arquivo: main.js

// Adiciona evento para detectar rolagem da página
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

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

//<Renderiza a buton-troca-tema na página>
import { themeToggle } from "./themeToggle.js";
const themeToggleContainer = document.querySelector("#theme-toggle");
themeToggle(themeToggleContainer);
//</Renderiza a buton-troca-tema na página>

//<Renderiza o sobre-mim na página>
import { aboutMe } from "./aboutMe.js";
const aboutMeContainer = document.querySelector("#about-section");
aboutMe(aboutMeContainer);
//</Renderiza o sobre-mim na página>
