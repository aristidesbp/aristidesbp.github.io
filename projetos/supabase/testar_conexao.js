const { createClient } = require('@supabase/supabase-js');

// Substitua pelas suas credenciais do projeto
const supabaseUrl = 'https://bpdjbffsfxvrdxxwxzsz.supabase.co/rest/v1/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZGpiZmZzZnh2cmR4eHd4enN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NTMzNTYsImV4cCI6MjA5MzEyOTM1Nn0.Q5HNWQBSJk8Bpd4dq7cx5HHJtVHkxza9pbQV3qX_rsM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Iniciando teste de conexão com Supabase...');

  try {
    // Tentativa de buscar um dado simples ou apenas verificar o estado
    // Substitua 'sua_tabela' por uma tabela que exista no seu banco
    const { data, error, status } = await supabase
      .from('sua_tabela') 
      .select('*')
      .limit(1);

    if (error) {
      // O código 404 pode indicar que a tabela não existe, 
      // mas a conexão com o host foi estabelecida.
      if (error.code === 'PGRST116' || error.message.includes('not found')) {
        console.warn('⚠️ Conectado ao Supabase, mas a tabela especificada não foi encontrada.');
      } else {
        throw error;
      }
    }

    if (status >= 200 && status < 300) {
      console.log('✅ Conexão estabelecida com sucesso!');
      console.log(`Status HTTP: ${status}`);
      if (data) console.log('Dados recebidos:', data);
    }

  } catch (err) {
    console.error('❌ Erro ao conectar ao Supabase:');
    console.error(`Mensagem: ${err.message}`);
    console.error(`Dica: Verifique se a URL e a API Key estão corretas e se as políticas de RLS permitem o acesso.`);
  }
}

testConnection();
