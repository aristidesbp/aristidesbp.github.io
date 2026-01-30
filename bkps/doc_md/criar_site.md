# CRIAÇAÕ DE SIITES
## ROMPT MODELO PARA CRIAR SISTEMAS
```
* Crie um ERP universal com o nome "UniversoCorp", focado em uma experiência de usuário limpa e moderna. Utilize o tom de cor "blue-600" (#2563EB) como primário, com um fundo geral #FFFFFF e a fonte principal será a Inter. O público-alvo são pequenas e médias empresas que buscam centralizar a gestão de seus negócios.
* A tela de login, acessível pela rota raiz "/", terá um layout centrado. Um formulário com título em "text-2xl font-bold text-gray-900" com o texto "Bem-vindo à UniversoCorp". Os campos de input para email e senha usarão componentes Input do Shadcn/UI com placeholder como "Seu email" e "Sua senha", respectivamente, com classes w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500. Abaixo dos campos, haverá um botão Button do Shadcn/UI com texto "Entrar" em bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out. Abaixo deste botão, links para "Cadastro" usando text-blue-600 hover:underline e um botão estilizado para "Entrar com Google" (com um ícone do Google) utilizando flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200. Adicione também um link discreto para "Recuperar senha" com text-sm text-blue-600 hover:underline. A página terá um Skeleton carregando para a interface de login enquanto os dados são processados.
* Em seguida, configure a estrutura de tabelas no Supabase: clientes: id uuid primary key, user_id uuid references auth.users, nome text, cpf text unique, telefone text, email text unique, endereco text, cidade text, estado text, cep text, data_cadastro timestamptz default now() fornecedores: id uuid primary key, user_id uuid references auth.users, nome text, cnpj text unique, telefone text, email text unique, endereco text, cidade text, estado text, cep text, data_cadastro timestamptz default now() funcionarios: id uuid primary key, user_id uuid references auth.users, nome text, cargo text, cpf text unique, telefone text, email text unique, data_admissao date, salario numeric, created_at timestamptz default now() produtos: id uuid primary key, user_id uuid references auth.users, nome text, descricao text, preco_custo numeric, preco_venda numeric, estoque int, unidade_medida varchar(10), created_at timestamptz default now() servicos: id uuid primary key, user_id uuid references auth.users, nome text, descricao text, preco numeric, created_at timestamptz default now()
* Implemente Regras de Segurança de Nível de Linha (RLS) para garantir que cada usuário só acesse e modifique seus próprios dados, permitindo o acesso a auth.users para as referências. Adicione um bucket imagens_produtos no Supabase Storage para armazenar fotos de produtos.
* Para a página de cadastro de clientes em /cadastros/clientes, use um layout responsivo com um título "Cadastro de Clientes" em text-2xl font-bold text-gray-900. Um botão "Novo Cliente" em bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg posicionado no canto superior direito. Ao clicar, um modal Dialog do Shadcn/UI se abre com campos Input do Shadcn para Nome, CPF (com máscara de CPF), Telefone, Email, Endereço, Cidade, Estado e CEP, todos com placeholders descritivos e classes w-full. O modal terá botões "Cancelar" (variant="ghost") e "Salvar" (variant="default" com bg-blue-600 hover:bg-blue-700 text-white). Ao salvar, exiba um toast de sucesso ✅ Cliente salvo com sucesso! ou um toast de erro ❌ Erro ao salvar cliente. Tente novamente.. Em caso de ausência de clientes, mostre um empty state com uma ilustração e o texto "Nenhum cliente cadastrado. Clique em Novo Cliente para começar.".
* Repita uma estrutura similar para as páginas de cadastro de fornecedores (/cadastros/fornecedores), funcionários (/cadastros/funcionarios), produtos (/cadastros/produtos) e serviços (/cadastros/servicos), adaptando os campos de acordo com as tabelas do Supabase e usando os componentes Input e Button do Shadcn/UI. As páginas devem ter um design mobile-first, com breakpoints sm:, md:, lg:, xl: para a responsividade progressiva.
* Crie a página de Ponto de Venda (PDV) em /pdv. Esta página deve apresentar uma interface intuitiva com uma área para adicionar produtos ao carrinho (talvez com busca por código ou nome), exibição do carrinho com totais e um botão para finalizar a venda. Utilize componentes Card do Shadcn para organizar as seções do PDV.
* A página de E-commerce em /ecommerce deve ser um catálogo de produtos com filtros e opções de adicionar ao carrinho, similar a uma loja online básica.
* A agenda em /agenda deve apresentar uma visualização de calendário (pode usar uma biblioteca de calendário React compatível com Tailwind) para agendamentos.
* O chatbot em /chatbot deve ser um componente de chat simples, possivelmente integrando com a Lovable AI para interações mais avançadas.
* Para gerenciar bancos, crie a página /gerenciar/bancos com campos para nome do banco, agência e conta.
* A página de gerenciamento de rede social em /gerenciar/redes-sociais permitirá a conexão e postagem em diferentes plataformas.
* Em /gerenciar/vendas, apresente um dashboard com relatórios de vendas, talvez utilizando gráficos simples.
* A página de gerenciamento de entregas em /gerenciar/entregas listará as entregas pendentes e concluídas, com detalhes como endereço e status.
* Todos os componentes de tabela (em páginas como clientes, fornecedores, etc.) devem ser implementados usando componentes personalizados que se integram com Shadcn/UI e Tailwind CSS, e devem exibir estados de Skeleton durante o carregamento.

Faça um ERP universal tipo SAS completo.

TELA DE LOGIN
* Entrar
* Cadastro 
* Entrar com Google 
* Recuperar senha 

PÁGINAS RESPONSIVA PARA CRIAR
*  Cadastro de clientes
*  Cadastro de fornecedores
*  Cadastro de funcionários 
*  Cadastro de produtos 
*  Cadastro de serviço 
*  PDV 
*  E-commerce 
*  Agenda 
*  Chatbot 
*  Gerenciar bancos 
*  Gerenciar rede social 
*  Gerenciar vendas 
*  Gerenciar entregas

✅ CHECKLIST DE VERIFICAÇÃO:
[X] Todas as cores do Design System foram especificadas? (blue-600, #FFFFFF, Inter)
[X] Os textos de botões, placeholders e toasts estão literais?
[X] Os comportamentos de hover/transição estão definidos?
[X] O layout responsivo está especificado com breakpoints?
[X] As tabelas do backend estão com campos tipados?
Copiar
MD
PDF

``` 
# CONECTAR COM O SUPABASE
```
* Crie um ERP universal chamado "UniversoCorp", focado em uma experiência de usuário limpa e moderna, utilizando o tom de cor blue-600 (#2563EB) como primário e um fundo geral #FFFFFF, com a fonte principal sendo a Inter. Este sistema é destinado a pequenas e médias empresas que buscam centralizar a gestão de seus negócios, e para isso, integraremos diretamente com o Supabase como backend, incluindo uma análise e configuração para otimizar essa integração.
* A tela de login, acessível pela rota raiz "/", apresentará um layout centrado com um formulário cujo título será em text-2xl font-bold text-gray-900 com o texto "Bem-vindo à UniversoCorp". Os campos de input para email e senha serão implementados com componentes Input do Shadcn/UI, exibindo placeholders "Seu email" e "Sua senha", respectivamente, e as classes w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500. Abaixo dos campos, um botão Button do Shadcn/UI com o texto "Entrar" ostentará bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out, e logo abaixo deste, links para "Cadastro" utilizando text-blue-600 hover:underline e um botão para "Entrar com Google" que terá um ícone do Google, formatado com flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200. Um link discreto para "Recuperar senha" com text-sm text-blue-600 hover:underline também estará presente. Durante o carregamento da interface de login, um componente Skeleton do Shadcn será exibido para simular a interface enquanto os dados são processados via Supabase.
* Configuraremos a estrutura de tabelas no Supabase para o backend do sistema. Teremos a tabela clientes com os campos id uuid primary key, user_id uuid references auth.users, nome text, cpf text unique, telefone text, email text unique, endereco text, cidade text, estado text, cep text, data_cadastro timestamptz default now(). Para os fornecedores, a tabela fornecedores terá id uuid primary key, user_id uuid references auth.users, nome text, cnpj text unique, telefone text, email text unique, endereco text, cidade text, estado text, cep text, data_cadastro timestamptz default now(). Funcionários serão gerenciados pela tabela funcionarios com id uuid primary key, user_id uuid references auth.users, nome text, cargo text, cpf text unique, telefone text, email text unique, data_admissao date, salario numeric, created_at timestamptz default now(). A tabela produtos conterá id uuid primary key, user_id uuid references auth.users, nome text, descricao text, preco_custo numeric, preco_venda numeric, estoque int, unidade_medida varchar(10), created_at timestamptz default now(). Por fim, a tabela servicos terá id uuid primary key, user_id uuid references auth.users, nome text, descricao text, preco numeric, created_at timestamptz default now(). Implementaremos Regras de Segurança de Nível de Linha (RLS) no Supabase para garantir que cada user_id só possa acessar e modificar seus próprios dados, também permitindo o acesso a auth.users para as referências necessárias. Além disso, um bucket imagens_produtos será criado no Supabase Storage para armazenar fotos associadas aos produtos.
* Na página de cadastro de clientes, localizada em /cadastros/clientes, utilizaremos um layout responsivo com um título "Cadastro de Clientes" em text-2xl font-bold text-gray-900. Um botão "Novo Cliente" com bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg será posicionado no canto superior direito da interface. Ao ser clicado, um modal Dialog do Shadcn/UI será aberto, contendo campos Input do Shadcn com placeholders descritivos para Nome, CPF (com máscara), Telefone, Email, Endereço, Cidade, Estado e CEP, todos utilizando as classes w-full. O modal apresentará os botões "Cancelar" com variant="ghost" e "Salvar" com variant="default", bg-blue-600 hover:bg-blue-700 text-white. Ao salvar, um toast de sucesso ✅ Cliente salvo com sucesso! ou um toast de erro ❌ Erro ao salvar cliente. Tente novamente. será exibido. Caso não haja clientes cadastrados, um empty state com uma ilustração e o texto "Nenhum cliente cadastrado. Clique em Novo Cliente para começar." será apresentado.
* Uma estrutura similar será replicada para as demais páginas de cadastro, começando por fornecedores em /cadastros/fornecedores, funcionários em /cadastros/funcionarios, produtos em /cadastros/produtos e serviços em /cadastros/servicos. Em cada uma delas, os campos dos formulários dos modais serão adaptados de acordo com as tabelas correspondentes no Supabase, e os componentes Input e Button do Shadcn/UI serão utilizados. Todas essas páginas seguirão um design mobile-first, com o uso de breakpoints sm:, md:, lg:, xl: para garantir a responsividade progressiva. Os componentes de tabela em páginas como clientes, fornecedores e funcionários serão implementados com componentes personalizados que se integram ao Shadcn/UI e Tailwind CSS, exibindo estados de Skeleton durante o carregamento dos dados do Supabase.
* A página de Ponto de Venda (PDV) estará acessível em /pdv. Ela apresentará uma interface intuitiva com uma área dedicada para adicionar produtos ao carrinho, possivelmente através de busca por código ou nome. A exibição do carrinho com os totais e um botão claro para finalizar a venda serão componentes centrais, utilizando Card do Shadcn para organizar essas seções de forma clara.
* Em /ecommerce, a página funcionará como um catálogo de produtos, permitindo a navegação, filtragem e a adição de itens ao carrinho, simulando uma experiência de loja online básica, integrando diretamente com os dados de produtos do Supabase.
* A agenda, localizada em /agenda, exibirá uma visualização de calendário, possivelmente utilizando uma biblioteca de calendário React compatível com Tailwind CSS, para o agendamento de compromissos e eventos.
* O chatbot em /chatbot será um componente de chat simples, projetado para oferecer interações diretas, e poderá ser estendido para integrações mais avançadas com a Lovable AI, se necessário.
* Para o gerenciamento bancário, a página /gerenciar/bancos incluirá campos para o nome do banco, agência e número da conta, permitindo o registro e consulta dessas informações.
* A página de gerenciamento de redes sociais, em /gerenciar/redes-sociais, permitirá a conexão com diferentes plataformas e a publicação de conteúdo diretamente do sistema.
* Em /gerenciar/vendas, será apresentado um dashboard com relatórios detalhados de vendas, podendo incluir gráficos simples para visualização de desempenho, consumindo dados de vendas do Supabase.
* A página de gerenciamento de entregas, em /gerenciar/entregas, listará as entregas pendentes e concluídas, exibindo detalhes essenciais como endereço de destino e status atualizado.

✅ CHECKLIST DE VERIFICAÇÃO:

    [X] Todas as cores do Design System foram especificadas?
    [X] Os textos de botões, placeholders e toasts estão literais?
    [X] Os comportamentos de hover/transição estão definidos?
    [X] O layout responsivo está especificado com breakpoints?
    [X] As tabelas do backend estão com campos tipados?
    [X] A integração com Supabase foi detalhada?

```
# COLOCAR APIS
```
* Vamos criar um sistema de automação e pagamentos inteligentes chamado "OrbitFlow" para a plataforma Lovable, com um tema escuro profissional utilizando um azul profundo #1E3A8A como cor primária, um fundo escuro #0F172A para o corpo do app e a fonte Inter para consistência. O público-alvo são empresas que buscam otimizar processos de pagamento e integrações.
* A página principal, na rota raiz '/', apresentará um header escuro com um logo "OrbitFlow" em font-bold text-xl text-blue-400, e uma navegação com links "Início", "Integrações", "IA", "Pagamentos", "Segurança" todos em text-gray-200 hover:text-blue-400 transition-colors. A seção hero terá um título impactante "Automatize e Inove seus Pagamentos com Inteligência Artificial" em text-4xl md:text-6xl font-bold text-white, um subtítulo claro sobre como OrbitFlow simplifica fluxos de trabalho complexos, e um botão principal "Comece sua Automação" com bg-blue-500 text-white px-8 py-4 rounded-full hover:scale-105 hover:bg-blue-600 transition-all duration-200.
* O dashboard principal acessível via '/dashboard' terá uma sidebar fixa com w-64 bg-zinc-900 text-gray-200. O menu vertical incluirá ícones como Settings para "Automação", Webhook para "APIs", Sparkles para "IA", DollarSign para "Pagamentos", Shield para "Segurança", e Box para "Containerização", cada item com hover:bg-zinc-800 px-4 py-3 rounded-lg transition-colors. A área central exibirá cards responsivos no estilo grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6. Os cards mostrarão estatísticas chave, como "Fluxos Ativos" com ícone Zap text-blue-400, "Transações Processadas" com ícone CreditCard text-green-400, "Chamadas de IA" com ícone Bot text-purple-400. Cada card terá um fundo bg-zinc-800 shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow.
* A página de Integrações em /integrations listará APIs configuradas em uma tabela com colunas "Nome da API", "Endpoint", "Status" (com um badge variant="outline" indicando "Ativa" ou "Inativa", usando text-green-400 ou text-red-400 respectivamente), e "Ações". Um botão "Nova Integração" no canto superior direito com bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 abrirá um modal. Este modal, usando componentes do Shadcn/UI como Dialog e Input, terá campos para nome da API (placeholder "Nome da API"), URL do endpoint (placeholder "https://api.exemplo.com/v1"), e chaves de autenticação (com um Input do tipo password para segurança). Botões "Cancelar" (variant="outline") e "Salvar Integração" (bg-blue-500) completarão o modal.
* Para o backend com Supabase, criaremos a tabela integrations com colunas id uuid primary key, user_id uuid references auth.users, name text, endpoint_url text, api_key text, status text default 'inactive', created_at timestamptz default now(). Implementaremos Row Level Security (RLS) para garantir que cada usuário só acesse suas próprias integrações.
* A integração com IA, acessível via /ai, permitirá configurar modelos (GPT-4, Gemini Pro). Utilizaremos Lovable AI para isso. Uma seção exibirá o histórico de prompts e respostas, com um campo de texto grande para o usuário inserir suas queries e um botão "Executar" em bg-blue-500 text-white. A IA poderá ser usada para processar dados de pagamentos ou sugerir otimizações.
* Para pagamentos, a tabela payments conterá id uuid primary key, user_id uuid references auth.users, integration_id uuid references integrations, amount numeric, currency text, status text default 'pending', transaction_id text, created_at timestamptz default now(). Integraremos com Gateways populares através de Lovable Cloud Functions, que serão acionadas por webhooks. A segurança será reforçada usando dotenv para gerenciar variáveis de ambiente sensíveis e implementando Webhooks com assinatura para verificar a proveniência das requisições.
* A containerização dos serviços será gerenciada via Docker, com um Dockerfile básico no projeto para empacotar a aplicação React. Isso será implementado e configurado para deploy.
* Para feedback ao usuário, utilizaremos toasts. Ao salvar uma nova integração, exibiremos "✅ Integração configurada com sucesso!". Em caso de falha, "❌ Erro ao salvar integração. Verifique os dados e tente novamente.". Estados de loading serão representados por Skeleton do Shadcn/UI enquanto os dados são carregados. O empty state para a lista de integrações mostrará uma ilustração com o texto "Nenhuma integração configurada ainda. Comece adicionando sua primeira API!". O design será mobile-first, com breakpoints sm:text-base md:text-lg lg:text-xl para escalonar o texto e grid-cols-1 md:grid-cols-2 para layouts responsivos.

    [ ] Todas as cores do Design System foram especificadas?
    [ ] Os textos de botões, placeholders e toasts estão literais?
    [ ] Os comportamentos de hover/transição estão definidos?
    [ ] O layout responsivo está especificado com breakpoints?
    [ ] As tabelas do backend estão com campos tipados?

```
## [GOOGLE STITCH](https://stitch.withgoogle.com/)
* Colar o prompt
* Exportar o projeto (IMG E HTML)

## [GOOGLE IA STUDIO](https://aistudio.google.com/prompts/new_chat)
* Colar todos os arquivo;
* Pedir para fazer funcionar;
* exportar o projeto;

## [IDE GOOGLE ANTIGRAVIT ](https://antigravity.google/)
* baixar (.tar.gz) para linux mint
## Passo a passo para instalar (após o download):
Como você vai baixar um arquivo .tar.gz, ele não funciona como um instalador de Windows (clique duplo). Siga estes passos no Mint:
* Extraia o arquivo: Clique com o botão direito no arquivo baixado e escolha "Extrair aqui".
* Entre na pasta: Abra a pasta que foi criada.
* Execute o programa: Procure por um arquivo chamado apenas antigravity (ou algo similar, com ícone de executável).
  Clique com o botão direito nele, vá em Propriedades > Permissões e marque a caixa "Permitir executar o arquivo como programa".
* Abrir: Agora é só dar um clique duplo nesse arquivo.
#### Dica : Se o Google Antigravity oferecer uma versão em .deb (que é o formato padrão do Linux Mint/Ubuntu), prefira ela! É muito mais fácil de instalar, 
basta dar dois cliques e o sistema faz tudo sozinho.
















