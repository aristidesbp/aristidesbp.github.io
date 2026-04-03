/**

* ARQUIVO: src/model/model_entidades.js

*/

import { supabase } from './supabase_config.js';

// Gera hash SHA-256 do CPF usando a Web Crypto API nativa

export async function hashCPF(cpf) {

const cpfLimpo = cpf.replace(/\D/g, '');

const salt = "ERP-PSC-2025-SALT"; // Não altere em produção!

const encoder = new TextEncoder();

const dados = encoder.encode(salt + cpfLimpo);

const hashBuffer = await crypto.subtle.digest('SHA-256', dados);

const hashArray = Array.from(new Uint8Array(hashBuffer));

return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');

}

// Valida o formato do CPF com o algoritmo oficial

export function validarCPF(cpf) {

const c = cpf.replace(/\D/g, '');

if (c.length !== 11) return false;

if (/^(\d)\1+$/.test(c)) return false; // Ex: 111.111.111-11

let soma = 0;

for (let i = 0; i < 9; i++) soma += parseInt(c[i]) * (10 - i);

let r = (soma * 10) % 11;

if (r === 10 || r === 11) r = 0;

if (r !== parseInt(c[9])) return false;
  
soma = 0;
for (let i = 0; i < 10; i++) soma += parseInt(c[i]) * (11 - i);
r = (soma * 10) % 11;
if (r === 10 || r === 11) r = 0;
return r === parseInt(c[10]);
}
// Cria nova entidade com CPF hasheado
export async function criarEntidade(dados) {
const { data: { user } } = await supabase.auth.getUser();
const cpf_hash = dados.cpf ? await hashCPF(dados.cpf) : null;
const { data, error } = await supabase
.from('entidades')
.insert({
...dados,
cpf_hash,
cpf: undefined, // Garante que CPF em texto não seja salvo
profissional_id: user.id,
})
.select().single();
return { data, error };
}
