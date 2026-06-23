import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2, ShieldAlert, BadgeInfo, Coins, Package, Clock, ShoppingBag, Pin, Flame, Sparkles, Eye, X, Star } from 'lucide-react';
import { StockItem } from '../types';
import { parseUTCDate, formatThaiDate, formatThaiDateTime, formatThaiTime } from '../utils/date';

interface ItemCardProps {
  item: StockItem;
  isAdmin: boolean;
  onEdit: (item: StockItem) => void;
  onDelete: (id: string) => void;
  onQuickQuantityChange: (id: string, delta: number) => void;
  onInquire: (item: StockItem) => void;
  onBuy?: (item: StockItem, qty: number) => void;
  onTogglePin: (id: string) => void;
  appScreen?: string;
  onCategoryClick?: (category: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isAdmin,
  onEdit,
  onDelete,
  onQuickQuantityChange,
  onInquire,
  onBuy,
  onTogglePin,
  appScreen,
  onCategoryClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const getFormatColors = (format?: string) => {
    switch (format) {
      case 'กล่องสุ่ม':
        return {
          bg: 'bg-purple-500/10 border-purple-500/40 text-purple-600',
          badge: 'bg-purple-500 text-zinc-100 shadow-purple-500/50',
          glow: 'epic-glow',
          text: 'text-purple-600',
          border: 'border-purple-500/30 hover:border-purple-500/80',
          gradient: 'from-purple-500/20 via-transparent to-transparent'
        };
      case 'ขายรหัส':
      default:
        return {
          bg: 'bg-blue-900/200/10 border-blue-500/40 text-blue-600',
          badge: 'bg-blue-900/200 text-zinc-100 shadow-blue-500/50',
          glow: 'rare-glow',
          text: 'text-blue-600',
          border: 'border-blue-500/30 hover:border-blue-500/80',
          gradient: 'from-blue-500/20 via-transparent to-transparent'
        };
    }
  };

  const colors = getFormatColors(item.saleFormat);

  // Status computation
  const getStockStatus = (qty: number) => {
    if (qty === 0) return { label: 'สินค้าหมด', color: 'bg-red-500 text-red-400 border-red-500/20' };
    if (qty <= 5) return { label: 'ใกล้หมด', color: 'bg-amber-500 text-amber-400 border-amber-500/20' };
    return { label: 'มีสินค้า', color: 'bg-emerald-500 text-emerald-400 border-emerald-500/20' };
  };

  const status = getStockStatus(item.quantity);

  let discountPercentage = 0;
  if (item.originalPrice && item.originalPrice > item.price) {
    discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
  }

  const getRelativeTimeString = (dateString?: string): string => {
    if (!dateString) return 'ไม่มีการบันทึกข้อมูล';
    try {
      const date = parseUTCDate(dateString);
      if (isNaN(date.getTime())) return 'ไม่มีการบันทึกข้อมูล';
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffSec < 15) return 'เมื่อสักครู่นี้';
      if (diffSec < 60) return 'เมื่อไม่กี่วินาทีก่อน';
      if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`;
      if (diffHr < 24) return `${diffHr} ชั่วโมงที่แล้ว`;
      if (diffDays === 1) return 'เมื่อวานนี้';
      if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
      
      return formatThaiDate(date);
    } catch (e) {
      return 'ไม่มีการบันทึกข้อมูล';
    }
  };

  let formattedDate = 'ไม่มีการบันทึกข้อมูล';
  if (item.updatedAt) {
    formattedDate = formatThaiDateTime(item.updatedAt);
  }

  const relativeTime = getRelativeTimeString(item.updatedAt);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col justify-between bg-[#0B0B0B] transition-all duration-300 border border-white/5 rounded-[16px] hover:border-[#0ea5e9]/50 hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.15)] overflow-hidden text-left"
      id={`item-card-${item.id}`}
    >
      {/* Item Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#0A0A0A] flex items-center justify-center group/carousel cursor-pointer border-b border-white/5" onClick={(e) => { e.stopPropagation(); if(onBuy && item.quantity > 0) onInquire(item); }}>
        {(item.imageUrls && item.imageUrls.length > 0) || item.imageUrl ? (
          <>
            <img
              src={item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[currentImageIndex] : item.imageUrl!}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {item.imageUrls && item.imageUrls.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? item.imageUrls!.length - 1 : prev - 1); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                >
                  &lsaquo;
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === item.imageUrls!.length - 1 ? 0 : prev + 1); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                >
                  &rsaquo;
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {item.imageUrls.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center p-3">
            <Package className="w-10 h-10 text-zinc-700 mb-2" />
          </div>
        )}

        {/* Overlay Gradient for readability */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start pointer-events-none z-10">
          <div className="flex gap-1.5 flex-col items-start">
            <div className="flex gap-1.5 flex-wrap max-w-[80%]">
                {item.isPinned && (
                  <div className="bg-black/80 text-yellow-400 font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-sm border border-yellow-500/20">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-sans tracking-wide">แนะนำ</span>
                  </div>
                )}
                {item.isPopular && (
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-400 font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg border border-orange-500/20 backdrop-blur-sm">
                    <Flame className="w-3 h-3 fill-orange-400 text-orange-400" />
                    <span className="text-[10px] font-sans tracking-wide">ยอดฮิต</span>
                  </div>
                )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            {discountPercentage > 0 && (
              <div className="bg-[#ff203a] text-white font-black px-2 py-1 rounded-[20px] shadow-lg flex items-center justify-center">
                 <span className="text-[11px] sm:text-xs tracking-tight">-{discountPercentage}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Absolute Overlay if Out of Stock */}
        {item.quantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="w-14 h-14 bg-[#ff203a] rounded-full flex items-center justify-center shadow-2xl">
              <X className="w-7 h-7 text-white stroke-[4]" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col bg-transparent flex-1 relative z-10">
        {/* Glow effect in the background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#0ea5e9]/10 transition-colors" />

        {/* Title */}
        <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-tight mb-2 line-clamp-2 min-h-[40px] group-hover:text-[#0ea5e9] transition-colors relative z-10">
          {item.name}
        </h3>

        {/* Category & Badge */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2 relative z-10">
           <span className="inline-block px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 text-[10px] uppercase font-medium rounded-sm">{item.category}</span>
           {item.saleFormat && (
             <span className={`inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded-sm ${colors.bg}`}>{item.saleFormat}</span>
           )}
        </div>

        {/* Price & Stock Section */}
        <div className="flex items-end justify-between border-t border-white/5 pt-2 mt-auto mb-3 relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-bold tracking-wide mb-0.5">ราคา</span>
            <div className="flex items-baseline gap-1.5 min-h-[24px]">
               <span className={`${discountPercentage > 0 ? 'text-[#ff203a]' : 'text-white'} font-black text-lg sm:text-xl tracking-tighter`}>฿{item.price.toLocaleString()}</span>
               {item.originalPrice && item.originalPrice > item.price && (
                 <span className="text-zinc-600 font-bold text-xs sm:text-sm line-through">฿{item.originalPrice.toLocaleString()}</span>
               )}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-zinc-500 font-bold tracking-wide mb-0.5">คงเหลือ</span>
             <span className="text-white font-black text-sm sm:text-base tracking-tighter">{item.quantity}</span>
          </div>
        </div>

        {/* Action Button */}
        {isAdmin ? (
          <div className="flex flex-col gap-2 mt-1 relative z-10 w-full">
            <div className="flex items-center justify-between gap-2 bg-zinc-900 border border-zinc-700/50 rounded-lg p-1.5 shadow-inner">
              <div className="flex items-center gap-1 mx-auto">
                <button
                  type="button"
                  onClick={() => onQuickQuantityChange(item.id, -1)}
                  disabled={item.quantity <= 0}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-40 font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-white">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuickQuantityChange(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 font-bold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-zinc-700 hover:border-zinc-500 shadow-sm"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>แก้ไข</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="py-2.5 rounded-lg border border-red-900/50 bg-red-950/30 text-red-500 text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-red-950/60 hover:text-red-400 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบ</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onInquire(item)}
            disabled={item.quantity === 0}
            className={`w-full py-2 sm:py-2.5 rounded-xl font-bold font-mono tracking-wide text-xs transition-all flex items-center justify-center gap-2 mt-1 relative overflow-hidden group/btn z-10 ${
              item.quantity === 0
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 shadow-none cursor-not-allowed'
                : 'bg-white text-black hover:bg-zinc-200 cursor-pointer active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]'
            }`}
          >
            {item.quantity !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-out" />
            )}
            <ShoppingBag className="w-4 h-4 z-10 relative" />
            <span className="z-10 relative">{item.quantity === 0 ? 'สินค้าหมด' : 'ดูสินค้า'}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
