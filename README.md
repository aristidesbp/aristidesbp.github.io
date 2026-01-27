✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# 🧱 Criar o projeto no Supabase
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto
* Senha do banco
* Região
  
# 🧨 RESET TOTAL DO SUPABASE (DADOS + AUTH + STORAGE)
@ 👉 Isso é o mais próximo possível de um banco novo.
``` 
-- Apagar tabelas públicas
do $$
declare
  r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public') loop
    execute 'drop table if exists public.' || quote_ident(r.tablename) || ' cascade';
  end loop;
end $$;
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# config.js
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
##  Pegar as chaves do Supabase
## Vá em Settings
*  🧱 DATA API/Project URL/copiar🧱 
*  🔑 API Keis/anon public key/copiar🔑
*  🧠 Altentication/url config/ coloque o endereço de onde está hospedado
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
```
const dbsupabase = supabase.createClient(
  'SUA_URL_AQUI', 
  'SUA_KEY_AQUI'
)
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# login.html
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Login</title>
<script src="js/config.js" defer></script> 
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 80px auto;
}

h2 {
  text-align: center;
}

input, button {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
}

.senha {
  position: relative;
}

.senha span {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}

a {
  cursor: pointer;
  color: #0066cc;
  text-decoration: underline;
}

p {
  text-align: center;
}
</style>
</head>
<body>

<h2 id="titulo">Login</h2>

<input id="email" type="email" placeholder="Email" required>

<div class="senha">
  <input id="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required>
  <span onclick="toggleSenha()">👁️</span>
</div>

<button id="btnAcao" onclick="login()">Entrar</button>

<p>
  <a onclick="mostrarCadastro()">Criar conta</a> |
  <a onclick="resetSenha()">Esqueci minha senha</a>
</p>

<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


<script>


/* ===============================
   UI
================================ */
function toggleSenha() {
  const input = document.getElementById('senha')
  input.type = input.type === 'password' ? 'text' : 'password'
}

/* ===============================
   LOGIN (COM AUDITORIA E CORREÇÕES)
================================ */
async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  // 1. Tenta o login
  const { data, error } = await dbsupabase.auth.signInWithPassword({
    email,
    password: senha
  })

  if (error) {
    alert("Erro: " + error.message)
    return
  }

  // 2. Se logou com sucesso, grava o Log de Auditoria
  if (data.user) {
    try {
      await dbsupabase.from('logs_acesso').insert([
        { 
          usuario_id: data.user.id, 
          user_agent: navigator.userAgent 
        }
      ]);
    } catch (logError) {
      console.error("Erro ao gravar log:", logError);
      // Não bloqueamos o login se o log falhar, para não travar o usuário
    }

    // 3. Redireciona
    window.location.href = 'index.html'
  }
}

/* ===============================
   RESET DE SENHA
================================ */
async function resetSenha() {
  const email = document.getElementById('email').value

  if (!email) {
    alert('Digite seu email para recuperar a senha')
    return
  }

  const { error } = await dbsupabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://aristidesbp.github.io' 
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Email de recuperação enviado!')
}

/* ===============================
   CADASTRO
================================ */
function mostrarCadastro() {
  document.getElementById('titulo').innerText = 'Cadastro'
  const btn = document.getElementById('btnAcao')
  btn.innerText = 'Cadastrar'
  btn.onclick = cadastrar
}

