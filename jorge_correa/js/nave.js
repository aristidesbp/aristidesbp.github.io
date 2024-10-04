/* ADICIONE O CODIGO ABAIXAO NO CODIGO QUE DEJA IMPLEMENTAR O MENU:

  <!-- Contêiner para a navbar carregada dinamicamente -->
    <div id="navbar-container"></div>
*/


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



/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


