/* (1)->COLOQUE NO SEU HTML:
<div id="functionHenderFormulario"></div>
<script src="js/portifolio-aristides/functionHenderFormulario.js"></script>
<script>functionHenderFormulario();</script>
(2)-> RETIRE AS LINHA (1 & 2) DESTE COMENTARIO!*/

class FormularioPortfolio {
  constructor(containerId) {
    this.container = document.getElementById(containerId);  // Container principal
    this.formVisivel = false;  // Começa com o formulário recolhido
  }

  gerarHTML() {
    return `
      <!-- Botão de toggle -->
      <button id="toggleFormularioBtn">Exibir Formulário</button>

      <!-- Formulário começa escondido -->
      <div id="formularioContainer" style="display: none;">
        <div class="container">
          <h1>Formulário para criação de Portfólio</h1>
          <form id="formCliente">

            <!-- Dados Pessoais -->
            <fieldset>
              <legend>Informações Pessoais</legend>
              <label for="nomeCompleto">Nome completo:</label>
              <input type="text" id="nomeCompleto" name="nomeCompleto" required />
              <br>
              <label for="profissao">Profissão/Título:</label>
              <input type="text" id="profissao" name="profissao" required />
              <br>
              <label for="bio">Descrição pessoal:</label>
              <textarea id="bio" name="bio" rows="4" placeholder="Fale um pouco sobre você..."></textarea>
            </fieldset>
            <br>

            <!-- Serviços -->
            <fieldset>
              <legend>Serviços Oferecidos</legend>
              <label for="servicos">Descreva os serviços (separe por vírgulas):</label>
              <br>
              <textarea id="servicos" name="servicos" placeholder="Ex: Desenvolvimento Web, Consultoria, Tráfego Pago..."></textarea>
            </fieldset>
            <br>

            <!-- Redes Sociais -->
            <fieldset>
              <legend>Redes Sociais</legend>
              <label for="github">GitHub:</label>
              <input type="url" id="github" name="github" />
              <label for="linkedin">LinkedIn:</label>
              <input type="url" id="linkedin" name="linkedin" />
              <label for="instagram">Instagram:</label>
              <input type="url" id="instagram" name="instagram" />
              <label for="twitter">Twitter:</label>
              <input type="url" id="twitter" name="twitter" />
            </fieldset>

            <!-- Preferências Visuais -->
            <fieldset>
              <legend>Estilo do Site</legend>
              <label for="corPrimaria">Cor Primária:</label>
              <input type="color" id="corPrimaria" name="corPrimaria" value="#f9c74f" />
              <label for="fonte">Fonte preferida:</label>
              <input type="text" id="fonte" name="fonte" placeholder="Ex: DM Sans, Roboto, etc." />
            </fieldset>

            <!-- Botão de envio -->
            <button type="submit">Enviar Dados</button>
          </form>
        </div>
      </div>
    `;
  }

  render() {
    this.container.innerHTML = this.gerarHTML();
    this.adicionarEventos();
  }

  adicionarEventos() {
    const toggleBtn = document.getElementById("toggleFormularioBtn");
    const formularioContainer = document.getElementById("formularioContainer");

    toggleBtn.addEventListener("click", () => {
      this.formVisivel = !this.formVisivel;  // Alterna visibilidade

      formularioContainer.style.display = this.formVisivel ? "block" : "none";
      toggleBtn.textContent = this.formVisivel ? "Recolher Formulário" : "Exibir Formulário";
    });
  }
}

// Função para renderizar o formulário dinamicamente
function functionHenderFormulario() {
  const formulario = new FormularioPortfolio("functionHenderFormulario");
  formulario.render();
}

