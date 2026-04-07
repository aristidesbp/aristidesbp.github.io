<!DOCTYPE html>
<html class="light" lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Painel Financeiro com TDA e Saldos Bancários</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style type="text/tailwindcss">
        body {
            font-family: 'Inter', sans-serif;
            -webkit-tap-highlight-color: transparent;
        }
        .ios-shadow {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .active-icon {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#111418] dark:text-white pb-28">
<header class="sticky top-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
<div class="flex items-center justify-between px-4 py-4">
<h1 class="text-xl font-bold tracking-tight">Painel Financeiro</h1>
<button class="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
<span class="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
</button>
</div>
</header>
<main class="px-4 py-6 space-y-6">
<section class="space-y-3">
<h3 class="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Saldo das Contas Bancárias</h3>
<div class="flex overflow-x-auto gap-3 hide-scrollbar pb-2">
<div class="flex-none w-40 bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
<div class="flex items-center gap-2 mb-2">
<div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
<span class="material-symbols-outlined text-orange-600 text-lg">account_balance</span>
</div>
<span class="text-[10px] font-bold text-gray-400">ITAÚ</span>
</div>
<p class="text-sm font-bold truncate">R$ 4.250,00</p>
</div>
<div class="flex-none w-40 bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
<div class="flex items-center gap-2 mb-2">
<div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
<span class="material-symbols-outlined text-purple-600 text-lg">account_balance_wallet</span>
</div>
<span class="text-[10px] font-bold text-gray-400">NUBANK</span>
</div>
<p class="text-sm font-bold truncate">R$ 6.820,50</p>
</div>
<div class="flex-none w-40 bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
<div class="flex items-center gap-2 mb-2">
<div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
<span class="material-symbols-outlined text-red-600 text-lg">token</span>
</div>
<span class="text-[10px] font-bold text-gray-400">SANTANDER</span>
</div>
<p class="text-sm font-bold truncate">R$ 1.379,50</p>
</div>
</div>
</section>
<div class="bg-primary p-6 rounded-3xl shadow-lg shadow-primary/20 text-white">
<p class="text-white/80 text-sm font-medium mb-1">Saldo Atual</p>
<div class="flex items-baseline gap-1">
<span class="text-lg font-bold opacity-80">R$</span>
<h2 class="text-3xl font-bold tracking-tight">12.450,00</h2>
</div>
<div class="mt-4 flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">
<span class="material-symbols-outlined text-xs">trending_up</span>
<span class="text-xs font-medium">+2.4% este mês</span>
</div>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
<div class="flex items-center gap-2 mb-2">
<div class="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-lg">
<span class="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">arrow_downward</span>
</div>
<p class="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Entradas</p>
</div>
<p class="text-lg font-bold text-green-600 dark:text-green-400">R$ 15.200</p>
</div>
<div class="bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
<div class="flex items-center gap-2 mb-2">
<div class="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg">
<span class="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">arrow_upward</span>
</div>
<p class="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Saídas</p>
</div>
<p class="text-lg font-bold text-red-600 dark:text-red-400">R$ 2.750</p>
</div>
</div>
<div class="bg-white dark:bg-gray-900 p-5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
<div class="flex items-center justify-between mb-6">
<h3 class="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Performance Mensal</h3>
<span class="text-xs font-medium text-primary">Últimos 6 meses</span>
</div>
<div class="flex items-end justify-between h-32 px-2">
<div class="flex flex-col items-center gap-2 group">
<div class="w-8 bg-gray-100 dark:bg-gray-800 h-16 rounded-t-lg group-hover:bg-primary/20 relative">
<div class="absolute bottom-0 w-full bg-primary/40 h-10 rounded-t-lg"></div>
</div>
<span class="text-[10px] text-gray-400 font-medium">MAI</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<div class="w-8 bg-gray-100 dark:bg-gray-800 h-24 rounded-t-lg group-hover:bg-primary/20 relative">
<div class="absolute bottom-0 w-full bg-primary h-14 rounded-t-lg"></div>
</div>
<span class="text-[10px] text-gray-400 font-medium">JUN</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<div class="w-8 bg-gray-100 dark:bg-gray-800 h-20 rounded-t-lg group-hover:bg-primary/20 relative">
<div class="absolute bottom-0 w-full bg-primary/40 h-18 rounded-t-lg"></div>
</div>
<span class="text-[10px] text-gray-400 font-medium">JUL</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<div class="w-8 bg-gray-100 dark:bg-gray-800 h-28 rounded-t-lg group-hover:bg-primary/20 relative">
<div class="absolute bottom-0 w-full bg-primary h-22 rounded-t-lg"></div>
</div>
<span class="text-[10px] text-gray-400 font-medium">AGO</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<div class="w-8 bg-gray-100 dark:bg-gray-800 h-24 rounded-t-lg group-hover:bg-primary/20 relative">
<div class="absolute bottom-0 w-full bg-primary/40 h-12 rounded-t-lg"></div>
</div>
<span class="text-[10px] text-gray-400 font-medium">SET</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<div class="w-8 bg-gray-100 dark:bg-gray-800 h-32 rounded-t-lg group-hover:bg-primary/20 relative">
<div class="absolute bottom-0 w-full bg-primary h-28 rounded-t-lg"></div>
</div>
<span class="text-[10px] text-gray-400 font-medium">OUT</span>
</div>
</div>
</div>
<section class="space-y-3">
<div class="flex items-center justify-between px-1">
<h3 class="text-base font-bold">Próximos Vencimentos</h3>
<button class="text-sm font-semibold text-primary">Ver todos</button>
</div>
<div class="space-y-2">
<div class="flex items-center gap-4 bg-white dark:bg-gray-900 p-3.5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer">
<div class="bg-gray-100 dark:bg-gray-800 rounded-full h-11 w-11 shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-gray-400">description</span>
</div>
<div class="flex flex-col flex-1 min-w-0">
<p class="text-sm font-semibold truncate">Aluguel Escritório</p>
<p class="text-gray-500 dark:text-gray-400 text-xs font-normal">Vence amanhã</p>
</div>
<div class="text-right">
<p class="text-sm font-bold text-red-500">R$ 1.500,00</p>
<span class="text-[10px] px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-bold uppercase">Pendente</span>
</div>
</div>
<div class="flex items-center gap-4 bg-white dark:bg-gray-900 p-3.5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer">
<div class="bg-gray-100 dark:bg-gray-800 rounded-full h-11 w-11 shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-gray-400">receipt_long</span>
</div>
<div class="flex flex-col flex-1 min-w-0">
<p class="text-sm font-semibold truncate">Assinatura Software</p>
<p class="text-gray-500 dark:text-gray-400 text-xs font-normal">15 de Outubro</p>
</div>
<div class="text-right">
<p class="text-sm font-bold">R$ 89,90</p>
<span class="text-[10px] px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-bold uppercase">Agendado</span>
</div>
</div>
</div>
</section>
<section class="space-y-3">
<div class="flex items-center justify-between px-1">
<div class="flex items-center gap-2">
<h3 class="text-base font-bold">Boletos no meu CPF (TDA)</h3>
<div class="bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-600 dark:text-blue-400">NOVO</div>
</div>
<button class="text-sm font-semibold text-primary">Atualizar</button>
</div>
<div class="space-y-2">
<div class="flex items-center gap-4 bg-white dark:bg-gray-900 p-3.5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer">
<div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl h-11 w-11 shrink-0 flex items-center justify-center border border-gray-100 dark:border-gray-700">
<span class="material-symbols-outlined text-gray-500">barcode_scanner</span>
</div>
<div class="flex flex-col flex-1 min-w-0">
<p class="text-sm font-semibold truncate">Condomínio Residencial</p>
<p class="text-gray-500 dark:text-gray-400 text-xs font-normal">Vence em 20 Out</p>
</div>
<div class="text-right">
<p class="text-sm font-bold">R$ 750,00</p>
<p class="text-[10px] text-gray-400">Emissor: Banco X</p>
</div>
</div>
<div class="flex items-center gap-4 bg-white dark:bg-gray-900 p-3.5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer">
<div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl h-11 w-11 shrink-0 flex items-center justify-center border border-gray-100 dark:border-gray-700">
<span class="material-symbols-outlined text-gray-500">barcode_scanner</span>
</div>
<div class="flex flex-col flex-1 min-w-0">
<p class="text-sm font-semibold truncate">Seguro Automotivo</p>
<p class="text-gray-500 dark:text-gray-400 text-xs font-normal">Vence em 25 Out</p>
</div>
<div class="text-right">
<p class="text-sm font-bold">R$ 312,40</p>
<p class="text-[10px] text-gray-400">Emissor: Porto S.</p>
</div>
</div>
</div>
</section>
</main>
<nav class="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 h-20 flex items-center justify-between px-2 z-30">
<div class="flex flex-1 flex-col items-center gap-1 text-gray-400 active:scale-95 transition-transform cursor-pointer">
<span class="material-symbols-outlined">logout</span>
<span class="text-[10px] font-medium">Sair</span>
</div>
<div class="flex flex-1 flex-col items-center gap-1 text-gray-400 active:scale-95 transition-transform cursor-pointer">
<span class="material-symbols-outlined">group</span>
<span class="text-[10px] font-medium">Entidades</span>
</div>
<div class="flex flex-1 flex-col items-center gap-1 text-gray-400 active:scale-95 transition-transform cursor-pointer">
<span class="material-symbols-outlined">payments</span>
<span class="text-[10px] font-medium">Parcelas</span>
</div>
<div class="flex flex-1 flex-col items-center gap-1 text-primary active:scale-95 transition-transform cursor-pointer">
<span class="material-symbols-outlined active-icon">dashboard</span>
<span class="text-[10px] font-bold">Painel</span>
</div>
<div class="flex flex-1 flex-col items-center gap-1 text-gray-400 active:scale-95 transition-transform cursor-pointer">
<span class="material-symbols-outlined">settings</span>
<span class="text-[10px] font-medium">Ajustes</span>
</div>
</nav>

</body></html>