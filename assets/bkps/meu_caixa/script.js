/* BLOCO 3 de 3 — script.js */

/* =====================================
   CONFIGURAÇÃO DO BANCO DE DADOS
===================================== */
let db;
const dbName = "FluxoCaixaDB";
const dbVersion = 1; // Começamos na versão 1

function abrirBanco() {
  const request = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = function(event) {
    db = event.target.result;

    if (db.objectStoreNames.contains("transacoes")) {
      db.deleteObjectStore("transacoes");
    }

    const store = db.createObjectStore("transacoes", { keyPath: "id", autoIncrement: true });
    store.createIndex("tipo", "tipo", { unique: false });
    store.createIndex("categoria", "categoria", { unique: false });
    store.createIndex("banco", "banco", { unique: false });
    console.log("Banco criado ou atualizado com sucesso!");
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    listarTransacoes();
  };

  request.onerror = function(event) {
    console.error("Erro ao abrir o banco:", event.target.errorCode);
  };
}

window.onload = function() {
  abrirBanco();
  document.getElementById("transacaoForm").onsubmit = salvarTransacao;
};

/* =====================================
   SALVAR TRANSACAO
===================================== */
const form = document.getElementById("transacaoForm");

function salvarTransacao(e) {
  e.preventDefault();

  const data = document.getElementById("data").value;
  const tipo = document.getElementById("tipo").value;
  const categoria = document.getElementById("categoria").value;
  const banco = document.getElementById("banco").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const descricao = document.getElementById("descricao").value;
  const fotoBoletoInput = document.getElementById("fotoBoleto");
  const fotoComprovanteInput = document.getElementById("fotoComprovante");

  const novaTransacao = {
    data,
    tipo,
    categoria,
    banco,
    valor,
    descricao,
    fotoBoleto: "",
    fotoComprovante: ""
  };

  function salvarNoBanco(transacao) {
    const transaction = db.transaction(["transacoes"], "readwrite");
    const store = transaction.objectStore("transacoes");
    const request = store.add(transacao);

    request.onsuccess = function() {
      alert("Transação cadastrada com sucesso!");
      form.reset();
      listarTransacoes();
    };

    request.onerror = function(event) {
      console.error("Erro ao salvar a transação:", event.target.error);
      alert("Erro ao salvar. Verifique o console.");
    };
  }

  // Processar fotos
  if (fotoBoletoInput.files.length > 0) {
    const readerBoleto = new FileReader();
    readerBoleto.onload = function(event) {
      novaTransacao.fotoBoleto = event.target.result;

      if (fotoComprovanteInput.files.length > 0) {
        const readerComprovante = new FileReader();
        readerComprovante.onload = function(ev) {
          novaTransacao.fotoComprovante = ev.target.result;
          salvarNoBanco(novaTransacao);
        };
        readerComprovante.readAsDataURL(fotoComprovanteInput.files[0]);
      } else {
        salvarNoBanco(novaTransacao);
      }
    };
    readerBoleto.readAsDataURL(fotoBoletoInput.files[0]);
  } else if (foto