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
