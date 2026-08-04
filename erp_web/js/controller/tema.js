// ── Dark Mode ─────────────────────────────────────────────────────────
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    document.getElementById('dark-icon').classList.toggle('hidden', isDark);
    document.getElementById('light-icon').classList.toggle('hidden', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
if (localStorage.getItem('theme')==='dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('dark-icon').classList.add('hidden');
    document.getElementById('light-icon').classList.remove('hidden');
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('.material-symbols-outlined');
    if (input.type === 'password') { input.type = 'text'; icon.innerText = 'visibility_off'; }
    else { input.type = 'password'; icon.innerText = 'visibility'; }
}
