
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('togglePassword');

  // Adiciona o evento de clique no ícone
  toggleIcon.style.cursor = 'pointer'; // Torna o ícone visualmente clicável
  toggleIcon.addEventListener('click', function () {
    // Verifica o tipo atual do input
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Opcional: Altera o ícone para indicar visualmente o estado
    this.textContent = type === 'password' ? 'lock' : 'visibility';
    
    // Mantém a cor de destaque se estiver ativo
    this.classList.toggle('text-primary');
  });
