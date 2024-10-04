/* ADICIONE O CODIGO ABAIXAO NO CODIGO QUE DEJA IMPLEMENTAR O CONTEUDO:

  <!-- Contêiner para o conteudo carregada dinamicamente -->
    <div id="conteudo-container"></div>
*/


// conteudo.js
document.addEventListener("DOMContentLoaded", function () {
    // Carregar a nave do arquivo conteudo.html e inserir no contêiner
    fetch("conteudo.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("conteudo-container").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o conteudo:', error));
});