async function cadastrar() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres')
    return
  }

  const { error } = await dbsupabase.auth.signUp({
    email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Cadastro realizado! Verifique seu email para confirmar a conta.')
}
</script>

</body>
</html>

```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# PRODUTOS.HTML
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - ERP ABP</title>
    
    <script src="https://unpkg.com/html5-qrcode"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="produtos.css">
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="js/config.js"></script> </head>
<body>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Identificação e Foto</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Foto do Produto</label>
                <input type="file" id="foto_produto" accept="image/*" onchange="previewImage(this)">
                <div id="preview-container" style="margin-top:10px; display:none;">
                    <img id="img-preview" src="" style="max-height: 120px;">
                </div>
            </div>
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" placeholder="Ex: Porcelanato 60x60">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <div style="display: flex; gap: 5px;">
                    <input type="text" id="codigo_de_barras" placeholder="0000000000000">
                    <button type="button" class="btn-scan" onclick="abrirScanner()">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="reader-container" style="display:none;">
            <div id="reader"></div>
            <button class="btn-cancel" onclick="fecharScanner()" style="margin-bottom: 20px;">Fechar Câmera</button>
        </div>

        <div class="section-title">Dados da Compra e Fornecedor</div>
        <div class="form-grid">
            <div><label>Data da Compra</label><input type="date" id="data_compra"></div>
            <div><label>Nº Nota Fiscal</label><input type="text" id="numero_nota"></div>
            <div>
                <label>Fornecedor</label>
                <select id="entidade_id"><option value="">Aguarde...</option></select>
            </div>
            <div><label>Categoria</label><input type="text" id="categoria_prod" list="lista-categorias"></div>
            <datalist id="lista-categorias"></datalist>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Custo (R$)</label><input type="number" id="preco_custo" step="0.01"></div>
            <div><label>Venda (R$) *</label><input type="number" id="preco_venda" step="0.01"></div>
            <div><label>Estoque Atual</label><input type="number" id="estoque_atual"></div>
            <div><label>Mínimo</label><input type="number" id="estoque_minimo"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button id="btn-cancel" class="btn-cancel" onclick="resetForm()" style="display:none;">Cancelar Edição</button>
    </div>

    <div class="card">
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Busca Inteligente</label>
                <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Nome, SKU ou EAN...">
            </div>
            <div>
                <label>Filtrar Categoria</label>
                <select id="filtro_categoria" onchange="filtrarProdutos()">
                    <option value="">Todas</option>
                </select>
            </div>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Estoque</th>
                    <th>Venda</th>
                    <th>Compra / NF</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>

<script src="produtos.js"></script>
</body>
</html>
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# css/produtos.css
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
```
:root { 
    --primary: #3ecf8e; 
    --dark: #0f172a; 
    --bg: #f1f5f9; 
    --danger: #ef4444; 
}

* { box-sizing: border-box; }

body { 
    margin: 0; 
    font-family: 'Segoe UI', sans-serif; 
    background: var(--bg); 
    color: #1e293b; 
}

.container { 
    max-width: 1250px; 
    margin: auto; 
    padding: 20px; 
}

.card { 
    background: white; 
    padding: 25px; 
    border-radius: 12px; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
    margin-bottom: 25px; 
}

.section-title { 
    color: var(--primary); 
    font-size: 13px; 
    text-transform: uppercase; 
    margin: 25px 0 12px; 
    border-bottom: 2px solid #f1f5f9; 
    padding-bottom: 6px; 
    font-weight: 800; 
}

.form-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
    gap: 15px; 
}

label { 
    display: block; 
    margin-bottom: 5px; 
    font-size: 13px; 
    color: #64748b; 
    font-weight: 600; 
}

input, select { 
    width: 100%; 
    padding: 11px; 
    border: 1px solid #e2e8f0; 
    border-radius: 8px; 
}

.btn-add { 
    background: var(--primary); 
    color: white; 
    padding: 15px; 
    border: none; 
    border-radius: 8px; 
    cursor: pointer; 
    width: 100%; 
    margin-top: 20px; 
    font-weight: bold; 
}

.btn-cancel { 
    background: #94a3b8; 
    color: white; 
    padding: 12px; 
    border: none; 
    border-radius: 8px; 
    width: 100%; 
    margin-top: 10px; 
    cursor: pointer; 
    font-weight: bold; 
}

.btn-scan { 
    background: var(--dark); 
    color: white; 
    border: none; 
    padding: 10px 15px; 
    border-radius: 8px; 
    cursor: pointer; 
}

.table-container { 
    background: white; 
    border-radius: 12px; 
    overflow-x: auto; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
}

