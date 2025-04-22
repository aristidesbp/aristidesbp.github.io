// arquivo: main.js

// Adiciona evento para detectar rolagem da página
window.addEventListener("scroll", onScroll);
// Chama a função onScroll para verificar status inicial
onScroll();

//<Renderiza a navbar na página>
import { navbar } from "./navbar.js";
const navbarSection = document.querySelector("#navbar");
navbar(navbarSection);
//</Renderiza a navbar na página>

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
