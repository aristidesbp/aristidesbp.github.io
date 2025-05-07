let tamanhoFonte = 14;

// Função para carregar o conteúdo de um arquivo selecionado
function carregarArquivoSelecionado() {
  const arquivo = document.getElementById('seletor-arquivo').value;

  fetch(arquivo)
    .then(response => response.text())
    .then(data => {
      document.getElementById('editor').value = data;
    })
    .catch(error => {
      document.getElementById('editor').value = 'Erro ao carregar o arquivo: ' + error;
    });
}

// Carrega inicialmente o termux.txt
carregarArquivoSelecionado();

// Aumentar fonte
function aumentarFonte() {
  if (tamanhoFonte < 40) {
    tamanhoFonte += 2;
    document.getElementById('editor').style.fontSize = tamanhoFonte + 'px';
  }
}

// Diminuir fonte
function diminuirFonte() {
  if (tamanhoFonte > 8) {
    tamanhoFonte -= 2;
    document.getElementById('editor').style.fontSize = tamanhoFonte + 'px';
  }
}

// Baixar conteúdo
function baixarArquivo() {
  const texto = document.getElementById('editor').value;
  const blob = new Blob([texto], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'conteudo.txt';
  link.click();
  URL.revokeObjectURL(url);
}







function carregarArquivoLocal() {
  const input = document.getElementById('input-arquivo');
  const editor = document.getElementById('editor');

  if (input.files.length === 0) {
    alert("Nenhum arquivo selecionado.");
    return;
  }

  const arquivo = input.files[0];
  const leitor = new FileReader();

  leitor.onload = function (e) {
    editor.value = e.target.result;
  };

  leitor.readAsText(arquivo);
}