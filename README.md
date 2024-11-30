# aristidesbp.github.io
# ############################################
# criando um HTML básico completo e replicável
# ############################################

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<!-- Bootstrap CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/css/bootstrap.min.css" rel="stylesheet">
<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

<!-- ###### CSS DA PÁGINA ####### -->  
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="assets/css/index.css">
    
<!-- ###### TÍTULO DO SITE ####### -->  
<title> index.html do Site Aristidesbp </title>
</head>
<body>
    
<!-- ###### CONTEÚDO DO SITE ####### -->  
<!-- Contêiner navbar -->
<div id="navbar-container"></div>

<!-- Contêiner conteúdo -->
<div id="conteudo-container"></div>

<!-- Contêiner footer -->
<div id="footer-container"></div>





<!-- ##### código JS para chamar conteúdos DA PÁGINA ####### -->  
<script>
document.addEventListener('DOMContentLoaded', function() {

// Função para carregar a NAVBAR:  
fetch('assets/view/navbar.html') 
/*Faz o carregamento navbar.html*/
.then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo navbar.html');
            }
            return response.text(); // Retorna o conteúdo do arquivo como texto
        })
        .then(data => {
            // Insere o conteúdo da navbar no contêiner #navbar-container
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error); // Exibe erros, caso haja algum
        });



fetch('assets/view/footer.html') 
// Faz o carregamento do arquivo footer.html
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo footer.html');
            }
            return response.text(); // Retorna o conteúdo do arquivo como texto
        })
        .then(data => {
            // Insere o conteúdo do footer no contêiner #footer-container
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error); // Exibe erros, caso haja algum
        });
});


// Função para carregar a CONTEUDO DA PÁGINA: 
fetch('assets/view/conteudo.html') 
//  ######### Faz o carregamento do arquivo conteudo.html ########
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo conteudo.html');
            }
            return response.text(); // Retorna o conteúdo do arquivo como texto
        })
        .then(data => {
            // Insere o conteúdo da página no contêiner #conteudo-container
            document.getElementById('conteudo-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error); // Exibe erros, caso haja algum
        });

    
</script>

<!-- ###### FIM DO CONTEÚDO DO SITE ####### -->  
    
<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<!-- Bootstrap JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/js/bootstrap.bundle.min.js"></script>
<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- Arquivo JS personalizado -->
<script src="scripts.js"></script>
<!-- ##### ARQUIVO JS DA PÁGINA ####### -->  
<script src="index/index.js"></script>
</body>
</html>






