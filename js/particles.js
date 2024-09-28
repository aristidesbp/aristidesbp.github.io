// js/particles.js
document.addEventListener("DOMContentLoaded", function () {
    // Carregar a particles do arquivo particles.html e inserir no contêiner
    fetch("particles.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("particles-container").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a particles:', error));
});
