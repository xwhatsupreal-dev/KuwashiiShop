import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Eye, Copy, Check, Info } from 'lucide-react';
import { StockItem } from '../types';

interface InquiryModalProps {
  item: StockItem | null;
  onClose: () => void;
  onBuy?: (item: StockItem, qty: number) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ item, onClose, onBuy }) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setCopied(false);
    }
  }, [item]);

  if (!item) return null;

  const validQuantity = typeof quantity === 'string' ? parseInt(quantity) || 1 : quantity;

  const handleStep = (type: 'inc' | 'dec') => {
    setQuantity(prev => {
      let current = typeof prev === 'string' ? parseInt(prev) : prev;
      if (isNaN(current)) current = 1;
      if (type === 'inc') return Math.min(item.quantity, current + 1);
      if (type === 'dec') return Math.max(1, current - 1);
      return current;
    });
  };

  const totalPrice = item.price * validQuantity;
  const originalPrice = item.originalPrice && item.originalPrice > item.price ? item.originalPrice : undefined;
  const originalTotalPrice = originalPrice ? originalPrice * validQuantity : undefined;
  const saveAmount = originalTotalPrice ? originalTotalPrice - totalPrice : 0;
  let discountPercentage = 0;
  if (originalPrice) {
    discountPercentage = Math.round(((originalPrice - item.price) / originalPrice) * 100);
  }

  const handleAction = () => {
    if (onBuy && item.quantity > 0) {
      onBuy(item, validQuantity);
    } else if (!onBuy && item.quantity > 0) {
      const msg = `🛒 [สั่งซื้อ]\n  • สินค้า: ${item.name}\n  • จำนวน: ${validQuantity} ชิ้น\n  • ราคารวม: ฿${totalPrice.toLocaleString()} บาท\n  💬 ติดต่อแอดมิน: Kuwashii El (Discord)`;
      navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm overflow-hidden flex justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full h-auto max-h-[90dvh] max-w-[460px] bg-black border border-white/10 rounded-[2rem] flex flex-col relative overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 shrink-0 bg-zinc-950/80 sticky top-0 z-50">
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-bold flex-1">
              <span className="text-[#0ea5e9] cursor-pointer hover:underline" onClick={onClose}>หน้าหลัก</span>
              <span className="text-zinc-600">&gt;</span>
              <span className="text-zinc-400">สินค้า</span>
              <span className="text-zinc-600">&gt;</span>
              <span className="text-white uppercase truncate max-w-[150px] sm:max-w-max flex-1">{item.name}</span>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-black pb-[90px]">
            <div className="flex flex-col w-full">
              {/* Image Section */}
              <div className="w-full relative bg-zinc-950 border-b border-white/5 flex items-center justify-center p-6 aspect-[4/3] overflow-hidden">
              {(item.imageUrls?.[0] || item.imageUrl) ? (
                <img 
                  src={item.imageUrls?.[0] || item.imageUrl} 
                  alt={item.name} 
                  className="w-full max-w-[240px] aspect-square object-contain mx-auto rounded-2xl drop-shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full max-w-[280px] aspect-square mx-auto rounded-3xl bg-zinc-900 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-zinc-700" />
                </div>
              )}
              {item.quantity === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                   <div className="bg-red-500 text-white font-bold px-6 py-2 rounded-full text-xl transform -rotate-12 shadow-xl border-2 border-white">
                      สินค้าหมด
                   </div>
                </div>
              )}
            </div>

            {/* Details Section */}
              <div className="w-full flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#0ea5e9] tracking-tight uppercase leading-tight font-display break-words shadow-[#0ea5e9]/10 drop-shadow-sm">
                    {item.name}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    {discountPercentage > 0 && (
                      <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span>🏷️</span> ลดราคา {discountPercentage}%
                      </span>
                    )}
                    <span className="bg-zinc-800 text-zinc-300 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full border border-zinc-700">
                      หมวดหมู่: {item.category || "ทั่วไป"}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-2">
                    {originalPrice && (
                      <span className="text-zinc-500 font-bold text-base sm:text-lg line-through">฿{originalPrice.toLocaleString()}</span>
                    )}
                    <span className={`${discountPercentage > 0 ? 'text-[#ff203a]' : 'text-[#0ea5e9]'} font-black text-2xl sm:text-3xl drop-shadow-sm`}>฿{item.price.toLocaleString()}</span>
                    <span className="text-zinc-400 font-sans text-xs sm:text-sm ml-1">ต่อชิ้น</span>
                  </div>

                  {saveAmount > 0 && (
                    <div className="text-emerald-500 font-medium text-xs sm:text-sm font-sans mt-[-2px]">
                      ประหยัด ฿{saveAmount.toLocaleString()} ต่อชิ้น
                    </div>
                  )}

                  <div className="text-zinc-400 font-sans text-xs sm:text-sm pb-4 border-b border-white/5">
                    มีสินค้าทั้งหมด <strong className="text-white bg-zinc-900 px-1.5 py-0.5 rounded">{item.quantity}</strong> ชิ้นในสต็อก
                  </div>
                </div>

                {/* Quantity Selector */}
                {item.quantity > 0 && (
                  <div className="py-1 flex flex-col gap-2.5 border-b border-white/5 pb-5">
                    <span className="text-[#0ea5e9] font-bold text-xs sm:text-sm font-sans flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> เลือกจำนวนสินค้า
                    </span>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleStep('dec')}
                        disabled={validQuantity <= 1}
                        className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-l-lg hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-zinc-900 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input 
                        type="text"
                        min={1}
                        max={item.quantity}
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if(isNaN(val)) setQuantity("");
                          else setQuantity(Math.min(item.quantity, Math.max(1, val)));
                        }}
                        onBlur={() => {
                          if(quantity === "" || Number(quantity) < 1) setQuantity(1);
                        }}
                        className="w-16 h-10 border-y border-zinc-800 bg-black text-center text-white text-base font-bold focus:outline-none focus:border-[#0ea5e9] transition-colors"
                      />
                      <button 
                        onClick={() => handleStep('inc')}
                        disabled={validQuantity >= item.quantity}
                        className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-r-lg hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-zinc-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="absolute bottom-0 left-0 right-0 w-full bg-[#0a0a0a] border-t border-zinc-800 px-4 pt-3 pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-10 box-border">
                  {item.quantity === 0 ? (
                    <button 
                      disabled
                      className="w-full bg-zinc-900 text-zinc-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-sm sm:text-base border border-zinc-800"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      ดูสินค้า (สินค้าหมด)
                    </button>
                  ) : (
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAction}
                      className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm sm:text-base shadow-lg shadow-[#0ea5e9]/20"
                    >
                      {onBuy ? (
                        <>
                          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                          สั่งซื้อสินค้า (฿{(item.price * validQuantity).toLocaleString()})
                        </>
                      ) : copied ? (
                        <>
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          คัดลอกข้อความแล้ว!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                          คัดลอกคำสั่งซื้อ
                        </>
                      )}
                    </motion.button>
                  )}
                </div>

                {/* Description */}
                <div className="pt-2 pb-10 flex flex-col gap-3 bg-zinc-900/30 p-4 sm:p-5 rounded-[1.25rem] border border-zinc-800/50">
                  <div className="flex items-center gap-1.5 text-[#0ea5e9] font-bold text-xs sm:text-sm font-sans mb-1">
                    <Info className="w-4 h-4" />
                    <span>รายละเอียดสินค้าแบบครบถ้วน</span>
                  </div>
                  {item.description ? (
                    <div className="text-zinc-300 font-sans text-xs sm:text-[13px] leading-relaxed break-words space-y-1.5">
                      {item.description.split('\n').map((line, i) => (
                        <p key={i} className="flex gap-1.5 items-start">
                          {line.startsWith('-') || line.startsWith('•') ? (
                            <>
                              <span className="text-[#0ea5e9] mt-0.5">•</span>
                              <span>{line.replace(/^[-•]\s*/, '')}</span>
                            </>
                          ) : (
                            <span className={i === 0 ? "font-bold text-white text-sm sm:text-base mb-1.5 inline-block leading-snug pt-0.5" : ""}>
                              {i === 0 && <span className="text-red-500 scale-110 rotate-45 inline-block mr-1.5">📌</span>} 
                              {line}
                            </span>
                          )}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="text-zinc-500 font-sans text-xs sm:text-sm p-3 bg-zinc-900 rounded-lg text-center border border-zinc-800/50">ไม่มีคำอธิบายสินค้าเพิ่มเติม</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
