<!DOCTYPE html>
<!--🟥INICIO BLOCO 1: adm_v3.html (Gerador de Cardápio v3)🟥-->
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Cardápio v13</title>
    <link rel="manifest" href="manifest.webmanifest">
    <link rel="apple-touch-icon" href="icon-192.png">
    <meta name="theme-color" content="#1e293b">
    <script src="install_app_pwa.js" defer></script>

    <!-- CONSOLE MOBILE (embutido: não precisa mais do arquivo console.js) -->
    <script>
        /* Esta função é copiada como texto para dentro do index.html gerado
           (via toString), por isso precisa ser 100% autossuficiente. */
        function criarConsoleMobile() {
            const btn = document.createElement('button');
            btn.textContent = '🛠️ Log';
            btn.style.cssText = 'position:fixed;top:10px;right:10px;padding:10px 14px;background:#475569;color:#fff;border:1px solid #fff;border-radius:8px;font-weight:bold;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,.6);z-index:100000;display:none;';

            const box = document.createElement('div');
            box.style.cssText = 'position:fixed;top:55px;left:10px;right:10px;height:300px;background:rgba(0,0,0,.95);color:#00ff00;font-family:monospace;font-size:13px;padding:12px;overflow-y:auto;z-index:99999;display:none;border-radius:10px;border:1px solid #333;box-shadow:0 4px 15px rgba(0,0,0,.6);word-wrap:break-word;';

            function montar() { document.body.appendChild(box); document.body.appendChild(btn); }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
            else montar();

            btn.addEventListener('click', function () {
                box.style.display = box.style.display === 'none' ? 'block' : 'none';
            });

            function espelhar(tipo, cor, args) {
                const linha = document.createElement('div');
                linha.style.cssText = 'color:' + cor + ';margin-bottom:6px;border-bottom:1px solid #222;padding-bottom:4px;';
                const texto = Array.from(args).map(function (a) {
                    if (a instanceof Error) return a.message + ' | ' + a.stack;
                    if (typeof a === 'object') { try { return JSON.stringify(a); } catch (e) { return String(a); } }
                    return String(a);
                }).join(' ');
                linha.textContent = '[' + tipo + '] ' + texto;
                box.appendChild(linha);
                box.scrollTop = box.scrollHeight;
            }

            [['log', 'LOG', '#10b981'], ['warn', 'AVISO', '#f59e0b'], ['error', 'ERRO', '#ef4444']].forEach(function (c) {
                const original = console[c[0]];
                console[c[0]] = function () {
                    original.apply(console, arguments);
                    espelhar(c[1], c[2], arguments);
                };
            });

            window.addEventListener('error', function (e) {
                console.error('Falha Fatal:', e.message, '| Arquivo:', e.filename, '| Linha:', e.lineno);
            });
            window.addEventListener('unhandledrejection', function (e) {
                console.error('Falha de Promessa:', e.reason);
            });

            console.log('🛠️ Console Mobile Ativo.');

            return {
                mostrarBotao: function (v) {
                    btn.style.display = v ? 'block' : 'none';
                    if (!v) box.style.display = 'none';
                }
            };
        }
        /* Funções copiadas como texto para o index.html gerado (toString): precisam ser autossuficientes */
        function hashPedido(str, salt) { /* hash de 2x53 bits (cyrb53) com sal da loja */
            function c(s, seed) {
                let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
                for (let i = 0; i < s.length; i++) { const ch = s.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
                h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
                h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
                return 4294967296 * (2097151 & h2) + (h1 >>> 0);
            }
            const t = salt + "|" + str;
            return (c(t, 1).toString(36) + c(t, 7).toString(36)).toUpperCase().slice(0, 14);
        }
        function montarPayload(id, linhas) { /* texto canônico: id | itens:preços | total */
            let t = 0;
            const it = linhas.map(function (l) { const c = Math.round(l.preco * 100); t += c; return l.label + ":" + (c / 100).toFixed(2); });
            return id + "|" + it.join(";") + "|" + (t / 100).toFixed(2);
        }
        function gerarPixPayload(chave, nome, cidade, valor, txid) { /* Pix "copia e cola" (BR Code + CRC16) */
            const f = function (id, v) { return id + String(v.length).padStart(2, "0") + v; };
            const lim = function (x, n) { return x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, n); };
            let p = f("00", "01") + f("01", "11") + f("26", f("00", "br.gov.bcb.pix") + f("01", chave)) + f("52", "0000") + f("53", "986") +
                (valor > 0 ? f("54", valor.toFixed(2)) : "") + f("58", "BR") + f("59", lim(nome, 25)) + f("60", lim(cidade, 15)) +
                f("62", f("05", (txid || "***").replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "***")) + "6304";
            let crc = 0xFFFF;
            for (let i = 0; i < p.length; i++) { crc ^= p.charCodeAt(i) << 8; for (let b = 0; b < 8; b++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF; }
            return p + crc.toString(16).toUpperCase().padStart(4, "0");
        }
        const consoleAdmin = criarConsoleMobile();
    </script>

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { theme: { extend: { colors: { adminDark: '#1e293b', adminRed: '#ea1d2c' } } } }
    </script>
</head>
<body class="bg-gray-100 text-gray-800 font-sans antialiased pb-20 pt-12">

    <header class="fixed top-0 inset-x-0 h-12 bg-adminDark text-white flex items-center gap-3 px-3 z-40 shadow">
        <button onclick="alternarMenu()" class="text-2xl leading-none px-2" aria-label="Menu">☰</button>
        <span id="nav-nome" class="font-bold truncate">Gerador de Cardápio</span>
    </header>
    <div id="menu-fundo" onclick="alternarMenu()" class="hidden fixed inset-0 bg-black/50" style="z-index:45"></div>
    <aside id="menu-lateral" class="fixed top-0 left-0 bottom-0 w-72 bg-adminDark text-white z-50 p-4 space-y-2 -translate-x-full transition-transform overflow-y-auto">
        <button id="tab-avisos" onclick="mostrarAba('avisos')" class="w-full text-left px-3 py-3 rounded font-bold text-sm bg-adminRed text-white">⚠️ Avisos importantes</button>
        <p class="text-xs text-gray-400 uppercase pt-2">Navegação</p>
        <button id="tab-cfg" onclick="mostrarAba('cfg')" class="w-full text-left px-3 py-3 rounded font-bold text-sm bg-gray-300 text-gray-700">⚙️ Configuração</button>
        <button id="tab-catalogo" onclick="mostrarAba('catalogo')" class="w-full text-left px-3 py-3 rounded font-bold text-sm bg-gray-300 text-gray-700">📋 Catálogo</button>
        <button id="tab-pdv" onclick="mostrarAba('pdv')" class="w-full text-left px-3 py-3 rounded font-bold text-sm bg-gray-300 text-gray-700">🧾 PDV</button>
        <button id="tab-ent" onclick="mostrarAba('ent')" class="w-full text-left px-3 py-3 rounded font-bold text-sm bg-gray-300 text-gray-700">📦 Entregas</button>
        <button id="tab-fin" onclick="mostrarAba('fin')" class="w-full text-left px-3 py-3 rounded font-bold text-sm bg-gray-300 text-gray-700">💰 Financeiro</button>
        <p class="text-xs text-gray-400 uppercase pt-3">Ferramentas</p>
        <button onclick="fecharMenu(); exportarBackup()" class="w-full text-left px-3 py-3 rounded text-sm bg-blue-600">💾 Backup completo</button>
        <label class="block px-3 py-3 rounded text-sm bg-slate-600 cursor-pointer">📄 Importar XML de NF-e (compra)<input type="file" accept=".xml" class="hidden" onchange="fecharMenu(); importarXMLNota(event)"></label>
        <label class="block px-3 py-3 rounded text-sm bg-teal-700 cursor-pointer">🔄 Sincronizar (mesclar backup de outro aparelho)<input type="file" accept=".json" class="hidden" onchange="fecharMenu(); mesclarBackup(event)"></label>
        <button onclick="abrirInstalacao()" class="w-full text-left px-3 py-3 rounded text-sm bg-indigo-700">📲 Instalar aplicativo (PWA)</button>
        <button onclick="apagarBanco()" class="w-full text-left px-3 py-3 rounded text-sm bg-red-900">🗑️ Apagar banco de dados</button>
        <button onclick="fecharMenu(); exportarHTMLCompleto()" class="w-full text-left px-3 py-3 rounded text-sm font-bold bg-green-600">🚀 Gerar Site (catalogo.html)</button>
    </aside>
    <button id="btn-topo" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="hidden fixed bottom-5 right-4 w-10 h-10 rounded-full bg-adminDark/70 text-white shadow z-30" title="Voltar ao topo">↑</button></header>

    <div id="alerta-container" class="fixed top-14 inset-x-0 z-50 px-4 hidden">
        <div id="alerta-msg" class="px-4 py-3 rounded text-sm font-bold shadow border"></div>
    </div>

    </nav>

    <main id="aba-avisos" class="max-w-4xl mx-auto px-4 mt-6">
        <h2 class="text-2xl font-extrabold text-gray-800">⚠️ Avisos importantes</h2>
        <p class="text-sm text-gray-600 mb-4">Leia com atenção antes de usar com dados reais.</p>
        <div class="space-y-3"><div class="bg-white rounded-lg shadow p-4 border-l-4 border-adminRed"><h3 class="font-bold text-gray-800">💾 Por que o backup é essencial</h3><ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1"><li>Seus dados ficam <b>somente neste aparelho</b>, no navegador. <b>Não existe servidor com cópia.</b></li><li>Limpar os dados do navegador, trocar, formatar ou perder o celular pode apagar tudo.</li><li>Faça o <b>Backup completo</b> (menu ☰) ao fechar o turno ou o dia e guarde o arquivo em local seguro, como o Google Drive.</li></ul></div><div class="bg-white rounded-lg shadow p-4 border-l-4 border-adminRed"><h3 class="font-bold text-gray-800">👥 Equipe e Google Drive</h3><ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1"><li>Cada aparelho trabalha sozinho, mesmo sem internet. Para juntar tudo: cada pessoa faz o <b>Backup</b> e envia o arquivo para uma <b>pasta compartilhada do Google Drive</b>.</li><li>Os outros baixam o arquivo e usam <b>Sincronizar (mesclar backup)</b>. Vendas, lançamentos e estoque somam; no cadastro de produtos vale a alteração mais recente.</li><li>Combine uma rotina (ex.: ao fechar cada turno) e mantenha a <b>data e hora</b> dos aparelhos corretas.</li><li>O backup contém dados da loja e de clientes: compartilhe só com quem tem sua confiança.</li></ul></div><div class="bg-white rounded-lg shadow p-4 border-l-4 border-adminRed"><h3 class="font-bold text-gray-800">🧪 Entenda e teste antes de implantar</h3><ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1"><li>Use <b>dados de teste</b> e simule o caminho completo: cliente → WhatsApp → validar → entrega → recebimento → financeiro.</li><li>Teste backup, sincronização entre dois aparelhos, impressão do cupom e instalação como app.</li><li>Quando estiver seguro, use <b>Apagar banco de dados</b> (menu ☰) para zerar e começar valendo. Quanto mais você testar, maior o seu domínio do sistema.</li></ul></div><div class="bg-white rounded-lg shadow p-4 border-l-4 border-adminRed"><h3 class="font-bold text-gray-800">🛡️ Responsabilidade</h3><ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1"><li>Sistema <b>open source e gratuito</b>, oferecido <b>“como está”</b>, sem garantias.</li><li><b>Não temos acesso aos seus dados</b>, que ficam no seu aparelho. Por isso não conseguimos recuperá-los e <b>não nos responsabilizamos por dados perdidos</b>, nem por erros de valores, estoque ou fiscais.</li><li>Backup e conferência dos números são de responsabilidade de quem usa.</li></ul></div><div class="bg-white rounded-lg shadow p-4 border-l-4 border-adminRed"><h3 class="font-bold text-gray-800">🧭 Consultoria antes de implantar de verdade</h3><ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1"><li>Antes de usar com clientes e dinheiro reais, recomendamos uma <b>consultoria</b>: contador para a parte fiscal e consultor ou desenvolvedor para a implantação, rotina de backup e cuidados com a LGPD.</li><li>O XML de venda gerado aqui é só para <b>conferência</b>: ele não é nota fiscal.</li></ul></div></div>
        <div class="flex flex-wrap gap-2 mt-5">
            <button onclick="mostrarAba('cfg')" class="bg-adminRed text-white font-bold px-5 py-3 rounded shadow">Entendi, ir para Configuração →</button>
            <button onclick="exportarBackup()" class="bg-adminDark text-white font-bold px-5 py-3 rounded shadow">💾 Fazer backup agora</button>
        </div>
    </main>

    <main id="aba-catalogo" class="hidden max-w-4xl mx-auto px-4 mt-6">

        

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-700">Catálogo Local</h2>
            <button onclick="abrirModal()" class="bg-adminRed text-white px-4 py-2 rounded shadow font-bold hover:bg-red-700">+ Adicionar produtos</button>
        </div>
        <div class="flex gap-2 mb-2"><input id="busca-admin" oninput="renderizarAdmin()" placeholder="Buscar por nome ou código de barras" class="flex-1 border rounded p-2 text-sm bg-white"><button type="button" onclick="abrirScanner(buscaLida)" class="bg-adminDark text-white px-4 rounded text-xl" title="Ler código de barras">📷</button></div>
        <select id="filtro-admin-cat" onchange="renderizarAdmin()" class="w-full sm:w-64 border rounded p-2 text-sm bg-white mb-3"></select>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div id="lista-admin" class="divide-y divide-gray-200">
                <p class="p-6 text-center text-gray-500">Nenhum produto. Adicione ou importe.</p>
            </div>
        </div>
    </main>

    <main id="aba-pdv" class="hidden max-w-4xl mx-auto px-4 mt-6">
        <div class="bg-white rounded shadow p-4 mb-4">
            <h3 class="font-bold mb-2">🔐 Validar pedido do WhatsApp</h3>
            <textarea id="val-texto" rows="5" placeholder="Cole aqui a mensagem do cliente" class="w-full border rounded p-2 text-sm"></textarea>
            <button onclick="validarPedido()" class="bg-adminDark text-white px-4 py-2 rounded text-sm font-bold mt-2">Validar</button>
            <div id="val-resultado" class="mt-2 text-sm font-bold"></div>
        </div>
        <div id="pdv-turno" class="text-sm mb-3"></div>
        <div class="flex gap-2 mb-2"><input id="pdv-busca" oninput="pdvBuscar()" onkeydown="if(event.key==='Enter')pdvEnter()" placeholder="Código ou nome (Enter adiciona)" class="flex-1 border rounded p-3 bg-white"><button type="button" onclick="abrirScanner(pdvLido)" class="bg-adminDark text-white px-4 rounded text-xl" title="Ler código de barras">📷</button></div>
        <div id="pdv-resultados" class="bg-white rounded shadow divide-y mb-4"></div>
        <div class="bg-white rounded shadow p-4">
            <div id="pdv-itens"></div>
            <div class="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><span id="pdv-total">R$ 0,00</span></div>
            <select id="pdv-forma" onchange="pdvRender()" class="w-full border rounded p-2 mt-3 bg-white"><option>Dinheiro</option><option>Pix</option><option>Cartão</option></select>
            <div id="pdv-din" class="mt-2"><input id="pdv-recebido" type="number" step="0.01" oninput="pdvRender()" placeholder="Valor recebido" class="w-full border rounded p-2"><p id="pdv-troco" class="font-bold mt-1"></p></div>
            <button onclick="pdvFinalizar()" class="w-full bg-green-600 text-white font-bold py-3 rounded mt-3">✅ Finalizar venda</button>
        </div>
        <div class="bg-white rounded shadow p-4 mt-4"><h3 class="font-bold mb-2">💸 Sangria / saída de caixa</h3>
            <input id="sang-valor" type="number" step="0.01" placeholder="Valor (R$)" class="w-full border rounded p-2 mb-2">
            <input id="sang-motivo" type="text" placeholder="Motivo (ex.: pagamento do motoboy)" class="w-full border rounded p-2 mb-2">
            <button onclick="registrarSangria()" class="w-full bg-adminRed text-white font-bold py-2 rounded">Registrar sangria</button>
        </div>
        </main>

    <main id="aba-cfg" class="hidden max-w-4xl mx-auto px-4 mt-6">
        <!-- APARÊNCIA: banner, logo e console -->
        <section class="bg-white rounded-lg shadow p-4 mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3">🏪 Estabelecimento e aparência</h2>

            <div class="grid sm:grid-cols-3 gap-3 mb-4 pb-4 border-b">
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Nome do estabelecimento</label>
                    <input type="text" id="cfg-nome" class="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-adminRed">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Frase / tipo de negócio</label>
                    <input type="text" id="cfg-subtitulo" placeholder="Ex.: Pizzaria • Entrega grátis" class="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-adminRed">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">WhatsApp dos pedidos</label>
                    <input type="tel" id="cfg-whats" placeholder="5591999999999" class="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-adminRed">
                </div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">CEP</label><input type="text" id="cfg-cep" class="w-full border rounded p-2 text-sm"></div>
                <div class="sm:col-span-2"><label class="block text-xs font-bold text-gray-700 mb-1">Endereço completo</label><input type="text" id="cfg-endereco" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">Chave Pix</label><input type="text" id="cfg-pix" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">Cidade (Pix)</label><input type="text" id="cfg-pixcidade" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">Link Mercado Pago</label><input type="url" id="cfg-mplink" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">CNPJ (NF-e)</label><input type="text" id="cfg-cnpj" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">Inscrição Estadual</label><input type="text" id="cfg-ie" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">UF (ex.: PA)</label><input type="text" id="cfg-uf" class="w-full border rounded p-2 text-sm"></div>
                <div><label class="block text-xs font-bold text-gray-700 mb-1">CRT (1 = Simples)</label><input type="text" id="cfg-crt" class="w-full border rounded p-2 text-sm"></div>
                <label class="flex items-center gap-2 text-sm"><input type="checkbox" id="cfg-mp" class="h-5 w-5"> Botão Mercado Pago</label>
                <label class="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" id="cfg-tema" class="h-5 w-5"> Alternância claro/escuro no cardápio</label>
                <div class="sm:col-span-3">
                    <button type="button" onclick="salvarDadosLoja()" class="bg-adminDark text-white px-4 py-2 rounded text-sm font-bold">💾 Salvar dados</button>
                    <span class="text-xs text-gray-500 ml-2">WhatsApp com DDI + DDD + número.</span>
                </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Banner (capa)</label>
                    <div class="h-24 w-full rounded bg-gray-200 border overflow-hidden flex items-center justify-center mb-2">
                        <img id="cfg-banner-preview" class="hidden w-full h-full object-cover" alt="Banner">
                        <span id="cfg-banner-vazio" class="text-xs text-gray-500">Sem banner</span>
                    </div>
                    <input type="file" accept="image/*" class="text-sm w-full file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-adminRed"
                           onchange="trocarImagemConfig('banner', this, 900, 400)">
                    <button type="button" onclick="removerImagemConfig('banner')" class="mt-2 text-xs text-red-600 font-bold">Remover banner</button>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Logo</label>
                    <div class="h-24 w-24 rounded-full bg-gray-200 border overflow-hidden flex items-center justify-center mb-2">
                        <img id="cfg-logo-preview" class="hidden w-full h-full object-cover" alt="Logo">
                        <span id="cfg-logo-vazio" class="text-xs text-gray-500">Sem logo</span>
                    </div>
                    <input type="file" accept="image/*" class="text-sm w-full file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-adminRed"
                           onchange="trocarImagemConfig('logo', this, 300, 300)">
                    <button type="button" onclick="removerImagemConfig('logo')" class="mt-2 text-xs text-red-600 font-bold">Remover logo</button>
                </div>
            </div>

            <label class="flex items-start gap-3 mt-4 p-3 bg-gray-50 border rounded cursor-pointer">
                <input type="checkbox" id="cfg-console" class="mt-1 h-5 w-5" onchange="alternarConsole(this.checked)">
                <span class="text-sm">
                    <b>Adicionar botão flutuante do console</b> no canto superior direito da página
                    <span class="block text-xs text-gray-500">Útil para ver erros no celular. Vale para este gerador e para o index.html gerado.</span>
                </span>
            </label>
        </section>
    </main>

    <main id="aba-ent" class="hidden max-w-4xl mx-auto px-4 mt-6">
        <h2 class="text-lg font-bold text-gray-700 mb-1">📦 Entregas e recebimentos</h2>
        <p class="text-xs text-gray-500 mb-3">Pedidos validados ficam aqui até você confirmar a entrega e o recebimento. Só os concluídos entram nos totais do Financeiro.</p>
        <div class="bg-white rounded shadow p-4 mb-3 flex flex-wrap items-end gap-3">
            <div><label class="block text-xs font-bold mb-1">Data início</label><input type="date" id="ent-de" onchange="entRender()" class="border rounded p-2 text-sm"></div>
            <div><label class="block text-xs font-bold mb-1">Data final</label><input type="date" id="ent-ate" onchange="entRender()" class="border rounded p-2 text-sm"></div>
            <select id="ent-status" onchange="entRender()" class="border rounded p-2 text-sm bg-white"><option value="abertos">Em aberto</option><option value="todos">Todos</option><option value="concluido">Concluídos</option><option value="cancelado">Cancelados</option></select>
            <input id="ent-busca" oninput="entRender()" placeholder="Buscar pedido, cliente, endereço, item..." class="border rounded p-2 text-sm flex-1 min-w-[10rem]">
            <button type="button" onclick="document.getElementById('ent-de').value = ''; document.getElementById('ent-ate').value = ''; document.getElementById('ent-busca').value = ''; document.getElementById('ent-status').value = 'abertos'; entRender()" class="text-sm text-gray-600 underline">Limpar</button>
        </div>
        <div id="ent-lista"></div>
    </main>

    <main id="aba-fin" class="hidden max-w-4xl mx-auto px-4 mt-6">
        <div class="bg-white rounded shadow p-4 mb-3 flex flex-wrap items-end gap-3">
            <div><label class="block text-xs font-bold mb-1">Data início</label><input type="date" id="fin-de" onchange="finRender()" class="border rounded p-2 text-sm"></div>
            <div><label class="block text-xs font-bold mb-1">Data final</label><input type="date" id="fin-ate" onchange="finRender()" class="border rounded p-2 text-sm"></div>
            <button type="button" onclick="document.getElementById('fin-de').value = ''; document.getElementById('fin-ate').value = ''; finRender()" class="text-sm text-gray-600 underline">Limpar</button>
            <select id="fin-tipo" onchange="finRender()" class="border rounded p-2 text-sm bg-white"><option value="">Todos os tipos</option><option value="turnos">Turnos fechados</option><option value="pedidos">Pedidos validados</option><option value="entradas">Entradas</option><option value="saidas">Saídas</option></select>
            <input id="fin-busca" oninput="finRender()" placeholder="Buscar..." class="border rounded p-2 text-sm flex-1 min-w-[8rem]">
            <button type="button" onclick="exportarXMLFiltrado()" class="bg-green-700 text-white px-4 py-2 rounded text-sm font-bold">📤 Exportar XML (NF-e)</button>
            <button type="button" onclick="imprimirPeriodo()" class="bg-adminDark text-white px-4 py-2 rounded text-sm font-bold">🖨️ Imprimir período</button>
        </div>
        <div id="fin-conteudo" class="mb-6"></div>
        </main>

    <div id="modal-scan" class="hidden fixed inset-0 bg-black/90 flex-col items-center justify-center p-4" style="z-index:99990">
        <p class="text-white text-sm mb-2">Aponte a câmera para o código de barras</p>
        <video id="scan-video" class="w-full max-w-md rounded bg-black" playsinline muted></video>
        <button type="button" onclick="fecharScanner()" class="mt-4 bg-white text-gray-800 font-bold px-6 py-2 rounded">Cancelar</button>
    </div>

    <div id="modal-nfe" class="hidden fixed inset-0 bg-black/70 flex-col items-center justify-center p-2" style="z-index:60">
        <div class="bg-white rounded-xl w-full max-w-5xl max-h-full flex flex-col">
            <div class="p-3 border-b flex flex-wrap items-center gap-2"><b id="nf-titulo" class="text-sm"></b>
                <input id="nf-cat" value="Importados NF-e" class="border rounded p-1 text-sm w-40" title="Categoria dos novos">
                <input id="nf-margem" type="number" value="30" class="border rounded p-1 text-sm w-16" title="Margem %"><button onclick="nfAplicarMargem()" class="text-xs bg-gray-200 px-2 py-1 rounded">Aplicar margem %</button>
                <button onclick="nfFechar()" class="ml-auto text-xl px-2">✕</button></div>
            <div class="overflow-auto p-2"><table id="nf-tab" class="text-xs w-full"></table></div>
            <div class="p-3 border-t text-right"><button onclick="nfSalvar()" class="bg-green-600 text-white font-bold px-4 py-2 rounded">💾 Salvar no banco</button></div>
        </div>
    </div>

    <!-- Modal de Produto -->
    <div id="modal-produto" class="fixed inset-0 bg-black/70 z-50 hidden flex-col justify-center items-center p-4">
        <div class="bg-white w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-full">
            <div class="flex justify-between items-center p-4 border-b">
                <h3 id="modal-titulo" class="text-lg font-bold">Produto</h3>
                <button onclick="fecharModal()" class="text-gray-500 text-xl px-2 font-bold">✕</button>
            </div>

            <div class="p-4 overflow-y-auto space-y-4">
                <input type="hidden" id="prod-id">
                <input type="hidden" id="prod-imagem-base64">

                <div class="flex items-center gap-4 border p-3 rounded bg-gray-50">
                    <img id="preview-img" class="w-20 h-20 object-cover rounded shadow border bg-white" alt="Prévia">
                    <div class="flex-1">
                        <label class="block text-xs font-bold text-gray-700 mb-1">Foto do produto (opcional)</label>
                        <input type="file" id="prod-arquivo-cam" accept="image/*" capture="environment" class="text-sm w-full mb-1"><input type="file" id="prod-arquivo-img" accept="image/*" class="text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-adminRed">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Nome *</label>
                    <input type="text" id="prod-nome" class="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-adminRed outline-none">
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Categoria *</label>
                    <input type="text" id="prod-categoria" placeholder="Ex.: Pizzas, Bebidas, Camisetas..." class="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-adminRed outline-none">
                    <select id="prod-categoria-existente" onchange="escolherCategoriaExistente(this)" class="w-full border rounded p-2 text-sm mt-2 text-gray-600 bg-white"></select>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Descrição</label>
                    <textarea id="prod-descricao" rows="2" placeholder="Ingredientes, detalhes, material..." class="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-adminRed outline-none"></textarea>
                </div>

                <div><label class="block text-xs font-bold text-gray-700 mb-1">Código de barras</label><div class="flex gap-2"><input type="text" id="prod-codigo" class="flex-1 border rounded p-2 text-sm"><button type="button" onclick="abrirScanner(function (c) { document.getElementById('prod-codigo').value = c; })" class="bg-adminDark text-white px-3 rounded" title="Ler código de barras">📷</button></div></div>
                <div class="border-t pt-3 mt-3 grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-adminRed mb-1">Preço (R$) *</label>
                        <input type="number" id="prod-preco" step="0.01" min="0" class="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-adminRed outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Tamanho / medida</label>
                        <input type="text" id="prod-tamanho" placeholder="Ex.: 35 cm, 500 ml, M" class="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-adminRed outline-none">
                    </div>
                </div>
                <div class="border rounded p-3"><label class="flex items-center gap-2 text-sm font-bold"><input type="checkbox" id="prod-controla" class="h-5 w-5"> Controlar estoque</label>
                    <div class="grid grid-cols-2 gap-3 mt-2"><div><label class="block text-xs text-gray-600">Quantidade em estoque</label><input type="number" id="prod-estoque" step="any" class="w-full border rounded p-2 text-sm"></div>
                    <div><label class="block text-xs text-gray-600">Estoque mínimo (alerta)</label><input type="number" id="prod-estmin" step="any" class="w-full border rounded p-2 text-sm"></div></div></div>
                <details class="border rounded p-3"><summary class="text-xs font-bold text-gray-700 cursor-pointer">🧾 Dados fiscais (NF-e)</summary><p class="text-[11px] text-gray-500 my-2">Vazios usam o padrão: CFOP 5102, UN, origem 0, CSOSN 102. Confirme com seu contador.</p><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs text-gray-600">NCM (8 dígitos)</label><input type="text" id="prod-ncm" placeholder="ex.: 21069090" class="w-full border rounded p-2 text-sm"></div><div><label class="block text-xs text-gray-600">CEST</label><input type="text" id="prod-cest" placeholder="opcional" class="w-full border rounded p-2 text-sm"></div><div><label class="block text-xs text-gray-600">CFOP de venda</label><input type="text" id="prod-cfop" placeholder="5102" class="w-full border rounded p-2 text-sm"></div><div><label class="block text-xs text-gray-600">Unidade comercial</label><input type="text" id="prod-un" placeholder="UN" class="w-full border rounded p-2 text-sm"></div><div><label class="block text-xs text-gray-600">Origem (0-8)</label><input type="text" id="prod-orig" placeholder="0" class="w-full border rounded p-2 text-sm"></div><div><label class="block text-xs text-gray-600">CSOSN / CST</label><input type="text" id="prod-csosn" placeholder="102" class="w-full border rounded p-2 text-sm"></div><div><label class="block text-xs text-gray-600">Custo de compra (R$)</label><input type="text" id="prod-custo" placeholder="0.00" class="w-full border rounded p-2 text-sm"></div></div></details>
            </div>

            <div class="p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-xl">
                <button onclick="fecharModal()" class="px-4 py-2 border rounded text-gray-600 text-sm font-medium">Cancelar</button>
                <button onclick="salvarProduto()" class="px-4 py-2 bg-adminRed text-white rounded text-sm font-bold shadow">💾 Guardar</button>
            </div>
        </div>
    </div>

    <script>
        /* =========================================================
           DADOS (INDEXEDDB)
           ========================================================= */
        const DEV_ID = (function () { try { let d = localStorage.getItem("cardapio_dev"); if (!d) { d = Math.random().toString(36).slice(2, 8); localStorage.setItem("cardapio_dev", d); } return d; } catch (e) { return "dev" + Math.random().toString(36).slice(2, 6); } })();
        const NOME_DB = "ArtPizzaAdminDB";
        const NOME_STORE = "CatalogoStore";
        const IMG_VAZIA = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                const FISCAIS = ["ncm", "cest", "cfop", "un", "orig", "csosn", "custo"], CFG_FISCAL = ["cnpj", "ie", "uf", "crt"];
        const CONFIG_PADRAO = { cnpj: "", ie: "", uf: "", crt: "1", cep: "", endereco: "", pixChave: "", pixCidade: "", mpAtivo: false, mpLink: "", temaToggle: false, salt: "", nomeLoja: "Meu Estabelecimento", subtitulo: "", whatsapp: "", banner: "", logo: "", mostrarConsole: false };

        let db = null;
        let catalogoAtual = normalizar({});

        /* Garante a estrutura completa e converte dados antigos:
           produto da v3 com "tamanhos" vira um produto por tamanho. */
        function normalizar(d) {
            d = d || {};
            const produtos = [];
            (Array.isArray(d.produtos) ? d.produtos : []).forEach(function (p, i) {
                if (!p) return;
                const base = {
                    nome: p.nome || "", atualizadoEm: p.atualizadoEm || 0, controla: !!p.controla, estMin: Number(p.estMin) || 0, codigo: p.codigo || "", ncm: p.ncm || "", cest: p.cest || "", cfop: p.cfop || "", un: p.un || "", orig: p.orig || "", csosn: p.csosn || "", custo: p.custo || "",
                    categoria: String(p.categoria || "").trim() || "Sem categoria",
                    descricao: p.descricao || "",
                    imagem: p.imagem || ""
                };
                if (p.preco == null && p.tamanhos && typeof p.tamanhos === "object") {
                    Object.keys(p.tamanhos).forEach(function (tam, j) {
                        produtos.push(Object.assign({}, base, { id: Number(p.id) * 10 + j, preco: Number(p.tamanhos[tam]) || 0, tamanho: tam }));
                    });
                } else {
                    produtos.push(Object.assign({}, base, { id: Number(p.id) || Date.now() + i, preco: Number(p.preco) || 0, tamanho: p.tamanho || "" }));
                }
            });
            const cfg = Object.assign({}, CONFIG_PADRAO, d.config || {});
            if (!cfg.salt) cfg.salt = Math.random().toString(36).slice(2) + Date.now().toString(36); /* sal do hash */
            return { versao: 8, produtos: produtos, removidos: d.removidos || {}, config: cfg };
        }

        function moeda(v) { return "R$ " + Number(v).toFixed(2).replace(".", ","); }

        /* Lista as categorias que existem (a partir dos produtos cadastrados) */
        function listarCategorias() {
            const cats = [];
            catalogoAtual.produtos.forEach(function (p) { if (cats.indexOf(p.categoria) === -1) cats.push(p.categoria); });
            return cats;
        }

        function esc(t) {
            return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
                return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
            });
        }

        function inicializarDB() {
            return new Promise(function (resolve, reject) {
                const req = indexedDB.open(NOME_DB, 1);
                req.onupgradeneeded = function (e) {
                    const d = e.target.result;
                    if (!d.objectStoreNames.contains(NOME_STORE)) d.createObjectStore(NOME_STORE, { keyPath: "id" });
                };
                req.onsuccess = function (e) { db = e.target.result; carregarDoIndexedDB().then(resolve); };
                req.onerror = function () { reject(new Error("Não foi possível abrir o IndexedDB")); };
            });
        }

        function carregarDoIndexedDB() {
            return new Promise(function (resolve) {
                const req = db.transaction([NOME_STORE], "readonly").objectStore(NOME_STORE).get(1);
                req.onsuccess = function () {
                    if (req.result && req.result.dados) catalogoAtual = normalizar(req.result.dados);
                    console.log("Catálogo carregado:", catalogoAtual.produtos.length, "produto(s)");
                    renderizarTudo();
                    resolve();
                };
                req.onerror = function () { renderizarTudo(); resolve(); };
            });
        }

        function salvarNoIndexedDB(dados) {
            return new Promise(function (resolve, reject) {
                if (!db) return reject(new Error("Banco não iniciado"));
                dados = normalizar(dados);
                const tx = db.transaction([NOME_STORE], "readwrite");
                tx.objectStore(NOME_STORE).put({ id: 1, dados: dados });
                tx.oncomplete = function () { catalogoAtual = dados; renderizarTudo(); resolve(); };
                tx.onerror = function () { reject(new Error("Erro ao salvar no IndexedDB")); };
            });
        }

        /* =========================================================
           UTILITÁRIOS
           ========================================================= */
        function mostrarAlerta(msg, tipo) {
            const box = document.getElementById("alerta-container");
            const el = document.getElementById("alerta-msg");
            el.textContent = msg;
            el.className = "px-4 py-3 rounded text-sm font-bold shadow border " +
                (tipo === "erro" ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700");
            box.classList.remove("hidden");
            clearTimeout(mostrarAlerta._t);
            mostrarAlerta._t = setTimeout(function () { box.classList.add("hidden"); }, 5000);
        }

        /* Redimensiona e converte para Base64 (WebP; JPEG se o navegador não gerar WebP) */
        function comprimirImagem(file, maxW, maxH, qualidade) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader();
                reader.onerror = function () { reject(new Error("Falha ao ler o arquivo")); };
                reader.onload = function (e) {
                    const img = new Image();
                    img.onerror = function () { reject(new Error("Arquivo não é uma imagem válida")); };
                    img.onload = function () {
                        const escala = Math.min(1, maxW / img.width, maxH / img.height);
                        const w = Math.max(1, Math.round(img.width * escala));
                        const h = Math.max(1, Math.round(img.height * escala));
                        const canvas = document.createElement("canvas");
                        canvas.width = w; canvas.height = h;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, w, h);
                        let saida = canvas.toDataURL("image/webp", qualidade);
                        if (saida.indexOf("data:image/webp") !== 0) {
                            ctx.globalCompositeOperation = "destination-over";
                            ctx.fillStyle = "#fff";
                            ctx.fillRect(0, 0, w, h);
                            saida = canvas.toDataURL("image/jpeg", qualidade);
                        }
                        resolve(saida);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        }

        /* =========================================================
           APARÊNCIA (banner, logo, console)
           ========================================================= */
        function setPreview(imgId, vazioId, src) {
            const img = document.getElementById(imgId), vazio = document.getElementById(vazioId);
            if (src) { img.src = src; img.classList.remove("hidden"); vazio.classList.add("hidden"); }
            else { img.removeAttribute("src"); img.classList.add("hidden"); vazio.classList.remove("hidden"); }
        }

        function renderizarConfig() {
            const c = catalogoAtual.config;
            document.getElementById("cfg-nome").value = c.nomeLoja || "";
            document.getElementById("nav-nome").textContent = c.nomeLoja || "Gerador de Cardápio";
            document.getElementById("cfg-subtitulo").value = c.subtitulo || "";
            document.getElementById("cfg-whats").value = c.whatsapp || "";
            document.getElementById("cfg-cep").value = c.cep; document.getElementById("cfg-endereco").value = c.endereco;
            document.getElementById("cfg-pix").value = c.pixChave; document.getElementById("cfg-pixcidade").value = c.pixCidade;
            document.getElementById("cfg-mplink").value = c.mpLink; document.getElementById("cfg-mp").checked = !!c.mpAtivo;
            document.getElementById("cfg-tema").checked = !!c.temaToggle;
            CFG_FISCAL.forEach(function (k) { document.getElementById("cfg-" + k).value = c[k] || ""; });
            setPreview("cfg-banner-preview", "cfg-banner-vazio", c.banner);
            setPreview("cfg-logo-preview", "cfg-logo-vazio", c.logo);
            document.getElementById("cfg-console").checked = !!c.mostrarConsole;
            consoleAdmin.mostrarBotao(!!c.mostrarConsole);
        }

        async function trocarImagemConfig(campo, input, maxW, maxH) {
            const file = input.files && input.files[0];
            if (!file) return;
            try {
                catalogoAtual.config[campo] = await comprimirImagem(file, maxW, maxH, 0.8);
                await salvarNoIndexedDB(catalogoAtual);
                mostrarAlerta(campo === "banner" ? "Banner atualizado!" : "Logo atualizada!", "sucesso");
            } catch (err) {
                console.error(err);
                mostrarAlerta("Erro ao processar a imagem: " + err.message, "erro");
            }
            input.value = "";
        }

        async function removerImagemConfig(campo) {
            catalogoAtual.config[campo] = "";
            await salvarNoIndexedDB(catalogoAtual);
            mostrarAlerta("Imagem removida.", "sucesso");
        }

        async function salvarDadosLoja() {
            const c = catalogoAtual.config;
            c.nomeLoja = document.getElementById("cfg-nome").value.trim() || CONFIG_PADRAO.nomeLoja;
            c.subtitulo = document.getElementById("cfg-subtitulo").value.trim();
            c.whatsapp = document.getElementById("cfg-whats").value.replace(/\D/g, "");
            c.cep = document.getElementById("cfg-cep").value.trim(); c.endereco = document.getElementById("cfg-endereco").value.trim();
            c.pixChave = document.getElementById("cfg-pix").value.trim(); c.pixCidade = document.getElementById("cfg-pixcidade").value.trim();
            c.mpLink = document.getElementById("cfg-mplink").value.trim(); c.mpAtivo = document.getElementById("cfg-mp").checked;
            c.temaToggle = document.getElementById("cfg-tema").checked;
            CFG_FISCAL.forEach(function (k) { c[k] = document.getElementById("cfg-" + k).value.trim(); });
            await salvarNoIndexedDB(catalogoAtual);
            mostrarAlerta("Dados do estabelecimento salvos!", "sucesso");
        }

        async function alternarConsole(ligado) {
            catalogoAtual.config.mostrarConsole = !!ligado;
            await salvarNoIndexedDB(catalogoAtual);
            mostrarAlerta(ligado ? "Botão do console ativado." : "Botão do console desativado.", "sucesso");
        }

        /* =========================================================
           CRUD DE PRODUTOS
           ========================================================= */
        function renderizarTudo() { renderizarAdmin(); renderizarConfig(); }

        function montarFiltroAdmin() {
            const sel = document.getElementById("filtro-admin-cat");
            const atual = sel.value, cats = listarCategorias();
            sel.innerHTML = '<option value="">Todas as categorias</option>' +
                cats.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join("");
            sel.value = cats.indexOf(atual) !== -1 ? atual : "";
        }

        function renderizarAdmin() {
            montarFiltroAdmin();
            const lista = document.getElementById("lista-admin");
            const produtos = catalogoAtual.produtos;
            if (!produtos.length) { lista.innerHTML = '<p class="p-6 text-center text-gray-500">Nenhum produto. Adicione ou importe.</p>'; return; }

            const filtro = document.getElementById("filtro-admin-cat").value, q = document.getElementById("busca-admin").value.trim().toLowerCase();
            let html = "";
            listarCategorias().forEach(function (cat) {
                if (filtro && cat !== filtro) return;
                const doGrupo = produtos.filter(function (p) { return p.categoria === cat && (!q || p.nome.toLowerCase().indexOf(q) !== -1 || String(p.codigo).toLowerCase().indexOf(q) !== -1); });
                if (!doGrupo.length) return;
                html += '<div class="bg-gray-100 px-4 py-2 font-bold text-gray-700 text-sm uppercase">' + esc(cat) + '</div>';
                doGrupo.forEach(function (prod) {
                    html += '<div class="p-4 flex items-center justify-between hover:bg-gray-50 border-b">' +
                        '<div class="flex items-center gap-4">' +
                        '<img src="' + (prod.imagem ? esc(prod.imagem) : IMG_VAZIA) + '" class="w-12 h-12 rounded object-cover border bg-white" alt="">' +
                        '<div><h4 class="font-bold text-sm text-gray-800">' + esc(prod.nome) + '</h4>' +
                        '<p class="text-xs text-gray-500">' + moeda(prod.preco) + (prod.tamanho ? ' • ' + esc(prod.tamanho) : '') + (prod.controla ? ' • <span class="' + (estoqueDe(prod.id) <= prod.estMin ? 'text-red-600 font-bold' : '') + '">Estoque: ' + estoqueDe(prod.id) + '</span>' : '') + '</p></div></div>' +
                        '<div class="flex gap-2">' +
                        '<button onclick="editarProduto(' + Number(prod.id) + ')" class="text-blue-600 font-bold px-2 py-1">Editar</button>' +
                        '<button onclick="excluirProduto(' + Number(prod.id) + ')" class="text-red-600 font-bold px-2 py-1">Excluir</button>' +
                        '</div></div>';
                });
            });
            lista.innerHTML = html;
        }

        /* Select com todas as categorias existentes: ao escolher, preenche a caixa de texto */
        function preencherCategoriasExistentes() {
            const sel = document.getElementById("prod-categoria-existente");
            const cats = listarCategorias();
            sel.innerHTML = '<option value="">' + (cats.length ? "↳ ou escolha uma categoria existente" : "Nenhuma categoria criada ainda") + '</option>' +
                cats.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join("");
        }

        function escolherCategoriaExistente(sel) {
            if (sel.value) document.getElementById("prod-categoria").value = sel.value;
            sel.selectedIndex = 0;
        }

        function mostrarModal(v) {
            const m = document.getElementById("modal-produto");
            m.classList.toggle("hidden", !v);
            m.classList.toggle("flex", v);
        }

        function abrirModal() {
            ["prod-id", "prod-nome", "prod-categoria", "prod-descricao", "prod-imagem-base64", "prod-arquivo-img", "prod-preco", "prod-tamanho", "prod-codigo", "prod-arquivo-cam", "prod-ncm", "prod-cest", "prod-cfop", "prod-un", "prod-orig", "prod-csosn", "prod-custo", "prod-estoque", "prod-estmin"]
                .forEach(function (id) { document.getElementById(id).value = ""; });
            document.getElementById("prod-categoria").value = document.getElementById("filtro-admin-cat").value;
            document.getElementById("preview-img").src = IMG_VAZIA;
            document.getElementById("modal-titulo").textContent = "Novo Produto"; document.getElementById("prod-controla").checked = false;
            preencherCategoriasExistentes();
            mostrarModal(true);
        }

        function fecharModal() { mostrarModal(false); }

        function editarProduto(id) {
            const prod = catalogoAtual.produtos.find(function (p) { return Number(p.id) === id; });
            if (!prod) return;
            document.getElementById("modal-titulo").textContent = "Editar Produto";
            document.getElementById("prod-controla").checked = !!prod.controla; document.getElementById("prod-estoque").value = prod.controla ? estoqueDe(prod.id) : ""; document.getElementById("prod-estmin").value = prod.estMin || "";
            document.getElementById("prod-id").value = prod.id;
            document.getElementById("prod-nome").value = prod.nome;
            document.getElementById("prod-categoria").value = prod.categoria;
            document.getElementById("prod-descricao").value = prod.descricao;
            document.getElementById("prod-imagem-base64").value = prod.imagem;
            document.getElementById("preview-img").src = prod.imagem || IMG_VAZIA;
            document.getElementById("prod-arquivo-img").value = "";
            document.getElementById("prod-preco").value = prod.preco;
            document.getElementById("prod-tamanho").value = prod.tamanho; document.getElementById("prod-codigo").value = prod.codigo || "";
            FISCAIS.forEach(function (f) { document.getElementById("prod-" + f).value = prod[f] || ""; });
            preencherCategoriasExistentes();
            mostrarModal(true);
        }

        async function tratarFoto(e) {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const b64 = await comprimirImagem(file, 300, 300, 0.8);
                document.getElementById("preview-img").src = b64;
                document.getElementById("prod-imagem-base64").value = b64;
            } catch (err) {
                console.error(err);
                mostrarAlerta("Erro ao processar a foto: " + err.message, "erro");
            }
        }
        ["prod-arquivo-img", "prod-arquivo-cam"].forEach(function (id) { document.getElementById(id).addEventListener("change", tratarFoto); });

        async function salvarProduto() {
            const idInput = document.getElementById("prod-id").value;
            const nome = document.getElementById("prod-nome").value.trim();
            let categoria = document.getElementById("prod-categoria").value.trim();
            const preco = parseFloat(document.getElementById("prod-preco").value);

            if (!nome || !categoria || isNaN(preco) || preco < 0) return mostrarAlerta("Preencha nome, categoria e preço.", "erro");

            /* "bebidas" e "Bebidas" viram a mesma categoria (vale a grafia já existente) */
            const igual = listarCategorias().find(function (c) { return c.toLowerCase() === categoria.toLowerCase(); });
            if (igual) categoria = igual;

            const novo = {
                id: idInput ? parseInt(idInput, 10) : Date.now(),
                nome: nome,
                categoria: categoria,
                descricao: document.getElementById("prod-descricao").value.trim(),
                imagem: document.getElementById("prod-imagem-base64").value || "",
                preco: preco,
                tamanho: document.getElementById("prod-tamanho").value.trim(),
                codigo: document.getElementById("prod-codigo").value.trim(),
                controla: document.getElementById("prod-controla").checked, estMin: parseFloat(document.getElementById("prod-estmin").value) || 0,
                atualizadoEm: Date.now()
            };

            FISCAIS.forEach(function (f) { novo[f] = document.getElementById("prod-" + f).value.trim(); });
            if (idInput) {
                const i = catalogoAtual.produtos.findIndex(function (x) { return Number(x.id) === novo.id; });
                if (i !== -1) catalogoAtual.produtos[i] = novo; else catalogoAtual.produtos.push(novo);
            } else {
                catalogoAtual.produtos.push(novo);
            }

            try {
                await salvarNoIndexedDB(catalogoAtual);
                if (novo.controla) { const dif = (parseFloat(document.getElementById("prod-estoque").value) || 0) - estoqueDe(novo.id); if (dif) { movEstoque(novo.id, dif, "Ajuste manual"); await salvarFin(); } }
                mostrarAlerta("Produto salvo com sucesso!", "sucesso");
                fecharModal();
            } catch (err) {
                console.error(err);
                mostrarAlerta("Erro ao salvar: " + err.message, "erro");
            }
        }

        async function excluirProduto(id) {
            if (!confirm("Excluir este produto?")) return;
            catalogoAtual.removidos[id] = Date.now();
            catalogoAtual.produtos = catalogoAtual.produtos.filter(function (p) { return Number(p.id) !== id; });
            await salvarNoIndexedDB(catalogoAtual);
            mostrarAlerta("Produto removido.", "sucesso");
        }

        /* ---- Backup / restore total (todos os registros do IndexedDB, imagens Base64 inclusas) ---- */
        function baixar(nome, texto) {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([texto], { type: "application/json" }));
            a.download = nome; document.body.appendChild(a); a.click(); document.body.removeChild(a);
        }
        function exportarBackup() {
            const r = db.transaction([NOME_STORE], "readonly").objectStore(NOME_STORE).getAll();
            r.onsuccess = function () {
                baixar("backup-cardapio-" + DEV_ID + "-" + new Date().toISOString().slice(0, 10) + ".json",
                    JSON.stringify({ formato: "cardapio-backup", versao: 5, geradoEm: new Date().toISOString(), registros: r.result }));
                mostrarAlerta("Backup completo gerado!", "sucesso");
            };
        }
        
        /* ---- Leitor de código de barras (BarcodeDetector nativo; ZXing como reserva) ---- */
        let scanAberto = false, scanStream = null, scanReader = null, scanCb = null;
        function carregarZXing() {
            return new Promise(function (ok, no) {
                if (window.ZXing) return ok();
                const sc = document.createElement("script");
                sc.src = "https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js";
                sc.onload = ok; sc.onerror = function () { no(new Error("leitor indisponível (sem internet?)")); };
                document.head.appendChild(sc);
            });
        }
        function mostrarScan(v) { const m = document.getElementById("modal-scan"); m.classList.toggle("hidden", !v); m.classList.toggle("flex", v); }
        async function abrirScanner(cb) {
            scanCb = cb; scanAberto = true; mostrarScan(true);
            const v = document.getElementById("scan-video");
            try {
                if ("BarcodeDetector" in window) {
                    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
                    v.srcObject = scanStream; await v.play();
                    const det = new BarcodeDetector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "itf", "qr_code"] });
                    while (scanAberto) {
                        try { const r = await det.detect(v); if (r.length) return scanOk(r[0].rawValue); } catch (e) {}
                        await new Promise(function (ok) { setTimeout(ok, 200); });
                    }
                } else {
                    await carregarZXing();
                    scanReader = new ZXing.BrowserMultiFormatReader();
                    const r = await scanReader.decodeOnceFromVideoDevice(undefined, v);
                    if (scanAberto) scanOk(r.getText());
                }
            } catch (e) {
                if (!scanAberto) return;
                fecharScanner(); mostrarAlerta("Câmera indisponível: " + (e.message || e) + " (use HTTPS e permita o acesso).", "erro");
            }
        }
        function scanOk(txt) { const cb = scanCb; fecharScanner(); if (navigator.vibrate) navigator.vibrate(100); if (cb) cb(String(txt).trim()); }
        function fecharScanner() {
            scanAberto = false; scanCb = null;
            if (scanStream) { scanStream.getTracks().forEach(function (t) { t.stop(); }); scanStream = null; }
            if (scanReader) { try { scanReader.reset(); } catch (e) {} scanReader = null; }
            mostrarScan(false);
        }
        function buscaLida(cod) {
            document.getElementById("busca-admin").value = cod; renderizarAdmin();
            const p = catalogoAtual.produtos.find(function (x) { return x.codigo === cod; });
            if (p) editarProduto(Number(p.id)); else mostrarAlerta("Código " + cod + " não cadastrado.", "erro");
        }
        function pdvLido(cod) {
            const p = catalogoAtual.produtos.find(function (x) { return x.codigo && x.codigo.toLowerCase() === cod.toLowerCase(); });
            if (p) { pdvAdd(p.id); mostrarAlerta("Adicionado: " + p.nome, "sucesso"); }
            else { document.getElementById("pdv-busca").value = cod; pdvBuscar(); mostrarAlerta("Código " + cod + " não cadastrado.", "erro"); }
        }

        /* ---- Importação de NF-e (compra): confere/edita numa tabela antes de gravar; a quantidade vira entrada de estoque ---- */
        let nfDados = { nota: "", forn: "", linhas: [] };
        async function importarXMLNota(ev) {
            const file = ev.target.files[0]; ev.target.value = ""; if (!file) return;
            const doc = new DOMParser().parseFromString(await file.text(), "application/xml");
            if (doc.getElementsByTagName("parsererror").length) return mostrarAlerta("XML inválido.", "erro");
            const dets = doc.getElementsByTagName("det");
            if (!dets.length) return mostrarAlerta("Nenhum item (det) encontrado: não parece uma NF-e.", "erro");
            const tx = function (el, tag) { const n = el.getElementsByTagName(tag)[0]; return n ? n.textContent.trim() : ""; };
            nfDados = { nota: tx(doc, "nNF"), forn: tx(doc, "xNome"), linhas: Array.prototype.map.call(dets, function (det) {
                const ean = tx(det, "cEAN");
                return { cod: /^\d{8,14}$/.test(ean) ? ean : tx(det, "cProd"), nome: tx(det, "xProd"), ncm: tx(det, "NCM"), cest: tx(det, "CEST"), un: tx(det, "uCom"), orig: tx(det, "orig"), qtd: parseFloat(tx(det, "qCom")) || 0, custo: parseFloat(tx(det, "vUnCom")) || 0 };
            }) };
            document.getElementById("nf-titulo").textContent = "NF-e " + nfDados.nota + " • " + nfDados.forn;
            nfRender(); const m = document.getElementById("modal-nfe"); m.classList.remove("hidden"); m.classList.add("flex");
        }
        function nfFechar() { const m = document.getElementById("modal-nfe"); m.classList.add("hidden"); m.classList.remove("flex"); }
        function nfRender() {
            const mg = parseFloat(document.getElementById("nf-margem").value) || 0;
            const c = function (i, k, v, w) { return '<td class="p-1"><input id="nf-' + i + '-' + k + '" value="' + esc(v) + '" class="border rounded p-1 ' + w + '"></td>'; };
            document.getElementById("nf-tab").innerHTML = '<tr class="text-left bg-gray-100"><th class="p-1">✓</th><th>Código</th><th>Nome</th><th>NCM</th><th>Un</th><th>Qtd</th><th>Custo</th><th>Preço venda</th><th></th></tr>' +
                nfDados.linhas.map(function (l, i) {
                    const ex = catalogoAtual.produtos.find(function (x) { return x.codigo && x.codigo === l.cod; });
                    return '<tr class="border-t"><td class="p-1"><input type="checkbox" id="nf-' + i + '-ok" checked></td>' + c(i, "cod", l.cod, "w-28") + c(i, "nome", ex ? ex.nome : l.nome, "w-48") + c(i, "ncm", l.ncm, "w-24") + c(i, "un", l.un, "w-12") +
                        c(i, "qtd", l.qtd, "w-16") + c(i, "custo", l.custo.toFixed(2), "w-20") + c(i, "preco", ex ? ex.preco : (l.custo * (1 + mg / 100)).toFixed(2), "w-20") + '<td class="p-1 text-[10px]">' + (ex ? "🔄 existe" : "🆕 novo") + '</td></tr>';
                }).join("");
        }
        function nfAplicarMargem() {
            const mg = parseFloat(document.getElementById("nf-margem").value) || 0;
            nfDados.linhas.forEach(function (l, i) { const cu = parseFloat(document.getElementById("nf-" + i + "-custo").value) || 0; document.getElementById("nf-" + i + "-preco").value = (cu * (1 + mg / 100)).toFixed(2); });
        }
        async function nfSalvar() {
            const cat = document.getElementById("nf-cat").value.trim() || "Importados NF-e"; let novos = 0, atual = 0, n = 0;
            nfDados.linhas.forEach(function (l, i) {
                if (!document.getElementById("nf-" + i + "-ok").checked) return;
                const v = function (k) { return document.getElementById("nf-" + i + "-" + k).value.trim(); };
                const cod = v("cod"), custo = parseFloat(v("custo")) || 0, qtd = parseFloat(v("qtd")) || 0;
                const campos = { nome: v("nome"), ncm: v("ncm"), un: v("un"), custo: custo.toFixed(2), preco: parseFloat(v("preco")) || 0, controla: true, atualizadoEm: Date.now() };
                let p = catalogoAtual.produtos.find(function (x) { return x.codigo && x.codigo === cod; });
                if (p) { Object.assign(p, campos); atual++; }
                else { p = Object.assign({ id: Date.now() + n++, categoria: cat, descricao: "Fornecedor: " + nfDados.forn + " • NF " + nfDados.nota, imagem: "", tamanho: "", codigo: cod, cest: l.cest, orig: l.orig, cfop: "", csosn: "", estMin: 0 }, campos); catalogoAtual.produtos.push(p); novos++; }
                if (qtd) movEstoque(p.id, qtd, "NF-e " + nfDados.nota);
            });
            await salvarNoIndexedDB(catalogoAtual); await salvarFin(); nfFechar();
            mostrarAlerta("NF-e " + nfDados.nota + ": " + novos + " novo(s), " + atual + " atualizado(s); estoque lançado.", "sucesso");
        }

        /* ---- Sincronização por mesclagem ("ficha"): cada aparelho trabalha offline e depois junta os backups ---- */
        async function mesclarBackup(ev) {
            const file = ev.target.files[0]; ev.target.value = ""; if (!file) return;
            try {
                const d = JSON.parse(await file.text());
                if (d.formato !== "cardapio-backup") throw new Error("use um arquivo de Backup gerado pelo sistema");
                const reg = function (id) { const r = d.registros.find(function (x) { return x.id === id; }); return r ? r.dados : {}; };
                const rc = normalizar(reg(1)), rf = reg(2), st = { add: 0, upd: 0, del: 0, mov: 0 };
                /* produtos: vence o mais recente (atualizadoEm); exclusões viajam em "removidos" */
                const rem = {};
                [rc.removidos, catalogoAtual.removidos].forEach(function (o) { Object.keys(o).forEach(function (k) { rem[k] = Math.max(rem[k] || 0, o[k]); }); });
                const mapa = {}; catalogoAtual.produtos.forEach(function (p) { mapa[p.id] = p; });
                rc.produtos.forEach(function (p) {
                    const l = mapa[p.id];
                    if (!l) { if (!(rem[p.id] >= p.atualizadoEm)) { mapa[p.id] = p; st.add++; } }
                    else if (p.atualizadoEm > l.atualizadoEm) { mapa[p.id] = p; st.upd++; }
                });
                Object.keys(rem).forEach(function (k) { if (mapa[k] && rem[k] >= mapa[k].atualizadoEm) { delete mapa[k]; st.del++; } });
                catalogoAtual.produtos = Object.keys(mapa).map(function (k) { return mapa[k]; });
                catalogoAtual.removidos = rem;
                /* configuração: o aparelho novo/vazio adota a da loja; o que já está preenchido aqui não é alterado */
                Object.keys(rc.config).forEach(function (k) { const l = catalogoAtual.config[k]; if ((l == null || l === "" || l === CONFIG_PADRAO[k]) && rc.config[k] !== CONFIG_PADRAO[k]) catalogoAtual.config[k] = rc.config[k]; });
                /* financeiro: só acrescenta (união por aparelho+id); turno fechado prevalece sobre aberto */
                ["vendas", "pedidos", "turnos", "saidas", "movs"].forEach(function (lista) {
                    const R = { pendente: 1, entregue: 2, concluido: 3, cancelado: 3 };
                    const key = function (x) { return (x.dev || "") + ":" + x.id + ":" + (x.hash || ""); }, idx = {};
                    fin[lista].forEach(function (x, i) { idx[key(x)] = i; });
                    (rf[lista] || []).forEach(function (x) {
                        const k = key(x);
                        if (!(k in idx)) { fin[lista].push(x); idx[k] = fin[lista].length - 1; st.mov++; }
                        else if (lista === "turnos" && x.fim && !fin[lista][idx[k]].fim) fin[lista][idx[k]] = x;
                        else if (lista === "pedidos" && (R[x.status || "concluido"] || 3) > (R[fin[lista][idx[k]].status || "concluido"] || 3)) fin[lista][idx[k]] = x;
                    });
                });
                await salvarNoIndexedDB(catalogoAtual); await salvarFin(); finRender();
                renderizarConfig(); mostrarAlerta("Sincronizado: +" + st.add + " produto(s), " + st.upd + " atualizado(s), " + st.del + " removido(s), +" + st.mov + " lançamento(s).", "sucesso");
            } catch (err) { console.error(err); mostrarAlerta("Erro ao sincronizar: " + err.message, "erro"); }
        }

        /* ---- Apagar o banco (exige frase de confirmação) ---- */
        async function apagarBanco() {
            fecharMenu();
            if (confirm("Baixar um backup antes de apagar?")) exportarBackup();
            const f = prompt("ATENÇÃO: isso apaga TODO o banco deste aparelho (produtos, imagens, configurações, vendas e financeiro).\n\nPara confirmar, digite exatamente: quero apagar o banco");
            if (f === null) return;
            if (f.trim().toLowerCase() !== "quero apagar o banco") return mostrarAlerta("Frase incorreta. Nada foi apagado.", "erro");
            await new Promise(function (ok, no) { const tx = db.transaction([NOME_STORE], "readwrite"); tx.objectStore(NOME_STORE).clear(); tx.oncomplete = ok; tx.onerror = function () { no(new Error("Falha ao apagar")); }; });
            catalogoAtual = normalizar({}); _em = null; fin = { vendas: [], pedidos: [], turnos: [], saidas: [], movs: [] }; pdv.itens = [];
            renderizarTudo(); finRender(); pdvRender(); mostrarAlerta("Banco de dados apagado.", "sucesso");
        }

        /* ---- Só o que é público vai para o catalogo.html (sem custo, dados fiscais, CNPJ, Pix, sal) ---- */
        function dadosPublicos() {
            const c = catalogoAtual.config;
            return {
                versao: c.versaoCatalogo || "0",
                produtos: catalogoAtual.produtos.map(function (p) { return { id: p.id, nome: p.nome, categoria: p.categoria, descricao: p.descricao, imagem: p.imagem, preco: p.preco, tamanho: p.tamanho, codigo: p.codigo, esgotado: !!(p.controla && estoqueDe(p.id) <= 0) }; }),
                config: { nomeLoja: c.nomeLoja, subtitulo: c.subtitulo, whatsapp: c.whatsapp, cep: c.cep, endereco: c.endereco, banner: c.banner, logo: c.logo, temaToggle: c.temaToggle, mpAtivo: c.mpAtivo, mpLink: c.mpLink }
            };
        }

        /* ---- PWA: instalação e entrada por atalho/compartilhamento ---- */
        function abrirInstalacao() {
            fecharMenu();
            if (typeof install_app_pwa !== "function") return mostrarAlerta("install_app_pwa.js não encontrado na mesma pasta do programa.", "erro");
            install_app_pwa();
        }
        /* Atalhos do app (?aba=pdv) e texto compartilhado do WhatsApp (?text=...) caem direto no validador */
        function tratarEntrada() {
            const q = new URLSearchParams(location.search), txt = q.get("text") || q.get("title") || "", aba = q.get("aba");
            if (txt) { mostrarAba("pdv"); document.getElementById("val-texto").value = txt; validarPedido(); document.getElementById("val-texto").scrollIntoView(); }
            else if (["catalogo", "pdv", "ent", "fin", "cfg"].indexOf(aba) !== -1) mostrarAba(aba);
            if (txt || aba) history.replaceState(null, "", location.pathname);
        }

        /* ---- Menu lateral e botão de voltar ao topo ---- */
        function alternarMenu() {
            const m = document.getElementById("menu-lateral"), fechado = m.classList.contains("-translate-x-full");
            m.classList.toggle("-translate-x-full", !fechado); document.getElementById("menu-fundo").classList.toggle("hidden", !fechado);
        }
        function fecharMenu() { document.getElementById("menu-lateral").classList.add("-translate-x-full"); document.getElementById("menu-fundo").classList.add("hidden"); }
        window.addEventListener("scroll", function () { document.getElementById("btn-topo").classList.toggle("hidden", window.scrollY < 400); }, { passive: true });

        /* ---- Abas ---- */
        function mostrarAba(a) {
            fecharMenu(); window.scrollTo(0, 0);
            ["avisos", "cfg", "catalogo", "pdv", "ent", "fin"].forEach(function (x) {
                document.getElementById("aba-" + x).classList.toggle("hidden", x !== a);
                const b = document.getElementById("tab-" + x);
                b.classList.toggle("bg-adminRed", x === a); b.classList.toggle("text-white", x === a);
                b.classList.toggle("bg-gray-300", x !== a); b.classList.toggle("text-gray-700", x !== a);
            });
            if (a === "pdv") pdvRender(); if (a === "ent") entRender(); if (a === "fin") finRender();
        }

        /* ---- Entregas: pendente -> entregue -> concluído (ou cancelado) ---- */
        function rotuloStatus(x) {
            const st = x.status || "concluido";
            return { pendente: "⏳ aguardando entrega", entregue: "🚚 entregue, aguardando recebimento", concluido: "✅ concluído" + (x.forma ? " (" + x.forma + ")" : ""), cancelado: "✖ cancelado" }[st];
        }
        function entRender() {
            const st = function (x) { return x.status || "concluido"; };
            const abertos = fin.pedidos.filter(function (x) { return st(x) === "pendente" || st(x) === "entregue"; });
            document.getElementById("tab-ent").textContent = "📦 Entregas" + (abertos.length ? " (" + abertos.length + ")" : "");   /* contador ignora os filtros */
            const de = document.getElementById("ent-de").value, ate = document.getElementById("ent-ate").value, modo = document.getElementById("ent-status").value, q = document.getElementById("ent-busca").value.trim().toLowerCase();
            const ini = de ? new Date(de + "T00:00:00") : null, fim = ate ? new Date(ate + "T23:59:59.999") : null;
            const lista = fin.pedidos.filter(function (x) {
                const s = st(x), d = new Date(x.data);
                if (modo === "abertos" ? !(s === "pendente" || s === "entregue") : (modo !== "todos" && s !== modo)) return false;
                if ((ini && d < ini) || (fim && d > fim)) return false;
                const txt = ("#" + x.id + " " + (x.cliente || "") + " " + (x.endereco || "") + " " + (x.cep || "") + " " + (x.itens || []).map(function (i) { return i.nome; }).join(" ") + " " + (x.forma || "") + " " + rotuloStatus(x)).toLowerCase();
                return !q || txt.indexOf(q) !== -1;
            });
            document.getElementById("ent-lista").innerHTML = '<p class="text-xs text-gray-500 mb-2">' + lista.length + ' pedido(s) no filtro</p>' + (lista.slice().reverse().slice(0, 100).map(function (x) {
                const id = esc(x.id), s = st(x), aberto = s === "pendente" || s === "entregue";
                return '<div class="bg-white rounded shadow p-4 mb-3"><b>#' + id + '</b> • ' + moeda(x.total) + ' <span class="text-xs">' + rotuloStatus(x) + '</span> <span class="text-xs text-gray-400">' + new Date(x.data).toLocaleString("pt-BR") + '</span>' +
                    '<p class="text-sm">' + esc(x.cliente) + ' • ' + esc(x.endereco) + ' ' + esc(x.cep) + '</p>' +
                    '<p class="text-xs text-gray-500">' + (x.itens || []).map(function (i) { return i.qtd + "x " + esc(i.nome); }).join(", ") + '</p>' +
                    '<div class="flex flex-wrap items-center gap-2 mt-2">' +
                    (!aberto ? '' : s === "entregue"
                        ? '<select id="ent-forma-' + id + '" class="border rounded p-1 text-sm bg-white"><option>Dinheiro</option><option>Pix</option><option>Cartão</option></select><button onclick="entReceber(\'' + id + '\')" class="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">💰 Confirmar recebimento</button>'
                        : '<button onclick="entEntregar(\'' + id + '\')" class="bg-adminDark text-white px-3 py-1 rounded text-sm font-bold">🚚 Confirmar entrega</button>') +
                    '<button onclick="imprimirCupom(\'p\',\'' + id + '\')" class="text-xs bg-gray-200 px-2 py-1 rounded">🧾 Cupom</button>' +
                    (aberto ? '<button onclick="entCancelar(\'' + id + '\')" class="text-red-600 text-sm px-2">Cancelar</button>' : '') + '</div></div>';
            }).join("") || '<p class="text-sm text-gray-500">Nenhum pedido encontrado neste filtro.</p>') + (lista.length > 100 ? '<p class="text-xs text-gray-500">Mostrando 100: refine o filtro.</p>' : '');
        }
        async function entMudar(id, fn) {
            const x = fin.pedidos.find(function (p) { return p.id === id; }); if (!x) return;
            fn(x); await salvarFin(); entRender(); finRender();
        }
        function entEntregar(id) { return entMudar(id, function (x) { x.status = "entregue"; x.entregueEm = new Date().toISOString(); baixarEstoque(x.itens || [], -1, "Pedido #" + x.id); x.baixa = true; }); }
        function entReceber(id) { const forma = document.getElementById("ent-forma-" + id).value; return entMudar(id, function (x) { x.status = "concluido"; x.forma = forma; x.pagoEm = new Date().toISOString(); }); }
        function entCancelar(id) { if (confirm("Cancelar este pedido?")) return entMudar(id, function (x) { if (x.baixa) { baixarEstoque(x.itens || [], 1, "Cancelamento #" + x.id); x.baixa = false; } x.status = "cancelado"; }); }

        /* ---- Financeiro (registro id=2 do mesmo store) ---- */
        let fin = { vendas: [], pedidos: [], turnos: [], saidas: [], movs: [] };
        /* Estoque = soma das movimentações (entradas +, saídas -). Cada aparelho só acrescenta, então a mesclagem não perde baixas. */
        let _em = null;
        function estoqueDe(id) { if (!_em) { _em = {}; fin.movs.forEach(function (m) { _em[m.prod] = (_em[m.prod] || 0) + m.qtd; }); } return _em[id] || 0; }
        function movEstoque(prod, qtd, motivo) { fin.movs.push({ id: Date.now() * 1000 + Math.floor(Math.random() * 1000), dev: DEV_ID, prod: prod, qtd: qtd, motivo: motivo, data: new Date().toISOString() }); _em = null; }
        function baixarEstoque(itens, sinal, motivo) { itens.forEach(function (i) { const p = catalogoAtual.produtos.find(function (x) { return x.id === i.id; }); if (p && p.controla) movEstoque(p.id, sinal * i.qtd, motivo); }); }
        function somaSaidas(t) { return fin.saidas.filter(function (x) { return x.turno === t.id; }).reduce(function (a, x) { return a + x.valor; }, 0); }
        async function registrarSangria() {
            const t = turnoAberto(), v = parseFloat(document.getElementById("sang-valor").value);
            if (!t) return mostrarAlerta("Abra um turno no Financeiro.", "erro");
            if (!(v > 0)) return mostrarAlerta("Informe o valor da sangria.", "erro");
            fin.saidas.push({ id: Date.now(), dev: DEV_ID, turno: t.id, data: new Date().toISOString(), valor: v, motivo: document.getElementById("sang-motivo").value.trim() || "Sangria" });
            await salvarFin(); document.getElementById("sang-valor").value = ""; document.getElementById("sang-motivo").value = "";
            mostrarAlerta("Sangria registrada.", "sucesso");
        }
        function carregarFin() {
            return new Promise(function (ok) {
                const r = db.transaction([NOME_STORE], "readonly").objectStore(NOME_STORE).get(2);
                r.onsuccess = function () { if (r.result && r.result.dados) fin = Object.assign(fin, r.result.dados); ok(); };
                r.onerror = function () { ok(); };
            });
        }
        function salvarFin() {
            _em = null;
            return new Promise(function (ok, no) {
                const tx = db.transaction([NOME_STORE], "readwrite");
                tx.objectStore(NOME_STORE).put({ id: 2, dados: fin });
                tx.oncomplete = ok; tx.onerror = function () { no(new Error("Erro ao salvar financeiro")); };
            });
        }
        function turnoAberto() { return fin.turnos.find(function (t) { return !t.fim; }); }
        function somaForma(vendas, forma) { return vendas.filter(function (v) { return v.forma === forma; }).reduce(function (a, v) { return a + v.total; }, 0); }

        async function abrirTurno() {
            fin.turnos.push({ id: Date.now(), dev: DEV_ID, inicio: new Date().toISOString(), fundo: parseFloat(document.getElementById("fin-fundo").value) || 0 });
            await salvarFin(); finRender();
        }
        async function fecharTurno() {
            const t = turnoAberto(), vs = fin.vendas.filter(function (v) { return v.turno === t.id; });
            t.fim = new Date().toISOString(); t.vendasDinheiro = somaForma(vs, "Dinheiro");
            t.sangrias = somaSaidas(t); t.esperado = t.fundo + t.vendasDinheiro - t.sangrias; t.contado = parseFloat(document.getElementById("fin-contado").value) || 0;
            t.diferenca = t.contado - t.esperado;
            await salvarFin(); finRender();
        }
        /* Linhas do financeiro já filtradas por período + busca (usadas na tela, no cupom e no XML) */
        function finLinhas() {
            const P = finDados(), q = document.getElementById("fin-busca").value.trim().toLowerCase(), L = function (t) { return new Date(t).toLocaleString("pt-BR"); };
            const lin = function (t, extra) { return '<p class="text-sm border-b py-1">' + esc(t) + (extra || "") + '</p>'; };
            const btn = function (k, id) { return ' <button onclick="imprimirCupom(\'' + k + '\',\'' + esc(id) + '\')" class="text-xs bg-gray-200 px-2 py-1 rounded">🧾 Cupom</button>'; };
            const mk = function (arr, fn) { return arr.map(function (x) { const r = fn(x); r.ref = x; return r; }).filter(function (r) { return !q || r.txt.toLowerCase().indexOf(q) !== -1; }); };
            return {
                P: P,
                turnos: mk(P.ts, function (x) { const t = L(x.fim) + " • esperado " + moeda(x.esperado) + " • contado " + moeda(x.contado) + " • dif. " + moeda(x.diferenca); return { txt: t, html: lin(t) }; }),
                pedidos: mk(P.ps, function (x) { const t = "#" + x.id + " • " + (x.cliente || "") + " • " + moeda(x.total) + " • " + L(x.data) + " • " + rotuloStatus(x); return { txt: t, html: lin(t, btn("p", x.id)) }; }),
                entradas: mk(P.vs, function (v) { const t = L(v.data) + " • " + v.forma + " • " + v.itens.map(function (i) { return i.qtd + "x " + i.nome; }).join(", ") + " • " + moeda(v.total); return { txt: t, html: lin(t, btn("v", v.id)) }; }),
                saidas: mk(P.ss, function (x) { const t = L(x.data) + " • " + x.motivo + " • " + moeda(x.valor); return { txt: t, html: lin(t) }; })
            };
        }

        /* Imprime HTML via iframe oculto (evita bloqueio de pop-up) */
        function imprimirHTML(html) {
            const f = document.createElement("iframe");
            f.style.cssText = "position:fixed;width:0;height:0;border:0;"; document.body.appendChild(f);
            f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
            f.contentWindow.focus(); f.contentWindow.print();
            setTimeout(function () { f.remove(); }, 60000);
        }

        /* Cupom para o cliente (venda PDV ou pedido validado) */
        function imprimirCupom(tipo, id) {
            const c = catalogoAtual.config, L = function (t) { return new Date(t).toLocaleString("pt-BR"); };
            const d = tipo === "v" ? fin.vendas.find(function (v) { return String(v.id) === String(id); }) : fin.pedidos.find(function (x) { return x.id === id; });
            if (!d) return;
            const itens = d.itens || [];
            const html = "<html><head><meta charset='utf-8'><title>Cupom</title><style>body{font-family:monospace;font-size:12px;width:72mm;margin:0 auto;padding:4px}table{width:100%}td:last-child{text-align:right}hr{border:0;border-top:1px dashed #000}</style></head><body>" +
                "<b>" + esc(c.nomeLoja) + "</b><br>" + esc(c.endereco) + " " + esc(c.cep) + (c.cnpj ? "<br>CNPJ " + esc(c.cnpj) : "") + "<hr>" + L(d.data) + "<br>" + (tipo === "p" ? "Pedido #" + esc(d.id) : "Venda #" + esc(d.id)) +
                (tipo === "p" ? "<br>Cliente: " + esc(d.cliente) + "<br>Entrega: " + esc(d.endereco) + " " + esc(d.cep) : "") + "<hr><table>" +
                itens.map(function (i) { return "<tr><td>" + i.qtd + "x " + esc(i.nome) + "</td><td>" + moeda(i.preco * i.qtd) + "</td></tr>"; }).join("") +
                "</table><hr><b>TOTAL " + moeda(d.total) + "</b><br>" + (tipo === "v" ? esc(d.forma) + (d.forma === "Dinheiro" ? " • recebido " + moeda(d.recebido) + " • troco " + moeda(d.troco) : "") : "Pagamento na entrega/conferir") + "<hr>Obrigado pela preferência!</body></html>";
            imprimirHTML(html);
        }

        /* XML do filtro atual (entradas e/ou pedidos validados com itens), em estrutura NF-e 4.00 SEM assinatura */
        function xe(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
        function exportarXMLFiltrado() {
            const Lh = finLinhas(), tipo = document.getElementById("fin-tipo").value, c = catalogoAtual.config, docs = [];
            if (!tipo || tipo === "entradas") Lh.entradas.forEach(function (r) { docs.push({ data: r.ref.data, forma: r.ref.forma, total: r.ref.total, itens: r.ref.itens, cliente: "" }); });
            if (!tipo || tipo === "pedidos") Lh.pedidos.forEach(function (r) { if (r.ref.itens && r.ref.itens.length && (r.ref.status || "concluido") === "concluido") docs.push({ data: r.ref.pagoEm || r.ref.data, forma: r.ref.forma || "Outros", total: r.ref.total, itens: r.ref.itens, cliente: r.ref.cliente || "" }); });
            if (!docs.length) return mostrarAlerta("Nada para exportar: use entradas ou pedidos validados com itens.", "erro");
            const dig = function (t) { return String(t || "").replace(/\D/g, ""); }, pag = { Dinheiro: "01", Pix: "17", "Cartão": "03", Outros: "99" };
            let semNCM = 0;
            let x = '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Gerado pelo Gerador de Cardápio: sem assinatura, sem chave de acesso e em ambiente de homologação (tpAmb 2). Confira antes de importar. -->\n<enviNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00"><idLote>1</idLote>';
            docs.forEach(function (d, k) {
                x += '<NFe><infNFe versao="4.00"><ide><natOp>VENDA</natOp><mod>55</mod><serie>1</serie><nNF>' + (k + 1) + '</nNF><dhEmi>' + new Date(d.data).toISOString().slice(0, 19) + '-03:00</dhEmi><tpNF>1</tpNF><tpAmb>2</tpAmb><finNFe>1</finNFe></ide>' +
                    '<emit><CNPJ>' + dig(c.cnpj) + '</CNPJ><xNome>' + xe(c.nomeLoja) + '</xNome><enderEmit><xLgr>' + xe(c.endereco) + '</xLgr><CEP>' + dig(c.cep) + '</CEP><UF>' + xe(c.uf) + '</UF></enderEmit><IE>' + dig(c.ie) + '</IE><CRT>' + xe(c.crt || "1") + '</CRT></emit>' +
                    '<dest><xNome>' + xe(d.cliente || "CONSUMIDOR") + '</xNome></dest>';
                d.itens.forEach(function (i, n) {
                    const p = catalogoAtual.produtos.find(function (q) { return q.id === i.id; }) || catalogoAtual.produtos.find(function (q) { return q.nome + (q.tamanho ? " (" + q.tamanho + ")" : "") === i.nome; }) || {};
                    if (!p.ncm) semNCM++;
                    const ean = /^\d{8,14}$/.test(p.codigo || "") ? p.codigo : "SEM GTIN", un = xe(p.un || "UN"), vp = (i.preco * i.qtd).toFixed(2);
                    x += '<det nItem="' + (n + 1) + '"><prod><cProd>' + xe(p.codigo || i.id || n + 1) + '</cProd><cEAN>' + ean + '</cEAN><xProd>' + xe(i.nome) + '</xProd><NCM>' + xe(p.ncm || "00000000") + '</NCM>' + (p.cest ? '<CEST>' + xe(p.cest) + '</CEST>' : '') +
                        '<CFOP>' + xe(p.cfop || "5102") + '</CFOP><uCom>' + un + '</uCom><qCom>' + Number(i.qtd).toFixed(4) + '</qCom><vUnCom>' + Number(i.preco).toFixed(4) + '</vUnCom><vProd>' + vp + '</vProd><cEANTrib>' + ean + '</cEANTrib><uTrib>' + un + '</uTrib><qTrib>' + Number(i.qtd).toFixed(4) + '</qTrib><vUnTrib>' + Number(i.preco).toFixed(4) + '</vUnTrib><indTot>1</indTot></prod>' +
                        '<imposto><ICMS><ICMSSN102><orig>' + xe(p.orig || "0") + '</orig><CSOSN>' + xe(p.csosn || "102") + '</CSOSN></ICMSSN102></ICMS></imposto></det>';
                });
                x += '<total><ICMSTot><vProd>' + Number(d.total).toFixed(2) + '</vProd><vNF>' + Number(d.total).toFixed(2) + '</vNF></ICMSTot></total><pag><detPag><tPag>' + (pag[d.forma] || "99") + '</tPag><vPag>' + Number(d.total).toFixed(2) + '</vPag></detPag></pag></infNFe></NFe>';
            });
            x += '</enviNFe>';
            baixar("vendas-nfe-" + new Date().toISOString().slice(0, 10) + ".xml", x);
            mostrarAlerta(docs.length + " documento(s) exportado(s)." + (semNCM ? " Atenção: " + semNCM + " item(ns) sem NCM (usado 00000000)." : ""), semNCM ? "erro" : "sucesso");
        }

        function somaTotal(a) { return a.reduce(function (s, v) { return s + v.total; }, 0); }
        /* Dados do período escolhido (datas locais); campo vazio = sem limite */
        function finDados() {
            const de = document.getElementById("fin-de").value, ate = document.getElementById("fin-ate").value;
            const ini = de ? new Date(de + "T00:00:00") : null, fimD = ate ? new Date(ate + "T23:59:59.999") : null;
            const dentro = function (iso) { const d = new Date(iso); return (!ini || d >= ini) && (!fimD || d <= fimD); };
            return {
                filtrado: !!(de || ate),
                rotulo: (de ? ini.toLocaleDateString("pt-BR") : "início") + " a " + (ate ? new Date(ate + "T00:00:00").toLocaleDateString("pt-BR") : "hoje"),
                vs: fin.vendas.filter(function (v) { return dentro(v.data); }),
                ps: fin.pedidos.filter(function (x) { return dentro(x.data); }),
                ts: fin.turnos.filter(function (x) { return x.fim && dentro(x.fim); }),
                ss: fin.saidas.filter(function (x) { return dentro(x.data); })
            };
        }
        /* Imprime o período via iframe oculto (evita bloqueio de pop-up) */
        function imprimirPeriodo() {
            const P = finDados(), L = function (t) { return new Date(t).toLocaleString("pt-BR"); };
            const tab = function (tit, cab, linhas) { return "<h3>" + tit + "</h3><table><tr>" + cab.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>" + (linhas.length ? linhas.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") : '<tr><td colspan="' + cab.length + '">Sem movimentação</td></tr>') + "</table>"; };
            const html = "<html><head><meta charset='utf-8'><title>Movimentações</title><style>body{font-family:Arial,sans-serif;font-size:12px;padding:16px}table{width:100%;border-collapse:collapse;margin-bottom:12px}th,td{border:1px solid #999;padding:4px;text-align:left}h2,h3{margin:8px 0}</style></head><body>" +
                "<h2>" + esc(catalogoAtual.config.nomeLoja) + " — Movimentações</h2><p>Período: " + esc(P.rotulo) + " • Emitido em " + L(new Date()) + "</p>" +
                "<p><b>Vendas PDV:</b> " + moeda(somaTotal(P.vs)) + " (Dinheiro " + moeda(somaForma(P.vs, "Dinheiro")) + " • Pix " + moeda(somaForma(P.vs, "Pix")) + " • Cartão " + moeda(somaForma(P.vs, "Cartão")) + ")<br><b>Pedidos concluídos:</b> " + moeda(somaTotal(P.ps.filter(function (x) { return (x.status || "concluido") === "concluido"; }))) + "</p>" +
                tab("Vendas (PDV)", ["Data", "Forma", "Itens", "Total"], P.vs.map(function (v) { return [L(v.data), esc(v.forma), esc(v.itens.map(function (i) { return i.qtd + "x " + i.nome; }).join(", ")), moeda(v.total)]; })) +
                tab("Pedidos validados", ["Pedido", "Data", "Total"], P.ps.map(function (x) { return ["#" + esc(x.id), L(x.data), moeda(x.total)]; })) +
                tab("Turnos fechados", ["Fechamento", "Esperado", "Contado", "Diferença"], P.ts.map(function (x) { return [L(x.fim), moeda(x.esperado), moeda(x.contado), moeda(x.diferenca)]; })) + tab("Saídas", ["Data", "Motivo", "Valor"], P.ss.map(function (x) { return [L(x.data), esc(x.motivo), moeda(x.valor)]; })) + "</body></html>";
            const f = document.createElement("iframe");
            f.style.cssText = "position:fixed;width:0;height:0;border:0;"; document.body.appendChild(f);
            f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
            f.contentWindow.focus(); f.contentWindow.print();
            setTimeout(function () { f.remove(); }, 60000);
        }
        function finRender() {
            const t = turnoAberto(); let h = "";
            if (!t) h += '<div class="bg-white rounded shadow p-4 mb-3"><b>Nenhum turno aberto</b><input id="fin-fundo" type="number" step="0.01" placeholder="Fundo de caixa (R$)" class="w-full border rounded p-2 mt-2"><button onclick="abrirTurno()" class="bg-green-600 text-white font-bold px-4 py-2 rounded mt-2">Abrir turno</button></div>';
            else {
                const vs = fin.vendas.filter(function (v) { return v.turno === t.id; });
                h += '<div class="bg-white rounded shadow p-4 mb-3"><b>Turno aberto</b> desde ' + new Date(t.inicio).toLocaleString("pt-BR") +
                    '<p class="text-sm">Fundo: ' + moeda(t.fundo) + ' • Dinheiro: ' + moeda(somaForma(vs, "Dinheiro")) + ' • Pix: ' + moeda(somaForma(vs, "Pix")) + ' • Cartão: ' + moeda(somaForma(vs, "Cartão")) + '</p>' +
                    '<p class="text-sm font-bold">Dinheiro esperado na gaveta: ' + moeda(t.fundo + somaForma(vs, "Dinheiro") - somaSaidas(t)) + ' (já descontadas as sangrias)</p>' +
                    '<input id="fin-contado" type="number" step="0.01" placeholder="Dinheiro contado (R$)" class="w-full border rounded p-2 mt-2"><button onclick="fecharTurno()" class="bg-adminRed text-white font-bold px-4 py-2 rounded mt-2">Conferir e fechar turno</button></div>';
            }
            const Lh = finLinhas(), tipo = document.getElementById("fin-tipo").value, P = Lh.P, conc = P.ps.filter(function (x) { return (x.status || "concluido") === "concluido"; });
            h += '<div class="bg-white rounded shadow p-4 mb-3"><b>Resumo (' + esc(P.rotulo) + ')</b><p class="text-sm">' + P.vs.length + ' venda(s) PDV: <b>' + moeda(somaTotal(P.vs)) + '</b> • Dinheiro ' + moeda(somaForma(P.vs, "Dinheiro")) + ' • Pix ' + moeda(somaForma(P.vs, "Pix")) + ' • Cartão ' + moeda(somaForma(P.vs, "Cartão")) + '</p><p class="text-sm">' + conc.length + ' pedido(s) concluído(s): <b>' + moeda(somaTotal(conc)) + '</b> (' + (P.ps.length - conc.length) + ' em aberto/cancelado) • ' + P.ss.length + ' saída(s): <b>' + moeda(P.ss.reduce(function (a, x) { return a + x.valor; }, 0)) + '</b></p></div>';
            [["turnos", "Turnos fechados"], ["pedidos", "Pedidos validados por hash"], ["entradas", "Entradas"], ["saidas", "Saídas (sangrias)"]].forEach(function (sec) {
                if (tipo && tipo !== sec[0]) return;
                const rows = Lh[sec[0]].slice().reverse();
                h += '<div class="bg-white rounded shadow p-4 mb-3"><b>' + sec[1] + ' (' + rows.length + ')</b>' + (rows.slice(0, 100).map(function (r) { return r.html; }).join("") || '<p class="text-sm text-gray-500">Nada neste filtro.</p>') + (rows.length > 100 ? '<p class="text-xs text-gray-500 mt-1">Mostrando 100 de ' + rows.length + ': refine o filtro.</p>' : '') + '</div>';
            });
            document.getElementById("fin-conteudo").innerHTML = h;
        }

        /* ---- Validação do hash do pedido ---- */
        let pedidoValido = null;
        function brNum(x) { return parseFloat(String(x).replace(/\./g, "").replace(",", ".")) || 0; }
        function validarPedido() {
            /* entrada NÃO confiável: limita o tamanho e remove caracteres de controle */
            const txt = document.getElementById("val-texto").value.slice(0, 5000).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ""), out = document.getElementById("val-resultado");
            const m = txt.match(/PED:\*?\s*([A-Za-z0-9]+)\|([A-Za-z0-9]+)\|([0-9x;]+)\|([A-Za-z0-9]+)/), g = function (re) { return (txt.match(re) || [])[1] || ""; };
            pedidoValido = null;
            if (!m) { out.className = "mt-2 text-sm font-bold text-red-600"; out.textContent = "❌ Linha PED não encontrada (mensagem antiga, incompleta ou apagada)."; return; }
            const ver = m[1], cod = m[2], itensTxt = m[3], erros = [], avisos = [], itens = []; let cent = 0;
            if (hashPedido(ver + "|" + cod + "|" + itensTxt, "") !== m[4]) erros.push("checksum não confere (texto alterado ou copiado errado)");
            if (ver !== catalogoAtual.config.versaoCatalogo) avisos.push("catálogo desatualizado: o cliente viu uma versão anterior");
            if (fin.pedidos.some(function (x) { return x.id === cod; })) erros.push("pedido " + cod + " já foi registrado");
            itensTxt.split(";").forEach(function (par) {
                const a = par.split("x"), q = parseInt(a[1], 10), p = catalogoAtual.produtos.find(function (x) { return String(x.id) === a[0]; });
                if (!p) return erros.push("produto desconhecido (" + a[0] + ")");
                if (!(q >= 1 && q <= 99)) return erros.push("quantidade inválida (" + q + ")");
                itens.push({ id: p.id, nome: p.nome + (p.tamanho ? " (" + p.tamanho + ")" : ""), preco: p.preco, qtd: q }); cent += Math.round(p.preco * 100) * q; if (p.controla && q > estoqueDe(p.id)) avisos.push("estoque insuficiente: " + p.nome);
            });
            const msgTotal = brNum(g(/TOTAL:\s*R\$\s*([\d.,]+)/));
            if (Math.round(msgTotal * 100) !== cent) erros.push("total da mensagem (" + moeda(msgTotal) + ") diferente do seu banco (" + moeda(cent / 100) + ")");
            if (erros.length) { out.className = "mt-2 text-sm font-bold text-red-600"; out.innerHTML = "❌ " + erros.map(esc).join("<br>❌ "); return; }
            pedidoValido = { id: cod, hash: m[4], total: cent / 100, data: new Date().toISOString(), dev: DEV_ID, cliente: g(/Cliente:\*?\s*(.+)/).slice(0, 120), endereco: g(/Entrega:\*?\s*(.+)/).slice(0, 200), cep: g(/CEP:\*?\s*([\d-]+)/).slice(0, 9), itens: itens };
            out.className = "mt-2 text-sm font-bold text-green-700";
            out.innerHTML = "✅ Íntegro • total pelo seu banco: " + moeda(cent / 100) + (avisos.length ? '<br><span class="text-amber-600">⚠️ ' + avisos.map(esc).join("<br>⚠️ ") + "</span>" : "") +
                '<br><button onclick="registrarPedido()" class="bg-green-600 text-white px-3 py-1 rounded mt-1">Registrar</button>';
        }
        async function registrarPedido() {
            if (!pedidoValido) return;
            pedidoValido.status = "pendente"; fin.pedidos.push(pedidoValido); await salvarFin(); pedidoValido = null; entRender();
            document.getElementById("val-resultado").textContent = "Registrado em Entregas (aguardando confirmação)."; finRender();
        }

        /* ---- PDV (balcão) ---- */
        let pdv = { itens: [] };
        function pdvTotal() { return pdv.itens.reduce(function (a, i) { return a + i.preco * i.qtd; }, 0); }
        function pdvAchar(q) {
            q = q.trim().toLowerCase(); if (!q) return [];
            return catalogoAtual.produtos.filter(function (p) { return (p.codigo && p.codigo.toLowerCase() === q) || p.nome.toLowerCase().indexOf(q) !== -1; }).slice(0, 8);
        }
        function pdvBuscar() {
            document.getElementById("pdv-resultados").innerHTML = pdvAchar(document.getElementById("pdv-busca").value).map(function (p) {
                return '<button class="w-full text-left p-3 flex justify-between" onclick="pdvAdd(' + Number(p.id) + ')"><span>' + esc(p.nome) + (p.tamanho ? ' (' + esc(p.tamanho) + ')' : '') + '</span><b>' + moeda(p.preco) + '</b></button>'; }).join("");
        }
        function pdvEnter() { const r = pdvAchar(document.getElementById("pdv-busca").value); if (r.length) pdvAdd(r[0].id); }
        function pdvAdd(id) {
            const p = catalogoAtual.produtos.find(function (x) { return Number(x.id) === id; }), it = pdv.itens.find(function (x) { return x.id === id; });
            if (p && p.controla && (it ? it.qtd : 0) + 1 > estoqueDe(p.id)) return mostrarAlerta("Estoque insuficiente: " + p.nome, "erro");
            if (it) it.qtd++; else if (p) pdv.itens.push({ id: id, nome: p.nome + (p.tamanho ? " (" + p.tamanho + ")" : ""), preco: p.preco, qtd: 1 });
            document.getElementById("pdv-busca").value = ""; pdvBuscar(); pdvRender();
        }
        function pdvQtd(id, d) { const it = pdv.itens.find(function (x) { return x.id === id; }); it.qtd += d; if (it.qtd <= 0) pdv.itens = pdv.itens.filter(function (x) { return x !== it; }); pdvRender(); }
        function pdvRender() {
            const t = turnoAberto();
            document.getElementById("pdv-turno").innerHTML = t ? "🟢 Turno aberto" : '🔴 Sem turno aberto — abra em <b>Financeiro</b> para vender.';
            document.getElementById("pdv-itens").innerHTML = pdv.itens.map(function (i) {
                return '<div class="flex justify-between items-center py-1"><span class="text-sm">' + esc(i.nome) + '</span><span><button onclick="pdvQtd(' + i.id + ',-1)" class="px-2 font-bold">−</button>' + i.qtd + '<button onclick="pdvQtd(' + i.id + ',1)" class="px-2 font-bold">+</button> ' + moeda(i.preco * i.qtd) + '</span></div>'; }).join("") || '<p class="text-gray-500 text-sm">Sem itens.</p>';
            const total = pdvTotal(), din = document.getElementById("pdv-forma").value === "Dinheiro";
            document.getElementById("pdv-total").textContent = moeda(total);
            document.getElementById("pdv-din").classList.toggle("hidden", !din);
            const rec = parseFloat(document.getElementById("pdv-recebido").value) || 0;
            document.getElementById("pdv-troco").textContent = rec >= total && total > 0 ? "Troco: " + moeda(rec - total) : (rec ? "Faltam " + moeda(total - rec) : "");
        }
        async function pdvFinalizar() {
            const t = turnoAberto(), total = pdvTotal(), forma = document.getElementById("pdv-forma").value;
            const rec = forma === "Dinheiro" ? (parseFloat(document.getElementById("pdv-recebido").value) || 0) : total;
            if (!t) return mostrarAlerta("Abra um turno no Financeiro.", "erro");
            if (!pdv.itens.length) return mostrarAlerta("Adicione itens.", "erro");
            if (rec < total) return mostrarAlerta("Valor recebido menor que o total.", "erro");
            fin.vendas.push({ id: Date.now(), dev: DEV_ID, turno: t.id, data: new Date().toISOString(), itens: pdv.itens, total: total, forma: forma, recebido: rec, troco: rec - total });
            baixarEstoque(pdv.itens, -1, "Venda PDV"); await salvarFin(); pdv.itens = []; document.getElementById("pdv-recebido").value = "";
            pdvRender(); mostrarAlerta("Venda registrada!", "sucesso");
        }

        function importarJSON(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async function (e) {
                try {
                    const dados = JSON.parse(e.target.result);
                    if (!Array.isArray(dados.produtos)) throw new Error("JSON sem a lista de produtos");
                    /* mantém banner/logo/console atuais se o JSON antigo não trouxer config */
                    if (!dados.config) dados.config = catalogoAtual.config;
                    await salvarNoIndexedDB(dados);
                    mostrarAlerta("Importado com sucesso!", "sucesso");
                } catch (err) {
                    console.error(err);
                    mostrarAlerta("Erro ao ler JSON: " + err.message, "erro");
                }
            };
            reader.readAsText(file);
            event.target.value = "";
        }

        /* =========================================================
           GERADOR DO index.html
           ========================================================= */
        function exportarHTMLCompleto() {
            catalogoAtual.config.versaoCatalogo = Date.now().toString(36); /* versão do catálogo publicado */
            salvarNoIndexedDB(catalogoAtual);
            if (!catalogoAtual.produtos.length) return mostrarAlerta("Catálogo vazio. Cadastre ao menos um produto.", "erro");

            /* '<' vira \u003c para que nenhum texto de produto consiga fechar o <script> */
            const json = JSON.stringify(dadosPublicos())
                .replace(/</g, "\\u003c")
                .replace(/\u2028/g, "\\u2028")
                .replace(/\u2029/g, "\\u2029");

            const FECHA = "</scr" + "ipt>";
            const tagConsole = catalogoAtual.config.mostrarConsole
                ? "<script>(" + criarConsoleMobile.toString() + ")().mostrarBotao(true);" + FECHA
                : "";

            /* split/join (e não replace) para o '$' do conteúdo não ser interpretado */
            let html = document.getElementById("template-cardapio-final").textContent.trim();
            html = html.split("@@NOME_LOJA@@").join(esc(catalogoAtual.config.nomeLoja))
                       .split("@@FIM_SCRIPT@@").join(FECHA)
                       .split("@@CONSOLE@@").join(tagConsole)
                       .split("@@FUNCOES@@").join("<script>" + [hashPedido].map(function (f) { return f.toString(); }).join("\n") + FECHA)
                       .split("/*[DADOS_INJETADOS_AQUI]*/").join(json);

            const blob = new Blob([html], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "catalogo.html";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(url); }, 1000);

            console.log("catalogo.html gerado:", catalogoAtual.produtos.length, "produto(s),", Math.round(html.length / 1024), "KB");
            mostrarAlerta("catalogo.html gerado! Hospede o arquivo no GitHub Pages." + (catalogoAtual.config.whatsapp ? "" : " Atenção: o WhatsApp ainda não foi configurado."), "sucesso");
        }

        window.addEventListener("DOMContentLoaded", function () {
            inicializarDB().then(carregarFin).then(entRender).then(tratarEntrada).catch(function (e) {
                console.error(e);
                mostrarAlerta("IndexedDB indisponível neste navegador/modo. Os dados não serão guardados.", "erro");
                renderizarTudo();
            });
        });
    </script>

    <!-- =====================================================================
         TEMPLATE DO CARDÁPIO (é só TEXTO aqui; vira o index.html ao gerar).
         Regras: não escrever o fechamento de script dentro dele; usar
         @@FIM_SCRIPT@@. Sem barras invertidas duplicadas.
         ===================================================================== -->
    <script type="text/template" id="template-cardapio-final">
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@@NOME_LOJA@@</title>
    @@CONSOLE@@
    @@FUNCOES@@
    <script src="https://cdn.tailwindcss.com">@@FIM_SCRIPT@@
    <script>tailwind.config = { theme: { extend: { colors: { ifoodRed: '#ea1d2c', ifoodBg: '#f7f7f7' } } } }@@FIM_SCRIPT@@
    <style>html.dark body{background:#0f172a;color:#e2e8f0}html.dark .bg-white{background:#1e293b!important}html.dark .bg-gray-50,html.dark .bg-gray-100{background:#334155!important}html.dark .text-gray-800,html.dark .text-gray-700{color:#f1f5f9!important}html.dark .text-gray-500,html.dark .text-gray-600{color:#94a3b8!important}html.dark input,html.dark textarea{background:#334155!important;color:#f1f5f9!important;border-color:#475569!important}.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }</style>
</head>
<body class="bg-ifoodBg text-gray-800 font-sans pb-24 antialiased">

    <div class="relative w-full h-40 bg-gradient-to-br from-ifoodRed to-red-900">
        <img id="img-banner" class="hidden absolute inset-0 w-full h-full object-cover" alt="Capa">
        <button id="btn-tema" class="hidden absolute top-3 left-3 bg-black/40 text-white rounded-full w-10 h-10 z-10">🌙</button>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute bottom-4 left-4 flex items-center gap-3 w-full pr-4">
            <div class="w-16 h-16 rounded-full border-2 border-white bg-white overflow-hidden shadow-lg flex-shrink-0 flex items-center justify-center text-3xl">
                <img id="img-logo" class="hidden w-full h-full object-cover" alt="Logo">
                <span id="logo-padrao">🛍️</span>
            </div>
            <div class="text-white">
                <h1 id="txt-nome" class="text-2xl font-extrabold drop-shadow-md"></h1>
                <p id="txt-subtitulo" class="text-xs font-medium text-gray-200 drop-shadow-md"></p>
                <p id="txt-end" class="text-[11px] text-gray-300"></p>
            </div>
        </div>
    </div>

    <header class="bg-white sticky top-0 z-40 shadow-sm flex flex-col w-full">
        <div class="px-4 pt-3 pb-2">
            <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">🔍</span>
                <input type="text" id="campo-busca" placeholder="Busque por item..." class="w-full bg-gray-100 text-gray-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-ifoodRed transition-all">
            </div>
        </div>
        <nav id="container-filtros" class="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar bg-white border-b border-gray-100"></nav>
    </header>

    <main class="container mx-auto max-w-2xl px-4 mt-4">
        <div id="vitrine-produtos" class="space-y-4"></div>
    </main>

    <div id="container-carrinho-flutuante" class="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-40 hidden">
        <button id="btn-abrir-carrinho" class="w-full max-w-2xl mx-auto bg-ifoodRed text-white flex items-center justify-between px-6 py-4 rounded-lg shadow-lg font-medium active:scale-95 transition-transform">
            <span id="txt-qtd-carrinho" class="bg-white/20 px-2 py-1 rounded text-sm">0</span>
            <span class="font-bold">Ver sacola</span>
            <span id="txt-total-carrinho">R$ 0,00</span>
        </button>
    </div>

    <div id="modal-carrinho" class="fixed inset-0 bg-black/60 z-50 hidden flex-col justify-end">
        <div class="bg-white w-full max-w-2xl mx-auto rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto flex flex-col">
            <div class="flex justify-between items-center mb-4 border-b pb-3">
                <h2 class="text-xl font-bold">Sua Sacola</h2>
                <button id="btn-fechar-carrinho" class="text-gray-500 font-bold text-xl p-2">✕</button>
            </div>
            <div id="lista-carrinho" class="flex-1 overflow-y-auto space-y-4 mb-4"></div>
            <div class="border-t pt-4 mb-6"><div class="flex justify-between text-lg font-bold"><span>Total</span><span id="modal-total-carrinho">R$ 0,00</span></div></div>
            <div id="area-pagamento" class="mb-4 space-y-2"></div>
            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 class="font-bold text-gray-700 text-sm uppercase tracking-wider mb-2">Dados de Entrega</h3>
                <input type="text" id="cli-nome" placeholder="Seu nome completo" class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ifoodRed">
                <input type="text" id="cli-cep" inputmode="numeric" maxlength="9" placeholder="CEP * (00000-000)" class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ifoodRed">
                <input type="text" id="cli-endereco" maxlength="200" autocomplete="street-address" autocapitalize="sentences" placeholder="Endereço (Rua, Número, Bairro)" class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ifoodRed">
                <input type="number" id="cli-troco" placeholder="Troco para? (Opcional)" class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ifoodRed">
            </div>
            <button id="btn-whatsapp" class="w-full bg-green-500 text-white font-bold py-4 rounded-lg shadow active:scale-95 transition-transform flex justify-center items-center gap-2"><span>💬</span> Fechar Pedido no WhatsApp</button>
        </div>
    </div>

    <script>
        const DADOS = /*[DADOS_INJETADOS_AQUI]*/;
                const produtos = Array.isArray(DADOS.produtos) ? DADOS.produtos : [];
        const config = DADOS.config || {};
        const numeroWhatsApp = String(config.whatsapp || '').replace(/\D/g, '');
        let carrinho = lerCarrinho();
        let categoriaAtual = 'Todas';

        const $ = function (id) { return document.getElementById(id); };
        const moeda = function (v) { return 'R$ ' + Number(v).toFixed(2).replace('.', ','); };

        function lerCarrinho() {
            try { const c = JSON.parse(localStorage.getItem('cardapio_carrinho')); return Array.isArray(c) ? c : []; }
            catch (e) { return []; }
        }
        function salvarCarrinho() {
            try { localStorage.setItem('cardapio_carrinho', JSON.stringify(carrinho)); } catch (e) {}
        }

        /* ---------- Aparência ---------- */
        function aplicarAparencia() {
            document.title = config.nomeLoja || 'Cardápio';
            $('txt-nome').textContent = config.nomeLoja || 'Cardápio';
            $('txt-subtitulo').textContent = config.subtitulo || '';
            $('txt-end').textContent = [config.endereco, config.cep].filter(Boolean).join(' • ');
            if (config.banner) { $('img-banner').src = config.banner; $('img-banner').classList.remove('hidden'); }
            if (config.logo) { $('img-logo').src = config.logo; $('img-logo').classList.remove('hidden'); $('logo-padrao').classList.add('hidden'); }
        }

        /* ---------- Filtros ---------- */
        function listaCategorias() {
            const cats = [];
            produtos.forEach(function (p) { if (cats.indexOf(p.categoria) === -1) cats.push(p.categoria); });
            return cats;
        }

        function marcarFiltro() {
            document.querySelectorAll('.btn-filtro').forEach(function (b) {
                const ativo = b.dataset.cat === categoriaAtual;
                b.classList.toggle('bg-ifoodRed', ativo);
                b.classList.toggle('text-white', ativo);
                b.classList.toggle('bg-gray-100', !ativo);
                b.classList.toggle('text-gray-600', !ativo);
            });
        }

        function renderizarFiltros() {
            const cont = $('container-filtros');
            cont.innerHTML = '';
            ['Todas'].concat(listaCategorias()).forEach(function (cat) {
                const b = document.createElement('button');
                b.type = 'button';
                b.dataset.cat = cat;
                b.textContent = cat;
                b.className = 'btn-filtro px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap';
                b.addEventListener('click', function () {
                    categoriaAtual = cat;
                    $('campo-busca').value = '';
                    marcarFiltro();
                    executarFiltro();
                });
                cont.appendChild(b);
            });
            marcarFiltro();
        }

        function executarFiltro() {
            const termo = $('campo-busca').value.toLowerCase().trim();
            let lista = produtos;
            if (categoriaAtual !== 'Todas') lista = lista.filter(function (p) { return p.categoria === categoriaAtual; });
            if (termo) lista = lista.filter(function (p) {
                return String(p.nome || '').toLowerCase().indexOf(termo) !== -1 ||
                       String(p.descricao || '').toLowerCase().indexOf(termo) !== -1;
            });
            renderizarProdutos(lista);
        }

        /* ---------- Vitrine ---------- */
        function criarPlaceholderFoto() {
            const d = document.createElement('div');
            d.className = 'w-24 h-24 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-3xl';
            d.textContent = '🛍️';
            return d;
        }

        function renderizarProdutos(lista) {
            const vitrine = $('vitrine-produtos');
            vitrine.innerHTML = '';
            if (!lista.length) {
                vitrine.innerHTML = '<div class="text-center py-12"><span class="text-4xl">🛍️</span><p class="text-gray-500 mt-4">Nenhum produto encontrado.</p></div>';
                return;
            }

            lista.forEach(function (prod) {
                const card = document.createElement('div');
                card.className = 'bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4';

                let foto;
                if (prod.imagem) {
                    foto = document.createElement('img');
                    foto.src = prod.imagem;
                    foto.alt = prod.nome || '';
                    foto.className = 'w-24 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0';
                    foto.addEventListener('error', function () { foto.replaceWith(criarPlaceholderFoto()); });
                } else {
                    foto = criarPlaceholderFoto();
                }

                const col = document.createElement('div');
                col.className = 'flex-1 flex flex-col justify-between min-w-0';

                const topo = document.createElement('div');
                const h3 = document.createElement('h3');
                h3.className = 'font-medium text-gray-800';
                h3.textContent = prod.nome || '';
                const desc = document.createElement('p');
                desc.className = 'text-xs text-gray-500 line-clamp-2 mt-1 mb-2';
                desc.textContent = prod.descricao || '';
                topo.appendChild(h3);
                topo.appendChild(desc);

                const base = document.createElement('div');
                base.className = 'flex items-center justify-between gap-2 mt-auto';
                const precoBox = document.createElement('div');
                const preco = document.createElement('p');
                preco.className = 'font-bold text-gray-800 text-sm';
                preco.textContent = moeda(prod.preco);
                precoBox.appendChild(preco);
                if (prod.tamanho) {
                    const tam = document.createElement('p');
                    tam.className = 'text-xs text-gray-500';
                    tam.textContent = prod.tamanho;
                    precoBox.appendChild(tam);
                }
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'text-ifoodRed font-medium text-sm px-3 py-1.5 rounded hover:bg-red-50 transition-colors';
                btn.textContent = 'Adicionar';
                btn.addEventListener('click', function () { adicionarAoCarrinho(prod); });
                if (prod.esgotado) { btn.disabled = true; btn.textContent = 'Esgotado'; btn.className += ' opacity-50'; }
                base.appendChild(precoBox);
                base.appendChild(btn);

                col.appendChild(topo);
                col.appendChild(base);
                card.appendChild(foto);
                card.appendChild(col);
                vitrine.appendChild(card);
            });
        }

        /* ---------- Carrinho ---------- */
        function totalCarrinho() { return carrinho.reduce(function (acc, i) { return acc + i.preco; }, 0); }

        function adicionarAoCarrinho(prod) {
            carrinho.push({ id: Date.now() + Math.random(), idProduto: prod.id, nome: prod.nome, tamanho: prod.tamanho || '', preco: Number(prod.preco) || 0 });
            salvarCarrinho();
            atualizarBotaoCarrinho();
        }

        function removerDoCarrinho(id) {
            carrinho = carrinho.filter(function (i) { return i.id !== id; });
            salvarCarrinho();
            renderizarItensCarrinho();
            atualizarBotaoCarrinho();
        }

        function atualizarBotaoCarrinho() {
            const box = $('container-carrinho-flutuante');
            if (carrinho.length) {
                $('txt-qtd-carrinho').textContent = carrinho.length;
                $('txt-total-carrinho').textContent = moeda(totalCarrinho());
                box.classList.remove('hidden');
            } else {
                box.classList.add('hidden');
                fecharCarrinho();
            }
        }

        function abrirCarrinho() {
            $('modal-carrinho').classList.remove('hidden');
            $('modal-carrinho').classList.add('flex');
            renderizarItensCarrinho();
        }
        function fecharCarrinho() {
            $('modal-carrinho').classList.add('hidden');
            $('modal-carrinho').classList.remove('flex');
        }

        function renderizarItensCarrinho() {
            const lista = $('lista-carrinho');
            lista.innerHTML = '';
            carrinho.forEach(function (item) {
                const linha = document.createElement('div');
                linha.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100';
                const info = document.createElement('div');
                const nome = document.createElement('p');
                nome.className = 'font-medium text-gray-800 text-sm';
                nome.textContent = item.nome;
                const det = document.createElement('p');
                det.className = 'text-xs text-gray-500';
                det.textContent = (item.tamanho ? item.tamanho + ' • ' : '') + moeda(item.preco);
                info.appendChild(nome);
                info.appendChild(det);
                const rm = document.createElement('button');
                rm.type = 'button';
                rm.className = 'text-red-400 px-3 py-1';
                rm.textContent = 'Excluir';
                rm.addEventListener('click', function () { removerDoCarrinho(item.id); });
                linha.appendChild(info);
                linha.appendChild(rm);
                lista.appendChild(linha);
            });
            $('modal-total-carrinho').textContent = moeda(totalCarrinho());
            renderPagamento();
        }

        function enviarWhatsApp() {
            const nome = $('cli-nome').value.trim();
            const end = $('cli-endereco').value.trim();
            const troco = $('cli-troco').value.trim();
            if (!carrinho.length) return alert('Sua sacola está vazia.');
            const cep = $('cli-cep').value.replace(/\D/g, '');
            if (!nome || !end) return alert('Preencha Nome e Endereço.');
            if (end.length < 8) return alert('Endereço muito curto: informe rua, número e bairro.');
            if (cep.length !== 8) return alert('Informe um CEP válido (8 dígitos).');
            if (!numeroWhatsApp) return alert('WhatsApp do estabelecimento não configurado.');

            const codigo = Date.now().toString(36).toUpperCase().slice(-6);
            let msg = '*🛒 NOVO PEDIDO - ' + (config.nomeLoja || 'CARDÁPIO').toUpperCase() + '*\n*CÓDIGO:* #' + codigo + '\n\n*👤 Cliente:* ' + nome + '\n*📍 Entrega:* ' + end + '\n*📮 CEP:* ' + cep.slice(0, 5) + '-' + cep.slice(5) + '\n\n*🛒 ITENS:*\n';
            carrinho.forEach(function (i) { msg += '- ' + i.nome + (i.tamanho ? ' (' + i.tamanho + ')' : '') + ' = ' + moeda(i.preco) + '\n'; });
            msg += '\n*💰 TOTAL: ' + moeda(totalCarrinho()) + '*';
            if (troco) msg += '\n💵 Troco para: ' + moeda(parseFloat(troco));
            /* linha de máquina: versão | código | itens (id x qtd) | checksum. Sem preço: o ADM usa o preço do banco dele */
            const cont = {}; carrinho.forEach(function (i) { cont[i.idProduto] = (cont[i.idProduto] || 0) + 1; });
            const itensTxt = Object.keys(cont).map(function (id) { return id + 'x' + cont[id]; }).join(';'), ver = String(DADOS.versao || '0');
            msg += '\n\n🔐 *PED:* ' + ver + '|' + codigo + '|' + itensTxt + '|' + hashPedido(ver + '|' + codigo + '|' + itensTxt, '');

            if (!confirm('Confirme seus dados:\n\nCliente: ' + nome + '\nEndereço: ' + end + '\nCEP: ' + cep.slice(0, 5) + '-' + cep.slice(5) + '\n\nEstá correto?')) return;
            window.open('https://api.whatsapp.com/send?phone=' + numeroWhatsApp + '&text=' + encodeURIComponent(msg), '_blank');
            carrinho = [];
            salvarCarrinho();
            fecharCarrinho();
            atualizarBotaoCarrinho();
        }

        /* ---------- Pagamento: Pix copia e cola + Mercado Pago (link) ---------- */
        function renderPagamento() {
            const a = $('area-pagamento'), total = totalCarrinho();
            a.innerHTML = '';
            if (config.mpAtivo && config.mpLink) {
                const l = document.createElement('a');
                l.href = config.mpLink; l.target = '_blank'; l.rel = 'noopener'; l.textContent = '💳 Pagar com Mercado Pago';
                l.className = 'block text-center w-full bg-sky-600 text-white font-bold py-2 rounded';
                a.appendChild(l);
            }
        }

        /* ---------- Tema claro/escuro ---------- */
        function iniciarTema() {
            if (!config.temaToggle) return;
            const b = $('btn-tema'); let t = null;
            try { t = localStorage.getItem('cardapio_tema'); } catch (e) {}
            if (!t) t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const set = function (v) { t = v; document.documentElement.classList.toggle('dark', v === 'dark'); b.textContent = v === 'dark' ? '☀️' : '🌙'; try { localStorage.setItem('cardapio_tema', v); } catch (e) {} };
            b.classList.remove('hidden'); b.addEventListener('click', function () { set(t === 'dark' ? 'light' : 'dark'); }); set(t);
        }

        /* ---------- Início ---------- */
        function iniciar() {
            console.log('Cardápio iniciado com', produtos.length, 'produto(s).');
            aplicarAparencia();
            iniciarTema();
            renderizarFiltros();
            renderizarProdutos(produtos);
            atualizarBotaoCarrinho();
            $('campo-busca').addEventListener('input', function () {
                categoriaAtual = 'Todas';
                marcarFiltro();
                executarFiltro();
            });
            $('btn-abrir-carrinho').addEventListener('click', abrirCarrinho);
            $('btn-fechar-carrinho').addEventListener('click', fecharCarrinho);
            $('btn-whatsapp').addEventListener('click', enviarWhatsApp);
            $('cli-cep').addEventListener('input', function () { const d = this.value.replace(/\D/g, '').slice(0, 8); this.value = d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d; });
        }

        try { iniciar(); } catch (e) { console.error('Erro ao iniciar o cardápio:', e); }
    @@FIM_SCRIPT@@
</body>
</html>
    </script>

</body>
</html>
<!--🟥FIM BLOCO 1: adm_v3.html🟥-->
