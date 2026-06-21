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

const MenuListItem = ({ icon, title, onClick, rightElement, className = "" }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between p-4 flex-shrink-0 hover:bg-white/[0.02] transition-colors group ${className}`}>
    <div className="flex items-center gap-3.5">
      <div className="w-9 h-9 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        {icon}
      </div>
      <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors tracking-wide">{title}</span>
    </div>
    {rightElement || <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />}
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[150]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[340px] bg-zinc-950 border-r border-white/10 shadow-2xl z-[151] flex flex-col font-sans overflow-hidden"
          >
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
            
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-8 relative z-10">
              <div className="p-4 w-full h-full">
                {currentUser ? (
                  <>
                    {/* User Profile Card - Premium Redesign */}
                    <div className="relative mb-6 rounded-[20px] p-[1px] bg-gradient-to-br from-indigo-500/30 via-zinc-800 to-purple-500/30 overflow-hidden group">
                      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl rounded-[19px] transition-colors group-hover:bg-zinc-950/60" />
                      <div className="relative p-4 z-10">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                              <div className="w-full h-full rounded-[14px] bg-zinc-900 flex items-center justify-center border border-white/10 shadow-inner">
                                <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400 uppercase">
                                  {currentUser.username?.[0] || 'U'}
                                </span>
                              </div>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-900" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-white text-[14px] leading-tight mb-0.5 truncate tracking-wide">{currentUser.username}</h4>
                            <p className="text-[10px] text-zinc-400 mb-2 truncate font-medium">{currentUser.email || 'No email provided'}</p>
                            
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold inline-flex items-center gap-1 shadow-sm">
                                <Wallet className="w-3 h-3" /> ฿{(currentUser.balance || 0).toLocaleString()}
                              </span>
                              <span className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold inline-flex items-center gap-1 shadow-sm">
                                <Target className="w-3 h-3" /> {(currentUser.topupCount || 0).toLocaleString()} แต้ม
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Grid - Glassmorphism */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      <button onClick={() => { setPage?.('SHOP'); onClose(); }} className="flex flex-col items-center gap-1.5 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all duration-300 group-hover:-translate-y-1 shadow-lg">
                          <Home className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors drop-shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 tracking-wide">หน้าหลัก</span>
                      </button>
                      <button onClick={() => { setPage?.('SHOP'); onClose(); }} className="flex flex-col items-center gap-1.5 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300 group-hover:-translate-y-1 shadow-lg">
                          <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors drop-shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 tracking-wide">ร้านค้า</span>
                      </button>
                      <button onClick={() => { setPage?.('TOPUP'); onClose(); }} className="flex flex-col items-center gap-1.5 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:-translate-y-1 shadow-lg">
                          <Zap className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors drop-shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 tracking-wide">เติมเงิน</span>
                      </button>
                      <button onClick={() => { openHistoryModal?.('purchases'); onClose(); }} className="flex flex-col items-center gap-1.5 group">
                        <div className="w-[3.25rem] h-[3.25rem] rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-500/50 transition-all duration-300 group-hover:-translate-y-1 shadow-lg">
                          <History className="w-5 h-5 text-zinc-400 group-hover:text-pink-400 transition-colors drop-shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 tracking-wide">ประวัติ</span>
                      </button>
                    </div>

                    {/* Section: Settings */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1.5 h-3.5 bg-zinc-600 rounded-full" />
                        <h5 className="text-[11px] font-black text-zinc-400 tracking-widest uppercase">การตั้งค่า</h5>
                      </div>
                      <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-[16px] overflow-hidden divide-y divide-white/5 shadow-lg">
                        <MenuListItem 
                           icon={<Settings className="w-[16px] h-[16px] text-zinc-400" />} 
                           title="ข้อมูลส่วนตัวและการตั้งค่า" 
                           onClick={() => {
                             setPage?.('PROFILE');
                             onClose();
                           }} 
                        />
                      </div>
                    </div>

                    {/* Section: Support & Community */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1.5 h-3.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        <h5 className="text-[11px] font-black text-zinc-400 tracking-widest uppercase">ช่วยเหลือ & ชุมชน</h5>
                      </div>
                      
                      {/* Social Cards with Arrows */}
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <a href="https://discord.gg/AQKtJpvyva" target="_blank" rel="noopener noreferrer" className="relative flex flex-col items-center justify-center gap-2 py-3 px-2 border border-white/5 bg-zinc-900/50 backdrop-blur-sm rounded-2xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group shadow-lg overflow-hidden">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Facebook className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                          <span className="text-[11px] font-black text-zinc-400 group-hover:text-blue-400 tracking-wide">Facebook</span>
                        </a>
                        <a href="https://discord.gg/AQKtJpvyva" target="_blank" rel="noopener noreferrer" className="relative flex flex-col items-center justify-center gap-2 py-3 px-2 border border-white/5 bg-zinc-900/50 backdrop-blur-sm rounded-2xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group shadow-lg overflow-hidden">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                          </div>
                          <span className="text-[11px] font-black text-zinc-400 group-hover:text-indigo-400 tracking-wide">Discord</span>
                        </a>
                      </div>
                      
                      <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-[16px] overflow-hidden divide-y divide-white/5 shadow-lg">
                        <MenuListItem icon={<HelpCircle className="w-[16px] h-[16px] text-amber-400" />} title="คำถามที่พบบ่อย" />
                        <div onClick={() => window.open('https://discord.gg/AQKtJpvyva', '_blank')}>
                          <MenuListItem icon={<Phone className="w-[16px] h-[16px] text-pink-400" />} title="ติดต่อแอดมิน" rightElement={<ArrowUpRight className="w-4 h-4 text-zinc-500" />} />
                        </div>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-2 pb-4">
                      <button 
                        onClick={() => {
                            onLogoutClick();
                            onClose();
                        }}
                        className="w-full py-3.5 rounded-[16px] border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm group text-sm"
                      >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="tracking-wide">ออกจากระบบ</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-10 text-center h-full flex flex-col justify-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                      <div className="w-full h-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 transform rotate-3">
                        <Lock className="w-8 h-8 text-zinc-400 transform -rotate-3" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">ยังไม่ได้เข้าสู่ระบบ</h3>
                    <p className="text-xs text-zinc-400 mb-8 max-w-[240px] mx-auto leading-relaxed font-medium">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลบัญชี ประวัติการทำรายการ และจัดการโปรไฟล์ของคุณ</p>
                    <button 
                      onClick={() => { onClose(); onLoginClick(); }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black text-sm transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 flex justify-center items-center gap-2 group"
                    >
                      เข้าสู่ระบบ / สมัครสมาชิก
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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


