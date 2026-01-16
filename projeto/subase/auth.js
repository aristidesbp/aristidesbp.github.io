const supabaseUrl = 'https://jrxntfnaraicsxeppoms.supabase.co';
const supabaseKey = 'sb_publishable_JJ1rPCDGhfECEGBkyJWZrQ_U7HNrZCB';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}
