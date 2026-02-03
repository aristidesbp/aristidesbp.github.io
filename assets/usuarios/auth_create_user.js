async function criarContaAuth(email, senha, nome) {
    // Opcional: Gerar uma senha padrão se não houver campo de senha
    const senhaPadrao = senha || "Mudar123@"; 

    const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: senhaPadrao,
        options: {
            data: {
                nome_completo: nome
            }
        }
    });

    if (error) {
        console.error("Erro no Auth:", error.message);
        throw new Error("Erro ao criar credenciais: " + error.message);
    }

    return data.user.id; // Retorna o UUID gerado pelo Supabase
}
