
        // Carregar dados na tabela
        async function loadEntities() {
            const { data, error } = await _supabase.from('entidades').select('*').order('nome_completo');
            if (error) return console.error(error);
            renderTable(data);
        }

        // Renderizar Tabela
        function renderTable(data) {
            const tbody = document.getElementById('entities-list');
            tbody.innerHTML = data.map(e => {
                const avatar = e.foto_url ? e.foto_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                
                return `
                <tr>
                    <td><img src="${avatar}" class="avatar-img" alt="Foto"></td>
                    <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
                    <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
                    <td><span class="tag">${e.tipo_acesso}</span> | ${e.status_entidade}</td>
                    <td>
                        <button class="text-blue-500 mr-2" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 mr-2" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                        <button class="text-green-500" onclick="window.open('https://wa.me/55${e.telefone?.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>
                    </td>
                </tr>
                `;
            }).join('');
        }

        // Salvar (Inserir ou Atualizar) com Upload de Foto
        async function handleSave() {
            const btnSave = document.getElementById('btn-save');
            btnSave.disabled = true;
            btnSave.innerText = "Salvando aguarde...";

            try {
                const id = document.getElementById('edit-id').value;
                let fotoUrl = null;
                const inputFoto = document.getElementById('foto');

                // 1. Upload de Foto
                if (inputFoto.files && inputFoto.files.length > 0) {
                    const file = inputFoto.files[0];
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
                    
                    const { data: uploadData, error: uploadError } = await _supabase.storage
                        .from('avatares')
                        .upload(`public/${fileName}`, file);

                    if (uploadError) throw uploadError;

                    const { data: publicUrlData } = _supabase.storage
                        .from('avatares')
                        .getPublicUrl(`public/${fileName}`);

                    fotoUrl = publicUrlData.publicUrl;
                }

                // 2. Coletar campos
                const campos = [
                    'nome_completo', 'cpf', 'data_nascimento', 'email', 'telefone',
                    'cep', 'logradouro', 'numero', 'bairro', 'cidade',
                    'estado', 'avaliacao', 'tipo_acesso', 'tipo_entidade', 'status_entidade'
                ];

                const payload = {};
                campos.forEach(c => {
                    const el = document.getElementById(c);
                    if (el) payload[c] = el.value === "" && el.type === "date" ? null : el.value;
                });
                
                if (fotoUrl) payload.foto_url = fotoUrl;
                
                const { data: userData } = await _supabase.auth.getUser();
                if(userData && userData.user) {
                    payload.user_id = userData.user.id;
                }

                // 3. Salvar no Banco
                const { error } = id 
                    ? await _supabase.from('entidades').update(payload).eq('id', id)
                    : await _supabase.from('entidades').insert([payload]);

                if (error) throw error;
                
                alert("Sucesso!");
                resetForm();
                loadEntities();

            } catch (error) {
                alert("Erro: " + error.message);
                console.error(error);
            } finally {
                btnSave.disabled = false;
                btnSave.innerText = "Salvar Entidade";
            }
        }

        // Editar
        async function editFull(id) {
            const { data } = await _supabase.from('entidades').select('*').eq('id', id).single();
            if (!data) return;

            Object.keys(data).forEach(key => {
                const el = document.getElementById(key);
                if (el && key !== 'foto') el.value = data[key] || '';
            });

            document.getElementById('edit-id').value = data.id;
            document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
            document.getElementById('btn-save').innerText = "Atualizar";
            document.getElementById('btn-cancel').style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Excluir
        async function deleteEntity(id) {
            if (!confirm("Excluir permanentemente?")) return;
            await _supabase.from('entidades').delete().eq('id', id);
            loadEntities();
        }

        // Reset
        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
            document.getElementById('btn-save').innerText = "Salvar Entidade";
            document.getElementById('btn-cancel').style.display = "none";
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = el.id === 'avaliacao' ? '5' : '');
            document.getElementById('foto').value = ''; 
        }

        // Busca CEP
        async function buscaCEP() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            }
        }

        // Filtro Tabela
        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#entities-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }

        // Visibilidade Senha
        function togglePasswordVisibility() {
            const input = document.getElementById('senha_acesso');
            const icon = document.getElementById('togglePassword');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    
