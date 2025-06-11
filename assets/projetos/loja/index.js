// ==================== TEMA CLARO/ESCURO ====================
const themeBtn = document.getElementById('theme-toggle');
function setTheme(dark) {
  if (dark) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
themeBtn && (themeBtn.onclick = function() {
  setTheme(!document.body.classList.contains('dark'));
});
if (localStorage.getItem('theme') === 'dark' ||
  (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
} else { setTheme(false); }

// ================== RÁDIO FLUTUANTE ===================
const radioFloat = document.getElementById('radio-float');
const radioFloatToggle = document.getElementById('radio-float-toggle');
radioFloatToggle && (radioFloatToggle.onclick = function() {
  radioFloat.classList.toggle('closed');
  radioFloatToggle.title = radioFloat.classList.contains('closed') ? "Mostrar Rádio" : "Ocultar Rádio";
});

document.addEventListener('DOMContentLoaded', function () {
  const bgMusic = document.getElementById('bgMusic');
  const bgMusicBtn = document.getElementById('bgMusicBtn');
  const volDown = document.getElementById('vol-down');
  const volUp = document.getElementById('vol-up');
  const volSlider = document.getElementById('vol-slider');
  const musicSelect = document.getElementById('music-select');
  const musicProgress = document.getElementById('music-progress');
  const musicCurrent = document.getElementById('music-current');
  const musicDuration = document.getElementById('music-duration');
  const repeatMusic = document.getElementById('repeatMusic');
  const musicList = Array.from(musicSelect.options).map(opt => opt.value);

  if (!bgMusic) return; // fail safe

  bgMusic.volume = parseFloat(volSlider.value);
  bgMusic.loop = false;
  bgMusicBtn.title = 'Play/Pause';
  bgMusicBtn.onclick = function () {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      bgMusicBtn.textContent = '⏹️';
    } else {
      bgMusic.pause();
      bgMusicBtn.textContent = '▶️';
    }
  };
  function updateVolumeDisplay() { volSlider.value = bgMusic.volume; }
  volDown.onclick = function () {
    bgMusic.volume = Math.max(0, bgMusic.volume - 0.08);
    updateVolumeDisplay();
  };
  volUp.onclick = function () {
    bgMusic.volume = Math.min(1, bgMusic.volume + 0.08);
    updateVolumeDisplay();
  };
  volSlider.oninput = function () { bgMusic.volume = parseFloat(volSlider.value); };
  musicSelect.onchange = function() {
    const wasPlaying = !bgMusic.paused;
    bgMusic.src = musicSelect.value;
    bgMusic.currentTime = 0;
    if (wasPlaying) {
      bgMusic.play().catch(() => {});
      bgMusicBtn.textContent = '⏹️';
    } else { bgMusicBtn.textContent = '▶️'; }
  };
  function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    sec = Math.floor(sec);
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return min + ":" + (s < 10 ? "0" : "") + s;
  }
  function updateProgress() {
    const current = bgMusic.currentTime;
    const duration = bgMusic.duration;
    musicCurrent.textContent = formatTime(current);
    musicDuration.textContent = formatTime(duration);
    musicProgress.value = duration ? (current / duration) * 100 : 0;
  }
  bgMusic.addEventListener('timeupdate', updateProgress);
  bgMusic.addEventListener('durationchange', updateProgress);
  bgMusic.addEventListener('loadedmetadata', updateProgress);
  bgMusic.addEventListener('ended', function() {
    if (repeatMusic.checked) {
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => {});
      bgMusicBtn.textContent = '⏹️';
    } else {
      let idx = musicList.indexOf(musicSelect.value);
      let next = (idx + 1) % musicList.length;
      musicSelect.selectedIndex = next;
      bgMusic.src = musicList[next];
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => {});
      bgMusicBtn.textContent = '⏹️';
    }
  });
  musicProgress.addEventListener('input', function() {
    if (bgMusic.duration) {
      bgMusic.currentTime = (musicProgress.value / 100) * bgMusic.duration;
    }
  });
  musicSelect.addEventListener('change', function() { setTimeout(updateProgress, 400); });
  repeatMusic.addEventListener('change', function () { bgMusic.loop = repeatMusic.checked; });
  document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const audio = document.getElementById('hoverSound');
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.20;
        audio.play();
      }
    });
  });
});

