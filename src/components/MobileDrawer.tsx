import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, ShoppingBag, Wallet, Phone, HelpCircle, LogOut, Facebook, MessageSquare, ChevronRight, Lock, History, Settings, ArrowUpRight, Target, Zap } from 'lucide-react';

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

const MenuListItem = ({ icon, title, onClick, rightElement, className = "", iconClassName = "" }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between p-3.5 flex-shrink-0 hover:bg-white/[0.04] transition-colors group rounded-xl ${className}`}>
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${iconClassName}`}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{title}</span>
    </div>
    {rightElement || <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />}
  </button>
);

export const MobileDrawer = ({ isOpen, onClose, currentUser, onLoginClick, onLogoutClick, setPage, setShowTopupModal, openHistoryModal }: MobileDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#0a0a0a] border-r border-white/10 shadow-2xl z-[151] flex flex-col font-sans overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
              <div className="p-5 h-full flex flex-col">
                {currentUser ? (
                  <>
                    {/* User Profile Card - Clean & Fast */}
                    <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="flex items-center gap-3.5 relative z-10">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border-2 border-[#0a0a0a]">
                              <span className="text-lg font-bold text-white uppercase">
                                {currentUser.username?.[0] || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-900" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-[15px] leading-tight mb-0.5 truncate">{currentUser.username}</h4>
                          <p className="text-[11px] text-zinc-400 mb-2 truncate">{currentUser.email || 'No email provided'}</p>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[11px] font-semibold inline-flex items-center gap-1">
                              <Wallet className="w-3 h-3" /> ฿{(currentUser.balance || 0).toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-semibold inline-flex items-center gap-1">
                              <Target className="w-3 h-3" /> {(currentUser.topupCount || 0).toLocaleString()} แต้ม
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-8">
                      <button onClick={() => { setPage?.('SHOP'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-200">
                          <Home className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <span className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300">หน้าหลัก</span>
                      </button>
                      <button onClick={() => { setPage?.('SHOP'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-200">
                          <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <span className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300">ร้านค้า</span>
                      </button>
                      <button onClick={() => { setPage?.('TOPUP'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-200">
                          <Zap className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <span className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300">เติมเงิน</span>
                      </button>
                      <button onClick={() => { openHistoryModal?.('purchases'); onClose(); }} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-pink-500/10 group-hover:border-pink-500/30 transition-all duration-200">
                          <History className="w-5 h-5 text-zinc-400 group-hover:text-pink-400 transition-colors" />
                        </div>
                        <span className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300">ประวัติ</span>
                      </button>
                    </div>

                    <div className="flex-1 space-y-6">
                      {/* Section: Settings */}
                      <div>
                        <h5 className="text-[12px] font-semibold text-zinc-500 tracking-wide mb-2 px-2 uppercase">การตั้งค่า</h5>
                        <div className="space-y-1">
                          <MenuListItem 
                             icon={<Settings className="w-[18px] h-[18px] text-zinc-400" />} 
                             iconClassName="bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white"
                             title="ข้อมูลส่วนตัวและการตั้งค่า" 
                             onClick={() => {
                               setPage?.('PROFILE');
                               onClose();
                             }} 
                          />
                        </div>
                      </div>

                      {/* Section: Support */}
                      <div>
                        <h5 className="text-[12px] font-semibold text-zinc-500 tracking-wide mb-2 px-2 uppercase">ช่วยเหลือ & ชุมชน</h5>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3 px-1">
                          <a href="https://discord.gg/AQKtJpvyva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 transition-colors group">
                            <Facebook className="w-5 h-5 text-[#1877F2]" />
                            <span className="text-[13px] font-semibold text-[#1877F2]">Facebook</span>
                          </a>
                          <a href="https://discord.gg/AQKtJpvyva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/20 transition-colors group">
                            <MessageSquare className="w-5 h-5 text-[#5865F2]" />
                            <span className="text-[13px] font-semibold text-[#5865F2]">Discord</span>
                          </a>
                        </div>
                        
                        <div className="space-y-1">
                          <MenuListItem 
                            icon={<HelpCircle className="w-[18px] h-[18px] text-amber-400" />} 
                            iconClassName="bg-amber-500/10 text-amber-400"
                            title="คำถามที่พบบ่อย" 
                          />
                          <div onClick={() => window.open('https://discord.gg/AQKtJpvyva', '_blank')}>
                            <MenuListItem 
                              icon={<Phone className="w-[18px] h-[18px] text-pink-400" />} 
                              iconClassName="bg-pink-500/10 text-pink-400"
                              title="ติดต่อแอดมิน" 
                              rightElement={<ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-8">
                      <button 
                        onClick={() => {
                            onLogoutClick();
                            onClose();
                        }}
                        className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 font-semibold flex items-center justify-center gap-2 transition-all group text-[14px]"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>ออกจากระบบ</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                      <Lock className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h3 className="text-[18px] font-bold text-white mb-2">ยังไม่ได้เข้าสู่ระบบ</h3>
                    <p className="text-[13px] text-zinc-400 mb-8 max-w-[240px] leading-relaxed">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลบัญชี ประวัติการทำรายการ และจัดการโปรไฟล์ของคุณ</p>
                    <button 
                      onClick={() => { onClose(); onLoginClick(); }}
                      className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[14px] transition-colors flex justify-center items-center gap-2 group"
                    >
                      เข้าสู่ระบบ หรือ สมัครสมาชิก
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



