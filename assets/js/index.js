// Modo claro/escuro
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
themeBtn.onclick = function() {
    setTheme(!document.body.classList.contains('dark'));
};
if (
    localStorage.getItem('theme') === 'dark' ||
    (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    setTheme(true);
} else {
    setTheme(false);
}

// Caixa flutuante rádio: mostra/esconde conteúdo
const radioFloat = document.getElementById('radio-float');
const radioFloatToggle = document.getElementById('radio-float-toggle');
radioFloatToggle.onclick = function() {
    radioFloat.classList.toggle('closed');
    radioFloatToggle.title = radioFloat.classList.contains('closed') ? "Mostrar Rádio" : "Ocultar Rádio";
};

// Painel música
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

    bgMusic.volume = parseFloat(volSlider.value);
    bgMusic.loop = false;
    bgMusicBtn.title = 'Play/Pause';

    bgMusicBtn.onclick = function () {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            bgMusicBtn.textContent = '🔊';
        } else {
            bgMusic.pause();
            bgMusicBtn.textContent = '🎵';
        }
    };
    function updateVolumeDisplay() {
        volSlider.value = bgMusic.volume;
    }
    volDown.onclick = function () {
        bgMusic.volume = Math.max(0, bgMusic.volume - 0.08);
        updateVolumeDisplay();
    };
    volUp.onclick = function () {
        bgMusic.volume = Math.min(1, bgMusic.volume + 0.08);
        updateVolumeDisplay();
    };
    volSlider.oninput = function () {
        bgMusic.volume = parseFloat(volSlider.value);
    };
    musicSelect.onchange = function() {
        const wasPlaying = !bgMusic.paused;
        bgMusic.src = musicSelect.value;
        bgMusic.currentTime = 0;
        if (wasPlaying) {
            bgMusic.play().catch(() => {});
            bgMusicBtn.textContent = '🔊';
        } else {
            bgMusicBtn.textContent = '🎵';
        }
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
            bgMusicBtn.textContent = '🔊';
        } else {
            let idx = musicList.indexOf(musicSelect.value);
            let next = (idx + 1) % musicList.length;
            musicSelect.selectedIndex = next;
            bgMusic.src = musicList[next];
            bgMusic.currentTime = 0;
            bgMusic.play().catch(() => {});
            bgMusicBtn.textContent = '🔊';
        }
    });
    musicProgress.addEventListener('input', function() {
        if (bgMusic.duration) {
            bgMusic.currentTime = (musicProgress.value / 100) * bgMusic.duration;
        }
    });
    musicSelect.addEventListener('change', function() {
        setTimeout(updateProgress, 400);
    });
    repeatMusic.addEventListener('change', function () {
        bgMusic.loop = repeatMusic.checked;
    });

    // Sound on hover for .links a
    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const audio = document.getElementById('hoverSound');
            audio.currentTime = 0;
            audio.volume = 0.20;
            audio.play();
        });
    });
});

// Lista de produtos e serviços
const items = [
    {
        id: 1,
        nome: "Desenvolvimento Web",
        tipo: "servico",
        preco: 2000,
        descricao: "Criação de sites profissionais, landing pages e portfólios modernos com HTML, CSS, JavaScript e frameworks."
    },
    {
        id: 2,
        nome: "Mentoria em Programação",
        tipo: "servico",
        preco: 1200,
        descricao: "Aulas práticas e personalizadas para quem quer aprender lógica, front-end e boas práticas no desenvolvimento."
    },
    {
        id: 3,
        nome: "Criação de Aplicativos",
        tipo: "servico",
        preco: 3500,
        descricao: "Aplicativos móveis Android com interface moderna e uso de banco de dados local, ideal para negócios."
    },
    {
        id: 4,
        nome: "Gestão de Tráfego Pago",
        tipo: "servico",
        preco: 1500,
        descricao: "Criação de campanhas otimizadas no Google Ads e Meta Ads para atrair clientes e aumentar suas vendas."
    },
    // Exemplo de produto físico (se desejar manter produtos)
    {
        id: 5,
        nome: "Mouse Gamer",
        tipo: "produto",
        preco: 150,
        descricao: "Mouse de alta precisão, ideal para jogos e produtividade."
    },
    {
        id: 6,
        nome: "Notebook Dell",
        tipo: "produto",
        preco: 3500,
        descricao: "Notebook Dell com processador potente, ideal para trabalho e estudos."
    }
];

