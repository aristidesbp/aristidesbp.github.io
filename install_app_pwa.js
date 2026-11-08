/* =====================================================================
   install_app_pwa.js  —  coloque na MESMA pasta do adm_v11.html
   Cria os arquivos do aplicativo (PWA), baixa tudo e guia a instalação.
   ===================================================================== */
(function () {
    "use strict";
    let eventoInstalacao = null;                                   // guarda o "evento de instalação" liberado pelo navegador
    const PAGINA = location.pathname.split("/").pop() || "index.html";   // nome do arquivo do programa (ex.: adm_v11.html)

    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); eventoInstalacao = e; });
    window.addEventListener("appinstalled", function () { eventoInstalacao = null; _status("✅ Aplicativo instalado!"); });

    // Registra o service worker (offline). Só funciona em HTTPS ou localhost e com o sw.js na mesma pasta.
    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
        window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function (e) { console.warn("Service worker:", e.message); }); });
    }

    // ---- manifest.webmanifest (nome, ícones, atalhos e recebimento de compartilhamento) ----
    function _manifest() {
        let nome = "Cardápio ADM";
        try { if (catalogoAtual.config.nomeLoja) nome = catalogoAtual.config.nomeLoja; } catch (e) {}
        const url = function (aba) { return "./" + PAGINA + "?aba=" + aba; };
        return {
            name: nome + " • Gestão", short_name: nome.slice(0, 12), description: "Catálogo, PDV, entregas e financeiro",
            start_url: "./" + PAGINA, scope: "./", display: "standalone", orientation: "portrait", lang: "pt-BR",
            background_color: "#1e293b", theme_color: "#1e293b",
            icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
                    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }],
            shortcuts: [{ name: "PDV", url: url("pdv") }, { name: "Entregas", url: url("ent") }, { name: "Financeiro", url: url("fin") }],
            // Aparece na lista "Compartilhar" do Android: o texto vem para o app e cai direto no validador de pedidos
            share_target: { action: "./" + PAGINA, method: "GET", params: { title: "title", text: "text", url: "url" } }
        };
    }

    // ---- sw.js (guarda o app no aparelho: abre mesmo sem internet) ----
    function _sw() {
        return [
            'const CACHE = "cardapio-adm-v11";',
            'const ARQ = ["./", "' + PAGINA + '", "install_app_pwa.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];',
            'self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return Promise.all(ARQ.map(function (a) { return c.add(a).catch(function () {}); })); }).then(function () { return self.skipWaiting(); })); });',
            'self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });',
            '// Cache primeiro, atualiza em segundo plano. Navegação com ?text=... usa a mesma página em cache.',
            'self.addEventListener("fetch", function (e) {',
            '  if (e.request.method !== "GET") return;',
            '  const chave = e.request.mode === "navigate" ? e.request.url.split("?")[0] : e.request;',
            '  e.respondWith(caches.match(chave).then(function (hit) {',
            '    const rede = fetch(e.request).then(function (r) { if (r && (r.ok || r.type === "opaque")) { const cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(chave, cp); }); } return r; }).catch(function () { return hit; });',
            '    return hit || rede;',
            '  }));',
            '});'
        ].join("\n");
    }

    // ---- ícones desenhados no próprio navegador ----
    function _icone(t) {
        return new Promise(function (ok) {
            const c = document.createElement("canvas"); c.width = c.height = t;
            const x = c.getContext("2d"); if (!x) return ok(new Blob([]));
            x.fillStyle = "#1e293b"; x.fillRect(0, 0, t, t);
            x.fillStyle = "#ea1d2c"; x.beginPath(); x.arc(t / 2, t / 2, t * 0.34, 0, 7); x.fill();
            x.fillStyle = "#fff"; x.font = "bold " + (t * 0.42) + "px sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("C", t / 2, t / 2 + t * 0.02);
            c.toBlob(ok, "image/png");
        });
    }

    function _baixar(nome, blob) {
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nome;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    }

    function _status(t) { const s = document.getElementById("pwa-status"); if (s) s.textContent = t; }

    // ---- janela de orientação (passo 2) ----
    function _dialogo() {
        const velho = document.getElementById("pwa-dialogo"); if (velho) velho.remove();
        const d = document.createElement("div"); d.id = "pwa-dialogo";
        d.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:100001;display:flex;align-items:center;justify-content:center;padding:16px;font-family:sans-serif";
        d.innerHTML = '<div style="background:#fff;color:#1e293b;border-radius:12px;max-width:420px;width:100%;padding:18px;max-height:90vh;overflow:auto">' +
            '<h3 style="margin:0 0 8px">📲 Instalar aplicativo</h3>' +
            '<p style="font-size:14px;margin:0 0 8px">Foram baixados: <b>manifest.webmanifest</b>, <b>sw.js</b>, <b>icon-192.png</b>, <b>icon-512.png</b>, o <b>catalogo.html</b> e um <b>backup</b>.</p>' +
            '<p style="font-size:14px;margin:0 0 8px"><b>Os arquivos já foram baixados?</b> Coloque-os na <b>mesma pasta</b> do programa (<b>' + PAGINA + '</b> e <b>install_app_pwa.js</b>) e publique em <b>HTTPS</b> (ex.: GitHub Pages). Abra o programa por esse endereço e toque no botão abaixo para instalar.</p>' +
            '<p id="pwa-status" style="font-size:13px;color:#b45309;margin:0 0 10px"></p>' +
            '<button id="pwa-instalar" style="width:100%;background:#16a34a;color:#fff;border:0;border-radius:8px;padding:12px;font-weight:bold;font-size:15px">📲 Instalar agora</button>' +
            '<button id="pwa-fechar" style="width:100%;background:#e5e7eb;border:0;border-radius:8px;padding:10px;margin-top:8px">Fechar</button></div>';
        document.body.appendChild(d);
        document.getElementById("pwa-instalar").onclick = instalar_agora;
        document.getElementById("pwa-fechar").onclick = function () { d.remove(); };
    }

    // ---- botão "Instalar agora" ----
    async function instalar_agora() {
        if (eventoInstalacao) {
            eventoInstalacao.prompt();
            const r = await eventoInstalacao.userChoice; eventoInstalacao = null;
            return _status(r.outcome === "accepted" ? "✅ Instalando..." : "Instalação cancelada.");
        }
        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
        _status(ios ? "No iPhone/iPad: toque em Compartilhar → Adicionar à Tela de Início (o iOS não aceita receber compartilhamentos)."
            : (location.protocol === "https:" || location.hostname === "localhost")
                ? "O navegador ainda não liberou a instalação. Confirme que manifest, sw.js e ícones estão na mesma pasta, recarregue a página e tente de novo."
                : "Esta página não está em HTTPS. Publique os arquivos (ex.: GitHub Pages) e abra por lá.");
    }

    // ---- função principal (passo 1 e 2) ----
    async function install_app_pwa() {
        if (window.matchMedia && matchMedia("(display-mode: standalone)").matches) return alert("O aplicativo já está instalado e aberto como app.");
        const arqs = [["manifest.webmanifest", new Blob([JSON.stringify(_manifest(), null, 2)], { type: "application/manifest+json" })],
                      ["sw.js", new Blob([_sw()], { type: "text/javascript" })],
                      ["icon-192.png", await _icone(192)], ["icon-512.png", await _icone(512)]];
        arqs.forEach(function (a, i) { setTimeout(function () { _baixar(a[0], a[1]); }, i * 700); });   // downloads em fila (o navegador bloqueia rajadas)
        setTimeout(function () { if (typeof exportarHTMLCompleto === "function") exportarHTMLCompleto(); }, arqs.length * 700);   // catalogo.html
        setTimeout(function () { if (typeof exportarBackup === "function") exportarBackup(); }, (arqs.length + 1) * 700);        // backup
        _dialogo();
    }

    window.install_app_pwa = install_app_pwa;
    window.instalar_agora = instalar_agora;
})();
