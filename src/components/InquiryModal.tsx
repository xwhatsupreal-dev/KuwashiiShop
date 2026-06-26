import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Eye,
  Copy,
  Check,
  Info,
  Share2,
} from "lucide-react";
import { StockItem } from "../types";

interface InquiryModalProps {
  item: StockItem | null;
  onClose: () => void;
  onBuy?: (item: StockItem, qty: number) => void;
  isProcessing?: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  item,
  onClose,
  onBuy,
  isProcessing = false,
}) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setCopied(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [item]);

  if (!item) return null;

  const validQuantity =
    typeof quantity === "string" ? parseInt(quantity) || 1 : quantity;

  const handleStep = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      let current = typeof prev === "string" ? parseInt(prev) : prev;
      if (isNaN(current)) current = 1;
      if (type === "inc") return Math.min(item.quantity, current + 1);
      if (type === "dec") return Math.max(1, current - 1);
      return current;
    });
  };

  const totalPrice = item.price * validQuantity;
  const originalPrice =
    item.originalPrice && item.originalPrice > item.price
      ? item.originalPrice
      : undefined;
  
  // Calculate savings correctly per item if there's a discount
  const saveAmountPerItem = originalPrice ? originalPrice - item.price : 0;
  
  let discountPercentage = 0;
  if (originalPrice) {
    discountPercentage = Math.round(
      ((originalPrice - item.price) / originalPrice) * 100,
    );
  }

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[360px] mx-auto flex flex-col justify-start text-white pb-8 px-4"
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

      <div className="flex flex-col w-full">
        {/* Product Image */}
        <div className="w-full relative flex justify-center mb-6">
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
              <ShoppingBag className="w-16 h-16 text-zinc-600" />
            </div>
          )}
          {item.quantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px] rounded-2xl">
              <div className="bg-red-500 text-white font-bold px-6 py-2 rounded-full text-xl transform -rotate-12 shadow-xl border-2 border-white/10">
                 สินค้าหมด
              </div>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          {/* Warning Section */}
          <div className="mb-4 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
            <p className="text-red-400 font-bold text-sm mb-1">⚠️ คำเตือนก่อนสั่งซื้อ</p>
            <p className="text-red-400/90 text-xs">อย่าลืมอัดคลิปก่อนสั่งซื้อสินค้า เพื่อจะได้เคลมสินค้านั้นได้ทุกครั้งหากสินค้าที่ได้มาเกิดข้อผิดพลาด</p>
          </div>

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
            <span className="text-zinc-300 font-medium text-sm sm:text-base">ต่อชิ้น</span>
          </div>

          {/* Savings */}
          {saveAmountPerItem > 0 && (
            <div className="text-emerald-400 text-xs sm:text-sm mb-4 font-medium">
              ประหยัด ฿{saveAmountPerItem.toLocaleString()} ต่อชิ้น
            </div>
          )}

          {/* Stock */}
          <div className="text-zinc-400 text-sm mb-6">
            มีสินค้าทั้งหมด {item.quantity} ชิ้น
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Info className="w-5 h-5 text-[#0ea5e9]" />
              รายละเอียดสินค้า
            </div>
            {item.description ? (
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                {item.description}
              </div>
            ) : (
              <div className="text-zinc-500 text-sm italic">
                ไม่มีคำอธิบายสินค้าเพิ่มเติม
              </div>
            )}
          </div>

          {/* Quantity Selector & Action Button */}
          <div className="flex flex-col gap-4 mt-2">
            {item.quantity > 0 && (
              <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex flex-col">
                  <span className="text-white font-bold">จำนวนสินค้า</span>
                  <span className="text-zinc-500 text-xs">เหลือ {item.quantity} ชิ้น</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStep("dec")}
                    disabled={validQuantity <= 1}
                    className="w-8 h-8 flex items-center justify-center bg-black/40 border border-white/10 text-white rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="text"
                    min={1}
                    max={item.quantity}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (isNaN(val)) setQuantity("");
                      else setQuantity(Math.min(item.quantity, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      if (quantity === "" || Number(quantity) < 1) setQuantity(1);
                    }}
                    className="w-12 h-8 bg-transparent border border-[#0ea5e9] text-center text-white text-sm font-bold rounded focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]"
                  />
                  <button
                    onClick={() => handleStep("inc")}
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
                <Eye className="w-4 h-4" />
                ดูสินค้า (สินค้าหมด)
              </button>
            ) : (
              <motion.button
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                onClick={isProcessing ? undefined : handleAction}
                disabled={isProcessing}
                className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
                  isProcessing
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                    : "bg-[#0ea5e9] hover:bg-[#0284c7] text-white cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-600 border-t-white rounded-full animate-spin shrink-0"></div>
                    กำลังทำรายการ...
                  </>
                ) : onBuy ? (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    สั่งซื้อสินค้า (฿{(item.price * validQuantity).toLocaleString()})
                  </>
                ) : copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    คัดลอกข้อความแล้ว!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    คัดลอกคำสั่งซื้อ
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

