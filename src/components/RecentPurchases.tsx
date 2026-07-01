import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { StockItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { parseUTCDate } from '../utils/date';

export const RecentPurchases: React.FC<{ appScreen: string, items: StockItem[] }> = ({ appScreen, items }) => {
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const seventyTwoHoursAgo = new Date();
      seventyTwoHoursAgo.setHours(seventyTwoHoursAgo.getHours() - 72);

      let query = supabase.from('purchases')
        .select('id, username, item_name, price, created_at, game');

      // Optional: Filter by game if needed
      // if (appScreen !== 'SHOP') query = query.eq('game', appScreen);

      const { data } = await query
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data) {
        // Map created_at to timestamp to match UI props expected later or just use the data
        setPurchases(data.map(p => ({ ...p, timestamp: p.created_at })));
      }
    };
    
    loadData();
    window.addEventListener('sync-update', loadData);

    const channel = supabase
      .channel('purchases_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'purchases' },
        (payload) => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('sync-update', loadData);
      supabase.removeChannel(channel);
    };
  }, [appScreen]);

  const maskName = (name: string) => {
    if (!name) return 'Unknown';
    if (name.length <= 2) return name + '***';
    return name[0] + '****' + name[name.length - 1];
  };

  const getTimeAgo = (isoString: string) => {
    const d = parseUTCDate(isoString);
    const minDiff = Math.floor((Date.now() - d.getTime()) / 60000);
    if (minDiff < 1) return 'เมื่อสักครู่';
    if (minDiff < 60) return `${minDiff} นาทีที่แล้ว`;
    if (minDiff < 1440) return `${Math.floor(minDiff/60)} ชม.ที่แล้ว`;
    return `${Math.floor(minDiff/1440)} วันที่แล้ว`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full mb-6 relative px-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <h2 className="text-sm font-bold text-zinc-300 font-sans tracking-tight">รายการสั่งซื้อล่าสุด</h2>
      </div>

      <div className="overflow-hidden pb-4 pt-2 w-full relative">
        <AnimatePresence mode="wait">
          {purchases.length > 0 ? (
            <motion.div 
              key="has-purchases"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-3 w-max animate-marquee-slow hover:[animation-play-state:paused]">
                {[...purchases, ...purchases, ...purchases, ...purchases].map((p, i) => {
                  const item = items.find(it => it.name === p.item_name);
                  const imgSrc = item?.imageUrls?.[0] || item?.imageUrl || '';
                 
                  return (
                    <motion.div 
                      key={`${p.id || i}-${i}`}
                      whileHover={{ scale: 1.03, y: -4, rotate: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex-shrink-0 w-[240px] bg-zinc-900/60 border border-white/5 rounded-2xl p-3 flex items-center gap-3 relative overflow-hidden shadow-lg backdrop-blur-md hover:bg-zinc-800/80 cursor-pointer"
                    >
                     {imgSrc ? (
                       <img src={imgSrc} alt="" className="w-[48px] h-[48px] rounded-xl object-contain bg-black/40 p-1 shrink-0" />
                     ) : (
                       <div className="w-[48px] h-[48px] rounded-xl bg-zinc-800/80 flex items-center justify-center shrink-0">
                          <span className="text-xl">📦</span>
                       </div>
                     )}
                     <div className="flex flex-col flex-1 min-w-0 pr-1">
                        <span className="text-[13px] font-bold text-white truncate w-full block">{p.item_name}</span>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-zinc-500 font-medium">
                           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                           <span>{maskName(p.username)}</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-end shrink-0 justify-center">
                        <span className="text-[#0ea5e9] font-black text-[15px]">฿{p.price?.toLocaleString() || 0}</span>
                        <span className="text-[10px] text-zinc-500 font-medium whitespace-nowrap mt-0.5">{getTimeAgo(p.timestamp)}</span>
                     </div>
                  </motion.div>
                );
              })}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="w-full text-center py-10 bg-zinc-900/30 rounded-2xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="text-4xl mb-3 opacity-80"
              >
                👻
              </motion.div>
              <span className="text-sm text-zinc-400 font-medium block">ยังไม่มีรายการสั่งซื้อล่าสุด</span>
              <span className="text-[11px] text-zinc-600 font-medium mt-1 block">เป็นคนแรกที่สั่งซื้อสินค้าสิ!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
