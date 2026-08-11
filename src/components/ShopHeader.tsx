import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Menu, LogIn, User, CircleDollarSign, Home, ShoppingBag, Wallet, LogOut, Gamepad2, Settings, Box, History, Phone, Smile } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useRef, useEffect } from 'react';
import { MarqueeAnnouncement } from './MarqueeAnnouncement';

export const ShopHeader = ({ toggleSidebar, onSearchToggle, currentUser, onLoginClick, onRegisterClick, onLogout, setAppScreen, currentScreen, globalStats, onLogoClick }: { toggleSidebar: () => void, onSearchToggle: () => void, currentUser: any, onLoginClick: () => void, onRegisterClick?: () => void, onLogout?: () => void, setAppScreen?: (screen: string) => void, currentScreen?: string, globalStats?: any, onLogoClick?: () => void }) => {
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
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onLogoClick || (() => setAppScreen?.("SHOP"))}>
            {/* Logo Placeholder */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-blue-900/40 flex items-center justify-center bg-transparent overflow-hidden shrink-0 relative">
              {globalStats?.announcement_settings?.shopLogoUrl && (
                <img 
                  src={globalStats.announcement_settings.shopLogoUrl} 
                  alt="Logo" 
                  onLoad={() => setIsLogoLoaded(true)}
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isLogoLoaded ? 'opacity-100' : 'opacity-0'}`} 
                />
              )}
            </div>
            <span className="text-zinc-100 font-bold tracking-tight hidden sm:block">STORE</span>
          </div>

          <nav className="hidden md:flex flex-1 items-center gap-1 ml-4 bg-zinc-800/50 p-1 rounded-full border border-zinc-700/50">
            <button 
              onClick={() => setAppScreen?.("SHOP")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentScreen === "SHOP" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
            >
              <Home className="w-4 h-4" />
              หน้าหลัก
            </button>
            <button 
              onClick={() => setAppScreen?.("SHOP")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentScreen === "PRODUCTS" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
            >
              <ShoppingBag className="w-4 h-4" />
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
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentScreen === "TOPUP" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
            >
              <Wallet className="w-4 h-4" />
              เติมเงิน
            </button>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "เปิดให้บริการให้เร็วๆนี้", type: "info" } }));
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentScreen === "GAMETOPUP" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
            >
              <Gamepad2 className="w-4 h-4" />
              รับเติมเกม
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onSearchToggle} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-900/20 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="h-5 w-[1px] bg-zinc-700 hidden sm:block mx-1"></div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-2 py-1.5 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 overflow-hidden border border-white/5">
                    {currentUser.avatar_url || currentUser.avatar ? (
                      <img src={currentUser.avatar_url || currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-52 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col font-sans"
                    >
                      <div className="p-3 border-b border-white/5 bg-zinc-900/30">
                        <h4 className="font-bold text-white text-[13px] truncate">{currentUser.username}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Smile className="w-3 h-3 text-zinc-400" />
                          <span className="text-[9px] font-bold text-zinc-400 tracking-wider">MEMBER</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-1.5 font-medium">ยอดเงิน: <span className="text-white">฿{(currentUser.balance || 0).toLocaleString()}</span></p>
                      </div>
                      <div className="p-1.5 flex flex-col gap-0.5">
                        <button 
                          onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                        >
                          <Settings className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> จัดการโปรไฟล์
                        </button>
                        <button 
                          onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
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
                          onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
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
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors text-[12px] font-medium group mt-1 border-t border-white/5 pt-2"
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
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">เข้าสู่ระบบ</span>
            </button>
          )}

          <button onClick={toggleSidebar} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-900/20 rounded-full transition-colors relative md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};


