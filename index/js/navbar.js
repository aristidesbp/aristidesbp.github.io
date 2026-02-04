// assets/js/navbar.js

function criarNavbar() {
  const nav = document.getElementById("componente-Navbar");

  if (!nav) return;

  nav.innerHTML = `

<style>
/* assets/css/Navbar.css */
#componente-Navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #000;
  box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
}

#componente-Navbar .navbar-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: #FFD700;
  font-family: 'DM Sans', sans-serif;
}

#componente-Navbar .logo {
  font-size: 1.5rem;
  font-weight: bold;
}

#componente-Navbar .nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

#componente-Navbar .nav-links a {
  color: #FFD700;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

#componente-Navbar .nav-links a:hover {
  color: white;
}

#componente-Navbar .hamburger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
}

#componente-Navbar .hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: #FFD700;
  border-radius: 2px;
  transition: 0.3s;
}

@media (max-width: 768px) {
  #componente-Navbar .hamburger {
    display: flex;
  }

  #componente-Navbar .nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    background: #111;
    flex-direction: column;
    width: 200px;
    display: none;
  }

  #componente-Navbar .nav-links.ativo {
    display: flex;
  }
}

</style>
    <div class="navbar-container">
      <div class="logo">Aristidesbp</div>
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="#componente-Header">Início</a></li>
        <li><a href="#componente-servicos">Serviços</a></li>
        <li><a href="#main-formularioContato">Contato</a></li>
      </ul>
    </div>
  `;

  const hamburger = nav.querySelector(".hamburger");
  const navLinks = nav.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("ativo");
    hamburger.classList.toggle("ativo");
  });
}

