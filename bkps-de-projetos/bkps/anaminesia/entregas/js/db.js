// ======================
// FUNÇÕES DE BANCO DE DADOS
// ======================

// Exportar banco de dados
function exportarBanco() {
  const data = {
    funcionarios: JSON.parse(localStorage.getItem("funcionarios") || "[]"),
    bairros: JSON.parse(localStorage.getItem("cidadesBairros") || "[]"),
    entregas: JSON.parse(localStorage.getItem("entregas") || "[]")
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "banco_de_dados.json";
  a.click();
  URL.revokeObjectURL(url);
  alert("Exportação concluída!");
}

// Importar banco de dados
function importarBanco() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.funcionarios) localStorage.setItem("funcionarios", JSON.stringify(data.funcionarios));
        if (data.bairros) localStorage.setItem("cidadesBairros", JSON.stringify(data.bairros));
        if (data.entregas) localStorage.setItem("entregas", JSON.stringify(data.entregas));
        alert("Importação concluída com sucesso!");
        location.reload(); // Atualiza as listas da página
      } catch (err) {
        alert("Erro ao importar o arquivo: " + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// Excluir banco de dados
function excluirBanco() {
  if (!confirm("Tem certeza que deseja excluir todo o banco de dados? Esta ação não pode ser desfeita!")) return;
  localStorage.removeItem("funcionarios");
  localStorage.removeItem("cidadesBairros");
  localStorage.removeItem("entregas");
  alert("Banco de dados excluído com sucesso!");
  location.reload();
}

// ======================
// ADICIONAR EVENTOS AOS BOTÕES
// ======================
document.getElementById("btnExportarDB").addEventListener("click", exportarBanco);
document.getElementById("btnImportarDB").addEventListener("click", importarBanco);
document.getElementById("btnExcluirDB").addEventListener("click", excluirBanco);
