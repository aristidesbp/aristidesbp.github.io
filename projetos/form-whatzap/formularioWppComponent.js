// formularioWppComponent.js
// ✅ Web Component reutilizável para agendamento de serviços de consultoria

class FormularioWppComponent extends HTMLElement {
  constructor() {
    super();
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
        .formulario-wpp .servicos {
          margin-top: 10px;
        }
        .formulario-wpp .servicos label {
          font-weight: normal;
          display: block;
          margin-top: 5px;
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
        <h2>Agende sua Consultoria</h2>
        <label>Nome: <input type="text" name="nome" required /></label>
        <label>Telefone: <input type="tel" name="telefone" required pattern="\\d{10,11}" placeholder="Apenas números" /></label>
        <label>CPF: <input type="text" name="cpf" required pattern="\\d{11}" placeholder="Somente números" /></label>
        <label>Email: <input type="email" name="email" required /></label>
        <label>Data: <input type="date" name="data" required /></label>
        <label>Hora: <input type="time" name="hora" required /></label>
        <label>Descrição: <textarea name="descricao"></textarea></label>

        <div class="servicos">
          <strong>Serviços:</strong>
          <label><input type="checkbox" name="servicos" value="Tráfego Pago" data-preco="100"> Tráfego Pago - R$100,00</label>
          <label><input type="checkbox" name="servicos" value="Tráfego Orgânico" data-preco="100"> Tráfego Orgânico - R$100,00</label>
          <label><input type="checkbox" name="servicos" value="Redes Sociais" data-preco="100"> Redes Sociais - R$100,00</label>
          <label><input type="checkbox" name="servicos" value="Criação de Site" data-preco="100"> Criação de Site - R$100,00</label>
        </div>

        <button type="submit">Agendar via WhatsApp</button>
      </form>
    `;
  }

  configureSubmit() {
    const form = this.shadow.querySelector("#formulario-wpp-form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const servicoCheckboxes = [...form.querySelectorAll("input[name='servicos']:checked")];
      let total = 0;
      const servicosSelecionados = servicoCheckboxes.map(cb => {
        total += parseFloat(cb.dataset.preco);
        return cb.value;
      });

      const dados = {
        nome: this.clean(form.nome.value),
        telefone: this.clean(form.telefone.value),
        cpf: this.clean(form.cpf.value),
        email: this.clean(form.email.value),
        data: form.data.value,
        hora: form.hora.value,
        descricao: this.clean(form.descricao.value),
        servicos: servicosSelecionados.join(", "),
        total
      };

      const mensagem = this.formatMessage(dados);
      const url = `https://wa.me/${this.numero}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    });
  }

  clean(texto) {
    return texto.replace(/[^À-ú\w\s\.\,\-@:\r\n]/g, '').trim();
  }

  formatMessage(dados) {
    let mensagem = "*AGENDAMENTO DE CONSULTORIA*\r\n------------------------------\r\n\r\n";
    for (let campo in dados) {
      if (campo !== 'total' && dados[campo]) {
        mensagem += `${campo.toUpperCase()}: ${dados[campo]}\r\n`;
      }
    }
    mensagem += `\r\nTOTAL: R$${dados.total.toFixed(2)}\r\n`;
    return mensagem;
  }
}

customElements.define('formulario-wpp', FormularioWppComponent);

