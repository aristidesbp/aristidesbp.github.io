// ======== ENTREGAS ========
const formEntrega=document.getElementById("formEntrega");
const listaEntrega=document.getElementById("listaEntrega");
const camposEntrega=["codigo","cliente","enderecoEntrega","bairroEntrega","valorEntrega","observacaoEntrega","fotoEntrega"];

function getEntregas(){ return JSON.parse(localStorage.getItem("entregas")||"[]"); }
function salvarEntregas(dados){ localStorage.setItem("entregas",JSON.stringify(dados)); }

function renderizarListaEntrega(){
  const filtro=document.getElementById("pesquisaEntrega").value.toLowerCase();
  listaEntrega.innerHTML="";
  getEntregas().forEach((e,i)=>{
    if(e.cliente.toLowerCase().includes(filtro)){
      const enderecoCompleto=encodeURIComponent(`${e.enderecoEntrega}, ${e.bairroEntrega}`);
      const status=e.status||"Pendente";
      const corStatus={"Pendente":"bg-yellow-400","Entregue":"bg-green-500","Problema":"bg-red-500"}[status];
      const imgTag=e.fotoEntrega?`<img src="${e.fotoEntrega}" class="mt-2 w-32 rounded border"/>`:"";
      const obs=e.status==="Problema"&&e.observacaoEntrega?`<p class="text-sm text-red-700">Obs: ${e.observacaoEntrega}</p>`:"";
      const li=document.createElement("li");
      li.className="p-3 border rounded bg-gray-50 flex justify-between items-center";
      li.innerHTML=`<div>
        <strong>${e.codigo}</strong> - ${e.cliente}<br>
        ${e.enderecoEntrega}, ${e.bairroEntrega} - R$ ${parseFloat(e.valorEntrega).toFixed(2)}
        ${obs}
        ${imgTag}
      </div>
      <div class="flex flex-col gap-1 text-right">
        <a href="https://www.google.com/maps/search/?api=1&query=${enderecoCompleto}" target="_blank"
           class="text-green-600 hover:underline">Ver no mapa</a>
        <button onclick="trocarStatus(${i})" class="text-white text-xs px-2 py-1 rounded ${corStatus}">${status}</button>
        <button onclick="editarEntrega(${i})" class="text-blue-600 hover:underline text-sm">Editar</button>
        <button onclick="excluirEntrega(${i})" class="text-red-600 hover:underline text-sm">Excluir</button>
      </div>`;
      listaEntrega.appendChild(li);
    }
  });
}

function trocarStatus(index){
  const dados=getEntregas();
  const atual=dados[index].status||"Pendente";
  const proximo=atual==="Pendente"?"Entregue":atual==="Entregue"?"Problema":"Pendente";
  dados[index].status=proximo;
  salvarEntregas(dados);
  renderizarListaEntrega();
}

function editarEntrega(index){
  const e=getEntregas()[index];
  camposEntrega.forEach(c=>document.getElementById(c).value=e[c]||"");
  document.getElementById("indexEdicaoEntrega").value=index;
}

function excluirEntrega(index){
  if(!confirm("Deseja excluir esta entrega?"))return;
  const dados=getEntregas();
  dados.splice(index,1);
  salvarEntregas(dados);
  renderizarListaEntrega();
}

formEntrega.addEventListener("submit", e=>{
  e.preventDefault();
  const dados=getEntregas();
  const novo={};
  camposEntrega.forEach(c=>novo[c]=document.getElementById(c).value);
  novo.status=novo.status||"Pendente";
  const fotoInput=document.getElementById("fotoEntrega");
  if(fotoInput.files.length>0){
    const reader=new FileReader();
    reader.onload=function(event){novo.fotoEntrega=event.target.result; salvarEntrega(novo);}
    reader.readAsDataURL(fotoInput.files[0]);
  } else { salvarEntrega(novo); }

  function salvarEntrega(novo){
    const idx=parseInt(document.getElementById("indexEdicaoEntrega").value);
    if(idx>=0){dados[idx]=novo; document.getElementById("indexEdicaoEntrega").value=-1;}
    else{dados.push(novo);}
    salvarEntregas(dados);
    formEntrega.reset();
    renderizarListaEntrega();
  }
});

document.getElementById("pesquisaEntrega").addEventListener("input", renderizarListaEntrega);
