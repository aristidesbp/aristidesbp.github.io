
        function toggleCode(id) {
            const codeElement = document.getElementById(id);
            if (codeElement.style.display === "none") {
                codeElement.style.display = "block";
            } else {
                codeElement.style.display = "none";
            }
        }

        function copyToClipboard(id) {
            const textarea = document.getElementById(id);
            textarea.select();
            document.execCommand('copy');
            alert('Comando copiado!');
        }
    
