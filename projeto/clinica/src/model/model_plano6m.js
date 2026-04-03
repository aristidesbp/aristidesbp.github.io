/**

* ARQUIVO: src/model/model_plano6m.js

*/

import { supabase } from './supabase_config.js';

// Habilidades padrão pré-carregadas (do documento clínico real)

export const HABILIDADES_PADRAO = [

{ nome: 'Leitura fluente em bastão',

criterio: 'Leitura contínua, sem silabação, com ritmo adequado' },

{ nome: 'Leitura fluente em cursiva',

criterio: 'Leitura contínua, sem silabação, com ritmo adequado' },

{ nome: 'Leitura fluente em imprensa',

criterio: 'Leitura contínua, sem silabação, com ritmo adequado' },

{ nome: 'Escrita em bastão',

criterio: 'Escrita legível, automatizada, sem resistência' },

{ nome: 'Escrita cursiva maiúscula e minúscula',

criterio: 'Escrita legível, automatizada, sem resistência' },

{ nome: 'Ortografia',

criterio: 'Sem trocas, omissões ou erros recorrentes' },

{ nome: 'Interpretação de texto',

criterio: 'Responde perguntas literais e inferenciais com autonomia' },

{ nome: 'Registro matemático',

criterio: 'Resolve com passo a passo registrado corretamente' },

{ nome: 'Meses do ano',

criterio: 'Nomeia e sequencia corretamente sem apoio' },

{ nome: 'Memória e atenção',criterio: 'Mantém foco em tarefa por 15-20 min com consistência' },
{ nome: 'Autonomia nos estudos',
criterio: 'Realiza rotina de estudo sem dependência excessiva' },
];
// Cria um novo Plano 6M com as habilidades padrão
export async function criarPlano6M({
paciente_id, data_inicio, data_termino,
observacoes, habilidades = HABILIDADES_PADRAO
}) {
const { data: { user } } = await supabase.auth.getUser();
// 1. Cria o plano
const { data: plano, error } = await supabase
.from('planos_6m')
.insert({
paciente_id, data_inicio, data_termino,
observacoes, profissional_id: user.id
})
.select().single();
if (error) return { error };
// 2. Insere as habilidades vinculadas ao plano
const itens = habilidades.map((h, i) => ({
plano_id: plano.id,
nome: h.nome,
criterio: h.criterio,
ordem: i
}));
const { error: errHab } = await supabase
.from('habilidades_plano')
.insert(itens);
return { data: plano, error: errHab };
}
