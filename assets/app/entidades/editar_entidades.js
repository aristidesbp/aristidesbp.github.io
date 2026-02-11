function prepareEdit(id) {
    window.location.href = `cadastrar_entidades.html?id=${id}`;
}

async function checkEditMode() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id && document.getElementById('entidade-id')) {
        try {
            const { data: ent, error } = await window.supabaseClient
                .from('entidades')
                .select('*')
                .eq('id', id)
                .single();

            if (ent) {
                document.getElementById('entidade-id').value = ent.id;
                document.getElementById('nome_completo').value = ent.nome_completo;
                document.getElementById('tipo_entidade').value = ent.tipo_entidade;
                document.getElementById('telefone').value = ent.telefone;
                document.getElementById('email').value = ent.email;
                document.getElementById('observacoes').value = ent.observacoes;
                
                document.getElementById('btn-save').innerHTML = `<span class="material-symbols-outlined">edit</span> Atualizar Entidade`;
            }
        } catch (e) { console.error("Erro ao carregar edição", e); }
    }
}

document.addEventListener('DOMContentLoaded', checkEditMode);
