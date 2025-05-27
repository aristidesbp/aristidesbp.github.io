// js/controller.js

/**
 * Classe Controller responsável por gerenciar a interação
 * entre Model e View, controlando o fluxo da aplicação.
 */
export class PortfolioController {
  /**
   * Construtor que recebe as instâncias da View e do Model.
   * @param {Object} view - Instância da View, responsável por renderizar o DOM.
   * @param {Object} model - Objeto contendo os dados do portfólio.
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  /**
   * Inicializa o controlador, configurando os eventos e renderizando os componentes.
   */
  init() {
    // Aguarda o carregamento do DOM para iniciar a renderização
    document.addEventListener("DOMContentLoaded", () => {
      this.view.loadHeader();                 // Carrega o cabeçalho via DOM
      this.view.renderPortfolio(this.model); // Renderiza os dados do portfólio no conteúdo principal
    });
  }
}

// Criando uma instância e inicializando o controlador automaticamente
// Importante: Certifique-se de importar esta classe e os módulos de view e model corretamente onde for usar.

