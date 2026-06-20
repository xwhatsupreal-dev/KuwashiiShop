import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search } from 'lucide-react';

interface TopupTosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopupTosModal: React.FC<TopupTosModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-hidden flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-[460px] bg-black border border-white/10 rounded-[2rem] flex flex-col relative overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0 bg-zinc-950/80 sticky top-0 z-50">
              <h2 className="text-xl font-bold text-white tracking-tight">ข้อตกลงและเงื่อนไขการเติมเงิน</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="ปิดหน้าต่าง"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide text-zinc-300 font-sans text-sm leading-relaxed space-y-4">
              <p>
                1. ทางร้านขอสงวนสิทธิ์ไม่รับเคลมทุกกรณี หากเกิดข้อผิดพลาดจากการกรอกข้อมูลผิด เช่น บัญชีปลายทางไม่ถูกต้อง จำนวนเงินไม่ตรง
              </p>
              <p>
                2. หากพบปัญหาในการทำรายการ หรือยอดเงินไม่เข้าสู่ระบบหลังจากที่แจ้งชำระเงินเรียบร้อยแล้ว โปรดติดต่อแอดมินทันทีผ่านช่องทางติดต่อที่ระบุในเว็บไซต์
              </p>
              <p>
                3. การสแกนหน้าชำระเงินด้วย QR Code (สลิป) ให้ทำการเปิดโอนภายใน 3 นาที หากสลิปหมดอายุหรือเลยเวลาที่กำหนด จะไม่สามารถตรวจสอบได้
              </p>
              <p>
                4. เงื่อนไขและข้อกำหนดอาจเปลี่ยนแปลงได้ตามความเหมาะสมโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-zinc-950 px-6">
              <button
                onClick={onClose}
                className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                ฉันเข้าใจและยอมรับ
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
