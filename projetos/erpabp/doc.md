1. index.html (Termos de Uso)
Elemento	Identificador / Seletor	Função
Botão Voltar	header div span (arrow_back_ios)	Retornar à tela anterior
Aceitar e Continuar	footer button.bg-primary	Aceitar termos e ir para Login
Recusar	footer button.border-2	Recusar termos e fechar/sair
2. login.html (Autenticação)
Elemento	Identificador / Seletor	Função
Campo E-mail	id="email"	Inserir e-mail do usuário
Campo Senha	id="password"	Inserir senha
Mostrar Senha	.material-symbols-outlined (no campo senha)	Alternar visibilidade da senha
Botão Entrar	button.bg-[#f9f506]	Realizar login
Login com Google	button (com ícone SVG Google)	Autenticação social
Status Conexão	id="status-dot" e id="status-text"	Monitorar rede
3. financeiro.png.html (Dashboard)
Elemento	Identificador / Seletor	Função
Menu: Sair	nav div (ícone logout)	Encerrar sessão
Menu: Entidades	nav div (ícone group)	Ir para lista de entidades
Menu: Parcelas	nav div (ícone payments)	Ir para lista de parcelas
Menu: Painel	nav div (ícone dashboard)	Tela atual (ativo)
Menu: Ajustes	nav div (ícone settings)	Ir para configurações
4. lista_bancos.html (Minhas Contas)
Elemento	Identificador / Seletor	Função
Botão Voltar	header div span (arrow_back_ios)	Voltar ao painel
Adicionar Banco	header div span (add)	Abrir tela de cadastro de banco
Cards de Banco	div.bg-white.rounded-xl	Ver detalhes da conta específica
5. lista_entidades.html
Elemento	Identificador / Seletor	Função
Busca	input[type="text"]	Filtrar entidades
Botão Flutuante (+)	button.fixed.bottom-24	Cadastrar nova entidade
Item da Lista	div.flex.items-center.justify-between	Selecionar entidade para editar
6. lista_parcelas.html
Elemento	Identificador / Seletor	Função
Filtro de Pesquisa	input (placeholder "Pesquisar parcelas...")	Buscar parcelas específicas
Botão Adicionar	header span (add_circle)	Criar novo parcelamento
Abas de Status	button (Pagas, Pendentes, Todas)	Filtrar por situação de pagamento
7. cadastrar_entidade.html / cadastrar_banco.html / cadastrar_pascelas.html

Essas telas de cadastro seguem um padrão similar:
Elemento	Identificador / Seletor	Função
Campos de Input	input / select / textarea	Coleta de dados (Nome, Valor, Data, etc)
Botão Salvar	button.bg-primary	Gravar dados no sistema
Botão Cancelar/Excluir	button.text-gray-500 ou button.border-danger	Descartar alterações ou apagar registro
8. ajustes.html (Configurações)
Elemento	Identificador / Seletor	Função
Botão de Perfil	div (com ícone person)	Editar dados do usuário
Seção Bancos	div (com ícone account_balance)	Atalho para gerenciar contas
Alternar Tema	div (com ícone dark_mode)	Ativar/Desativar modo escuro
