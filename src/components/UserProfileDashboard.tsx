import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Calendar, Clock, Sparkles, DollarSign, ChevronDown, ChevronLeft, Search, Copy, Save, Settings, Package, User } from 'lucide-react';
import { supabase } from '../supabase';
import { PurchaseRecord, TopupRecord } from '../types';
import { fetchUserPurchases, fetchUserTopups } from '../queries';

interface UserProfileDashboardProps {
  currentUser: any;
  setAppScreen: (screen: string) => void;
  onChangePassword: (newPass: string) => void;
  onChangeUsername: (newUsername: string) => Promise<boolean>;
  onChangeEmail: (newEmail: string) => Promise<boolean>;
}

export const UserProfileDashboard: React.FC<UserProfileDashboardProps> = ({
  currentUser,
  setAppScreen,
  onChangePassword,
  onChangeUsername,
  onChangeEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'purchases' | 'topups'>('profile');
  
  // History state
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [topups, setTopups] = useState<TopupRecord[]>([]);
  const [expandedPurchases, setExpandedPurchases] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Settings state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [userEmail, setUserEmail] = useState('-');

  useEffect(() => {
    if (currentUser) {
      setEditUsername(currentUser.username || '');
      supabase.from('profiles').select('email').eq('username', currentUser.username).single().then(({ data }) => {
        if (data && data.email) {
          setUserEmail(data.email || '-');
          setEditEmail(data.email || '');
        } else {
          setUserEmail('-');
          setEditEmail('');
        }
      });

      const loadData = () => {
        fetchUserPurchases(currentUser.username).then(data => {
          if (data) setPurchases(data);
        });
        fetchUserTopups(currentUser.username).then(data => {
          if (data) setTopups(data);
        });
      };
      
      loadData();
      const handleSync = () => loadData();
      window.addEventListener('sync-update', handleSync);
      return () => window.removeEventListener('sync-update', handleSync);
    }
  }, [currentUser]);

  const handleSavePassword = () => {
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
      }
      onChangePassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleSaveUsername = async () => {
    if (editUsername !== currentUser?.username) {
      const success = await onChangeUsername(editUsername);
      if (!success) setEditUsername(currentUser?.username || '');
    }
  };

  const handleSaveEmail = async () => {
    if (editEmail !== userEmail) {
      const success = await onChangeEmail(editEmail);
      if (success) setUserEmail(editEmail);
      else setEditEmail(userEmail);
    }
  };

  const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filteredPurchases = sortedPurchases.filter(p => !searchTerm || p.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return {
      date: d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 w-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
             <User className="w-6 h-6 text-indigo-400" /> ข้อมูลผู้ใช้งาน
           </h2>
           <p className="text-sm text-zinc-400 mt-1">จัดการโปรไฟล์และดูประวัติการทำรายการของคุณ</p>
        </div>
        <button 
           onClick={() => setAppScreen("SHOP")}
           className="flex items-center gap-1.5 px-4 py-2 hover:bg-white/10 rounded-xl text-zinc-300 text-sm font-medium transition-colors"
        >
           <ChevronLeft className="w-4 h-4" /> กลับหน้าร้านค้า
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
           <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner overflow-hidden">
                 {currentUser?.avatar_url || currentUser?.avatar ? (
                   <img src={currentUser.avatar_url || currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <User className="w-10 h-10" />
                 )}
              </div>
              <h3 className="font-bold text-zinc-100">{currentUser?.username}</h3>
              <div className="w-full h-px bg-white/5 my-3"></div>
              <div className="w-full space-y-2">
                 <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-xs text-indigo-300 font-medium whitespace-nowrap">ยอดคงเหลือ</span>
                    <span className="text-indigo-400 font-bold">฿{(currentUser?.balance || 0).toLocaleString()}</span>
                 </div>
              </div>
           </div>

           <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex justify-start items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-zinc-900/50 text-zinc-400 border border-white/5 hover:bg-zinc-900 hover:text-zinc-200'}`}
              >
                <Settings className="w-4 h-4" /> ตั้งค่าบัญชี
              </button>
              <button 
                onClick={() => setActiveTab('purchases')}
                className={`flex justify-start items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'purchases' ? 'bg-[#0ca5e9]/20 text-[#0ca5e9] border border-[#0ca5e9]/30' : 'bg-zinc-900/50 text-zinc-400 border border-white/5 hover:bg-zinc-900 hover:text-zinc-200'}`}
              >
                <Package className="w-4 h-4" /> ประวัติการสั่งซื้อ
              </button>
              <button 
                onClick={() => setActiveTab('topups')}
                className={`flex justify-start items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'topups' ? 'bg-[#0ca5e9]/20 text-[#0ca5e9] border border-[#0ca5e9]/30' : 'bg-zinc-900/50 text-zinc-400 border border-white/5 hover:bg-zinc-900 hover:text-zinc-200'}`}
              >
                <DollarSign className="w-4 h-4" /> ประวัติการเติมเงิน
              </button>
           </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 min-h-[500px]">
           {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-8">
                 <div className="space-y-6 max-w-lg">
                    {/* Username Section */}
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                        ชื่อผู้ใช้
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="flex-1 bg-zinc-950 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all font-mono"
                        />
                        <button 
                          onClick={handleSaveUsername}
                          disabled={editUsername === currentUser?.username}
                          className="py-3 px-5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all text-sm flex items-center gap-2"
                        >
                          <Save className="w-4 h-4 max-sm:hidden" /> บันทึก
                        </button>
                      </div>
                    </div>

                    {/* Email Section */}
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                        อีเมล
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          placeholder={userEmail !== '-' ? userEmail : 'ใส่อีเมลของคุณ...'}
                          className="flex-1 bg-zinc-950 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                        />
                        <button 
                          onClick={handleSaveEmail}
                          disabled={editEmail === userEmail || !editEmail.includes('@')}
                          className="py-3 px-5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all text-sm flex items-center gap-2 shrink-0"
                        >
                          <Save className="w-4 h-4 max-sm:hidden" /> บันทึก
                        </button>
                      </div>
                    </div>
                 </div>

                 <div className="h-px bg-white/5 w-full my-8"></div>

                 <div className="space-y-6 max-w-lg">
                    <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">เปลี่ยนรหัสผ่าน</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                          รหัสผ่านใหม่
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                          ยืนยันรหัสผ่านใหม่
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <button 
                        onClick={handleSavePassword}
                        disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 6}
                        className="py-3 px-6 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all text-sm flex items-center justify-center w-full gap-2 mt-2"
                      >
                         บันทึกรหัสผ่าน
                      </button>
                    </div>
                 </div>
              </motion.div>
           )}

           {activeTab === 'purchases' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                 <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-zinc-500" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="ค้นหาสินค้า..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-[#121215] border border-white/10 text-zinc-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#0ca5e9] transition-all"
                      />
                    </div>
                    <button 
                      className="bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-300 px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 font-medium transition-all"
                      onClick={() => {
                        const texts = selectedItems.map(id => sortedPurchases.find(p => p.id === id)?.credentialData).filter(Boolean);
                        if (texts.length) navigator.clipboard.writeText(texts.join('\n'));
                      }}
                    >
                      <Copy className="w-4 h-4 text-zinc-500" /> คัดลอกที่เลือก
                    </button>
                    <button 
                      className="bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-300 px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 font-medium transition-all"
                      onClick={() => {
                        const texts = filteredPurchases.map(p => p.credentialData).filter(Boolean);
                        if (texts.length) navigator.clipboard.writeText(texts.join('\n'));
                      }}
                    >
                      <Copy className="w-4 h-4 text-zinc-500" /> คัดลอกทั้งหมด
                    </button>
                 </div>

                 {filteredPurchases.length === 0 ? (
                   <div className="text-center py-16 bg-zinc-900 border border-white/5 rounded-2xl">
                     <div className="w-16 h-16 rounded-full bg-[#121215] border border-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                       <ShoppingCart className="w-8 h-8" />
                     </div>
                     <p className="text-zinc-400 font-medium">ยังไม่มีประวัติการทำรายการ</p>
                   </div>
                 ) : (
                   <div className="bg-zinc-900 border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden">
                     {filteredPurchases.map((purchase) => {
                       const { date, time } = formatDate(purchase.date);
                       const hasGachaDrops = purchase.gachaDrops && purchase.gachaDrops.length > 0;
                       const hasCredentialData = !!purchase.credentialData;
                       const canExpand = hasGachaDrops || hasCredentialData;

                       return (
                         <div key={purchase.id} className="flex flex-col">
                           <div className="p-4 sm:p-5 flex gap-4 items-start sm:items-center relative w-full">
                             <div className="shrink-0 mt-1 sm:mt-0">
                                <input 
                                  type="checkbox" 
                                  className="w-5 h-5 rounded border-zinc-700 bg-[#121215] checked:bg-[#0ca5e9] focus:ring-[#0ca5e9] cursor-pointer" 
                                  checked={selectedItems.includes(purchase.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) setSelectedItems([...selectedItems, purchase.id]);
                                    else setSelectedItems(selectedItems.filter(id => id !== purchase.id));
                                  }}
                                />
                             </div>
                             
                             <img src={(purchase as any).imageUrl || "https://img2.pic.in.th/pic/Screenshot_20241029_163939_Facebook.jpg"} alt="" className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/5 shrink-0" />
                             
                             <div className="flex-1 min-w-0">
                                <p className="text-zinc-100 font-bold text-sm sm:text-base mb-1 truncate">
                                  {purchase.itemName}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 gap-y-1">
                                  <span className="flex items-center text-xs font-bold text-emerald-400">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></div> 
                                     จัดส่งสำเร็จ
                                  </span>
                                  <span className="text-xs text-zinc-500 font-mono">
                                    {date} {time}
                                  </span>
                                </div>
                             </div>
                             
                             <div className="shrink-0">
                                <button 
                                  onClick={() => {
                                    if (canExpand) {
                                      setExpandedPurchases(prev => 
                                        prev.includes(purchase.id) 
                                          ? prev.filter(id => id !== purchase.id) 
                                          : [...prev, purchase.id]
                                      );
                                    }
                                  }}
                                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium text-zinc-300 transition-all font-sans"
                                >
                                  {expandedPurchases.includes(purchase.id) ? 'ปิดข้อมูล' : 'ดูข้อมูล'}
                                </button>
                             </div>
                           </div>
                           
                           <AnimatePresence>
                             {expandedPurchases.includes(purchase.id) && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden bg-[#121215]/50 border-t border-white/5"
                               >
                                 {hasCredentialData && (
                                   <div className="p-4 sm:p-5">
                                     <div className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-widest font-mono">
                                       {purchase.game === 'ROV' ? 'Username : Password' : 'ข้อมูลบัญชี / โค้ด'}
                                     </div>
                                     <div className="space-y-2">
                                       {purchase.credentialData!.split('\n').map((cred, idx) => (
                                         <div key={idx} className="bg-[#121215] border border-white/5 text-zinc-200 px-4 py-3 rounded-lg font-mono text-sm break-all select-all shadow-inner">
                                           {cred}
                                         </div>
                                       ))}
                                     </div>
                                   </div>
                                 )}

                                 {hasGachaDrops && (
                                   <div className="p-4 sm:p-5 border-t border-white/5">
                                     <div className="text-xs font-semibold text-zinc-400 mb-3 flex items-center gap-1.5 uppercase tracking-widest">
                                       <Sparkles className="w-3.5 h-3.5 text-amber-500" /> ไอเทมที่ได้รับ
                                     </div>
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                       {Object.values(
                                         purchase.gachaDrops!.reduce((acc: any, drop) => {
                                           const key = drop.name;
                                           if (!acc[key]) acc[key] = { ...drop, count: 0 };
                                           acc[key].count++;
                                           return acc;
                                         }, {})
                                       ).map((item: any, idx) => (
                                         <div key={idx} className="flex items-center gap-3 bg-[#121215] px-4 py-3 rounded-xl border border-white/5">
                                           <div className="w-8 h-8 rounded bg-zinc-900 flex flex-col overflow-hidden mx-auto shrink-0 border border-white/10" style={{ borderColor: item.color }}>
                                              <div className="flex-1 w-full" style={{ backgroundColor: item.color }}></div>
                                              <div className="h-1/3 w-full bg-zinc-900 border-t border-white/5 flex items-center justify-center">
                                                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                              </div>
                                           </div>
                                           <div className="flex-1 min-w-0 pr-2 font-medium text-zinc-200 truncate font-mono text-sm leading-tight">
                                             {item.name}
                                           </div>
                                           {item.count > 1 && (
                                             <div className="font-bold text-amber-400 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-md text-xs">x{item.count}</div>
                                           )}
                                         </div>
                                       ))}
                                     </div>
                                   </div>
                                 )}
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                       );
                     })}
                   </div>
                 )}
              </motion.div>
           )}

           {activeTab === 'topups' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                 {topups.length === 0 ? (
                   <div className="text-center py-16">
                     <DollarSign className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
                     <p className="text-zinc-400 font-medium font-sans">ประวัติการเติมเงินจะแสดงที่นี่เมื่อคุณเริ่มทำรายการ</p>
                   </div>
                 ) : (
                   <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead className="bg-[#121215] text-zinc-400 text-xs uppercase tracking-wider font-bold">
                       <tr>
                         <th className="px-6 py-4">จำนวนเงิน</th>
                         <th className="px-6 py-4 hidden sm:table-cell">อ้างอิง/เลขอ้างอิง</th>
                         <th className="px-6 py-4">วัน-เวลา</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
                       {topups.map((topup) => {
                         const { date, time } = formatDate(topup.date);
                         return (
                           <tr key={topup.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-bold text-emerald-400 flex items-center gap-1.5">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                               + ฿{Number(topup.amount).toLocaleString()}
                             </td>
                             <td className="px-6 py-4 text-zinc-500 hidden sm:table-cell">
                               {topup.refCode || '-'}
                             </td>
                             <td className="px-6 py-4 text-zinc-500">
                               {date} {time}
                             </td>
                           </tr>
                         );
                       })}
                     </tbody>
                   </table>
                 )}
              </motion.div>
           )}
        </div>
      </div>
    </motion.div>
  );
};
