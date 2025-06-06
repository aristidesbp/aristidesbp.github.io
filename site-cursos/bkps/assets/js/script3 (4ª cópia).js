/* 
  Classe responsável por carregar dinamicamente os componentes da página 
  e trocar os conteúdos com base no seletor.
*/

class CarregadorComponentes {
  
  constructor() {
    // Inicia o carregamento dos principais componentes da página
    this.carregarHeader();           // Carrega o header (com o seletor de páginas)
    this.carregarFooter();           // Carrega o rodapé
    this.carregarConteudo('sobre.html'); // Carrega o conteúdo inicial padrão (home)
  }

  // 🔼 Carrega o conteúdo do header.html
  carregarHeader() {
    fetch('header.html')                      // Faz o fetch do header.html
      .then(response => response.text())      // Converte a resposta para texto
      .then(data => {
        document.getElementById('meu-header').innerHTML = data; // Insere o HTML no DOM
        this.configurarSeletor(); // Após inserir o header, configura o evento do seletor
      })
      .catch(error => console.error('Erro ao carregar o header:', error));
  }

  // 🔽 Carrega o conteúdo do footer.html
  carregarFooter() {
    fetch('footer.html')                      // Faz o fetch do footer.html
      .then(response => response.text())      // Converte para texto
      .then(data => {
        document.getElementById('meu-footer').innerHTML = data; // Insere no DOM
      })
      .catch(error => console.error('Erro ao carregar o footer:', error));
  }

  // 📄 Carrega qualquer conteúdo (HTML ou MD) dentro da div#conteudo
  carregarConteudo(pagina) {
    // Verifica se o arquivo termina com .md (Markdown)
    if (pagina.endsWith('.md')) {
      fetch(pagina)                            // Busca o arquivo .md
        .then(response => response.text())     // Converte para texto (Markdown puro)
        .then(md => {
          const htmlConvertido = marked.parse(md); // Converte Markdown em HTML usando marked.js
          document.getElementById('conteudo').innerHTML = htmlConvertido; // Insere no DOM
        })
        .catch(error => console.error('Erro ao carregar o arquivo .md:', error));
    } else {
      // Carregamento padrão para arquivos .html
      fetch(pagina)                             // Busca a página HTML
        .then(response => response.text())      // Converte para texto
        .then(data => {
          document.getElementById('conteudo').innerHTML = data; // Insere o HTML no DOM
        })
        .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    }
  }

  // 🎯 Configura o seletor de páginas (<select>) após o header estar pronto
  configurarSeletor() {
    const seletor = document.getElementById('seletorConteudo'); // Pega o <select> pelo ID
    if (seletor) {
      seletor.addEventListener('change', () => {
        const paginaSelecionada = seletor.value;         // Pega o valor selecionado
        this.carregarConteudo(paginaSelecionada);        // Carrega o conteúdo correspondente
      });
    }
  }
}

// ✅ Inicializa a classe assim que o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new CarregadorComponentes(); // Instancia e executa a classe
});
