# Index.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Checkout Seguro | Aristidesbp</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #020617; color: #f8fafc; }
        .glass { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .loading-spinner {
            border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #2563eb;
            border-radius: 50%; width: 24px; height: 24px; animation: spin 0.8s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">

    <div class="max-w-md w-full glass rounded-3xl p-8 shadow-2xl">
        <div class="text-center mb-8">
            <div class="size-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
                <span class="material-symbols-outlined text-white">shield_with_heart</span>
            </div>
            <h1 class="text-2xl font-black uppercase tracking-tight">Checkout Seguro</h1>
            <p class="text-slate-400 text-sm">Aristidesbp Digital Solutions</p>
        </div>

        <div class="bg-slate-900/50 rounded-2xl p-6 border border-white/5 mb-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Produto/Serviço</span>
                    <h2 id="displayItem" class="font-bold text-lg leading-tight">Carregando...</h2>
                </div>
                <span class="material-symbols-outlined text-slate-600">shopping_bag</span>
            </div>
            <div class="flex justify-between items-end">
                <div>
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total a pagar</span>
                    <div class="text-3xl font-black text-white">R$ <span id="displayValor">0,00</span></div>
                </div>
            </div>
        </div>

        <form id="payForm" class="space-y-4">
            <div>
                <label class="text-[10px] uppercase font-bold text-slate-500 ml-1">Seu Nome</label>
                <input id="nome" type="text" required class="w-full bg-slate-900 border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 focus:ring-0 transition-all" placeholder="Nome completo">
            </div>
            <div>
                <label class="text-[10px] uppercase font-bold text-slate-500 ml-1">Seu Melhor E-mail</label>
                <input id="email" type="email" required class="w-full bg-slate-900 border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 focus:ring-0 transition-all" placeholder="email@exemplo.com">
            </div>

            <button type="submit" id="btnPagar" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
                PAGAR AGORA
            </button>
        </form>

        <div class="mt-6 flex items-center justify-center gap-4 opacity-40 grayscale">
            <img src="https://img.icons8.com/color/48/000000/visa.png" class="h-4">
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" class="h-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.png" class="h-3">
        </div>
    </div>

    <script>
        // Capturar dados da URL (?item=NOME&valor=000)
        const params = new URLSearchParams(window.location.search);
        const itemNome = params.get('item') || "Serviço Digital";
        const itemValor = parseFloat(params.get('valor')) || 0;

        document.getElementById('displayItem').innerText = itemNome;
        document.getElementById('displayValor').innerText = itemValor.toLocaleString('pt-br', {minimumFractionDigits: 2});

        const functionUrl = 'https://eisruaetsqrratemqswv.functions.supabase.co/checkout';

        document.getElementById('payForm').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnPagar');
            
            if(itemValor <= 0) return alert("Valor inválido.");

            btn.disabled = true;
            btn.innerHTML = `<div class="loading-spinner"></div> PROCESSANDO...`;

            try {
                const response = await fetch(functionUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: document.getElementById('nome').value,
                        email: document.getElementById('email').value,
                        total: itemValor,
                        itens: [{ nome: itemNome, preco: itemValor, qtd: 1 }]
                    })
                });

                const data = await response.json();
                if (data.init_point) {
                    window.location.href = data.init_point;
                } else {
                    throw new Error();
                }
            } catch (err) {
                alert("Erro ao gerar pagamento. Tente novamente.");
                btn.disabled = false;
                btn.innerHTML = "PAGAR AGORA";
            }
        };
    </script>
</body>
</html>
```