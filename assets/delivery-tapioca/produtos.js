
const produtos = [
  {
    "nome": "Coca-cola",
    "categoria": "bebidas",
    "descricao": "Refrigerante com gás sabor cola",
    "preco": 8,
    "imagem": "assets/img/coca.jpg"
  },
  {
    "nome": "Tapioca com ovo",
    "categoria": "lanches",
    "descricao": "Tapioca com ovo temperado",
    "preco": 10,
    "imagem": "assets/img/ovo.jpg"
  },
  {
    "nome": "Suco de abacaxi",
    "categoria": "bebidas",
    "descricao": "Suco de abacaxi com hortelã feito da fruta",
    "preco": 11,
    "imagem": "assets/img/suco.jpg"
  },
  {
    "nome": "Tapioca de bananabanana",
    "categoria": "lanches",
    "descricao": "Massa de tapioca com banana e doce de leite",
    "preco": 12,
    "imagem": "assets/img/banana.jpg"
  }
];

function renderizarProdutos(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  produtos.forEach(produto => {
    const produtoDiv = document.createElement('div');
    produtoDiv.className = 'produto';
    produtoDiv.setAttribute('data-categoria', produto.categoria);

    produtoDiv.innerHTML = `
      <div class="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
        <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-64 object-cover rounded-b-xl shadow-lg" />
        <h3 class="text-xl font-semibold">${produto.nome}</h3>
        <p class="text-sm text-gray-600">${produto.descricao}</p>
        <span class="text-lg font-bold text-[var(--vermelho-telha)]">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
        <button onclick="addToOrder('${produto.nome}', ${produto.preco}); indicarSucesso(this);" class="mt-3 bg-[var(--amarelo-mostarda)] text-black py-2 px-4 rounded hover:bg-yellow-400">
          Adicionar
        </button>
      </div>
    `;

    container.appendChild(produtoDiv);
  });
}
