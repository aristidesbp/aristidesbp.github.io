const produtos = [
  { nome: "Produto 1 - Serviço Premium", preco: 199.90 },
  { nome: "Produto 2 - Consultoria Especializada", preco: 249.90 },
  { nome: "Produto 3 - Gestão de Tráfego", preco: 299.90 },
];

const form = document.getElementById('briefingForm');
const checkboxes = [
  form.querySelector('input[name="produto1_ativo"]'),
  form.querySelector('input[name="produto2_ativo"]'),
  form.querySelector('input[name="produto3_ativo"]'),
];
const qtdInputs = [
  form.querySelector('input[name="produto1_qtd"]'),
  form.querySelector('input[name="produto2_qtd"]'),
  form.querySelector('input[name="produto3_qtd"]'),
];
const totalSpan = document.getElementById('totalValor');

function atualizarEstadoQtd() {
  checkboxes.forEach((cb, i) => {
    qtdInputs[i].disabled = !cb.checked;
    if (!cb.checked) qtdInputs[i].value = 1;
  });
}

function calcularTotal() {
  let total = 0;
  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      const qtd = parseInt(qtdInputs[i].value) || 1;
      total += produtos[i].preco * qtd;
    }
  });
  totalSpan.textContent = total.toFixed(2).replace('.', ',');
}

checkboxes.forEach(cb => cb.addEventListener('change', () => {
  atualizarEstadoQtd();
  calcularTotal();
}));

qtdInputs.forEach(input => input.addEventListener('input', calcularTotal));

// Inicializa estados e total
atualizarEstadoQtd();
calcularTotal();

function setColor(cor) {
  document.getElementById('paleta').value = cor;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(form);
  const entries = Array.from(data.entries());

  // Produtos selecionados
  const produtosSelecionados = produtos.map((p, i) => {
    if (checkboxes[i].checked) {
      const qtd = qtdInputs[i].value || 1;
      const subtotal = produtos[i].preco * qtd;
      return `${qtd}x ${p.nome} - R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }
    return null;
  }).filter(Boolean);

  let message = entries.map(([key, value]) => {
    if (key.endsWith('_ativo') || key.endsWith('_qtd') || key === 'paleta') return null;
    return `*${key.toUpperCase()}*:\n${value.trim()}\n`;
  }).filter(Boolean).join('\n');

  if (produtosSelecionados.length) {
    message += '\n*PRODUTOS SELECIONADOS:*\n' + produtosSelecionados.join('\n');
  }

  const total = produtosSelecionados.length ? totalSpan.textContent : '0,00';
  message += `\n*TOTAL DA COMPRA:* R$ ${total}`;

  const phone = '5591992420981';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent("🚀 Briefing para Criação de Site + Compra\n\n" + message)}`;

  window.open(url, '_blank');
});