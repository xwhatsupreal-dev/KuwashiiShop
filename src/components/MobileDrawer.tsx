import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, ShoppingBag, Wallet, Phone, Receipt, Mail, HelpCircle, LogOut, Facebook, MessageSquare, ChevronRight, QrCode, Trash2, UserPlus, Save as SaveIcon, Lock, History, Settings } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  setPage?: (page: string) => void;
  setShowTopupModal?: (show: boolean) => void;
  openHistoryModal?: (tab: 'purchases' | 'topups') => void;
}

const MenuListItem = ({ icon, title, onClick, rightElement }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 flex-shrink-0 hover:bg-zinc-800/80 transition-colors group">
    <div className="flex items-center gap-3.5">
      <div className="w-9 h-9 rounded-xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50 group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{title}</span>
    </div>
    {rightElement || <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />}
  </button>
);

export const MobileDrawer = ({ isOpen, onClose, currentUser, onLoginClick, onLogoutClick, setPage, setShowTopupModal, openHistoryModal }: MobileDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-zinc-950 border-r border-zinc-800 shadow-2xl z-[151] flex flex-col font-sans"
          >
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-10">
              <div className="p-5 w-full h-full relative">
                {currentUser ? (
                  <>
                    {/* User Profile Card */}
                    <div className="bg-gradient-to-tr from-zinc-900 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-5 flex items-center justify-between shadow-lg mb-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                      <div className="flex items-center gap-4 relative z-10 w-full">
                        <div className="w-14 h-14 rounded-2xl border-2 border-zinc-700/50 flex flex-shrink-0 items-center justify-center bg-zinc-800 text-[#0ea5e9] font-black text-2xl uppercase shadow-inner">
                          {currentUser.username?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-[15px] leading-tight mb-0.5 truncate">{currentUser.username}</h4>
                          <p className="text-[11px] text-zinc-400 mb-2.5 truncate">{currentUser.email || 'No email provided'}</p>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 rounded-md bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-[10px] font-bold tracking-tighter flex items-center gap-1">
                                <Wallet className="w-3 h-3" /> All Star: ฿{(currentUser.balance || 0).toLocaleString()}
                              </span>
                              <span className="px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-tighter flex items-center gap-1">
                                <Wallet className="w-3 h-3" /> ATOR/GAG2: ฿{(currentUser.balance_rov || 0).toLocaleString()}
                              </span>
                            </div>
                            <div>
                               <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold inline-flex items-center gap-1.5">
                                 <span>🎯</span>
                                 แต้ม: {currentUser.topupCount || 0}
                               </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-8">
                      <button onClick={() => { setPage?.('SHOP'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-[#0ea5e9]/10 group-hover:border-[#0ea5e9]/50 transition-all group-active:scale-95 shadow-sm">
                          <Home className="w-5 h-5 text-zinc-400 group-hover:text-[#0ea5e9] transition-colors" />
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-300">หน้าหลัก</span>
                      </button>
                      <button onClick={() => { setPage?.('SHOP'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition-all group-active:scale-95 shadow-sm">
                          <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-purple-500 transition-colors" />
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-300">ร้านค้า</span>
                      </button>
                      <button onClick={() => { setPage?.('TOPUP'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 transition-all group-active:scale-95 shadow-sm">
                          <Wallet className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-300">เติมเงิน</span>
                      </button>
                      <button onClick={() => { setPage?.('PROFILE'); onClose(); }} className="flex flex-col items-center gap-2 group relative">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-pink-500/10 group-hover:border-pink-500/50 transition-all group-active:scale-95 shadow-sm">
                          <History className="w-5 h-5 text-zinc-400 group-hover:text-pink-500 transition-colors" />
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-300">ประวัติการสั่งซื้อ</span>
                      </button>
                    </div>

                    {/* Section: History */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <History className="w-4 h-4 text-zinc-500" />
                        <h5 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest">การตั้งค่า</h5>
                      </div>
                      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden divide-y divide-zinc-800/50 shadow-sm">
                        <MenuListItem 
                           icon={<Settings className="w-[18px] h-[18px] text-zinc-400" />} 
                           title="ข้อมูลส่วนตัวและการตั้งค่า" 
                           onClick={() => {
                             setPage?.('PROFILE');
                             onClose();
                           }} 
                        />
                      </div>
                    </div>

                    {/* Section: Support */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <HelpCircle className="w-4 h-4 text-zinc-500" />
                        <h5 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest">ช่วยเหลือ & ชุมชน</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <a href="#" className="flex flex-col items-center justify-center gap-2 py-4 px-3 border border-zinc-800/80 bg-zinc-900/40 rounded-2xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors group shadow-sm">
                          <Facebook className="w-6 h-6 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-[11px] font-bold text-zinc-400 group-hover:text-blue-400 mt-1">Facebook</span>
                        </a>
                        <a href="#" className="flex flex-col items-center justify-center gap-2 py-4 px-3 border border-zinc-800/80 bg-zinc-900/40 rounded-2xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-colors group shadow-sm">
                          <MessageSquare className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                          <span className="text-[11px] font-bold text-zinc-400 group-hover:text-indigo-400 mt-1">Discord</span>
                        </a>
                      </div>
                      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm">
                        <MenuListItem icon={<HelpCircle className="w-[18px] h-[18px] text-amber-400" />} title="คำถามที่พบบ่อย" />
                        <MenuListItem icon={<Phone className="w-[18px] h-[18px] text-pink-400" />} title="ติดต่อแอดมิน" />
                      </div>
                    </div>



                    {/* Logout Button */}
                    <button 
                      onClick={() => {
                          onLogoutClick();
                          onClose();
                      }}
                      className="w-full py-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                    >
                      <LogOut className="w-5 h-5" />
                      ออกจากระบบ
                    </button>
                  </>
                ) : (
                  <div className="py-12 text-center h-full flex flex-col justify-center">
                    <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Lock className="w-10 h-10 text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">ยังไม่ได้เข้าสู่ระบบ</h3>
                    <p className="text-sm text-zinc-400 mb-8 max-w-[250px] mx-auto leading-relaxed">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลบัญชี ประวัติการทำรายการ และจัดการโปรไฟล์ของคุณ</p>
                    <button 
                      onClick={() => { onClose(); onLoginClick(); }}
                      className="w-full py-4 rounded-2xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold transition-all shadow-lg shadow-[#0ea5e9]/20"
                    >
                      เข้าสู่ระบบ / สมัครสมาชิก
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

