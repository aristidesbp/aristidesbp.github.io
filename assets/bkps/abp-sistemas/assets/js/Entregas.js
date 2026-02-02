// assets/js/Entregas.js
export default class Entregas {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if(!this.container) return;
    this.campos = ["codigo","nome","endereco","bairro","valor","observacao"];
    this._montarHTML();
    this._capturarElementos();
    this._registrarEventos();
    this.renderizarLista();
  }

  /* HTML do componente gerado dinamicamente */
  _montarHTML(){
    this.container.classList.add("entregas-container");
    this.container.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center">Cadastro de Entrega</h2>
      <form id="formulario" class="space-y-4">
        <input type="hidden" id="indexEdicao" value="-1" />
        ${this.campos.map(c=>`<div><label>${c.charAt(0).toUpperCase()+c.slice(1)}</label><input id="${c}" required /></div>`).join('')}
        <div><label>Foto da Nota</label><input id="foto" type="file" accept="image/*" capture="environment" /></div>
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 mt-2">Salvar</button>
      </form>
      <ul id="lista" class="mt-6"></ul>
    `;
  }

  /* Captura elementos DOM */
  _capturarElementos(){
    this.form = this.container.querySelector("#formulario");
    this.lista = this.container.querySelector("#lista");
  }

  /* Eventos */
  _registrarEventos(){
    this.form.addEventListener("submit", e=>this._salvarForm(e));
    this.lista.addEventListener("click", e=>this._delegarBotoes(e));
  }

  /* LocalStorage */
  getEntregas(){ return JSON.parse(localStorage.getItem("entregas")||"[]"); }
  salvarEntregas(dados){ localStorage.setItem("entregas", JSON.stringify(dados)); }

  /* Renderização da lista */
  renderizarLista(){
    const entregas = this.getEntregas();
    entregas.sort((a,b)=>a.bairro.toLowerCase().localeCompare(b.bairro.toLowerCase()) || a.endereco.localeCompare(b.endereco));
    this.lista.innerHTML = "";

    entregas.forEach((e,i)=>{
      const enderecoCompleto = encodeURIComponent(`${e.endereco}, ${e.bairro}`);
      const status = e.status || "Pendente";
      const corStatus = {"Pendente":"status-pendente","Entregue":"status-entregue","Problema":"status-problema"}[status];
      const imgTag = e.foto ? `<img src="${e.foto}" />` : "";
      const obs = e.status==="Problema" && e.observacao ? `<p style="color:red;font-size:0.8rem;">Obs: ${e.observacao}</p>` : "";

      const li = document.createElement("li");
      li.className = "entrega-card";
      li.innerHTML = `
        <div style="display:flex;justify-content:space-between;">
          <div>
            <strong>${e.codigo}</strong> - ${e.nome}<br>
            ${e.endereco}, ${e.bairro} - R$ ${parseFloat(e.valor).toFixed(2)}
            ${obs}
            ${imgTag}
          </div>
          <div style="display:flex;flex-direction:column;gap:0.25rem;">
            <a href="https://www.google.com/maps/search/?api=1&query=${enderecoCompleto}" target="_blank" style="color:green;">Ver no mapa</a>
            <button class="${corStatus}" data-index="${i}" data-acao="status">${status}</button>
            <button style="color:blue;" data-index="${i}" data-acao="editar">Editar</button>
            <button style="color:red;" data-index="${i}" data-acao="excluir">Excluir</button>
          </div>
        </div>
      `;
      this.lista.appendChild(li);
    });
  }

  /* Delegação de botões */
  _delegarBotoes(e){
    const btn = e.target.closest("button");
    if(!btn) return;
    const index = btn.dataset.index;
    const acao = btn.dataset.acao;
    if(acao==="status") this.trocarStatus(index);
    if(acao==="editar") this.editar(index);
    if(acao==="excluir") this.excluir(index);
  }

  trocarStatus(index){
    const entregas=this.getEntregas();
    const atual=entregas[index].status||"Pendente";
    const proximo=atual==="Pendente"?"Entregue":atual==="Entregue"?"Problema":"Pendente";
    entregas[index].status=proximo;
    this.salvarEntregas(entregas);
    this.renderizarLista();
  }

  editar(index){
    const e=this.getEntregas()[index];
    this.campos.forEach(c=>this.container.querySelector("#"+c).value=e[c]||"");
    this.container.querySelector("#indexEdicao").value=index;
  }

  excluir(index){
    const entregas=this.getEntregas();
    entregas.splice(index,1);
    this.salvarEntregas(entregas);
    this.renderizarLista();
  }

  _salvarForm(e){
    e.preventDefault();
    const entregas=this.getEntregas();
    const novo={};
    this.campos.forEach(c=>novo[c]=this.container.querySelector("#"+c).value);
    novo.status="Pendente";
    const fotoInput=this.container.querySelector("#foto");
    if(fotoInput.files.length>0){
      const reader=new FileReader();
      reader.onload=ev=>{ novo.foto=ev.target.result; this._salvarDados(novo, entregas); };
      reader.readAsDataURL(fotoInput.files[0]);
    } else this._salvarDados(novo, entregas);
  }

  _salvarDados(novo, entregas){
    const idx=parseInt(this.container.querySelector("#indexEdicao").value);
    if(idx>=0){ entregas[idx]=novo; this.container.querySelector("#indexEdicao").value=-1; }
    else entregas.push(novo);
    this.salvarEntregas(entregas);
    this.form.reset();
    this.renderizarLista();
  }
}