# produtos.html
```

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode"></script>
    <link rel="stylesheet" href="style.css">
<style>
    :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --accent: #6366f1; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); padding-top: 85px; }
.container { max-width: 1100px; margin: auto; padding: 20px; }
.card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
.section-title { color: var(--primary); font-size: 13px; text-transform: uppercase; margin: 25px 0 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 5px; font-weight: 800; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
label { display: block; margin-bottom: 5px; font-size: 12px; color: #64748b; font-weight: bold; }
input, select, textarea { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; transition: 0.2s; }
input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(62, 207, 142, 0.1); }
.btn-scan { background: var(--accent); color: white; padding: 8px; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 8px; width: 100%; font-size: 13px; font-weight: bold; }
#reader { width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 10px; display: none; border: 2px solid var(--accent); }
.btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; font-size: 16px; }
.btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 8px; cursor: pointer; display: none; width: 100%; }
.table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 11px; text-transform: uppercase; text-align: left; }
td { padding: 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }
.tag { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10px; color: #64748b; }
.low-stock { color: #ef4444; font-weight: bold; }
.navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 1000; }
.nav-logo { font-weight: 800; color: var(--dark); font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.nav-logo i { color: var(--primary); }
.nav-buttons { display: flex; gap: 12px; }
.btn-nav { padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.btn-home { background: #ecfdf5; color: #059669; }
    
    </style>
</head>
<body>

<div class="navbar">
    <div class="nav-logo">
        <i class="fas fa-boxes"></i> ERP ABP - Produtos
    </div>
    <div class="nav-buttons">
        <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Informações Básicas</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" class="form-input" placeholder="Ex: Cimento CP-II">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <button type="button" class="btn-scan" onclick="startScanner()">
                    <i class="fas fa-camera"></i> Ler Código
                </button>
                <div id="reader"></div>
                <input type="text" id="codigo_de_barras" class="form-input">
            </div>
            <div>
                <label>Data de Compra</label>
                <input type="date" id="data_compra" class="form-input">
            </div>
            <div>
                <label>Marca</label>
                <input type="text" id="marca" class="form-input">
            </div>
            <div>
                <label>SKU / Código Interno</label>
                <input type="text" id="sku" class="form-input">
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" id="categoria_prod" class="form-input">
            </div>
            <div>
                <label>Fornecedor (Entidade)</label>
                <select id="entidade_id" class="form-input">
                    <option value="">Carregando fornecedores...</option>
                </select>
            </div>
            <div>
                <label>Data de Vencimento</label>
                <input type="date" id="data_vencimento" class="form-input">
            </div>
        </div>

        <div class="section-title">Imagem do Produto</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Foto do Produto (Câmera ou Arquivo)</label>
                <input type="file" id="foto_arquivo" accept="image/*" capture="environment" class="form-input" onchange="processarImagem(this)">
                <input type="hidden" id="imagem_url">
                <div id="preview-container" style="margin-top: 10px; display: none; text-align: center;">
                    <img id="img-preview" src="" style="max-width: 120px; border-radius: 8px; border: 2px solid #3ecf8e; margin: auto;">
                    <button type="button" onclick="removerFoto()" style="color: #ef4444; font-size: 11px; margin-top: 5px;">Remover Foto</button>
                </div>
            </div>
        </div>

        <div class="section-title">Descrição e Detalhes</div>
        <div style="margin-bottom: 20px;">
            <textarea id="descricao" class="form-input" rows="3" placeholder="Informações adicionais..."></textarea>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Custo (R$)</label><input type="number" id="preco_custo" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Venda (R$) *</label><input type="number" id="preco_venda" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Estoque Atual *</label><input type="number" id="estoque_atual" class="form-input" value="0"></div>
            <div><label>Estoque Mínimo</label><input type="number" id="estoque_minimo" class="form-input" value="5"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <label><i class="fas fa-search"></i> BUSCA INTELIGENTE</label>
        <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Buscar por Nome, SKU, Código ou Marca...">
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Foto / Código</th>
                    <th>Produto / Marca</th>
                    <th>Datas (Compra/Venc.)</th>
                    <th>Venda</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>
<script>

    // Configuração do Supabase (Mantenha suas chaves conforme o arquivo original)
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
window.supabaseClient = _supabase;

let html5QrCode;

// --- 1. AUTENTICAÇÃO ---
async function checarAutenticacao() {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error || !session) window.location.href = "login.html";
}

// --- 2. PROCESSAMENTO DE IMAGEM (COMPRESSÃO E BASE64) ---
function processarImagem(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400; // Tamanho ideal para mobile
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_WIDTH) {
                    width *= MAX_WIDTH / height;
                    height = MAX_WIDTH;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Comprime para JPEG com 60% de qualidade
            const base64 = canvas.toDataURL('image/jpeg', 0.6);
            
            document.getElementById('imagem_url').value = base64;
            document.getElementById('img-preview').src = base64;
            document.getElementById('preview-container').style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removerFoto() {
    document.getElementById('foto_arquivo').value = "";
    document.getElementById('imagem_url').value = "";
    document.getElementById('preview-container').style.display = 'none';
}

// --- 3. LEITOR DE CÓDIGO DE BARRAS ---
function startScanner() {
    const readerDiv = document.getElementById('reader');
    readerDiv.style.display = 'block';
    
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            document.getElementById('codigo_de_barras').value = decodedText;
            stopScanner();
        },
        (errorMessage) => { /* Silencioso */ }
    ).catch(err => alert("Erro ao acessar câmera: " + err));
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('reader').style.display = 'none';
        });
    }
}

// --- 4. CARREGAR FORNECEDORES (CORRIGIDO) ---
async function carregarFornecedores() {
    try {
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo');
        
        const select = document.getElementById('entidade_id');
        
        if (error) throw error;

        if (data && data.length > 0) {
            select.innerHTML = '<option value="">Selecione um fornecedor...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        } else {
            select.innerHTML = '<option value="">Nenhum fornecedor cadastrado</option>';
        }
    } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
    }
}

// --- 5. SALVAR PRODUTO (CORREÇÃO DE UUID VAZIO) ---
async function handleSaveProduto() {
    const id = document.getElementById('edit-id').value;
    const campos = [
        'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
        'entidade_id', 'data_vencimento', 'data_compra', 'descricao',
        'preco_custo', 'preco_venda', 'estoque_atual', 'estoque_minimo', 'imagem_url'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) {
            const valor = el.value.trim();
            if (valor !== "") {
                payload[c] = (el.type === 'number') ? parseFloat(valor || 0) : valor;
            }
        }
    });

    // Remove entidade_id se estiver vazio para evitar erro de UUID no Supabase
    if (!payload.entidade_id || payload.entidade_id === "") {
        delete payload.entidade_id;
    }

    let result;
    if (id) {
        result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('produtos').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Produto atualizado!" : "Produto cadastrado!");
        resetForm();
        loadProdutos();
    }
}

// --- 6. LISTAGEM E TABELA ---
async function loadProdutos() {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').order('nome', { ascending: true });
    if (error) return console.error(error);
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.getElementById('produtos-list');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td>
                ${p.imagem_url ? `<img src="${p.imagem_url}" style="width:45px; height:45px; object-fit:cover; border-radius:6px; margin-bottom:5px;">` : '<i class="fas fa-image" style="font-size:24px; color:#ddd"></i>'}
                <br><span class="tag">${p.codigo_de_barras || 'S/ EAN'}</span>
            </td>
            <td><strong>${p.nome}</strong><br><small>${p.marca || '-'}</small></td>
            <td><small>Comp: ${p.data_compra || '-'}<br>Venc: ${p.data_vencimento || '-'}</small></td>
            <td>R$ ${parseFloat(p.preco_venda).toFixed(2)}</td>
            <td class="${p.estoque_atual <= p.estoque_minimo ? 'low-stock font-bold' : ''}">
                ${p.estoque_atual} ${p.estoque_atual <= p.estoque_minimo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
            </td>
            <td>
                <button class="btn-edit" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// --- 7. UTILITÁRIOS ---
async function editProduto(id) {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').eq('id', id).single();
    if (error) return alert("Erro ao carregar dados.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.value = data[key] || (el.type === 'number' ? '0' : '');
            if (key === 'imagem_url' && data[key]) {
                document.getElementById('img-preview').src = data[key];
                document.getElementById('preview-container').style.display = 'block';
            }
        }
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome;
    document.getElementById('btn-save').innerText = "Atualizar Produto";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduto(id) {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
    if (!error) loadProdutos();
}

function filtrarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#produtos-list tr');
    linhas.forEach(linha => {
        linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
}

function resetForm() {
    // Limpa campos de input, select e textarea
    document.querySelectorAll('input, select, textarea').forEach(c => {
        if (c.id === 'estoque_minimo') c.value = '5';
        else if (c.type === 'number') c.value = '0.00';
        else c.value = '';
    });
    
    document.getElementById('edit-id').value = '';
    document.getElementById('imagem_url').value = '';
    document.getElementById('img-preview').src = '';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('form-title').innerText = "Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = "none";
}

async function sairDaConta() {
    if(confirm("Sair do sistema?")) {
        await window.supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    checarAutenticacao();
    loadProdutos();
    carregarFornecedores();
});
    
</script>
</body>
</html>
```