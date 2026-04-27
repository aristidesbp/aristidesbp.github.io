Aqui está o planejamento arquitetural completo para o seu ERP Clínico. 
Ele foi estruturado para garantir escalabilidade, segurança e fácil manutenção, utilizando a sua stack atual (HTML, Tailwind, JS Vanilla e Supabase).

### 1. Estrutura de Pastas (Arquitetura Front-end)
* utilizando HTML e JavaScript puro,
* a melhor abordagem é separar o projeto em responsabilidades lógicas (uma variação simples do padrão MVC).

```
📁 ERP_Clinica/
├── 📄 index.html              # Landing page ou redirecionador inicial
├── 📄 login.html              # Tela de login unificada
│
├── 📁 assets/                 # Recursos estáticos
│   ├── 📁 css/                # Arquivos CSS (se houver customizações além do Tailwind)
│   └── 📁 img/                # Logos, avatares padrão, imagens de fundo
│
├── 📁 config/                 # Configurações globais
│   ├── 📄 supabase.js         # Inicialização do Supabase (Apenas a Key pública)
│   └── 📄 auth_guard.js       # Script de Camada 1 (Bloqueia acesso a páginas sem login)
│
├── 📁 pages/                  # As interfaces visuais (Views)
│   ├── 📄 painel_master.html
│   ├── 📄 painel_pedagogo.html
│   ├── 📄 painel_secretaria.html
│   ├── 📄 painel_caixa.html
│   └── 📄 painel_paciente.html
│
├── 📁 controllers/            # A lógica de cada tela (O que acontece ao clicar em botões)
│   ├── 📄 login_controller.js # Captura os dados do login.html e chama o auth_model
│   ├── 📄 master_controller.js
│   ├── 📄 paciente_controller.js
│   └── 📄 financeiro_controller.js
│
└── 📁 models/                 # Comunicação direta com o banco de dados (Supabase)
    ├── 📄 auth_model.js       # Funções de signIn, signOut, signUp
    ├── 📄 entidades_model.js  # CRUD de pacientes e funcionários
    ├── 📄 exercicios_model.js # CRUD de exercícios
    └── 📄 financas_model.js   # CRUD do módulo financeiro
```

---

### 2. SQL do Banco de Dados (Estrutura e Segurança)
* Esta é a estrutura central otimizada, já com as Políticas de Segurança (RLS) que discutimos,
* garantindo que o banco de dados seja o verdadeiro guardião das informações.

```
-- ==========================================
-- 1. CRIAÇÃO DAS TABELAS CORE
-- ==========================================

-- Tabela de Perfis (Liga o Auth do Supabase à sua regra de negócios)
CREATE TABLE public.clinica_perfis (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('master', 'psicopedagoga', 'secretaria', 'caixa', 'supervisor', 'paciente')),
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela de Entidades (Ficha detalhada de Pacientes e Funcionários)
CREATE TABLE public.entidades (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id), -- Null se a pessoa ainda não tem acesso ao sistema
  nome_completo text NOT NULL,
  cpf text UNIQUE,
  telefone text,
  tipo_entidade text DEFAULT 'paciente' CHECK (tipo_entidade IN ('paciente', 'funcionario', 'fornecedor')),
  status_entidade text DEFAULT 'ativo',
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela de Exercícios (Módulo Pedagógico)
CREATE TABLE public.exercicios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  paciente_id uuid REFERENCES auth.users(id), -- Quem vai fazer
  criado_por uuid REFERENCES auth.users(id),  -- Qual pedagogo passou
  titulo text NOT NULL,
  descricao text NOT NULL,
  categoria text,
  codigo_de_barras text, -- Controle físico/apostilas
  status_exercicio text DEFAULT 'pendente' CHECK (status_exercicio IN ('pendente', 'em_andamento', 'concluido')),
  data_prazo date,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabela Financeira
CREATE TABLE public.financas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  entidade_id uuid REFERENCES public.entidades(id),
  descricao text NOT NULL,
  valor_total numeric NOT NULL,
  tipo text CHECK (tipo IN ('receita', 'despesa')),
  status_lancamento text DEFAULT 'aberto' CHECK (status_lancamento IN ('aberto', 'pago', 'atrasado')),
  data_vencimento date,
  created_at timestamp with time zone DEFAULT now()
);

-- ==========================================
-- 2. POLÍTICAS DE SEGURANÇA (RLS)
-- ==========================================

ALTER TABLE public.clinica_perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;

-- Regra Global: Apenas o Master pode criar novos usuários no sistema
CREATE POLICY "Master cria perfis" ON public.clinica_perfis
FOR INSERT WITH CHECK (
  (SELECT role FROM public.clinica_perfis WHERE id = auth.uid()) = 'master'
);

-- Regra Entidades: Staff vê tudo, Paciente vê apenas a si mesmo
CREATE POLICY "Staff vê todas as entidades" ON public.entidades FOR ALL
USING ((SELECT role FROM public.clinica_perfis WHERE id = auth.uid()) IN ('master', 'secretaria', 'psicopedagoga', 'supervisor'));

CREATE POLICY "Paciente vê sua própria entidade" ON public.entidades FOR SELECT
USING (user_id = auth.uid());

-- Regra Exercícios: Pacientes só podem ver e atualizar o status dos PRÓPRIOS exercícios
CREATE POLICY "Paciente vê seus exercícios" ON public.exercicios FOR SELECT
USING (paciente_id = auth.uid());

CREATE POLICY "Paciente atualiza status do seu exercício" ON public.exercicios FOR UPDATE
USING (paciente_id = auth.uid());
```

