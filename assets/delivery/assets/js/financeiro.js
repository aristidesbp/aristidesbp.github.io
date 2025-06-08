document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, script iniciando...');

  const inputVendas = document.getElementById('input-vendas');
  const botaoAdicionar = document.getElementById('botao-adicionar');
  const listaVendas = document.getElementById('lista-vendas');
  const totalVendasElem = document.getElementById('total-vendas');
  const valorCaixaElem = document.getElementById('valor-caixa');
  const produtosMaisVendidosElem = document.getElementById('produtos-mais-vendidos');

  if (!inputVendas || !botaoAdicionar || !listaVendas || !totalVendasElem || !valorCaixaElem || !produtosMaisVendidosElem) {
    console.error('Erro: algum elemento HTML não foi encontrado!');
    return;
  }

  let vendas = [];

  function extrairPedidosDoTexto(texto) {
    const regex = /<!--DP>(.*?)-->/gs;
    let pedidos = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
      try {
        const venda = JSON.parse(match[1]);
        pedidos.push(venda);
      } catch (e) {
        console.warn('JSON inválido ignorado:', match[1], e);
      }
    }
    return pedidos;
  }

  function vendaJaExiste(venda) {
    return vendas.some(v =>
      v.d === venda.d &&
      v.h === venda.h &&
      v.n.toLowerCase() === venda.n.toLowerCase() &&
      Math.abs(v.tt - venda.tt) < 0.01
    );
  }

  function validarVenda(venda) {
    if (!venda.d || !venda.h || !venda.n || !venda.it || !Array.isArray(venda.it) || venda.it.length === 0 || !venda.tt) {
      return false;
    }
    const somaItens = venda.it.reduce((acc, item) => {
      const [nome, qtd, preco] = item;
      return acc + (qtd * preco);
    }, 0);
    if (Math.abs(somaItens - venda.tt) > 0.1) {
      console.warn('Total da venda não confere com soma dos itens:', venda);
      return false;
    }
    return true;
  }

  function adicionarVendaNaLista(venda) {
    const li = document.createElement('li');
    li.textContent = `${venda.d} ${venda.h} - ${venda.n} - Total: R$ ${venda.tt.toFixed(2)}`;
    listaVendas.appendChild(li);
  }

  function atualizarControleVendas() {
    totalVendasElem.textContent = vendas.length;

    const valorTotal = vendas.reduce((acc, venda) => acc + venda.tt, 0);
    valorCaixaElem.textContent = valorTotal.toFixed(2);

    const produtosMap = new Map();

    vendas.forEach(venda => {
      venda.it.forEach(([nome, qtd]) => {
        const nomeLower = nome.toLowerCase();
        produtosMap.set(nomeLower, (produtosMap.get(nomeLower) || 0) + qtd);
      });
    });

    produtosMaisVendidosElem.innerHTML = '';
    [...produtosMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .forEach(([nome, qtd]) => {
        const li = document.createElement('li');
        li.textContent = `${nome} - ${qtd} unidade(s)`;
        produtosMaisVendidosElem.appendChild(li);
      });
  }

  function adicionarVendasDoTexto(texto) {
    const novasVendas = extrairPedidosDoTexto(texto);
    let countAdicionadas = 0;

    novasVendas.forEach(venda => {
      if (!vendaJaExiste(venda) && validarVenda(venda)) {
        vendas.push(venda);
        adicionarVendaNaLista(venda);
        countAdicionadas++;
      } else {
        console.log('Venda ignorada (duplicada ou inválida):', venda);
      }
    });

    if (countAdicionadas > 0) {
      atualizarControleVendas();
    }

    alert(`${countAdicionadas} venda(s) adicionada(s).`);
  }

  botaoAdicionar.addEventListener('click', () => {
    const texto = inputVendas.value.trim();
    if (texto.length === 0) {
      alert('Por favor, cole as mensagens de vendas no campo.');
      return;
    }
    adicionarVendasDoTexto(texto);
    inputVendas.value = '';
  });

  console.log('Setup do script concluído');
});

// Salva as vendas no localStorage
function salvarVendasNoStorage() {
  localStorage.setItem('vendasFinanceiro', JSON.stringify(vendas));
}

// Carrega as vendas do localStorage
function carregarVendasDoStorage() {
  const data = localStorage.getItem('vendasFinanceiro');
  if (data) {
    try {
      vendas = JSON.parse(data);
      atualizarInterface();
    } catch (e) {
      console.error('Erro ao carregar vendas do storage:', e);
    }
  }
}




function exportarVendasParaCSV() {
  if (vendas.length === 0) {
    alert('Nenhuma venda para exportar.');
    return;
  }

  const header = ['Data', 'Hora', 'Cliente', 'Telefone', 'Forma de Pagamento', 'Total', 'Itens'];
  const rows = vendas.map(venda => {
    const itensTexto = venda.itens.map(item => `${item.nome} (x${item.quantidade}) - R$ ${item.preco.toFixed(2)}`).join('; ');
    return [
      venda.data,
      venda.hora,
      venda.nome,
      venda.telefone,
      venda.formaPagamento,
      venda.total.toFixed(2),
      `"${itensTexto}"`
    ];
  });

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += header.join(',') + '\n';
  rows.forEach(row => {
    csvContent += row.join(',') + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'vendas.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


let graficoProdutos;

function atualizarGraficoProdutos() {
  const contagem = {};
  vendas.forEach(venda => {
    venda.itens.forEach(item => {
      if (!contagem[item.nome]) {
        contagem[item.nome] = 0;
      }
      contagem[item.nome] += item.quantidade;
    });
  atualizarGraficoProdutos();
});

  const labels = Object.keys(contagem);
  const data = Object.values(contagem);

  if (graficoProdutos) {
    graficoProdutos.destroy();
  }

  const ctx = document.getElementById('grafico-produtos').getContext('2d');
  graficoProdutos = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Quantidade vendida',
        data: data,
        backgroundColor: 'rgba(241, 196, 15, 0.8)',
        borderColor: 'rgba(241, 196, 15, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function filtrarVendasPorPeriodo() {
  const dataInicial = document.getElementById('data-inicial').value;
  const dataFinal = document.getElementById('data-final').value;

  if (!dataInicial || !dataFinal) {
    alert('Selecione as duas datas para filtrar.');
    return;
  }

  const lista = document.getElementById('lista-vendas');
  lista.innerHTML = '';

  const vendasFiltradas = vendas.filter(venda => {
    const [dia, mes, ano] = venda.data.split('/');
    const dataVenda = new Date(`${ano}-${mes}-${dia}`);
    return dataVenda >= new Date(dataInicial) && dataVenda <= new Date(dataFinal);
  });

  vendasFiltradas.forEach(venda => {
    const li = document.createElement('li');
    li.textContent = `(${venda.data} ${venda.hora}) - ${venda.nome} - R$ ${venda.total.toFixed(2)}`;
    lista.appendChild(li);
  });

  alert(`Encontradas ${vendasFiltradas.length} vendas no período.`);
}
function exportarBackupJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vendas));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', 'vendas_backup.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importarBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        vendas = data;
        salvarVendasNoStorage();
        atualizarInterface();
        alert('Backup importado com sucesso!');
      } else {
        alert('Formato de backup inválido.');
      }
    } catch (err) {
      alert('Erro ao importar backup.');
    }
  };
  reader.readAsText(file);
}

