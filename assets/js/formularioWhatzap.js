// formularioWpp.js
// =======================================
// Módulo que renderiza um formulário e envia os dados via WhatsApp
// =======================================

const FormularioWpp = {
  // Inicializa o módulo e insere o formulário na página
  init: function (idDoContainer, numeroWhatsApp) {
    const container = document.getElementById(idDoContainer);
    if (!container) {
      console.error(`Elemento com ID '${idDoContainer}' não encontrado.`);
      return;
    }

    // Gera HTML com estilo e formulário
    container.innerHTML = this.templateHTML();
    this.setupEnvio(numeroWhatsApp);
  },

  // Template HTML com estilo modularizado
  templateHTML: function () {
    return `
<section class="formulario-wpp-container">
  <form id="formulario-wpp-form">
    <h2>Solicite seu Portfólio</h2>

    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" />

    <label for="telefone">Telefone:</label>
    <input type="tel" id="telefone" name="telefone" placeholder="Ex: 5591999999999" />

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" />

    <label for="empresa">Empresa:</label>
    <input type="text" id="empresa" name="empresa" />

    <label for="descricao">Descrição do pedido:</label>
    <textarea id="descricao" name="descricao"></textarea>

    <button type="submit">Enviar via WhatsApp</button>
  </form>
</section>

<style>
  .formulario-wpp-container {
    padding: 20px;
    max-width: 500px;
    margin: auto;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    font-family: Arial, sans-serif;
  }

  .formulario-wpp-container h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  .formulario-wpp-container label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
  }

  .formulario-wpp-container input,
  .formulario-wpp-container textarea {
    width: 100%;
    padding: 10px;
    margin-top: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .formulario-wpp-container textarea {
    min-height: 80px;
    resize: vertical;
  }

  .formulario-wpp-container button {
    margin-top: 20px;
    background-color: #25D366;
    color: white;
    border: none;
    padding: 12px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s ease;
  }

  .formulario-wpp-container button:hover {
    background-color: #1ebe57;
  }
</style>
    `;
  },

  // Configura o envio via WhatsApp
  setupEnvio: function (telefoneDestino) {
    const form = document.getElementById('formulario-wpp-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const dados = {
        nome: this.limpar(form.nome.value),
        telefone: this.limpar(form.telefone.value),
        email: this.limpar(form.email.value),
        empresa: this.limpar(form.empresa.value),
        descricao: this.limpar(form.descricao.value)
      };

      const mensagem = this.gerarMensagem(dados);
      const url = `https://wa.me/${telefoneDestino}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
    });
  },

  // Remove emojis e símbolos indesejados
  limpar: function (texto) {
    return texto.replace(/[^\w\s\.,\-@:\r\náéíóúãõçÁÉÍÓÚÃÕÇ]/g, '');
  },

  // Gera mensagem formatada
  gerarMensagem: function (dados) {
    let mensagem = "*NOVO PEDIDO DE PORTFÓLIO*\r\n------------------------------\r\n\r\n";
    for (let chave in dados) {
      if (dados[chave].trim()) {
        mensagem += `${chave.toUpperCase()}: ${dados[chave].trim()}\r\n`;
      }
    }
    return mensagem;
  }
};

