import React, { useState } from "react";
import {
  Gamepad2,
  Home,
  ShoppingBag,
  Wallet,
  History,
  ShieldCheck,
  BookOpen,
  FileText,
  MessageSquare,
  Facebook,
  Sparkles,
  Zap,
  ChevronRight,
  Package,
  Layers,
  Search,
  ExternalLink,
  Gift,
  HelpCircle,
} from "lucide-react";

interface ShopFooterProps {
  appScreen?: string;
  setAppScreen: (screen: string) => void;
  setSelectedCategory: (cat: string) => void;
  categories?: any[];
  items?: any[];
  currentUser?: any;
  onLoginClick: () => void;
  onNavigateProfile?: (tab: "profile" | "purchases" | "topups") => void;
  onOpenWarranty: () => void;
  onOpenHowToBuy: () => void;
  onOpenTos: () => void;
  onSearchToggle?: () => void;
  globalStats?: any;
}

export const ShopFooter: React.FC<ShopFooterProps> = ({
  appScreen,
  setAppScreen,
  setSelectedCategory,
  categories = [],
  items = [],
  currentUser,
  onLoginClick,
  onNavigateProfile,
  onOpenWarranty,
  onOpenHowToBuy,
  onOpenTos,
  onSearchToggle,
  globalStats,
}) => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const shopSettings = globalStats?.announcement_settings || {};
  const shopLogoUrl = shopSettings.shopLogoUrl || "";
  const shopTitle = shopSettings.shopName || "KUWASHII SHOP";
  const discordUrl = "https://discord.gg/AQKtJpvyva";
  const facebookUrl = shopSettings.contactLink || "https://facebook.com";

  // Derive categories from settings or existing stock
  const dynamicCategories: string[] = React.useMemo(() => {
    const list: string[] = [];
    if (shopSettings.categories && Array.isArray(shopSettings.categories)) {
      shopSettings.categories.forEach((c: any) => {
        if (c.title && !list.includes(c.title)) list.push(c.title);
      });
    }
    if (items && Array.isArray(items)) {
      items.forEach((it) => {
        if (it.category && !list.includes(it.category)) list.push(it.category);
      });
    }
    // If empty, supply default known shop categories
    if (list.length === 0) {
      list.push("ขายรหัส", "ไอเทมเกม", "กล่องสุ่ม");
    }
    return list;
  }, [shopSettings.categories, items]);

  const handleNavToShop = (category: string = "all") => {
    setSelectedCategory(category);
    setAppScreen("SHOP");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavToTopup = () => {
    if (!currentUser) {
      onLoginClick();
    } else {
      setAppScreen("TOPUP");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavToProfile = (tab: "profile" | "purchases" | "topups") => {
    if (!currentUser) {
      onLoginClick();
    } else {
      if (onNavigateProfile) {
        onNavigateProfile(tab);
      } else {
        setAppScreen("PROFILE");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-auto w-full relative z-10 border-t border-purple-500/20 bg-gradient-to-b from-[#0e0e18]/95 via-[#0a0a12]/98 to-[#050508] backdrop-blur-2xl text-zinc-300">
      {/* Subtle top glow bar matching the screenshot aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Left: Brand, Logo, Description & Socials */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Logo & Store Title */}
              <div
                onClick={() => handleNavToShop("all")}
                className="flex items-center gap-3.5 cursor-pointer group w-fit"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 via-indigo-900/40 to-black p-1 border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.2)] flex items-center justify-center overflow-hidden shrink-0 group-hover:border-purple-400/60 transition-all duration-300">
                  {shopLogoUrl ? (
                    <img
                      src={shopLogoUrl}
                      alt={shopTitle}
                      onLoad={() => setIsLogoLoaded(true)}
                      className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                        isLogoLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : (
                    <Gamepad2 className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-display flex items-center gap-2 group-hover:text-purple-300 transition-colors">
                    {shopTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 tracking-wide uppercase">
                      ระบบเปิดให้บริการอัตโนมัติ 24 ชม.
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagline / Shop Description */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
                Kuwashii Shop ร้านค้าจำหน่ายไอดีเกม ไอเทม และบริการเติมเงินเกมออนไลน์ ด้วยระบบอัตโนมัติ 24 ชั่วโมง รวดเร็ว ปลอดภัย เชื่อถือได้ 100% จัดส่งรหัสทันทีหลังการสั่งซื้อ
              </p>

              {/* Badges / Trust highlights */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold">
                  <Zap className="w-3 h-3 text-purple-400" />
                  จัดส่งออโต้ทันที
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  มีประกันตามเงื่อนไข
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  บริการคุณภาพ
                </span>
              </div>
            </div>

            {/* Social Community Buttons matching screenshot */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                ช่องทางการติดต่อ & ชุมชน
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 border border-[#5865F2]/30 text-[#858ef7] hover:text-white font-bold text-xs transition-all hover:scale-105 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#5865F2]" />
                  <span>Discord ชุมชน</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/30 text-[#549bf8] hover:text-white font-bold text-xs transition-all hover:scale-105 shadow-sm"
                >
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook แฟนเพจ</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Menu Columns (เมนูที่เรามีอยู่) */}
          <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: เมนูลัด / นำทาง */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                <div className="w-1.5 h-4 bg-purple-500 rounded-full" />
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  เมนูลัด
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-zinc-400">
                <li>
                  <button
                    onClick={() => handleNavToShop("all")}
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors w-full text-left py-0.5"
                  >
                    <Home className="w-3.5 h-3.5 text-zinc-500" />
                    <span>หน้าหลัก</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavToShop("all")}
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors w-full text-left py-0.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-zinc-500" />
                    <span>สินค้าทั้งหมด</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleNavToTopup}
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors w-full text-left py-0.5"
                  >
                    <Wallet className="w-3.5 h-3.5 text-zinc-500" />
                    <span>ระบบเติมเงิน</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavToProfile("purchases")}
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors w-full text-left py-0.5"
                  >
                    <History className="w-3.5 h-3.5 text-zinc-500" />
                    <span>ประวัติการสั่งซื้อ</span>
                  </button>
                </li>
                {onSearchToggle && (
                  <li>
                    <button
                      onClick={onSearchToggle}
                      className="flex items-center gap-2 hover:text-purple-300 transition-colors w-full text-left py-0.5"
                    >
                      <Search className="w-3.5 h-3.5 text-zinc-500" />
                      <span>ค้นหาสินค้า</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 2: หมวดหมู่สินค้า */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                <div className="w-1.5 h-4 bg-cyan-500 rounded-full" />
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  หมวดหมู่สินค้า
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-zinc-400">
                {dynamicCategories.slice(0, 5).map((categoryName) => (
                  <li key={categoryName}>
                    <button
                      onClick={() => handleNavToShop(categoryName)}
                      className="flex items-center gap-2 hover:text-cyan-300 transition-colors w-full text-left py-0.5 truncate"
                      title={categoryName}
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{categoryName}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleNavToShop("all")}
                    className="flex items-center gap-2 hover:text-cyan-300 transition-colors w-full text-left py-0.5 text-cyan-400/90 font-bold"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>ดูทุกหมวดหมู่ ({items.length} รายการ)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: ความช่วยเหลือ & เงื่อนไข */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  เงื่อนไข & ช่วยเหลือ
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-zinc-400">
                <li>
                  <button
                    onClick={onOpenWarranty}
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors w-full text-left py-0.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold text-zinc-200">เงื่อนไขการรับประกัน</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenHowToBuy}
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors w-full text-left py-0.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                    <span>วิธีการสั่งซื้อสินค้า</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenTos}
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors w-full text-left py-0.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                    <span>ข้อตกลงการใช้บริการ</span>
                  </button>
                </li>
                <li>
                  <a
                    href={discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors w-full text-left py-0.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                    <span>แจ้งปัญหา & สอบถาม</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => handleNavToProfile("profile")}
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors w-full text-left py-0.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{currentUser ? "จัดการบัญชีของคุณ" : "เข้าสู่ระบบสมาชิก"}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="tracking-wide text-center md:text-left">
            Copyright &copy; 2026 <strong className="font-bold text-zinc-200">{shopTitle}</strong> &middot; สงวนลิขสิทธิ์ทุกประการ
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-zinc-400">
            <button
              onClick={onOpenWarranty}
              className="hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
            >
              นโยบายการรับประกัน
            </button>
            <span className="text-zinc-600">&bull;</span>
            <button
              onClick={onOpenTos}
              className="hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
            >
              เงื่อนไขการให้บริการ
            </button>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400">
              Powered by <span className="font-semibold text-zinc-300">Vercel</span> &middot; Code by <span className="font-semibold text-zinc-300">dis.cord01</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
