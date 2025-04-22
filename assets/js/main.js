// arquivo: main.js
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
