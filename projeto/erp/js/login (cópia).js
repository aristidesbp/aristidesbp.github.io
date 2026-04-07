<!DOCTYPE html>
<html class="light" lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Login com Status de Conexão Simples</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f9f506",
                        "background-light": "#f8f8f5",
                        "background-dark": "#23220f",
                    },
                    fontFamily: {
                        "display": ["Spline Sans", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Spline Sans', sans-serif;
            min-height: max(884px, 100dvh);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-300">
<div class="relative flex min-h-screen h-full w-full flex-col overflow-x-hidden max-w-[480px] mx-auto shadow-2xl bg-white dark:bg-[#1a190a]">
<header class="flex items-center justify-center p-4 pt-6">
<div class="flex items-center gap-2 bg-[#f0f0eb] dark:bg-[#2d2c18] px-4 py-1.5 rounded-full border border-[#e6e6db] dark:border-[#3d3c2a]">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
</span>
<p class="text-[#8c8b5f] dark:text-[#a1a07d] text-xs font-bold leading-normal tracking-[0.05em] uppercase">CONNECTED</p>
</div>
</header>
<main class="flex-1 flex flex-col px-6 pt-10">
<div class="text-center mb-10">
<h1 class="text-[#181811] dark:text-white tracking-tight text-[40px] font-bold leading-tight">Login</h1>
<p class="text-[#8c8b5f] dark:text-[#a1a07d] mt-2 text-base">Bem-vindo de volta!</p>
</div>
<div class="space-y-4">
<div class="flex flex-col w-full">
<p class="text-[#181811] dark:text-[#e6e6db] text-sm font-semibold leading-normal pb-2 ml-1">Email</p>
<div class="flex w-full items-stretch rounded-xl shadow-sm">
<div class="text-[#8c8b5f] dark:text-[#a1a07d] flex border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] items-center justify-center pl-4 rounded-l-xl border-r-0">
<span class="material-symbols-outlined text-[20px]">mail</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#181811] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] focus:border-primary h-14 placeholder:text-[#8c8b5f]/60 p-[15px] border-l-0 text-base font-normal leading-normal" placeholder="seu@email.com" type="email" value=""/>
</div>
</div>
<div class="flex flex-col w-full">
<p class="text-[#181811] dark:text-[#e6e6db] text-sm font-semibold leading-normal pb-2 ml-1">Senha</p>
<div class="flex w-full items-stretch rounded-xl shadow-sm">
<div class="text-[#8c8b5f] dark:text-[#a1a07d] flex border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] items-center justify-center pl-4 rounded-l-xl border-r-0">
<span class="material-symbols-outlined text-[20px]">lock</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#181811] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] focus:border-primary h-14 placeholder:text-[#8c8b5f]/60 p-[15px] border-x-0 text-base font-normal leading-normal" placeholder="••••••••" type="password" value=""/>
<button class="text-[#8c8b5f] dark:text-[#a1a07d] flex border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] items-center justify-center pr-4 rounded-r-xl border-l-0 hover:text-primary transition-colors" type="button">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<div class="pt-6 space-y-4">
<button class="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-primary text-[#181811] text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
<span class="truncate">Entrar</span>
</button>
<button class="w-full flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full h-14 px-5 border border-[#dadce0] dark:border-[#3d3c2a] bg-white dark:bg-[#2d2c18] text-[#3c4043] dark:text-[#e6e6db] text-base font-medium leading-normal hover:bg-[#f8f9fa] dark:hover:bg-[#343322] active:scale-95 transition-all">
<svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
</svg>
<span class="truncate">Entrar com Google</span>
</button>
</div>
<div class="flex justify-center pt-2">
<a class="text-[#8c8b5f] dark:text-[#a1a07d] text-sm font-medium hover:text-[#181811] dark:hover:text-primary transition-colors" href="#">Esqueci minha senha</a>
</div>
</div>
</main>
<footer class="pb-10 pt-6 px-6 text-center">
<p class="text-[#8c8b5f] dark:text-[#a1a07d] text-base">
                Não tem uma conta? 
                <a class="text-[#181811] dark:text-primary font-bold ml-1 hover:underline underline-offset-4" href="#">Criar conta</a>
</p>
</footer>
<div class="absolute top-[-100px] right-[-100px] w-64 h-64 bg-primary opacity-5 rounded-full blur-[80px] pointer-events-none"></div>
<div class="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-primary opacity-5 rounded-full blur-[80px] pointer-events-none"></div>
</div>

</body></html>