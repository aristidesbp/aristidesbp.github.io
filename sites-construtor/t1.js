// Variável para armazenar o elemento arrastado
let currentElement = null;

// -----------------------------------
// 🌟 SUPORTE PARA TOUCHSCREEN (CELULAR)
// -----------------------------------
function touchStart(event) {
    event.preventDefault();
    currentElement = event.target;
}

function touchMove(event) {
    event.preventDefault();
    if (currentElement) {
        let touch = event.touches[0];
        currentElement.style.position = 'absolute';
        currentElement.style.left = touch.pageX - currentElement.offsetWidth / 2 + 'px';
        currentElement.style.top = touch.pageY - currentElement.offsetHeight / 2 + 'px';
    }
}

function touchEnd(event) {
    event.preventDefault();
    if (currentElement) {
        let textarea = document.getElementById("navbar-code");
        let code = generateCode(currentElement);
        insertAtCursor(textarea, code);
        currentElement.style.position = '';
        currentElement = null;
    }
}

// -----------------------------------
// 🖱️ SUPORTE PARA DESKTOP (DRAG & DROP)
// -----------------------------------
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var element = document.getElementById(data);
    let code = generateCode(element);
    insertAtCursor(document.getElementById("navbar-code"), code);
}

// -----------------------------------
// 🏗️ GERA O CÓDIGO COMPLETO DO ELEMENTO ARRASTADO
// -----------------------------------
function generateCode(element) {
let tag = element.id;
switch (tag) {
       
case 'html_basico': 
return `<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Página Básica</title>
<style>
body {
font-family: Arial, sans-serif;
background: #f4f4f4;
text-align: center;
padding: 20px;
}
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Olá, mundo!</h1>
</body>
</html>\n`;

        case 'texto': 
            return '<p id="paragrafo1" class="texto-principal" style="font-size: 16px; color: #333; text-align: justify; background: #f4f4f4; padding: 10px; border-radius: 5px;">Seu texto aqui</p>\n';

        case 'imagens': 
            return '<img id="imagem1" class="imagem-responsiva" src="imagem.jpg" alt="Descrição da imagem" width="300" height="200" style="border-radius: 8px; display: block; margin: auto;">\n';

        case 'botões': 
            return '<button id="botao1" class="botao-primario" style="background: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;">Clique Aqui</button>\n';

        default: 
            return `<div class="elemento-generico">${element.innerText}</div>\n`;
    }
}

// -----------------------------------
// ✂️ BOTÃO COPIAR CÓDIGO
// -----------------------------------
function copyCode() {
    var textarea = document.getElementById('navbar-code');
    textarea.select();
    document.execCommand('copy');
    alert('Código copiado com sucesso!');
}

// -----------------------------------
// 🗑️ BOTÃO LIMPAR CAIXA DE TEXTO
// -----------------------------------
function clearText() {
    document.getElementById("navbar-code").value = '';
}

// -----------------------------------
// 👀 BOTÃO PARA VISUALIZAR A PÁGINA GERADA
// -----------------------------------
function previewPage() {
    let content = document.getElementById('navbar-code').value;
    let iframe = document.getElementById('preview-frame').contentWindow.document;
    iframe.open();
    iframe.write(content);
    iframe.close();
}

// -----------------------------------
// ✏️ INSERE O CÓDIGO NA POSIÇÃO ATUAL DO CURSOR
// -----------------------------------
function insertAtCursor(textarea, text) {
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    let textBefore = textarea.value.substring(0, startPos);
    let textAfter = textarea.value.substring(endPos, textarea.value.length);

    textarea.value = textBefore + text + textAfter;
    textarea.selectionStart = textarea.selectionEnd = startPos + text.length;
}

// -----------------------------------
// 🚀 INICIALIZA EVENTOS PARA TOUCH NO CELULAR
// -----------------------------------
window.onload = () => {
    let draggableElements = document.querySelectorAll('a[draggable="true"]');
    draggableElements.forEach((element) => {
        element.addEventListener('touchstart', touchStart);
        element.addEventListener('touchmove', touchMove);
        element.addEventListener('touchend', touchEnd);
    });
};
