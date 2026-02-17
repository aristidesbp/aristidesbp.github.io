/* carregar_entidades.js
Elemento de formulario para selecionar usuario na tabela entidades

 EXEMPLO DE COMO USAR NO HTML:
  <div><label>Entidade</label><select id="entidade_id"><option value="">Selecione...</option></select></div>
  <script src="js/carregar_entidades.js"></script>

*/
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