---

### 3. Regras de Negócio (Business Logic)
* Estas são as leis inquebráveis do seu sistema que devem ser respeitadas pelo front-end e pelo banco de dados:

#### A. Autenticação e Gestão de Usuários
1.  **Porta Única:** Todos os usuários (do Master ao Paciente) entram pela mesma tela (`login.html`).
    O sistema é responsável por rotear o usuário para o painel correto com base na coluna `role` da tabela `clinica_perfis`.
2.  **Criação Restrita:** Pacientes não podem criar contas sozinhos. Apenas usuários com `role` de `'master'` ou `'secretaria'`
    possuem o formulário que dispara o `supabase.auth.signUp()` para registrar um novo paciente no sistema.
3.  **Vínculo Obrigatório:** Ao cadastrar um paciente com acesso ao sistema, o ID gerado pelo Supabase Auth
    deve ser imediatamente inserido na tabela `clinica_perfis` (para definir o cargo) e na tabela `entidades` (campo `user_id`).

#### B. Fluxo Pedagógico Clínico
1.  **Atribuição:** Um exercício só pode ser criado se estiver vinculado a um `paciente_id` válido.
2.  **Ciclo de Vida do Exercício:** O status nasce como `'pendente'`. O paciente pode alterá-lo para `'em_andamento'`
    e `'concluido'`. O paciente **não pode** alterar o título, descrição ou prazo de um exercício; essas edições são
    exclusivas da Psicopedagoga ou Master.
4.  **Avaliação:** Exercícios marcados como `'concluido'` devem gerar uma notificação visual (ou alerta no painel) para o
    criador do exercício (a psicopedagoga) avaliar o resultado.

#### C. Fluxo Financeiro e Administrativo
1.  **Isolamento Financeiro:** Perfis de `'paciente'` e `'psicopedagoga'` não têm acesso de leitura à tabela `financas` (bloqueado via RLS).
    Apenas `'master'`, `'supervisor'` e `'caixa'` podem visualizar e manipular receitas e despesas.
3.  **Rastreabilidade:** Toda transação financeira (receita) deve ser obrigatoriamente vinculada ao `id` de uma entidade
    (o paciente que está pagando). Lançamentos avulsos ("venda de balcão" sem cadastro) requerem a criação de uma entidade
    genérica chamada "Cliente Balcão".

Com essa base, você tem um mapa claro para seguir com o desenvolvimento. Gostaria de focar primeiro na implementação do arquivo `auth_guard.js` (a Camada 1 de segurança nas páginas) ou na criação dos formulários de cadastro no Painel Master?
