// CONFIGURAÇÃO SUPABASE
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let produtosDB = [];
let carrinho = [];
let html5QrCode;

// INICIALIZAÇÃO
async function inicializar() {
    const { data, error } = await _supabase.from('produtos').select('*');
    if (data) {
        produtosDB = data;
        console.log("Produtos carregados:", produtosDB.length);
    } else {
        console.error("Erro ao carregar produtos:", error);
    }
}

// SCANNER DE CÂMERA
function toggleScanner() {
    const readerDiv = document.getElementById('reader');
    if (readerDiv.style.display === 'block') {
        html5QrCode.stop().then(() => { 
            readerDiv.style.display = 'none'; 
        });
    } else {
        readerDiv.style.display = 'block';
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 15, qrbox: { width: 250, height: 150 } },
            (decodedText) => {
                // Tenta achar por código de barras ou SKU
                const p = produtosDB.find(prod => 
                    prod.codigo_barras === decodedText || 
                    prod.codigo_de_barras === decodedText
                );
                if (p) {
                    adicionarAoCarrinho(p.id);
                    if (navigator.vibrate) navigator.vibrate(100);
                }
            }
        ).catch(err => alert("Câmera não disponível ou permissão negada."));
    }
}

// BUSCA MANUAL
function buscarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const container = document.getElementById('resultadosBusca');
    
    if (termo.length < 1) {
        container.classList.add('hidden');
        return;
    }

    const filtrados = produtosDB.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        (p.codigo_barras && p.codigo_barras.includes(termo)) ||
        (p.codigo_de_barras && p.codigo_de_barras.includes(termo))
    );

    if (filtrados.length > 0) {
        container.innerHTML = filtrados.map(p => `
            <div onclick="adicionarAoCarrinho('${p.id}')" class="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3">
                <img src="${p.imagem_url || 'https://via.placeholder.com/50'}" class="w-10 h-10 rounded-lg object-cover">
                <div class="flex-1">
                    <div class="font-bold dark:text-white">${p.nome}</div>
                    <div class="text-xs text-gray-500 font-medium">R$ ${parseFloat(p.preco_venda).toFixed(2)}</div>
                </div>
                <span class="material-symbols-outlined text-primary">add_circle</span>
            </div>
        `).join('');
        container.classList.remove('hidden');
    } else {
        container.innerHTML = `<div class="p-4 text-center text-gray-500">Nenhum produto...</div>`;
    }
}

// GERENCIAMENTO DO CARRINHO
function adicionarAoCarrinho(id) {
    const produto = produtosDB.find(p => p.id === id);
    const itemExistente = carrinho.find(i => i.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    document.getElementById('inputBusca').value = '';
    document.getElementById('resultadosBusca').classList.add('hidden');
    renderizarCarrinho();
}

function alterarQtd(id, delta) {
    const item = carrinho.find(i => i.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(i => i.id !== id);
        }
        renderizarCarrinho();
    }
}

function renderizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalEl = document.getElementById('total-geral');
    const btnImp = document.getElementById('btn-imprimir');
    
    if (carrinho.length === 0) {
        lista.innerHTML = `
            <div id="carrinho-vazio" class="text-center py-20 text-gray-400">
                <span class="material-symbols-outlined text-6xl">shopping_cart</span>
                <p class="mt-2 font-medium">Carrinho pronto para vender</p>
            </div>`;
        totalEl.innerText = "R$ 0,00";
        btnImp.classList.add('hidden');
        return;
    }

    btnImp.classList.remove('hidden');
    let total = 0;
    
    lista.innerHTML = carrinho.map(item => {
        const sub = item.preco_venda * item.quantidade;
        total += sub;
        return `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
                <img src="${item.imagem_url || 'https://via.placeholder.com/80'}" class="h-16 w-16 rounded-xl object-cover bg-gray-50">
                <div class="flex-1">
                    <h3 class="font-bold text-sm dark:text-white line-clamp-1">${item.nome}</h3>
                    <p class="text-primary font-black">R$ ${parseFloat(item.preco_venda).toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-xl p-1">
                    <button onclick="alterarQtd('${item.id}', -1)" class="w-8 h-8 flex items-center justify-center font-bold text-gray-500">-</button>
                    <span class="w-6 text-center font-bold dark:text-white">${item.quantidade}</span>
                    <button onclick="alterarQtd('${item.id}', 1)" class="w-8 h-8 flex items-center justify-center font-bold text-gray-500">+</button>
                </div>
            </div>
        `;
    }).join('');
    
    totalEl.innerText = `R$ ${total.toFixed(2)}`;
}

// IMPRESSÃO E FINALIZAÇÃO
function imprimirCupom() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: [80, 150] });
    
    doc.setFontSize(10);
    doc.text("ERP ABP - RECIBO", 40, 10, { align: 'center' });
    doc.setFontSize(7);
    doc.text(`Data: ${new Date().toLocaleString()}`, 10, 16);
    doc.text("-".repeat(50), 10, 20);
    
    let y = 25;
    carrinho.forEach(item => {
        doc.text(`${item.quantidade}x ${item.nome.substring(0, 22)}`, 10, y);
        doc.text(`R$ ${(item.preco_venda * item.quantidade).toFixed(2)}`, 60, y);
        y += 5;
    });
    
    doc.text("-".repeat(50), 10, y + 2);
    doc.setFontSize(9);
    const total = carrinho.reduce((acc, i) => acc + (i.preco_venda * i.quantidade), 0);
    doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 10, y + 8);
    
    doc.save(`venda_${Date.now()}.pdf`);
}

async function finalizarVenda() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    
    const total = carrinho.reduce((acc, i) => acc + (i.preco_venda * i.quantidade), 0);

    try {
        const { data: v, error } = await _supabase.from('vendas').insert([
            { total_venda: total, metodo_pagamento: 'Dinheiro' }
        ]).select();

        if (error) throw error;

        const itens = carrinho.map(i => ({ 
            venda_id: v[0].id, 
            produto_id: i.id, 
            quantidade: i.quantidade, 
            preco_unitario: i.preco_venda 
        }));

        const { error: errorItens } = await _supabase.from('venda_itens').insert(itens);
        if (errorItens) throw errorItens;

        alert("Venda registrada com sucesso!");
        imprimirCupom();
        carrinho = [];
        renderizarCarrinho();
        
    } catch (err) {
        console.error(err);
        alert("Erro ao salvar venda no banco de dados.");
    }
}

// Iniciar app
document.addEventListener('DOMContentLoaded', inicializar);
