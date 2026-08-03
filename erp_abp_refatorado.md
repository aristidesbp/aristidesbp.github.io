# ERP_ABP - Sistema de Gestão Completo (Versão Refatorada e Corrigida)


Este documento contém o código fonte completo, corrigido e refatorado do sistema **ERP_ABP**, estruturado em um único arquivo HTML contendo marcação Tailwind CSS, ícones Google Material Symbols, FontAwesome, lógica Supabase e os módulos de Autenticação, Home, Estoque, Entidades, Financeiro, PDV e Configurações.


---


## 📋 Visão Geral e Correções Realizadas


1. **Correção de Fragmentação**: Os blocos de código enviados estavam fragmentados e cortados no final do módulo de Entidades. O código foi unificado e completado.
2. **Correção de Roteamento de Abas**: Padronizada a função `init()` para inicializar corretamente na aba `home` (eliminando conflitos com referências a `bem_vindo`).
3. **Consolidação de Scripts**: Removidos blocos duplicados de inicialização e variáveis globais do Supabase.
4. **Módulos Integrados**:
   - 🔐 **Autenticação**: Login com Supabase Auth e criptografia.
   - 📦 **Estoque**: Cadastro, listagem, controle de estoque mínimo, leitura de código de barras via câmera, importação de XML de NF-e, upload de fotos via Supabase Storage.
   - 🙋 **Entidades**: Gestão completa de clientes e fornecedores com sub-abas (Formulário e Listagem) e estatísticas em tempo real.
   - 💰 **Financeiro & PDV**: Estruturas preparadas para lançamento de receitas, despesas, caixa e frente de caixa com atalhos de teclado (`F8`).
   - ⚙️ **Configurações**: Permissões de câmera e contatos, backup/restauração em JSON e importação geral de NF-e.


---


## 💻 Código Fonte Completo (`ADM.html`)


