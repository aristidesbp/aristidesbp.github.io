async function criarContaAuth(email, senha, nome) {
    const senhaPadrao = senha || "Mudar123@"; 

    const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: senhaPadrao,
        options: {
            data: { nome_completo: nome }
        }
    });

    if (error) throw new Error("Erro Auth: " + error.message);
    return data.user.id; 
}
