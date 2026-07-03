/**
 * model/listar_usuarios.js - Lista Entidades do Banco de Dados
 */

document.addEventListener('DOMContentLoaded', () => {
    carregarEntidades();
});

async function carregarEntidades() {
    const listaCorpo = document.getElementById('lista-usuarios-body');
    if (!listaCorpo) return;

    // Mostra um estado de carregamento
    listaCorpo.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-500 italic">Carregando entidades...</td></tr>';

    try {
        // Buscamos os dados unindo o básico do Profile com detalhes da Dados_Pessoais
        // Nota: Como as tabelas estão vinculadas por ID, faremos a busca na profiles
        const { data, error } = await window.supabaseClient
            .from('profiles')
            .select(`
                id, 
                nome_completo, 
                email, 
                role,
                dados_pessoais (
                    telefone,
                    status,
                    tipo_acesso
                )
            `)
            .order('nome_completo', { ascending: true });

        if (error) throw error;

        listaCorpo.innerHTML = ''; // Limpa a lista

        if (data.length === 0) {
            listaCorpo.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-500 italic">Nenhuma entidade encontrada.</td></tr>';
            return;
        }

        data.forEach(user => {
            const detalhes = user.dados_pessoais?.[0] || {};
            const status = detalhes.status || 'ativo';
            const telefone = detalhes.telefone || 'Sem telefone';
            const role = user.role || 'paciente';

            // Define a cor do badge de status
            const statusClass = status === 'ativo' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';

            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors';
            
            tr.innerHTML = `
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            ${(user.nome_completo || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm font-bold text-slate-800 dark:text-slate-200">${user.nome_completo || 'Sem Nome'}</span>
                            <span class="text-[11px] uppercase tracking-wider font-medium text-slate-400">${role}</span>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <div class="flex flex-col">
                        <span class="text-sm text-slate-600 dark:text-slate-400">${user.email}</span>
                        <span class="text-xs text-slate-400">${telefone}</span>
                    </div>
                </td>
                <td class="p-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">
                        ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </td>
                <td class="p-4 text-right">
                    <button onclick="editarUsuario('${user.id}')" class="p-2 text-slate-400 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onclick="deletarUsuario('${user.id}')" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </td>
            `;
            listaCorpo.appendChild(tr);
        });

    } catch (err) {
        console.error("Erro ao listar:", err);
        listaCorpo.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-red-500 italic">Erro ao carregar dados: ${err.message}</td></tr>`;
    }
}

// Redireciona para a tela de edição (aquela que criamos com o campo de busca)
function editarUsuario(userId) {
    // Você pode passar o ID via URL para a tela de dados_pessoais.html
    window.location.href = `dados_pessoais.html?id=${userId}`;
}

async function deletarUsuario(userId) {
    if (!confirm("Tem certeza que deseja excluir este usuário? Todos os dados vinculados serão apagados.")) return;

    try {
        // Como configuramos o CASCADE DELETE no SQL, apagar o profile ou o auth apaga tudo.
        // Nota: Para apagar o AUTH você precisaria de uma Edge Function, 
        // mas aqui vamos apagar o registro das tabelas públicas.
        const { error } = await window.supabaseClient
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (error) throw error;
        
        alert("Usuário removido!");
        carregarEntidades(); // Atualiza a lista
    } catch (err) {
        alert("Erro ao excluir: " + err.message);
    }
}
