
/**
 * model/dados_pessoais.js - Busca Dinâmica e Gestão de Perfis
 */

// 1. Busca dinâmica de e-mails no banco de dados
async function buscarUsuariosEmail(termo) {
    const lista = document.getElementById('lista-busca');
    
    // Só pesquisa se tiver pelo menos 3 caracteres
    if (termo.length < 3) {
        lista.innerHTML = '';
        lista.classList.add('hidden');
        return;
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('profiles')
            .select('id, nome_completo, email')
            .ilike('email', `%${termo}%`) 
            .limit(6);

        if (error) throw error;

        lista.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(user => {
                const item = document.createElement('div');
                item.className = 'p-4 hover:bg-primary/5 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-none flex flex-col';
                item.innerHTML = `
                    <span class="text-sm font-bold text-slate-800 dark:text-slate-200">${user.nome_completo || 'Utilizador sem nome'}</span>
                    <span class="text-xs text-slate-500">${user.email}</span>
                `;
                item.onclick = () => selecionarUsuario(user);
                lista.appendChild(item);
            });
            lista.classList.remove('hidden');
        } else {
            lista.innerHTML = '<div class="p-4 text-xs text-slate-500 italic">Nenhum e-mail encontrado...</div>';
            lista.classList.remove('hidden');
        }
    } catch (err) {
        console.error("Erro na busca:", err);
    }
}

// 2. Ação ao selecionar um utilizador da lista de sugestões
async function selecionarUsuario(user) {
    document.getElementById('busca-email').value = user.email;
    document.getElementById('lista-busca').classList.add('hidden');
    
    // Ativa o formulário (estava bloqueado)
    const form = document.getElementById('form-dados');
    form.classList.remove('opacity-50', 'pointer-events-none');

    // Carrega os dados
    await carregarDadosUsuario(user.id);
}

// 3. Carregar dados das tabelas Profiles e Dados_Pessoais
async function carregarDadosUsuario(userId) {
    try {
        // Tenta buscar dados complementares
        const { data: dp, error: errDp } = await window.supabaseClient
            .from('dados_pessoais')
            .select('*')
            .eq('user_id', userId)
            .single();

        // Busca dados do profile (garante nome e email)
        const { data: prof } = await window.supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        const dadosFinais = dp || prof;

        // Preencher IDs e Campos Fixos
        document.getElementById('user_id').value = userId;
        document.getElementById('nome_completo').value = prof.nome_completo || '';
        document.getElementById('email').value = prof.email || '';

        // Preencher campos editáveis
        const campos = ['cpf', 'data_nascimento', 'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado', 'tipo_acesso'];
        campos.forEach(campo => {
            const el = document.getElementById(campo);
            if (el) el.value = dadosFinais[campo] || (campo === 'tipo_acesso' ? 'paciente' : '');
        });

    } catch (err) {
        console.error("Erro ao carregar dados:", err);
    }
}

// 4. Salvar Alterações
async function handleSaveDadosPessoais() {
    const userId = document.getElementById('user_id').value;
    if (!userId) return alert("Selecione um utilizador primeiro!");

    const getVal = (id) => document.getElementById(id)?.value || null;

    const payload = {
        user_id: userId,
        nome_completo: getVal('nome_completo'),
        email: getVal('email'),
        cpf: getVal('cpf'),
        data_nascimento: getVal('data_nascimento'),
        telefone: getVal('telefone'),
        cep: getVal('cep'),
        logradouro: getVal('logradouro'),
        numero: getVal('numero'),
        bairro: getVal('bairro'),
        cidade: getVal('cidade'),
        estado: getVal('estado'),
        tipo_acesso: getVal('tipo_acesso'),
        status: 'ativo'
    };

    try {
        // Salva/Atualiza na dados_pessoais
        const { error } = await window.supabaseClient
            .from('dados_pessoais')
            .upsert(payload, { onConflict: 'user_id' });

        if (error) throw error;

        // Sincroniza o role na tabela profiles
        await window.supabaseClient
            .from('profiles')
            .update({ role: payload.tipo_acesso })
            .eq('id', userId);

        alert("Dados atualizados com sucesso!");
    } catch (err) {
        alert("Erro ao guardar: " + err.message);
    }
}

// Auxiliares
function limparBusca() {
    document.getElementById('busca-email').value = '';
    document.getElementById('lista-busca').classList.add('hidden');
    document.getElementById('form-dados').reset();
    document.getElementById('form-dados').classList.add('opacity-50', 'pointer-events-none');
}

async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const d = await res.json();
        if (!d.erro) {
            document.getElementById('logradouro').value = d.logradouro;
            document.getElementById('bairro').value = d.bairro;
            document.getElementById('cidade').value = d.localidade;
            document.getElementById('estado').value = d.uf;
        }
    }
}

// Fechar lista ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('#busca-email')) {
        document.getElementById('lista-busca').classList.add('hidden');
    }
});
