/* ADICIONE O CODIGO ABAIXAO NO CODIGO QUE DEJA IMPLEMENTAR O BOTÃO DE CONTATO:

  <!-- Contêiner para o conteudo carregada dinamicamente -->
    <div id="contact-container"></div>
*/


// conteudo.js
document.addEventListener("DOMContentLoaded", function () {
    // Carregar a nave do arquivo conteudo.html e inserir no contêiner
    fetch("contact.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("contact-container").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o btcontato:', error));
});




