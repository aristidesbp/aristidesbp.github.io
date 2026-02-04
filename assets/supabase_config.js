// Configuração central do Supabase para o ERP ABP
const supabaseUrl = 'https://bhppnlcgcbkicsqtrdiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJocHBubGNnY2JraWNzcXRyZGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDA3NzIsImV4cCI6MjA4NTcxNjc3Mn0.7byyWtVi_-WoxAzV33AycWQpd_gHkBei5rTXRMj6Ib8';

// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;
