// js/site-mvc-main.js
document.addEventListener('DOMContentLoaded', async () => {
  const menuContainer = document.getElementById('menu-items');
  const filtroSelect = document.getElementById('filtroMenu');
  const jsonPath = 'json/cardapio.json';

  let cardapio = [];

  // Carrega o JSON
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Erro ao carregar cardápio');
    cardapio = await response.json();
    renderizarCardapio(cardapio);
  } catch (error) {
    console.error('Erro ao buscar JSON:', error);
    menuContainer.innerHTML = '<p>Erro ao carregar o cardápio.</p>';
  }

  // Renderiza os produtos
  function renderizarCardapio(lista) {
    menuContainer.innerHTML = '';

    lista.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'produto';
      card.setAttribute('data-categoria', produto.categoria);

      card.innerHTML = `
        <div class="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
          <img src="${produto.img}" alt="${produto.nome}" class="w-full h-64 object-cover rounded-b-xl shadow-lg" />
          <h3 class="text-xl font-semibold">${produto.nome}</h3>
          <p class="text-sm text-gray-600">${produto.descricao}</p>
          <span class="text-lg font-bold text-[var(--vermelho-telha)]">R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</span>
          <button onclick="addToOrder('${produto.nome}', ${produto.preco}); indicarSucesso(this);" class="mt-3 bg-[var(--amarelo-mostarda)] text-black py-2 px-4 rounded hover:bg-yellow-400">
            Adicionar
          </button>
        </div>
      `;

      menuContainer.appendChild(card);
    });
  }

  // Filtra por categoria
  filtroSelect.addEventListener('change', () => {
    const categoriaSelecionada = filtroSelect.value;
    if (categoriaSelecionada === 'todos') {
      renderizarCardapio(cardapio);
    } else {
      const filtrado = cardapio.filter(p => p.categoria === categoriaSelecionada);
      renderizarCardapio(filtrado);
    }
  });
});

