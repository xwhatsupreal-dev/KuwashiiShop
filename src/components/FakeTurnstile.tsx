import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export const FakeTurnstile = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

  const handleClick = () => {
    if (status !== 'idle') return;
    setStatus('verifying');
    setTimeout(() => {
      setStatus('success');
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <div 
      className="w-full bg-[#1b1b1b] border border-zinc-800 rounded-lg p-3 sm:p-4 flex items-center justify-between shadow-sm my-4 h-[75px] cursor-pointer hover:border-zinc-700 transition"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
          <AnimatePresence mode="popLayout">
            {status === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full h-full rounded border-2 border-zinc-600 bg-zinc-900 group-hover:bg-zinc-800 transition-colors" 
              />
            )}
            {status === 'verifying' && (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full h-full rounded-full border-[3px] border-zinc-800 border-t-[#00c563] animate-spin" 
              />
            )}
            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full rounded bg-[#00c563] flex items-center justify-center shadow-lg shadow-[#00c563]/20"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col">
          <span className="text-[#e2e2e2] text-xs sm:text-sm font-medium">
            {status === 'idle' ? 'คลิกเพื่อยืนยัน' : status === 'verifying' ? 'กำลังตรวจสอบ...' : 'ยืนยันสำเร็จแล้ว'}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end mr-1 text-right justify-center h-full">
        <div className="text-zinc-500 font-bold tracking-widest text-[9px] sm:text-[10px] uppercase leading-tight">
          Captcha by
          <br/>
          <span className="text-rose-500">whatsupX</span>
        </div>
      </div>
    </div>
  );
};
