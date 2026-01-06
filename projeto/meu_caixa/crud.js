/* crud.js — Função para verificar/criar banco de dados IndexedDB */

/* =====================================
   CONFIGURAÇÃO DO BANCO
===================================== */
const dbName = "FluxoCaixaDB"; // Nome do banco
const dbVersion = 2;            // Sempre atualize a versão se mudar estrutura
let db;                         // Variável global para conexão

/**
 * Função: inicializarBanco
 * Verifica se o banco existe e cria se não existir.
 * Retorna uma Promise com a conexão do banco.
 */
function inicializarBanco() {
  return new Promise((resolve, reject) => {
    // Tenta abrir o banco
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
      db = event.target.result;

      // Se a store já existir, remove e recria para garantir estrutura atualizada
      if (db.objectStoreNames.contains("transacoes")) {
        db.deleteObjectStore("transacoes");
      }

      // Criação da store principal "transacoes"
      const store = db.createObjectStore("transacoes", { keyPath: "id", autoIncrement: true });
      store.createIndex("tipo", "tipo", { unique: false });
      store.createIndex("categoria", "categoria", { unique: false });
      store.createIndex("banco", "banco", { unique: false });

      console.log("Banco criado ou atualizado com sucesso!");
    };

    request.onsuccess = function(event) {
      db = event.target.result;
      console.log("Banco aberto com sucesso!");
      resolve(db);
    };

    request.onerror = function(event) {
      console.error("Erro ao abrir o banco:", event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}

/**
 * Função auxiliar: verificarBancoExistente
 * Verifica se o banco existe antes de inicializar.
 * Retorna uma Promise true/false
 */
function verificarBancoExistente() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = function(event) {
      const banco = event.target.result;
      banco.close();
      resolve(true); // Banco existe
    };

    request.onupgradeneeded = function() {
      // Banco não existia, será criado agora
      resolve(false);
    };

    request.onerror = function(event) {
      console.error("Erro ao verificar banco:", event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}

/* =====================================
   USO
===================================== */
async function iniciarSistema() {
  const existe = await verificarBancoExistente();
  if (!existe) {
    console.log("Banco não existe, criando um novo...");
  } else {
    console.log("Banco já existe.");
  }
  await inicializarBanco();
  // Aqui você pode chamar a função para listar transações ou iniciar UI
}

// Inicializa o banco ao carregar
window.onload = iniciarSistema;



function testeInserirTransacao() {
  const transaction = db.transaction(["transacoes"], "readwrite");
  const store = transaction.objectStore("transacoes");
  const novaTrans = {
    data: "2025-10-29",
    tipo: "Receber",
    categoria: "Vendas",
    banco: "Banco Teste",
    valor: 150.00,
    descricao: "Transação de teste",
    fotoBoleto: "",
    fotoComprovante: ""
  };
  store.add(novaTrans).onsuccess = function() {
    console.log("Transação de teste adicionada!");
  };
}