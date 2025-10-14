const menu = [
  { nome: "Carne seca", preco: 18, categoria: "lanches", img: "assets/img/carne-seca.jpg", desc: "Tapioca, carne seca, queijo" },
  { nome: "Ovo", preco: 10, categoria: "lanches", img: "assets/img/ovo.jpg", desc: "Tapioca, ovo, queijo" },
  { nome: "Coca-Cola", preco: 7, categoria: "bebidas", img: "assets/img/coca.jpg", desc: "Refrigerante sabor cola" },
  { nome: "Suco Natural", preco: 10, categoria: "bebidas", img: "assets/img/suco.jpg", desc: "Suco de frutas natural" },
];

const menuContainer = document.getElementById("menu");
const filtro = document.getElementById("filtroCategoria");
const itensPedido = document.getElementById("itens-pedido");
const totalSpan = document.getElementById("total");
const form = document.getElementById("pedido-form");

let pedido = [];
let total = 0;

function renderMenu(categoria = "todos") {
  menuContainer.innerHTML = "";
  menu
    .filter((item) => categoria === "todos" || item.categoria === categoria)
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded-xl shadow-md flex flex-col justify-between";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.nome}" class="w-full h-64 object-cover rounded-b-xl shadow-lg" />
        <h3 class="text-xl font-semibold">${item.nome}</h3>
        <p class="text-sm text-gray-600">${item.desc}</p>
        <span class="text-lg font-bold text-[var(--vermelho-telha)]">R$ ${item.preco.toFixed(2)}</span>
        <button class="mt-3 bg-[var(--amarelo-mostarda)] text-black py-2 px-4 rounded hover:bg-yellow-400 font-semibold">Adicionar</button>
      `;
      div.querySelector("button").addEventListener("click", () => addToOrder(item));
      menuContainer.appendChild(div);
    });
}

function addToOrder(item) {
  pedido.push(item);
  total += item.preco;
  atualizarPedido();
}

function atualizarPedido() {
  itensPedido.innerHTML = "";
  pedido.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    itensPedido.appendChild(p);
  });
  totalSpan.textContent = total.toFixed(2);
}

filtro.addEventListener("change", () => renderMenu(filtro.value));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pedido.length === 0) return alert("Adicione itens ao pedido!");
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const forma = document.getElementById("formaPagamento").value;
  const obs = document.getElementById("obs").value;

  const msg = `*Novo Pedido*\n\nCliente: ${nome}\nTelefone: ${telefone}\nEndereço: ${endereco}\nForma de Pagamento: ${forma}\n\nItens:\n${pedido.map(p => `• ${p.nome} - R$ ${p.preco.toFixed(2)}`).join("\n")}\n\nTotal: R$ ${total.toFixed(2)}\n\nObs: ${obs}`;
  const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});

renderMenu();
