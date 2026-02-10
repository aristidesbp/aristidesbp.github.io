/**
 * Nome do arquivo: exportar_notas.js
 */
async function exportAllToPDF() {
    if (allNotes.length === 0) return alert("Não há notas para exportar.");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(19, 127, 236); // Cor Primary
    doc.text("Relatório de Notas - ERP ABP", 10, 20);

    let y = 35;

    allNotes.forEach((n, i) => {
        if (y > 270) { 
            doc.addPage(); 
            y = 20; 
        }
        
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        
        // Quebra automática de texto para o conteúdo não sair da página
        const splitContent = doc.splitTextToSize(n.content, 180);
        doc.text(splitContent, 10, y + 7);
        
        y += (splitContent.length * 5) + 15;
    });

    doc.save("minhas-notas-abp.pdf");
}
