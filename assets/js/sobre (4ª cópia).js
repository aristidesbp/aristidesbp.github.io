// Função responsável por criar e inserir a seção "Sobre" na página
function createSobre() {

// Seleciona o elemento onde o conteúdo "Sobre" será inserido dinamicamente
  const sobreContainer = document.getElementById("sobre");

  // Insere o HTML completo da seção "Sobre" com estrutura, conteúdo e SEO
  sobreContainer.innerHTML = `






    <!-- SOBRE -->
    <div id="SOBRE" class="card">
      <div class="row g-0">
        <!-- Coluna com imagem à esquerda -->
        <div class="col-md-4">
          <img class="card-img" src="img/Aristidesbp.png" alt="Imagem de Aristidesbp">
        </div> 

        <!-- Coluna com conteúdo textual -->
        <div class="col-md-8">
          <div class="card-body">

            <!-- Nome e especialidade -->
            <h2>Aristides Barbosa Pontes</h2>
            <h6>Especialista em Desenvolvimento Web e Tráfego Pago.</h6>  
            
            <!-- Apresentação -->
            <p>
              Sou Aristides Barbosa Pontes, apaixonado por tecnologia e inovação. Com experiência em desenvolvimento web, 
              aplicativos Android e gestão de tráfego pago, ajudo empresas e profissionais a crescerem na internet 
              através de soluções modernas, eficientes e criativas.
            </p>     

            <!-- Botão que revela conteúdo adicional -->
            <button class="btn btn-primary" 
                    aria-controls="habilidades" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#habilidades"  
                    aria-expanded="false">
              SAIBA MAIS
            </button>                   

            <!-- Conteúdo oculto revelado ao clicar em "Saiba Mais" -->
            <div class="collapse collapse-text" id="habilidades">
              <ul></ul>                 
              <br>  

              <!-- Seção com formação acadêmica -->
              <header class="hero"> 
                <h2>FORMAÇÃO:</h2>
                <p>Análise e Desenvolvimento de Sistemas</p>

                <!-- Lista de habilidades técnicas -->
                <h2>SKILLS:</h2>
                <p>HTML, CSS, JavaScript, Python, PHP, MySQL, Docker, Git-GitHub, Google Ads, Facebook Ads</p>

                <!-- SEO para serviços oferecidos -->
                <section id="servicos" itemscope itemtype="https://schema.org/Service">
                  <!-- Tipo de serviço -->
                  <meta itemprop="serviceType" content="Serviços de Marketing Digital, Web Design, Tráfego Pago e Tráfego Orgânico" />
                  <h2 itemprop="name">SERVIÇOS</h2>

                  <!-- Serviço 1: Web Design -->
                  <article itemprop="hasOfferCatalog" itemscope itemtype="https://schema.org/OfferCatalog">
                    <meta itemprop="name" content="Web Design" />
                    <h3 itemprop="itemListElement" itemscope itemtype="https://schema.org/Offer">
                      <span itemprop="itemOffered" itemscope itemtype="https://schema.org/Service">
                        <span itemprop="name">💻 Web Design</span>
                      </span>
                    </h3>
                    <p itemprop="description">
                      Criação de sites modernos, responsivos e otimizados para mecanismos de busca (SEO), com foco em usabilidade e performance.
                    </p>
                  </article>

                  <!-- Serviço 2: Tráfego Pago -->
                  <article itemprop="hasOfferCatalog" itemscope itemtype="https://schema.org/OfferCatalog">
                    <meta itemprop="name" content="Tráfego Pago" />
                    <h3 itemprop="itemListElement" itemscope itemtype="https://schema.org/Offer">
                      <span itemprop="itemOffered" itemscope itemtype="https://schema.org/Service">
                        <span itemprop="name">🚀 Tráfego Pago</span>
                      </span>
                    </h3>
                    <p itemprop="description">
                      Gestão estratégica de anúncios pagos (Google Ads, Meta Ads) para gerar visibilidade, atrair leads qualificados e acelerar resultados.
                    </p>
                  </article>

                  <!-- Serviço 3: Tráfego Orgânico -->
                  <article itemprop="hasOfferCatalog" itemscope itemtype="https://schema.org/OfferCatalog">
                    <meta itemprop="name" content="Tráfego Orgânico" />
                    <h3 itemprop="itemListElement" itemscope itemtype="https://schema.org/Offer">
                      <span itemprop="itemOffered" itemscope itemtype="https://schema.org/Service">
                        <span itemprop="name">📈 Tráfego Orgânico</span>
                      </span>
                    </h3>
                    <p itemprop="description">
                      Estratégias de SEO, marketing de conteúdo e redes sociais para atrair visitantes de forma natural, contínua e sem custo por clique.
                    </p>
                  </article>
                </section>
              </header>                      
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