// ========== LISTA DE ITENS/PRODUTOS/SERVIÇOS ==========
const items = [
  {
    "id": 1,
    "nome": "Desenvolvimento Web",
    "tipo": "servico",
    "preco": 2000,
    "descricao": "Criação de sites profissionais, landing pages e portfólios modernos com HTML, CSS, JavaScript e frameworks.",
    "foto": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 2,
    "nome": "Mentoria em Programação",
    "tipo": "servico",
    "preco": 1200,
    "descricao": "Aulas práticas e personalizadas para quem quer aprender lógica, front-end e boas práticas no desenvolvimento.",
    "foto": "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 3,
    "nome": "Criação de Aplicativos",
    "tipo": "servico",
    "preco": 3500,
    "descricao": "Aplicativos móveis Android com interface moderna e uso de banco de dados local, ideal para negócios.",
    "foto": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 4,
    "nome": "Gestão de Tráfego Pago",
    "tipo": "servico",
    "preco": 1500,
    "descricao": "Criação de campanhas otimizadas no Google Ads e Meta Ads para atrair clientes e aumentar suas vendas.",
    "foto": "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 5,
    "nome": "Mouse Gamer",
    "tipo": "produto",
    "preco": 150,
    "descricao": "Mouse de alta precisão, ideal para jogos e produtividade.",
    "foto": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 6,
    "nome": "Notebook Dell",
    "tipo": "produto",
    "preco": 3500,
    "descricao": "Notebook Dell com processador potente, ideal para trabalho e estudos.",
    "foto": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  }
];

// ========== ITENS: SEMPRE PRIORIZE LOCALSTORAGE POR ID ==========
function getAllItems() {
  const fixedItems = [...items];
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  // Remove do array fixo os que foram editados (mesmo id)
  const filteredFixed = fixedItems.filter(fix => !storedItems.some(st => st.id === fix.id));
  return [...filteredFixed, ...storedItems];
}

