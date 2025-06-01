// formularioWppComponent.js
// ✅ Web Component reutilizável com encapsulamento total via Shadow DOM

class FormularioWppComponent extends HTMLElement {
  constructor() {
    super();

    // Shadow DOM com encapsulamento
    this.shadow = this.attachShadow({ mode: 'open' });
    this.numero = this.getAttribute('numero') || '5591999999999';
  }

  connectedCallback() {
    this.render();
    this.configureSubmit();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .formulario-wpp {
          font-family: Arial, sans-serif;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .formulario-wpp h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        .formulario-wpp label {
          display: block;
          margin-top: 15px;
          font-weight: bold;
        }
        .formulario-wpp input,
        .formulario-wpp textarea {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .formulario-wpp textarea {
          resize: vertical;
          min-height: 80px;
        }
        .formulario-wpp button {
          margin-top: 20px;
          width: 100%;
          padding: 12px;
          background: #25D366;
          color: white;
          border: none;
          font-size: 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .formulario-wpp button:hover {
          background: #1ebe57;
        }
      </style>

      <form class="formulario-wpp" id="formulario-wpp-form">
        <h2>Solicite seu Portfólio</h2>
        <label>Nome: <input type="text" name="nome" required /></label>
        <label>Telefone: <input type="tel" name="telefone" required /></label>
        <label>Email: <input type="email" name="email" required /></label>
        <label>Empresa: <input type="text" name="empresa" /></label>
        <label>Descrição: <textarea name="descricao"></textarea></label>
        <button type="submit">Enviar via WhatsApp</button>
      </form>
    `;
  }

  configureSubmit() {
    const form = this.shadow.querySelector("#formulario-wpp-form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const dados = {
        nome: this.clean(form.nome.value),
        telefone: this.clean(form.telefone.value),
        email: this.clean(form.email.value),
        empresa: this.clean(form.empresa.value),
        descricao: this.clean(form.descricao.value)
      };

      const mensagem = this.formatMessage(dados);
      const url = `https://wa.me/${this.numero}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    });
  }

  clean(texto) {
    return texto.replace(/[^\w\s\.,\-@:\r\náéíóúãõçÁÉÍÓÚÃÕÇ]/g, '');
  }

  formatMessage(dados) {
    let mensagem = "*NOVO PEDIDO DE PORTFÓLIO*\r\n------------------------------\r\n\r\n";
    for (let campo in dados) {
      if (dados[campo].trim()) {
        mensagem += `${campo.toUpperCase()}: ${dados[campo]}\r\n`;
      }
    }
    return mensagem;
  }
}

// Registra o componente
customElements.define('formulario-wpp', FormularioWppComponent);

