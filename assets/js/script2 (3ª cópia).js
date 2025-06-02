/* 
  Classe responsável por carregar dinamicamente os componentes da página 
  e trocar os conteúdos com base no seletor.
*/

class CarregadorComponentes {
  
  constructor() {
    // Iniciar o carregamento dos componentes principais da página
    this.carregarHeader();
    this.carregarFooter();
    this.carregarConteudo('sobre.html'); // Carrega a página padrão inicial
  }

  // 🔼 Carrega o conteúdo do header.html
  carregarHeader() {
    fetch('header.html') // Busca o arquivo header.html
      .then(response => response.text()) // Converte para texto
      .then(data => {
        document.getElementById('meu-header').innerHTML = data; // Insere no DOM
        this.configurarSeletor(); // Chama o método para ativar o <select> após inserido no DOM
      })
      .catch(error => console.error('Erro ao carregar o header:', error));
  }

  // 🔽 Carrega o conteúdo do footer.html
  carregarFooter() {
    fetch('footer.html') // Busca o footer
      .then(response => response.text()) // Converte para texto
      .then(data => {
        document.getElementById('meu-footer').innerHTML = data; // Insere no DOM
      })
      .catch(error => console.error('Erro ao carregar o footer:', error));
  }

  // 📄 Carrega qualquer página HTML dentro da div#conteudo
  carregarConteudo(pagina) {
    fetch(pagina) // Busca a página
      .then(response => response.text()) // Converte para texto
      .then(data => {
        document.getElementById('conteudo').innerHTML = data; // Insere o conteúdo
      })
      .catch(error => console.error('Erro ao carregar o conteúdo:', error));
  }

  // 🎯 Configura o seletor de páginas após o header ser inserido no DOM
  configurarSeletor() {
    const seletor = document.getElementById('seletorConteudo'); // Pega o select pelo ID
    if (seletor) {
      seletor.addEventListener('change', () => {
        const paginaSelecionada = seletor.value; // Pega o valor selecionado
        this.carregarConteudo(paginaSelecionada); // Chama o método da classe para trocar o conteúdo
      });
    }
  }
}

// ✅ Instancia a classe quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new CarregadorComponentes(); // Cria a instância e ativa tudo
});
