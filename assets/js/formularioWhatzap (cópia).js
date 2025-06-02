/* 
  <!-- Aqui o formulário será inserido -->
  <div id="formularioWhatzap"></div>
  <!-- Carrega o módulo -->
  <script src="formularioWhatzap.js"></script>
  <!-- Inicializa o módulo apontando para a div -->
  <script> ModuloFormularioWhatsapp.init("formularioWhatzap");</script>
*/


// ===============================
// OBJETO FORMULARIO WHATSAPP
// ===============================
const ModuloFormularioWhatsapp = (() => {

  // 1. Cria e injeta o estilo CSS isolado no <head>
  function criarEstilos() {
    const estilo = document.createElement('style');
    estilo.innerHTML = `

      #formulario-whatzap-container {
        max-width: 500px;
        margin: 40px auto;
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0,0,0,0.15);
        font-family: Arial, sans-serif;
      }
      #formulario-whatzap-container label {
        display: block;
        margin-top: 15px;
        font-weight: bold;
      }
      #formulario-whatzap-container input,
      #formulario-whatzap-container textarea {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
      }
      #formulario-whatzap-container textarea {
        resize: vertical;
        min-height: 80px;
      }
      #formulario-whatzap-container button {
        margin-top: 20px;
        width: 100%;
        padding: 12px;
        background-color: #25D366;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
      #formulario-whatzap-container button:hover {
        background-color: #1ebe57;
      }
    `;
    document.head.appendChild(estilo);
  }

  // 2. Injeta o HTML do formulário em qualquer div com ID definido
  function montarFormulario(idDestino = "formularioWhatzap") {
    const container = document.getElementById(idDestino);
    if (!container) return console.error("ID de destino não encontrado!");

    container.innerHTML = `
      <div id="formulario-whatzap-container">
        <form id="formulario-whatzap-form">
          <h2>Pedido de Portfólio</h2>

          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" />

          <label for="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" placeholder="Ex: 5591999999999" />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label for="empresa">Empresa:</label>
          <input type="text" id="empresa" name="empresa" />

          <label for="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao"></textarea>

          <button type="submit">Enviar via WhatsApp</button>
        </form>
      </div>
    `;

    inicializarLogica();
  }

  // 3. Classe responsável por tratar dados e redirecionar para o WhatsApp
  class PedidoWhatsapp {
    constructor(form, telefoneDestino) {
      this.form = form;
      this.telefone = telefoneDestino;

      this.form.addEventListener("submit", (e) => this.enviar(e));
    }

    limparTexto(texto) {
      return texto.replace(/[^\w\s\.,\-@:\r\náéíóúãõçÁÉÍÓÚÃÕÇ]/g, '');
    }

    montarMensagem(dados) {
      let mensagem = "*NOVO PEDIDO DE PORTFÓLIO*\r\n";
      mensagem += "----------------------------------\r\n\r\n";
      for (const [chave, valor] of Object.entries(dados)) {
        if (valor.trim()) {
          mensagem += `${chave.toUpperCase()}: ${valor.trim()}\r\n`;
        }
      }
      return mensagem;
    }

    enviar(evento) {
      evento.preventDefault();

      const dados = {
        nome: this.limparTexto(this.form.nome.value),
        telefone: this.limparTexto(this.form.telefone.value),
        email: this.limparTexto(this.form.email.value),
        empresa: this.limparTexto(this.form.empresa.value),
        descricao: this.limparTexto(this.form.descricao.value),
      };

      const mensagem = this.montarMensagem(dados);
      const url = `https://wa.me/${this.telefone}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    }
  }

  // 4. Inicializa a lógica do formulário após inserção no DOM
  function inicializarLogica() {
    const form = document.getElementById("formulario-whatzap-form");
    if (!form) return;
    new PedidoWhatsapp(form, "5591992420981");
  }

  // 5. Função pública para uso externo
  function init(idDivAlvo = "formularioWhatzap") {
    criarEstilos();
    montarFormulario(idDivAlvo);
  }

  // Exposição pública do método `init`
  return {
    init
  };

})();

