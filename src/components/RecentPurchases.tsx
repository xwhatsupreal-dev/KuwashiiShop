import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { StockItem } from '../types';

export const RecentPurchases: React.FC<{ appScreen: string, items: StockItem[] }> = ({ appScreen, items }) => {
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      let query = supabase.from('activities')
        .select('*')
        .eq('type', 'purchase');

      // Optional: Filter by game if needed
      // if (appScreen !== 'SHOP') query = query.eq('game', appScreen);

      const { data } = await query
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (data) {
        setPurchases(data);
      }
    };
    
    loadData();
    window.addEventListener('sync-update', loadData);
    return () => window.removeEventListener('sync-update', loadData);
  }, [appScreen]);

  if (purchases.length === 0) return null;

  const maskName = (name: string) => {
    if (!name) return 'Unknown';
    if (name.length <= 2) return name + '***';
    return name[0] + '****' + name[name.length - 1];
  };

  const getTimeAgo = (isoString: string) => {
    const timeStr = isoString.endsWith('Z') || isoString.includes('+') ? isoString : `${isoString}Z`;
    const minDiff = Math.floor((Date.now() - new Date(timeStr).getTime()) / 60000);
    if (minDiff < 1) return 'เมื่อสักครู่';
    if (minDiff < 60) return `${minDiff} นาทีที่แล้ว`;
    if (minDiff < 1440) return `${Math.floor(minDiff/60)} ชม.ที่แล้ว`;
    return `${Math.floor(minDiff/1440)} วันที่แล้ว`;
  };

  return (
    <div className="w-full mb-6 relative px-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <h2 className="text-sm font-bold text-zinc-300 font-sans tracking-tight">รายการสั่งซื้อล่าสุด</h2>
      </div>

      <div className="overflow-hidden pb-4 pt-1 w-full relative">
        <div className="flex gap-3 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...purchases, ...purchases, ...purchases, ...purchases].map((p, i) => {
            const item = items.find(it => it.name === p.item_name);
            const imgSrc = item?.imageUrls?.[0] || item?.imageUrl || '';
           
            return (
              <div key={`${p.id || i}-${i}`} className="flex-shrink-0 w-[240px] bg-zinc-900/60 border border-white/5 rounded-2xl p-3 flex items-center gap-3 relative overflow-hidden shadow-lg backdrop-blur-md hover:bg-zinc-800/60 transition-colors">
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
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
