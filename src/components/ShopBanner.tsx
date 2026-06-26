import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Layers, Package, CheckSquare, Wallet } from 'lucide-react';

export const ShopBanner = ({ globalStats, items = [] }: { globalStats: any, items?: any[] }) => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  const settings = globalStats?.announcement_settings || {} as any;
  const configuredCategories = settings.categories || [];
  const categoriesCount = configuredCategories.length > 0 
    ? configuredCategories.length 
    : new Set(items.map(i => i.category)).size;
  
  const availableItemsCount = items.filter(i => i.quantity > 0).length;
  const soldItemsCount = globalStats?.total_purchases || 0;
  const totalTopupCount = globalStats?.total_topups || 0;
  
  const shopLogoUrl = settings.shopLogoUrl || '';
  const shopBannerUrl = settings.shopBannerUrl || '';
  
  const showStatsBlock = settings.showStatsBlock !== false;
  const showStatUsers = settings.showStatUsers !== false;
  const showStatCategories = settings.showStatCategories !== false;
  const showStatItems = settings.showStatItems !== false;
  const showStatSold = settings.showStatSold !== false;
  const showStatTopup = settings.showStatTopup !== false;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-transparent"
    >
      {/* Top Info section */}
      <div className="px-4 py-6 max-w-7xl mx-auto flex items-start gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-900/40 flex items-center justify-center bg-transparent flex-shrink-0 overflow-hidden shadow-sm relative">
          {shopLogoUrl && (
            <img 
              src={shopLogoUrl} 
              alt="Logo" 
              onLoad={() => setIsLogoLoaded(true)}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isLogoLoaded ? 'opacity-100' : 'opacity-0'}`} 
            />
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#0088ff] uppercase tracking-wide">Kuwashii Shop</h1>
          <p className="text-sm text-zinc-400 mt-1 leading-snug">
            Kuwashii Shop จำหน่ายสินค้าเเมพ&เกมต่างๆ สะดวกใช้งานง่าย รับประกันได้ของ100%
          </p>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-sm font-medium border border-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors cursor-default">สินค้ายอดฮิต</button>
            <button onClick={() => window.open('https://discord.gg/AQKtJpvyva', '_blank')} className="px-4 py-2 text-sm font-medium border border-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors">ติดต่อแอดมิน</button>
          </div>
        </div>
      </div>

      {/* Main Banner Image */}
      <div className="px-4 max-w-7xl mx-auto mb-6">
        <div className="w-full h-32 sm:h-48 rounded-xl overflow-hidden relative border border-white/5 bg-transparent">
          {shopBannerUrl && (
            <img 
              src={shopBannerUrl} 
              alt="Banner" 
              onLoad={() => setIsBannerLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isBannerLoaded ? 'opacity-100' : 'opacity-0'}`} 
            />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      {showStatsBlock && (
        <div className="px-4 max-w-7xl mx-auto mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {showStatUsers && (
            <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-black/60">
              <Users className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
              <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">ผู้ใช้งานทั้งหมด</span>
              <div className="flex items-baseline gap-1 z-10">
                <span className="text-2xl font-bold text-zinc-100">{globalStats?.user_count || '0'}</span>
                <span className="text-xs text-zinc-400">คน</span>
              </div>
            </div>
          )}

          {showStatCategories && (
            <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-black/60">
              <Layers className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
              <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">จำนวนหมวดหมู่</span>
              <div className="flex items-baseline gap-1 z-10">
                <span className="text-2xl font-bold text-zinc-100">{categoriesCount}</span>
                <span className="text-xs text-zinc-400">หมวด</span>
              </div>
            </div>
          )}

          {showStatItems && (
            <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-black/60">
              <Package className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
              <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">สินค้าพร้อมจำหน่าย</span>
              <div className="flex items-baseline gap-1 z-10">
                <span className="text-2xl font-bold text-zinc-100">{availableItemsCount}</span>
                <span className="text-xs text-zinc-400">ชิ้น</span>
              </div>
            </div>
          )}

          {showStatSold && (
            <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-black/60">
              <CheckSquare className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
              <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">จำหน่ายไปแล้ว</span>
              <div className="flex items-baseline gap-1 z-10">
                <span className="text-2xl font-bold text-zinc-100">{soldItemsCount.toLocaleString()}</span>
                <span className="text-xs text-zinc-400">ครั้ง</span>
              </div>
            </div>
          )}

          {showStatTopup && (
            <div className="border border-amber-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-black/60">
              <Wallet className="absolute -right-2 -bottom-2 w-16 h-16 text-amber-100/60 stroke-[1.5px]" />
              <span className="text-xs font-semibold text-amber-400 mb-1 z-10">ยอดเติมทั้งหมด</span>
              <div className="flex items-baseline gap-1 z-10">
                <span className="text-2xl font-bold text-zinc-100">{totalTopupCount.toLocaleString()}</span>
                <span className="text-xs text-zinc-400">บาท</span>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
