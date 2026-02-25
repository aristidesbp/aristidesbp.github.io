/**
 * Gera e insere o Header dinamicamente no DOM.
 * @param {string} selector - O seletor onde o header será injetado (ex: 'body' ou '#app').
 */
function createHeader(selector = 'body') {
  const headerHTML = `

  
    
<input class="hidden" id="mobile-menu-toggle" type="checkbox"/>
<div class="fixed inset-0 bg-black/60 z-[60] hidden transition-opacity lg:hidden" id="menu-overlay"></div>
<header class="fixed top-0 left-0 right-0 z-50 glass bg-white/70 dark:bg-[#0f172a]/60 border-b border-slate-border-light dark:border-slate-border-dark px-6 md:px-16 py-3">
<div class="max-w-7xl mx-auto flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined">code</span>
</div>
<h1 class="text-xl font-black tracking-tight text-[#1e293b] dark:text-white uppercase">Aristidesbp</h1>
</div>
<nav class="hidden lg:flex items-center gap-10">
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#home">Início</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#about">Sobre</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#services">Serviços</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#contact">Contato</a>
</nav>
<div class="flex items-center gap-4">
<div class="hidden lg:flex items-center gap-4">
<button class="theme-toggle size-10 flex items-center justify-center rounded-lg border border-slate-border-light dark:border-slate-border-dark text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary transition-all bg-white/50 dark:bg-slate-800/50 shadow-sm" onclick="document.documentElement.classList.toggle('dark')">
<span class="material-symbols-outlined light-icon">light_mode</span>
<span class="material-symbols-outlined dark-icon">dark_mode</span>
</button>
<button class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-border-light dark:border-slate-border-dark text-xs font-bold text-slate-700 dark:text-white transition-all">
<span class="material-symbols-outlined text-sm">language</span>
<span>PT-BR</span>
</button>
<div class="size-10 rounded-full border border-primary p-0.5">
<div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDg0BMoeQ3v50PaL3SkEJMK4MZM2EP3WLtg3yEqPdds1n6L_a_Vmadn3sWgw6KHnLNdlfIPXWZWVGtJ3MBKTYBfSZCgStZ9XXbVvlHcDlwbwMuf8RuDC12PZ2f9EMHV-799kQZOTW-wjlFs0cVu44VWa7AUecDJpTRVO1HwG3yMaHMjXALNHypiluMojejMywLY6yGWbgiuTRsHmZHu2FO4JQMFIiwvksDn0rV8ntVl8C_FjoJRXAnhLVGIGzrEzPC4FUvCxqFIVhfv');"></div>
</div>
</div>
<label class="lg:hidden size-10 flex items-center justify-center rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-border-light dark:border-slate-border-dark text-slate-600 dark:text-slate-300 cursor-pointer" for="mobile-menu-toggle">
<span class="material-symbols-outlined">menu</span>
</label>
</div>
</div>
</header>
<div class="fixed top-0 right-0 w-80 h-full bg-white dark:bg-[#0f172a] z-[70] translate-x-full transition-transform duration-300 shadow-2xl lg:hidden flex flex-col" id="mobile-menu">
<div class="p-6 flex items-center justify-between border-b border-slate-border-light dark:border-slate-border-dark">
<div class="flex items-center gap-3">
<div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined">code</span>
</div>
<h1 class="text-lg font-black tracking-tight text-[#1e293b] dark:text-white uppercase">Aristidesbp</h1>
</div>
<label class="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer" for="mobile-menu-toggle">
<span class="material-symbols-outlined">close</span>
</label>
</div>
<nav class="flex-grow p-6 flex flex-col gap-2">
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-primary/10 hover:text-primary transition-all" href="#home" onclick="document.getElementById('mobile-menu-toggle').checked = false">
<span class="material-symbols-outlined">home</span> Início
        </a>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-primary/10 hover:text-primary transition-all" href="#about" onclick="document.getElementById('mobile-menu-toggle').checked = false">
<span class="material-symbols-outlined">person</span> Sobre
        </a>

        <a class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-primary/10 hover:text-primary transition-all" href="#services" onclick="document.getElementById('mobile-menu-toggle').checked = false">
<span class="material-symbols-outlined">grid_view</span> Serviços
        </a>

        
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-primary/10 hover:text-primary transition-all" href="#contact" onclick="document.getElementById('mobile-menu-toggle').checked = false">
<span class="material-symbols-outlined">mail</span> Contato
        </a>
</nav>
<div class="p-6 border-t border-slate-border-light dark:border-slate-border-dark space-y-4">
<div class="flex items-center justify-between">
<span class="text-sm font-bold text-slate-500 uppercase tracking-wider">Ações</span>
</div>
<div class="grid grid-cols-2 gap-3">
<button class="theme-toggle flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-border-light dark:border-slate-border-dark text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" onclick="document.documentElement.classList.toggle('dark')">
<span class="material-symbols-outlined text-lg light-icon">light_mode</span>
<span class="material-symbols-outlined text-lg dark-icon">dark_mode</span>
<span>Tema</span>
</button>
<button class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-border-light dark:border-slate-border-dark text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
<span class="material-symbols-outlined text-lg">language</span>
<span>Idioma</span>
</button>        
</div>



<!-- minha conta      
<div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-border-light dark:border-slate-border-dark">
<div class="size-10 rounded-full border border-primary p-0.5">
<div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDg0BMoeQ3v50PaL3SkEJMK4MZM2EP3WLtg3yEqPdds1n6L_a_Vmadn3sWgw6KHnLNdlfIPXWZWVGtJ3MBKTYBfSZCgStZ9XXbVvlHcDlwbwMuf8RuDC12PZ2f9EMHV-799kQZOTW-wjlFs0cVu44VWa7AUecDJpTRVO1HwG3yMaHMjXALNHypiluMojejMywLY6yGWbgiuTRsHmZHu2FO4JQMFIiwvksDn0rV8ntVl8C_FjoJRXAnhLVGIGzrEzPC4FUvCxqFIVhfv');"></div>
</div>
      
<div>
<p class="text-sm font-bold text-slate-900 dark:text-white leading-none">Minha Conta</p>
<p class="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Premium Partner</p>
</div>
-->
        
<a href="login.html" class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-border-light dark:border-slate-border-dark hover:border-primary transition-all">
    <div class="size-10 rounded-full border border-primary p-0.5">
        <div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDg0BMoeQ3v50PaL3SkEJMK4MZM2EP3WLtg3yEqPdds1n6L_a_Vmadn3sWgw6KHnLNdlfIPXWZWVGtJ3MBKTYBfSZCgStZ9XXbVvlHcDlwbwMuf8RuDC12PZ2f9EMHV-799kQZOTW-wjlFs0cVu44VWa7AUecDJpTRVO1HwG3yMaHMjXALNHypiluMojejMywLY6yGWbgiuTRsHmZHu2FO4JQMFIiwvksDn0rV8ntVl8C_FjoJRXAnhLVGIGzrEzPC4FUvCxqFIVhfv');"></div>
    </div>
    <div>
        <p class="text-sm font-bold text-slate-900 dark:text-white leading-none">Minha Conta</p>
        <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Premium Partner</p>
    </div>
</a>
<!-- final minha conta-->

               
</div>
</div>
</div>

  `;

  const container = document.querySelector(selector);
if (container) {
container.insertAdjacentHTML('afterbegin', headerHTML);
  } else {
    console.error(`Elemento ${selector} não encontrado.`);
  }
}

// Execução
// Adicione o ID da sua div aqui
createOlaMundo('#index_login'); 
/* COMO CHAMAR NO HTML:
<div id="index_login"></div>
<script src="src/view/index_login.js"></script>
*/
