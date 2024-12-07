
// ##### código JS para chamar conteúdos DA PÁGINA ####### 

document.addEventListener('DOMContentLoaded', function() {

            
// Função para carregar a CONTEUDO DA PÁGINA: 
fetch('assets/index.html') 
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



            

// Função para carregar a NAVBAR:  
fetch('assets/public/navbar.html') 
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



fetch('assets/public/footer.html') 
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



    
