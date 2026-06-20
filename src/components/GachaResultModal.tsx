import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Sparkles, MessageCircle } from 'lucide-react';

interface GachaResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    item: any;
    drops: { name: string; color?: string; isSalt?: boolean }[];
    purchaseQty?: number;
    remainingStock?: number;
    credentialData?: string[];
  } | null;
}

export const GachaResultModal: React.FC<GachaResultModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const allSalt = result.drops.every(d => d.isSalt);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 "
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className={`relative max-w-lg w-full bg-[#050505]/95 backdrop-blur-xl border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] rounded-[2rem] p-8 z-10 text-center overflow-hidden`}
        >
          {/* Confetti / Lights effect background */}
          <div className={`absolute top-0 right-0 w-48 h-48 ${allSalt ? 'bg-zinc-500/10' : 'bg-amber-500/15'} blur-[60px] pointer-events-none rounded-full`} />
          <div className={`absolute bottom-0 left-0 w-48 h-48 ${allSalt ? 'bg-zinc-500/5' : 'bg-orange-600/10'} blur-[60px] pointer-events-none rounded-full`} />

          <motion.button whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="mb-8 relative mt-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center relative z-10 ${allSalt ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-[0_0_30px_rgba(113,113,122,0.3)] border border-zinc-700' : 'bg-gradient-to-br from-amber-400/20 to-orange-600/20 shadow-[0_0_40px_rgba(245,158,11,0.3)] border border-amber-500/30'}`}
            >
              <div className={`absolute inset-2 rounded-full ${allSalt ? 'bg-zinc-900' : 'bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center'} shadow-inner`}>
                {allSalt ? (
                  <div className="text-5xl flex items-center justify-center h-full w-full">🧂</div>
                ) : (
                  <Trophy className="w-12 h-12 text-white drop-shadow-md" />
                )}
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 rounded-full border-dashed pointer-events-none ${allSalt ? 'border-zinc-500/20' : 'border-amber-500/30'}`}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border rounded-full border-dotted pointer-events-none opacity-50 ${allSalt ? 'border-zinc-500/10' : 'border-orange-500/20'}`}
            />
          </div>

          <h2 className={`text-2xl sm:text-3xl font-bold mb-3 font-display tracking-wide ${allSalt ? 'text-zinc-300' : 'bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent'}`}>
            {allSalt ? 'น่าเสียดาย! คุณเกลือ' : 'ยินดีด้วย! คุณได้รับ'}
          </h2>
          <p className="text-zinc-400 text-sm mb-2 max-w-sm mx-auto font-medium leading-relaxed">
            จากการเปิด {result.item.name} จำนวน <span className="text-white font-bold">{result.purchaseQty || result.drops.length}</span> ครั้ง
          </p>
          
          {result.remainingStock !== undefined ? (
            <div className="mb-6 flex justify-center">
              <span className="text-emerald-400 font-medium text-xs bg-emerald-500/10 py-1.5 px-4 rounded-full border border-emerald-500/20 tracking-wide">
                กล่องสุ่มเหลือ <span className="font-bold">{result.remainingStock}</span> ชิ้น
              </span>
            </div>
          ) : (
            <div className="mb-8" />
          )}

          <div className="space-y-3 max-h-[40dvh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <AnimatePresence>
              {Object.values(
                result.drops.reduce((acc: any, drop) => {
                  const key = drop.name;
                  if (!acc[key]) acc[key] = { ...drop, count: 0 };
                  acc[key].count++;
                  return acc;
                }, {})
              ).sort((a: any, b: any) => {
                if (a.isSalt && !b.isSalt) return 1;
                if (!a.isSalt && b.isSalt) return -1;
                return 0;
              }).map((drop: any, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1), type: "spring", stiffness: 300, damping: 25 }}
                  className={`bg-white/5 border ${drop.isSalt ? 'border-white/5' : 'border-amber-500/20'} p-3.5 rounded-2xl flex items-center gap-4 relative overflow-hidden backdrop-blur-sm`}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-inner relative overflow-hidden shrink-0"
                    style={{ backgroundColor: drop.isSalt ? 'rgba(255,255,255,0.05)' : (drop.color ? `${drop.color}20` : 'rgba(245,158,11,0.2)'), border: `1px solid ${drop.isSalt ? 'rgba(255,255,255,0.1)' : (drop.color ? `${drop.color}50` : 'rgba(245,158,11,0.5)')}` }}
                  >
                    {drop.isSalt ? '🧂' : '✨'}
                  </div>
                  <div className="flex-1 text-left flex justify-between items-center min-w-0">
                    <div className="pr-3">
                      <div className={`${drop.isSalt ? 'text-zinc-300' : 'text-white'} font-bold text-[15px] sm:text-base leading-snug`}>{drop.name}</div>
                      <div className="text-[10px] sm:text-[11px] font-mono font-medium text-zinc-500 tracking-widest mt-1">
                        {drop.isSalt ? 'SALT / ไม่มีรางวัล' : 'EPIC DROP REWARD'}
                      </div>
                    </div>
                    {drop.count > 1 && (
                      <div className="text-sm font-bold font-mono text-zinc-300 bg-white/10 px-3 py-1.5 rounded-lg shrink-0">
                        x{drop.count}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {result.credentialData && result.credentialData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (result.drops.length * 0.1) }}
              className="mt-6 border border-emerald-500/20 bg-emerald-500/5 rounded-[1.25rem] p-5 text-left relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-[50px] pointer-events-none rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/10 blur-[40px] pointer-events-none rounded-full" />
              
              <div className="text-sm font-bold text-emerald-400 mb-3 font-mono flex justify-between items-center relative z-10">
                <span>[{result.item?.game === 'ROV' ? 'USERNAME:PASSWORD' : 'SECRET CODE'}]</span>
                <span className="text-[10px] text-emerald-400/80 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider bg-emerald-500/10">
                  Classified
                </span>
              </div>
              <div className="space-y-2.5 relative z-10">
                {result.credentialData.map((cred, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="bg-[#050505]/60 border border-white/10 text-zinc-200 px-4 py-3.5 rounded-xl font-mono text-[13px] flex-1 break-all select-all shadow-inner">
                      {cred}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[11px] text-zinc-500 text-center font-mono relative z-10 font-medium bg-black/20 py-2 rounded-lg border border-white/5">
                โปรดก็อปปี้หรือแคปเจอร์รหัสนี้ไว้ (ดูย้อนหลังได้ในประวัติ)
              </div>
            </motion.div>
          )}

          {!allSalt && !(result.credentialData && result.credentialData.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (result.drops.length * 0.1) }}
              className="mt-8 flex flex-col items-center"
            >
              <p className="text-zinc-400 text-[13px] mb-3 font-medium bg-white/5 px-4 py-1.5 rounded-full border border-white/10">กรุณาติดต่อแอดมินพร้อมแคปหน้าจอเพื่อรับรางวัล</p>
              <a
                href={result.item?.game === 'ASTD' || !result.item?.game ? "https://m.me/DazzRFkaz" : "https://discord.gg/AQKtJpvyva"}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-4 px-4 rounded-xl border border-[#0ea5e9]/30 bg-gradient-to-r from-[#0ea5e9]/10 to-blue-600/10 hover:from-[#0ea5e9]/20 hover:to-blue-600/20 text-[#0ea5e9] hover:text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:shadow-[0_0_30px_rgba(14,165,233,0.25)] hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-out" />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">ติดต่อรับของรางวัลทันที</span>
              </a>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (result.drops.length * 0.1) + 0.1 }}
            onClick={onClose}
            className={`w-full ${!(result.credentialData && result.credentialData.length > 0) && !allSalt ? 'mt-3' : 'mt-8'} py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer relative overflow-hidden group/btn2 ${
              allSalt 
                ? 'bg-zinc-800 text-zinc-300 shadow-[0_0_20px_rgba(113,113,122,0.15)] border border-white/5' 
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 shadow-[0_0_30px_rgba(245,158,11,0.25)] border border-orange-400/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]'
            }`}
          >
            {allSalt ? 'ปิดหน้าต่าง' : 'ยืนยัน / เก็บเข้ากระเป๋า'}
            {!allSalt && (
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover/btn2:translate-x-[150%] transition-transform duration-700 ease-out" />
            )}
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
