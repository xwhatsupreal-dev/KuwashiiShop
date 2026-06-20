import React from 'react';
import { motion } from 'motion/react';
import { Users, Layers, Package, CheckSquare } from 'lucide-react';

export const ShopBanner = ({ globalStats, items = [] }: { globalStats: any, items?: any[] }) => {
  const categoriesCount = new Set(items.map(i => i.category)).size;
  const availableItemsCount = items.filter(i => i.quantity > 0).length;
  const soldItemsCount = globalStats?.total_purchases || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-900"
    >
      {/* Top Info section */}
      <div className="px-4 py-6 max-w-7xl mx-auto flex items-start gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-900/40 flex items-center justify-center bg-zinc-900 flex-shrink-0 overflow-hidden shadow-sm">
          <img src="https://img1.pic.in.th/images/1000109791.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#0088ff] uppercase tracking-wide">Kuwashii Shop</h1>
          <p className="text-sm text-zinc-400 mt-1 leading-snug">
            Kuwashii Shop จำหน่ายสินค้าเเมพ&เกมต่างๆ สะดวกใช้งานง่าย รับประกันได้ของ100%
          </p>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-sm font-medium border border-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-800">สินค้ายอดฮิต</button>
            <button className="px-4 py-2 text-sm font-medium border border-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-800">ติดต่อแอดมิน</button>
          </div>
        </div>
      </div>

      {/* Main Banner Image */}
      <div className="px-4 max-w-7xl mx-auto mb-6">
        <div className="w-full h-32 sm:h-48 rounded-xl overflow-hidden relative">
          <img src="https://img1.pic.in.th/images/1000109791.png" alt="Banner" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 max-w-7xl mx-auto mb-6 grid grid-cols-2 gap-3">
        <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-zinc-900">
          <Users className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
          <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">ผู้ใช้งานทั้งหมด</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-2xl font-bold text-zinc-100">{globalStats?.user_count || '0'}</span>
            <span className="text-xs text-zinc-400">คน</span>
          </div>
        </div>

        <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-zinc-900">
          <Layers className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
          <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">จำนวนหมวดหมู่</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-2xl font-bold text-zinc-100">{categoriesCount}</span>
            <span className="text-xs text-zinc-400">หมวด</span>
          </div>
        </div>

        <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-zinc-900">
          <Package className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
          <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">สินค้าพร้อมจำหน่าย</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-2xl font-bold text-zinc-100">{availableItemsCount}</span>
            <span className="text-xs text-zinc-400">ชิ้น</span>
          </div>
        </div>

        <div className="border border-cyan-300 rounded-xl p-4 flex flex-col relative overflow-hidden bg-zinc-900">
          <CheckSquare className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-100/60 stroke-[1.5px]" />
          <span className="text-xs font-semibold text-zinc-400 mb-1 z-10">จำหน่ายไปแล้ว</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-2xl font-bold text-zinc-100">{soldItemsCount.toLocaleString()}</span>
            <span className="text-xs text-zinc-400">ครั้ง</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
