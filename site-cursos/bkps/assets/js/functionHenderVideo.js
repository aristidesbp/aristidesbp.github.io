/* (1)->COLOQUE NO SEU HTML:
<div id="functionHenderVideo"></div>
<script src="js/portifolio-aristides/functionHenderVideo.js"></script>
<script>functionHenderVideo();</script>
(2)-> RETIRE AS LINHA (1 & 2) DESTE COMENTARIO!*/

function functionHenderVideo() {
const functionHenderVideo = document.getElementById("functionHenderVideo");
functionHenderVideo.innerHTML = `<!-- PAGINA_HTML -->

 
<!-- Vídeo Apresentação -->
<section class="container py-5 text-center">
<h2 class="mb-4">Assista minha apresentação</h2>
<div class="ratio ratio-16x9" data-aos="fade-up">
<iframe src="https://www.youtube.com/embed/8BLNsWEDVic" title="YouTube video" allowfullscreen></iframe>
</div>
</section>


<!-- /PAGINA_HTML -->
`;}/*## FINAL DA FUNCTION ##*/



