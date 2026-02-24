
/**
 * confirmar_cadastro.js
 * Função de apoio para evitar cadastros acidentais (UX)
 */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");
    
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}
  
