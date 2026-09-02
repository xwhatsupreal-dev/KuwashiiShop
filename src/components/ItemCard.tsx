import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2, Package, ShoppingCart, Flame, Star, X, Briefcase, Plus, Minus } from 'lucide-react';
import { StockItem } from '../types';

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

  const hasDiscount = Boolean(item.originalPrice && item.originalPrice > item.price);
  const discountAmount = hasDiscount ? (item.originalPrice! - item.price) : 0;
  const isOutOfStock = item.quantity === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "50px 0px 50px 0px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group relative flex flex-col justify-between bg-[#0d0d12] hover:bg-[#121218] transition-all duration-300 border border-zinc-800/80 hover:border-purple-500/50 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-lg hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)] overflow-hidden text-left"
      id={`item-card-${item.id}`}
    >
      {/* Top Image Container */}
      <div
        className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 flex items-center justify-center cursor-pointer group/carousel"
        onClick={(e) => {
          e.stopPropagation();
          onInquire(item);
        }}
      >
        {(item.imageUrls && item.imageUrls.length > 0) || item.imageUrl ? (
          <>
            <img
              src={
                item.imageUrls && item.imageUrls.length > 0
                  ? item.imageUrls[currentImageIndex]
                  : item.imageUrl!
              }
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? item.imageUrls!.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
                >
                  &lsaquo;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === item.imageUrls!.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
                >
                  &rsaquo;
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {item.imageUrls.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i === currentImageIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
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

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none z-10">
          <div className="flex flex-col gap-1 items-start">
            {item.isPinned && (
              <div className="bg-black/80 backdrop-blur-md text-amber-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] sm:text-xs border border-amber-500/30 shadow-md">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>แนะนำ</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 items-end">
            {(item.isPopular || item.isPinned) && (
              <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-black px-2 py-0.5 rounded-md text-[10px] sm:text-xs flex items-center gap-1 shadow-lg shadow-orange-600/40 border border-orange-400/40 animate-pulse">
                <span className="tracking-wider">HOT</span>
                <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-200" />
              </div>
            )}
          </div>
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1.5 z-20">
            <div className="w-12 h-12 bg-red-600/90 border border-red-400/40 rounded-full flex items-center justify-center shadow-2xl">
              <X className="w-6 h-6 text-white stroke-[3.5]" />
            </div>
            <span className="text-white font-black text-xs tracking-wide uppercase bg-black/60 px-2.5 py-0.5 rounded-md border border-white/10">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col pt-2.5 pb-1 flex-1 justify-between">
        {/* Title: Left-aligned matching screenshot */}
        <h3
          className="font-medium text-sm sm:text-base text-zinc-200 text-left line-clamp-1 truncate tracking-tight mb-1 px-0.5 group-hover:text-purple-300 transition-colors"
          title={item.name}
        >
          {item.name}
        </h3>

        {/* Price & Discount Display */}
        <div className="flex items-center justify-center gap-1.5 min-h-[26px] my-1">
          {hasDiscount ? (
            <>
              <span className="text-[#ff2b42] font-black text-base sm:text-lg tracking-tight">
                {item.price.toLocaleString()}฿
              </span>
              <span className="text-zinc-500 font-normal text-xs sm:text-sm line-through">
                {item.originalPrice!.toLocaleString()}฿
              </span>
              <span className="bg-[#ff203a] text-white font-black text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md shadow-sm">
                -{discountAmount.toLocaleString()}฿
              </span>
            </>
          ) : (
            <span className="text-[#a855f7] font-black text-base sm:text-lg tracking-tight">
              {item.price.toLocaleString()}฿
            </span>
          )}
        </div>

        {/* Action Button: สั่งซื้อ 🛒 */}
        {isAdmin ? (
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex items-center justify-between gap-1 bg-zinc-900 border border-zinc-700/50 rounded-xl p-1">
              <button
                type="button"
                onClick={() => onQuickQuantityChange(item.id, -1)}
                disabled={item.quantity <= 0}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-40 font-bold transition-colors cursor-pointer text-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-center font-bold text-xs text-white">
                คงเหลือ {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuickQuantityChange(item.id, 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 font-bold transition-colors cursor-pointer text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="py-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>แก้ไข</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="py-2 rounded-xl border border-red-900/50 bg-red-950/30 hover:bg-red-900/40 text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบ</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInquire(item);
            }}
            disabled={isOutOfStock}
            className={`w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 mt-1 relative overflow-hidden group/btn cursor-pointer active:scale-[0.98] ${
              isOutOfStock
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed shadow-none'
                : 'bg-[#25103a] hover:bg-[#381658] border border-purple-500/30 text-[#c084fc] hover:text-white shadow-md shadow-purple-950/50 hover:shadow-purple-900/40'
            }`}
          >
            <span>{isOutOfStock ? 'สินค้าหมด' : 'สั่งซื้อ'}</span>
            {!isOutOfStock && (
              <ShoppingCart className="w-4 h-4 text-[#c084fc] group-hover/btn:text-white transition-colors" />
            )}
          </button>
        )}

        {/* Stock Info Footer */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5 text-zinc-400 text-xs font-medium">
          <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
          <span>คงเหลือ {item.quantity} ชิ้น</span>
        </div>
      </div>
    </motion.div>
  );
};

