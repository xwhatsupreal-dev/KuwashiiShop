import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, History, ShoppingCart, PackageOpen, Calendar, Clock, Sparkles, DollarSign, ChevronDown, ChevronUp, MessageCircle, Copy, Search, ShoppingBag, ChevronLeft } from 'lucide-react';
import { PurchaseRecord, TopupRecord } from '../types';
import { fetchUserPurchases, fetchUserTopups } from '../queries';
import { formatThaiDate, formatThaiTime } from '../utils/date';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  initialTab?: 'purchases' | 'topups';
  items?: any[];
}

export function HistoryModal({ isOpen, onClose, username, initialTab = 'purchases', items = [] }: HistoryModalProps) {
  const [activeTab, setActiveTab] = useState<'purchases' | 'topups'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  const [expandedPurchases, setExpandedPurchases] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [topups, setTopups] = useState<TopupRecord[]>([]);

  useEffect(() => {
    const loadData = () => {
      if (isOpen && username) {
        fetchUserPurchases(username).then(data => {
          if (data) setPurchases(data);
        });
        fetchUserTopups(username).then(data => {
          if (data) setTopups(data);
        });
      }
    };
    
    loadData();
    
    const handleSync = () => {
       if (isOpen) loadData();
    };
    window.addEventListener('sync-update', handleSync);
    return () => window.removeEventListener('sync-update', handleSync);
  }, [isOpen, username]);

  if (!isOpen) return null;

  // Sort by date, newest first
  const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sortedTopups = [...topups].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filteredPurchases = sortedPurchases.filter(p => !searchTerm || p.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 "
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#121215] rounded-t-[2rem] sm:rounded-3xl mt-12 sm:mt-0 shadow-2xl p-4 sm:p-6 w-full sm:max-w-2xl relative z-10 flex flex-col h-[calc(100dvh-3rem)] sm:h-auto sm:max-h-[85dvh]"
        >
          <div className="flex justify-between items-start mb-6 shrink-0 pt-2 sm:pt-0">
            <div>
              <h3 className="font-display text-2xl font-bold text-zinc-100 mb-1">ประวัติรายการ</h3>
              <p className="text-sm text-zinc-400">ติดตามรายการสั่งซื้อและประวัติทั้งหมด</p>
            </div>
            <button 
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-zinc-400 hover:text-zinc-100 bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" /> กลับโปรไฟล์
            </button>
          </div>

          <div className="flex gap-6 mb-4 border-b border-white/10 shrink-0 overflow-x-auto scrollbar-none">
            <button 
              onClick={() => setActiveTab('purchases')}
              className={`pb-3 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap ${activeTab === 'purchases' ? 'text-[#0ca5e9] border-[#0ca5e9]' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
            >
              สินค้าปกติ
            </button>
            <button 
              onClick={() => setActiveTab('topups')}
              className={`pb-3 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap ${activeTab === 'topups' ? 'text-[#0ca5e9] border-[#0ca5e9]' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
            >
              การเติมเงิน
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 space-y-4">
            {activeTab === 'purchases' && (
              <div>
                <div className="mb-4 bg-zinc-900/50 rounded-xl p-4 border border-white/5 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-zinc-500" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="ค้นหาสินค้า..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-[#121215] border border-white/10 text-zinc-100 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-[#0ca5e9] focus:ring-1 focus:ring-[#0ca5e9] transition-all"
                      />
                    </div>
                    <button 
                      className="bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-300 px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 font-medium transition-all shadow-sm"
                      onClick={() => {
                        const texts = selectedItems.map(id => sortedPurchases.find(p => p.id === id)?.credentialData).filter(Boolean);
                        if (texts.length) navigator.clipboard.writeText(texts.join('\n'));
                      }}
                    >
                      <Copy className="w-4 h-4 text-zinc-500" /> คัดลอกที่เลือก
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <button 
                      className="bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-300 px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium transition-all shadow-sm"
                      onClick={() => {
                        const texts = filteredPurchases.map(p => p.credentialData).filter(Boolean);
                        if (texts.length) navigator.clipboard.writeText(texts.join('\n'));
                      }}
                    >
                      <Copy className="w-4 h-4 text-zinc-500" /> คัดลอกทั้งหมด
                    </button>
                    <div className="relative">
                      <select className="appearance-none bg-[#121215] border border-white/10 text-zinc-300 px-4 py-2 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0ca5e9]">
                        <option>{filteredPurchases.length} รายการ</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    </div>
                  </div>
                </div>

                {filteredPurchases.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <p className="text-zinc-400 font-medium">ยังไม่มีประวัติการทำรายการ</p>
                  </div>
                ) : (
                  <div className="border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5 bg-[#121215]">
                    {filteredPurchases.map((purchase) => {
                      const date = formatThaiDate(purchase.date);
                      const time = formatThaiTime(purchase.date);
                      const hasGachaDrops = purchase.gachaDrops && purchase.gachaDrops.length > 0;
                      const hasCredentialData = !!purchase.credentialData;
                      const canExpand = hasGachaDrops || hasCredentialData;

                      return (
                        <motion.div 
                          key={purchase.id} 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "0px 0px -20px 0px" }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col"
                        >
                          <div className="p-4 flex gap-3 items-start relative w-full">
                            <div className="pt-1 sm:pt-3.5 shrink-0">
                               <input 
                                 type="checkbox" 
                                 className="w-5 h-5 rounded border-zinc-700 bg-[#121215] checked:bg-[#0ca5e9] checked:border-[#0ca5e9] focus:ring-[#0ca5e9] transition-colors cursor-pointer" 
                                 checked={selectedItems.includes(purchase.id)}
                                 onChange={(e) => {
                                   if (e.target.checked) setSelectedItems([...selectedItems, purchase.id]);
                                   else setSelectedItems(selectedItems.filter(id => id !== purchase.id));
                                 }}
                               />
                            </div>
                            
                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3">
                              <div className="flex gap-3 items-center flex-1 min-w-0">
                                <img src={items.find(item => item.id === purchase.itemId || item.name === purchase.itemName)?.imageUrls?.[0] || items.find(item => item.id === purchase.itemId || item.name === purchase.itemName)?.imageUrl || (purchase as any).imageUrl || "https://img2.pic.in.th/pic/Screenshot_20241029_163939_Facebook.jpg"} alt="" className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-white/5 shrink-0 shadow-sm" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-zinc-100 font-bold text-sm sm:text-base pr-2 mb-1.5 whitespace-normal leading-tight">
                                    {purchase.itemName}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="flex items-center text-xs font-bold text-[#10b981]">
                                       <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mr-1.5"></div> 
                                       จัดส่งสำเร็จ
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                      {date} {time}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 shrink-0 justify-end w-full sm:w-auto mt-1 sm:mt-0">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (canExpand) {
                                      setExpandedPurchases(prev => 
                                        prev.includes(purchase.id) 
                                          ? prev.filter(id => id !== purchase.id) 
                                          : [...prev, purchase.id]
                                      );
                                    }
                                  }}
                                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-medium text-zinc-300 transition-all shadow-sm"
                                >
                                  {expandedPurchases.includes(purchase.id) ? 'ปิดข้อมูล' : 'ดูข้อมูล'}
                                </button>
                                  {/* claim button removed */}
                               </div>
                            </div>
                          </div>
                          
                          {/* Expanded content */}
                          {hasCredentialData && expandedPurchases.includes(purchase.id) && (
                            <div className="p-4 bg-zinc-900 border-t border-white/5">
                              <div className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5 uppercase tracking-widest font-mono">
                                {purchase.game === 'ROV' ? 'Username:Password' : 'ข้อมูลบัญชี / โค้ด'}
                              </div>
                              <div className="space-y-2">
                                {purchase.credentialData!.split('\n').map((cred, idx) => (
                                  <div key={idx} className="bg-[#121215] border border-white/10 text-zinc-200 px-4 py-3 rounded-lg font-mono text-xs flex-1 break-all select-all shadow-sm">
                                    {cred}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {hasGachaDrops && expandedPurchases.includes(purchase.id) && (
                            <div className="p-4 bg-zinc-900 border-t border-white/5">
                              <div className="text-xs font-semibold text-zinc-400 mb-3 flex items-center gap-1.5 uppercase tracking-widest">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                ไอเทมที่ได้รับจากกล่องสุ่ม
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {Object.values(
                                  purchase.gachaDrops!.reduce((acc: any, drop) => {
                                    const key = drop.name;
                                    if (!acc[key]) acc[key] = { ...drop, count: 0 };
                                    acc[key].count++;
                                    return acc;
                                  }, {})
                                ).sort((a: any, b: any) => {
                                  if (a.isSalt && !b.isSalt) return 1;
                                  if (!a.isSalt && b.isSalt) return -1;
                                  return 0;
                                }).map((drop: any, idx) => {
                                  const isSalt = drop.isSalt;
                                  return (
                                    <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-[#121215] rounded-lg border border-white/10 shadow-sm relative overflow-hidden">
                                      <div 
                                        className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm bg-zinc-900 border border-white/5 shrink-0"
                                        style={{ color: drop.color || (isSalt ? '#6b7280' : '#F59E0B') }}
                                      >
                                        {isSalt ? '🧂' : '✨'}
                                      </div>
                                      <div className="flex-1 truncate flex justify-between items-center gap-2">
                                        <div className="truncate">
                                          <p className={`text-sm font-bold truncate ${isSalt ? 'text-zinc-400' : 'text-zinc-100'}`}>{drop.name}</p>
                                          <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase truncate">
                                            {isSalt ? 'SALT' : 'DROP REWARD'}
                                          </p>
                                        </div>
                                        {drop.count > 1 && (
                                          <div className="text-xs font-bold font-mono text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded shrink-0 border border-white/10 shadow-sm hidden sm:block">
                                            x{drop.count}
                                          </div>
                                        )}
                                      </div>
                                      {drop.count > 1 && (
                                          <div className="absolute top-0 right-0 sm:hidden text-[10px] font-bold font-mono text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded-bl shrink-0 border-b border-l border-white/10 ">
                                            x{drop.count}
                                          </div>
                                        )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'topups' && (
              sortedTopups.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <p className="text-zinc-400 font-medium">ยังไม่มีประวัติการเติมเงิน</p>
                </div>
              ) : (
                <div className="border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5 bg-[#121215]">
                  {sortedTopups.map((topup) => {
                    const date = formatThaiDate(topup.date);
                    const time = formatThaiTime(topup.date);
                    return (
                      <motion.div 
                        key={topup.id} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -20px 0px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-[#121215] flex flex-col"
                      >
                        <div className="p-4 flex gap-3 items-start relative w-full">
                          
                          <div className="w-12 h-12 rounded-lg border border-white/5 bg-zinc-900 flex items-center justify-center shrink-0">
                            <DollarSign className="w-6 h-6 text-[#10b981]" />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <p className="text-zinc-100 font-bold text-sm sm:text-base truncate pr-2 mb-1.5 align-middle">
                                การเติมเงินผ่าน {topup.method}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center text-xs font-bold text-[#10b981]">
                                   <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mr-1.5"></div> 
                                   สำเร็จเรียบร้อย
                                </span>
                                <span className="text-xs text-zinc-500">
                                  {date} {time}
                                </span>
                              </div>
                              {topup.refCode && (
                                <div className="text-[10px] text-zinc-500 font-mono mt-1 w-full truncate">
                                  อ้างอิง: {topup.refCode}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end items-end sm:items-center">
                              <div className={`font-mono font-bold text-right text-lg sm:text-xl px-2 ${topup.amount > 0 ? (topup.game === 'ROV' ? 'text-amber-500' : 'text-[#10b981]') : 'text-rose-500'}`}>
                                {topup.amount > 0 ? '+' : ''}{topup.amount} {topup.game === 'ROV' ? 'เครดิต' : '฿'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
