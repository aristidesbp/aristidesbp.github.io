
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
      let entregas = getEntregas();

      // Ordenação
      entregas.sort((a, b) => {
        const ba = a.bairro.toLowerCase(), bb = b.bairro.toLowerCase();
        if (ba < bb) return -1;
        if (ba > bb) return 1;
        const ea = a.endereco.toLowerCase(), eb = b.endereco.toLowerCase();
        return ea.localeCompare(eb);
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
              <button onclick="trocarStatus(${i})" class="text-white text-xs px-2 py-1 rounded ${corStatus}">${status}</button>
              <button onclick="editar(${i})" class="text-blue-600 hover:underline text-sm">Editar</button>
              <button onclick="excluir(${i})" class="text-red-600 hover:underline text-sm">Excluir</button>
            </div>
          </div>
        `;
        lista.appendChild(li);
      });
    }

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

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const entregas = getEntregas();
      const novo = {};
      campos.forEach(c => novo[c] = document.getElementById(c).value);
      novo.status = novo.status || "Pendente";

      const fotoInput = document.getElementById("foto");
      if (fotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
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

    renderizarLista();
  