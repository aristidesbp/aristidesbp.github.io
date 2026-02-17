// carrega_rentidades.js
async function carregarEntidades() {
    const { data, error } = await _supabase.from('entidades').select('id, nome_completo');
    if (!error) {
        const select = document.getElementById('entidade_id');
        data.forEach(ent => {
            const opt = document.createElement('option');
            opt.value = ent.id;
            opt.textContent = ent.nome_completo;
            select.appendChild(opt);
        });
    }
}
