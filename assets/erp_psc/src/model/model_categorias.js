/**
 * ============================================================
 * MODEL - CATEGORIAS
 * Projeto: ERP-PSC
 * Responsabilidade: Acesso ao banco (Supabase)
 * Segurança: RLS + auth.uid()
 * ============================================================
 */

/**
 * Obtém o ID do usuário autenticado
 */
async function getUsuarioLogadoId() {
    const { data, error } = await window.supabaseClient.auth.getUser();

    if (error || !data.user) {
        throw new Error('Usuário não autenticado');
    }

    return data.user.id;
}

/**
 * INSERIR CATEGORIA
 */
async function inserirCategoria(nome, descricao) {
    const profissionalId = await getUsuarioLogadoId();

    const { error } = await window.supabaseClient
        .from('categorias')
        .insert([
            {
                nome: nome,
                descricao: descricao,
                profissional_responsavel_id: profissionalId
            }
        ]);

    if (error) {
        console.error('Erro ao inserir categoria:', error.message);
        throw error;
    }
}

/**
 * LISTAR CATEGORIAS (somente do dono)
 */
async function listarCategorias() {
    const { data, error } = await window.supabaseClient
        .from('categorias')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao listar categorias:', error.message);
        throw error;
    }

    return data;
}

/**
 * BUSCAR CATEGORIA POR ID
 */
async function buscarCategoriaPorId(id) {
    const { data, error } = await window.supabaseClient
        .from('categorias')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar categoria:', error.message);
        throw error;
    }

    return data;
}

/**
 * ATUALIZAR CATEGORIA
 */
async function atualizarCategoria(id, nome, descricao) {
    const { error } = await window.supabaseClient
        .from('categorias')
        .update({
            nome: nome,
            descricao: descricao,
            updated_at: new Date()
        })
        .eq('id', id);

    if (error) {
        console.error('Erro ao atualizar categoria:', error.message);
        throw error;
    }
}

/**
 * EXCLUIR CATEGORIA
 */
async function excluirCategoria(id) {
    const { error } = await window.supabaseClient
        .from('categorias')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao excluir categoria:', error.message);
        throw error;
    }
}
