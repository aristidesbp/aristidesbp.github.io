// ── Sidebar Mobile ────────────────────────────────────────────────────
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const isVisible = sidebar.classList.contains('translate-x-0');
    if (isVisible) {
        sidebar.classList.replace('translate-x-0','-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.replace('-translate-x-full','translate-x-0');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}
