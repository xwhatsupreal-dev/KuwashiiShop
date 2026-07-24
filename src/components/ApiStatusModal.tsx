import React, { useState, useEffect } from 'react';
import { useScrollLock } from '../useScrollLock';

import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, QrCode, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiStatusModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [apiStatus, setApiStatus] = useState<{angpao: string, checkslip: string} | null>(null);
  const [isCheckingApi, setIsCheckingApi] = useState(false);

  const checkApiStatus = async () => {
    setIsCheckingApi(true);
    setApiStatus(null);
    try {
      const res = await fetch('/api/admin/check-api-status');
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
      } else {
        setApiStatus({ angpao: 'error', checkslip: 'error' });
      }
    } catch(e) {
      setApiStatus({ angpao: 'error', checkslip: 'error' });
    } finally {
      setIsCheckingApi(false);
    }
  };

  useScrollLock(isOpen);
  useEffect(() => {
    if (isOpen) {
      checkApiStatus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#151515] border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-[#151515] sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#0ea5e9]" /> ตรวจสอบสถานะ API
              </h2>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-[#111]">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800 gap-4">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-rose-500 shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">API ตรวจสอบสลิป TrueMoney</p>
                        <p className="text-zinc-500 text-xs break-all">api.thunder.in.th/v2/verify/truewallet</p>
                      </div>
                    </div>
                    <div className="shrink-0 w-full sm:w-auto text-right">
                      {isCheckingApi ? (
                        <span className="px-3 py-1.5 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-full animate-pulse inline-flex items-center gap-1.5"><RefreshCw className="w-3 h-3 animate-spin"/> Checking</span>
                      ) : apiStatus ? (
                         apiStatus.angpao === 'online' ? (
                           <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Online</span>
                         ) : apiStatus.angpao === 'blocked' ? (
                           <span className="px-3 py-1.5 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full">ถูกบล็อก (Cloudflare)</span>
                         ) : (
                           <span className="px-3 py-1.5 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>
                         )
                      ) : (
                         <span className="text-zinc-500 text-xs font-medium">-</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800 gap-4">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">API ตรวจสอบสลิปธนาคาร</p>
                        <p className="text-zinc-500 text-xs break-all">api.thunder.in.th/v2/verify/bank</p>
                      </div>
                    </div>
                    <div className="shrink-0 w-full sm:w-auto text-right">
                      {isCheckingApi ? (
                        <span className="px-3 py-1.5 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-full animate-pulse inline-flex items-center gap-1.5"><RefreshCw className="w-3 h-3 animate-spin"/> Checking</span>
                      ) : apiStatus ? (
                         apiStatus.checkslip === 'online' ? (
                           <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Online</span>
                         ) : apiStatus.checkslip === 'blocked' ? (
                           <span className="px-3 py-1.5 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full">ถูกบล็อก (Cloudflare)</span>
                         ) : (
                           <span className="px-3 py-1.5 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>
                         )
                      ) : (
                         <span className="text-zinc-500 text-xs font-medium">-</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={checkApiStatus}
                  disabled={isCheckingApi}
                  className="w-full py-3 bg-[#0ea5e9] hover:bg-sky-500 disabled:bg-[#0ea5e9]/50 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isCheckingApi ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" /> ตรวจสอบสถานะอีกครั้ง
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
