/* Contexto do projeto

Projeto: Site "Tapioca da Maria" — landing/loja de delivery modular.

Objetivo deste bloco: criar a página admin.html (painel administrativo) — interface mínima para: cadastrar/editar produtos, cadastrar componentes do site, fazer upload de imagens em Base64, exportar e importar o banco (JSON). Os dados serão salvos em IndexedDB (implementação no próximo bloco).

Observação: este é o Bloco 1 de 5. Após sua confirmação eu envio o próximo bloco (helpers IndexedDB, db.js).

Admin — Tapioca da Maria 

Painel ADMIN — Tapioca da Maria

Gerencie produtos, componentes e exporte/importe o banco (IndexedDB)

<!-- área 1: produtos --> <section class="card"> <h2>Produtos</h2> <!-- Formulário de cadastro/edição de produto --> <!-- Campos: id (oculto), nome, categoria, preço, descrição, imagem (base64) --> <form id="form-produto" autocomplete="off"> <input type="hidden" id="produto-id" /> <label>Nome</label> <input id="produto-nome" required /> <label>Categoria</label> <input id="produto-categoria" placeholder="ex: lanches, bebidas" /> <label>Preço (ex: 12.50)</label> <input id="produto-preco" inputmode="decimal" required /> <label>Descrição</label> <textarea id="produto-descricao"></textarea> <label>Imagem (PNG/JPG) — será convertida para Base64</label> <input id="produto-imagem" type="file" accept="image/*" /> <div class="acoes"> <button type="submit" id="btn-salvar-produto">Salvar</button> <button type="button" id="btn-limpar-produto">Limpar</button> </div> </form> <hr /> <h3>Lista de Produtos</h3> <div id="lista-produtos" class="lista"></div> </section> <!-- área 2: componentes do site (ex: hero, serviços, header) --> <section class="card"> <h2>Componentes</h2> <p class="muted">Crie textos/imagens que serão carregados dinamicamente nos componentes do site.</p> <form id="form-componente"> <input type="hidden" id="comp-id" /> <label>Nome do Componente (slug)</label> <input id="comp-slug" placeholder="ex: hero, servicos, header" required /> <label>Tipo</label> <select id="comp-tipo"> <option value="conteudo">Conteúdo (html/texto simples)</option> <option value="produtos">Lista de produtos</option> </select> <label>Conteúdo (JSON ou Markdown)</label> <textarea id="comp-conteudo" rows="6" placeholder='ex: {"titulo":"Olá","texto":"..."}'></textarea> <div class="acoes"> <button type="submit">Salvar Componente</button> <button type="button" id="btn-limpar-comp">Limpar</button> </div> </form> <hr /> <h3>Lista de Componentes</h3> <div id="lista-componentes" class="lista"></div> </section> <!-- área 3: export / import do DB --> <section class="card card-wide"> <h2>Exportar / Importar Banco (JSON)</h2> <p class="muted">Exporte todo o banco em JSON ou importe um arquivo para restaurar/mesclar dados. Inclui imagens em Base64.</p> <div class="row"> <button id="btn-exportar">Exportar JSON</button> <input type="file" id="input-importar" accept="application/json" /> <button id="btn-importar">Importar JSON</button> <button id="btn-limpar-db">Limpar DB</button> </div> <label>Visualização / Saída JSON</label> <textarea id="saida-json" rows="10" readonly></textarea> </section> Feito com carinho — Administração local via IndexedDB e exportação JSON. 

Instruções/Próximo passo:

Esse bloco contém apenas o admin.html (interface). O próximo bloco terá: assets/js/db.js (helper IndexedDB com funções: abrir DB, adicionar/editar/remover/listar, exportar/importar, e estratégia de mesclagem) e assets/js/admin.js (integração UI ↔ DB, conversão base64, renderização das listas e eventos).

Se quiser, eu já posso enviar o próximo bloco com o código do db.js e admin.js.

Deseja que eu continue com o bloco 2 (JS: IndexedDB + lógica admin)?

Bloco 2 de 5 — JS: db.js (helper IndexedDB) + admin.js (lógica do painel)

Contexto: Implementação do banco IndexedDB chamado tapioca-db com duas stores: produtos (keyPath id) e componentes (keyPath slug). Funções: abrirDB, salvar/atualizar, deletar, listar, exportar/importar (JSON), limpar DB. admin.js conecta a interface do admin.html a essas funções, converte imagens para Base64 e renderiza listas.

/* assets/js/db.js / / Helper simples e promisificado para IndexedDB */ const DB_NAME = 'tapioca-db'; const DB_VERSION = 1; const STORES = ['produtos','componentes'];

