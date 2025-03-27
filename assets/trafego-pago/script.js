
/* ################# Navbar.js ############################# */

const menu = document.getElementById('menu');
const mainContent = document.getElementById('main-content');

// Alterna o estado do menu lateral
function toggleMenu() {
    const isOpen = menu.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
}

// Abre o menu lateral
function openMenu() {
    menu.classList.add('active');
    menu.setAttribute('aria-hidden', 'false');
    mainContent?.classList.add('overlay');
}

// Fecha o menu lateral
function closeMenu() {
    menu.classList.remove('active');
    menu.setAttribute('aria-hidden', 'true');
    mainContent?.classList.remove('overlay');
}

// Fecha o menu ao clicar fora dele
window.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !event.target.closest('.menu-btn')) {
        closeMenu();
    }
});

// Fecha o menu ao pressionar ESC
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

/* ################# slideshow.js ############################# */

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}





