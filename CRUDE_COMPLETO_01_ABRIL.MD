monolito
Olá! Que excelente iniciativa! Fico muito feliz em ser o teu Parceiro de Programação neste projeto do ERP ABP.
Como combinámos, o meu objetivo é ajudar-te a escrever, corrigir e entender o teu código de forma simples e didática.
Vamos analisar a segurança do teu código para o GitHub e, em seguida, resolver a questão do link no título.
1. Análise de Segurança do Código (Para Hospedagem no GitHub)
Como vais hospedar este projeto no GitHub (provavelmente usando o GitHub Pages, por ser um ficheiro HTML estático), o teu código ficará público. Analisei o teu código e o teu SQL e encontrei alguns pontos de atenção importantes:
A. Chaves do Supabase visíveis (Normal, mas requer cuidado)
Tu deixaste a supabaseUrl e a supabaseKey (Anon Key) no código HTML.
 * A boa notícia: No ecossistema do Supabase, a "Anon Key" foi desenhada para ser pública em aplicações frontend (como a tua). Não há problema em ir para o GitHub.
 * O perigo: Como a chave é pública, a segurança dos teus dados depende 100% das tuas políticas RLS (Row Level Security) lá no banco de dados.
B. Falha Crítica de Segurança no RLS (Atenção aqui!)
No teu código SQL, as tuas políticas estão assim:
CREATE POLICY "Permitir leitura para usuários logados" 
ON entidades FOR SELECT TO authenticated USING (true);

 * O que isso faz: A regra USING (true) diz ao banco de dados: "Se a pessoa estiver logada (authenticated), ela pode ler/editar/apagar TODOS os dados da tabela".
 * O problema: Se um utilizador mal-intencionado criar uma conta no teu sistema, ele consegue ver e apagar os dados de todos os outros clientes e funcionários, pois a regra permite.
 * Como corrigir (Exemplo): Se cada utilizador só deve ver e editar os seus próprios dados, deves mudar o true para auth.uid() = user_id. Assim, o banco compara se o ID de quem está logado é o mesmo dono do registo.
-- Exemplo de correção para cada pessoa ver apenas os seus dados
CREATE POLICY "Ver apenas seus dados" 
ON entidades FOR SELECT TO authenticated USING (auth.uid() = user_id);

(Nota: Se o teu ERP é para uma empresa onde os funcionários precisam de ver todos os clientes, avisa-me para criarmos uma regra de segurança baseada em "Cargos/Roles").
C. Senha de Acesso no Banco de Dados
Tens um campo chamado senha_acesso na tabela entidades.
 * O problema: Guardar senhas diretamente numa tabela, em texto simples, é uma prática muito perigosa. Se alguém aceder ao banco, lê todas as senhas.
 * A solução: O Supabase já faz a gestão de senhas de forma criptografada e super segura através do Supabase Auth (que tu já estás a usar para fazer o login!). Recomendo não guardares senhas nessa tabela.
2. Transformar "ERP ABP" num Link para o Index
Para fazer o título clicar e ir para index.htm, vamos usar a tag HTML <a> (que significa anchor, ou âncora, usada para criar links).
Passo a passo:
 * Procura a secção <div class="navbar"> no teu código.
 * Troca a <div> que contém o texto "ERP ABP" pela tag <a>.
Substitui este trecho do teu código:
<div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
    <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
</div>

Por este novo código atualizado:
<a href="index.htm" style="font-weight: bold; color: #0f172a; font-size: 1.2rem; text-decoration: none; cursor: pointer;">
    <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
</a>

O que mudou?
 * Trocámos <div ...> por <a href="index.htm" ...>. O atributo href diz para onde o utilizador vai quando clicar.
 * Adicionei text-decoration: none; para evitar que o navegador coloque aquele sublinhado feio debaixo do link.
 * Adicionei cursor: pointer; para garantir que o rato vira uma "mãozinha" ao passar por cima.
Como queres seguir com a questão da segurança (RLS)? Queres que os utilizadores deste ERP vejam todos os registos (como uma equipa a trabalhar junta) ou queres que cada um veja apenas o seu próprio cadastro? Se me explicares como a tua empresa vai usar o sistema, eu crio as regras de segurança perfeitas para ti!

