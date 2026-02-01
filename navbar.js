import { supabase } from './config_supabase.js';

export function renderNavbar(containerId) {
    const container = document.getElementById(containerId);
    const cargo = window.usuarioLogado?.cargo || 'Operador';

    const menuItems = [
        { nome: 'Dashboard', link: 'dashboard_de_gestão_administrativa.html', icon: 'dashboard', roles: ['Administrador', 'Gerente'] },
        { nome: 'PDV', link: 'pdv_-_frente_de_caixa_otimizado.html', icon: 'shopping_cart', roles: ['Administrador', 'Gerente', 'Operador'] },
        { nome: 'Estoque', link: 'controle_de_produtos_e_estoque.html', icon: 'inventory_2', roles: ['Administrador', 'Gerente', 'Repositor'] },
        { nome: 'Financeiro', link: 'financeiro_e_fluxo_de_caixa.html', icon: 'payments', roles: ['Administrador', 'Gerente'] },
        { nome: 'ADM', link: 'adm.html', icon: 'settings', roles: ['Administrador'] }
    ];

    const html = `
    <nav class="bg-[#131f18] text-white p-4 flex justify-between items-center shadow-xl border-b border-white/5">
        <div class="flex items-center gap-4">
            <span class="font-black text-primary">ERP ABP</span>
            <div class="hidden md:flex gap-4">
                ${menuItems.filter(item => item.roles.includes(cargo)).map(item => `
                    <a href="${item.link}" class="flex items-center gap-1 text-xs font-bold hover:text-primary transition-all uppercase tracking-tighter">
                        <span class="material-symbols-outlined text-sm">${item.icon}</span> ${item.nome}
                    </a>
                `).join('')}
            </div>
        </div>
        <div class="flex items-center gap-4">
            <span class="text-[10px] bg-white/10 px-2 py-1 rounded font-bold">${window.usuarioLogado?.nome_completo}</span>
            <button id="btnLogout" class="hover:text-red-500 transition-colors"><span class="material-symbols-outlined">logout</span></button>
        </div>
    </nav>`;

    container.innerHTML = html;

    document.getElementById('btnLogout').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = 'login.html';
    });
}
