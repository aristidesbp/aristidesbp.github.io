// Importação das bibliotecas necessárias
const express = require("express");                // Framework para criar o servidor HTTP
const cors = require("cors");                      // Middleware para permitir acesso de outros domínios (CORS)
const dotenv = require("dotenv");                  // Carrega variáveis do arquivo .env

// Carregando as variáveis do .env
dotenv.config();                                   

const app = express();                              // Cria uma instância do Express
const port = process.env.PORT || 3001;              // Porta onde o servidor será executado

// Middleware para tratar JSON e CORS
app.use(cors());                                    // Libera acesso entre frontend e backend
app.use(express.json());                            // Permite interpretar JSON no corpo das requisições

// Importação da rota de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);                   // Prefixo para rotas de autenticação

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
