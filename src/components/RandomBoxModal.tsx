import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, ShoppingCart, Minus, Plus, Box, ArrowLeft } from 'lucide-react';
import { StockItem } from '../types';

interface RandomBoxModalProps {
  item: StockItem | null;
  onClose: () => void;
  onBuy?: (item: StockItem, quantity: number) => void;
  isProcessing?: boolean;
}

export const RandomBoxModal: React.FC<RandomBoxModalProps> = ({ item, onClose, onBuy, isProcessing = false }) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);
  const pressTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setCopied(false);
    }
  }, [item]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (pressTimeout.current) clearTimeout(pressTimeout.current);
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  if (!item) return null;

  const validQuantity = typeof quantity === 'string' ? parseInt(quantity) || 1 : quantity;
  const totalPrice = item.price * validQuantity;

  const handleStep = (type: 'inc' | 'dec') => {
    setQuantity(prev => {
      let current = typeof prev === 'string' ? parseInt(prev) : prev;
      if (isNaN(current)) current = 1;
      if (type === 'inc') return Math.min(item.quantity, current + 1);
      if (type === 'dec') return Math.max(1, current - 1);
      return current;
    });
  };

  const startAutoStep = (type: 'inc' | 'dec') => {
    handleStep(type);
    let speed = 250;
    const nextTick = () => {
      pressTimeout.current = setTimeout(() => {
        setQuantity(prev => {
          let current = typeof prev === 'string' ? parseInt(prev) : prev;
          if (isNaN(current)) current = 1;
          if (type === 'inc' && current >= item.quantity) {
             if (pressTimeout.current) clearTimeout(pressTimeout.current);
             return current;
          }
          if (type === 'dec' && current <= 1) {
             if (pressTimeout.current) clearTimeout(pressTimeout.current);
             return current;
          }
          
          const nextVal = type === 'inc' ? Math.min(item.quantity, current + 1) : Math.max(1, current - 1);
          return nextVal;
        });
        speed = Math.max(30, speed * 0.85); // Accelerate
        nextTick();
      }, speed);
    };
    
    pressTimeout.current = setTimeout(() => {
        nextTick();
    }, 400); // initial delay before repeat
  };

  const stopAutoStep = () => {
    if (pressTimeout.current) clearTimeout(pressTimeout.current);
  };

  const handlePurchase = () => {
    const finalQuantity = Math.max(1, typeof quantity === 'string' ? parseInt(quantity) || 1 : quantity);
    setQuantity(finalQuantity); // Auto lock-in
    
    if (onBuy) {
      onBuy(item, finalQuantity);
    } else {
      const purchaseMessage = `🛒 [กล่องสุ่ม] ${item.game || 'ASTD'}
   • สินค้า: ${item.name}
   • จำนวน: ${finalQuantity} กล่อง
   • ราคารวม: ฿${(item.price * finalQuantity).toLocaleString()} บาท
   💬 โปรดสุ่มและแจ้งมอบรางวัล (ติดต่อแอดมิน)`;
      navigator.clipboard.writeText(purchaseMessage);
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
              <span className="text-zinc-400">สุ่มรางวัล</span>
              <span className="text-zinc-600">&gt;</span>
              <span className="text-white uppercase truncate max-w-[150px] sm:max-w-max flex-1">{item.name}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide bg-black pb-[90px]">
            <div className="flex flex-col w-full">
              
              {/* Image Section */}
              <div className="w-full relative bg-zinc-950 border-b border-white/5 flex items-center justify-center p-6 aspect-[4/3] overflow-hidden">
                 {(item.imageUrls?.[0] || item.imageUrl) ? (
                   <img 
                     src={item.imageUrls?.[0] || item.imageUrl} 
                     alt={item.name} 
                     className="w-full max-w-[240px] aspect-[4/5] object-contain object-center rounded-2xl drop-shadow-lg" 
                   />
                 ) : (
                   <div className="w-full max-w-[240px] bg-zinc-900 flex items-center justify-center rounded-2xl aspect-[4/5]">
                     <Box className="w-16 h-16 text-zinc-800" />
                   </div>
                 )}
              </div>

              {/* Details Section */}
              <div className="w-full flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#0ea5e9] tracking-tight uppercase leading-tight font-display break-words shadow-[#0ea5e9]/10 drop-shadow-sm">
                    {item.name}
                  </h2>
                  <div className="bg-[#121212] border border-white/5 p-3.5 rounded-xl shadow-inner mt-1">
                    <span className="text-zinc-500 font-sans text-xs font-bold tracking-tight">💰 ราคา <span className="text-zinc-300">/ สุ่ม</span></span>
                    <div className="text-3xl font-black text-amber-500 font-sans tracking-tighter mt-1 drop-shadow-sm">฿{item.price.toLocaleString()}</div>
                    <div className="text-[11px] text-zinc-500 mt-2 font-medium tracking-tight">สต๊อกสุ่มเหลือ <strong className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">{item.quantity}</strong> หน่วย</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-3 bg-zinc-900/30 p-4 sm:p-5 rounded-[1.25rem] border border-zinc-800/50">
                  <div className="text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                    {item.description /* custom description here */}
                    {item.description && <div className="h-px bg-zinc-800 my-4" />}
                    
                    {/* Additional Images */}
                    {item.imageUrls && item.imageUrls.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2 font-sans">📸 รูปภาพเพิ่มเติม:</span>
                        <div className="flex flex-col gap-3">
                          {item.imageUrls.map((url, idx) => (
                            <div key={idx} className="w-full rounded-lg overflow-hidden border border-zinc-850 bg-zinc-950">
                              <img src={url} alt={`Additional ${idx+1}`} referrerPolicy="no-referrer" className="w-full h-auto object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <>
                      <p className="text-red-400 font-bold mb-2">🚨 โปรดอ่านก่อนสั่งซื้อ! 🚨</p>
                      <p className="mt-1.5">💰 เมื่อได้ตัวละคร ให้ทักแอดมินตามช่องทางที่กำหนดเพื่อรับของรางวัล</p>
                      <ul className="mt-1.5 text-zinc-500 space-y-1 ml-4 list-disc">
                        <li>มีเกลือ (โอกาสไม่ได้ของแรร์)</li>
                        <li>ลุ้นรับของรางวัลสุดแรร์ ✨</li>
                      </ul>
                      <p className="mt-4 text-amber-400 font-bold bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 text-xs sm:text-sm">
                        ⚠️ แค่กดสั่งซื้อ ระบบจะสุ่มรางวัลให้ทันที
                      </p>
                      <p className="mt-3 text-red-500 font-bold text-xs sm:text-sm">
                        ‼️ หากลูกค้าได้รับชื่อตัวละครที่ได้จากการสุ่ม ให้เเคปส่งให้เจ้าของสินค้าได้เลย
                      </p>
                      <p className="mt-3 text-emerald-400 font-bold text-xs sm:text-sm flex items-start gap-1">
                        <span className="text-sm">✅</span> เมื่อได้ข้อความ ทักแอดมินทางเพจเพื่อรับของรางวัล
                      </p>
                    </>
                  </div>
                </div>


                <div className="absolute bottom-0 left-0 right-0 w-full bg-[#0a0a0a] border-t border-zinc-800 px-4 pt-3 pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-10 box-border">
                  {/* Quantity selector */}
                  {item.quantity > 0 && (
                    <div className="flex flex-col gap-2.5 pb-3">
                       <span className="text-[#0ea5e9] font-bold text-xs sm:text-sm font-sans flex items-center gap-1.5">
                         <ShoppingCart className="w-3.5 h-3.5" /> เลือกจำนวนสุ่ม
                       </span>
                       <div className="flex items-center gap-2 h-10 w-full">
                         <motion.button whileTap={{ scale: 0.95 }}
                           type="button"
                           onMouseDown={() => startAutoStep('dec')}
                           onMouseUp={stopAutoStep}
                           onMouseLeave={stopAutoStep}
                           onTouchStart={() => startAutoStep('dec')}
                           onTouchEnd={stopAutoStep}
                           disabled={validQuantity <= 1}
                           className="w-12 h-10 flex-shrink-0 flex items-center justify-center bg-zinc-900 text-zinc-400 rounded-lg hover:bg-zinc-800 hover:text-white active:scale-95 disabled:opacity-50 transition-all border border-zinc-800 cursor-pointer select-none"
                         >
                           <Minus className="w-4 h-4 stroke-[2]" />
                         </motion.button>
                         
                         <input 
                           type="number"
                           min={1}
                           max={item.quantity}
                           value={quantity}
                           onBlur={() => {
                             let current = typeof quantity === 'string' ? parseInt(quantity) : quantity;
                             if (isNaN(current) || current < 1) current = 1;
                             if (current > item.quantity) current = item.quantity;
                             setQuantity(current);
                           }}
                           onChange={(e) => {
                             const valStr = e.target.value;
                             if (valStr === '') {
                                 setQuantity('');
                             } else {
                                 const val = parseInt(valStr);
                                 if (!isNaN(val)) {
                                     setQuantity(Math.min(item.quantity, val));
                                 }
                             }
                           }}
                           className="flex-1 h-full text-center bg-zinc-950 border-y border-zinc-800 font-bold text-base text-white focus:outline-none focus:border-[#0ea5e9]/50"
                         />

                         <motion.button whileTap={{ scale: 0.95 }}
                           type="button"
                           onMouseDown={() => startAutoStep('inc')}
                           onMouseUp={stopAutoStep}
                           onMouseLeave={stopAutoStep}
                           onTouchStart={() => startAutoStep('inc')}
                           onTouchEnd={stopAutoStep}
                           disabled={validQuantity >= item.quantity}
                           className="w-12 h-10 flex-shrink-0 flex items-center justify-center bg-zinc-900 text-zinc-400 rounded-lg hover:bg-zinc-800 hover:text-white active:scale-95 disabled:opacity-50 transition-all border border-zinc-800 cursor-pointer select-none"
                         >
                           <Plus className="w-4 h-4 stroke-[2]" />
                         </motion.button>
                       </div>
                    </div>
                  )}

                  {/* Buy button */}
                  {item.quantity === 0 ? (
                    <button disabled className="bg-zinc-900/50 text-zinc-500 font-bold py-3 rounded-xl w-full flex items-center justify-center gap-2 border border-white/5 cursor-not-allowed text-sm">
                       <ShoppingCart className="w-4 h-4" /> สินค้าหมดแล้ว
                    </button>
                  ) : (
                    <motion.button 
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      onClick={isProcessing ? undefined : handlePurchase}
                      disabled={isProcessing}
                      className={`font-bold py-3 rounded-xl w-full flex items-center justify-center gap-2 transition-all shadow-lg text-sm sm:text-base ${isProcessing ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700' : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20'}`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin shrink-0"></div>
                          กำลังทำรายการ...
                        </>
                      ) : copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          คัดลอกข้อความแล้ว!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 fill-zinc-950" />
                          {onBuy ? `สุ่มเลย (${(item.price * validQuantity).toLocaleString()} บาท)` : 'คัดลอกคำสั่งซื้อ'}
                        </>
                      )}
                    </motion.button>
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
