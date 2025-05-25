const jwt = require("jsonwebtoken");          // Biblioteca para gerar tokens JWT
require("dotenv").config();                   // Carrega variáveis do .env

// Classe responsável por lidar com a autenticação
class AuthController {
  // Função de login que retorna um token se os dados forem válidos
  static login(req, res) {
    const { username, password } = req.body;      // Captura dados enviados do frontend

    // Simulação de usuário fixo (você pode substituir por banco depois)
    if (username === "admin" && password === "123456") {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",                           // Token expira em 1 hora
      });
      return res.json({ token });                  // Retorna o token ao frontend
    }

    return res.status(401).json({ message: "Credenciais inválidas" });
  }
}

module.exports = AuthController;
