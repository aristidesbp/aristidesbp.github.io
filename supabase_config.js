// Inicialização do Supabase
const supabaseUrl = 'https://derryyqglfnfxjzernfc.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcnJ5eXFnbGZuZnhqemVybmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDQ2MzMsImV4cCI6MjEwMTQ4MDYzM30.x8Jd49NeiuYqm9AReTph-y3KIGN6O8z0CejMhDu6Gpw';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
