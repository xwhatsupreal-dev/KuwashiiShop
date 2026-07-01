import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Activity, Coins, TrendingUp, AlertTriangle, 
  CheckCircle, Database, Server, CreditCard, Mail, Bot, Link2,
  DollarSign
} from 'lucide-react';

interface AdminDashboardPageProps {
  onBack: () => void;
  globalStats: any;
}

interface ApiStatus {
  name: string;
  status: 'online' | 'offline';
  type: string;
  connected: boolean;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onBack, globalStats }) => {
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch('/api/admin/status');
        const data = await res.json();
        setApiStatuses(data.apis || []);
      } catch (err) {
        console.error("Failed to fetch API statuses", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatuses();
  }, []);

  const getIconForType = (type: string) => {
    switch(type) {
      case 'Payment': return <CreditCard className="w-5 h-5" />;
      case 'Integration': return <Link2 className="w-5 h-5" />;
      case 'Service': return <Mail className="w-5 h-5" />;
      case 'AI': return <Bot className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const revenue = globalStats?.global_rev_astd || 0;
  const totalTopups = globalStats?.total_topups || 0;
  const totalPurchases = globalStats?.total_purchases || 0;

  return (
    <div className="w-full max-w-7xl mx-auto pb-24 pt-4 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-colors text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-white font-display tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-amber-500" />
              แดชบอร์ดผู้ดูแลระบบ
            </h1>
            <p className="text-sm text-zinc-400 mt-0.5">ภาพรวมรายได้และสถานะการเชื่อมต่อ API ของระบบ</p>
          </div>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          สรุปรายได้และสถิติ (เฉพาะแอดมิน)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-400 font-medium text-sm">รายได้รวมของระบบ</h3>
            </div>
            <p className="text-3xl font-bold text-white font-mono mt-3">
              ฿{Number(revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CreditCard className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-400 font-medium text-sm">ยอดเติมเงินทั้งหมด</h3>
            </div>
            <p className="text-3xl font-bold text-white font-mono mt-3">
              ฿{Number(totalTopups).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-400 font-medium text-sm">จำนวนการซื้อขายสะสม</h3>
            </div>
            <p className="text-3xl font-bold text-white font-mono mt-3">
              {Number(totalPurchases).toLocaleString()} <span className="text-sm font-normal text-zinc-500">รายการ</span>
            </p>
          </div>
        </div>
      </div>

      {/* API Status Section */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-amber-500" />
          สถานะ API ที่เชื่อมอยู่
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-zinc-900/30 border border-white/5 p-5 rounded-2xl animate-pulse h-[100px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiStatuses.map((api, idx) => (
              <div key={idx} className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-zinc-800 text-zinc-300 rounded-lg">
                      {getIconForType(api.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{api.name}</h4>
                      <p className="text-[11px] text-zinc-500 mt-1">{api.type}</p>
                    </div>
                  </div>
                  <div>
                    {api.status === 'online' ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        ออนไลน์
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-full text-xs font-bold border border-rose-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        ออฟไลน์
                      </div>
                    )}
                  </div>
                </div>
                {!api.connected && (
                  <div className="text-[11px] text-rose-400/80 bg-rose-500/5 p-2 rounded-lg border border-rose-500/10 mt-auto">
                    API นี้ยังไม่ได้ตั้งค่า Environment Variables หรือข้อมูลการเชื่อมต่อไม่ครบถ้วน
                  </div>
                )}
                {api.connected && (
                  <div className="text-[11px] text-emerald-400/80 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 mt-auto flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    เชื่อมต่อและพร้อมใช้งาน
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
