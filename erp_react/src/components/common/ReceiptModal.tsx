import React, { useRef } from 'react';
import { Sale, StoreConfig } from '../../types';
import { formatCurrency, formatDateTimeBR, escapeHtml, formatSiteOrderCode, formatTimestampFilename } from '../../lib/sanitizer';
import { Printer, X, CheckCircle, ShieldCheck, Download } from 'lucide-react';

interface ReceiptModalProps {
  sale: Sale | null;
  storeConfig: StoreConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  sale,
  storeConfig,
  isOpen,
  onClose,
}) => {
  const printIframeRef = useRef<HTMLIFrameElement | null>(null);

  if (!isOpen || !sale) return null;

  const siteOrderCode = formatSiteOrderCode(sale.id);
  const timestampStr = formatTimestampFilename(sale.created_at);
  const storeFilenameClean = (storeConfig.store_name || 'Supermercado_ABP').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Comprovante_${storeFilenameClean}_${siteOrderCode}_${timestampStr}`;

  const sanitizedStoreName = escapeHtml(storeConfig.store_name);
  const sanitizedCnpj = escapeHtml(storeConfig.cnpj);
  const sanitizedAddress = escapeHtml(storeConfig.address);
  const sanitizedPhone = escapeHtml(storeConfig.phone);
  const sanitizedFooter = escapeHtml(storeConfig.receipt_footer);
  const sanitizedCustomerName = escapeHtml(sale.entidade_nome || 'Consumidor Final');

  const downloadReceiptText = () => {
    const itemsText = (sale.itens || [])
      .map(
        (it) =>
          `  - ${it.produto_nome} x${it.quantidade} (${formatCurrency(it.preco_unitario)}) = ${formatCurrency(it.subtotal)}`
      )
      .join('\n');

    const content = `================================================
${storeConfig.store_name.toUpperCase()}
CNPJ: ${storeConfig.cnpj}
ENDEREÇO: ${storeConfig.address}
TEL: ${storeConfig.phone}
================================================
COMPROVANTE DE VENDA - CUPOM NÃO FISCAL
CÓDIGO: ${siteOrderCode}
DATA E HORA: ${formatDateTimeBR(sale.created_at)}
CLIENTE: ${sale.entidade_nome || 'Consumidor Final'}
FORMA DE PAGAMENTO: ${sale.forma_pagamento}
================================================
ITENS VENDIDOS:
${itemsText}
================================================
SUBTOTAL: ${formatCurrency(sale.valor_total)}
${sale.desconto > 0 ? `DESCONTO: - ${formatCurrency(sale.desconto)}\n` : ''}TOTAL PAGO: ${formatCurrency(sale.valor_liquido)}
================================================
${storeConfig.receipt_footer}
================================================
Arquivo gerado em: ${new Date().toLocaleString('pt-BR')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const printReceipt = () => {
    if (!printIframeRef.current) return;

    const iframe = printIframeRef.current;
    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Build thermal receipt HTML safely with escaped strings
    const itemsHtml = (sale.itens || [])
      .map(
        (item) => `
        <tr>
          <td style="padding: 4px 0;">${escapeHtml(item.produto_nome)}</td>
          <td style="text-align: center; padding: 4px 0;">${item.quantidade} ${escapeHtml(item.unidade || 'UN')}</td>
          <td style="text-align: right; padding: 4px 0;">${formatCurrency(item.preco_unitario)}</td>
          <td style="text-align: right; padding: 4px 0;">${formatCurrency(item.subtotal)}</td>
        </tr>
      `
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              width: 280px;
              margin: 0 auto;
              padding: 10px;
              color: #000;
              font-size: 11px;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .bold { font-weight: bold; }
            .divider { border-bottom: 1px dashed #000; margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th { text-align: left; border-bottom: 1px solid #000; padding-bottom: 4px; }
          </style>
        </head>
        <body>
          <div class="text-center bold" style="font-size: 14px;">${sanitizedStoreName}</div>
          <div class="text-center">${sanitizedCnpj}</div>
          <div class="text-center">${sanitizedAddress}</div>
          <div class="text-center">Tel: ${sanitizedPhone}</div>
          
          <div class="divider"></div>
          
          <div><strong>CUPOM NÃO FISCAL</strong></div>
          <div>CÓDIGO: <strong>${escapeHtml(siteOrderCode)}</strong></div>
          <div>Data: ${formatDateTimeBR(sale.created_at)}</div>
          <div>Cliente: ${sanitizedCustomerName}</div>
          <div>Pagamento: ${escapeHtml(sale.forma_pagamento)}</div>

          <div class="divider"></div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align:center;">Qtd</th>
                <th style="text-align:right;">Unit</th>
                <th style="text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="divider"></div>

          <table style="font-size: 12px;">
            <tr>
              <td>Subtotal:</td>
              <td class="text-right">${formatCurrency(sale.valor_total)}</td>
            </tr>
            ${
              sale.desconto > 0
                ? `<tr><td>Desconto:</td><td class="text-right">- ${formatCurrency(sale.desconto)}</td></tr>`
                : ''
            }
            <tr class="bold" style="font-size: 14px;">
              <td>TOTAL:</td>
              <td class="text-right">${formatCurrency(sale.valor_liquido)}</td>
            </tr>
          </table>

          <div class="divider"></div>

          <div class="text-center" style="margin-top: 10px; font-size: 10px;">
            ${sanitizedFooter}
          </div>
        </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Comprovante de Venda</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {siteOrderCode} • {formatDateTimeBR(sale.created_at)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Ticket Preview */}
        <div className="flex-1 overflow-y-auto my-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed shadow-inner">
          <div className="text-center font-bold text-sm text-emerald-600 dark:text-emerald-400">
            {storeConfig.store_name}
          </div>
          <div className="text-center text-[10px] text-slate-400">{storeConfig.cnpj}</div>
          <div className="text-center text-[10px] text-slate-400">{storeConfig.address}</div>
          <div className="text-center text-[10px] text-slate-400">Tel: {storeConfig.phone}</div>

          <div className="border-b border-dashed border-slate-300 dark:border-slate-700 my-3"></div>

          <div className="flex justify-between">
            <span className="text-slate-500">CÓDIGO:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{siteOrderCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Cliente:</span>
            <span className="font-bold">{sale.entidade_nome}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Pagamento:</span>
            <span className="font-bold">{sale.forma_pagamento}</span>
          </div>

          <div className="border-b border-dashed border-slate-300 dark:border-slate-700 my-3"></div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                <th className="py-1">ITEM</th>
                <th className="py-1 text-center">QTD</th>
                <th className="py-1 text-right">UNIT</th>
                <th className="py-1 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {(sale.itens || []).map((item, idx) => (
                <tr key={idx}>
                  <td className="py-1.5 font-sans font-medium">{item.produto_nome}</td>
                  <td className="py-1.5 text-center">{item.quantidade}</td>
                  <td className="py-1.5 text-right">{formatCurrency(item.preco_unitario)}</td>
                  <td className="py-1.5 text-right font-bold">{formatCurrency(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-b border-dashed border-slate-300 dark:border-slate-700 my-3"></div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span>{formatCurrency(sale.valor_total)}</span>
            </div>
            {sale.desconto > 0 && (
              <div className="flex justify-between text-red-500">
                <span>Desconto:</span>
                <span>- {formatCurrency(sale.desconto)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm text-emerald-600 dark:text-emerald-400 pt-1 border-t border-slate-200 dark:border-slate-800">
              <span>TOTAL PAGO:</span>
              <span>{formatCurrency(sale.valor_liquido)}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-slate-300 dark:border-slate-700 my-3"></div>

          <div className="text-center text-[11px] text-slate-500 mt-2 font-sans italic">
            "{storeConfig.receipt_footer}"
          </div>

          <div className="flex items-center justify-center gap-1 mt-3 pt-2 text-[9px] text-slate-400 uppercase tracking-wider font-sans border-t border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Documento Protegido • Anti-XSS Sanitized</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={printReceipt}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 text-xs"
          >
            <Printer className="w-4 h-4" /> Impresso / 2ª Via Thermal
          </button>
          <button
            onClick={downloadReceiptText}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
            title={`Baixar ${filename}.txt`}
          >
            <Download className="w-4 h-4" /> Baixar Comprovante TXT
          </button>
          <button
            onClick={onClose}
            className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition text-xs"
          >
            Fechar
          </button>
        </div>

        {/* Hidden printing iframe */}
        <iframe ref={printIframeRef} className="hidden" title="Receipt Print Target" />
      </div>
    </div>
  );
};

