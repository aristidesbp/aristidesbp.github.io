// ======== FUNCIONÁRIOS ========
const formFunc = document.getElementById("formFunc");
const listaFunc = document.getElementById("listaFunc");
const camposFunc = ["nome","endereco","bairro","telefone","observacao","foto"];

function getFuncionarios(){ return JSON.parse(localStorage.getItem("funcionarios")||"[]"); }
function salvarFuncionarios(dados){ localStorage.setItem("funcionarios",JSON.stringify(dados)); }

function renderizarListaFunc(){
const filtro = document.getElementById("pesquisaFunc").value.toLowerCase();
listaFunc.innerHTML="";
getFuncionarios().forEach((f,i)=>{
if(f.nome.toLowerCase().includes(filtro)){
const li=document.createElement("li");
li.className="p-3 border rounded bg-gray-50 flex justify-between items-center";
li.innerHTML=<div> <strong>${f.nome}</strong><br>${f.endereco}, ${f.bairro}<br> <span class="text-sm text-gray-500">${f.telefone}</span> ${f.observacao?

${f.observacao}

:""} ${f.foto?￼:""} </div> <div class="flex flex-col gap-1 text-right"> <button onclick="editarFunc(${i})" class="text-blue-600 hover:underline text-sm">Editar</button> <button onclick="excluirFunc(${i})" class="text-red-600 hover:underline text-sm">Excluir</button> </div>;
listaFunc.appendChild(li);
}
});
} 

function editarFunc(index){
const f=getFuncionarios()[index];
camposFunc.forEach(c=>document.getElementById(c).value=f[c]||"");
document.getElementById("indexEdicaoFunc").value=index;
}

function excluirFunc(index){
if(!confirm("Deseja excluir este funcionário?"))return;
const dados=getFuncionarios();
dados.splice(index,1);
salvarFuncionarios(dados);
renderizarListaFunc();
}

formFunc.addEventListener("submit", e=>{
e.preventDefault();
const dados=getFuncionarios();
const novo={};
camposFunc.forEach(c=>novo[c]=document.getElementById(c).value);
const fotoInput=document.getElementById("foto");
if(fotoInput.files.length>0){
const reader=new FileReader();
reader.onload=function(event){novo.foto=event.target.result; salvarFunc(novo);}
reader.readAsDataURL(fotoInput.files[0]);
} else { salvarFunc(novo); }

function salvarFunc(novo){
const idx=parseInt(document.getElementById("indexEdicaoFunc").value);
if(idx>=0){ dados[idx]=novo; document.getElementById("indexEdicaoFunc").value=-1; }
else { dados.push(novo); }
salvarFuncionarios(dados);
formFunc.reset();
renderizarListaFunc();
}
});

document.getElementById("pesquisaFunc").addEventListener("input", renderizarListaFunc);

