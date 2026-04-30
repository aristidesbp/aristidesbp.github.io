/* tarefas_model.js */
const TarefasModel = {
    async fetchAll() {
        const { data, error } = await _supabase.from('tarefas').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async save(payload, id = null) {
        if (id) {
            return await _supabase.from('tarefas').update(payload).eq('id', id);
        }
        return await _supabase.from('tarefas').insert([payload]);
    },

    async delete(id) {
        return await _supabase.from('tarefas').delete().eq('id', id);
    },

    async getById(id) {
        const { data, error } = await _supabase.from('tarefas').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
    },

    async uploadFile(bucket, path, file) {
        const { data, error } = await _supabase.storage.from(bucket).upload(path, file);
        if (error) throw error;
        return _supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    }
};
