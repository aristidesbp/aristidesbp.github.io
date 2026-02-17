/**
 * ERP ABP - PDV HIGH-END EDITION
 * Fusão de Segurança Financeira + Scanner + Impressão Térmica
 */

let produtosDB = [];
let carrinho = [];
let html5QrCode = null;

document.addEventListener('DOMContentLoaded', () => {
    inicializarPDV();
    configurarAtalhos();
});

// --- 1. INICIALIZAÇÃO ---
async function inicializarPDV() {
    mostrarLoading(true, "Sincronizando Banco de Dados...");
    try {
        // Carrega produtos (apenas com estoque) [cite: 7]
        const { data: prods, error: errP } = await window.supabaseClient
            .from('produtos')
            .select('*')
            .gt('estoque_atual', 0);
        
        if (errP) throw errP;
        produtosDB = prods;

        // Carrega Clientes (Entidades) [cite: 3]
        const { data: ents } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo');
        
        const select = document.getElementById('select-cliente');
        ents?.forEach(c => select.add(new Option(c.nome_completo, c.id)));

        renderizarGridProdutos(produtosDB);
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com Supabase.");
    } finally {
        mostrarLoading(false);
    }
}

// --- 2. SCANNER & BUSCA ---
function toggleScanner() {
    const readerDiv = document.getElementById('reader'); // Certifique-se de ter este ID no HTML
    if (!html5QrCode) html5QrCode = new Html5Qrcode("reader");

    if (readerDiv.style.display === 'block') {
        html5QrCode.stop().then(() => { readerDiv.style.display = 'none'; });
    } else {
        readerDiv.style.display = 'block';
        html5QrCode.start({ facingMode: "environment" }, { fps: 15, qrbox: 250 }, (text) => {
            const p = produtosDB.find(prod => prod.codigo_de_barras === text);
            if (p) {
                adicionarAoCarrinho(p.id);
                if (navigator.vibrate) navigator.vibrate(100);
            }
        });
    }
}

// --- 3. LÓGICA DO CARRINHO ---
function adicionarAoCarrinho(id) {
    const produto = produtosDB.find(p => p.id === id);
    const item = carrinho.find(i => i.id === id);

    if (item) {
        if (item.quantidade < produto.estoque_atual) item.quantidade++;
        else return alert("Estoque insuficiente!");
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarUI();
}

function atualizarUI() {
    const lista = document.getElementById('carrinho-itens');
    const totalVenda = carrinho.reduce((acc, i) => acc + (i.preco_venda * i.quantidade), 0);

    lista.innerHTML = carrinho.length ? carrinho.map((item, idx) => `
        <div class="flex justify-between items-center bg-white p-3 rounded-lg border-l-4 border-blue-600 shadow-sm">
            <div>
                <p class="text-sm font-bold uppercase">${item.nome}</p>
                <p class="text-xs text-gray-500">${item.quantidade}x R$ ${item.preco_venda.toFixed(2)}</p>
            </div>
            <div class="text-right">
                <p class="font-bold text-blue-700">R$ ${(item.quantidade * item.preco_venda).toFixed(2)}</p>
                <button onclick="removerItem(${idx})" class="text-red-500 text-xs"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('') : '<div class="text-center text-gray-400 mt-10">Carrinho vazio</div>';

    document.getElementById('total-venda').innerText = `R$ ${totalVenda.toFixed(2)}`;
    document.getElementById('subtotal').innerText = `R$ ${totalVenda.toFixed(2)}`;
}

// --- 4. FINALIZAÇÃO (O "MOTOR" DE 10K) ---
async function finalizarVenda() {
    if (!carrinho.length) return alert("Carrinho vazio!");
    
    const total = carrinho.reduce((acc, i) => acc + (i.preco_venda * i.quantidade), 0);
    const clienteId = document.getElementById('select-cliente').value;
    const metodo = document.getElementById('metodo-pagamento').value;

    mostrarLoading(true, "Registrando Venda e Financeiro...");

    try {
        // A. Registrar Venda 
        const { data: venda, error: ev } = await window.supabaseClient.from('vendas').insert({
            entidade_id: clienteId || null,
            total_venda: total,
            metodo_pagamento: metodo
        }).select().single();
        if (ev) throw ev;

        // B. Itens e Estoque [cite: 7, 9]
        for (const item of carrinho) {
            await window.supabaseClient.from('venda_itens').insert({
                venda_id: venda.id,
                produto_id: item.id,
                quantidade: item.quantidade,
                preco_unitario: item.preco_venda
            });

            await window.supabaseClient.from('produtos')
                .update({ estoque_atual: item.estoque_atual - item.quantidade })
                .eq('id', item.id);
        }

        // C. Lançamento Financeiro Automático [cite: 4]
        await window.supabaseClient.from('financeiro').insert({
            entidade_id: clienteId || null,
            tipo: 'Receber',
            descricao: `Venda PDV - Ref: ${venda.id.slice(0,8)}`,
            valor: total,
            status: 'Pago',
            forma_pagamento: metodo,
            data_pagamento: new Date().toISOString()
        });

        imprimirCupom(total, metodo);
        alert("Venda Concluída!");
        carrinho = [];
        atualizarUI();
    } catch (err) {
        console.error(err);
        alert("Falha crítica na transação.");
    } finally {
        mostrarLoading(false);
    }
}

// --- 5. IMPRESSÃO TÉRMICA (80mm)  ---
function imprimirCupom(total, metodo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: [80, 160] });
    
    doc.setFontSize(10);
    doc.text("ERP ABP - COMPROVANTE", 40, 10, { align: "center" });
    doc.text("-".repeat(35), 40, 15, { align: "center" });
    
    let y = 25;
    carrinho.forEach(item => {
        doc.text(`${item.quantidade}x ${item.nome.substring(0,18)}`, 5, y);
        doc.text(`R$ ${(item.quantidade * item.preco_venda).toFixed(2)}`, 75, y, { align: "right" });
        y += 5;
    });

    doc.text("-".repeat(35), 40, y + 5, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 5, y + 15);
    doc.setFontSize(8);
    doc.text(`Pagamento: ${metodo}`, 5, y + 20);
    doc.text(`Data: ${new Date().toLocaleString()}`, 5, y + 25);
    
    doc.save(`venda_${Date.now()}.pdf`);
}

function mostrarLoading(show, msg) {
    const loader = document.getElementById('loading-overlay');
    loader.querySelector('span').innerText = msg;
    loader.style.display = show ? 'flex' : 'none';
}

function configurarAtalhos() {
    window.addEventListener('keydown', (e) => {
        if(e.key === 'F2') { e.preventDefault(); finalizarVenda(); }
        if(e.key === 'F4') { e.preventDefault(); document.getElementById('busca-produto').focus(); }
    });
}