function abrirDB(){ return new Promise((res,rej)=>{ const req = indexedDB.open(DB_NAME,DB_VERSION); req.onupgradeneeded = (e)=>{ const db = e.target.result; if(!db.objectStoreNames.contains('produtos')){ db.createObjectStore('produtos',{ keyPath: 'id' }); } if(!db.objectStoreNames.contains('componentes')){ db.createObjectStore('componentes',{ keyPath: 'slug' }); } }; req.onsuccess = ()=> res(req.result); req.onerror = ()=> rej(req.error); }); }

async function tx(storeName, mode='readonly'){ const db = await abrirDB(); return db.transaction(storeName, mode).objectStore(storeName); }

export async function salvar(storeName, item){ const db = await abrirDB(); return new Promise((res,rej)=>{ const tx = db.transaction(storeName,'readwrite'); const os = tx.objectStore(storeName); const req = os.put(item); req.onsuccess = ()=> res(req.result); req.onerror = ()=> rej(req.error); }); }

export async function listar(storeName){ const db = await abrirDB(); return new Promise((res,rej)=>{ const tx = db.transaction(storeName,'readonly'); const os = tx.objectStore(storeName); const req = os.getAll(); req.onsuccess = ()=> res(req.result); req.onerror = ()=> rej(req.error); }); }

export async function remover(storeName, key){ const db = await abrirDB(); return new Promise((res,rej)=>{ const tx = db.transaction(storeName,'readwrite'); const os = tx.objectStore(storeName); const req = os.delete(key); req.onsuccess = ()=> res(); req.onerror = ()=> rej(req.error); }); }

export async function limparDB(){ const db = await abrirDB(); return Promise.all(STORES.map(store=> new Promise((res,rej)=>{ const tx = db.transaction(store,'readwrite'); const os = tx.objectStore(store); const r = os.clear(); r.onsuccess = ()=> res(); r.onerror = ()=> rej(r.error); }))); }

// Exporta todo o DB em objeto JSON export async function exportarDB(){ const out = {}; for(const s of STORES){ out[s] = await listar(s); } return out; }

// Importa e mescla: substitui por slug/id existentes export async function importarDB(json){ // json = {produtos: [...], componentes: [...]} for(const s of STORES){ if(Array.isArray(json[s])){ for(const item of json[s]){ await salvar(s,item); } } } }

/* assets/js/admin.js / / Integração UI ↔ DB. Comentários em português explicando cada parte. */

// Referências aos elementos da UI const formProduto = document.getElementById('form-produto'); const listaProdutosEl = document.getElementById('lista-produtos'); const inputImg = document.getElementById('produto-imagem'); const btnExportar = document.getElementById('btn-exportar'); const inputImportar = document.getElementById('input-importar'); const btnImportar = document.getElementById('btn-importar'); const btnLimparDB = document.getElementById('btn-limpar-db'); const saidaJson = document.getElementById('saida-json');

// Converte arquivo File -> base64 function fileParaBase64(file){ return new Promise((res,rej)=>{ if(!file) return res(null); const reader = new FileReader(); reader.onload = ()=> res(reader.result); reader.onerror = ()=> rej(reader.error); reader.readAsDataURL(file); }); }

