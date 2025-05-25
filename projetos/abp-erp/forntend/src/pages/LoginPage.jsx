import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");   // Armazena o valor do input usuário
  const [password, setPassword] = useState("");   // Armazena o valor do input senha

  const handleLogin = async () => {
    try {
      // Faz requisição POST para o backend enviando usuário e senha
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        username,
        password,
      });

      // Salva o token JWT no localStorage
      localStorage.setItem("token", response.data.token);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login no ERP</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}  // Atualiza estado username
      /><br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  // Atualiza estado password
      /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
