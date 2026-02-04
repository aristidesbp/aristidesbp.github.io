// assets/js/footer.js

function criarFooter() {
  const footer = document.getElementById("footer-container");
  if (!footer) return;

  footer.innerHTML = `

<style>
/* assets/css/Footer.css */
#footer-container {
  background: #111;
  color: #FFD700;
  padding: 2rem 1rem;
  font-family: 'DM Sans', sans-serif;
  text-align: center;
}

.footer-wrapper {
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.footer-social a {
  color: #FFD700;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}

.footer-social a:hover {
  color: #e0c100;
}

.footer-nav a {
  color: #FFD700;
  margin: 0 0.75rem;
  text-decoration: none;
  font-weight: 600;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.footer-copy {
  flex-basis: 100%;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ccc;
}

@media(min-width: 600px) {
  .footer-copy {
    flex-basis: auto;
    margin-top: 0;
  }
}

</style>
    <div class="footer-wrapper">
      <div class="footer-social">
        <a href="https://github.com/aristidesbp" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="bi bi-github"></i>
        </a>
        <a href="https://linkedin.com/in/aristidesbp" target="_blank" rel="noopener" aria-label="LinkedIn">
          <i class="bi bi-linkedin"></i>
        </a>
        <a href="https://twitter.com/aristidesbp" target="_blank" rel="noopener" aria-label="Twitter">
          <i class="bi bi-twitter"></i>
        </a>
      </div>

      <nav class="footer-nav" aria-label="Links institucionais">
        <a href="#componente-hero">Início</a>
        <a href="#componente-servicos">Serviços</a>
        <a href="#main-formularioContato">Contato</a>
      </nav>

      <div class="footer-copy">
        &copy; ${new Date().getFullYear()} Aristides Barbosa Pontes. Todos os direitos reservados.
      </div>
    </div>
  `;
}

