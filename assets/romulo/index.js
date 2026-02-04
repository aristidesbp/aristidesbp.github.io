
// === PARTE 1/5 ===
// Cria toda a estrutura HTML e CSS dinamicamente

document.body.innerHTML = `
  <nav>
    <h2>RB Estruturas</h2>
    <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
    <ul id="nav-menu">
      <li><a href="#about">Sobre</a></li>
      <li><a href="#services">Serviços</a></li>
      <li><a href="#gallery">Galeria</a></li>
      <li><a href="#contact">Contato</a></li>
    </ul>
  </nav>

  <header>
    <h1>RB Estruturas e Eventos</h1>
    <p>Mais de 10 anos realizando convenções e grandes eventos com segurança e impacto.</p>
    <a href="#contact">Solicite um Orçamento</a>
  </header>

  <section id="about" class="about fade-in">
    <h2>Sobre Nós</h2>
    <p>Com mais de uma década de experiência, a RB Estruturas e Eventos é referência em montagem de estruturas para convenções, shows, feiras e eventos de grande porte.</p>
  </section>




`;

// Criação do <style> principal
const css = `
:root {
  --primary: #f97316;
  --dark: #1a1a1a;
  --light: #f5f5f5;
  --gray: #777;
}
* { margin:0; padding:0; box-sizing:border-box; font-family:'Montserrat',sans-serif; }
body { background:var(--light); color:var(--dark); line-height:1.6; overflow-x:hidden; }
nav {
  position:fixed; top:0; left:0; width:100%;
  background:#fff; box-shadow:0 2px 5px rgba(0,0,0,0.1);
  z-index:1000; display:flex; justify-content:space-between; align-items:center;
  padding:10px 30px;
}
nav h2 { color:var(--primary); font-size:1.2rem; }
nav ul { list-style:none; display:flex; gap:20px; }
nav ul li a { text-decoration:none; color:var(--dark); font-weight:600; transition:0.3s; }
nav ul li a:hover { color:var(--primary); }
.hamburger { display:none; flex-direction:column; cursor:pointer; gap:5px; }
.hamburger span { width:25px; height:3px; background:var(--dark); border-radius:2px; }
@media(max-width:768px){
  nav ul {
    display:none; flex-direction:column; position:absolute; top:60px; right:20px;
    background:#fff; border:1px solid #ddd; padding:10px; border-radius:8px;
  }
  nav ul.active { display:flex; }
  .hamburger { display:flex; }
}
header {
  background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('images/img1.jpg') center/cover no-repeat;
  color:#fff; text-align:center; padding:120px 20px; position:relative;
}
header h1 { font-size:3rem; margin-bottom:10px; animation:fadeInDown 1s; }
header p { font-size:1.2rem; margin-bottom:20px; animation:fadeInUp 1.2s; }
header a {
  background:var(--primary); color:#fff; padding:12px 30px; text-decoration:none;
  border-radius:30px; transition:0.3s; font-weight:600; animation:fadeInUp 1.5s;
}
header a:hover { background:#ff8c3f; }
section { padding:80px 20px; text-align:center; }
.fade-in { opacity:0; transform:translateY(40px); transition:all 0.8s ease; }
.fade-in.visible { opacity:1; transform:translateY(0); }
@keyframes fadeInDown { from{opacity:0;transform:translateY(-40px);} to{opacity:1;transform:translateY(0);} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(40px);} to{opacity:1;transform:translateY(0);} }
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);




// === PARTE 2/5 ===
// Adiciona as seções de serviços e galeria

document.body.insertAdjacentHTML('beforeend', `
  <section id="services" class="services fade-in">
    <h2>Nossos Serviços</h2>
    <div class="cards">
      <div class="card"><h3>Palcos e Estruturas</h3><p>Montagem de palcos modernos e resistentes para grandes apresentações.</p></div>
      <div class="card"><h3>Arquibancadas</h3><p>Estruturas seguras e confortáveis para grandes públicos.</p></div>
      <div class="card"><h3>Tendas e Coberturas</h3><p>Soluções práticas e elegantes para proteção e ambientação.</p></div>
      <div class="card"><h3>Som e Iluminação</h3><p>Equipamentos de última geração para garantir qualidade no seu evento.</p></div>
    </div>
  </section>

  <section id="gallery" class="gallery fade-in">
    <h2>Galeria de Eventos</h2>
    <div class="slider">
      <div class="slides">
        <img src="images/logo.jpg" alt="Evento 0">
        <img src="images/img1.jpg" alt="Evento 1">
        <img src="images/img2.jpg" alt="Evento 2">
        <img src="images/img3.jpg" alt="Evento 3">
        <img src="images/img4.jpg" alt="Evento 4">
        <img src="images/img5.jpg" alt="Evento 5">
        <img src="images/img6.jpg" alt="Evento 6">
        <img src="images/img7.jpg" alt="Evento 7">
        <img src="images/img8.jpg" alt="Evento 8">
        <img src="images/img9.jpg" alt="Evento 9">
        <img src="images/img10.jpg" alt="Evento 10">
        <img src="images/img11.jpg" alt="Evento 11">
      </div>
      <button class="prev">&#10094;</button>
      <button class="next">&#10095;</button>
    </div>

    <div id="modal" class="modal">
      <img id="modal-img">
    </div>
  </section>
`);

// CSS adicional
const css2 = `
.cards {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:20px; margin-top:40px;
}
.card {
  background:#fff; padding:30px; border-radius:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
  transition:0.3s;
}
.card:hover { transform:translateY(-10px); }
.card h3 { color:var(--primary); margin-bottom:15px; }

.slider { position:relative; overflow:hidden; width:100%; max-width:1000px; margin:auto; height:300px; border-radius:10px; }
.slides { display:flex; transition:transform 0.5s ease-in-out; height:100%; }
.slides img { width:100%; flex-shrink:0; object-fit:cover; cursor:pointer; }
.prev, .next {
  position:absolute; top:50%; transform:translateY(-50%);
  background:rgba(0,0,0,0.5); color:#fff; border:none; padding:10px;
  cursor:pointer; border-radius:50%;
}
.prev { left:10px; } .next { right:10px; }

.modal {
  display:none; position:fixed; top:0; left:0; width:100%; height:100%;
  background:rgba(0,0,0,0.9); justify-content:center; align-items:center; z-index:10000;
}
.modal img { max-width:90%; max-height:90%; border-radius:10px; }
`;
const style2 = document.createElement('style');
style2.textContent = css2;
document.head.appendChild(style2);

// Script do slider e modal
setTimeout(()=>{
  let index=0;
  const slides=document.querySelector('.slides');
  const total=slides.children.length;
  const modal=document.getElementById('modal');
  const modalImg=document.getElementById('modal-img');

  function showSlide(i){
    if(i>=total) index=0;
    else if(i<0) index=total-1;
    else index=i;
    slides.style.transform=\`translateX(-\${index*100}%)\`;
  }

  document.querySelector('.next').addEventListener('click',()=>showSlide(index+1));
  document.querySelector('.prev').addEventListener('click',()=>showSlide(index-1));
  setInterval(()=>showSlide(index+1),5000);

  document.querySelectorAll('.slides img').forEach(img=>{
    img.addEventListener('click',()=>{
      modal.style.display='flex';
      modalImg.src=img.src;
    });
  });
  modal.addEventListener('click',()=>modal.style.display='none');
},500);