// Renderiza lista de produtos async function carregarProdutos(){ const produtos = await listar('produtos'); listaProdutosEl.innerHTML = ''; if(!produtos.length) { listaProdutosEl.innerHTML = 'Nenhum produto cadastrado'; return; } produtos.sort((a,b)=>a.nome.localeCompare(b.nome)); produtos.forEach(p=>{ const item = document.createElement('div'); item.className = 'produto-item'; item.innerHTML = <strong>${p.nome}</strong> — R$ ${Number(p.preco).toFixed(2)}<br/> <small>${p.categoria || ''} — ${p.descricao || ''}</small> <div class="acoes"> <button data-id="${p.id}" class="editar">Editar</button> <button data-id="${p.id}" class="deletar">Deletar</button> </div>; listaProdutosEl.appendChild(item); }); }

// Submissão do formulário produto formProduto.addEventListener('submit', async (e)=>{ e.preventDefault(); const idField = document.getElementById('produto-id'); const nome = document.getElementById('produto-nome').value.trim(); const categoria = document.getElementById('produto-categoria').value.trim(); const preco = parseFloat(document.getElementById('produto-preco').value.replace(',','.')) || 0; const descricao = document.getElementById('produto-descricao').value.trim(); const file = inputImg.files[0];

// Converte imagem, se houver const base64 = await fileParaBase64(file);

const produto = { id: idField.value || ('p_'+Date.now()), nome, categoria, preco, descricao }; if(base64) produto.imagem = base64;

await salvar('produtos', produto); formProduto.reset(); idField.value = ''; await carregarProdutos(); });

// Delegação de eventos para editar / deletar listaProdutosEl.addEventListener('click', async (e)=>{ const id = e.target.dataset.id; if(!id) return; if(e.target.classList.contains('deletar')){ if(confirm('Deletar este produto?')){ await remover('produtos', id); await carregarProdutos(); } } if(e.target.classList.contains('editar')){ const produtos = await listar('produtos'); const p = produtos.find(x=>x.id===id); if(!p) return; document.getElementById('produto-id').value = p.id; document.getElementById('produto-nome').value = p.nome; document.getElementById('produto-categoria').value = p.categoria; document.getElementById('produto-preco').value = p.preco; document.getElementById('produto-descricao').value = p.descricao; } });

// Exportar DB — mostra no textarea e oferece download btnExportar.addEventListener('click', async ()=>{ const json = await exportarDB(); const txt = JSON.stringify(json,null,2); saidaJson.value = txt; const blob = new Blob([txt],{type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'tapioca-db-export.json'; a.click(); URL.revokeObjectURL(url); });

// Importar JSON a partir do input btnImportar.addEventListener('click', async ()=>{ const file = inputImportar.files[0]; if(!file) return alert('Selecione um arquivo JSON para importar.'); const text = await file.text(); try{ const json = JSON.parse(text); await importarDB(json); alert('Importação concluída.'); await carregarProdutos(); }catch(err){ alert('Erro ao importar: '+err.message); } });

// Limpar DB btnLimparDB.addEventListener('click', async ()=>{ if(confirm('Limpar todo o banco de dados?')){ await limparDB(); await carregarProdutos(); saidaJson.value = ''; } });

// Inicializa document.addEventListener('DOMContentLoaded', async ()=>{ await carregarProdutos(); });

Próximo passo sugerido: Bloco 3/5 — adaptar os módulos do site (produtos.js, header.js, etc.) para carregarem dados do IndexedDB em vez de arquivos estáticos. Deseja que eu gere esses módulos (Bloco 3/5)?

Bloco 2/5 adicionado ao canvas — incluí o assets/js/db.js (helper IndexedDB) e o assets/js/admin.js (integração UI ↔ DB, upload Base64, export/import).

Quer que eu continue e gere o Bloco 3/5 (modificação dos módulos do site — produtos.js, header.js, etc. — para carregarem dinamicamente os dados do IndexedDB)?

