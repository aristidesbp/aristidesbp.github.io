import React from 'react';
import { Venda, ItemCarrinho, Entidade } from '../types/erp';

interface ThermalReceiptProps {
  venda: Partial<Venda>;
  carrinho: ItemCarrinho[];
  cliente?: Partial<Entidade>;
}

export const ThermalReceipt: React.FC<ThermalReceiptProps> = ({ venda, carrinho, cliente }) => {
  const subtotal = carrinho.reduce((acc, item) => acc + item.preco_venda * item.quantidadeCarrinho, 0);
  const desconto = venda.desconto || 0;
  const total = Math.max(0, subtotal - desconto);
  const dataHoraStr = new Date().toLocaleString('pt-BR');
  const idCurto = (venda.id || 'VD' + Date.now()).substring(0, 8).toUpperCase();

  return (
    <div className="w-[300px] p-4 bg-white text-black font-mono text-xs mx-auto border border-slate-200 shadow-sm rounded-sm my-2">
      <div className="text-center mb-2 pb-2 border-b border-dashed border-slate-400">
        <h2 className="font-bold text-sm tracking-wider uppercase">ERP_ABP</h2>
        <p className="text-[10px] text-slate-600">Marketplace & Gestão Comunitária</p>
        <p className="text-[10px] font-bold text-emerald-800 mt-1">*** COMPROVANTE DE VENDA ***</p>
      </div>

      <div className="space-y-0.5 text-[10px] text-slate-700 mb-2 border-b border-dashed border-slate-400 pb-2">
        <div className="flex justify-between">
          <span>Data/Hora:</span>
          <span className="font-bold">{dataHoraStr}</span>
        </div>
        <div className="flex justify-between">
          <span>Nº Venda:</span>
          <span className="font-bold">#{idCurto}</span>
        </div>
        <div className="flex justify-between">
          <span>Pagamento:</span>
          <span className="font-bold">{venda.forma_pagamento || 'Dinheiro'}</span>
        </div>
        {cliente?.nome_completo && (
          <div className="flex justify-between">
            <span>Cliente:</span>
            <span className="font-bold truncate max-w-[150px]">{cliente.nome_completo}</span>
          </div>
        )}
      </div>

      <table className="w-full text-[10px] mb-2">
        <thead>
          <tr className="border-b border-slate-400">
            <th className="text-left py-1">Item</th>
            <th className="text-center py-1">Qtd</th>
            <th className="text-right py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item, idx) => (
            <tr key={idx} className="border-b border-slate-100">
              <td className="py-1 pr-1 truncate max-w-[130px]">{item.nome}</td>
              <td className="text-center py-1">{item.quantidadeCarrinho}</td>
              <td className="text-right py-1 font-bold">R$ {(item.preco_venda * item.quantidadeCarrinho).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-1 text-xs border-t border-dashed border-slate-400 pt-2">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Desconto:</span>
          <span>- R$ {desconto.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm text-black border-t border-slate-400 pt-1">
          <span>TOTAL:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center text-[9px] text-slate-500 mt-4 pt-2 border-t border-dashed border-slate-300">
        <p>Obrigado pela preferência!</p>
        <p className="font-bold">www.erp-abp.com.br</p>
      </div>
    </div>
  );
};
