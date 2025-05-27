
// assets/js/controller.js
import { loadHeader, renderPortfolio } from "./view.js"; // importa funções da View
import { portfolioData } from "./model.js";              // importa dados do Model

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();                     // carrega o cabeçalho via DOM
  renderPortfolio(portfolioData);  // renderiza os dados no corpo da página
});