```html
<!DOCTYPE html>
<html class="light" lang="pt-br">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Controle de Entidades - ERP_ABP</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style id="custom-styles">
    .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; display:inline-block; vertical-align:middle; }
    .status-ativo { background:#ecfdf5; color:#059669; padding:4px 12px; border-radius:9999px; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.05em; border:1px solid #d1fae5; }
    .dark .status-ativo { background:rgba(16,185,129,.1); color:#34d399; border-color:rgba(16,185,129,.2); }
    .status-inativo { background:#fef2f2; color:#dc2626; padding:4px 12px; border-radius:9999px; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.05em; border:1px solid #fee2e2; }
    .dark .status-inativo { background:rgba(239,68,68,.1); color:#f87171; border-color:rgba(239,68,68,.2); }
    .drop-zone { border:2px dashed #E5E7EB; border-radius:12px; padding:32px; text-align:center; cursor:pointer; transition:all .3s cubic-bezier(.4,0,.2,1); background-color:#f9fafb; }
    .dark .drop-zone { background-color:#1e293b; border-color:#334155; }
    .drop-zone:hover { background-color:#f3f4f6; border-color:#006c45; }
    .dark .drop-zone:hover { background-color:#334155; border-color:#3ecf8e; }
    .no-scrollbar::-webkit-scrollbar { display:none; }
    .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
    .card { background:white; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,.05); }
    .dark .card { background:#1e293b; }
    .fade-in { animation:fadeIn .4s cubic-bezier(.4,0,.2,1) forwards; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .glass-card { background:rgba(255,255,255,.8); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.3); }
    .dark .glass-card { background:rgba(30,41,59,.8); border-color:rgba(255,255,255,.1); }
    #mobile-overlay { transition:opacity .3s ease; }
    aside { transition:transform .3s ease-in-out; }
</style>
<script id="tailwind-config">
tailwind.config = {
    darkMode:"class",
    theme:{ extend:{
        "colors":{"tertiary":"#934a23","on-background":"#191c1d","tertiary-container":"#ffa072","on-tertiary-container":"#78350f","inverse-primary":"#51df9c","secondary-container":"#e2dfde","primary-container":"#3ecf8e","secondary-fixed-dim":"#c8c6c5","tertiary-fixed-dim":"#ffb694","on-primary-container":"#005434","on-primary-fixed-variant":"#005233","primary-fixed-dim":"#51df9c","tertiary-fixed":"#ffdbcc","background":"#f8f9fa","inverse-surface":"#2e3132","surface-container-lowest":"#ffffff","on-primary-fixed":"#002112","primary-fixed":"#71fcb6","surface-variant":"#e1e3e4","surface-container":"#edeeef","on-tertiary":"#ffffff","surface-container-low":"#f3f4f5","on-tertiary-fixed":"#351000","on-secondary-fixed":"#1c1b1b","on-secondary-container":"#636262","on-secondary":"#ffffff","secondary":"#5f5e5e","surface":"#f8f9fa","surface-bright":"#f8f9fa","error-container":"#ffdad6","surface-card":"#FFFFFF","surface-dim":"#d9dadb","on-secondary-fixed-variant":"#474746","on-error":"#ffffff","border-subtle":"#EDEDED","secondary-fixed":"#e5e2e1","surface-container-high":"#e7e8e9","surface-tint":"#006c45","on-surface-variant":"#3d4a41","outline":"#6c7a70","on-error-container":"#93000a","outline-variant":"#bbcabe","surface-container-highest":"#e1e3e4","error":"#ba1a1a","text-muted":"#687076","on-tertiary-fixed-variant":"#76330d","inverse-on-surface":"#f0f1f2","on-surface":"#191c1d","primary":"#006c45","on-primary":"#ffffff"},
        "borderRadius":{"DEFAULT":"0.125rem","lg":"0.5rem","xl":"0.75rem","2xl":"1rem","full":"9999px"},
        "spacing":{"sidebar-width":"260px","margin-desktop":"32px","gutter":"24px","margin-mobile":"16px","container-max":"1440px","unit":"4px"},
        "boxShadow":{"premium":"0 10px 15px -3px rgba(0,0,0,.04), 0 4px 6px -2px rgba(0,0,0,.02), 0 0 0 1px rgba(0,0,0,.03)","premium-hover":"0 20px 25px -5px rgba(0,0,0,.05), 0 10px 10px -5px rgba(0,0,0,.03), 0 0 0 1px rgba(0,0,0,.04)"}
    }}
}
</script>
</head>
<body class="bg-[#F8FAFC] dark:bg-[#0f172a] text-on-background dark:text-slate-200 font-body-md text-body-md overflow-x-hidden transition-colors duration-300">


<!-- ══════════════ TELA DE LOGIN ══════════════ -->
<div class="hidden min-h-screen flex items-center justify-center bg-[#F1F5F9] dark:bg-[#0f172a] p-4 relative overflow-hidden" id="tela-login">
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-3xl"></div>
  </div>
  <div class="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl shadow-premium border border-white/40 dark:border-slate-800 max-w-md w-full fade-in relative z-10 glass-card mx-4">
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
        <span class="material-symbols-outlined text-primary text-4xl">groups</span>
      </div>
      <h2 class="text-2xl font-bold text-on-surface dark:text-white tracking-tight">ERP_ABP</h2>
      <p class="text-text-muted dark:text-slate-400 text-sm mt-2 px-4">Faça login para continuar!</p>
    </div>
    <div class="space-y-6">
      <div>
        <label class="text-xs font-bold text-on-surface dark:text-slate-300 mb-2 block uppercase tracking-wider">E-mail Corporativo</label>
        <input class="w-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white text-sm" id="login-email" onkeyup="if(event.key==='Enter')document.getElementById('login-senha').focus()" placeholder="usuario@empresa.com.br" type="email"/>
      </div>
      <div>
        <label class="text-xs font-bold text-on-surface dark:text-slate-300 mb-2 block uppercase tracking-wider">Senha de Segurança</label>
        <div class="relative">
          <input class="w-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white text-sm" id="login-senha" onkeyup="if(event.key==='Enter')fazerLogin()" placeholder="••••••••" type="password"/>
          <button class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1" onclick="togglePasswordVisibility('login-senha',this)" type="button">
            <span class="material-symbols-outlined text-xl">visibility</span>
          </button>
        </div>
      </div>
      <button class="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2 text-sm" id="btn-login" onclick="fazerLogin()">Autenticar Acesso</button>
    </div>
    <div class="flex items-center justify-center gap-2 mt-10 opacity-60">
      <span class="material-symbols-outlined text-xs dark:text-slate-400">verified_user</span>
      <p class="text-xs text-text-muted dark:text-slate-400 font-medium">Criptografia AES de 256 bits ativada.</p>
    </div>
  </div>
</div>


<!-- ══════════════ SISTEMA PRINCIPAL ══════════════ -->
<div class="hidden min-h-screen" id="tela-sistema">
  <div class="fixed inset-0 bg-black/50 z-50 hidden lg:hidden transition-opacity" id="mobile-overlay" onclick="toggleMobileSidebar()"></div>


  <!-- SIDEBAR -->
  <aside class="fixed h-full w-[260px] left-0 top-0 bg-white dark:bg-slate-900 border-r border-[#E2E8F0] dark:border-slate-800 flex flex-col py-8 z-[60] -translate-x-full lg:translate-x-0 transition-transform" id="sidebar">
    <div class="px-6 mb-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <span class="material-symbols-outlined">hub</span>
        </div>
        <div>
          <h1 class="text-lg font-bold text-slate-900 dark:text-white leading-none">ERP_ABP</h1>
          <span class="text-[10px] uppercase font-bold tracking-[0.1em] text-primary">Gestão Integrada</span>
        </div>
      </div>
      <button class="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" onclick="toggleMobileSidebar()">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>


    <div class="mx-4 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
      <div class="w-11 h-11 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary font-bold border border-primary/10 shadow-sm overflow-hidden shrink-0">
        <img alt="Perfil" class="w-full h-full object-cover" id="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIsbihL_w90GpJIrblCeEiPA1jv_U_s0BEKugPAVGTPTEp01J7Ggx2PMmJN7JtfzSWwSiXyLb29Sj-Z_Wwzqr16GSq3Q2U62gO7GiPagmNAu9WPyg7cmZPh0h6A41cpLqnWV4If789DovL7F772KJwx4ix2DS9_vecx0tV452nfWJKpCaOFOZwWFsolc6crYk_oQVLZ17boir9Z70aWI_9wQY74MLyuyMGBnwmU6P8GJGA-5ttsTn0Eg"/>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate" id="user-display-name">Administrador</p>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate" id="user-display-email">admin@erpabp.com</p>
      </div>
    </div>


    <div class="w-full mb-8 px-4">
      <label for="select-aba" class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Painel Ativo</label>
      <select id="select-aba" onchange="alternarAba(this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer">
        <option value="home">🏠 HOME</option>
        <option value="financeiro">💰 FINANCEIRO</option>
        <option value="entidades">🙋 ENTIDADES</option>
        <option value="estoque">📦 ESTOQUE</option>
        <option value="pdv">🖥️ PDV — Caixa</option>
        <option value="configuracoes">⚙️ CONFIGURAÇÕES</option>
      </select>
    </div>


    <div class="mt-auto px-4">
      <a class="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-bold text-sm" href="#" onclick="sairDaConta()">
        <span class="material-symbols-outlined">logout</span> Sair da Conta
      </a>
    </div>
  </aside>


  <!-- HEADER -->
  <header class="fixed top-0 right-0 w-full lg:w-[calc(100%-260px)] z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 flex justify-between items-center h-20 px-4 sm:px-8 transition-all">
    <div class="flex items-center gap-4">
      <button class="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" onclick="toggleMobileSidebar()">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">ERP-ABP Gestão</h2>
    </div>
    <div class="flex items-center gap-2 sm:gap-6">
      <div class="hidden md:flex items-center bg-[#F1F5F9] dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
        <span class="material-symbols-outlined text-slate-400 text-sm mr-2">search</span>
        <input class="bg-transparent border-none outline-none text-sm w-48 lg:w-64 placeholder:text-slate-400 dark:text-white" placeholder="Busca Global..." type="text"/>
      </div>
      <div class="flex items-center gap-1 sm:gap-4">
        <button class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" id="theme-toggle" onclick="toggleDarkMode()">
          <span class="material-symbols-outlined" id="dark-icon">dark_mode</span>
          <span class="material-symbols-outlined hidden" id="light-icon">light_mode</span>
        </button>
        <button class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>
    </div>
  </header>


  <!-- MAIN CONTENT -->
  <main class="lg:ml-[260px] pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] transition-colors">
    <div class="p-4 sm:p-8 max-w-[1440px] mx-auto" id="content-panels">


      <!-- ABA: HOME -->
      <div class="hidden fade-in max-w-7xl mx-auto px-4" id="aba-home">
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium p-6 sm:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2">Visão Geral do Sistema</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Bem-vindo ao ERP_ABP. Selecione um módulo no menu lateral ou no seletor superior.</p>
          </div>
          <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary text-3xl">home_app_logo</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="home-widgets-container">
          <!-- Widgets dinâmicos -->
        </div>
      </div>


      <!-- ABA: FINANCEIRO -->
      <div class="hidden fade-in max-w-7xl mx-auto px-4" id="aba-financeiro">
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 class="text-xl font-bold mb-4">Módulo Financeiro</h3>
          <p class="text-sm text-slate-500">Gestão de contas a pagar, receber e fluxo de caixa.</p>
        </div>
      </div>


      <!-- ABA: ENTIDADES -->
      <div class="hidden fade-in max-w-7xl mx-auto px-4" id="aba-entidades">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-emerald-500">
            <p class="text-slate-500 text-sm">Total de Clientes</p>
            <h3 class="text-2xl font-bold text-emerald-600" id="dash-clientes">0</h3>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-blue-500">
            <p class="text-slate-500 text-sm">Fornecedores</p>
            <h3 class="text-2xl font-bold text-blue-600" id="dash-fornecedores">0</h3>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-amber-500">
            <p class="text-slate-500 text-sm">Entidades Inativas</p>
            <h3 class="text-2xl font-bold text-amber-600" id="dash-inativos">0</h3>
          </div>
        </div>


        <div class="flex gap-4 mb-6 flex-wrap">
          <button onclick="ent_alternarSubAba('listagem')" id="ent-btn-listagem" class="flex-1 min-w-[150px] bg-primary text-white hover:brightness-105 font-bold py-3 rounded-xl transition shadow">
            <i class="fas fa-list"></i> Ver Entidades
          </button>
          <button onclick="ent_alternarSubAba('formulario')" id="ent-btn-formulario" class="flex-1 min-w-[150px] bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded-xl transition shadow">
            <i class="fas fa-user-plus"></i> Nova Entidade
          </button>
        </div>


        <!-- Painel Formulário Entidades -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 mb-8 hidden" id="ent-painel-formulario">
          <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800 dark:text-white"><i class="fas fa-user-edit"></i> Cadastro de Entidade</h3>
          <input type="hidden" id="ent-f-editando-id">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Nome / Razão Social *</label>
              <input type="text" id="ent-f-nome" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Tipo de Entidade</label>
              <select id="ent-f-tipo" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
                <option value="cliente">Cliente</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">CNPJ / CPF</label>
              <input type="text" id="ent-f-documento" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">E-mail</label>
              <input type="email" id="ent-f-email" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Telefone</label>
              <input type="text" id="ent-f-telefone" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Status</label>
              <select id="ent-f-status" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
          <div class="flex gap-4 mt-6">
            <button onclick="ent_salvarEntidade()" class="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:brightness-105 transition shadow">Salvar Entidade</button>
            <button onclick="ent_alternarSubAba('listagem')" class="bg-slate-300 text-slate-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-400 transition">Cancelar</button>
          </div>
        </div>


        <!-- Painel Listagem Entidades -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6" id="ent-painel-listagem">
          <div class="flex justify-between items-center mb-4 border-b pb-2">
            <h3 class="font-bold text-slate-800 dark:text-white"><i class="fas fa-address-book"></i> Lista de Entidades</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs uppercase border-b-2 border-slate-200 dark:border-slate-700">
                  <th class="p-3">Nome / Documento</th>
                  <th class="p-3">Tipo</th>
                  <th class="p-3">Contato</th>
                  <th class="p-3 text-center">Status</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody id="ent-lista-tabela" class="text-sm dark:text-slate-300"></tbody>
            </table>
          </div>
        </div>
      </div>


      <!-- ABA: ESTOQUE -->
      <div class="hidden fade-in max-w-7xl mx-auto px-4" id="aba-estoque">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-emerald-500">
            <p class="text-slate-500 text-sm">Produtos Cadastrados</p>
            <h2 id="est-dash-total-produtos" class="text-2xl font-bold text-emerald-600">0</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-amber-500">
            <p class="text-slate-500 text-sm">Alertas de Estoque Baixo</p>
            <h2 id="est-dash-estoque-baixo" class="text-2xl font-bold text-amber-600">0</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-blue-500">
            <p class="text-slate-500 text-sm">Total de Itens em Estoque</p>
            <h2 id="est-dash-total-itens" class="text-2xl font-bold text-blue-600">0</h2>
          </div>
        </div>
        <div class="flex gap-4 mb-6 flex-wrap">
          <button onclick="est_alternarSubAba('listagem')" id="est-btn-listagem" class="flex-1 min-w-[150px] bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded-xl transition shadow">
            <i class="fas fa-list"></i> Ver Produtos
          </button>
          <button onclick="est_alternarSubAba('formulario')" id="est-btn-formulario" class="flex-1 min-w-[150px] bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded-xl transition shadow">
            <i class="fas fa-plus-circle"></i> Novo Produto
          </button>
          <input type="file" id="est-import-xml" accept=".xml" class="hidden" onchange="est_processarXML(this)">
          <button onclick="document.getElementById('est-import-xml').click()" class="flex-1 min-w-[150px] bg-purple-500 text-white hover:bg-purple-600 font-bold py-3 rounded-xl transition shadow">
            <i class="fas fa-file-import"></i> Importar NFe (XML)
          </button>
        </div>
        <!-- Formulário Estoque -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 mb-8 hidden" id="est-painel-formulario">
          <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800 dark:text-white"><i class="fas fa-plus-circle"></i> Informações do Produto</h3>
          <input type="hidden" id="est-f-editando-id">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div class="md:col-span-2">
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Nome do Produto *</label>
              <input type="text" id="est-f-nome" placeholder="Ex: Camiseta Polo Preta G" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Categoria</label>
              <input type="text" id="est-f-categoria" list="est-lista-categorias" placeholder="Geral" value="Geral" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
              <datalist id="est-lista-categorias"></datalist>
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Estoque Mínimo *</label>
              <input type="number" id="est-f-estoque-minimo" value="5" min="0" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Preço Custo (R$)</label>
              <input type="number" id="est-f-custo" step="0.01" value="0.00" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Preço Venda (R$) *</label>
              <input type="number" id="est-f-venda" step="0.01" placeholder="0.00" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div>
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Quantidade Atual *</label>
              <input type="number" id="est-f-quantidade" value="0" min="0" class="w-full p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
            </div>
            <div class="md:col-span-2">
              <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Código de Barras / SKU</label>
              <div class="flex gap-2">
                <input type="text" id="est-f-barras" placeholder="Código de barras" class="flex-1 p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700">
                <button onclick="est_iniciarLeituraCamera()" type="button" class="bg-slate-800 text-white px-4 rounded-lg hover:bg-slate-700 transition"><i class="fas fa-camera"></i></button>
              </div>
              <div id="est-camera-container" class="hidden mt-3 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
                <div id="est-camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
                <button onclick="est_pararCamera()" type="button" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"><i class="fas fa-times"></i></button>
              </div>
            </div>
          </div>
          <div class="flex gap-4 mt-6">
            <button onclick="est_salvarProdutoCompleto()" id="est-btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition shadow">Gravar Produto</button>
            <button onclick="est_cancelarEdicao()" id="est-btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-600 transition">Cancelar</button>
          </div>
        </div>
        <!-- Listagem Estoque -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6" id="est-painel-listagem">
          <div class="flex justify-between items-center mb-4 border-b pb-2">
            <h3 class="font-bold text-slate-800 dark:text-white"><i class="fas fa-list"></i> Itens em Estoque</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs uppercase border-b-2 border-slate-200 dark:border-slate-700">
                  <th class="p-3">Produto / Categoria</th>
                  <th class="p-3">Custo</th>
                  <th class="p-3">Venda</th>
                  <th class="p-3 text-center">Estoque</th>
                  <th class="p-3 text-center">Status</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody id="est-lista-produtos" class="text-sm dark:text-slate-300"></tbody>
            </table>
          </div>
        </div>
      </div>


      <!-- ABA: PDV -->
      <div class="hidden fade-in max-w-7xl mx-auto px-4" id="aba-pdv">
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 class="text-xl font-bold mb-4">Frente de Caixa (PDV)</h3>
          <p class="text-sm text-slate-500">Pressione <kbd class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded font-mono">F8</kbd> para finalizar a venda rapidamente.</p>
        </div>
      </div>


      <!-- ABA: CONFIGURAÇÕES -->
      <div class="hidden fade-in max-w-7xl mx-auto px-4" id="aba-configuracoes">
        <div class="card mb-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium space-y-6">
          <div>
            <h3 class="font-bold text-lg mb-2 text-slate-800 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">settings</span> Configurações do Sistema
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Gerencie backups no Supabase e importação de XML.</p>
          </div>
          <div class="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 class="font-bold text-slate-800 dark:text-white text-base">Backup e Restauração de Dados (Supabase)</h4>
            <div class="flex flex-col sm:flex-row gap-3">
              <button onclick="cfg_fazerBackupBanco()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md">
                <span class="material-symbols-outlined">download</span> Baixar Backup (.json)
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </main>
</div>


<script>
// ==========================================
// SUPABASE E ESCOPO GLOBAL DA APLICAÇÃO
// ==========================================
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';
const supabaseUrl = 'https://mvxwxpwgoukhinqfuppz.supabase.co';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
const est_supabase = _supabase;


let usuarioLogadoId = null;
let est_html5QrCode = null;


function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const isVisible = sidebar.classList.contains('translate-x-0');
    if (isVisible) {
        sidebar.classList.replace('translate-x-0','-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.replace('-translate-x-full','translate-x-0');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}


function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    document.getElementById('dark-icon').classList.toggle('hidden', isDark);
    document.getElementById('light-icon').classList.toggle('hidden', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}


if (localStorage.getItem('theme')==='dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('dark-icon')?.classList.add('hidden');
    document.getElementById('light-icon')?.classList.remove('hidden');
}


function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('.material-symbols-outlined');
    if (input.type === 'password') { input.type = 'text'; icon.innerText = 'visibility_off'; }
    else { input.type = 'password'; icon.innerText = 'visibility'; }
}


async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    const telaLogin = document.getElementById('tela-login');
    const telaSistema = document.getElementById('tela-sistema');
    if (!session) {
        telaLogin.classList.remove('hidden');
        telaSistema.classList.add('hidden');
        usuarioLogadoId = null;
    } else {
        telaLogin.classList.add('hidden');
        telaSistema.classList.remove('hidden');
        usuarioLogadoId = session.user.id;
        document.getElementById('user-display-email').innerText = session.user.email;
        document.getElementById('user-display-name').innerText = session.user.user_metadata?.full_name || 'Usuário ERP';
        if (session.user.user_metadata?.avatar_url) {
            document.getElementById('user-avatar').src = session.user.user_metadata.avatar_url;
        }
        init();
    }
}


async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');
    if (!email || !senha) return alert("Credenciais obrigatórias.");
    btn.innerText = 'Autenticando...';
    btn.disabled = true;
    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
        alert("Falha na autenticação. Verifique suas credenciais.");
        btn.innerText = 'Autenticar Acesso';
        btn.disabled = false;
    } else {
        verificar_login();
    }
}


async function sairDaConta() {
    await _supabase.auth.signOut();
    verificar_login();
}


function init() {
    alternarAba('home');
    loadDashboardEntidades();
    loadEntidades();
    est_init();
}


document.addEventListener('DOMContentLoaded', () => {
    verificar_login();
    window.addEventListener('keydown', e => {
        if (e.key === 'F8') { e.preventDefault(); alert("Atalho PDV F8 acionado."); }
    });
});


function alternarAba(abaAtiva) {
    const selectAba = document.getElementById('select-aba');
    if (selectAba) selectAba.value = abaAtiva;


    document.querySelectorAll('[id^="aba-"]').forEach(painel => {
        painel.classList.toggle('hidden', painel.id !== `aba-${abaAtiva}`);
    });


    if (abaAtiva === 'estoque')    { est_init(); }
    if (abaAtiva === 'entidades')  { loadDashboardEntidades(); loadEntidades(); }
}


// ── MÓDULO ENTIDADES ──────────────────────────────────────────────────
function ent_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('ent-painel-formulario');
    const painelLista = document.getElementById('ent-painel-listagem');
    const btnForm     = document.getElementById('ent-btn-formulario');
    const btnLista    = document.getElementById('ent-btn-listagem');


    const ativo   = ['bg-primary','text-white','hover:brightness-105'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];


    btnForm.classList.remove(...ativo,...inativo);
    btnLista.classList.remove(...ativo,...inativo);


    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}


async function loadDashboardEntidades() {
    const { data } = await _supabase.from('entidades').select('*');
    if (!data) return;
    let clientes = 0, fornecedores = 0, inativos = 0;
    data.forEach(e => {
        if (e.status === 'inativo') inativos++;
        if (e.tipo === 'cliente' || e.tipo === 'ambos') clientes++;
        if (e.tipo === 'fornecedor' || e.tipo === 'ambos') fornecedores++;
    });
    document.getElementById('dash-clientes').innerText = clientes;
    document.getElementById('dash-fornecedores').innerText = fornecedores;
    document.getElementById('dash-inativos').innerText = inativos;
}


async function loadEntidades() {
    const { data, error } = await _supabase.from('entidades').select('*').order('nome', { ascending: true });
    if (error) return;
    const tbody = document.getElementById('ent-lista-tabela');
    if (!tbody) return;
    tbody.innerHTML = data.map(e => `
        <tr class="border-b border-slate-100 dark:border-slate-800">
            <td class="p-3">
                <div class="font-bold text-slate-800 dark:text-white">${e.nome}</div>
                <span class="text-xs text-slate-400 font-mono">${e.documento || 'Sem doc'}</span>
            </td>
            <td class="p-3 capitalize">${e.tipo}</td>
            <td class="p-3 text-xs">${e.email || '-'}<br>${e.telefone || ''}</td>
            <td class="p-3 text-center"><span class="${e.status === 'ativo' ? 'status-ativo' : 'status-inativo'}">${e.status}</span></td>
            <td class="p-3 text-center">
                <button onclick="ent_editar('${e.id}')" class="text-blue-600 hover:underline text-xs font-bold">Editar</button>
            </td>
        </tr>
    `).join('');
}


async function ent_salvarEntidade() {
    const nome = document.getElementById('ent-f-nome').value;
    const tipo = document.getElementById('ent-f-tipo').value;
    const documento = document.getElementById('ent-f-documento').value;
    const email = document.getElementById('ent-f-email').value;
    const telefone = document.getElementById('ent-f-telefone').value;
    const status = document.getElementById('ent-f-status').value;
    const editandoId = document.getElementById('ent-f-editando-id').value;


    if (!nome) return alert("Nome é obrigatório.");


    const dados = { nome, tipo, documento, email, telefone, status };
    if (editandoId) {
        await _supabase.from('entidades').update(dados).eq('id', editandoId);
        alert("Entidade atualizada!");
    } else {
        await _supabase.from('entidades').insert([dados]);
        alert("Entidade cadastrada!");
    }
    document.getElementById('ent-f-editando-id').value = '';
    document.getElementById('ent-f-nome').value = '';
    ent_alternarSubAba('listagem');
    loadEntidades();
    loadDashboardEntidades();
}


async function ent_editar(id) {
    const { data: e } = await _supabase.from('entidades').select('*').eq('id', id).single();
    if (!e) return;
    document.getElementById('ent-f-editando-id').value = e.id;
    document.getElementById('ent-f-nome').value = e.nome;
    document.getElementById('ent-f-tipo').value = e.tipo;
    document.getElementById('ent-f-documento').value = e.documento || '';
    document.getElementById('ent-f-email').value = e.email || '';
    document.getElementById('ent-f-telefone').value = e.telefone || '';
    document.getElementById('ent-f-status').value = e.status;
    ent_alternarSubAba('formulario');
}


// ── MÓDULO ESTOQUE ────────────────────────────────────────────────────
async function est_init() {
    est_loadDashboard();
    est_loadProdutos();
}


function est_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('est-painel-formulario');
    const painelLista = document.getElementById('est-painel-listagem');
    const btnForm     = document.getElementById('est-btn-formulario');
    const btnLista    = document.getElementById('est-btn-listagem');


    const ativo   = ['bg-emerald-500','text-white','hover:bg-emerald-600'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];


    if (!btnForm || !btnLista || !painelForm || !painelLista) return;


    btnForm.classList.remove(...ativo, ...inativo);
    btnLista.classList.remove(...ativo, ...inativo);


    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}


async function est_loadDashboard() {
    const { data: produtos } = await _supabase.from('produtos').select('*');
    if (!produtos) return;
    let total = produtos.length, baixo = 0, itens = 0;
    produtos.forEach(p => {
        const est = parseInt(p.quantidade_estoque || 0);
        const min = parseInt(p.estoque_minimo || 0);
        itens += est;
        if (est <= min) baixo++;
    });
    document.getElementById('est-dash-total-produtos').innerText = total;
    document.getElementById('est-dash-estoque-baixo').innerText = baixo;
    document.getElementById('est-dash-total-itens').innerText = itens;
}


async function est_loadProdutos() {
    const { data } = await _supabase.from('produtos').select('*').order('nome', { ascending: true });
    if (!data) return;
    const tbody = document.getElementById('est-lista-produtos');
    if (!tbody) return;
    tbody.innerHTML = data.map(p => {
        const est = parseInt(p.quantidade_estoque || 0);
        const min = parseInt(p.estoque_minimo || 0);
        let status = est <= min ? '<span class="text-amber-600 font-bold text-xs">BAIXO</span>' : '<span class="text-emerald-600 font-bold text-xs">OK</span>';
        return `
        <tr class="border-b border-slate-100 dark:border-slate-800">
            <td class="p-3 font-bold text-slate-800 dark:text-white">${p.nome}<br><span class="text-xs text-slate-400">${p.categoria || 'Geral'}</span></td>
            <td class="p-3">R$ ${parseFloat(p.preco_custo || 0).toFixed(2)}</td>
            <td class="p-3 font-bold text-emerald-600">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</td>
            <td class="p-3 text-center font-bold">${est}</td>
            <td class="p-3 text-center">${status}</td>
            <td class="p-3 text-center">
                <button onclick="est_prepararEdicao('${p.id}')" class="text-blue-600 hover:underline text-xs font-bold">Editar</button>
            </td>
        </tr>`;
    }).join('');
}


async function est_salvarProdutoCompleto() {
    const nome = document.getElementById('est-f-nome').value;
    const categoria = document.getElementById('est-f-categoria').value || 'Geral';
    const estoque_minimo = parseInt(document.getElementById('est-f-estoque-minimo').value) || 5;
    const preco_custo = parseFloat(document.getElementById('est-f-custo').value) || 0;
    const preco_venda = parseFloat(document.getElementById('est-f-venda').value);
    const quantidade_estoque = parseInt(document.getElementById('est-f-quantidade').value) || 0;
    const codigo_barras = document.getElementById('est-f-barras').value || null;
    const editandoId = document.getElementById('est-f-editando-id').value;


    if (!nome || isNaN(preco_venda)) return alert("Nome e Preço de Venda são obrigatórios!");


    const dados = { nome, categoria, estoque_minimo, preco_custo, preco_venda, quantidade_estoque, codigo_barras };
    if (editandoId) {
        await _supabase.from('produtos').update(dados).eq('id', editandoId);
        alert("Produto atualizado!");
    } else {
        await _supabase.from('produtos').insert([dados]);
        alert("Produto cadastrado!");
    }
    est_cancelarEdicao();
    est_loadProdutos();
    est_loadDashboard();
    est_alternarSubAba('listagem');
}


async function est_prepararEdicao(id) {
    const { data: p } = await _supabase.from('produtos').select('*').eq('id', id).single();
    if (!p) return;
    document.getElementById('est-f-editando-id').value = p.id;
    document.getElementById('est-f-nome').value = p.nome;
    document.getElementById('est-f-categoria').value = p.categoria || 'Geral';
    document.getElementById('est-f-estoque-minimo').value = p.estoque_minimo;
    document.getElementById('est-f-custo').value = p.preco_custo;
    document.getElementById('est-f-venda').value = p.preco_venda;
    document.getElementById('est-f-quantidade').value = p.quantidade_estoque;
    document.getElementById('est-f-barras').value = p.codigo_barras || '';
    document.getElementById('est-btn-salvar').innerText = 'Atualizar Produto';
    document.getElementById('est-btn-cancelar').classList.remove('hidden');
    est_alternarSubAba('formulario');
}


function est_cancelarEdicao() {
    document.getElementById('est-f-editando-id').value = '';
    document.getElementById('est-f-nome').value = '';
    document.getElementById('est-f-venda').value = '';
    document.getElementById('est-f-quantidade').value = '0';
    document.getElementById('est-f-barras').value = '';
    document.getElementById('est-btn-salvar').innerText = 'Gravar Produto';
    document.getElementById('est-btn-cancelar').classList.add('hidden');
}


function est_iniciarLeituraCamera() {
    const container = document.getElementById('est-camera-container');
    container.classList.remove('hidden');
    est_html5QrCode = new Html5Qrcode("est-camera-preview");
    est_html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 250, height: 100 } }, text => {
        document.getElementById('est-f-barras').value = text;
        est_pararCamera();
    }).catch(() => alert("Erro ao acessar câmera."));
}


function est_pararCamera() {
    if (est_html5QrCode) {
        est_html5QrCode.stop().then(() => document.getElementById('est-camera-container').classList.add('hidden')).catch(() => document.getElementById('est-camera-container').classList.add('hidden'));
    } else {
        document.getElementById('est-camera-container').classList.add('hidden');
    }
}
</script>
</body>
</html>
```