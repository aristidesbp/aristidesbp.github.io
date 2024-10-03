// Validação do Formulário de Contato
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação simples
    if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Aqui você pode adicionar o código para enviar os dados do formulário, se necessário

    alert('Consulta agendada com sucesso!'); // Mensagem de confirmação
});

// Rolagem Suave para Links de Navegação
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Efeitos de Hover nos Cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease'; // Transição suave
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});
