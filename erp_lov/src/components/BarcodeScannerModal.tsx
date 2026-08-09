import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X, AlertCircle } from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (code: string) => void;
  title?: string;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onScan,
  title = 'Ler Código de Barras'
}) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const regionId = 'html5qr-code-full-region';

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const timer = setTimeout(() => {
      try {
        const html5QrCode = new Html5Qrcode(regionId);
        scannerRef.current = html5QrCode;

        html5QrCode
          .start(
            { facingMode: 'environment' },
            {
              fps: 10,
              qrbox: { width: 280, height: 140 }
            },
            (decodedText) => {
              if (isMounted) {
                onScan(decodedText);
                stopScanner();
                onClose();
              }
            },
            () => {
              // ignore parse errors frame-by-frame
            }
          )
          .catch((err) => {
            console.warn('Camera start error:', err);
          });
      } catch (err) {
        console.warn('Scanner init error:', err);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      stopScanner();
    };
  }, [isOpen]);

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current?.clear();
          scannerRef.current = null;
        })
        .catch((e) => console.warn('Stop error:', e));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">{title}</h3>
          </div>
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2 min-h-[220px] flex items-center justify-center">
          <div id={regionId} className="w-full h-full rounded-lg overflow-hidden" />
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Posicione o código de barras no centro do quadro para leitura automática.</span>
        </div>
      </div>
    </div>
  );
};
