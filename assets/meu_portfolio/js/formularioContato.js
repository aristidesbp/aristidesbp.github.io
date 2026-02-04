// assets/js/formularioContato.js

function criarFormularioContato() {
  const form = document.getElementById("main-formularioContato");
  if (!form) return;

  form.innerHTML = `


<style>
/* assets/css/FormularioContato.css */
#main-formularioContato {
  background: #000;
  color: #fff;
  padding: 4rem 2rem;
  font-family: 'DM Sans', sans-serif;
}

.form-lead {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-lead input,
.form-lead textarea {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: #1a1a1a;
  color: #fff;
}

.form-lead label {
  font-weight: bold;
}

.form-lead fieldset {
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-lead button {
  background: #FFD700;
  color: #000;
  padding: 0.75rem 1.25rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.form-lead button:hover {
  background: #e0c100;
}

</style>
    <form id="formLead" class="form-lead">
      <h2>Solicite um Orçamento</h2>

      <label for="nome">Nome*</label>
      <input type="text" id="nome" name="nome" required>

      <label for="email">Email*</label>
      <input type="email" id="email" name="email" required>

      <label for="whatsapp">WhatsApp*</label>
      <input type="tel" id="whatsapp" name="whatsapp" required>

      <fieldset>
        <legend>Serviços de interesse*</legend>
        <label><input type="checkbox" name="servicos" value="Desenvolvimento Web"> Desenvolvimento Web</label>
        <label><input type="checkbox" name="servicos" value="Tráfego Pago"> Tráfego Pago</label>
        <label><input type="checkbox" name="servicos" value="Consultoria Estratégica"> Consultoria Estratégica</label>
      </fieldset>

      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" rows="4"></textarea>

      <button type="submit">Enviar via WhatsApp</button>
    </form>
  `;

  document.getElementById("formLead").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const servicos = Array.from(document.querySelectorAll('input[name="servicos"]:checked'))
      .map(cb => cb.value)
      .join(', ');
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !whatsapp || !servicos) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const texto = `Olá! Me chamo ${nome}. Tenho interesse nos serviços: ${servicos}.
Email: ${email}
WhatsApp: ${whatsapp}
Mensagem: ${mensagem || "N/A"}`;

    const url = `https://wa.me/5591992420981?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
}

