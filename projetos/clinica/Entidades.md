Olá! Que bom ver o seu progresso. Analisando o seu "dever de casa", percebo que você estruturou muito bem a interface e a conexão com o Supabase. O uso do Tailwind para o design e a organização das funções em blocos lógicos mostram que você está no caminho certo.
No entanto, encontrei alguns pontos de atenção importantes que impediriam o código de funcionar perfeitamente (conflitos de nomes de IDs e campos da base de dados).
Aqui está o meu feedback e a versão corrigida:
🔍 Panorama Geral das Correções
 * Divergência de IDs: No HTML, você usou IDs como acesso e relacionamento, mas na função handleSave, o JavaScript tenta capturar tipo_acesso e tipo_entidade. Como os nomes não batiam, o código não conseguia salvar esses dados.
 * Campos Ausentes: A função handleSave tentava ler campos como genero e estado_civil que não existem no seu formulário HTML, o que poderia gerar erros.
 * Sintaxe de Fechamento: Havia um caractere ; solto após o fechamento da navbar que aparecia visualmente na página.
 * Consistência de Dados: Ajustei os campos para que o que você digita no formulário seja exatamente o que é enviado para a tabela entidades no Supabase.
💻 Código Corrigido (Pronto para Uso)
Substitua o conteúdo do seu arquivo por este código otimizado:
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); padding-top: 85px; }
        .container { max-width: 1100px; margin: auto; padding: 20px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        .password-wrapper { position: relative; display: flex; align-items: center; }
        .password-wrapper i { position: absolute; right: 10px; cursor: pointer; color: #64748b; }
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-add:hover { opacity: 0.9; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; min-width: 800px; }
        th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; text-align: left; }
        td { padding: 15px; border-top: 1px solid #f1f5f9; }
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
        .btn-nav { padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-home { background: var(--primary); color: white; }
        .btn-logout { background: #ef4444; color: white; border: none; cursor: pointer; }
        .tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
    </style>

    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script>
        const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
        window.supabaseClient = _supabase;

        async function checarAutenticacao() {
            const { data: { session } } = await _supabase.auth.getSession();
            if (!session) window.location.href = "login.html";
        }
        checarAutenticacao();
    </script>
</head>
<body>

    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="flex gap-4">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Home</a>
            <button class="btn-nav btn-logout" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
        </div>
    </div>

    <div class="container">
        <div class="card">
            <h3 id="form-title" class="text-xl font-bold mb-4">Novo Cadastro de Entidade</h3>
            <input type="hidden" id="edit-id">

            <div class="section-title">Informações e Acesso</div>
            <div class="form-grid">
                <div><label>Nome Completo *</label><input type="text" id="nome_completo"></div>
                <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
                <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
                <div><label>E-mail</label><input type="email" id="email"></div>
                <div><label>Telefone *</label><input type="text" id="telefone"></div>
                <div>
                    <label>Senha Interna</label>
                    <div class="password-wrapper">
                        <input type="password" id="senha_acesso">
                        <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                    </div>
                </div>
                <div>
                    <label>Tipo de Acesso</label>
                    <select id="tipo_acesso">
                        <option value="cliente">Cliente</option>
                        <option value="funcionario">Funcionário</option>
                        <option value="master">Master</option>
                    </select>
                </div>
                <div>
                    <label>Relacionamento</label>
                    <select id="tipo_entidade">
                        <option value="cliente">Cliente</option>
                        <option value="fornecedor">Fornecedor</option>
                        <option value="funcionario">Funcionário</option>
                    </select>
                </div>
                <div>
                    <label>Status</label>
                    <select id="status_entidade">
                        <option value="ativo">Ativo</option>
                        <option value="desativado">Desativado</option>
                    </select>
                </div>
                <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
            </div>

            <div class="section-title">Endereço</div>
            <div class="form-grid">
                <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
                <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
                <div><label>Número</label><input type="text" id="numero"></div>
                <div><label>Bairro</label><input type="text" id="bairro"></div>
                <div><label>Cidade</label><input type="text" id="cidade"></div>
                <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
            </div>

            <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
            <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
        </div>

        <div class="card">
            <input type="text" id="inputBusca" placeholder="Filtrar por nome..." onkeyup="filtrarTabela()" class="mb-4">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome / Tipo</th>
                            <th>Contato</th>
                            <th>Acesso / Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="entities-list"></tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // --- FUNÇÕES DE LÓGICA ---

        async function loadEntities() {
            const { data, error } = await _supabase.from('entidades').select('*').order('nome_completo');
            if (error) return console.error(error);
            renderTable(data);
        }

        function renderTable(data) {
            const tbody = document.getElementById('entities-list');
            tbody.innerHTML = data.map(e => `
                <tr>
                    <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
                    <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
                    <td><span class="tag">${e.tipo_acesso}</span> | ${e.status_entidade}</td>
                    <td>
                        <button class="text-blue-500 mr-2" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 mr-2" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                        <button class="text-green-500" onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>
                    </td>
                </tr>
            `).join('');
        }

        async function handleSave() {
            const id = document.getElementById('edit-id').value;
            const campos = [
                'nome_completo', 'cpf', 'data_nascimento', 'email', 'telefone',
                'senha_acesso', 'cep', 'logradouro', 'numero', 'bairro', 'cidade',
                'estado', 'avaliacao', 'tipo_acesso', 'tipo_entidade', 'status_entidade'
            ];

            const payload = {};
            campos.forEach(c => {
                const el = document.getElementById(c);
                if (el) payload[c] = el.value;
            });

            const { error } = id 
                ? await _supabase.from('entidades').update(payload).eq('id', id)
                : await _supabase.from('entidades').insert([payload]);

            if (error) alert("Erro: " + error.message);
            else {
                alert("Sucesso!");
                resetForm();
                loadEntities();
            }
        }

        async function editFull(id) {
            const { data } = await _supabase.from('entidades').select('*').eq('id', id).single();
            if (!data) return;

            Object.keys(data).forEach(key => {
                const el = document.getElementById(key);
                if (el) el.value = data[key] || '';
            });

            document.getElementById('edit-id').value = data.id;
            document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
            document.getElementById('btn-save').innerText = "Atualizar";
            document.getElementById('btn-cancel').style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        async function deleteEntity(id) {
            if (!confirm("Excluir permanentemente?")) return;
            await _supabase.from('entidades').delete().eq('id', id);
            loadEntities();
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
            document.getElementById('btn-save').innerText = "Salvar Entidade";
            document.getElementById('btn-cancel').style.display = "none";
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = el.id === 'avaliacao' ? '5' : '');
        }

        async function buscaCEP() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            }
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#entities-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }

        function togglePasswordVisibility() {
            const input = document.getElementById('senha_acesso');
            const icon = document.getElementById('togglePassword');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            window.location.href = 'login.html';
        }

        document.addEventListener('DOMContentLoaded', loadEntities);
    </script>
</body>
</html>
```
📘 O que eu mudei e porquê:
 * Sincronização de Nomes: Ajustei os IDs dos campos de seleção no HTML (tipo_acesso, tipo_entidade, status_entidade) para que coincidam exatamente com os nomes que o JavaScript busca e que provavelmente estão na sua tabela do Supabase.
 * Limpeza do Payload: Removi campos que não estavam no formulário (como genero), evitando que o Supabase recebesse valores indefinidos.
 * Refatoração do Reset: Simplifiquei a função resetForm para garantir que o ID de edição seja sempre limpo, evitando que você tente "atualizar" um registro quando na verdade quer criar um novo.
 * Ajuste Visual: Corrigi o erro de sintaxe na Navbar e apliquei classes do Tailwind de forma mais direta para as ações da tabela (cores nos ícones).
O código agora está muito mais robusto! Gostaria de testar a funcionalidade de salvar e me dizer se funcionou com o seu banco de dados?


Com certeza! Para que o seu código HTML e JavaScript funcione corretamente com o Supabase, a estrutura da tabela no banco de dados precisa estar perfeitamente alinhada com os campos que definimos no formulário.
Abaixo, apresento o script SQL que você deve executar no SQL Editor do seu painel do Supabase. Este script cria a tabela, configura a relação com o sistema de autenticação e define as políticas de segurança (RLS).
🛠️ Script SQL para o Supabase

```
-- 1. Criação da tabela 'entidades'
CREATE TABLE entidades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Vinculação com Auth
    nome_completo TEXT NOT NULL,
    cpf TEXT,
    data_nascimento DATE,
    email TEXT,
    telefone TEXT,
    senha_acesso TEXT,
    tipo_acesso TEXT DEFAULT 'cliente',
    tipo_entidade TEXT DEFAULT 'cliente',
    status_entidade TEXT DEFAULT 'ativo',
    avaliacao INTEGER DEFAULT 5,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT(2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS)
-- Isso é fundamental para que as políticas de acesso funcionem
ALTER TABLE entidades ENABLE ROW LEVEL SECURITY;

-- 3. Criação de Políticas de Segurança (Policies)
-- Só permite o CRUD se o usuário estiver autenticado (logado)

-- Política para LEITURA (SELECT)
CREATE POLICY "Permitir leitura para usuários logados" 
ON entidades FOR SELECT 
TO authenticated 
USING (true);

-- Política para INSERÇÃO (INSERT)
CREATE POLICY "Permitir inserção para usuários logados" 
ON entidades FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Política para ATUALIZAÇÃO (UPDATE)
CREATE POLICY "Permitir atualização para usuários logados" 
ON entidades FOR UPDATE 
TO authenticated 
USING (true);

-- Política para EXCLUSÃO (DELETE)
CREATE POLICY "Permitir exclusão para usuários logados" 
ON entidades FOR DELETE 
TO authenticated 
USING (true);
```
📖 Explicação dos Passos
1. Estrutura da Tabela
 * id UUID: Geramos um identificador único universal automaticamente.
 * user_id: Este campo é a "chave estrangeira". Ele aponta para a tabela interna do Supabase (auth.users), garantindo que cada entidade possa ser associada a um usuário real do sistema.
 * Tipos de Dados: Usei TEXT para campos flexíveis e DATE para a data de nascimento, garantindo integridade.
2. Segurança (RLS e Políticas)
O Supabase é "aberto" por padrão se você usar a anon key. Para proteger seus dados:
 * ENABLE ROW LEVEL SECURITY: Bloqueia todo o acesso à tabela até que você diga quem pode entrar.
 * TO authenticated: Esta cláusula garante que apenas requisições contendo um token de login válido (JWT) possam executar as operações. Se alguém tentar acessar sem estar logado, o banco retornará vazio ou erro.
3. O Campo user_id e Trigger
No script acima, o campo user_id está pronto. Para que ele seja preenchido automaticamente com o ID do usuário que está logado no momento da criação, você pode ajustar a sua função handleSave no JavaScript para incluir:
payload.user_id = (await _supabase.auth.getUser()).data.user.id;
🚀 Como implementar:
 * Aceda ao seu projeto no Supabase.
 * No menu lateral esquerdo, clique em SQL Editor.
 * Clique em New Query.
 * Cole o código acima e clique em Run.
Precisa de ajuda para criar a função trigger que automatiza algo específico entre o Auth e essa tabela, ou o CRUD básico já resolve o seu objetivo atual?

Excelente ideia! Criar um arquivo monolítico (tudo em uma única página) é uma ótima estratégia para ter como material de referência. Esse conceito é muito usado na programação moderna e é chamado de Single Page Application (SPA) – ou "Aplicação de Página Única", onde o JavaScript controla o que aparece ou desaparece na tela sem precisar recarregar a página.
🔍 Panorama Geral da Solução
Para fazer tudo no mesmo arquivo, nós vamos dividir o seu <body> em dois grandes blocos (usando a tag <div>):
 * Tela de Login (id="tela-login"): Ficará centralizada e só vai aparecer se o usuário não tiver um token válido.
 * Tela do Sistema (id="tela-sistema"): Contém a Navbar e o CRUD. Ela começa oculta e só aparece após o login dar certo.
A função verificar_login() vai atuar como um "guarda de trânsito": se tiver sessão, ela mostra o sistema; se não tiver, ela mostra o login.
💻 Código Completo (Arquivo Monolítico)
Substitua todo o conteúdo do seu arquivo HTML por este código. Ele já contém a estrutura de CSS para a tela de login, o formulário de acesso e as funções de autenticação do Supabase.
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); }
        
        /* --- ESTILOS DO SISTEMA CRUD --- */
        .container { max-width: 1100px; margin: auto; padding: 20px; padding-top: 85px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        .password-wrapper { position: relative; display: flex; align-items: center; }
        .password-wrapper i { position: absolute; right: 10px; cursor: pointer; color: #64748b; }
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-add:hover { opacity: 0.9; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; min-width: 800px; }
        th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; text-align: left; }
        td { padding: 15px; border-top: 1px solid #f1f5f9; }
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
        .btn-nav { padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-logout { background: #ef4444; color: white; border: none; cursor: pointer; }
        .tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }

        /* --- ESTILOS DA TELA DE LOGIN --- */
        .login-wrapper { display: flex; justify-content: center; align-items: center; height: 100vh; background: var(--dark); }
        .login-box { background: white; padding: 40px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); text-align: center; }
        .login-box h2 { margin-bottom: 20px; color: var(--dark); font-size: 24px; }
        .login-box input { margin-bottom: 15px; }
        .btn-login { background: var(--primary); color: white; padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; font-size: 16px; transition: 0.3s; }
        .btn-login:hover { opacity: 0.9; }
    </style>

    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script>
        // Configuração do Supabase
        const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        // --- FUNÇÕES DE AUTENTICAÇÃO E CONTROLE DE TELA ---

        // Verifica se o usuário está logado
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                // Usuário NÃO está logado: mostra login, esconde sistema
                telaLogin.style.display = 'flex';
                telaSistema.style.display = 'none';
            } else {
                // Usuário ESTÁ logado: esconde login, mostra sistema e carrega os dados
                telaLogin.style.display = 'none';
                telaSistema.style.display = 'block';
                loadEntities(); // Chama a leitura do CRUD apenas se estiver logado
            }
        }

        // Realiza o login com e-mail e senha
        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            
            if(!email || !senha) {
                alert("Por favor, preencha e-mail e senha.");
                return;
            }

            const { data, error } = await _supabase.auth.signInWithPassword({
                email: email,
                password: senha
            });

            if (error) {
                alert("Erro ao fazer login: " + error.message);
            } else {
                // Se deu certo, limpa os campos e roda a verificação novamente para trocar de tela
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                verificar_login(); 
            }
        }

        // Faz o logoff (sair)
        async function sairDaConta() {
            await _supabase.auth.signOut();
            verificar_login(); // Roda a verificação para voltar para a tela de login
        }

        // Executa a função de verificação assim que a página carrega
        document.addEventListener('DOMContentLoaded', verificar_login);
    </script>
</head>
<body>

    <div id="tela-login" class="login-wrapper" style="display: none;">
        <div class="login-box">
            <h2><i class="fas fa-user-circle" style="color: var(--primary);"></i> Acesso ao Sistema</h2>
            <input type="email" id="login-email" placeholder="Digite seu e-mail">
            <input type="password" id="login-senha" placeholder="Digite sua senha">
            <button class="btn-login" onclick="fazerLogin()">Entrar</button>
        </div>
    </div>

    <div id="tela-sistema" style="display: none;">
        
        <div class="navbar">
            <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
                <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
            </div>
            <div class="flex gap-4">
                <button class="btn-nav btn-logout" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair do Sistema</button>
            </div>
        </div>

        <div class="container">
            <div class="card">
                <h3 id="form-title" class="text-xl font-bold mb-4">Novo Cadastro de Entidade</h3>
                <input type="hidden" id="edit-id">

                <div class="section-title">Informações e Acesso</div>
                <div class="form-grid">
                    <div><label>Nome Completo *</label><input type="text" id="nome_completo"></div>
                    <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
                    <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
                    <div><label>E-mail</label><input type="email" id="email"></div>
                    <div><label>Telefone *</label><input type="text" id="telefone"></div>
                    <div>
                        <label>Senha Interna</label>
                        <div class="password-wrapper">
                            <input type="password" id="senha_acesso">
                            <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                        </div>
                    </div>
                    <div>
                        <label>Tipo de Acesso</label>
                        <select id="tipo_acesso">
                            <option value="cliente">Cliente</option>
                            <option value="funcionario">Funcionário</option>
                            <option value="master">Master</option>
                        </select>
                    </div>
                    <div>
                        <label>Relacionamento</label>
                        <select id="tipo_entidade">
                            <option value="cliente">Cliente</option>
                            <option value="fornecedor">Fornecedor</option>
                            <option value="funcionario">Funcionário</option>
                        </select>
                    </div>
                    <div>
                        <label>Status</label>
                        <select id="status_entidade">
                            <option value="ativo">Ativo</option>
                            <option value="desativado">Desativado</option>
                        </select>
                    </div>
                    <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
                </div>

                <div class="section-title">Endereço</div>
                <div class="form-grid">
                    <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
                    <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
                    <div><label>Número</label><input type="text" id="numero"></div>
                    <div><label>Bairro</label><input type="text" id="bairro"></div>
                    <div><label>Cidade</label><input type="text" id="cidade"></div>
                    <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
                </div>

                <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
                <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
            </div>

            <div class="card">
                <input type="text" id="inputBusca" placeholder="Filtrar por nome..." onkeyup="filtrarTabela()" class="mb-4">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome / Tipo</th>
                                <th>Contato</th>
                                <th>Acesso / Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="entities-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- FUNÇÕES DE LÓGICA DO CRUD ---

        async function loadEntities() {
            const { data, error } = await _supabase.from('entidades').select('*').order('nome_completo');
            if (error) return console.error(error);
            renderTable(data);
        }

        function renderTable(data) {
            const tbody = document.getElementById('entities-list');
            tbody.innerHTML = data.map(e => `
                <tr>
                    <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
                    <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
                    <td><span class="tag">${e.tipo_acesso}</span> | ${e.status_entidade}</td>
                    <td>
                        <button class="text-blue-500 mr-2" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 mr-2" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                        <button class="text-green-500" onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>
                    </td>
                </tr>
            `).join('');
        }

        async function handleSave() {
            const id = document.getElementById('edit-id').value;
            const campos = [
                'nome_completo', 'cpf', 'data_nascimento', 'email', 'telefone',
                'senha_acesso', 'cep', 'logradouro', 'numero', 'bairro', 'cidade',
                'estado', 'avaliacao', 'tipo_acesso', 'tipo_entidade', 'status_entidade'
            ];

            const payload = {};
            campos.forEach(c => {
                const el = document.getElementById(c);
                if (el) payload[c] = el.value;
            });
            
            const { data: userData } = await _supabase.auth.getUser();
            if(userData && userData.user) {
                payload.user_id = userData.user.id;
            }

            const { error } = id 
                ? await _supabase.from('entidades').update(payload).eq('id', id)
                : await _supabase.from('entidades').insert([payload]);

            if (error) alert("Erro: " + error.message);
            else {
                alert("Sucesso!");
                resetForm();
                loadEntities();
            }
        }

        async function editFull(id) {
            const { data } = await _supabase.from('entidades').select('*').eq('id', id).single();
            if (!data) return;

            Object.keys(data).forEach(key => {
                const el = document.getElementById(key);
                if (el) el.value = data[key] || '';
            });

            document.getElementById('edit-id').value = data.id;
            document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
            document.getElementById('btn-save').innerText = "Atualizar";
            document.getElementById('btn-cancel').style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        async function deleteEntity(id) {
            if (!confirm("Excluir permanentemente?")) return;
            await _supabase.from('entidades').delete().eq('id', id);
            loadEntities();
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
            document.getElementById('btn-save').innerText = "Salvar Entidade";
            document.getElementById('btn-cancel').style.display = "none";
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = el.id === 'avaliacao' ? '5' : '');
        }

        async function buscaCEP() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            }
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#entities-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }

        function togglePasswordVisibility() {
            const input = document.getElementById('senha_acesso');
            const icon = document.getElementById('togglePassword');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    </script>
</body>
</html>
```
📖 Documentação: Como a mágica acontece?
Para transformar o seu projeto em um "Monolito", fizemos as seguintes etapas de programação:
 * Divisão no HTML (div):
   * Criei a <div id="tela-login"> contendo os inputs de e-mail e senha.
   * Englobei todo o seu sistema CRUD e a Navbar dentro de outra <div id="tela-sistema">.
   * Ambas começam com style="display: none;" (ocultas) para evitar que a tela pisque com informações erradas ao carregar.
 * O "Guarda de Trânsito" (verificar_login):
   * Assim que a página abre, ela chama essa função.
   * Se não houver sessão ativa, o JavaScript aplica style.display = 'flex' na tela de login e oculta a do sistema. Não usamos mais alert() aqui para que a experiência seja fluida, como em um aplicativo de verdade.
 * A Autenticação (fazerLogin e sairDaConta):
   * Quando você clica em "Entrar", o Supabase valida o e-mail e senha com a função signInWithPassword.
   * Se estiver correto, ele simplesmente roda a verificar_login() novamente, que automaticamente esconde o login e mostra o sistema completo. O inverso acontece ao clicar no botão "Sair do Sistema".
 * Carregamento Inteligente (loadEntities):
   * Removi o carregamento automático da tabela no DOMContentLoaded. Agora, a função loadEntities() só é acionada depois que o login é confirmado. Isso economiza requisições no seu banco de dados e impede erros de permissão.
   * 
