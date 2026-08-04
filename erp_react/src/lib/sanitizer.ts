/**
 * HTML Sanitizer & Security Utilities
 * Prevents XSS (Cross-Site Scripting) attack vectors when rendering user-submitted text
 * or product names in printable thermal receipts, tables, or PDF exports.
 */

export function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;');
}

export function sanitizeText(input: string | null | undefined): string {
  if (!input) return '';
  // Remove script tags and inline event attributes
  return escapeHtml(input.trim());
}

export function formatCurrency(value: number): string {
  const safeNum = isNaN(value) ? 0 : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(safeNum);
}

export function formatDateBR(dateString: string | null | undefined): string {
  if (!dateString) return '--/--/----';
  try {
    const [year, month, day] = dateString.split('T')[0].split('-');
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
}

export function formatDateTimeBR(dateIsoString: string | null | undefined): string {
  if (!dateIsoString) return '--/--/---- --:--';
  try {
    const date = new Date(dateIsoString);
    if (isNaN(date.getTime())) return dateIsoString;
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return dateIsoString;
  }
}

export function formatTimestampFilename(dateInput?: string | Date | null): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}`;
}

export function formatSiteOrderCode(id: string | null | undefined): string {
  if (!id) return 'SITE-000000';
  if (id.startsWith('SITE-')) return id.toUpperCase();
  const clean = id.replace(/[^a-zA-Z0-9]/g, '');
  const code = clean.length > 6 ? clean.slice(-6).toUpperCase() : clean.toUpperCase();
  return `SITE-${code}`;
}

