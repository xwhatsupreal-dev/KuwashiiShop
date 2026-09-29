import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../supabase';
import { StockItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  User, 
  Package, 
  Search,
  Clock
} from 'lucide-react';
import { parseUTCDate, formatThaiDateTime } from '../utils/date';
import { useScrollLock } from '../useScrollLock';

interface PurchaseItem {
  id: string;
  username: string;
  item_name: string;
  price: number;
  timestamp: string;
  created_at?: string;
  game?: string;
  quantity?: number;
  item_id?: string;
  isMock?: boolean;
}

// Compact, elegant card component with proportional sizing
const PurchaseCard: React.FC<{
  purchase: PurchaseItem;
  matchedItem?: StockItem;
  onSelect: (p: PurchaseItem) => void;
  maskName: (name: string) => string;
  getTimeAgo: (iso: string) => string;
}> = ({ purchase, matchedItem, onSelect, maskName, getTimeAgo }) => {
  const [imgError, setImgError] = useState(false);
  const imgSrc = matchedItem?.imageUrls?.[0] || matchedItem?.imageUrl || '';

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      onClick={() => onSelect(purchase)}
      className="flex-shrink-0 w-[270px] sm:w-[305px] min-h-[84px] sm:min-h-[88px] bg-[#0d0e14]/95 hover:bg-[#131520] border border-white/10 hover:border-amber-500/45 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex items-center gap-2.5 relative overflow-hidden shadow-md hover:shadow-[0_6px_20px_rgba(245,158,11,0.12)] backdrop-blur-xl cursor-pointer group transition-colors duration-200"
    >
      {/* Left Thumbnail (Compact & Sleek) */}
      <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-lg sm:rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 relative flex items-center justify-center">
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={purchase.item_name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 via-zinc-900 to-black flex flex-col items-center justify-center p-1">
            <Package className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)] mb-0.5" />
            <span className="text-[7.5px] text-amber-300/90 font-bold uppercase tracking-wider">สั่งซื้อ</span>
          </div>
        )}
      </div>

      {/* Right Details */}
      <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
        {/* Top row: Badge & Time */}
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/25 tracking-wide shrink-0">
            <ShoppingCart className="w-2.5 h-2.5" />
            สั่งซื้อ
          </span>
          <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">
            {getTimeAgo(purchase.timestamp)}
          </span>
        </div>

        {/* Product Title: Clean readable font with max 2 lines */}
        <h3 className="text-[12px] sm:text-[12.5px] font-bold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-2 leading-tight break-words">
          {purchase.item_name}
        </h3>

        {/* Buyer */}
        <div className="flex items-center gap-1 text-[10.5px] text-zinc-400 font-medium truncate mt-0.5">
          <span className="text-zinc-300 font-semibold">คุณ {maskName(purchase.username)}</span>
          <span className="text-zinc-500">ซื้อสินค้า</span>
        </div>

        {/* Bottom row: Price & Action */}
        <div className="flex items-center justify-between mt-1 pt-0.5 border-t border-white/5">
          <span className="text-amber-400 font-black text-[13px] sm:text-[13.5px] tracking-tight">
            {purchase.price > 0 ? `${purchase.price.toLocaleString()} ฿` : 'ฟรี ฿'}
          </span>
          <span className="text-[10.5px] text-zinc-400 group-hover:text-amber-300 font-medium inline-flex items-center gap-0.5 transition-colors">
            ดูเพิ่มเติม
            <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const RecentPurchases: React.FC<{ appScreen: string; items: StockItem[] }> = ({ appScreen, items }) => {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseItem | null>(null);

  // Lock body scroll when modal is open
  useScrollLock(!!selectedPurchase);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPurchase(null);
      }
    };
    if (selectedPurchase) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPurchase]);

  // Load purchase data from database
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const { data } = await supabase
          .from('purchases')
          .select('id, username, item_name, price, created_at, game, quantity, item_id')
          .order('created_at', { ascending: false })
          .limit(15);

        if (!isMounted) return;

        if (data && data.length > 0) {
          setPurchases(
            data.map((p: any) => ({
              id: p.id || Math.random().toString(),
              username: p.username || 'ผู้ใช้ทั่วไป',
              item_name: p.item_name || 'สินค้า',
              price: parseFloat(p.price) || 0,
              timestamp: p.created_at || new Date().toISOString(),
              game: p.game || appScreen,
              quantity: p.quantity || 1,
              item_id: p.item_id,
              isMock: false
            }))
          );
        } else {
          // If no purchases exist in database yet, generate realistic showcase purchases from active stock
          const now = Date.now();
          const fallbackPurchases: PurchaseItem[] = (items.length > 0 ? items.slice(0, 8) : []).map((it, idx) => {
            const minutesAgo = (idx + 1) * 8 + 5;
            const pastDate = new Date(now - minutesAgo * 60 * 1000).toISOString();
            const sampleUsernames = ['EzReal', 'Thawatchai', 'NongBeam', 'Kaitoon', 'Master99', 'Sompong', 'ProPlayer'];
            return {
              id: `showcase-${it.id || idx}`,
              username: sampleUsernames[idx % sampleUsernames.length],
              item_name: it.name,
              price: it.price || 1,
              timestamp: pastDate,
              game: it.game || appScreen,
              quantity: 1,
              item_id: it.id,
              isMock: true
            };
          });

          if (fallbackPurchases.length > 0) {
            setPurchases(fallbackPurchases);
          }
        }
      } catch (err) {
        console.error('Error loading recent purchases:', err);
      }
    };

    loadData();
    window.addEventListener('sync-update', loadData);

    const channel = supabase
      .channel('recent_purchases_live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'purchases' }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      isMounted = false;
      window.removeEventListener('sync-update', loadData);
      supabase.removeChannel(channel);
    };
  }, [appScreen, items]);

  // Mask username: e.g. "EzReal" -> "Ez•••", "si007n" -> "si•••n"
  const maskName = (name: string) => {
    if (!name) return 'ผู้ใช้ทั่วไป';
    const clean = name.trim();
    if (clean.length <= 2) return clean + '•••';
    if (clean.length <= 4) return clean.slice(0, 2) + '•••';
    return clean.slice(0, 2) + '•••' + clean.slice(-1);
  };

  const getTimeAgo = (isoString: string) => {
    try {
      const d = parseUTCDate(isoString);
      const minDiff = Math.floor((Date.now() - d.getTime()) / 60000);
      if (isNaN(minDiff) || minDiff < 1) return 'เมื่อสักครู่';
      if (minDiff < 60) return `${minDiff} นาทีที่แล้ว`;
      if (minDiff < 1440) return `${Math.floor(minDiff / 60)} ชม. ที่แล้ว`;
      return `${Math.floor(minDiff / 1440)} วันที่แล้ว`;
    } catch {
      return 'เมื่อสักครู่';
    }
  };

  // Find matching item details from store stock
  const getMatchedStockItem = (purchase: PurchaseItem | null) => {
    if (!purchase) return undefined;
    return items.find(
      (it) =>
        (purchase.item_id && it.id === purchase.item_id) ||
        it.name?.trim().toLowerCase() === purchase.item_name?.trim().toLowerCase()
    );
  };

  // Build duplicated list so the CSS marquee runs seamless infinite loop
  // Tuned to slightly slower, smooth speed (~3.6s per item)
  const { displayList, marqueeDuration } = useMemo(() => {
    if (purchases.length === 0) return { displayList: [], marqueeDuration: 28 };
    
    // Ensure base set has at least 8 items for a continuous visual stream
    let baseSet: PurchaseItem[] = [];
    while (baseSet.length < 8) {
      baseSet = [...baseSet, ...purchases];
    }
    if (baseSet.length > 12) {
      baseSet = baseSet.slice(0, 12);
    }
    
    // Duplicate baseSet once for seamless -50% CSS transform loop
    const fullList = [...baseSet, ...baseSet];
    // Slightly slower & comfortable scrolling speed
    const duration = Math.max(26, Math.min(42, Math.round(baseSet.length * 3.6)));

    return { displayList: fullList, marqueeDuration: duration };
  }, [purchases]);

  // Navigate to store item when clicking "ดูสินค้านี้ในร้าน" inside modal
  const handleViewInStore = (item: StockItem) => {
    setSelectedPurchase(null);
    setTimeout(() => {
      const el =
        document.getElementById(`item-card-${item.id}`) ||
        document.getElementById(`item-${item.id}`) ||
        document.querySelector(`[data-item-id="${item.id}"]`);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-black');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-black');
        }, 2400);
      } else {
        const grid = document.querySelector('.item-grid-container') || document.getElementById('shop-items');
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const selectedMatchedItem = useMemo(() => getMatchedStockItem(selectedPurchase), [selectedPurchase, items]);
  const selectedImgSrc = selectedMatchedItem?.imageUrls?.[0] || selectedMatchedItem?.imageUrl || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full mb-5 relative px-3 sm:px-4"
    >
      {/* Self-contained CSS Animation for 100% reliable hardware-accelerated auto-scroll */}
      <style>{`
        @keyframes autoScrollMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .recent-purchases-marquee-track {
          display: flex;
          gap: 0.65rem;
          width: max-content;
          animation: autoScrollMarquee var(--marquee-speed, 32s) linear infinite;
          will-change: transform;
        }
        .recent-purchases-marquee-track:hover,
        .recent-purchases-marquee-track:active {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header section with live pulse indicator (Clean, no arrow buttons) */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </div>
          <h2 className="text-[13.5px] sm:text-[14.5px] font-bold text-zinc-100 font-display tracking-tight flex items-center gap-1.5">
            รายการสั่งซื้อล่าสุด
          </h2>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-semibold text-emerald-400">
            สดเรียลไทม์
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden pb-1 pt-0.5 w-full relative">
        <AnimatePresence mode="wait">
          {purchases.length > 0 ? (
            <motion.div
              key="has-purchases"
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full overflow-hidden"
            >
              {/* Continuous Auto-Scrolling Marquee Track */}
              <div
                className="recent-purchases-marquee-track py-1 select-none"
                style={{ '--marquee-speed': `${marqueeDuration}s` } as React.CSSProperties}
              >
                {displayList.map((p, index) => (
                  <PurchaseCard
                    key={`${p.id}-${index}`}
                    purchase={p}
                    matchedItem={getMatchedStockItem(p)}
                    onSelect={setSelectedPurchase}
                    maskName={maskName}
                    getTimeAgo={getTimeAgo}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center py-6 bg-[#0d0e14]/60 rounded-xl border border-white/5 relative overflow-hidden backdrop-blur-md"
            >
              <Package className="w-8 h-8 text-zinc-600 mx-auto mb-1.5 opacity-60" />
              <span className="text-xs text-zinc-400 font-medium block">ยังไม่มีรายการสั่งซื้อล่าสุด</span>
              <span className="text-[11px] text-zinc-600 font-medium mt-0.5 block">เป็นคนแรกที่สั่งซื้อสินค้าเลย!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Detail Modal (Triggered by clicking card or "ดูเพิ่มเติม →") --- */}
      <AnimatePresence>
        {selectedPurchase && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPurchase(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-[#0e1017] border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.08)] rounded-3xl overflow-hidden flex flex-col max-h-[92vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle top amber glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

              {/* Modal Header */}
              <div className="p-4 sm:p-4.5 border-b border-white/10 flex items-start justify-between gap-3 relative z-10 shrink-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 shadow-inner">
                    <ShoppingCart className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        สั่งซื้อสำเร็จ
                      </span>
                      {selectedPurchase.game && (
                        <span className="text-[9.5px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {selectedPurchase.game}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[14.5px] sm:text-base font-bold text-white leading-snug break-words">
                      {selectedPurchase.item_name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPurchase(null)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors border border-white/5 shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-4 sm:p-4.5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent space-y-3.5">
                {/* Product Showcase Image */}
                <div className="w-full max-w-[240px] sm:max-w-[260px] aspect-square mx-auto rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl relative flex items-center justify-center p-2 group">
                  {selectedImgSrc ? (
                    <img
                      src={selectedImgSrc}
                      alt={selectedPurchase.item_name}
                      className="w-full h-full object-contain rounded-xl drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-zinc-500">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Package className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-medium">รูปภาพสินค้าจากคำสั่งซื้อ</span>
                    </div>
                  )}
                </div>

                {/* Information Breakdown Table */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden text-xs sm:text-[13px]">
                  {/* Buyer */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3">
                    <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      ผู้ซื้อ
                    </span>
                    <span className="text-zinc-100 font-bold flex items-center gap-1.5">
                      คุณ {maskName(selectedPurchase.username)}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </div>

                  {/* Product Name */}
                  <div className="flex items-start justify-between p-2.5 sm:p-3 gap-3">
                    <span className="text-zinc-400 font-medium shrink-0">สินค้า</span>
                    <span className="text-zinc-200 font-semibold text-right break-words max-w-[220px]">
                      {selectedPurchase.item_name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3">
                    <span className="text-zinc-400 font-medium">ราคา</span>
                    <span className="text-amber-400 font-black text-sm">
                      {selectedPurchase.price > 0 ? `${selectedPurchase.price.toLocaleString()} บาท` : 'ฟรี (0.00 บาท)'}
                    </span>
                  </div>

                  {/* Order Type */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3">
                    <span className="text-zinc-400 font-medium">ประเภท</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-zinc-200">
                      <ShoppingCart className="w-3 h-3 text-amber-400" />
                      สั่งซื้อสินค้า
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3 gap-2">
                    <span className="text-zinc-400 font-medium flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      เมื่อไหร่
                    </span>
                    <span className="text-zinc-300 font-medium text-right text-[11px] sm:text-xs">
                      {getTimeAgo(selectedPurchase.timestamp)}{' '}
                      <span className="text-zinc-500">({formatThaiDateTime(selectedPurchase.timestamp)})</span>
                    </span>
                  </div>

                  {/* Total Paid */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3">
                    <span className="text-zinc-400 font-medium">ยอดชำระ</span>
                    <span className="text-white font-bold">
                      {selectedPurchase.price > 0 ? `${selectedPurchase.price.toLocaleString()} ฿` : '0 ฿'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3">
                    <span className="text-zinc-400 font-medium">สถานะ</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      จัดส่งอัตโนมัติสำเร็จ
                    </span>
                  </div>
                </div>

                {/* Privacy & Security Note */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 border border-white/5 text-[10.5px] text-zinc-400">
                  <Search className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>ข้อมูลส่วนตัวถูกปิดบังด้วย ••• เพื่อความปลอดภัย</span>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-3.5 sm:p-4 border-t border-white/10 flex items-center gap-2 bg-black/30 shrink-0">
                {selectedMatchedItem && (
                  <button
                    onClick={() => handleViewInStore(selectedMatchedItem)}
                    className="flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <span>ดูสินค้านี้ในร้าน</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedPurchase(null)}
                  className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-xs sm:text-[13px] transition-all border border-white/5 cursor-pointer"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
