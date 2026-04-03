// ARQUIVO: supabase/functions/checkout/index.ts
// Deploy: supabase functions deploy checkout
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
const corsHeaders = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'authorization, content-type',
};
serve(async (req) => {
if (req.method === 'OPTIONS')
return new Response('ok', { headers: corsHeaders });
const { financeiro_id, paciente_nome, valor, descricao }
= await req.json();
// Chave secreta lida do servidor — NUNCA do frontend
const MP_TOKEN = Deno.env.get('MP_ACCESS_TOKEN');
const mpRes = await fetch(
'https://api.mercadopago.com/checkout/preferences',
{
method: 'POST',
headers: { 'Authorization': `Bearer ${MP_TOKEN}`,
'Content-Type': 'application/json' },
body: JSON.stringify({
items: [{ title: descricao, quantity: 1,
unit_price: Number(valor),
currency_id: 'BRL' }],
payer: { name: paciente_nome },
auto_return: 'approved',
external_reference: financeiro_id,
}),
}
);
const pref = await mpRes.json();
return new Response(
JSON.stringify({ link: pref.init_point }),
{ headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
);
});
