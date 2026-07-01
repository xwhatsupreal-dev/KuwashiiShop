import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Activity, 
  RefreshCw,
  Server,
  Database,
  ArrowLeft
} from "lucide-react";
import { supabase } from "../supabase";

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    users: 0,
    items: 0,
    purchases: 0,
    topups: 0
  });
  
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const loadStats = async () => {
    try {
      const [usersRes, itemsRes, purchasesRes, topupsRes] = await Promise.all([
        supabase.from("profiles").select("id"),
        supabase.from("items").select("id"),
        supabase.from("purchases").select("id"),
        supabase.from("topups").select("id")
      ]);

      setStats({
        users: usersRes.data?.length || 0,
        items: itemsRes.data?.length || 0,
        purchases: purchasesRes.data?.length || 0,
        topups: topupsRes.data?.length || 0
      });
    } catch (e) {
      console.error("Failed to load stats:", e);
    }
  };

  const checkApiStatus = async () => {
    setApiStatus("checking");
    try {
      // test API packlist
      const res = await fetch("/api/topup/game/packlist?game=rov");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setApiStatus("online");
        } else {
          setApiStatus("offline");
        }
      } else {
        setApiStatus("offline");
      }
    } catch (error) {
      setApiStatus("offline");
    } finally {
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    loadStats();
    checkApiStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
              <p className="text-sm text-zinc-500">จัดการระบบหลังบ้าน</p>
            </div>
          </div>
          
          <button
            onClick={checkApiStatus}
            disabled={apiStatus === "checking"}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${apiStatus === "checking" ? "animate-spin" : ""}`} />
            <span className="text-sm font-medium">เช็คสถานะ API</span>
          </button>
        </div>

        {/* API Status Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl mb-8 border relative overflow-hidden flex items-center justify-between ${
            apiStatus === "online" 
              ? "bg-emerald-500/10 border-emerald-500/20" 
              : apiStatus === "checking"
                ? "bg-amber-500/10 border-amber-500/20"
                : "bg-rose-500/10 border-rose-500/20"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              apiStatus === "online" 
                ? "bg-emerald-500/20 text-emerald-400" 
                : apiStatus === "checking"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-rose-500/20 text-rose-400"
            }`}>
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">WonDD API Connection</h2>
              <p className={`text-sm ${
                apiStatus === "online" 
                  ? "text-emerald-400/80" 
                  : apiStatus === "checking"
                    ? "text-amber-400/80"
                    : "text-rose-400/80"
              }`}>
                {apiStatus === "online" ? "กำลังเชื่อมต่อระบบ - API ออนไลน์ปกติ" : apiStatus === "checking" ? "กำลังตรวจสอบสถานะ API..." : "ไม่สามารถเชื่อมต่อ API ได้ (Offline)"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
              apiStatus === "online" 
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                : apiStatus === "checking"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-rose-500/20 text-rose-400 border-rose-500/30"
            }`}>
              <div className={`w-2 h-2 rounded-full ${apiStatus === "online" ? "bg-emerald-400 animate-pulse" : apiStatus === "checking" ? "bg-amber-400" : "bg-rose-400"}`} />
              {apiStatus === "online" ? "Online" : apiStatus === "checking" ? "Checking" : "Offline"}
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              อัพเดทล่าสุด: {lastChecked.toLocaleTimeString()}
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">{stats.users}</h3>
            <p className="text-sm text-zinc-400 mt-1">ผู้ใช้งานทั้งหมด</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">{stats.items}</h3>
            <p className="text-sm text-zinc-400 mt-1">สินค้าในระบบ</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">{stats.purchases}</h3>
            <p className="text-sm text-zinc-400 mt-1">รายการสั่งซื้อทั้งหมด</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">{stats.topups}</h3>
            <p className="text-sm text-zinc-400 mt-1">รายการเติมเงินทั้งหมด</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
