function createOlaMundo(selector = 'body') {
const headerHTML = `
<!-- código html -->
<h1>olá mundo</h1>
<!-- final do código html -->
`;

const container = document.querySelector(selector);
if (container) {
container.insertAdjacentHTML('afterbegin', headerHTML);
  } else {
    console.error(`Elemento ${selector} não encontrado.`);
  }
}

// Execução
// Adicione o ID da sua div aqui
createOlaMundo('#ola_mundo'); 


/* COMO CHAMAR NO HTML:

<div id="ola_mundo"></div>
<script src="src/view/ola_mundo.js"></script>

*/




