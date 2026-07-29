import React, { useState, useEffect } from 'react';
import { MercadoPagoConfig } from '../../types';
import {
  getMercadoPagoConfig,
  processMercadoPagoPix,
  processMercadoPagoCreditCard,
  processMercadoPagoBoleto,
  MpPixPaymentResult,
  MpCardPaymentResult,
  MpBoletoPaymentResult,
} from '../../lib/mercadoPagoService';
import {
  X,
  QrCode,
  CreditCard,
  FileText,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Download,
  Lock,
} from 'lucide-react';
import { formatCurrency } from '../../lib/sanitizer';

interface MercadoPagoModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  paymentMethod: 'Mercado Pago PIX' | 'Mercado Pago Cartão' | 'Mercado Pago Boleto';
  customerName?: string;
  customerPhone?: string;
  onPaymentSuccess: (details: { payment_id: string; method: string; status: string }) => void;
}

export const MercadoPagoModal: React.FC<MercadoPagoModalProps> = ({
  isOpen,
  onClose,
  amount,
  description,
  paymentMethod,
  customerName = '',
  customerPhone = '',
  onPaymentSuccess,
}) => {
  const [mpConfig, setMpConfig] = useState<MercadoPagoConfig>(getMercadoPagoConfig());
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'pix_display' | 'boleto_display'>('form');

  // PIX State
  const [pixResult, setPixResult] = useState<MpPixPaymentResult | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [countdown, setCountdown] = useState(1800); // 30 minutes in seconds

  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(customerName || '');
  const [cardExpMonth, setCardExpMonth] = useState('12');
  const [cardExpYear, setCardExpYear] = useState('2028');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState<number>(1);
  const [docType, setDocType] = useState('CPF');
  const [docNumber, setDocNumber] = useState('123.456.789-00');
  const [cardError, setCardError] = useState<string | null>(null);

  // Card Result
  const [cardResult, setCardResult] = useState<MpCardPaymentResult | null>(null);

  // Boleto Result
  const [boletoResult, setBoletoResult] = useState<MpBoletoPaymentResult | null>(null);
  const [boletoCopied, setBoletoCopied] = useState(false);

  useEffect(() => {
    setMpConfig(getMercadoPagoConfig());
  }, [isOpen]);

  // Handle PIX initiation when modal opens in PIX mode
  useEffect(() => {
    if (isOpen && paymentMethod === 'Mercado Pago PIX' && !pixResult) {
      initiatePixPayment();
    } else if (isOpen && paymentMethod === 'Mercado Pago Boleto' && !boletoResult) {
      initiateBoletoPayment();
    }
  }, [isOpen, paymentMethod]);

  // Countdown timer for PIX
  useEffect(() => {
    if (step === 'pix_display' && countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  if (!isOpen) return null;

  // Initiate PIX
  const initiatePixPayment = async () => {
    setLoading(true);
    try {
      const res = await processMercadoPagoPix(amount, description, 'cliente@supermercado.com');
      setPixResult(res);
      setStep('pix_display');
    } catch (err: any) {
      alert('Erro ao gerar PIX Mercado Pago: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initiate Boleto
  const initiateBoletoPayment = async () => {
    setLoading(true);
    try {
      const res = await processMercadoPagoBoleto(amount, customerName || 'Cliente Supermercado', '12345678900', 'cliente@supermercado.com');
      setBoletoResult(res);
      setStep('boleto_display');
    } catch (err: any) {
      alert('Erro ao gerar Boleto Mercado Pago: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Credit Card Submit
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardError(null);

    const cleanNum = cardNumber.replace(/\D/g, '');
    if (cleanNum.length < 13) {
      setCardError('Número do cartão inválido.');
      return;
    }

    if (!cardHolder.trim()) {
      setCardError('Informe o nome impresso no cartão.');
      return;
    }

    if (cardCvv.length < 3) {
      setCardError('CVV inválido.');
      return;
    }

    setLoading(true);
    setStep('processing');

    try {
      const res = await processMercadoPagoCreditCard(amount, {
        card_number: cleanNum,
        cardholder_name: cardHolder.trim(),
        expiration_month: cardExpMonth,
        expiration_year: cardExpYear,
        security_code: cardCvv,
        installments: Number(installments),
        doc_type: docType,
        doc_number: docNumber,
        email: 'cliente@supermercado.com',
      });

      setCardResult(res);
      setStep('success');

      setTimeout(() => {
        onPaymentSuccess({
          payment_id: res.payment_id,
          method: 'Mercado Pago Cartão',
          status: res.status,
        });
      }, 1500);
    } catch (err: any) {
      setCardError('Erro no processamento do cartão Mercado Pago: ' + err.message);
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  // Confirm PIX simulate approval
  const handleConfirmPixApproval = () => {
    if (!pixResult) return;
    setStep('success');
    onPaymentSuccess({
      payment_id: pixResult.payment_id,
      method: 'Mercado Pago PIX',
      status: 'approved',
    });
  };

  // Confirm Boleto approval simulation
  const handleConfirmBoletoApproval = () => {
    if (!boletoResult) return;
    setStep('success');
    onPaymentSuccess({
      payment_id: boletoResult.payment_id,
      method: 'Mercado Pago Boleto',
      status: 'approved',
    });
  };

  // Copy PIX string
  const copyPixCode = () => {
    if (pixResult?.qr_code) {
      navigator.clipboard.writeText(pixResult.qr_code);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2500);
    }
  };

  // Copy Boleto Digitable Line
  const copyBoletoLine = () => {
    if (boletoResult?.digitable_line) {
      navigator.clipboard.writeText(boletoResult.digitable_line);
      setBoletoCopied(true);
      setTimeout(() => setBoletoCopied(false), 2500);
    }
  };

  // Fill Test Card Helper
  const fillTestCard = () => {
    setCardNumber('4509 9876 5432 1000');
    setCardHolder('TEST USER');
    setCardExpMonth('12');
    setCardExpYear('2029');
    setCardCvv('123');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl space-y-0">
        {/* Header Bar */}
        <div className="p-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Zap className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm tracking-wide">Checkout Mercado Pago</h3>
                {mpConfig.sandbox_mode && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                    Modo Testes (Sandbox)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-sky-100 opacity-90">{description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-xl text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 border-b border-sky-100 dark:border-sky-900/50 flex items-center justify-between text-xs px-6">
          <span className="text-slate-600 dark:text-slate-400 font-bold">Valor Total a Pagar:</span>
          <span className="font-black text-sky-700 dark:text-sky-300 text-base font-mono">
            {formatCurrency(amount)}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* STEP: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Pagamento Aprovado pelo Mercado Pago!
                </h4>
                <p className="text-xs text-slate-500">
                  ID Transação Mercado Pago: <strong className="font-mono text-slate-800 dark:text-slate-200">{cardResult?.payment_id || pixResult?.payment_id || boletoResult?.payment_id}</strong>
                </p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                O comprovante e o status foram vinculados ao seu pedido ERP.
              </div>
            </div>
          )}

          {/* STEP: PROCESSING */}
          {step === 'processing' && (
            <div className="text-center py-12 space-y-4">
              <RefreshCw className="w-10 h-10 text-sky-600 animate-spin mx-auto" />
              <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                Processando pagamento com segurança no Mercado Pago...
              </p>
              <p className="text-xs text-slate-400">Por favor, aguarde alguns segundos.</p>
            </div>
          )}

          {/* STEP: PIX DISPLAY */}
          {paymentMethod === 'Mercado Pago PIX' && step === 'pix_display' && pixResult && (
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <QrCode className="w-4 h-4 text-sky-600" />
                <span>Escaneie o QR Code abaixo no app do seu Banco:</span>
              </div>

              {/* Simulated visual QR code block */}
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-md flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    pixResult.qr_code
                  )}`}
                  alt="QR Code PIX Mercado Pago"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Countdown timer */}
              <p className="text-xs text-slate-500">
                Este QR Code expira em: <strong className="font-mono text-sky-600 font-extrabold">{formatTimer(countdown)}</strong>
              </p>

              {/* Copy Paste Code */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                  Código PIX Copia e Cola Mercado Pago:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pixResult.qr_code}
                    className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-[10px] font-mono text-slate-700 dark:text-slate-300 truncate"
                  />
                  <button
                    type="button"
                    onClick={copyPixCode}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-3 py-2 rounded-xl text-xs transition flex items-center gap-1 shrink-0"
                  >
                    {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{pixCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Simulate Approval button for sandbox testing */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={handleConfirmPixApproval}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
                >
                  <ShieldCheck className="w-4 h-4" /> Confirmar Pagamento PIX Aprovado (Mercado Pago)
                </button>
              </div>
            </div>
          )}

          {/* STEP: CREDIT CARD FORM */}
          {paymentMethod === 'Mercado Pago Cartão' && step === 'form' && (
            <form onSubmit={handleCardSubmit} className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-sky-600" /> Cartão de Crédito Transparente
                </h4>
                <button
                  type="button"
                  onClick={fillTestCard}
                  className="text-[10px] font-bold text-sky-600 dark:text-sky-400 underline hover:text-sky-500"
                >
                  Preencher Cartão de Testes
                </button>
              </div>

              {cardError && (
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-xl flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cardError}</span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Número do Cartão:
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Nome Impresso no Cartão:
                </label>
                <input
                  type="text"
                  placeholder="COMO IMPRESSO NO CARTÃO"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white uppercase"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Validade Mês:
                  </label>
                  <select
                    value={cardExpMonth}
                    onChange={(e) => setCardExpMonth(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  >
                    {Array.from({ length: 12 }).map((_, i) => {
                      const m = (i + 1).toString().padStart(2, '0');
                      return <option key={m} value={m}>{m}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Ano:
                  </label>
                  <select
                    value={cardExpYear}
                    onChange={(e) => setCardExpYear(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  >
                    {Array.from({ length: 8 }).map((_, i) => {
                      const y = (2026 + i).toString();
                      return <option key={y} value={y}>{y}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    CVV:
                  </label>
                  <input
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-900 dark:text-white text-center"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Opções de Parcelamento Mercado Pago:
                </label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value={1}>1x de {formatCurrency(amount)} à vista (sem juros)</option>
                  <option value={2}>2x de {formatCurrency(amount / 2)} sem juros</option>
                  <option value={3}>3x de {formatCurrency(amount / 3)} sem juros</option>
                  <option value={6}>6x de {formatCurrency(amount / 6)} sem juros</option>
                  <option value={12}>12x de {formatCurrency(amount / 12)} com juros MP</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
                >
                  <Lock className="w-4 h-4" /> Pagar {formatCurrency(amount)} via Mercado Pago
                </button>
              </div>
            </form>
          )}

          {/* STEP: BOLETO DISPLAY */}
          {paymentMethod === 'Mercado Pago Boleto' && step === 'boleto_display' && boletoResult && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-white">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Boleto Bancário Gerado com Sucesso</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    Linha Digitável / Código de Barras:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={boletoResult.digitable_line}
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-[10px] font-mono text-slate-800 dark:text-slate-200 truncate"
                    />
                    <button
                      type="button"
                      onClick={copyBoletoLine}
                      className="bg-sky-600 hover:bg-sky-500 text-white font-bold p-2.5 rounded-xl text-xs transition shrink-0"
                    >
                      {boletoCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-500 space-y-1 pt-1">
                  <p>Vencimento do Boleto: <strong className="text-slate-900 dark:text-white">{boletoResult.expiration_date}</strong></p>
                  <p>ID do Pagamento: <strong className="font-mono text-slate-900 dark:text-white">{boletoResult.payment_id}</strong></p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => window.open(boletoResult.pdf_url, '_blank')}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Baixar PDF do Boleto
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBoletoApproval}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
                >
                  <Check className="w-4 h-4" /> Confirmar Pagamento do Boleto
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