// ========== ATUALIZA LISTA NA TELA ==========
const itemContainer = document.getElementById("itemContainer");
function loadItems() {
  if (!itemContainer) return;
  itemContainer.innerHTML = "";
  const filterSelect = document.getElementById("filterCategory");
  const filter = filterSelect ? filterSelect.value : "todos";
  const allItems = getAllItems();
  window.items = allItems;
  const filteredItems = allItems.filter(item =>
    filter === "todos" || item.tipo === filter
  );
  filteredItems.forEach(item => {
    itemContainer.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card p-3 h-100 d-flex flex-column">
          ${item.foto ? `<img class="card-img-top" src="${item.foto}" alt="${item.nome}">` : ""}
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title">${item.nome}</h5>
            <p class="card-description" style="min-height:60px">${item.descricao ? item.descricao : ""}</p>
            <p class="card-text">Tipo: ${item.tipo}</p>
            <p class="card-text">Preço: R$ ${item.preco}</p>
            <div class="btn-group">
              <button class="btn btn-primary" onclick="addToCart(${item.id})">Adicionar</button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

// ========== CARRINHO ==========
const cartItemsEl = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPedido = document.getElementById("totalPedido");
let cartModalInstance = null;

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  if (cartCount) {
    let qtd = 0;
    cart.forEach(item => qtd += item.quantidade || 1);
    cartCount.innerText = qtd;
  }
}
function addToCart(id) {
  const cart = getCart();
  const item = (window.items && window.items.find(i => i.id === id));
  if (!item) return;
  if (item.tipo === "servico") {
    // Permite apenas um serviço igual no carrinho
    if (cart.some(i => i.id === id)) {
      alert("Este serviço já está no carrinho!");
      return;
    }
    cart.push({ ...item, quantidade: 1 });
  } else {
    // Produto: soma quantidade se já existe, senão adiciona
    const idx = cart.findIndex(i => i.id === id);
    if (idx !== -1) {
      cart[idx].quantidade = (cart[idx].quantidade || 1) + 1;
    } else {
      cart.push({ ...item, quantidade: 1 });
    }
  }
  updateCart(cart);
}
function openCartModal() {
  const cart = getCart();
  if (!cartItemsEl || !totalPedido) return;
  cartItemsEl.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<li class='list-group-item'>Carrinho vazio</li>";
  } else {
    cart.forEach((item, index) => {
      const qtd = item.quantidade || 1;
      total += item.preco * qtd;
      cartItemsEl.innerHTML += `
        <li class='list-group-item d-flex justify-content-between align-items-center'>
         

 <div>
            ${item.nome} - R$ ${item.preco} 
            ${item.tipo === 'produto' ? `
              
<button class="btn btn-sm btn-secondary ms-2" onclick="alterarQtd(${index}, -1)">🔻</button>

<button class="btn btn-sm btn-secondary" onclick="alterarQtd(${index}, 1)">🔺</button>


<button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button> 


<span class="mx-2">${qtd}</span>

            ` : `<span class="mx-2">Qtd: ${qtd}</span>`}
          </div>
         


        </li>`;
    });
  }
  totalPedido.innerText = `Total: R$ ${total.toFixed(2)}`;
  if (!cartModalInstance) {
    cartModalInstance = new bootstrap.Modal(document.getElementById("cartModal"));
  }
  cartModalInstance.show();
}
function alterarQtd(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  if (cart[index].tipo === 'produto') {
    cart[index].quantidade = (cart[index].quantidade || 1) + delta;
    if (cart[index].quantidade < 1) {
      cart.splice(index, 1);
    }
    updateCart(cart);
    openCartModal();
  }
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  updateCart(cart);
  if (cart.length === 0 && cartModalInstance) {
    cartModalInstance.hide();
  } else {
    openCartModal();
  }
}
function filterItems() { loadItems(); }

// ========== MÁSCARAS E VALIDAÇÃO FORMULÁRIO ==========
function maskCPF(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = v;
}
function maskTelefone(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = v;
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}
function validateTelefone(tel) {
  // Aceita formatos: (99) 99999-9999
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(tel);
}
window.addEventListener("DOMContentLoaded", () => {
  const cpfInput = document.getElementById("cpf");
  const telInput = document.getElementById("telefone");
  if (cpfInput) cpfInput.addEventListener("input", () => maskCPF(cpfInput));
  if (telInput) telInput.addEventListener("input", () => maskTelefone(telInput));
});

// ========== FINALIZAR PEDIDO ==========
function enviarPedido(e) {
  e.preventDefault();
  const cart = getCart();
  if (cart.length === 0) return alert("Carrinho vazio.");
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  // Validação!
  if (!nome) return alert("Informe seu nome.");
  if (!validateCPF(cpf)) return alert("CPF inválido.");
  if (!validateEmail(email)) return alert("E-mail inválido.");
  if (!validateTelefone(telefone)) return alert("Telefone no formato inválido. Use (99) 99999-9999.");
  if (!endereco) return alert("Informe o endereço.");

  // Gera o objeto da venda
  const jsonVenda = {
    nome, cpf, telefone, email, endereco,
    itens: cart,
    total: cart.reduce((sum, i) => sum + (i.preco * (i.quantidade || 1)), 0),
    data: (new Date()).toISOString()
  };
  // Codifica em Base64
  const jsonString = JSON.stringify(jsonVenda);
  const jsonBase64 = btoa(unescape(encodeURIComponent(jsonString))); // compatível com UTF-8

  const itens = cart.map(i => `• ${i.nome} - R$ ${i.preco} x${i.quantidade || 1}`).join("\n");
  const total = cart.reduce((sum, i) => sum + (i.preco * (i.quantidade || 1)), 0);
  const mensagem =
    `Olá! Gostaria de finalizar uma compra com os seguintes dados:\n
*NOME:* ${nome}
*CPF:* ${cpf}
*TELEFONE:* ${telefone}
*EMAIL:* ${email}
*ENDEREÇO:* ${endereco}

*ITENS DO PEDIDO:*
${itens}

*TOTAL:* R$ ${total.toFixed(2)}

*CÓDIGO DA VENDA:* ${jsonBase64}
`;

  const numero = "5591992420981";
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
  localStorage.removeItem("cart");
  updateCart([]);
}

// Sincronizar alterações do LocalStorage entre abas
window.addEventListener('storage', function(e) {
  if (e.key === 'items' || e.key === 'cart') {
    loadItems();
    updateCart(getCart());
  }
});

// Carrega itens ao iniciar
window.addEventListener("DOMContentLoaded", () => {
  loadItems();
  updateCart(getCart());
});

// ========== PAINEL ADMINISTRATIVO ==========
let adminLoginModalInstance = null;
function openAdminLoginModal() {
  if (!adminLoginModalInstance) {
    adminLoginModalInstance = new bootstrap.Modal(document.getElementById('adminLoginModal'));
  }
  adminLoginModalInstance.show();
}
function handleAdminLogin(event) {
  event.preventDefault();
  const senha = document.getElementById('adminPassword').value;
  // Para produção, implemente método seguro de senha!
  const senhaCorreta = "admin123";
  if (senha === senhaCorreta) {
    adminLoginModalInstance.hide();
    openAdminPanel();
  } else {
    alert("Senha incorreta! Tente novamente.");
  }
}
let adminPanelModalInstance = null;
function openAdminPanel() {
  if (!adminPanelModalInstance) {
    adminPanelModalInstance = new bootstrap.Modal(document.getElementById('adminPanelModal'));
  }
  adminPanelModalInstance.show();
}
function salvarNovoItem(event) {
  event.preventDefault();
  const nome = document.getElementById("novoNome").value.trim();
  const preco = parseFloat(document.getElementById("novoPreco").value);
  const tipo = document.getElementById("novoTipo").value;
  const descricao = document.getElementById("novoDescricao").value.trim();
  const foto = document.getElementById("novoFoto").value.trim();
  if (!nome || !preco || !tipo) {
    alert("Preencha todos os campos corretamente.");
    return;
  }
  let items = JSON.parse(localStorage.getItem("items")) || [];
  const novoItem = {
    id: Date.now(),
    nome,
    preco,
    tipo,
    descricao,
    foto
  };
  items.push(novoItem);
  localStorage.setItem("items", JSON.stringify(items));
  alert("Item cadastrado com sucesso!");
  document.getElementById("cadastroForm").reset();
  loadItems();
}
document.getElementById("cadastroForm") &&
  document.getElementById("cadastroForm").addEventListener("submit", salvarNovoItem);

let visualizacaoAtiva = false;
function toggleView() {
  const container = document.getElementById("itensAdmin");
  if (!container) return;
  if (visualizacaoAtiva) {
    container.innerHTML = "";
    visualizacaoAtiva = false;
    return;
  }
  const dadosSalvos = JSON.parse(localStorage.getItem("items")) || [];
  if (dadosSalvos.length === 0) {
    container.innerHTML = "<p class='text-muted'>Nenhum item cadastrado ainda.</p>";
    visualizacaoAtiva = true;
    return;
  }
  let tabelaHTML = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Preço (R$)</th>
          <th>Descrição</th>
          <th>Foto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  `;
  dadosSalvos.forEach((item, index) => {
    tabelaHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.tipo}</td>
        <td>${item.preco}</td>
        <td>${item.descricao ? item.descricao : ""}</td>
        <td>${item.foto ? `<img src="${item.foto}" style="max-width:60px;max-height:40px;">` : ""}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
          <button class="btn btn-sm btn-edit" onclick="openEditItemModal(${item.id})">Editar</button>
        </td>
      </tr>
    `;
  });
  tabelaHTML += "</tbody></table>";
  container.innerHTML = tabelaHTML;
  visualizacaoAtiva = true;
}
function removerItem(index) {
  const dadosSalvos = JSON.parse(localStorage.getItem("items")) || [];
  dadosSalvos.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(dadosSalvos));
  toggleView();
  toggleView();
}

// ========== MODAL EDITAR ITEM ==========
function openEditItemModal(id) {
  const allItems = getAllItems();
  const item = allItems.find(i => i.id === id);
  if (!item) return;
  document.getElementById("editItemId").value = item.id;
  document.getElementById("editNome").value = item.nome || "";
  document.getElementById("editPreco").value = item.preco || "";
  document.getElementById("editTipo").value = item.tipo || "";
  document.getElementById("editDescricao").value = item.descricao || "";
  document.getElementById("editFoto").value = item.foto || "";
  if (!window.editItemModalInstance) {
    window.editItemModalInstance = new bootstrap.Modal(document.getElementById('editItemModal'));
  }
  window.editItemModalInstance.show();
}
document.getElementById("editItemForm") &&
  document.getElementById("editItemForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = Number(document.getElementById("editItemId").value);
    const nome = document.getElementById("editNome").value.trim();
    const preco = parseFloat(document.getElementById("editPreco").value);
    const tipo = document.getElementById("editTipo").value;
    const descricao = document.getElementById("editDescricao").value.
