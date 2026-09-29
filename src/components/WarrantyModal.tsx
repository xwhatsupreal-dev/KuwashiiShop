import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, ShieldCheck, X, Video, Clock, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { useScrollLock } from "../useScrollLock";

interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
  discordUrl?: string;
}

export const WarrantyModal: React.FC<WarrantyModalProps> = ({
  isOpen,
  onClose,
  discordUrl = "https://discord.gg/AQKtJpvyva",
}) => {
  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md overflow-hidden flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full max-w-[560px] bg-[#0f0f17] border border-purple-500/25 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl shadow-purple-950/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-zinc-950/70 sticky top-0 z-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">เงื่อนไขการรับประกันสินค้า</h2>
                  <p className="text-xs text-zinc-400">Warranty Policy & Guidelines</p>
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
            <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-hide text-zinc-300 font-sans text-sm space-y-4">
              {/* Highlight Warning Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-amber-200/90">
                  <span className="font-bold text-amber-300 block mb-1 text-sm">
                    ข้อความเตือนสำคัญก่อนสั่งซื้อทุกครั้ง
                  </span>
                  อย่าลืมอัดคลิปก่อนสั่งซื้อสินค้าทุกครั้ง <strong className="text-white underline decoration-amber-400">"หากสินค้านั้นมีประกัน"</strong> เพื่อจะได้เคลมสินค้านั้นได้ทุกครั้งหากสินค้าที่ได้มาเกิดข้อผิดพลาด
                </div>
              </div>

              {/* Requirement 1: Video recording */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>1. ข้อกำหนดการอัดคลิปวิดีโอเป็นหลักฐาน</span>
                </div>
                <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                  <li>ต้องเริ่มกดอัดวิดีโอก่อนกดปุ่มยืนยันคำสั่งซื้อในเว็บไซต์</li>
                  <li>คลิปวิดีโอต้องต่อเนื่อง ไม่มีการหยุด ตัดต่อ สลับหน้าจอ หรือบดบังข้อมูลสำคัญ</li>
                  <li>เมื่อได้รับรหัสหรือข้อมูลสินค้า ให้นำไปล็อกอินเข้าสู่ระบบเพื่อตรวจสอบทันทีภายในคลิปเดียวกัน</li>
                </ul>
              </div>

              {/* Requirement 2: Warranty Period */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>2. ระยะเวลาการรับประกันสินค้า</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  สินค้าแต่ละรายการจะมีระบุระยะเวลารับประกันไว้อย่างชัดเจน (เช่น 15 นาที, 30 นาที, 1 ชั่วโมง หรือ 1 วัน) ในหน้าสั่งซื้อ โดยจะเริ่มนับเวลาทันทีที่ระบบจัดส่งสินค้าสำเร็จ หากสินค้าใดระบุว่า <strong className="text-zinc-200">"ไม่มี"</strong> หรือ <strong className="text-zinc-200">"-"</strong> จะถือว่าไม่มีการรับประกัน
                </p>
              </div>

              {/* Requirement 3: Void conditions */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>3. กรณีที่ไม่สามารถเคลมหรือขอเปลี่ยนสินค้าได้</span>
                </div>
                <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                  <li>ไม่มีคลิปวิดีโอตั้งแต่ก่อนกดซื้อ หรือคลิปมีการตัดต่อ/หยุดชั่วคราว</li>
                  <li>แจ้งเคลมเกินกว่าระยะเวลารับประกันที่ระบุไว้ของสินค้านั้น</li>
                  <li>นำรหัสไปใช้งานผิดวิธี นำไปใช้โปรแกรมช่วยเล่น (Mod/Cheat) หรือถูกแบนจากการกระทำของผู้ซื้อ</li>
                  <li>มีการเปลี่ยนแปลงข้อมูลรหัสผ่านหรืออีเมลหลังได้รับสินค้าแล้ว</li>
                </ul>
              </div>

              {/* Requirement 4: How to claim */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>4. วิธีการแจ้งเคลมสินค้า</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  หากพบว่ารหัสหรือสินค้ามีปัญหา ให้ส่งคลิปวิดีโอหลักฐานพร้อมแจ้งหมายเลขคำสั่งซื้อเข้ามาที่ช่องทาง Discord หรือติดต่อแอดมินทันที ทีมงานจะรีบตรวจสอบและเปลี่ยนสินค้าใหม่หรือคืนเงินให้ตามเงื่อนไขครับ
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-white/5 bg-zinc-950/80 px-6 flex items-center justify-between gap-3">
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-[#858ef7] hover:text-white font-bold text-xs flex items-center gap-2 transition-all"
              >
                <span>ติดต่อแอดมินใน Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-900/30"
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
