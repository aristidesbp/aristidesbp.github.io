const express = require("express");
const router = express.Router();

// Importa o controller de autenticação
const AuthController = require("../controllers/AuthController");

// Rota de login
router.post("/login", AuthController.login);

module.exports = router;
