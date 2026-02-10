async function exportAllToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Meu Bloco de Notas - ERP ABP", 10, 20);

    let y = 35;

    allNotes.forEach((n, i) => {
        if (y > 270) { doc.addPage(); y = 20; } // Nova página se estiver cheio
        
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text(n.content, 10, y + 7);
        
        y += 25;
    });

    doc.save("minhas-notas.pdf");
}
