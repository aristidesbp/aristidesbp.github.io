# INDEX.HTML (PAGINA INICIAL)
```
<!DOCTYPE html><!-- Declarando que este documento é do tipo HTML5 --> 

<!-- 🧠 CONFIGURAÇÃO BÁSICA DA PÁGINA-->
<!-- Define o idioma da página como português do Brasil -->
<html lang="pt-BR"> 
<!-- Início do cabeçalho -->
<head> 
<!-- Codificação para suportar acentuação -->
<meta charset="UTF-8" /> 
<!-- Responsividade em dispositivos móveis -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
<!-- Compatibilidade com IE -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
<!-- Título da aba do navegador -->
<title> Aristides Barbosa Pontes  // Portifólio </title>

<!-- 🧠 SEO (Search Engine Optimization)-->
<!-- Meta descrição Descrição para mecanismos de busca (texto que aparece abaixo do título no Google) -->
<meta name="description" content="Sou Aristides Barbosa Pontes, desenvolvedor front-end e gestor de tráfego pago. Veja meu portfólio com projetos em HTML, CSS, JavaScript, AndroidIDE e estratégias de marketing digital.">
<!--  Autor da página -->
<meta name="author" content="Aristides Barbosa Pontes">
<!--  Palavras-chave (menos usada hoje, mas ainda relevante em alguns mecanismos de busca) -->
<meta name="keywords" content="portfólio, Aristides Barbosa Pontes, front-end, desenvolvedor, HTML, CSS, JavaScript, tráfego pago, marketing digital, programador web, projetos web, sites profissionais,developer, programação, dev, desenvolvedor, programador, html, css, javascript, nodejs, reactjs, react, github, frontend, front-end">
<!--  Robots (instruções para motores de busca) -->
<meta name="robots" content="index, follow"> <!-- index = indexar; follow = seguir links internos -->
<!-- Canonical (evita conteúdo duplicado em URLs diferentes) -->
<link rel="canonical" href="https://aristidesbp.github.io/" />

<!-- 🧠 Open Graph (para compartilhamento no Facebook, LinkedIn, etc.) -->
<!-- Tipo de conteúdo -->
<meta property="og:type" content="website"> 
<!-- URL da página -->
<meta property="og:url" content="https://aristidesbp.github.io/"> 
<!-- Título no compartilhamento -->
<meta property="og:title" content="Portfólio de Aristides Barbosa Pontes – Dev Front-End e Gestor de Tráfego">
<!-- Descrição no card -->
<meta property="og:description" content="Conheça os projetos e estratégias digitais de Aristides Barbosa Pontes, especialista em desenvolvimento web e tráfego pago."> 
<!-- Imagem do card -->  
<meta property="og:image" content="./img/Aristidesbp.png"> 


<!-- 🧠 Twitter Card (para compartilhamento no Twitter) -->
<!-- Tipo de card -->
<meta name="twitter:card" content="summary_large_image"> 
<meta name="twitter:title" content="Portfólio de Aristides Barbosa Pontes – Dev & Tráfego Pago">
<meta name="twitter:description" content="Confira meus projetos e estratégias como desenvolvedor front-end e gestor de tráfego.">
<meta name="twitter:image" content="https://aristidesbp.github.io/img/Aristidesbp.png">
<meta name="twitter:site" content="@aristidesbp"> <!-- Seu @ do Twitter, se tiver -->


<!-- 🧠 ARQUIVOS EXTERNOS DE ESTILO (FONTS + CSS) -->
<!-- Pré-carregamento para fontes do Google (melhora desempenho) -->
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin /><!-- Importação de fontes do Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Gemunu+Libre:wght@200&display=swap" rel="stylesheet" /><!-- Ícone que aparece na aba do navegador -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet">   
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.3/font/bootstrap-icons.min.css" rel="stylesheet"> 
<link href="icons/favicon.png" type="image/x-icon" rel="shortcut icon"/><!-- Estilo CSS externo -->
<link href="style.css" rel="stylesheet">


<!-- 🧠 ARQUIVOS EXTERNOS JAVASCRIPT -->
<script src="https://unpkg.com/scrollreveal"></script><!-- Biblioteca para animações de scroll -->
<script src="js/site-mvc-main.js" type="module" defer></script><!-- Script principal em módulo ES6, carregado ao final -->
<script src="https://unpkg.com/scrollreveal"></script> 

<!-- 🧠 Manifest (para Progressive Web Apps – PWA) -->
<link rel="manifest" href="json/site-mvc-manifest.json">
</head>
<body>

<!-- Div onde o conteúdo será carregado -->
<div class="meu-header" id="meu-header">Carregando header...</div>
  
<!-- Div onde o conteúdo será carregado -->
<div id="conteudo">Carregando conteúdo...</div> 
  
<!-- Div onde o conteúdo será carregado -->
<div class="meu-footer" id="meu-footer">Carregando footer...</div>



<!-- javascript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

----
# SCRIPT.JS (AQUIVO LOGICO QUE EXECUTA FUNÇÕES)
```
// 🚀 Função para carregar conteúdos HTML em elementos específicos
function carregarComponentes() {



  // 📌 Carregar o header.html na div com id "meu-header"
  fetch('menu.html') // Caminho do arquivo que será carregado
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => {
      document.getElementById('meu-header').innerHTML = data; // Insere o conteúdo na div
    })
    .catch(error => {
      console.error('Erro ao carregar o header:', error); // Mostra erro no console se falhar
    });



///////////////////////////////////////////////
 // 📌 Carregar o conteudo.html na div com id "conteudo"
  fetch('sobre.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('conteudo').innerHTML = data;
    })
    .catch(error => {
      console.error('Erro ao carregar o conteúdo:', error);
    });




  // 📌 Carregar o footer.html na div com id "meu-footer"
  fetch('contato.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('meu-footer').innerHTML = data;
    })
    .catch(error => {
      console.error('Erro ao carregar o footer:', error);
    });

} // 🔚 Fim da função carregarComponentes()

// ✅ Chamada da função quando a página estiver carregada
document.addEventListener('DOMContentLoaded', carregarComponentes);

/*
OBS: CASO NAO FUNCIONE TENTE PELO LOCAL HOST.
✅ OPÇÃO 1: Usar o Python para criar um servidor local (super fácil!)
🧱 Passo a passo:
1. Abra o terminal no Linux Mint.
2. Navegue até a pasta do seu projeto HTML:    
Exemplo (cd /home/seu-usuario/Documentos/meu-projeto)
3.Digite o codigo:
python3 -m http.server
4.No navegador:
http://localhost:8000
5. curtir a pagina kkk!
*/


  
/*###################################################################*/
/*###################################################################*/
/*###################################################################*/

// 📌 Função chamada ao mudar a opção do <select>
function trocarConteudo() {

  // 🧠 Pegamos o elemento <select> pelo ID
  const seletor = document.getElementById("seletorConteudo");

  // 📥 Pegamos o valor da opção selecionada (que é o caminho da página)
  const paginaSelecionada = seletor.value;

  // 🔁 Redirecionamos o navegador para a página escolhida
  window.location.href = paginaSelecionada;

} // 🔚 Fim da função trocarConteudo()

```

----
# STYLE.CSS (ARQUIVO DE ESTILO DA PAGINA)
```

```


