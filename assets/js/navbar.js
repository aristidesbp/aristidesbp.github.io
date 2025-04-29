document.write(`
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
    }
    .navbar {
      background-color: #02133e;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
    }
    .navbar-left {
      display: flex;
      align-items: center;
    }
    #menu {
      margin-left: 20px;
      padding: 5px;
      font-size: 16px;
    }
  </style>

  <div class="navbar">
    <div class="navbar-left">
      <label for="menu">Escolha um link:</label>
      <select id="menu" onchange="irParaLink(this)">
        <option value="">-- Selecione --</option>
        <option value="#sobre">Sobre</option>
        <option value="#contato">Contato</option>
        <option value="home.html">Página Externa</option>
      </select>
    </div>
  </div>

  <script>
    function irParaLink(select) {
      const url = select.value.trim();
      if (url.startsWith("#")) {
        window.location.hash = url; // rola para seção interna
      } else if (url !== "") {
        window.open(url, '_blank'); // abre link externo
      }
    }
  </script>
`);
