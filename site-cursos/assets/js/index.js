// Alternar tema claro/escuro
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function updateThemeText() {
  if(body.classList.contains('dark')) {
    themeToggleBtn.textContent = 'Tema Claro';
  } else {
    themeToggleBtn.textContent = 'Tema Escuro';
  }
}

// Aplicar tema salvo
if(localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}
updateThemeText();

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if(body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  updateThemeText();
});

// Accordion "Saiba mais"
const saibaMaisBtns = document.querySelectorAll('button.saiba-mais-btn');

saibaMaisBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('aria-controls');
    const content = document.getElementById(targetId);

    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));

    if (content) {
      if (expanded) {
        content.classList.add('hidden');
      } else {
        content.classList.remove('hidden');
      }
    }
  });
});