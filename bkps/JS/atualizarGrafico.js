function atualizarGrafico(receita, despesa, pendente) {
    const secaoGrafico = document.getElementById('secao-grafico');
    if(receita === 0 && despesa === 0 && pendente === 0) { secaoGrafico.classList.add('hidden'); return; }
    secaoGrafico.classList.remove('hidden');
    const ctx = document.getElementById('graficoFinanceiro').getContext('2d');
    if(window.graficoInstancia) { window.graficoInstancia.destroy(); }

    window.graficoInstancia = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Receitas', 'Despesas', 'Pendentes'],
            datasets: [{
                data: [receita, despesa, pendente],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}
