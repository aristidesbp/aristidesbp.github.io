
        // --- FUNÇÕES DO SCANNER ---
        function startScanner() {
            const readerDiv = document.getElementById('reader');
            const stopBtn = document.getElementById('btn-stop-scanner');
            readerDiv.style.display = 'block';
            stopBtn.style.display = 'block';
            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('codigo_de_barras').value = decodedText;
                stopScanner();
            }).catch(err => console.error(err));
        }

        function stopScanner() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    document.getElementById('reader').style.display = 'none';
                    document.getElementById('btn-stop-scanner').style.display = 'none';
                });
            }
        }

        // --- ÁUDIO ---
        async function toggleGravação() {
            const btn = document.getElementById('btn-audio');
            const preview = document.getElementById('audio-preview');
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(recordedAudioBlob);
                    preview.style.display = 'block';
                };
                mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
            }
        }

        // --- CRUD ---
        async function loadtarefas() {
            const { data, error } = await _supabase.from('tarefas').select('*').order('created_at', { ascending: false });
            if (error) { console.error(error); return; }
            const tbody = document.getElementById('exercises-list');
            tbody.innerHTML = data.map(e => {
                let prazo = e.data_prazo ? new Date(e.data_prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
                return `
                <tr class="border-t">
                    <td class="p-4">
                        <span class="font-bold text-slate-800">${e.titulo}</span><br>
                        <span class="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">${e.categoria || 'Geral'}</span>
                        <span class="tag tag-data"><i class="far fa-calendar-alt"></i> ${prazo}</span>
                    </td>
                    <td class="p-4 font-mono text-sm text-slate-400">${e.codigo_de_barras || '-'}</td>
                    <td class="p-4"><span class="tag tag-${e.status_exercicio}">${e.status_exercicio}</span></td>
                    <td class="p-4 text-center">
                        <button class="text-blue-500 mr-4" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500" onclick="deleteExercicio('${e.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`}).join('');
        }

        async function handleSave() {
            const btn = document.getElementById('btn-save');
            btn.disabled = true; btn.innerText = "Salvando...";
            try {
                const id = document.getElementById('edit-id').value;
                const { data: { user } } = await _supabase.auth.getUser();
                const payload = {
                    titulo: document.getElementById('titulo').value,
                    descricao: document.getElementById('descricao').value,
                    categoria: document.getElementById('categoria').value,
                    codigo_de_barras: document.getElementById('codigo_de_barras').value,
                    data_prazo: document.getElementById('data_prazo').value || null,
                    status_exercicio: document.getElementById('status_exercicio').value,
                    observacoes: document.getElementById('observacoes').value,
                    user_id: user.id
                };
                
      
                
                
                // Storage handling (simplificado)
                const inputFoto = document.getElementById('foto_resolucao');
                if (inputFoto.files[0]) {
                    const fileName = `res_${Date.now()}.jpg`;
                    await _supabase.storage.from('resolucoes').upload(`public/${fileName}`, inputFoto.files[0]);
                    payload.foto_url = _supabase.storage.from('resolucoes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                const { error } = id ? await _supabase.from('tarefas').update(payload).eq('id', id) : await _supabase.from('tarefas').insert([payload]);
                if (error) throw error;
                resetForm(); loadtarefas();
            } catch (e) { alert(e.message); }
            finally { btn.disabled = false; btn.innerText = "Salvar Registro"; }
        }


        

        async function editFull(id) {
            const { data } = await _supabase.from('tarefas').select('*').eq('id', id).single();
            if (data) {
                document.getElementById('edit-id').value = data.id;
                document.getElementById('titulo').value = data.titulo;
                document.getElementById('descricao').value = data.descricao;
                document.getElementById('categoria').value = data.categoria || '';
                document.getElementById('codigo_de_barras').value = data.codigo_de_barras || '';
                document.getElementById('data_prazo').value = data.data_prazo || '';
                document.getElementById('status_exercicio').value = data.status_exercicio;
                document.getElementById('observacoes').value = data.observacoes || '';
                document.getElementById('form-title').innerText = "Editando Atividade";
                document.getElementById('btn-cancel').style.display = "block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        async function deleteExercicio(id) {
            if (confirm("Excluir?")) { await _supabase.from('tarefas').delete().eq('id', id); loadtarefas(); }
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
            document.getElementById('status_exercicio').value = 'pendente';
            document.getElementById('form-title').innerText = "Nova Atividade";
            document.getElementById('btn-cancel').style.display = "none";
            recordedAudioBlob = null;
            document.getElementById('audio-preview').style.display = 'none';
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#exercises-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }
