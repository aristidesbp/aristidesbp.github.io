# ERP ABP – Guia de Organização e Próximas Fases (2026)
Nome do Projeto: ERP ABP (Aristides & Parceiros Brasil)
Última atualização deste documento: Janeiro 2026
Objetivo: Documento de referência único para orientar o desenvolvimento das fases restantes (6 a 10)
Status Atual do Projeto (após Passos 1–5 + coluna excluido_em)
100% concluído nas camadas de backend SQL / Supabase

# Modelagem completa de todas as tabelas
RLS + Policies enterprise-grade (multi-tenant, multi-role)
Triggers (auditoria universal, controle de estoque, financeiro automático, soft-delete)
Funções críticas (finalizar_venda, cancelar_venda, abrir_caixa, etc.)
Views de dashboard e relatórios (financeiro, vendas diárias, top produtos, estoque crítico)

# Pendentes (fases principais que faltam implementar)

Fase 6–7 → Offline-first completo (IndexedDB + Dexie + fila de sincronização + resolução de conflitos)
Fase 8   → Frontend completo (HTML + JS vanilla + módulos desacoplados + dashboard)
Fase 9   → Integrações externas (WhatsApp Business API, redes sociais, chatbot, notificações)
Fase 10  → Qualidade, testes automatizados, documentação final e deploy

# Estrutura de Pastas Recomendada (GitHub / repositório local)
```
erp-abp/
├── README.md
├── LICENSE                 # Sugestão: MIT ou licença comercial restrita
├── .gitignore
│
├── /docs/                  # Toda a documentação final
│   ├── manual_usuario.md
│   ├── documentacao_tecnica.md
│   ├── arquitetura.md
│   └── changelog.md
│
├── /css/                   # Estilos (globais e modulares)
│   ├── reset.css
│   ├── main.css
│   └── modules/
│       ├── pdv.css
│       ├── vendas.css
│       ├── financeiro.css
│       └── dashboard.css
│
├── /js/
│   ├── /core/                  # Camada essencial – regras que não mudam
│   │   ├── conexao.js          # Supabase client + Dexie (IndexedDB)
│   │   ├── auth.js             # Login, sessão, roles, current_empresa_id
│   │   ├── sync.js             # Sincronização bidirecional + outbox pattern
│   │   ├── ui.js               # Modais, toasts, loaders, confirmações
│   │   └── config.js           # Constantes, feature flags, endpoints
│   │
│   ├── /modules/               # Lógica de cada tela/entidade
│   │   ├── dashboard.js
│   │   ├── pdv.js              # Frente de caixa / vendas rápidas
│   │   ├── vendas.js
│   │   ├── vendas_detalhe.js
│   │   ├── clientes.js
│   │   ├── fornecedores.js
│   │   ├── funcionarios.js
│   │   ├── produtos.js
│   │   ├── servicos.js
│   │   ├── financeiro.js
│   │   ├── caixa.js
│   │   ├── mensagens.js        # WhatsApp + redes sociais
│   │   ├── chatbot.js
│   │   └── minha_empresa.js
│   │
│   └── /utils/                 # Funções reutilizáveis em todo o sistema
│       ├── format.js           # moeda, data, cpf/cnpj, telefone
│       ├── validators.js       # validações de formulário
│       ├── logger.js           # log local + eventual envio para sentry
│       └── helpers.js          # funções genéricas (delay, debounce, etc.)
│
├── /assets/
│   ├── images/             # logos, ícones, placeholders
│   ├── icons/              # ícones SVG / PNG
│   └── fonts/              # fontes customizadas (opcional)
│
├── index.html                  # Portal / redireciona para login ou dashboard
├── login.html
├── dashboard.html
├── pdv.html                    # Ponto de venda (foco em usabilidade rápida)
├── vendas_lista.html
├── vendas_detalhe.html
├── clientes.html
├── fornecedores.html
├── funcionarios.html
├── produtos.html
├── servicos.html
├── financeiro_fluxo.html
├── caixas.html
├── mensagens.html
├── chatbot_config.html
├── minha_empresa.html
├── configuracoes_api.html
└── meu_perfil.html
```

# Mapeamento das Fases Restantes × Pastas / Arquivos Principais
Fase     Foco Principal                              Pastas/Arquivos Mais Impactados
6–7      Offline-first + Sincronização               js/core/conexao.js, js/core/sync.js, js/core/config.js
8        Frontend + CRUD + Dashboard + UX            /js/modules/* , todas as páginas *.html, /css/modules/
9        Integrações (WhatsApp, redes, chatbot, push) js/modules/mensagens.js, js/modules/chatbot.js, configuracoes_api.html
10       Testes, docs, monitoramento, deploy         /docs/, /tests/ (futuro), README.md, .github/workflows/

# Princípios de Arquitetura Adotados no ERP ABP
Offline-First real (IndexedDB é a fonte primária quando offline)
API-First + Banco Inteligente (todas operações críticas via funções SQL)
Client-Side Controller (lógica de tela em /modules/)
Desacoplamento forte (core não conhece detalhes de negócio)
Single Responsibility Principle (um módulo = uma entidade/tela)
Progressive Web App readiness (futuro service-worker + manifest)
Segurança herdada do backend (RLS + current_empresa_id/)

# Próximos Passos Recomendados (ordem sugerida – Jan/2026)
Criar repositório GitHub privado ou público com a estrutura acima
Implementar js/core/conexao.js + schema Dexie (espelhando tabelas SQL)
Implementar js/core/sync.js (outbox pattern + fila simples de ações pendentes)
Criar login.html + auth.js (autenticação + sessão + multi-empresa)
Implementar dashboard.html consumindo views do Passo 5
Desenvolver um módulo completo de exemplo (ex: clientes.html + clientes.js)
Testar fluxo completo: offline → ações → online → sincronização → conflito
Iniciar integração WhatsApp (envio simples + config)
Documentar enquanto desenvolve (evitar dívida de documentação)

# Dicas Práticas de Desenvolvimento
Nomenclatura JS: minúsculo + camelCase para funções, kebab-case para arquivos HTML/CSS
Eventos custom: document.dispatchEvent(new CustomEvent('vendaFinalizada', { detail: {...} }))
CSS: use BEM ou utility classes (Tailwind opcional para acelerar)
Comentários úteis no código:
// @sync-critical   → código que afeta a sincronização
// @todo            → pendência clara
// @important       → não mexer sem revisar impacto