// Elementos da interface
const itemContainer = document.getElementById("itemContainer");
const cartItemsEl = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPedido = document.getElementById("totalPedido");

let cartModalInstance = null;

function loadItems() {
    itemContainer.innerHTML = "";
    const filter = document.getElementById("filterCategory").value;

    const fixedItems = [...items];
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const allItems = [...fixedItems, ...storedItems];
    window.items = allItems;

    const filteredItems = allItems.filter(item =>
        filter === "todos" || item.tipo === filter
    );

    filteredItems.forEach(item => {
        itemContainer.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card p-3 h-100">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title">${item.nome}</h5>
                    <p class="card-description" style="min-height:60px">${item.descricao ? item.descricao : ""}</p>
                    <p class="card-text">Tipo: ${item.tipo}</p>
                    <p class="card-text">Preço: R$ ${item.preco}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${item.id})">Adicionar</button>
                </div>
            </div>
        </div>`;
    });
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.innerText = cart.length;
}

function addToCart(id) {
    const cart = getCart();
    const item = (window.items && window.items.find(i => i.id === id));
    if (item) {
        cart.push(item);
        updateCart(cart);
    }
}

function openCartModal() {
    const cart = getCart();
    cartItemsEl.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<li class='list-group-item'>Carrinho vazio</li>";
    } else {
        cart.forEach((item, index) => {
            total += item.preco;
            cartItemsEl.innerHTML += `
            <li class='list-group-item d-flex justify-content-between'>
                ${item.nome} - R$ ${item.preco}
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remover</button>
            </li>`;
        });
    }
    totalPedido.innerText = `Total: R$ ${total.toFixed(2)}`;
    if (!cartModalInstance) {
        cartModalInstance = new bootstrap.Modal(document.getElementById("cartModal"));
    }
    cartModalInstance.show();
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    updateCart(cart);

    if (cart.length === 0) {
        if (cartModalInstance) cartModalInstance.hide();
    } else {
        openCartModal();
    }
}

function filterItems() {
    loadItems();
}

function enviarPedido(e) {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return alert("Carrinho vazio.");

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;

    const itens = cart.map(i => `• ${i.nome} - R$ ${i.preco}`).join("\n");
    const total = cart.reduce((sum, i) => sum + i.preco, 0);

    const mensagem = `Olá! Gostaria de finalizar uma compra com os seguintes dados:\n
*NOME:* ${nome}
*CPF:* ${cpf}
*TELEFONE:* ${telefone}
*EMAIL:* ${email}
*ENDEREÇO:* ${endereco}

*ITENS DO PEDIDO:*
${itens}

*TOTAL:* R$ ${total.toFixed(2)}
`;

    const numero = "5591992420981";
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
    localStorage.removeItem("cart"); // Limpa o carrinho após enviar pedido
    updateCart([]);
}

// Carrega a interface após o DOM estar pronto
window.addEventListener("DOMContentLoaded", () => {
    loadItems();
    updateCart(getCart());
});

// Painel Administrativo
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

// Cadastro de produto/serviço
function salvarNovoItem(event) {
    event.preventDefault();
    const nome = document.getElementById("novoNome").value.trim();
    const preco = parseFloat(document.getElementById("novoPreco").value);
    const tipo = document.getElementById("novoTipo").value;
    const descricao = document.getElementById("novoDescricao") ? document.getElementById("novoDescricao").value.trim() : "";

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
        descricao
    };
    items.push(novoItem);
    localStorage.setItem("items", JSON.stringify(items));
    alert("Item cadastrado com sucesso!");
    document.getElementById("cadastroForm").reset();
    loadItems();
}
document.getElementById("cadastroForm").addEventListener("submit", salvarNovoItem);

// Visualizar/remover produtos cadastrados
let visualizacaoAtiva = false;
function toggleView() {
    const container = document.getElementById("itensAdmin");
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
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
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
