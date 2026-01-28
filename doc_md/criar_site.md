# CRIAÇAÕ DE SIITES
## [ROMPT MODELO PARA GOOGLE STITCH](https://stitch.withgoogle.com/)
```
Faça um ERP universal tipo SAS completo;

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
# G