Olá, parceiro! É excelente ver o teu projeto a evoluir. Transformar o teu sistema para lidar com diferentes níveis de acesso e adicionar armazenamento de ficheiros são passos fundamentais para criar um ERP profissional.
Vou ajudar-te com cada um dos teus pontos, explicando a lógica e fornecendo o código necessário. Vamos por partes!
1 e 2. Gestão de Acessos com Cargos (Roles / RLS)
Para gerir quem pode ver ou editar o quê (Master, Funcionário, Cliente, Fornecedor), precisamos usar as Políticas de Segurança (RLS) do Supabase. Como a informação do cargo (tipo de acesso) está guardada na tua tabela entidades, o banco de dados precisa de ler essa tabela para saber quem é o utilizador logado.
Passo a Passo da Implementação no Banco de Dados (SQL):
Vai ao teu painel do Supabase, abre o "SQL Editor" e executa o seguinte código.
-- 1. Primeiro, criamos uma função segura que descobre qual é o cargo do utilizador logado
CREATE OR REPLACE FUNCTION auth.get_user_role() 
RETURNS TEXT AS $$
  SELECT tipo_acesso FROM public.entidades WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Limpamos as políticas antigas (caso existam) para não dar conflito
DROP POLICY IF EXISTS "Permitir leitura para usuários logados" ON entidades;
DROP POLICY IF EXISTS "Permitir inserção para usuários logados" ON entidades;
DROP POLICY IF EXISTS "Permitir atualização para usuários logados" ON entidades;
DROP POLICY IF EXISTS "Permitir exclusão para usuários logados" ON entidades;

-- 3. Criamos as novas regras baseadas nos cargos:

-- REGRA: MASTER (Pode fazer tudo: Ler, Inserir, Atualizar e Apagar)
CREATE POLICY "Master faz tudo" ON entidades 
FOR ALL TO authenticated 
USING (auth.get_user_role() = 'master');

-- REGRA: FUNCIONÁRIO (Pode ler tudo, mas só pode inserir/atualizar. Não pode apagar)
CREATE POLICY "Funcionario le e edita" ON entidades 
FOR SELECT TO authenticated 
USING (auth.get_user_role() = 'funcionario');

CREATE POLICY "Funcionario insere" ON entidades 
FOR INSERT TO authenticated 
WITH CHECK (auth.get_user_role() = 'funcionario');

CREATE POLICY "Funcionario atualiza" ON entidades 
FOR UPDATE TO authenticated 
USING (auth.get_user_role() = 'funcionario');

-- REGRA: CLIENTE / FORNECEDOR (Só podem ver e editar os SEUS PRÓPRIOS dados)
CREATE POLICY "Pessoa ve os proprios dados" ON entidades 
FOR SELECT TO authenticated 
USING (user_id = auth.uid());

CREATE POLICY "Pessoa edita os proprios dados" ON entidades 
FOR UPDATE TO authenticated 
USING (user_id = auth.uid());

 * Como funciona: Quando alguém tenta ver a lista de entidades, o Supabase roda a função auth.get_user_role(). Se responder 'master' ou 'funcionario', mostra tudo. Se responder 'cliente', a outra política entra em ação e ele só vê a linha onde o user_id é igual ao ID dele.
3. O Conceito de Sistema SaaS / Multilocatário (Multi-tenant)
Se a tua ideia é vender o teu ERP para outras empresas usarem (cada uma com os seus próprios funcionários, clientes e dados separados), tu estás a construir um sistema SaaS (Software as a Service).
Para fazer isso, a lógica principal é:
 * Tabela Empresa: Tens de criar uma tabela chamada empresas (ou workspaces).
 * Vínculo: Todas as outras tabelas (entidades, produtos, vendas) precisam de ter uma coluna chamada empresa_id.
 * Segurança SaaS: No RLS (como fizemos acima), tu adicionarias uma regra dizendo: "O utilizador só pode ver os dados onde o empresa_id do dado for igual ao empresa_id do utilizador logado".
   Isso isola completamente os dados de um cliente dos dados de outro, criando "ambientes" separados.
