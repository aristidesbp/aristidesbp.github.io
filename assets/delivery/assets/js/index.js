// Array que armazena os itens do pedido atual
let itens = [];

/**#################################
 * Adiciona um item ao pedido.
 ################################# */
function addToOrder(nome, preco) {
  const index = itens.findIndex(item => item.nome === nome);

  if (index !== -1) {
    itens[index].quantidade++;
  } else {
    itens.push({ nome, preco, quantidade: 1 });
  }

  renderOrder();
}

/**##################################
 * Indica sucesso visual no botão
 ######################################*/
function indicarSucesso(botao) {
  botao.classList.add('botao-sucesso');
  botao.classList.remove('botao-adicionar');

  setTimeout(() => {
    botao.classList.remove('botao-sucesso');
    botao.classList.add('botao-adicionar');
  }, 2000);
}

/**###########################
 * Renderiza o pedido atual
 ##############################*/
function renderOrder() {
  const container = document.getElementById('itens-pedido');
  container.innerHTML = '';

  let total = 0;

  if (itens.length === 0) {
    container.innerHTML = '<p class="text-gray-400">Nenhum item no pedido.</p>';
  }

  itens.forEach(item => {
    total += item.preco * item.quantidade;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center bg-[var(--vermelho-telha)] rounded p-2 shadow-md';

    const texto = document.createElement('span');
    texto.textContent = `${item.quantidade} x ${item.nome} = R$ ${(item.preco * item.quantidade).toFixed(2)}`;
    texto.className = 'font-semibold';

    const controles = document.createElement('div');
    controles.className = 'space-x-2';

    const btnMinus = document.createElement('button');
    btnMinus.textContent = '-';
    btnMinus.className = 'bg-yellow-300 text-black px-2 rounded hover:bg-yellow-400';
    btnMinus.onclick = () => changeQuantity(item.nome, -1);

    const btnPlus = document.createElement('button');
    btnPlus.textContent = '+';
    btnPlus.className = 'bg-yellow-300 text-black px-2 rounded hover:bg-yellow-400';
    btnPlus.onclick = () => changeQuantity(item.nome, +1);
    btnMinus.setAttribute('aria-label', `Diminuir quantidade de ${item.nome}`);

    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remover';
    btnRemove.className = 'bg-red-600 text-white px-3 rounded hover:bg-red-700';
    btnRemove.onclick = () => removeItem(item.nome);
    btnMinus.setAttribute('aria-label', `Diminuir quantidade de ${item.nome}`);

    controles.appendChild(btnMinus);
    controles.appendChild(btnPlus);
    controles.appendChild(btnRemove);

    itemDiv.appendChild(texto);
    itemDiv.appendChild(controles);

    container.appendChild(itemDiv);
  });

  document.getElementById('total').textContent = total.toFixed(2);
}

/**############################
 * Altera quantidade do item
 #################################*/
function changeQuantity(nome, delta) {
  const index = itens.findIndex(item => item.nome === nome);

  if (index !== -1) {
    itens[index].quantidade += delta;
    if (itens[index].quantidade <= 0) {
      itens.splice(index, 1);
    }
    renderOrder();
  }
}

/**###########################
 * Remove item do pedido
################################ */
function removeItem(nome) {
  itens = itens.filter(item => item.nome !== nome);
  renderOrder();
}


/**########################
 * Envia pedido via WhatsApp
 #############################*/
function enviarWhatsApp() {
  if (itens.length === 0) {
    alert('Por favor, adicione pelo menos um item ao pedido antes de enviar.');
    return;
  }

  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const formaPagamento = document.getElementById('formaPagamento').value;
  const obs = document.getElementById('obs').value.trim();

  if (!nome || !cpf || !telefone || !endereco || !formaPagamento) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = agora.getFullYear();
  const hora = String(agora.getHours()).padStart(2, '0');
  const minuto = String(agora.getMinutes()).padStart(2, '0');

  const dataFormatada = `${dia}/${mes}/${ano}`;
  const horaFormatada = `${hora}:${minuto}`;

  // Monta o array dos itens para o JSON
  const itensParaJSON = itens.map(item => [item.nome.toLowerCase(), item.quantidade, item.preco]);

  // Calcula o total
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  // Monta o JSON para colocar escondido na mensagem
  const jsonVenda = {
    d: dataFormatada,
    h: horaFormatada,
    n: nome,
    t: telefone,
    fp: formaPagamento,
    it: itensParaJSON,
    tt: Number(total.toFixed(2)),
  };

  // Monta a mensagem normal para WhatsApp
  let mensagem = `*Pedido do LancheBar*\n${dataFormatada} ${horaFormatada}\n\n*Cliente:*\nNome: ${nome}\nCPF: ${cpf}\nTelefone: ${telefone}\nEndereço: ${endereco}\nForma de pagamento: ${formaPagamento}\n\n*Itens do Pedido:*\n`;

  itens.forEach(item => {
    mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
  });

  mensagem += `\n*Observações:*\n${obs || 'Nenhuma'}\n`;

  mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n\n`;

  // Adiciona o JSON escondido entre <!--DP> e -->
  mensagem += `<!--DP>${JSON.stringify(jsonVenda)}-->`;

  const mensagemEncoded = encodeURIComponent(mensagem);
  const whatsappNumber = '5591992420981';

  const url = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;
  window.open(url, '_blank');
}

/**#################################
 * Renderiza os produtos no menu
 #################################*/
function renderizarProdutos(containerId, categoria = 'todos') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.categoria === categoria) {
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
    }
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
  renderizarProdutos('menu-items');
  renderOrder();

  // Filtro de categoria
  document.getElementById('filtroMenu').addEventListener('change', function () {
    const categoriaSelecionada = this.value;
    renderizarProdutos('menu-items', categoriaSelecionada);
  });
});















