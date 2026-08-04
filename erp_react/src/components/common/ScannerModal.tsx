import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (isOpen) {
      const scanner = new Html5Qrcode('camera-reader-preview');
      scannerRef.current = scanner;

      scanner
        .start(
          { facingMode: 'environment' },
          { fps: 15, qrbox: { width: 280, height: 160 } },
          (decodedText) => {
            onScanSuccess(decodedText);
            stopScanner();
            onClose();
          },
          () => {
            // Ignore scan errors while searching
          }
        )
        .catch((err) => {
          console.warn('Camera access error or denied:', err);
        });
    }

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current
        .stop()
        .then(() => scannerRef.current?.clear())
        .catch((err) => console.warn('Error stopping scanner:', err));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Leitor de Código de Barras</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Aproxime o código de barras da câmera</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-emerald-500/30 bg-slate-950 p-2">
          <div id="camera-reader-preview" className="w-full max-w-xs mx-auto overflow-hidden rounded-lg"></div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          💡 Dica: Certifique-se de que o ambiente possui boa iluminação.
        </p>
      </div>
    </div>
  );
};
