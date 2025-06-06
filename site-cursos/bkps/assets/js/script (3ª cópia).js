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


//buscador
let ocorrencias = [];
let indiceAtual = 0;

function buscarPalavra() {
  const texto = document.getElementById("editor").value;
  const termo = document.getElementById("palavraBusca").value;

  ocorrencias = [];
  indiceAtual = 0;

  if (!termo) {
    document.getElementById("contador").textContent = "";
    return;
  }

  const regex = new RegExp(termo, "gi");
  let match;
  while ((match = regex.exec(texto)) !== null) {
    ocorrencias.push(match.index);
  }

  atualizarContador();
  destacarOcorrencia();
}

function atualizarContador() {
  const contador = document.getElementById("contador");
  if (ocorrencias.length > 0) {
    contador.textContent = `${indiceAtual + 1} de ${ocorrencias.length}`;
  } else {
    contador.textContent = "0 encontrada";
  }
}

function navegarOcorrencia(direcao) {
  if (ocorrencias.length === 0) return;

  indiceAtual += direcao;

  if (indiceAtual < 0) indiceAtual = ocorrencias.length - 1;
  if (indiceAtual >= ocorrencias.length) indiceAtual = 0;

  destacarOcorrencia();
  atualizarContador();
}

function destacarOcorrencia() {
  const textarea = document.getElementById("editor");
  const index = ocorrencias[indiceAtual];
  const termo = document.getElementById("palavraBusca").value;

  textarea.focus();
  textarea.setSelectionRange(index, index + termo.length);
}

function substituirTudo() {
  const termo = document.getElementById("palavraBusca").value;
  const substituto = document.getElementById("palavraSubstituir").value;

  if (!termo) return;

  const texto = document.getElementById("editor").value;
  const regex = new RegExp(termo, "gi");
  const novoTexto = texto.replace(regex, substituto);

  document.getElementById("editor").value = novoTexto;
  buscarPalavra(); // Atualiza resultado
}
