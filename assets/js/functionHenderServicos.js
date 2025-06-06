/* (1)->COLOQUE NO SEU HTML:
<div id="functionHenderServicos"></div>
<script src="js/portifolio-aristides/functionHenderServicos.js"></script>
<script>functionHenderServicos();</script>
(2)-> RETIRE AS LINHA (1 & 2) DESTE COMENTARIO!*/

function functionHenderServicos() {
const functionHenderServicos = document.getElementById("functionHenderServicos");
functionHenderServicos.innerHTML = `<!-- PAGINA_HTML -->

<section class="container py-5">
    <h2 class="text-center mb-4">Serviços</h2>
    <div class="row">
      <div class="col-md-4" data-aos="flip-left">
        <div class="card p-3 text-center">
          <i class="fas fa-code fa-3x mb-3 text-warning"></i>
          <h5 class="card-title">Desenvolvimento Web</h5>
          <p>Criação de sites modernos e responsivos com foco em performance.</p>
        </div>
      </div>
      <div class="col-md-4" data-aos="flip-up">
        <div class="card p-3 text-center">
          <i class="fas fa-mobile-alt fa-3x mb-3 text-warning"></i>
          <h5 class="card-title">Aplicativos Mobile</h5>
          <p>Desenvolvimento de apps Android com funcionalidades completas.</p>
        </div>
      </div>
      <div class="col-md-4" data-aos="flip-right">
        <div class="card p-3 text-center">
          <i class="fas fa-bullhorn fa-3x mb-3 text-warning"></i>
          <h5 class="card-title">Gestão de Tráfego</h5>
          <p>Campanhas online que convertem. Tráfego pago para gerar resultados reais.</p>
        </div>
      </div>
    </div>
  </section>


<!-- /PAGINA_HTML -->
`;}/*## FINAL DA FUNCTION ##*/






