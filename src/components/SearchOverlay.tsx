import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChevronRight } from "lucide-react";
import { StockItem } from "../types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
  onSearchSubmit: (val: string) => void;
  items: StockItem[];
  onItemClick?: (item: StockItem) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  initialSearch = "",
  onSearchSubmit,
  items,
  onItemClick,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localSearch, setLocalSearch] = useState(initialSearch);

  useEffect(() => {
    if (isOpen) {
      setLocalSearch(initialSearch);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, initialSearch, onClose]);

  const searchResults = items.filter((it) => {
    if (!localSearch) return true;
    const q = localSearch.toLowerCase().trim();
    return (
      (it.name || "").toLowerCase().includes(q) ||
      (it.category || "").toLowerCase().includes(q) ||
      (it.description || "").toLowerCase().includes(q)
    );
  });

  // Take top 5 results for preview
  const displayResults = searchResults.slice(0, 5);

  const handleViewAll = () => {
    onSearchSubmit(localSearch);
    onClose();
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearchSubmit("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col pt-16 px-4 items-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Area */}
            <div className="p-4 pb-2">
              <div className="relative flex items-center bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="pl-4">
                  <Search className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleViewAll();
                    }
                  }}
                  placeholder="ค้นหาสินค้าจากชื่อ..."
                  className="w-full bg-transparent border-none outline-none py-3 px-4 text-base text-zinc-100 placeholder-zinc-500 font-sans"
                />
                {localSearch && (
                  <button
                    onClick={handleClear}
                    className="p-2 mr-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results Area */}
            {localSearch && (
              <div className="px-4 py-2 border-t border-white/10">
                <div className="text-sm text-zinc-400 font-medium mb-3">
                  ค้นพบ {searchResults.length} รายการ
                </div>

                <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
                  {displayResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onItemClick?.(item)}
                      className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-colors text-left w-full group"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <Search className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-zinc-100 font-bold text-base truncate group-hover:text-indigo-400 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-zinc-500 text-sm truncate">
                          {item.category}
                        </div>
                      </div>
                      <div className="text-white font-bold text-lg pr-2">
                        ฿{item.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 pb-2 flex justify-center">
                    <button
                      onClick={handleViewAll}
                      className="text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors flex items-center gap-1"
                    >
                      ดูทั้งหมดในร้านค้า <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {searchResults.length === 0 && (
                  <div className="py-8 text-center text-zinc-500 text-sm">
                    ไม่พบสินค้าที่ค้นหา
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
