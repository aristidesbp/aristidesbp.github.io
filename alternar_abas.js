// ── Navegação entre abas ──────────────────────────────────────────────
// FIX BUG 2: agora dispara est_init() ao entrar no estoque

function alternarAba(abaAtiva) {
    const selectAba = document.getElementById('select-aba');
    if (selectAba) selectAba.value = abaAtiva;

    document.querySelectorAll('[id^="aba-"]').forEach(painel => {
        painel.classList.toggle('hidden', painel.id !== `aba-${abaAtiva}`);
    });

    if (abaAtiva === 'estoque')    { est_init(); }
    if (abaAtiva === 'entidades')  { loadDashboard(); loadEntidades(); }
    if (abaAtiva === 'financeiro') { fin_init(); }
    if (abaAtiva === 'pdv')        { pdv_init(); }
    // Se precisar de alguma ação ao abrir configurações, adicione aqui.
}




// ── FIX BUG 1: Sub-abas de Entidades (igual ao estoque) ──────────────
function ent_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('ent-painel-formulario');
    const painelLista = document.getElementById('ent-painel-listagem');
    const btnForm     = document.getElementById('ent-btn-formulario');
    const btnLista    = document.getElementById('ent-btn-listagem');

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
