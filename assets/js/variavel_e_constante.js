// Configuração do Supabase      
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';   
const supabaseUrl = 'https://mvxwxpwgoukhinqfuppz.supabase.co';    

// Configuração do Supabase      
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let entidadesCache = [];
        let html5QrCode = null;

let arquivosLote = []; // Variável global para guardar os vários arquivos
