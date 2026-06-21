import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Menu, LogIn, User, CircleDollarSign, Home, ShoppingBag, Wallet } from 'lucide-react';
import { MarqueeAnnouncement } from './MarqueeAnnouncement';

export const ShopHeader = ({ toggleSidebar, onSearchToggle, currentUser, onLoginClick, setAppScreen, currentScreen, globalStats }: { toggleSidebar: () => void, onSearchToggle: () => void, currentUser: any, onLoginClick: () => void, setAppScreen?: (screen: string) => void, currentScreen?: string, globalStats?: any }) => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 flex flex-col"
    >
      <MarqueeAnnouncement appScreen={currentScreen || 'SHOP'} />
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAppScreen?.("SHOP")}>
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
              onClick={() => setAppScreen?.("TOPUP")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentScreen === "TOPUP" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
            >
              <Wallet className="w-4 h-4" />
              เติมเงิน
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onSearchToggle} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-900/20 rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="h-5 w-[1px] bg-zinc-700 hidden sm:block mx-1"></div>

          {currentUser ? (
            <div 
              onClick={() => setAppScreen?.("PROFILE")}
              className="flex items-center gap-3 bg-blue-900/20 border border-blue-900/40 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-zinc-200">{currentUser.username}</span>
                <span className="text-[10px] text-[#0ea5e9] font-semibold">ยอดคงเหลือ: ฿{(currentUser.balance || 0).toLocaleString()}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                {currentUser.avatar_url || currentUser.avatar ? (
                  <img src={currentUser.avatar_url || currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
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

