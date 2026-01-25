// ======== Função utilitária para fechar todas as seções ========
function fecharTodas() {
  const seções = ["divFormFunc","divListaFunc","divFormBairro","divListaBairros","divFormEntrega","divListaEntrega"];
  seções.forEach(id => document.getElementById(id).classList.add("hidden"));
}

// ======== Título fixo ========
document.getElementById("tituloFixo").addEventListener("click",()=>{
  fecharTodas();
  window.scrollTo({top:0, behavior:'smooth'});
});

// ======== Botões ========
const divFormFunc = document.getElementById("divFormFunc");
const divListaFunc = document.getElementById("divListaFunc");
const divFormBairro = document.getElementById("divFormBairro");
const divListaBairros = document.getElementById("divListaBairros");
const divFormEntrega = document.getElementById("divFormEntrega");
const divListaEntrega = document.getElementById("divListaEntrega");

document.getElementById("btnAddFunc").addEventListener("click", ()=>{fecharTodas(); divFormFunc.classList.remove("hidden");});
document.getElementById("btnListFunc").addEventListener("click", ()=>{fecharTodas(); divListaFunc.classList.remove("hidden"); renderizarListaFunc();});

document.getElementById("btnAddBairro").addEventListener("click", ()=>{fecharTodas(); divFormBairro.classList.remove("hidden"); carregarFuncionariosSelect();});
document.getElementById("btnListBairro").addEventListener("click", ()=>{fecharTodas(); divListaBairros.classList.remove("hidden"); renderizarListaBairros();});

document.getElementById("btnAddEntrega").addEventListener("click", ()=>{fecharTodas(); divFormEntrega.classList.remove("hidden");});
document.getElementById("btnListEntrega").addEventListener("click", ()=>{fecharTodas(); divListaEntrega.classList.remove("hidden"); renderizarListaEntrega();});






// ======== Inicialização ========
renderizarListaFunc();
carregarFuncionariosSelect();
renderizarListaBairros();
renderizarListaEntrega();