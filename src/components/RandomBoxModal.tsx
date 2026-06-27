import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Copy,
  Check,
  ShoppingCart,
  Minus,
  Plus,
  Box,
  ArrowLeft,
  Info,
  Share2,
} from "lucide-react";
import { StockItem } from "../types";

interface RandomBoxModalProps {
  item: StockItem | null;
  onClose: () => void;
  onBuy?: (item: StockItem, quantity: number) => void;
  isProcessing?: boolean;
}

export const RandomBoxModal: React.FC<RandomBoxModalProps> = ({
  item,
  onClose,
  onBuy,
  isProcessing = false,
}) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);
  const pressTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setCopied(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [item]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (pressTimeout.current) clearTimeout(pressTimeout.current);
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  if (!item) return null;

  const validQuantity =
    typeof quantity === "string" ? parseInt(quantity) || 1 : quantity;
  const totalPrice = item.price * validQuantity;
  
  // Calculate discount and savings correctly
  const originalPrice =
    item.originalPrice && item.originalPrice > item.price
      ? item.originalPrice
      : undefined;
      
  const saveAmountPerItem = originalPrice ? originalPrice - item.price : 0;
  
  let discountPercentage = 0;
  if (originalPrice) {
    discountPercentage = Math.round(
      ((originalPrice - item.price) / originalPrice) * 100,
    );
  }

  const handleStep = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      let current = typeof prev === "string" ? parseInt(prev) : prev;
      if (isNaN(current)) current = 1;
      if (type === "inc") return Math.min(item.quantity, current + 1);
      if (type === "dec") return Math.max(1, current - 1);
      return current;
    });
  };

  const startAutoStep = (type: "inc" | "dec") => {
    handleStep(type);
    let speed = 250;
    const nextTick = () => {
      pressTimeout.current = setTimeout(() => {
        setQuantity((prev) => {
          let current = typeof prev === "string" ? parseInt(prev) : prev;
          if (isNaN(current)) current = 1;
          if (type === "inc" && current >= item.quantity) {
            if (pressTimeout.current) clearTimeout(pressTimeout.current);
            return current;
          }
          if (type === "dec" && current <= 1) {
            if (pressTimeout.current) clearTimeout(pressTimeout.current);
            return current;
          }

          const nextVal =
            type === "inc"
              ? Math.min(item.quantity, current + 1)
              : Math.max(1, current - 1);
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.name,
          text: `ลองดู ${item.name} สิ!`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  };

  const handlePurchase = () => {
    const finalQuantity = Math.max(
      1,
      typeof quantity === "string" ? parseInt(quantity) || 1 : quantity,
    );
    setQuantity(finalQuantity); // Auto lock-in

    if (onBuy) {
      onBuy(item, finalQuantity);
    } else {
      const purchaseMessage = `🛒 [กล่องสุ่ม] ${item.game || "ASTD"}
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-4xl mx-auto flex flex-col justify-start text-white pb-8 px-4"
    >
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between mb-6 pt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span
            className="text-[#0ea5e9] cursor-pointer hover:underline"
            onClick={onClose}
          >
            หน้าหลัก
          </span>
          <span className="text-[#0ea5e9]">&gt;</span>
          <span className="text-white uppercase font-medium line-clamp-1 max-w-[150px]">
            {item.name}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0ea5e9] text-white hover:bg-blue-400 transition-colors shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Product Image */}
        <div className="w-full md:w-1/2 relative flex justify-center mb-6 md:mb-0 h-fit">
          {item.imageUrls?.[0] || item.imageUrl ? (
            <img
              src={item.imageUrls?.[0] || item.imageUrl}
              alt={item.name}
              className="w-full h-auto rounded-2xl object-cover shadow-2xl border border-white/5"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center">
              <Box className="w-16 h-16 text-zinc-600" />
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Title & Share */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h1 className="text-2xl font-black text-[#0ea5e9] uppercase tracking-wide drop-shadow-[0_0_10px_rgba(14,165,233,0.2)] break-words">
              {item.name}
            </h1>
            <button
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shrink-0"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="flex mb-3">
              <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                🏷️ ลดราคา {discountPercentage}%
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-2">
            {originalPrice && (
              <span className="text-zinc-500 line-through text-lg font-medium">
                ฿{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-red-500 font-black text-3xl sm:text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              ฿{item.price.toLocaleString()}
            </span>
            <span className="text-zinc-300 font-medium text-sm sm:text-base">บาท / สุ่ม</span>
          </div>

          {/* Savings */}
          {saveAmountPerItem > 0 && (
            <div className="text-emerald-400 text-xs sm:text-sm mb-4 font-medium">
              ประหยัด ฿{saveAmountPerItem.toLocaleString()} ต่อการสุ่ม 1 ครั้ง
            </div>
          )}

          {/* Stock */}
          <div className="text-zinc-400 text-sm mb-6">
            มีสิทธิ์สุ่มทั้งหมด {item.quantity} ครั้ง
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Info className="w-5 h-5 text-[#0ea5e9]" />
              รายละเอียดสินค้า
            </div>
            
            <div className="bg-black/20 border border-white/5 p-4 rounded-xl text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap mb-4">
              {item.description || <span className="text-zinc-500 italic">ไม่มีคำอธิบายเพิ่มเติม</span>}
            </div>
            
            {/* Warning Section */}
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-red-400 font-bold text-sm">
                🚨 โปรดอ่านก่อนสั่งซื้อ! 🚨
              </p>
              <p className="text-zinc-300 text-sm">
                💰 เมื่อได้ตัวละคร ให้ทักแอดมินตามช่องทางที่กำหนดเพื่อรับของรางวัล
              </p>
              <ul className="text-zinc-400 space-y-1 ml-4 list-disc marker:text-[#0ea5e9] text-sm">
                <li>มีเกลือ (โอกาสไม่ได้ของแรร์)</li>
                <li>ลุ้นรับของรางวัลสุดแรร์ ✨</li>
              </ul>
              <p className="mt-2 text-amber-400 font-bold bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-xs">
                ⚠️ แค่กดสั่งซื้อ ระบบจะสุ่มรางวัลให้ทันที
              </p>
              <p className="mt-2 text-red-400 font-bold text-xs">
                ‼️ หากลูกค้าได้รับชื่อตัวละครที่ได้จากการสุ่ม ให้เเคปส่งให้เจ้าของสินค้าได้เลย
              </p>
              <p className="mt-2 text-emerald-400 font-bold text-xs flex items-start gap-1">
                <span className="text-sm">✅</span> เมื่อได้ข้อความ ทักแอดมินทางเพจเพื่อรับของรางวัล
              </p>
            </div>
          </div>

          {/* Quantity Selector & Action Button */}
          <div className="flex flex-col gap-4 mt-2">
            {item.quantity > 0 && (
              <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex flex-col">
                  <span className="text-white font-bold">จำนวนที่สุ่ม</span>
                  <span className="text-zinc-500 text-xs">เหลือ {item.quantity} สิทธิ์</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onMouseDown={() => startAutoStep("dec")}
                    onMouseUp={stopAutoStep}
                    onMouseLeave={stopAutoStep}
                    onTouchStart={() => startAutoStep("dec")}
                    onTouchEnd={stopAutoStep}
                    disabled={validQuantity <= 1}
                    className="w-8 h-8 flex items-center justify-center bg-black/40 border border-white/10 text-white rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={item.quantity}
                    value={quantity}
                    onBlur={() => {
                      let current =
                        typeof quantity === "string" ? parseInt(quantity) : quantity;
                      if (isNaN(current) || current < 1) current = 1;
                      if (current > item.quantity) current = item.quantity;
                      setQuantity(current);
                    }}
                    onChange={(e) => {
                      const valStr = e.target.value;
                      if (valStr === "") {
                        setQuantity("");
                      } else {
                        const val = parseInt(valStr);
                        if (!isNaN(val)) {
                          setQuantity(Math.min(item.quantity, val));
                        }
                      }
                    }}
                    className="w-12 h-8 bg-transparent border border-[#0ea5e9] text-center text-white text-sm font-bold rounded focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]"
                  />
                  <button
                    type="button"
                    onMouseDown={() => startAutoStep("inc")}
                    onMouseUp={stopAutoStep}
                    onMouseLeave={stopAutoStep}
                    onTouchStart={() => startAutoStep("inc")}
                    onTouchEnd={stopAutoStep}
                    disabled={validQuantity >= item.quantity}
                    className="w-8 h-8 flex items-center justify-center bg-black/40 border border-white/10 text-white rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setQuantity(item.quantity)}
                    disabled={validQuantity >= item.quantity}
                    className="h-8 px-2 flex items-center justify-center bg-[#0ea5e9]/20 border border-[#0ea5e9]/50 text-[#0ea5e9] text-xs font-bold rounded hover:bg-[#0ea5e9]/30 disabled:opacity-50 transition-colors"
                  >
                    MAX
                  </button>
                </div>
              </div>
            )}

            {item.quantity === 0 ? (
              <button
                disabled
                className="w-full bg-zinc-800/50 text-zinc-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-sm sm:text-base border border-white/5"
              >
                <ShoppingCart className="w-4 h-4" /> สินค้าหมดแล้ว
              </button>
            ) : (
              <motion.button
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                onClick={isProcessing ? undefined : handlePurchase}
                disabled={isProcessing}
                className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] text-sm sm:text-base ${
                  isProcessing
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                    : "bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-600 border-t-white rounded-full animate-spin shrink-0"></div>
                    กำลังทำรายการ...
                  </>
                ) : copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    คัดลอกข้อความแล้ว!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {onBuy
                      ? `สุ่มเลย (฿${(item.price * validQuantity).toLocaleString()})`
                      : "คัดลอกคำสั่งซื้อ"}
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
