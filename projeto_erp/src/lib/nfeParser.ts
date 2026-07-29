/**
 * Supermarket NF-e (Nota Fiscal Eletrônica) XML Parser
 * Extracts products, supplier information, totals, and invoice items securely.
 */

import { Product, ProductUnit } from '../types';

export interface NFeParsedData {
  invoiceNumber: string;
  supplierName: string;
  supplierCnpj: string;
  issueDate: string;
  totalInvoiceAmount: number;
  products: {
    name: string;
    barcode: string;
    unit: ProductUnit;
    quantity: number;
    costPrice: number;
    suggestedSalePrice: number;
  }[];
}

export function parseNFeXml(xmlText: string): NFeParsedData {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('O arquivo selecionado não é um XML de NF-e válido.');
  }

  // Extract Invoice Metadata
  const nNF = xmlDoc.querySelector('ide > nNF')?.textContent || `NFE-${Date.now().toString().slice(-6)}`;
  const dhEmi = xmlDoc.querySelector('ide > dhEmi')?.textContent || new Date().toISOString();
  
  // Extract Supplier
  const emitName = xmlDoc.querySelector('emit > xNome')?.textContent || 'Fornecedor Desconhecido';
  const emitCnpj = xmlDoc.querySelector('emit > CNPJ')?.textContent || '';

  // Extract Total Amount
  const vNFStr = xmlDoc.querySelector('total > ICMSTot > vNF')?.textContent || '0';
  const totalInvoiceAmount = parseFloat(vNFStr) || 0;

  // Extract Product Details
  const detElements = xmlDoc.querySelectorAll('det');
  if (detElements.length === 0) {
    throw new Error('Nenhum item/produto foi localizado neste XML de NF-e.');
  }

  const products: NFeParsedData['products'] = [];

  detElements.forEach((det) => {
    const prod = det.querySelector('prod');
    if (!prod) return;

    const name = prod.querySelector('xProd')?.textContent || 'Produto Sem Nome';
    let barcode = prod.querySelector('cEAN')?.textContent || '';
    if (barcode === 'SEM GTIN' || barcode === 'SEM_GTIN' || barcode === '0') {
      barcode = '';
    }

    const uComRaw = (prod.querySelector('uCom')?.textContent || 'UN').toUpperCase().trim();
    let unit: ProductUnit = 'UN';
    if (['KG', 'KILO', 'QUILO'].includes(uComRaw)) unit = 'KG';
    else if (['CX', 'CAIXA'].includes(uComRaw)) unit = 'CX';
    else if (['L', 'LT', 'LITRO'].includes(uComRaw)) unit = 'L';
    else if (['M', 'MTR', 'METRO'].includes(uComRaw)) unit = 'M';
    else if (['PCT', 'PACOTE'].includes(uComRaw)) unit = 'PCT';
    else if (['G', 'GR', 'GRAMA'].includes(uComRaw)) unit = 'G';

    const qCom = parseFloat(prod.querySelector('qCom')?.textContent || '1') || 1;
    const vUnCom = parseFloat(prod.querySelector('vUnCom')?.textContent || '0') || 0;

    // Default 30% margin for suggested supermarket sale price
    const suggestedSalePrice = Math.round(vUnCom * 1.35 * 100) / 100;

    products.push({
      name,
      barcode,
      unit,
      quantity: qCom,
      costPrice: vUnCom,
      suggestedSalePrice,
    });
  });

  return {
    invoiceNumber: nNF,
    supplierName: emitName,
    supplierCnpj: emitCnpj,
    issueDate: dhEmi.split('T')[0],
    totalInvoiceAmount,
    products,
  };
}
