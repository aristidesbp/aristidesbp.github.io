// Função responsável por criar e inserir a seção "Sobre" na página
function listaLinks() {
// Seleciona o elemento onde o conteúdo "Sobre" será inserido dinamicamente
const listaLinks = document.getElementById("listaLinks");
 // Insere o HTML completo da seção "Sobre" com estrutura, conteúdo e SEO
listaLinks.innerHTML = `
<!-- lista de links -->

<!-- Meus-Projetos ########################################################################### -->
<section class="column" id="Testes-Projetos"><h1>Meus-Projetos</h1><ul class="lista-links">
<li><a href="projetos/jorgecorreaf/index.html" target="_blank">jorgecorreaf</a></li>
<li><a href="projetos/delivary/index.html" target="_blank">Delivary</a></li>
<li><a href="projetos/portfolio-aristidesbp/index.html" target="_blank">portfolio-aristidesbp</a></li>
<li><a href="https://sites.google.com/view/marketing-digital-abp/sobre" target="_blank">Meu Site Google</a></li>
<li><a href="projetos/aulas/index.html" target="_blank">Aulas.txt</a></li>
<li><a href="projetos/ficha-anamnese/index.html" target="_blank">ficha-anamnese</a></li>
<li><a href="projetos/form-whatzap/index.html" target="_blank">form-whatzap</a></li>
<li><a href="projetos/listar-tarefas/index.html" target="_blank">listar-tarefas</a></li>
<li><a href="projetos/site-cursos/index.html" target="_blank">site-cursos</a></li>


</ul>
</section>


<!-- likns de Cursos ########################################################################### -->
<section class="column" id="Cursos"> <h2>Links para Cursos</h2><ul class="lista-links">
<li><a href="https://aprendamais.mec.gov.br/" target="_blank">aprendamais.mec.gov</a></li>
<li><a href="https://www.escolavirtual.gov.br/" target="_blank">escolavirtual.gov</a></li>
<li><a href="https://estude.ifrs.edu.br/" target="_blank">estude.ifrs</a></li>     
<li><a href="https://www.w3schools.com/" target="_blank">W3Schools</a></li>
<li><a href="https://developer.mozilla.org/" target="_blank">MDN Web Docs</a></li>
<li><a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a></li>
<li><a href="aulas-txt.html" target="_blank">MATERIAL.txt</a></li>
</ul>
</section>
 
 <!-- likns de Empregos-Freelance ########################################################################### -->
<section class="column" id="Empregos-Freelance"><h2>likns para Empregos-Freelance</h2> <ul class="lista-links"> 
<li><a href="https://www.linkedin.com/jobs/" target="_blank">LinkedIn Jobs</a></li>     <!-- Vagas de emprego -->
<li><a href="https://www.fiverr.com/" target="_blank">Fiverr</a></li>                   <!-- Trabalhos freelance globais -->
<li><a href="https://www.workana.com/" target="_blank">Workana</a></li>                 <!-- Freelance na América Latina -->
<li><a href="https://www.freelancer.com/" target="_blank">Freelancer</a></li>           <!-- Plataforma internacional -->
<li><a href="https://remoteok.com/" target="_blank">RemoteOK</a></li>                   <!-- Trabalhos remotos internacionais -->
</ul>
</section>

<!-- Redes-Sociais ########################################################################### -->
<section class="column" id="Redes-Sociais"><h2>links de Redes-Sociais</h2> 
<ul class="lista-links">
<li><a href="https://github.com/aristidesbp" target="_blank">GitHub</a></li>
<li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
<li><a href="https://www.linkedin.com/" target="_blank">LinkedIn</a></li>
<li><a href="https://www.twitter.com/" target="_blank">Twitter (X)</a></li>
<li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
<li><a href="https:https://www.google.com/intl/pt-br_br/business/" target="_blank">google-business</a></li>
</ul>
</section>
       


<!-- Seção de Inteligência Artificial ########################################################################### -->
<section class="column" id="Inteligência-Artificial"><h2>Inteligência Artificial</h2> <ul class="lista-links"> 
<li><a href="https://chatgpt.com/" target="_blank"><strong>ChatGPT</strong></a> – Assistente de conversas, redação e programação.</li>
<li><a href="https://claude.ai/" target="_blank"><strong>Claude AI</strong></a> – Alternativa ao ChatGPT com foco em respostas seguras e longas.</li>
<li><a href="https://gemini.google.com/app?hl=pt-BR" target="_blank"><strong>Google Gemini</strong></a> – IA multimodal do Google integrada a seus produtos.</li>
<li> <a href="https://copilot.microsoft.com/" target="_blank"><strong>Microsoft Copilot</strong></a> – Assistente integrado ao Windows e Microsoft Office.</li>
<li><a href="https://www.perplexity.ai/" target="_blank"><strong>Perplexity AI</strong></a> – IA com respostas baseadas em busca contextual.</li>
<li><a href="https://www.phind.com/" target="_blank"><strong>Phind</strong></a> – Especializada para programadores, com busca técnica.</li>
<li><a href="https://www.midjourney.com/" target="_blank"><strong>Midjourney</strong></a> – Geração de imagens artísticas com IA.</li>
<li><a href="https://openai.com/dall-e" target="_blank"><strong>DALL·E</strong></a> – Criação de imagens realistas a partir de texto.</li>
<li><a href="https://stablediffusionweb.com/" target="_blank"><strong>Stable Diffusion</strong></a> – Modelo open source para criação de imagens.</li>
<li><a href="https://runwayml.com/" target="_blank"><strong>Runway ML</strong></a> – Geração e edição de vídeos com IA.</li>
<li><a href="https://www.elevenlabs.io/" target="_blank"><strong>ElevenLabs</strong></a> – Geração de vozes realistas com IA.</li>
<li><a href="https://www.synthesia.io/" target="_blank"><strong>Synthesia</strong></a> – Criação de vídeos com avatares gerados por IA.</li>
<li><a href="https://www.canva.com/pt_br/recursos/canva-ai/" target="_blank"><strong>Canva AI</strong></a> – Ferramentas de design com auxílio de IA.</li>
<li><a href="https://www.deepl.com/translator" target="_blank"><strong>DeepL</strong></a> – Tradutor de alta qualidade com IA.</li>
<li><a href="https://www.notion.so/product/ai" target="_blank"><strong>Notion AI</strong></a> – Auxilia na organização de ideias e documentos.</li>
<li><a href="https://www.grammarly.com/" target="_blank"><strong>Grammarly AI</strong></a> – Correção de textos e sugestões de estilo.</li>
<li><a href="https://poe.com/" target="_blank"><strong>Poe</strong></a> – Plataforma que reúne vários modelos de IA como ChatGPT, Claude e Gemini.</li>
<li><a href="https://www.jasper.ai/" target="_blank"><strong>Jasper AI</strong></a> – Geração de conteúdo para marketing.</li>
<li><a href="https://www.copy.ai/" target="_blank"><strong>Copy.ai</strong></a> – Escrita de textos publicitários e vendas.</li>
<li><a href="https://writesonic.com/" target="_blank"><strong>Writesonic</strong></a> – IA para blogs, anúncios e redes sociais.</li>
<li><a href="https://rytr.me/" target="_blank"><strong>Rytr</strong></a> – Escrita rápida para diversos formatos.</li>
<li><a href="https://www.sudowrite.com/" target="_blank"><strong>Sudowrite</strong></a> – IA para escritores criativos.</li>
<li><a href="https://app.leonardo.ai/" target="_blank"><strong>Leonardo AI</strong></a> – Ferramenta poderosa para geração de imagens criativas.</li>
<li><a href="https://www.figma.com/ai/" target="_blank"><strong>Flux AI</strong></a> – IA para design assistido em interfaces digitais.</li>
<li><a href="https://www.recraft.ai/" target="_blank"><strong>Recraft</strong></a> – Design gráfico assistido por IA para marcas e produtos.</li>
<li><a href="https://ideogram.ai/" target="_blank"><strong>Ideogram</strong></a> – Criação de diagramas e fluxogramas com IA.</li>
<li><a href="https://filmora.wondershare.com/video-editor/" target="_blank"><strong>Filmora AI</strong></a> – Editor de vídeo com ferramentas automáticas.</li>
<li><a href="https://www.opus.pro/" target="_blank"><strong>OpusClip</strong></a> – Converte vídeos longos em clipes curtos para redes sociais.</li>
<li><a href="https://fathom.video/" target="_blank"><strong>Fathom</strong></a> – Transcrição e resumo automático de reuniões online. </li>
<li><a href="https://notebooklm.google/" target="_blank"><strong>NotebookLM</strong></a> – Organiza pesquisas e anotações com IA.</li>
<li><a href="https://n8n.io/" target="_blank"><strong>n8n</strong></a> – Plataforma de automação de fluxos com integração de IA.</li>
</ul>
</section>


<!-- fim lista de links -->
`;}//Fim
