(async () => {
    let html5QrCode;

    window.inicializar = async () => {
        loadProdutos();
    };

    window.loadProdutos = async () => {
        const { data } = await _supabase.from('produtos').select('*');
        const corpo = document.getElementById('corpoTabela');
        corpo.innerHTML = data.map(p => `
            <tr>
                <td>${p.nome}</td>
                <td>${p.codigo_de_barras || '-'}</td>
                <td>${p.estoque_atual}</td>
                <td>R$ ${p.preco_venda}</td>
                <td><button onclick="deleteProd('${p.id}')" class="btn-danger"><i class="fas fa-trash"></i></button></td>
            </tr>
        `).join('');
    };

    window.abrirScanner = function() {
        document.getElementById('reader-container').style.display = 'block';
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, 
            (text) => {
                document.getElementById('codigo_de_barras').value = text;
                fecharScanner();
            });
    };

    window.fecharScanner = () => { 
        if(html5QrCode) html5QrCode.stop(); 
        document.getElementById('reader-container').style.display = 'none';
    };

    document.addEventListener('DOMContentLoaded', inicializar);
})();
