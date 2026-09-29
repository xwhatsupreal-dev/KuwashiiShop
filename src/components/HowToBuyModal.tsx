import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, X, UserCheck, Wallet, ShoppingCart, Video, CheckCircle, ArrowRight } from "lucide-react";
import { useScrollLock } from "../useScrollLock";

interface HowToBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToTopup?: () => void;
  onGoToProducts?: () => void;
}

export const HowToBuyModal: React.FC<HowToBuyModalProps> = ({
  isOpen,
  onClose,
  onGoToTopup,
  onGoToProducts,
}) => {
  useScrollLock(isOpen);

  const steps = [
    {
      num: 1,
      icon: UserCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/15 border-blue-500/30",
      title: "เข้าสู่ระบบ หรือ สมัครสมาชิก",
      desc: "สร้างบัญชีผู้ใช้หรือเข้าสู่ระบบ เพื่อใช้จัดการคำสั่งซื้อและรับสินค้าอย่างปลอดภัย",
    },
    {
      num: 2,
      icon: Wallet,
      color: "text-emerald-400",
      bg: "bg-emerald-500/15 border-emerald-500/30",
      title: "เติมเงินเครดิตเข้าสู่ระบบ",
      desc: "เติมเงินผ่านระบบอัตโนมัติ 24 ชม. ด้วย QR Code พร้อมเพย์ หรือ ซองของขวัญ TrueMoney",
    },
    {
      num: 3,
      icon: ShoppingCart,
      color: "text-purple-400",
      bg: "bg-purple-500/15 border-purple-500/30",
      title: "เลือกดูสินค้าที่ต้องการ",
      desc: "เลือกหมวดหมู่ที่ต้องการ เช่น ขายรหัส ไอเทมเกม หรือกล่องสุ่มรางวัล ตรวจสอบรายละเอียดและราคา",
    },
    {
      num: 4,
      icon: Video,
      color: "text-amber-400",
      bg: "bg-amber-500/15 border-amber-500/30",
      title: "อัดคลิปวิดีโอ & กดยืนยันสั่งซื้อ",
      desc: "สำคัญมาก! เริ่มอัดคลิปวิดีโอก่อนกดซื้อทุกครั้ง 'หากสินค้านั้นมีประกัน' เพื่อใช้เป็นหลักฐานในการเคลมสินค้า",
    },
    {
      num: 5,
      icon: CheckCircle,
      color: "text-indigo-400",
      bg: "bg-indigo-500/15 border-indigo-500/30",
      title: "รับสินค้าทันที & ตรวจสอบ",
      desc: "ระบบส่งมอบรหัสหรือสินค้าให้ทันที สามารถดูย้อนหลังได้ตลอดเวลาในเมนู 'ประวัติการสั่งซื้อ'",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md overflow-hidden flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full max-w-[560px] bg-[#0f0f17] border border-blue-500/25 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl shadow-blue-950/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-zinc-950/70 sticky top-0 z-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">ขั้นตอนและวิธีการสั่งซื้อ</h2>
                  <p className="text-xs text-zinc-400">How to order step by step</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="ปิดหน้าต่าง"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-hide space-y-3">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-start gap-3.5 hover:border-white/10 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${step.bg} ${step.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                          ขั้นตอนที่ {step.num}
                        </span>
                        <h4 className="text-sm font-bold text-white truncate">{step.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-white/5 bg-zinc-950/80 px-6 flex items-center justify-between gap-3">
              {onGoToTopup && (
                <button
                  onClick={() => {
                    onClose();
                    onGoToTopup();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  <span>ไปหน้าเติมเงิน</span>
                </button>
              )}
              <button
                onClick={() => {
                  onClose();
                  if (onGoToProducts) onGoToProducts();
                }}
                className="ml-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-900/30 flex items-center gap-2"
              >
                <span>เลือกดูสินค้าทันที</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