4. Salvar a Foto do Utilizador no Storage
O teu HTML já tem o botão e o input escondido (input_foto) para escolher a imagem. Agora precisamos pegar nessa imagem e enviá-la para o "Storage" (Armazenamento) do Supabase antes de salvar os dados no banco.
Passo 1: Criar o Bucket no Supabase
 * Vai ao teu painel do Supabase e clica em Storage.
 * Clica em "New Bucket".
 * Dá o nome de avatares e marca a opção "Public bucket" (importante para que a foto possa aparecer na tela depois). Clica em Save.
Passo 2: Atualizar o teu JavaScript
Aqui está a tua função cadastrarEntidade modificada para suportar o envio da imagem. Substitui a função antiga no teu arquivo HTML por esta:
// Função de cadastro utilizando Insert + Storage
async function cadastrarEntidade() {
    // UI Loading State (Muda o botão para estado de carregamento)
    btnSalvar.disabled = true;
    btnSalvarText.classList.add('hidden');
    btnSalvarLoader.classList.remove('hidden');

    try {
        let fotoUrl = null; // Variável para guardar o link da foto
        const inputFoto = document.getElementById('input_foto');
        
        // 1. VERIFICA SE O UTILIZADOR ESCOLHEU UMA FOTO
        if (inputFoto.files && inputFoto.files.length > 0) {
            const file = inputFoto.files[0];
            const fileExt = file.name.split('.').pop(); // Pega a extensão (.jpg, .png)
            const fileName = `${Date.now()}_${Math.random()}.${fileExt}`; // Cria um nome único
            
            // 2. FAZ O UPLOAD PARA O STORAGE DO SUPABASE (Bucket 'avatares')
            const { data: uploadData, error: uploadError } = await window.supabaseClient.storage
                .from('avatares')
                .upload(`public/${fileName}`, file);

            if (uploadError) throw uploadError;

            // 3. PEGA O LINK PÚBLICO DA IMAGEM
            const { data: publicUrlData } = window.supabaseClient.storage
                .from('avatares')
                .getPublicUrl(`public/${fileName}`);

            fotoUrl = publicUrlData.publicUrl; // Guarda o link na variável
        }

        // 4. PREPARA OS DADOS PARA O BANCO DE DADOS
        const dadosParaSalvar = {
            tipo_entidade: document.querySelector('input[name="tipo_entidade"]:checked').value,
            nome_completo: document.getElementById('input_nome').value,
            cpf: document.getElementById('input_cpf').value,
            data_nascimento: document.getElementById('input_nascimento').value || null, // Se vazio, manda null
            email: document.getElementById('input_email').value,
            telefone: document.getElementById('input_telefone').value,
            cep: document.getElementById('input_cep').value,
            logradouro: document.getElementById('input_logradouro').value,
            numero: document.getElementById('input_numero').value,
            bairro: document.getElementById('input_bairro').value,
            cidade: document.getElementById('input_cidade').value,
            estado: document.getElementById('input_uf').value, // Usei "estado" pois era o nome no teu SQL original
            // Salvando o link da foto no banco de dados (precisas criar a coluna 'foto_url' na tabela)
            foto_url: fotoUrl 
            
            // Nota: As permissões detalhadas (permissao_ler, etc) foram removidas daqui pois
            // agora estamos a gerir o acesso através do Cargo (tipo_acesso) via RLS.
        };

        // 5. INSERE OS DADOS NA TABELA 'entidades'
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .insert([dadosParaSalvar]);

        if (error) throw error;

        alert('Entidade cadastrada com sucesso!');
        window.location.href = 'listar_entidades.html';

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Ocorreu um erro ao realizar o cadastro: ' + error.message);
    } finally {
        // Restaura o botão
        btnSalvar.disabled = false;
        btnSalvarText.classList.remove('hidden');
        btnSalvarLoader.classList.add('hidden');
    }
}

Não te esqueças: Precisas de ir ao SQL Editor do Supabase e adicionar a coluna da foto na tua tabela: ALTER TABLE entidades ADD COLUMN foto_url TEXT;
O conceito de SaaS (ponto 3) é o que chamamos de mudança de arquitetura, e exige planear bem o banco de dados antes de programar as telas. Queres focar-te primeiro em terminar este ERP para uma única empresa com diferentes tipos de utilizadores, ou preferes que eu te ensine já como desenhar o banco de dados para suportar múltiplas empresas (SaaS)?
