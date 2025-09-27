/*
DOCUMENTAÇÃO:
Este arquivo contém a lógica para o gerenciamento do pedido,
incluindo adição, remoção, alteração de quantidade e envio do pedido via WhatsApp.
*/

// Array que armazena os itens do pedido atual
let itens = [];

/**
 * Adiciona um item ao pedido.
 * Se o item já existir, incrementa a quantidade em 1.
 * @param {string} nome - Nome do produto
 * @param {number} preco - Preço do produto
 */
function addToOrder(nome, preco) {
  // Procura se o item já existe no array 'itens'
  const index = itens.findIndex(item => item.nome === nome);

  if (index !== -1) {
    // Se existir, aumenta a quantidade em 1
    itens[index].quantidade++;
  } else {
    // Se não existir, adiciona o item com quantidade 1
    itens.push({ nome, preco, quantidade: 1 });
  }

  // Atualiza a lista visual na tela
  renderOrder();
}

/**
 * Função que altera temporariamente o estilo do botão para indicar sucesso na adição
 * @param {HTMLElement} botao - O botão clicado
 */
function indicarSucesso(botao) {
  botao.classList.add('botao-sucesso');     // Aplica a classe de sucesso (cor verde)
  botao.classList.remove('botao-adicionar'); // Remove a classe padrão

  // Após 2 segundos, volta ao estilo original
  setTimeout(() => {
    botao.classList.remove('botao-sucesso');
    botao.classList.add('botao-adicionar');
  }, 2000);
}

/**
 * Renderiza a lista de itens do pedido no container HTML e atualiza o total
 */
function renderOrder() {
  // Pega o container onde a lista vai aparecer
  const container = document.getElementById('itens-pedido');
  container.innerHTML = ''; // Limpa a lista antes de renderizar

  let total = 0; // Variável para calcular o total do pedido

  // Se não houver itens, mostra mensagem amigável
  if (itens.length === 0) {
    container.innerHTML = '<p class="text-gray-400">Nenhum item no pedido.</p>';
  }

  // Para cada item do pedido, cria elementos HTML para exibir na tela
  itens.forEach(item => {
    total += item.preco * item.quantidade; // Soma ao total o preço x quantidade

    // Cria a div principal do item
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center bg-[var(--vermelho-telha)] rounded p-2 shadow-md';

    // Cria o texto do item: "2 x Produto = R$ 30,00"
    const texto = document.createElement('span');
    texto.textContent = `${item.quantidade} x ${item.nome} = R$ ${(item.preco * item.quantidade).toFixed(2)}`;
    texto.className = 'font-semibold';

    // Container para os botões de controle
    const controles = document.createElement('div');
    controles.className = 'space-x-2';

    // Botão para diminuir quantidade
    const btnMinus = document.createElement('button');
    btnMinus.textContent = '-';
    btnMinus.className = 'bg-yellow-300 text-black px-2 rounded hover:bg-yellow-400';
    btnMinus.onclick = () => changeQuantity(item.nome, -1);

    // Botão para aumentar quantidade
    const btnPlus = document.createElement('button');
    btnPlus.textContent = '+';
    btnPlus.className = 'bg-yellow-300 text-black px-2 rounded hover:bg-yellow-400';
    btnPlus.onclick = () => changeQuantity(item.nome, +1);

    // Botão para remover o item completamente
    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remover';
    btnRemove.className = 'bg-red-600 text-white px-3 rounded hover:bg-red-700';
    btnRemove.onclick = () => removeItem(item.nome);

    // Adiciona os botões ao container controles
    controles.appendChild(btnMinus);
    controles.appendChild(btnPlus);
    controles.appendChild(btnRemove);

    // Monta o item na tela, juntando texto e controles
    itemDiv.appendChild(texto);
    itemDiv.appendChild(controles);

    // Adiciona o item na lista do pedido (HTML)
    container.appendChild(itemDiv);
  });

  // Atualiza o campo que mostra o total do pedido, formatando com duas casas decimais
  document.getElementById('total').textContent = total.toFixed(2);
}

/**
 * Altera a quantidade de um item no pedido.
 * Se a quantidade chegar a zero, remove o item da lista.
 * @param {string} nome - Nome do produto
 * @param {number} delta - Valor para adicionar (positivo ou negativo)
 */
function changeQuantity(nome, delta) {
  // Busca o índice do item na lista pelo nome
  const index = itens.findIndex(item => item.nome === nome);

  if (index !== -1) {
    itens[index].quantidade += delta; // Atualiza a quantidade
    if (itens[index].quantidade <= 0) {
      itens.splice(index, 1); // Remove o item se a quantidade for zero ou menos
    }
    renderOrder(); // Atualiza a tela
  }
}

/**
 * Remove completamente um item do pedido pelo nome
 * @param {string} nome - Nome do produto
 */
function removeItem(nome) {
  // Filtra a lista removendo o item com o nome especificado
  itens = itens.filter(item => item.nome !== nome);
  renderOrder(); // Atualiza a tela
}

/**
 * Envia o pedido via WhatsApp, juntando os dados do cliente e itens do pedido em uma mensagem formatada
 */
function enviarWhatsApp() {
  // Validação: verifica se há itens no pedido
  if (itens.length === 0) {
    alert('Por favor, adicione pelo menos um item ao pedido antes de enviar.');
    return;
  }

  // Captura os dados do formulário
  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const formaPagamento = document.getElementById('formaPagamento').value;
  const obs = document.getElementById('obs').value.trim();

  // Validação: campos obrigatórios
  if (!nome || !cpf || !telefone || !endereco || !formaPagamento) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Monta a mensagem do pedido para o WhatsApp
  let mensagem = `*Pedido do LancheBar*\n\n*Cliente:*\nNome: ${nome}\nCPF: ${cpf}\nTelefone: ${telefone}\nEndereço: ${endereco}\nForma de pagamento: ${formaPagamento}\n\n*Itens do Pedido:*\n`;

  // Adiciona cada item formatado na mensagem
  itens.forEach(item => {
    mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
  });

  // Adiciona observações ou 'Nenhuma' se vazio
  mensagem += `\n*Observações:*\n${obs || 'Nenhuma'}\n`;

  // Calcula o total para exibir na mensagem
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  mensagem += `\n*Total:* R$ ${total.toFixed(2)}`;

  // Codifica a mensagem para ser usada na URL do WhatsApp
  const mensagemEncoded = encodeURIComponent(mensagem);

  // Número do WhatsApp do estabelecimento no formato internacional (exemplo do Brasil)
  const whatsappNumber = '5591992420981'; // Substitua pelo número real

  // Cria a URL para abrir o WhatsApp com a mensagem preenchida
  const url = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;

  // Abre o link em nova aba para enviar a mensagem
  window.open(url, '_blank');
}

// Inicializa a lista do pedido na tela ao carregar o script
renderOrder();

//#####################################################################
// Filtro de categoria
document.getElementById('filtroCategoria').addEventListener('change', function () {
  const categoriaSelecionada = this.value;
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach(produto => {
    const categoriaProduto = produto.getAttribute('data-categoria');
    if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaProduto) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
});



