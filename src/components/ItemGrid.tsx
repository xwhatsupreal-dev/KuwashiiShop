import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Inbox, CheckCircle2, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { StockItem } from "../types";
import { ItemCard } from "./ItemCard";
import { ItemCardSkeleton } from "./ItemCardSkeleton";

interface ItemGridProps {
  items: StockItem[];
  isLoadingStock: boolean;
  isAdmin: boolean;
  appScreen?: string;
  search?: string;
  onEdit: (item: StockItem) => void;
  onDelete: (id: string) => void;
  onQuickQuantityChange: (id: string, delta: number) => void;
  onInquire: (item: StockItem) => void;
  onBuy?: (item: StockItem, qty: number) => void;
  onTogglePin: (id: string) => void;
  onCategoryClick: (category: string) => void;
  onResetSearch?: () => void;
}

const INITIAL_BATCH_SIZE = 24; // Divisible by 2, 3, 4, 6 columns
const BATCH_INCREMENT = 12; // Divisible by 2, 3, 4, 6 columns

/**
 * LazyCardObserver wraps an ItemCard and only mounts the full card when
 * it enters within 250px of the viewport to keep scroll frame rates at 60fps.
 */
const LazyCardObserver: React.FC<{
  item: StockItem;
  isAdmin: boolean;
  appScreen?: string;
  onEdit: (item: StockItem) => void;
  onDelete: (id: string) => void;
  onQuickQuantityChange: (id: string, delta: number) => void;
  onInquire: (item: StockItem) => void;
  onBuy?: (item: StockItem, qty: number) => void;
  onTogglePin: (id: string) => void;
  onCategoryClick: (category: string) => void;
}> = ({
  item,
  isAdmin,
  appScreen,
  onEdit,
  onDelete,
  onQuickQuantityChange,
  onInquire,
  onBuy,
  onTogglePin,
  onCategoryClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "300px 0px", // Preload 300px before scrolling into view
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[280px] sm:min-h-[340px] flex flex-col"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "0 340px",
      }}
    >
      {isVisible ? (
        <ItemCard
          item={item}
          isAdmin={isAdmin}
          appScreen={appScreen}
          onEdit={onEdit}
          onDelete={onDelete}
          onQuickQuantityChange={onQuickQuantityChange}
          onInquire={onInquire}
          onBuy={onBuy}
          onTogglePin={onTogglePin}
          onCategoryClick={onCategoryClick}
        />
      ) : (
        <ItemCardSkeleton />
      )}
    </div>
  );
};

export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  isLoadingStock,
  isAdmin,
  appScreen,
  search = "",
  onEdit,
  onDelete,
  onQuickQuantityChange,
  onInquire,
  onBuy,
  onTogglePin,
  onCategoryClick,
  onResetSearch,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset visible items count whenever search query or item collection changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
    setIsLoadingMore(false);
  }, [items.length, search]);

  const loadMoreItems = useCallback(() => {
    if (visibleCount >= items.length || isLoadingMore) return;

    setIsLoadingMore(true);
    // Smooth micro-tick to let browser render skeletons seamlessly
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, items.length));
      setIsLoadingMore(false);
    }, 120);
  }, [visibleCount, items.length, isLoadingMore]);

  // IntersectionObserver on the sentinel element at the bottom of the grid
  useEffect(() => {
    if (visibleCount >= items.length) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisibleCount(items.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: "450px 0px", // Trigger loading 450px before reaching the end of list
        threshold: 0.05,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [visibleCount, items.length, isLoadingMore, loadMoreItems]);

  // Initial loading state
  if (isLoadingStock) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <ItemCardSkeleton key={`item-grid-skel-${idx}`} />
        ))}
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-zinc-900/80 border border-zinc-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
        <Inbox className="w-16 h-16 text-purple-500/50 mx-auto mb-4 animate-bounce" />
        <h2 className="text-lg font-black text-zinc-100 mb-2 uppercase tracking-wide">
          {search ? `ไม่พบสินค้าสำหรับ "${search}"` : "ไม่พบสินค้าในสต๊อก"}
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          {search
            ? "ลองตรวจสอบตัวสะกด ค้นหาด้วยคำอื่น หรือกลับไปดูสินค้าทั้งหมด"
            : "ขณะนี้ยังไม่มีสินค้าวางจำหน่ายในหมวดหมู่นี้ กรุณาตรวจสอบใหม่อีกครั้งในภายหลัง"}
        </p>
        {search && onResetSearch && (
          <button
            onClick={onResetSearch}
            className="mt-5 px-5 py-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            ล้างคำค้นหา & ดูสินค้าทั้งหมด
          </button>
        )}
      </div>
    );
  }

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const remainingCount = items.length - visibleCount;

  return (
    <div className="flex flex-col gap-6">
      {/* Responsive Item Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {displayedItems.map((item) => (
          <LazyCardObserver
            key={item.id}
            item={item}
            isAdmin={isAdmin}
            appScreen={appScreen}
            onEdit={onEdit}
            onDelete={onDelete}
            onQuickQuantityChange={onQuickQuantityChange}
            onInquire={onInquire}
            onBuy={onBuy}
            onTogglePin={onTogglePin}
            onCategoryClick={onCategoryClick}
          />
        ))}

        {/* Skeleton placeholders while lazy loading next batch */}
        {isLoadingMore &&
          Array.from({ length: Math.min(6, remainingCount) }).map((_, idx) => (
            <ItemCardSkeleton key={`lazy-skel-batch-${idx}`} />
          ))}
      </div>

      {/* Intersection Observer Sentinel */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="w-full flex flex-col items-center justify-center py-6 gap-3"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-purple-400/90 bg-purple-950/40 border border-purple-800/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>กำลังโหลดสินค้าเพิ่มเติมอย่างราบรื่น...</span>
          </div>

          {/* Fallback button in case user wants to manually click to load faster */}
          <button
            onClick={loadMoreItems}
            className="text-xs text-zinc-400 hover:text-zinc-200 underline decoration-zinc-700 hover:decoration-zinc-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            โหลดเพิ่มอีก {Math.min(BATCH_INCREMENT, remainingCount)} รายการ ({remainingCount} รายการที่เหลือ)
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* End of List indicator */}
      {!hasMore && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex items-center justify-center py-8"
        >
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#13111c] border border-purple-500/20 text-xs text-zinc-400 shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              แสดงสินค้าทั้งหมดแล้ว <span className="font-bold text-zinc-200">{items.length}</span> รายการ
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
