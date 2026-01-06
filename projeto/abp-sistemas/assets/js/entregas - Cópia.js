// assets/js/entregas.js
function criarEntregas() {
  const nav = document.getElementById("componente-Entregas");
  if (!nav) return;
  nav.innerHTML = `
 <!-- ✅ insere o HTML do formulário e da lista -->


  <h2 class="text-2xl font-bold mb-4 text-center">Cadastro de Entrega</h2>
  <form id="formulario" class="space-y-4">
    <input type="hidden" id="indexEdicao" value="-1" />
    <div><label>Código da Venda</label><input id="codigo" required class="w-full border rounded px-3 py-2" /></div>
    <div><label>Nome do Cliente</label><input id="nome" required class="w-full border rounded px-3 py-2" /></div>
    <div><label>Endereço</label><input id="endereco" required class="w-full border rounded px-3 py-2" /></div>
    <div><label>Bairro</label><input id="bairro" required class="w-full border rounded px-3 py-2" /></div>
    <div><label>Valor (R$)</label><input id="valor" type="number" step="0.01" required class="w-full border rounded px-3 py-2" /></div>
    <div><label>Observação</label><textarea id="observacao" class="w-full border rounded px-3 py-2"></textarea></div>
    <div><label>Foto da Nota</label><input id="foto" type="file" accept="image/*" capture="environment" class="w-full" /></div>
    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Salvar</button>
  </form>

  <div class="max-w-xl mx-auto mt-6 bg-white shadow rounded-xl p-4">
    <h3 class="text-xl font-bold mb-3">Entregas</h3>
    <ul id="lista" class="space-y-3"></ul>
  </div>
  `;

  /* ✅ agora os elementos existem no DOM */
  const form = document.getElementById("formulario");
  const lista = document.getElementById("lista");
  const campos = ["codigo", "nome", "endereco", "bairro", "valor", "observacao"];

  function getEntregas() {
    return JSON.parse(localStorage.getItem("entregas") || "[]");
  }

  function salvarEntregas(dados) {
    localStorage.setItem("entregas", JSON.stringify(dados));
  }

  function renderizarLista() {
    const entregas = getEntregas();

    entregas.sort((a, b) => {
      const ba = a.bairro.toLowerCase(), bb = b.bairro.toLowerCase();
      if (ba < bb) return -1;
      if (ba > bb) return 1;
      return a.endereco.localeCompare(b.endereco);
    });

    lista.innerHTML = "";

    entregas.forEach((e, i) => {
      const enderecoCompleto = encodeURIComponent(`${e.endereco}, ${e.bairro}`);
      const status = e.status || "Pendente";
      const corStatus = {
        "Pendente": "bg-yellow-400",
        "Entregue": "bg-green-500",
        "Problema": "bg-red-500"
      }[status];

      const imgTag = e.foto ? `<img src="${e.foto}" class="mt-2 w-32 rounded border" />` : "";
      const obs = e.status === "Problema" && e.observacao ? `<p class="text-sm text-red-700">Obs: ${e.observacao}</p>` : "";

      const li = document.createElement("li");
      li.className = "p-3 border rounded bg-gray-50";
      li.innerHTML = `
        <div class="flex justify-between items-center">
          <div>
            <strong>${e.codigo}</strong> - ${e.nome}<br>
            ${e.endereco}, ${e.bairro} - R$ ${parseFloat(e.valor).toFixed(2)}
            ${obs}
            ${imgTag}
          </div>
          <div class="flex flex-col gap-1 text-right">
            <a href="https://www.google.com/maps/search/?api=1&query=${enderecoCompleto}" target="_blank"
               class="text-green-600 hover:underline">Ver no mapa</a>
            <button class="text-white text-xs px-2 py-1 rounded ${corStatus}" data-index="${i}" data-acao="status">${status}</button>
            <button class="text-blue-600 hover:underline text-sm" data-index="${i}" data-acao="editar">Editar</button>
            <button class="text-red-600 hover:underline text-sm" data-index="${i}" data-acao="excluir">Excluir</button>
          </div>
        </div>
      `;
      lista.appendChild(li);
    });
  }

  /* ✅ eventos delegados para a lista */
  lista.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const index = btn.dataset.index;
    const acao = btn.dataset.acao;

    if (acao === "status") trocarStatus(index);
    if (acao === "editar") editar(index);
    if (acao === "excluir") excluir(index);
  });

  function trocarStatus(index) {
    const entregas = getEntregas();
    const atual = entregas[index].status || "Pendente";
    const proximo = atual === "Pendente" ? "Entregue" : atual === "Entregue" ? "Problema" : "Pendente";
    entregas[index].status = proximo;
    salvarEntregas(entregas);
    renderizarLista();
  }

  function editar(index) {
    const e = getEntregas()[index];
    campos.forEach(c => document.getElementById(c).value = e[c] || "");
    document.getElementById("indexEdicao").value = index;
  }

  function excluir(index) {
    const entregas = getEntregas();
    entregas.splice(index, 1);
    salvarEntregas(entregas);
    renderizarLista();
  }

  /* ✅ evento do formulário */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const entregas = getEntregas();
    const novo = {};
    campos.forEach(c => novo[c] = document.getElementById(c).value);
    novo.status = novo.status || "Pendente";

    const fotoInput = document.getElementById("foto");
    if (fotoInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        novo.foto = event.target.result;
        salvarDados(novo);
      };
      reader.readAsDataURL(fotoInput.files[0]);
    } else {
      salvarDados(novo);
    }

    function salvarDados(novo) {
      const idx = parseInt(document.getElementById("indexEdicao").value);
      if (idx >= 0) {
        entregas[idx] = novo;
        document.getElementById("indexEdicao").value = -1;
      } else {
        entregas.push(novo);
      }
      salvarEntregas(entregas);
      form.reset();
      renderizarLista();
    }
  });

  /* ✅ render inicial */
  renderizarLista();
}

/* chamada para montar o componente */
criarEntregas();