table { 
    width: 100%; 
    border-collapse: collapse; 
    min-width: 900px; 
}

th { 
    background: #f8fafc; 
    padding: 15px; 
    font-size: 12px; 
    text-align: left; 
    color: #475569; 
}

td { 
    padding: 12px 15px; 
    border-top: 1px solid #f1f5f9; 
    font-size: 14px; 
}

.img-prod { 
    width: 50px; 
    height: 50px; 
    object-fit: cover; 
    border-radius: 6px; 
    background: #eee; 
}

#img-preview { 
    border: 2px solid var(--primary); 
    border-radius: 8px; 
}

#reader { 
    width: 100%; 
    border-radius: 12px; 
    margin-bottom: 10px; 
}

.actions-flex { display: flex; gap: 8px; }

.btn-action { 
    border: none; 
    border-radius: 6px; 
    padding: 8px; 
    cursor: pointer; 
    color: white; 
    transition: 0.2s; 
}

.btn-edit { background-color: var(--dark); }
.btn-delete { background-color: var(--danger); }
.btn-action:hover { filter: brightness(1.2); }
```

✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# css/produtos.js
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
```
(function() {
    "use strict";
    let listaProdutos = [];
    let html5QrCode;

    // Aguarda o Guard Global inicializar o window._supabase
    async function inicializar() {
        if (!window._supabase) {
            setTimeout(inicializar, 500);
            return;
        }
        await loadEntidadesFornecedores();
        await loadProdutos();
    }

    async function loadEntidadesFornecedores() {
        const { data, error } = await window._supabase
            .from('entidades')
            .select('id, nome_completo')
            .eq('relacionamento', 'fornecedor')
            .order('nome_completo');

        if (!error) {
            const select = document.getElementById('entidade_id');
            select.innerHTML = '<option value="">Selecione o Fornecedor...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        }
    }

    async function loadProdutos() {
        const { data, error } = await window._supabase
            .from('produtos')
            .select('*, entidades(nome_completo)')
            .order('nome');

        if (!error) {
            listaProdutos = data || [];
            renderProdutos(listaProdutos);
            atualizarFiltrosCategorias(listaProdutos);
        }
    }

    // --- Lógica de Imagem ---
    window.previewImage = function(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                document.getElementById('img-preview').src = e.target.result;
                document.getElementById('preview-container').style.display = 'block';
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    async function comprimirImagem(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_SIZE = 800;
                    if (width > height) { if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; } }
                    else { if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; } }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7);
                };
            };
        });
    }

    window.handleSaveProduto = async function() {
        try {
            const { data: { user } } = await window._supabase.auth.getUser();
            const id = document.getElementById('edit-id').value;
            const fotoInput = document.getElementById('foto_produto');
            let publicUrl = document.getElementById('img-preview').src;

            if (fotoInput.files && fotoInput.files[0]) {
                const file = fotoInput.files[0];
                const imagemBlob = await comprimirImagem(file);
                const filePath = `fotos/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
                
                const { error: uploadError } = await window._supabase.storage
                    .from('produtos').upload(filePath, imagemBlob);
                if (uploadError) throw uploadError;

                const { data: urlData } = window._supabase.storage
                    .from('produtos').getPublicUrl(filePath);
                publicUrl = urlData.publicUrl;
            }

            const dados = {
                usuario_id: user.id,
                nome: document.getElementById('nome').value,
                codigo_de_barras: document.getElementById('codigo_de_barras').value,
                data_compra: document.getElementById('data_compra').value || null,
                numero_nota: document.getElementById('numero_nota').value,
                categoria_prod: document.getElementById('categoria_prod').value,
                entidade_id: document.getElementById('entidade_id').value || null,
                preco_custo: parseFloat(document.getElementById('preco_custo').value) || 0,
                preco_venda: parseFloat(document.getElementById('preco_venda').value) || 0,
                estoque_atual: parseInt(document.getElementById('estoque_atual').value) || 0,
                estoque_minimo: parseInt(document.getElementById('estoque_minimo').value) || 0,
                imagem_url: publicUrl.startsWith('data:') ? null : publicUrl
            };

            if (!dados.nome || !dados.preco_venda) return alert("Nome e Venda são obrigatórios!");

            const { error } = id ? 
                await window._supabase.from('produtos').update(dados).eq('id', id) : 
                await window._supabase.from('produtos').insert([dados]);

            if (error) throw error;
            resetForm(); loadProdutos();
            alert("Produto salvo!");
        } catch (err) { alert("Erro: " + err.message); }
    };

    window.renderProdutos = function(dados) {
        const list = document.getElementById('produtos-list');
        list.innerHTML = dados.map(p => {
            const estoqueBaixo = p.estoque_atual <= (p.estoque_minimo || 0);
            return `
            <tr>
                <td><img src="${p.imagem_url || 'https://via.placeholder.com/50'}" class="img-prod"></td>
                <td><b>${p.nome}</b></td>
                <td><span style="background:#e2e8f0; padding:2px 8px; border-radius:4px; font-size:12px;">${p.categoria_prod || '-'}</span></td>
                <td style="${estoqueBaixo ? 'color:red; font-weight:bold' : ''}">${p.estoque_atual} un</td>
                <td>R$ ${parseFloat(p.preco_venda).toLocaleString('pt-BR', {minFractionDigits:2})}</td>
                <td><small>NF: ${p.numero_nota || '-'}<br>${p.data_compra || ''}</small></td>
                <td>
                    <div class="actions-flex">
                        <button class="btn-action btn-edit" onclick="window.editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn-action btn-delete" onclick="window.deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>`;
        }).join('') || '<tr><td colspan="7" style="text-align:center">Nenhum produto.</td></tr>';
    };

    window.editProduto = function(id) {
        const p = listaProdutos.find(i => i.id === id);
        if (!p) return;
        document.getElementById('edit-id').value = p.id;
        document.getElementById('nome').value = p.nome;
        document.getElementById('preco_venda').value = p.preco_venda;
        document.getElementById('estoque_atual').value = p.estoque_atual;
        if (p.imagem_url) {
            document.getElementById('img-preview').src = p.imagem_url;
            document.getElementById('preview-container').style.display = 'block';
        }
        document.getElementById('form-title').innerText = "Editando Produto";
        document.getElementById('btn-save').innerText = "Atualizar";
        document.getElementById('btn-cancel').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.resetForm = function() {
        document.getElementById('edit-id').value = '';
        document.querySelectorAll('input, select').forEach(i => i.value = '');
        document.getElementById('img-preview').src = '';
        document.getElementById('preview-container').style.display = 'none';
        document.getElementById('form-title').innerText = "Novo Produto";
        document.getElementById('btn-save').innerText = "Salvar Produto";
        document.getElementById('btn-cancel').style.display = 'none';
    };

    window.deleteProduto = async function(id) {
        if (confirm("Excluir produto?")) {
            await window._supabase.from('produtos').delete().eq('id', id);
            loadProdutos();
        }
    };

    window.abrirScanner = function() {
        document.getElementById('reader-container').style.display = 'block';
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
            (text) => { document.getElementById('codigo_de_barras').value = text; fecharScanner(); }
        );
    };

    window.fecharScanner = function() {
        if (html5QrCode) html5QrCode.stop().then(() => { document.getElementById('reader-container').style.display = 'none'; });
    };

    window.filtrarProdutos = function() {
        const busca = document.getElementById('inputBusca').value.toLowerCase();
        const filtrados = listaProdutos.filter(p => p.nome.toLowerCase().includes(busca));
        renderProdutos(filtrados);
    };

    function atualizarFiltrosCategorias(produtos) {
        const categorias = [...new Set(produtos.map(p => p.categoria_prod).filter(Boolean))];
        document.getElementById('lista-categorias').innerHTML = categorias.map(c => `<option value="${c}">`).join('');
    }

    document.addEventListener('DOMContentLoaded', inicializar);
})();
```





