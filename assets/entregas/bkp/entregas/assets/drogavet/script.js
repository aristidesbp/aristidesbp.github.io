let entregas = [];
let exibidas = [];
let salvando = false;
let editIndex = -1;

const form = document.getElementById('formEntrega');
const btnSalvar = document.getElementById('btnSalvar');
const btnLimparForm = document.getElementById('btnLimparForm');
const tabelaBody = document.querySelector('#tabela tbody');
const msgSuccess = document.getElementById('msgSuccess');
const inputFoto = document.getElementById('foto');

const filtroMotoboy = document.getElementById('filtroMotoboy');
const filtroData = document.getElementById('filtroData');
const btnAplicarFiltro = document.getElementById('btnAplicarFiltro');
const btnLimparFiltro = document.getElementById('btnLimparFiltro');
const btnGerarRelatorio = document.getElementById('btnGerarRelatorio');

const btnExportar = document.getElementById('btnExportar');
const inputImport = document.getElementById('inputImport');

const campoBairro = document.getElementById('bairro');
const campoValor = document.getElementById('valor');

const faixaPorBairro = {
  'Marco':[8,10],'Pedreira':[8,10],'Umarizal':[8,10],'Guamá':[8,10],'Telégrafo':[8,10],'Jurunas':[8,10],
  'Centro':[11,13],'Águas Lindas':[11,13],'Coqueiro':[11,13],'Maguari':[11,13],'Jaderlândia':[11,13],
  'Cidade Nova 1':[13,15],'Cidade Nova 2':[13,15],'Cidade Nova 3':[13,15],'Cidade Nova 4':[13,15],
  'Paracuri':[15,17],'Águas Negras':[15,17],'Agulha':[15,17],'Decouville':[17,20],'São João':[17,20],'Almir Gabriel':[17,20],
  'Enviada por Correio':[6,8],'Enviada para Terminal':[6,8]
};

function valorAleatorioPorBairro(bairro){
  const faixa = faixaPorBairro[bairro];
  if(!faixa) return '';
  const min = faixa[0], max = faixa[1];
  const v = Math.random()*(max-min)+min;
  return v.toFixed(2);
}

function fileToBase64(file){
  return new Promise((resolve,reject)=>{
    if(!file) return resolve('');
    const r = new FileReader();
    r.onload = ()=> resolve(r.result);
    r.onerror = ()=> reject(new Error('Erro lendo imagem'));
    r.readAsDataURL(file);
  });
}

function keyFrom(e){
  return [
    (e.motoboy||'').trim().toLowerCase(),
    String(e.valor||'').trim(),
    (e.codigo||'').trim().toLowerCase(),
    (e.data||'').trim(),
    (e.bairro||'').trim().toLowerCase(),
    (e.endereco||'').trim().toLowerCase(),
    (e.observacao||'').trim().toLowerCase()
  ].join('|');
}

function isDuplicate(n){
  const k = keyFrom(n);
  return entregas.some(r=> keyFrom(r)===k);
}

