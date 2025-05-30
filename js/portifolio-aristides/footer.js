// Função reutilizável para criar o FOOTER completo da página
function createFooter() {
  // Cria um elemento <div> como container para o conteúdo do footer
  const footerContainer = document.createElement("div");

  // Insere o HTML do footer com conteúdo e estilo embutido (não afeta outras páginas)
  footerContainer.innerHTML = `


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
<<<<<<< HEAD
        background-color: black;
=======
        background-color: #f8f9fa;
>>>>>>> 62677ce72ec8567d2449ba70b790421934071e68
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
<<<<<<< HEAD



/* Container para alinhar contato e mapa lado a lado */
    .footer-flex-container {
      display: flex;                    /* Ativa o layout flexível */
      flex-wrap: wrap;                 /* Permite quebra em telas pequenas */
      justify-content: center;        /* Centraliza os filhos */
      gap: 20px;                       /* Espaço entre os elementos */
      padding: 20px;
      max-width: 1200px;              /* Limita a largura máxima */
      margin: 0 auto;                 /* Centraliza na tela */
    }

    /* Define largura dos filhos dentro do container flex */
    .footer-contato, .footer-map-container {
      flex: 1 1 45%;                  /* Cresce e encolhe com mínimo de 45% */
      min-width: 300px;              /* Largura mínima para quebrar linha */
    }

    /* ... (outros estilos mantidos) ... */
    </style>




  <!-- Agrupamento FLEX de Contato e Mapa -->
  <div class="footer-flex-container">

    <!-- SEÇÃO CONTATO -->
    <section class="footer-contato text-center">
    <form id="pedidoForm">
    <h2>Formulário de Pedido de Portfólio</h2>

    <label class="formularioWhatsap" for="nome">Nome:</label>
    <input class="formularioWhatsap" type="text" id="nome" name="nome" />

    <label class="formularioWhatsap" for="telefone">Telefone:</label>
    <input class="formularioWhatsap" type="tel" id="telefone" name="telefone" placeholder="Ex: 5591999999999 (com DDD e código do país)" />

    <label class="formularioWhatsap" for="email">Email:</label>
    <input class="formularioWhatsap" type="email" id="email" name="email" />

    <label class="formularioWhatsap" for="empresa">Empresa:</label>
    <input class="formularioWhatsap"  type="text" id="empresa" name="empresa" />

    <label class="formularioWhatsap"  for="descricao">Descrição:</label>
    <textarea class="formularioWhatsap"  id="descricao" name="descricao"></textarea>

    <button class="formularioWhatsap"  type="submit">Enviar via WhatsApp</button>
  </form>
  
     

    </section>

    <!-- MAPA -->
=======
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
>>>>>>> 62677ce72ec8567d2449ba70b790421934071e68
    <div class="footer-map-container">
      <iframe
        src="https://www.google.com/maps?q=Travessa+da+Estrela,+2321,+Belém,+Pará,+Brasil&output=embed"
        width="100%" height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
<<<<<<< HEAD
     <!-- fim do MAPA -->

<br>
<br>
      <section class="footer-contato text-center">
      <h2 class="footer-section-header">Entre em Contato</h2>
      <p class="contato">Email: <a href="mailto:aristidesbp@gmail.com">aristidesbp@gmail.com</a></p>  
      <p class="contato">Telefone: <a href="tel:+5591992420981">(91) 9 9242-0981</a></p>

        <!-- Ícones das redes sociais -->
        <div class="footer-social-icons">
        <a href="https://www.facebook.com/aristidesbp" target="_blank"><i class="bi bi-facebook"></i></a>
        <a href="https://www.instagram.com/aristidesbp" target="_blank"><i class="bi bi-instagram"></i></a>
        <a href="https://x.com/aristidesbp" target="_blank"><i class="bi bi-twitter"></i></a>
        <a href="https://www.tiktok.com/@aristidesbp" target="_blank"><i class="bi bi-tiktok"></i></a>
        </div>

      <!-- Botão de WhatsApp -->
      <a href="https://wa.me/5591992420981?text=Olá%2C+gostaria+de+contratar+saber+mais+sobre+o+a+do+Edifício+José+Viana." target="_blank" class="btn btn-success">WhatsApp</a>
      </section>

    </div>

 
  </div> <!-- fim do FLEX container -->

  <!-- Rodapé Final -->
  <footer class="footer-final">
    <p><strong>ARISTIDES B PONTES</strong><br>Analista de Sistemas</p>   
    <p class="endereco">Endereço: Trav. Estrela, N° 2321, sala 201A, Marco, Belém-PA</p> 
    <p>&copy; 2016 Aristides Barbosa Pontes - Todos os direitos reservados. 
      <a href="#privacy-policy">Política de Privacidade</a>
    </p>
  </footer>

=======
    </div>

    <!-- Rodapé final com informações adicionais -->
    <footer class="footer-final">
      <p><strong>ARISTIDES B PONTES</strong><br>Analista de Sistemas</p>   
      <p class="endereco">Endereço: Trav. Estrela, N° 2321, sala 201A, Marco, Belém-PA</p> 
      <p>&copy; 2016 Aristides Barbosa Pontes - Todos os direitos reservados. 
        <a href="#privacy-policy">Política de Privacidade</a>
      </p>
    </footer>
>>>>>>> 62677ce72ec8567d2449ba70b790421934071e68
  `;

  // Adiciona o conteúdo do rodapé no final do <body>
  document.body.appendChild(footerContainer);
}


