/**

* ARQUIVO: src/model/model_audio.js

* FUNÇÃO: Grava áudio do microfone e envia ao Supabase Storage.

*/

import { supabase } from './supabase_config.js';

let mediaRecorder;

let chunks = [];

// Inicia a gravação pelo microfone

export async function iniciarGravacao() {

// Solicita acesso ao microfone do dispositivo

const stream = await navigator.mediaDevices.getUserMedia(

{ audio: true }

);

mediaRecorder = new MediaRecorder(stream);

chunks = [];

// Coleta os pedaços de áudio conforme chegam

mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

mediaRecorder.start();

}

// Para a gravação e retorna o arquivo de áudio

export function pararGravacao() {

return new Promise((resolve) => {
  mediaRecorder.onstop = () => {

const blob = new Blob(chunks, { type: 'audio/webm' });

resolve(blob);

};

mediaRecorder.stop();

// Para todas as faixas para liberar o microfone

mediaRecorder.stream.getTracks()

.forEach(t => t.stop());

});

}

// Envia o áudio para o Supabase Storage

export async function enviarAudio(blob, registroId) {

const { data: { user } } = await supabase.auth.getUser();

const path = `audios/${user.id}/${registroId}_${Date.now()}.webm`;

// Upload do arquivo para o bucket "treinos"

const { error: uploadError } = await supabase.storage

.from('treinos')

.upload(path, blob, {

contentType: 'audio/webm',

upsert: false

});

if (uploadError) return { error: uploadError };

// Registra o caminho do áudio na tabela de mídias

const { data, error } = await supabase

.from('midias_registro')

.insert({ registro_id: registroId, tipo: 'audio',

storage_path: path })

.select().single();

return { data, error };

}


