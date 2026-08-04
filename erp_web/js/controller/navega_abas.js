/*---- Inicialização na aba home ----------*/
function init() {
alternarAba('home'); // garante aba inicial correta
}


/*----- verificando requisitos -----*/
document.addEventListener('DOMContentLoaded', () => {
verificar_login();
configurarDropZone('drop-foto','f-foto','nome-foto');
// Atalho F8 para finalizar venda PDV  
window.addEventListener('keydown', e => {
if (e.key === 'F8') { e.preventDefault(); if (typeof pdv_finalizarVenda === 'function') pdv_finalizarVenda(); }
    });
});


/* ...... alternando entre abas ......*/
function alternarAba(abaAtiva) {
const selectAba = document.getElementById('select-aba');

if (selectAba) selectAba.value = abaAtiva;
document.querySelectorAll('[id^="aba-"]').forEach(painel => {
painel.classList.toggle('hidden', painel.id !== `aba-${abaAtiva}`);
});

if (abaAtiva === 'estoque') { est_init(); }
if (abaAtiva === 'entidades'){ entidades_init(); }
if (abaAtiva === 'financeiro'){ fin_init(); }
if (abaAtiva === 'pdv'){ pdv_init(); }
if (abaAtiva === 'configuracoes'){ config_init(); }

}




/*...... Sub-abas ....*/
function ent_alternarSubAba(subAba) {
const painelForm  = document.getElementById('ent-painel-formulario');
const painelLista = document.getElementById('ent-painel-listagem');
const btnForm = document.getElementById('ent-btn-formulario');
const btnLista =  document.getElementById('ent-btn-listagem');
const ativo   = ['bg-primary','text-white','hover:brightness-105'];
const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];

    btnForm.classList.remove(...ativo,...inativo);
    btnLista.classList.remove(...ativo,...inativo);

    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}
