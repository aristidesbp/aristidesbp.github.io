// js/nave.js
document.addEventListener("DOMContentLoaded", function () {
    // Carregar a nave do arquivo nave.html e inserir no contêiner
    fetch("nave.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nave-container").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a nave:', error));
});

/* ADICIONE O CODIGO ABAIXAO NO CODIGO QUE DEJA IMPLEMENTAR O MENU:

  <!-- Contêiner para a nave carregada dinamicamente -->
    <div id="nave-container"></div>
*/
