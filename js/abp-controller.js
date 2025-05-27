
// assets/js/controller.js
import { loadHeader, renderPortfolio } from "./abp-view.js"; // importa funções da View
import { portfolioData } from "./abp-model.js";              // importa dados do Model

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();                     // carrega o cabeçalho via DOM
  renderPortfolio(portfolioData);  // renderiza os dados no corpo da página
});
