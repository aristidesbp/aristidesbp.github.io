// js/model.js

// Classe que representa o modelo de dados do portfólio
export class PortfolioModel {
  // O construtor inicializa os dados padrão do portfólio
  constructor() {
    this.dados = {
      // Informações pessoais ou "Sobre mim"
      sobre: "Sou Aristides, desenvolvedor Front-end e gestor de tráfego pago. Trabalho com soluções inteligentes e foco em resultado.",

      // Lista de projetos com nome e link
      projetos: [
        { nome: "Projeto Coworking", link: "https://github.com/aristidesbp/projeto-coworking" },
        { nome: "App Lista de Tarefas", link: "https://github.com/aristidesbp/app-lista-tarefas" }
      ],

      // Dados de contato (pode ser expandido futuramente)
      contato: {
        email: "aristides@example.com"
      }
    };
  }

  // Método para obter todos os dados do portfólio
  getDados() {
    return this.dados;
  }

  // Método para adicionar um novo projeto ao portfólio
  adicionarProjeto(nome, link) {
    this.dados.projetos.push({ nome, link });
  }

  // Método para atualizar a seção "sobre"
  atualizarSobre(novoTexto) {
    this.dados.sobre = novoTexto;
  }

  // Método para atualizar o e-mail de contato
  atualizarEmail(novoEmail) {
    this.dados.contato.email = novoEmail;
  }
}

