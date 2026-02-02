// ======== BAIRROS ========
const formBairro = document.getElementById("formBairro");
const listaBairros = document.getElementById("listaBairros");
const funcionarioSelect = document.getElementById("funcionarioSelect");
const camposBairro = ["funcionario","cidade","bairroNome","valor"];

function getBairros(){ return JSON.parse(localStorage.getItem("bairros")||"[]"); }
function salvarBairros(dados){ localStorage.setItem("bairros",JSON.stringify(dados)); }

function renderizarListaBairros(){
  const filtro = document.getElementById("pesquisaBairro").value.toLowerCase();
  listaBairros.innerHTML="";
  getBairros().forEach((b,i)=>{
    if(b.bairroNome.toLowerCase().includes(filtro) || b.cidade.toLowerCase().includes(filtro)){
      const li=document.createElement("li");
      li.className="p-3 border rounded bg-gray-50 flex justify-between items-center";
      li.innerHTML=`<div>
        <strong>${b.bairroNome}</strong><br>${b.cidade}<br>
        <span class="text-sm text-gray-500">Funcionário: ${b.funcionario}</span><br>
        <span class="text-sm text-gray-500">Valor: R$ ${parseFloat(b.valor).toFixed(2)}</span>
      </div>
      <div class="flex flex-col gap-1 text-right">
        <button onclick="editarBairro(${i})" class="text-blue-600 hover:underline text-sm">Editar</button>
        <button onclick="excluirBairro(${i})" class="text-red-600 hover:underline text-sm">Excluir</button>
      </div>`;
      listaBairros.appendChild(li);
    }
  });
}

// Preencher select de funcionários
function atualizarFuncionarioSelect(){
  funcionarioSelect.innerHTML="";
  const funcs = JSON.parse(localStorage.getItem("funcionarios")||"[]");
  if(funcs.length===0){
    const option = document.createElement("option");
    option.value="";
    option.textContent="Nenhum funcionário cadastrado";
    funcionarioSelect.appendChild(option);
  } else {
    funcs.forEach(f=>{
      const option = document.createElement("option");
      option.value = f.nome;
      option.textContent = f.nome;
      funcionarioSelect.appendChild(option);
    });
  }
}

function editarBairro(index){
  const b = getBairros()[index];
  camposBairro.forEach(c=>document.getElementById(c).value=b[c]||"");
  document.getElementById("indexEdicaoBairro").value=index;
}

function excluirBairro(index){
  if(!confirm("Deseja excluir este bairro?")) return;
  const dados = getBairros();
  dados.splice(index,1);
  salvarBairros(dados);
  renderizarListaBairros();
}

formBairro.addEventListener("submit", e=>{
  e.preventDefault();
  const dados = getBairros();
  const novo = {};
  camposBairro.forEach(c=>novo[c]=document.getElementById(c).value);
  if(!novo.funcionario){ alert("Selecione um funcionário."); return; }
  const idx = parseInt(document.getElementById("indexEdicaoBairro").value);
  if(idx>=0){ dados[idx]=novo; document.getElementById("indexEdicaoBairro").value=-1; }
  else { dados.push(novo); }
  salvarBairros(dados);
  formBairro.reset();
  renderizarListaBairros();
});

document.getElementById("pesquisaBairro").addEventListener("input", renderizarListaBairros);

// Atualizar select sempre que abrir o formulário
document.getElementById("btnAddBairro").addEventListener("click", atualizarFuncionarioSelect);

// Inicializar lista
renderizarListaBairros();