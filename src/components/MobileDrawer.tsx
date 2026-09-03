import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  ShoppingBag, 
  Wallet, 
  Phone, 
  HelpCircle, 
  LogOut, 
  Facebook, 
  MessageSquare, 
  ChevronRight, 
  History, 
  Settings, 
  ArrowUpRight, 
  Target, 
  Zap, 
  Gamepad2, 
  X, 
  LayoutGrid, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  ShieldCheck, 
  Store, 
  ChevronDown,
  CreditCard,
  User,
  ExternalLink
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onLoginClick: () => void;
  onRegisterClick?: () => void;
  onLogoutClick: () => void;
  setPage?: (page: string) => void;
  setShowTopupModal?: (show: boolean) => void;
  openHistoryModal?: (tab: 'purchases' | 'topups') => void;
  onNavigateProfile?: (tab: 'profile' | 'purchases' | 'topups') => void;
  globalStats?: any;
}

export const MobileDrawer = ({
  isOpen,
  onClose,
  currentUser,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  setPage,
  setShowTopupModal,
  openHistoryModal,
  onNavigateProfile,
  globalStats
}: MobileDrawerProps) => {
  const shopLogoUrl = globalStats?.announcement_settings?.shopLogoUrl;

  const navigateTo = (page: string) => {
    if (setPage) {
      setPage(page);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed top-0 left-0 bottom-0 w-[88%] max-w-[340px] bg-[#0b0c10] border-r border-white/10 shadow-2xl rounded-r-3xl z-[151] flex flex-col font-sans overflow-hidden"
          >
            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-xl pointer-events-none translate-x-1/3 translate-y-1/3" />

            {/* Header Section */}
            <div className="relative z-10 flex items-center justify-between p-5 border-b border-white/10 bg-black/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  {shopLogoUrl ? (
                    <img src={shopLogoUrl} alt="Shop Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Store className="w-5 h-5 text-indigo-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-base font-black text-white tracking-wide flex items-center gap-1.5 leading-none">
                    KUWASHII SHOP
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-400">ออนไลน์พร้อมบริการ</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Main Scrollable Content */}
            <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide p-4 space-y-5">
              {currentUser ? (
                /* Authenticated User View */
                <div className="space-y-5">
                  {/* User Profile Card */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-indigo-950/30 border border-white/10 shadow-lg overflow-hidden">
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-md shadow-indigo-500/20">
                          <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center border-2 border-[#0b0c10]">
                            {currentUser.avatar_url || currentUser.avatar ? (
                              <img src={currentUser.avatar_url || currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="text-lg font-bold text-white uppercase">
                                {currentUser.username?.[0] || 'U'}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{currentUser.username}</h4>
                        <p className="text-[11px] text-zinc-400 truncate mb-2">{currentUser.email || 'สมาชิก KUWASHII'}</p>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold flex items-center gap-1">
                            <Wallet className="w-3 h-3 text-indigo-400" /> ฿{(currentUser.balance || 0).toLocaleString()}
                          </span>
                          <span className="px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1">
                            <Target className="w-3 h-3 text-amber-400" /> {(currentUser.topupCount || 0).toLocaleString()} แต้ม
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                      <button
                        onClick={() => navigateTo('TOPUP')}
                        className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-indigo-500/30"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        เติมเงินทันที
                      </button>
                      <button
                        onClick={() => navigateTo('PROFILE')}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold text-xs flex items-center justify-center gap-1 transition-colors border border-white/10"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        โปรไฟล์
                      </button>
                    </div>
                  </div>

                  {/* Quick Action Navigation Grid */}
                  <div>
                    <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase px-1 mb-2.5 block">
                      เมนูหลัก
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigateTo('SHOP')}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-indigo-500/30 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors shrink-0">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">หน้าแรก</div>
                          <div className="text-[10px] text-zinc-400">ร้านค้า</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigateTo('TOPUP')}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-emerald-500/30 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">เติมเงิน</div>
                          <div className="text-[10px] text-zinc-400">อัตโนมัติ</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (onNavigateProfile) onNavigateProfile('purchases');
                          else if (openHistoryModal) openHistoryModal('purchases');
                          onClose();
                        }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-purple-500/30 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors shrink-0">
                          <History className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">ประวัติ</div>
                          <div className="text-[10px] text-zinc-400">คำสั่งซื้อ</div>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Section: Support & Links */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase px-1 block">
                      ติดต่อ & ช่วยเหลือ
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] font-semibold text-xs hover:bg-[#1877F2]/20 transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </a>
                      <a
                        href="https://discord.gg/AQKtJpvyva"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] font-semibold text-xs hover:bg-[#5865F2]/20 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Discord
                      </a>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="pt-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onLogoutClick();
                        onClose();
                      }}
                      className="w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      ออกจากระบบ
                    </motion.button>
                  </div>
                </div>
              ) : (
                /* Unauthenticated (Guest) User View */
                <div className="space-y-5">
                  {/* Welcome Member Banner */}
                  <div className="relative p-5 rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
                      <User className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      เข้าสู่ระบบสมาชิก
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 mb-5">
                      เข้าสู่ระบบเพื่อสั่งซื้อสินค้าและจัดการโปรไฟล์
                    </p>

                    <div className="w-full flex flex-col gap-2.5">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onClose();
                          onLoginClick();
                        }}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <LogIn className="w-4 h-4" />
                        เข้าสู่ระบบ
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onClose();
                          if (onRegisterClick) onRegisterClick();
                          else onLoginClick();
                        }}
                        className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        สมัครสมาชิกใหม่
                      </motion.button>
                    </div>
                  </div>

                  {/* Main Navigation Card Tiles Grid */}
                  <div>
                    <div className="flex items-center justify-between px-1 mb-2.5">
                      <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">
                        นำทางด่วน
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigateTo('SHOP')}
                        className="group relative p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/80 border border-white/10 hover:border-indigo-500/50 transition-all text-left flex flex-col justify-between h-24 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                            <Home className="w-5 h-5" />
                          </div>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            หน้าหลัก
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                            หน้าแรก
                          </div>
                          <div className="text-[10px] text-zinc-400">ร้านค้า KUWASHII</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigateTo('SHOP')}
                        className="group relative p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/80 border border-white/10 hover:border-purple-500/50 transition-all text-left flex flex-col justify-between h-24 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            <LayoutGrid className="w-5 h-5" />
                          </div>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                            หมวดหมู่
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                            หมวดหมู่สินค้า
                          </div>
                          <div className="text-[10px] text-zinc-400">เลือกดูประเภทสินค้า</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigateTo('SHOP')}
                        className="group relative p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/80 border border-white/10 hover:border-cyan-500/50 transition-all text-left flex flex-col justify-between h-24 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                            ทั้งหมด
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            สินค้าทั้งหมด
                          </div>
                          <div className="text-[10px] text-zinc-400">รายการสินค้าพร้อมส่ง</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          onClose();
                          onLoginClick();
                        }}
                        className="group relative p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/80 border border-white/10 hover:border-emerald-500/50 transition-all text-left flex flex-col justify-between h-24 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5" />
                          </div>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            เติมเงิน
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                            ระบบเติมเงิน
                          </div>
                          <div className="text-[10px] text-zinc-400">เติมเครดิต 24 ชม.</div>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* List Menu Section */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase px-1 block">
                      บริการ & การติดต่อ
                    </span>

                    <div className="space-y-1.5">
                      <a
                        href="https://discord.gg/AQKtJpvyva"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 border border-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors block">
                              ติดต่อแอดมิน / ซัพพอร์ต
                            </span>
                            <span className="text-[10px] text-zinc-400 block">สอบถามปัญหาและแจ้งชำระ</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                  </div>

                  {/* Social Community Buttons */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase px-1 mb-2 block">
                      ชุมชนของเรา
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/25 text-[#1877F2] font-bold text-xs transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </a>
                      <a
                        href="https://discord.gg/AQKtJpvyva"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/25 text-[#5865F2] font-bold text-xs transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Discord
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Brand Info */}
            <div className="p-4 border-t border-white/5 bg-black/40 shrink-0 text-center">
              <p className="text-[11px] text-zinc-500 font-medium">
                KUWASHII SHOP &copy; 2026 &middot; All Rights Reserved
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
