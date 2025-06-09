// ====================
// MODO CLARO/ESCURO
// ====================

// Elemento do botão de alternância de tema
const themeBtn = document.getElementById('theme-toggle');

// Função para definir o tema claro ou escuro
function setTheme(dark) {
    if (dark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

// Alterna o tema ao clicar no botão
themeBtn.onclick = function() {
    setTheme(!document.body.classList.contains('dark'));
};

// Define o tema com base no localStorage ou na preferência do SO
if (
    localStorage.getItem('theme') === 'dark' ||
    (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    setTheme(true);
} else {
    setTheme(false);
}

// ==============================================
// CAIXA FLUTUANTE DE RÁDIO (PLAYER DE MÚSICA)
// ==============================================

// Elementos da caixa flutuante
const radioFloat = document.getElementById('radio-float');
const radioFloatToggle = document.getElementById('radio-float-toggle');

// Mostra ou esconde o conteúdo da caixa de rádio
radioFloatToggle.onclick = function() {
    radioFloat.classList.toggle('closed');
    radioFloatToggle.title = radioFloat.classList.contains('closed') ? "Mostrar Rádio" : "Ocultar Rádio";
};

// Configuração do player de música, controles e eventos
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do player
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

    // Configuração inicial do volume e loop
    bgMusic.volume = parseFloat(volSlider.value);
    bgMusic.loop = false;
    bgMusicBtn.title = 'Play/Pause';

    // Play/Pause ao clicar no botão
    bgMusicBtn.onclick = function () {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            bgMusicBtn.textContent = '🔊';
        } else {
            bgMusic.pause();
            bgMusicBtn.textContent = '🎵';
        }
    };

    // Atualiza visualização do volume
    function updateVolumeDisplay() {
        volSlider.value = bgMusic.volume;
    }
    // Botões de volume
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

    // Troca a música selecionada
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

    // Formata o tempo em minutos:segundos
    function formatTime(sec) {
        if (isNaN(sec)) return "0:00";
        sec = Math.floor(sec);
        const min = Math.floor(sec / 60);
        const s = sec % 60;
        return min + ":" + (s < 10 ? "0" : "") + s;
    }
    // Atualiza a barra de progresso e tempos
    function updateProgress() {
        const current = bgMusic.currentTime;
        const duration = bgMusic.duration;
        musicCurrent.textContent = formatTime(current);
        musicDuration.textContent = formatTime(duration);
        musicProgress.value = duration ? (current / duration) * 100 : 0;
    }
    // Eventos para atualizar progresso e repetir música
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
    // Permite arrastar a barra de progresso
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

    // Efeito sonoro ao passar mouse em links (classe .links a)
    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const audio = document.getElementById('hoverSound');
            audio.currentTime = 0;
            audio.volume = 0.20;
            audio.play();
        });
    });
});

// ================================================
// LISTA DE PRODUTOS E SERVIÇOS (CARDS DA LOJA)
// ================================================

// Lista fixa de itens (serviços e produtos)
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
    }   
];

// Elementos da loja/carrinho
const itemContainer = document.getElementById("itemContainer");
const cartItemsEl = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPedido = document.getElementById("totalPedido");

let cartModalInstance = null; // Instância do modal do carrinho

// Carrega e exibe os itens na loja, aplicando o filtro selecionado
function loadItems() {
    itemContainer.innerHTML = "";
    const filter = document.getElementById("filterCategory").value;

    // Junta os itens fixos com os cadastrados pelo admin
    const fixedItems = [...items];
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const allItems = [...fixedItems, ...storedItems];
    window.items = allItems;

    // Filtra conforme categoria
    const filteredItems = allItems.filter(item =>
        filter === "todos" || item.tipo === filter
    );

    // Gera o HTML dos cards, incluindo a descrição
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

// Retorna o carrinho do localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Atualiza o carrinho no localStorage e a contagem no menu
function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.innerText = cart.length;
}

// Adiciona item ao carrinho
function addToCart(id) {
    const cart = getCart();
    const item = (window.items && window.items.find(i => i.id === id));
    if (item) {
        cart.push(item);
        updateCart(cart);
    }
}

// Abre o modal do carrinho, exibindo os itens e total
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

// Remove item do carrinho pela posição
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

// Atualiza a lista quando muda o filtro
function filterItems() {
    loadItems();
}

// Envia o pedido via WhatsApp e limpa o carrinho
function enviarPedido(e) {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return alert("Carrinho vazio.");

    // Dados do cliente
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;

    const itens = cart.map(i => `• ${i.nome} - R$ ${i.preco}`).join("\n");
    const total = cart.reduce((sum, i) => sum + i.preco, 0);

    // Mensagem formatada
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

// Carrega a interface quando o DOM está pronto
window.addEventListener("DOMContentLoaded", () => {
    loadItems();
    updateCart(getCart());
});

// ==============================================
// PAINEL ADMINISTRATIVO (LOGIN E CADASTRO)
// ==============================================

// Instância do modal de login admin
let adminLoginModalInstance = null;
// Função para abrir o modal de login admin
function openAdminLoginModal() {
    if (!adminLoginModalInstance) {
        adminLoginModalInstance = new bootstrap.Modal(document.getElementById('adminLoginModal'));
    }
    adminLoginModalInstance.show();
}

// Valida senha de admin e abre painel se correta
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

// Instância do modal do painel admin
let adminPanelModalInstance = null;
// Abre o modal do painel admin
function openAdminPanel() {
    if (!adminPanelModalInstance) {
        adminPanelModalInstance = new bootstrap.Modal(document.getElementById('adminPanelModal'));
    }
    adminPanelModalInstance.show();
}

// Salva novo item cadastrado no painel admin
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

// Alterna visualização da tabela de itens cadastrados no admin
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

// Remove item cadastrado pelo admin
function removerItem(index) {
    const dadosSalvos = JSON.parse(localStorage.getItem("items")) || [];
    dadosSalvos.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(dadosSalvos));
    toggleView();
    toggleView();
}

// ==============================================
// MODAL "SOBRE" (INFORMAÇÃO DO AUTOR)
// ==============================================

// Instância do modal "Sobre"
let sobreModalInstance = null;
// Abre o modal de informações sobre AristidesBP
function openSobreModal() {
    if (!sobreModalInstance) {
        sobreModalInstance = new bootstrap.Modal(document.getElementById('sobreModal'));
    }
    sobreModalInstance.show();
}
