
    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
        const navBar = document.querySelector("#navbarNav");
        const isClickInside = navBar.contains(event.target) || event.target.closest(".navbar-toggler");

        if (!isClickInside && navBar.classList.contains("show")) {
            const navbarToggler = document.querySelector(".navbar-toggler");
            navbarToggler.click(); // Simula o clique no botão para recolher o menu
        }
    });



        $("form").on("submit", function (e) {
            e.preventDefault();
            Swal.fire("Mensagem Enviada!", "Entraremos em contato em breve.", "success");
        });
  
