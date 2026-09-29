import React from "react";
import { Home, ShoppingBag, Zap, History, User, Menu } from "lucide-react";

interface MobileBottomNavProps {
  currentScreen?: string;
  setAppScreen: (screen: string) => void;
  setSelectedCategory: (cat: string) => void;
  currentUser?: any;
  onLoginClick: () => void;
  onNavigateProfile?: (tab: "profile" | "purchases" | "topups") => void;
  onOpenDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen = "SHOP",
  setAppScreen,
  setSelectedCategory,
  currentUser,
  onLoginClick,
  onNavigateProfile,
  onOpenDrawer,
}) => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d15]/95 backdrop-blur-xl border-t border-purple-500/20 px-3 py-1.5 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
      {/* 1. Home */}
      <button
        onClick={() => {
          setSelectedCategory("all");
          setAppScreen("SHOP");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
          currentScreen === "SHOP"
            ? "text-purple-400 font-bold"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">หน้าแรก</span>
      </button>

      {/* 2. All Products */}
      <button
        onClick={() => {
          setSelectedCategory("all");
          setAppScreen("SHOP");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">สินค้า</span>
      </button>

      {/* 3. Topup (Elevated highlight button) */}
      <button
        onClick={() => {
          if (!currentUser) {
            onLoginClick();
          } else {
            setAppScreen("TOPUP");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="relative -top-3 flex flex-col items-center group cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-600/40 group-hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#12121c] flex items-center justify-center group-hover:bg-opacity-80 transition-colors">
            <Zap className="w-6 h-6 text-purple-300 fill-purple-400/30" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-purple-300 mt-0.5">เติมเงิน</span>
      </button>

      {/* 4. History */}
      <button
        onClick={() => {
          if (!currentUser) {
            onLoginClick();
          } else {
            if (onNavigateProfile) {
              onNavigateProfile("purchases");
            } else {
              setAppScreen("PROFILE");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
      >
        <History className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">ประวัติ</span>
      </button>

      {/* 5. Menu / Profile */}
      <button
        onClick={() => {
          if (currentUser) {
            if (onNavigateProfile) {
              onNavigateProfile("profile");
            } else {
              setAppScreen("PROFILE");
            }
          } else {
            onOpenDrawer();
          }
        }}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
          currentScreen === "PROFILE"
            ? "text-purple-400 font-bold"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        {currentUser ? (
          <>
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] truncate max-w-[42px]">{currentUser.username}</span>
          </>
        ) : (
          <>
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">เมนู</span>
          </>
        )}
      </button>
    </nav>
  );
};