function esc(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function render(lista){
  exibidas = Array.isArray(lista)? lista.slice() : entregas.slice();
  tabelaBody.innerHTML = '';
  exibidas.forEach((e, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${esc(e.motoboy)}</td>
      <td>R$ ${Number(e.valor).toFixed(2)}</td>
      <td>${esc(e.codigo)}</td>
      <td>${esc(e.data)}</td>
      <td>${esc(e.bairro)}</td>
      <td>${esc(e.endereco)}</td>
      <td>${esc(e.observacao||'')}</td>
      <td>${e.foto? `<img src="${e.foto}" alt="nota">` : ''}</td>
      <td>
        <button data-idx="${idx}" class="btn-edit small">Editar</button>
        <button data-idx="${idx}" class="btn-del small">Excluir</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

function limparForm(){
  form.reset();
  inputFoto.value = '';
  editIndex = -1;
}

campoBairro.addEventListener('change', ()=>{
  const b = campoBairro.value;
  if(!b) return;
  if(!campoValor.value || Number(campoValor.value)===0){
    campoValor.value = valorAleatorioPorBairro(b);
  }
});

form.addEventListener('submit', async (ev)=>{
  ev.preventDefault();
  if(salvando) return;
  salvando = true;
  btnSalvar.disabled = true;
  btnSalvar.textContent = 'Salvando...';

  try{
    const motoboy = document.getElementById('motoboy').value.trim();
    const valor = Number(document.getElementById('valor').value).toFixed(2);
    const codigo = document.getElementById('codigo').value.trim();
    const data = document.getElementById('data').value;
    const bairro = document.getElementById('bairro').value;
    const endereco = document.getElementById('endereco').value.trim();
    const observacao = document.getElementById('observacao').value.trim();

    if(!motoboy|| !valor || !codigo || !data || !bairro || !endereco){
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const file = inputFoto.files[0];
    const fotoBase64 = file ? await fileToBase64(file) : '';

    const registro = { motoboy, valor, codigo, data, bairro, endereco, observacao, foto: fotoBase64 };

    if(editIndex >= 0){
      const original = exibidas[editIndex];
      const globalIdx = entregas.indexOf(original);
      if(globalIdx === -1){ alert('Erro interno.'); return; }
      const temp = entregas.slice(); temp.splice(globalIdx,1);
      if(temp.some(r=> keyFrom(r) === keyFrom(registro))){ alert('Edição resultaria em duplicado.'); return; }
      entregas[globalIdx] = registro;
    } else {
      if(isDuplicate(registro)){ alert('Registro duplicado.'); return; }
      entregas.unshift(registro);
    }

    render(entregas);
    limparForm();
    msgSuccess.style.display='block';
    setTimeout(()=> msgSuccess.style.display='none',2000);

  }catch(err){
    console.error(err);
    alert('Erro ao salvar entrega.');
  } finally{
    salvando=false; btnSalvar.disabled=false; btnSalvar.textContent='Salvar Entrega';
  }
});

tabelaBody.addEventListener('click',(ev)=>{
  const el = ev.target;
  if(el.classList.contains('btn-edit')){
    const idx = Number(el.dataset.idx);
    const registro = exibidas[idx];
    if(!registro) return;
    document.getElementById('motoboy').value=registro.motoboy;
    document.getElementById('valor').value=registro.valor;
    document.getElementById('codigo').value=registro.codigo;
    document.getElementById('data').value=registro.data;
    document.getElementById('bairro').value=registro.bairro;
    document.getElementById('endereco').value=registro.endereco;
    document.getElementById('observacao').value=registro.observacao||'';
    editIndex=idx;
    window.scrollTo({top:0,behavior:'smooth'});
  }
  if(el.classList.contains('btn-del')){
    const idx = Number(el.dataset.idx);
    const registro = exibidas[idx];
    if(!registro) return;
    if(!confirm('Excluir esta entrega?')) return;
    const g = entregas.indexOf(registro);
    if(g>-1) entregas.splice(g,1);
    render(entregas);
  }
});

btnAplicarFiltro.addEventListener('click', ()=>{
  const m = (filtroMotoboy.value||'').trim().toLowerCase();
  const d = (filtroData.value||'').trim();
  const filtradas = entregas.filter(e=>{
    const matchM = m ? (e.motoboy||'').toLowerCase().includes(m) : true;
    const matchD = d ? e.data === d : true;
    return matchM && matchD;
  });
  render(filtradas);
});

btnLimparFiltro.addEventListener('click', ()=>{
  filtroMotoboy.value=''; filtroData.value='';
  render(entregas);
});

// Export JSON
btnExportar.addEventListener('click', ()=>{
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entregas));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "backup_entregas.json");
  dlAnchor.click();
});

// Import JSON (ACRESCENTA, não substitui)
inputImport.addEventListener('change', (ev)=>{
  const file = ev.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const imported = JSON.parse(reader.result);
      if(!Array.isArray(imported)) throw new Error("Arquivo inválido");
      imported.forEach(r=>{
        if(!isDuplicate(r)){
          entregas.push(r);
        }
      });
      render(entregas);
      alert('Importação concluída. Registros acrescentados.');
    }catch(err){
      alert('Erro ao importar arquivo JSON.');
      console.error(err);
    } finally{
      inputImport.value='';
    }
  };
  reader.readAsText(file);
});