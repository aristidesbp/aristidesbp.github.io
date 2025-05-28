// 💡 Classe responsável por carregar componentes HTML dinamicamente na página
class ComponentLoader {

  // 🔧 Construtor da classe, recebe os IDs dos elementos onde os componentes serão injetados
  constructor(headerId, conteudoId, footerId) {
    this.headerElement = document.getElementById(headerId);   // 🧩 Elemento do header
    this.conteudoElement = document.getElementById(conteudoId); // 🧩 Elemento principal de conteúdo
    this.footerElement = document.getElementById(footerId);   // 🧩 Elemento do footer
  }

  // 🚀 Método para carregar qualquer arquivo HTML em um determinado elemento
  carregarArquivo(caminho, destinoElement) {
    fetch(caminho)                         // 📥 Faz a requisição do arquivo
      .then(response => response.text())   // 📄 Converte a resposta em texto
      .then(data => {
        destinoElement.innerHTML = data;   // 🎯 Insere o conteúdo no elemento de destino
      })
      .catch(error => {
        console.error(`❌ Erro ao carregar o arquivo ${caminho}:`, error); // 🚨 Trata erro
      });
  }

  // 📦 Método que carrega os componentes fixos ao iniciar a página
  carregarComponentesFixos() {
    this.carregarArquivo('header.html', this.headerElement);   // 🔼 Header
    this.carregarArquivo('sobre.html', this.conteudoElement);  // 🧠 Conteúdo inicial (sobre.html)
    this.carregarArquivo('footer.html', this.footerElement);   // 🔽 Footer
  }

  // 🔁 Método para trocar o conteúdo da div #conteudo dinamicamente com base no <select>
  trocarConteudo(caminhoArquivo) {
    this.carregarArquivo(caminhoArquivo, this.conteudoElement); // 🧠 Atualiza a área de conteúdo com novo arquivo
  }

} // 🔚 Fim da classe ComponentLoader

// ✅ Instancia a classe quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  
  // 🧱 Cria o objeto carregador de componentes
  const loader = new ComponentLoader('meu-header', 'conteudo', 'meu-footer');

  // 🚀 Carrega os componentes fixos (header, sobre, footer)
  loader.carregarComponentesFixos();

  // 📥 Adiciona o evento para escutar mudanças no <select>
  const seletor = document.getElementById("seletorConteudo");

  // ⏳ Quando o <select> mudar de valor, chama o método da classe para trocar o conteúdo
  seletor.addEventListener("change", () => {
    const paginaSelecionada = seletor.value; // Ex: 'contato.html'
    loader.trocarConteudo(paginaSelecionada); // 🧠 Troca conteúdo sem recarregar a página
  });

});
