let carrinho = [];
const functionUrl = 'https://eisruaetsqrratemqswv.functions.supabase.co/checkout';

/**
 * Alterna entre temas dark e light
 */
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark'); 
        html.classList.add('light');
        icon.innerText = 'dark_mode';
    } else {
        html.classList.remove('light'); 
        html.classList.add('dark');
        icon.innerText = 'light_mode';
    }
}

/**
 * Altera o texto do Hero conforme o idioma
 */
function changeLang() {
    const lang = document.getElementById('langSelect').value;
    const title = document.getElementById('heroTitle');
    
    const translations = {
        es: 'Transformando Necesidades Reales en <span class="text-primary">Soluciones Digitales</span>',
        en: 'Transforming Real Needs into Functional <span class="text-primary">Digital Solutions</span>',
        pt: 'Transformando Necessidades Reais em <span class="text-primary">Soluções Digitais</span> Funcionais'
    };

    title.innerHTML = translations[lang] || translations.pt;
}

/**
 * Adiciona um serviço ao carrinho e atualiza o total
 */
function addServico(btn, nome, preco) {
    // Lógica de Carrinho
    carrinho.push({ nome, preco });
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    document.getElementById('resumoTotal').innerText = total.toFixed(2);

    // Feedback Visual (Botão Verde)
    btn.classList.remove('bg-primary');
    btn.classList.add('bg-success'); // Definido no CSS como emerald-500
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check_circle</span> Adicionado`;
}

/**
 * Envia os dados para a Edge Function do Supabase e inicia Checkout
 */
async function processarPagamento() {
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    if (total <= 0) return alert("Selecione um serviço primeiro.");
    
    const nome = document.getElementById('cliente_nome').value;
    const email = document.getElementById('cliente_email').value;
    if(!nome || !email) return alert("Preencha nome e e-mail.");

    const btn = document.getElementById('btnPagar');
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerHTML = `<div class="flex items-center justify-center gap-2"><div class="loading-spinner"></div> PROCESSANDO...</div>`;

    try {
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome, email, total,
                itens: carrinho.map(i => ({ nome: i.nome, preco: i.preco, qtd: 1 }))
            })
        });

        if (!response.ok) throw new Error('Erro na requisição');

        const data = await response.json();
        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            throw new Error('Ponto de início não recebido');
        }
    } catch (e) {
        alert("Erro ao conectar com o servidor de pagamento. Tente novamente.");
        console.error(e);
        btn.disabled = false;
        btn.innerText = originalText;
    }
}
