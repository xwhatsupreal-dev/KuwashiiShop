import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Menu, LogIn, User, CircleDollarSign, Home, ShoppingBag, Wallet, LogOut, Gamepad2, Settings, Box, History, Phone, Smile } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useRef, useEffect } from 'react';
import { MarqueeAnnouncement } from './MarqueeAnnouncement';

export const ShopHeader = ({ toggleSidebar, onSearchToggle, currentUser, onLoginClick, onRegisterClick, onLogout, setAppScreen, currentScreen, globalStats, onLogoClick, onNavigateProfile }: { toggleSidebar: () => void, onSearchToggle: () => void, currentUser: any, onLoginClick: () => void, onRegisterClick?: () => void, onLogout?: () => void, setAppScreen?: (screen: string) => void, currentScreen?: string, globalStats?: any, onLogoClick?: () => void, onNavigateProfile?: (tab: 'profile' | 'purchases' | 'topups') => void }) => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-black border-b border-white/5 sticky top-0 z-50 flex flex-col"
    >
      <MarqueeAnnouncement appScreen={currentScreen || 'SHOP'} />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between w-full gap-2 sm:gap-4">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-2 sm:p-2.5 text-zinc-300 hover:text-white bg-[#14141c] hover:bg-[#1c1c28] border border-zinc-800 rounded-xl transition-all cursor-pointer flex items-center justify-center"
            title="เมนู"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick || (() => setAppScreen?.("SHOP"))}
          >
            {/* Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-purple-500/30 flex items-center justify-center bg-[#14141c] overflow-hidden shrink-0 relative">
              {globalStats?.announcement_settings?.shopLogoUrl ? (
                <img
                  src={globalStats.announcement_settings.shopLogoUrl}
                  alt="Logo"
                  onLoad={() => setIsLogoLoaded(true)}
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isLogoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              ) : (
                <Gamepad2 className="w-5 h-5 text-purple-400" />
              )}
            </div>
            <span className="text-zinc-100 font-black tracking-tight hidden lg:block text-base">STORE</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#14141c] p-1 rounded-full border border-zinc-800">
            <button
              onClick={() => setAppScreen?.("SHOP")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${currentScreen === "SHOP" ? "bg-purple-900/40 text-purple-300 border border-purple-500/30" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              <Home className="w-3.5 h-3.5" />
              หน้าหลัก
            </button>
            <button
              onClick={() => setAppScreen?.("SHOP")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${currentScreen === "PRODUCTS" ? "bg-purple-900/40 text-purple-300 border border-purple-500/30" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              สินค้าทั้งหมด
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  onLoginClick();
                } else {
                  setAppScreen?.("TOPUP");
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${currentScreen === "TOPUP" ? "bg-purple-900/40 text-purple-300 border border-purple-500/30" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              <Wallet className="w-3.5 h-3.5" />
              เติมเงิน
            </button>
          </nav>
        </div>

        {/* Center: Search Capsule matching screenshot */}
        <div
          onClick={onSearchToggle}
          className="flex-1 max-w-xs sm:max-w-md mx-auto flex items-center gap-2 bg-[#12121a] hover:bg-[#181824] border border-zinc-800/90 hover:border-purple-500/40 px-3.5 py-2 rounded-full cursor-pointer transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <span className="text-zinc-500 text-xs sm:text-sm font-medium select-none truncate">
            ค้นหาสินค้า...
          </span>
        </div>

        {/* Right: Settings / User controls */}
        <div className="flex items-center gap-2 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 sm:p-2.5 bg-[#14141c] hover:bg-[#1c1c28] border border-zinc-800 rounded-xl cursor-pointer transition-colors flex items-center justify-center text-zinc-300 hover:text-white"
                  title="ตั้งค่าและโปรไฟล์"
                >
                  <Settings className="w-5 h-5 text-zinc-300" />
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-52 bg-[#0e0e14] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col font-sans"
                    >
                      <div className="p-3 border-b border-zinc-800 bg-zinc-900/30">
                        <h4 className="font-bold text-white text-[13px] truncate">{currentUser.username}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Smile className="w-3 h-3 text-purple-400" />
                          <span className="text-[9px] font-bold text-purple-400 tracking-wider">MEMBER</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-1.5 font-medium">ยอดเงิน: <span className="text-purple-400 font-bold">฿{(currentUser.balance || 0).toLocaleString()}</span></p>
                      </div>
                      <div className="p-1.5 flex flex-col gap-0.5">
                        <button
                          onClick={() => { onNavigateProfile ? onNavigateProfile('profile') : setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                        >
                          <Settings className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> จัดการโปรไฟล์
                        </button>
                        <button
                          onClick={() => { onNavigateProfile ? onNavigateProfile('purchases') : setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                        >
                          <Box className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> สถานะคำสั่งซื้อ
                        </button>
                        <button
                          onClick={() => { setAppScreen?.("TOPUP"); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                        >
                          <Wallet className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> เติมเงิน
                        </button>
                        <button
                          onClick={() => { onNavigateProfile ? onNavigateProfile('topups') : setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                        >
                          <History className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> ประวัติการเติมเงิน
                        </button>
                        <button
                          onClick={() => { window.open('https://discord.gg/AQKtJpvyva', '_blank'); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                        >
                          <Phone className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> ติดต่อเรา
                        </button>
                        <button
                          onClick={() => { if (onLogout) onLogout(); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors text-[12px] font-medium group mt-1 border-t border-zinc-800 pt-2"
                        >
                          <LogOut className="w-3.5 h-3.5 text-red-500 group-hover:text-red-500 transition-colors" /> ออกจากระบบ
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="p-2 sm:p-2.5 bg-[#14141c] hover:bg-[#1c1c28] border border-zinc-800 rounded-xl cursor-pointer transition-colors flex items-center justify-center text-zinc-300 hover:text-white"
              title="เข้าสู่ระบบ"
            >
              <Settings className="w-5 h-5 text-zinc-300" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};


