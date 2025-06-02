/* (1)->COLOQUE NO SEU HTML:
<div id="functionHenderFooter"></div>
<script src="js/portifolio-aristides/functionHenderFooter.js"></script>
<script>functionHenderFooter();</script>
(2)-> RETIRE AS LINHA (1 & 2) DESTE COMENTARIO!*/

function functionHenderFooter() {
const functionHenderFooter = document.getElementById("functionHenderFooter");
functionHenderFooter.innerHTML = `<!-- PAGINA_HTML -->

<!-- Estilo embutido e exclusivo do footer -->
    <style>
      /* Estiliza os textos de contato */
      .footer-contato .contato {
        font-size: 0.9em;
        margin: 5px 0;
      }

      /* Estiliza os ícones sociais */
      .footer-social-icons a {
        font-size: 1.5em;
        margin: 0 10px;
        color: #333;
        text-decoration: none;
        transition: color 0.3s;
      }

      .footer-social-icons a:hover {
        color: #007BFF;
      }

      /* Estilo do mapa */
      .footer-map-container {
        margin: 20px auto;
        max-width: 600px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      /* Estilo do rodapé */
      .footer-final {
        background-color: #f8f9fa;
        padding: 20px;
        font-size: 0.9em;
        color: #555;
        border-top: 1px solid #ddd;
        text-align: center;
      }

      .footer-final a {
        color: #007BFF;
        text-decoration: none;
      }

      .footer-final a:hover {
        text-decoration: underline;
      }

      /* Header da seção de contato */
      .footer-section-header {
        text-align: center;
        font-size: 1.5em;
        margin-bottom: 10px;
      }
    </style>

    <!-- Conteúdo da seção de contato -->
    <section class="footer-contato text-center">
      <h2 class="footer-section-header">Entre em Contato</h2>

      <p class="contato">Email: <a href="mailto:aristidesbp@gmail.com">aristidesbp@gmail.com</a></p>  
      <p class="contato">Telefone: <a href="tel:+5591992420981">(91) 9 9242-0981</a></p>

      <!-- Ícones das redes sociais -->
      <div class="footer-social-icons">
        <a href="https://www.facebook.com/aristidesbp" target="_blank"><i class="bi bi-facebook"></i></a>
        <a href="https://www.instagram.com/aristidesbp" target="_blank"><i class="bi bi-instagram"></i></a>
        <a href="https://x.com/aristidesbp?t=T5iGxvFQKyPJ3XDwgpxCCg&s=09" target="_blank"><i class="bi bi-twitter"></i></a>
        <a href="https://www.tiktok.com/@aristidesbp?_t=8rAHAv90Du4&_r=1" target="_blank"><i class="bi bi-tiktok"></i></a>
      </div>

      <!-- Botão de WhatsApp -->
      <a href="https://wa.me/5591992420981" target="_blank" class="btn btn-success">WhatsApp</a>
    </section>

    <!-- Mapa integrado via Google Maps -->
    <div class="footer-map-container">
      <iframe
        src="https://www.google.com/maps?q=Travessa+da+Estrela,+2321,+Belém,+Pará,+Brasil&output=embed"
        width="100%" height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <!-- Rodapé final com informações adicionais -->
    <footer class="footer-final">
      <p><strong>ARISTIDES B PONTES</strong><br>Analista de Sistemas</p>   
      <p class="endereco">Endereço: Trav. Estrela, N° 2321, sala 201A, Marco, Belém-PA</p> 
      <p>&copy; 2016 Aristides Barbosa Pontes - Todos os direitos reservados. 
        <a href="#privacy-policy">Política de Privacidade</a>
      </p>
    </footer>


<!-- /PAGINA_HTML -->
`;}/*## FINAL DA FUNCTION ##*/







